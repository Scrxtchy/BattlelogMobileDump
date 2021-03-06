function ProfileSoldiersViewController(e) {
	this._name = "ProfileSoldiersView", this._section = "warsaw", ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_SOLDIERS", this.title = "Soldiers"
}
var app = require("app"),
	dom = require("dom"),
	web = require("web"),
	util = require("util"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	assets = require("assets"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = ProfileSoldiersViewController, ProfileSoldiersViewController.prototype = new ScrollableViewController, ProfileSoldiersViewController.constructor = ProfileSoldiersViewController, ProfileSoldiersViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, ProfileSoldiersViewController.prototype.viewDidLoad = function() {
	var e = "personaInfo",
		t = this;
	ScrollableViewController.prototype.viewDidLoad.call(t), t.soldiers.forEach(function(n) {
		if (n.game != enums.Game.WARSAW) return;
		var r = "",
			i = "";
		n[e] && n[e].picture && (r = n[e].picture), n[e] && n[e].tag && (i = n[e].tag);
		var s = $(template.render("soldier_row_large", {
			name: n.persona.personaName,
			game: "warsaw",
			premium: !1,
			platform: enums.Platform.toString(n.platform),
			stats: n.stats,
			picture: util.getBf4SoldierImageUrl("medium", r),
			tag: i
		}));
		s.addClick(function() {
			app.go("StatsViewController", {
				section: t._section,
				persona: n.persona,
				platform: n.platform,
				user: t.user
			})
		}), t.$(".section.soldiers").append(s)
	})
};