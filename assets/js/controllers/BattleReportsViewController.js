function BattleReportsViewController(e) {
	this._name = "BattleReportsView", this.game = session.getActiveGame(), this.gameName = enums.AppGameName[this.game], this.personaId = null, this.platform = null, this.leveldata = null, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_REPORTS", this.scrollViewTemplate = "BattleReportsView_scrollviewcontent"
}

function getWinStatus(e, t) {
	var n = "playerTeams",
		r = !1,
		i = "teams",
		s, o;
	if (e[n]) $.each(e[n], function(e, n) {
		if (n.indexOf(t) !== -1) return o = e, r
	});
	else {
		if (!e[i]) return r;
		$.each(e[i], function(e, n) {
			if (n.players.indexOf(t) !== -1) return o = e, r
		})
	}
	if (e.winner) s = e.winner;
	else {
		if (!e[i]) return r;
		$.each(e[i], function(e, t) {
			if (t.isWinner) return s = e, r
		})
	}
	return s ? o == s ? 1 : -1 : 0
}
var app = require("app"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	util = require("util"),
	template = require("template"),
	web = require("web"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = BattleReportsViewController, BattleReportsViewController.prototype = new RefreshableViewController, BattleReportsViewController.prototype.constructor = BattleReportsViewController, BattleReportsViewController.prototype.viewDidLoad = function() {
	var e = this;
	require(["gamedata/" + enums.AppGameName[session.getActiveGame()] + "/levels"], function(t) {
		e.leveldata = t, RefreshableViewController.prototype.viewDidLoad.call(e), e.bindEvents(), e.refresh()
	})
}, BattleReportsViewController.prototype.bindEvents = function() {
	var e = "selected",
		t = this;
	t.$("#battlereports-tabs").children("a").addClick(function() {
		var n = $(this),
			r = n.data("id"),
			i = t.$(".battlereports");
		n.siblings().removeClass(e), n.addClass(e), i.hide().filter("[data-id='" + r + "']").show()
	})
}, BattleReportsViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "personaId",
		r = "platform",
		i = "hideLoadingIndicator",
		s = !1,
		o = "renderError",
		u = "data",
		a = "statsTemplate",
		f = "messageSID";
	e || (e = function() {});
	var l = this;
	if (l[t]) return e();
	if (!l[n] && !session.isLoggedIn() || l[n] && !l[r]) return e(new Error("personaId and platform are required"));
	if (!l[n] && !l[r]) {
		var c = session.getUserActivePersonaForGame(l.game);
		if (!c) return e(new Error("User has no active persona"));
		l[n] = c[n], l[r] = c[r]
	}
	l.showLoadingIndicator(), l[t] = !0, l.lastRefresh = new Date, web.request(l.game, "battlereports", {
		game: l.game,
		personaId: l[n],
		platform: l[r]
	}, function(n, r) {
		return n ? (l[i](), l[t] = s, l[o](locale.t("ID_WEB_BATTLEREPORT_ERROR_LOAD")), e()) : (l[u] = r, l[u][a] === "common.warsawerror" || l[u][a] === "common.omahaerror" ? (l[i](), l[t] = s, l[o](l[u][f] ? locale.t(l[u][f]) : l[u].message), e()) : (l.renderListItems(), l[i](), l[t] = s, l.$(".hidden").removeClass("hidden"), l.$("#battlereports-tabs").children().first().trigger("click"), e()))
	})
}, BattleReportsViewController.prototype.renderError = function(e) {
	e = e || locale.t("ID_WEB_BATTLEREPORT_ERROR_LOAD");
	var t = this;
	t.$(".sectionerror").replaceWith($('<div class="sectionerror visible">' + e + "</div>"))
}, BattleReportsViewController.prototype.renderListItems = function() {
	var e = "platform",
		t = "gameReports",
		n = "friendlyDate",
		r = "getActiveGame",
		i = "OMAHA",
		s = "getBFHGameModeSID",
		o = "gameMode",
		u = "ID_WEB_COMMON_GAMEMODE_",
		a = "render",
		f = "BattleReportsListItemView",
		l = "personaId",
		c = "BattleReportViewController",
		h = "gameReportId",
		p = "append",
		d = "replace",
		v = "[BOLD]",
		m = "[/BOLD]",
		g = "</b>",
		y = "addClass",
		b = "parent",
		w = "sectioninfo no-items",
		E = "favGameReports",
		S = this,
		x = S.data,
		T = S.$(".section.battlereports[data-id='latest'] .items"),
		N = S.$(".section.battlereports[data-id='favorites'] .items"),
		C = session.getUserHasPremium(S.game, S[e]);
	T.empty(), x[t] && x[t].length ? (x[t].forEach(function(t) {
		t[n] = util[n](t.createdAt * 1e3);
		var d;
		session[r]() == enums.Game[i] ? d = util[s](t[o]) : d = u + t[o];
		var v = $(template[a](f, {
			report: t,
			gameModeLocalised: d,
			isOmaha: S.game == enums.Game[i],
			winStatus: getWinStatus(t, S[l]),
			level: S.leveldata.levels[t.map]
		}));
		v.addClick(function() {
			app.go(c, {
				section: !1,
				reportId: t[h],
				platform: S[e],
				personaId: S[l]
			})
		}), T[p](v)
	}), C || T[p](template[a]("BattleReportsListNotPremium", {})[d](v, "<b>")[d](m, g))) : (T[b]()[y](w), T.html(template[a]("BattleReportsListNoGames", {}))), N.empty(), C ? x[E] && x[E].length ? (N[b]().removeClass(w), x[E].forEach(function(t) {
		t[n] = util[n](t.createdAt * 1e3);
		var d;
		session[r]() == enums.Game[i] ? d = util[s](t[o]) : d = u + t[o];
		var v = $(template[a](f, {
			report: t,
			isOmaha: S.game == enums.Game[i],
			gameModeLocalised: d,
			winStatus: getWinStatus(t, S[l]),
			level: S.leveldata.levels[t.map]
		}));
		v.addClick(function() {
			app.go(c, {
				section: !1,
				reportId: t[h],
				platform: S[e],
				personaId: S[l]
			})
		}), N[p](v)
	})) : (N[b]()[y](w), N.html(template[a]("BattleReportsListNoFavorites", {}))) : (N[b]()[y](w), N.html(template[a]("BattleReportsFavoritesNotPremium", {})[d](v, "<b>")[d](m, g)))
};