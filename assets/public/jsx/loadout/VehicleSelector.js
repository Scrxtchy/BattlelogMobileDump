


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

var VehicleSlot = React.createClass({displayName: 'VehicleSlot',
    render: function () {
        var classes = "";

        if (this.props.slot) {
            classes = helpers.getImageClasses(this.props.slot.item.image, "xsmallinv");
        }

        return (
            React.createElement("div", {className: "slot"}, 
                React.createElement("div", {className: "item-image-wrapper"}, 
                    React.createElement("div", {className: classes})
                )
            )
        );
    }
});


var VehicleSelector = React.createClass({displayName: 'VehicleSelector',
    render: function () {
        var rowNodes = [];

        _.each(this.props.vehicles, function (vehicle, i) {

            var url = "#vehicles/" + i;

            var imageClasses = helpers.getImageClasses(vehicle.image, "smallinv");

            var slotNodes = [];

            _.each(vehicle.slots, function (slot, i) {
                if (i > 3) { return; } // Only show first 4

                slotNodes.push(
                    React.createElement(VehicleSlot, {slot: slot, key: i})
                );
            }, this);

            // Fill with empty slots if needed
            if (vehicle.slots.length < 4) {
                var n = 4 - vehicle.slots.length;

                for (var ni = 0; ni < n; ni++) {
                    slotNodes.push(
                        React.createElement(VehicleSlot, {key: vehicle.slots.length + ni})
                    );
                }
            }

            var classes = React.addons.classSet({
                "vehicle": true,
                "active": this.props.activeVehicleIndex === i
            });

            rowNodes.push(
                React.createElement("a", {href: url, className: classes, key: i}, 
                    React.createElement("header", null, React.createElement("h1", null, helpers.locale(vehicle.name))), 

                    React.createElement("div", {className: "vehicle-image"}, 
                        React.createElement("div", {className: "loadout-item-picture-inner"}, 
                            React.createElement("div", {className: imageClasses})
                        )
                    ), 

                    React.createElement("div", {className: "vehicle-slots"}, 
                        slotNodes
                    )
                )
            );
        }, this);

        return (
            React.createElement("div", {className: "vehicle-selector column alpha"}, 
                rowNodes
            )
        );
    }
});

module.exports = VehicleSelector;