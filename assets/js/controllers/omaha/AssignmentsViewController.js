function AssignmentsViewController(e) {
	var t = "_activePersona",
		n = "persona",
		r = "_mysoldier",
		i = "_model";
	e = e || {}, this._section = "omaha", this._game = enums.Game.OMAHA, this._name = "AssignmentsView", this._templateParams = {
		loading: !0
	}, this[t] = session.getUserActivePersonaForGame(this._game), this._persona = e[n] || this[t][n], this._platform = e.platform || this[t].platform, this[r] = this._persona == this[t][n], this[i] = BL.backbone.get({
		model: {
			name: this[r] ? "assignments_model" : "assignments_friend_model"
		}
	}), this[i].fetch(this.get_url()), this[i].on("change", this.render, this), ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_ASSIGNMENTS"
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
	collapse = require("collapse"),
	template = require("template"),
	_ = require("underscore"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	model = require("models/model.assignments");
module.exports = AssignmentsViewController, AssignmentsViewController.prototype = new ScrollableViewController, AssignmentsViewController.prototype.constructor = AssignmentsViewController, AssignmentsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.bind_fetch(), e._model.get("allMissions") && e.render()
}, AssignmentsViewController.prototype.viewDidAppear = function() {}, AssignmentsViewController.prototype.viewDidDisappear = function() {
	this._model.off()
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
		n = this,
		r = n._model.toJSON(),
		i = 0,
		s = 0,
		o = {},
		u = {
			gamemode: "ID_WEB_COMMON_STATS_ASSIGNMENTS_GAME_MODE",
			weapon: "ID_WEB_COMMON_STATS_ASSIGNMENTS_WEAPON",
			vehicle: "ID_WEB_COMMON_STATS_ASSIGNMENTS_VEHICLE",
			melee: "ID_WEB_COMMON_STATS_ASSIGNMENTS_MELEE",
			kit: "ID_WEB_COMMON_STATS_ASSIGNMENTS_CLASS",
			other: "ID_WEB_COMMON_MISCELLANEOUS_ABBR",
			syndicate: "ID_WEB_COMMON_STATS_ASSIGNMENTS_SYNDICATE",
			licenses: "ID_WEB_COMMON_STATS_ASSIGNMENTS_LICENSE",
			sp: "ID_WEB_COMMON_STATS_ASSIGNMENTS_SP"
		};
	for (var a in r[e]) {
		var f = r[e][a],
			l = 0,
			c = 0,
			h = f.length,
			p = [];
		while (c < h) {
			var d = r.allMissions[f[c]];
			d && (d.locked = t, d.completion >= 100 && (s++, l++, d.locked = !1), p.push(d), i++), c++
		}
		var v = p.length;
		v % 3 == 2 ? p.push({
			empty: t
		}) : v % 3 == 1 && p.push({
			empty: t
		}, {
			empty: t
		});
		try {
			o[a] = {
				completedCount: l,
				sid: u[a],
				assignments: p
			}
		} catch (m) {
			app.log("Could not add " + a + " to categories...")
		}
	}
	n.$content.html(template.render("AssignmentsView", {
		loading: r.loading,
		categoryOrder: ["sp", "gamemode", "licenses", "weapon", "melee", "vehicle", "kit", "syndicate", "other"],
		categories: o,
		current: s,
		max: i,
		completion: Math.floor(s / i * 100)
	})), n.bind_events()
};