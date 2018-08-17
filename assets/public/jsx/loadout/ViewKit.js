


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
var client = require("js/../public/jsx/loadout/client.js");
var store = require("js/../public/jsx/loadout/store.js");
var actions = require("js/../public/jsx/loadout/actions.js");

var FluxListenerMixin = require("js/../public/jsx/loadout/mixins/FluxListenerMixin.js");
var FetchKitMixin = require("js/../public/jsx/loadout/mixins/FetchKitMixin.js");

var LoadingTicker = require("js/../public/jsx/loadout/LoadingTicker.js");
var KitOverview = require("js/../public/jsx/loadout/KitOverview.js");
var ItemCategoryList = require("js/../public/jsx/loadout/ItemCategoryList.js");
var ItemOverview = require("js/../public/jsx/loadout/ItemOverview.js");
var HeaderSpendableInfo = require("js/../public/jsx/loadout/HeaderSpendableInfo.js");

var ViewKit = React.createClass({displayName: 'ViewKit',
    mixins: [FluxListenerMixin(store), FetchKitMixin],

    componentWillMount: function () {
        if (helpers.isMobile()) {
            // Make sure we set the faction as focused if user enters the page already in a preset (e.g. /#kit/0/1/0)
            actions.changeFocusedFaction(this.props.factionIndex);
        }
    },

    handleSaveBtnClick: function () {
        if (!this.props.isMyLoadout) { return; }

        this.setState({ changePresetName: false });

        client.saveKitPreset(
            this.props.kitIndex,
            this.props.factionIndex,
            this.props.presetIndex,
            store.getPreset(this.props.kitIndex, this.props.factionIndex, this.props.presetIndex)
        );
    },

    handleSetActiveKitBtnClick: function () {
        if (!this.props.isMyLoadout) { return; }

        client.setActiveKit(
            this.props.kitIndex,
            this.props.factionIndex
        );
    },

    handleItemMouseEnter: function (e, previewItem) {
        if (!_.isNull(this.props.slotIndex)) {
            var faction = this.state.kit.factions[this.props.factionIndex];
            var preset = faction.presets[this.props.presetIndex];
            var presetItem = preset.slots[this.props.slotIndex].item;

            if (presetItem.id !== previewItem.id) {
                this.setState({
                    previewItem: previewItem
                });
            }
        }
    },

    handleItemMouseLeave: function (e) {
        this.setState({
            previewItem: null
        });
    },

    handleAccessoryMouseEnter: function (e, accessory) {
        this.setState({
            previewAccessory: accessory
        });
    },

    handleAccessoryMouseLeave: function (e) {
        this.setState({
            previewAccessory: null
        });
    },

    handleTitleClick: function () {
        if (!this.props.isMyLoadout || this.state.changePresetName || helpers.isMobile()) { return; }

        this.setState({
            changePresetName: true,
            initialPresetName: this.state.kit.factions[this.props.factionIndex].presets[this.props.presetIndex].name
        });
    },

    handleTitleInputKeyUp: function (e) {
        if (!this.props.isMyLoadout) { return; }

        actions.changePresetName(
            this.props.kitIndex,
            this.props.factionIndex,
            this.props.presetIndex,
            this.refs["preset-name-input"].getDOMNode().value.trim()
        );

        if (e.keyCode === 13) {  // On Enter
            this.setState({changePresetName: false});
        } else if (e.keyCode === 27) {  // On Esc
            // Revert back to initial preset name
            actions.changePresetName(
                this.props.kitIndex,
                this.props.factionIndex,
                this.props.presetIndex,
                this.state.initialPresetName
            );

            this.setState({ changePresetName: false });
        }
    },

    render: function () {
        if (!this.state.kit) {
            return React.createElement("div", null, React.createElement(LoadingTicker, null));
        }

        var faction = this.state.kit.factions[this.props.factionIndex];
        var preset = faction.presets[this.props.presetIndex];

        var slotCategories = null;
        var previewPresetItem = null;
        var presetItem = null;
        var item = null;
        var itemAccessorySlotCategories = null;

        if (!_.isNull(this.props.slotIndex)) {
            var slot = faction.slots[this.props.slotIndex];
            if (slot) {
                slotCategories = slot.categories;
            }

            presetItem = preset.slots[this.props.slotIndex].item;
            item = store.getKitSlotItem(
                this.props.kitIndex,
                this.props.factionIndex,
                this.props.slotIndex,
                presetItem.id
            );

            if (this.state.previewItem) {
                previewPresetItem = store.getItemForPreset(this.state.previewItem);
            }

            if (item && !_.isNull(this.props.accessorySlotIndex) && this.props.accessorySlotIndex !== -1) {
                var itemAccessorySlot = item.accessories[this.props.accessorySlotIndex];
                if (itemAccessorySlot) {
                    itemAccessorySlotCategories = itemAccessorySlot.categories;
                }
            }
        }

        var saveBtnNode = null;
        var setActiveKitNode = null;

        if (this.props.isMyLoadout) {
            setActiveKitNode = (
                React.createElement("button", {className: "btn", onClick: this.handleSetActiveKitBtnClick}, helpers.locale("ID_WEB_LOADOUT_SET_ACTIVE_CLASS"))
            );

            if (preset.hasChanged && !helpers.isMobile()) {
                saveBtnNode = (
                    React.createElement("button", {className: "btn btn-primary", onClick: this.handleSaveBtnClick}, helpers.locale("ID_WEB_LOADOUT_SAVE_PRESET"))
                );
            }

            if (this.state.kit.isActive) {
                setActiveKitNode = React.createElement("button", {className: "btn disabled"}, helpers.locale("ID_WEB_LOADOUT_ACTIVE_CLASS_SHORT"));
            }
        }

        var locPresetName = helpers.getLocPresetName(preset.name, this.props.presetIndex);

        var titleNode = React.createElement("h1", {onClick: this.handleTitleClick}, locPresetName);

        if (this.state.changePresetName) {
            // Don't forget to update maxLenght in the store handler if you change it here
            titleNode = (
                React.createElement("input", {
                    type: "text", 
                    defaultValue: preset.name, 
                    placeholder: helpers.getLocPresetName(false, this.props.presetIndex), // Show default name as placeholder
                    onKeyUp: this.handleTitleInputKeyUp, 
                    ref: "preset-name-input", 
                    maxLength: "15", 
                    autoFocus: true}
                )
            );
        }

        var headerClasses = React.addons.classSet({
            "loadout-header": true,
            "show-badge": !_.isNull(this.props.factionIndex),
            "is-my-loadout": this.props.isMyLoadout
        });

        var iconClasses = React.addons.classSet({
            "faction-badge": true,
            "badge-cops": this.props.factionIndex === 0,
            "badge-criminals": this.props.factionIndex === 1
        });

        var itemSlotAccessory = null;  // The active accessory id on the item (slot, e.g. scope) currently viewed

        if (presetItem && presetItem.accessories && presetItem.accessories[this.props.accessorySlotIndex]) {
            itemSlotAccessory = presetItem.accessories[this.props.accessorySlotIndex].item;
        }

        var itemCategoryListNode = null;

        if (!_.isNull(itemSlotAccessory)) {  // Kit slot item attachment selection list (e.g. Optic or Muzzle)
            itemCategoryListNode = (
                React.createElement(ItemCategoryList, {
                    isMyLoadout: this.props.isMyLoadout, 
                    categories: itemAccessorySlotCategories, 
                    kitIndex: this.props.kitIndex, 
                    factionIndex: this.props.factionIndex, 
                    presetIndex: this.props.presetIndex, 
                    slotIndex: this.props.slotIndex, 
                    activeItemId: itemSlotAccessory.id, 
                    activeItem: itemSlotAccessory, 

                    accessorySlotIndex: this.props.accessorySlotIndex, 
                    isAccessoryList: true, 

                    onItemMouseEnterHandler: helpers.isMobile() ? false : this.handleAccessoryMouseEnter, 
                    onItemMouseLeaveHandler: helpers.isMobile() ? false : this.handleAccessoryMouseLeave}
                )
            );
        } else if (this.props.accessorySlotIndex === -1) {  // Kit slot item selection list (e.g. Sidearm or Gadget 2)
            itemCategoryListNode = (
                React.createElement(ItemCategoryList, {
                    isMyLoadout: this.props.isMyLoadout, 
                    categories: slotCategories, 
                    kitIndex: this.props.kitIndex, 
                    factionIndex: this.props.factionIndex, 
                    presetIndex: this.props.presetIndex, 
                    slotIndex: this.props.slotIndex, 
                    activeItemId: presetItem ? presetItem.id : null, 
                    activeItem: item ? item : null, 

                    onItemMouseEnterHandler: helpers.isMobile() ? false : this.handleItemMouseEnter, 
                    onItemMouseLeaveHandler: helpers.isMobile() ? false : this.handleItemMouseLeave}
                 )
            );
        }

        var headerSpendableInfoNode = null;
        if (this.props.isMyLoadout) {
            headerSpendableInfoNode = (
                React.createElement(HeaderSpendableInfo, {
                    cashBalance: this.state.cashBalance, 
                    vouchersCount: this.state.vouchersCount}
                )
            );
        }

        var backUrl = ['#kit', this.props.kitIndex, 'presets'].join('/');
        var backText = helpers.locale("ID_WEB_LOADOUT_BACK_TO_PRESETS");
        if (helpers.isMobile()) {
            if (!_.isNull(this.props.accessorySlotIndex) && item && item.accessories && item.accessories.length > 0) {
                backUrl = [
                    '#kit',
                    this.props.kitIndex,
                    this.props.factionIndex,
                    this.props.presetIndex,
                    this.props.slotIndex
                ].join('/');
                backText = helpers.locale("ID_WEB_LOADOUT_BACK_TO_ITEM_OVERVIEW");
            } else if (!_.isNull(this.props.slotIndex)) {
                backUrl = [
                    '#kit',
                    this.props.kitIndex,
                    this.props.factionIndex,
                    this.props.presetIndex
                ].join('/');
                backText = helpers.locale("ID_WEB_LOADOUT_BACK_TO_KIT_OVERVIEW");
            }
        }

        return (
            React.createElement("div", {className: "loadout-columns"}, 
                React.createElement("header", {className: headerClasses}, 
                    React.createElement("div", {className: iconClasses}), 

                    titleNode, 

                    React.createElement("div", {className: "action-buttons"}, 
                        setActiveKitNode, 
                        saveBtnNode
                    ), 


                    React.createElement("div", {className: "extra"}, 
                        React.createElement("a", {className: "back-link", href: backUrl}, 
                            backText
                        ), 

                        headerSpendableInfoNode
                    )
                ), 

                React.createElement(KitOverview, {
                    preset: preset, 
                    kitIndex: this.props.kitIndex, 
                    factionIndex: this.props.factionIndex, 
                    presetIndex: this.props.presetIndex, 
                    activeSlotIndex: parseInt(this.props.slotIndex, 10)}
                ), 

                React.createElement(ItemOverview, {
                    slotName: !_.isNull(this.props.slotIndex) ? preset.slots[this.props.slotIndex].name : null, 
                    presetItem: presetItem, 
                    item: item, 
                    previewPresetItem: previewPresetItem ? previewPresetItem : null, 
                    previewItem: this.state.previewItem ? this.state.previewItem : null, 
                    previewAccessory: this.state.previewAccessory ? this.state.previewAccessory : null, 
                    kitIndex: this.props.kitIndex, 
                    factionIndex: this.props.factionIndex, 
                    presetIndex: this.props.presetIndex, 
                    slotIndex: this.props.slotIndex, 
                    activeAccessorySlotIndex: this.props.accessorySlotIndex}
                ), 

                itemCategoryListNode
            )
        );
    }
});

module.exports = ViewKit;