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
var VehicleSelector = require("js/../public/jsx/loadout/VehicleSelector.js");
var VehicleOverview = require("js/../public/jsx/loadout/VehicleOverview.js");
var ItemCategoryList = require("js/../public/jsx/loadout/ItemCategoryList.js");
var HeaderSpendableInfo = require("js/../public/jsx/loadout/HeaderSpendableInfo.js");

var ViewVehicles = React.createClass({
	displayName: 'ViewVehicles',
	mixins: [FluxListenerMixin(store)],

	propTypes: {
		personaId: React.PropTypes.string.isRequired,
		platform: React.PropTypes.string.isRequired
	},

	handleSaveBtnClick: function() {
		if (!this.props.isMyLoadout) {
			return;
		}

		client.saveVehicles(this.state.vehicles);
	},

	getStateFromStore: function() {
		return {
			vehicles: store.getVehicles(),
			cashBalance: store.getCashBalance(),
			vouchersCount: store.getVoucherCount(),
			hasChanged: store.vehiclesChanged
		};
	},

	componentDidMountOrUpdate: function() {
		if (!this.state.vehicles) {
			client.fetchVehicles(
				this.props.personaId,
				this.props.platform
			);
		}
	},

	componentDidMount: function() {
		this.componentDidMountOrUpdate();
	},

	componentDidUpdate: function() {
		this.componentDidMountOrUpdate();
	},


	render: function() {
		if (!this.state.vehicles) {
			return React.createElement("div", null, React.createElement(LoadingTicker, null));
		}

		var vehicle = null;
		var slotCategories = null;

		if (!_.isNull(this.props.vehicleIndex)) {
			vehicle = this.state.vehicles[this.props.vehicleIndex];

			if (!_.isNull(this.props.slotIndex)) {
				slotCategories = vehicle.slotItems[this.props.slotIndex].categories;
			}
		}

		var saveBtnNode = null;

		if (this.props.isMyLoadout) {
			if (this.state.hasChanged) {
				saveBtnNode = (
					React.createElement("button", {
						className: "btn btn-primary",
						onClick: this.handleSaveBtnClick
					}, helpers.locale("ID_WEB_LOADOUT_SAVE_VEHICLES"))
				);
			}
		}

		var activeItemId = null; // The active accessory id on the vehicle slot currently viewed

		if (!_.isNull(this.props.vehicleIndex) && !_.isNull(this.props.slotIndex)) {
			activeItemId = this.state.vehicles[this.props.vehicleIndex].slots[this.props.slotIndex].item.id;
		}

		var backLinkNode = null;

		if (helpers.isMobile() && !_.isNull(this.props.vehicleIndex)) {
			var backUrl = ['#vehicles'].join('/');
			var backText = helpers.locale("ID_WEB_LOADOUT_BACK_TO_VEHICLES_LISTING");

			if (!_.isNull(this.props.slotIndex)) {
				backUrl = [
					'#vehicles',
					this.props.vehicleIndex
				].join('/');
				backText = helpers.locale("ID_WEB_LOADOUT_BACK_TO_VEHICLE_OVERVIEW");
			}

			backLinkNode = (
				React.createElement("a", {
						className: "back-link",
						href: backUrl
					},
					backText
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
					React.createElement("h1", null, helpers.locale("ID_WEB_COMMON_VEHICLES")),

					saveBtnNode,

					React.createElement("div", {
							className: "extra"
						},
						backLinkNode,

						headerSpendableInfoNode
					)
				),

				React.createElement(VehicleSelector, {
					activeVehicleIndex: this.props.vehicleIndex,
					vehicles: this.state.vehicles
				}),

				React.createElement(VehicleOverview, {
					vehicleIndex: this.props.vehicleIndex,
					activeSlotIndex: this.props.slotIndex,
					vehicle: vehicle
				}),

				React.createElement(ItemCategoryList, {
					isMyLoadout: this.props.isMyLoadout,
					categories: slotCategories,
					vehicleIndex: this.props.vehicleIndex,
					slotIndex: this.props.slotIndex,
					activeItemId: activeItemId,
					isVehiclesView: true
				})
			)
		);
	}
});

module.exports = ViewVehicles;