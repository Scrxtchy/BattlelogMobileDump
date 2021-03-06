function VehicleDetailViewController(e) {
	this._name = "VehicleDetailView", this._section = "bf3", this.itemStats = null, ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_COMMON_VEHICLE"
}
var locale = require("locale"),
	global = require("global-bf3"),
	util = require("util"),
	gamedata_bf3 = require("gamedata/bf3"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = VehicleDetailViewController, VehicleDetailViewController.prototype = new ScrollableViewController, VehicleDetailViewController.constructor = VehicleDetailViewController, VehicleDetailViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.showItemInfo()
}, VehicleDetailViewController.prototype.showItemInfo = function() {
	var e = "itemStats",
		t = "find",
		n = "$content",
		r = "append",
		i = "timeIn",
		s = "forEach",
		o = "formatStatValue",
		u = "unlockedBy",
		a = "award",
		f = "unlockType",
		l = "codeNeeded",
		c = "valueNeeded",
		h = this,
		p = gamedata_bf3.items.gadgetsLocale.vehicles[h[e].guid];
	h[n][t](".item-info .name").text(locale.t(p.name)), h[n][t](".item-info .image")[r]('<span class="item-image item vehicle large _' + p.image + '"></span>'), h[n][t](".section.characteristics .sectioninfo.description")[r]("<p>" + locale.t(p.desc) + "</p>");
	var d = ["kills", i, "destroyXinY"];
	d[s](function(s) {
		var u = h[e][s];
		s == i ? u = util[o](u, "time") : u = util[o](u), h[n][t](".section.statistics .statrow." + s + " .value")[r](u)
	});
	var v = [];
	h[e].unlocks[s](function(e) {
		if (!e[u]) return;
		if (["bucket", a].indexOf(e[u][f]) == -1) return;
		v.push(e)
	});
	if (v.length) {
		v.sort(function(e, t) {
			return e[u][f] == a && t[u][f] == a ? e[u][l] > t[u][l] ? 1 : -1 : e[u][f] == a ? 1 : t[u][f] == a ? -1 : (e[u][c] || 0) - (t[u][c] || 0)
		});
		var m = $("<div></div>");
		v[s](function(e) {
			var t = global.bf3_vehicleUnlock_row(e);
			if (!t) return;
			m[r](t)
		}), h[n][t](".section.unlocks .items")[r](m), h[n][t](".section.unlocks").removeClass("hidden")
	}
};