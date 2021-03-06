function WeaponsViewController(e) {
	var t = null;
	this._name = "WeaponsView", this._section = "bf3", this.user = t, this.persona = t, this.platform = t, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_WEAPONS", this.loadedData = t
}
var app = require("app"),
	dom = require("dom"),
	locale = require("locale"),
	template = require("template"),
	util = require("util"),
	web = require("web"),
	bf3itemsdata = require("gamedata/bf3/items"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = WeaponsViewController, WeaponsViewController.prototype = new RefreshableViewController, WeaponsViewController.constructor = WeaponsViewController, WeaponsViewController.prototype.viewDidLoad = function() {
	var e = "scrollView",
		t = this;
	RefreshableViewController.prototype.viewDidLoad.call(t), t.$messages = $('<div class="messages"></div>'), t[e].$content.append(t.$messages), t.$table = $('<div class="sectiontable statitems weapons"></div>'), t[e].$content.append(t.$table), t.bindEvents(), t.refresh()
}, WeaponsViewController.prototype.bindEvents = function() {
	var e = "addClass",
		t = "selected",
		n = "removeClass",
		r = "$content",
		i = "scrollView",
		s = ".row",
		o = "hidden",
		u = this;
	u.$(".segmentedcontrol.kitfilter a").addClick(function(a) {
		var f = $(this);
		f[e](t), f.siblings()[n](t);
		var l = parseInt(f.data("kit"), 10);
		l ? (u[i][r].find(s)[e](o), u[i][r].find('.row[data-kit="' + l + '"]')[n](o)) : u[i][r].find(s)[n](o), u[i].scrollToTop()
	}), u.$('.segmentedcontrol.kitfilter a[data-kit="0"]')[e](t)
}, WeaponsViewController.prototype.resetDOM = function() {
	var e = "selected",
		t = this;
	t.$messages.empty(), t.$table.empty(), t.$(".segmentedcontrol.kitfilter a").removeClass(e), t.$('.segmentedcontrol.kitfilter a[data-kit="0"]').addClass(e)
}, WeaponsViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "overviewStats",
		r = "weapons",
		i = "loadedData",
		s = "append",
		o = "hideLoadingIndicator",
		u = !1;
	e || (e = function() {});
	var a = this;
	if (a[t]) return e("BUSY");
	a.showLoadingIndicator(), a[t] = !0, a.lastRefresh = new Date, web.request("bf3", "soldierstats", {
		personaId: a.persona.personaId,
		platform: a.platform,
		statTypes: [n, r].join(",")
	}, function(f, l) {
		a[i] = null, a.resetDOM();
		if (f) return a.scrollView.scrollToTop(), a.$messages[s](dom.error_row(locale.t("ID_MOBILE_STATS_ERROR"))), a[o](), a[t] = u, e();
		if (!l[n] || !l[r] || !l[r].length) return a.$messages[s](dom.error_row(locale.t("ID_MOBILE_STATS_NOSTATS"))), a[o](), a[t] = u, e();
		var c = $("<div></div>"),
			h = 0;
		return l[r].forEach(function(e) {
			var t = bf3itemsdata.gadgetsLocale[r][e.guid];
			if (!t) return;
			h += 1;
			var n = $(template.render("WeaponsView-row", {
				count: h,
				item: e,
				itemInfo: t,
				imageName: t.image.replace("_american", "").replace("_russian", ""),
				kitName: util.kitEnum_to_kitName(e.kit),
				formatStatValue: util.formatStatValue
			}));
			n.attr("data-kit", e.kit), n.addClick(function() {
				app.go("WeaponDetailViewController", {
					itemStats: e
				})
			}), c[s](n)
		}), a.$table[s](c), a[i] = l, a[o](), a[t] = u, e()
	})
};