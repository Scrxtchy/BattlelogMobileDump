function SelectSoldierViewController(e) {
	this._name = "SelectSoldierView", this._section = null, this.game = session.getActiveGame(), ScrollableViewController.call(this, e), this.game == enums.Game.OMAHA ? this.titleSID = "ID_MOBILE_SETTINGS_SELECT_AGENT" : this.titleSID = "ID_WEB_COMMON_SELECT_SOLDIER", this.selectedSoldier = null
}
var app = require("app"),
	dom = require("dom"),
	web = require("web"),
	util = require("util"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	assets = require("assets"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = SelectSoldierViewController, SelectSoldierViewController.prototype = new ScrollableViewController, SelectSoldierViewController.constructor = SelectSoldierViewController, SelectSoldierViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, SelectSoldierViewController.prototype.refresh = function(e) {
	var t = "game",
		n = "personaInfo",
		r = "persona",
		i = "platform",
		s = "selected";
	e || (e = function() {});
	var o = this,
		u = session.getUserActivePersonaForGame(o[t]);
	web.request(o[t], "usersoldiers", {
		userId: session.getUserId()
	}, function(a, f) {
		if (a) return e(a);
		var l = [];
		f.soldiers.forEach(function(e) {
			var a = "",
				f = "";
			e[n] && e[n].picture && (a = e[n].picture), e[n] && e[n].tag && (f = e[n].tag);
			var c = $(template.render("soldier_row_large", {
				name: e[r].personaName,
				game: enums.AppGameName[o[t]],
				premium: !1,
				platform: enums.Platform.toString(e[i]),
				stats: e.stats,
				picture: util.getSoldierImageUrl(o[t], "medium", a),
				tag: f
			}));
			u[i] == e[i] && u[r].personaId == e[r].personaId && c.addClass(s), l.push(c), c.addClick(function() {
				c.siblings().removeClass(s), c.addClass(s), session.setUserActivePersonaForGame(o[t], e[r], e[i])
			})
		}), o.$(".section.soldiers").css({
			display: "block"
		}).append(l), o.$el.find(".sectionloading").remove()
	})
};