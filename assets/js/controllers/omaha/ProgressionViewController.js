function ProgressionViewController(e) {
	var t = "_activePersona",
		n = "persona";
	e = e || {}, this._section = "omaha", this._game = enums.Game.OMAHA, this._name = "ProgressionView", this._templateParams = {
		loading: !0
	}, this[t] = session.getUserActivePersonaForGame(this._game), this._persona = e[n] || this[t][n], this._platform = e.platform || this[t].platform, this._mysoldier = this._persona == this[t][n], this._item = e.item, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_STATS_PROGRESSION"
}
var app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	util = require("util"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	Push = require("push"),
	web = require("web"),
	template = require("template"),
	_ = require("underscore"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	model = require("models/model.items");
module.exports = ProgressionViewController, ProgressionViewController.prototype = new ScrollableViewController, ProgressionViewController.prototype.constructor = ProgressionViewController, ProgressionViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.render()
}, ProgressionViewController.prototype.render = function() {
	var e = this;
	e.$content.html(template.render("ProgressionView", {
		item: this._item,
		loading: !1
	}))
};