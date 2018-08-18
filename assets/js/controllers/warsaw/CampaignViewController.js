function CampaignViewController(e) {
	var t = "activePersona",
		n = "personaId";
	this._name = "CampaignView", this._section = "warsaw", this.hasLoader = !0, this.game = enums.Game.WARSAW, this[t] = session.getUserActivePersonaForGame(this.game), this[n] = e[n] || this[t].persona[n], this.platform = e.platform, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_CAMPAIGN_TITLE"
}
var app = require("app"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	web = require("web"),
	assets = require("assets"),
	util = require("util"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = CampaignViewController, CampaignViewController.prototype = new ScrollableViewController, CampaignViewController.prototype.constructor = CampaignViewController, CampaignViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, CampaignViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, CampaignViewController.prototype.refresh = function() {
	var e = this;
	web.request(e.game, "campaign", {
		personaId: e.personaId,
		platform: e.platform,
		level: null
	}, function(t, n) {
		if (t) return;
		e.data = n, e.renderView(), e.$el.find(".hidden").removeClass("hidden"), e.bindEvents()
	})
}, CampaignViewController.prototype.bindEvents = function() {
	var e = this;
	e.$("#summary-bn").addClick(function() {
		app.go("CampaignSummaryViewController", {
			section: "warsaw",
			platform: e.platform,
			campaignData: e.data
		})
	})
}, CampaignViewController.prototype.renderView = function() {
	var e = "campaign",
		t = "unlocked",
		n = this,
		r = n.$el.find(".campaign-menu");
	n.$el.find("#summary-bn").html(template.render("CampaignSummaryButton", {
		score: util.formatStatValue(n.data[e].totalScore || 0),
		completed: n.data[e].completed
	})), n.data[e].levelOrder.forEach(function(i, s) {
		var o = n.data[e].progress[i],
			u = [];
		u.push(i.toLowerCase()), o[t] && u.push(t);
		var a = i.replace("sp", "sp_0"),
			f = $(template.render("CampaignMenuItemView", {
				nr: s + 1,
				name: o.name,
				unlocked: o[t],
				taken: o.taken,
				img: a,
				elemclasses: u.join(" ")
			}));
		o[t] && (o.img = a, f.addClick(function() {
			app.go("CampaignMissionViewController", {
				section: n._section,
				platform: n.platform,
				level: o,
				img: a
			})
		})), r.append(f)
	})
};