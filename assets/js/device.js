function getCommanderPlatformString(e) {
	var t = "Platform";
	switch (e) {
		case enums[t].PC:
			return "pc";
		case enums[t].XBOX360:
			return "x360";
		case enums[t].PS3:
			return "ps3";
		case enums[t].XBOXONE:
			return "xbo";
		case enums[t].PS4:
			return "ps4";
		default:
			return console.error("util.getCommanderPlatformString: Unknown platform: " + e)
	}
}
var app = require("app"),
	enums = require("enums"),
	config = require("config"),
	locale = require("locale");
(function() {
	var e = null;
	exports.isNativeLandscape = e, exports.deviceIsTablet = e, exports.deviceName = e, exports.deviceLanguage = e, exports.deviceCountry = e, exports.appInfo = {
		pushId: e,
		bundleId: e,
		bundleVersion: e,
		bundleShortVersionString: e,
		usageSharingEnabled: e
	}
})(), exports.getScreenWidth = function() {
	return window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth || 0
}, exports.getScreenHeight = function() {
	return window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight || 0
}, exports.isWebApp = function() {
	return app.frontend == "web"
}, exports.isHybridApp = function() {
	return app.frontend != "web"
}, exports.isiOS = function() {
	var e = "userAgent";
	return navigator[e].match("iPod") || navigator[e].match("iPhone") || navigator[e].match("iPad")
}, exports.getOSVersionNumber = function(e) {
	var t = navigator.userAgent.toLowerCase();
	if (exports.isiOS()) var n = t.match(/os (([0-9]|_)+)/);
	else if (exports.isAndroid()) var n = t.match(/android\s([0-9\.]*)/);
	return n ? e ? parseInt(n[1].replace("_", ".")) : n[1].replace("_", ".") : !1
}, exports.isAndroid = function() {
	return navigator.userAgent.match("Android")
}, exports.isWindowsPhone = function() {
	return navigator.userAgent.match("Windows Phone")
}, exports.isDesktop = function() {
	return !exports.isiOS() && !exports.isAndroid() && !exports.isWindowsPhone()
}, exports.isTablet = function() {
	var e = "deviceIsTablet";
	return exports[e] != null ? exports[e] : exports.getScreenWidth() >= 600 && exports.getScreenHeight() >= 400
}, exports.isOrientationLandscape = function() {
	var e = "isNativeLandscape",
		t = "orientation";
	return exports.isTablet() ? exports.isiOS() && !exports.isWebApp() ? exports[e] != null ? exports[e] : typeof window[t] != "undefined" ? Math.abs(window[t]) === 90 : !1 : exports[e] != null ? exports[e] : exports.getScreenWidth() > exports.getScreenHeight() : !1
}, exports.isOrientationPortrait = function() {
	return !exports.isOrientationLandscape()
}, exports.isPhone = function() {
	return exports.getScreenWidth() < 600 || exports.getScreenHeight() < 600
}, exports.getMobileClientDeviceType = function() {
	var e = "MobileClientDeviceType";
	if (exports.isPhone) return enums[e].PHONE;
	if (exports.isTablet) return enums[e].TABLET
}, exports.getMobileClientDeviceOS = function() {
	var e = "MobileClientDeviceOS";
	if (exports.isiOS()) return enums[e].IOS;
	if (exports.isAndroid()) return enums[e].ANDROID
}, exports.getiOSVersion = function() {
	var e = exports.isiOS() ? 1 : !1,
		t = /OS (.*) like Mac OS X/.exec(navigator.userAgent);
	return t && (e = parseInt(t[1].replace("_", ""), 10) / 100, e < 1 && (e *= 10)), e
}, exports.getAndroidVersion = function() {
	var e = "Android",
		t = navigator.userAgent,
		n = exports.isAndroid() ? 1 : !1;
	return t.indexOf(e) >= 0 && (n = parseFloat(t.slice(t.indexOf(e) + 8))), n
}, exports.hasTouch = function() {
	return "ontouchstart" in window || "createTouch" in document
}, exports.hasNativeScrolling = function() {
	return exports.isiOS() && exports.getiOSVersion() >= 5 || exports.isAndroid() && exports.getAndroidVersion() >= 3 || exports.isDesktop()
};
var hasWebkitOverflowScrolling = typeof $("body")[0].style["-webkit-overflow-scrolling"] != "undefined";
exports.hasWebkitOverflowScrolling = function() {
	return hasWebkitOverflowScrolling
}, exports.hasPullToRefresh = function() {
	return exports.isiOS() && exports.hasNativeScrolling()
}, exports.hasRefreshButton = function() {
	return !1
}, exports.hasQRScanner = function() {
	return config.isDeveloper || app.frontend == "hybrid"
};
var hasLocalStorage = function() {
	try {
		return localStorage.setItem("hello", "world"), localStorage.removeItem("hello"), !0
	} catch (e) {
		return !1
	}
}();
exports.hasLocalStorage = function() {
		return hasLocalStorage
	}, exports.hasAppStorage = function() {
		return exports.isHybridApp() && exports.isiOS()
	}, exports.hasTokenStorage = function() {
		return exports.isHybridApp()
	}, exports.hasNativeAnalytics = function() {
		return exports.isHybridApp() && (exports.isiOS() || exports.isAndroid())
	}, exports.cmd = function(e, t) {
		t || (t = {});
		if (exports.isWebApp()) return;
		if (exports.isAndroid()) {
			if (!window.BattlelogMobile) return;
			BattlelogMobile.sendCommandJson(JSON.stringify({
				cmd: e,
				params: t
			}))
		} else if (exports.isiOS()) {
			var n = document.createElement("iframe");
			n.style.display = "none", document.body.appendChild(n), n.src = "bl:" + encodeURIComponent(JSON.stringify({
				cmd: e,
				params: t
			})), setTimeout(function() {
				document.body.removeChild(n)
			}, 2e3)
		}
	}, exports.trackEvent = function(e, t, n, r) {
		if (exports.hasNativeAnalytics()) {
			if (!e || !t) {
				app.error("Could not trackScreen with category + action " + e + ", " + t);
				return
			}
			n = n || "", r = r || 0, exports.cmd("trackEvent", {
				category: e,
				action: t,
				label: n,
				value: r
			})
		}
	}, exports.trackScreen = function(e) {
		var t = "hasNativeAnalytics",
			n = "trackScreen";
		if (!/^(omaha|warsaw|bf3)+\/.*$/.test(e)) try {
			require(["session"], function(r) {
				var i = enums.AppGameName[r.getActiveGame()];
				e = i + "/" + e, exports[t]() && exports.cmd(n, {
					name: e
				})
			})
		} catch (r) {
			app.log("Could not add GameName to ScreenName... not signed in?")
		} else exports[t]() && exports.cmd(n, {
			name: e
		})
	}, exports.joinTabCom = function(e) {
		var t = "";
		try {
			t = e.mutedPlayers.join(",")
		} catch (n) {
			app.error(n)
		}
		exports.cmd("launchCommander", {
			action: "joinServer",
			authenticationCode: e.authenticationCode,
			blazeServiceName: e.blazeServiceName,
			gameId: e.gameId,
			personaId: e.personaId,
			platform: getCommanderPlatformString(e.platform),
			gameProtocolVersion: e.gameProtocolVersion,
			blazeEnvironment: e.blazeEnvironment,
			mutedPlayers: t
		})
	}, exports.pingServers = function(e) {
		app.log("Ping servers"), app.log(e), exports.cmd("pingServers", {
			servers: e
		})
	}, exports.launchTabCom = function() {
		require(["dialog"], function(e) {
			e.confirm(locale.t("ID_MOBILE_COMMANDER_LAUNCH_INFO"), "Battlelog Mobile", function(e) {
				if (!e) return;
				require(["session"], function(e) {
					var t = e.getUserActivePersonaForGame(enums.Game.WARSAW);
					exports.cmd("launchCommander", {
						platform: t.platform
					})
				})
			})
		})
	},
	function() {
		var e = "launchBattlescreen",
			t = "launchSmartGlass";
		exports[e] = function(t, n, r, i) {
			exports.cmd(e, {
				game: t,
				ip: n,
				port: r,
				token: i
			})
		}, exports[t] = function(e, n, r, i) {
			exports.cmd(t, {
				game: e
			})
		}
	}();