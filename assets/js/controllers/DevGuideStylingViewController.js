function DevGuideStylingViewController(e) {
	this._name = "DevGuideStylingView", this._section = null, this.game = session.getActiveGame(), ScrollableViewController.call(this, e), this.title = "Styling"
}
var app = require("app"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = DevGuideStylingViewController, DevGuideStylingViewController.prototype = new ScrollableViewController, DevGuideStylingViewController.constructor = DevGuideStylingViewController;