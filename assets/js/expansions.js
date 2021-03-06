function isReleasedForUser(e, t) {
	return e == "not_released" ? !1 : e == "released" ? !0 : e == "premium_released" && t ? !0 : !1
}
var app = require("app"),
	template = require("template"),
	assets = require("assets"),
	web = require("web"),
	enums = require("enums"),
	locale = require("locale"),
	device = require("device"),
	session = require("session");
exports.expansionsState = {}, exports.init = function() {
	var e = session.getActiveGame(),
		t = [enums.Game.WARSAW];
	if (t.indexOf(e) == -1) return;
	web.request(e, "expansionStates", {}, function(e, t) {
		e,
		t && (exports.expansionsState = t)
	})
}, exports.xpackCodeFromString = function(e) {
	var t = "indexOf";
	if (e[t]("xp0") != -1) return "BF4XP0SA";
	if (e[t]("xp1") != -1) return "BF4XP1CR";
	if (e[t]("xp2") != -1) return "BF4XP2NS";
	if (e[t]("xp3") != -1) return "BF4XP3DT";
	if (e[t]("xp4") != -1) return "BF4XP4FS"
}, exports.isXpackReleased = function(e, t, n) {
	var r = exports.expansionsState[enums.GameExpansion[e]],
		i = session.getUserHasPremium(t, n),
		s = isReleasedForUser(r, i);
	return s
};