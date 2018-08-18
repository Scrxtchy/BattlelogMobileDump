function DevGuideHomeViewController(e) {
	this._name = "DevGuideHomeView", this._section = null, this.game = session.getActiveGame(), ScrollableViewController.call(this, e), this.title = "Devguide"
}
var app = require("app"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = DevGuideHomeViewController, DevGuideHomeViewController.prototype = new ScrollableViewController, DevGuideHomeViewController.constructor = DevGuideHomeViewController, DevGuideHomeViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.bindEvents()
}, DevGuideHomeViewController.prototype.bindEvents = function() {
	var e = "addClick",
		t = "goExternal",
		n = this;
	n.$(".sectionbutton.styling")[e](function() {
		app.go("DevGuideStylingViewController")
	}), n.$(".sectionbutton.markup")[e](function() {
		app.go("DevGuideMarkupViewController")
	}), n.$(".sectionbutton.components")[e](function() {
		app.go("DevGuideComponentsViewController")
	}), n.$(".sectionbutton.vc-overview")[e](function() {
		app[t]("https://github.dice.ad.ea.com/battlelog/mobile-shared/blob/feature-bl2/docs/ViewControllers.md")
	}), n.$(".sectionbutton.templating")[e](function() {
		app[t]("https://github.dice.ad.ea.com/battlelog/mobile-shared/blob/feature-bl2/docs/Templating.md")
	})
};