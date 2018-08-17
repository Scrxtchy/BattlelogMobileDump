


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

var ItemBars = require("js/../public/jsx/loadout/ItemBars.js");
var ItemDetailsStats = require("js/../public/jsx/loadout/ItemDetailsStats.js");

var ItemAccessoryListRow = React.createClass({displayName: 'ItemAccessoryListRow',
    statics: {
        getState: function (props) {
            return {
                isActive: props.accessorySlotIndex === props.activeAccessorySlotIndex
            }
        }
    },

    handleClick: function () {
        actions.selectKitItem(
            this.props.kitIndex,
            this.props.factionIndex,
            this.props.presetIndex,
            this.props.slotIndex,
            this.props.item
        );
    },

    getInitialState: function () {
        return ItemAccessoryListRow.getState(this.props);
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState(ItemAccessoryListRow.getState(nextProps));
    },

    render: function () {
        if (!this.props.accessory) {
            return React.createElement("div", {className: "slot empty"});  // Render empty slot
        }

        var classes = React.addons.classSet({
            "slot": true,
            "active": this.state.isActive
        });

        var imageClasses = helpers.getImageClasses(this.props.accessory.item.image, "size90winv");

        var url = [
            "#kit",
            this.props.kitIndex,
            this.props.factionIndex,
            this.props.presetIndex,
            this.props.slotIndex,
            this.props.accessorySlotIndex
        ].join('/');

        return (
            React.createElement("a", {href: url, className: classes, onClick: this.handleClick}, 
                React.createElement("div", {className: "slot-info"}, 
                    React.createElement("div", {className: "slot-item-image-wrapper"}, 
                        React.createElement("div", {className: imageClasses})
                    ), 

                    React.createElement("div", {className: "slot-name"}, helpers.locale(this.props.accessory.name)), 
                    React.createElement("div", {className: "slot-item-name"}, helpers.locale(this.props.accessory.item.name))
                )
            )
        );
    }
});

var ItemAccessoryList = React.createClass({displayName: 'ItemAccessoryList',
    getDefaultProps: function () {
        return {
            minSlotsCount: 5
        };
    },

    render: function () {
        var accessoryNodes = [];
        var accessories = this.props.presetItem.accessories;

        _.each(accessories, function (accessory, i) {
            accessoryNodes.push(
                React.createElement(ItemAccessoryListRow, {
                    key: i, 
                    item: this.props.item, 
                    accessory: accessory, 
                    kitIndex: this.props.kitIndex, 
                    factionIndex: this.props.factionIndex, 
                    presetIndex: this.props.presetIndex, 
                    slotIndex: this.props.slotIndex, 
                    accessorySlotIndex: i, 
                    activeAccessorySlotIndex: this.props.activeAccessorySlotIndex}
                )
            );
        }, this);

        if (accessories.length < this.props.minSlotsCount) {
            for (var i = 0; i < (this.props.minSlotsCount - accessories.length); i++) {
                accessoryNodes.push(React.createElement(ItemAccessoryListRow, {key: accessories.length + i}));
            }
        }

        return (
            React.createElement("div", {className: "item-slots"}, 
                React.createElement("header", {className: "accessories-header"}, 
                    React.createElement("h1", null, helpers.locale("ID_WEB_PROFILE_LOADOUT_ATTACHMENTS"))
                ), 

                accessoryNodes
            )
        );
    }
});

var ItemDescription = React.createClass({displayName: 'ItemDescription',
    render: function () {
        return (
            React.createElement("table", {className: "item-details table"}, 
                React.createElement("tr", null, 
                    React.createElement("td", {className: "description"}, this.props.children)
                )
            )
        );
    }
});




var ItemDetailsAccessoryPreview = React.createClass({displayName: 'ItemDetailsAccessoryPreview',
    render: function () {
        return (
            React.createElement("div", {className: "item-details"}, 
                React.createElement("header", null, 
                    React.createElement("h1", null, helpers.locale("ID_WEB_PROFILE_LOADOUT_DESCRIPTION"))
                ), 

                React.createElement("p", {className: "description"}, helpers.locale(this.props.accessory.description))
            )
        );
    }
});


var ItemOverview = React.createClass({displayName: 'ItemOverview',
    propTypes: {
        activeAccessorySlotIndex: React.PropTypes.number
    },

    render: function () {
        if (!this.props.presetItem) {
            return React.createElement("div", {className: "item-overview column"});
        }

        var bodyNodes = [];

        var viewPresetItem = this.props.previewPresetItem ? this.props.previewPresetItem : this.props.presetItem;
        var viewItem = this.props.previewItem ? this.props.previewItem : this.props.item;

        if (this.props.item && this.props.item.accessories && this.props.item.accessories.length > 0) {
            bodyNodes.push(
                React.createElement(ItemAccessoryList, {
                    key: "accessory-list", 
                    presetItem: viewPresetItem, 
                    item: viewItem, 
                    kitIndex: this.props.kitIndex, 
                    factionIndex: this.props.factionIndex, 
                    presetIndex: this.props.presetIndex, 
                    slotIndex: this.props.slotIndex, 
                    activeAccessorySlotIndex: this.props.activeAccessorySlotIndex}
                )
            );

            if (this.props.previewAccessory) {
                bodyNodes.push(
                    React.createElement(ItemDetailsAccessoryPreview, {
                        key: "preview-accessory", 
                        accessory: this.props.previewAccessory}
                    )
                );
            } else {
                // Show Statistics
                bodyNodes.push(
                    React.createElement("header", {key: "statistics-header"}, 
                        React.createElement("h1", null, helpers.locale("ID_WEB_PROFILE_STATS_STATISTICS"))
                    )
                );

                bodyNodes.push(
                    React.createElement(ItemBars, {
                        key: "statistics-bars", 
                        weaponData: this.props.item.weaponData, 
                        diffData: viewItem.weaponData}// is either the previewItem or "selected/active" item
                    )
                );

                bodyNodes.push(
                    React.createElement(ItemDetailsStats, {
                        key: "statistics-details", 
                        weaponData: viewItem.weaponData}
                    )
                );
            }
        } else {
            if (viewItem && viewItem.description) {
                bodyNodes.push(
                    React.createElement("header", {key: "description-header"}, 
                        React.createElement("h1", null, helpers.locale("ID_WEB_PROFILE_LOADOUT_DESCRIPTION"))
                    )
                );

                bodyNodes.push(
                    React.createElement(ItemDescription, {key: "item-description"}, 
                        helpers.locale(viewItem.description)
                    )
                );
            }
        }

        var itemClasses = React.addons.classSet({
            "slot": true,
            "active": this.props.activeAccessorySlotIndex === -1
        });

        var itemImageClasses = helpers.getImageClasses(viewPresetItem.image, "size90winv");

        // First listed item
        var itemUrl = [
            "#kit",
            this.props.kitIndex,
            this.props.factionIndex,
            this.props.presetIndex,
            this.props.slotIndex,
            "-1"
        ].join('/');

        return (
            React.createElement("div", {className: "item-overview column"}, 
                React.createElement("header", null, 
                    React.createElement("h1", null, helpers.locale(this.props.slotName))
                ), 

                React.createElement("a", {href: itemUrl, className: itemClasses}, 
                    React.createElement("div", {className: "slot-info"}, 
                        React.createElement("div", {className: "slot-item-image-wrapper"}, 
                            React.createElement("div", {className: itemImageClasses})
                        ), 

                        React.createElement("div", {className: "slot-item-name full-height"}, helpers.locale(viewPresetItem.name))
                    )
                ), 

                bodyNodes
            )
        );
    }
});

module.exports = ItemOverview;