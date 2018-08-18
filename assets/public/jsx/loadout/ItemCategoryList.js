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
var store = require("js/../public/jsx/loadout/store.js");
var client = require("js/../public/jsx/loadout/client.js");

var Item = React.createClass({
	displayName: 'Item',
	statics: {
		getState: function(props) {
			var lock = props.item.lock;

			var missingLicense = lock && lock.source === 'license';
			var missingWeaponLicense = lock && lock.source === 'weapon_license';
			var purchaseGateLocked = lock && lock.source === 'purchase_gate';
			var battlepackLocked = lock && lock.source === 'license' && !lock.price;
			var awardLocked = lock && lock.source === 'award';
			var weaponLocked = lock && lock.source === 'weapon'; // You need an amount of kills with this weapon to unlock

			var isCompatible = true;
			var isLocked = typeof props.item.lock === 'object';
			var isBuyable = isLocked && (lock.isVoucherRedeemable || !!lock.price);
			var isActive = props.item.id === props.activeItemId;
			var isBuyDisabled = true;
			var lockReasonText = null;

			if (isBuyable) {
				if ((!lock.gate && lock.isCashAffordable) || lock.isVoucherRedeemable) {
					isBuyDisabled = false;
				}
			}

			if (!isActive && !props.isVehiclesView) {
				if (props.isAccessoryList) {
					isCompatible = store.isAccessoryCompatibleOnSlotItem(
						props.kitIndex,
						props.factionIndex,
						props.presetIndex,
						props.slotIndex,
						props.item
					);
				} else {
					isCompatible = store.isItemCompatibleInPreset(
						props.kitIndex,
						props.factionIndex,
						props.presetIndex,
						props.slotIndex,
						props.item
					);
				}
			}

			if (lock) {
				if (props.isVehiclesView) {
					if (lock.gate) {
						lockReasonText = helpers.locale("ID_WEB_LOADOUT_NOT_ENOUGH_SCORE_X_Y").replace(
							"[X]", helpers.numberformat(lock.gate.valueAcquired)
						).replace(
							"[Y]", helpers.numberformat(lock.gate.valueNeeded)
						);
					}
				} else {
					if (missingWeaponLicense && lock.gate && lock.gate.actualValue < lock.gate.valueNeeded) {
						lockReasonText = helpers.locale("ID_WEB_PROFILE_LOADOUT_KILLS_WITH_OPPOSITE_FACTION").replace(
							"[X]", helpers.numberformat(lock.gate.actualValue)
						).replace(
							"[Y]", helpers.numberformat(lock.gate.valueNeeded)
						);
					} else if (battlepackLocked) {
						lockReasonText = helpers.locale("ID_WEB_PROFILE_LOADOUT_UNLOCK_WITH_BATTLEPACK");
					} else if (awardLocked && lock.gate) {
						lockReasonText = helpers.locale("ID_WEB_PROFILE_LOADOUT_UNLOCK_WITH_AWARD").replace(
							"[AWARD_NAME]", helpers.locale(lock.gate.name)
						);
					} else if (weaponLocked && lock.gate) {
						lockReasonText = helpers.locale("ID_WEB_LOADOUT_NOT_ENOUGH_KILLS").replace(
							"[X]", helpers.numberformat(lock.gate.actualValue)
						).replace(
							"[Y]", helpers.numberformat(lock.gate.valueNeeded)
						);
					} else if (purchaseGateLocked && lock.gate) {
						var localeString = "";

						if (lock.gate.valueUnit === 'score') {
							localeString = helpers.locale("ID_WEB_LOADOUT_NOT_ENOUGH_SCORE_X_Y");
						} else if (lock.gate.valueUnit === 'kills') {
							localeString = helpers.locale("ID_WEB_LOADOUT_NOT_ENOUGH_KILLS");
						}

						lockReasonText = localeString.replace(
							"[X]", helpers.numberformat(lock.gate.valueAcquired)
						).replace(
							"[Y]", helpers.numberformat(lock.gate.valueNeeded)
						);
					}
				}
			} else if (!isCompatible) {
				lockReasonText = helpers.locale("ID_WEB_LOADOUT_INCOMPATIBLE_LONG_DESC");
			}

			return {
				isLocked: isLocked,
				isCompatible: isCompatible,
				isBuyable: isBuyable,
				isBuyDisabled: isBuyDisabled,
				isActive: isActive,
				lockReasonText: lockReasonText,

				missingLicense: missingLicense,
				missingWeaponLicense: missingWeaponLicense,
				purchaseGateLocked: purchaseGateLocked,
				battlepackLocked: battlepackLocked,
				awardLocked: awardLocked,
				weaponLocked: weaponLocked
			}
		}
	},

	propagateOnMouseEnter: function(e) {
		if (!this.props.onItemMouseEnterHandler) {
			return;
		}
		this.props.onItemMouseEnterHandler(e, this.props.item);
	},

	propagateOnMouseLeave: function(e) {
		if (!this.props.onItemMouseLeaveHandler) {
			return;
		}
		this.props.onItemMouseLeaveHandler(e);
	},

	handleBuyButtonClick: function() {
		if (!this.state.isBuyDisabled) {
			var self = this;

			helpers.spawnBuyDialog(this.props.item, function(currency, itemId) {
				client.buyItem(currency, itemId, function() {
					self.handleLinkClick();
				});
			});
		}
	},

	handleLinkClick: function(e) {
		if (!this.props.isMyLoadout) {
			return;
		}

		var isSelectable = !this.state.isLocked && this.state.isCompatible && !this.state.isActive;

		var data = null;

		if (helpers.isMobile()) {
			data = {
				item: this.props.item,
				lockReasonText: this.state.lockReasonText,
				isSelectable: isSelectable,
				isBuyable: this.state.isBuyable,
				isCompatible: this.state.isCompatible,
				diffItem: this.props.activeItem,
				kitIndex: this.props.kitIndex,
				factionIndex: this.props.factionIndex,
				presetIndex: this.props.presetIndex
			};
		}

		if (this.props.isVehiclesView) {
			helpers.interfereSelectVehicleItem(data, (function() {
				if (isSelectable || helpers.isMobile()) {
					actions.selectVehicleItem(
						this.props.vehicleIndex,
						this.props.slotIndex,
						this.props.item
					);
				}
			}).bind(this));
		} else if (this.props.isAccessoryList) {
			helpers.interfereSelectKitAccessory(data, (function() {
				if (isSelectable || helpers.isMobile()) {
					actions.selectKitAccessory(
						this.props.kitIndex,
						this.props.factionIndex,
						this.props.presetIndex,
						this.props.slotIndex,
						this.props.accessorySlotIndex,
						this.props.item
					);
				}
			}).bind(this));
		} else {
			helpers.interfereSelectKitItem(data, (function() {
				if (isSelectable || helpers.isMobile()) {
					actions.selectKitItem(
						this.props.kitIndex,
						this.props.factionIndex,
						this.props.presetIndex,
						this.props.slotIndex,
						this.props.item
					);
				}
			}).bind(this));
		}
	},

	getInitialState: function() {
		return Item.getState(this.props);
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState(Item.getState(nextProps));
	},

	render: function() {
		var purchaseButton = null;
		var priceText = null;
		var lockTooltipText = this.state.lockReasonText;

		if (this.state.isLocked && this.props.isMyLoadout) {
			if (this.state.isBuyable) {
				var purchaseButtonClasses = React.addons.classSet({
					"btn": true,
					"btn-primary": true,
					"btn-tiny": true,
					"buy-button": true,
					"disabled": this.state.isBuyDisabled
				});

				var voucherAvailableNode = null;

				if (this.props.item.lock.isVoucherRedeemable) {
					voucherAvailableNode = React.createElement("div", {
						className: "voucher-available"
					});
				}

				purchaseButton = (
					// Do not use disabled attr, tooltip won't work
					React.createElement("button", {
							className: purchaseButtonClasses,
							onClick: helpers.isMobile() ? null : this.handleBuyButtonClick
						},
						voucherAvailableNode,
						helpers.locale("ID_WEB_JOINFLOW_BUTTON_BUY")
					)
				);

				if (this.props.item.lock.price) {
					var priceClasses = React.addons.classSet({
						"price": true,
						"insufficient-funds": !this.props.item.lock.isCashAffordable
					});
					var price = helpers.locCurrency(
						this.props.item.lock.price,
						"$"
					);
					priceText = (
						React.createElement("span", {
								className: priceClasses
							},
							price
						)
					);
				}
			}
		}

		var itemClasses = React.addons.classSet({
			"item": true,
			"buyable": this.state.isBuyable,
			"locked": this.state.isLocked,
			"incompatible": !this.state.isCompatible,
			"active": this.state.isActive,

			"missing-license": this.state.missingLicense,
			"missing-weapon-license": this.state.missingWeaponLicense,

			"purchase-gate-locked": this.state.purchaseGateLocked,
			"battlepack-locked": this.state.battlepackLocked,
			"award-locked": this.state.awardLocked,
			"weapon-locked": this.state.weaponLocked
		});

		var imageClasses = helpers.getImageClasses(this.props.item.image, "size90winv");

		return (
			React.createElement("div", {
					className: itemClasses,
					onMouseEnter: this.propagateOnMouseEnter,
					onMouseLeave: this.propagateOnMouseLeave
				},
				React.createElement("div", {
						className: "item-link",
						onClick: this.handleLinkClick
					},
					React.createElement("div", {
							className: "item-image-wrapper"
						},
						React.createElement("div", {
							className: imageClasses
						}),
						React.createElement("div", {
							className: "lock-icon",
							'data-tooltip': helpers.isMobile() ? null : lockTooltipText
						}),
						React.createElement("div", {
							className: "incompatible-icon",
							'data-tooltip': helpers.locale("ID_WEB_LOADOUT_INCOMPATIBLE_LONG_DESC")
						})
					),

					React.createElement("div", {
							className: "item-info"
						},
						React.createElement("span", null,
							helpers.locale(this.props.item.name)
						),

						priceText
					),

					purchaseButton
				)
			)
		);
	}
});

var ItemCategory = React.createClass({
	displayName: 'ItemCategory',
	render: function() {
		var itemNodes = [];

		_.each(this.props.category.items, function(item, i) {

			itemNodes.push(
				React.createElement(Item, {
					isMyLoadout: this.props.isMyLoadout,
					vehicleIndex: this.props.vehicleIndex,
					kitIndex: this.props.kitIndex,
					factionIndex: this.props.factionIndex,
					presetIndex: this.props.presetIndex,
					slotIndex: this.props.slotIndex,
					accessorySlotIndex: this.props.accessorySlotIndex,
					isAccessoryList: this.props.isAccessoryList,
					isVehiclesView: this.props.isVehiclesView,
					onItemMouseEnterHandler: this.props.onItemMouseEnterHandler,
					onItemMouseLeaveHandler: this.props.onItemMouseLeaveHandler,
					activeItemId: this.props.activeItemId,
					activeItem: this.props.activeItem,
					item: item,
					key: item.id
				})
			);
		}, this);

		return (
			React.createElement("div", {
					className: "category"
				},
				React.createElement("header", null, React.createElement("h1", null, helpers.locale(this.props.category.name))),

				itemNodes
			)
		);
	}
});

var ItemCategoryList = React.createClass({
	displayName: 'ItemCategoryList',
	render: function() {
		var categoryNodes = [];

		if (this.props.categories) {
			_.each(this.props.categories, function(category, i) {
				categoryNodes.push(
					React.createElement(ItemCategory, {
						isMyLoadout: this.props.isMyLoadout,
						vehicleIndex: this.props.vehicleIndex,
						kitIndex: this.props.kitIndex,
						factionIndex: this.props.factionIndex,
						presetIndex: this.props.presetIndex,
						slotIndex: this.props.slotIndex,
						accessorySlotIndex: this.props.accessorySlotIndex,
						isAccessoryList: this.props.isAccessoryList,
						isVehiclesView: this.props.isVehiclesView,
						onItemMouseEnterHandler: this.props.onItemMouseEnterHandler,
						onItemMouseLeaveHandler: this.props.onItemMouseLeaveHandler,
						activeItemId: this.props.activeItemId,
						activeItem: this.props.activeItem,
						category: category,
						key: i
					})
				);
			}, this);
		}

		var classes = React.addons.classSet({
			"item-category-list": true,
			"column": true,
			"omega": true,
			"accessory-list": this.props.isAccessoryList
		});

		return (
			React.createElement("div", {
					className: classes
				},
				categoryNodes
			)
		);
	}
});

module.exports = ItemCategoryList;