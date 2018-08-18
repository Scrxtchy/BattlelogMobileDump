function AssignmentsViewController(e) {
	var t = "_activePersona",
		n = "persona",
		r = "_mysoldier";
	e = e || {}, this._section = "warsaw", this._game = enums.Game.WARSAW, this._name = "AssignmentsView", this._templateParams = {
		loading: !0
	}, this[t] = session.getUserActivePersonaForGame(this._game), this._persona = e[n] || this[t][n], this._platform = e.platform || this[t].platform, this[r] = this._persona == this[t][n], this._model = BL.backbone.get({
		model: {
			name: this[r] ? "assignments_model" : "assignments_friend_model"
		}
	}), this._model.fetch(this.get_url()), ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_ASSIGNMENTS"
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
	model = require("models/model.assignments");
module.exports = AssignmentsViewController, AssignmentsViewController.prototype = new ScrollableViewController, AssignmentsViewController.prototype.constructor = AssignmentsViewController, AssignmentsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.bind_fetch(), e._model.get("allMissions") && e.render(), e._model.on("change", e.render, e)
}, AssignmentsViewController.prototype.get_url = function() {
	var e = "_persona";
	return web.url(this._game, "assignments", {
		personaId: this[e].personaId,
		platform: this._platform,
		userId: this[e].userId,
		personaName: this[e].personaName,
		game: this._game
	})
}, AssignmentsViewController.prototype.bind_fetch = function() {
	var e = this;
	Push.bind("UserStatsUpdated", function() {
		e._model.set({
			loading: !0
		}, {
			silent: !0
		}).fetch(e.get_url())
	})
}, AssignmentsViewController.prototype.bind_events = function() {
	var e = this;
	e.$content.find(".item:not(.empty)").on("click", function() {
		var t = this.getAttribute("data-code"),
			n = e._model.get("allMissions")[t];
		n && app.go("ItemViewController", {
			section: e._section,
			type: "assignment",
			code: t,
			assignment: n
		})
	})
}, AssignmentsViewController.prototype.render = function() {
	var e = "missionCategory",
		t = !0,
		n = "license",
		r = "award",
		i = this,
		s = i._model.toJSON(),
		o = 0,
		u = 0,
		a = {},
		f = {
			bronze: "ID_WEB_COMMON_STATS_ASSIGNMENTS_BRONZE",
			silver: "ID_WEB_COMMON_STATS_ASSIGNMENTS_SILVER",
			gold: "ID_WEB_COMMON_STATS_ASSIGNMENTS_GOLD",
			sp: "ID_WEB_COMMON_STATS_ASSIGNMENTS_SP",
			phantom: "ID_WEB_COMMON_STATS_ASSIGNMENTS_PHANTOM",
			premium: "ID_WEB_COMMON_STATS_ASSIGNMENTS_PREMIUM"
		};
	for (var l in s[e]) {
		var c = s[e][l],
			h = 0,
			p = c.length,
			d = [];
		while (h < p) {
			var v = s.allMissions[c[h]];
			v && (v.locked = t, v.completion >= 100 && (u++, v.locked = !1), v[r][n] == "ghost1" && (v[r][n] = "xp1"), v[r][n] == "ghost2" && (v[r][n] = "xp2"), v[r][n] == "ghost3" && (v[r][n] = "xp3"), v[r][n] == "ghost4" && (v[r][n] = "xp4"), d.push(v), o++), h++
		}
		var m = d.length;
		m % 3 == 2 ? d.push({
			empty: t
		}) : m % 3 == 1 && d.push({
			empty: t
		}, {
			empty: t
		}), a[l] = {
			sid: f[l],
			assignments: d
		}
	}
	i.$content.html(template.render("AssignmentsView", {
		loading: s.loading,
		categoryOrder: ["bronze", "silver", "gold", "phantom", "premium", "sp"],
		categories: a,
		current: u,
		max: o,
		completion: Math.floor(u / o * 100)
	})), i.bind_events()
};