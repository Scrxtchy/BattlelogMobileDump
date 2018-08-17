


// ===============================================================
// WATCH OUT! THIS FILE IS COPIED FROM THE BFA LOADOUT 
// PLEASE CHANGE THE BFA LOADOUT AND RUN THE PIPELINE (omaha_loaduout_import.py ) INSTEAD OF EDITING HERE...
// Also note that files in loadoutmobile/ will be copied last and overwriting BFA loadout content...
// ===============================================================






// 

// ^^ You did read that right?


/** @jsx React.DOM */
var React = require('react');
var actions = require("js/../public/jsx/loadout/actions.js");
var client = require("js/../public/jsx/loadout/client.js");
var store = require("js/../public/jsx/loadout/store.js");
var helpers = require("js/../public/jsx/loadout/helpers.js");
var urlPattern = require('url-pattern');
var loadOutConfig = null;

var bindPush = function(event, callback) {
  if(helpers.isMobile()) {
    require(['push'], function(Push) {
        Push.bind(event, callback);
     });
  }  else {
      Push.bind(event, callback);
  }
};

window.React = React;  // For triggering React.js devtools

// Our components
var KitSelector = require("js/../public/jsx/loadout/KitSelector.js");
var ViewKit = require("js/../public/jsx/loadout/ViewKit.js");
var ViewKitPresets = require("js/../public/jsx/loadout/ViewKitPresets.js");
var ViewVehicles = require("js/../public/jsx/loadout/ViewVehicles.js");

//
var routes = {
    vehicles: urlPattern.newPattern('vehicles(/:vehicleIndex)(/:slotIndex)'),
    kitPresets: urlPattern.newPattern('kit/:kitIndex/presets'),
    kit: urlPattern.newPattern('kit/:kitIndex/:factionIndex/:presetIndex(/:slotIndex)(/:accessorySlotIndex)')
};

// kit route explanations
// slotIndex is the slot on the actual kit, e.g. Gadget 1 or Sidearm
// accessorySlotIndex is the slot on the weapon (usually Primary Weapon or Sidearm), e.g. Scope or Muzzle
// accessorySlotIndex === -1 should show the item selector list instead of attachment selector

function _parseIntElseNull(val) {
    return val ? parseInt(val, 10) : null;
}

var Loadout = React.createClass({displayName: 'Loadout',
    propTypes: {
        availableKits: React.PropTypes.array.isRequired,
        personaId: React.PropTypes.string.isRequired,
        platform: React.PropTypes.string.isRequired
    },

    statics: {
        getUrl: function () {
            if (window.location.hash === "" && !helpers.isMobile()) {
                // Temporary hack to show first kit by default
                // TODO: Show Active Kit by default instead of just the first in the list
                var initialSelectedKit = S && S.globalContext ? S.globalContext.initialSelectedKit : 0;
                return "kit/" + initialSelectedKit + "/presets";
            } else {
                return window.location.hash.replace('#', '');
            }
        }
    },

    handleHashChange: function () {
        this.setState({ url: Loadout.getUrl() });
    },

    getInitialState: function () {
        return {
            url: Loadout.getUrl()
        };
    },

    componentDidMount: function () {
        window.addEventListener('hashchange', this.handleHashChange);
    },

    componentWillUnmount: function () {
        window.removeEventListener('hashchange', this.handleHashChange);
    },
    componentDidUpdate: function(){
        if (helpers.isMobile()){
            exports.trigger("componentDidUpdate");
        }
    },
    render: function () {
        var url = Loadout.getUrl();
        var view = null;
        var params = null;

        var isVehiclesView = false;

        // Route-handling
        if (params = routes.vehicles.match(url)) {
            // View Vehicles view
            isVehiclesView = true;
            view = (
                React.createElement(ViewVehicles, {
                    isMyLoadout: this.props.isMyLoadout, 
                    personaId: this.props.personaId, 
                    platform: this.props.platform, 
                    vehicleIndex: _parseIntElseNull(params.vehicleIndex), 
                    slotIndex: _parseIntElseNull(params.slotIndex, 10)}
                )
            );
        } else if (params = routes.kitPresets.match(url)) {
            // View all available kit presets
            view = (
                React.createElement(ViewKitPresets, {
                    isMyLoadout: this.props.isMyLoadout, 
                    personaId: this.props.personaId, 
                    platform: this.props.platform, 
                    kitIndex: _parseIntElseNull(params.kitIndex)}
                )
            );
        } else if (params = routes.kit.match(url)) {
            // View selected kit preset
            view = (
                React.createElement(ViewKit, {
                    isMyLoadout: this.props.isMyLoadout, 
                    personaId: this.props.personaId, 
                    platform: this.props.platform, 
                    kitIndex: _parseIntElseNull(params.kitIndex), 
                    factionIndex: _parseIntElseNull(params.factionIndex), 
                    presetIndex: _parseIntElseNull(params.presetIndex), 
                    slotIndex: _parseIntElseNull(params.slotIndex), 
                    accessorySlotIndex: _parseIntElseNull(params.accessorySlotIndex)}
                )
            );
        }

        var classes = null;

        if (isVehiclesView) {
            classes = React.addons.classSet({
                "steps-container": true,
                "is-loadout-mobile": helpers.isMobile(),
                "vehicle-steps": true,
                "step-1": true,
                "step-2": params && !_.isUndefined(params.vehicleIndex),
                "step-3": params && !_.isUndefined(params.slotIndex)
            });
        } else {
            classes = React.addons.classSet({
                "steps-container": true,
                "is-loadout-mobile": helpers.isMobile(),
                "kit-steps": true,
                "step-1": params && !_.isUndefined(params.presetIndex),
                "step-2": params && !_.isUndefined(params.slotIndex),
                "step-3": params && typeof params.accessorySlotIndex !== 'undefined'
            });
        }

        var activeKitIndex = params ? _parseIntElseNull(params.kitIndex) : null;

        return (
            React.createElement("div", {className: classes}, 
                React.createElement(KitSelector, {
                    kits: this.props.availableKits, 
                    isVehiclesView: isVehiclesView, 
                    activeKitIndex: activeKitIndex}
                ), 

                view
            )
        );
    }
});


// ---------------------------------------------------------------------------------------------------------------------
var exports = {};
if(helpers.isMobile()) {
    _.extend(exports, Backbone.Events);
} else {
    $.extend(exports, $.eventEmitter);
}

function refetchKits(kitIndex) {
    if (loadOutConfig.loadoutPersonaId && loadOutConfig.loadoutPlatform) {
        if (arguments.length > 0 && !_.isNull(kitIndex)) {
            client.fetchKit(
                loadOutConfig.loadoutPersonaId,
                loadOutConfig.loadoutPlatform,
                kitIndex
            );
        } else {
            // Refresh all kits
            _.each(store.getStoredKitIndices(), function (kitIndex) {
                client.fetchKit(
                    loadOutConfig.loadoutPersonaId,
                    loadOutConfig.loadoutPlatform,
                    kitIndex
                );
            });
        }
    } else {
        actions.reset();
    }
}



exports.on('init', function () {
    exports.initcallback(null);
});


exports.initcallback = function (loadoutConfig) {

    bindPush('LoadoutUpdated', function (e) {
        var data = e.data || e;
        refetchKits(data && data.hasOwnProperty("kit") ? data.kit : null);
    });

    bindPush('CashBalanceUpdated', function (e) {
        var data = e.data || e;
        if (data && data.hasOwnProperty("balance")) {
            actions.cashBalanceUpdated(data.balance);
        }
    });

    bindPush('VoucherCountUpdated', function (e) {
        var data = e.data || e;
        if (data && data.hasOwnProperty("count")) {
            actions.voucherCountUpdated(data.count);
        }

        refetchKits();
    });

    bindPush('InventoryItemPurchased', function (e) {
       var data = e.data || e;
       if (data && data.itemIds) {
            _.each(data.itemIds, function (itemId) {
                actions.itemPurchased(itemId);
            });
        }
    });

    if(helpers.isMobile()) {
        exports.pageshowcallback(loadoutConfig);
    }
};

exports.on('pageshow', function () {
    exports.pageshowcallback();
});
exports.pageshowcallback = function (loadoutConfig) {

    console.log("loadoutbfhreact pageshow");

    if(helpers.isMobile() && loadoutConfig) {
        loadOutConfig = loadoutConfig
    } else {
        loadOutConfig = {
            "cashBalance": S.globalContext.cashBalance,
            "vouchersCount": S.globalContext.vouchersCount,
            "isMyLoadout": S.globalContext.isMyLoadout,
            "loadoutPersonaId": S.globalContext.loadoutPersonaId,
            "loadoutPlatform": S.globalContext.loadoutPlatform,
            "availableKits": S.globalContext.availableKits,
            "initialSelectedKit": S.globalContext.initialSelectedKit
        };
    }


    store.handleReset();
    store.setCashBalance(loadOutConfig.cashBalance);
    store.setVoucherCount(loadOutConfig.vouchersCount);

    React.renderComponent(
        React.createElement(Loadout, {
            isMyLoadout: loadOutConfig.isMyLoadout, 
            personaId: loadOutConfig.loadoutPersonaId, 
            platform: loadOutConfig.loadoutPlatform, 
            availableKits: loadOutConfig.availableKits, 
            initialSelectedKit: loadOutConfig.initialSelectedKit}
        ),
        document.getElementById("loadout-container")
    );
};

module.exports = exports;