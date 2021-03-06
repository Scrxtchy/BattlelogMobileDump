define(function(require, exports, module) {
	var e = "availableUpdates",
		t = "updatesURL",
		n = "version",
		r = "asset",
		i = ":",
		s = "enableUpdatesCache",
		o = "define(function(require, exports, module) {",
		u = 'var __filename = module.uri || "", ',
		a = '__dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);\n',
		f = "config",
		l = "test",
		c = require("text");
	exports[e] = null;
	var h = function() {
			var e = new Date;
			return e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0), e
		},
		p = function(o, u, a, f) {
			o || (o = {});
			var l = o.cajon && o.cajon.onXhr;
			if (o.enableUpdates && o[t]) {
				if (!exports[e]) {
					var c = o[t] + "/updates_" + o.updatesVersion + ".json" + "?v=" + h().getTime();
					return exports[e] = {}, requirejs.cget(c, function(t) {
						try {
							var r = JSON.parse(t);
							r[n] && require(["session"], function(e) {
								e.setContentUpdateVersion(r[n])
							}), exports[e] = r[e] || {}
						} catch (i) {
							exports[e] = {}
						}
						return p(o, u, a, f)
					}, function(e) {
						return p(o, u, a, f)
					})
				}
				if (exports[e][u]) {
					var d = exports[e][u],
						v = localStorage.getItem([r, u, n].join(i));
					if (v == d && o[s]) try {
						var m = localStorage.getItem([r, u].join(i));
						if (m) return a(m)
					} catch (g) {}
					var y = o[t] + "/" + d + "/" + u;
					return requirejs.cget(y, function(e) {
						if (o[s]) try {
							localStorage.setItem([r, u].join(i), e), localStorage.setItem([r, u, n].join(i), d)
						} catch (t) {
							console.log("Failed to save updated asset to cache")
						}
						return a(e)
					}, function(e) {
						return requirejs.cget(u, a, f, l)
					}, l)
				}
			}
			var b = u;
			return o.enableCache || (b += "?nocache=" + (new Date).getTime()), requirejs.cget(b, a, f, l)
		};
	(function(e) {
		var t = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
			n = /(^|[^\.])define\s*\(/,
			r = /(^|[^\.])require\s*\(\s*['"][^'"]+['"]\s*\)/,
			i = /exports\s*=\s*/,
			s = /exports\.\S+\s*=\s*/,
			c = /\/\/@\s+sourceURL=/;
		e.load = function(e, h, d, v) {
			var m = function(e) {
					return o + u + a + e + "\n});\n"
				},
				g = function(e) {
					return o + u + a + e + "\n}, null, null, true);\n"
				},
				y = function(e) {
					return e + "\r\n//@ sourceURL=" + d
				},
				b = function(o) {
					if (o.substring(0, 13) == '"no-require";') o = g(o), o = y(o);
					else {
						var u = o.replace(t, "");
						(!e[f].shim || !hasProp(e[f].shim, h)) && !n[l](u) && (r[l](u) || i[l](u) || s[l](u)) && (o = m(o)), c[l](o) || (o = y(o))
					}
					exec(o), e.completeLoad(h)
				},
				w = function(e) {
					throw e
				};
			p(e[f], d, b, w)
		}
	})(requirejs),
	function(e) {
		e.load = function(t, n, r, i) {
			if (i.isBuild && !i.inlineText) {
				r();
				return
			}
			var s = e.parseName(t),
				o = s.moduleName + "." + s.ext,
				u = n.toUrl(o),
				a = function(n) {
					e.finishLoad(t, s.strip, n, r)
				},
				f = function(e) {
					r.error && r.error(e)
				};
			p(i, u, a, f)
		}
	}(c)
});