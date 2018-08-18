var app = require("app"),
	async = require("lib/async"), enums = require("enums"), locale = require("locale"), storage = require("storage"), web = require("web"), cacheLifetime = 864e5, lastUpdatedOmaha = null, language = null, leaderboardTypesOmaha = null;
exports.init = function(e) {
	return e || (e = function() {}), exports.load(), lastUpdatedOmaha && lastUpdatedOmaha > (new Date).getTime() - cacheLifetime && leaderboardTypesOmaha ? async.nextTick(function() {
		e()
	}): exports.update(e)
}, exports.save = function() {
	storage.setObject("leaderboarddata.omaha.lastUpdated", lastUpdatedOmaha), storage.setObject("leaderboarddata.omaha.language", language), storage.setObject("leaderboarddata.omaha.leaderboardTypes", leaderboardTypesOmaha)
}, exports.load = function() {
	var e = "getObject",
		t = storage[e]("leaderboarddata.omaha.lastUpdated");
	if (!t) return;
	var n = storage[e]("leaderboarddata.omaha.language");
	if (!n || n != locale.currentLanguage) return;
	var r = storage[e]("leaderboarddata.omaha.leaderboardTypes");
	if (!r) return;
	lastUpdatedOmaha = t, language = n, leaderboardTypesOmaha = r
}, exports.update = function(e) {
	var t = "currentLanguage";
	web.request(enums.Game.OMAHA, "getleaderboardtypes", {
		game: enums.Game.OMAHA,
		locale: enums.Language.toLocale(locale[t])
	}, function(n, r) {
		return n ? e() : (lastUpdatedOmaha = (new Date).getTime(), language = locale[t], leaderboardTypesOmaha = r, exports.save(), e())
	})
}, exports.getLeaderboardTypes = function() {
	return leaderboardTypesOmaha
};