function LoadoutViewController(e) {
	var t = "_activePersona",
		n = "persona";
	e = e || {}, this._name = "LoadoutView", this._section = "omaha", this._game = e.game || enums.Game.OMAHA, this[t] = session.getUserActivePersonaForGame(this._game), this._persona = e[n] || this[t][n], this._platform = e.platform || this[t].platform, this._mysoldier = this._persona == this[t][n], ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_COMMON_LOADOUT"
}
var enums = require("enums"),
	util = require("util"),
	web = require("web"),
	receipt = require("receipt"),
	app = require("app"),
	locale = require("locale"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = LoadoutViewController, LoadoutViewController.prototype = new ScrollableViewController, LoadoutViewController.prototype.constructor = LoadoutViewController, LoadoutViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e)
}, LoadoutViewController.prototype.viewDidAppear = function() {
	var e = "loadoutReact",
		t = "$backButton",
		n = "pushLeft",
		r = this,
		i = {};
	i.isMyLoadout = !0, i.loadoutPersonaId = this._persona.personaId + "", i.loadoutPlatform = this._platform + "", i.availableKits = [{
		name: "BFH_ID_M_MASTERMIND",
		image: {
			slug: "kit-1"
		}
	}, {
		name: "BFH_ID_M_TECHNICIAN",
		image: {
			slug: "kit-2"
		}
	}, {
		name: "BFH_ID_M_ENFORCER",
		image: {
			slug: "kit-32"
		}
	}, {
		name: "BFH_ID_M_PROFESSIONAL",
		image: {
			slug: "kit-8"
		}
	}], require(["js/../public/jsx/loadout/index.js", "js/../public/jsx/loadout/store.js"], function(s) {
		r[e] = s, r[e].initcallback(i);
		var o = $(".drawertoggle").closest(".left");
		r[e].on("componentDidUpdate", function() {
			if (!r[t] || !r[t].length) return;
			r.$content.find(".back-link").length ? (r[t].show(), o.hasClass(n) || o.addClass(n)) : r.popViewCallback || (r[t].hide(), o.hasClass(n) && o.removeClass(n))
		})
	})
}, LoadoutViewController.prototype.viewDidDisappear = function() {
	var e = "location",
		t = "#vehicles",
		n = window[e].hash.split("/");
	n[0] == t ? window[e].hash = t : window[e].hash = n[0] + "/" + n[1] + "/presets"
}, LoadoutViewController.prototype.handleBackButton = function(e, t) {
	var n = "popViewCallback",
		r = this;
	r.$backButton = e, r[n] = t, e.on("click", function() {
		r.$content.find(".back-link").length ? document.location.href = r.$content.find(".back-link:eq(0)").attr("href") : r[n]()
	}), r[n] || e.hide()
};