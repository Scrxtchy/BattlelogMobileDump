var async = require("lib/async"), config = require("config"), app = module.exports = {};
app.version = "2.0.0", app.frontend = "web", app.rootViewController = null, app.init = function() {
	var e = "controllers/RootViewController",
		t = "session",
		n = "tokenInfo",
		r = "getObject",
		i = "version",
		s = "sessionInfo",
		o = "setObject",
		u = "rootViewController",
		a = "init";
	require([e, "text!../css/global.css", "text!../templates/global.html"]), require(["events", "device", "storage", t, "locale", "template", "push", "ga_tracking_helper"], function(f, l, c, h, p, d, v, m) {
		if (location.hash) {
			var g = location.hash.substr(1).split("&");
			g.forEach(function(e) {
				var t = e.split("=", 2);
				if (t.length != 2) return;
				t[0] == "lang" && (l.deviceLanguage = t[1])
			})
		}
		h[n] = c[r](n), c[r](i) == app[i] && (h[s] = c[r](s)), f.bind(["didLogIn", "didLogOut", "didRenewSession", "didChangeSoldierPortrait"], function() {
			c[o](i, app[i]), c[o](n, h[n]), c[o](s, h[s])
		});
		var y = {
			gaqId: "UA-28072291-11"
		};
		app.ga = m.GATrackingHelper(y), app[u] = null, async.auto({
			locale: p[a],
			template: d[a],
			session: h[a],
			push: [t, v[a]],
			rootviewcontroller: function(t) {
				require([e], function(e) {
					return app[u] = new e, t()
				})
			},
			init_app: ["rootviewcontroller", function(e) {
				var t = h.getActiveGame();
				t && h.loadGameSpecificData(t), app[u][a](function() {
					app[u].viewWillAppear(), $("#app").append(app[u].$el), app[u].viewDidAppear();
					var t = require("fastclick");
					return t.attach(document.body, {}), e()
				})
			}],
			hide_splash: ["init_app", function(e) {
				setTimeout(function() {
					return $("#loading").addClass("hidden"), e()
				}, 100)
			}]
		})
	})
}, app.go = function(e, t, n) {
	var r = "rootViewController",
		i = "startupViewOverride";
	if (!app[r]) {
		app.error("Tried to use app.go before root view controller was created");
		return
	}
	config[i] && require(["storage"], function(n) {
		n.set(i, {
			section: "warsaw",
			rootViewName: e,
			rootViewParams: t
		})
	}), app[r].go(e, t, n)
}, app.goExternal = function(e) {
	window.open(e, "_blank")
}, app.goModal = function(e) {
	window.open(e, "_blank")
}, app.alert = function(e, t) {
	alert(e)
}, app.error = function(e) {
	if (typeof e == "object") {
		var t = "";
		for (var n in e) t += n + ": " + e[n] + ", ";
		t != "" && (e = t)
	}
	config.enableLogging ? console.error(e) : window.trackJs.track(e)
}, app.log = function(e) {
	if (!config.enableLogging) return;
	config.stackTrace ? console.trace(e) : console.log(e)
}, app.clear = function() {
	if (!config.enableLogging || !config.enableClear || typeof console.clear != "function") return;
	console.clear()
};