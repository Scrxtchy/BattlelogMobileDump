function HelpViewController(e) {
	this._name = "HelpView", ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_HELP"
}
var ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = HelpViewController, HelpViewController.prototype = new ScrollableViewController, HelpViewController.constructor = HelpViewController;