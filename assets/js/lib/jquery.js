(function(e, t) {
	typeof module == "object" && typeof module.exports == "object" ? module.exports = e.document ? t(e, !0) : function(e) {
		if (!e.document) throw new Error("jQuery requires a window with a document");
		return t(e)
	} : t(e)
})(typeof window != "undefined" ? window : this, function(window, noGlobal) {
	function isArraylike(e) {
		var t = e.length,
			n = jQuery.type(e);
		return n === "function" || jQuery.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
	}

	function winnow(e, t, n) {
		if (jQuery.isFunction(t)) return jQuery.grep(e, function(e, r) {
			return !!t.call(e, r, e) !== n
		});
		if (t.nodeType) return jQuery.grep(e, function(e) {
			return e === t !== n
		});
		if (typeof t == "string") {
			if (risSimple.test(t)) return jQuery.filter(t, e, n);
			t = jQuery.filter(t, e)
		}
		return jQuery.grep(e, function(e) {
			return indexOf.call(t, e) >= 0 !== n
		})
	}

	function sibling(e, t) {
		while ((e = e[t]) && e.nodeType !== 1);
		return e
	}

	function createOptions(e) {
		var t = optionsCache[e] = {};
		return jQuery.each(e.match(rnotwhite) || [], function(e, n) {
			t[n] = !0
		}), t
	}

	function completed() {
		var e = "removeEventListener";
		document[e]("DOMContentLoaded", completed, !1), window[e]("load", completed, !1), jQuery.ready()
	}

	function Data() {
		Object.defineProperty(this.cache = {}, 0, {
			get: function() {
				return {}
			}
		}), this.expando = jQuery.expando + Math.random()
	}

	function dataAttr(e, t, n) {
		var r;
		if (n === undefined && e.nodeType === 1) {
			r = "data-" + t.replace(rmultiDash, "-$1").toLowerCase(), n = e.getAttribute(r);
			if (typeof n == "string") {
				try {
					n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : rbrace.test(n) ? jQuery.parseJSON(n) : n
				} catch (i) {}
				data_user.set(e, t, n)
			} else n = undefined
		}
		return n
	}

	function returnTrue() {
		return !0
	}

	function returnFalse() {
		return !1
	}

	function safeActiveElement() {
		try {
			return document.activeElement
		} catch (e) {}
	}

	function manipulationTarget(e, t) {
		return jQuery.nodeName(e, "table") && jQuery.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
	}

	function disableScript(e) {
		return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e
	}

	function restoreScript(e) {
		var t = rscriptTypeMasked.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}

	function setGlobalEval(e, t) {
		var n = "globalEval",
			r = 0,
			i = e.length;
		for (; r < i; r++) data_priv.set(e[r], n, !t || data_priv.get(t[r], n))
	}

	function cloneCopyEvent(e, t) {
		var n, r, i, s, o, u, a, f;
		if (t.nodeType !== 1) return;
		if (data_priv.hasData(e)) {
			s = data_priv.access(e), o = data_priv.set(t, s), f = s.events;
			if (f) {
				delete o.handle, o.events = {};
				for (i in f)
					for (n = 0, r = f[i].length; n < r; n++) jQuery.event.add(t, i, f[i][n])
			}
		}
		data_user.hasData(e) && (u = data_user.access(e), a = jQuery.extend({}, u), data_user.set(t, a))
	}

	function getAll(e, t) {
		var n = "getElementsByTagName",
			r = "querySelectorAll",
			i = e[n] ? e[n](t || "*") : e[r] ? e[r](t || "*") : [];
		return t === undefined || t && jQuery.nodeName(e, t) ? jQuery.merge([e], i) : i
	}

	function fixInput(e, t) {
		var n = "input",
			r = "defaultValue",
			i = t.nodeName.toLowerCase();
		if (i === n && rcheckableType.test(e.type)) t.checked = e.checked;
		else if (i === n || i === "textarea") t[r] = e[r]
	}

	function actualDisplay(e, t) {
		var n = "getDefaultComputedStyle",
			r = "display",
			i, s = jQuery(t.createElement(e)).appendTo(t.body),
			o = window[n] && (i = window[n](s[0])) ? i[r] : jQuery.css(s[0], r);
		return s.detach(), o
	}

	function defaultDisplay(e) {
		var t = document,
			n = elemdisplay[e];
		if (!n) {
			n = actualDisplay(e, t);
			if (n === "none" || !n) iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = iframe[0].contentDocument, t.write(), t.close(), n = actualDisplay(e, t), iframe.detach();
			elemdisplay[e] = n
		}
		return n
	}

	function curCSS(e, t, n) {
		var r = "width",
			i = "minWidth",
			s = "maxWidth",
			o, u, a, f, l = e.style;
		return n = n || getStyles(e), n && (f = n.getPropertyValue(t) || n[t]), n && (f === "" && !jQuery.contains(e.ownerDocument, e) && (f = jQuery.style(e, t)), rnumnonpx.test(f) && rmargin.test(t) && (o = l[r], u = l[i], a = l[s], l[i] = l[s] = l[r] = f, f = n[r], l[r] = o, l[i] = u, l[s] = a)), f !== undefined ? f + "" : f
	}

	function addGetHookIf(e, t) {
		return {
			get: function() {
				if (e()) {
					delete this.get;
					return
				}
				return (this.get = t).apply(this, arguments)
			}
		}
	}

	function vendorPropName(e, t) {
		if (t in e) return t;
		var n = t[0].toUpperCase() + t.slice(1),
			r = t,
			i = cssPrefixes.length;
		while (i--) {
			t = cssPrefixes[i] + n;
			if (t in e) return t
		}
		return r
	}

	function setPositiveNumber(e, t, n) {
		var r = rnumsplit.exec(t);
		return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
	}

	function augmentWidthOrHeight(e, t, n, r, i) {
		var s = "border",
			o = "content",
			u = "margin",
			a = !0,
			f = "padding",
			l = "Width",
			c = n === (r ? s : o) ? 4 : t === "width" ? 1 : 0,
			h = 0;
		for (; c < 4; c += 2) n === u && (h += jQuery.css(e, n + cssExpand[c], a, i)), r ? (n === o && (h -= jQuery.css(e, f + cssExpand[c], a, i)), n !== u && (h -= jQuery.css(e, s + cssExpand[c] + l, a, i))) : (h += jQuery.css(e, f + cssExpand[c], a, i), n !== f && (h += jQuery.css(e, s + cssExpand[c] + l, a, i)));
		return h
	}

	function getWidthOrHeight(e, t, n) {
		var r = !0,
			i = t === "width" ? e.offsetWidth : e.offsetHeight,
			s = getStyles(e),
			o = jQuery.css(e, "boxSizing", !1, s) === "border-box";
		if (i <= 0 || i == null) {
			i = curCSS(e, t, s);
			if (i < 0 || i == null) i = e.style[t];
			if (rnumnonpx.test(i)) return i;
			r = o && (support.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
		}
		return i + augmentWidthOrHeight(e, t, n || (o ? "border" : "content"), r, s) + "px"
	}

	function showHide(e, t) {
		var n = "style",
			r = "olddisplay",
			i = "display",
			s = "none",
			o, u, a, f = [],
			l = 0,
			c = e.length;
		for (; l < c; l++) {
			u = e[l];
			if (!u[n]) continue;
			f[l] = data_priv.get(u, r), o = u[n][i], t ? (!f[l] && o === s && (u[n][i] = ""), u[n][i] === "" && isHidden(u) && (f[l] = data_priv.access(u, r, defaultDisplay(u.nodeName)))) : (a = isHidden(u), (o !== s || !a) && data_priv.set(u, r, a ? o : jQuery.css(u, i)))
		}
		for (l = 0; l < c; l++) {
			u = e[l];
			if (!u[n]) continue;
			if (!t || u[n][i] === s || u[n][i] === "") u[n][i] = t ? f[l] || "" : s
		}
		return e
	}

	function Tween(e, t, n, r, i) {
		return new Tween.prototype.init(e, t, n, r, i)
	}

	function createFxNow() {
		return setTimeout(function() {
			fxNow = undefined
		}), fxNow = jQuery.now()
	}

	function genFx(e, t) {
		var n, r = 0,
			i = {
				height: e
			};
		t = t ? 1 : 0;
		for (; r < 4; r += 2 - t) n = cssExpand[r], i["margin" + n] = i["padding" + n] = e;
		return t && (i.opacity = i.width = e), i
	}

	function createTween(e, t, n) {
		var r, i = (tweeners[t] || []).concat(tweeners["*"]),
			s = 0,
			o = i.length;
		for (; s < o; s++)
			if (r = i[s].call(n, t, e)) return r
	}

	function defaultPrefilter(e, t, n) {
		var r = "fxshow",
			i = "unqueued",
			s = "always",
			o = "height",
			u = "width",
			a = "overflow",
			f = "display",
			l = "none",
			c = "inline",
			h = "hidden",
			p = "show",
			d, v, m, g, y, b, w, E, S = this,
			x = {},
			T = e.style,
			N = e.nodeType && isHidden(e),
			C = data_priv.get(e, r);
		n.queue || (y = jQuery._queueHooks(e, "fx"), y[i] == null && (y[i] = 0, b = y.empty.fire, y.empty.fire = function() {
			y[i] || b()
		}), y[i]++, S[s](function() {
			S[s](function() {
				y[i]--, jQuery.queue(e, "fx").length || y.empty.fire()
			})
		})), e.nodeType === 1 && (o in t || u in t) && (n[a] = [T[a], T.overflowX, T.overflowY], w = jQuery.css(e, f), E = w === l ? data_priv.get(e, "olddisplay") || defaultDisplay(e.nodeName) : w, E === c && jQuery.css(e, "float") === l && (T[f] = "inline-block")), n[a] && (T[a] = h, S[s](function() {
			T[a] = n[a][0], T.overflowX = n[a][1], T.overflowY = n[a][2]
		}));
		for (d in t) {
			v = t[d];
			if (rfxtypes.exec(v)) {
				delete t[d], m = m || v === "toggle";
				if (v === (N ? "hide" : p)) {
					if (v !== p || !C || C[d] === undefined) continue;
					N = !0
				}
				x[d] = C && C[d] || jQuery.style(e, d)
			} else w = undefined
		}
		if (!jQuery.isEmptyObject(x)) {
			C ? h in C && (N = C[h]) : C = data_priv.access(e, r, {}), m && (C[h] = !N), N ? jQuery(e)[p]() : S.done(function() {
				jQuery(e).hide()
			}), S.done(function() {
				var t;
				data_priv.remove(e, r);
				for (t in x) jQuery.style(e, t, x[t])
			});
			for (d in x) g = createTween(N ? C[d] : 0, d, S), d in C || (C[d] = g.start, N && (g.end = g.start, g.start = d === u || d === o ? 1 : 0))
		} else(w === l ? defaultDisplay(e.nodeName) : w) === c && (T[f] = w)
	}

	function propFilter(e, t) {
		var n, r, i, s, o;
		for (n in e) {
			r = jQuery.camelCase(n), i = t[r], s = e[n], jQuery.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = jQuery.cssHooks[r];
			if (o && "expand" in o) {
				s = o.expand(s), delete e[r];
				for (n in s) n in e || (e[n] = s[n], t[n] = i)
			} else t[r] = i
		}
	}

	function Animation(e, t, n) {
		var r = "length",
			i = "always",
			s = "duration",
			o = "tweens",
			u = "resolveWith",
			a = "extend",
			f = "opts",
			l = "specialEasing",
			c, h, p = 0,
			d = animationPrefilters[r],
			v = jQuery.Deferred()[i](function() {
				delete m.elem
			}),
			m = function() {
				if (h) return !1;
				var t = fxNow || createFxNow(),
					n = Math.max(0, g.startTime + g[s] - t),
					i = n / g[s] || 0,
					a = 1 - i,
					f = 0,
					l = g[o][r];
				for (; f < l; f++) g[o][f].run(a);
				return v.notifyWith(e, [g, a, n]), a < 1 && l ? n : (v[u](e, [g]), !1)
			},
			g = v.promise({
				elem: e,
				props: jQuery[a]({}, t),
				opts: jQuery[a](!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: fxNow || createFxNow(),
				duration: n[s],
				tweens: [],
				createTween: function(t, n) {
					var r = jQuery.Tween(e, g[f], t, n, g[f][l][t] || g[f].easing);
					return g[o].push(r), r
				},
				stop: function(t) {
					var n = 0,
						i = t ? g[o][r] : 0;
					if (h) return this;
					h = !0;
					for (; n < i; n++) g[o][n].run(1);
					return t ? v[u](e, [g, t]) : v.rejectWith(e, [g, t]), this
				}
			}),
			y = g.props;
		propFilter(y, g[f][l]);
		for (; p < d; p++) {
			c = animationPrefilters[p].call(g, e, y, g[f]);
			if (c) return c
		}
		return jQuery.map(y, createTween, g), jQuery.isFunction(g[f].start) && g[f].start.call(e, g), jQuery.fx.timer(jQuery[a](m, {
			elem: e,
			anim: g,
			queue: g[f].queue
		})), g.progress(g[f].progress).done(g[f].done, g[f].complete).fail(g[f].fail)[i](g[f][i])
	}

	function addToPrefiltersOrTransports(e) {
		return function(t, n) {
			typeof t != "string" && (n = t, t = "*");
			var r, i = 0,
				s = t.toLowerCase().match(rnotwhite) || [];
			if (jQuery.isFunction(n))
				while (r = s[i++]) r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
		}
	}

	function inspectPrefiltersOrTransports(e, t, n, r) {
		function o(u) {
			var a;
			return i[u] = !0, jQuery.each(e[u] || [], function(e, u) {
				var f = u(t, n, r);
				if (typeof f == "string" && !s && !i[f]) return t.dataTypes.unshift(f), o(f), !1;
				if (s) return !(a = f)
			}), a
		}
		var i = {},
			s = e === transports;
		return o(t.dataTypes[0]) || !i["*"] && o("*")
	}

	function ajaxExtend(e, t) {
		var n, r, i = jQuery.ajaxSettings.flatOptions || {};
		for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
		return r && jQuery.extend(!0, e, r), e
	}

	function ajaxHandleResponses(e, t, n) {
		var r, i, s, o, u = e.contents,
			a = e.dataTypes;
		while (a[0] === "*") a.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
		if (r)
			for (i in u)
				if (u[i] && u[i].test(r)) {
					a.unshift(i);
					break
				}
		if (a[0] in n) s = a[0];
		else {
			for (i in n) {
				if (!a[0] || e.converters[i + " " + a[0]]) {
					s = i;
					break
				}
				o || (o = i)
			}
			s = s || o
		}
		if (s) return s !== a[0] && a.unshift(s), n[s]
	}

	function ajaxConvert(e, t, n, r) {
		var i = "converters",
			s = "responseFields",
			o = "dataFilter",
			u = !0,
			a, f, l, c, h, p = {},
			d = e.dataTypes.slice();
		if (d[1])
			for (l in e[i]) p[l.toLowerCase()] = e[i][l];
		f = d.shift();
		while (f) {
			e[s][f] && (n[e[s][f]] = t), !h && r && e[o] && (t = e[o](t, e.dataType)), h = f, f = d.shift();
			if (f)
				if (f === "*") f = h;
				else if (h !== "*" && h !== f) {
				l = p[h + " " + f] || p["* " + f];
				if (!l)
					for (a in p) {
						c = a.split(" ");
						if (c[1] === f) {
							l = p[h + " " + c[0]] || p["* " + c[0]];
							if (l) {
								l === u ? l = p[a] : p[a] !== u && (f = c[0], d.unshift(c[1]));
								break
							}
						}
					}
				if (l !== u)
					if (l && e["throws"]) t = l(t);
					else try {
						t = l(t)
					} catch (v) {
						return {
							state: "parsererror",
							error: l ? v : "No conversion from " + h + " to " + f
						}
					}
			}
		}
		return {
			state: "success",
			data: t
		}
	}

	function buildParams(e, t, n, r) {
		var i = "object",
			s;
		if (jQuery.isArray(t)) jQuery.each(t, function(t, s) {
			n || rbracket.test(e) ? r(e, s) : buildParams(e + "[" + (typeof s === i ? t : "") + "]", s, n, r)
		});
		else if (!n && jQuery.type(t) === i)
			for (s in t) buildParams(e + "[" + s + "]", t[s], n, r);
		else r(e, t)
	}

	function getWindow(e) {
		return jQuery.isWindow(e) ? e : e.nodeType === 9 && e.defaultView
	}
	var arr = [],
		slice = arr.slice,
		concat = arr.concat,
		push = arr.push,
		indexOf = arr.indexOf,
		class2type = {},
		toString = class2type.toString,
		hasOwn = class2type.hasOwnProperty,
		support = {},
		document = window.document,
		version = "2.1.1",
		jQuery = function(e, t) {
			return new jQuery.fn.init(e, t)
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function(e, t) {
			return t.toUpperCase()
		};
	jQuery.fn = jQuery.prototype = {
		jquery: version,
		constructor: jQuery,
		selector: "",
		length: 0,
		toArray: function() {
			return slice.call(this)
		},
		get: function(e) {
			return e != null ? e < 0 ? this[e + this.length] : this[e] : slice.call(this)
		},
		pushStack: function(e) {
			var t = jQuery.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function(e, t) {
			return jQuery.each(this, e, t)
		},
		map: function(e) {
			return this.pushStack(jQuery.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		slice: function() {
			return this.pushStack(slice.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(e) {
			var t = this.length,
				n = +e + (e < 0 ? t : 0);
			return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: push,
		sort: arr.sort,
		splice: arr.splice
	}, jQuery.extend = jQuery.fn.extend = function() {
		var e = "isPlainObject",
			t, n, r, i, s, o, u = arguments[0] || {},
			a = 1,
			f = arguments.length,
			l = !1;
		typeof u == "boolean" && (l = u, u = arguments[a] || {}, a++), typeof u != "object" && !jQuery.isFunction(u) && (u = {}), a === f && (u = this, a--);
		for (; a < f; a++)
			if ((t = arguments[a]) != null)
				for (n in t) {
					r = u[n], i = t[n];
					if (u === i) continue;
					l && i && (jQuery[e](i) || (s = jQuery.isArray(i))) ? (s ? (s = !1, o = r && jQuery.isArray(r) ? r : []) : o = r && jQuery[e](r) ? r : {}, u[n] = jQuery.extend(l, o, i)) : i !== undefined && (u[n] = i)
				}
		return u
	}, jQuery.extend({
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(e) {
			throw new Error(e)
		},
		noop: function() {},
		isFunction: function(e) {
			return jQuery.type(e) === "function"
		},
		isArray: Array.isArray,
		isWindow: function(e) {
			return e != null && e === e.window
		},
		isNumeric: function(e) {
			return !jQuery.isArray(e) && e - parseFloat(e) >= 0
		},
		isPlainObject: function(e) {
			return jQuery.type(e) !== "object" || e.nodeType || jQuery.isWindow(e) ? !1 : e.constructor && !hasOwn.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		type: function(e) {
			return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? class2type[toString.call(e)] || "object" : typeof e
		},
		globalEval: function(code) {
			var script, indirect = eval;
			code = jQuery.trim(code), code && (code.indexOf("use strict") === 1 ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
		},
		camelCase: function(e) {
			return e.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, t, n) {
			var r = !1,
				i, s = 0,
				o = e.length,
				u = isArraylike(e);
			if (n)
				if (u)
					for (; s < o; s++) {
						i = t.apply(e[s], n);
						if (i === r) break
					} else
						for (s in e) {
							i = t.apply(e[s], n);
							if (i === r) break
						} else if (u)
							for (; s < o; s++) {
								i = t.call(e[s], s, e[s]);
								if (i === r) break
							} else
								for (s in e) {
									i = t.call(e[s], s, e[s]);
									if (i === r) break
								}
			return e
		},
		trim: function(e) {
			return e == null ? "" : (e + "").replace(rtrim, "")
		},
		makeArray: function(e, t) {
			var n = t || [];
			return e != null && (isArraylike(Object(e)) ? jQuery.merge(n, typeof e == "string" ? [e] : e) : push.call(n, e)), n
		},
		inArray: function(e, t, n) {
			return t == null ? -1 : indexOf.call(t, e, n)
		},
		merge: function(e, t) {
			var n = "length",
				r = +t[n],
				i = 0,
				s = e[n];
			for (; i < r; i++) e[s++] = t[i];
			return e[n] = s, e
		},
		grep: function(e, t, n) {
			var r, i = [],
				s = 0,
				o = e.length,
				u = !n;
			for (; s < o; s++) r = !t(e[s], s), r !== u && i.push(e[s]);
			return i
		},
		map: function(e, t, n) {
			var r, i = 0,
				s = e.length,
				o = isArraylike(e),
				u = [];
			if (o)
				for (; i < s; i++) r = t(e[i], i, n), r != null && u.push(r);
			else
				for (i in e) r = t(e[i], i, n), r != null && u.push(r);
			return concat.apply([], u)
		},
		guid: 1,
		proxy: function(e, t) {
			var n, r, i;
			return typeof t == "string" && (n = e[t], t = e, e = n), jQuery.isFunction(e) ? (r = slice.call(arguments, 2), i = function() {
				return e.apply(t || this, r.concat(slice.call(arguments)))
			}, i.guid = e.guid = e.guid || jQuery.guid++, i) : undefined
		},
		now: Date.now,
		support: support
	}), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		class2type["[object " + t + "]"] = t.toLowerCase()
	});
	var Sizzle = function(e) {
		function vn(e, s, h, d) {
			var v, g, y, b, w, E, S, x, C, k;
			(s ? s[u] || s : Ot) !== St && Et(s), s = s || St, h = h || [];
			if (!e || typeof e !== R) return h;
			if ((b = s[a]) !== 1 && b !== 9) return [];
			if (Tt && !d) {
				if (v = fn.exec(e))
					if (y = v[1]) {
						if (b === 9) {
							g = s[T](y);
							if (!g || !g[r]) return h;
							if (g[V] === y) return h[m](g), h
						} else if (s[u] && (g = s[u][T](y)) && Lt(s, g) && g[V] === y) return h[m](g), h
					} else {
						if (v[2]) return zt[_](h, s[o](e)), h;
						if ((y = v[3]) && ct[i] && s[i]) return zt[_](h, s[i](y)), h
					}
				if (ct.qsa && (!Nt || !Nt[N](e))) {
					x = S = At, C = s, k = b === 9 && e;
					if (b === 1 && s[c][n]() !== "object") {
						E = vt(e), (S = s[f](V)) ? x = S[p](cn, "\\$&") : s[L](V, x), x = "[id='" + x + "'] ", w = E[t];
						while (w--) E[w] = x + Cn(E[w]);
						C = ln[N](e) && Tn(s[r]) || s, k = E.join(",")
					}
					if (k) try {
						return zt[_](h, C[l](k)), h
					} catch (A) {} finally {
						S || s.removeAttribute(V)
					}
				}
			}
			return gt(e[p](Yt, "$1"), s, h, d)
		}

		function mn() {
			function t(n, r) {
				return e[m](n + M) > ht.cacheLength && delete t[e.shift()], t[n + M] = r
			}
			var e = [];
			return t
		}

		function gn(e) {
			return e[At] = h, e
		}

		function yn(e) {
			var t = St[B]("div");
			try {
				return !!e(t)
			} catch (n) {
				return g
			} finally {
				t[r] && t[r].removeChild(t), t = v
			}
		}

		function bn(e, n) {
			var r = e.split("|"),
				i = e[t];
			while (i--) ht[z][r[i]] = n
		}

		function wn(e, t) {
			var n = t && e,
				r = n && e[a] === 1 && t[a] === 1 && (~t.sourceIndex || Ft) - (~e.sourceIndex || Ft);
			if (r) return r;
			if (n)
				while (n = n[y])
					if (n === t) return -1;
			return e ? 1 : -1
		}

		function En(e) {
			return function(t) {
				var r = t[c][n]();
				return r === S && t[b] === e
			}
		}

		function Sn(e) {
			return function(t) {
				var r = t[c][n]();
				return (r === S || r === I) && t[b] === e
			}
		}

		function xn(e) {
			return gn(function(n) {
				return n = +n, gn(function(r, i) {
					var s, o = e([], r[t], n),
						u = o[t];
					while (u--) r[s = o[u]] && (r[s] = !(i[s] = r[s]))
				})
			})
		}

		function Tn(e) {
			return e && typeof e[o] !== jt && e
		}

		function Nn() {}

		function Cn(e) {
			var n = 0,
				r = e[t],
				i = "";
			for (; n < r; n++) i += e[n][F];
			return i
		}

		function kn(e, t, n) {
			var i = t.dir,
				s = n && i === r,
				o = _t++;
			return t.first ? function(t, n, r) {
				while (t = t[i])
					if (t[a] === 1 || s) return e(t, n, r)
			} : function(t, n, r) {
				var u, f, l = [Mt, o];
				if (r) {
					while (t = t[i])
						if (t[a] === 1 || s)
							if (e(t, n, r)) return h
				} else
					while (t = t[i])
						if (t[a] === 1 || s) {
							f = t[At] || (t[At] = {});
							if ((u = f[i]) && u[0] === Mt && u[1] === o) return l[2] = u[2];
							f[i] = l;
							if (l[2] = e(t, n, r)) return h
						}
			}
		}

		function Ln(e) {
			return e[t] > 1 ? function(n, r, i) {
				var s = e[t];
				while (s--)
					if (!e[s](n, r, i)) return g;
				return h
			} : e[0]
		}

		function An(e, n, r) {
			var i = 0,
				s = n[t];
			for (; i < s; i++) vn(e, n[i], r);
			return r
		}

		function On(e, n, r, i, s) {
			var o, u = [],
				a = 0,
				f = e[t],
				l = n != v;
			for (; a < f; a++)
				if (o = e[a])
					if (!r || r(o, i, s)) u[m](o), l && n[m](a);
			return u
		}

		function Mn(e, n, r, i, s, o) {
			return i && !i[At] && (i = Mn(i)), s && !s[At] && (s = Mn(s, o)), gn(function(o, u, f, l) {
				var c, h, p, d = [],
					g = [],
					y = u[t],
					b = o || An(n || q, f[a] ? [f] : f, []),
					w = e && (o || !n) ? On(b, d, e, f, l) : b,
					E = r ? s || (o ? e : y || i) ? [] : u : w;
				r && r(w, E, f, l);
				if (i) {
					c = On(E, g), i(c, [], f, l), h = c[t];
					while (h--)
						if (p = c[h]) E[g[h]] = !(w[g[h]] = p)
				}
				if (o) {
					if (s || e) {
						if (s) {
							c = [], h = E[t];
							while (h--)(p = E[h]) && c[m](w[h] = p);
							s(v, E = [], c, l)
						}
						h = E[t];
						while (h--)(p = E[h]) && (c = s ? Xt[A](o, p) : d[h]) > -1 && (o[c] = !(u[c] = p))
					}
				} else E = On(E === u ? E.splice(y, E[t]) : E), s ? s(v, u, E, l) : zt[_](u, E)
			})
		}

		function _n(e) {
			var n, r, i, s = e[t],
				o = ht[P][e[0][b]],
				u = o || ht[P][M],
				f = o ? 1 : 0,
				l = kn(function(e) {
					return e === n
				}, u, h),
				c = kn(function(e) {
					return Xt[A](n, e) > -1
				}, u, h),
				g = [function(e, t, r) {
					return !o && (r || t !== yt) || ((n = t)[a] ? l(e, t, r) : c(e, t, r))
				}];
			for (; f < s; f++)
				if (r = ht[P][e[f][b]]) g = [kn(Ln(g), r)];
				else {
					r = ht.filter[e[f][b]][_](v, e[f][K]);
					if (r[At]) {
						i = ++f;
						for (; i < s; i++)
							if (ht[P][e[i][b]]) break;
						return Mn(f > 1 && Ln(g), f > 1 && Cn(e[d](0, f - 1).concat({
							value: e[f - 2][b] === M ? q : ""
						}))[p](Yt, "$1"), r, f < i && _n(e[d](f, i)), i < s && _n(e = e[d](i)), i < s && Cn(e))
					}
					g[m](r)
				}
			return Ln(g)
		}

		function Dn(e, n) {
			var r = n[t] > 0,
				i = e[t] > 0,
				s = function(s, o, u, a, f) {
					var l, c, h, p = 0,
						d = "0",
						g = s && [],
						y = [],
						b = yt,
						w = s || i && ht.find.TAG(q, f),
						E = Mt += b == v ? 1 : Math.random() || .1,
						S = w[t];
					f && (yt = o !== St && o);
					for (; d !== S && (l = w[d]) != v; d++) {
						if (i && l) {
							c = 0;
							while (h = e[c++])
								if (h(l, o, u)) {
									a[m](l);
									break
								}
							f && (Mt = E)
						}
						r && ((l = !h && l) && p--, s && g[m](l))
					}
					p += d;
					if (r && d !== p) {
						c = 0;
						while (h = n[c++]) h(g, y, o, u);
						if (s) {
							if (p > 0)
								while (d--) !g[d] && !y[d] && (y[d] = Rt[A](a));
							y = On(y)
						}
						zt[_](a, y), f && !s && y[t] > 0 && p + n[t] > 1 && vn.uniqueSort(a)
					}
					return f && (Mt = E, yt = b), g
				};
			return r ? gn(s) : s
		}
		var t = "length",
			n = "toLowerCase",
			r = "parentNode",
			i = "getElementsByClassName",
			s = "compareDocumentPosition",
			o = "getElementsByTagName",
			u = "ownerDocument",
			a = "nodeType",
			f = "getAttribute",
			l = "querySelectorAll",
			c = "nodeName",
			h = !0,
			p = "replace",
			d = "slice",
			v = null,
			m = "push",
			g = !1,
			y = "nextSibling",
			b = "type",
			w = "firstChild",
			E = "documentElement",
			S = "input",
			x = "getAttributeNode",
			T = "getElementById",
			N = "test",
			C = "previousSibling",
			k = "indexOf",
			L = "setAttribute",
			A = "call",
			O = "className",
			M = " ",
			_ = "apply",
			D = "childNodes",
			P = "relative",
			H = "pseudos",
			B = "createElement",
			j = "matchesSelector",
			F = "value",
			I = "button",
			q = "*",
			R = "string",
			U = "innerHTML",
			z = "attrHandle",
			W = ")",
			X = "^",
			V = "id",
			$ = "appendChild",
			J = "addEventListener",
			K = "matches",
			Q = "textContent",
			G = "contains",
			Y = "hasOwnProperty",
			Z = "setFilters",
			et = "disconnectedMatch",
			tt = "attributes",
			nt = "getElementsByName",
			rt = "document",
			it = "disabled",
			st = "ID",
			ot = "detectDuplicates",
			ut = ":enabled",
			at = ":checked",
			ft = "error",
			lt, ct, ht, pt, dt, vt, mt, gt, yt, bt, wt, Et, St, xt, Tt, Nt, Ct, kt, Lt, At = "sizzle" + -(new Date),
			Ot = e[rt],
			Mt = 0,
			_t = 0,
			Dt = mn(),
			Pt = mn(),
			Ht = mn(),
			Bt = function(e, t) {
				return e === t && (wt = h), 0
			},
			jt = typeof undefined,
			Ft = 1 << 31,
			It = {} [Y],
			qt = [],
			Rt = qt.pop,
			Ut = qt[m],
			zt = qt[m],
			Wt = qt[d],
			Xt = qt[k] || function(e) {
				var n = 0,
					r = this[t];
				for (; n < r; n++)
					if (this[n] === e) return n;
				return -1
			},
			Vt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			$t = "[\\x20\\t\\r\\n\\f]",
			Jt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			Kt = Jt[p]("w", "w#"),
			Qt = "\\[" + $t + "*(" + Jt + ")(?:" + $t + "*([*^$|!~]?=)" + $t + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + Kt + "))|)" + $t + "*\\]",
			Gt = ":(" + Jt + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + Qt + ")*)|" + ".*" + ")\\)|)",
			Yt = new RegExp(X + $t + "+|((?:^|[^\\\\])(?:\\\\.)*)" + $t + "+$", "g"),
			Zt = new RegExp(X + $t + "*," + $t + q),
			en = new RegExp(X + $t + "*([>+~]|" + $t + W + $t + q),
			tn = new RegExp("=" + $t + "*([^\\]'\"]*?)" + $t + "*\\]", "g"),
			nn = new RegExp(Gt),
			rn = new RegExp(X + Kt + "$"),
			sn = {
				ID: new RegExp("^#(" + Jt + W),
				CLASS: new RegExp("^\\.(" + Jt + W),
				TAG: new RegExp("^(" + Jt[p]("w", "w*") + W),
				ATTR: new RegExp(X + Qt),
				PSEUDO: new RegExp(X + Gt),
				CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + $t + "*(even|odd|(([+-]|)(\\d*)n|)" + $t + "*(?:([+-]|)" + $t + "*(\\d+)|))" + $t + "*\\)|)", "i"),
				bool: new RegExp("^(?:" + Vt + ")$", "i"),
				needsContext: new RegExp(X + $t + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + $t + "*((?:-\\d)?\\d*)" + $t + "*\\)|)(?=[^-]|$)", "i")
			},
			on = /^(?:input|select|textarea|button)$/i,
			un = /^h\d$/i,
			an = /^[^{]+\{\s*\[native \w/,
			fn = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			ln = /[+~]/,
			cn = /'|\\/g,
			hn = new RegExp("\\\\([\\da-f]{1,6}" + $t + "?|(" + $t + ")|.)", "ig"),
			pn = function(e, t, n) {
				var r = "0x" + t - 65536;
				return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
			};
		try {
			zt[_](qt = Wt[A](Ot[D]), Ot[D]), qt[Ot[D][t]][a]
		} catch (dn) {
			zt = {
				apply: qt[t] ? function(e, t) {
					Ut[_](e, Wt[A](t))
				} : function(e, n) {
					var r = e[t],
						i = 0;
					while (e[r++] = n[i++]);
					e[t] = r - 1
				}
			}
		}
		ct = vn.support = {}, dt = vn.isXML = function(e) {
			var t = e && (e[u] || e)[E];
			return t ? t[c] !== "HTML" : g
		}, Et = vn.setDocument = function(e) {
			var n, c = e ? e[u] || e : Ot,
				d = c.defaultView;
			if (c === St || c[a] !== 9 || !c[E]) return St;
			St = c, xt = c[E], Tt = !dt(c), d && d !== d.top && (d[J] ? d[J]("unload", function() {
				Et()
			}, g) : d.attachEvent && d.attachEvent("onunload", function() {
				Et()
			})), ct[tt] = yn(function(e) {
				return e[O] = "i", !e[f](O)
			}), ct[o] = yn(function(e) {
				return e[$](c.createComment("")), !e[o](q)[t]
			}), ct[i] = an[N](c[i]) && yn(function(e) {
				return e[U] = "<div class='a'></div><div class='a i'></div>", e[w][O] = "i", e[i]("i")[t] === 2
			}), ct.getById = yn(function(e) {
				return xt[$](e)[V] = At, !c[nt] || !c[nt](At)[t]
			}), ct.getById ? (ht.find[st] = function(e, t) {
				if (typeof t[T] !== jt && Tt) {
					var n = t[T](e);
					return n && n[r] ? [n] : []
				}
			}, ht.filter[st] = function(e) {
				var t = e[p](hn, pn);
				return function(e) {
					return e[f](V) === t
				}
			}) : (delete ht.find[st], ht.filter[st] = function(e) {
				var t = e[p](hn, pn);
				return function(e) {
					var n = typeof e[x] !== jt && e[x](V);
					return n && n[F] === t
				}
			}), ht.find.TAG = ct[o] ? function(e, t) {
				if (typeof t[o] !== jt) return t[o](e)
			} : function(e, t) {
				var n, r = [],
					i = 0,
					s = t[o](e);
				if (e === q) {
					while (n = s[i++]) n[a] === 1 && r[m](n);
					return r
				}
				return s
			}, ht.find.CLASS = ct[i] && function(e, t) {
				if (typeof t[i] !== jt && Tt) return t[i](e)
			}, Ct = [], Nt = [];
			if (ct.qsa = an[N](c[l])) yn(function(e) {
				e[U] = "<select msallowclip=''><option selected=''></option></select>", e[l]("[msallowclip^='']")[t] && Nt[m]("[*^$]=" + $t + "*(?:''|\"\")"), e[l]("[selected]")[t] || Nt[m]("\\[" + $t + "*(?:value|" + Vt + W), e[l](at)[t] || Nt[m](at)
			}), yn(function(e) {
				var n = c[B](S);
				n[L](b, "hidden"), e[$](n)[L]("name", "D"), e[l]("[name=d]")[t] && Nt[m]("name" + $t + "*[*^$|!~]?="), e[l](ut)[t] || Nt[m](ut, ":disabled"), e[l]("*,:x"), Nt[m](",.*:")
			});
			return (ct[j] = an[N](kt = xt[K] || xt.webkitMatchesSelector || xt.mozMatchesSelector || xt.oMatchesSelector || xt.msMatchesSelector)) && yn(function(e) {
				ct[et] = kt[A](e, "div"), kt[A](e, "[s!='']:x"), Ct[m]("!=", Gt)
			}), Nt = Nt[t] && new RegExp(Nt.join("|")), Ct = Ct[t] && new RegExp(Ct.join("|")), n = an[N](xt[s]), Lt = n || an[N](xt[G]) ? function(e, t) {
				var n = e[a] === 9 ? e[E] : e,
					i = t && t[r];
				return e === i || !!i && i[a] === 1 && !!(n[G] ? n[G](i) : e[s] && e[s](i) & 16)
			} : function(e, t) {
				if (t)
					while (t = t[r])
						if (t === e) return h;
				return g
			}, Bt = n ? function(e, t) {
				if (e === t) return wt = h, 0;
				var n = !e[s] - !t[s];
				return n ? n : (n = (e[u] || e) === (t[u] || t) ? e[s](t) : 1, n & 1 || !ct.sortDetached && t[s](e) === n ? e === c || e[u] === Ot && Lt(Ot, e) ? -1 : t === c || t[u] === Ot && Lt(Ot, t) ? 1 : bt ? Xt[A](bt, e) - Xt[A](bt, t) : 0 : n & 4 ? -1 : 1)
			} : function(e, t) {
				if (e === t) return wt = h, 0;
				var n, i = 0,
					s = e[r],
					o = t[r],
					u = [e],
					a = [t];
				if (!s || !o) return e === c ? -1 : t === c ? 1 : s ? -1 : o ? 1 : bt ? Xt[A](bt, e) - Xt[A](bt, t) : 0;
				if (s === o) return wn(e, t);
				n = e;
				while (n = n[r]) u.unshift(n);
				n = t;
				while (n = n[r]) a.unshift(n);
				while (u[i] === a[i]) i++;
				return i ? wn(u[i], a[i]) : u[i] === Ot ? -1 : a[i] === Ot ? 1 : 0
			}, c
		}, vn[K] = function(e, t) {
			return vn(e, v, v, t)
		}, vn[j] = function(e, n) {
			(e[u] || e) !== St && Et(e), n = n[p](tn, "='$1']");
			if (ct[j] && Tt && (!Ct || !Ct[N](n)) && (!Nt || !Nt[N](n))) try {
				var r = kt[A](e, n);
				if (r || ct[et] || e[rt] && e[rt][a] !== 11) return r
			} catch (i) {}
			return vn(n, St, v, [e])[t] > 0
		}, vn[G] = function(e, t) {
			return (e[u] || e) !== St && Et(e), Lt(e, t)
		}, vn.attr = function(e, t) {
			(e[u] || e) !== St && Et(e);
			var r = ht[z][t[n]()],
				i = r && It[A](ht[z], t[n]()) ? r(e, t, !Tt) : undefined;
			return i !== undefined ? i : ct[tt] || !Tt ? e[f](t) : (i = e[x](t)) && i.specified ? i[F] : v
		}, vn[ft] = function(e) {
			throw new Error("Syntax error, unrecognized expression: " + e)
		}, vn.uniqueSort = function(e) {
			var t, n = [],
				r = 0,
				i = 0;
			wt = !ct[ot], bt = !ct.sortStable && e[d](0), e.sort(Bt);
			if (wt) {
				while (t = e[i++]) t === e[i] && (r = n[m](i));
				while (r--) e.splice(n[r], 1)
			}
			return bt = v, e
		}, pt = vn.getText = function(e) {
			var t, n = "",
				r = 0,
				i = e[a];
			if (!i)
				while (t = e[r++]) n += pt(t);
			else if (i === 1 || i === 9 || i === 11) {
				if (typeof e[Q] === R) return e[Q];
				for (e = e[w]; e; e = e[y]) n += pt(e)
			} else if (i === 3 || i === 4) return e.nodeValue;
			return n
		}, ht = vn.selectors = {
			cacheLength: 50,
			createPseudo: gn,
			match: sn,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: r,
					first: h
				},
				" ": {
					dir: r
				},
				"+": {
					dir: C,
					first: h
				},
				"~": {
					dir: C
				}
			},
			preFilter: {
				ATTR: function(e) {
					return e[1] = e[1][p](hn, pn), e[3] = (e[3] || e[4] || e[5] || "")[p](hn, pn), e[2] === "~=" && (e[3] = M + e[3] + M), e[d](0, 4)
				},
				CHILD: function(e) {
					return e[1] = e[1][n](), e[1][d](0, 3) === "nth" ? (e[3] || vn[ft](e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && vn[ft](e[0]), e
				},
				PSEUDO: function(e) {
					var n, r = !e[6] && e[2];
					return sn.CHILD[N](e[0]) ? v : (e[3] ? e[2] = e[4] || e[5] || "" : r && nn[N](r) && (n = vt(r, h)) && (n = r[k](W, r[t] - n) - r[t]) && (e[0] = e[0][d](0, n), e[2] = r[d](0, n)), e[d](0, 3))
				}
			},
			filter: {
				TAG: function(e) {
					var t = e[p](hn, pn)[n]();
					return e === q ? function() {
						return h
					} : function(e) {
						return e[c] && e[c][n]() === t
					}
				},
				CLASS: function(e) {
					var t = Dt[e + M];
					return t || (t = new RegExp("(^|" + $t + W + e + "(" + $t + "|$)")) && Dt(e, function(e) {
						return t[N](typeof e[O] === R && e[O] || typeof e[f] !== jt && e[f]("class") || "")
					})
				},
				ATTR: function(e, n, r) {
					return function(i) {
						var s = vn.attr(i, e);
						return s == v ? n === "!=" : n ? (s += "", n === "=" ? s === r : n === "!=" ? s !== r : n === "^=" ? r && s[k](r) === 0 : n === "*=" ? r && s[k](r) > -1 : n === "$=" ? r && s[d](-r[t]) === r : n === "~=" ? (M + s + M)[k](r) > -1 : n === "|=" ? s === r || s[d](0, r[t] + 1) === r + "-" : g) : h
					}
				},
				CHILD: function(e, t, i, s, o) {
					var u = e[d](0, 3) !== "nth",
						f = e[d](-4) !== "last",
						l = t === "of-type";
					return s === 1 && o === 0 ? function(e) {
						return !!e[r]
					} : function(t, i, p) {
						var d, v, m, b, E, S, x = u !== f ? y : C,
							T = t[r],
							N = l && t[c][n](),
							k = !p && !l;
						if (T) {
							if (u) {
								while (x) {
									m = t;
									while (m = m[x])
										if (l ? m[c][n]() === N : m[a] === 1) return g;
									S = x = e === "only" && !S && y
								}
								return h
							}
							S = [f ? T[w] : T.lastChild];
							if (f && k) {
								v = T[At] || (T[At] = {}), d = v[e] || [], E = d[0] === Mt && d[1], b = d[0] === Mt && d[2], m = E && T[D][E];
								while (m = ++E && m && m[x] || (b = E = 0) || S.pop())
									if (m[a] === 1 && ++b && m === t) {
										v[e] = [Mt, E, b];
										break
									}
							} else if (k && (d = (t[At] || (t[At] = {}))[e]) && d[0] === Mt) b = d[1];
							else
								while (m = ++E && m && m[x] || (b = E = 0) || S.pop())
									if ((l ? m[c][n]() === N : m[a] === 1) && ++b) {
										k && ((m[At] || (m[At] = {}))[e] = [Mt, b]);
										if (m === t) break
									}
							return b -= o, b === s || b % s === 0 && b / s >= 0
						}
					}
				},
				PSEUDO: function(e, r) {
					var i, s = ht[H][e] || ht[Z][e[n]()] || vn[ft]("unsupported pseudo: " + e);
					return s[At] ? s(r) : s[t] > 1 ? (i = [e, e, "", r], ht[Z][Y](e[n]()) ? gn(function(e, n) {
						var i, o = s(e, r),
							u = o[t];
						while (u--) i = Xt[A](e, o[u]), e[i] = !(n[i] = o[u])
					}) : function(e) {
						return s(e, 0, i)
					}) : s
				}
			},
			pseudos: {
				not: gn(function(e) {
					var n = [],
						r = [],
						i = mt(e[p](Yt, "$1"));
					return i[At] ? gn(function(e, n, r, s) {
						var o, u = i(e, v, s, []),
							a = e[t];
						while (a--)
							if (o = u[a]) e[a] = !(n[a] = o)
					}) : function(e, t, s) {
						return n[0] = e, i(n, v, s, r), !r.pop()
					}
				}),
				has: gn(function(e) {
					return function(n) {
						return vn(e, n)[t] > 0
					}
				}),
				contains: gn(function(e) {
					return function(t) {
						return (t[Q] || t.innerText || pt(t))[k](e) > -1
					}
				}),
				lang: gn(function(e) {
					return rn[N](e || "") || vn[ft]("unsupported lang: " + e), e = e[p](hn, pn)[n](),
						function(t) {
							var i;
							do
								if (i = Tt ? t.lang : t[f]("xml:lang") || t[f]("lang")) return i = i[n](), i === e || i[k](e + "-") === 0; while ((t = t[r]) && t[a] === 1);
							return g
						}
				}),
				target: function(t) {
					var n = e.location && e.location.hash;
					return n && n[d](1) === t[V]
				},
				root: function(e) {
					return e === xt
				},
				focus: function(e) {
					return e === St.activeElement && (!St.hasFocus || St.hasFocus()) && !!(e[b] || e.href || ~e.tabIndex)
				},
				enabled: function(e) {
					return e[it] === g
				},
				disabled: function(e) {
					return e[it] === h
				},
				checked: function(e) {
					var t = e[c][n]();
					return t === S && !!e.checked || t === "option" && !!e.selected
				},
				selected: function(e) {
					return e[r] && e[r].selectedIndex, e.selected === h
				},
				empty: function(e) {
					for (e = e[w]; e; e = e[y])
						if (e[a] < 6) return g;
					return h
				},
				parent: function(e) {
					return !ht[H].empty(e)
				},
				header: function(e) {
					return un[N](e[c])
				},
				input: function(e) {
					return on[N](e[c])
				},
				button: function(e) {
					var t = e[c][n]();
					return t === S && e[b] === I || t === I
				},
				text: function(e) {
					var t;
					return e[c][n]() === S && e[b] === "text" && ((t = e[f](b)) == v || t[n]() === "text")
				},
				first: xn(function() {
					return [0]
				}),
				last: xn(function(e, t) {
					return [t - 1]
				}),
				eq: xn(function(e, t, n) {
					return [n < 0 ? n + t : n]
				}),
				even: xn(function(e, t) {
					var n = 0;
					for (; n < t; n += 2) e[m](n);
					return e
				}),
				odd: xn(function(e, t) {
					var n = 1;
					for (; n < t; n += 2) e[m](n);
					return e
				}),
				lt: xn(function(e, t, n) {
					var r = n < 0 ? n + t : n;
					for (; --r >= 0;) e[m](r);
					return e
				}),
				gt: xn(function(e, t, n) {
					var r = n < 0 ? n + t : n;
					for (; ++r < t;) e[m](r);
					return e
				})
			}
		}, ht[H].nth = ht[H].eq;
		for (lt in {
				radio: h,
				checkbox: h,
				file: h,
				password: h,
				image: h
			}) ht[H][lt] = En(lt);
		for (lt in {
				submit: h,
				reset: h
			}) ht[H][lt] = Sn(lt);
		return Nn.prototype = ht.filters = ht[H], ht[Z] = new Nn, vt = vn.tokenize = function(e, n) {
			var r, i, s, o, u, a, f, l = Pt[e + M];
			if (l) return n ? 0 : l[d](0);
			u = e, a = [], f = ht.preFilter;
			while (u) {
				if (!r || (i = Zt.exec(u))) i && (u = u[d](i[0][t]) || u), a[m](s = []);
				r = g;
				if (i = en.exec(u)) r = i.shift(), s[m]({
					value: r,
					type: i[0][p](Yt, M)
				}), u = u[d](r[t]);
				for (o in ht.filter)(i = sn[o].exec(u)) && (!f[o] || (i = f[o](i))) && (r = i.shift(), s[m]({
					value: r,
					type: o,
					matches: i
				}), u = u[d](r[t]));
				if (!r) break
			}
			return n ? u[t] : u ? vn[ft](e) : Pt(e, a)[d](0)
		}, mt = vn.compile = function(e, n) {
			var r, i = [],
				s = [],
				o = Ht[e + M];
			if (!o) {
				n || (n = vt(e)), r = n[t];
				while (r--) o = _n(n[r]), o[At] ? i[m](o) : s[m](o);
				o = Ht(e, Dn(s, i)), o.selector = e
			}
			return o
		}, gt = vn.select = function(e, n, i, s) {
			var o, u, f, l, c, h = typeof e == "function" && e,
				v = !s && vt(e = h.selector || e);
			i = i || [];
			if (v[t] === 1) {
				u = v[0] = v[0][d](0);
				if (u[t] > 2 && (f = u[0])[b] === st && ct.getById && n[a] === 9 && Tt && ht[P][u[1][b]]) {
					n = (ht.find[st](f[K][0][p](hn, pn), n) || [])[0];
					if (!n) return i;
					h && (n = n[r]), e = e[d](u.shift()[F][t])
				}
				o = sn.needsContext[N](e) ? 0 : u[t];
				while (o--) {
					f = u[o];
					if (ht[P][l = f[b]]) break;
					if (c = ht.find[l])
						if (s = c(f[K][0][p](hn, pn), ln[N](u[0][b]) && Tn(n[r]) || n)) {
							u.splice(o, 1), e = s[t] && Cn(u);
							if (!e) return zt[_](i, s), i;
							break
						}
				}
			}
			return (h || mt(e, v))(s, n, !Tt, i, ln[N](e) && Tn(n[r]) || n), i
		}, ct.sortStable = At.split("").sort(Bt).join("") === At, ct[ot] = !!wt, Et(), ct.sortDetached = yn(function(e) {
			return e[s](St[B]("div")) & 1
		}), yn(function(e) {
			return e[U] = "<a href='#'></a>", e[w][f]("href") === "#"
		}) || bn("type|href|height|width", function(e, t, r) {
			if (!r) return e[f](t, t[n]() === b ? 1 : 2)
		}), (!ct[tt] || !yn(function(e) {
			return e[U] = "<input/>", e[w][L](F, ""), e[w][f](F) === ""
		})) && bn(F, function(e, t, r) {
			if (!r && e[c][n]() === S) return e.defaultValue
		}), yn(function(e) {
			return e[f](it) == v
		}) || bn(Vt, function(e, t, r) {
			var i;
			if (!r) return e[t] === h ? t[n]() : (i = e[x](t)) && i.specified ? i[F] : v
		}), vn
	}(window);
	jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
	var rneedsContext = jQuery.expr.match.needsContext,
		rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		risSimple = /^.[^:#\[\.,]*$/;
	jQuery.filter = function(e, t, n) {
		var r = t[0];
		return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, function(e) {
			return e.nodeType === 1
		}))
	}, jQuery.fn.extend({
		find: function(e) {
			var t = "selector",
				n, r = this.length,
				i = [],
				s = this;
			if (typeof e != "string") return this.pushStack(jQuery(e).filter(function() {
				for (n = 0; n < r; n++)
					if (jQuery.contains(s[n], this)) return !0
			}));
			for (n = 0; n < r; n++) jQuery.find(e, s[n], i);
			return i = this.pushStack(r > 1 ? jQuery.unique(i) : i), i[t] = this[t] ? this[t] + " " + e : e, i
		},
		filter: function(e) {
			return this.pushStack(winnow(this, e || [], !1))
		},
		not: function(e) {
			return this.pushStack(winnow(this, e || [], !0))
		},
		is: function(e) {
			return !!winnow(this, typeof e == "string" && rneedsContext.test(e) ? jQuery(e) : e || [], !1).length
		}
	});
	var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		init = jQuery.fn.init = function(e, t) {
			var n = "length",
				r = "isFunction",
				i = "context",
				s = "selector",
				o, u;
			if (!e) return this;
			if (typeof e == "string") {
				e[0] === "<" && e[e[n] - 1] === ">" && e[n] >= 3 ? o = [null, e, null] : o = rquickExpr.exec(e);
				if (o && (o[1] || !t)) {
					if (o[1]) {
						t = t instanceof jQuery ? t[0] : t, jQuery.merge(this, jQuery.parseHTML(o[1], t && t.nodeType ? t.ownerDocument || t : document, !0));
						if (rsingleTag.test(o[1]) && jQuery.isPlainObject(t))
							for (o in t) jQuery[r](this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
						return this
					}
					return u = document.getElementById(o[2]), u && u.parentNode && (this[n] = 1, this[0] = u), this[i] = document, this[s] = e, this
				}
				return !t || t.jquery ? (t || rootjQuery).find(e) : this.constructor(t).find(e)
			}
			return e.nodeType ? (this[i] = this[0] = e, this[n] = 1, this) : jQuery[r](e) ? typeof rootjQuery.ready != "undefined" ? rootjQuery.ready(e) : e(jQuery) : (e[s] !== undefined && (this[s] = e[s], this[i] = e[i]), jQuery.makeArray(e, this))
		};
	init.prototype = jQuery.fn, rootjQuery = jQuery(document);
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		guaranteedUnique = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	jQuery.extend({
		dir: function(e, t, n) {
			var r = [],
				i = n !== undefined;
			while ((e = e[t]) && e.nodeType !== 9)
				if (e.nodeType === 1) {
					if (i && jQuery(e).is(n)) break;
					r.push(e)
				}
			return r
		},
		sibling: function(e, t) {
			var n = [];
			for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
			return n
		}
	}), jQuery.fn.extend({
		has: function(e) {
			var t = jQuery(e, this),
				n = t.length;
			return this.filter(function() {
				var e = 0;
				for (; e < n; e++)
					if (jQuery.contains(this, t[e])) return !0
			})
		},
		closest: function(e, t) {
			var n, r = 0,
				i = this.length,
				s = [],
				o = rneedsContext.test(e) || typeof e != "string" ? jQuery(e, t || this.context) : 0;
			for (; r < i; r++)
				for (n = this[r]; n && n !== t; n = n.parentNode)
					if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && jQuery.find.matchesSelector(n, e))) {
						s.push(n);
						break
					}
			return this.pushStack(s.length > 1 ? jQuery.unique(s) : s)
		},
		index: function(e) {
			return e ? typeof e == "string" ? indexOf.call(jQuery(e), this[0]) : indexOf.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(e, t))))
		},
		addBack: function(e) {
			return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
		}
	}), jQuery.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && t.nodeType !== 11 ? t : null
		},
		parents: function(e) {
			return jQuery.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return jQuery.dir(e, "parentNode", n)
		},
		next: function(e) {
			return sibling(e, "nextSibling")
		},
		prev: function(e) {
			return sibling(e, "previousSibling")
		},
		nextAll: function(e) {
			return jQuery.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return jQuery.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return jQuery.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return jQuery.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return jQuery.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return jQuery.sibling(e.firstChild)
		},
		contents: function(e) {
			return e.contentDocument || jQuery.merge([], e.childNodes)
		}
	}, function(e, t) {
		jQuery.fn[e] = function(n, r) {
			var i = jQuery.map(this, t, n);
			return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = jQuery.filter(r, i)), this.length > 1 && (guaranteedUnique[e] || jQuery.unique(i), rparentsprev.test(e) && i.reverse()), this.pushStack(i)
		}
	});
	var rnotwhite = /\S+/g,
		optionsCache = {};
	jQuery.Callbacks = function(e) {
		var t = "string",
			n = "length",
			r = !1;
		e = typeof e === t ? optionsCache[e] || createOptions(e) : jQuery.extend({}, e);
		var i, s, o, u, a, f, l = [],
			c = !e.once && [],
			h = function(t) {
				i = e.memory && t, s = !0, f = u || 0, u = 0, a = l[n], o = !0;
				for (; l && f < a; f++)
					if (l[f].apply(t[0], t[1]) === r && e.stopOnFalse) {
						i = r;
						break
					}
				o = r, l && (c ? c[n] && h(c.shift()) : i ? l = [] : p.disable())
			},
			p = {
				add: function() {
					if (l) {
						var r = l[n];
						(function s(r) {
							jQuery.each(r, function(r, i) {
								var o = jQuery.type(i);
								o === "function" ? (!e.unique || !p.has(i)) && l.push(i) : i && i[n] && o !== t && s(i)
							})
						})(arguments), o ? a = l[n] : i && (u = r, h(i))
					}
					return this
				},
				remove: function() {
					return l && jQuery.each(arguments, function(e, t) {
						var n;
						while ((n = jQuery.inArray(t, l, n)) > -1) l.splice(n, 1), o && (n <= a && a--, n <= f && f--)
					}), this
				},
				has: function(e) {
					return e ? jQuery.inArray(e, l) > -1 : !!l && !!l[n]
				},
				empty: function() {
					return l = [], a = 0, this
				},
				disable: function() {
					return l = c = i = undefined, this
				},
				disabled: function() {
					return !l
				},
				lock: function() {
					return c = undefined, i || p.disable(), this
				},
				locked: function() {
					return !c
				},
				fireWith: function(e, t) {
					return l && (!s || c) && (t = t || [], t = [e, t.slice ? t.slice() : t], o ? c.push(t) : h(t)), this
				},
				fire: function() {
					return p.fireWith(this, arguments), this
				},
				fired: function() {
					return !!s
				}
			};
		return p
	}, jQuery.extend({
		Deferred: function(e) {
			var t = "resolve",
				n = "Callbacks",
				r = "once memory",
				i = "progress",
				s = "promise",
				o = "isFunction",
				u = "With",
				a = [
					[t, "done", jQuery[n](r), "resolved"],
					["reject", "fail", jQuery[n](r), "rejected"],
					["notify", i, jQuery[n]("memory")]
				],
				f = "pending",
				l = {
					state: function() {
						return f
					},
					always: function() {
						return c.done(arguments).fail(arguments), this
					},
					then: function() {
						var e = arguments;
						return jQuery.Deferred(function(n) {
							jQuery.each(a, function(r, a) {
								var f = jQuery[o](e[r]) && e[r];
								c[a[1]](function() {
									var e = f && f.apply(this, arguments);
									e && jQuery[o](e[s]) ? e[s]().done(n[t]).fail(n.reject)[i](n.notify) : n[a[0] + u](this === l ? n[s]() : this, f ? [e] : arguments)
								})
							}), e = null
						})[s]()
					},
					promise: function(e) {
						return e != null ? jQuery.extend(e, l) : l
					}
				},
				c = {};
			return l.pipe = l.then, jQuery.each(a, function(e, t) {
				var n = t[2],
					r = t[3];
				l[t[1]] = n.add, r && n.add(function() {
					f = r
				}, a[e ^ 1][2].disable, a[2][2].lock), c[t[0]] = function() {
					return c[t[0] + u](this === c ? l : this, arguments), this
				}, c[t[0] + u] = n.fireWith
			}), l[s](c), e && e.call(c, c), c
		},
		when: function(e) {
			var t = "isFunction",
				n = "promise",
				r = "resolveWith",
				i = 0,
				s = slice.call(arguments),
				o = s.length,
				u = o !== 1 || e && jQuery[t](e[n]) ? o : 0,
				a = u === 1 ? e : jQuery.Deferred(),
				f = function(e, t, n) {
					return function(i) {
						t[e] = this, n[e] = arguments.length > 1 ? slice.call(arguments) : i, n === l ? a.notifyWith(t, n) : --u || a[r](t, n)
					}
				},
				l, c, h;
			if (o > 1) {
				l = new Array(o), c = new Array(o), h = new Array(o);
				for (; i < o; i++) s[i] && jQuery[t](s[i][n]) ? s[i][n]().done(f(i, h, s)).fail(a.reject).progress(f(i, c, l)) : --u
			}
			return u || a[r](h, s), a[n]()
		}
	});
	var readyList;
	jQuery.fn.ready = function(e) {
		return jQuery.ready.promise().done(e), this
	}, jQuery.extend({
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? jQuery.readyWait++ : jQuery.ready(!0)
		},
		ready: function(e) {
			var t = !0,
				n = "triggerHandler",
				r = "ready";
			if (e === t ? --jQuery.readyWait : jQuery.isReady) return;
			jQuery.isReady = t;
			if (e !== t && --jQuery.readyWait > 0) return;
			readyList.resolveWith(document, [jQuery]), jQuery.fn[n] && (jQuery(document)[n](r), jQuery(document).off(r))
		}
	}), jQuery.ready.promise = function(e) {
		var t = "addEventListener";
		return readyList || (readyList = jQuery.Deferred(), document.readyState === "complete" ? setTimeout(jQuery.ready) : (document[t]("DOMContentLoaded", completed, !1), window[t]("load", completed, !1))), readyList.promise(e)
	}, jQuery.ready.promise();
	var access = jQuery.access = function(e, t, n, r, i, s, o) {
		var u = !0,
			a = 0,
			f = e.length,
			l = n == null;
		if (jQuery.type(n) === "object") {
			i = u;
			for (a in n) jQuery.access(e, t, a, n[a], u, s, o)
		} else if (r !== undefined) {
			i = u, jQuery.isFunction(r) || (o = u), l && (o ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
				return l.call(jQuery(e), n)
			}));
			if (t)
				for (; a < f; a++) t(e[a], n, o ? r : r.call(e[a], a, t(e[a], n)))
		}
		return i ? e : l ? t.call(e) : f ? t(e[0], n) : s
	};
	jQuery.acceptData = function(e) {
		var t = "nodeType";
		return e[t] === 1 || e[t] === 9 || !+e[t]
	}, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
		key: function(e) {
			if (!Data.accepts(e)) return 0;
			var t = {},
				n = e[this.expando];
			if (!n) {
				n = Data.uid++;
				try {
					t[this.expando] = {
						value: n
					}, Object.defineProperties(e, t)
				} catch (r) {
					t[this.expando] = n, jQuery.extend(e, t)
				}
			}
			return this.cache[n] || (this.cache[n] = {}), n
		},
		set: function(e, t, n) {
			var r, i = this.key(e),
				s = this.cache[i];
			if (typeof t == "string") s[t] = n;
			else if (jQuery.isEmptyObject(s)) jQuery.extend(this.cache[i], t);
			else
				for (r in t) s[r] = t[r];
			return s
		},
		get: function(e, t) {
			var n = this.cache[this.key(e)];
			return t === undefined ? n : n[t]
		},
		access: function(e, t, n) {
			var r;
			return t === undefined || t && typeof t == "string" && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, jQuery.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t)
		},
		remove: function(e, t) {
			var n, r, i, s = this.key(e),
				o = this.cache[s];
			if (t === undefined) this.cache[s] = {};
			else {
				jQuery.isArray(t) ? r = t.concat(t.map(jQuery.camelCase)) : (i = jQuery.camelCase(t), t in o ? r = [t, i] : (r = i, r = r in o ? [r] : r.match(rnotwhite) || [])), n = r.length;
				while (n--) delete o[r[n]]
			}
		},
		hasData: function(e) {
			return !jQuery.isEmptyObject(this.cache[e[this.expando]] || {})
		},
		discard: function(e) {
			e[this.expando] && delete this.cache[e[this.expando]]
		}
	};
	var data_priv = new Data,
		data_user = new Data,
		rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;
	jQuery.extend({
		hasData: function(e) {
			return data_user.hasData(e) || data_priv.hasData(e)
		},
		data: function(e, t, n) {
			return data_user.access(e, t, n)
		},
		removeData: function(e, t) {
			data_user.remove(e, t)
		},
		_data: function(e, t, n) {
			return data_priv.access(e, t, n)
		},
		_removeData: function(e, t) {
			data_priv.remove(e, t)
		}
	}), jQuery.fn.extend({
		data: function(e, t) {
			var n = "length",
				r = "hasDataAttrs",
				i, s, o, u = this[0],
				a = u && u.attributes;
			if (e === undefined) {
				if (this[n]) {
					o = data_user.get(u);
					if (u.nodeType === 1 && !data_priv.get(u, r)) {
						i = a[n];
						while (i--) a[i] && (s = a[i].name, s.indexOf("data-") === 0 && (s = jQuery.camelCase(s.slice(5)), dataAttr(u, s, o[s])));
						data_priv.set(u, r, !0)
					}
				}
				return o
			}
			return typeof e == "object" ? this.each(function() {
				data_user.set(this, e)
			}) : access(this, function(t) {
				var n, r = jQuery.camelCase(e);
				if (u && t === undefined) {
					n = data_user.get(u, e);
					if (n !== undefined) return n;
					n = data_user.get(u, r);
					if (n !== undefined) return n;
					n = dataAttr(u, r, undefined);
					if (n !== undefined) return n;
					return
				}
				this.each(function() {
					var n = data_user.get(this, r);
					data_user.set(this, r, t), e.indexOf("-") !== -1 && n !== undefined && data_user.set(this, e, t)
				})
			}, null, t, arguments[n] > 1, null, !0)
		},
		removeData: function(e) {
			return this.each(function() {
				data_user.remove(this, e)
			})
		}
	}), jQuery.extend({
		queue: function(e, t, n) {
			var r;
			if (e) return t = (t || "fx") + "queue", r = data_priv.get(e, t), n && (!r || jQuery.isArray(n) ? r = data_priv.access(e, t, jQuery.makeArray(n)) : r.push(n)), r || []
		},
		dequeue: function(e, t) {
			var n = "inprogress";
			t = t || "fx";
			var r = jQuery.queue(e, t),
				i = r.length,
				s = r.shift(),
				o = jQuery._queueHooks(e, t),
				u = function() {
					jQuery.dequeue(e, t)
				};
			s === n && (s = r.shift(), i--), s && (t === "fx" && r.unshift(n), delete o.stop, s.call(e, u, o)), !i && o && o.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return data_priv.get(e, n) || data_priv.access(e, n, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove(e, [t + "queue", n])
				})
			})
		}
	}), jQuery.fn.extend({
		queue: function(e, t) {
			var n = 2;
			return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? jQuery.queue(this[0], e) : t === undefined ? this : this.each(function() {
				var n = jQuery.queue(this, e, t);
				jQuery._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && jQuery.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				jQuery.dequeue(this, e)
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, t) {
			var n, r = 1,
				i = jQuery.Deferred(),
				s = this,
				o = this.length,
				u = function() {
					--r || i.resolveWith(s, [s])
				};
			typeof e != "string" && (t = e, e = undefined), e = e || "fx";
			while (o--) n = data_priv.get(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
			return u(), i.promise(t)
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		cssExpand = ["Top", "Right", "Bottom", "Left"],
		isHidden = function(e, t) {
			return e = t || e, jQuery.css(e, "display") === "none" || !jQuery.contains(e.ownerDocument, e)
		},
		rcheckableType = /^(?:checkbox|radio)$/i;
	(function() {
		var e = "appendChild",
			t = "createElement",
			n = "setAttribute",
			r = "checked",
			i = "cloneNode",
			s = !0,
			o = document.createDocumentFragment(),
			u = o[e](document[t]("div")),
			a = document[t]("input");
		a[n]("type", "radio"), a[n](r, r), a[n]("name", "t"), u[e](a), support.checkClone = u[i](s)[i](s).lastChild[r], u.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!u[i](s).lastChild.defaultValue
	})();
	var strundefined = typeof undefined;
	support.focusinBubbles = "onfocusin" in window;
	var rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	jQuery.event = {
		global: {},
		add: function(e, t, n, r, i) {
			var s = "handler",
				o = "guid",
				u = "event",
				a = "delegateCount",
				f = "addEventListener",
				l, c, h, p, d, v, m, g, y, b, w, E = data_priv.get(e);
			if (!E) return;
			n[s] && (l = n, n = l[s], i = l.selector), n[o] || (n[o] = jQuery[o]++), (p = E.events) || (p = E.events = {}), (c = E.handle) || (c = E.handle = function(t) {
				return typeof jQuery !== strundefined && jQuery[u].triggered !== t.type ? jQuery[u].dispatch.apply(e, arguments) : undefined
			}), t = (t || "").match(rnotwhite) || [""], d = t.length;
			while (d--) {
				h = rtypenamespace.exec(t[d]) || [], y = w = h[1], b = (h[2] || "").split(".").sort();
				if (!y) continue;
				m = jQuery[u].special[y] || {}, y = (i ? m.delegateType : m.bindType) || y, m = jQuery[u].special[y] || {}, v = jQuery.extend({
					type: y,
					origType: w,
					data: r,
					handler: n,
					guid: n[o],
					selector: i,
					needsContext: i && jQuery.expr.match.needsContext.test(i),
					namespace: b.join(".")
				}, l), (g = p[y]) || (g = p[y] = [], g[a] = 0, (!m.setup || m.setup.call(e, r, b, c) === !1) && e[f] && e[f](y, c, !1)), m.add && (m.add.call(e, v), v[s][o] || (v[s][o] = n[o])), i ? g.splice(g[a]++, 0, v) : g.push(v), jQuery[u].global[y] = !0
			}
		},
		remove: function(e, t, n, r, i) {
			var s = "length",
				o = "remove",
				u = "selector",
				a = "handle",
				f, l, c, h, p, d, v, m, g, y, b, w = data_priv.hasData(e) && data_priv.get(e);
			if (!w || !(h = w.events)) return;
			t = (t || "").match(rnotwhite) || [""], p = t[s];
			while (p--) {
				c = rtypenamespace.exec(t[p]) || [], g = b = c[1], y = (c[2] || "").split(".").sort();
				if (!g) {
					for (g in h) jQuery.event[o](e, g + t[p], n, r, !0);
					continue
				}
				v = jQuery.event.special[g] || {}, g = (r ? v.delegateType : v.bindType) || g, m = h[g] || [], c = c[2] && new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = f = m[s];
				while (f--) d = m[f], (i || b === d.origType) && (!n || n.guid === d.guid) && (!c || c.test(d.namespace)) && (!r || r === d[u] || r === "**" && d[u]) && (m.splice(f, 1), d[u] && m.delegateCount--, v[o] && v[o].call(e, d));
				l && !m[s] && ((!v.teardown || v.teardown.call(e, y, w[a]) === !1) && jQuery.removeEvent(e, g, w[a]), delete h[g])
			}
			jQuery.isEmptyObject(h) && (delete w[a], data_priv[o](e, "events"))
		},
		trigger: function(e, t, n, r) {
			var i = "type",
				s = "namespace",
				o = ".",
				u = "triggered",
				a = "event",
				f = null,
				l = "result",
				c = "apply",
				h = !1,
				p = "parentNode",
				d = "acceptData",
				v, m, g, y, b, w, E, S = [n || document],
				x = hasOwn.call(e, i) ? e[i] : e,
				T = hasOwn.call(e, s) ? e[s].split(o) : [];
			m = g = n = n || document;
			if (n.nodeType === 3 || n.nodeType === 8) return;
			if (rfocusMorph.test(x + jQuery[a][u])) return;
			x.indexOf(o) >= 0 && (T = x.split(o), x = T.shift(), T.sort()), b = x.indexOf(":") < 0 && "on" + x, e = e[jQuery.expando] ? e : new jQuery.Event(x, typeof e == "object" && e), e.isTrigger = r ? 2 : 3, e[s] = T.join(o), e.namespace_re = e[s] ? new RegExp("(^|\\.)" + T.join("\\.(?:.*\\.|)") + "(\\.|$)") : f, e[l] = undefined, e.target || (e.target = n), t = t == f ? [e] : jQuery.makeArray(t, [e]), E = jQuery[a].special[x] || {};
			if (!r && E.trigger && E.trigger[c](n, t) === h) return;
			if (!r && !E.noBubble && !jQuery.isWindow(n)) {
				y = E.delegateType || x, rfocusMorph.test(y + x) || (m = m[p]);
				for (; m; m = m[p]) S.push(m), g = m;
				g === (n.ownerDocument || document) && S.push(g.defaultView || g.parentWindow || window)
			}
			v = 0;
			while ((m = S[v++]) && !e.isPropagationStopped()) e[i] = v > 1 ? y : E.bindType || x, w = (data_priv.get(m, "events") || {})[e[i]] && data_priv.get(m, "handle"), w && w[c](m, t), w = b && m[b], w && w[c] && jQuery[d](m) && (e[l] = w[c](m, t), e[l] === h && e.preventDefault());
			return e[i] = x, !r && !e.isDefaultPrevented() && (!E._default || E._default[c](S.pop(), t) === h) && jQuery[d](n) && b && jQuery.isFunction(n[x]) && !jQuery.isWindow(n) && (g = n[b], g && (n[b] = f), jQuery[a][u] = x, n[x](), jQuery[a][u] = undefined, g && (n[b] = g)), e[l]
		},
		dispatch: function(e) {
			var t = "event",
				n = "preDispatch",
				r = "namespace_re",
				i = "postDispatch";
			e = jQuery[t].fix(e);
			var s, o, u, a, f, l = [],
				c = slice.call(arguments),
				h = (data_priv.get(this, "events") || {})[e.type] || [],
				p = jQuery[t].special[e.type] || {};
			c[0] = e, e.delegateTarget = this;
			if (p[n] && p[n].call(this, e) === !1) return;
			l = jQuery[t].handlers.call(this, e, h), s = 0;
			while ((a = l[s++]) && !e.isPropagationStopped()) {
				e.currentTarget = a.elem, o = 0;
				while ((f = a.handlers[o++]) && !e.isImmediatePropagationStopped())
					if (!e[r] || e[r].test(f.namespace)) e.handleObj = f, e.data = f.data, u = ((jQuery[t].special[f.origType] || {}).handle || f.handler).apply(a.elem, c), u !== undefined && (e.result = u) === !1 && (e.preventDefault(), e.stopPropagation())
			}
			return p[i] && p[i].call(this, e), e.result
		},
		handlers: function(e, t) {
			var n = "click",
				r = "length",
				i, s, o, u, a = [],
				f = t.delegateCount,
				l = e.target;
			if (f && l.nodeType && (!e.button || e.type !== n))
				for (; l !== this; l = l.parentNode || this)
					if (l.disabled !== !0 || e.type !== n) {
						s = [];
						for (i = 0; i < f; i++) u = t[i], o = u.selector + " ", s[o] === undefined && (s[o] = u.needsContext ? jQuery(o, this).index(l) >= 0 : jQuery.find(o, this, null, [l])[r]), s[o] && s.push(u);
						s[r] && a.push({
							elem: l,
							handlers: s
						})
					}
			return f < t[r] && a.push({
				elem: this,
				handlers: t.slice(f)
			}), a
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, t) {
				var n = "scrollLeft",
					r = "clientLeft",
					i, s, o, u = t.button;
				return e.pageX == null && t.clientX != null && (i = e.target.ownerDocument || document, s = i.documentElement, o = i.body, e.pageX = t.clientX + (s && s[n] || o && o[n] || 0) - (s && s[r] || o && o[r] || 0), e.pageY = t.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.which && u !== undefined && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e
			}
		},
		fix: function(e) {
			var t = "props",
				n = "target";
			if (e[jQuery.expando]) return e;
			var r, i, s, o = e.type,
				u = e,
				a = this.fixHooks[o];
			a || (this.fixHooks[o] = a = rmouseEvent.test(o) ? this.mouseHooks : rkeyEvent.test(o) ? this.keyHooks : {}), s = a[t] ? this[t].concat(a[t]) : this[t], e = new jQuery.Event(u), r = s.length;
			while (r--) i = s[r], e[i] = u[i];
			return e[n] || (e[n] = document), e[n].nodeType === 3 && (e[n] = e[n].parentNode), a.filter ? a.filter(e, u) : e
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					if (this !== safeActiveElement() && this.focus) return this.focus(), !1
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if (this === safeActiveElement() && this.blur) return this.blur(), !1
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) return this.click(), !1
				},
				_default: function(e) {
					return jQuery.nodeName(e.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		simulate: function(e, t, n, r) {
			var i = jQuery.extend(new jQuery.Event, n, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			r ? jQuery.event.trigger(i, null, t) : jQuery.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
		}
	}, jQuery.removeEvent = function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	}, jQuery.Event = function(e, t) {
		var n = "defaultPrevented";
		if (!(this instanceof jQuery.Event)) return new jQuery.Event(e, t);
		e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e[n] || e[n] === undefined && e.returnValue === !1 ? returnTrue : returnFalse) : this.type = e, t && jQuery.extend(this, t), this.timeStamp = e && e.timeStamp || jQuery.now(), this[jQuery.expando] = !0
	}, jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		preventDefault: function() {
			var e = "preventDefault",
				t = this.originalEvent;
			this.isDefaultPrevented = returnTrue, t && t[e] && t[e]()
		},
		stopPropagation: function() {
			var e = "stopPropagation",
				t = this.originalEvent;
			this.isPropagationStopped = returnTrue, t && t[e] && t[e]()
		},
		stopImmediatePropagation: function() {
			var e = "stopImmediatePropagation",
				t = this.originalEvent;
			this.isImmediatePropagationStopped = returnTrue, t && t[e] && t[e](), this.stopPropagation()
		}
	}, jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(e, t) {
		jQuery.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				var n, r = this,
					i = e.relatedTarget,
					s = e.handleObj;
				if (!i || i !== r && !jQuery.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
				return n
			}
		}
	}), support.focusinBubbles || jQuery.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		var n = !0,
			r = "ownerDocument",
			i = "access",
			s = function(e) {
				jQuery.event.simulate(t, e.target, jQuery.event.fix(e), n)
			};
		jQuery.event.special[t] = {
			setup: function() {
				var o = this[r] || this,
					u = data_priv[i](o, t);
				u || o.addEventListener(e, s, n), data_priv[i](o, t, (u || 0) + 1)
			},
			teardown: function() {
				var o = this[r] || this,
					u = data_priv[i](o, t) - 1;
				u ? data_priv[i](o, t, u) : (o.removeEventListener(e, s, n), data_priv.remove(o, t))
			}
		}
	}), jQuery.fn.extend({
		on: function(e, t, n, r, i) {
			var s = "string",
				o = null,
				u, a;
			if (typeof e == "object") {
				typeof t !== s && (n = n || t, t = undefined);
				for (a in e) this.on(a, t, n, e[a], i);
				return this
			}
			n == o && r == o ? (r = t, n = t = undefined) : r == o && (typeof t === s ? (r = n, n = undefined) : (r = n, n = t, t = undefined));
			if (r === !1) r = returnFalse;
			else if (!r) return this;
			return i === 1 && (u = r, r = function(e) {
				return jQuery().off(e), u.apply(this, arguments)
			}, r.guid = u.guid || (u.guid = jQuery.guid++)), this.each(function() {
				jQuery.event.add(this, e, r, n, t)
			})
		},
		one: function(e, t, n, r) {
			return this.on(e, t, n, r, 1)
		},
		off: function(e, t, n) {
			var r, i;
			if (e && e.preventDefault && e.handleObj) return r = e.handleObj, jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
			if (typeof e == "object") {
				for (i in e) this.off(i, t, e[i]);
				return this
			}
			if (t === !1 || typeof t == "function") n = t, t = undefined;
			return n === !1 && (n = returnFalse), this.each(function() {
				jQuery.event.remove(this, e, n, t)
			})
		},
		trigger: function(e, t) {
			return this.each(function() {
				jQuery.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			var n = this[0];
			if (n) return jQuery.event.trigger(e, t, n, !0)
		}
	});
	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.extend({
		clone: function(e, t, n) {
			var r = "length",
				i = "script",
				s, o, u, a, f = e.cloneNode(!0),
				l = jQuery.contains(e.ownerDocument, e);
			if (!support.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !jQuery.isXMLDoc(e)) {
				a = getAll(f), u = getAll(e);
				for (s = 0, o = u[r]; s < o; s++) fixInput(u[s], a[s])
			}
			if (t)
				if (n) {
					u = u || getAll(e), a = a || getAll(f);
					for (s = 0, o = u[r]; s < o; s++) cloneCopyEvent(u[s], a[s])
				} else cloneCopyEvent(e, f);
			return a = getAll(f, i), a[r] > 0 && setGlobalEval(a, !l && getAll(e, i)), f
		},
		buildFragment: function(e, t, n, r) {
			var i = "appendChild",
				s = "textContent",
				o, u, a, f, l, c, h = t.createDocumentFragment(),
				p = [],
				d = 0,
				v = e.length;
			for (; d < v; d++) {
				o = e[d];
				if (o || o === 0)
					if (jQuery.type(o) === "object") jQuery.merge(p, o.nodeType ? [o] : o);
					else if (!rhtml.test(o)) p.push(t.createTextNode(o));
				else {
					u = u || h[i](t.createElement("div")), a = (rtagName.exec(o) || ["", ""])[1].toLowerCase(), f = wrapMap[a] || wrapMap._default, u.innerHTML = f[1] + o.replace(rxhtmlTag, "<$1></$2>") + f[2], c = f[0];
					while (c--) u = u.lastChild;
					jQuery.merge(p, u.childNodes), u = h.firstChild, u[s] = ""
				}
			}
			h[s] = "", d = 0;
			while (o = p[d++]) {
				if (r && jQuery.inArray(o, r) !== -1) continue;
				l = jQuery.contains(o.ownerDocument, o), u = getAll(h[i](o), "script"), l && setGlobalEval(u);
				if (n) {
					c = 0;
					while (o = u[c++]) rscriptType.test(o.type || "") && n.push(o)
				}
			}
			return h
		},
		cleanData: function(e) {
			var t = "cache",
				n, r, i, s, o = jQuery.event.special,
				u = 0;
			for (;
				(r = e[u]) !== undefined; u++) {
				if (jQuery.acceptData(r)) {
					s = r[data_priv.expando];
					if (s && (n = data_priv[t][s])) {
						if (n.events)
							for (i in n.events) o[i] ? jQuery.event.remove(r, i) : jQuery.removeEvent(r, i, n.handle);
						data_priv[t][s] && delete data_priv[t][s]
					}
				}
				delete data_user[t][r[data_user.expando]]
			}
		}
	}), jQuery.fn.extend({
		text: function(e) {
			var t = "nodeType";
			return access(this, function(e) {
				return e === undefined ? jQuery.text(this) : this.empty().each(function() {
					if (this[t] === 1 || this[t] === 11 || this[t] === 9) this.textContent = e
				})
			}, null, e, arguments.length)
		},
		append: function() {
			var e = "nodeType";
			return this.domManip(arguments, function(t) {
				if (this[e] === 1 || this[e] === 11 || this[e] === 9) {
					var n = manipulationTarget(this, t);
					n.appendChild(t)
				}
			})
		},
		prepend: function() {
			var e = "nodeType";
			return this.domManip(arguments, function(t) {
				if (this[e] === 1 || this[e] === 11 || this[e] === 9) {
					var n = manipulationTarget(this, t);
					n.insertBefore(t, n.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove: function(e, t) {
			var n = "parentNode",
				r, i = e ? jQuery.filter(e, this) : this,
				s = 0;
			for (;
				(r = i[s]) != null; s++) !t && r.nodeType === 1 && jQuery.cleanData(getAll(r)), r[n] && (t && jQuery.contains(r.ownerDocument, r) && setGlobalEval(getAll(r, "script")), r[n].removeChild(r));
			return this
		},
		empty: function() {
			var e, t = 0;
			for (;
				(e = this[t]) != null; t++) e.nodeType === 1 && (jQuery.cleanData(getAll(e, !1)), e.textContent = "");
			return this
		},
		clone: function(e, t) {
			return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
				return jQuery.clone(this, e, t)
			})
		},
		html: function(e) {
			return access(this, function(e) {
				var t = this[0] || {},
					n = 0,
					r = this.length;
				if (e === undefined && t.nodeType === 1) return t.innerHTML;
				if (typeof e == "string" && !rnoInnerhtml.test(e) && !wrapMap[(rtagName.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = e.replace(rxhtmlTag, "<$1></$2>");
					try {
						for (; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (jQuery.cleanData(getAll(t, !1)), t.innerHTML = e);
						t = 0
					} catch (i) {}
				}
				t && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function() {
			var e = arguments[0];
			return this.domManip(arguments, function(t) {
				e = this.parentNode, jQuery.cleanData(getAll(this)), e && e.replaceChild(t, this)
			}), e && (e.length || e.nodeType) ? this : this.remove()
		},
		detach: function(e) {
			return this.remove(e, !0)
		},
		domManip: function(e, t) {
			var n = "length",
				r = "ownerDocument",
				i = "script",
				s = "globalEval";
			e = concat.apply([], e);
			var o, u, a, f, l, c, h = 0,
				p = this[n],
				d = this,
				v = p - 1,
				m = e[0],
				g = jQuery.isFunction(m);
			if (g || p > 1 && typeof m == "string" && !support.checkClone && rchecked.test(m)) return this.each(function(n) {
				var r = d.eq(n);
				g && (e[0] = m.call(this, n, r.html())), r.domManip(e, t)
			});
			if (p) {
				o = jQuery.buildFragment(e, this[0][r], !1, this), u = o.firstChild, o.childNodes[n] === 1 && (o = u);
				if (u) {
					a = jQuery.map(getAll(o, i), disableScript), f = a[n];
					for (; h < p; h++) l = o, h !== v && (l = jQuery.clone(l, !0, !0), f && jQuery.merge(a, getAll(l, i))), t.call(this[h], l, h);
					if (f) {
						c = a[a[n] - 1][r], jQuery.map(a, restoreScript);
						for (h = 0; h < f; h++) l = a[h], rscriptType.test(l.type || "") && !data_priv.access(l, s) && jQuery.contains(c, l) && (l.src ? jQuery._evalUrl && jQuery._evalUrl(l.src) : jQuery[s](l.textContent.replace(rcleanScript, "")))
					}
				}
			}
			return this
		}
	}), jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		jQuery.fn[e] = function(e) {
			var n, r = [],
				i = jQuery(e),
				s = i.length - 1,
				o = 0;
			for (; o <= s; o++) n = o === s ? this : this.clone(!0), jQuery(i[o])[t](n), push.apply(r, n.get());
			return this.pushStack(r)
		}
	});
	var iframe, elemdisplay = {},
		rmargin = /^margin/,
		rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
		getStyles = function(e) {
			return e.ownerDocument.defaultView.getComputedStyle(e, null)
		};
	(function() {
		function m() {
			v[n][s] = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", v.innerHTML = "", p[o](d);
			var e = window[u](v, a);
			c = e.top !== "1%", h = e.width === "4px", p[f](d)
		}
		var e = "createElement",
			t = "div",
			n = "style",
			r = "backgroundClip",
			i = "content-box",
			s = "cssText",
			o = "appendChild",
			u = "getComputedStyle",
			a = null,
			f = "removeChild",
			l = "marginRight",
			c, h, p = document.documentElement,
			d = document[e](t),
			v = document[e](t);
		if (!v[n]) return;
		v[n][r] = i, v.cloneNode(!0)[n][r] = "", support.clearCloneStyle = v[n][r] === i, d[n][s] = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", d[o](v), window[u] && jQuery.extend(support, {
			pixelPosition: function() {
				return m(), c
			},
			boxSizingReliable: function() {
				return h == a && m(), h
			},
			reliableMarginRight: function() {
				var r, i = v[o](document[e](t));
				return i[n][s] = v[n][s] = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i[n][l] = i[n].width = "0", v[n].width = "1px", p[o](d), r = !parseFloat(window[u](i, a)[l]), p[f](d), r
			}
		})
	})(), jQuery.swap = function(e, t, n, r) {
		var i, s, o = {};
		for (s in t) o[s] = e.style[s], e.style[s] = t[s];
		i = n.apply(e, r || []);
		for (s in t) e.style[s] = o[s];
		return i
	};
	var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
		rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
		cssShow = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		cssPrefixes = ["Webkit", "O", "Moz", "ms"];
	jQuery.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = curCSS(e, "opacity");
						return n === "" ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": "cssFloat"
		},
		style: function(e, t, n, r) {
			if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
			var i, s, o, u = jQuery.camelCase(t),
				a = e.style;
			t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(a, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u];
			if (n === undefined) return o && "get" in o && (i = o.get(e, !1, r)) !== undefined ? i : a[t];
			s = typeof n, s === "string" && (i = rrelNum.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(jQuery.css(e, t)), s = "number");
			if (n == null || n !== n) return;
			s === "number" && !jQuery.cssNumber[u] && (n += "px"), !support.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
			if (!o || !("set" in o) || (n = o.set(e, n, r)) !== undefined) a[t] = n
		},
		css: function(e, t, n, r) {
			var i, s, o, u = jQuery.camelCase(t);
			return t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(e.style, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u], o && "get" in o && (i = o.get(e, !0, n)), i === undefined && (i = curCSS(e, t, r)), i === "normal" && t in cssNormalTransform && (i = cssNormalTransform[t]), n === "" || n ? (s = parseFloat(i), n === !0 || jQuery.isNumeric(s) ? s || 0 : i) : i
		}
	}), jQuery.each(["height", "width"], function(e, t) {
		jQuery.cssHooks[t] = {
			get: function(e, n, r) {
				if (n) return rdisplayswap.test(jQuery.css(e, "display")) && e.offsetWidth === 0 ? jQuery.swap(e, cssShow, function() {
					return getWidthOrHeight(e, t, r)
				}) : getWidthOrHeight(e, t, r)
			},
			set: function(e, n, r) {
				var i = r && getStyles(e);
				return setPositiveNumber(e, n, r ? augmentWidthOrHeight(e, t, r, jQuery.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
			}
		}
	}), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(e, t) {
		if (t) return jQuery.swap(e, {
			display: "inline-block"
		}, curCSS, [e, "marginRight"])
	}), jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		jQuery.cssHooks[e + t] = {
			expand: function(n) {
				var r = 0,
					i = {},
					s = typeof n == "string" ? n.split(" ") : [n];
				for (; r < 4; r++) i[e + cssExpand[r] + t] = s[r] || s[r - 2] || s[0];
				return i
			}
		}, rmargin.test(e) || (jQuery.cssHooks[e + t].set = setPositiveNumber)
	}), jQuery.fn.extend({
		css: function(e, t) {
			return access(this, function(e, t, n) {
				var r, i, s = {},
					o = 0;
				if (jQuery.isArray(t)) {
					r = getStyles(e), i = t.length;
					for (; o < i; o++) s[t[o]] = jQuery.css(e, t[o], !1, r);
					return s
				}
				return n !== undefined ? jQuery.style(e, t, n) : jQuery.css(e, t)
			}, e, t, arguments.length > 1)
		},
		show: function() {
			return showHide(this, !0)
		},
		hide: function() {
			return showHide(this)
		},
		toggle: function(e) {
			return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
				isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
			})
		}
	}), jQuery.Tween = Tween, Tween.prototype = {
		constructor: Tween,
		init: function(e, t, n, r, i, s) {
			this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (jQuery.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = Tween.propHooks[this.prop];
			return e && e.get ? e.get(this) : Tween.propHooks._default.get(this)
		},
		run: function(e) {
			var t = "duration",
				n = "options",
				r, i = Tween.propHooks[this.prop];
			return this[n][t] ? this.pos = r = jQuery.easing[this.easing](e, this[n][t] * e, 0, 1, this[n][t]) : this.pos = r = e, this.now = (this.end - this.start) * r + this.start, this[n].step && this[n].step.call(this.elem, this.now, this), i && i.set ? i.set(this) : Tween.propHooks._default.set(this), this
		}
	}, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
		_default: {
			get: function(e) {
				var t = "elem",
					n;
				return e[t][e.prop] == null || !!e[t].style && e[t].style[e.prop] != null ? (n = jQuery.css(e[t], e.prop, ""), !n || n === "auto" ? 0 : n) : e[t][e.prop]
			},
			set: function(e) {
				jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : e.elem.style && (e.elem.style[jQuery.cssProps[e.prop]] != null || jQuery.cssHooks[e.prop]) ? jQuery.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, jQuery.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
	var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
		rrun = /queueHooks$/,
		animationPrefilters = [defaultPrefilter],
		tweeners = {
			"*": [function(e, t) {
				var n = this.createTween(e, t),
					r = n.cur(),
					i = rfxnum.exec(t),
					s = i && i[3] || (jQuery.cssNumber[e] ? "" : "px"),
					o = (jQuery.cssNumber[e] || s !== "px" && +r) && rfxnum.exec(jQuery.css(n.elem, e)),
					u = 1,
					a = 20;
				if (o && o[3] !== s) {
					s = s || o[3], i = i || [], o = +r || 1;
					do u = u || ".5", o /= u, jQuery.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && u !== 1 && --a)
				}
				return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
			}]
		};
	jQuery.Animation = jQuery.extend(Animation, {
			tweener: function(e, t) {
				jQuery.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
				var n, r = 0,
					i = e.length;
				for (; r < i; r++) n = e[r], tweeners[n] = tweeners[n] || [], tweeners[n].unshift(t)
			},
			prefilter: function(e, t) {
				t ? animationPrefilters.unshift(e) : animationPrefilters.push(e)
			}
		}), jQuery.speed = function(e, t, n) {
			var r = "isFunction",
				i = "duration",
				s = "speeds",
				o = "queue",
				u = e && typeof e == "object" ? jQuery.extend({}, e) : {
					complete: n || !n && t || jQuery[r](e) && e,
					duration: e,
					easing: n && t || t && !jQuery[r](t) && t
				};
			u[i] = jQuery.fx.off ? 0 : typeof u[i] == "number" ? u[i] : u[i] in jQuery.fx[s] ? jQuery.fx[s][u[i]] : jQuery.fx[s]._default;
			if (u[o] == null || u[o] === !0) u[o] = "fx";
			return u.old = u.complete, u.complete = function() {
				jQuery[r](u.old) && u.old.call(this), u[o] && jQuery.dequeue(this, u[o])
			}, u
		}, jQuery.fn.extend({
			fadeTo: function(e, t, n, r) {
				return this.filter(isHidden).css("opacity", 0).show().end().animate({
					opacity: t
				}, e, n, r)
			},
			animate: function(e, t, n, r) {
				var i = jQuery.isEmptyObject(e),
					s = jQuery.speed(t, n, r),
					o = function() {
						var t = Animation(this, jQuery.extend({}, e), s);
						(i || data_priv.get(this, "finish")) && t.stop(!0)
					};
				return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
			},
			stop: function(e, t, n) {
				var r = "stop",
					i = function(e) {
						var t = e[r];
						delete e[r], t(n)
					};
				return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
					var t = !0,
						s = e != null && e + "queueHooks",
						o = jQuery.timers,
						u = data_priv.get(this);
					if (s) u[s] && u[s][r] && i(u[s]);
					else
						for (s in u) u[s] && u[s][r] && rrun.test(s) && i(u[s]);
					for (s = o.length; s--;) o[s].elem === this && (e == null || o[s].queue === e) && (o[s].anim[r](n), t = !1, o.splice(s, 1));
					(t || !n) && jQuery.dequeue(this, e)
				})
			},
			finish: function(e) {
				var t = "queue",
					n = "finish",
					r = !0;
				return e !== !1 && (e = e || "fx"), this.each(function() {
					var i, s = data_priv.get(this),
						o = s[e + t],
						u = s[e + "queueHooks"],
						a = jQuery.timers,
						f = o ? o.length : 0;
					s[n] = r, jQuery[t](this, e, []), u && u.stop && u.stop.call(this, r);
					for (i = a.length; i--;) a[i].elem === this && a[i][t] === e && (a[i].anim.stop(r), a.splice(i, 1));
					for (i = 0; i < f; i++) o[i] && o[i][n] && o[i][n].call(this);
					delete s[n]
				})
			}
		}), jQuery.each(["toggle", "show", "hide"], function(e, t) {
			var n = jQuery.fn[t];
			jQuery.fn[t] = function(e, r, i) {
				return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(genFx(t, !0), e, r, i)
			}
		}), jQuery.each({
			slideDown: genFx("show"),
			slideUp: genFx("hide"),
			slideToggle: genFx("toggle"),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		}, function(e, t) {
			jQuery.fn[e] = function(e, n, r) {
				return this.animate(t, e, n, r)
			}
		}), jQuery.timers = [], jQuery.fx.tick = function() {
			var e, t = 0,
				n = jQuery.timers;
			fxNow = jQuery.now();
			for (; t < n.length; t++) e = n[t], !e() && n[t] === e && n.splice(t--, 1);
			n.length || jQuery.fx.stop(), fxNow = undefined
		}, jQuery.fx.timer = function(e) {
			jQuery.timers.push(e), e() ? jQuery.fx.start() : jQuery.timers.pop()
		}, jQuery.fx.interval = 13, jQuery.fx.start = function() {
			timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
		}, jQuery.fx.stop = function() {
			clearInterval(timerId), timerId = null
		}, jQuery.fx.speeds = {
			slow: 600,
			fast: 200,
			_default: 400
		}, jQuery.fn.delay = function(e, t) {
			return e = jQuery.fx ? jQuery.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
				var r = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(r)
				}
			})
		},
		function() {
			var e = "createElement",
				t = "input",
				n = document[e](t),
				r = document[e]("select"),
				i = r.appendChild(document[e]("option"));
			n.type = "checkbox", support.checkOn = n.value !== "", support.optSelected = i.selected, r.disabled = !0, support.optDisabled = !i.disabled, n = document[e](t), n.value = "t", n.type = "radio", support.radioValue = n.value === "t"
		}();
	var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
	jQuery.fn.extend({
		attr: function(e, t) {
			return access(this, jQuery.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				jQuery.removeAttr(this, e)
			})
		}
	}), jQuery.extend({
		attr: function(e, t, n) {
			var r = null,
				i, s, o = e.nodeType;
			if (!e || o === 3 || o === 8 || o === 2) return;
			if (typeof e.getAttribute === strundefined) return jQuery.prop(e, t, n);
			if (o !== 1 || !jQuery.isXMLDoc(e)) t = t.toLowerCase(), i = jQuery.attrHooks[t] || (jQuery.expr.match.bool.test(t) ? boolHook : nodeHook);
			if (n === undefined) return i && "get" in i && (s = i.get(e, t)) !== r ? s : (s = jQuery.find.attr(e, t), s == r ? undefined : s);
			if (n !== r) return i && "set" in i && (s = i.set(e, n, t)) !== undefined ? s : (e.setAttribute(t, n + ""), n);
			jQuery.removeAttr(e, t)
		},
		removeAttr: function(e, t) {
			var n, r, i = 0,
				s = t && t.match(rnotwhite);
			if (s && e.nodeType === 1)
				while (n = s[i++]) r = jQuery.propFix[n] || n, jQuery.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!support.radioValue && t === "radio" && jQuery.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		}
	}), boolHook = {
		set: function(e, t, n) {
			return t === !1 ? jQuery.removeAttr(e, n) : e.setAttribute(n, n), n
		}
	}, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(e, t) {
		var n = attrHandle[t] || jQuery.find.attr;
		attrHandle[t] = function(e, t, r) {
			var i, s;
			return r || (s = attrHandle[t], attrHandle[t] = i, i = n(e, t, r) != null ? t.toLowerCase() : null, attrHandle[t] = s), i
		}
	});
	var rfocusable = /^(?:input|select|textarea|button)$/i;
	jQuery.fn.extend({
		prop: function(e, t) {
			return access(this, jQuery.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return this.each(function() {
				delete this[jQuery.propFix[e] || e]
			})
		}
	}), jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(e, t, n) {
			var r, i, s, o = e.nodeType;
			if (!e || o === 3 || o === 8 || o === 2) return;
			return s = o !== 1 || !jQuery.isXMLDoc(e), s && (t = jQuery.propFix[t] || t, i = jQuery.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					return e.hasAttribute("tabindex") || rfocusable.test(e.nodeName) || e.href ? e.tabIndex : -1
				}
			}
		}
	}), support.optSelected || (jQuery.propHooks.selected = {
		get: function(e) {
			var t = "parentNode",
				n = e[t];
			return n && n[t] && n[t].selectedIndex, null
		}
	}), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		jQuery.propFix[this.toLowerCase()] = this
	});
	var rclass = /[\t\r\n\f]/g;
	jQuery.fn.extend({
		addClass: function(e) {
			var t = "className",
				n = " ",
				r, i, s, o, u, a, f = typeof e == "string" && e,
				l = 0,
				c = this.length;
			if (jQuery.isFunction(e)) return this.each(function(n) {
				jQuery(this).addClass(e.call(this, n, this[t]))
			});
			if (f) {
				r = (e || "").match(rnotwhite) || [];
				for (; l < c; l++) {
					i = this[l], s = i.nodeType === 1 && (i[t] ? (n + i[t] + n).replace(rclass, n) : n);
					if (s) {
						u = 0;
						while (o = r[u++]) s.indexOf(n + o + n) < 0 && (s += o + n);
						a = jQuery.trim(s), i[t] !== a && (i[t] = a)
					}
				}
			}
			return this
		},
		removeClass: function(e) {
			var t = "className",
				n = " ",
				r, i, s, o, u, a, f = arguments.length === 0 || typeof e == "string" && e,
				l = 0,
				c = this.length;
			if (jQuery.isFunction(e)) return this.each(function(n) {
				jQuery(this).removeClass(e.call(this, n, this[t]))
			});
			if (f) {
				r = (e || "").match(rnotwhite) || [];
				for (; l < c; l++) {
					i = this[l], s = i.nodeType === 1 && (i[t] ? (n + i[t] + n).replace(rclass, n) : "");
					if (s) {
						u = 0;
						while (o = r[u++])
							while (s.indexOf(n + o + n) >= 0) s = s.replace(n + o + n, n);
						a = e ? jQuery.trim(s) : "", i[t] !== a && (i[t] = a)
					}
				}
			}
			return this
		},
		toggleClass: function(e, t) {
			var n = "boolean",
				r = "string",
				i = "removeClass",
				s = "className",
				o = "__className__",
				u = typeof e;
			return typeof t === n && u === r ? t ? this.addClass(e) : this[i](e) : jQuery.isFunction(e) ? this.each(function(n) {
				jQuery(this).toggleClass(e.call(this, n, this[s], t), t)
			}) : this.each(function() {
				if (u === r) {
					var t, a = 0,
						f = jQuery(this),
						l = e.match(rnotwhite) || [];
					while (t = l[a++]) f.hasClass(t) ? f[i](t) : f.addClass(t)
				} else if (u === strundefined || u === n) this[s] && data_priv.set(this, o, this[s]), this[s] = this[s] || e === !1 ? "" : data_priv.get(this, o) || ""
			})
		},
		hasClass: function(e) {
			var t = " ",
				n = t + e + t,
				r = 0,
				i = this.length;
			for (; r < i; r++)
				if (this[r].nodeType === 1 && (t + this[r].className + t).replace(rclass, t).indexOf(n) >= 0) return !0;
			return !1
		}
	});
	var rreturn = /\r/g;
	jQuery.fn.extend({
		val: function(e) {
			var t = "valHooks",
				n = "toLowerCase",
				r = "value",
				i = null,
				s, o, u, a = this[0];
			if (!arguments.length) {
				if (a) return s = jQuery[t][a.type] || jQuery[t][a.nodeName[n]()], s && "get" in s && (o = s.get(a, r)) !== undefined ? o : (o = a[r], typeof o == "string" ? o.replace(rreturn, "") : o == i ? "" : o);
				return
			}
			return u = jQuery.isFunction(e), this.each(function(o) {
				var a;
				if (this.nodeType !== 1) return;
				u ? a = e.call(this, o, jQuery(this).val()) : a = e, a == i ? a = "" : typeof a == "number" ? a += "" : jQuery.isArray(a) && (a = jQuery.map(a, function(e) {
					return e == i ? "" : e + ""
				})), s = jQuery[t][this.type] || jQuery[t][this.nodeName[n]()];
				if (!s || !("set" in s) || s.set(this, a, r) === undefined) this[r] = a
			})
		}
	}), jQuery.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = jQuery.find.attr(e, "value");
					return t != null ? t : jQuery.trim(jQuery.text(e))
				}
			},
			select: {
				get: function(e) {
					var t = "disabled",
						n = "parentNode",
						r, i, s = e.options,
						o = e.selectedIndex,
						u = e.type === "select-one" || o < 0,
						a = u ? null : [],
						f = u ? o + 1 : s.length,
						l = o < 0 ? f : u ? o : 0;
					for (; l < f; l++) {
						i = s[l];
						if ((i.selected || l === o) && (support.optDisabled ? !i[t] : i.getAttribute(t) === null) && (!i[n][t] || !jQuery.nodeName(i[n], "optgroup"))) {
							r = jQuery(i).val();
							if (u) return r;
							a.push(r)
						}
					}
					return a
				},
				set: function(e, t) {
					var n, r, i = e.options,
						s = jQuery.makeArray(t),
						o = i.length;
					while (o--) {
						r = i[o];
						if (r.selected = jQuery.inArray(r.value, s) >= 0) n = !0
					}
					return n || (e.selectedIndex = -1), s
				}
			}
		}
	}), jQuery.each(["radio", "checkbox"], function() {
		jQuery.valHooks[this] = {
			set: function(e, t) {
				if (jQuery.isArray(t)) return e.checked = jQuery.inArray(jQuery(e).val(), t) >= 0
			}
		}, support.checkOn || (jQuery.valHooks[this].get = function(e) {
			return e.getAttribute("value") === null ? "on" : e.value
		})
	}), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		jQuery.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}), jQuery.fn.extend({
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		},
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, n, r) {
			return this.on(t, e, n, r)
		},
		undelegate: function(e, t, n) {
			return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
		}
	});
	var nonce = jQuery.now(),
		rquery = /\?/;
	jQuery.parseJSON = function(e) {
		return JSON.parse(e + "")
	}, jQuery.parseXML = function(e) {
		var t, n;
		if (!e || typeof e != "string") return null;
		try {
			n = new DOMParser, t = n.parseFromString(e, "text/xml")
		} catch (r) {
			t = undefined
		}
		return (!t || t.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + e), t
	};
	var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
		prefilters = {},
		transports = {},
		allTypes = "*/".concat("*");
	try {
		ajaxLocation = location.href
	} catch (e) {
		ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
	}
	ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test(ajaxLocParts[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": jQuery.parseJSON,
				"text xml": jQuery.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e)
		},
		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),
		ajax: function(e, t) {
			function V(e, t, r, i) {
				var s, u, f, l, c, d = t;
				if (U === 2) return;
				U = 2, O && clearTimeout(O), C = undefined, L = i || "", W[x] = e > 0 ? 4 : 0, s = e >= 200 && e < 300 || e === 304, r && (l = ajaxHandleResponses(P, W, r)), l = ajaxConvert(P, l, W, s);
				if (s) P[m] && (c = W[N]("Last-Modified"), c && (jQuery[g][k] = c), c = W[N](b), c && (jQuery[b][k] = c)), e === 204 || P[a] === "HEAD" ? d = "nocontent" : e === 304 ? d = "notmodified" : (d = l.state, u = l[h], f = l[o], s = !f);
				else {
					f = d;
					if (e || !d) d = o, e < 0 && (e = 0)
				}
				W.status = e, W.statusText = (t || d) + "", s ? j.resolveWith(H, [u, d, W]) : j.rejectWith(H, [W, d, f]), W[n](I), I = undefined, _ && B[p](s ? "ajaxSuccess" : "ajaxError", [W, P, s ? u : f]), F.fireWith(H, [W, d]), _ && (B[p]("ajaxComplete", [W, P]), --jQuery.active || jQuery.event[p]("ajaxStop"))
			}
			var n = "statusCode",
				r = "toLowerCase",
				i = null,
				s = "abort",
				o = "error",
				u = "replace",
				a = "type",
				f = "dataTypes",
				l = "crossDomain",
				c = "http:",
				h = "data",
				p = "trigger",
				d = "hasContent",
				v = !1,
				m = "ifModified",
				g = "lastModified",
				y = "setRequestHeader",
				b = "etag",
				w = "contentType",
				E = "accepts",
				S = "beforeSend",
				x = "readyState",
				T = "timeout",
				N = "getResponseHeader";
			typeof e == "object" && (t = e, e = undefined), t = t || {};
			var C, k, L, A, O, M, _, D, P = jQuery.ajaxSetup({}, t),
				H = P.context || P,
				B = P.context && (H.nodeType || H.jquery) ? jQuery(H) : jQuery.event,
				j = jQuery.Deferred(),
				F = jQuery.Callbacks("once memory"),
				I = P[n] || {},
				q = {},
				R = {},
				U = 0,
				z = "canceled",
				W = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (U === 2) {
							if (!A) {
								A = {};
								while (t = rheaders.exec(L)) A[t[1][r]()] = t[2]
							}
							t = A[e[r]()]
						}
						return t == i ? i : t
					},
					getAllResponseHeaders: function() {
						return U === 2 ? L : i
					},
					setRequestHeader: function(e, t) {
						var n = e[r]();
						return U || (e = R[n] = R[n] || e, q[e] = t), this
					},
					overrideMimeType: function(e) {
						return U || (P.mimeType = e), this
					},
					statusCode: function(e) {
						var t;
						if (e)
							if (U < 2)
								for (t in e) I[t] = [I[t], e[t]];
							else W.always(e[W.status]);
						return this
					},
					abort: function(e) {
						var t = e || z;
						return C && C[s](t), V(0, t), this
					}
				};
			j.promise(W).complete = F.add, W.success = W.done, W[o] = W.fail, P.url = ((e || P.url || ajaxLocation) + "")[u](rhash, "")[u](rprotocol, ajaxLocParts[1] + "//"), P[a] = t.method || t[a] || P.method || P[a], P[f] = jQuery.trim(P.dataType || "*")[r]().match(rnotwhite) || [""], P[l] == i && (M = rurl.exec(P.url[r]()), P[l] = !(!M || M[1] === ajaxLocParts[1] && M[2] === ajaxLocParts[2] && (M[3] || (M[1] === c ? "80" : "443")) === (ajaxLocParts[3] || (ajaxLocParts[1] === c ? "80" : "443")))), P[h] && P.processData && typeof P[h] != "string" && (P[h] = jQuery.param(P[h], P.traditional)), inspectPrefiltersOrTransports(prefilters, P, t, W);
			if (U === 2) return W;
			_ = P.global, _ && jQuery.active++ === 0 && jQuery.event[p]("ajaxStart"), P[a] = P[a].toUpperCase(), P[d] = !rnoContent.test(P[a]), k = P.url, P[d] || (P[h] && (k = P.url += (rquery.test(k) ? "&" : "?") + P[h], delete P[h]), P.cache === v && (P.url = rts.test(k) ? k[u](rts, "$1_=" + nonce++) : k + (rquery.test(k) ? "&" : "?") + "_=" + nonce++)), P[m] && (jQuery[g][k] && W[y]("If-Modified-Since", jQuery[g][k]), jQuery[b][k] && W[y]("If-None-Match", jQuery[b][k])), (P[h] && P[d] && P[w] !== v || t[w]) && W[y]("Content-Type", P[w]), W[y]("Accept", P[f][0] && P[E][P[f][0]] ? P[E][P[f][0]] + (P[f][0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : P[E]["*"]);
			for (D in P.headers) W[y](D, P.headers[D]);
			if (!P[S] || P[S].call(H, W, P) !== v && U !== 2) {
				z = s;
				for (D in {
						success: 1,
						error: 1,
						complete: 1
					}) W[D](P[D]);
				C = inspectPrefiltersOrTransports(transports, P, t, W);
				if (!C) V(-1, "No Transport");
				else {
					W[x] = 1, _ && B[p]("ajaxSend", [W, P]), P.async && P[T] > 0 && (O = setTimeout(function() {
						W[s](T)
					}, P[T]));
					try {
						U = 1, C.send(q, V)
					} catch (X) {
						if (!(U < 2)) throw X;
						V(-1, X)
					}
				}
				return W
			}
			return W[s]()
		},
		getJSON: function(e, t, n) {
			return jQuery.get(e, t, n, "json")
		},
		getScript: function(e, t) {
			return jQuery.get(e, undefined, t, "script")
		}
	}), jQuery.each(["get", "post"], function(e, t) {
		jQuery[t] = function(e, n, r, i) {
			return jQuery.isFunction(n) && (i = i || r, r = n, n = undefined), jQuery.ajax({
				url: e,
				type: t,
				dataType: i,
				data: n,
				success: r
			})
		}
	}), jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		jQuery.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), jQuery._evalUrl = function(e) {
		return jQuery.ajax({
			url: e,
			type: "GET",
			dataType: "script",
			async: !1,
			global: !1,
			"throws": !0
		})
	}, jQuery.fn.extend({
		wrapAll: function(e) {
			var t = "firstElementChild",
				n;
			return jQuery.isFunction(e) ? this.each(function(t) {
				jQuery(this).wrapAll(e.call(this, t))
			}) : (this[0] && (n = jQuery(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && n.insertBefore(this[0]), n.map(function() {
				var e = this;
				while (e[t]) e = e[t];
				return e
			}).append(this)), this)
		},
		wrapInner: function(e) {
			return jQuery.isFunction(e) ? this.each(function(t) {
				jQuery(this).wrapInner(e.call(this, t))
			}) : this.each(function() {
				var t = jQuery(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = jQuery.isFunction(e);
			return this.each(function(n) {
				jQuery(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
			}).end()
		}
	}), jQuery.expr.filters.hidden = function(e) {
		return e.offsetWidth <= 0 && e.offsetHeight <= 0
	}, jQuery.expr.filters.visible = function(e) {
		return !jQuery.expr.filters.hidden(e)
	};
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	jQuery.param = function(e, t) {
		var n = "ajaxSettings",
			r, i = [],
			s = function(e, t) {
				t = jQuery.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		t === undefined && (t = jQuery[n] && jQuery[n].traditional);
		if (jQuery.isArray(e) || e.jquery && !jQuery.isPlainObject(e)) jQuery.each(e, function() {
			s(this.name, this.value)
		});
		else
			for (r in e) buildParams(r, e[r], t, s);
		return i.join("&").replace(r20, "+")
	}, jQuery.fn.extend({
		serialize: function() {
			return jQuery.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = jQuery.prop(this, "elements");
				return e ? jQuery.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(e) && (this.checked || !rcheckableType.test(e))
			}).map(function(e, t) {
				var n = jQuery(this).val();
				return n == null ? null : jQuery.isArray(n) ? jQuery.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(rCRLF, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(rCRLF, "\r\n")
				}
			}).get()
		}
	}), jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest
		} catch (e) {}
	};
	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			0: 200,
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	window.ActiveXObject && jQuery(window).on("unload", function() {
		for (var e in xhrCallbacks) xhrCallbacks[e]()
	}), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, jQuery.ajaxTransport(function(e) {
		var t = "crossDomain",
			n = "xhrFields",
			r = "overrideMimeType",
			i = "X-Requested-With",
			s = "abort",
			o = "error",
			u = "status",
			a = "statusText",
			f = "responseText",
			l;
		if (support.cors || xhrSupported && !e[t]) return {
			send: function(c, h) {
				var p, d = e.xhr(),
					v = ++xhrId;
				d.open(e.type, e.url, e.async, e.username, e.password);
				if (e[n])
					for (p in e[n]) d[p] = e[n][p];
				e.mimeType && d[r] && d[r](e.mimeType), !e[t] && !c[i] && (c[i] = "XMLHttpRequest");
				for (p in c) d.setRequestHeader(p, c[p]);
				l = function(e) {
					return function() {
						l && (delete xhrCallbacks[v], l = d.onload = d.onerror = null, e === s ? d[s]() : e === o ? h(d[u], d[a]) : h(xhrSuccessStatus[d[u]] || d[u], d[a], typeof d[f] == "string" ? {
							text: d[f]
						} : undefined, d.getAllResponseHeaders()))
					}
				}, d.onload = l(), d.onerror = l(o), l = xhrCallbacks[v] = l(s);
				try {
					d.send(e.hasContent && e.data || null)
				} catch (m) {
					if (l) throw m
				}
			},
			abort: function() {
				l && l()
			}
		}
	}), jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(e) {
				return jQuery.globalEval(e), e
			}
		}
	}), jQuery.ajaxPrefilter("script", function(e) {
		e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
	}), jQuery.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var t, n;
			return {
				send: function(r, i) {
					t = jQuery("<script>").prop({
						async: !0,
						charset: e.scriptCharset,
						src: e.url
					}).on("load error", n = function(e) {
						t.remove(), n = null, e && i(e.type === "error" ? 404 : 200, e.type)
					}), document.head.appendChild(t[0])
				},
				abort: function() {
					n && n()
				}
			}
		}
	});
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			return this[e] = !0, e
		}
	}), jQuery.ajaxPrefilter("json jsonp", function(e, t, n) {
		var r = "jsonp",
			i = "jsonpCallback",
			s = "isFunction",
			o, u, a, f = e[r] !== !1 && (rjsonp.test(e.url) ? "url" : typeof e.data == "string" && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(e.data) && "data");
		if (f || e.dataTypes[0] === r) return o = e[i] = jQuery[s](e[i]) ? e[i]() : e[i], f ? e[f] = e[f].replace(rjsonp, "$1" + o) : e[r] !== !1 && (e.url += (rquery.test(e.url) ? "&" : "?") + e[r] + "=" + o), e.converters["script json"] = function() {
			return a || jQuery.error(o + " was not called"), a[0]
		}, e.dataTypes[0] = "json", u = window[o], window[o] = function() {
			a = arguments
		}, n.always(function() {
			window[o] = u, e[o] && (e[i] = t[i], oldCallbacks.push(o)), a && jQuery[s](u) && u(a[0]), a = u = undefined
		}), "script"
	}), jQuery.parseHTML = function(e, t, n) {
		if (!e || typeof e != "string") return null;
		typeof t == "boolean" && (n = t, t = !1), t = t || document;
		var r = rsingleTag.exec(e),
			i = !n && [];
		return r ? [t.createElement(r[1])] : (r = jQuery.buildFragment([e], t, i), i && i.length && jQuery(i).remove(), jQuery.merge([], r.childNodes))
	};
	var _load = jQuery.fn.load;
	jQuery.fn.load = function(e, t, n) {
		if (typeof e != "string" && _load) return _load.apply(this, arguments);
		var r, i, s, o = this,
			u = e.indexOf(" ");
		return u >= 0 && (r = jQuery.trim(e.slice(u)), e = e.slice(0, u)), jQuery.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (i = "POST"), o.length > 0 && jQuery.ajax({
			url: e,
			type: i,
			dataType: "html",
			data: t
		}).done(function(e) {
			s = arguments, o.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
		}).complete(n && function(e, t) {
			o.each(n, s || [e.responseText, t, e])
		}), this
	}, jQuery.expr.filters.animated = function(e) {
		return jQuery.grep(jQuery.timers, function(t) {
			return e === t.elem
		}).length
	};
	var docElem = window.document.documentElement;
	jQuery.offset = {
		setOffset: function(e, t, n) {
			var r = "position",
				i = "top",
				s = "left",
				o, u, a, f, l, c, h, p = jQuery.css(e, r),
				d = jQuery(e),
				v = {};
			p === "static" && (e.style[r] = "relative"), l = d.offset(), a = jQuery.css(e, i), c = jQuery.css(e, s), h = (p === "absolute" || p === "fixed") && (a + c).indexOf("auto") > -1, h ? (o = d[r](), f = o[i], u = o[s]) : (f = parseFloat(a) || 0, u = parseFloat(c) || 0), jQuery.isFunction(t) && (t = t.call(e, n, l)), t[i] != null && (v[i] = t[i] - l[i] + f), t[s] != null && (v[s] = t[s] - l[s] + u), "using" in t ? t.using.call(e, v) : d.css(v)
		}
	}, jQuery.fn.extend({
		offset: function(e) {
			var t = "getBoundingClientRect";
			if (arguments.length) return e === undefined ? this : this.each(function(t) {
				jQuery.offset.setOffset(this, e, t)
			});
			var n, r, i = this[0],
				s = {
					top: 0,
					left: 0
				},
				o = i && i.ownerDocument;
			if (!o) return;
			return n = o.documentElement, jQuery.contains(n, i) ? (typeof i[t] !== strundefined && (s = i[t]()), r = getWindow(o), {
				top: s.top + r.pageYOffset - n.clientTop,
				left: s.left + r.pageXOffset - n.clientLeft
			}) : s
		},
		position: function() {
			var e = !0;
			if (!this[0]) return;
			var t, n, r = this[0],
				i = {
					top: 0,
					left: 0
				};
			return jQuery.css(r, "position") === "fixed" ? n = r.getBoundingClientRect() : (t = this.offsetParent(), n = this.offset(), jQuery.nodeName(t[0], "html") || (i = t.offset()), i.top += jQuery.css(t[0], "borderTopWidth", e), i.left += jQuery.css(t[0], "borderLeftWidth", e)), {
				top: n.top - i.top - jQuery.css(r, "marginTop", e),
				left: n.left - i.left - jQuery.css(r, "marginLeft", e)
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var e = this.offsetParent || docElem;
				while (e && !jQuery.nodeName(e, "html") && jQuery.css(e, "position") === "static") e = e.offsetParent;
				return e || docElem
			})
		}
	}), jQuery.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, t) {
		var n = "pageYOffset",
			r = n === t;
		jQuery.fn[e] = function(i) {
			return access(this, function(e, i, s) {
				var o = getWindow(e);
				if (s === undefined) return o ? o[t] : e[i];
				o ? o.scrollTo(r ? window.pageXOffset : s, r ? s : window[n]) : e[i] = s
			}, e, i, arguments.length, null)
		}
	}), jQuery.each(["top", "left"], function(e, t) {
		jQuery.cssHooks[t] = addGetHookIf(support.pixelPosition, function(e, n) {
			if (n) return n = curCSS(e, t), rnumnonpx.test(n) ? jQuery(e).position()[t] + "px" : n
		})
	}), jQuery.each({
		Height: "height",
		Width: "width"
	}, function(e, t) {
		var n = "documentElement",
			r = "client",
			i = "scroll",
			s = "offset";
		jQuery.each({
			padding: "inner" + e,
			content: t,
			"": "outer" + e
		}, function(o, u) {
			jQuery.fn[u] = function(u, a) {
				var f = arguments.length && (o || typeof u != "boolean"),
					l = o || (u === !0 || a === !0 ? "margin" : "border");
				return access(this, function(t, o, u) {
					var a;
					return jQuery.isWindow(t) ? t.document[n][r + e] : t.nodeType === 9 ? (a = t[n], Math.max(t.body[i + e], a[i + e], t.body[s + e], a[s + e], a[r + e])) : u === undefined ? jQuery.css(t, o, l) : jQuery.style(t, o, u, l)
				}, t, f ? u : undefined, f, null)
			}
		})
	}), jQuery.fn.size = function() {
		return this.length
	}, jQuery.fn.andSelf = jQuery.fn.addBack, typeof define == "function" && define.amd && define("jquery", [], function() {
		return jQuery
	});
	var _jQuery = window.jQuery,
		_$ = window.$;
	return jQuery.noConflict = function(e) {
		return window.$ === jQuery && (window.$ = _$), e && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
	}, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery
});