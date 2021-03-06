var async = require("lib/async"), config = require("config"), app = module.exports = {};
app.version = "2.0.0", app.frontend = "hybrid", app.rootViewController = null, app.init = function() {
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
		f = "deviceCountry",
		l = "appInfo",
		c = "bundleVersion",
		h = "bundleShortVersionString",
		p = "usageSharingEnabled",
		d = "sessionInfo",
		v = "getObject",
		m = "version",
		g = "tokenInfo",
		y = "setObject",
		b = "rootViewController",
		w = "init";
	e[t] && (config[t] = e[t]), e[n] && (config[n] = e[n]), e[r] && (config[r] = e[r]), e[i] && (config[i] = e[i]), require([s, "text!../css/global.css", "text!../templates/global.html"]), require(["events", "device", "storage", o, "locale", "template", "push", "ga_tracking_helper"], function(t, n, r, i, E, S, x, T) {
		n[u] = e[u], n[a] = e[a], n[f] = e[f], n.deviceIsTablet = e.isDeviceTablet || !1, n[l].pushId = e.pushId || null, n[l].bundleId = e.bundleId, n[l][c] = e[c], n[l][h] = e[h], n[l][p] = e[p];
		if (e[d] != undefined && e[d] != "") {
			app.log("Loaded sessionInfo from device");
			try {
				i[d] = JSON.parse(e[d])
			} catch (N) {}
		} else app.log("Loaded sessionInfo from LS"), r[v](m) == app[m] && (i[d] = r[v](d));
		if (e[g] != undefined && e[g] != "") {
			app.log("Loaded tokenInfo from device");
			try {
				i[g] = JSON.parse(e[g])
			} catch (N) {}
		} else app.log("Loaded tokenInfo from LS"), i[g] = r[v](g);
		t.bind(["didLogIn", "didLogOut", "didRenewSession"], function() {
			n.cmd("saveSessionAndToken", {
				tokenInfo: i[g],
				sessionInfo: i[d]
			}), r[y](m, app[m]), r[y](g, i[g]), r[y](d, i[d])
		});
		var C = {
			gaqId: "UA-28072291-11"
		};
		app.ga = T.GATrackingHelper(C), app[b] = null, async.auto({
			locale: E[w],
			template: S[w],
			session: i[w],
			push: [o, x[w]],
			rootviewcontroller: function(e) {
				require([s], function(t) {
					return app[b] = new t, e()
				})
			},
			init_app: ["rootviewcontroller", function(e) {
				var t = i.getActiveGame();
				t && i.loadGameSpecificData(t), app[b][w](function() {
					app[b].viewWillAppear(), $("#app").append(app[b].$el), app[b].viewDidAppear();
					var t = require("fastclick");
					return t.attach(document.body, {}), e()
				})
			}],
			hide_splash: ["init_app", function(e) {
				setTimeout(function() {
					return n.cmd("initCompleted"), $("#loading").addClass("hidden"), e()
				}, 100)
			}]
		})
	})
}, app.qrcode = function(e) {
	require(["events"], function(t) {
		t.emit("scannedQRCode", {
			code: e
		})
	})
}, app.onOrientationChange = function(e) {
	var t = "isNativeLandscape",
		n = e == 2;
	require(["events", "device"], function(e, r) {
		if (r[t] == null || n != r[t]) r[t] = n, e.emit("orientationChanged", {
			isLandscape: n
		})
	})
}, app.onPause = function() {}, app.onResume = function() {
	require(["session"], function(e) {
		e.verifyContentUpdateVersion(), e.updateAreasSinceActiveAgain()
	})
}, app.onServerPing = function(e) {
	require(["pinger"], function(t) {
		try {
			t.handlePingResults(JSON.parse(e))
		} catch (n) {
			app.error("Could not ping..")
		}
	})
}, app.errorTriggered = function(e, t) {
	switch (e) {
		case "apperror":
			switch (t.error) {
				case "commandernotinstalled":
					app.goExternal("https://play.google.com/store/apps/details?id=com.ea.game.warsawcommander_row")
			}
	}
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
	app.log("onPushNotification got JSON: " + e);
	var t = jQuery.parseJSON(e);
	require(["session"], function(e) {
		e.storePushNotification(t)
	})
};