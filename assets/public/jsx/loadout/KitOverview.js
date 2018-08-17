


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
var store = require("js/../public/jsx/loadout/store.js");

var KitSlotAccessories = React.createClass({displayName: 'KitSlotAccessories',
    propTypes: {
        accessories: React.PropTypes.array.isRequired
    },

    render: function () {
        var accessoryNodes = [];

        _.each(this.props.accessories, function (accessory, i) {
            if (i > 3) {
                return;  // Only show first four accessories in this view
            }

            var classes;
            if (accessory.item.image.category.indexOf("camo") === 0) {
                classes = helpers.getImageClasses(accessory.item.image, "xsmall");
            } else {
                classes = helpers.getImageClasses(accessory.item.image, "xxsmallinv");
            }

            accessoryNodes.push(
                React.createElement("td", {className: "accessory", key: i}, 
                    React.createElement("div", {className: classes})
                )
            );
        }, this);

        return (
            React.createElement("table", {className: "table slot-item-accessories"}, 
                React.createElement("tr", null, 
                    accessoryNodes
                )
            )
        );
    }
});

var KitSlot = React.createClass({displayName: 'KitSlot',
    render: function () {
        var accessoriesNode = null;

        var accessories = this.props.item.accessories;

        if (accessories && accessories.length > 0) {
            accessoriesNode = React.createElement(KitSlotAccessories, {accessories: accessories, isActive: this.props.isActive})
        }

        var classes = React.addons.classSet({
            "slot": true,
            "active": this.props.isActive
        });

        var imageClasses;

        if (this.props.item.image.category.indexOf("appearance") === 0) {
            imageClasses = helpers.getImageClasses(this.props.item.image, "xsmall");
        } else {
            imageClasses = helpers.getImageClasses(this.props.item.image, "smallinv")
        }

        var url = [
            "#kit",
            this.props.kitIndex,
            this.props.factionIndex,
            this.props.presetIndex,
            this.props.slotIndex
        ];

        if (!accessories || accessories.length === 0) {
            url.push("-1");  // Show item selector instantly since there's no other options in the ItemOverview
        }

        url = url.join('/');

        return (
            React.createElement("a", {href: url, className: classes}, 
                React.createElement("div", {className: "slot-info"}, 
                    React.createElement("div", {className: "slot-item-image-wrapper"}, 
                        React.createElement("div", {className: imageClasses})
                    ), 

                    React.createElement("div", {className: "slot-name"}, helpers.locale(this.props.slotName)), 
                    React.createElement("div", {className: "slot-item-name"}, helpers.locale(this.props.item.name))
                ), 

                accessoriesNode
            )
        );
    }
});

var KitOverview = React.createClass({displayName: 'KitOverview',
    propTypes: {
        activeSlotIndex: React.PropTypes.number
    },

    render: function () {
        var rowNodes = [];

        _.each(this.props.preset.slots, function (slot, i) {
            rowNodes.push(
                React.createElement(KitSlot, {
                    item: slot.item, 
                    slotName: slot.name, 
                    isActive: i === this.props.activeSlotIndex, 
                    kitIndex: this.props.kitIndex, 
                    factionIndex: this.props.factionIndex, 
                    presetIndex: this.props.presetIndex, 
                    slotIndex: i, 
                    key: i}
                )
            );
        }, this);

        return (
            React.createElement("div", {className: "kit-overview column alpha"}, 
                rowNodes
            )
        );
    }
});

module.exports = KitOverview;