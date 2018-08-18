var async = require("lib/async"), dust = require("dust");
dust.helper = require("lib/dust-helpers");
var app = require("app"),
	device = require("device"),
	config = require("config"),
	locale = require("locale"),
	events = require("events"),
	enums = require("enums"),
	session = require("session"),
	loadedTemplateBundles = {},
	compiledTemplates = {},
	loadedStylesheets = {},
	activeStylesheets = {},
	templatebundle_cssdeps = {},
	style_elems = {};
exports.activeSection = undefined, exports.init = function(e) {
	function c() {
		l[o]("is-landscape", device.isOrientationLandscape())
	}
	var t = "addClass",
		n = "isLoggedIn",
		r = "is-logged-in",
		i = "game-",
		s = "AppGameName",
		o = "toggleClass",
		u = "style",
		a = "domElement",
		f = "10px",
		l = $("#app");
	device.isWebApp() ? l[t]("frontend-web") : device.isHybridApp() && l[t]("frontend-hybrid"), device.isiOS() ? l[t]("os-ios") : device.isAndroid() ? l[t]("os-android") : device.isWindowsPhone() ? l[t]("os-windowsphone") : l[t]("os-other"), device.isTablet() && l[t]("is-tablet"), device.hasTouch() ? l[t]("has-touch") : l[t]("no-touch"), device.hasNativeScrolling() ? l[t]("has-overflow-scroll") : l[t]("no-overflow-scroll"), device.hasWebkitOverflowScrolling() ? l[t]("has-webkit-scroll") : l[t]("no-webkit-scroll"), session[n]() && l[t](r), events.bind(["localInfoDidLoad", "activeGameDidChange"], function() {
		_.each([2, 2048, 8192], function(e) {
			l.removeClass(i + enums[s][e])
		});
		if (session[n]()) {
			l[t](r);
			var e = session.getActiveGame();
			e && l[t](i + enums[s][e])
		}
	}), events.bind(["didLogIn", "didLogOut"], function() {
		l[o](r, session[n]()), config.showFpsMeter && $.getScript("js/lib/stats.js", function() {
			if ($("#stats").length) return;
			var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame,
				t = {
					start: function() {
						function n() {
							t.update(), e(n)
						}
						var t = new Stats;
						t.setMode(0), t[a][u].position = "absolute", t[a][u].left = f, t[a][u].bottom = f, t[a][u].zIndex = "200", document.body.appendChild(t[a]), n()
					}
				};
			t.start()
		})
	}), c(), events.bind("orientationChanged", c), exports.setActiveSection(null, e)
}, exports.setActiveSection = function(e, t) {
	var n = "activeSection",
		r = "global";
	t || (t = function() {});
	if (e === exports[n]) return t();
	exports[n] = e, async.parallel([function(t) {
		exports.loadStylesheet(e, r, t)
	}, function(t) {
		exports.loadTemplateBundle(e, r, t)
	}], t)
}, exports.loadStylesheet = function(e, t, n) {
	n || (n = function() {}), e || (e = null), activeStylesheets[e] || (activeStylesheets[e] = []), loadedStylesheets[e] || (loadedStylesheets[e] = []), style_elems[e] || (style_elems[e] = {});
	if (activeStylesheets[e].indexOf(t) != -1) return n();
	if (loadedStylesheets[e].indexOf(t) != -1) return style_elems[e][t] ? (activeStylesheets[e].push(t), $("head").append(style_elems[e][t]), n()) : n();
	loadedStylesheets[e].push(t);
	var r = "text!../css/";
	e ? r += e + "/" + t + ".css" : r += t + ".css", require([r], function(r) {
		var i = $('<style data-section="' + e + '" data-name="' + t + '"></style>').text(r);
		style_elems[e][t] = i, activeStylesheets[e].push(t), $("head").append(i), setTimeout(function() {
			return n()
		}, 0)
	})
}, exports.loadStylesheets = function(e, t, n) {
	return async.forEach(t, function(t, n) {
		exports.loadStylesheet(e, t, n)
	}, n)
}, exports.loadTemplateBundle = function(e, t, n) {
	var r = "loadStylesheets",
		i = ".html",
		s = "dust",
		o = "underscore";
	n || (n = function() {}), e || (e = null), loadedTemplateBundles[e] || (loadedTemplateBundles[e] = []), compiledTemplates[e] || (compiledTemplates[e] = {}), templatebundle_cssdeps[e] || (templatebundle_cssdeps[e] = {}), templatebundle_cssdeps[e][t] || (templatebundle_cssdeps[e][t] = []);
	if (loadedTemplateBundles[e].indexOf(t) != -1) return exports[r](e, templatebundle_cssdeps[e][t], function(e) {
		return n()
	});
	loadedTemplateBundles[e].push(t);
	var u = "text!../templates/";
	e ? u += e + "/" + t + i : u += t + i, require([u], function(i) {
		var u = $(i),
			a = [];
		u.filter("script").each(function(t, n) {
			var r = $(n),
				i = r.data("template-lang"),
				u = r.data("template-name"),
				f = r.data("css");
			i == s ? compiledTemplates[e][u] = {
				lang: s,
				fn: dust.compileFn(r.html(), u)
			} : compiledTemplates[e][u] = {
				lang: o,
				fn: exports[o].compile(r.html())
			}, f && f.split(",").forEach(function(e) {
				if (a.indexOf(e) !== -1) return;
				a.push(e)
			})
		}), templatebundle_cssdeps[e][t] = a, exports[r](e, a, function(e) {
			return n()
		})
	})
}, exports.loadTemplateBundles = function(e, t, n) {
	return n || (n = function() {}), async.forEach(t, function(t, n) {
		exports.loadTemplateBundle(e, t, n)
	}, n)
}, exports.exists = function(e) {
	return compiledTemplates[exports.activeSection][e] || compiledTemplates[null][e] ? !0 : !1
}, exports.render = function(e, t, n) {
	var r = "activeSection",
		i = null;
	if (exports[r] && compiledTemplates[exports[r]][e]) template = compiledTemplates[exports[r]][e];
	else {
		if (!compiledTemplates[i][e]) return e !== "ScrollView-pulltorefresh" && app.error("Tried to render nonexistent template: " + e), n ? async.nextTick(function() {
			return n(new Error("Template does not exist"))
		}): i;
		template = compiledTemplates[i][e]
	}
	if (template.lang == "dust") return template.fn(t, n);
	if (template.lang == "underscore") {
		var s = template.fn(t).trim();
		return n ? async.nextTick(function() {
			return n(i, s)
		}): s
	}
}, exports.underscore = {}, exports.underscore.compile = function(e) {
	var t = "replace",
		n = "noMatch",
		r = {
			evaluate: /<%([\s\S]+?)%>/g,
			interpolate: /<%=([\s\S]+?)%>/g,
			escape: /<%-([\s\S]+?)%>/g,
			noMatch: /.^/
		},
		i = function(e) {
			return e[t](/\\(\\|'|r|n|t)/g, function(e, t) {
				switch (t) {
					case "\\":
						return "\\";
					case "'":
						return "'";
					case "r":
						return "\r";
					case "n":
						return "\n";
					case "t":
						return "	"
				}
			})
		},
		s = "var __p=[],locale=require('locale'),print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e[t](/\\/g, "\\\\")[t](/'/g, "\\'")[t](/\r/g, "\\r")[t](/\n/g, "\\n")[t](/\t/g, "\\t")[t](r.escape || r[n], function(e, t) {
			return "',_.escape(" + i(t) + "),\n'"
		})[t](r.interpolate || r[n], function(e, n) {
			return "'," + i(n)[t]("@(", "locale.t(") + ",\n'"
		})[t](r.evaluate || r[n], function(e, t) {
			return "');" + i(t) + ";\n__p.push('"
		}) + "');}return __p.join('');",
		o = new Function("obj", s);
	return function(e) {
		return o.call(this, e)
	}
};