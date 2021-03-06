function LeaderboardsCategoryViewController(e) {
	var t = "superCategory",
		n = "category";
	this._name = "LeaderboardsCategoryView", this._section = null, this.game = session.getActiveGame(), this.game == enums.Game.OMAHA ? leaderboarddata = require("leaderboarddata-omaha") : leaderboarddata = require("leaderboarddata"), RefreshableViewController.call(this, e), this.pullToRefresh = !0, this.refreshButton = !1, this[t] = e[t], this[n] = e[n];
	var r = e[n].toUpperCase();
	this.title = locale.t("ID_MOBILE_LEADERBOARDS_CATEGORY_" + r), r == "KITSTEAM" && this.game == enums.Game.OMAHA && (this.title = locale.t("ID_WEB_GEOLB_CLASSES_AND_TEAMS")), this.scrollViewTemplate = "LeaderboardsCategoryView-scrollviewcontent"
}
var app = require("app"),
	assets = require("assets"),
	web = require("web"),
	util = require("util"),
	dom = require("dom"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	leaderboarddata, RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = LeaderboardsCategoryViewController, LeaderboardsCategoryViewController.prototype = new RefreshableViewController, LeaderboardsCategoryViewController.prototype.constructor = LeaderboardsCategoryViewController, LeaderboardsCategoryViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, LeaderboardsCategoryViewController.prototype.viewDidAppear = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidAppear.call(e)
}, LeaderboardsCategoryViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.$messages = $('<div class="messages"></div>'), e.scrollView.$content.prepend(e.$messages), e.bindEvents(), e.refresh()
}, LeaderboardsCategoryViewController.prototype.bindEvents = function() {
	var e = this
}, LeaderboardsCategoryViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "getLeaderboardTypes",
		r = "types",
		i = "superCategory",
		s = "category",
		o = "getUserActivePersonaForGame",
		u = "sort";
	e || (e = function() {});
	var a = this;
	if (a[t]) return e("BUSY");
	a.showLoadingIndicator(), a[t] = !0, a.lastRefresh = new Date;
	var f = {
			general: {
				skill: 1,
				score: 2,
				spm: 3,
				accuracy_all: 4,
				kdr: 5,
				c___k_g: 6,
				c_kany__sa_g: 7,
				win_loss_ratio: 8
			},
			records: {
				c___k_g: 1,
				c_vA__de_g: 2,
				c___hsh_g: 3,
				c___hsd_ghva: 4,
				c_wH__kwa_g: 5,
				c_wA__kwa_g: 6,
				c_wC__kwa_g: 7,
				c_wSR__kwa_g: 8,
				c_wL__kwa_g: 9,
				c_vmL__ki_g: 10,
				c_vmaJ__ki_g: 11,
				c_vmaH__ki_g: 12,
				c_vmB__ki_g: 13,
				sc_assault: 14,
				sc_engineer: 15,
				sc_recon: 16,
				sc_support: 17,
				sc_squad: 18,
				sc_commander: 19,
				c___k_ghvs: 20
			},
			kitsteam: {
				sc_assault: 1,
				sc_engineer: 2,
				sc_support: 3,
				sc_recon: 4,
				sc_commander: 5,
				sc_squad: 6,
				c___re_g: 7,
				c___r_g: 8
			},
			weapons: {
				c_wA__kwa_g: 1,
				c_wSR__kwa_g: 2,
				c_waRL__kwa_g: 3,
				c_waS__kwa_g: 4,
				c_waPDW__kwa_g: 5,
				c_wL__kwa_g: 6,
				c_wH__kwa_g: 7,
				c_wG__kwa_g: 8,
				c_wD__kwa_g: 9,
				c_wC__kwa_g: 10,
				c_wSPk__kwa_g: 11
			},
			vehicles: {
				c_vMBT__ki_g: 1,
				c_vIFV__ki_g: 2,
				c_vAA__ki_g: 3,
				c_vmaFAC__ki_g: 4,
				c_vSH__ki_g: 5,
				c_vAH__ki_g: 6,
				c_vJF__ki_g: 7,
				c_vJA__ki_g: 8
			}
		},
		l = leaderboarddata[n]()[r],
		c = a.$("#category-container");
	c.empty();
	var h = "",
		p = !0;
	for (var d in l[a[i]][a[s]]) h += (p ? "" : ",") + d + "." + a[i], p = !1;
	web.request("getstatsforuser", {
		game: a.game,
		platform: session[o](a.game).platform,
		statIds: h,
		personaIds: "" + session[o](a.game).personaId
	}, function(e, h) {
		var p = l[a[i]][a[s]];
		for (var d in p) {
			var v = h[session[o](a.game).personaId].stats,
				m = assets.CDNResourceURL(p[d].imageUrl.medium),
				g = a.leaderboard_category_row(m, dom.get_leaderboard_translation(p[d]), v[d + "." + a[i]] ? v[d + "." + a[i]] + " " + p[d].scoreType : p[d].scoreType, "", d, f[a[s]][d]);
			c.append(g)
		}
		c.html(c.find(".sectionbutton")[u](function(e, t) {
			var n = parseInt($(e).data(u)),
				r = parseInt($(t).data(u));
			return n < r ? -1 : n > r ? 1 : 0
		})), c.find(".sectionbutton.category").addClick(function() {
			var e = $(this).data("leaderboardkey"),
				t = leaderboarddata[n]()[r][a[i]][a[s]],
				o = null;
			for (var u in t)
				if (u == e) {
					o = t[u];
					break
				}
			app.go("LeaderboardsLeaderboardViewController", {
				statKey: u,
				leaderboardInfo: o,
				leaderboardType: a[i]
			}, function() {})
		}), a.hideLoadingIndicator(), a[t] = !1
	}), a.$messages.empty()
}, LeaderboardsCategoryViewController.prototype.leaderboard_category_row = function(e, t, n, r, i, s) {
	return $(template.render("leaderboard_category_row", {
		icon_url: e,
		name: t,
		formatted_value: dom.leaderboard_formatting(n, i),
		stat_value: n,
		division_url: r,
		leaderboard_key: i,
		sort: s
	}))
};