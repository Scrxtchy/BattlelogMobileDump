var app = require("app"),
	config = require("config"),
	device = require("device"),
	enums = require("enums"),
	events = require("events"),
	locale = require("locale"),
	session = require("session"),
	gamedata = require("gamedata/battlelog"),
	requestBackoff = !1,
	requestBackoffTimerId = null;
exports.requestToBattlelog = function(e, t, n, r) {
	typeof n == typeof

	function() {} && (r = n, n = {}), exports.request(e, t, n, r, !1, !1, !1, !0)
}, exports.request = function(e, t, n, r, i, s, o, u) {
	function C(e, i, s) {
		return requestBackoff ? r(m) : (app.log("Request response - " + N.url), e ? (app.log(e), u && (e[g] = e.type == g), !e[g] && e[y] == m && (requestBackoff = !0, requestBackoffTimerId && clearTimeout(requestBackoffTimerId), requestBackoffTimerId = setTimeout(function() {
			requestBackoff = a
		}, 3e3), session[c]() && app.alert(locale.t("ID_MOBILE_COMMON_APP_DISABLED")), session.logout()), !e[g] && e[y] == "SESSION_NOT_FOUND" ? session[c]() ? session.renew(function(e) {
			return e ? r(e) : t == "sync" ? r(new Error("Session was renewed, not doing sync")) : exports.request(t, n, r)
		}) : r("PERMISSION_DENIED") : (!e[g] && e[y] == b && app.alert(locale.t(w)), e[g] ? r(e[y], u ? e : e.data) : r(e[y]))) : r("NO_DATA_RECEIVED"))
	}

	function k(e, t, n) {
		app[y]("Request error - " + N.url), app[y](n);
		if (t == "parsererror" || n && n.type == "unexpected_token")
			if (e && e[E] && e[E][f]("Update") != -1) return app.alert(locale.t(w)), r(b);
		return jQuery.isFunction(r) ? r("NETWORK_ERROR") : a
	}
	var a = !1,
		f = "indexOf",
		l = "supportedGames",
		c = "isLoggedIn",
		h = "bundleVersion",
		p = "sessionInfo",
		d = "X-Session-Id",
		v = "post",
		m = "APP_DISABLED",
		g = "success",
		y = "error",
		b = "UPDATE_IN_PROGRESS",
		w = "ID_MOBILE_NETWORK_ERROR_UPDATE_IN_PROGRESS",
		E = "responseText";
	o = o || a;
	if (requestBackoff) return;
	i = !!i, o || (e && gamedata[l][f](e) === -1 && !enums.Game.fromString(e) ? (r = n, n = t, t = e, e = null) : gamedata[l][f](e) !== -1 && (e = enums.Game.toString(e)), typeof n == typeof
		function() {} && (r = n, n = {}), n || (n = {}), r || (r = function() {}), e == "warsaw" && (e = "bf4"), e == "omaha" && (e = "bfh"));
	if (session[c]() && !session.isValidSession() && t != "gettoken") return session.renew(function(o, a) {
		return o ? r(o) : exports.request(e, t, n, r, i, s, !0, u)
	});
	var S = config.battlelogURL;
	e && (S += "/" + e), u ? S += "/" + t : S += "/mobile/" + t, n.timestamp = (new Date).getTime();
	var x = {
		"X-App-Version": app.version
	};
	device.appInfo[h] && (x["X-Bundle-Version"] = device.appInfo[h]), session[p] && (x[d] = session[p].key, u && (n[d] = session[p].key));
	var T = v;
	u && (T = v);
	var N = {
		url: S,
		type: T,
		headers: x,
		data: n,
		dataType: "json",
		success: C,
		error: k
	};
	app.log("Making request - " + N.url), app.log(N);
	if (i) return s || (delete N[g], delete N[y]), N;
	$.ajax(N)
}, exports.url = function(e, t, n, r) {
	return typeof r != "boolean" && (r = !1), this.request(e, t, n, "", !0, r)
};