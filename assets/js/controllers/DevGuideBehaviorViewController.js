function DevGuideBehaviorViewController(e) {
	this._name = "DevGuideBehaviorView", this._section = null, this.game = session.getActiveGame(), ScrollableViewController.call(this, e), this.title = "Behavior"
}
var app = require("app"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = DevGuideBehaviorViewController, DevGuideBehaviorViewController.prototype = new ScrollableViewController, DevGuideBehaviorViewController.constructor = DevGuideBehaviorViewController;