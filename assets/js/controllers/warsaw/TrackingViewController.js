function TrackingViewController(e) {
	var t = "_activePersona",
		n = "persona";
	e = e || {}, this._section = "warsaw", this._game = enums.Game.WARSAW, this._name = "TrackingView", this[t] = session.getUserActivePersonaForGame(this._game), this._persona = e[n] || this[t][n], this._platform = e.platform || this[t].platform, this._mysoldier = this._persona == this[t][n], this._model = BL.backbone.get({
		model: {
			name: "tracking_model"
		}
	}), ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_TRACKING"
}
var app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	util = require("util"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	web = require("web"),
	template = require("template"),
	_ = require("underscore"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	model = require("models/model.tracking");
module.exports = TrackingViewController, TrackingViewController.prototype = new ScrollableViewController, TrackingViewController.prototype.constructor = TrackingViewController, TrackingViewController.prototype.viewDidLoad = function() {
	var e = "_model",
		t = this;
	ScrollableViewController.prototype.viewDidLoad.call(t), t[e].get("suggestions") ? t.render() : t[e].fetch(t.get_url()), t[e].on("change", t.render, t)
}, TrackingViewController.prototype.get_url = function() {
	var e = "_persona";
	return web.url(this._game, "suggestions", {
		personaId: this[e].personaId,
		platform: this._platform,
		userId: this[e].userId,
		personaName: this[e].personaName
	})
}, TrackingViewController.prototype.bind_events = function() {
	var e = this;
	e.$content.find(".item:not(.empty)").on("click", function() {
		var t = this.getAttribute("data-code");
		app.go("ItemViewController", {
			section: e._section,
			type: "assignment",
			code: t
		})
	})
}, TrackingViewController.prototype.render = function() {
	var e = this,
		t = e._model.toJSON();
	e.$content.html(template.render("TrackingView", {
		loading: t.loading
	})), e.bind_events()
};