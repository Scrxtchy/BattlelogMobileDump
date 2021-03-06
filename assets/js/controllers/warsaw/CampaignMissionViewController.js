function CampaignMissionViewController(e) {
	this._name = "CampaignMissionView", this._section = "warsaw", this.game = enums.Game.WARSAW, this.platform = e.platform, this.personaId = e.personaId, this.level = e.level, this.titleSID = e.level.name, this.hasLoader = !0, ScrollableViewController.call(this, e)
}
var app = require("app"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	web = require("web"),
	assets = require("assets"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = CampaignMissionViewController, CampaignMissionViewController.prototype = new ScrollableViewController, CampaignMissionViewController.prototype.constructor = CampaignMissionViewController, CampaignMissionViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, CampaignMissionViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, CampaignMissionViewController.prototype.refresh = function() {
	var e = this;
	e.renderView(), e.$el.find(".hidden").removeClass("hidden"), e.bindEvents()
}, CampaignMissionViewController.prototype.bindEvents = function() {
	var e = "addClick",
		t = "_section",
		n = this;
	n.$el.find("#mission-leaderboard-bn")[e](function() {
		app.go("CampaignLeaderboardViewController", {
			section: n[t],
			personaId: n.personaId,
			platform: n.platform,
			level: n.level
		})
	}), n.$el.find("#mission-statistics-bn")[e](function() {
		app.go("CampaignStatsViewController", {
			section: n[t],
			personaId: n.personaId,
			platform: n.platform,
			level: n.level
		})
	}), n.$el.find("#dogtags-found .col")[e](function(e) {
		var r = $(this),
			i = r.attr("data-index"),
			s = r.attr("data-type");
		app.go("ItemViewController", {
			section: n[t],
			type: "dogtag",
			index: Number(i),
			tag_type: "advanced"
		})
	})
}, CampaignMissionViewController.prototype.renderView = function() {
	var e = "level",
		t = "render",
		n = "imageConfig",
		r = "CampaignMissionItem",
		i = "collectibles",
		s = "unlocked",
		o = "dogtags",
		u = this,
		a = u.$el.find("#progression-container"),
		f;
	u[e].taken.HARD ? f = "ID_MOBILE_CAMPAIGN_COMPLETED_HARD" : u[e].taken.NORMAL ? f = "ID_MOBILE_CAMPAIGN_COMPLETED_NORMAL" : u[e].taken.EASY ? f = "ID_MOBILE_CAMPAIGN_COMPLETED_EASY" : f = "ID_MOBILE_CAMPAIGN_NOT_COMPLETED", u.$el.find("#mission-header").html(template[t]("CampaignMissionHeader", {
		img: u[e].img,
		name: u[e].name,
		completion: f,
		score: u[e].stats.StatEvent_Score_On_X || 0
	}));
	var l = "";
	u[e].assignments.forEach(function(e, r) {
		l += template[t]("CampaignMissionProgress", {
			index: e.index,
			code: e.code,
			actualValue: e.criterias[0].actualValue,
			completionValue: e.criterias[0].originalCriteria.completionValue,
			slug: e[n].slug,
			progressBar: template[t]("ui_progressbar", {
				percent: e.completion,
				type: "warning",
				size: "thick",
				border: !1
			})
		})
	}), a.html(l), u.$el.find("#weapons-found").html(template[t](r, {
		title: locale.t("ID_WEB_CAMPAIGN_WEAPONS_FOUND"),
		items: [],
		total: u[e][i].weapons.total,
		found: u[e][i].weapons[s]
	}));
	var c = [];
	u[e][i][o].items.forEach(function(e, t) {
		var r = e.dogTagUnlock;
		c.push({
			index: r.index,
			found: r[s],
			slug: r[n].slug
		})
	}), u.$el.find("#dogtags-found").html(template[t](r, {
		title: locale.t("ID_WEB_CAMPAIGN_DOGTAGS_FOUND"),
		items: c,
		total: u[e][i][o].total,
		found: u[e][i][o][s]
	}))
};