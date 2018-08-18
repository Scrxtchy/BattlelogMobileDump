var app = require("app"),
	config = require("config"),
	device = require("device"),
	enums = require("enums"),
	enabledLanguages = [enums.Language.CS, enums.Language.DE, enums.Language.EN, enums.Language.ES, enums.Language.FR, enums.Language.IT, enums.Language.JA, enums.Language.KO, enums.Language.PL, enums.Language.PT, enums.Language.RU, enums.Language.ZH],
	strings = {},
	fallbackStrings = {};
exports.missingStrings = {}, exports.currentLanguage = enums.Language.EN, exports.fallbackLanguage = enums.Language.EN, exports.fallbackLanguageString = "EN", exports.fallbackSID = "ID_WEB_COMMON_UNKNOWN", exports.dateFormats = {
	date: "Y-m-d",
	time: "g:i A",
	datetime: "Y-m-d H:i:s",
	dateshort: "F Y"
}, exports.init = function(e) {
	var t = "deviceLanguage",
		n = "Language",
		r = "deviceCountry",
		i = "currentLanguage",
		s = "localedata/";
	e || (e = function() {});
	if (device[t]) {
		device[t] == "zh-Hans" && (device[t] = "ZH");
		var o = enums[n].fromString(device[t]);
		o || (app.log("Defaulting deviceLanguage to EN_us.."), device[t] = exports.fallbackLanguageString), enabledLanguages.indexOf(o) != -1 && (o != enums[n].PT || !device[r] || device[r] == "BR") && (exports[i] = o)
	}
	var u = enums[n].toLocale(exports[i]),
		a = enums[n].toLocale(exports.fallbackLanguage),
		f = [s + u];
	u !== a && f.push(s + a + "/mobile"), require(f, function(t, n) {
		return strings[u] = t, typeof n != "undefined" && (strings[a] = {
			mobile: n
		}), e()
	})
}, exports.t = function(e, t) {
	var n = "fallbackSID",
		r = "toLowerCase";
	if (!e || e == undefined) return exports.t(exports[n]);
	var i = enums.Language.toLocale(exports.currentLanguage),
		s = enums.Language.toLocale(exports.fallbackLanguage),
		o, u = strings[i],
		a = strings[s],
		f = e.match(/([^_]*)_/),
		l = "battlelog";
	try {
		f[1] == "BFH" && (f[1] = "OMAHA")
	} catch (c) {}
	try {
		e.substring(0, 10) != "ID_MOBILE_" && f && f[1] && u[f[1][r]()] && (l = f[1][r]())
	} catch (c) {
		return app.error(c), exports.t(exports[n])
	}
	o = u && u[l] && u[l][e];
	if (!o && o != "") {
		if (!(l === "mobile" && a && a[l] && a[l][e])) return config.showUnknownLocaleIDs || e == exports[n] ? (this.missingStrings[e] = 1, "¤" + e) : exports.t(exports[n]);
		o = a[l][e]
	}
	if (!t) return o;
	if (t instanceof Array) o = o.sprintf.apply(o, t);
	else
		for (var h in t) {
			if (!t.hasOwnProperty(h)) continue;
			o = o.replace("[" + h + "]", t[h])
		}
	return o
};