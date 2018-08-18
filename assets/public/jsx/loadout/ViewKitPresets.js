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
var PresetSelector = require("js/../public/jsx/loadout/PresetSelector.js");
var HeaderSpendableInfo = require("js/../public/jsx/loadout/HeaderSpendableInfo.js");

var ViewKitPresets = React.createClass({
	displayName: 'ViewKitPresets',
	mixins: [FluxListenerMixin(store), FetchKitMixin],

	handleSetActiveKitBtnClick: function() {
		client.setActiveKit(this.props.kitIndex);
	},

	handleResetBtnClick: function() {
		actions.reset();
	},

	handleFocusFactionSelect: function(faction) {
		actions.changeFocusedFaction(faction);
	},

	render: function() {
		if (!this.state.kit) {
			return (
				React.createElement("div", null,
					React.createElement(LoadingTicker, null)
				)
			);
		}

		var resetBtnNode = null;
		var setActiveKitNode = null;

		if (this.props.isMyLoadout) {
			setActiveKitNode = React.createElement("button", {
				className: "btn",
				onClick: this.handleSetActiveKitBtnClick
			}, helpers.locale("ID_WEB_LOADOUT_SET_ACTIVE_CLASS"));

			if (this.state.kit.isActive) {
				setActiveKitNode = React.createElement("button", {
					className: "btn disabled"
				}, helpers.locale("ID_WEB_LOADOUT_ACTIVE_CLASS_SHORT"));
			}
		}

		var isAnyPresetChanged = false;
		for (var i = 0; i < this.state.kit.factions.length; i++) {
			for (var j = 0; j < this.state.kit.factions[i].presets.length; j++) {
				var preset = this.state.kit.factions[i].presets[j];

				if (preset.hasChanged) {
					isAnyPresetChanged = true;
					break;
				}
			}

			if (isAnyPresetChanged) {
				break;
			}
		}

		if (isAnyPresetChanged) {
			resetBtnNode = (
				React.createElement("button", {
					className: "btn",
					onClick: this.handleResetBtnClick
				}, helpers.locale("ID_WEB_COMMON_BUTTON_RESET"))
			);
		}

		var focusFactionNode = null;

		if (helpers.isMobile()) {
			var copsClasses = React.addons.classSet({
				"faction-badge": true,
				"badge-cops": true,
				"active": this.state.focusedFaction === 0
			});

			var criminalsClasses = React.addons.classSet({
				"faction-badge": true,
				"badge-criminals": true,
				"active": this.state.focusedFaction === 1
			});

			focusFactionNode = (
				React.createElement("div", {
						className: "focus-faction-selector"
					},
					React.createElement("div", {
						className: copsClasses,
						onClick: this.handleFocusFactionSelect.bind(this, 0)
					}),

					React.createElement("div", {
						className: criminalsClasses,
						onClick: this.handleFocusFactionSelect.bind(this, 1)
					})
				)
			);
		}

		var headerSpendableInfoNode = null;
		if (this.props.isMyLoadout) {
			headerSpendableInfoNode = (
				React.createElement(HeaderSpendableInfo, {
					cashBalance: this.state.cashBalance,
					vouchersCount: this.state.vouchersCount
				})
			);
		}

		return (
			React.createElement("div", {
					className: "loadout-columns"
				},
				React.createElement("header", {
						className: "loadout-header"
					},
					React.createElement("h1", null, helpers.locale("ID_WEB_LOADOUT_PRESETS_HEADER")),

					setActiveKitNode,
					resetBtnNode,

					React.createElement("div", {
							className: "extra"
						},
						headerSpendableInfoNode
					)
				),

				focusFactionNode,

				React.createElement(PresetSelector, {
					isMyLoadout: this.props.isMyLoadout,
					kit: this.state.kit,
					focusedFaction: this.state.focusedFaction
				})
			)
		);
	}
});

module.exports = ViewKitPresets;