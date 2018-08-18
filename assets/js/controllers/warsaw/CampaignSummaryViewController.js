function CampaignSummaryViewController(e) {
	this._name = "CampaignSummaryView", this._section = "warsaw", this.game = enums.Game.WARSAW, this.platform = e.platform, this.personaId = e.personaId, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_CAMPAIGN_SUMMARY"
}
var app = require("app"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	web = require("web"),
	util = require("util"),
	assets = require("assets"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = CampaignSummaryViewController, CampaignSummaryViewController.prototype = new ScrollableViewController, CampaignSummaryViewController.prototype.constructor = CampaignSummaryViewController, CampaignSummaryViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, CampaignSummaryViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, CampaignSummaryViewController.prototype.refresh = function() {
	var e = this;
	e.renderScores(), e.renderAssignments(), e.$el.find(".hidden").removeClass("hidden"), e.bindEvents()
}, CampaignSummaryViewController.prototype.bindEvents = function() {
	var e = this;
	e.$el.find("#leaderboard-bn").addClick(function() {
		app.go("CampaignLeaderboardViewController", {
			section: e._section,
			personaId: e.personaId,
			platform: e.platform
		})
	}), e.$el.find("#assignments .col").addClick(function(t) {
		var n = $(this),
			r = n.attr("data-index"),
			i = n.attr("data-code");
		app.go("ItemViewController", {
			section: e._section,
			type: "assignment",
			code: i,
			index: Number(r)
		})
	})
}, CampaignSummaryViewController.prototype.renderScores = function() {
	var e = "campaignData",
		t = this,
		n = t.$el.find("#summary-scores"),
		r = "";
	t[e].campaign.levelOrder.forEach(function(n, i) {
		var s = t[e].campaign.progress[n];
		r += template.render("CampaignSummaryListItemView", {
			code: n,
			label: s.name,
			score: util.formatStatValue(s.stats.StatEvent_Score_On_X || 0),
			unlocked: s.unlocked
		})
	}), n.html(r)
}, CampaignSummaryViewController.prototype.renderAssignments = function() {
	var e = this,
		t = e.$el.find("#assignments").find(".sectiontable"),
		n = "";
	e.campaignData.campaign.assignments.forEach(function(e, t) {
		t % 2 === 0 && (n += '<div class="row">'), n += template.render("CampaignSummaryAssignmentView", {
			index: e.index,
			code: e.code,
			taken: e.completion === 100,
			slug: e.imageConfig.slug
		}), t % 2 === 1 && (n += "</div>")
	}), t.html(n)
};