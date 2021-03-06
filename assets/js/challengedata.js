var app = require("app"),
	async = require("lib/async"), enums = require("enums"), locale = require("locale"), storage = require("storage"), web = require("web"), cacheLifetime = 864e5, lastUpdated = null, language = null, challengeTypes = null;
exports.init = function(e) {
	return e || (e = function() {}), exports.load(), lastUpdated && lastUpdated > (new Date).getTime() - cacheLifetime && challengeTypes ? async.nextTick(function() {
		e()
	}): exports.update(e)
}, exports.save = function() {
	storage.setObject("challengedata.lastUpdated", lastUpdated), storage.setObject("challengedata.language", language), storage.setObject("challengedata.challengeTypes", challengeTypes)
}, exports.load = function() {
	var e = "getObject",
		t = storage[e]("challengedata.lastUpdated");
	if (!t) return;
	var n = storage[e]("challengedata.language");
	if (!n || n != locale.currentLanguage) return;
	var r = storage[e]("challengedata.challengeTypes");
	if (!r) return;
	lastUpdated = t, language = n, challengeTypes = r
}, exports.update = function(e) {
	var t = "currentLanguage";
	web.request(enums.Game.WARSAW, "getchallengetypes", {
		locale: enums.Language.toLocale(locale[t])
	}, function(n, r) {
		return n ? e() : (lastUpdated = (new Date).getTime(), language = locale[t], challengeTypes || (challengeTypes = {}), challengeTypes.en_US = r, exports.save(), e())
	})
}, exports.getChallengeTypes = function(e) {
	return challengeTypes[e]
}, exports.getChallengeType = function(e, t) {
	var n = challengeTypes[e];
	for (var r in n.types)
		if (n.types[r].id == t) return n.types[r];
	return null
};