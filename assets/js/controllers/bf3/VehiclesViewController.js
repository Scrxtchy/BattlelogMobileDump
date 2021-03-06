function VehiclesViewController(e) {
	var t = null;
	this._name = "VehiclesView", this._section = "bf3", this.user = t, this.persona = t, this.platform = t, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_VEHICLES", this.loadedData = t
}
var app = require("app"),
	web = require("web"),
	util = require("util"),
	locale = require("locale"),
	dom = require("dom"),
	gamedata_bf3 = require("gamedata/bf3"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = VehiclesViewController, VehiclesViewController.prototype = new RefreshableViewController, VehiclesViewController.constructor = VehiclesViewController, VehiclesViewController.prototype.viewDidLoad = function() {
	var e = "scrollView",
		t = this;
	RefreshableViewController.prototype.viewDidLoad.call(t), t.$messages = $('<div class="messages"></div>'), t[e].$content.append(t.$messages), t.$table = $('<div class="sectiontable statitems vehicles"></div>'), t[e].$content.append(t.$table), t.refresh()
}, VehiclesViewController.prototype.resetDOM = function() {
	var e = this;
	e.$messages.empty(), e.$table.empty()
}, VehiclesViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "overviewStats",
		r = "vehicles",
		i = "loadedData",
		s = "scrollToTop",
		o = "scrollView",
		u = "append",
		a = "hideLoadingIndicator",
		f = !1,
		l = "</div>",
		c = "formatStatValue";
	e || (e = function() {});
	var h = this;
	if (h[t]) return e("BUSY");
	h.showLoadingIndicator(), h[t] = !0, h.lastRefresh = new Date, web.request("bf3", "soldierstats", {
		personaId: h.persona.personaId,
		platform: h.platform,
		statTypes: [n, r].join(",")
	}, function(p, d) {
		h[i] = null, h.resetDOM();
		if (p) return h[o][s](), h.$messages[u](dom.error_row(locale.t("ID_MOBILE_STATS_ERROR"))), h[a](), h[t] = f, e();
		if (!d[n] || !d[r] || !d[r].length) return h[o][s](), h.$messages[u](dom.error_row(locale.t("ID_MOBILE_STATS_NOSTATS"))), h[a](), h[t] = f, e();
		var v = $("<div></div>"),
			m = 0;
		return d[r].forEach(function(e) {
			var t = gamedata_bf3.items.gadgetsLocale[r][e.guid];
			if (!t) return;
			m += 1;
			var n = $('<div class="row vehicle"><div class="col number"><div class="number">' + m + l + l + '<div class="col info">' + '<div class="image">' + '<span class="item-image item vehicle _' + t.image + '"></span>' + l + '<div class="name">' + locale.t(t.name) + l + l + '<div class="col stars">' + '<div class="stars">' + (e.serviceStars || "") + l + '<div class="progressbar"><div style="-webkit-transform:scaleX(' + (e.serviceStarsProgress || 0) / 100 + ');"></div></div>' + l + '<div class="col kills">' + '<div class="kills">' + util[c](e.kills) + l + '<div class="time">' + util[c](e.timeIn, "time") + l + l + l);
			n.addClick(function() {
				app.go("VehicleDetailViewController", {
					itemStats: e
				})
			}), v[u](n)
		}), h.$table[u](v), h[i] = d, h[a](), h[t] = f, e()
	})
};