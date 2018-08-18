// ===============================================================
// WATCH OUT! THIS FILE IS COPIED FROM THE BFA LOADOUT 
// PLEASE CHANGE THE BFA LOADOUT AND RUN THE PIPELINE (omaha_loaduout_import.py ) INSTEAD OF EDITING HERE...
// Also note that files in loadoutmobile/ will be copied last and overwriting BFA loadout content...
// ===============================================================






// 

// ^^ You did read that right?


var Reflux = require("reflux");
var helpers = require("js/../public/jsx/loadout/helpers.js");
var actions = require("js/../public/jsx/loadout/actions.js");

function _findInCategoryList(categoryList, params) {
	return _.findWhere(_.flatten(_.pluck(categoryList, "items")), params);
}

function getPresetHash(preset) {
	var p = [preset.name, [],
		[]
	]; // name, kit items, item attachments

	_.each(preset.slots, function(slot) {
		var itemId = parseInt(slot.item.id, 10);

		p[1].push(itemId);

		if (slot.item.accessories) {
			_.each(slot.item.accessories, function(accessory) {
				var accessoryId = parseInt(accessory.item.id, 10);

				p[2].push(accessoryId);
			});
		}
	});

	p[1].sort();
	p[2].sort();

	return helpers.encodeJSON(p);
}

module.exports = Reflux.createStore({
	init: function() {
		this._setDefaults();

		this.focusedFaction = null; // Which faction should be focused in presets view (null = both)
		// Currently only for mobile where only one faction is shown at one time

		this.cashBalance = 0;
		this.voucherCount = 0;

		this.listenTo(actions.reset, this.handleReset);
		this.listenTo(actions.receivedKitData, this.handleReceivedKitData);
		this.listenTo(actions.receivedVehiclesData, this.handleReceivedVehiclesData);
		this.listenTo(actions.selectKitItem, this.handleSelectKitItem);
		this.listenTo(actions.selectKitAccessory, this.handleSelectKitAccessory);
		this.listenTo(actions.selectVehicleItem, this.handleSelectVehicleItem);
		this.listenTo(actions.kitPresetSaved, this.handleKitPresetSaved);
		this.listenTo(actions.vehiclesSaved, this.handleVehiclesSaved);
		this.listenTo(actions.changePresetName, this.handleChangePresetName);
		this.listenTo(actions.setActivePreset, this.handleSetActivePreset);
		this.listenTo(actions.setActiveKit, this.handleSetActiveKit);
		this.listenTo(actions.itemPurchased, this.handleItemPurchased);
		this.listenTo(actions.cashBalanceUpdated, this.handleCashBalanceUpdated);
		this.listenTo(actions.voucherCountUpdated, this.handleVoucherCountUpdated);
		this.listenTo(actions.changeFocusedFaction, this.handleChangeFocusedFaction);
	},

	_setDefaults: function() {
		this.kits = [];
		this.vehicles = [];
		this.vehiclesChanged = false;
	},

	getKit: function(kitIndex) {
		var kit = this.kits[kitIndex];
		return kit ? kit : null;
	},

	_setKit: function(kitIndex, data) {

		if (typeof(this.kits) == "undefined" || !this.kits[kitIndex]) {
			this.kits[kitIndex] = data;
		} else {
			_.each(this.kits[kitIndex].factions, function(faction, factionIndex) {
				// Update the items available
				faction.slots = data.factions[factionIndex].slots;

				_.each(faction.presets, function(preset, presetIndex) {
					if (preset.hasChanged) {
						// Don't write over the preset which includes items the user has selected to save

						// TODO: Set a prop on the preset that says it differes from the one received from the game (then show it to the user)

						//// See if the received loadout matches the ones received. If not, show Save and Reset button
						//var curPresetHash = getPresetHash(preset);
						//var recPreset = data.factions[factionIndex].presets[presetIndex];
						//var recPresetHash = getPresetHash(recPreset);
						//if (curPresetHash !== recPresetHash) {
						//    preset.hasChanged = true;
						//}
					} else {
						// No changes has been made to this preset, write over it
						faction.presets[presetIndex] = data.factions[factionIndex].presets[presetIndex];
					}
				});
			});
		}
	},

	getVehicles: function() {
		return this.vehicles && this.vehicles.length > 0 ? this.vehicles : null;
	},

	_setVehicles: function(data) {
		this.vehicles = data;
	},

	getPreset: function(kitIndex, factionIndex, presetIndex) {
		return this.kits[kitIndex].factions[factionIndex].presets[presetIndex];
	},

	setCashBalance: function(cash) {
		this.cashBalance = parseInt(cash, 10);
	},

	getCashBalance: function() {
		return this.cashBalance;
	},

	setVoucherCount: function(voucherCount) {
		this.voucherCount = parseInt(voucherCount, 10);
	},

	getVoucherCount: function() {
		return this.voucherCount;
	},

	getFocusedFaction: function() {
		return this.focusedFaction;
	},

	setFocusedFaction: function(faction) {
		this.focusedFaction = _.isNull(faction) ? null : parseInt(faction, 10);
	},

	// Handlers
	handleReset: function() {
		this._setDefaults();
		this.trigger();
	},

	handleReceivedKitData: function(data) {
		this._setKit(data.index, data);
		this.trigger();
	},

	handleReceivedVehiclesData: function(data) {
		this._setVehicles(data);

		this.vehiclesChanged = false;

		this.trigger();
	},

	handleSelectVehicleItem: function(vehicleIndex, slotIndex, item) {
		var activeItem = this.vehicles[vehicleIndex].slots[slotIndex].item;

		var itemId = parseInt(item.id, 10);
		var activeItemId = parseInt(activeItem.id, 10);

		if (activeItemId === itemId) {
			return;
		}

		activeItem.id = item.id;
		activeItem.name = item.name;
		activeItem.image.slug = item.image.slug;
		activeItem.image.category = item.image.category;

		this.vehiclesChanged = true;

		this.trigger();
	},

	handleSelectKitItem: function(kitIndex, factionIndex, presetIndex, slotIndex, item) {
		var preset = this.kits[kitIndex].factions[factionIndex].presets[presetIndex];
		var slot = preset.slots[slotIndex];

		var itemId = parseInt(item.id, 10);
		var activeItemId = parseInt(slot.item.id, 10);

		if (activeItemId === itemId) {
			return;
		}

		preset.hasChanged = true;

		slot.item = this.getItemForPreset(item);

		this.trigger();
	},

	handleSelectKitAccessory: function(kitIndex, factionIndex, presetIndex, slotIndex, accessorySlotIndex, accessory) {
		var preset = this.kits[kitIndex].factions[factionIndex].presets[presetIndex];
		var activeItem = preset.slots[slotIndex].item;
		var activeAccessory = activeItem.accessories[accessorySlotIndex].item;

		var accessoryId = parseInt(accessory.id, 10);
		var activeAccessoryId = parseInt(activeAccessory.id, 10);

		if (activeAccessoryId === accessoryId) {
			return;
		}

		preset.hasChanged = true;

		activeItem.accessories[accessorySlotIndex].item = {
			id: accessory.id,
			name: accessory.name,
			image: {
				slug: accessory.image.slug,
				category: accessory.image.category,
				url: accessory.image.url
			}
		};

		this.trigger();
	},

	handleChangePresetName: function(kitIndex, factionIndex, presetIndex, newName) {
		var preset = this.kits[kitIndex].factions[factionIndex].presets[presetIndex];

		preset.name = newName.substring(0, 15);
		preset.hasChanged = true;

		this.trigger();
	},

	handleSetActivePreset: function(kitIndex, factionIndex, presetIndex) {
		presetIndex = parseInt(presetIndex, 10);

		var presets = this.kits[kitIndex].factions[factionIndex].presets;

		for (var i = 0; i < presets.length; i++) {
			var preset = presets[i];
			preset.isActive = i === presetIndex;
		}

		this.trigger();
	},

	handleSetActiveKit: function(kitIndex) {
		kitIndex = parseInt(kitIndex, 10);

		for (var i = 0; i < this.kits.length; i++) {
			var kit = this.kits[i];
			if (!kit) {
				continue;
			} // Kit has not yet been fetched

			kit.isActive = i === kitIndex;
		}

		this.trigger();
	},

	handleKitPresetSaved: function(data) {
		var preset = this.kits[data.kitIndex].factions[data.factionIndex].presets[data.presetIndex];
		preset.hasChanged = false;

		this.trigger();
	},

	handleVehiclesSaved: function() {
		this.vehiclesChanged = false;

		this.trigger();
	},

	handleItemPurchased: function(itemId) {
		itemId = parseInt(itemId, 10);

		this._walkItems(itemId, function(item) {
			if (item.lock) {
				delete item.lock;
			}
		});

		this.trigger();
		actions.itemPurchased.completed();
	},

	handleCashBalanceUpdated: function(newCashBalance) {
		newCashBalance = parseInt(newCashBalance, 10);

		this.setCashBalance(newCashBalance);

		this._walkItems(null, function(item) {
			if (item.lock && item.lock.price) {
				item.lock.isCashAffordable = newCashBalance >= item.lock.price;
			}
		});

		this.trigger();
	},

	handleVoucherCountUpdated: function(newVoucherCount) {
		newVoucherCount = parseInt(newVoucherCount, 10);
		this.setVoucherCount(newVoucherCount);

		this.trigger();
	},

	handleChangeFocusedFaction: function(faction) {
		this.setFocusedFaction(faction);

		this.trigger();
	},

	// Helpers
	_walkItems: function(itemId, cb) {
		var self = this;
		var walkAllItems = _.isNull(itemId);
		var storedKitIndices = this.getStoredKitIndices();
		var vehicles = this.getVehicles();

		_.each(storedKitIndices, function(kitIndex) {
			var kit = self.getKit(kitIndex);

			_.each(kit.factions, function(faction) {
				_.each(faction.slots, function(slot) {
					_.each(slot.categories, function(category) {
						_.each(category.items, function(item) {
							if ((walkAllItems || item.id === itemId) && cb) {
								cb(item);
							}

							if (item.accessories) {
								// If the item has accessories, go through these and do the same

								_.each(item.accessories, function(accessorySlot) {
									_.each(accessorySlot.categories, function(accessorySlotCategories) {
										_.each(accessorySlotCategories.items, function(accessoryItem) {
											if ((walkAllItems || accessoryItem.id === itemId) && cb) {
												cb(accessoryItem);
											}
										});
									});
								});
							}
						});
					});
				});
			});
		});

		if (vehicles) {
			_.each(vehicles, function(vehicle) {
				_.each(vehicle.slotItems, function(slot) {
					_.each(slot.categories, function(category) {
						_.each(category.items, function(item) {
							if ((walkAllItems || item.id === itemId) && cb) {
								cb(item);
							}
						});
					});
				})
			});
		}
	},

	getStoredKitIndices: function() {
		var kitIndices = [];

		for (var i = 0; i < this.kits.length; i++) {
			var kit = this.kits[i];

			if (typeof kit !== "undefined") {
				kitIndices.push(i);
			}
		}

		return kitIndices;
	},

	isItemCompatibleInPreset: function(kitIndex, factionIndex, presetIndex, slotIndex, item) {
		var isCompatible = true;

		var preset = this.kits[kitIndex].factions[factionIndex].presets[presetIndex];

		// Check compatibility categories
		// Only one category can be active at the same time
		_.each(preset.slots, function(slot, i) {
			if (!isCompatible || slotIndex === i) {
				return;
			}

			var slotItem = this.getKitSlotItem(kitIndex, factionIndex, i, slot.item.id);

			if (slotItem && item.compatibility && slotItem.compatibility) {
				isCompatible = item.compatibility.category !== slotItem.compatibility.category;
			}
		}, this);

		return isCompatible;
	},

	isAccessoryCompatibleOnSlotItem: function(kitIndex, factionIndex, presetIndex, slotIndex, accessory) {
		var isCompatible = true;
		var foundInCompatibilityList = false;

		if (!accessory.compatibility || accessory.compatibility.items.length === 0) {
			return isCompatible;
		}

		var slot = this.kits[kitIndex].factions[factionIndex].presets[presetIndex].slots[slotIndex];

		// Check compatibility lists
		_.each(slot.item.accessories, function(slotAccessory) {
			if (!foundInCompatibilityList) {
				foundInCompatibilityList = accessory.compatibility.items.indexOf(slotAccessory.item.id) !== -1;
			}
		}, this);

		if (accessory.compatibility.isExclusionList) {
			isCompatible = !foundInCompatibilityList;
		} else {
			isCompatible = foundInCompatibilityList;
		}

		return isCompatible;
	},

	getItemForPreset: function(item) {
		var presetItem = {};

		presetItem.id = item.id;
		presetItem.name = item.name;

		presetItem.image = {};
		presetItem.image.category = item.image.category;
		presetItem.image.slug = item.image.slug;

		// Make it less confusing by not making activeItem.accessories reference the item.accessories object
		presetItem.accessories = [];

		var accessorySlots = this.getDefaultItemAccessorySlots(item);

		_.each(accessorySlots, function(accessorySlot, i) {
			if (!accessorySlot.item) {
				return;
			}

			presetItem.accessories[i] = {
				name: accessorySlot.name,
				item: {
					id: accessorySlot.item.id,
					name: accessorySlot.item.name,
					image: {
						slug: accessorySlot.item.image.slug,
						category: accessorySlot.item.image.category,
						url: accessorySlot.item.image.url
					}
				}
			};
		}, this);

		return presetItem;
	},

	getKitSlotItem: function(kitIndex, factionIndex, slotIndex, itemId) {
		var categories = this.kits[kitIndex].factions[factionIndex].slots[slotIndex].categories;
		return _findInCategoryList(categories, {
			"id": itemId
		});
	},

	getAccessorySlotItem: function(kitIndex, factionIndex, slotIndex, itemId, accessorySlotIndex, accessoryItemId) {
		var categories = this.getKitSlotItem(kitIndex, factionIndex, slotIndex, itemId).accessories[accessorySlotIndex].categories;
		return _findInCategoryList(categories, {
			"id": accessoryItemId
		});
	},

	getDefaultItemAccessorySlots: function(item) {
		/** Fetches the equipped (or default) item for each accessory slot **/
		var slots = [];

		_.each(item.accessories, function(itemSlot) {
			var item = _findInCategoryList(itemSlot.categories, {
				"isDefault": true
			});

			if (!item && itemSlot.categories[0]) {
				item = itemSlot.categories[0].items[0]; // If no default is found, just pick first item
			}

			slots.push({
				"name": itemSlot.name,
				"item": item ? item : null
			});
		});
		return slots;
	}
});