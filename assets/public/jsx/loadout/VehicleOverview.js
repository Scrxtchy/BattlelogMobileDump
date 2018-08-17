


// ===============================================================
// WATCH OUT! THIS FILE IS COPIED FROM THE BFA LOADOUT 
// PLEASE CHANGE THE BFA LOADOUT AND RUN THE PIPELINE (omaha_loaduout_import.py ) INSTEAD OF EDITING HERE...
// Also note that files in loadoutmobile/ will be copied last and overwriting BFA loadout content...
// ===============================================================






// 

// ^^ You did read that right?


/** @jsx React.DOM */
var React = require("react");
var helpers = require("js/../public/jsx/loadout/helpers.js");

var VehicleSlot = React.createClass({displayName: 'VehicleSlot',
    render: function () {
        var classes = React.addons.classSet({
            "slot": true,
            "active": this.props.isActive
        });

        var imageClasses = helpers.getImageClasses(this.props.item.image, "size90winv");

        var url = [
            "#vehicles",
            this.props.vehicleIndex,
            this.props.slotIndex
        ].join('/');

        return (
            React.createElement("a", {href: url, className: classes}, 
                React.createElement("div", {className: "slot-info"}, 
                    React.createElement("div", {className: "slot-item-image-wrapper"}, 
                        React.createElement("div", {className: imageClasses})
                    ), 

                    React.createElement("div", {className: "slot-name"}, helpers.locale(this.props.slotName)), 
                    React.createElement("div", {className: "slot-item-name"}, helpers.locale(this.props.item.name))
                )
            )
        );
    }
});

var VehicleOverview = React.createClass({displayName: 'VehicleOverview',
    propTypes: {
        activeSlotIndex: React.PropTypes.number
    },

    render: function () {
        var rowNodes = [];

        if (!this.props.vehicle) {
            return React.createElement("div", {className: "vehicle-overview column"});
        }

        _.each(this.props.vehicle.slots, function (slot, i) {
            rowNodes.push(
                React.createElement(VehicleSlot, {
                    item: slot.item, 
                    slotName: slot.name, 
                    vehicleIndex: this.props.vehicleIndex, 
                    isActive: i === this.props.activeSlotIndex, 
                    slotIndex: i, 
                    key: i}
                )
            );
        }, this);

        return (
            React.createElement("div", {className: "vehicle-overview column"}, 
                React.createElement("header", null, 
                    React.createElement("h1", null, helpers.locale(this.props.vehicle.name))
                ), 

                rowNodes
            )
        );
    }
});

module.exports = VehicleOverview;