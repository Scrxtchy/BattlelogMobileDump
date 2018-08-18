function ServerFiltersViewController(e) {
	var t = "ServerFiltersView";
	this._name = t, this.scrollViewTemplate = t, this._section = "warsaw", this._game = e.game, this._platform = e.platform, this._type = e.type || "overview", this._model = BL.backbone.get({
		model: "multiplayer_model"
	}), ScrollableViewController.call(this, e), this.titleSID = e.sid || "ID_MOBILE_MULTIPLAYER_FILTER"
}
var locale = require("locale"),
	enums = require("enums"),
	app = require("app"),
	template = require("template"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	receipt = require("receipt"),
	model = require("models/model.multiplayer"),
	serverdata = require("gamedata/warsaw/gameserver"),
	expansions = require("expansions");
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
		t = "gameslots",
		n = "gamemodes",
		r = "maps",
		i = "length",
		s = "push",
		o = "commanderGameslots",
		u = "ID_MOBILE_SERVER_FILTER_COMMANDER_SLOTS",
		a = "indexOf",
		f = "label",
		l = "isXpackReleased",
		c = this,
		h = c._model.get("filters"),
		p = "ServerFiltersView",
		d = [];
	if (c[e] == "overview") {
		d = [{
			label: "ID_WEB_COMMON_TYPE",
			type: "serverTypeFilter",
			values: []
		}, {
			label: "ID_WEB_SERVERGUIDE_GAME_SIZE",
			type: "gamesize",
			values: []
		}, {
			label: "ID_WEB_SERVERGUIDE_FREE_SLOTS",
			type: t,
			values: []
		}, {
			label: "ID_WEB_COMMON_SERVERFILTER_MODE",
			type: n,
			values: []
		}, {
			label: "ID_WEB_COMMON_SERVERFILTER_MAPS",
			type: r,
			values: []
		}, {
			label: "ID_WEB_COMMON_SERVERFILTER_PRESET",
			type: "gamepresets",
			values: []
		}, {
			label: "ID_WEB_SERVERGUIDE_FILTERREGION_REGIONS",
			type: "regions",
			values: []
		}];
		var v = 0,
			m = d[i];
		while (v < m) {
			var g = d[v],
				y = g.type,
				b = serverdata[y],
				w = 0;
			y == t && b[i] < 6 && b[s]({
				id: o,
				label: u
			});
			var E = b[i];
			g.values = locale.t("ID_WEB_COMMON_SERVERFILTER_ANY");
			if (h[y] && h[y][i]) {
				var S = [];
				while (w < E) {
					var x = b[w];
					h[y][a](x.id) != -1 && (isNaN(x[f]) ? S[s](locale.t(x[f])) : S[s](x[f])), w++
				}
				g.values = S.join(", ")
			}
			v++
		}
	} else {
		p = "ServerFiltersSelectionView";
		var T = serverdata[c[e]],
			N = 0;
		c[e] == t && T[i] < 6 && T[s]({
			id: o,
			label: u
		});
		var C = T[i];
		while (N < C) {
			var k = T[N],
				L = k[f],
				A = !0;
			L[a]("ID") != -1 && (L = locale.t(L));
			var O = {
				type: c[e],
				value: k.id,
				label: L,
				active: h[c[e]] && h[c[e]][a](k.id) != -1
			};
			if (c[e] == n) {
				var M = enums.gamemodeToXpack[O.value];
				M ? A = expansions[l](M, this.game, this.platform) : k.id == enums.GameMode.CONQUESTLADDER && (A = !1)
			}
			if (c[e] == r) {
				O.map = k.id.toLowerCase();
				var _ = expansions.xpackCodeFromString(O.map);
				_ && (A = expansions[l](_, this.game, this.platform), O.xpack = enums.GameExpansion[_])
			}
			A && d[s](O), N++
		}
	}
	template.render(p, d, function(e, t) {
		c.scrollView.$content.html(t), c.bindEvents()
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
			section: r._section,
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