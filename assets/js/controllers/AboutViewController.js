function AboutViewController(e) {
	this._name = "AboutView", ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_ABOUT"
}
var app = require("app"),
	locale = require("locale"),
	device = require("device"),
	util = require("util"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = AboutViewController, AboutViewController.prototype = new ScrollableViewController, AboutViewController.constructor = AboutViewController, AboutViewController.prototype.viewDidLoad = function() {
	var e = "find",
		t = "$content",
		n = "addClick",
		r = "goExternal",
		i = this;
	ScrollableViewController.prototype.viewDidLoad.call(i), i[t][e](".app-version").text(util.getAppVersionString()), device.isTablet() && i[t][e](".app-version-info").text(", TABLET VERSION"), i[t][e]("a.eula")[n](function() {
		app[r](locale.t("ID_MOBILE_URL_EULA"))
	}), i[t][e]("a.privacypolicy")[n](function() {
		app[r](locale.t("ID_MOBILE_URL_PRIVACYPOLICY"))
	}), i[t][e]("a.tos")[n](function() {
		app[r](locale.t("ID_MOBILE_URL_TOS"))
	})
};