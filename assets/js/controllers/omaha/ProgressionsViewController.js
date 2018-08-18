function ProgressionsViewController(e) {
	var t = "_activePersona",
		n = "persona",
		r = "_mysoldier";
	e = e || {}, this._section = "omaha", this._game = enums.Game.OMAHA, this._name = "ProgressionsView", this._templateParams = {
		loading: !0
	}, this[t] = session.getUserActivePersonaForGame(this._game), this._persona = e[n] || this[t][n], this._platform = e.platform || this[t].platform, this[r] = this._persona == this[t][n], this._model = BL.backbone.get({
		model: {
			name: this[r] ? "items_list_model" : "items_list_friend_model"
		}
	}), this._model.fetch(this.get_url()), ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_STATS_PROGRESSION"
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
module.exports = ProgressionsViewController, ProgressionsViewController.prototype = new ScrollableViewController, ProgressionsViewController.prototype.constructor = ProgressionsViewController, ProgressionsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.bind_fetch(), e._model.get("progressionItems") && e.render(), e._model.on("change", e.render, e)
}, ProgressionsViewController.prototype.get_url = function() {
	return web.url(this._game, "progression", {
		personaId: this._persona.personaId,
		platform: this._platform
	})
}, ProgressionsViewController.prototype.bind_fetch = function() {
	var e = this;
	Push.bind("UserStatsUpdated", function() {
		e._model.set({
			loading: !0
		}, {
			silent: !0
		}).fetch(e.get_url())
	})
}, ProgressionsViewController.prototype.bind_events = function() {
	var e = "getAttribute",
		t = this;
	t.$content.find(".item:not(.empty)").on("click", function() {
		var n = this[e]("data-section"),
			r = this[e]("data-index"),
			i = _.sortBy(t._model.get("progressionItems")[n], "valueNeeded");
		app.go("ProgressionViewController", {
			section: t._section,
			item: i[r]
		})
	})
}, ProgressionsViewController.prototype.render = function() {
	var e = this,
		t = e._model.toJSON(),
		n = {},
		r = {
			assault: "ID_WEB_COMMON_OPERATOR",
			engineer: "ID_WEB_COMMON_MECHANIC",
			support: "ID_WEB_COMMON_ENFORCER",
			recon: "ID_WEB_COMMON_PROFESSIONAL",
			commander: "ID_WEB_COMMON_HACKER"
		};
	_.each(r, function(t, r) {
		var i = e._model.get("progressionItems")[r];
		_.each(i, function(e) {
			e.type = enums.StatItemType.SPECIALIZATION
		}), n[r] = {
			sid: t,
			items: _.sortBy(i, "valueNeeded")
		}
	}), e.$content.html(template.render("ProgressionsView", {
		loading: t.loading,
		sections: n,
		sectionOrder: ["assault", "engineer", "support", "recon", "commander"]
	})), e.bind_events()
};