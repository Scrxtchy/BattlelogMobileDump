function BattlepacksViewController(e) {
	var t = "_activePersona",
		n = "persona";
	this._name = "BattlepacksView", this._section = "warsaw", this._game = enums.Game.WARSAW, this[t] = session.getUserActivePersonaForGame(this._game), this._persona = e && e[n] || this[t][n], this._platform = e && e.platform || this[t].platform, this._mysoldier = this._persona == this[t][n], ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_BATTLEPACKS_BATTLEPACKS"
}
var _ = require("underscore"),
	template = require("template"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	receipt = require("receipt"),
	locale = require("locale"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = BattlepacksViewController, BattlepacksViewController.prototype = new ScrollableViewController, BattlepacksViewController.prototype.constructor = BattlepacksViewController, BattlepacksViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.fetchBattlepacks()
}, BattlepacksViewController.prototype.bindEvents = function() {
	var e = this,
		t = this.$el.find(".section.battlepacklist.opened");
	e.$el.find(".unopened .openbutton").on("click", function(t) {
		t.preventDefault();
		var n = $(this).attr("data-packid"),
			r = $(this).parent(".unopened");
		$(this).find(".button").addClass("disabled"), web.request(e._game, "openbattlepack", {
			game: e._game,
			personaId: e._persona.personaId,
			platform: e._platform,
			packId: n
		}, function(t, n) {
			if (t) {
				receipt.showReceipt(locale.t("ID_WEB_BATTLEPACKS_OPEN_ERROR"), "error");
				return
			}
			var i = n.pack;
			e.openBattlepack(i, r)
		})
	})
}, BattlepacksViewController.prototype.openBattlepack = function(e, t) {
	var n = ".item",
		r = this,
		i = $(template.render("battlepack_opened", e));
	i.find(n).addClass("fade");
	var s = i.find(n).toArray(),
		o = setInterval(function() {
			item = s.shift(), $(item).css("opacity", "1"), s.length === 0 && clearInterval(o)
		}, 500);
	i.insertBefore(t), t.remove()
}, BattlepacksViewController.prototype.fetchBattlepacks = function(e) {
	var t = "append",
		n = "render",
		r = "battlepack_nopacks",
		i = ".sectionloading",
		s = "openedAt",
		o = "BattlepacksList",
		u = this;
	web.request(u._game, "getbattlepacks", {
		game: u._game,
		personaId: u._persona.personaId,
		platform: u._platform
	}, function(e, a) {
		var f = u.$el.find(".section.container");
		if (e) {
			f[t]($(template[n](r))), u.loader = u.$el.find(i).remove();
			return
		}
		var l = a.packs;
		l.sort(function(e, t) {
			return t[s] - e[s]
		}), l.length == 0 && f[t]($(template[n](r)));
		var c = $(template[n](o, {
				category: "unopened"
			})),
			h = $(template[n](o, {
				category: "opened"
			}));
		for (var p = 0; p < l.length; p++) {
			var d = l[p],
				v;
			d[s] ? (v = $(template[n]("battlepack_opened", d)), h[t](v)) : (v = $(template[n]("battlepack_unopened", d)), c[t](v))
		}
		f[t](c), f[t](h), u.loader = u.$el.find(i).remove(), u.bindEvents()
	})
};