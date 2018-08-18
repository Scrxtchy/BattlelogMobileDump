var app = require("app"),
	async = require("lib/async"), enums = require("enums"), locale = require("locale"), storage = require("storage"), web = require("web"), cacheLifetime = 864e5, lastUpdated = null, language = null, leaderboardTypes = null;
exports.init = function(e) {
	return e || (e = function() {}), exports.load(), lastUpdated && lastUpdated > (new Date).getTime() - cacheLifetime && leaderboardTypes ? async.nextTick(function() {
		e()
	}): exports.update(e)
}, exports.save = function() {
	storage.setObject("leaderboarddata.lastUpdated", lastUpdated), storage.setObject("leaderboarddata.language", language), storage.setObject("leaderboarddata.leaderboardTypes", leaderboardTypes)
}, exports.load = function() {
	var e = "getObject",
		t = storage[e]("leaderboarddata.lastUpdated");
	if (!t) return;
	var n = storage[e]("leaderboarddata.language");
	if (!n || n != locale.currentLanguage) return;
	var r = storage[e]("leaderboarddata.leaderboardTypes");
	if (!r) return;
	lastUpdated = t, language = n, leaderboardTypes = r
}, exports.update = function(e) {
	var t = "currentLanguage";
	web.request(enums.Game.WARSAW, "getleaderboardtypes", {
		game: enums.Game.WARSAW,
		locale: enums.Language.toLocale(locale[t])
	}, function(n, r) {
		return n ? e() : (lastUpdated = (new Date).getTime(), language = locale[t], leaderboardTypes = r, exports.save(), e())
	})
}, exports.getLeaderboardTypes = function() {
	return leaderboardTypes
};