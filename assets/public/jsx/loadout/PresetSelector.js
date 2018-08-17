


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
var store = require("js/../public/jsx/loadout/store.js");
var actions = require("js/../public/jsx/loadout/actions.js");
var client = require("js/../public/jsx/loadout/client.js");

var PresetSlot = React.createClass({displayName: 'PresetSlot',
    render: function () {
        var isAppearanceSlot = this.props.item.image.category.indexOf("appearance") === 0;

        var imageClasses;
        if (this.props.slotIndex === 0 || this.props.slotIndex === 1) {
            imageClasses = helpers.getImageClasses(this.props.item.image, "mediuminv");
        } else if (isAppearanceSlot) {
            imageClasses = helpers.getImageClasses(this.props.item.image, "xxsmall");
        } else {
            imageClasses = helpers.getImageClasses(this.props.item.image, "smallinv");
        }

        return (
            React.createElement("div", {className: "slot"}, 
                React.createElement("div", {className: "slot-item-image-wrapper"}, 
                    React.createElement("div", {className: imageClasses})
                )
            )
        );
    }
});


var Preset = React.createClass({displayName: 'Preset',
    handleSetActivePresetBtnClick: function () {
        client.setActiveKitPreset(
            this.props.kitIndex,
            this.props.factionIndex,
            this.props.presetIndex
        );
    },

    handleSaveBtnClick: function () {
        client.saveKitPreset(
            this.props.kitIndex,
            this.props.factionIndex,
            this.props.presetIndex,
            store.getPreset(this.props.kitIndex, this.props.factionIndex, this.props.presetIndex)
        );
    },

    render: function () {
        var rowNodes = [];

        _.each(this.props.preset.slots, function (slot, i) {
            rowNodes.push(
                React.createElement(PresetSlot, {
                    item: slot.item, 
                    slotName: slot.name, 
                    slotIndex: i, 
                    key: i}
                )
            );
        }, this);

        var url = [
            "#kit",
            this.props.kitIndex,
            this.props.factionIndex,
            this.props.presetIndex
        ].join('/');

        var setActivePresetNode = null;

        if (this.props.isMyLoadout) {
            setActivePresetNode = (
                React.createElement("button", {className: "btn btn-tiny btn-primary", onClick: this.handleSetActivePresetBtnClick}, 
                    helpers.locale("ID_WEB_LOADOUT_EQUIP")
                )
            );
        }

        if (this.props.preset.isActive) {
            setActivePresetNode = (
                React.createElement("button", {className: "btn btn-tiny disabled"}, 
                    helpers.locale("ID_WEB_LOADOUT_EQUIPPED")
                )
            );
        }

        var classes = React.addons.classSet({
            "box": true,
            "preset-preview": true,
            "changed": this.props.preset.hasChanged
        });

        var changedInfoNode = null;

        if (this.props.preset.hasChanged) {
            changedInfoNode = (
                React.createElement("div", {className: "preset-updated"}, 
                    React.createElement("p", null, helpers.locale("ID_WEB_LOADOUT_PRESET_UPDATED")), 
                    React.createElement("button", {className: "btn btn-tiny btn-primary", onClick: this.handleSaveBtnClick}, 
                        helpers.locale("ID_WEB_LOADOUT_SAVE_PRESET")
                    )
                )
            );
        }

        var iconClasses = React.addons.classSet({
            "faction-badge": true,
            "badge-cops": this.props.factionIndex === 0,
            "badge-criminals": this.props.factionIndex === 1
        });

        return (
            React.createElement("div", {className: classes}, 
                React.createElement("header", null, 
                    React.createElement("div", {className: iconClasses}), 
                    React.createElement("h1", null, helpers.getLocPresetName(this.props.preset.name, this.props.presetIndex)), 
                    setActivePresetNode
                ), 

                changedInfoNode, 

                React.createElement("a", {href: url, className: "preset-link"}, 
                    rowNodes
                )
            )
        );
    }
});

var PresetLocked = React.createClass({displayName: 'PresetLocked',
    render: function () {
        var isPremium = this.props.preset.lock.source === "premium_battlepack";

        var contentNode = React.createElement("p", {className: "generic-lock"}, helpers.locale("ID_WEB_LOADOUT_PRESET_LOCKED_REASON_GENERIC"));

        if (this.props.preset.lock.source === "battlepack") {
            contentNode = React.createElement("p", {className: "generic-lock"}, helpers.locale("ID_WEB_LOADOUT_PRESET_LOCKED_REASON_BATTLEPACK"));
        } else if (isPremium) {
            contentNode = React.createElement("p", {className: "generic-lock"}, helpers.locale("ID_WEB_LOADOUT_PRESET_LOCKED_REASON_PREMIUM_BATTLEPACK"));
        } else if (this.props.preset.lock.source === "stats") {
            var actualValue = this.props.preset.lock.currentValue;
            var valueNeeded = this.props.preset.lock.value;

            var progressStyle = {
                width: Math.floor((actualValue / valueNeeded) * 100) + "%"
            };

            contentNode = (
                React.createElement("div", {className: "score-lock"}, 
                    React.createElement("p", null, helpers.locale("ID_WEB_LOADOUT_PRESET_LOCKED_REASON_STATS")), 

                    React.createElement("div", {className: "progress-bar medium no-border clearfix"}, 
                        React.createElement("div", {className: "progress-bar-inner", style: progressStyle})
                    ), 

                    React.createElement("p", {className: "progress-details"}, 
                        helpers.numberformat(actualValue) + " / " + helpers.numberformat(valueNeeded)
                    )
                )
            );
        }

        var classes = React.addons.classSet({
            "box": true,
            "preset-preview": true,
            "preset-locked": true,
            "premium-lock": isPremium
        });

        var iconClasses = React.addons.classSet({
            "faction-badge": true,
            "badge-cops": this.props.factionIndex === 0,
            "badge-criminals": this.props.factionIndex === 1
        });

        return (
            React.createElement("div", {className: classes}, 
                React.createElement("header", null, 
                    React.createElement("div", {className: iconClasses}), 
                    React.createElement("h1", null, helpers.getLocPresetName(this.props.preset.name, this.props.presetIndex))
                ), 

                contentNode
            )
        );
    }
});


var Faction = React.createClass({displayName: 'Faction',
    render: function () {
        var presetNodes = [];

        _.each(this.props.faction.presets, function (preset, i) {
            if (preset.lock) {
                presetNodes.push(
                    React.createElement(PresetLocked, {
                        key: i, 
                        presetIndex: i, 
                        factionIndex: this.props.factionIndex, 
                        preset: preset})
                );
            } else {
                presetNodes.push(
                    React.createElement(Preset, {
                        key: i, 
                        isMyLoadout: this.props.isMyLoadout, 
                        presetIndex: i, 
                        kitIndex: this.props.kitIndex, 
                        factionIndex: this.props.factionIndex, 
                        preset: preset})
                );
            }
        }, this);

        // Sorting... Show unlocked first, unlocked by score second and battlepack opened last
        var unlockedPresetNodes = presetNodes.filter(function (node) {
            return !node.props.preset.lock;
        }).sort(function (a, b) {
            return a.props.presetIndex - b.props.presetIndex;
        });

        var statsLockedPresetNodes = presetNodes.filter(function (node) {
            return node.props.preset.lock && node.props.preset.lock.source === 'stats';
        }).sort(function (a, b) {
            return a.props.preset.lock.valueNeeded - b.props.preset.lock.valueNeeded;
        });

        var bpLockedPresetNodes = presetNodes.filter(function (node) {
            return node.props.preset.lock && (node.props.preset.lock.source === 'battlepack' ||
                node.props.preset.lock.source === 'premium_battlepack');
        }).sort(function (a, b) {
            return a.props.presetIndex - b.props.presetIndex;
        });

        var factionLocale = {
            ID_WEB_FACTION_COPS: helpers.locale("ID_WEB_FACTION_COPS"),
            ID_WEB_FACTION_CRIMINALS: helpers.locale("ID_WEB_FACTION_CRIM")
        };

        return (
            React.createElement("div", {className: "faction-container"}, 
                unlockedPresetNodes, 
                statsLockedPresetNodes, 
                bpLockedPresetNodes
            )
        );
    }
});

var PresetSelector = React.createClass({displayName: 'PresetSelector',
    render: function () {
        var factionNodes = [];

        var focusedFactionIsSet = !_.isNull(this.props.focusedFaction);

        _.each(this.props.kit.factions, function (faction, i) {
            if (helpers.isMobile() && !focusedFactionIsSet) {
                return;
            }

            if (focusedFactionIsSet && i !== this.props.focusedFaction) {
                return;
            }

            factionNodes.push(
                React.createElement(Faction, {
                    key: i, 
                    isMyLoadout: this.props.isMyLoadout, 
                    factionIndex: i, 
                    kitIndex: this.props.kit.index, 
                    faction: faction}
                )
            );
        }, this);

        var classes = React.addons.classSet({
            "preset-selector": true,
            "focused-faction": focusedFactionIsSet
        });

        return (
            React.createElement("section", {className: classes}, 
                factionNodes
            )
        );
    }
});

module.exports = PresetSelector;