var app = require("app");
var util = require("util");
var session = require("session");
var client = require("js/../public/jsx/loadout/client.js");

var locale = require("locale");

function spawnInfoDialogForItem(data, callback) {

    var params =  {
        item: null,
        vouchers: [],
        voucherNames: {},
        lockReasonText: null,
        isSelectable: true,
        cashBalance: session.getCashBalance()
    };

    params = _.extend(params, data);

    require(["js/../public/jsx/loadout/ItemDetailsStats.js", "js/../public/jsx/loadout/ItemBars.js", "dialog"], function(ItemDetailsStats, ItemBars, dialog) {

        if(data.item.lock) {
            params = _.extend(params, {
                vouchers: data.item.lock.validVouchers,
                voucherNames: data.item.lock.voucherNames
            });
        }

        console.log(params);

        var d = dialog.showBuyItemDialog(params, function(didClickOk, event) {
            var action = $(event.target).data("action");

            function saveCallback() {

                //debugger;

                // Need to call callback first so we set this item as selected
                callback();

                require(["js/../public/jsx/loadout/store.js"], function(store) {
                    if(!_.isNull(params.kitIndex)) {
                        client.saveKitPreset(
                            params.kitIndex,
                            params.factionIndex,
                            params.presetIndex,
                            store.getPreset(params.kitIndex, params.factionIndex, params.presetIndex));
                    } else {
                        client.saveVehicles(store.getVehicles());
                    }
                });
            }

            switch(action) {
                case "buy":
                    var currency = $(event.target).data("currency");
                    client.buyItem(currency, data.item.id, saveCallback);
                    break;
                case "use":

                    // Then save it at once..
                    saveCallback();

                    break;
            }

            // Default is closing the dialog.
        });

        // Add the React stats template content
        try {
            React.render(
                React.createElement(ItemBars, {
                key: "statistics-bars", 
                weaponData: data.item.weaponData, 
                diffData: data.diffItem.weaponData}
                ),
                document.getElementById("loadout-dialog-stats-bars"));
            React.render(
                React.createElement(ItemDetailsStats, {
                key: "statistics-details", 
                weaponData: data.item.weaponData}
                ),
                document.getElementById("loadout-dialog-stats"));
        } catch (e) {
            app.log("Could not render React stats components in dialog.");
            app.log(e);
        }

    });
}

function shouldInvertItemImage(category, slug) {
    var invertImage = true;

    var ignoreFor = [
        // category, slug
        // (null = all)
        ['camo', null],
        ['appearance', null],
        [null, 'GoldCamo_01'],
        [null, 'SilverCamo_01'],
        [null, 'BronzeCamo_01'],
        ['vehicleunlock', 'Optics_IRNVl'],
        ['vehicleunlock', 'Optics_Thermal'],
        ['vehicleunlock', 'Paint_']
    ];

    for (var i = 0; i < ignoreFor.length; i++) {
        var c = ignoreFor[i][0];  // category
        var s = ignoreFor[i][1];  // slug

        // null or _starts with_
        var ignoreCategory = c === null || category.indexOf(c) === 0;
        var ignoreSlug = s === null || slug.indexOf(s) === 0;

        if (ignoreCategory && ignoreSlug) {
            invertImage = false;
            break;
        }
    }

    return invertImage;
};

module.exports = {

    isMobile: function () {
        return true;
    },

    numberformat: function (value) {
        return util.formatStatValue(value)
    },

    locCurrency: function (subject, symbol) {
        return util.formatStatValue(subject, "cash")
    },

    startswith: function (subject, suffix) {
        return (subject.indexOf(suffix) === 0);
    },

    locale: function (key) {
        return locale.t(key);
    },

    getLocPresetName: function (presetName, presetIndex) {
        if (!presetName || presetName === "") {
            return locale.t("ID_WEB_LOADOUT_PRESET_X_NAME").replace("[X]", presetIndex + 1);
        }

        return presetName;
    },

    encodeJSON: function (data) {
        return JSON.stringify(data);
    },

    spawnBuyDialog: function (item, confirmCallback) {
        return false;
    },

    getImageClasses: function (image, size, invSize) {

        switch(size) {
            case "xsmall":
            case "xxsmall":
            case "smallinv":
            case "size90w":
            case "size90winv":
            case "xxsmallinv":
            case "xsmallinv":
                size = "small";

        }

        var imageClasses = [
            "inverted",
            "item-image",
            size,
            "bfh-" + image.category,
            image.category,
            image.slug.toLowerCase()
        ];

        return imageClasses.join(" ");
    },

    interfereSelectVehicleItem: function (data, callback) {
        // Mainly for mobile to show information in its way
        spawnInfoDialogForItem(data, callback);
    },

    interfereSelectKitAccessory: function (data, callback) {
        // Mainly for mobile to show information in its way
        spawnInfoDialogForItem(data, callback);
    },

    interfereSelectKitItem: function (data, callback) {
        // Mainly for mobile to show information in its way
        spawnInfoDialogForItem(data, callback);
    }



};