var app = require("app"),
	config = require("config");
exports.CDNResourceURL = function(e) {
	var t = "battlelogCDNURL";
	return config[t] ? config[t] + e : config.battlelogURL + "/cdnprefix/local" + e
}, exports.prodCDNUrl = function(e) {
	return "http://m.battlelog.com/" + e
};