function CampaignStatsViewController(e) {
	this._name = "CampaignStatsView", this._section = "warsaw", ScrollableViewController.call(this, e), this.level = e.level, this.titleSID = "ID_WEB_PROFILE_STATS_STATISTICS"
}
var app = require("app"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	web = require("web"),
	util = require("util"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = CampaignStatsViewController, CampaignStatsViewController.prototype = new ScrollableViewController, CampaignStatsViewController.prototype.constructor = CampaignStatsViewController, CampaignStatsViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, CampaignStatsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, CampaignStatsViewController.prototype.refresh = function() {
	var e = "ID_MOBILE_",
		t = "toUpperCase",
		n = "CampaignStatsListItemView",
		r = "formatStatValue",
		i = "StatEvent_Score_On_X",
		s = this,
		o = s.$el.find(".summary-scores"),
		u = "",
		a = ["StatEvent_Kill_On_X", "StatEvent_DogTag_On_X", "StatEvent_Headshot_On_X", "StatEvent_MultiKill_On_X", "StatEvent_AdrenalineKill_On_X", "StatEvent_TimedKillStreak_On_X", "StatEvent_AISquadKill_On_X"];
	for (var f in a) {
		var l = e + a[f][t]();
		u += template.render(n, {
			label: l,
			score: util[r](s.level.stats[a[f]] || 0)
		})
	}
	u += template.render(n, {
		label: e + i[t](),
		score: util[r](s.level.stats[i]) + "p"
	}), o.html(u)
};