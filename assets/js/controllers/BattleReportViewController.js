function BattleReportViewController(e) {
	this._name = "BattleReportView", this._section = null, this.game = session.getActiveGame(), this.gameName = enums.AppGameName[this.game], this.activePersona = session.getUserActivePersonaForGame(this.game), ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_BATTLEREPORT_BATTLE_REPORT"
}
var app = require("app"),
	config = require("config"),
	assets = require("assets"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	web = require("web"),
	util = require("util"),
	dom = require("dom"),
	receipt = require("receipt"),
	leveldata = null;
require(["gamedata/" + enums.AppGameName[session.getActiveGame()] + "/levels"], function(e) {
	leveldata = e
});
var ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = BattleReportViewController, BattleReportViewController.prototype = new ScrollableViewController, BattleReportViewController.prototype.constructor = BattleReportViewController, BattleReportViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, BattleReportViewController.prototype.viewDidLoad = function(e) {
	var t = "platform_report",
		n = "personaId_report",
		r = "personaId",
		i = "data",
		s = "playerReport",
		o = "players";
	e || (e = function() {});
	var u = this;
	ScrollableViewController.prototype.viewDidLoad.call(u);
	var a = u[t] !== undefined ? a = u[t] : a = u.platform,
		f = u[n] !== undefined ? f = u[n] : f = u[r];
	web.request(u.game, "battlereport", {
		reportId: u.reportId,
		platform: a,
		personaId: f
	}, function(t, n) {
		return t || !n || jQuery.isEmptyObject(n) ? (u.renderError(), e()) : (u[i] = n, u[i][s] && u[i][s][r] && u[i][o][u[i][s][r]] && (u[i][o][u[i][s][r]].isActivePlayer = !0), u.renderEndOfRound(), u.renderActions(), u.renderPlayerReport(), u.renderScoreboard(), u.renderPrizes(), u.$el.find(".sectionloading").remove(), u.$el.find(".hidden").removeClass("hidden"), u.bindEvents(), u.$("#battlereport-scoreboard-tabs").find("a[data-teamid='" + u[i][o][u[i][s][r]].team + "']").trigger("click"), e())
	})
}, BattleReportViewController.prototype.viewDidAppear = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.viewDidAppear.call(t)
}, BattleReportViewController.prototype.bindEvents = function() {
	var e = "addClick",
		t = "data",
		n = "selected",
		r = "StatsViewController",
		i = "gameName",
		s = "players",
		o = "getAttribute",
		u = this;
	u.$el.find("#battlereport-scoreboard-tabs").children("a")[e](function() {
		var e = $(this),
			r = e[t]("teamid"),
			i = u.$el.find(".battlereport-scoreboard"),
			s = i.filter("[data-teamid='" + r + "']");
		e.siblings().removeClass(n), e.addClass(n), s.show(), i.not(s).hide()
	}), u.$(".battlereport-scoreboard .row")[e](function() {
		var e = $(this),
			n = e[t]("personaid");
		n && app.go(r, {
			section: u[i],
			persona: u[t][s][n].persona,
			platform: u[t].platform,
			user: u[t][s][n].user
		})
	}), u.$(".sectionbutton.playerreport-unlocks")[e](function() {
		app.go("BattleReportUnlocksViewController", u[t].playerReport.unlocks)
	}), u.$(".deeplink")[e](function() {
		app.go("ItemViewController", {
			section: u[i],
			type: this[o]("data-type"),
			guid: this[o]("data-guid")
		})
	}), u.$("#battlereport-prizes [data-persona-id]")[e](function(e) {
		var n = this[o]("data-persona-id");
		app.go(r, {
			persona: u[t][s][n].persona,
			section: u[i],
			platform: u[t].platform,
			user: u[t][s][n].user
		})
	})
}, BattleReportViewController.prototype.renderError = function(e) {
	e = e || locale.t("ID_WEB_BATTLEREPORT_ERROR_LOAD");
	var t = this;
	t.$(".sectionloading").replaceWith($('<div class="sectionerror">' + e + "</div>"))
}, BattleReportViewController.prototype.renderEndOfRound = function() {
	var e = "personaId",
		t = "playerReport",
		n = "children",
		r = "Game",
		i = "toLowerCase",
		s = "gameServer",
		o = "getActiveGame",
		u = "mapMode",
		a = "activePersona",
		f = this,
		l = f.data,
		c, h = l.players[l[t][e]],
		p = f.$("#battlereport-timestamp"),
		d = f.$("#battlereport-eor"),
		v;
	p[n](".game-icon").addClass(enums[r].toString(f.game)), p[n](".platform-icon").addClass(enums.Platform.toString(f.data.platform)), p[n](".timestamp").text(util.friendlyTimestamp(f.data.createdAt)), this.game == enums[r].WARSAW ? v = assets.CDNResourceURL("/public/base/bf4/map_images/992x345/" + l[s].map[i]() + ".jpg") : this.game == enums[r].OMAHA && (v = "images/omaha/gamedata/maps/992x345/" + l[s].map[i]() + ".png");
	var m;
	session[o]() == enums[r].OMAHA ? m = util.getBFHGameModeSID(l[s][u]) : m = "ID_WEB_COMMON_GAMEMODE_" + l[s][u], c = template.render("end_of_round", {
		isBfh: session[o]() == enums[r].OMAHA,
		isActivePlayer: f[a] && l[t][e] === f[a][e],
		map: leveldata.levels[l[s].map] ? leveldata.levels[l[s].map].label : "Unknown",
		gameMode: l[s][u],
		duration: util.friendlyDuration(l.duration),
		player: h,
		mapModeSid: m,
		teams: l.teams,
		scoreTypeLocales: f.scoreTypeLocales(l[s][u]),
		mapImage: v
	}), d.html(c)
}, BattleReportViewController.prototype.renderPrizes = function() {
	var e = "ID_WEB_BATTLEREPORT_WEBPRIZE_",
		t = "toUpperCase";
	if (!this.data.prizes) return;
	var n = this,
		r, i, s = n.$el.find("#battlereport-prizes");
	i = n.data.prizes.map(function(n) {
		return $.extend(n, {
			localeName: locale.t(e + n.type[t]()),
			localeScore: locale.t(e + n.type[t]() + "_SCORE"),
			avatar: dom.user_avatar(n.user)[0].outerHTML
		})
	}), r = $(template.render("BattleReportView_prizes", {
		prizes: i
	})), s.html(r)
}, BattleReportViewController.prototype.renderPlayerReport = function() {
	var e = "playerReport",
		t = "highlightedUnlocks",
		n = "length",
		r = this,
		i = r.data,
		s = {},
		o = ["gadgets", "weapons", "awards", "weaponaddons", "vehiclespecs", "dogtags"],
		u = r.$("#battlereport-playerreport"),
		a, f, l, c, h;
	s[e] = i[e], s.player = i.players[i[e].personaId], s.avatar = dom.user_avatar(i[e].user)[0].outerHTML, s.playerPrize = i.personalPrize, s[t] = [], s.isBfh = session.getActiveGame() == enums.Game.OMAHA;
	if (i[e].unlocks) {
		h = [], l = o[n];
		for (f = 0; f < l; f++) {
			c = i[e].unlocks[o[f]];
			if (!c) continue;
			Object.prototype.toString.call(c) !== "[object Array]" && (c = [c]), c = _.reject(c, function(e) {
				return e.group == "AwardGroup_Mission"
			});
			if (!c[n]) continue;
			Array.prototype.push.apply(h, c);
			if (h[n] > 2) break
		}
		s[t] = h.slice(0, 3)
	}
	a = $(template.render("BattleReportView_player_report", s)), u.html(a)
}, BattleReportViewController.prototype.renderScoreboard = function() {
	var e = this,
		t = e.data,
		n = t.players[t.playerReport.personaId].team,
		r = e.$el.find("#battlereport-scoreboard"),
		i;
	i = $(template.render("BattleReportView_scoreboard", {
		isBfh: session.getActiveGame() == enums.Game.OMAHA,
		teams: t.teams,
		players: t.players,
		allies: n
	})), r.html(i)
}, BattleReportViewController.prototype.renderActions = function() {
	var e = "data",
		t = "activePersona",
		n = "disableShareButton",
		r = "mayAddMoreFavorites",
		i = "#bn-favorite-battlereport",
		s = "#bn-share-battlereport",
		o = this,
		u = o[e],
		a = o.$el.find("#battlereport-actions"),
		f;
	if (!o[t] || o[t].personaId !== o[e].playerReport.personaId) o[e][n] = !0, u[r] = !1;
	f = $(template.render("BattleReportView_actions", {
		isFavorite: u.isFavorite,
		mayAddMoreFavorites: u[r]
	})), a.html(f), session.getUserHasPremium(u.game, u.platform) ? o.$(i).addClick(o.toggleFavorite.bind(o)) : o.$(i).addClass("disabled"), o[e] && o[e][n] ? o.$(s).remove() : o.$(s).addClick(function() {
		app.go("BattleReportShareViewController", {
			battlereport: o[e],
			reportId: o.reportId,
			platform: o[e].platform
		})
	})
}, BattleReportViewController.prototype.toggleFavorite = function(e) {
	var e = "isFavorite",
		t = "removefavoritebattlereport",
		n = "favoritebattlereport",
		r = "message",
		i = "showReceipt",
		s = "getViewsOfTypeBeforeIndex",
		o = "parentViewController",
		u = "BattleReportsView",
		a = this,
		f = a.data[e] ? t : n;
	web.request(a.game, f, {
		reportId: a.reportId,
		platform: a.data.platform
	}, function(l) {
		if (l) {
			l[r] === "Could not add battle report to favorites: You don't have access to battle report premium features" ? l[r] = locale.t("ID_WEB_PREMIUM_UPGRADE_AT") + " battlelog.com/premium" : f === n ? l[r] = locale.t("ID_WEB_BATTLEREPORT_ADD_TO_FAVORITES_FAILED") : f === t && (l[r] = locale.t("ID_WEB_BATTLEREPORT_REMOVE_FROM_FAVORITES_FAILED")), receipt[i](l[r], "error");
			return
		}
		var c;
		f === n ? (c = locale.t("ID_WEB_BATTLEREPORT_ADDED_TO_FAVORITES"), a.data[e] = !0) : f === t && (c = locale.t("ID_WEB_BATTLEREPORT_REMOVED_FROM_FAVORITES"), a.data[e] = !1), a.renderActions(), receipt[i](c), a[o][s](u, 0)[0] && a[o][s](u, 0)[0].refresh()
	})
}, BattleReportViewController.prototype.scoreTypeLocales = function(e) {
	return util.getScoreTypeLocales(e)
};