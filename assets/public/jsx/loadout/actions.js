


// ===============================================================
// WATCH OUT! THIS FILE IS COPIED FROM THE BFA LOADOUT 
// PLEASE CHANGE THE BFA LOADOUT AND RUN THE PIPELINE (omaha_loaduout_import.py ) INSTEAD OF EDITING HERE...
// Also note that files in loadoutmobile/ will be copied last and overwriting BFA loadout content...
// ===============================================================






// 

// ^^ You did read that right?


var Reflux = require("reflux");

module.exports = {
    reset: Reflux.createAction(),
    receivedKitData: Reflux.createAction(),
    receivedVehiclesData: Reflux.createAction(),
    itemPurchased: Reflux.createAction({ asyncResult: true }),
    cashBalanceUpdated: Reflux.createAction(),
    voucherCountUpdated: Reflux.createAction(),
    selectKitItem: Reflux.createAction(),
    selectKitAccessory: Reflux.createAction(),
    selectVehicleItem: Reflux.createAction(),
    kitPresetSaved: Reflux.createAction(),
    vehiclesSaved: Reflux.createAction(),
    changePresetName: Reflux.createAction(),
    setActivePreset: Reflux.createAction(),
    setActiveKit: Reflux.createAction(),
    changeFocusedFaction: Reflux.createAction()
};