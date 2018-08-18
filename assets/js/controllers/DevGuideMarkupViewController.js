function DevGuideMarkupViewController(e) {
	this._name = "DevGuideMarkupView", this._section = null, this.game = session.getActiveGame(), ScrollableViewController.call(this, e), this.title = "Markup"
}
var app = require("app"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = DevGuideMarkupViewController, DevGuideMarkupViewController.prototype = new ScrollableViewController, DevGuideMarkupViewController.constructor = DevGuideMarkupViewController;