var async = require("lib/async"), config = require("config"), app = module.exports = {};
app.version = "2.0.0", app.frontend = "hybrid", app.rootViewController = null, app.initialized = !1, app.init = function() {
	window.app = app, require(["device"], function(e) {
		e.cmd("ready")
	})
}, app.init_hybrid = function(e) {
	var t = "battlelogURL",
		n = "battlelogCDNURL",
		r = "beaconpushServers",
		i = "beaconpushOperator",
		s = "controllers/RootViewController",
		o = "session",
		u = "deviceName",
		a = "deviceLanguage",
		f = "deviceIsTablet",
		l = !1,
		c = "pushEnabled",
		h = "appInfo",
		p = "badgesEnabled",
		d = "soundsEnabled",
		v = null,
		m = "bundleVersion",
		g = "bundleShortVersionString",
		y = "usageSharingEnabled",
		b = "tokenInfo",
		w = "sessionInfo",
		E = "didLogIn",
		S = "didRenewSession",
		x = "didLogOut",
		T = "rootViewController",
		N = "init";
	e[t] && (config[t] = e[t]), e[n] && (config[n] = e[n]), e[r] && (config[r] = e[r]), e[i] && (config[i] = e[i]), require([s, "text!../css/global.css", "text!../templates/global.html"]), require(["events", "device", o, "locale", "template", "push", "ga_tracking_helper"], function(t, n, r, i, C, k, L) {
		n[u] = e[u], n[a] = e[a], n[f] = e[f] || l, n[h][c] = e[c] || l, n[h][p] = e[p] || l, n[h][d] = e[d] || l, n[h].pushId = e.pushId || v, n[h].bundleId = e.bundleId, n[h][m] = e[m], n[h][g] = e[g], n[h][y] = e[y], r[b] = e[b] || v, r[w] = e[w] || v, t.bind(E, function() {
			n.cmd(E, {
				tokenInfo: r[b],
				sessionInfo: r[w]
			})
		}), t.bind(S, function() {
			n.cmd(S, {
				tokenInfo: r[b],
				sessionInfo: r[w]
			})
		}), t.bind(x, function() {
			n.cmd(x)
		});
		var A = {
			gaqId: "UA-28072291-11"
		};
		app.ga = L.GATrackingHelper(A), app[T] = v, async.auto({
			locale: i[N],
			template: C[N],
			session: r[N],
			push: [o, k[N]],
			rootviewcontroller: function(e) {
				require([s], function(t) {
					return app[T] = new t, e()
				})
			},
			init_app: ["rootviewcontroller", function(e) {
				var t = r.getActiveGame();
				t && r.loadGameSpecificData(t), app[T][N](function() {
					app[T].viewWillAppear(), $("#app").append(app[T].$el), app[T].viewDidAppear(), app.initialized = !0;
					var t = require("fastclick");
					return t.attach(document.body, {}), n.cmd("initCompleted"), e()
				})
			}]
		})
	})
}, app.qrcode = function(e) {
	require(["events"], function(t) {
		t.emit("scannedQRCode", {
			code: e
		})
	})
}, app.gotPushSetting = function(e, t) {
	var n = "pushEnabled";
	require(["device", "web", "events"], function(r, i, s) {
		if (!app.initialized) {
			(t == undefined || !t) && setTimeout(function() {
				app.gotPushSetting(e, !0)
			}, 2e3);
			return
		}
		r.appInfo[n] = e, s.emit(n, e)
	})
}, app.updatePushId = function(e) {
	var t = "tokenInfo";
	require(["device", "web", "events", "session"], function(n, r, i, s) {
		if (!s[t] || !s[t].clientId) return;
		if (!app.initialized) return app.error("Tried to update push id before app was initialized");
		n.appInfo.pushId = e, r.request("updatepushid", {
			clientId: s[t].clientId,
			pushId: n.appInfo.pushId
		})
	})
}, app.checkPushEnabledAndShowHelpDialog = function() {
	require(["device", "events", "dialog"], function(e, t, n) {
		t.bind("pushEnabled", function(e) {
			e || require(["dialog"], function(e) {
				e.showTurnOnPushHelpDialog()
			}), t.unbind("pushEnabled")
		}), e.cmd("registerForRemoteNotifications")
	})
}, app.viewWillAppear = function() {}, app.viewDidAppear = function() {}, app.viewWillDisappear = function() {}, app.viewDidDisappear = function() {}, app.didReceiveMemoryWarning = function() {}, app.applicationWillEnterForeground = function() {}, app.applicationDidBecomeActive = function() {
	require(["session"], function(e) {
		e.verifyContentUpdateVersion(), e.updateAreasSinceActiveAgain()
	})
}, app.applicationWillResignActive = function() {}, app.applicationDidEnterBackground = function() {}, app.applicationChangedOrientation = function(e) {
	var t = "isNativeLandscape";
	console.info("New orientation is : " + e);
	if (parseInt(e) < 5) {
		var n = e > 2;
		require(["events", "device"], function(e, r) {
			if (r[t] == null || n != r[t]) r[t] = n, e.emit("orientationChanged", {
				isLandscape: n
			})
		})
	}
}, app.commanderNotInstalled = function() {
	app.goExternal("https://itunes.apple.com/app/id736832929")
}, app.go = function(e, t, n) {
	var r = "rootViewController";
	t || (t = {}), n || (n = function(e) {});
	if (!app[r]) return n(new Error("No root view controller"));
	app[r].go(e, t, n)
}, app.goExternal = function(e) {
	require(["device"], function(t) {
		t.cmd("goExternal", {
			url: e
		})
	})
}, app.goModal = function(e) {
	require(["device"], function(t) {
		t.cmd("goModal", {
			url: e
		})
	})
}, app.alert = function(e, t) {
	require(["device"], function(n) {
		n.cmd("alert", {
			message: e,
			title: t
		})
	})
}, app.error = function(e) {
	if (typeof e == "object") {
		var t = "";
		for (var n in e) t += n + ": " + e[n] + ", ";
		t != "" && (e = t)
	}
	config.enableLogging ? console.error(e) : window.trackJs.track(e)
}, app.log = function(e) {
	if (!config.enableLogging) return;
	console.log(e)
}, app.clear = function() {
	if (!config.enableLogging || !config.enableClear || typeof console.clear != "function") return;
	console.clear()
}, app.onPushNotification = function(e) {
	try {
		app.log("onPushNotification got JSON: " + e)
	} catch (t) {}
	var n = jQuery.parseJSON(e);
	require(["session"], function(e) {
		e.storePushNotification(n)
	})
}, app.handlePingResults = function(e) {
	require(["pinger"], function(t) {
		t.handlePingResults(e)
	})
};