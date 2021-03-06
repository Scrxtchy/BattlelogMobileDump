function ProfileSoldiersViewController(e) {
	this._name = "ProfileSoldiersView", this._section = "omaha", ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_AGENTS"
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
	ScrollableViewController.prototype.viewDidLoad.call(t), t.$("h1 span").html(t.username), t.soldiers.forEach(function(n) {
		if (n.game != enums.Game.OMAHA) return;
		var r = "";
		n[e] && n[e].picture && (r = n[e].picture);
		var i = $(template.render("soldier_row_large", {
			name: n.persona.personaName,
			game: "omaha",
			premium: !1,
			platform: enums.Platform.toString(n.platform),
			stats: n.stats,
			picture: util.getOmahaSoldierImageUrl("medium", r)
		}));
		i.addClick(function() {
			app.go("StatsViewController", {
				section: t._section,
				persona: n.persona,
				platform: n.platform
			})
		}), t.$(".section.soldiers").append(i)
	})
};