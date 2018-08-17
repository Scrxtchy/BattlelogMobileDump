var actions = require("js/../public/jsx/loadout/actions.js");
var web = require("web");
var session = require("session");

// Deep clone Underscore mixin
_.mixin({ deepClone: function (p_object) { return JSON.parse(JSON.stringify(p_object)); } });

module.exports = {
    fetchKit: function (personaId, platform, kitIndex) {
        var params = {"personaId": personaId, "platform": platform, "kitIndex": kitIndex};
        web.request(session.getActiveGame(), 'bfhloadoutkit', params, function(err, resp) {
            actions.receivedKitData(resp);
        });
    },

    fetchVehicles: function (personaId, platform) {
        var params = {"personaId": personaId, "platform": platform};
        web.request(session.getActiveGame(), 'bfhloadoutvehicles', params, function(err, resp) {
            actions.receivedVehiclesData(resp);
        });
    },

    buyItem: function(currency, id, callback) {
        var params = {"id": id, "currency": currency};
        web.request(session.getActiveGame(), 'bfhloadoutpurchase', params, function(err, resp) {
            actions.itemPurchased.triggerPromise(id).then(function () {
                if (callback) {
                    callback();
                }
            });
        });
    },

    saveKitPreset: function(kitIndex, factionIndex, presetIndex, preset) {
        var params = {"kitIndex": kitIndex, "factionIndex": factionIndex, "presetIndex": presetIndex, "preset":JSON.stringify(preset)};
        web.request(session.getActiveGame(), 'bfhloadoutsave', params, function(err, resp) {
            actions.kitPresetSaved(resp);
        });
    },

    saveVehicles: function(vehicles) {
        var filtered = _.pluck(vehicles, "slots");

        var params = {"vehicles": JSON.stringify(filtered)};
        web.request(session.getActiveGame(), 'bfhloadoutsavevehicles', params, function(err, resp) {
            actions.vehiclesSaved(resp);
        });
    },

    setActiveKitPreset: function(kitIndex, factionIndex, presetIndex) {
        var params = {"kitIndex": kitIndex, "factionIndex": factionIndex, "presetIndex": presetIndex};
        web.request(session.getActiveGame(), 'bfhloadoutsetactivekitpreset', params, function(err, resp) {
            actions.setActivePreset(resp.kitIndex, resp.factionIndex, resp.presetIndex);
        });
    },

    setActiveKit: function(kitIndex) {
        var params = {"kitIndex": kitIndex};
        web.request(session.getActiveGame(), 'bfhloadoutsetactiveindex', params, function(err, resp) {
            actions.setActiveKit(resp.kitIndex);
        });


    }
};