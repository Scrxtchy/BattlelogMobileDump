function LeaderboardViewController(e) {
	var t = "LeaderboardView";
	this._name = t, this._section = "bf3", this.titleSID = "ID_MOBILE_VIEW_TITLE_LEADERBOARDS", this.game = enums.Game.BF3, this.lb_category = "soldier", this.lb_name = "Mp_Main_Score", this.lb_platform = enums.Platform.PC, this.lb_type = enums.LeaderboardType.ALL, ListContentViewController.call(this, e), this.backButtonTitleSID = "ID_MOBILE_COMMON_BACK", this.templateBundle = t, this.css = t, this.canRefresh = !0, this.canLoadMore = !0, this.itemsPerPage = 15, this.requestIdx = 0
}
var app = require("app"),
	enums = require("enums"),
	util = require("util"),
	locale = require("locale"),
	web = require("web"),
	dom = require("dom"),
	session = require("session"),
	gamedata = {
		bf3: {
			leaderboards: require("gamedata/bf3/leaderboards")
		}
	},
	ListContentViewController = require("controllers/ListContentViewController");
module.exports = LeaderboardViewController, LeaderboardViewController.prototype = new ListContentViewController, LeaderboardViewController.prototype.constructor = LeaderboardViewController, LeaderboardViewController.prototype.viewDidLoad = function() {
	var e = "leaderboards",
		t = "lb_columns",
		n = "$sectiontablehead",
		r = "append",
		i = "hidden",
		s = "$listContent",
		o = this;
	ListContentViewController.prototype.viewDidLoad.call(o);
	var u = gamedata[enums.Game.toString(o.game)][e][e][o.lb_category][o.lb_name];
	o[t] = [], u.columns.forEach(function(e) {
		o[t].push(e)
	});
	var a = o[t].splice(u.sortby, 1)[0];
	o[t].unshift(a), o[t].reverse(), o[n] = o.$(".sectiontablehead"), o[t].forEach(function(e) {
		o[n][r]('<div class="col stat">' + locale.t(e.nameSID) + "</div>")
	});
	if (session.isLoggedIn()) {
		o.$(".toolbar.loggedout").addClass(i), o.$(".toolbar.loggedin").removeClass(i);
		var f = session.getUserActivePersonaForGame(o.game);
		f && (o.lb_platform = f.platform), o.lb_type = enums.LeaderboardType.FRIENDS
	}
	o.bindEvents(), o.$messages = $('<div class="messages"></div>'), o[s][r](o.$messages), o.$table = $('<div class="sectiontable leaderboard"></div>'), o[s][r](o.$table), o.refresh()
}, LeaderboardViewController.prototype.bindEvents = function() {
	var e = "addClass",
		t = "selected",
		n = "removeClass",
		r = "lb_platform",
		i = this;
	i.$(".segmentedcontrol.platform a").addClick(function(s) {
		var o = $(this);
		o[e](t), o.siblings()[n](t), i[r] = parseInt(o.data("platform"), 10), i.clearDOM(), i.refresh()
	}), i.$(".segmentedcontrol.type a").addClick(function(r) {
		var s = $(this);
		s[e](t), s.siblings()[n](t), i.lb_type = parseInt(s.data("type"), 10), i.clearDOM(), i.refresh()
	}), i.$('.segmentedcontrol.platform a[data-platform="' + i[r] + '"]')[e](t), i.$('.segmentedcontrol.type a[data-type="' + i.lb_type + '"]')[e](t)
}, LeaderboardViewController.prototype.fetchData = function(e, t) {
	typeof e == typeof

	function() {} && (t = e, e = {}), e || (e = {}), t || (t = function() {});
	var n = this,
		r = {
			category: e.category || n.lb_category,
			name: e.name || n.lb_name,
			platform: e.platform || n.lb_platform,
			friends: e.friends || n.lb_type,
			start: e.start || 0
		};
	web.request(n.game, "leaderboard", r, function(e, n) {
		return t(e, n)
	})
}, LeaderboardViewController.prototype.clearDOM = function() {
	var e = this;
	e.scrollView.scrollToTop(), e.$messages.empty(), e.$table.empty(), e.$bottomLoading.addClass("hidden")
}, LeaderboardViewController.prototype.reset = function() {
	var e = this;
	e.pagesLoaded = 0, e.reachedLastPage = !1, e.scrollView.scrollToTop(), e.$messages.empty(), e.$table.empty(), e.$bottomLoading.addClass("hidden")
}, LeaderboardViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = !0,
		r = "requestIdx",
		i = "append",
		s = "reachedLastPage",
		o = "hideLoadingIndicator",
		u = !1,
		a = "entries",
		f = "getUserActivePersonaForGame",
		l = "localRank",
		c = "lb_type",
		h = "FRIENDS",
		p = "LeaderboardType",
		d = "</div>",
		v = "persona";
	e || (e = function() {});
	var m = this;
	m.showLoadingIndicator(), m[t] = n;
	var g = ++m[r];
	m.fetchData(function(y, b) {
		if (m[r] != g) return;
		m.reset();
		if (y) return m.$messages[i](dom.error_row(locale.t("ID_MOBILE_LEADERBOARD_ERROR"))), m[s] = n, m[o](), m[t] = u, e();
		if (!b[a] || !b[a].length) return m.$messages[i](dom.error_row(locale.t("ID_MOBILE_LEADERBOARD_EMPTY"))), m[s] = n, m[o](), m[t] = u, e();
		var w = session[f](m.game),
			E = $("<div></div>");
		b[a].forEach(function(e, t) {
			e[l] = e.rank, m[c] == enums[p][h] && (e[l] = t + 1);
			var n = $('<div class="row lbitem"><div class="col number">' + e[l] + d + '<div class="col name">' + e.personaName + d + d);
			m.lb_columns.forEach(function(t) {
				n[i]('<div class="col stat">' + util.formatStatValue(e.rankedStats[t.name], t.type) + d)
			});
			if (e[v]) {
				n.addClick(function() {
					var t = session[f](enums.Game.BF3);
					app.go("StatsViewController", {
						persona: e[v],
						platform: t.platform
					})
				});
				if (session.isLoggedIn()) {
					var r = w && w.platform == m.lb_platform && w[v].personaId == e[v].personaId,
						s = e[v].user && e[v].userId == session.getUserId();
					(r || s) && n.addClass("current")
				}
			}
			E[i](n)
		}), m.$table[i](E), m[c] != enums[p][h] && m.$bottomLoading.removeClass("hidden"), m[o](), m.pagesLoaded = 1, m[t] = u, m[c] == enums[p][h] ? m[s] = n : m.getShouldLoadMore() && m.loadMore(), e()
	})
}, LeaderboardViewController.prototype.loadMore = function(e) {
	var t = "isLoading",
		n = !0,
		r = "requestIdx",
		i = "pagesLoaded",
		s = "$bottomLoading",
		o = "hidden",
		u = "addClass",
		a = "reachedLastPage",
		f = !1,
		l = "entries",
		c = "getUserActivePersonaForGame",
		h = "</div>",
		p = "append",
		d = "persona";
	e || (e = function() {});
	var v = this;
	if (v[t]) return e();
	v[t] = n;
	var m = ++v[r];
	v.fetchData({
		start: v[i] * v.itemsPerPage
	}, function(g, y) {
		if (v[r] != m) return;
		v[s].removeClass(o);
		if (g) return v[s][u](o), v[a] = n, v[t] = f, e();
		if (!y[l] || !y[l].length) return v[s][u](o), v[a] = n, v[t] = f, e();
		var b = session[c](v.game),
			w = $("<div></div>");
		return y[l].forEach(function(e, t) {
			var n = $('<div class="row lbitem"><div class="col number">' + e.rank + h + '<div class="col name">' + e.personaName + h + h);
			v.lb_columns.forEach(function(t) {
				n[p]('<div class="col stat">' + util.formatStatValue(e.rankedStats[t.name], t.type) + h)
			});
			if (e[d]) {
				n.addClick(function() {
					var t = session[c](enums.Game.BF3);
					app.go("StatsViewController", {
						persona: e[d],
						platform: t.platform
					})
				});
				if (session.isLoggedIn()) {
					var r = b && b.platform == v.lb_platform && b[d].personaId == e[d].personaId,
						i = e[d].user && e[d].userId == session.getUserId();
					(r || i) && n[u]("current")
				}
			}
			w[p](n)
		}), v.$table[p](w), v[i]++, v[t] = f, v.getShouldLoadMore() && v.loadMore(), e()
	})
};