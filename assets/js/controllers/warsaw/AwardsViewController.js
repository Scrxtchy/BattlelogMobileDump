function AwardsViewController(e) {
	var t = "_activePersona",
		n = "persona",
		r = "_mysoldier";
	e = e || {}, this._section = "warsaw", this._game = enums.Game.WARSAW, this._name = "AwardsView", this._templateParams = {
		loading: !0
	}, this[t] = session.getUserActivePersonaForGame(this._game), this._persona = e[n] || this[t][n], this._platform = e.platform || this[t].platform, this[r] = this._persona == this[t][n], this._model = BL.backbone.get({
		model: {
			name: this[r] ? "awards_model" : "awards_friend_model"
		}
	}), this._model.fetch(this.get_url()), ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_AWARDS"
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
	json = require("gamedata/warsaw/awards").mp,
	awards_json = json.AwardGroup_Medals,
	ribbons_json = json.AwardGroup_Ribbons,
	ScrollableViewController = require("controllers/ScrollableViewController"),
	model = require("models/model.awards");
module.exports = AwardsViewController, AwardsViewController.prototype = new ScrollableViewController, AwardsViewController.prototype.constructor = AwardsViewController, AwardsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.bind_fetch(), e._model.get("groupedMedalAwards") && e.render(), e._model.on("change", e.render, e)
}, AwardsViewController.prototype.get_url = function() {
	var e = "_persona";
	return web.url(this._game, "awards", {
		personaId: this[e].personaId,
		platform: this._platform,
		userId: this[e].userId,
		personaName: this[e].personaName
	})
}, AwardsViewController.prototype.bind_fetch = function() {
	var e = this;
	Push.bind("UserStatsUpdated", function() {
		e._model.set({
			loading: !0
		}, {
			silent: !0
		}).fetch(e.get_url())
	})
}, AwardsViewController.prototype.bind_events = function() {
	var e = "getAttribute",
		t = this;
	t.$content.find(".item:not(.empty)").on("click", function() {
		var n = this[e]("data-code"),
			r = this[e]("data-dependency"),
			i = t._model.get("medalAwardByCode")[n];
		app.go("ItemViewController", {
			section: t._section,
			type: "award",
			medal: i,
			code: n,
			dependency: r
		})
	})
}, AwardsViewController.prototype.render = function() {
	var e = "groupedMedalAwards",
		t = "undefined",
		n = "dependencies",
		r = "ribbon",
		i = !0,
		s = "timesTaken",
		o = "imageConfig",
		u = this,
		a = u._model.toJSON(),
		f = 0,
		l = 0,
		c = 0,
		h = 0,
		p = {},
		d = {
			general: "ID_WEB_COMMON_STATS_GENERAL",
			vehicles: "ID_WEB_COMMON_VEHICLES",
			team: "ID_WEB_COMMON_TEAM",
			kits: "ID_WEB_COMMON_KITS",
			weapon: "ID_WEB_COMMON_WEAPONS",
			gamemode: "ID_WEB_COMMON_GAMEMODE"
		};
	for (var v in a[e]) {
		var m = a[e][v],
			g = 0,
			y = m.length,
			b = [];
		while (g < y) {
			var w = m[g],
				E = a.medalAwardByCode[w],
				S = awards_json[w];
			if (typeof S !== t) {
				var x = 0,
					T = E.award[n].length;
				S[r] = null, S.locked = i, S[s] = E[s];
				while (x < T) {
					var N = E.award[n][x].code;
					if (N) {
						var C = ribbons_json[N];
						typeof C !== t && (S[r] = a.ribbonAwardByCode[N], S[r][o] = C[o], S[r][s] && h++, c++);
						break
					}
					x++
				}
				S.completion = E.actualValue / E.valueNeeded * 100, E[s] >= 1 && (l++, S.locked = !1), b.push(S), f++
			}
			g++
		}
		y % 3 == 2 ? b.push({
			empty: i
		}) : y % 3 == 1 && b.push({
			empty: i
		}, {
			empty: i
		}), p[v] = {
			sid: d[v],
			medals: b
		}
	}
	u.$content.html(template.render("AwardsView", {
		loading: a.loading,
		categories: p,
		current: l,
		max: f,
		currentRibbons: h,
		maxRibbons: c,
		completionRibbons: Math.floor(h / c * 100),
		completion: Math.floor(l / f * 100)
	})), u.bind_events()
};