var app = require("app"),
	device = require("device"),
	enums = require("enums"),
	events = require("events"),
	push = require("push"),
	storage = require("storage"),
	config = require("config"),
	util = require("util"),
	web = require("web"),
	pushnotifications = require("pushnotifications");
exports.tokenInfo = null, exports.sessionInfo = null, exports.localInfo = null;
var requiredTokenVersion = 3;
exports.pushNotifications = [], exports.storePushNotification = function(e) {
	exports.pushNotifications.push(e), exports.syncPushNotifications()
}, exports.syncPushNotifications = function() {
	var e = "pushNotifications";
	if (!exports.isLoggedIn()) {
		app.log("No sync of notifications since you are not logged in...");
		return
	}
	if (device.isDesktop()) {
		app.log("Not syncing notifications since you use the desktop...");
		return
	}
	pushnotifications.addPushFeatures(), app.log("Syncing notifications!"), _.each(exports[e], function(e) {
		web.request("pushnotificationread", {
			notificationType: e.type
		}, function(e, t) {
			if (e) return
		})
	});
	if (exports[e].length) {
		var t = _.last(exports[e]);
		app.log("Push event, "), app.log(t), events.emit("openedAppFromPush", t)
	}
}, exports.init = function(e) {
	return e || (e = function() {}), push.bind("UserPresenceChanged", function(e) {
		if (e.userId != exports.getUserId()) return;
		exports.tokenInfo.user.presence = e
	}), exports.loadLocalInfo(), exports.sync(function() {
		return e()
	})
}, exports.login = function(e, t) {
	var n = "mobileToken",
		r = "tokenInfo",
		i = "appInfo",
		s = "pushEnabled",
		o = "soundsEnabled",
		u = "badgesEnabled",
		a = !1,
		f = "currentSection";
	t || (t = function() {});
	var l = {
		email: e.email,
		password: e.password,
		authorizationCode: e.authorizationCode,
		userId: e.userId,
		mobileToken: e[n],
		clientId: exports[r] ? exports[r].clientId : null,
		pushId: device[i].pushId,
		bundleId: device[i].bundleId,
		bundleVersion: device[i].bundleVersion,
		deviceName: device.deviceName,
		deviceLanguage: device.deviceLanguage,
		deviceTimezone: (new Date).getTimezoneOffset() / 60,
		deviceType: device.getMobileClientDeviceType(),
		deviceOS: device.getMobileClientDeviceOS()
	};
	device.isiOS() && (l[s] = device[i][s], l[o] = device[i][o], l[u] = device[i][u]), web.request("gettoken", l, function(i, s) {
		if (i) return t(i);
		exports[r] = {
			clientId: s.clientId,
			token: s[n],
			user: s.user,
			userGameExpansions: s.userGameExpansions,
			personas: s.personas,
			activePersonas: s.activePersonas,
			rollouts: s.rollouts,
			isWarsawUser: s.isWarsawUser,
			isOmahaUser: s.isOmahaUser,
			tokenVersion: requiredTokenVersion,
			surveyData: s.surveyData || a,
			pushSettings: s.pushSettings || a,
			eulaStatus: s.eulaStatus || a
		}, exports.sessionInfo = {
			key: s.sessionKey,
			renewedTime: (new Date).getTime(),
			pushToken: s.pushToken
		}, !e[n] && s[f] && s[f] && (exports.setActiveGame(s[f]), require(["eula"], function(e) {
			e.init()
		}));
		try {
			var o = s.user.userId + "_" + config.battlelogURL + "_" + util.getAppVersionString();
			window.trackJs.configure({
				userId: o
			})
		} catch (u) {}
		return e[n] ? events.emit("didRenewSession") : events.emit("didLogIn"), exports.syncPushNotifications(), t()
	})
}, exports.logout = function() {
	exports.tokenInfo && web.request("logout", {
		clientId: exports.tokenInfo.clientId
	}), exports.tokenInfo = null, exports.sessionInfo = null, exports.localInfo = {}, exports.saveLocalInfo(), storage.remove("pushNpxFriends1"), events.emit("didLogOut")
}, exports.sync = function(e) {
	e || (e = function() {});
	if (!exports.isLoggedIn()) return e(new Error("User not logged in, session cannot be synced"));
	web.request("sync", function(t, n) {
		return t ? e(t) : (exports.tokenInfo.user = n.user, exports.syncPushNotifications(), e())
	})
};
var isRenewing = !1,
	renewalCallbacks = [];
exports.renew = function(e) {
		e || (e = function() {});
		if (!exports.isLoggedIn()) return e(new Error("User not logged in, session cannot be renewed"));
		if (isRenewing) {
			renewalCallbacks.push(e);
			return
		}
		isRenewing = !0, exports.login({
			mobileToken: exports.tokenInfo.token,
			userId: exports.getUserId()
		}, function(t, n) {
			t && exports.logout(), isRenewing = !1, e(t, n), renewalCallbacks.forEach(function(e) {
				e(t, n)
			}), renewallCallbacks = [];
			return
		})
	}, exports.isLoggedIn = function() {
		return Boolean(exports.tokenInfo)
	}, exports.hasRollout = function(e) {
		return Boolean(exports.isLoggedIn() && exports.tokenInfo.rollouts && exports.tokenInfo.rollouts.indexOf(e) !== -1)
	}, exports.isValidSession = function() {
		return !exports.tokenInfo || exports.tokenInfo.tokenVersion != requiredTokenVersion ? !1 : !exports.sessionInfo || exports.sessionInfo.renewedTime < (new Date).getTime() - 864e5 ? !1 : !0
	}, exports.getUser = function() {
		return exports.tokenInfo.user
	}, exports.getUserId = function() {
		return exports.isLoggedIn() ? exports.tokenInfo.user.userId : null
	}, exports.getUserPersonas = function() {
		return exports.isLoggedIn() ? exports.tokenInfo.personas : []
	}, exports.getUserPresence = function() {
		return exports.isLoggedIn() ? exports.tokenInfo.user.presence : null
	}, exports.syncUser = function(e) {
		e || (e = function() {});
		if (!exports.isLoggedIn()) return e(null, null);
		web.request("userinfo", {
			userId: exports.getUserId()
		}, function(t, n) {
			return t ? e(t) : (exports.tokenInfo.user = n, e(null, n))
		})
	}, exports.syncUserPresence = function(e) {
		e || (e = function() {});
		if (!exports.isLoggedIn()) return e(null, null);
		exports.syncUser(function(t, n) {
			return t ? e(t) : e(null, n.presence)
		})
	}, exports.getUserPersonasForGame = function(e) {
		var t = [];
		return exports.getUserPersonas().forEach(function(n) {
			for (var r in n.games)
				if (n.games[r] & e) {
					t.push(n);
					return
				}
		}), t
	}, exports.getUserActivePersonas = function() {
		var e = "activePersonas",
			t = "tokenInfo";
		return exports.isLoggedIn() ? (exports[t][e] || (exports[t][e] = {}), exports[t][e]) : {}
	}, exports.getUserActivePersonaForGame = function(e) {
		var t = exports.getUserActivePersonas();
		return t[e]
	}, exports.setUserActivePersonaForGame = function(e, t, n) {
		var r = "personaId",
			i = exports.getUserActivePersonaForGame(e);
		if (i[r] == t[r] && i.platform == n) return;
		web.request(e, "setactivepersona", {
			personaId: t[r],
			platform: n
		}, function(r, i) {
			if (r) return;
			exports.tokenInfo.activePersonas[e] = i.activeUserPersona, events.emit("didChangeActivePersona", {
				game: e,
				persona: t,
				platform: n
			}), exports.saveTokenInfo()
		})
	}, exports.setUserActivePersonaTagForGame = function(e, t) {
		exports.tokenInfo.activePersonas[e].persona.clanTag = t, events.emit("didChangeTag"), exports.saveTokenInfo()
	}, exports.getUserGameExpansions = function() {
		var e = "userGameExpansions",
			t = "tokenInfo";
		return exports.isLoggedIn() ? (exports[t][e] || (exports[t][e] = []), exports[t][e]) : []
	}, exports.getUserHasPremium = function(e, t) {
		var n = "hasExpansion",
			r = "getUserGameExpansions",
			i = "GameExpansion";
		return exports.isLoggedIn() ? e == enums.Game.BF3 ? util[n](exports[r](), enums[i].BF3PREMIUM, t) : e == enums.Game.WARSAW ? util[n](exports[r](), enums[i].BF4PREMIUM, t) : e == enums.Game.OMAHA ? util[n](exports[r](), enums[i].BFHPREMIUM, t) : !1 : !1
	},
	function() {
		var e = "localInfo",
			t = "session.localInfo",
			n = "saveLocalInfo",
			r = "saveTokenInfo",
			i = "hasTokenStorage",
			s = "tokenInfo";
		exports.loadLocalInfo = function() {
			exports[e] = storage.getObject(t) || {}, events.emit("localInfoDidLoad")
		}, exports[n] = function() {
			storage.setObject(t, exports[e])
		}, exports[r] = function() {
			device[i]() && device.isiOS() ? device.cmd(r, {
				tokenInfo: exports[s]
			}) : device[i]() && device.isAndroid() ? device.cmd("saveSessionAndToken", {
				tokenInfo: exports[s],
				sessionInfo: exports.sessionInfo
			}) : storage.setObject(s, exports[s])
		}, exports.setActiveGame = function(t, r) {
			exports[e].activeGame = t, exports.loadGameSpecificData(t), exports[n](), events.emit("activeGameDidChange", {
				game: t,
				gotoAction: r
			})
		}
	}(), exports.updateAreasSinceActiveAgain = function() {
		var e = "getActiveGame",
			t = "cashBalance";
		if (exports.isLoggedIn()) {
			var n = exports.getUserActivePersonaForGame(exports[e]());
			web.request(exports[e](), "homestats", {
				personaId: n ? n.persona.personaId : 0,
				platform: n ? n.platform : 0
			}, function(e, n) {
				if (e || !n) return;
				n[t] && exports.setCashBalance(n[t]);
				try {
					events.emit("rankUpdated", n.overviewStats.rank)
				} catch (r) {
					app.error("Could not update Rank...")
				}
			}), events.emit("refreshComcenter")
		}
	}, exports.setCashBalance = function(e) {
		exports.localInfo.cash = e, exports.saveLocalInfo(), events.emit("cashBalanceUpdated")
	}, exports.getCashBalance = function() {
		return exports.localInfo.cash || 0
	}, exports.setContentUpdateVersion = function(e) {
		exports.localInfo || exports.loadLocalInfo(), exports.localInfo.appVersion = e, exports.saveLocalInfo()
	}, exports.getContentUpdateVersion = function() {
		return exports.localInfo || exports.loadLocalInfo(), exports.localInfo.appVersion || ""
	}, exports.verifyContentUpdateVersion = function() {
		try {
			var e = exports.getContentUpdateVersion();
			if (e == "") {
				app.log("No current version, returing in Content update check...");
				return
			}
			var t = requirejs.s.contexts._.config;
			if (t.enableUpdates && t.updatesURL) {
				var n = t.updatesURL + "/updates_" + t.updatesVersion + ".json" + "?v=" + (new Date).getTime();
				requirejs.cget(n, function(t) {
					try {
						var n = JSON.parse(t),
							r = n.version;
						r && r > e && require(["session", "receipt", "locale"], function(e, t, n) {
							e.setContentUpdateVersion(r), app.log("Show new version available..."), t.showReceipt(n.t("ID_MOBILE_NEW_UPDATE") + "<a href='#' onclick='location.reload(1);'>" + n.t("ID_MOBILE_NEW_UPDATE_LINK") + "</a>", !1, 2e4), events.emit("newVersionAvailable", r)
						})
					} catch (i) {
						app.error("Could not fetch json file for version check...")
					}
				})
			}
		} catch (r) {
			app.error("Could not verifyContentUpdateVersion..."), app.error(r)
		}
	}, exports.loadGameSpecificData = function(e) {
		if (e == enums.Game.OMAHA || e == enums.Game.WARSAW) {
			var t = e == enums.Game.OMAHA ? "leaderboarddata-omaha" : "leaderboarddata";
			require([t], function(e) {
				e.init()
			})
		}
	}, exports.getActiveGame = function() {
		return exports.localInfo.activeGame || null
	}, exports.getActiveSection = function() {
		return enums.AppGameName[exports.getActiveGame()]
	}, exports.isWarsawUser = function() {
		return exports.isLoggedIn() ? exports.tokenInfo.isWarsawUser : !1
	}, exports.isOmahaUser = function() {
		return exports.isLoggedIn() ? exports.tokenInfo.isOmahaUser : !1
	};