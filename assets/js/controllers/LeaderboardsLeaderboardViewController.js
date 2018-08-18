function LeaderboardsLeaderboardViewController(e) {
	var t = "leaderboardInfo",
		n = "leaderboardType",
		r = "region";
	this._name = "LeaderboardsLeaderboardView", this._section = null, this.game = session.getActiveGame(), this.resourcesLoaded = !1, RefreshableViewController.call(this, e), this.statKey = e.statKey, this[t] = e[t], this[n] = e[n], this[r] = "world", e[r] && (this[r] = e[r].toLowerCase()), this.viewedUsers = [], this.userStandings = null, this.pullToRefresh = !0, this.refreshButton = !1, this.title = dom.get_leaderboard_translation(this[t]), this.scrollViewTemplate = "LeaderboardsLeaderboardView-scrollviewcontent"
}
var app = require("app"),
	assets = require("assets"),
	web = require("web"),
	util = require("util"),
	dom = require("dom"),
	locale = require("locale"),
	session = require("session"),
	storage = require("storage"),
	template = require("template"),
	enums = require("enums"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = LeaderboardsLeaderboardViewController, LeaderboardsLeaderboardViewController.prototype = new RefreshableViewController, LeaderboardsLeaderboardViewController.prototype.constructor = LeaderboardsLeaderboardViewController, LeaderboardsLeaderboardViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, LeaderboardsLeaderboardViewController.prototype.viewDidAppear = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidAppear.call(e), e.initAreaNav(), e.refresh(), e.bindEvents()
}, LeaderboardsLeaderboardViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.$messages = $('<div class="messages"></div>'), e.scrollView.$content.prepend(e.$messages)
}, LeaderboardsLeaderboardViewController.prototype.bindEvents = function() {
	var e = "#zoom-level-container a",
		t = "selected",
		n = this;
	n.$(e).addClick(function() {
		$(e).removeClass(t), $(this).addClass(t), n.region = $(this).data("region"), n.refresh()
	})
}, LeaderboardsLeaderboardViewController.prototype.initAreaNav = function() {
	var e = storage.getObject("leaderboard.userLeaderboards"),
		t = '<a class="friends" data-region="friends"><div class="corner"></div><figure></figure></a>';
	for (var n = 0; n < e.length; n++) {
		var r = e[n].area.type;
		t += '<a class="' + r + '" data-region="' + r + '"><div class="corner"></div><figure></figure></a>'
	}
	$(".segmentedcontrol").html(t)
}, LeaderboardsLeaderboardViewController.prototype.updateLeaderboard = function(e, t) {
	var n = "leaderboardType",
		r = "game",
		i = "getUserActivePersonaForGame",
		s = "personaId",
		o = "#leaderboard-users",
		u = "viewedUsers",
		a = "users",
		f = "gravatar",
		l = "persona",
		c = "gravatarMd5",
		h = "self",
		p = "leaderboard_user_row",
		d = "ProfileViewController",
		v = !1,
		m = "area",
		g = "region",
		y = "friends",
		b = ".sectionhead.leaderboard .division",
		w = "percentile",
		E = this,
		S = E.statKey + "." + E[n];
	web.request("getleaderboard", {
		game: E[r],
		platform: session[i](E[r]).platform,
		leaderboardKey: e,
		statKey: S,
		personaId: session[i](E[r])[s],
		offset: 0,
		count: 10
	}, function(e, t) {
		if (e) return;
		var x = E.$(o);
		x.empty(), E[u] = t[a];
		for (var T in t[a]) {
			var N = "Unknown soldier",
				C = util[f]("");
			t[a][T][l] && (N = t[a][T][l].user.username, C = util[f](t[a][T][l].user[c]));
			var k = session[i](E[r]),
				L = t[a][T][s] == k[s] ? h : "",
				A = E[p](L, t[a][T].rank, S, C, N, t[a][T].score, T);
			x.append(A), t[a][T][l] && A.addClick(function() {
				app.go(d, {
					section: v,
					user: E[u][$(this).data("user-index")][l].user
				})
			})
		}
		t[m].name.substring(0, 3) == "ID_" && (t[m].name = locale.t(t[m].name.replace("ID_", "ID_MOBILE_"))), $("#lb-region").html(E[g] == y ? "Friends" : t[m].name), E.hideLoadingIndicator(), E.isLoading = v, E.$("#leaderboard-content").fadeIn(150);
		if (E[g] == y) E.$(b).hide();
		else {
			var O = storage.getObject("leaderboard.userLeaderboards"),
				M = "";
			for (var T in O)
				if (O[T][m].type == E[g]) {
					M = O[T].key;
					break
				}
			var _ = E.userStandings[E.statKey + "." + E[n]][M];
			_ && _[w] ? (E.$(b).show(), E.$(b).attr("src", "images/warsaw/leaderboards/" + E[g] + "-" + util.percentileToDivision(_[w]) + ".png")) : E.$(b).hide();
			if (_ && E.$(o).find(".leaderboard-row.self").length == 0) {
				var k = session[i](E[r]),
					D = session.getUser(),
					A = E[p](h, _.rank, M, util[f](D[c]), k[l].personaName, _.score, _.rank);
				E.$(o).append(A), A.addClick(function() {
					app.go(d, {
						styleSection: enums.AppGameName[E[r]],
						section: v,
						user: D
					})
				})
			}
			E.$("#zoom-level-container a").each(function() {
				var e = "";
				for (var t in O)
					if (O[t][m].type == $(this).data(g)) {
						e = O[t].key;
						break
					}
				_ && _[w] && $(this).data(g) != y && $(this).find(".corner").addClass(E.percentileToClass(_[w]))
			})
		}
	})
}, LeaderboardsLeaderboardViewController.prototype.percentileToClass = function(e) {
	var t = util.percentileToDivision(e);
	return t == 1 ? "gold" : t == 2 ? "silver" : t == 3 ? "bronze" : ""
}, LeaderboardsLeaderboardViewController.prototype.refresh = function(e) {
	var t = "selected",
		n = "leaderboardInfo",
		r = "userStandings",
		i = "getUserActivePersonaForGame",
		s = "updateLeaderboard";
	e || (e = function() {});
	var o = this;
	if (o.isLoading) return e("BUSY");
	o.isLoading = !0, o.lastRefresh = new Date, o.$messages.empty(), $("#zoom-level-container a").removeClass(t), $("#zoom-level-container a." + o.region).addClass(t), $("#lb-stat").html(o[n].desc ? o[n].desc : o[n].scoreType);
	var u = assets.CDNResourceURL(o[n].imageUrl.medium);
	$(".sectionhead.leaderboard .icon").attr("src", u), o.$("#leaderboard-content").fadeOut(150);
	var a = storage.getObject("leaderboard.userLeaderboards"),
		f = "friends",
		l = "",
		c = !0;
	for (var h in a) a[h].area.type == o.region && (f = a[h].key), l += (c ? "" : ",") + a[h].key, c = !1;
	o[r] ? o[s](f) : web.request("getuserstandings", {
		game: o.game,
		platform: session[i](o.game).platform,
		personaId: session[i](o.game).personaId,
		statIds: o.statKey + "." + o.leaderboardType,
		areatypes: "",
		leaderboardKeys: l
	}, function(e, t) {
		if (e) return;
		o[r] = t, o[s](f)
	})
}, LeaderboardsLeaderboardViewController.prototype.leaderboard_user_row = function(e, t, n, r, i, s, o) {
	return $(template.render("leaderboard_user_row", {
		extra_class: e,
		position: t != null ? t : "-",
		avatar_url: r,
		name: i,
		score: s,
		formattedScore: s,
		user_index: o != null ? o : "-"
	}))
};