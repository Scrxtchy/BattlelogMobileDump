var fabric = fabric || {
	version: "1.4.0"
};
(function() {
	var e = "undefined";
	typeof exports !== e && (exports.fabric = fabric), typeof document !== e && typeof window !== e && (fabric.document = document, fabric.window = window), fabric.isTouchSupported = "ontouchstart" in fabric.document.documentElement, fabric.isLikelyNode = typeof Buffer !== e && typeof window === e, fabric.SHARED_ATTRIBUTES = ["transform", "fill", "fill-opacity", "fill-rule", "opacity", "stroke", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width"]
})();
if (typeof Event == "undefined") var Event = {};
if (typeof eventjs == "undefined") var eventjs = Event;
(function(e) {
	"use strict";
	var t = "modifyEventListener",
		n = !1,
		r = "modifySelectors",
		i = "add",
		s = "remove",
		o = "stopPropagation",
		u = !0,
		a = "preventDefault",
		f = "preventManipulation",
		l = "getEventSupport",
		c = "string",
		h = "setAttribute",
		p = "removeAttribute",
		d = "function",
		v = "undefined",
		m = "object",
		g = "target",
		y = "listener",
		b = "clearInterval",
		w = "length",
		E = "indexOf",
		S = "Gesture",
		x = "_gestureHandlers",
		T = "touchstart",
		N = "mousedown",
		C = "supports",
		k = "addEventListener",
		L = "uniqueID",
		A = "removeEventListener",
		O = "prototype";
	e[t] = n, e[r] = n, e[i] = function(e, t, n, r) {
		return _(e, t, n, r, i)
	}, e[s] = function(e, t, n, r) {
		return _(e, t, n, r, s)
	}, e.stop = function(e) {
		if (!e) return;
		e[o] && e[o](), e.cancelBubble = u, e.bubble = 0
	}, e.prevent = function(e) {
		if (!e) return;
		e[a] && e[a](), e[f] && e[f](), e.returnValue = n
	}, e.cancel = function(t) {
		e.stop(t), e.prevent(t)
	}, e[l] = function(e, t) {
		typeof e === c && (t = e, e = window), t = "on" + t;
		if (t in e) return u;
		e[h] || (e = document.createElement("div"));
		if (e[h] && e[p]) {
			e[h](t, "");
			var n = typeof e[t] === d;
			return typeof e[t] !== v && (e[t] = null), e[p](t), n
		}
	};
	var M = function(e) {
			if (!e || typeof e !== m) return e;
			var t = new e.constructor;
			for (var n in e) !e[n] || typeof e[n] !== m ? t[n] = e[n] : t[n] = M(e[n]);
			return t
		},
		_ = function(r, o, u, a, f, l) {
			a = a || {};
			if (String(r) === "[object Object]") {
				var h = r;
				r = h[g], o = h.type, u = h[y], delete h[g], delete h.type, delete h[y];
				for (var p in h) a[p] = h[p]
			}
			if (!r || !o || !u) return;
			if (typeof r === c && o === "ready") {
				var v = (new Date).getTime(),
					T = a.timeout,
					N = a.interval || 1e3 / 60,
					C = window.setInterval(function() {
						(new Date).getTime() - v > T && window[b](C), document.querySelector(r) && (window[b](C), setTimeout(u, 1))
					}, N);
				return
			}
			if (typeof r === c) {
				r = document.querySelectorAll(r);
				if (r[w] === 0) return P("Missing target on listener!", arguments);
				r[w] === 1 && (r = r[0])
			}
			var k, L = {};
			if (r[w] > 0 && r !== window) {
				for (var A = 0, O = r[w]; A < O; A++) k = _(r[A], o, u, M(a), f), k && (L[A] = k);
				return D(L)
			}
			o[E] && o[E](" ") !== -1 && (o = o.split(" ")), o[E] && o[E](",") !== -1 && (o = o.split(","));
			if (typeof o !== c) {
				if (typeof o[w] == "number")
					for (var H = 0, B = o[w]; H < B; H++) k = _(r, o[H], u, M(a), f), k && (L[o[H]] = k);
				else
					for (var p in o) typeof o[p] === d ? k = _(r, p, o[p], M(a), f) : k = _(r, p, o[p][y], M(o[p]), f), k && (L[p] = k);
				return D(L)
			}
			if (typeof r !== m) return P("Target is not defined!", arguments);
			if (typeof u !== d) return P("Listener is not a function!", arguments);
			var j = a.useCapture || n,
				q = R(r) + "." + R(u) + "." + (j ? 1 : 0);
			if (e[S] && e[S][x][o]) {
				q = o + q;
				if (f === s) {
					if (!I[q]) return;
					I[q][s](), delete I[q]
				} else if (f === i) {
					if (I[q]) return I[q][i](), I[q];
					if (a.useCall && !e[t]) {
						var W = u;
						u = function(e, t) {
							for (var n in t) e[n] = t[n];
							return W.call(r, e)
						}
					}
					a.gesture = o, a[g] = r, a[y] = u, a.fromOverwrite = l, I[q] = e.proxy[o](a)
				}
				return I[q]
			}
			var X = F(o);
			for (var V = 0, $; V < X[w]; V++) {
				o = X[V], $ = o + "." + q;
				if (f === s) {
					if (!I[$]) continue;
					r[z](o, u, j), delete I[$]
				} else if (f === i) {
					if (I[$]) return I[$];
					r[U](o, u, j), I[$] = {
						id: $,
						type: o,
						target: r,
						listener: u,
						remove: function() {
							for (var t = 0; t < X[w]; t++) e[s](r, X[t], u, a)
						}
					}
				}
			}
			return I[$]
		},
		D = function(e) {
			return {
				remove: function() {
					for (var t in e) e[t][s]()
				},
				add: function() {
					for (var t in e) e[t][i]()
				}
			}
		},
		P = function(e, t) {
			if (typeof console === v) return;
			if (typeof console.error === v) return;
			console.error(e, t)
		},
		H = {
			msPointer: ["MSPointerDown", "MSPointerMove", "MSPointerUp"],
			touch: [T, "touchmove", "touchend"],
			mouse: [N, "mousemove", "mouseup"]
		},
		B = {
			MSPointerDown: 0,
			MSPointerMove: 1,
			MSPointerUp: 2,
			touchstart: 0,
			touchmove: 1,
			touchend: 2,
			mousedown: 0,
			mousemove: 1,
			mouseup: 2
		},
		j = function() {
			e[C] = {}, window.navigator.msPointerEnabled && (e[C].msPointer = u), e[l](T) && (e[C].touch = u), e[l](N) && (e[C].mouse = u)
		}(),
		F = function() {
			return function(t) {
				var n = document[k] ? "" : "on",
					r = B[t];
				if (isFinite(r)) {
					var i = [];
					for (var s in e[C]) i.push(n + H[s][r]);
					return i
				}
				return [n + t]
			}
		}(),
		I = {},
		q = 0,
		R = function(e) {
			return e === window ? "#window" : e === document ? "#document" : (e[L] || (e[L] = "e" + q++), e[L])
		},
		U = document[k] ? k : "attachEvent",
		z = document[A] ? A : "detachEvent";
	return e.createPointerEvent = function(t, r, i) {
		var s = r.gesture,
			o = r[g],
			a = t.changedTouches || e.proxy.getCoords(t);
		if (a[w]) {
			var f = a[0];
			r.pointers = i ? [] : a, r.pageX = f.pageX, r.pageY = f.pageY, r.x = r.pageX, r.y = r.pageY
		}
		var l = document.createEvent("Event");
		l.initEvent(s, u, u), l.originalEvent = t;
		for (var c in r) {
			if (c === g) continue;
			l[c] = r[c]
		}
		var h = l.type;
		e[S] && e[S][x][h] && r.oldListener.call(o, l, r, n)
	}, e[t] && window.HTMLElement && function() {
		var t = function(t) {
			var n = function(n) {
				var r = n + "EventListener",
					i = t[r];
				t[r] = function(t, r, s) {
					if (e[S] && e[S][x][t]) {
						var o = s;
						typeof s === m ? o.useCall = u : o = {
							useCall: u,
							useCapture: s
						}, _(this, t, r, o, n, u)
					} else {
						var a = F(t);
						for (var f = 0; f < a[w]; f++) i.call(this, a[f], r, s)
					}
				}
			};
			n(i), n(s)
		};
		navigator.userAgent.match(/Firefox/) ? (t(HTMLDivElement[O]), t(HTMLCanvasElement[O])) : t(HTMLElement[O]), t(document), t(window)
	}(), e[r] && function() {
		var e = NodeList[O];
		e[A] = function(e, t, n) {
			for (var r = 0, i = this[w]; r < i; r++) this[r][A](e, t, n)
		}, e[k] = function(e, t, n) {
			for (var r = 0, i = this[w]; r < i; r++) this[r][k](e, t, n)
		}
	}(), e
})(Event);
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
	"use strict";
	var t = "onPointerMove",
		n = "fingers",
		r = "documentElement",
		i = "scrollTop",
		s = "onPointerUp",
		o = "scrollLeft",
		u = "defaultListener",
		a = "listener",
		f = "pageX",
		l = "tracker",
		c = "pageY",
		h = "onPointerDown",
		p = !0,
		d = "identifier",
		v = !1,
		m = "mouse",
		g = "indexOf",
		y = "offsetY",
		b = "offsetX",
		w = "move",
		E = "getCoords",
		S = "oldListener",
		x = "position",
		T = "pointerType",
		N = "getCoord",
		C = "target",
		k = "undefined",
		L = "remove",
		A = "enabled",
		O = "modifyEventListener",
		M = "maxFingers",
		_ = "parentNode",
		D = "up",
		P = "mspointer",
		H = "relative",
		B = "height",
		j = "getBoundingBox",
		F = "gestureFingers",
		I = "changedTouches",
		q = "absolute",
		R = "touch",
		U = "pointer",
		z = "clientX",
		W = "clientY",
		X = "gesture",
		V = "width",
		$ = "event",
		J = "down",
		K = "shiftKey",
		Q = "minFingers";
	e.pointerSetup = function(e, r) {
		e.doc = e[C].ownerDocument || e[C], e[Q] = e[Q] || e[n] || 1, e[M] = e[M] || e[n] || Infinity, e[x] = e[x] || H, delete e[n], r = r || {}, r[A] = p, r[X] = e[X], r[C] = e[C], r.env = e.env, Event[O] && e.fromOverwrite && (e[S] = e[a], e[a] = Event.createPointerEvent);
		var i = 0,
			o = r[X][g](U) === 0 && Event[O] ? U : m;
		return e[S] && (r[S] = e[S]), r[a] = e[a], r.proxy = function(t) {
			r[u] = e[a], e[a] = t, t(e[$], r)
		}, r.add = function() {
			if (r[A] === p) return;
			e[h] && Event.add(e[C], o + J, e[h]), e[t] && Event.add(e.doc, o + w, e[t]), e[s] && Event.add(e.doc, o + D, e[s]), r[A] = p
		}, r[L] = function() {
			if (r[A] === v) return;
			e[h] && Event[L](e[C], o + J, e[h]), e[t] && Event[L](e.doc, o + w, e[t]), e[s] && Event[L](e.doc, o + D, e[s]), r.reset(), r[A] = v
		}, r.pause = function(r) {
			e[t] && (!r || r[w]) && Event[L](e.doc, o + w, e[t]), e[s] && (!r || r[D]) && Event[L](e.doc, o + D, e[s]), i = e[n], e[n] = 0
		}, r.resume = function(r) {
			e[t] && (!r || r[w]) && Event.add(e.doc, o + w, e[t]), e[s] && (!r || r[D]) && Event.add(e.doc, o + D, e[s]), e[n] = i
		}, r.reset = function() {
			e[l] = {}, e[n] = 0
		}, r
	};
	var G = Event.supports;
	return Event[T] = G[m] ? m : G[R] ? R : P, e.pointerStart = function(t, r, s) {
			var h = (t.type || "mousedown").toUpperCase();
			h[g]("MOUSE") === 0 ? Event[T] = m : h[g]("TOUCH") === 0 ? Event[T] = R : h[g]("MSPOINTER") === 0 && (Event[T] = P);
			var S = function(e, t) {
				var r = s.bbox,
					u = k[t] = {};
				switch (s[x]) {
					case q:
						u[b] = 0, u[y] = 0;
						break;
					case "differenceFromLast":
						u[b] = e[f], u[y] = e[c];
						break;
					case "difference":
						u[b] = e[f], u[y] = e[c];
						break;
					case w:
						u[b] = e[f] - r.x1, u[y] = e[c] - r.y1;
						break;
					default:
						u[b] = r.x1, u[y] = r.y1
				}
				if (s[x] === H) var a = e[f] + r[o] - u[b],
					l = e[c] + r[i] - u[y];
				else var a = e[f] - u[b],
					l = e[c] - u[y];
				u.rotation = 0, u.scale = 1, u.startTime = u.moveTime = (new Date).getTime(), u[w] = {
					x: a,
					y: l
				}, u.start = {
					x: a,
					y: l
				}, s[n]++
			};
			s[$] = t, r[u] && (s[a] = r[u], delete r[u]);
			var N = !s[n],
				k = s[l],
				L = t[I] || e[E](t),
				A = L.length;
			for (var O = 0; O < A; O++) {
				var _ = L[O],
					B = _[d] || Infinity;
				if (s[n]) {
					if (s[n] >= s[M]) {
						var F = [];
						for (var B in s[l]) F.push(B);
						return r[d] = F.join(","), N
					}
					var U = 0;
					for (var z in k) {
						if (k[z][D]) {
							delete k[z], S(_, B), s.cancel = p;
							break
						}
						U++
					}
					if (k[B]) continue;
					S(_, B)
				} else k = s[l] = {}, r.bbox = s.bbox = e[j](s[C]), s[n] = 0, s.cancel = v, S(_, B)
			}
			var F = [];
			for (var B in s[l]) F.push(B);
			return r[d] = F.join(","), N
		}, e.pointerEnd = function(e, t, r, i) {
			var s = e.touches || [],
				o = s.length,
				u = {};
			for (var a = 0; a < o; a++) {
				var h = s[a],
					m = h[d];
				u[m || Infinity] = p
			}
			for (var m in r[l]) {
				var g = r[l][m];
				if (u[m] || g[D]) continue;
				i && i({
					pageX: g[f],
					pageY: g[c],
					changedTouches: [{
						pageX: g[f],
						pageY: g[c],
						identifier: m === "Infinity" ? Infinity : m
					}]
				}, D), g[D] = p, r[n]--
			}
			if (r[n] !== 0) return v;
			var y = [];
			r[F] = 0;
			for (var m in r[l]) r[F]++, y.push(m);
			return t[d] = y.join(","), p
		}, e[E] = function(t) {
			return typeof t[f] !== k ? e[E] = function(e) {
				return Array({
					type: m,
					x: e[f],
					y: e[c],
					pageX: e[f],
					pageY: e[c],
					identifier: e.pointerId || Infinity
				})
			} : e[E] = function(e) {
				return e = e || window[$], Array({
					type: m,
					x: e[z] + document[r][o],
					y: e[W] + document[r][i],
					pageX: e[z] + document[r][o],
					pageY: e[W] + document[r][i],
					identifier: Infinity
				})
			}, e[E](t)
		}, e[N] = function(t) {
			if ("ontouchstart" in window) {
				var n = 0,
					s = 0;
				e[N] = function(e) {
					var t = e[I];
					return t && t.length ? {
						x: n = t[0][f],
						y: s = t[0][c]
					} : {
						x: n,
						y: s
					}
				}
			} else typeof t[f] !== k && typeof t[c] !== k ? e[N] = function(e) {
				return {
					x: e[f],
					y: e[c]
				}
			} : e[N] = function(e) {
				return e = e || window[$], {
					x: e[z] + document[r][o],
					y: e[W] + document[r][i]
				}
			};
			return e[N](t)
		}, e[j] = function(e) {
			if (e === window || e === document) e = document.body;
			var t = {},
				n = e.getBoundingClientRect();
			t[V] = n[V], t[B] = n[B], t.x1 = n.left, t.y1 = n.top, t.x2 = t.x1 + t[V], t.y2 = t.y1 + t[B], t.scaleX = n[V] / e.offsetWidth || 1, t.scaleY = n[B] / e.offsetHeight || 1, t[o] = 0, t[i] = 0;
			var r = e[_];
			while (r !== null) {
				if (r === document.body) break;
				if (r[i] === undefined) break;
				var s = window.getComputedStyle(r),
					u = s.getPropertyValue(x);
				if (u === q) break;
				if (u === "fixed") {
					t[i] -= r[_][i];
					break
				}
				t[o] += r[o], t[i] += r[i], r = r[_]
			}
			return t
		},
		function() {
			var t = navigator.userAgent.toLowerCase(),
				n = t[g]("macintosh") !== -1;
			if (n && t[g]("khtml") !== -1) var r = {
				91: p,
				93: p
			};
			else if (n && t[g]("firefox") !== -1) var r = {
				224: p
			};
			else var r = {
				17: p
			};
			e.metaTrackerReset = function() {
				e.metaKey = v, e.ctrlKey = v, e[K] = v, e.altKey = v
			}, e.metaTracker = function(t) {
				var n = !!r[t.keyCode];
				return n && (e.metaKey = t.type === "keydown"), e.ctrlKey = t.ctrlKey, e[K] = t[K], e.altKey = t.altKey, n
			}
		}(), e
}(Event.proxy);
if (typeof Event == "undefined") var Event = {};
Event.MutationObserver = function() {
	var e = !1,
		t = "addEventListener",
		n = "DOMAttrModified",
		r = "attachEvent",
		i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
		s = function() {
			var i = document.createElement("p"),
				s = e,
				o = function() {
					s = !0
				};
			if (i[t]) i[t](n, o, e);
			else {
				if (!i[r]) return e;
				i[r]("onDOMAttrModified", o)
			}
			return i.setAttribute("id", "target"), s
		}();
	return function(t, r) {
		if (i) {
			var o = {
					subtree: e,
					attributes: !0
				},
				u = new i(function(e) {
					e.forEach(function(e) {
						r.call(e.target, e.attributeName)
					})
				});
			u.observe(t, o)
		} else s ? Event.add(t, n, function(e) {
			r.call(t, e.attrName)
		}) : "onpropertychange" in document.body && Event.add(t, "propertychange", function(e) {
			r.call(t, window.event.propertyName)
		})
	}
}();
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
	"use strict";
	var t = "click",
		n = "maxFingers",
		r = "onPointerDown",
		i = "mousemove",
		s = "onPointerMove",
		o = "mouseup",
		u = "onPointerUp",
		a = "scrollTop",
		f = "Gesture",
		l = "_gestureHandlers";
	return e[t] = function(f) {
		f.gesture = f.gesture || t, f[n] = f[n] || f.fingers || 1;
		var l;
		f[r] = function(t) {
			e.pointerStart(t, c, f) && (Event.add(f.doc, i, f[s]).listener(t), Event.add(f.doc, o, f[u]))
		}, f[s] = function(e) {
			l = e
		}, f[u] = function(t) {
			if (e.pointerEnd(t, c, f)) {
				Event.remove(f.doc, i, f[s]), Event.remove(f.doc, o, f[u]);
				if (l.cancelBubble && ++l.bubble > 1) return;
				var n = l.changedTouches || e.getCoords(l),
					r = n[0],
					h = f.bbox,
					p = e.getBoundingBox(f.target);
				if (f.position === "relative") var d = r.pageX + h.scrollLeft - h.x1,
					v = r.pageY + h[a] - h.y1;
				else var d = r.pageX - h.x1,
					v = r.pageY - h.y1;
				if (d > 0 && d < h.width && v > 0 && v < h.height && h[a] === p[a]) {
					for (var m in f.tracker) break;
					var g = f.tracker[m];
					c.x = g.start.x, c.y = g.start.y, f.listener(l, c)
				}
			}
		};
		var c = e.pointerSetup(f);
		return c.state = t, Event.add(f.target, "mousedown", f[r]), c
	}, Event[f] = Event[f] || {}, Event[f][l] = Event[f][l] || {}, Event[f][l][t] = e[t], e
}(Event.proxy);
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
	"use strict";
	var t = "dbltap",
		n = "dblclick",
		r = "gesture",
		i = "maxFingers",
		s = "onPointerDown",
		o = "changedTouches",
		u = "mousemove",
		a = "onPointerMove",
		f = "mouseup",
		l = "onPointerUp",
		c = "pageX",
		h = "pageY",
		p = "remove",
		d = "Gesture",
		v = "_gestureHandlers";
	return e[t] = e[n] = function(d) {
		d[r] = d[r] || t, d[i] = d[i] || d.fingers || 1;
		var v = 700,
			m, g, y, b, w;
		d[s] = function(t) {
			var n = t[o] || e.getCoords(t);
			m && !g ? (w = n[0], g = (new Date).getTime() - m) : (b = n[0], m = (new Date).getTime(), g = 0, clearTimeout(y), y = setTimeout(function() {
				m = 0
			}, v)), e.pointerStart(t, E, d) && (Event.add(d.doc, u, d[a]).listener(t), Event.add(d.doc, f, d[l]))
		}, d[a] = function(t) {
			if (m && !g) {
				var n = t[o] || e.getCoords(t);
				w = n[0]
			}
			var r = d.bbox;
			if (d.position === "relative") var i = w[c] + r.scrollLeft - r.x1,
				s = w[h] + r.scrollTop - r.y1;
			else var i = w[c] - r.x1,
				s = w[h] - r.y1;
			i > 0 && i < r.width && s > 0 && s < r.height && Math.abs(w[c] - b[c]) <= 25 && Math.abs(w[h] - b[h]) <= 25 || (Event[p](d.doc, u, d[a]), clearTimeout(y), m = g = 0)
		}, d[l] = function(t) {
			e.pointerEnd(t, E, d) && (Event[p](d.doc, u, d[a]), Event[p](d.doc, f, d[l]));
			if (m && g) {
				if (g <= v && !(t.cancelBubble && ++t.bubble > 1)) {
					E.state = d[r];
					for (var n in d.tracker) break;
					var i = d.tracker[n];
					E.x = i.start.x, E.y = i.start.y, d.listener(t, E)
				}
				clearTimeout(y), m = g = 0
			}
		};
		var E = e.pointerSetup(d);
		return E.state = n, Event.add(d.target, "mousedown", d[s]), E
	}, Event[d] = Event[d] || {}, Event[d][v] = Event[d][v] || {}, Event[d][v][t] = e[t], Event[d][v][n] = e[n], e
}(Event.proxy);
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
	"use strict";
	var t = "drag",
		n = "move",
		r = "onPointerDown",
		i = "monitor",
		s = "mousemove",
		o = "onPointerMove",
		u = "mouseup",
		a = "onPointerUp",
		f = "identifier",
		l = "pageX",
		c = "pageY",
		h = "offsetX",
		p = "offsetY",
		d = "Gesture",
		v = "_gestureHandlers";
	return e.dragElement = function(r, i) {
		e[t]({
			event: i,
			target: r,
			position: n,
			listener: function(e, t) {
				r.style.left = t.x + "px", r.style.top = t.y + "px", Event.prevent(e)
			}
		})
	}, e[t] = function(d) {
		d.gesture = t, d[r] = function(t) {
			e.pointerStart(t, v, d) && (d[i] || (Event.add(d.doc, s, d[o]), Event.add(d.doc, u, d[a]))), d[o](t, "down")
		}, d[o] = function(t, i) {
			if (!d.tracker) return d[r](t);
			var s = d.bbox,
				o = t.changedTouches || e.getCoords(t),
				u = o.length;
			for (var a = 0; a < u; a++) {
				var m = o[a],
					g = m[f] || Infinity,
					y = d.tracker[g];
				if (!y) continue;
				y[l] = m[l], y[c] = m[c], v.state = i || n, v[f] = g, v.start = y.start, v.fingers = d.fingers, d.position === "differenceFromLast" ? (v.x = y[l] - y[h], v.y = y[c] - y[p], y[h] = y[l], y[p] = y[c]) : d.position === "relative" ? (v.x = y[l] + s.scrollLeft - y[h], v.y = y[c] + s.scrollTop - y[p]) : (v.x = y[l] - y[h], v.y = y[c] - y[p]), d.listener(t, v)
			}
		}, d[a] = function(t) {
			e.pointerEnd(t, v, d, d[o]) && (d[i] || (Event.remove(d.doc, s, d[o]), Event.remove(d.doc, u, d[a])))
		};
		var v = e.pointerSetup(d);
		return d.event ? d[r](d.event) : (Event.add(d.target, "mousedown", d[r]), d[i] && (Event.add(d.doc, s, d[o]), Event.add(d.doc, u, d[a]))), v
	}, Event[d] = Event[d] || {}, Event[d][v] = Event[d][v] || {}, Event[d][v][t] = e[t], e
}(Event.proxy);
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
	"use strict";
	var t = "gesture",
		n = "minFingers",
		r = "fingers",
		i = "onPointerDown",
		s = "mousemove",
		o = "onPointerMove",
		u = "mouseup",
		a = "onPointerUp",
		f = "rotation",
		l = "identifier",
		c = "listener",
		h = "move",
		p = "distance",
		d = "Gesture",
		v = "_gestureHandlers",
		m = Math.PI / 180;
	return e[t] = function(d) {
		d[t] = d[t] || t, d[n] = d[n] || d[r] || 2, d[i] = function(t) {
			var i = d[r];
			e.pointerStart(t, v, d) && (Event.add(d.doc, s, d[o]), Event.add(d.doc, u, d[a]));
			if (d[r] === d[n] && i !== d[r]) {
				v[r] = d[n], v.scale = 1, v[f] = 0, v.state = "start";
				var h = "";
				for (var p in d.tracker) h += p;
				v[l] = parseInt(h), d[c](t, v)
			}
		}, d[o] = function(t, i) {
			var s = d.bbox,
				o = d.tracker,
				u = t.changedTouches || e.getCoords(t),
				a = u.length;
			for (var g = 0; g < a; g++) {
				var y = u[g],
					b = y[l] || Infinity,
					w = o[b];
				if (!w) continue;
				d.position === "relative" ? (w[h].x = y.pageX + s.scrollLeft - s.x1, w[h].y = y.pageY + s.scrollTop - s.y1) : (w[h].x = y.pageX - s.x1, w[h].y = y.pageY - s.y1)
			}
			if (d[r] < d[n]) return;
			var u = [],
				E = 0,
				S = 0,
				x = 0,
				T = 0,
				a = 0;
			for (var b in o) {
				var y = o[b];
				if (y.up) continue;
				x += y[h].x, T += y[h].y, a++
			}
			x /= a, T /= a;
			for (var b in o) {
				var y = o[b];
				if (y.up) continue;
				var N = y.start;
				if (!N[p]) {
					var C = N.x - x,
						k = N.y - T;
					N[p] = Math.sqrt(C * C + k * k), N.angle = Math.atan2(C, k) / m
				}
				var C = y[h].x - x,
					k = y[h].y - T,
					L = Math.sqrt(C * C + k * k);
				E += L / N[p];
				var A = Math.atan2(C, k) / m,
					O = (N.angle - A + 360) % 360 - 180;
				y.DEG2 = y.DEG1, y.DEG1 = O > 0 ? O : -O, typeof y.DEG2 != "undefined" && (O > 0 ? y[f] += y.DEG1 - y.DEG2 : y[f] -= y.DEG1 - y.DEG2, S += y[f]), u.push(y[h])
			}
			v.touches = u, v[r] = d[r], v.scale = E / d[r], v[f] = S / d[r], v.state = "change", d[c](t, v)
		}, d[a] = function(t) {
			var i = d[r];
			e.pointerEnd(t, v, d) && (Event.remove(d.doc, s, d[o]), Event.remove(d.doc, u, d[a])), i === d[n] && d[r] < d[n] && (v[r] = d[r], v.state = "end", d[c](t, v))
		};
		var v = e.pointerSetup(d);
		return Event.add(d.target, "mousedown", d[i]), v
	}, Event[d] = Event[d] || {}, Event[d][v] = Event[d][v] || {}, Event[d][v][t] = e[t], e
}(Event.proxy);
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
	"use strict";
	var t = "pointerdown",
		n = "pointermove",
		r = "pointerup",
		i = "gesture",
		s = "isPointerEmitter",
		o = "target",
		u = !0,
		a = "onPointerDown",
		f = "listener",
		l = "onPointerMove",
		c = "onPointerUp",
		h = "Gesture",
		p = "_gestureHandlers";
	return e[t] = e[n] = e[r] = function(h) {
		h[i] = h[i] || "pointer";
		if (h[o][s]) return;
		var p = u;
		h[a] = function(e) {
			p = !1, d[i] = t, h[f](e, d)
		}, h[l] = function(e) {
			d[i] = n, h[f](e, d, p)
		}, h[c] = function(e) {
			p = u, d[i] = r, h[f](e, d, u)
		};
		var d = e.pointerSetup(h);
		return Event.add(h[o], "mousedown", h[a]), Event.add(h[o], "mousemove", h[l]), Event.add(h.doc, "mouseup", h[c]), h[o][s] = u, d
	}, Event[h] = Event[h] || {}, Event[h][p] = Event[h][p] || {}, Event[h][p][t] = e[t], Event[h][p][n] = e[n], Event[h][p][r] = e[r], e
}(Event.proxy);
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
	"use strict";
	var t = "devicemotion",
		n = "listener",
		r = "accelerationIncludingGravity",
		i = "acceleration",
		s = "value",
		o = "count",
		u = "addEventListener",
		a = "Gesture",
		f = "_gestureHandlers";
	return e.shake = function(e) {
		var a = {
				gesture: t,
				acceleration: {},
				accelerationIncludingGravity: {},
				target: e.target,
				listener: e[n],
				remove: function() {
					window.removeEventListener(t, m, !1)
				}
			},
			f = 4,
			l = 1e3,
			c = 200,
			h = 3,
			p = (new Date).getTime(),
			d = {
				x: 0,
				y: 0,
				z: 0
			},
			v = {
				x: {
					count: 0,
					value: 0
				},
				y: {
					count: 0,
					value: 0
				},
				z: {
					count: 0,
					value: 0
				}
			},
			m = function(u) {
				var m = .8,
					g = u[r];
				d.x = m * d.x + (1 - m) * g.x, d.y = m * d.y + (1 - m) * g.y, d.z = m * d.z + (1 - m) * g.z, a[r] = d, a[i].x = g.x - d.x, a[i].y = g.y - d.y, a[i].z = g.z - d.z;
				if (e.gesture === t) {
					e[n](u, a);
					return
				}
				var y = "xyz",
					b = (new Date).getTime();
				for (var w = 0, E = y.length; w < E; w++) {
					var S = y[w],
						x = a[i][S],
						T = v[S],
						N = Math.abs(x);
					if (b - p < l) continue;
					if (N > f) {
						var C = b * x / N,
							k = Math.abs(C + T[s]);
						T[s] && k < c ? (T[s] = C, T[o]++, T[o] === h && (e[n](u, a), p = b, T[s] = 0, T[o] = 0)) : (T[s] = C, T[o] = 1)
					}
				}
			};
		if (!window[u]) return;
		return window[u](t, m, !1), a
	}, Event[a] = Event[a] || {}, Event[a][f] = Event[a][f] || {}, Event[a][f].shake = e.shake, e
}(Event.proxy);
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
	"use strict";
	var t = "swipe",
		n = "threshold",
		r = "onPointerDown",
		i = "mousemove",
		s = "onPointerMove",
		o = "mouseup",
		u = "onPointerUp",
		a = "tracker",
		f = "move",
		l = "start",
		c = "Gesture",
		h = "_gestureHandlers",
		p = Math.PI / 180;
	return e[t] = function(c) {
		c.snap = c.snap || 90, c[n] = c[n] || 1, c.gesture = c.gesture || t, c[r] = function(t) {
			e.pointerStart(t, h, c) && (Event.add(c.doc, i, c[s]).listener(t), Event.add(c.doc, o, c[u]))
		}, c[s] = function(t) {
			var n = t.changedTouches || e.getCoords(t),
				r = n.length;
			for (var i = 0; i < r; i++) {
				var s = n[i],
					o = s.identifier || Infinity,
					u = c[a][o];
				if (!u) continue;
				u[f].x = s.pageX, u[f].y = s.pageY, u.moveTime = (new Date).getTime()
			}
		}, c[u] = function(r) {
			if (e.pointerEnd(r, h, c)) {
				Event.remove(c.doc, i, c[s]), Event.remove(c.doc, o, c[u]);
				var d, v, m, g, y = {
						x: 0,
						y: 0
					},
					b = 0,
					w = 0,
					E = 0;
				for (var S in c[a]) {
					var x = c[a][S],
						T = x[f].x - x[l].x,
						N = x[f].y - x[l].y;
					b += x[f].x, w += x[f].y, y.x += x[l].x, y.y += x[l].y, E++;
					var C = Math.sqrt(T * T + N * N),
						k = x.moveTime - x.startTime,
						g = Math.atan2(T, N) / p + 180,
						v = k ? C / k : 0;
					if (typeof m == "undefined") m = g, d = v;
					else {
						if (!(Math.abs(g - m) <= 20)) return;
						m = (m + g) / 2, d = (d + v) / 2
					}
				}
				var L = c.gestureFingers;
				c.minFingers <= L && c.maxFingers >= L && d > c[n] && (y.x /= E, y.y /= E, h[l] = y, h.x = b / E, h.y = w / E, h.angle = -(((m / c.snap + .5 >> 0) * c.snap || 360) - 360), h.velocity = d, h.fingers = L, h.state = t, c.listener(r, h))
			}
		};
		var h = e.pointerSetup(c);
		return Event.add(c.target, "mousedown", c[r]), h
	}, Event[c] = Event[c] || {}, Event[c][h] = Event[c][h] || {}, Event[c][h][t] = e[t], e
}(Event.proxy);
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
	"use strict";
	var t = "longpress",
		n = "gesture",
		r = "tap",
		i = "timeout",
		s = "driftDeviance",
		o = "onPointerDown",
		u = "listener",
		a = "mousemove",
		f = "onPointerMove",
		l = "mouseup",
		c = "onPointerUp",
		h = "cancelBubble",
		p = "tracker",
		d = "cancel",
		v = "minFingers",
		m = "maxFingers",
		g = "state",
		y = "start",
		b = "remove",
		w = "gestureFingers",
		E = "Gesture",
		S = "_gestureHandlers";
	return e[t] = function(i) {
		return i[n] = t, e[r](i)
	}, e[r] = function(E) {
		E.delay = E.delay || 500, E[i] = E[i] || 250, E[s] = E[s] || 10, E[n] = E[n] || r;
		var S, x;
		E[o] = function(r) {
			if (e.pointerStart(r, T, E)) {
				S = (new Date).getTime(), Event.add(E.doc, a, E[f])[u](r), Event.add(E.doc, l, E[c]);
				if (E[n] !== t) return;
				x = setTimeout(function() {
					if (r[h] && ++r.bubble > 1) return;
					var e = 0;
					for (var t in E[p]) {
						var n = E[p][t];
						if (n.end === !0) return;
						if (E[d]) return;
						e++
					}
					E[v] <= e && E[m] >= e && (T[g] = y, T.fingers = e, T.x = n[y].x, T.y = n[y].y, E[u](r, T))
				}, E.delay)
			}
		}, E[f] = function(t) {
			var n = E.bbox,
				r = t.changedTouches || e.getCoords(t),
				i = r.length;
			for (var o = 0; o < i; o++) {
				var u = r[o],
					l = u.identifier || Infinity,
					c = E[p][l];
				if (!c) continue;
				if (E.position === "relative") var h = u.pageX + n.scrollLeft - n.x1,
					v = u.pageY + n.scrollTop - n.y1;
				else var h = u.pageX - n.x1,
					v = u.pageY - n.y1;
				var m = h - c[y].x,
					g = v - c[y].y,
					w = Math.sqrt(m * m + g * g);
				if (!(h > 0 && h < n.width && v > 0 && v < n.height && w <= E[s])) {
					Event[b](E.doc, a, E[f]), E[d] = !0;
					return
				}
			}
		}, E[c] = function(s) {
			if (e.pointerEnd(s, T, E)) {
				clearTimeout(x), Event[b](E.doc, a, E[f]), Event[b](E.doc, l, E[c]);
				if (s[h] && ++s.bubble > 1) return;
				if (E[n] === t) {
					T[g] === y && (T[g] = "end", E[u](s, T));
					return
				}
				if (E[d]) return;
				if ((new Date).getTime() - S > E[i]) return;
				var o = E[w];
				E[v] <= o && E[m] >= o && (T[g] = r, T.fingers = E[w], E[u](s, T))
			}
		};
		var T = e.pointerSetup(E);
		return Event.add(E.target, "mousedown", E[o]), T
	}, Event[E] = Event[E] || {}, Event[E][S] = Event[E][S] || {}, Event[E][S][r] = e[r], Event[E][S][t] = e[t], e
}(Event.proxy);
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
	"use strict";
	var t = "wheel",
		n = "start",
		r = "target",
		i = "listener",
		s = "wheelDelta",
		o = !1,
		u = "addEventListener",
		a = "removeEventListener",
		f = "mousewheel",
		l = "Gesture",
		c = "_gestureHandlers";
	return e[t] = function(e) {
		var l, c = e.timeout || 150,
			h = 0,
			p = {
				gesture: t,
				state: n,
				wheelDelta: 0,
				target: e[r],
				listener: e[i],
				preventElasticBounce: function() {
					var e = this[r],
						t = e.scrollTop,
						n = t + e.offsetHeight,
						i = e.scrollHeight;
					n === i && this[s] <= 0 ? Event.cancel(event) : t === 0 && this[s] >= 0 && Event.cancel(event), Event.stop(event)
				},
				add: function() {
					e[r][v](g, d, o)
				},
				remove: function() {
					e[r][m](g, d, o)
				}
			},
			d = function(t) {
				t = t || window.event, p.state = h++ ? "change" : n, p[s] = t.detail ? t.detail * -20 : t[s], e[i](t, p), clearTimeout(l), l = setTimeout(function() {
					h = 0, p.state = "end", p[s] = 0, e[i](t, p)
				}, c)
			},
			v = document[u] ? u : "attachEvent",
			m = document[a] ? a : "detachEvent",
			g = Event.getEventSupport(f) ? f : "DOMMouseScroll";
		return e[r][v](g, d, o), p
	}, Event[l] = Event[l] || {}, Event[l][c] = Event[l][c] || {}, Event[l][c][t] = e[t], e
}(Event.proxy);
if (typeof Event == "undefined") var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
		"use strict";
		var t = "orientation",
			n = "orientationchange",
			r = "previous",
			i = "current",
			s = "Gesture",
			o = "_gestureHandlers";
		return e[t] = function(e) {
			var s = {
					gesture: n,
					previous: null,
					current: window[t],
					target: e.target,
					listener: e.listener,
					remove: function() {
						window.removeEventListener(n, o, !1)
					}
				},
				o = function(n) {
					s[r] = s[i], s[i] = window[t];
					if (s[r] !== null && s[r] != s[i]) {
						e.listener(n, s);
						return
					}
				};
			return window.DeviceOrientationEvent && window.addEventListener(n, o, !1), s
		}, Event[s] = Event[s] || {}, Event[s][o] = Event[s][o] || {}, Event[s][o][t] = e[t], e
	}(Event.proxy),
	function() {
		function n(n, r) {
			if (!this[e][n]) return;
			r ? fabric.util.removeFromArray(this[e][n], r) : this[e][n][t] = 0
		}

		function r(n, r) {
			this[e] || (this[e] = {});
			if (arguments[t] === 1)
				for (var i in n) this.on(i, n[i]);
			else this[e][n] || (this[e][n] = []), this[e][n].push(r);
			return this
		}

		function i(r, i) {
			if (!this[e]) return;
			if (arguments[t] === 0) this[e] = {};
			else if (arguments[t] === 1 && typeof arguments[0] == "object")
				for (var s in r) n.call(this, s, r[s]);
			else n.call(this, r, i);
			return this
		}

		function s(n, r) {
			if (!this[e]) return;
			var i = this[e][n];
			if (!i) return;
			for (var s = 0, o = i[t]; s < o; s++) i[s].call(this, r || {});
			return this
		}
		var e = "__eventListeners",
			t = "length";
		fabric.Observable = {
			observe: r,
			stopObserving: i,
			fire: s,
			on: r,
			off: i,
			trigger: s
		}
	}(), fabric.Collection = {
		add: function() {
			this._objects.push.apply(this._objects, arguments);
			for (var e = arguments.length; e--;) this._onObjectAdded(arguments[e]);
			return this.renderOnAddRemove && this.renderAll(), this
		},
		insertAt: function(e, t, n) {
			var r = this.getObjects();
			return n ? r[t] = e : r.splice(t, 0, e), this._onObjectAdded(e), this.renderOnAddRemove && this.renderAll(), this
		},
		remove: function(e) {
			var t = this.getObjects(),
				n = t.indexOf(e);
			return n !== -1 && (t.splice(n, 1), this._onObjectRemoved(e)), this.renderOnAddRemove && this.renderAll(), e
		},
		forEachObject: function(e, t) {
			var n = this.getObjects(),
				r = n.length;
			while (r--) e.call(t, n[r], r, n);
			return this
		},
		getObjects: function(e) {
			return typeof e == "undefined" ? this._objects : this._objects.filter(function(t) {
				return t.type === e
			})
		},
		item: function(e) {
			return this.getObjects()[e]
		},
		isEmpty: function() {
			return this.getObjects().length === 0
		},
		size: function() {
			return this.getObjects().length
		},
		contains: function(e) {
			return this.getObjects().indexOf(e) > -1
		},
		complexity: function() {
			return this.getObjects().reduce(function(e, t) {
				return e += t.complexity ? t.complexity() : 0, e
			}, 0)
		}
	},
	function(e) {
		var t = "util",
			n = "toUpperCase",
			r = "length",
			i = "onload",
			s = "onerror",
			o = null,
			u = !0,
			a = "undefined",
			f = "fromObject",
			l = "createElement",
			c = "stateProperties",
			h = Math.sqrt,
			p = Math.atan2,
			d = Math.PI / 180;
		fabric[t] = {
			removeFromArray: function(e, t) {
				var n = e.indexOf(t);
				return n !== -1 && e.splice(n, 1), e
			},
			getRandomInt: function(e, t) {
				return Math.floor(Math.random() * (t - e + 1)) + e
			},
			degreesToRadians: function(e) {
				return e * d
			},
			radiansToDegrees: function(e) {
				return e / d
			},
			rotatePoint: function(e, t, n) {
				var r = Math.sin(n),
					i = Math.cos(n);
				e.subtractEquals(t);
				var s = e.x * i - e.y * r,
					o = e.x * r + e.y * i;
				return (new fabric.Point(s, o)).addEquals(t)
			},
			toFixed: function(e, t) {
				return parseFloat(Number(e).toFixed(t))
			},
			falseFunction: function() {
				return !1
			},
			getKlass: function(e, r) {
				return e = fabric[t].string.camelize(e.charAt(0)[n]() + e.slice(1)), fabric[t].resolveNamespace(r)[e]
			},
			resolveNamespace: function(t) {
				if (!t) return fabric;
				var n = t.split("."),
					i = n[r],
					s = e || fabric.window;
				for (var o = 0; o < i; ++o) s = s[n[o]];
				return s
			},
			loadImage: function(e, n, r, f) {
				if (!e) {
					n && n.call(r, e);
					return
				}
				var l = fabric[t].createImage();
				l[i] = function() {
					n && n.call(r, l), l = l[i] = l[s] = o
				}, l[s] = function() {
					fabric.log("Error loading " + l.src), n && n.call(r, o, u), l = l[i] = l[s] = o
				}, e.indexOf("data") !== 0 && typeof f !== a && (l.crossOrigin = f), l.src = e
			},
			enlivenObjects: function(e, n, i, s) {
				function o() {
					++a === l && n && n(u)
				}
				e = e || [];
				var u = [],
					a = 0,
					l = e[r];
				if (!l) {
					n && n(u);
					return
				}
				e.forEach(function(e, n) {
					if (!e || !e.type) {
						o();
						return
					}
					var r = fabric[t].getKlass(e.type, i);
					r.async ? r[f](e, function(t, r) {
						r || (u[n] = t, s && s(e, u[n])), o()
					}) : (u[n] = r[f](e), s && s(e, u[n]), o())
				})
			},
			groupSVGElements: function(e, t, n) {
				var i;
				return e[r] > 1 ? i = new fabric.PathGroup(e, t) : i = e[0], typeof n !== a && i.setSourcePath(n), i
			},
			populateWithProperties: function(e, t, n) {
				if (n && Object.prototype.toString.call(n) === "[object Array]")
					for (var i = 0, s = n[r]; i < s; i++) n[i] in e && (t[n[i]] = e[n[i]])
			},
			drawDashedLine: function(e, t, n, i, s, o) {
				var a = i - t,
					f = s - n,
					l = h(a * a + f * f),
					c = p(f, a),
					d = o[r],
					v = 0,
					m = u;
				e.save(), e.translate(t, n), e.moveTo(0, 0), e.rotate(c), t = 0;
				while (l > t) t += o[v++ % d], t > l && (t = l), e[m ? "lineTo" : "moveTo"](t, 0), m = !m;
				e.restore()
			},
			createCanvasElement: function(e) {
				return e || (e = fabric.document[l]("canvas")), !e.getContext && typeof G_vmlCanvasManager !== a && G_vmlCanvasManager.initElement(e), e
			},
			createImage: function() {
				return fabric.document[l]("img")
			},
			createAccessors: function(e) {
				var t = e.prototype;
				for (var i = t[c][r]; i--;) {
					var s = t[c][i],
						o = s.charAt(0)[n]() + s.slice(1),
						u = "set" + o,
						a = "get" + o;
					t[a] || (t[a] = function(e) {
						return new Function('return this.get("' + e + '")')
					}(s)), t[u] || (t[u] = function(e) {
						return new Function("value", 'return this.set("' + e + '", value)')
					}(s))
				}
			},
			clipContext: function(e, t) {
				t.save(), t.beginPath(), e.clipTo(t), t.clip()
			},
			multiplyTransformMatrices: function(e, t) {
				var n = [
						[e[0], e[2], e[4]],
						[e[1], e[3], e[5]],
						[0, 0, 1]
					],
					r = [
						[t[0], t[2], t[4]],
						[t[1], t[3], t[5]],
						[0, 0, 1]
					],
					i = [];
				for (var s = 0; s < 3; s++) {
					i[s] = [];
					for (var o = 0; o < 3; o++) {
						var u = 0;
						for (var a = 0; a < 3; a++) u += n[s][a] * r[a][o];
						i[s][o] = u
					}
				}
				return [i[0][0], i[1][0], i[0][1], i[1][1], i[0][2], i[1][2]]
			},
			getFunctionBody: function(e) {
				return (String(e).match(/function[^{]*\{([\s\S]*)\}/) || {})[1]
			},
			normalizePoints: function(e, n) {
				var i = fabric[t].array.min(e, "x"),
					s = fabric[t].array.min(e, "y");
				i = i < 0 ? i : 0, s = i < 0 ? s : 0;
				for (var o = 0, u = e[r]; o < u; o++) e[o].x -= n.width / 2 + i || 0, e[o].y -= n.height / 2 + s || 0
			},
			isTransparent: function(e, t, n, i) {
				i > 0 && (t > i ? t -= i : t = 0, n > i ? n -= i : n = 0);
				var s = u,
					a = e.getImageData(t, n, i * 2 || 1, i * 2 || 1);
				for (var f = 3, l = a.data[r]; f < l; f += 4) {
					var c = a.data[f];
					s = c <= 0;
					if (s === !1) break
				}
				return a = o, s
			}
		}
	}(typeof exports != "undefined" ? exports : this),
	function() {
		function i(t, i, o, u, a, f, l, c, h) {
			r = n.call(arguments);
			if (e[r]) return e[r];
			var p = s(l, o, u, c, h, t, i),
				d = (p.x1 - p.x0) * (p.x1 - p.x0) + (p.y1 - p.y0) * (p.y1 - p.y0),
				v = 1 / d - .25;
			v < 0 && (v = 0);
			var m = Math.sqrt(v);
			f === a && (m = -m);
			var g = .5 * (p.x0 + p.x1) - m * (p.y1 - p.y0),
				y = .5 * (p.y0 + p.y1) + m * (p.x1 - p.x0),
				b = Math.atan2(p.y0 - y, p.x0 - g),
				w = Math.atan2(p.y1 - y, p.x1 - g),
				E = w - b;
			E < 0 && f === 1 ? E += 2 * Math.PI : E > 0 && f === 0 && (E -= 2 * Math.PI);
			var S = Math.ceil(Math.abs(E / (Math.PI * .5 + .001))),
				x = [];
			for (var T = 0; T < S; T++) {
				var N = b + T * E / S,
					C = b + (T + 1) * E / S;
				x[T] = [g, y, N, C, o, u, p.sin_th, p.cos_th]
			}
			return e[r] = x, x
		}

		function s(e, t, n, r, i, s, o) {
			var u = e * (Math.PI / 180),
				a = Math.sin(u),
				f = Math.cos(u);
			t = Math.abs(t), n = Math.abs(n);
			var l = f * (r - s) * .5 + a * (i - o) * .5,
				c = f * (i - o) * .5 - a * (r - s) * .5,
				h = l * l / (t * t) + c * c / (n * n);
			h > 1 && (h = Math.sqrt(h), t *= h, n *= h);
			var p = f / t,
				d = a / t,
				v = -a / n,
				m = f / n;
			return {
				x0: p * r + d * i,
				y0: v * r + m * i,
				x1: p * s + d * o,
				y1: v * s + m * o,
				sin_th: a,
				cos_th: f
			}
		}

		function o(e, i, s, o, u, a, f, l) {
			r = n.call(arguments);
			if (t[r]) return t[r];
			var c = l * u,
				h = -f * a,
				p = f * u,
				d = l * a,
				v = .5 * (o - s),
				m = 8 / 3 * Math.sin(v * .5) * Math.sin(v * .5) / Math.sin(v),
				g = e + Math.cos(s) - m * Math.sin(s),
				y = i + Math.sin(s) + m * Math.cos(s),
				b = e + Math.cos(o),
				w = i + Math.sin(o),
				E = b + m * Math.sin(o),
				S = w - m * Math.cos(o);
			return t[r] = [c * g + h * y, p * g + d * y, c * E + h * S, p * E + d * S, c * b + h * w, p * b + d * w], t[r]
		}
		var e = {},
			t = {},
			n = Array.prototype.join,
			r;
		fabric.util.drawArc = function(e, t, n, r) {
			var s = r[0],
				u = r[1],
				a = r[2],
				f = r[3],
				l = r[4],
				c = r[5],
				h = r[6],
				p = i(c, h, s, u, f, l, a, t, n);
			for (var d = 0; d < p.length; d++) {
				var v = o.apply(this, p[d]);
				e.bezierCurveTo.apply(e, v)
			}
		}
	}(),
	function() {
		function s(e, r) {
			var s = i[n](arguments, 2),
				o = [];
			for (var u = 0, a = e[t]; u < a; u++) o[u] = s[t] ? e[u][r].apply(e[u], s) : e[u][r][n](e[u]);
			return o
		}

		function o(e, t) {
			return a(e, t, function(e, t) {
				return e >= t
			})
		}

		function u(e, t) {
			return a(e, t, function(e, t) {
				return e < t
			})
		}

		function a(e, n, r) {
			if (!e || e[t] === 0) return undefined;
			var i = e[t] - 1,
				s = n ? e[i][n] : e[i];
			if (n)
				while (i--) r(e[i][n], s) && (s = e[i][n]);
			else
				while (i--) r(e[i], s) && (s = e[i]);
			return s
		}
		var e = "prototype",
			t = "length",
			n = "call",
			r = !0,
			i = Array[e].slice;
		Array[e].indexOf || (Array[e].indexOf = function(e) {
			if (this === void 0 || this === null) throw new TypeError;
			var n = Object(this),
				r = n[t] >>> 0;
			if (r === 0) return -1;
			var i = 0;
			arguments[t] > 0 && (i = Number(arguments[1]), i !== i ? i = 0 : i !== 0 && i !== Number.POSITIVE_INFINITY && i !== Number.NEGATIVE_INFINITY && (i = (i > 0 || -1) * Math.floor(Math.abs(i))));
			if (i >= r) return -1;
			var s = i >= 0 ? i : Math.max(r - Math.abs(i), 0);
			for (; s < r; s++)
				if (s in n && n[s] === e) return s;
			return -1
		}), Array[e].forEach || (Array[e].forEach = function(e, r) {
			for (var i = 0, s = this[t] >>> 0; i < s; i++) i in this && e[n](r, this[i], i, this)
		}), Array[e].map || (Array[e].map = function(e, r) {
			var i = [];
			for (var s = 0, o = this[t] >>> 0; s < o; s++) s in this && (i[s] = e[n](r, this[s], s, this));
			return i
		}), Array[e].every || (Array[e].every = function(e, i) {
			for (var s = 0, o = this[t] >>> 0; s < o; s++)
				if (s in this && !e[n](i, this[s], s, this)) return !1;
			return r
		}), Array[e].some || (Array[e].some = function(e, i) {
			for (var s = 0, o = this[t] >>> 0; s < o; s++)
				if (s in this && e[n](i, this[s], s, this)) return r;
			return !1
		}), Array[e].filter || (Array[e].filter = function(e, r) {
			var i = [],
				s;
			for (var o = 0, u = this[t] >>> 0; o < u; o++) o in this && (s = this[o], e[n](r, s, o, this) && i.push(s));
			return i
		}), Array[e].reduce || (Array[e].reduce = function(e) {
			var i = this[t] >>> 0,
				s = 0,
				o;
			if (arguments[t] > 1) o = arguments[1];
			else
				do {
					if (s in this) {
						o = this[s++];
						break
					}
					if (++s >= i) throw new TypeError
				} while (r);
			for (; s < i; s++) s in this && (o = e[n](null, o, this[s], s, this));
			return o
		}), fabric.util.array = {
			invoke: s,
			min: u,
			max: o
		}
	}(),
	function() {
		function e(e, t) {
			for (var n in t) e[n] = t[n];
			return e
		}

		function t(t) {
			return e({}, t)
		}
		fabric.util.object = {
			extend: e,
			clone: t
		}
	}(),
	function() {
		function n(n) {
			return n[e](/-+(.)?/g, function(e, n) {
				return n ? n[t]() : ""
			})
		}

		function r(e, n) {
			return e.charAt(0)[t]() + (n ? e.slice(1) : e.slice(1).toLowerCase())
		}

		function i(t) {
			return t[e](/&/g, "&amp;")[e](/"/g, "&quot;")[e](/'/g, "&apos;")[e](/</g, "&lt;")[e](/>/g, "&gt;")
		}
		var e = "replace",
			t = "toUpperCase";
		String.prototype.trim || (String.prototype.trim = function() {
			return this[e](/^[\s\xA0]+/, "")[e](/[\s\xA0]+$/, "")
		}), fabric.util.string = {
			camelize: n,
			capitalize: r,
			escapeXml: i
		}
	}(),
	function() {
		var e = "prototype",
			t = Array[e].slice,
			n = Function[e].apply,
			r = function() {};
		Function[e].bind || (Function[e].bind = function(i) {
			var s = this,
				o = t.call(arguments, 1),
				u;
			return o.length ? u = function() {
				return n.call(s, this instanceof r ? this : i, o.concat(t.call(arguments)))
			} : u = function() {
				return n.call(s, this instanceof r ? this : i, arguments)
			}, r[e] = this[e], u[e] = new r, u
		})
	}(),
	function() {
		function p() {}

		function d(t) {
			var n = this[s][i][e][t];
			return arguments.length > 1 ? n.apply(this, f.call(arguments, 1)) : n.call(this)
		}

		function v() {
			function c() {
				this[o].apply(this, arguments)
			}
			var t = null,
				u = f.call(arguments, 0);
			typeof u[0] === n && (t = u.shift()), c[i] = t, c[a] = [], t && (p[e] = t[e], c[e] = new p, t[a].push(c));
			for (var v = 0, m = u.length; v < m; v++) h(c, u[v], t);
			return c[e][o] || (c[e][o] = l), c[e][s] = c, c[e][r] = d, c
		}
		var e = "prototype",
			t = "toString",
			n = "function",
			r = "callSuper",
			i = "superclass",
			s = "constructor",
			o = "initialize",
			u = "valueOf",
			a = "subclasses",
			f = Array[e].slice,
			l = function() {},
			c = function() {
				for (var e in {
						toString: 1
					})
					if (e === t) return !1;
				return !0
			}(),
			h = function(a, f, l) {
				for (var h in f) h in a[e] && typeof a[e][h] === n && (f[h] + "").indexOf(r) > -1 ? a[e][h] = function(e) {
					return function() {
						var t = this[s][i];
						this[s][i] = l;
						var n = f[e].apply(this, arguments);
						this[s][i] = t;
						if (e !== o) return n
					}
				}(h) : a[e][h] = f[h], c && (f[t] !== Object[e][t] && (a[e][t] = f[t]), f[u] !== Object[e][u] && (a[e][u] = f[u]))
			};
		fabric.util.createClass = v
	}(),
	function() {
		function m(n) {
			var r = Array.prototype.slice.call(arguments, 1),
				i, s, o = r[e];
			for (s = 0; s < o; s++) {
				i = typeof n[r[s]];
				if (!/^(?:function|object|unknown)$/.test(i)) return t
			}
			return !0
		}

		function w(e, t) {
			return {
				handler: t,
				wrappedHandler: E(e, t)
			}
		}

		function E(e, t) {
			return function(n) {
				t.call(y(e), n || fabric[r].event)
			}
		}

		function S(t, n) {
			return function(i) {
				if (C[t] && C[t][n]) {
					var s = C[t][n];
					for (var o = 0, u = s[e]; o < u; o++) s[o].call(this, i || fabric[r].event)
				}
			}
		}

		function A(e, t) {
			e || (e = fabric[r].event);
			var n = e.target || (typeof e[h] !== v ? e[h] : null),
				i = fabric[c].getScrollLeftTop(n, t);
			return {
				x: O(e) + i.left,
				y: M(e) + i.top
			}
		}

		function _(e, t, n) {
			var r = e.type === "touchend" ? "changedTouches" : "touches";
			return e[r] && e[r][0] ? e[r][0][t] - (e[r][0][t] - e[r][0][n]) || e[n] : e[n]
		}
		var e = "length",
			t = !1,
			n = "__uniqueID",
			r = "window",
			i = "documentElement",
			s = "addEventListener",
			o = "removeEventListener",
			u = "attachEvent",
			a = "detachEvent",
			f = "on",
			l = "wrappedHandler",
			c = "util",
			h = "srcElement",
			p = "clientX",
			d = "clientY",
			v = "unknown",
			g = function() {
				var e = 0;
				return function(t) {
					return t[n] || (t[n] = "uniqueID__" + e++)
				}
			}(),
			y, b;
		(function() {
			var e = {};
			y = function(t) {
				return e[t]
			}, b = function(t, n) {
				e[t] = n
			}
		})();
		var x = m(fabric.document[i], s, o) && m(fabric[r], s, o),
			T = m(fabric.document[i], u, a) && m(fabric[r], u, a),
			N = {},
			C = {},
			k, L;
		x ? (k = function(e, n, r) {
			e[s](n, r, t)
		}, L = function(e, n, r) {
			e[o](n, r, t)
		}) : T ? (k = function(e, t, n) {
			var r = g(e);
			b(r, e), N[r] || (N[r] = {}), N[r][t] || (N[r][t] = []);
			var i = w(r, n);
			N[r][t].push(i), e[u](f + t, i[l])
		}, L = function(t, n, r) {
			var i = g(t),
				s;
			if (N[i] && N[i][n])
				for (var o = 0, u = N[i][n][e]; o < u; o++) s = N[i][n][o], s && s.handler === r && (t[a](f + n, s[l]), N[i][n][o] = null)
		}) : (k = function(e, t, n) {
			var r = g(e);
			C[r] || (C[r] = {});
			if (!C[r][t]) {
				C[r][t] = [];
				var i = e[f + t];
				i && C[r][t].push(i), e[f + t] = S(r, t)
			}
			C[r][t].push(n)
		}, L = function(t, n, r) {
			var i = g(t);
			if (C[i] && C[i][n]) {
				var s = C[i][n];
				for (var o = 0, u = s[e]; o < u; o++) s[o] === r && s.splice(o, 1)
			}
		}), fabric[c].addListener = k, fabric[c].removeListener = L;
		var O = function(e) {
				return typeof e[p] !== v ? e[p] : 0
			},
			M = function(e) {
				return typeof e[d] !== v ? e[d] : 0
			};
		fabric.isTouchSupported && (O = function(e) {
			return _(e, "pageX", p)
		}, M = function(e) {
			return _(e, "pageY", d)
		}), fabric[c].getPointer = A, fabric[c].object.extend(fabric[c], fabric.Observable)
	}(),
	function() {
		function u(s, o) {
			var u = s[e];
			if (!u) return s;
			if (typeof o === t) return s[e].cssText += ";" + o, o.indexOf(n) > -1 ? h(s, o.match(/opacity:\s*(\d?\.?\d*)/)[1]) : s;
			for (var a in o)
				if (a === n) h(s, o[a]);
				else {
					var f = a === "float" || a === r ? typeof u[i] == "undefined" ? r : i : a;
					u[f] = o[a]
				}
			return s
		}
		var e = "style",
			t = "string",
			n = "opacity",
			r = "cssFloat",
			i = "styleFloat",
			s = "filter",
			o = "currentStyle",
			a = fabric.document.createElement("div"),
			f = typeof a[e][n] === t,
			l = typeof a[e][s] === t,
			c = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,
			h = function(e) {
				return e
			};
		f ? h = function(t, r) {
			return t[e][n] = r, t
		} : l && (h = function(t, n) {
			var r = t[e];
			return t[o] && !t[o].hasLayout && (r.zoom = 1), c.test(r[s]) ? (n = n >= .9999 ? "" : "alpha(opacity=" + n * 100 + ")", r[s] = r[s].replace(c, n)) : r[s] += " alpha(opacity=" + n * 100 + ")", t
		}), fabric.util.setStyle = u
	}(),
	function() {
		function _(n) {
			return typeof n === e ? fabric[t].getElementById(n) : n
		}

		function B(e, i) {
			var s = fabric[t][n](e);
			for (var o in i) o === "class" ? s[r] = i[o] : o === "for" ? s.htmlFor = i[o] : s.setAttribute(o, i[o]);
			return s
		}

		function j(e, t) {
			(i + e[r] + i).indexOf(i + t + i) === -1 && (e[r] += (e[r] ? i : "") + t)
		}

		function F(t, n, r) {
			return typeof n === e && (n = B(n, r)), t[s] && t[s].replaceChild(n, t), n[o](t), n
		}

		function I(e, n) {
			var r, i, o = 0,
				p = 0,
				d = fabric[t][u],
				v = fabric[t].body || {
					scrollLeft: 0,
					scrollTop: 0
				};
			i = e;
			while (e && e[s] && !r) e = e[s], e !== fabric[t] && fabric[f][a](e, l) === "fixed" && (r = e), e !== fabric[t] && i !== n && fabric[f][a](e, l) === "absolute" ? (o = 0, p = 0) : e === fabric[t] ? (o = v[c] || d[c] || 0, p = v[h] || d[h] || 0) : (o += e[c] || 0, p += e[h] || 0);
			return {
				left: o,
				top: p
			}
		}

		function q(e) {
			var t, n = {
					left: 0,
					top: 0
				},
				r = e && e.ownerDocument,
				i = {
					left: 0,
					top: 0
				},
				s, o = {
					borderLeftWidth: p,
					borderTopWidth: d,
					paddingLeft: p,
					paddingTop: d
				};
			if (!r) return {
				left: 0,
				top: 0
			};
			for (var a in o) i[o[a]] += parseInt(R(e, a), 10) || 0;
			return t = r[u], typeof e[v] !== m && (n = e[v]()), s = fabric[f][g](e, y), {
				left: n[p] + s[p] - (t.clientLeft || 0) + i[p],
				top: n[d] + s[d] - (t.clientTop || 0) + i[d]
			}
		}

		function R(e, n) {
			e[b] || (e[b] = {});
			if (fabric[t][w] && fabric[t][w][E]) return fabric[t][w][E](e, y)[n];
			var r = e[b][n];
			return !r && e[S] && (r = e[S][n]), r
		}
		var e = "string",
			t = "document",
			n = "createElement",
			r = "className",
			i = " ",
			s = "parentNode",
			o = "appendChild",
			u = "documentElement",
			a = "getElementStyle",
			f = "util",
			l = "position",
			c = "scrollLeft",
			h = "scrollTop",
			p = "left",
			d = "top",
			v = "getBoundingClientRect",
			m = "undefined",
			g = "getScrollLeftTop",
			y = null,
			b = "style",
			w = "defaultView",
			E = "getComputedStyle",
			S = "currentStyle",
			x = "userSelect",
			T = "MozUserSelect",
			N = "WebkitUserSelect",
			C = "KhtmlUserSelect",
			k = "onselectstart",
			L = "unselectable",
			A = "onreadystatechange",
			O = "readyState",
			M = Array.prototype.slice,
			D = function(e) {
				return M.call(e, 0)
			},
			P;
		try {
			P = D(fabric[t].childNodes) instanceof Array
		} catch (H) {}
		P || (D = function(e) {
				var t = new Array(e.length),
					n = e.length;
				while (n--) t[n] = e[n];
				return t
			}),
			function() {
				function i(t) {
					return typeof t[k] !== m && (t[k] = fabric[f].falseFunction), r ? t[b][r] = "none" : typeof t[L] === e && (t[L] = "on"), t
				}

				function s(t) {
					return typeof t[k] !== m && (t[k] = y), r ? t[b][r] = "" : typeof t[L] === e && (t[L] = ""), t
				}
				var n = fabric[t][u][b],
					r = x in n ? x : T in n ? T : N in n ? N : C in n ? C : "";
				fabric[f].makeElementUnselectable = i, fabric[f].makeElementSelectable = s
			}(),
			function() {
				function r(r, i) {
					var s = fabric[t].getElementsByTagName("head")[0],
						u = fabric[t][n]("script"),
						a = !0;
					u.onload = u[A] = function(t) {
						if (a) {
							if (typeof this[O] === e && this[O] !== "loaded" && this[O] !== "complete") return;
							a = !1, i(t || fabric.window.event), u = u.onload = u[A] = y
						}
					}, u.src = r, s[o](u)
				}
				fabric[f].getScript = r
			}(), fabric[f].getById = _, fabric[f].toArray = D, fabric[f].makeElement = B, fabric[f].addClass = j, fabric[f].wrapElement = F, fabric[f][g] = I, fabric[f].getElementOffset = q, fabric[f][a] = R
	}(),
	function() {
		function n(e, t) {
			return e + (/\?/.test(e) ? "&" : "?") + t
		}

		function i() {}

		function s(s, o) {
			o || (o = {});
			var u = o.method ? o.method.toUpperCase() : "GET",
				a = o.onComplete || function() {},
				f = r(),
				l;
			return f[e] = function() {
				f.readyState === 4 && (a(f), f[e] = i)
			}, u === "GET" && (l = null, typeof o[t] == "string" && (s = n(s, o[t]))), f.open(u, s, !0), (u === "POST" || u === "PUT") && f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), f.send(l), f
		}
		var e = "onreadystatechange",
			t = "parameters",
			r = function() {
				var e = [function() {
					return new ActiveXObject("Microsoft.XMLHTTP")
				}, function() {
					return new ActiveXObject("Msxml2.XMLHTTP")
				}, function() {
					return new ActiveXObject("Msxml2.XMLHTTP.3.0")
				}, function() {
					return new XMLHttpRequest
				}];
				for (var t = e.length; t--;) try {
					var n = e[t]();
					if (n) return e[t]
				} catch (r) {}
			}();
		fabric.util.request = s
	}(), fabric.log = function() {}, fabric.warn = function() {}, typeof console != "undefined" && ["log", "warn"].forEach(function(e) {
		typeof console[e] != "undefined" && console[e].apply && (fabric[e] = function() {
			return console[e].apply(console, arguments)
		})
	}),
	function(e) {
		"use strict";

		function st(e) {
			return e in rt ? rt[e] : e
		}

		function ot(e, t, n) {
			var r;
			e !== D && e !== "stroke" || t !== "none" ? e === H ? t = t === "evenodd" ? "destination-over" : t : e === b ? t = t[a](/,/g, " ")[S](/\s+/) : e === i && (n && n[i] ? t = nt(n[i], G[o](t)) : t = G[o](t)) : t = "", r = Object.prototype.toString.call(t) === "[object Array]";
			var s = r ? t.map(parseFloat) : parseFloat(t);
			return !r && isNaN(s) ? t : s
		}

		function ut(e) {
			for (var t in it) {
				if (!e[t] || typeof e[it[t]] === h) continue;
				if (e[t].indexOf("url(") === 0) continue;
				var n = new G.Color(e[t]);
				e[t] = n.setAlpha(tt(n.getAlpha() * e[it[t]], 2)).toRgba(), delete e[it[t]]
			}
			return e
		}

		function at(e, t) {
			var n = e[X](/(normal|italic)?\s*(normal|small-caps)?\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\s*(\d+)px(?:\/(normal|[\d\.]+))?\s+(.*)/);
			if (!n) return;
			var r = n[1],
				i = n[3],
				s = n[4],
				o = n[5],
				u = n[6];
			r && (t[W] = r), i && (t[k] = isNaN(parseFloat(i)) ? i : parseFloat(i)), s && (t[k] = parseFloat(s)), u && (t[y] = u), o && (t.lineHeight = o === "normal" ? 1 : o)
		}

		function ft(e, t) {
			var n, r;
			e[a](/;$/, "")[S](";").forEach(function(e) {
				var i = e[S](":");
				n = st(i[0][B]()[J]()), r = ot(n, i[1][B]()), n === "font" ? at(r, t) : t[n] = r
			})
		}

		function lt(e, t) {
			var n, r;
			for (var i in e) {
				if (typeof e[i] === h) continue;
				n = st(i[J]()), r = ot(n, e[i]), n === "font" ? at(r, t) : t[n] = r
			}
		}

		function ct(e) {
			var n = e[P],
				r = e[t]("class"),
				i = e[t](V),
				s = {};
			for (var o in G[E]) {
				var u = r && (new RegExp("^\\." + r))[O](o) || i && (new RegExp("^#" + i))[O](o) || (new RegExp("^" + n))[O](o);
				if (u)
					for (var a in G[E][o]) s[a] = G[E][o][a]
			}
			return s
		}

		function pt(e) {
			var t = e.objects,
				n = e.options;
			return t = t.map(function(e) {
				return G[Z(e.type)].fromObject(e)
			}), {
				objects: t,
				options: n
			}
		}

		function dt(e, t, n) {
			t[n] && t[n].toSVG && e.push('<pattern x="0" y="0" id="', n, 'Pattern" ', F, t[n][N][K], A, t[n][N][q], '" patternUnits="userSpaceOnUse">', '<image x="0" y="0" ', F, t[n][N][K], A, t[n][N][q], '" xlink:href="', t[n][N].src, '"></image></pattern>')
		}
		var t = "getAttribute",
			n = "length",
			r = "getElementsByTagName",
			i = "transformMatrix",
			s = "(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)",
			o = "parseTransformAttribute",
			u = "documentElement",
			a = "replace",
			f = "parseSVGDocument",
			l = "))?\\s*\\))",
			c = "parentNode",
			h = "undefined",
			p = "multiplyTransformMatrices",
			d = "(",
			v = "\\s*(",
			m = "+)\\s*,?",
			g = "gradientDefs",
			y = "fontFamily",
			b = "strokeDashArray",
			w = ")",
			E = "cssRules",
			S = "split",
			x = "Microsoft.XMLDOM",
			T = "strokeOpacity",
			N = "source",
			C = "util",
			k = "fontSize",
			L = "fillOpacity",
			A = '" height="',
			O = "test",
			M = ")\\s*\\))",
			_ = ")(?:",
			D = "fill",
			P = "nodeName",
			H = "fillRule",
			B = "trim",
			j = null,
			F = 'width="',
			I = "ActiveXObject",
			q = "height",
			R = "|",
			U = "(?:",
			z = "parseFromString",
			W = "fontStyle",
			X = "match",
			V = "id",
			$ = "style",
			J = "toLowerCase",
			K = "width",
			Q = "left",
			G = e.fabric || (e.fabric = {}),
			Y = G[C].object.extend,
			Z = G[C].string.capitalize,
			et = G[C].object.clone,
			tt = G[C].toFixed,
			nt = G[C][p],
			rt = {
				"fill-opacity": L,
				"fill-rule": H,
				"font-family": y,
				"font-size": k,
				"font-style": W,
				"font-weight": "fontWeight",
				cx: Q,
				x: Q,
				r: "radius",
				"stroke-dasharray": b,
				"stroke-linecap": "strokeLineCap",
				"stroke-linejoin": "strokeLineJoin",
				"stroke-miterlimit": "strokeMiterLimit",
				"stroke-opacity": T,
				"stroke-width": "strokeWidth",
				"text-decoration": "textDecoration",
				cy: "top",
				y: "top",
				transform: i
			},
			it = {
				stroke: T,
				fill: L
			};
		G[o] = function() {
			function e(e, t) {
				var n = t[0];
				e[0] = Math.cos(n), e[1] = Math.sin(n), e[2] = -Math.sin(n), e[3] = Math.cos(n)
			}

			function t(e, t) {
				var r = t[0],
					i = t[n] === 2 ? t[1] : t[0];
				e[0] = r, e[3] = i
			}

			function r(e, t) {
				e[2] = t[0]
			}

			function i(e, t) {
				e[1] = t[0]
			}

			function o(e, t) {
				e[4] = t[0], t[n] === 2 && (e[5] = t[1])
			}
			var u = [1, 0, 0, 1, 0, 0],
				f = s,
				c = "(?:\\s+,?\\s*|,\\s*)",
				h = "(?:(skewX)\\s*\\(\\s*(" + f + M,
				v = "(?:(skewY)\\s*\\(\\s*(" + f + M,
				m = "(?:(rotate)\\s*\\(\\s*(" + f + _ + c + d + f + w + c + d + f + l,
				g = "(?:(scale)\\s*\\(\\s*(" + f + _ + c + d + f + l,
				y = "(?:(translate)\\s*\\(\\s*(" + f + _ + c + d + f + l,
				b = "(?:(matrix)\\s*\\(\\s*" + d + f + w + c + d + f + w + c + d + f + w + c + d + f + w + c + d + f + w + c + d + f + w + "\\s*\\))",
				E = U + b + R + y + R + g + R + m + R + h + R + v + w,
				S = U + E + U + c + E + ")*" + w,
				x = "^\\s*(?:" + S + "?)\\s*$",
				T = new RegExp(x),
				N = new RegExp(E, "g");
			return function(s) {
				var f = u.concat(),
					l = [];
				if (!s || s && !T[O](s)) return f;
				s[a](N, function(n) {
					var s = (new RegExp(E)).exec(n).filter(function(e) {
							return e !== "" && e != j
						}),
						a = s[1],
						c = s.slice(2).map(parseFloat);
					switch (a) {
						case "translate":
							o(f, c);
							break;
						case "rotate":
							e(f, c);
							break;
						case "scale":
							t(f, c);
							break;
						case "skewX":
							r(f, c);
							break;
						case "skewY":
							i(f, c);
							break;
						case "matrix":
							f = c
					}
					l.push(f.concat()), f = u.concat()
				});
				var c = l[0];
				while (l[n] > 1) l.shift(), c = G[C][p](c, l[0]);
				return c
			}
		}(), G[f] = function() {
			function u(e, t) {
				while (e && (e = e[c]))
					if (t[O](e[P])) return !0;
				return !1
			}
			var e = /^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/,
				i = s,
				o = new RegExp("^" + v + i + m + v + i + m + v + i + m + v + i + "+)\\s*" + "$");
			return function(i, s, a) {
				if (!i) return;
				var f = new Date,
					l = G[C].toArray(i[r]("*"));
				if (l[n] === 0) {
					l = i.selectNodes("//*[name(.)!='svg']");
					var c = [];
					for (var h = 0, p = l[n]; h < p; h++) c[h] = l[h];
					l = c
				}
				var d = l.filter(function(t) {
					return e[O](t.tagName) && !u(t, /^(?:pattern|defs)$/)
				});
				if (!d || d && !d[n]) return;
				var v = i[t]("viewBox"),
					m = i[t](K),
					y = i[t](q),
					b = j,
					w = j,
					S, x;
				v && (v = v[X](o)) && (S = parseInt(v[1], 10), x = parseInt(v[2], 10), b = parseInt(v[3], 10), w = parseInt(v[4], 10)), b = m ? parseFloat(m) : b, w = y ? parseFloat(y) : w;
				var T = {
					width: b,
					height: w
				};
				G[g] = G.getGradientDefs(i), G[E] = G.getCSSRules(i), G.parseElements(d, function(e) {
					G.documentParsingTime = new Date - f, s && s(e, T)
				}, et(T), a)
			}
		}();
		var ht = {
			has: function(e, t) {
				t(!1)
			},
			get: function() {},
			set: function() {}
		};
		Y(G, {
			resolveGradients: function(e) {
				for (var t = e[n]; t--;) {
					var r = e[t].get(D);
					if (!/^url\(/ [O](r)) continue;
					var i = r.slice(5, r[n] - 1);
					G[g][i] && e[t].set(D, G.Gradient.fromElement(G[g][i], e[t]))
				}
			},
			getGradientDefs: function(e) {
				var i = e[r]("linearGradient"),
					s = e[r]("radialGradient"),
					o, u, a = {};
				u = i[n];
				for (; u--;) o = i[u], a[o[t](V)] = o;
				u = s[n];
				for (; u--;) o = s[u], a[o[t](V)] = o;
				return a
			},
			parseAttributes: function(e, n) {
				if (!e) return;
				var r, i = {};
				e[c] && /^g$/i [O](e[c][P]) && (i = G.parseAttributes(e[c], n));
				var s = n.reduce(function(n, s) {
					return r = e[t](s), r && (s = st(s), r = ot(s, r, i), n[s] = r), n
				}, {});
				return s = Y(s, Y(ct(e), G.parseStyleAttribute(e))), ut(Y(i, s))
			},
			parseElements: function(e, t, n, r) {
				G.ElementsParser.parse(e, t, n, r)
			},
			parseStyleAttribute: function(e) {
				var n = {},
					r = e[t]($);
				return r ? (typeof r == "string" ? ft(r, n) : lt(r, n), n) : n
			},
			parsePointsAttribute: function(e) {
				if (!e) return j;
				e = e[B]();
				var t = e.indexOf(",") > -1;
				e = e[S](/\s+/);
				var r = [],
					i, s;
				if (t) {
					i = 0, s = e[n];
					for (; i < s; i++) {
						var o = e[i][S](",");
						r.push({
							x: parseFloat(o[0]),
							y: parseFloat(o[1])
						})
					}
				} else {
					i = 0, s = e[n];
					for (; i < s; i += 2) r.push({
						x: parseFloat(e[i]),
						y: parseFloat(e[i + 1])
					})
				}
				return r[n] % 2 !== 0, r
			},
			getCSSRules: function(e) {
				var t = e[r]($),
					i = {},
					s;
				for (var o = 0, u = t[n]; o < u; o++) {
					var f = t[0].textContent;
					f = f[a](/\/\*[\s\S]*?\*\//g, ""), s = f[X](/[^{]*\{[\s\S]*?\}/g), s = s.map(function(e) {
						return e[B]()
					}), s.forEach(function(e) {
						var t = e[X](/([\s\S]*?)\s*\{([^}]*)\}/);
						e = t[1];
						var r = t[2][B](),
							s = r[a](/;$/, "")[S](/\s*;\s*/);
						i[e] || (i[e] = {});
						for (var o = 0, u = s[n]; o < u; o++) {
							var f = s[o][S](/\s*:\s*/),
								l = f[0],
								c = f[1];
							i[e][l] = c
						}
					})
				}
				return i
			},
			loadSVGFromURL: function(e, t, n) {
				function r(r) {
					var i = r.responseXML;
					!i[u] && G.window[I] && r.responseText && (i = new ActiveXObject(x), i.async = "false", i.loadXML(r.responseText[a](/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, "")));
					if (!i[u]) return;
					G[f](i[u], function(n, r) {
						ht.set(e, {
							objects: G[C].array.invoke(n, "toObject"),
							options: r
						}), t(n, r)
					}, n)
				}
				e = e[a](/^\n\s*/, "")[B](), ht.has(e, function(n) {
					n ? ht.get(e, function(e) {
						var n = pt(e);
						t(n.objects, n.options)
					}) : new G[C].request(e, {
						method: "get",
						onComplete: r
					})
				})
			},
			loadSVGFromString: function(e, t, n) {
				e = e[B]();
				var r;
				if (typeof DOMParser !== h) {
					var i = new DOMParser;
					i && i[z] && (r = i[z](e, "text/xml"))
				} else G.window[I] && (r = new ActiveXObject(x), r.async = "false", r.loadXML(e[a](/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, "")));
				G[f](r[u], function(e, n) {
					t(e, n)
				}, n)
			},
			createSVGFontFacesMarkup: function(e) {
				var t = "";
				for (var r = 0, i = e[n]; r < i; r++) {
					if (e[r].type !== "text" || !e[r].path) continue;
					t += ["@font-face {", "font-family: ", e[r][y], "; ", "src: url('", e[r].path, "')", "}"].join("")
				}
				return t && (t = ['<style type="text/css">', "<![CDATA[", t, "]]>", "</style>"].join("")), t
			},
			createSVGRefElementsMarkup: function(e) {
				var t = [];
				return dt(t, e, "backgroundColor"), dt(t, e, "overlayColor"), t.join("")
			}
		})
	}(typeof exports != "undefined" ? exports : this), fabric.ElementsParser = {
		parse: function(e, t, n, r) {
			this.elements = e, this.callback = t, this.options = n, this.reviver = r, this.instances = new Array(e.length), this.numElements = e.length, this.createObjects()
		},
		createObjects: function() {
			for (var e = 0, t = this.elements.length; e < t; e++) this.createObject(this.elements[e], e)
		},
		createObject: function(e, t) {
			var n = fabric[fabric.util.string.capitalize(e.tagName)];
			if (n && n.fromElement) try {
				this._createObject(n, e, t)
			} catch (r) {
				fabric.log(r)
			} else this.checkIfDone()
		},
		_createObject: function(e, t, n) {
			if (e.async) e.fromElement(t, this.createCallback(n, t), this.options);
			else {
				var r = e.fromElement(t, this.options);
				this.reviver && this.reviver(t, r), this.instances.splice(n, 0, r), this.checkIfDone()
			}
		},
		createCallback: function(e, t) {
			var n = this;
			return function(r) {
				n.reviver && n.reviver(t, r), n.instances.splice(e, 0, r), n.checkIfDone()
			}
		},
		checkIfDone: function() {
			var e = "instances";
			--this.numElements === 0 && (this[e] = this[e].filter(function(e) {
				return e != null
			}), fabric.resolveGradients(this[e]), this.callback(this[e]))
		}
	},
	function(e) {
		"use strict";

		function n(e, t) {
			this.x = e, this.y = t
		}
		var t = e.fabric || (e.fabric = {});
		if (t.Point) {
			t.warn("fabric.Point is already defined");
			return
		}
		t.Point = n, n.prototype = {
			constructor: n,
			add: function(e) {
				return new n(this.x + e.x, this.y + e.y)
			},
			addEquals: function(e) {
				return this.x += e.x, this.y += e.y, this
			},
			scalarAdd: function(e) {
				return new n(this.x + e, this.y + e)
			},
			scalarAddEquals: function(e) {
				return this.x += e, this.y += e, this
			},
			subtract: function(e) {
				return new n(this.x - e.x, this.y - e.y)
			},
			subtractEquals: function(e) {
				return this.x -= e.x, this.y -= e.y, this
			},
			scalarSubtract: function(e) {
				return new n(this.x - e, this.y - e)
			},
			scalarSubtractEquals: function(e) {
				return this.x -= e, this.y -= e, this
			},
			multiply: function(e) {
				return new n(this.x * e, this.y * e)
			},
			multiplyEquals: function(e) {
				return this.x *= e, this.y *= e, this
			},
			divide: function(e) {
				return new n(this.x / e, this.y / e)
			},
			divideEquals: function(e) {
				return this.x /= e, this.y /= e, this
			},
			eq: function(e) {
				return this.x === e.x && this.y === e.y
			},
			lt: function(e) {
				return this.x < e.x && this.y < e.y
			},
			lte: function(e) {
				return this.x <= e.x && this.y <= e.y
			},
			gt: function(e) {
				return this.x > e.x && this.y > e.y
			},
			gte: function(e) {
				return this.x >= e.x && this.y >= e.y
			},
			lerp: function(e, t) {
				return new n(this.x + (e.x - this.x) * t, this.y + (e.y - this.y) * t)
			},
			distanceFrom: function(e) {
				var t = this.x - e.x,
					n = this.y - e.y;
				return Math.sqrt(t * t + n * n)
			},
			midPointFrom: function(e) {
				return new n(this.x + (e.x - this.x) / 2, this.y + (e.y - this.y) / 2)
			},
			min: function(e) {
				return new n(Math.min(this.x, e.x), Math.min(this.y, e.y))
			},
			max: function(e) {
				return new n(Math.max(this.x, e.x), Math.max(this.y, e.y))
			},
			toString: function() {
				return this.x + "," + this.y
			},
			setXY: function(e, t) {
				this.x = e, this.y = t
			},
			setFromPoint: function(e) {
				this.x = e.x, this.y = e.y
			},
			swap: function(e) {
				var t = this.x,
					n = this.y;
				this.x = e.x, this.y = e.y, e.x = t, e.y = n
			}
		}
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";

		function f(e) {
			this[n] = e, this[r] = []
		}
		var t = "Intersection",
			n = "status",
			r = "points",
			i = "intersectLineLine",
			s = "intersectLinePolygon",
			o = "length",
			u = "appendPoints",
			a = e.fabric || (e.fabric = {});
		if (a[t]) {
			a.warn("fabric.Intersection is already defined");
			return
		}
		a[t] = f, a[t].prototype = {
			appendPoint: function(e) {
				this[r].push(e)
			},
			appendPoints: function(e) {
				this[r] = this[r].concat(e)
			}
		}, a[t][i] = function(e, n, i, s) {
			var o, u = (s.x - i.x) * (e.y - i.y) - (s.y - i.y) * (e.x - i.x),
				l = (n.x - e.x) * (e.y - i.y) - (n.y - e.y) * (e.x - i.x),
				c = (s.y - i.y) * (n.x - e.x) - (s.x - i.x) * (n.y - e.y);
			if (c !== 0) {
				var h = u / c,
					p = l / c;
				0 <= h && h <= 1 && 0 <= p && p <= 1 ? (o = new f(t), o[r].push(new a.Point(e.x + h * (n.x - e.x), e.y + h * (n.y - e.y)))) : o = new f
			} else u === 0 || l === 0 ? o = new f("Coincident") : o = new f("Parallel");
			return o
		}, a[t][s] = function(e, s, a) {
			var l = new f,
				c = a[o];
			for (var h = 0; h < c; h++) {
				var p = a[h],
					d = a[(h + 1) % c],
					v = f[i](e, s, p, d);
				l[u](v[r])
			}
			return l[r][o] > 0 && (l[n] = t), l
		}, a[t].intersectPolygonPolygon = function(e, i) {
			var a = new f,
				l = e[o];
			for (var c = 0; c < l; c++) {
				var h = e[c],
					p = e[(c + 1) % l],
					d = f[s](h, p, i);
				a[u](d[r])
			}
			return a[r][o] > 0 && (a[n] = t), a
		}, a[t].intersectPolygonRectangle = function(e, i, l) {
			var c = i.min(l),
				h = i.max(l),
				p = new a.Point(h.x, c.y),
				d = new a.Point(c.x, h.y),
				v = f[s](c, p, e),
				m = f[s](p, h, e),
				g = f[s](h, d, e),
				y = f[s](d, c, e),
				b = new f;
			return b[u](v[r]), b[u](m[r]), b[u](g[r]), b[u](y[r]), b[r][o] > 0 && (b[n] = t), b
		}
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";

		function b(e) {
			e ? this._tryParsingColor(e) : this[n]([0, 0, 0, 1])
		}

		function w(e, t, n) {
			return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
		}
		var t = "Color",
			n = "setSource",
			r = "colorNameMap",
			i = "sourceFromHex",
			s = "sourceFromRgb",
			o = "sourceFromHsl",
			u = "round",
			a = "getSource",
			f = ",",
			l = "%,",
			c = "toString",
			h = "length",
			p = "toUpperCase",
			d = "fromSource",
			v = "test",
			m = "charAt",
			g = "substring",
			y = e.fabric || (e.fabric = {});
		if (y[t]) {
			y.warn("fabric.Color is already defined.");
			return
		}
		y[t] = b, y[t].prototype = {
			_tryParsingColor: function(e) {
				var t;
				e in b[r] && (e = b[r][e]), t = b[i](e), t || (t = b[s](e)), t || (t = b[o](e)), t && this[n](t)
			},
			_rgbToHsl: function(e, t, n) {
				e /= 255, t /= 255, n /= 255;
				var r, i, s, o = y.util.array.max([e, t, n]),
					a = y.util.array.min([e, t, n]);
				s = (o + a) / 2;
				if (o === a) r = i = 0;
				else {
					var f = o - a;
					i = s > .5 ? f / (2 - o - a) : f / (o + a);
					switch (o) {
						case e:
							r = (t - n) / f + (t < n ? 6 : 0);
							break;
						case t:
							r = (n - e) / f + 2;
							break;
						case n:
							r = (e - t) / f + 4
					}
					r /= 6
				}
				return [Math[u](r * 360), Math[u](i * 100), Math[u](s * 100)]
			},
			getSource: function() {
				return this._source
			},
			setSource: function(e) {
				this._source = e
			},
			toRgb: function() {
				var e = this[a]();
				return "rgb(" + e[0] + f + e[1] + f + e[2] + ")"
			},
			toRgba: function() {
				var e = this[a]();
				return "rgba(" + e[0] + f + e[1] + f + e[2] + f + e[3] + ")"
			},
			toHsl: function() {
				var e = this[a](),
					t = this._rgbToHsl(e[0], e[1], e[2]);
				return "hsl(" + t[0] + f + t[1] + l + t[2] + "%)"
			},
			toHsla: function() {
				var e = this[a](),
					t = this._rgbToHsl(e[0], e[1], e[2]);
				return "hsla(" + t[0] + f + t[1] + l + t[2] + l + e[3] + ")"
			},
			toHex: function() {
				var e = this[a](),
					t = e[0][c](16);
				t = t[h] === 1 ? "0" + t : t;
				var n = e[1][c](16);
				n = n[h] === 1 ? "0" + n : n;
				var r = e[2][c](16);
				return r = r[h] === 1 ? "0" + r : r, t[p]() + n[p]() + r[p]()
			},
			getAlpha: function() {
				return this[a]()[3]
			},
			setAlpha: function(e) {
				var t = this[a]();
				return t[3] = e, this[n](t), this
			},
			toGrayscale: function() {
				var e = this[a](),
					t = parseInt((e[0] * .3 + e[1] * .59 + e[2] * .11).toFixed(0), 10),
					r = e[3];
				return this[n]([t, t, t, r]), this
			},
			toBlackWhite: function(e) {
				var t = this[a](),
					r = (t[0] * .3 + t[1] * .59 + t[2] * .11).toFixed(0),
					i = t[3];
				return e = e || 127, r = Number(r) < Number(e) ? 0 : 255, this[n]([r, r, r, i]), this
			},
			overlayWith: function(e) {
				e instanceof b || (e = new b(e));
				var t = [],
					r = this.getAlpha(),
					i = .5,
					s = this[a](),
					o = e[a]();
				for (var f = 0; f < 3; f++) t.push(Math[u](s[f] * (1 - i) + o[f] * i));
				return t[3] = r, this[n](t), this
			}
		}, y[t].reRGBa = /^rgba?\(\s*(\d{1,3}\%?)\s*,\s*(\d{1,3}\%?)\s*,\s*(\d{1,3}\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, y[t].reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, y[t].reHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i, y[t][r] = {
			aqua: "#00FFFF",
			black: "#000000",
			blue: "#0000FF",
			fuchsia: "#FF00FF",
			gray: "#808080",
			green: "#008000",
			lime: "#00FF00",
			maroon: "#800000",
			navy: "#000080",
			olive: "#808000",
			orange: "#FFA500",
			purple: "#800080",
			red: "#FF0000",
			silver: "#C0C0C0",
			teal: "#008080",
			white: "#FFFFFF",
			yellow: "#FFFF00"
		}, y[t].fromRgb = function(e) {
			return b[d](b[s](e))
		}, y[t][s] = function(e) {
			var t = e.match(b.reRGBa);
			if (t) {
				var n = parseInt(t[1], 10) / (/%$/ [v](t[1]) ? 100 : 1) * (/%$/ [v](t[1]) ? 255 : 1),
					r = parseInt(t[2], 10) / (/%$/ [v](t[2]) ? 100 : 1) * (/%$/ [v](t[2]) ? 255 : 1),
					i = parseInt(t[3], 10) / (/%$/ [v](t[3]) ? 100 : 1) * (/%$/ [v](t[3]) ? 255 : 1);
				return [parseInt(n, 10), parseInt(r, 10), parseInt(i, 10), t[4] ? parseFloat(t[4]) : 1]
			}
		}, y[t].fromRgba = b.fromRgb, y[t].fromHsl = function(e) {
			return b[d](b[o](e))
		}, y[t][o] = function(e) {
			var t = e.match(b.reHSLa);
			if (!t) return;
			var n = (parseFloat(t[1]) % 360 + 360) % 360 / 360,
				r = parseFloat(t[2]) / (/%$/ [v](t[2]) ? 100 : 1),
				i = parseFloat(t[3]) / (/%$/ [v](t[3]) ? 100 : 1),
				s, o, a;
			if (r === 0) s = o = a = i;
			else {
				var f = i <= .5 ? i * (r + 1) : i + r - i * r,
					l = i * 2 - f;
				s = w(l, f, n + 1 / 3), o = w(l, f, n), a = w(l, f, n - 1 / 3)
			}
			return [Math[u](s * 255), Math[u](o * 255), Math[u](a * 255), t[4] ? parseFloat(t[4]) : 1]
		}, y[t].fromHsla = b.fromHsl, y[t].fromHex = function(e) {
			return b[d](b[i](e))
		}, y[t][i] = function(e) {
			if (e.match(b.reHex)) {
				var t = e.slice(e.indexOf("#") + 1),
					n = t[h] === 3,
					r = n ? t[m](0) + t[m](0) : t[g](0, 2),
					i = n ? t[m](1) + t[m](1) : t[g](2, 4),
					s = n ? t[m](2) + t[m](2) : t[g](4, 6);
				return [parseInt(r, 16), parseInt(i, 16), parseInt(s, 16), 1]
			}
		}, y[t][d] = function(e) {
			var t = new b;
			return t[n](e), t
		}
	}(typeof exports != "undefined" ? exports : this),
	function() {
		"use strict";
		var e = "backgroundColor",
			t = "_objects",
			n = "overlayColor",
			r = "lowerCanvasEl",
			i = "renderAll",
			s = "backgroundImage",
			o = "overlayImage",
			u = "StaticCanvas",
			a = "includeDefaultValues",
			f = "height",
			l = "contextContainer",
			c = "isContainedWithinObject",
			h = "discardActiveGroup",
			p = "width",
			d = "contextTop",
			v = "clearContext",
			m = "getActiveGroup",
			g = "toObject",
			y = "getObjects",
			b = "undefined",
			w = null,
			E = "viewBox",
			S = "interactive",
			x = "getContext",
			T = "_setDimension",
			N = "upperCanvasEl",
			C = "_centerObject",
			k = "forEachObject",
			L = "util",
			A = "prototype",
			O = "style",
			M = !0,
			_ = "length",
			D = !1,
			P = "fire",
			H = "controlsAboveOverlay",
			B = "hasControls",
			j = "__setBgOverlayImage",
			F = "createCanvasElement",
			I = "__setBgOverlayColor",
			q = "discardActiveObject",
			R = "repeat",
			U = "toLive",
			z = "after:render",
			W = "render",
			X = "push",
			V = "hasBorders",
			$ = "_setSVGBgOverlayImage",
			J = "source",
			K = "_setSVGBgOverlayColor",
			Q = "_initCanvasElement",
			G = "px",
			Y = 'width="',
			Z = "offsetY",
			et = "offsetX",
			tt = "intersectsWithObject",
			nt = "getCenter",
			rt = "toDatalessObject",
			it = "toDataURL",
			st = "_groupSelector",
			ot = "getCenterPoint",
			ut = '" height="',
			at = "cacheCanvasEl",
			ft = "_toObjectMethod",
			lt = "getImageData",
			ct = "no-repeat",
			ht = "></rect>",
			pt = '" ',
			dt = "setActiveGroup",
			vt = "setLineDash";
		if (fabric[u]) {
			fabric.warn("fabric.StaticCanvas is already defined.");
			return
		}
		var mt = fabric[L].object.extend,
			gt = fabric[L].getElementOffset,
			yt = fabric[L].removeFromArray,
			bt = new Error("Could not initialize `canvas` element");
		fabric[u] = fabric[L].createClass({
			initialize: function(e, t) {
				t || (t = {}), this._initStatic(e, t), fabric[u].activeInstance = this
			},
			backgroundColor: "",
			backgroundImage: w,
			overlayColor: "",
			overlayImage: w,
			includeDefaultValues: M,
			stateful: M,
			renderOnAddRemove: M,
			clipTo: w,
			controlsAboveOverlay: D,
			allowTouchScrolling: D,
			onBeforeScaleRotate: function() {},
			_initStatic: function(r, u) {
				this[t] = [], this._createLowerCanvas(r), this._initOptions(u), u[o] && this.setOverlayImage(u[o], this[i].bind(this)), u[s] && this.setBackgroundImage(u[s], this[i].bind(this)), u[e] && this.setBackgroundColor(u[e], this[i].bind(this)), u[n] && this.setOverlayColor(u[n], this[i].bind(this)), this.calcOffset()
			},
			calcOffset: function() {
				return this._offset = gt(this[r]), this
			},
			setOverlayImage: function(e, t, n) {
				return this[j](o, e, t, n)
			},
			setBackgroundImage: function(e, t, n) {
				return this[j](s, e, t, n)
			},
			setOverlayColor: function(e, t) {
				return this[I](n, e, t)
			},
			setBackgroundColor: function(t, n) {
				return this[I](e, t, n)
			},
			__setBgOverlayImage: function(e, t, n, r) {
				return typeof t == "string" ? fabric[L].loadImage(t, function(t) {
					this[e] = new fabric.Image(t, r), n && n()
				}, this) : (this[e] = t, n && n()), this
			},
			__setBgOverlayColor: function(e, t, n) {
				if (t[J]) {
					var r = this;
					fabric[L].loadImage(t[J], function(i) {
						r[e] = new fabric.Pattern({
							source: i,
							repeat: t[R],
							offsetX: t[et],
							offsetY: t[Z]
						}), n && n()
					})
				} else this[e] = t, n && n();
				return this
			},
			_createCanvasElement: function() {
				var e = fabric.document.createElement("canvas");
				e[O] || (e[O] = {});
				if (!e) throw bt;
				return this[Q](e), e
			},
			_initCanvasElement: function(e) {
				fabric[L][F](e);
				if (typeof e[x] === b) throw bt
			},
			_initOptions: function(e) {
				for (var t in e) this[t] = e[t];
				this[p] = parseInt(this[r][p], 10) || 0, this[f] = parseInt(this[r][f], 10) || 0;
				if (!this[r][O]) return;
				this[r][O][p] = this[p] + G, this[r][O][f] = this[f] + G
			},
			_createLowerCanvas: function(e) {
				this[r] = fabric[L].getById(e) || this._createCanvasElement(), this[Q](this[r]), fabric[L].addClass(this[r], "lower-canvas"), this[S] && this._applyCanvasStyle(this[r]), this[l] = this[r][x]("2d")
			},
			getWidth: function() {
				return this[p]
			},
			getHeight: function() {
				return this[f]
			},
			setWidth: function(e) {
				return this[T](p, e)
			},
			setHeight: function(e) {
				return this[T](f, e)
			},
			setDimensions: function(e) {
				for (var t in e) this[T](t, e[t]);
				return this
			},
			_setDimension: function(e, t) {
				return this[r][e] = t, this[r][O][e] = t + G, this[N] && (this[N][e] = t, this[N][O][e] = t + G), this[at] && (this[at][e] = t), this.wrapperEl && (this.wrapperEl[O][e] = t + G), this[e] = t, this.calcOffset(), this[i](), this
			},
			getElement: function() {
				return this[r]
			},
			getActiveObject: function() {
				return w
			},
			getActiveGroup: function() {
				return w
			},
			_draw: function(e, t) {
				if (!t) return;
				if (this[H]) {
					var n = t[V],
						r = t[B];
					t[V] = t[B] = D, t[W](e), t[V] = n, t[B] = r
				} else t[W](e)
			},
			_onObjectAdded: function(e) {
				this.stateful && e.setupState(), e.setCoords(), e.canvas = this, this[P]("object:added", {
					target: e
				}), e[P]("added")
			},
			_onObjectRemoved: function(e) {
				this.getActiveObject() === e && (this[P]("before:selection:cleared", {
					target: e
				}), this._discardActiveObject(), this[P]("selection:cleared")), this[P]("object:removed", {
					target: e
				}), e[P]("removed")
			},
			clearContext: function(e) {
				return e.clearRect(0, 0, this[p], this[f]), this
			},
			getContext: function() {
				return this[l]
			},
			clear: function() {
				return this[t][_] = 0, this[h] && this[h](), this[q] && this[q](), this[v](this[l]), this[d] && this[v](this[d]), this[P]("canvas:cleared"), this[i](), this
			},
			renderAll: function(e) {
				var t = this[e === M && this[S] ? d : l],
					n = this[m]();
				return this[d] && this.selection && !this[st] && this[v](this[d]), e || this[v](t), this[P]("before:render"), this.clipTo && fabric[L].clipContext(this, t), this._renderBackground(t), this._renderObjects(t, n), this._renderActiveGroup(t, n), this.clipTo && t.restore(), this._renderOverlay(t), this[H] && this[S] && this.drawControls(t), this[P](z), this
			},
			_renderObjects: function(e, n) {
				for (var r = 0, i = this[t][_]; r < i; ++r)(!n || n && this[t][r] && !n.contains(this[t][r])) && this._draw(e, this[t][r])
			},
			_renderActiveGroup: function(e, t) {
				if (t) {
					var n = [];
					this[k](function(e) {
						t.contains(e) && n[X](e)
					}), t._set("objects", n), this._draw(e, t)
				}
			},
			_renderBackground: function(t) {
				this[e] && (t.fillStyle = this[e][U] ? this[e][U](t) : this[e], t.fillRect(this[e][et] || 0, this[e][Z] || 0, this[p], this[f])), this[s] && this[s][W](t)
			},
			_renderOverlay: function(e) {
				this[n] && (e.fillStyle = this[n][U] ? this[n][U](e) : this[n], e.fillRect(this[n][et] || 0, this[n][Z] || 0, this[p], this[f])), this[o] && this[o][W](e)
			},
			renderTop: function() {
				var e = this[d] || this[l];
				this[v](e), this.selection && this[st] && this._drawSelection();
				var t = this[m]();
				return t && t[W](e), this[o] && e.drawImage(this[o], this.overlayImageLeft, this.overlayImageTop), this[P](z), this
			},
			getCenter: function() {
				return {
					top: this.getHeight() / 2,
					left: this.getWidth() / 2
				}
			},
			centerObjectH: function(e) {
				return this[C](e, new fabric.Point(this[nt]().left, e[ot]().y)), this[i](), this
			},
			centerObjectV: function(e) {
				return this[C](e, new fabric.Point(e[ot]().x, this[nt]().top)), this[i](), this
			},
			centerObject: function(e) {
				var t = this[nt]();
				return this[C](e, new fabric.Point(t.left, t.top)), this[i](), this
			},
			_centerObject: function(e, t) {
				return e.setPositionByOrigin(t, "center", "center"), this
			},
			toDatalessJSON: function(e) {
				return this[rt](e)
			},
			toObject: function(e) {
				return this[ft](g, e)
			},
			toDatalessObject: function(e) {
				return this[ft](rt, e)
			},
			_toObjectMethod: function(e, t) {
				var n = this[m]();
				n && this[h]();
				var r = {
					objects: this._toObjects(e, t)
				};
				return mt(r, this.__serializeBgOverlay()), fabric[L].populateWithProperties(this, r, t), n && (this[dt](new fabric.Group(n[y]())), n[k](function(e) {
					e.set("active", M)
				})), r
			},
			_toObjects: function(e, t) {
				return this[y]().map(function(n) {
					return this._toObject(n, e, t)
				}, this)
			},
			_toObject: function(e, t, n) {
				var r;
				this[a] || (r = e[a], e[a] = D);
				var i = e[t](n);
				return this[a] || (e[a] = r), i
			},
			__serializeBgOverlay: function() {
				var t = {
					background: this[e] && this[e][g] ? this[e][g]() : this[e]
				};
				return this[n] && (t.overlay = this[n][g] ? this[n][g]() : this[n]), this[s] && (t[s] = this[s][g]()), this[o] && (t[o] = this[o][g]()), t
			},
			toSVG: function(t, r) {
				t || (t = {});
				var i = [];
				return this._setSVGPreamble(i, t), this._setSVGHeader(i, t), this[K](i, e), this[$](i, s), this._setSVGObjects(i, r), this[K](i, n), this[$](i, o), i[X]("</svg>"), i.join("")
			},
			_setSVGPreamble: function(e, t) {
				t.suppressPreamble || e[X]('<?xml version="1.0" encoding="', t.encoding || "UTF-8", '" standalone="no" ?>', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n')
			},
			_setSVGHeader: function(t, n) {
				t[X]("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', Y, n[E] ? n[E][p] : this[p], pt, 'height="', n[E] ? n[E][f] : this[f], pt, this[e] && !this[e][U] ? 'style="background-color: ' + this[e] + pt : w, n[E] ? 'viewBox="' + n[E].x + " " + n[E].y + " " + n[E][p] + " " + n[E][f] + pt : w, 'xml:space="preserve">', "<desc>Created with Fabric.js ", fabric.version, "</desc>", "<defs>", fabric.createSVGFontFacesMarkup(this[y]()), fabric.createSVGRefElementsMarkup(this), "</defs>")
			},
			_setSVGObjects: function(e, t) {
				var n = this[m]();
				n && this[h]();
				for (var r = 0, i = this[y](), s = i[_]; r < s; r++) e[X](i[r].toSVG(t));
				n && (this[dt](new fabric.Group(n[y]())), n[k](function(e) {
					e.set("active", M)
				}))
			},
			_setSVGBgOverlayImage: function(e, t) {
				this[t] && this[t].toSVG && e[X](this[t].toSVG())
			},
			_setSVGBgOverlayColor: function(e, t) {
				this[t] && this[t][J] ? e[X]('<rect x="', this[t][et], '" y="', this[t][Z], pt, Y, this[t][R] === "repeat-y" || this[t][R] === ct ? this[t][J][p] : this[p], ut, this[t][R] === "repeat-x" || this[t][R] === ct ? this[t][J][f] : this[f], '" fill="url(#' + t + 'Pattern)"', ht) : this[t] && t === n && e[X]('<rect x="0" y="0" ', Y, this[p], ut, this[f], '" fill="', this[t], '"', ht)
			},
			sendToBack: function(e) {
				return yt(this[t], e), this[t].unshift(e), this[i] && this[i]()
			},
			bringToFront: function(e) {
				return yt(this[t], e), this[t][X](e), this[i] && this[i]()
			},
			sendBackwards: function(e, n) {
				var r = this[t].indexOf(e);
				if (r !== 0) {
					var s = this._findNewLowerIndex(e, r, n);
					yt(this[t], e), this[t].splice(s, 0, e), this[i] && this[i]()
				}
				return this
			},
			_findNewLowerIndex: function(e, n, r) {
				var i;
				if (r) {
					i = n;
					for (var s = n - 1; s >= 0; --s) {
						var o = e[tt](this[t][s]) || e[c](this[t][s]) || this[t][s][c](e);
						if (o) {
							i = s;
							break
						}
					}
				} else i = n - 1;
				return i
			},
			bringForward: function(e, n) {
				var r = this[t].indexOf(e);
				if (r !== this[t][_] - 1) {
					var s = this._findNewUpperIndex(e, r, n);
					yt(this[t], e), this[t].splice(s, 0, e), this[i] && this[i]()
				}
				return this
			},
			_findNewUpperIndex: function(e, n, r) {
				var i;
				if (r) {
					i = n;
					for (var s = n + 1; s < this[t][_]; ++s) {
						var o = e[tt](this[t][s]) || e[c](this[t][s]) || this[t][s][c](e);
						if (o) {
							i = s;
							break
						}
					}
				} else i = n + 1;
				return i
			},
			moveTo: function(e, n) {
				return yt(this[t], e), this[t].splice(n, 0, e), this[i] && this[i]()
			},
			dispose: function() {
				return this.clear(), this[S] && this.removeListeners(), this
			},
			toString: function() {
				return "#<fabric.Canvas (" + this.complexity() + "): " + "{ objects: " + this[y]()[_] + " }>"
			}
		}), mt(fabric[u][A], fabric.Observable), mt(fabric[u][A], fabric.Collection), mt(fabric[u][A], fabric.DataURLExporter), mt(fabric[u], {
			EMPTY_JSON: '{"objects": [], "background": "white"}',
			supports: function(e) {
				var t = fabric[L][F]();
				if (!t || !t[x]) return w;
				var n = t[x]("2d");
				if (!n) return w;
				switch (e) {
					case lt:
						return typeof n[lt] !== b;
					case vt:
						return typeof n[vt] !== b;
					case it:
						return typeof t[it] !== b;
					case "toDataURLWithQuality":
						try {
							return t[it]("image/jpeg", 0), M
						} catch (r) {}
						return D;
					default:
						return w
				}
			}
		}), fabric[u][A].toJSON = fabric[u][A][g]
	}(),
	function() {
		var e = "lastRenderedObjectWithControlsAboveOverlay",
			t = "_currentTransform",
			n = "upperCanvasEl",
			r = "originY",
			i = "originX",
			s = "scaleX",
			o = "getActiveGroup",
			u = "original",
			a = "scaleY",
			f = "_objects",
			l = "_activeObject",
			c = "selectionDashArray",
			h = "newScaleX",
			p = "newScaleY",
			d = "strokeWidth",
			v = "left",
			m = "center",
			g = "selection:cleared",
			y = !1,
			b = "containsPoint",
			w = "mouseYSign",
			E = "target",
			S = "transparentCorners",
			x = "mouseXSign",
			T = "bottom",
			N = "drawDashedLine",
			C = "_offset",
			k = "contextCache",
			L = "_findTargetCorner",
			A = "cacheCanvasEl",
			O = "active",
			M = "util",
			_ = "right",
			D = "top",
			P = "height",
			H = "width",
			B = "getPointer",
			j = "StaticCanvas",
			F = "lowerCanvasEl",
			I = "padding",
			q = "makeElementUnselectable",
			R = "lockUniScaling",
			U = "rotate",
			z = "action",
			W = "Canvas",
			X = "hasBorders",
			V = "object:selected",
			$ = "wrapperEl",
			J = "_createCanvasElement",
			K = "_discardActiveObject",
			Q = "_discardActiveGroup",
			G = "centeredRotation",
			Y = "perPixelTargetFind",
			Z = "crosshair",
			et = "length",
			tt = "centeredScaling",
			nt = "getActiveObject",
			rt = "prototype",
			it = "contextTop",
			st = "_groupSelector",
			ot = "selected",
			ut = "_drawControls",
			at = "relatedTarget",
			ft = fabric[M][B],
			lt = fabric[M].degreesToRadians,
			ct = fabric[M].radiansToDegrees,
			ht = Math.atan2,
			pt = Math.abs,
			dt = .5;
		fabric[W] = fabric[M].createClass(fabric[j], {
			initialize: function(e, t) {
				t || (t = {}), this._initStatic(e, t), this._initInteractive(), this._createCacheCanvas(), fabric[W].activeInstance = this
			},
			uniScaleTransform: y,
			centeredScaling: y,
			centeredRotation: y,
			interactive: !0,
			selection: !0,
			selectionColor: "rgba(100, 100, 255, 0.3)",
			selectionDashArray: [],
			selectionBorderColor: "rgba(255, 255, 255, 0.3)",
			selectionLineWidth: 1,
			hoverCursor: "move",
			moveCursor: "move",
			defaultCursor: "default",
			freeDrawingCursor: Z,
			rotationCursor: Z,
			containerClass: "canvas-container",
			perPixelTargetFind: y,
			targetFindTolerance: 0,
			skipTargetFind: y,
			_initInteractive: function() {
				this[t] = null, this[st] = null, this._initWrapperElement(), this._createUpperCanvas(), this._initEventListeners(), this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this), this.calcOffset()
			},
			_resetCurrentTransform: function(e) {
				var n = this[t];
				n[E].set({
					scaleX: n[u][s],
					scaleY: n[u][a],
					left: n[u][v],
					top: n[u][D]
				}), this._shouldCenterTransform(e, n[E]) ? n[z] === U ? this._setOriginToCenter(n[E]) : (n[i] !== m && (n[i] === _ ? n[x] = -1 : n[x] = 1), n[r] !== m && (n[r] === T ? n[w] = -1 : n[w] = 1), n[i] = m, n[r] = m) : (n[i] = n[u][i], n[r] = n[u][r])
			},
			containsPoint: function(e, t) {
				var n = this[B](e),
					r = this._normalizePointer(t, n);
				return t[b](r) || t[L](e, this[C])
			},
			_normalizePointer: function(e, t) {
				var n = this[o](),
					r = t.x,
					i = t.y,
					s = n && e.type !== "group" && n.contains(e);
				return s && (r -= n[v], i -= n[D]), {
					x: r,
					y: i
				}
			},
			isTargetTransparent: function(e, t, n) {
				var r = e[X],
					i = e[S];
				e[X] = e[S] = y, this._draw(this[k], e), e[X] = r, e[S] = i;
				var s = fabric[M].isTransparent(this[k], t, n, this.targetFindTolerance);
				return this.clearContext(this[k]), s
			},
			_shouldClearSelection: function(e, t) {
				var n = this[o](),
					r = this[nt]();
				return !t || t && n && !n.contains(t) && n !== t && !e.shiftKey || t && !t.evented || t && !t.selectable && r && r !== t
			},
			_shouldCenterTransform: function(e, n) {
				if (!n) return;
				var r = this[t],
					i;
				return r[z] === "scale" || r[z] === s || r[z] === a ? i = this[tt] || n[tt] : r[z] === U && (i = this[G] || n[G]), i ? !e.altKey : e.altKey
			},
			_getOriginFromCorner: function(e, t) {
				var n = {
					x: e[i],
					y: e[r]
				};
				if (t === "ml" || t === "tl" || t === "bl") n.x = _;
				else if (t === "mr" || t === "tr" || t === "br") n.x = v;
				if (t === "tl" || t === "mt" || t === "tr") n.y = T;
				else if (t === "bl" || t === "mb" || t === "br") n.y = D;
				return n
			},
			_getActionFromCorner: function(e, t) {
				var n = "drag";
				return t && (n = t === "ml" || t === "mr" ? s : t === "mt" || t === "mb" ? a : t === "mtr" ? U : "scale"), n
			},
			_setupCurrentTransform: function(e, r) {
				if (!r) return;
				var i = r[L](e, this[C]),
					o = ft(e, r.canvas[n]),
					f = this._getActionFromCorner(r, i),
					l = this._getOriginFromCorner(r, i);
				this[t] = {
					target: r,
					action: f,
					scaleX: r[s],
					scaleY: r[a],
					offsetX: o.x - r[v],
					offsetY: o.y - r[D],
					originX: l.x,
					originY: l.y,
					ex: o.x,
					ey: o.y,
					left: r[v],
					top: r[D],
					theta: lt(r.angle),
					width: r[H] * r[s],
					mouseXSign: 1,
					mouseYSign: 1
				}, this[t][u] = {
					left: r[v],
					top: r[D],
					scaleX: r[s],
					scaleY: r[a],
					originX: l.x,
					originY: l.y
				}, this._resetCurrentTransform(e)
			},
			_translateObject: function(e, n) {
				var r = this[t][E];
				r.get("lockMovementX") || r.set(v, e - this[t].offsetX), r.get("lockMovementY") || r.set(D, n - this[t].offsetY)
			},
			_scaleObject: function(e, n, s) {
				var o = this[t],
					u = this[C],
					a = o[E],
					f = a.get("lockScalingX"),
					l = a.get("lockScalingY");
				if (f && l) return;
				var c = a.translateToOriginPoint(a.getCenterPoint(), o[i], o[r]),
					h = a.toLocalPoint(new fabric.Point(e - u[v], n - u[D]), o[i], o[r]);
				this._setLocalMouse(h, o), this._setObjectScale(h, o, f, l, s), a.setPositionByOrigin(c, o[i], o[r])
			},
			_setObjectScale: function(e, t, n, r, i) {
				var o = t[E];
				t[h] = o[s], t[p] = o[a], i === "equally" && !n && !r ? this._scaleObjectEqually(e, o, t) : i ? i === "x" && !o.get(R) ? (t[h] = e.x / (o[H] + o[d]), n || o.set(s, t[h])) : i === "y" && !o.get(R) && (t[p] = e.y / (o[P] + o[d]), r || o.set(a, t[p])) : (t[h] = e.x / (o[H] + o[d]), t[p] = e.y / (o[P] + o[d]), n || o.set(s, t[h]), r || o.set(a, t[p])), this._flipObject(t)
			},
			_scaleObjectEqually: function(e, t, n) {
				var r = e.y + e.x,
					i = (t[P] + t[d]) * n[u][a] + (t[H] + t[d]) * n[u][s];
				n[h] = n[u][s] * r / i, n[p] = n[u][a] * r / i, t.set(s, n[h]), t.set(a, n[p])
			},
			_flipObject: function(e) {
				e[h] < 0 && (e[i] === v ? e[i] = _ : e[i] === _ && (e[i] = v)), e[p] < 0 && (e[r] === D ? e[r] = T : e[r] === T && (e[r] = D))
			},
			_setLocalMouse: function(e, t) {
				var n = t[E];
				t[i] === _ ? e.x *= -1 : t[i] === m && (e.x *= t[x] * 2, e.x < 0 && (t[x] = -t[x])), t[r] === T ? e.y *= -1 : t[r] === m && (e.y *= t[w] * 2, e.y < 0 && (t[w] = -t[w])), pt(e.x) > n[I] ? e.x < 0 ? e.x += n[I] : e.x -= n[I] : e.x = 0, pt(e.y) > n[I] ? e.y < 0 ? e.y += n[I] : e.y -= n[I] : e.y = 0
			},
			_rotateObject: function(e, n) {
				var r = this[t],
					i = this[C];
				if (r[E].get("lockRotation")) return;
				var s = ht(r.ey - r[D] - i[D], r.ex - r[v] - i[v]),
					o = ht(n - r[D] - i[D], e - r[v] - i[v]),
					u = ct(o - s + r.theta);
				u < 0 && (u = 360 + u), r[E].angle = u
			},
			_setCursor: function(e) {
				this[n].style.cursor = e
			},
			_resetObjectTransform: function(e) {
				e[s] = 1, e[a] = 1, e.setAngle(0)
			},
			_drawSelection: function() {
				var e = this[it],
					t = this[st],
					n = t[v],
					r = t[D],
					i = pt(n),
					s = pt(r);
				e.fillStyle = this.selectionColor, e.fillRect(t.ex - (n > 0 ? 0 : -n), t.ey - (r > 0 ? 0 : -r), i, s), e.lineWidth = this.selectionLineWidth, e.strokeStyle = this.selectionBorderColor;
				if (this[c][et] > 1) {
					var o = t.ex + dt - (n > 0 ? 0 : i),
						u = t.ey + dt - (r > 0 ? 0 : s);
					e.beginPath(), fabric[M][N](e, o, u, o + i, u, this[c]), fabric[M][N](e, o, u + s - 1, o + i, u + s - 1, this[c]), fabric[M][N](e, o, u, o, u + s, this[c]), fabric[M][N](e, o + i - 1, u, o + i - 1, u + s, this[c]), e.closePath(), e.stroke()
				} else e.strokeRect(t.ex + dt - (n > 0 ? 0 : i), t.ey + dt - (r > 0 ? 0 : s), i, s)
			},
			_isLastRenderedObject: function(t) {
				return this.controlsAboveOverlay && this[e] && this[e].visible && this[b](t, this[e]) && this[e][L](t, this[C])
			},
			findTarget: function(t, n) {
				if (this.skipTargetFind) return;
				if (this._isLastRenderedObject(t)) return this[e];
				var r = this[o]();
				return r && !n && this[b](t, r) ? r : this._searchPossibleTargets(t)
			},
			_searchPossibleTargets: function(e) {
				var t = [],
					n, r = this[B](e);
				for (var i = this[f][et]; i--;)
					if (this[f][i] && this[f][i].visible && this[f][i].evented && this[b](e, this[f][i])) {
						if (!this[Y] && !this[f][i][Y]) {
							n = this[f][i], this[at] = n;
							break
						}
						t[t[et]] = this[f][i]
					}
				for (var s = 0, o = t[et]; s < o; s++) {
					r = this[B](e);
					var u = this.isTargetTransparent(t[s], r.x, r.y);
					if (!u) {
						n = t[s], this[at] = n;
						break
					}
				}
				return n
			},
			getPointer: function(e) {
				var t = ft(e, this[n]);
				return {
					x: t.x - this[C][v],
					y: t.y - this[C][D]
				}
			},
			_createUpperCanvas: function() {
				var e = this[F].className.replace(/\s*lower-canvas\s*/, "");
				this[n] = this[J](), fabric[M].addClass(this[n], "upper-canvas " + e), this[$].appendChild(this[n]), this._copyCanvasStyle(this[F], this[n]), this._applyCanvasStyle(this[n]), this[it] = this[n].getContext("2d")
			},
			_createCacheCanvas: function() {
				this[A] = this[J](), this[A].setAttribute(H, this[H]), this[A].setAttribute(P, this[P]), this[k] = this[A].getContext("2d")
			},
			_initWrapperElement: function() {
				this[$] = fabric[M].wrapElement(this[F], "div", {
					"class": this.containerClass
				}), fabric[M].setStyle(this[$], {
					width: this.getWidth() + "px",
					height: this.getHeight() + "px",
					position: "relative"
				}), fabric[M][q](this[$])
			},
			_applyCanvasStyle: function(e) {
				var t = this.getWidth() || e[H],
					n = this.getHeight() || e[P];
				fabric[M].setStyle(e, {
					position: "absolute",
					width: t + "px",
					height: n + "px",
					left: 0,
					top: 0
				}), e[H] = t, e[P] = n, fabric[M][q](e)
			},
			_copyCanvasStyle: function(e, t) {
				t.style.cssText = e.style.cssText
			},
			getSelectionContext: function() {
				return this[it]
			},
			getSelectionElement: function() {
				return this[n]
			},
			_setActiveObject: function(e) {
				this[l] && this[l].set(O, y), this[l] = e, e.set(O, !0)
			},
			setActiveObject: function(e, t) {
				return this._setActiveObject(e), this.renderAll(), this.fire(V, {
					target: e,
					e: t
				}), e.fire(ot, {
					e: t
				}), this
			},
			getActiveObject: function() {
				return this[l]
			},
			_discardActiveObject: function() {
				this[l] && this[l].set(O, y), this[l] = null
			},
			discardActiveObject: function(e) {
				return this[K](), this.renderAll(), this.fire(g, {
					e: e
				}), this
			},
			_setActiveGroup: function(e) {
				this._activeGroup = e, e && (e.canvas = this, e.set(O, !0))
			},
			setActiveGroup: function(e, t) {
				return this._setActiveGroup(e), e && (this.fire(V, {
					target: e,
					e: t
				}), e.fire(ot, {
					e: t
				})), this
			},
			getActiveGroup: function() {
				return this._activeGroup
			},
			_discardActiveGroup: function() {
				var e = this[o]();
				e && e.destroy(), this.setActiveGroup(null)
			},
			discardActiveGroup: function(e) {
				return this[Q](), this.fire(g, {
					e: e
				}), this
			},
			deactivateAll: function() {
				var e = this.getObjects(),
					t = 0,
					n = e[et];
				for (; t < n; t++) e[t].set(O, y);
				return this[Q](), this[K](), this
			},
			deactivateAllWithDispatch: function(e) {
				var t = this[o]() || this[nt]();
				return t && this.fire("before:selection:cleared", {
					target: t,
					e: e
				}), this.deactivateAll(), t && this.fire(g, {
					e: e
				}), this
			},
			drawControls: function(e) {
				var t = this[o]();
				t ? this._drawGroupControls(e, t) : this._drawObjectsControls(e)
			},
			_drawGroupControls: function(e, t) {
				this[ut](e, t, "Group")
			},
			_drawObjectsControls: function(t) {
				for (var n = 0, r = this[f][et]; n < r; ++n) {
					if (!this[f][n] || !this[f][n][O]) continue;
					this[ut](t, this[f][n], "Object"), this[e] = this[f][n]
				}
			},
			_drawControls: function(e, t, n) {
				e.save(), fabric[n][rt].transform.call(t, e), t.drawBorders(e).drawControls(e), e.restore()
			}
		});
		for (var vt in fabric[j]) vt !== rt && (fabric[W][vt] = fabric[j][vt]);
		fabric.isTouchSupported && (fabric[W][rt]._setCursorFromEvent = function() {}), fabric.Element = fabric[W]
	}(),
	function() {
		var e = "upperCanvasEl",
			t = "_currentTransform",
			n = "_onMouseMove",
			r = "_previousOriginY",
			i = "_previousOriginX",
			s = "mousemove",
			o = "_onOrientationChange",
			u = "touchmove",
			a = "_isCurrentlyDrawing",
			f = "_onMouseDown",
			l = "document",
			c = "_previousPointer",
			h = "_onMouseUp",
			p = "getActiveGroup",
			d = "_setCursorFromEvent",
			v = "_onMouseWheel",
			m = "target",
			g = "getPointer",
			y = "center",
			b = "_findTargetCorner",
			w = "_scaleObject",
			E = "freeDrawingBrush",
			S = "_onGesture",
			x = "_groupSelector",
			T = "fire",
			N = "mousedown",
			C = !1,
			k = "isDrawingMode",
			L = "_onResize",
			A = "renderAll",
			O = "getCenterPoint",
			M = "mouseup",
			_ = "__onOrientationChange",
			D = "selectable",
			P = "remove",
			H = "__onTransformGesture",
			B = "originY",
			j = "originX",
			F = "_onShake",
			I = "currentAction",
			q = "defaultCursor",
			R = "translateToOriginPoint",
			U = "_resetCurrentTransform",
			z = "scale",
			W = "bind",
			X = "findTarget",
			V = "cursor",
			$ = "orientation",
			J = "_onDrag",
			K = "scaling",
			Q = !0,
			G = "mousewheel",
			Y = "touchstart",
			Z = "undefined",
			et = "getActiveObject",
			tt = "mouse:up",
			nt = "isMoving",
			rt = "preventDefault",
			it = "__onMouseWheel",
			st = "touchend",
			ot = "_shouldRender",
			ut = "mouse:down",
			at = "gesture",
			ft = "mouse:move",
			lt = "_offset",
			ct = "setActiveObject",
			ht = ["n-resize", "ne-resize", "e-resize", "se-resize", "s-resize", "sw-resize", "w-resize", "nw-resize"],
			pt = {
				mt: 0,
				tr: 1,
				mr: 2,
				br: 3,
				mb: 4,
				bl: 5,
				ml: 6,
				tl: 7
			},
			dt = fabric.util.addListener,
			vt = fabric.util.removeListener,
			mt = fabric.util[g];
		fabric.util.object.extend(fabric.Canvas.prototype, {
			_initEventListeners: function() {
				this._bindEvents(), dt(fabric.window, "resize", this[L]), dt(this[e], N, this[f]), dt(this[e], s, this[n]), dt(this[e], G, this[v]), dt(this[e], Y, this[f]), dt(this[e], u, this[n]), typeof Event !== Z && "add" in Event && (Event.add(this[e], at, this[S]), Event.add(this[e], "drag", this[J]), Event.add(this[e], $, this[o]), Event.add(this[e], "shake", this[F]))
			},
			_bindEvents: function() {
				this[f] = this[f][W](this), this[n] = this[n][W](this), this[h] = this[h][W](this), this[L] = this[L][W](this), this[S] = this[S][W](this), this[J] = this[J][W](this), this[F] = this[F][W](this), this[o] = this[o][W](this), this[v] = this[v][W](this)
			},
			removeListeners: function() {
				vt(fabric.window, "resize", this[L]), vt(this[e], N, this[f]), vt(this[e], s, this[n]), vt(this[e], G, this[v]), vt(this[e], Y, this[f]), vt(this[e], u, this[n]), typeof Event !== Z && P in Event && (Event[P](this[e], at, this[S]), Event[P](this[e], "drag", this[J]), Event[P](this[e], $, this[o]), Event[P](this[e], "shake", this[F]))
			},
			_onGesture: function(e, t) {
				this[H] && this[H](e, t)
			},
			_onDrag: function(e, t) {
				this.__onDrag && this.__onDrag(e, t)
			},
			_onMouseWheel: function(e, t) {
				this[it] && this[it](e, t)
			},
			_onOrientationChange: function(e, t) {
				this[_] && this[_](e, t)
			},
			_onShake: function(e, t) {
				this.__onShake && this.__onShake(e, t)
			},
			_onMouseDown: function(t) {
				this.__onMouseDown(t), dt(fabric[l], M, this[h]), dt(fabric[l], st, this[h]), dt(fabric[l], s, this[n]), dt(fabric[l], u, this[n]), vt(this[e], s, this[n]), vt(this[e], u, this[n])
			},
			_onMouseUp: function(t) {
				this.__onMouseUp(t), vt(fabric[l], M, this[h]), vt(fabric[l], st, this[h]), vt(fabric[l], s, this[n]), vt(fabric[l], u, this[n]), dt(this[e], s, this[n]), dt(this[e], u, this[n])
			},
			_onMouseMove: function(e) {
				!this.allowTouchScrolling && e[rt] && e[rt](), this.__onMouseMove(e)
			},
			_onResize: function() {
				this.calcOffset()
			},
			_shouldRender: function(e, t) {
				var n = this[p]() || this[et]();
				return !!(e && (e[nt] || e !== n) || !e && !!n || !e && !n && !this[x] || t && this[c] && this.selection && (t.x !== this[c].x || t.y !== this[c].y))
			},
			__onMouseUp: function(e) {
				var n;
				if (this[k] && this[a]) {
					this._onMouseUpInDrawingMode(e);
					return
				}
				this[t] ? (this._finalizeCurrentTransform(), n = this[t][m]) : n = this[X](e, Q);
				var r = this[ot](n, this[g](e));
				this._maybeGroupObjects(e), n && (n[nt] = C), r && this[A](), this._handleCursorAndEvent(e, n)
			},
			_handleCursorAndEvent: function(e, t) {
				this[d](e, t);
				var n = this;
				setTimeout(function() {
					n[d](e, t)
				}, 50), this[T](tt, {
					target: t,
					e: e
				}), t && t[T](M, {
					e: e
				})
			},
			_finalizeCurrentTransform: function() {
				var e = this[t],
					n = e[m];
				n._scaling && (n._scaling = C), n.setCoords(), this.stateful && n.hasStateChanged() && (this[T]("object:modified", {
					target: n
				}), n[T]("modified")), this._restoreOriginXY(n)
			},
			_restoreOriginXY: function(e) {
				if (this[i] && this[r]) {
					var t = e[R](e[O](), this[i], this[r]);
					e[j] = this[i], e[B] = this[r], e.left = t.x, e.top = t.y, this[i] = null, this[r] = null
				}
			},
			_onMouseDownInDrawingMode: function(e) {
				this[a] = Q, this.discardActiveObject(e)[A](), this.clipTo && fabric.util.clipContext(this, this.contextTop), this[E].onMouseDown(this[g](e)), this[T](ut, {
					e: e
				})
			},
			_onMouseMoveInDrawingMode: function(t) {
				if (this[a]) {
					var n = this[g](t);
					this[E].onMouseMove(n)
				}
				this[e].style[V] = this.freeDrawingCursor, this[T](ft, {
					e: t
				})
			},
			_onMouseUpInDrawingMode: function(e) {
				this[a] = C, this.clipTo && this.contextTop.restore(), this[E].onMouseUp(), this[T](tt, {
					e: e
				})
			},
			__onMouseDown: function(e) {
				var n = "which" in e ? e.which === 1 : e.button === 1;
				if (!n && !fabric.isTouchSupported) return;
				if (this[k]) {
					this._onMouseDownInDrawingMode(e);
					return
				}
				if (this[t]) return;
				var r = this[X](e),
					i = this[g](e);
				this[c] = i;
				var s = this[ot](r, i),
					o = this._shouldGroup(e, r);
				this._shouldClearSelection(e, r) ? this._clearSelection(e, r, i) : o && (this._handleGrouping(e, r), r = this[p]()), r && r[D] && !o && (this._beforeTransform(e, r), this._setupCurrentTransform(e, r)), s && this[A](), this[T](ut, {
					target: r,
					e: e
				}), r && r[T](N, {
					e: e
				})
			},
			_beforeTransform: function(e, t) {
				var n;
				this.stateful && t.saveState(), (n = t[b](e, this[lt])) && this.onBeforeScaleRotate(t), t !== this[p]() && t !== this[et]() && (this.deactivateAll(), this[ct](t, e))
			},
			_clearSelection: function(e, t, n) {
				this.deactivateAllWithDispatch(e), t && t[D] ? this[ct](t, e) : this.selection && (this[x] = {
					ex: n.x,
					ey: n.y,
					top: 0,
					left: 0
				})
			},
			_setOriginToCenter: function(e) {
				this[i] = this[t][m][j], this[r] = this[t][m][B];
				var n = e[O]();
				e[j] = y, e[B] = y, e.left = n.x, e.top = n.y, this[t].left = e.left, this[t].top = e.top
			},
			_setCenterToOrigin: function(e) {
				var t = e[R](e[O](), this[i], this[r]);
				e[j] = this[i], e[B] = this[r], e.left = t.x, e.top = t.y, this[i] = null, this[r] = null
			},
			__onMouseMove: function(n) {
				var r, i;
				if (this[k]) {
					this._onMouseMoveInDrawingMode(n);
					return
				}
				var o = this[x];
				o ? (i = mt(n, this[e]), o.left = i.x - this[lt].left - o.ex, o.top = i.y - this[lt].top - o.ey, this.renderTop()) : this[t] ? this._transformObject(n) : (r = this[X](n), !r || r && !r[D] ? this[e].style[V] = this[q] : this[d](n, r)), this[T](ft, {
					target: r,
					e: n
				}), r && r[T](s, {
					e: n
				})
			},
			_transformObject: function(n) {
				var r = mt(n, this[e]),
					i = this[t];
				i.reset = C, i[m][nt] = Q, this._beforeScaleTransform(n, i), this._performTransformAction(n, i, r), this[A]()
			},
			_performTransformAction: function(e, t, n) {
				var r = n.x,
					i = n.y,
					s = t[m],
					o = t.action;
				o === "rotate" ? (this._rotateObject(r, i), this._fire("rotating", s, e)) : o === z ? (this._onScale(e, t, r, i), this._fire(K, s, e)) : o === "scaleX" ? (this[w](r, i, "x"), this._fire(K, s, e)) : o === "scaleY" ? (this[w](r, i, "y"), this._fire(K, s, e)) : (this._translateObject(r, i), this._fire("moving", s, e), this._setCursor(this.moveCursor))
			},
			_fire: function(e, t, n) {
				this[T]("object:" + e, {
					target: t,
					e: n
				}), t[T](e, {
					e: n
				})
			},
			_beforeScaleTransform: function(e, t) {
				if (t.action === z || t.action === "scaleX" || t.action === "scaleY") {
					var n = this._shouldCenterTransform(e, t[m]);
					if (n && (t[j] !== y || t[B] !== y) || !n && t[j] === y && t[B] === y) this[U](e), t.reset = Q
				}
			},
			_onScale: function(e, t, n, r) {
				(e.shiftKey || this.uniScaleTransform) && !t[m].get("lockUniScaling") ? (t[I] = z, this[w](n, r)) : (!t.reset && t[I] === z && this[U](e, t[m]), t[I] = "scaleEqually", this[w](n, r, "equally"))
			},
			_setCursorFromEvent: function(t, n) {
				var r = this[e].style;
				if (!n || !n[D]) return r[V] = this[q], C;
				var i = this[p](),
					s = n[b] && (!i || !i.contains(n)) && n[b](t, this[lt]);
				return s ? this._setCornerCursor(s, n) : r[V] = n.hoverCursor || this.hoverCursor, Q
			},
			_setCornerCursor: function(t, n) {
				var r = this[e].style;
				if (t in pt) r[V] = this._getRotatedCornerCursor(t, n);
				else {
					if (t !== "mtr" || !n.hasRotatingPoint) return r[V] = this[q], C;
					r[V] = this.rotationCursor
				}
			},
			_getRotatedCornerCursor: function(e, t) {
				var n = Math.round(t.getAngle() % 360 / 45);
				return n < 0 && (n += 8), n += pt[e], n %= 8, ht[n]
			}
		})
	}(),
	function() {
		var e = "getActiveGroup",
			t = !0,
			n = "_activeGroup",
			r = "saveCoords",
			i = "_resetObjectTransform",
			s = "active",
			o = "setActiveObject",
			u = "selection:created",
			a = "_activeObject",
			f = "setActiveGroup",
			l = null,
			c = "center",
			h = "length",
			p = "_groupSelector",
			d = "containsPoint",
			v = Math.min,
			m = Math.max;
		fabric.util.object.extend(fabric.Canvas.prototype, {
			_shouldGroup: function(t, n) {
				var r = this.getActiveObject();
				return t.shiftKey && (this[e]() || r && r !== n) && this.selection
			},
			_handleGrouping: function(i, s) {
				if (s === this[e]()) {
					s = this.findTarget(i, t);
					if (!s || s.isType("group")) return
				}
				this[e]() ? this._updateActiveGroup(s, i) : this._createActiveGroup(s, i), this[n] && this[n][r]()
			},
			_updateActiveGroup: function(n, r) {
				var a = this[e]();
				if (a.contains(n)) {
					a.removeWithUpdate(n), this[i](a), n.set(s, !1);
					if (a.size() === 1) {
						this.discardActiveGroup(r), this[o](a.item(0));
						return
					}
				} else a.addWithUpdate(n), this[i](a);
				this.fire(u, {
					target: a,
					e: r
				}), a.set(s, t)
			},
			_createActiveGroup: function(e, n) {
				if (this[a] && e !== this[a]) {
					var r = this._createGroup(e);
					this[f](r), this[a] = l, this.fire(u, {
						target: r,
						e: n
					})
				}
				e.set(s, t)
			},
			_createGroup: function(e) {
				var t = this.getObjects(),
					n = t.indexOf(this[a]) < t.indexOf(e),
					r = n ? [this[a], e] : [e, this[a]];
				return new fabric.Group(r, {
					originX: c,
					originY: c
				})
			},
			_groupSelectedObjects: function(e) {
				var t = this._collectObjects();
				t[h] === 1 ? this[o](t[0], e) : t[h] > 1 && (t = new fabric.Group(t.reverse(), {
					originX: c,
					originY: c
				}), this[f](t, e), t[r](), this.fire(u, {
					target: t
				}), this.renderAll())
			},
			_collectObjects: function() {
				var e = [],
					n, r = this[p].ex,
					i = this[p].ey,
					o = r + this[p].left,
					u = i + this[p].top,
					a = new fabric.Point(v(r, o), v(i, u)),
					f = new fabric.Point(m(r, o), m(i, u)),
					l = r === o && i === u;
				for (var c = this._objects[h]; c--;) {
					n = this._objects[c];
					if (!n || !n.selectable || !n.visible) continue;
					if (n.intersectsWithRect(a, f) || n.isContainedWithinRect(a, f) || n[d](a) || n[d](f)) {
						n.set(s, t), e.push(n);
						if (l) break
					}
				}
				return e
			},
			_maybeGroupObjects: function(t) {
				this.selection && this[p] && this._groupSelectedObjects(t);
				var n = this[e]();
				n && (n.setObjectsCoords().setCoords(), n.isMoving = !1, this._setCursor(this.defaultCursor)), this[p] = l, this._currentTransform = l
			}
		})
	}(), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
		toDataURL: function(e) {
			e || (e = {});
			var t = e.format || "png",
				n = e.quality || 1,
				r = e.multiplier || 1,
				i = {
					left: e.left,
					top: e.top,
					width: e.width,
					height: e.height
				};
			return r !== 1 ? this.__toDataURLWithMultiplier(t, n, i, r) : this.__toDataURL(t, n, i)
		},
		__toDataURL: function(e, t, n) {
			this.renderAll(!0);
			var r = this.upperCanvasEl || this.lowerCanvasEl,
				i = this.__getCroppedCanvas(r, n);
			e === "jpg" && (e = "jpeg");
			var s = fabric.StaticCanvas.supports("toDataURLWithQuality") ? (i || r).toDataURL("image/" + e, t) : (i || r).toDataURL("image/" + e);
			return this.contextTop && this.clearContext(this.contextTop), this.renderAll(), i && (i = null), s
		},
		__getCroppedCanvas: function(e, t) {
			var n = "width",
				r = "height",
				i, s, o = "left" in t || "top" in t || n in t || r in t;
			return o && (i = fabric.util.createCanvasElement(), s = i.getContext("2d"), i[n] = t[n] || this[n], i[r] = t[r] || this[r], s.drawImage(e, -t.left || 0, -t.top || 0)), i
		},
		__toDataURLWithMultiplier: function(e, t, n, r) {
			var i = "contextTop",
				s = "height",
				o = "deactivateAll",
				u = "setActiveObject",
				a = this.getWidth(),
				f = this.getHeight(),
				l = a * r,
				c = f * r,
				h = this.getActiveObject(),
				p = this.getActiveGroup(),
				d = this[i] || this.contextContainer;
			this.setWidth(l).setHeight(c), d.scale(r, r), n.left && (n.left *= r), n.top && (n.top *= r), n.width && (n.width *= r), n[s] && (n[s] *= r), p ? this._tempRemoveBordersControlsFromGroup(p) : h && this[o] && this[o](), this.renderAll(!0);
			var v = this.__toDataURL(e, t, n);
			return this.width = a, this[s] = f, d.scale(1 / r, 1 / r), this.setWidth(a).setHeight(f), p ? this._restoreBordersControlsOnGroup(p) : h && this[u] && this[u](h), this[i] && this.clearContext(this[i]), this.renderAll(), v
		},
		toDataURLWithMultiplier: function(e, t, n) {
			return this.toDataURL({
				format: e,
				multiplier: t,
				quality: n
			})
		},
		_tempRemoveBordersControlsFromGroup: function(e) {
			var t = "hasControls",
				n = "origBorderColor",
				r = "borderColor",
				i = "rgba(0,0,0,0)";
			e.origHasControls = e[t], e[n] = e[r], e[t] = !0, e[r] = i, e.forEachObject(function(e) {
				e[n] = e[r], e[r] = i
			})
		},
		_restoreBordersControlsOnGroup: function(e) {
			var t = "borderColor",
				n = "origBorderColor";
			e.hideControls = e.origHideControls, e[t] = e[n], e.forEachObject(function(e) {
				e[t] = e[n], delete e[n]
			})
		}
	}),
	function() {
		var e = "gesture",
			t = "_currentTransform",
			n = "target",
			r = "scaleX",
			i = "scaleY",
			s = "lockUniScaling",
			o = fabric.util.degreesToRadians,
			u = fabric.util.radiansToDegrees;
		fabric.util.object.extend(fabric.Canvas.prototype, {
			__onTransformGesture: function(t, n) {
				if (this.isDrawingMode || t.touches.length !== 2 || e !== n[e]) return;
				var r = this.findTarget(t);
				"undefined" != typeof r && (this.onBeforeScaleRotate(r), this._rotateObjectByAngle(n.rotation), this._scaleObjectBy(n.scale)), this.fire("touch:gesture", {
					target: r,
					e: t,
					self: n
				})
			},
			__onDrag: function(e, t) {
				this.fire("touch:drag", {
					e: e,
					self: t
				})
			},
			__onOrientationChange: function(e, t) {
				this.fire("touch:orientation", {
					e: e,
					self: t
				})
			},
			__onShake: function(e, t) {
				this.fire("touch:shake", {
					e: e,
					self: t
				})
			},
			_scaleObjectBy: function(e, o) {
				var u = this[t],
					f = u[n],
					l = f.get("lockScalingX"),
					c = f.get("lockScalingY");
				if (l && c) return;
				f._scaling = !0, o ? o === "x" && !f.get(s) ? l || f.set(r, u[r] * e) : o === "y" && !f.get(s) && (c || f.set(i, u[i] * e)) : (l || f.set(r, u[r] * e), c || f.set(i, u[i] * e))
			},
			_rotateObjectByAngle: function(e) {
				var r = this[t];
				if (r[n].get("lockRotation")) return;
				r[n].angle = u(o(e) + r.theta)
			}
		})
	}(),
	function(e) {
		"use strict";
		var t = "strokeDashArray",
			n = "stroke",
			r = "fill",
			i = "toObject",
			s = "shadow",
			o = !1,
			u = "Object",
			a = "height",
			f = "clipTo",
			l = !0,
			c = "width",
			h = "colorStops",
			p = "util",
			d = "_removeShadow",
			v = null,
			m = "prototype",
			g = "Pattern",
			y = "toLive",
			b = "scaleY",
			w = "scaleX",
			E = "NUM_FRACTION_DIGITS",
			S = "_renderDashedStroke",
			x = "canvas",
			T = "restore",
			N = "_stroke",
			C = "active",
			k = "strokeMiterLimit",
			L = "translate",
			A = "object",
			O = "transformMatrix",
			M = "backgroundColor",
			_ = "getCenterPoint",
			D = "strokeLineJoin",
			P = "setLineDash",
			H = "Gradient",
			B = "shadowOffsetX",
			j = "strokeLineCap",
			F = "shadowOffsetY",
			I = "type",
			q = "left",
			R = "set",
			U = "flipY",
			z = "strokeWidth",
			W = "shadowColor",
			X = "constructor",
			V = "flipX",
			$ = "group",
			J = "shadowBlur",
			K = "fromObject",
			Q = "format",
			G = "jpeg",
			Y = "top",
			Z = e.fabric || (e.fabric = {}),
			et = Z[p][A].extend,
			tt = Z[p].toFixed,
			nt = Z[p].string.capitalize,
			rt = Z[p].degreesToRadians,
			it = Z.StaticCanvas.supports(P);
		if (Z[u]) return;
		Z[u] = Z[p].createClass({
			type: A,
			originX: q,
			originY: Y,
			top: 0,
			left: 0,
			width: 0,
			height: 0,
			scaleX: 1,
			scaleY: 1,
			flipX: o,
			flipY: o,
			opacity: 1,
			angle: 0,
			cornerSize: 12,
			transparentCorners: l,
			hoverCursor: v,
			padding: 0,
			borderColor: "rgba(102,153,255,0.75)",
			cornerColor: "rgba(102,153,255,0.5)",
			centeredScaling: o,
			centeredRotation: l,
			fill: "rgb(0,0,0)",
			fillRule: "source-over",
			backgroundColor: "",
			stroke: v,
			strokeWidth: 1,
			strokeDashArray: v,
			strokeLineCap: "butt",
			strokeLineJoin: "miter",
			strokeMiterLimit: 10,
			shadow: v,
			borderOpacityWhenMoving: .4,
			borderScaleFactor: 1,
			transformMatrix: v,
			minScaleLimit: .01,
			selectable: l,
			evented: l,
			visible: l,
			hasControls: l,
			hasBorders: l,
			hasRotatingPoint: l,
			rotatingPointOffset: 40,
			perPixelTargetFind: o,
			includeDefaultValues: l,
			clipTo: v,
			lockMovementX: o,
			lockMovementY: o,
			lockRotation: o,
			lockScalingX: o,
			lockScalingY: o,
			lockUniScaling: o,
			stateProperties: "top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill fillRule shadow clipTo visible backgroundColor".split(" "),
			initialize: function(e) {
				e && this.setOptions(e)
			},
			_initGradient: function(e) {
				e[r] && e[r][h] && !(e[r] instanceof Z[H]) && this[R](r, new Z[H](e[r]))
			},
			_initPattern: function(e) {
				e[r] && e[r].source && !(e[r] instanceof Z[g]) && this[R](r, new Z[g](e[r])), e[n] && e[n].source && !(e[n] instanceof Z[g]) && this[R](n, new Z[g](e[n]))
			},
			_initClipping: function(e) {
				if (!e[f] || typeof e[f] != "string") return;
				var t = Z[p].getFunctionBody(e[f]);
				typeof t != "undefined" && (this[f] = new Function("ctx", t))
			},
			setOptions: function(e) {
				for (var t in e) this[R](t, e[t]);
				this._initGradient(e), this._initPattern(e), this._initClipping(e)
			},
			transform: function(e, t) {
				e.globalAlpha = this.opacity;
				var n = t ? this._getLeftTopCoords() : this[_]();
				e[L](n.x, n.y), e.rotate(rt(this.angle)), e.scale(this[w] * (this[V] ? -1 : 1), this[b] * (this[U] ? -1 : 1))
			},
			toObject: function(e) {
				var o = Z[u][E],
					l = {
						type: this[I],
						originX: this.originX,
						originY: this.originY,
						left: tt(this[q], o),
						top: tt(this[Y], o),
						width: tt(this[c], o),
						height: tt(this[a], o),
						fill: this[r] && this[r][i] ? this[r][i]() : this[r],
						stroke: this[n] && this[n][i] ? this[n][i]() : this[n],
						strokeWidth: tt(this[z], o),
						strokeDashArray: this[t],
						strokeLineCap: this[j],
						strokeLineJoin: this[D],
						strokeMiterLimit: tt(this[k], o),
						scaleX: tt(this[w], o),
						scaleY: tt(this[b], o),
						angle: tt(this.getAngle(), o),
						flipX: this[V],
						flipY: this[U],
						opacity: tt(this.opacity, o),
						shadow: this[s] && this[s][i] ? this[s][i]() : this[s],
						visible: this.visible,
						clipTo: this[f] && String(this[f]),
						backgroundColor: this[M]
					};
				return this.includeDefaultValues || (l = this._removeDefaultValues(l)), Z[p].populateWithProperties(this, l, e), l
			},
			toDatalessObject: function(e) {
				return this[i](e)
			},
			_removeDefaultValues: function(e) {
				var t = Z[p].getKlass(e[I])[m],
					n = t.stateProperties;
				return n.forEach(function(n) {
					e[n] === t[n] && delete e[n]
				}), e
			},
			toString: function() {
				return "#<fabric." + nt(this[I]) + ">"
			},
			get: function(e) {
				return this[e]
			},
			set: function(e, t) {
				if (typeof e === A)
					for (var n in e) this._set(n, e[n]);
				else typeof t == "function" && e !== f ? this._set(e, t(this.get(e))) : this._set(e, t);
				return this
			},
			_set: function(e, t) {
				var n = e === w || e === b;
				return n && (t = this._constrainScale(t)), e === w && t < 0 ? (this[V] = !this[V], t *= -1) : e === b && t < 0 ? (this[U] = !this[U], t *= -1) : e === c || e === a ? this.minScaleLimit = tt(Math.min(.1, 1 / Math.max(this[c], this[a])), 2) : e === s && t && !(t instanceof Z.Shadow) && (t = new Z.Shadow(t)), this[e] = t, this
			},
			toggle: function(e) {
				var t = this.get(e);
				return typeof t == "boolean" && this[R](e, !t), this
			},
			setSourcePath: function(e) {
				return this.sourcePath = e, this
			},
			render: function(e, t) {
				if (this[c] === 0 || this[a] === 0 || !this.visible) return;
				e.save(), this._transform(e, t), this._setStrokeStyles(e), this._setFillStyles(e);
				var n = this[O];
				n && this[$] && (e[L](-this[$][c] / 2, -this[$][a] / 2), e.transform(n[0], n[1], n[2], n[3], n[4], n[5])), this._setShadow(e), this[f] && Z[p].clipContext(this, e), this._render(e, t), this[f] && e[T](), this[d](e), this[C] && !t && (this.drawBorders(e), this.drawControls(e)), e[T]()
			},
			_transform: function(e, t) {
				var n = this[O];
				n && !this[$] && e.setTransform(n[0], n[1], n[2], n[3], n[4], n[5]), t || this.transform(e)
			},
			_setStrokeStyles: function(e) {
				this[n] && (e.lineWidth = this[z], e.lineCap = this[j], e.lineJoin = this[D], e.miterLimit = this[k], e.strokeStyle = this[n][y] ? this[n][y](e) : this[n])
			},
			_setFillStyles: function(e) {
				this[r] && (e.fillStyle = this[r][y] ? this[r][y](e) : this[r])
			},
			_setShadow: function(e) {
				if (!this[s]) return;
				e[W] = this[s].color, e[J] = this[s].blur, e[B] = this[s].offsetX, e[F] = this[s].offsetY
			},
			_removeShadow: function(e) {
				e[W] = "", e[J] = e[B] = e[F] = 0
			},
			_renderFill: function(e) {
				if (!this[r]) return;
				this[r][y] && (e.save(), e[L](-this[c] / 2 + this[r].offsetX || 0, -this[a] / 2 + this[r].offsetY || 0)), e[r](), this[r][y] && e[T](), this[s] && !this[s].affectStroke && this[d](e)
			},
			_renderStroke: function(e) {
				if (!this[n]) return;
				e.save(), this[t] ? (1 & this[t].length && this[t].push.apply(this[t], this[t]), it ? (e[P](this[t]), this[N] && this[N](e)) : this[S] && this[S](e), e[n]()) : this[N] ? this[N](e) : e[n](), this[d](e), e[T]()
			},
			clone: function(e, t) {
				return this[X][K] ? this[X][K](this[i](t), e) : new Z[u](this[i](t))
			},
			cloneAsImage: function(e) {
				var t = this.toDataURL();
				return Z[p].loadImage(t, function(t) {
					e && e(new Z.Image(t))
				}), this
			},
			toDataURL: function(e) {
				e || (e = {});
				var t = Z[p].createCanvasElement(),
					n = this.getBoundingRect();
				t[c] = n[c], t[a] = n[a], Z[p].wrapElement(t, "div");
				var r = new Z.Canvas(t);
				e[Q] === "jpg" && (e[Q] = G), e[Q] === G && (r[M] = "#fff");
				var i = {
					active: this.get(C),
					left: this.getLeft(),
					top: this.getTop()
				};
				this[R](C, o), this.setPositionByOrigin(new Z.Point(t[c] / 2, t[a] / 2), "center", "center");
				var s = this[x];
				r.add(this);
				var u = r.toDataURL(e);
				return this[R](i).setCoords(), this[x] = s, r.dispose(), r = v, u
			},
			isType: function(e) {
				return this[I] === e
			},
			complexity: function() {
				return 0
			},
			toJSON: function(e) {
				return this[i](e)
			},
			setGradient: function(e, t) {
				t || (t = {});
				var n = {
					colorStops: []
				};
				n[I] = t[I] || (t.r1 || t.r2 ? "radial" : "linear"), n.coords = {
					x1: t.x1,
					y1: t.y1,
					x2: t.x2,
					y2: t.y2
				};
				if (t.r1 || t.r2) n.coords.r1 = t.r1, n.coords.r2 = t.r2;
				for (var r in t[h]) {
					var i = new Z.Color(t[h][r]);
					n[h].push({
						offset: r,
						color: i.toRgb(),
						opacity: i.getAlpha()
					})
				}
				return this[R](e, Z[H].forObject(this, n))
			},
			setPatternFill: function(e) {
				return this[R](r, new Z[g](e))
			},
			setShadow: function(e) {
				return this[R](s, new Z.Shadow(e))
			},
			setColor: function(e) {
				return this[R](r, e), this
			},
			centerH: function() {
				return this[x].centerObjectH(this), this
			},
			centerV: function() {
				return this[x].centerObjectV(this), this
			},
			center: function() {
				return this[x].centerObject(this), this
			},
			remove: function() {
				return this[x].remove(this)
			},
			getLocalPointer: function(e, t) {
				t = t || this[x].getPointer(e);
				var n = this.translateToOriginPoint(this[_](), q, Y);
				return {
					x: t.x - n.x,
					y: t.y - n.y
				}
			}
		}), Z[p].createAccessors(Z[u]), Z[u][m].rotate = Z[u][m].setAngle, et(Z[u][m], Z.Observable), Z[u][E] = 2, Z[u].__uid = 0
	}(typeof exports != "undefined" ? exports : this),
	function() {
		var e = "util",
			t = "stroke",
			n = "strokeWidth",
			r = "left",
			i = "getWidth",
			s = "scaleX",
			o = "right",
			u = "top",
			a = "getHeight",
			f = "scaleY",
			l = "bottom",
			c = "rotatePoint",
			h = "Point",
			p = "angle",
			d = "translateToCenterPoint",
			v = "originX",
			m = "getCenterPoint",
			g = "translateToOriginPoint",
			y = "center",
			b = fabric[e].degreesToRadians;
		fabric[e].object.extend(fabric.Object.prototype, {
			translateToCenterPoint: function(d, v, m) {
				var g = d.x,
					y = d.y,
					w = this[t] ? this[n] : 0;
				return v === r ? g = d.x + (this[i]() + w * this[s]) / 2 : v === o && (g = d.x - (this[i]() + w * this[s]) / 2), m === u ? y = d.y + (this[a]() + w * this[f]) / 2 : m === l && (y = d.y - (this[a]() + w * this[f]) / 2), fabric[e][c](new fabric[h](g, y), d, b(this[p]))
			},
			translateToOriginPoint: function(d, v, m) {
				var g = d.x,
					y = d.y,
					w = this[t] ? this[n] : 0;
				return v === r ? g = d.x - (this[i]() + w * this[s]) / 2 : v === o && (g = d.x + (this[i]() + w * this[s]) / 2), m === u ? y = d.y - (this[a]() + w * this[f]) / 2 : m === l && (y = d.y + (this[a]() + w * this[f]) / 2), fabric[e][c](new fabric[h](g, y), d, b(this[p]))
			},
			getCenterPoint: function() {
				var e = new fabric[h](this[r], this[u]);
				return this[d](e, this[v], this.originY)
			},
			getPointByOrigin: function(e, t) {
				var n = this[m]();
				return this[g](n, e, t)
			},
			toLocalPoint: function(d, v, g) {
				var y = this[m](),
					w = this[t] ? this[n] : 0,
					E, S;
				return v && g ? (v === r ? E = y.x - (this[i]() + w * this[s]) / 2 : v === o ? E = y.x + (this[i]() + w * this[s]) / 2 : E = y.x, g === u ? S = y.y - (this[a]() + w * this[f]) / 2 : g === l ? S = y.y + (this[a]() + w * this[f]) / 2 : S = y.y) : (E = this[r], S = this[u]), fabric[e][c](new fabric[h](d.x, d.y), y, -b(this[p])).subtractEquals(new fabric[h](E, S))
			},
			setPositionByOrigin: function(e, t, n) {
				var i = this[d](e, t, n),
					s = this[g](i, this[v], this.originY);
				this.set(r, s.x), this.set(u, s.y)
			},
			adjustPosition: function(e) {
				var t = b(this[p]),
					n = this[i]() / 2,
					s = Math.cos(t) * n,
					a = Math.sin(t) * n,
					f = this[i](),
					l = Math.cos(t) * f,
					c = Math.sin(t) * f;
				this[v] === y && e === r || this[v] === o && e === y ? (this[r] -= s, this[u] -= a) : this[v] === r && e === y || this[v] === y && e === o ? (this[r] += s, this[u] += a) : this[v] === r && e === o ? (this[r] += l, this[u] += c) : this[v] === o && e === r && (this[r] -= l, this[u] -= c), this.setCoords(), this[v] = e
			},
			_getLeftTopCoords: function() {
				return this[g](this[m](), r, y)
			}
		})
	}(),
	function() {
		var e = "util",
			t = "oCoords",
			n = "Point",
			r = "Intersection",
			i = "getBoundingRect",
			s = "width",
			o = "height",
			u = "array",
			a = "scaleX",
			f = "scaleY",
			l = "minScaleLimit",
			c = "strokeWidth",
			h = "currentWidth",
			p = "currentHeight",
			d = "_setCornerCoords",
			v = fabric[e].degreesToRadians;
		fabric[e].object.extend(fabric.Object.prototype, {
			oCoords: null,
			intersectsWithRect: function(e, i) {
				var s = this[t],
					o = new fabric[n](s.tl.x, s.tl.y),
					u = new fabric[n](s.tr.x, s.tr.y),
					a = new fabric[n](s.bl.x, s.bl.y),
					f = new fabric[n](s.br.x, s.br.y),
					l = fabric[r].intersectPolygonRectangle([o, u, f, a], e, i);
				return l.status === r
			},
			intersectsWithObject: function(e) {
				function i(e) {
					return {
						tl: new fabric[n](e.tl.x, e.tl.y),
						tr: new fabric[n](e.tr.x, e.tr.y),
						bl: new fabric[n](e.bl.x, e.bl.y),
						br: new fabric[n](e.br.x, e.br.y)
					}
				}
				var s = i(this[t]),
					o = i(e[t]),
					u = fabric[r].intersectPolygonPolygon([s.tl, s.tr, s.br, s.bl], [o.tl, o.tr, o.br, o.bl]);
				return u.status === r
			},
			isContainedWithinObject: function(e) {
				var t = e[i](),
					r = new fabric[n](t.left, t.top),
					u = new fabric[n](t.left + t[s], t.top + t[o]);
				return this.isContainedWithinRect(r, u)
			},
			isContainedWithinRect: function(e, t) {
				var n = this[i]();
				return n.left > e.x && n.left + n[s] < t.x && n.top > e.y && n.top + n[o] < t.y
			},
			containsPoint: function(e) {
				var n = this._getImageLines(this[t]),
					r = this._findCrossPoints(e, n);
				return r !== 0 && r % 2 === 1
			},
			_getImageLines: function(e) {
				return {
					topline: {
						o: e.tl,
						d: e.tr
					},
					rightline: {
						o: e.tr,
						d: e.br
					},
					bottomline: {
						o: e.br,
						d: e.bl
					},
					leftline: {
						o: e.bl,
						d: e.tl
					}
				}
			},
			_findCrossPoints: function(e, t) {
				var n, r, i, s, o, u, a = 0,
					f;
				for (var l in t) {
					f = t[l];
					if (f.o.y < e.y && f.d.y < e.y) continue;
					if (f.o.y >= e.y && f.d.y >= e.y) continue;
					f.o.x === f.d.x && f.o.x >= e.x ? (o = f.o.x, u = e.y) : (n = 0, r = (f.d.y - f.o.y) / (f.d.x - f.o.x), i = e.y - n * e.x, s = f.o.y - r * f.o.x, o = -(i - s) / (n - r), u = i + n * o), o >= e.x && (a += 1);
					if (a === 2) break
				}
				return a
			},
			getBoundingRectWidth: function() {
				return this[i]()[s]
			},
			getBoundingRectHeight: function() {
				return this[i]()[o]
			},
			getBoundingRect: function() {
				this[t] || this.setCoords();
				var n = [this[t].tl.x, this[t].tr.x, this[t].br.x, this[t].bl.x],
					r = fabric[e][u].min(n),
					i = fabric[e][u].max(n),
					s = Math.abs(r - i),
					o = [this[t].tl.y, this[t].tr.y, this[t].br.y, this[t].bl.y],
					a = fabric[e][u].min(o),
					f = fabric[e][u].max(o),
					l = Math.abs(a - f);
				return {
					left: r,
					top: a,
					width: s,
					height: l
				}
			},
			getWidth: function() {
				return this[s] * this[a]
			},
			getHeight: function() {
				return this[o] * this[f]
			},
			_constrainScale: function(e) {
				return Math.abs(e) < this[l] ? e < 0 ? -this[l] : this[l] : e
			},
			scale: function(e) {
				return e = this._constrainScale(e), e < 0 && (this.flipX = !this.flipX, this.flipY = !this.flipY, e *= -1), this[a] = e, this[f] = e, this.setCoords(), this
			},
			scaleToWidth: function(e) {
				var t = this.getBoundingRectWidth() / this.getWidth();
				return this.scale(e / this[s] / t)
			},
			scaleToHeight: function(e) {
				var t = this.getBoundingRectHeight() / this.getHeight();
				return this.scale(e / this[o] / t)
			},
			setCoords: function() {
				var e = this[c] > 1 ? this[c] : 0,
					n = this.padding,
					r = v(this.angle);
				this[h] = (this[s] + e) * this[a] + n * 2, this[p] = (this[o] + e) * this[f] + n * 2, this[h] < 0 && (this[h] = Math.abs(this[h]));
				var i = Math.sqrt(Math.pow(this[h] / 2, 2) + Math.pow(this[p] / 2, 2)),
					u = Math.atan(isFinite(this[p] / this[h]) ? this[p] / this[h] : 0),
					l = Math.cos(u + r) * i,
					m = Math.sin(u + r) * i,
					g = Math.sin(r),
					y = Math.cos(r),
					b = this.getCenterPoint(),
					w = {
						x: b.x - l,
						y: b.y - m
					},
					E = {
						x: w.x + this[h] * y,
						y: w.y + this[h] * g
					},
					S = {
						x: E.x - this[p] * g,
						y: E.y + this[p] * y
					},
					x = {
						x: w.x - this[p] * g,
						y: w.y + this[p] * y
					},
					T = {
						x: w.x - this[p] / 2 * g,
						y: w.y + this[p] / 2 * y
					},
					N = {
						x: w.x + this[h] / 2 * y,
						y: w.y + this[h] / 2 * g
					},
					C = {
						x: E.x - this[p] / 2 * g,
						y: E.y + this[p] / 2 * y
					},
					k = {
						x: x.x + this[h] / 2 * y,
						y: x.y + this[h] / 2 * g
					},
					L = {
						x: N.x,
						y: N.y
					};
				return this[t] = {
					tl: w,
					tr: E,
					br: S,
					bl: x,
					ml: T,
					mt: N,
					mr: C,
					mb: k,
					mtr: L
				}, this[d] && this[d](), this
			}
		})
	}(), fabric.util.object.extend(fabric.Object.prototype, {
		sendToBack: function() {
			return this.group ? fabric.StaticCanvas.prototype.sendToBack.call(this.group, this) : this.canvas.sendToBack(this), this
		},
		bringToFront: function() {
			return this.group ? fabric.StaticCanvas.prototype.bringToFront.call(this.group, this) : this.canvas.bringToFront(this), this
		},
		sendBackwards: function(e) {
			return this.group ? fabric.StaticCanvas.prototype.sendBackwards.call(this.group, this, e) : this.canvas.sendBackwards(this, e), this
		},
		bringForward: function(e) {
			return this.group ? fabric.StaticCanvas.prototype.bringForward.call(this.group, this, e) : this.canvas.bringForward(this, e), this
		},
		moveTo: function(e) {
			return this.group ? fabric.StaticCanvas.prototype.moveTo.call(this.group, this, e) : this.canvas.moveTo(this, e), this
		}
	}), fabric.util.object.extend(fabric.Object.prototype, {
		getSvgStyles: function() {
			var e = "url(#SVGID_",
				t = "none",
				n = "stroke",
				r = "strokeWidth",
				i = "strokeDashArray",
				s = "strokeLineCap",
				o = "strokeLineJoin",
				u = "strokeMiterLimit",
				a = "; ",
				f = this.fill ? this.fill.toLive ? e + this.fill.id + ")" : this.fill : t,
				l = this[n] ? this[n].toLive ? e + this[n].id + ")" : this[n] : t,
				c = this[r] ? this[r] : "0",
				h = this[i] ? this[i].join(" ") : "",
				p = this[s] ? this[s] : "butt",
				d = this[o] ? this[o] : "miter",
				v = this[u] ? this[u] : "4",
				m = typeof this.opacity != "undefined" ? this.opacity : "1",
				g = this.visible ? "" : " visibility: hidden;",
				y = this.shadow && this.type !== "text" ? "filter: url(#SVGID_" + this.shadow.id + ");" : "";
			return ["stroke: ", l, a, "stroke-width: ", c, a, "stroke-dasharray: ", h, a, "stroke-linecap: ", p, a, "stroke-linejoin: ", d, a, "stroke-miterlimit: ", v, a, "fill: ", f, a, "opacity: ", m, ";", y, g].join("")
		},
		getSvgTransform: function() {
			var e = fabric.util.toFixed,
				t = this.getAngle(),
				n = this.getCenterPoint(),
				r = fabric.Object.NUM_FRACTION_DIGITS,
				i = "translate(" + e(n.x, r) + " " + e(n.y, r) + ")",
				s = t !== 0 ? " rotate(" + e(t, r) + ")" : "",
				o = this.scaleX === 1 && this.scaleY === 1 ? "" : " scale(" + e(this.scaleX, r) + " " + e(this.scaleY, r) + ")",
				u = this.flipX ? "matrix(-1 0 0 1 0 0) " : "",
				a = this.flipY ? "matrix(1 0 0 -1 0 0)" : "";
			return [i, s, o, u, a].join("")
		},
		_createBaseSVGMarkup: function() {
			var e = "stroke",
				t = [];
			return this.fill && this.fill.toLive && t.push(this.fill.toSVG(this, !1)), this[e] && this[e].toLive && t.push(this[e].toSVG(this, !1)), this.shadow && t.push(this.shadow.toSVG(this)), t
		}
	}), fabric.util.object.extend(fabric.Object.prototype, {
		hasStateChanged: function() {
			return this.stateProperties.some(function(e) {
				return this.get(e) !== this.originalState[e]
			}, this)
		},
		saveState: function(e) {
			var t = "stateProperties",
				n = "originalState";
			return this[t].forEach(function(e) {
				this[n][e] = this.get(e)
			}, this), e && e[t] && e[t].forEach(function(e) {
				this[n][e] = this.get(e)
			}, this), this
		},
		setupState: function() {
			return this.originalState = {}, this.saveState(), this
		}
	}),
	function() {
		var e = "hasControls",
			t = "oCoords",
			n = "isControlVisible",
			r = "mtr",
			i = "hasRotatingPoint",
			s = "lockUniScaling",
			o = "mb",
			u = "corner",
			a = "cornerSize",
			f = "rotatingPointOffset",
			l = "padding",
			c = "strokeWidth",
			h = "globalAlpha",
			p = "borderOpacityWhenMoving",
			d = "strokeStyle",
			v = "_constrainScale",
			m = "scaleX",
			g = "scaleY",
			y = "strokeRect",
			b = "transparentCorners",
			w = "_drawControl",
			E = "_getControlsVisibility",
			S = "_controlsVisibility",
			x = !0,
			T = fabric.util.getPointer,
			N = fabric.util.degreesToRadians,
			C = typeof G_vmlCanvasManager != "undefined";
		fabric.util.object.extend(fabric.Object.prototype, {
			_controlsVisibility: null,
			_findTargetCorner: function(a, f) {
				if (!this[e] || !this.active) return !1;
				var l = T(a, this.canvas.upperCanvasEl),
					c = l.x - f.left,
					h = l.y - f.top,
					p, d;
				for (var v in this[t]) {
					if (!this[n](v)) continue;
					if (v === r && !this[i]) continue;
					if (!(!this.get(s) || v !== "mt" && v !== "mr" && v !== o && v !== "ml")) continue;
					d = this._getImageLines(this[t][v][u]), p = this._findCrossPoints({
						x: c,
						y: h
					}, d);
					if (p !== 0 && p % 2 === 1) return this.__corner = v, v
				}
				return !1
			},
			_setCornerCoords: function() {
				var e = this[t],
					n = N(this.angle),
					i = N(45 - this.angle),
					s = Math.sqrt(2 * Math.pow(this[a], 2)) / 2,
					l = s * Math.cos(i),
					c = s * Math.sin(i),
					h = Math.sin(n),
					p = Math.cos(n);
				e.tl[u] = {
					tl: {
						x: e.tl.x - c,
						y: e.tl.y - l
					},
					tr: {
						x: e.tl.x + l,
						y: e.tl.y - c
					},
					bl: {
						x: e.tl.x - l,
						y: e.tl.y + c
					},
					br: {
						x: e.tl.x + c,
						y: e.tl.y + l
					}
				}, e.tr[u] = {
					tl: {
						x: e.tr.x - c,
						y: e.tr.y - l
					},
					tr: {
						x: e.tr.x + l,
						y: e.tr.y - c
					},
					br: {
						x: e.tr.x + c,
						y: e.tr.y + l
					},
					bl: {
						x: e.tr.x - l,
						y: e.tr.y + c
					}
				}, e.bl[u] = {
					tl: {
						x: e.bl.x - c,
						y: e.bl.y - l
					},
					bl: {
						x: e.bl.x - l,
						y: e.bl.y + c
					},
					br: {
						x: e.bl.x + c,
						y: e.bl.y + l
					},
					tr: {
						x: e.bl.x + l,
						y: e.bl.y - c
					}
				}, e.br[u] = {
					tr: {
						x: e.br.x + l,
						y: e.br.y - c
					},
					bl: {
						x: e.br.x - l,
						y: e.br.y + c
					},
					br: {
						x: e.br.x + c,
						y: e.br.y + l
					},
					tl: {
						x: e.br.x - c,
						y: e.br.y - l
					}
				}, e.ml[u] = {
					tl: {
						x: e.ml.x - c,
						y: e.ml.y - l
					},
					tr: {
						x: e.ml.x + l,
						y: e.ml.y - c
					},
					bl: {
						x: e.ml.x - l,
						y: e.ml.y + c
					},
					br: {
						x: e.ml.x + c,
						y: e.ml.y + l
					}
				}, e.mt[u] = {
					tl: {
						x: e.mt.x - c,
						y: e.mt.y - l
					},
					tr: {
						x: e.mt.x + l,
						y: e.mt.y - c
					},
					bl: {
						x: e.mt.x - l,
						y: e.mt.y + c
					},
					br: {
						x: e.mt.x + c,
						y: e.mt.y + l
					}
				}, e.mr[u] = {
					tl: {
						x: e.mr.x - c,
						y: e.mr.y - l
					},
					tr: {
						x: e.mr.x + l,
						y: e.mr.y - c
					},
					bl: {
						x: e.mr.x - l,
						y: e.mr.y + c
					},
					br: {
						x: e.mr.x + c,
						y: e.mr.y + l
					}
				}, e[o][u] = {
					tl: {
						x: e[o].x - c,
						y: e[o].y - l
					},
					tr: {
						x: e[o].x + l,
						y: e[o].y - c
					},
					bl: {
						x: e[o].x - l,
						y: e[o].y + c
					},
					br: {
						x: e[o].x + c,
						y: e[o].y + l
					}
				}, e[r][u] = {
					tl: {
						x: e[r].x - c + h * this[f],
						y: e[r].y - l - p * this[f]
					},
					tr: {
						x: e[r].x + l + h * this[f],
						y: e[r].y - c - p * this[f]
					},
					bl: {
						x: e[r].x - l + h * this[f],
						y: e[r].y + c - p * this[f]
					},
					br: {
						x: e[r].x + c + h * this[f],
						y: e[r].y + l - p * this[f]
					}
				}
			},
			drawBorders: function(t) {
				if (!this.hasBorders) return this;
				var s = this[l],
					o = s * 2,
					u = ~~(this[c] / 2) * 2;
				t.save(), t[h] = this.isMoving ? this[p] : 1, t[d] = this.borderColor;
				var a = 1 / this[v](this[m]),
					b = 1 / this[v](this[g]);
				t.lineWidth = 1 / this.borderScaleFactor, t.scale(a, b);
				var w = this.getWidth(),
					E = this.getHeight();
				t[y](~~(-(w / 2) - s - u / 2 * this[m]) - .5, ~~(-(E / 2) - s - u / 2 * this[g]) - .5, ~~(w + o + u * this[m]) + 1, ~~(E + o + u * this[g]) + 1);
				if (this[i] && this[n](r) && !this.get("lockRotation") && this[e]) {
					var S = (this.flipY ? E + u * this[g] + s * 2 : -E - u * this[g] - s * 2) / 2;
					t.beginPath(), t.moveTo(0, S), t.lineTo(0, S + (this.flipY ? this[f] : -this[f])), t.closePath(), t.stroke()
				}
				return t.restore(), this
			},
			drawControls: function(t) {
				if (!this[e]) return this;
				var n = this[a],
					u = n / 2,
					v = ~~(this[c] / 2),
					E = -(this.width / 2),
					S = -(this.height / 2),
					x = this[l] / this[m],
					T = this[l] / this[g],
					N = u / this[g],
					C = u / this[m],
					k = (u - n) / this[m],
					L = (u - n) / this[g],
					A = this.height,
					O = this.width,
					M = this[b] ? y : "fillRect";
				return t.save(), t.lineWidth = 1 / Math.max(this[m], this[g]), t[h] = this.isMoving ? this[p] : 1, t[d] = t.fillStyle = this.cornerColor, this[w]("tl", t, M, E - C - v - x, S - N - v - T), this[w]("tr", t, M, E + O - C + v + x, S - N - v - T), this[w]("tr", t, M, E - C - v - x, S + A + L + v + T), this[w]("br", t, M, E + O + k + v + x, S + A + L + v + T), this.get(s) || (this[w]("mt", t, M, E + O / 2 - C, S - N - v - T), this[w](o, t, M, E + O / 2 - C, S + A + L + v + T), this[w](o, t, M, E + O + k + v + x, S + A / 2 - N), this[w]("ml", t, M, E - C - v - x, S + A / 2 - N)), this[i] && this[w](r, t, M, E + O / 2 - C, this.flipY ? S + A + this[f] / this[g] - this[a] / this[m] / 2 + v + T : S - this[f] / this[g] - this[a] / this[g] / 2 - v - T), t.restore(), this
			},
			_drawControl: function(e, t, r, i, s) {
				var o = this[a] / this[m],
					u = this[a] / this[g];
				this[n](e) && (C || this[b] || t.clearRect(i, s, o, u), t[r](i, s, o, u))
			},
			isControlVisible: function(e) {
				return this[E]()[e]
			},
			setControlVisible: function(e, t) {
				return this[E]()[e] = t, this
			},
			setControlsVisibility: function(e) {
				e || (e = {});
				for (var t in e) this.setControlVisible(t, e[t]);
				return this
			},
			_getControlsVisibility: function() {
				return this[S] || (this[S] = {
					tl: x,
					tr: x,
					br: x,
					bl: x,
					ml: x,
					mt: x,
					mr: x,
					mb: x,
					mtr: x
				}), this[S]
			}
		})
	}(),
	function(e) {
		"use strict";
		var t = "Line",
			n = "x1",
			r = "y1",
			i = "x2",
			s = "y2",
			o = "_setWidthHeight",
			u = "width",
			a = "height",
			f = "left",
			l = "top",
			c = "group",
			h = "strokeDashArray",
			p = "strokeStyle",
			d = "ATTRIBUTE_NAMES",
			v = e.fabric || (e.fabric = {}),
			m = v.util.object.extend,
			g = {
				x1: 1,
				x2: 1,
				y1: 1,
				y2: 1
			},
			y = v.StaticCanvas.supports("setLineDash");
		if (v[t]) {
			v.warn("fabric.Line is already defined");
			return
		}
		v[t] = v.util.createClass(v.Object, {
			type: "line",
			initialize: function(e, t) {
				t = t || {}, e || (e = [0, 0, 0, 0]), this.callSuper("initialize", t), this.set(n, e[0]), this.set(r, e[1]), this.set(i, e[2]), this.set(s, e[3]), this[o](t)
			},
			_setWidthHeight: function(e) {
				e || (e = {}), this.set(u, Math.abs(this[i] - this[n]) || 1), this.set(a, Math.abs(this[s] - this[r]) || 1), this.set(f, f in e ? e[f] : Math.min(this[n], this[i]) + this[u] / 2), this.set(l, l in e ? e[l] : Math.min(this[r], this[s]) + this[a] / 2)
			},
			_set: function(e, t) {
				return this[e] = t, e in g && this[o](), this
			},
			_render: function(e) {
				e.beginPath();
				var t = this[c] && this[c].type === "path-group";
				t && !this.transformMatrix && e.translate(-this[c][u] / 2 + this[f], -this[c][a] / 2 + this[l]);
				if (!this[h] || this[h] && y) {
					var o = this[n] <= this[i] ? -1 : 1,
						d = this[r] <= this[s] ? -1 : 1;
					e.moveTo(this[u] === 1 ? 0 : o * this[u] / 2, this[a] === 1 ? 0 : d * this[a] / 2), e.lineTo(this[u] === 1 ? 0 : o * -1 * this[u] / 2, this[a] === 1 ? 0 : d * -1 * this[a] / 2)
				}
				e.lineWidth = this.strokeWidth;
				var v = e[p];
				e[p] = this.stroke || e.fillStyle, this._renderStroke(e), e[p] = v
			},
			_renderDashedStroke: function(e) {
				var t = this[n] <= this[i] ? -1 : 1,
					o = this[r] <= this[s] ? -1 : 1,
					f = this[u] === 1 ? 0 : t * this[u] / 2,
					l = this[a] === 1 ? 0 : o * this[a] / 2;
				e.beginPath(), v.util.drawDashedLine(e, f, l, -f, -l, this[h]), e.closePath()
			},
			toObject: function(e) {
				return m(this.callSuper("toObject", e), {
					x1: this.get(n),
					y1: this.get(r),
					x2: this.get(i),
					y2: this.get(s)
				})
			},
			toSVG: function(e) {
				var t = this._createBaseSVGMarkup();
				return t.push("<line ", 'x1="', this.get(n), '" y1="', this.get(r), '" x2="', this.get(i), '" y2="', this.get(s), '" style="', this.getSvgStyles(), '"/>'), e ? e(t.join("")) : t.join("")
			},
			complexity: function() {
				return 1
			}
		}), v[t][d] = v.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" ")), v[t].fromElement = function(e, o) {
			var u = v.parseAttributes(e, v[t][d]),
				a = [u[n] || 0, u[r] || 0, u[i] || 0, u[s] || 0];
			return new v[t](a, m(u, o))
		}, v[t].fromObject = function(e) {
			var o = [e[n], e[r], e[i], e[s]];
			return new v[t](o, e)
		}
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";

		function l(e) {
			return n in e && e[n] > 0
		}
		var t = "Circle",
			n = "radius",
			r = "callSuper",
			i = "globalAlpha",
			s = "ATTRIBUTE_NAMES",
			o = "getAttribute",
			u = e.fabric || (e.fabric = {}),
			a = Math.PI * 2,
			f = u.util.object.extend;
		if (u[t]) {
			u.warn("fabric.Circle is already defined.");
			return
		}
		u[t] = u.util.createClass(u.Object, {
			type: "circle",
			initialize: function(e) {
				e = e || {}, this.set(n, e[n] || 0), this[r]("initialize", e)
			},
			_set: function(e, t) {
				return this[r]("_set", e, t), e === n && this.setRadius(t), this
			},
			toObject: function(e) {
				return f(this[r]("toObject", e), {
					radius: this.get(n)
				})
			},
			toSVG: function(e) {
				var t = this._createBaseSVGMarkup();
				return t.push("<circle ", 'cx="0" cy="0" ', 'r="', this[n], '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), e ? e(t.join("")) : t.join("")
			},
			_render: function(e, t) {
				e.beginPath(), e[i] = this.group ? e[i] * this.opacity : this.opacity, e.arc(t ? this.left : 0, t ? this.top : 0, this[n], 0, a, !1), e.closePath(), this._renderFill(e), this._renderStroke(e)
			},
			getRadiusX: function() {
				return this.get(n) * this.get("scaleX")
			},
			getRadiusY: function() {
				return this.get(n) * this.get("scaleY")
			},
			setRadius: function(e) {
				this[n] = e, this.set("width", e * 2).set("height", e * 2)
			},
			complexity: function() {
				return 1
			}
		}), u[t][s] = u.SHARED_ATTRIBUTES.concat("cx cy r".split(" ")), u[t].fromElement = function(e, n) {
			n || (n = {});
			var r = u.parseAttributes(e, u[t][s]);
			if (!l(r)) throw new Error("value of `r` attribute is required and can not be negative");
			"left" in r && (r.left -= n.width / 2 || 0), "top" in r && (r.top -= n.height / 2 || 0);
			var i = new u[t](f(r, n));
			return i.cx = parseFloat(e[o]("cx")) || 0, i.cy = parseFloat(e[o]("cy")) || 0, i
		}, u[t].fromObject = function(e) {
			return new u[t](e)
		}
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";
		var t = "Triangle",
			n = "width",
			r = "height",
			i = "drawDashedLine",
			s = "strokeDashArray",
			o = e.fabric || (e.fabric = {});
		if (o[t]) {
			o.warn("fabric.Triangle is already defined");
			return
		}
		o[t] = o.util.createClass(o.Object, {
			type: "triangle",
			initialize: function(e) {
				e = e || {}, this.callSuper("initialize", e), this.set(n, e[n] || 100).set(r, e[r] || 100)
			},
			_render: function(e) {
				var t = this[n] / 2,
					i = this[r] / 2;
				e.beginPath(), e.moveTo(-t, i), e.lineTo(0, -i), e.lineTo(t, i), e.closePath(), this._renderFill(e), this._renderStroke(e)
			},
			_renderDashedStroke: function(e) {
				var t = this[n] / 2,
					u = this[r] / 2;
				e.beginPath(), o.util[i](e, -t, u, 0, -u, this[s]), o.util[i](e, 0, -u, t, u, this[s]), o.util[i](e, t, u, -t, u, this[s]), e.closePath()
			},
			toSVG: function(e) {
				var t = this._createBaseSVGMarkup(),
					i = this[n] / 2,
					s = this[r] / 2,
					o = [-i + " " + s, "0 " + -s, i + " " + s].join(",");
				return t.push("<polygon ", 'points="', o, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), e ? e(t.join("")) : t.join("")
			},
			complexity: function() {
				return 1
			}
		}), o[t].fromObject = function(e) {
			return new o[t](e)
		}
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";
		var t = "Ellipse",
			n = "callSuper",
			r = "rx",
			i = "ry",
			s = "globalAlpha",
			o = "left",
			u = "ATTRIBUTE_NAMES",
			a = e.fabric || (e.fabric = {}),
			f = Math.PI * 2,
			l = a.util.object.extend;
		if (a[t]) {
			a.warn("fabric.Ellipse is already defined.");
			return
		}
		a[t] = a.util.createClass(a.Object, {
			type: "ellipse",
			rx: 0,
			ry: 0,
			initialize: function(e) {
				e = e || {}, this[n]("initialize", e), this.set(r, e[r] || 0), this.set(i, e[i] || 0), this.set("width", this.get(r) * 2), this.set("height", this.get(i) * 2)
			},
			toObject: function(e) {
				return l(this[n]("toObject", e), {
					rx: this.get(r),
					ry: this.get(i)
				})
			},
			toSVG: function(e) {
				var t = this._createBaseSVGMarkup();
				return t.push("<ellipse ", 'rx="', this.get(r), '" ry="', this.get(i), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), e ? e(t.join("")) : t.join("")
			},
			render: function(e, t) {
				if (this[r] === 0 || this[i] === 0) return;
				return this[n]("render", e, t)
			},
			_render: function(e, t) {
				e.beginPath(), e.save(), e[s] = this.group ? e[s] * this.opacity : this.opacity, this.transformMatrix && this.group && e.translate(this.cx, this.cy), e.transform(1, 0, 0, this[i] / this[r], 0, 0), e.arc(t ? this[o] : 0, t ? this.top : 0, this[r], 0, f, !1), this._renderFill(e), this._renderStroke(e), e.restore()
			},
			complexity: function() {
				return 1
			}
		}), a[t][u] = a.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" ")), a[t].fromElement = function(e, n) {
			n || (n = {});
			var r = a.parseAttributes(e, a[t][u]),
				i = r[o],
				s = r.top;
			o in r && (r[o] -= n.width / 2 || 0), "top" in r && (r.top -= n.height / 2 || 0);
			var f = new a[t](l(r, n));
			return f.cx = i || 0, f.cy = s || 0, f
		}, a[t].fromObject = function(e) {
			return new a[t](e)
		}
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";

		function w(e) {
			return e[d] = e[d] || 0, e[v] = e[v] || 0, e
		}
		var t = "util",
			n = "Rect",
			r = "rx",
			i = "ry",
			s = "width",
			o = "height",
			u = "group",
			a = "globalAlpha",
			f = "transformMatrix",
			l = "lineTo",
			c = "quadraticCurveTo",
			h = "drawDashedLine",
			p = "strokeDashArray",
			d = "left",
			v = "top",
			m = "ATTRIBUTE_NAMES",
			g = e.fabric || (e.fabric = {}),
			y = g[t].object.extend;
		if (g[n]) {
			console.warn("fabric.Rect is already defined");
			return
		}
		var b = g.Object.prototype.stateProperties.concat();
		b.push(r, i, "x", "y"), g[n] = g[t].createClass(g.Object, {
			stateProperties: b,
			type: "rect",
			rx: 0,
			ry: 0,
			x: 0,
			y: 0,
			strokeDashArray: null,
			initialize: function(e) {
				e = e || {}, this.callSuper("initialize", e), this._initRxRy(), this.x = e.x || 0, this.y = e.y || 0
			},
			_initRxRy: function() {
				this[r] && !this[i] ? this[i] = this[r] : this[i] && !this[r] && (this[r] = this[i])
			},
			_render: function(e) {
				var t = this[r] || 0,
					n = this[i] || 0,
					h = -this[s] / 2,
					p = -this[o] / 2,
					d = this[s],
					v = this[o],
					m = this[u] && this[u].type === "path-group";
				e.beginPath(), e[a] = m ? e[a] * this.opacity : this.opacity, this[f] && m && e.translate(this[s] / 2 + this.x, this[o] / 2 + this.y), !this[f] && m && e.translate(-this[u][s] / 2 + this[s] / 2 + this.x, -this[u][o] / 2 + this[o] / 2 + this.y);
				var g = t !== 0 || n !== 0;
				e.moveTo(h + t, p), e[l](h + d - t, p), g && e[c](h + d, p, h + d, p + n, h + d, p + n), e[l](h + d, p + v - n), g && e[c](h + d, p + v, h + d - t, p + v, h + d - t, p + v), e[l](h + t, p + v), g && e[c](h, p + v, h, p + v - n, h, p + v - n), e[l](h, p + n), g && e[c](h, p, h + t, p, h + t, p), e.closePath(), this._renderFill(e), this._renderStroke(e)
			},
			_renderDashedStroke: function(e) {
				var n = -this[s] / 2,
					r = -this[o] / 2,
					i = this[s],
					u = this[o];
				e.beginPath(), g[t][h](e, n, r, n + i, r, this[p]), g[t][h](e, n + i, r, n + i, r + u, this[p]), g[t][h](e, n + i, r + u, n, r + u, this[p]), g[t][h](e, n, r + u, n, r, this[p]), e.closePath()
			},
			_normalizeLeftTopProperties: function(e) {
				return d in e && this.set(d, e[d] + this.getWidth() / 2), this.set("x", e[d] || 0), v in e && this.set(v, e[v] + this.getHeight() / 2), this.set("y", e[v] || 0), this
			},
			toObject: function(e) {
				var t = y(this.callSuper("toObject", e), {
					rx: this.get(r) || 0,
					ry: this.get(i) || 0,
					x: this.get("x"),
					y: this.get("y")
				});
				return this.includeDefaultValues || this._removeDefaultValues(t), t
			},
			toSVG: function(e) {
				var t = this._createBaseSVGMarkup();
				return t.push("<rect ", 'x="', -1 * this[s] / 2, '" y="', -1 * this[o] / 2, '" rx="', this.get(r), '" ry="', this.get(i), '" width="', this[s], '" height="', this[o], '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), e ? e(t.join("")) : t.join("")
			},
			complexity: function() {
				return 1
			}
		}), g[n][m] = g.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" ")), g[n].fromElement = function(e, r) {
			if (!e) return null;
			var i = g.parseAttributes(e, g[n][m]);
			i = w(i);
			var s = new g[n](y(r ? g[t].object.clone(r) : {}, i));
			return s._normalizeLeftTopProperties(i), s
		}, g[n].fromObject = function(e) {
			return new g[n](e)
		}
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";
		var t = "util",
			n = "Polyline",
			r = "points",
			i = "_calcDimensions",
			s = "length",
			o = "ATTRIBUTE_NAMES",
			u = e.fabric || (e.fabric = {}),
			a = u[t].toFixed;
		if (u[n]) {
			u.warn("fabric.Polyline is already defined");
			return
		}
		u[n] = u[t].createClass(u.Object, {
			type: "polyline",
			initialize: function(e, t, n) {
				t = t || {}, this.set(r, e), this.callSuper("initialize", t), this[i](n)
			},
			_calcDimensions: function(e) {
				return u.Polygon.prototype[i].call(this, e)
			},
			toObject: function(e) {
				return u.Polygon.prototype.toObject.call(this, e)
			},
			toSVG: function(e) {
				var t = [],
					n = this._createBaseSVGMarkup();
				for (var i = 0, o = this[r][s]; i < o; i++) t.push(a(this[r][i].x, 2), ",", a(this[r][i].y, 2), " ");
				return n.push("<polyline ", 'points="', t.join(""), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), e ? e(n.join("")) : n.join("")
			},
			_render: function(e) {
				var t;
				e.beginPath(), e.moveTo(this[r][0].x, this[r][0].y);
				for (var n = 0, i = this[r][s]; n < i; n++) t = this[r][n], e.lineTo(t.x, t.y);
				this._renderFill(e), this._renderStroke(e)
			},
			_renderDashedStroke: function(e) {
				var n, i;
				e.beginPath();
				for (var o = 0, a = this[r][s]; o < a; o++) n = this[r][o], i = this[r][o + 1] || n, u[t].drawDashedLine(e, n.x, n.y, i.x, i.y, this.strokeDashArray)
			},
			complexity: function() {
				return this.get(r)[s]
			}
		}), u[n][o] = u.SHARED_ATTRIBUTES.concat(), u[n].fromElement = function(e, i) {
			if (!e) return null;
			i || (i = {});
			var s = u.parsePointsAttribute(e.getAttribute(r)),
				a = u.parseAttributes(e, u[n][o]);
			return u[t].normalizePoints(s, i), new u[n](s, u[t].object.extend(a, i), !0)
		}, u[n].fromObject = function(e) {
			var t = e[r];
			return new u[n](t, e, !0)
		}
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";
		var t = "util",
			n = "Polygon",
			r = "points",
			i = "length",
			s = "strokeDashArray",
			o = "ATTRIBUTE_NAMES",
			u = e.fabric || (e.fabric = {}),
			a = u[t].object.extend,
			f = u[t].array.min,
			l = u[t].array.max,
			c = u[t].toFixed;
		if (u[n]) {
			u.warn("fabric.Polygon is already defined");
			return
		}
		u[n] = u[t].createClass(u.Object, {
			type: "polygon",
			initialize: function(e, t, n) {
				t = t || {}, this[r] = e, this.callSuper("initialize", t), this._calcDimensions(n)
			},
			_calcDimensions: function(e) {
				var t = this[r],
					n = f(t, "x"),
					i = f(t, "y"),
					s = l(t, "x"),
					o = l(t, "y");
				this.width = s - n || 1, this.height = o - i || 1, this.minX = n, this.minY = i;
				if (e) return;
				var u = this.width / 2 + this.minX,
					a = this.height / 2 + this.minY;
				this[r].forEach(function(e) {
					e.x -= u, e.y -= a
				}, this)
			},
			toObject: function(e) {
				return a(this.callSuper("toObject", e), {
					points: this[r].concat()
				})
			},
			toSVG: function(e) {
				var t = [],
					n = this._createBaseSVGMarkup();
				for (var s = 0, o = this[r][i]; s < o; s++) t.push(c(this[r][s].x, 2), ",", c(this[r][s].y, 2), " ");
				return n.push("<polygon ", 'points="', t.join(""), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), e ? e(n.join("")) : n.join("")
			},
			_render: function(e) {
				var t;
				e.beginPath(), e.moveTo(this[r][0].x, this[r][0].y);
				for (var n = 0, o = this[r][i]; n < o; n++) t = this[r][n], e.lineTo(t.x, t.y);
				this._renderFill(e);
				if (this.stroke || this[s]) e.closePath(), this._renderStroke(e)
			},
			_renderDashedStroke: function(e) {
				var n, o;
				e.beginPath();
				for (var a = 0, f = this[r][i]; a < f; a++) n = this[r][a], o = this[r][a + 1] || this[r][0], u[t].drawDashedLine(e, n.x, n.y, o.x, o.y, this[s]);
				e.closePath()
			},
			complexity: function() {
				return this[r][i]
			}
		}), u[n][o] = u.SHARED_ATTRIBUTES.concat(), u[n].fromElement = function(e, i) {
			if (!e) return null;
			i || (i = {});
			var s = u.parsePointsAttribute(e.getAttribute(r)),
				f = u.parseAttributes(e, u[n][o]);
			return u[t].normalizePoints(s, i), new u[n](s, a(f, i), !0)
		}, u[n].fromObject = function(e) {
			return new u[n](e[r], e, !0)
		}
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		function M(e) {
			return e[0] === r ? e[1] : e[e[i] - 2]
		}

		function _(e) {
			return e[0] === s ? e[1] : e[e[i] - 1]
		}
		var t = "util",
			n = "Path",
			r = "H",
			i = "length",
			s = "V",
			o = "path",
			u = "sourcePath",
			a = "setSourcePath",
			f = "width",
			l = null,
			c = "height",
			h = "left",
			p = "top",
			d = "pathOffset",
			v = "lineTo",
			m = "moveTo",
			g = "bezierCurveTo",
			y = "quadraticCurveTo",
			b = "transformMatrix",
			w = "toObject",
			E = "push",
			S = "toLowerCase",
			x = "ATTRIBUTE_NAMES",
			T = {
				m: 2,
				l: 2,
				h: 1,
				v: 1,
				c: 6,
				s: 4,
				q: 4,
				t: 2,
				a: 7
			};
		"use strict";
		var N = e.fabric || (e.fabric = {}),
			C = N[t].array.min,
			k = N[t].array.max,
			L = N[t].object.extend,
			A = Object.prototype.toString,
			O = N[t].drawArc;
		if (N[n]) {
			N.warn("fabric.Path is already defined");
			return
		}
		N[n] = N[t].createClass(N.Object, {
			type: o,
			initialize: function(e, t) {
				t = t || {}, this.setOptions(t);
				if (!e) throw new Error("`path` argument is required");
				var n = A.call(e) === "[object Array]";
				this[o] = n ? e : e.match && e.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi);
				if (!this[o]) return;
				n || (this[o] = this._parsePath()), this._initializePath(t), t[u] && this[a](t[u])
			},
			_initializePath: function(e) {
				var t = f in e && e[f] != l,
					n = c in e && e[f] != l,
					r = h in e,
					i = p in e,
					s = r ? this[h] : 0,
					o = i ? this[p] : 0;
				!t || !n ? (L(this, this._parseDimensions()), t && (this[f] = e[f]), n && (this[c] = e[c])) : (i || (this[p] = this[c] / 2), r || (this[h] = this[f] / 2)), this[d] = this[d] || this._calculatePathOffset(s, o)
			},
			_calculatePathOffset: function(e, t) {
				return {
					x: this[h] - e - this[f] / 2,
					y: this[p] - t - this[c] / 2
				}
			},
			_render: function(e) {
				var t, n = l,
					u = 0,
					a = 0,
					h = 0,
					p = 0,
					b, w, E, S, x = -(this[f] / 2 + this[d].x),
					T = -(this[c] / 2 + this[d].y),
					N;
				for (var C = 0, k = this[o][i]; C < k; ++C) {
					t = this[o][C];
					switch (t[0]) {
						case "l":
							u += t[1], a += t[2], e[v](u + x, a + T);
							break;
						case "L":
							u = t[1], a = t[2], e[v](u + x, a + T);
							break;
						case "h":
							u += t[1], e[v](u + x, a + T);
							break;
						case r:
							u = t[1], e[v](u + x, a + T);
							break;
						case "v":
							a += t[1], e[v](u + x, a + T);
							break;
						case s:
							a = t[1], e[v](u + x, a + T);
							break;
						case "m":
							u += t[1], a += t[2], N = !n || n[0] !== "m" && n[0] !== "M" ? m : v, e[N](u + x, a + T);
							break;
						case "M":
							u = t[1], a = t[2], N = !n || n[0] !== "m" && n[0] !== "M" ? m : v, e[N](u + x, a + T);
							break;
						case "c":
							b = u + t[5], w = a + t[6], h = u + t[3], p = a + t[4], e[g](u + t[1] + x, a + t[2] + T, h + x, p + T, b + x, w + T), u = b, a = w;
							break;
						case "C":
							u = t[5], a = t[6], h = t[3], p = t[4], e[g](t[1] + x, t[2] + T, h + x, p + T, u + x, a + T);
							break;
						case "s":
							b = u + t[3], w = a + t[4], h = h ? 2 * u - h : u, p = p ? 2 * a - p : a, e[g](h + x, p + T, u + t[1] + x, a + t[2] + T, b + x, w + T), h = u + t[1], p = a + t[2], u = b, a = w;
							break;
						case "S":
							b = t[3], w = t[4], h = 2 * u - h, p = 2 * a - p, e[g](h + x, p + T, t[1] + x, t[2] + T, b + x, w + T), u = b, a = w, h = t[1], p = t[2];
							break;
						case "q":
							b = u + t[3], w = a + t[4], h = u + t[1], p = a + t[2], e[y](h + x, p + T, b + x, w + T), u = b, a = w;
							break;
						case "Q":
							b = t[3], w = t[4], e[y](t[1] + x, t[2] + T, b + x, w + T), u = b, a = w, h = t[1], p = t[2];
							break;
						case "t":
							b = u + t[1], w = a + t[2], n[0].match(/[QqTt]/) === l ? (h = u, p = a) : n[0] === "t" ? (h = 2 * u - E, p = 2 * a - S) : n[0] === "q" && (h = 2 * u - h, p = 2 * a - p), E = h, S = p, e[y](h + x, p + T, b + x, w + T), u = b, a = w, h = u + t[1], p = a + t[2];
							break;
						case "T":
							b = t[1], w = t[2], h = 2 * u - h, p = 2 * a - p, e[y](h + x, p + T, b + x, w + T), u = b, a = w;
							break;
						case "a":
							O(e, u + x, a + T, [t[1], t[2], t[3], t[4], t[5], t[6] + u + x, t[7] + a + T]), u += t[6], a += t[7];
							break;
						case "A":
							O(e, u + x, a + T, [t[1], t[2], t[3], t[4], t[5], t[6] + x, t[7] + T]), u = t[6], a = t[7];
							break;
						case "z":
						case "Z":
							e.closePath()
					}
					n = t
				}
			},
			render: function(e, n) {
				if (!this.visible) return;
				e.save();
				var r = this[b];
				r && e.transform(r[0], r[1], r[2], r[3], r[4], r[5]), n || this.transform(e), this._setStrokeStyles(e), this._setFillStyles(e), this._setShadow(e), this.clipTo && N[t].clipContext(this, e), e.beginPath(), this._render(e), this._renderFill(e), this._renderStroke(e), this.clipTo && e.restore(), this._removeShadow(e), !n && this.active && (this.drawBorders(e), this.drawControls(e)), e.restore()
			},
			toString: function() {
				return "#<fabric.Path (" + this.complexity() + '): { "top": ' + this[p] + ', "left": ' + this[h] + " }>"
			},
			toObject: function(e) {
				var t = L(this.callSuper(w, e), {
					path: this[o],
					pathOffset: this[d]
				});
				return this[u] && (t[u] = this[u]), this[b] && (t[b] = this[b]), t
			},
			toDatalessObject: function(e) {
				var t = this[w](e);
				return this[u] && (t[o] = this[u]), delete t[u], t
			},
			toSVG: function(e) {
				var t = [],
					n = this._createBaseSVGMarkup();
				for (var r = 0, s = this[o][i]; r < s; r++) t[E](this[o][r].join(" "));
				var u = t.join(" ");
				return n[E]('<g transform="', this.group ? "" : this.getSvgTransform(), '">', "<path ", 'd="', u, '" style="', this.getSvgStyles(), '" transform="translate(', -this[f] / 2, " ", -this[c] / 2, ")", '" stroke-linecap="round" ', "/>", "</g>"), e ? e(n.join("")) : n.join("")
			},
			complexity: function() {
				return this[o][i]
			},
			_parsePath: function() {
				var e = [],
					t = [],
					n, r, s = /(-?\.\d+)|(-?\d+(\.\d+)?)/g,
					u, a;
				for (var f = 0, l, c = this[o][i]; f < c; f++) {
					n = this[o][f], a = n.slice(1).trim(), t[i] = 0;
					while (u = s.exec(a)) t[E](u[0]);
					l = [n.charAt(0)];
					for (var h = 0, p = t[i]; h < p; h++) r = parseFloat(t[h]), isNaN(r) || l[E](r);
					var d = l[0][S](),
						v = T[d];
					if (l[i] - 1 > v)
						for (var m = 1, g = l[i]; m < g; m += v) e[E]([l[0]].concat(l.slice(m, m + v)));
					else e[E](l)
				}
				return e
			},
			_parseDimensions: function() {
				var e = [],
					t = [],
					n = {};
				this[o].forEach(function(r, i) {
					this._getCoordsFromCommand(r, i, e, t, n)
				}, this);
				var r = C(e),
					i = C(t),
					s = k(e),
					u = k(t),
					a = s - r,
					f = u - i,
					l = {
						left: this[h] + (r + a / 2),
						top: this[p] + (i + f / 2),
						width: a,
						height: f
					};
				return l
			},
			_getCoordsFromCommand: function(e, t, n, i, u) {
				var a = !1;
				e[0] !== r && (u.x = t === 0 ? M(e) : M(this[o][t - 1])), e[0] !== s && (u.y = t === 0 ? _(e) : _(this[o][t - 1])), e[0] === e[0][S]() && (a = !0);
				var f = this._getXY(e, a, u),
					l = parseInt(f.x, 10);
				isNaN(l) || n[E](l), l = parseInt(f.y, 10), isNaN(l) || i[E](l)
			},
			_getXY: function(e, t, n) {
				var i = t ? n.x + M(e) : e[0] === s ? n.x : M(e),
					o = t ? n.y + _(e) : e[0] === r ? n.y : _(e);
				return {
					x: i,
					y: o
				}
			}
		}), N[n].fromObject = function(e, r) {
			typeof e[o] == "string" ? N.loadSVGFromURL(e[o], function(n) {
				var i = n[0],
					s = e[o];
				delete e[o], N[t].object.extend(i, e), i[a](s), r(i)
			}) : r(new N[n](e[o], e))
		}, N[n][x] = N.SHARED_ATTRIBUTES.concat(["d"]), N[n].fromElement = function(e, t, r) {
			var i = N.parseAttributes(e, N[n][x]);
			t && t(new N[n](i.d, L(i, r)))
		}, N[n].async = !0
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";
		var t = "util",
			n = "toObject",
			r = "PathGroup",
			i = "paths",
			s = "length",
			o = "sourcePath",
			u = "fill",
			a = "getObjects",
			f = "complexity",
			l = e.fabric || (e.fabric = {}),
			c = l[t].object.extend,
			h = l[t].array.invoke,
			p = l.Object.prototype[n];
		if (l[r]) {
			l.warn("fabric.PathGroup is already defined");
			return
		}
		l[r] = l[t].createClass(l.Path, {
			type: "path-group",
			fill: "",
			initialize: function(e, t) {
				t = t || {}, this[i] = e || [];
				for (var n = this[i][s]; n--;) this[i][n].group = this;
				this.setOptions(t), this.setCoords(), t[o] && this.setSourcePath(t[o])
			},
			render: function(e) {
				if (!this.visible) return;
				e.save();
				var n = this.transformMatrix;
				n && e.transform(n[0], n[1], n[2], n[3], n[4], n[5]), this.transform(e), this._setShadow(e), this.clipTo && l[t].clipContext(this, e);
				for (var r = 0, o = this[i][s]; r < o; ++r) this[i][r].render(e, !0);
				this.clipTo && e.restore(), this._removeShadow(e), this.active && (this.drawBorders(e), this.drawControls(e)), e.restore()
			},
			_set: function(e, t) {
				if (e === u && t && this.isSameColor()) {
					var n = this[i][s];
					while (n--) this[i][n]._set(e, t)
				}
				return this.callSuper("_set", e, t)
			},
			toObject: function(e) {
				var t = c(p.call(this, e), {
					paths: h(this[a](), n, e)
				});
				return this[o] && (t[o] = this[o]), t
			},
			toDatalessObject: function(e) {
				var t = this[n](e);
				return this[o] && (t[i] = this[o]), t
			},
			toSVG: function(e) {
				var t = this[a](),
					n = ["<g ", 'style="', this.getSvgStyles(), '" ', 'transform="', this.getSvgTransform(), '" ', ">"];
				for (var r = 0, i = t[s]; r < i; r++) n.push(t[r].toSVG(e));
				return n.push("</g>"), e ? e(n.join("")) : n.join("")
			},
			toString: function() {
				return "#<fabric.PathGroup (" + this[f]() + "): { top: " + this.top + ", left: " + this.left + " }>"
			},
			isSameColor: function() {
				var e = this[a]()[0].get(u);
				return this[a]().every(function(t) {
					return t.get(u) === e
				})
			},
			complexity: function() {
				return this[i].reduce(function(e, t) {
					return e + (t && t[f] ? t[f]() : 0)
				}, 0)
			},
			getObjects: function() {
				return this[i]
			}
		}), l[r].fromObject = function(e, n) {
			typeof e[i] == "string" ? l.loadSVGFromURL(e[i], function(r) {
				var s = e[i];
				delete e[i];
				var o = l[t].groupSVGElements(r, e, s);
				n(o)
			}) : l[t].enlivenObjects(e[i], function(t) {
				delete e[i], n(new l[r](t, e))
			})
		}, l[r].async = !0
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";
		var t = "util",
			n = "Group",
			r = !0,
			i = "group",
			s = "_objects",
			o = "length",
			u = "_calcBounds",
			a = "_updateObjectsCoords",
			f = "setCoords",
			l = "forEachObject",
			c = "getLeft",
			h = "getTop",
			p = "set",
			d = "left",
			v = "top",
			m = "__origHasControls",
			g = "hasControls",
			y = !1,
			b = "_restoreObjectsState",
			w = "push",
			E = "_setObjectActive",
			S = "active",
			x = "_moveFlippedObject",
			T = "delegatedProperties",
			N = "toObject",
			C = "borderScaleFactor",
			k = "hasRotatingPoint",
			L = "scaleX",
			A = "scaleY",
			O = "get",
			M = "center",
			_ = "getAngle",
			D = "_originalLeft",
			P = "_originalTop",
			H = "opacity",
			B = "oCoords",
			j = e.fabric || (e.fabric = {}),
			F = j[t].object.extend,
			I = j[t].array.min,
			q = j[t].array.max,
			R = j[t].array.invoke;
		if (j[n]) return;
		var U = {
			lockMovementX: r,
			lockMovementY: r,
			lockRotation: r,
			lockScalingX: r,
			lockScalingY: r,
			lockUniScaling: r
		};
		j[n] = j[t].createClass(j.Object, j.Collection, {
			type: i,
			initialize: function(e, t) {
				t = t || {}, this[s] = e || [];
				for (var n = this[s][o]; n--;) this[s][n][i] = this;
				this.originalState = {}, this.callSuper("initialize"), this[u](), this[a](), t && F(this, t), this._setOpacityIfSame(), this[f](r), this.saveCoords()
			},
			_updateObjectsCoords: function() {
				this[l](this._updateObjectCoords, this)
			},
			_updateObjectCoords: function(e) {
				var t = e[c](),
					n = e[h]();
				e[p]({
					originalLeft: t,
					originalTop: n,
					left: t - this[d],
					top: n - this[v]
				}), e[f](), e[m] = e[g], e[g] = y
			},
			toString: function() {
				return "#<fabric.Group: (" + this.complexity() + ")>"
			},
			addWithUpdate: function(e) {
				return this[b](), this[s][w](e), e[i] = this, this[l](this[E], this), this[u](), this[a](), this
			},
			_setObjectActive: function(e) {
				e[p](S, r), e[i] = this
			},
			removeWithUpdate: function(e) {
				return this[x](e), this[b](), this[l](this[E], this), this.remove(e), this[u](), this[a](), this
			},
			_onObjectAdded: function(e) {
				e[i] = this
			},
			_onObjectRemoved: function(e) {
				delete e[i], e[p](S, y)
			},
			delegatedProperties: {
				fill: r,
				opacity: r,
				fontFamily: r,
				fontWeight: r,
				fontSize: r,
				fontStyle: r,
				lineHeight: r,
				textDecoration: r,
				textAlign: r,
				backgroundColor: r
			},
			_set: function(e, t) {
				if (e in this[T]) {
					var n = this[s][o];
					this[e] = t;
					while (n--) this[s][n][p](e, t)
				} else this[e] = t
			},
			toObject: function(e) {
				return F(this.callSuper(N, e), {
					objects: R(this[s], N, e)
				})
			},
			render: function(e, n) {
				if (!this.visible) return;
				e.save(), this.transform(e), this.clipTo && j[t].clipContext(this, e);
				for (var r = 0, i = this[s][o]; r < i; r++) this._renderObject(this[s][r], e);
				this.clipTo && e.restore(), !n && this[S] && (this.drawBorders(e), this.drawControls(e)), e.restore()
			},
			_renderObject: function(e, t) {
				var n = e[C],
					r = e[k],
					i = Math.max(this[L], this[A]);
				if (!e.visible) return;
				e[C] = i, e[k] = y, e.render(t), e[C] = n, e[k] = r
			},
			_restoreObjectsState: function() {
				return this[s].forEach(this._restoreObjectState, this), this
			},
			_moveFlippedObject: function(e) {
				var t = e[O]("originX"),
					n = e[O]("originY"),
					r = e.getCenterPoint();
				e[p]({
					originX: M,
					originY: M,
					left: r.x,
					top: r.y
				}), this._toggleFlipping(e);
				var i = e.getPointByOrigin(t, n);
				return e[p]({
					originX: t,
					originY: n,
					left: i.x,
					top: i.y
				}), this
			},
			_toggleFlipping: function(e) {
				this.flipX && (e.toggle("flipX"), e[p](d, -e[O](d)), e.setAngle(-e[_]())), this.flipY && (e.toggle("flipY"), e[p](v, -e[O](v)), e.setAngle(-e[_]()))
			},
			_restoreObjectState: function(e) {
				return this._setObjectPosition(e), e[f](), e[g] = e[m], delete e[m], e[p](S, y), e[f](), delete e[i], this
			},
			_setObjectPosition: function(e) {
				var t = this[c](),
					n = this[h](),
					r = this._getRotatedLeftTop(e);
				e[p]({
					angle: e[_]() + this[_](),
					left: t + r[d],
					top: n + r[v],
					scaleX: e[O](L) * this[O](L),
					scaleY: e[O](A) * this[O](A)
				})
			},
			_getRotatedLeftTop: function(e) {
				var t = this[_]() * (Math.PI / 180);
				return {
					left: -Math.sin(t) * e[h]() * this[O](A) + Math.cos(t) * e[c]() * this[O](L),
					top: Math.cos(t) * e[h]() * this[O](A) + Math.sin(t) * e[c]() * this[O](L)
				}
			},
			destroy: function() {
				return this[s].forEach(this[x], this), this[b]()
			},
			saveCoords: function() {
				return this[D] = this[O](d), this[P] = this[O](v), this
			},
			hasMoved: function() {
				return this[D] !== this[O](d) || this[P] !== this[O](v)
			},
			setObjectsCoords: function() {
				return this[l](function(e) {
					e[f]()
				}), this
			},
			_setOpacityIfSame: function() {
				var e = this.getObjects(),
					t = e[0] ? e[0][O](H) : 1,
					n = e.every(function(e) {
						return e[O](H) === t
					});
				n && (this[H] = t)
			},
			_calcBounds: function() {
				var e = [],
					t = [],
					n;
				for (var r = 0, i = this[s][o]; r < i; ++r) {
					n = this[s][r], n[f]();
					for (var u in n[B]) e[w](n[B][u].x), t[w](n[B][u].y)
				}
				this[p](this._getBounds(e, t))
			},
			_getBounds: function(e, t) {
				var n = I(e),
					r = q(e),
					i = I(t),
					s = q(t),
					o = r - n || 0,
					u = s - i || 0;
				return {
					width: o,
					height: u,
					left: n + o / 2 || 0,
					top: i + u / 2 || 0
				}
			},
			toSVG: function(e) {
				var t = ["<g ", 'transform="', this.getSvgTransform(), '">'];
				for (var n = 0, r = this[s][o]; n < r; n++) t[w](this[s][n].toSVG(e));
				return t[w]("</g>"), e ? e(t.join("")) : t.join("")
			},
			get: function(e) {
				if (e in U) {
					if (this[e]) return this[e];
					for (var t = 0, n = this[s][o]; t < n; t++)
						if (this[s][t][e]) return r;
					return y
				}
				return e in this[T] ? this[s][0] && this[s][0][O](e) : this[e]
			}
		}), j[n].fromObject = function(e, r) {
			j[t].enlivenObjects(e.objects, function(t) {
				delete e.objects, r && r(new j[n](t, e))
			})
		}, j[n].async = r
	}(typeof exports != "undefined" ? exports : this),
	function(e) {
		"use strict";
		var t = "util",
			n = "fabric",
			r = "Image",
			i = "filters",
			s = "_initConfig",
			o = "applyFilters",
			u = "_element",
			a = "_originalElement",
			f = "length",
			l = "crossOrigin",
			c = "getElement",
			h = "width",
			p = "height",
			d = "group",
			v = "restore",
			m = "_setStrokeStyles",
			g = "drawDashedLine",
			y = "strokeDashArray",
			b = "toObject",
			w = '" style="',
			E = "getSvgStyles",
			S = '" width="',
			x = '" height="',
			T = null,
			N = "fromObject",
			C = "pngCompression",
			k = "CSS_CANVAS",
			L = "prototype",
			A = "ATTRIBUTE_NAMES",
			O = fabric[t].object.extend;
		e[n] || (e[n] = {});
		if (e[n][r]) {
			fabric.warn("fabric.Image is already defined.");
			return
		}
		fabric[r] = fabric[t].createClass(fabric.Object, {
			type: "image",
			crossOrigin: "",
			initialize: function(e, t) {
				t || (t = {}), this[i] = [], this.callSuper("initialize", t), this._initElement(e, t), this[s](t), t[i] && (this[i] = t[i], this[o]())
			},
			getElement: function() {
				return this[u]
			},
			setElement: function(e, t) {
				return this[u] = e, this[a] = e, this[s](), this[i][f] !== 0 && this[o](t), this
			},
			setCrossOrigin: function(e) {
				return this[l] = e, this[u][l] = e, this
			},
			getOriginalSize: function() {
				var e = this[c]();
				return {
					width: e[h],
					height: e[p]
				}
			},
			render: function(e, n) {
				if (!this.visible) return;
				e.save();
				var r = this.transformMatrix,
					i = this[d] && this[d].type === "path-group";
				i && e.translate(-this[d][h] / 2 + this[h] / 2, -this[d][p] / 2 + this[p] / 2), r && e.transform(r[0], r[1], r[2], r[3], r[4], r[5]), n || this.transform(e), e.save(), this._setShadow(e), this.clipTo && fabric[t].clipContext(this, e), this._render(e), this.shadow && !this.shadow.affectStroke && this._removeShadow(e), this._renderStroke(e), this.clipTo && e[v](), e[v](), this.active && !n && (this.drawBorders(e), this.drawControls(e)), e[v]()
			},
			_stroke: function(e) {
				e.save(), this[m](e), e.beginPath(), e.strokeRect(-this[h] / 2, -this[p] / 2, this[h], this[p]), e.closePath(), e[v]()
			},
			_renderDashedStroke: function(e) {
				var n = -this[h] / 2,
					r = -this[p] / 2,
					i = this[h],
					s = this[p];
				e.save(), this[m](e), e.beginPath(), fabric[t][g](e, n, r, n + i, r, this[y]), fabric[t][g](e, n + i, r, n + i, r + s, this[y]), fabric[t][g](e, n + i, r + s, n, r + s, this[y]), fabric[t][g](e, n, r + s, n, r, this[y]), e.closePath(), e[v]()
			},
			toObject: function(e) {
				return O(this.callSuper(b, e), {
					src: this[a].src || this[a]._src,
					filters: this[i].map(function(e) {
						return e && e[b]()
					}),
					crossOrigin: this[l]
				})
			},
			toSVG: function(e) {
				var t = [];
				t.push('<g transform="', this.getSvgTransform(), '">', '<image xlink:href="', this.getSvgSrc(), w, this[E](), '" transform="translate(' + -this[h] / 2 + " " + -this[p] / 2 + ")", S, this[h], x, this[p], '" preserveAspectRatio="none"', "></image>");
				if (this.stroke || this[y]) {
					var n = this.fill;
					this.fill = T, t.push("<rect ", 'x="', -1 * this[h] / 2, '" y="', -1 * this[p] / 2, S, this[h], x, this[p], w, this[E](), '"/>'), this.fill = n
				}
				return t.push("</g>"), e ? e(t.join("")) : t.join("")
			},
			getSrc: function() {
				return this[c]().src || this[c]()._src
			},
			toString: function() {
				return '#<fabric.Image: { src: "' + this.getSrc() + '" }>'
			},
			clone: function(e, t) {
				this.constructor[N](this[b](t), e)
			},
			applyFilters: function(e) {
				if (this[i][f] === 0) {
					this[u] = this[a], e && e();
					return
				}
				var n = this[a],
					s = fabric[t].createCanvasElement(),
					o = fabric[t].createImage(),
					l = this;
				return s[h] = n[h], s[p] = n[p], s.getContext("2d").drawImage(n, 0, 0, n[h], n[p]), this[i].forEach(function(e) {
					e && e.applyTo(s)
				}), o[h] = n[h], o[p] = n[p], fabric.isLikelyNode ? (o.src = s.toBuffer(undefined, fabric[r][C]), l[u] = o, e && e()) : (o.onload = function() {
					l[u] = o, e && e(), o.onload = s = n = T
				}, o.src = s.toDataURL("image/png")), this
			},
			_render: function(e) {
				e.drawImage(this[u], -this[h] / 2, -this[p] / 2, this[h], this[p])
			},
			_resetWidthHeight: function() {
				var e = this[c]();
				this.set(h, e[h]), this.set(p, e[p])
			},
			_initElement: function(e) {
				this.setElement(fabric[t].getById(e)), fabric[t].addClass(this[c](), fabric[r][k])
			},
			_initConfig: function(e) {
				e || (e = {}), this.setOptions(e), this._setWidthHeight(e), this[u][l] = this[l]
			},
			_initFilters: function(e, n) {
				e[i] && e[i][f] ? fabric[t].enlivenObjects(e[i], function(e) {
					n && n(e)
				}, "fabric.Image.filters") : n && n()
			},
			_setWidthHeight: function(e) {
				this[h] = h in e ? e[h] : this[c]()[h] || 0, this[p] = p in e ? e[p] : this[c]()[p] || 0
			},
			complexity: function() {
				return 1
			}
		}), fabric[r][k] = "canvas-img", fabric[r][L].getSvgSrc = fabric[r][L].getSrc, fabric[r][N] = function(e, n) {
			fabric[t].loadImage(e.src, function(t) {
				fabric[r][L]._initFilters.call(e, e, function(s) {
					e[i] = s || [];
					var o = new fabric[r](t, e);
					n && n(o)
				})
			}, T, e[l])
		}, fabric[r].fromURL = function(e, n, i) {
			fabric[t].loadImage(e, function(e) {
				n(new fabric[r](e, i))
			}, T, i && i[l])
		}, fabric[r][A] = fabric.SHARED_ATTRIBUTES.concat("x y width height xlink:href".split(" ")), fabric[r].fromElement = function(e, n, i) {
			var s = fabric.parseAttributes(e, fabric[r][A]);
			fabric[r].fromURL(s["xlink:href"], n, O(i ? fabric[t].object.clone(i) : {}, s))
		}, fabric[r].async = !0, fabric[r][C] = 1
	}(typeof exports != "undefined" ? exports : this);