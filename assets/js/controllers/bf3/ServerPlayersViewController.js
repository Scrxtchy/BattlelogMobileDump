function ServerPlayersViewController(e) {
	var t = null;
	this._name = "ServerPlayersView", this._section = "bf3", this.server = t, this.players = t, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_SERVER_PLAYERS", this.templateBundle = t, this.template = t
}
var app = require("app"),
	dom = require("dom"),
	locale = require("locale"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = ServerPlayersViewController, ServerPlayersViewController.prototype = new ScrollableViewController, ServerPlayersViewController.constructor = ServerPlayersViewController, ServerPlayersViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, ServerPlayersViewController.prototype.updateData = function(e) {
	var t = this;
	t.server = e.server, t.players = e.players, t.hasLoaded && t.refresh()
}, ServerPlayersViewController.prototype.refresh = function() {
	var e = "$content",
		t = "players",
		n = "append",
		r = this;
	r[e].empty();
	if (!r[t]) return;
	if (!r[t].length) {
		r[e][n](dom.error_row(locale.t("ID_MOBILE_SERVER_PLAYERS_NOPLAYERS")));
		return
	}
	var i = $("<div></div>");
	r[t].forEach(function(e, t) {
		var r = dom.user_row(e.persona.user);
		r.addClass("hidestatus"), r.addClick(function() {
			app.go("UserViewController", {
				user: e.persona.user
			})
		}), i[n](r)
	}), r[e][n](i)
};