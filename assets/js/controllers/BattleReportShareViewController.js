function BattleReportShareViewController(e) {
	var t = "getActiveGame",
		n = "AppGameName";
	this._name = "BattleReportShareView", this._section = null, this.data = e.battlereport, this.game = session[t](), this.gameName = enums[n][this.game], this.activePersona = session.getUserActivePersonaForGame(this.game), ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_REPORTS_SHARE", require(["gamedata/" + enums[n][session[t]()] + "/levels"], function(e) {
		leveldata = e
	})
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
	ScrollableViewController = require("controllers/ScrollableViewController"),
	leveldata = null;
module.exports = BattleReportShareViewController, BattleReportShareViewController.prototype = new ScrollableViewController, BattleReportShareViewController.prototype.constructor = BattleReportShareViewController, BattleReportShareViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, BattleReportShareViewController.prototype.viewDidLoad = function(e) {
	var t = "personaId",
		n = "teams",
		r = "gameServer",
		i = "GameMode",
		s = "push",
		o = "toLowerCase",
		u = "getActiveGame",
		a = "activePersona";
	e || (e = function() {});
	var f = this;
	ScrollableViewController.prototype.viewDidLoad.call(f), f.$el.find(".avatar-container").html(dom.user_avatar(session.getUser()));
	var l = f.data,
		c = l.playerReport,
		h = l.players[c[t]],
		p = l[n][h.team].players.indexOf(h[t]) + 1,
		d = l.kills;
	h.deaths > 0 && (d = h.kills / h.deaths);
	var v = {
			battleReport: {
				game: this.data.game,
				kills: h.kills,
				map: l[r].map,
				serverName: l[r].name,
				teams: {
					1: l[n][1].name,
					2: l[n][2].name
				},
				bestKit: c.best.class,
				bestVehicle: c.best.vehicle,
				bestWeapon: c.best.weapon,
				spm: c.stats.spm,
				score: c.scores.total,
				duration: l.duration,
				position: p,
				skill: c.stats.skill,
				kdr: d,
				counters: {
					kill: {
						1: l[n][1].score,
						2: l[n][2].score
					}
				},
				personalPrize: l.personalPrize
			}
		},
		m = [];
	switch (l[r].mapMode) {
		case enums[i].OBLITERATION:
			m[s]("ID_WEB_BATTLEREPORT_TEAM_SCORE_OBJECTIVES");
			break;
		case enums[i].RUSH:
			m[s](null), m[s]("ID_WEB_BATTLEREPORT_TEAM_SCORE_TICKETS_REDUCED");
			break;
		case enums[i].ELIMINATION:
			m[s]("ID_WEB_BATTLEREPORT_TEAM_SCORE_ROUNDS");
			break;
		case enums[i].SQDM:
		case enums[i].TEAMDEATHMATCH:
			m[s]("ID_WEB_BATTLEREPORT_TEAM_SCORE_KILLS");
			break;
		case enums[i].CAPTURETHEFLAG:
			m[s]("ID_WEB_BATTLEREPORT_TEAM_SCORE_FLAGS_CAPTURED");
			break;
		default:
			m[s]("ID_WEB_BATTLEREPORT_TEAM_SCORE_TICKETS")
	}
	var g;
	this.game == enums.Game.WARSAW ? g = assets.CDNResourceURL("/public/base/bf4/map_images/992x345/" + l[r].map[o]() + ".jpg") : this.game == enums.Game.OMAHA && (g = "images/omaha/gamedata/maps/992x345/" + l[r].map[o]() + ".png");
	var y;
	session[u]() == enums.Game.OMAHA ? y = util.getBFHGameModeSID(c.gameMode) : y = "ID_WEB_COMMON_GAMEMODE_" + c.gameMode;
	var b = $(template.render("end_of_round", {
		isBfh: session[u]() == enums.Game.OMAHA,
		isActivePlayer: c && f[a] && c[t] === f[a][t],
		map: leveldata.levels[l[r].map] ? leveldata.levels[l[r].map].label : "Unknown",
		gameMode: l[r].mapMode,
		mapModeSid: y,
		duration: util.friendlyDuration(l.duration),
		player: h,
		teams: l[n],
		scoreTypeLocales: m,
		mapImage: g,
		size: "mobile-feed"
	}));
	f.$el.find("#battlereport-box-container").html(b).append($(template.render("share_battlereport_box", v))), f.$el.find(".sectionloading").remove(), f.bindEvents()
}, BattleReportShareViewController.prototype.bindEvents = function() {
	var e = "disabled",
		t = "showReceipt",
		n = "skull",
		r = this,
		i = r.$el.find(".button.primary");
	i.addClick(function() {
		if (i.attr(e)) return;
		i.attr(e, e), web.request(r.game, "sharebattlereport", {
			reportId: r.reportId,
			platform: r.platform,
			comment: r.$el.find(".share-comment-textarea").val()
		}, function(s, o) {
			s ? s == "ALREADY_SHARED" ? receipt[t](locale.t("ID_MOBILE_BATTLEREPORT_ALREADYSHARED"), n) : (i.removeAttr(e, e), receipt[t](locale.t("ID_WEB_BATTLEREPORT_SHARE_TO_FEED_UNABLE"), n)) : (receipt[t](locale.t("ID_WEB_BATTLEREPORT_SHARE_TO_FEED_SUCCESSFULLY")), session.refreshFeed = !0, r.data.disableShareButton = !0, r.navigationController.goBack())
		})
	})
};