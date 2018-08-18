function SelectGameViewController(e) {
	this._name = "SelectGameView", this._templateParams = {
		isWarsawUser: session.tokenInfo.isWarsawUser,
		isOmahaUser: session.tokenInfo.isOmahaUser
	}, ViewController.call(this, e), this.titleSID = "ID_MOBILE_SELECT_GAME", this.isChangingGame = !1
}
var async = require("lib/async"), app = require("app"), enums = require("enums"), events = require("events"), session = require("session"), storage = require("storage"), template = require("template"), util = require("util"), eula = require("eula"), gamedata = {
	battlelog: require("gamedata/battlelog")
}, ViewController = require("controllers/ViewController");
module.exports = SelectGameViewController, SelectGameViewController.prototype = new ViewController, SelectGameViewController.prototype.constructor = SelectGameViewController, SelectGameViewController.prototype.viewDidLoad = function() {
	var e = this;
	events.emit("selectGameView"), eula.init(), ViewController.prototype.viewDidLoad.call(e), this.game = session.getActiveGame(), this.gameName = enums.AppGameName[this.game], this.game && e.$(".gamebutton." + this.gameName).addClass("disabled"), e.bindEvents()
}, SelectGameViewController.prototype.viewWillAppear = function() {
	$("#app").addClass("select-game")
}, SelectGameViewController.prototype.viewWillDisappear = function() {
	$("#app").removeClass("select-game")
}, SelectGameViewController.prototype.bindEvents = function() {
	var e = "selected",
		t = "game",
		n = "removeClass",
		r = this;
	r.$(".gamebutton").addClick(function() {
		var i = $(this);
		i.addClass(e);
		var s = enums.AppGameName[session.getActiveGame()];
		if (i.data(t) == s) {
			i[n](e);
			return
		}
		r.setActiveGame(i.data(t), function() {
			setTimeout(function() {
				i[n](e)
			}, 500)
		})
	})
}, SelectGameViewController.prototype.setActiveGame = function(e, t) {
	var n = "isChangingGame";
	t || (t = function() {});
	var r = this;
	if (r[n]) return t(new Error("Already loading a new game"));
	r[n] = !0;
	var i = enums.Game.fromString(e);
	return session.setActiveGame(i), events.emit("selectGameView"), t()
};