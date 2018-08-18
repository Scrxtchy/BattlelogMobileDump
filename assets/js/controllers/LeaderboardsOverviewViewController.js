function LeaderboardsOverviewViewController(e) {
	this._name = "LeaderboardsOverviewView", this._section = null, this.game = session.getActiveGame(), this.game == enums.Game.OMAHA ? leaderboarddata = require("leaderboarddata-omaha") : leaderboarddata = require("leaderboarddata"), RefreshableViewController.call(this, e), this.pullToRefresh = !0, this.refreshButton = !1, this.title = locale.t("ID_MOBILE_LEADERBOARDS_TITLE"), this.scrollViewTemplate = "LeaderboardsOverviewView-scrollviewcontent"
}
var app = require("app"),
	assets = require("assets"),
	dialog = require("dialog"),
	web = require("web"),
	util = require("util"),
	dom = require("dom"),
	locale = require("locale"),
	receipt = require("receipt"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	leaderboarddata, storage = require("storage"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = LeaderboardsOverviewViewController, LeaderboardsOverviewViewController.prototype = new RefreshableViewController, LeaderboardsOverviewViewController.prototype.constructor = LeaderboardsOverviewViewController, LeaderboardsOverviewViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, LeaderboardsOverviewViewController.prototype.viewDidAppear = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidAppear.call(e)
}, LeaderboardsOverviewViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.$messages = $('<div class="messages"></div>'), e.scrollView.$content.prepend(e.$messages), e.bindEvents(), e.refresh()
}, LeaderboardsOverviewViewController.prototype.bindEvents = function() {
	var e = "addClick",
		t = "getUserActivePersonaForGame",
		n = "showReceipt",
		r = this;
	r.$("#top-performances-container .sectionbutton.leaderboard")[e](function() {}), r.$(".sectionbutton.locationsetup")[e](function() {
		app.go("LeaderboardsMapViewController", {}, function() {})
	}), r.$(".sectionbutton.locationremove")[e](function() {
		var e = $(this);
		dialog.confirm(locale.t("ID_MOBILE_LOCATION_REMOVE_CONFIRM"), locale.t("ID_WEB_COMMON_DIALOG_HEADER_CONFIRM"), function(e) {
			if (!e) return;
			web.request(r.game, "removeleaderboardlocation", {
				platform: session[t](r.game).platform,
				game: session.getActiveGame(),
				personaId: session[t](r.game).personaId
			}, function(e, t) {
				e ? receipt[n](locale.t("ID_MOBILE_ERROR"), "error") : (receipt[n](locale.t("ID_MOBILE_LOCATION_REMOVED"), "checkbox"), r.refresh())
			})
		})
	})
}, LeaderboardsOverviewViewController.prototype.findLeaderboardByKey = function(e) {
	var t = storage.getObject("leaderboard.userLeaderboards");
	for (var n in t)
		if (t[n].key == e) return t[n]
}, LeaderboardsOverviewViewController.prototype.findLeaderboardByAreaType = function(e) {
	var t = storage.getObject("leaderboard.userLeaderboards");
	for (var n in t)
		if (t[n].area.type == e) return t[n]
}, LeaderboardsOverviewViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "getLeaderboardTypes",
		r = "types",
		i = "game",
		s = "sort",
		o = ".sectionbutton",
		u = "data",
		a = "supercategory",
		f = "category",
		l = "getUserActivePersonaForGame",
		c = "leaderboards",
		h = "statId",
		p = "leaderboardKey",
		d = "findLeaderboardByKey",
		v = "area",
		m = "split",
		g = ".";
	e || (e = function() {});
	var y = this;
	if (y[t]) return e("BUSY");
	y.showLoadingIndicator(), y[t] = !0, y.lastRefresh = new Date, y.$messages.empty();
	var b = leaderboarddata[n]()[r],
		w = y.$("#leaderboard-buttons");
	w.empty();
	var E = {
		general: 1,
		records: 2,
		kitsteam: 3,
		weapons: 4,
		vehicles: 5
	};
	for (var S in b)
		for (var x in b[S]) {
			var T = locale.t("ID_MOBILE_LEADERBOARDS_CATEGORY_" + x.toUpperCase());
			x == "kitsteam" && y[i] == enums.Game.OMAHA && (T = locale.t("ID_WEB_GEOLB_CLASSES_AND_TEAMS"));
			var N = $('<div class="sectionbutton" data-supercategory="' + S + '" data-category="' + x + '" data-sort="' + E[x] + '">' + T + "</div>");
			w.append(N)
		}
	w.html(w.find(o)[s](function(e, t) {
		var n = parseInt($(e)[u](s)),
			r = parseInt($(t)[u](s));
		return n < r ? -1 : n > r ? 1 : 0
	})), w.find(o).addClick(function() {
		console.log("!"), app.go("LeaderboardsCategoryViewController", {
			superCategory: $(this)[u](a),
			category: $(this)[u](f)
		}, function() {})
	}), web.request("getbestleaderboardsforuser", {
		game: y[i],
		platform: session[l](y[i]).platform,
		personaId: session[l](y[i]).personaId,
		count: 10
	}, function(e, t) {
		var i = $("#best-leaderboards-container");
		if (e || !t || !t[c] || t[c].length < 1) {
			i.find(".no-arrow").show();
			return
		}
		i.empty();
		for (var s in t[c]) {
			var o = t.standings[t[c][s][h]][t[c][s][p]],
				l = y[d](t[c][s][p]),
				b = "images/warsaw/leaderboards/" + l[v].type + "-" + util.percentileToDivision(o.percentile) + ".png",
				w = leaderboarddata[n]()[r],
				E = t[c][s][h][m](g)[1],
				S = t[c][s][h][m](g)[0],
				x = "",
				T = null,
				N = "";
			for (var C in w[E])
				for (var k in w[E][C])
					if (k == S) {
						S = C, x = dom.get_leaderboard_translation(w[E][C][k]), T = w[E][C][k].imageUrl, N = w[E][C][k].scoreType;
						break
					}
			l[v].name.substr(0, 3) == "ID_" && (l[v].name = locale.t(l[v].name.replace("ID_", "ID_MOBILE_")));
			var L = y.best_leaderboard_row(x, o.score, o.rank, b, l[v].name, assets.CDNResourceURL(T.medium), t[c][s][h][m](g)[0], t[c][s][p], t[c][s][h][m](g)[1], S);
			L.addClick(function() {
				var e = $(this)[u]("statid"),
					t = $(this)[u]("lbkey"),
					i = $(this)[u](a),
					s = $(this)[u](f),
					o = leaderboarddata[n]()[r][i][s],
					l = null;
				for (var c in o)
					if (c == e) {
						l = o[c];
						break
					}
				var h = y[d](t);
				app.go("LeaderboardsLeaderboardViewController", {
					statKey: e,
					leaderboardInfo: l,
					leaderboardType: i,
					region: h[v].type
				}, function() {})
			}), i.append(L)
		}
	}), web.request("getleaderboarddataforuser", {
		game: y[i],
		platform: session[l](y[i]).platform,
		personaId: session[l](y[i]).personaId
	}, function(e, n) {
		y.hideLoadingIndicator(), y[t] = !1;
		if (e == "USER_NOT_FOUND") {
			y.$("#leaderboards-no-stats").show();
			return
		}
		y.$("#leaderboards-overview").show(), n.position.isSet || app.go("LeaderboardsMapViewController", {}, function() {
			y.navigationController.removeView(y)
		}), storage.setObject("leaderboard.userLeaderboards", n[c])
	})
}, LeaderboardsOverviewViewController.prototype.best_leaderboard_row = function(e, t, n, r, i, s, o, u, a, f) {
	return $(template.render("best_leaderboard_row", {
		name: e,
		score: t,
		formattedScore: dom.leaderboard_formatting(t, o),
		rank: n,
		division_url: r,
		area_name: i,
		icon_url: s,
		stat_id: o,
		lb_key: u,
		super_category: a,
		category: f
	}))
};