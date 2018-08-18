function EmblemEditorViewController(e) {
	this.game = enums.Game.WARSAW, SharedEmblemEditorViewController.call(this, e)
}
var enums = require("enums"),
	SharedEmblemEditorViewController = require("controllers/EmblemEditorViewController");
module.exports = EmblemEditorViewController, EmblemEditorViewController.prototype = new SharedEmblemEditorViewController, EmblemEditorViewController.prototype.constructor = EmblemEditorViewController, EmblemEditorViewController.viewDidLoad = function() {
	var e = this;
	e.emblem.controlsColor = "#fff", SharedEmblemEditorViewController.prototype.viewDidLoad.call(e)
};