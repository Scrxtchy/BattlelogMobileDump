


// ===============================================================
// WATCH OUT! THIS FILE IS COPIED FROM THE BFA LOADOUT 
// PLEASE CHANGE THE BFA LOADOUT AND RUN THE PIPELINE (omaha_loaduout_import.py ) INSTEAD OF EDITING HERE...
// Also note that files in loadoutmobile/ will be copied last and overwriting BFA loadout content...
// ===============================================================






// 

// ^^ You did read that right?


/** @jsx React.DOM */
var React = require('react');
var helpers = require("js/../public/jsx/loadout/helpers.js");

var Bar = React.createClass({displayName: 'Bar',
    render: function () {
        var style = { width: this.props.value, float: "left" };
        var diffStyle;

        if (this.props.diffValue <= 0) {
            var diffValue = this.props.diffValue*-1;
            diffStyle = {
                width: diffValue,
                left: this.props.value-diffValue,
                height: 6, position: "absolute",
                "background-color": "#D91E18"
            };
        } else {
            diffStyle = {
                width: this.props.diffValue,
                left: this.props.value,
                height: 6,
                position: "absolute",
                "background-color": "#87D37C"
            };
        }

        return (
            React.createElement("div", {className: "progress-bar medium no-border clearfix"}, 
                React.createElement("div", {className: "progress-bar-inner info", style: style}), 
                React.createElement("div", {className: "progress-bar-inner-difference", style: diffStyle})
            )
        );
    }
});

var ItemBars = React.createClass({displayName: 'ItemBars',
    render: function () {
        var weaponData = this.props.weaponData;
        var diffData = this.props.diffData;

        var damage = Math.round(weaponData.statDamage * 100);
        var accuracy = Math.round(weaponData.statAccuracy * 100);
        var mobility = Math.round(weaponData.statMobility * 100);
        var range = Math.round(weaponData.statRange * 100);
        var handling = Math.round(weaponData.statHandling * 100);

        var diffDamage = Math.round(diffData.statDamage * 100) - Math.round(weaponData.statDamage * 100);
        var diffAccuracy = Math.round(diffData.statAccuracy * 100) - Math.round(weaponData.statAccuracy * 100);
        var diffMobility = Math.round(diffData.statMobility * 100) - Math.round(weaponData.statMobility * 100);
        var diffRange = Math.round(diffData.statRange * 100) - Math.round(weaponData.statRange * 100);
        var diffHandling = Math.round(diffData.statHandling * 100) - Math.round(weaponData.statHandling * 100);

        if( mobility > 0 ) {
            return (
                React.createElement("ul", {className: "item-stats-info"}, 
                    React.createElement("li", null, 
                        React.createElement("div", {className: "left-col"}, helpers.locale("ID_WEB_COMMON_STATS_DAMAGE")), 
                        React.createElement("div", {className: "right-col-1"}, damage+diffDamage), 
                        React.createElement("div", {className: "right-col-2"}, React.createElement(Bar, {value: damage, diffValue: diffDamage}))
                    ), 

                    React.createElement("li", null, 
                        React.createElement("div", {className: "left-col"}, helpers.locale("ID_WEB_COMMON_ACCURACY")), 
                        React.createElement("div", {className: "right-col-1"}, accuracy+diffAccuracy), 
                        React.createElement("div", {className: "right-col-2"}, React.createElement(Bar, {value: accuracy, diffValue: diffAccuracy}))
                    ), 

                    React.createElement("li", null, 
                        React.createElement("div", {className: "left-col"}, helpers.locale("ID_WEB_COMMON_STATS_MOBILITY")), 
                        React.createElement("div", {className: "right-col-1"}, mobility+diffMobility), 
                        React.createElement("div", {className: "right-col-2"}, React.createElement(Bar, {value: mobility, diffValue: diffMobility}))
                    ), 

                    React.createElement("li", null, 
                        React.createElement("div", {className: "left-col"}, helpers.locale("ID_WEB_COMMON_STATS_RANGE")), 
                        React.createElement("div", {className: "right-col-1"}, range+diffRange), 
                        React.createElement("div", {className: "right-col-2"}, React.createElement(Bar, {value: range, diffValue: diffRange}))
                    ), 

                    React.createElement("li", null, 
                        React.createElement("div", {className: "left-col"}, helpers.locale("ID_WEB_COMMON_STATS_HANDLING")), 
                        React.createElement("div", {className: "right-col-1"}, handling+diffHandling), 
                        React.createElement("div", {className: "right-col-2"}, React.createElement(Bar, {value: handling, diffValue: diffHandling}))
                    )
                )
            );
        }else{
            return (
                React.createElement("ul", {className: "item-stats-info"}, 
                    React.createElement("li", null, 
                        React.createElement("div", {className: "left-col"}, helpers.locale("ID_WEB_COMMON_STATS_DAMAGE")), 
                        React.createElement("div", {className: "right-col-1"}, damage+diffDamage), 
                        React.createElement("div", {className: "right-col-2"}, React.createElement(Bar, {value: damage, diffValue: diffDamage}))
                    ), 

                    React.createElement("li", null, 
                        React.createElement("div", {className: "left-col"}, helpers.locale("ID_WEB_COMMON_ACCURACY")), 
                        React.createElement("div", {className: "right-col-1"}, accuracy+diffAccuracy), 
                        React.createElement("div", {className: "right-col-2"}, React.createElement(Bar, {value: accuracy, diffValue: diffAccuracy}))
                    ), 

                    React.createElement("li", null, 
                        React.createElement("div", {className: "left-col"}, helpers.locale("ID_WEB_COMMON_STATS_RANGE")), 
                        React.createElement("div", {className: "right-col-1"}, range+diffRange), 
                        React.createElement("div", {className: "right-col-2"}, React.createElement(Bar, {value: range, diffValue: diffRange}))
                    ), 

                    React.createElement("li", null, 
                        React.createElement("div", {className: "left-col"}, helpers.locale("ID_WEB_COMMON_STATS_HANDLING")), 
                        React.createElement("div", {className: "right-col-1"}, handling+diffHandling), 
                        React.createElement("div", {className: "right-col-2"}, React.createElement(Bar, {value: handling, diffValue: diffHandling}))
                    )
                )
            );
        }
    }
});

module.exports = ItemBars;
