function UnlocksViewController(e) {
	var t = null;
	this._name = "UnlocksView", this._section = "bf3", this.user = t, this.persona = t, this.platform = t, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_UNLOCKS", this.loadedData = t
}
var dom = require("dom"),
	global = require("global-bf3"),
	web = require("web"),
	util = require("util"),
	locale = require("locale"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = UnlocksViewController, UnlocksViewController.prototype = new RefreshableViewController, UnlocksViewController.constructor = UnlocksViewController, UnlocksViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.bindEvents(), e.refresh()
}, UnlocksViewController.prototype.bindEvents = function() {
	var e = "addClass",
		t = "selected",
		n = "removeClass",
		r = "$content",
		i = "scrollView",
		s = ".statitem.unlock",
		o = "hidden",
		u = this;
	u.$(".segmentedcontrol.kitfilter a").addClick(function(a) {
		var f = $(this);
		f[e](t), f.siblings()[n](t);
		var l = parseInt(f.data("kit"), 10);
		l ? (u[i][r].find(s)[e](o), u[i][r].find('.statitem.unlock[data-kit="' + l + '"]')[n](o)) : u[i][r].find(s)[n](o), u[i].scrollToTop()
	}), u.$('.segmentedcontrol.kitfilter a[data-kit="0"]')[e](t)
}, UnlocksViewController.prototype.resetDOM = function() {
	var e = "selected",
		t = this;
	t.scrollView.$content.empty(), t.$(".segmentedcontrol.kitfilter a").removeClass(e), t.$('.segmentedcontrol.kitfilter a[data-kit="0"]').addClass(e)
}, UnlocksViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "overviewStats",
		r = "unlocks",
		i = "loadedData",
		s = "scrollToTop",
		o = "scrollView",
		u = "append",
		a = "$content",
		f = "hideLoadingIndicator",
		l = !1;
	e || (e = function() {});
	var c = this;
	if (c[t]) return e("BUSY");
	c.showLoadingIndicator(), c[t] = !0, c.lastRefresh = new Date, web.request("bf3", "soldierstats", {
		personaId: c.persona.personaId,
		platform: c.platform,
		statTypes: [n, r].join(",")
	}, function(h, p) {
		return c[i] = null, c.resetDOM(), h ? (c[o][s](), c[o][a][u](dom.error_row(locale.t("ID_MOBILE_STATS_ERROR"))), c[f](), c[t] = l, e()) : !p[n] || !p[r] ? (c[o][s](), c[o][a][u](dom.error_row(locale.t("ID_MOBILE_STATS_NOSTATS"))), c[f](), c[t] = l, e()) : (p[r].forEach(function(e) {
			var t = global.bf3_upcomingUnlock_row(e, !0);
			if (!t) return;
			t.attr("data-kit", e.kit), c[o][a][u](t)
		}), c[i] = p, c[f](), c[t] = l, e())
	})
};