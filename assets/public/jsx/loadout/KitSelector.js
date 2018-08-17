


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
var actions = require("js/../public/jsx/loadout/actions.js");

var KitSelector = React.createClass({displayName: 'KitSelector',
    propTypes: {
        activeKitIndex: React.PropTypes.number
    },

    render: function () {
        var listNodes = [];

        _.each(this.props.kits, function (kit, i) {
            var url = [
                "#kit",
                i,
                "presets"
            ].join('/');

            var classes = React.addons.classSet({
                "item": true,
                "active": i === this.props.activeKitIndex
            });

            var iconClasses = React.addons.classSet(
                "kit-icon",
                "small",
                kit.image.slug
            );

            listNodes.push(
                React.createElement("a", {href: url, className: classes, key: i}, 
                    React.createElement("div", {className: iconClasses}), 
                    React.createElement("span", {className: "name"}, helpers.locale(kit.name))
                )
            );
        }, this);

        var vehiclesAnchorClasses = React.addons.classSet({
            "item": true,
            "active": this.props.isVehiclesView
        });

        return (
            React.createElement("div", {className: "kit-selector"}, 
                listNodes, 

                React.createElement("a", {href: "#vehicles", className: vehiclesAnchorClasses}, 
                    React.createElement("div", {className: "vehicle-icon"}), 
                    React.createElement("span", {className: "name"}, helpers.locale("ID_WEB_COMMON_VEHICLES"))
                )
            )
        );
    }
});

module.exports = KitSelector;