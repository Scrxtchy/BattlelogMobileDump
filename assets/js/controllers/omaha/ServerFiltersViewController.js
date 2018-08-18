function ServerFiltersViewController(e) {
	var t = "ServerFiltersView";
	this._name = t, this.scrollViewTemplate = t, this._section = "omaha", this._game = e.game, this._platform = e.platform, this._type = e.type || "overview", this._model = BL.backbone.get({
		model: "omaha_multiplayer_model"
	}), ScrollableViewController.call(this, e), this.titleSID = e.sid || "ID_MOBILE_MULTIPLAYER_FILTER"
}
var locale = require("locale"),
	enums = require("enums"),
	app = require("app"),
	template = require("template"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	receipt = require("receipt"),
	model = require("models/omaha/model.multiplayer"),
	serverdata = require("gamedata/omaha/gameserver");
module.exports = ServerFiltersViewController, ServerFiltersViewController.prototype = new ScrollableViewController, ServerFiltersViewController.constructor = ServerFiltersViewController, ServerFiltersViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, ServerFiltersViewController.prototype.viewWillPop = function() {
	var e = this;
	e.parentViewController.getViewsOfType("ServerFiltersView").length == 1 && (e._model.updateStorage(), e._model.trigger("refresh"))
}, ServerFiltersViewController.prototype.viewDidLoad = function() {
	var e = this;
	e._model.on("change:filters", e.render, e), ScrollableViewController.prototype.viewDidLoad.call(e), e.render()
}, ServerFiltersViewController.prototype.render = function() {
	var e = "_type",
		t = "maps",
		n = "length",
		r = "indexOf",
		i = this,
		s = i._model.get("filters"),
		o = "ServerFiltersView",
		u = [];
	if (i[e] == "overview") {
		u = [{
			label: "ID_WEB_COMMON_TYPE",
			type: "serverTypeFilter",
			values: []
		}, {
			label: "ID_WEB_SERVERGUIDE_GAME_SIZE",
			type: "gamesize",
			values: []
		}, {
			label: "ID_WEB_SERVERGUIDE_FREE_SLOTS",
			type: "gameslots",
			values: []
		}, {
			label: "ID_WEB_COMMON_SERVERFILTER_MODE",
			type: "gamemodes",
			values: []
		}, {
			label: "ID_WEB_COMMON_SERVERFILTER_MAPS",
			type: t,
			values: []
		}, {
			label: "ID_WEB_COMMON_SERVERFILTER_PRESET",
			type: "gamepresets",
			values: []
		}];
		var a = 0,
			f = u[n];
		while (a < f) {
			var l = u[a],
				c = l.type,
				h = serverdata[c],
				p = 0,
				d = h[n];
			l.values = locale.t("ID_WEB_COMMON_SERVERFILTER_ANY");
			if (s[c] && s[c][n]) {
				var v = [];
				while (p < d) {
					var m = h[p];
					s[c][r](m.id) != -1 && v.push(locale.t(m.label)), p++
				}
				l.values = v.join(", ")
			}
			a++
		}
	} else {
		o = "ServerFiltersSelectionView";
		var g = serverdata[i[e]],
			y = 0,
			b = g[n];
		while (y < b) {
			var w = g[y],
				E = w.label;
			E[r]("ID") != -1 && (E = locale.t(E));
			var S = {
				type: i[e],
				value: w.id,
				label: E,
				active: s[i[e]] && s[i[e]][r](w.id) != -1
			};
			i[e] == t && (S.map = w.id.toLowerCase()), u.push(S), y++
		}
	}
	template.render(o, u, function(e, t) {
		i.scrollView.$content.html(t), i.bindEvents()
	})
}, ServerFiltersViewController.prototype.bindEvents = function() {
	var e = "scrollView",
		t = "_model",
		n = "getAttribute",
		r = this;
	r[e].$content.find(".clear").addClick(function() {
		r[t].clearFilter(), receipt.showReceipt(locale.t("ID_MOBILE_FILTERS_RESET_SUCCESS"))
	}), r[e].$content.find(".sectionbutton, .sectionmessage").addClick(function() {
		var e = this[n]("data-type") || !1,
			i = this[n]("data-value") || !1;
		if (!i) app.go("ServerFiltersViewController", {
			game: r._game,
			sid: this[n]("data-sid"),
			platform: r._platform,
			type: e
		});
		else {
			isNaN(parseInt(i, 10)) || (i = parseInt(i, 10));
			var s = r[t].get("filters");
			s[e] = s[e] || [];
			var o = s[e].indexOf(i);
			o == -1 ? s[e].push(i) : (s[e] = s[e].filter(function(e) {
				return e != i
			}), s[e].length || delete s[e]), r[t].set({
				filters: s
			}).trigger("change:filters")
		}
	})
};