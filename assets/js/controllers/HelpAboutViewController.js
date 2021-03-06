function HelpAboutViewController(e) {
	this._name = "HelpAboutView", this._game = session.getActiveGame(), ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_HELPABOUT", this.backButtonTitleSID = "ID_MOBILE_COMMON_BACK"
}
var app = require("app"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	eula = require("eula"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = HelpAboutViewController, HelpAboutViewController.prototype = new ScrollableViewController, HelpAboutViewController.constructor = HelpAboutViewController, HelpAboutViewController.prototype.viewDidLoad = function() {
	var e = "$content",
		t = "hidden",
		n = this;
	ScrollableViewController.prototype.viewDidLoad.call(n), n._game != enums.Game.BF3 && n[e].find(".sectionbutton.roc").removeClass(t), n._game == enums.Game.OMAHA && n[e].find(".sectionbutton.help").addClass(t), (!device.isiOS() && !device.isAndroid() || device.isWebApp()) && n[e].find(".sectionbutton.usagesharing").addClass(t), n.bindEvents()
}, HelpAboutViewController.prototype.bindEvents = function() {
	var e = "addClick",
		t = "find",
		n = "$content",
		r = "addClass",
		i = "external",
		s = "goExternal",
		o = "getLegalUrl",
		u = this;
	u[n][t](".sectionbutton.about")[e](function() {
		app.go("AboutViewController")
	}), u[n][t](".sectionbutton.eula")[r](i)[e](function() {
		app[s](eula[o]("mobileeula"))
	}), u[n][t](".sectionbutton.privacypolicy")[r](i)[e](function() {
		app[s](eula[o]("WEBPRIVACY"))
	}), u[n][t](".sectionbutton.tos")[r](i)[e](function() {
		app[s](eula[o]("WEBTERMS"))
	}), u[n][t](".sectionbutton.usagesharing")[e](function() {
		app.go("UsageSharingViewController")
	}), u[n][t](".sectionbutton.roc")[r](i)[e](function() {
		app[s](eula[o]("ROC"))
	}), u[n][t](".sectionbutton.help")[e](function() {
		app.go("HelpViewController")
	})
};