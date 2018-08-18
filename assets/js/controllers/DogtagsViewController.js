function DogtagsViewController(e) {
	var t = "_game",
		n = "_activePersona",
		r = "persona",
		i = "_mysoldier";
	e = e || {}, this._section = null, this[t] = session.getActiveGame(), this._gameName = enums.AppGameName[this[t]], this._name = "DogtagsView", this._templateParams = {
		loading: !0
	}, this[n] = session.getUserActivePersonaForGame(this[t]), this._persona = e[r] || this[n][r], this._platform = e.platform || this[n].platform, this[i] = this._persona == this[n][r], this._filter = "left", this._model = BL.backbone.get({
		model: {
			name: this[i] ? "dogtags_model" : "dogtags_friend_model"
		}
	}), ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_DOGTAGS", this[t] == enums.Game.OMAHA && (this.titleSID = "ID_WEB_COMMON_STATS_PATCHES"), this[t] == enums.Game.WARSAW ? dogtags_json = require("gamedata/warsaw/dogtags") : this[t] == enums.Game.OMAHA && (dogtags_json = require("gamedata/omaha/dogtags"))
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
	model = require("models/model.dogtags"),
	collapse = require("collapse"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	dogtags_json = null;
module.exports = DogtagsViewController, DogtagsViewController.prototype = new ScrollableViewController, DogtagsViewController.prototype.constructor = DogtagsViewController, DogtagsViewController.prototype.viewDidLoad = function() {
	var e = "_model",
		t = this;
	ScrollableViewController.prototype.viewDidLoad.call(t), t.bind_fetch(), t[e].get("seenDogTagsIndices") && t.render(), t[e].on("change", t.render, t), t[e].fetch(this.get_url())
}, DogtagsViewController.prototype.get_url = function() {
	var e = "_persona";
	return web.url(this._game, "dogtags", {
		personaId: this[e].personaId,
		platform: this._platform,
		userId: this[e].userId,
		personaName: this[e].personaName
	})
}, DogtagsViewController.prototype.bind_fetch = function() {
	var e = this;
	Push.bind("DogtagsUpdated", function() {
		e._model.set({
			loading: !0
		}, {
			silent: !0
		}).fetch(e.get_url())
	})
}, DogtagsViewController.prototype.bind_events = function() {
	var e = "click",
		t = "getAttribute",
		n = this;
	n.$content.find(".segmentedcontrol a").on(e, function() {
		n._filter = this[t]("data-filter"), n.render()
	}), n.$content.find(".item:not(.empty)").on(e, function() {
		var e = this[t]("data-index"),
			r = this[t]("data-type");
		app.go("ItemViewController", {
			section: n._gameName,
			type: "dogtag",
			platform: n._platform,
			persona: n._persona,
			index: e,
			tag_type: r
		})
	})
}, DogtagsViewController.prototype.render = function() {
	var e = "_filter",
		t = "basic",
		n = "advanced",
		r = "categories",
		i = "index",
		s = "locked",
		o = "length",
		u = !0,
		a = this,
		f = a._model.toJSON(),
		l = {
			loading: f.loading,
			categories: {},
			filter: a[e],
			basic: f[t],
			advanced: f[n],
			persona: this._persona
		},
		c = {
			DTC_Ranks: "ID_WEB_PROFILE_DOGTAGS_DTC_RANKS",
			DTC_MPAssignments: "ID_WEB_PROFILE_DOGTAGS_DTC_MPASSIGNMENTS",
			DTC_Premium: "ID_WEB_PROFILE_DOGTAGS_DTC_PREMIUM",
			DTC_Excusive: "ID_WEB_PROFILE_DOGTAGS_DTC_VIRAL",
			DTC_Battlepacks: "ID_WEB_PROFILE_DOGTAGS_DTC_BATTLEPACKS",
			DTC_Flags: "ID_WEB_PROFILE_DOGTAGS_DTC_FLAGS",
			DTC_Promotion: "ID_WEB_PROFILE_DOGTAGS_DTC_PROMOTION",
			DTC_Medals: "ID_WEB_PROFILE_DOGTAGS_DTC_MEDALS",
			DTC_Weapons: "ID_WEB_PROFILE_DOGTAGS_DTC_WEAPONS",
			DTC_Vehicles: "ID_WEB_PROFILE_DOGTAGS_DTC_VEHICLES",
			DTC_Servicestars: "ID_WEB_PROFILE_DOGTAGS_DTC_SERVICESTARS",
			DTC_Mission: "ID_WEB_PROFILE_DOGTAGS_DTC_MISSION",
			DTC_SPAssignments: "ID_WEB_PROFILE_DOGTAGS_DTC_SPASSIGNMENTS",
			DTC_Kits: a._game == enums.Game.OMAHA ? "ID_WEB_PROFILE_DOGTAGS_DTC_KITS_BFH" : "ID_WEB_PROFILE_DOGTAGS_DTC_KITS",
			DTC_Misc: "ID_WEB_PROFILE_DOGTAGS_DTC_MISC"
		},
		h = "DTC_Misc";
	for (var p in c) l[r][p] = {
		dogtags: [],
		sid: c[p]
	};
	for (var d in dogtags_json) {
		if (a[e] == "right" && d == t || a[e] == "left" && d == n) continue;
		var v = dogtags_json[d];
		for (var m in v) {
			var g = v[m];
			if (m == 379 && a._game == enums.Game.WARSAW) continue;
			g.type = g.isAdvanced ? n : t, g.seen = f.seenDogTagsIndices[d].indexOf(g[i]) != -1, g[s] = f.unlockedDogTagsIndices[d].indexOf(g[i]) == -1, g.equipped = l[d][i] == g[i];
			var y = g.category;
			l[r][y] || (y = h), l[r][y].dogtags.push(g)
		}
	}
	for (p in l[r]) {
		var b = l[r][p].dogtags;
		if (!b[o]) {
			delete l[r][p];
			continue
		}
		b[o] % 3 == 2 ? b.push({
			empty: u
		}) : b[o] % 3 == 1 && b.push({
			empty: u
		}, {
			empty: u
		}), l[r][p].count = _.countBy(b, function(e) {
			return e.empty || !e.imageConfig ? "empty" : e[s] ? s : "unlocked"
		})
	}
	a.$content.html(template.render("DogtagsView", l)), a.bind_events()
};