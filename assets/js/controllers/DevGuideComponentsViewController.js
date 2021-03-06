function DevGuideComponentsViewController(e) {
	this._name = "DevGuideComponentsView", this._section = null, this.game = session.getActiveGame(), ScrollableViewController.call(this, e), this.title = "UI Components"
}
var app = require("app"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = DevGuideComponentsViewController, DevGuideComponentsViewController.prototype = new ScrollableViewController, DevGuideComponentsViewController.constructor = DevGuideComponentsViewController, DevGuideComponentsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.bindEvents()
}, DevGuideComponentsViewController.prototype.bindEvents = function() {
	var e = this;
	e.$(".sectionbutton.example1").addClick(function() {}), e.$(".sectionbutton.example2").addClick(function() {})
};