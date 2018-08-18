! function(e) {
	var t = "undefined";
	if ("object" == typeof exports && t != typeof module) module.exports = e();
	else if ("function" == typeof define && define.amd) define([], e);
	else {
		var n;
		t != typeof window ? n = window : t != typeof global ? n = global : t != typeof self && (n = self), n.Reflux = e()
	}
}(function() {
	var e = "function",
		t = "ListenerMethods",
		n = "length",
		r = "_events",
		i = "prototype",
		s = "./utils",
		o = "exports",
		u = "subscriptions",
		a = "Cannot override API method ",
		f = "getInitialState",
		l = "Not a function",
		c = "PublisherMethods",
		h = "isFunction",
		p = 'Publisher must have "completed" and "failed" child publishers',
		d = "call",
		v = "context",
		m = "children",
		g = "object",
		y = "Failed to remove listen from subscriptions list!",
		b = "apply",
		w = "removeListener",
		E = "undefined",
		S = "listenablesEmitted",
		x = "EventEmitter",
		T = "createdActions",
		N = "./index",
		C = "triggered",
		k = "createdStores",
		L = "completed",
		A = "reject",
		O = "numberOfListenables",
		M = "resolve",
		_ = "Can't have other property '",
		D = "stopListeningToAll",
		P = "throwIf",
		H = "chain",
		B = "extend",
		j = "hasListener",
		F = "triggerAsync",
		I = "indexOf",
		q = "promise",
		R = "all",
		U = "push",
		z = "eventLabel",
		W = "shouldEmit",
		X = "failed",
		V = "__NPO__",
		$ = "[object Array]",
		J = "Promise",
		K = "ListenerMixin",
		Q = "createPromise",
		G = "./ListenerMethods",
		Y = "listenTo",
		Z = "ActionMethods",
		et = "instanceJoinCreator",
		tt = "listenToMany",
		nt = "StoreMethods",
		rt = "Not an array",
		it = "componentWillUnmount",
		st = "./createStore",
		ot = "strict",
		ut = "concat",
		at = "setState",
		ft = "./Keep",
		lt = "nextTick",
		ct = "listen",
		ht = "capitalize",
		pt = "defineProperty",
		dt = "validateListening",
		vt = "constructor",
		mt = "staticJoinCreator",
		gt = "./joins",
		yt = "forEach",
		bt = "preEmit",
		wt = "joinTrailing",
		Et = "emitter",
		St = "joinLeading",
		xt = "last",
		Tt = "hasOwnProperty",
		Nt = "joinStrict",
		Ct = "Default",
		kt = "joinConcat",
		Lt = "isObject",
		At;
	return function Ot(t, r, i) {
		function s(n, a) {
			if (!r[n]) {
				if (!t[n]) {
					var f = e == typeof require && require;
					if (!a && f) return f(n, !0);
					if (u) return u(n, !0);
					throw new Error("Cannot find module '" + n + "'")
				}
				var l = r[n] = {
					exports: {}
				};
				t[n][0][d](l[o], function(e) {
					var r = t[n][1][e];
					return s(r ? r : e)
				}, l, l[o], Ot, t, r, i)
			}
			return r[n][o]
		}
		for (var u = e == typeof require && require, a = 0; a < i[n]; a++) s(i[a]);
		return s
	}({
		1: [function(e, t) {
			"use strict";

			function s(e, t, n) {
				this.fn = e, this[v] = t, this.once = n || !1
			}

			function u() {}
			u[i][r] = void 0, u[i].listeners = function(e) {
				if (!this[r] || !this[r][e]) return [];
				for (var t = 0, i = this[r][e][n], s = []; i > t; t++) s[U](this[r][e][t].fn);
				return s
			}, u[i].emit = function(e, t, i, s, o, u) {
				if (!this[r] || !this[r][e]) return !1;
				var a, f, l, c = this[r][e],
					h = c[n],
					p = arguments[n],
					m = c[0];
				if (1 === h) {
					switch (m.once && this[w](e, m.fn, !0), p) {
						case 1:
							return m.fn[d](m[v]), !0;
						case 2:
							return m.fn[d](m[v], t), !0;
						case 3:
							return m.fn[d](m[v], t, i), !0;
						case 4:
							return m.fn[d](m[v], t, i, s), !0;
						case 5:
							return m.fn[d](m[v], t, i, s, o), !0;
						case 6:
							return m.fn[d](m[v], t, i, s, o, u), !0
					}
					for (f = 1, a = new Array(p - 1); p > f; f++) a[f - 1] = arguments[f];
					m.fn[b](m[v], a)
				} else
					for (f = 0; h > f; f++) switch (c[f].once && this[w](e, c[f].fn, !0), p) {
						case 1:
							c[f].fn[d](c[f][v]);
							break;
						case 2:
							c[f].fn[d](c[f][v], t);
							break;
						case 3:
							c[f].fn[d](c[f][v], t, i);
							break;
						default:
							if (!a)
								for (l = 1, a = new Array(p - 1); p > l; l++) a[l - 1] = arguments[l];
							c[f].fn[b](c[f][v], a)
					}
				return !0
			}, u[i].on = function(e, t, n) {
				return this[r] || (this[r] = {}), this[r][e] || (this[r][e] = []), this[r][e][U](new s(t, n || this)), this
			}, u[i].once = function(e, t, n) {
				return this[r] || (this[r] = {}), this[r][e] || (this[r][e] = []), this[r][e][U](new s(t, n || this, !0)), this
			}, u[i][w] = function(e, t, i) {
				if (!this[r] || !this[r][e]) return this;
				var s = this[r][e],
					o = [];
				if (t)
					for (var u = 0, a = s[n]; a > u; u++) s[u].fn !== t && s[u].once !== i && o[U](s[u]);
				return this[r][e] = o[n] ? o : null, this
			}, u[i].removeAllListeners = function(e) {
				return this[r] ? (e ? this[r][e] = null : this[r] = {}, this) : this
			}, u[i].off = u[i][w], u[i].addListener = u[i].on, u[i].setMaxListeners = function() {
				return this
			}, u[x] = u, u.EventEmitter2 = u, u.EventEmitter3 = u, g == typeof t && t[o] && (t[o] = u)
		}, {}],
		2: [function(t, r) {
			((function(t) {
				! function(t, n, i) {
					n[t] = n[t] || i(), E != typeof r && r[o] ? r[o] = n[t] : e == typeof At && At.amd && At(function() {
						return n[t]
					})
				}(J, E != typeof t ? t : this, function() {
					"use strict";

					function t(e, t) {
						y.add(e, t), m || (m = S(y.drain))
					}

					function r(t) {
						var n, r = typeof t;
						return null == t || g != r && e != r || (n = t.then), e == typeof n ? n : !1
					}

					function s() {
						for (var e = 0; e < this[H][n]; e++) o(this, 1 === this.state ? this[H][e].success : this[H][e].failure, this[H][e]);
						this[H][n] = 0
					}

					function o(e, t, n) {
						var i, s;
						try {
							t === !1 ? n[A](e.msg) : (i = t === !0 ? e.msg : t[d](void 0, e.msg), i === n[q] ? n[A](TypeError("Promise-chain cycle")) : (s = r(i)) ? s[d](i, n[M], n[A]) : n[M](i))
						} catch (o) {
							n[A](o)
						}
					}

					function u(e) {
						var i, o, f = this;
						if (!f[C]) {
							f[C] = !0, f.def && (f = f.def);
							try {
								(i = r(e)) ? (o = new c(f), i[d](e, function() {
									u[b](o, arguments)
								}, function() {
									a[b](o, arguments)
								})) : (f.msg = e, f.state = 1, f[H][n] > 0 && t(s, f))
							} catch (l) {
								a[d](o || new c(f), l)
							}
						}
					}

					function a(e) {
						var r = this;
						r[C] || (r[C] = !0, r.def && (r = r.def), r.msg = e, r.state = 2, r[H][n] > 0 && t(s, r))
					}

					function f(e, t, r, i) {
						for (var s = 0; s < t[n]; s++) ! function(n) {
							e[M](t[n]).then(function(e) {
								r(n, e)
							}, i)
						}(s)
					}

					function c(e) {
						this.def = e, this[C] = !1
					}

					function h(e) {
						this[q] = e, this.state = 0, this[C] = !1, this[H] = [], this.msg = void 0
					}

					function p(n) {
						if (e != typeof n) throw TypeError(l);
						if (0 !== this[V]) throw TypeError("Not a promise");
						this[V] = 1;
						var r = new h(this);
						this.then = function(n, i) {
							var o = {
								success: e == typeof n ? n : !0,
								failure: e == typeof i ? i : !1
							};
							return o[q] = new this[vt](function(t, n) {
								if (e != typeof t || e != typeof n) throw TypeError(l);
								o[M] = t, o[A] = n
							}), r[H][U](o), 0 !== r.state && t(s, r), o[q]
						}, this["catch"] = function(e) {
							return this.then(void 0, e)
						};
						try {
							n[d](void 0, function(e) {
								u[d](r, e)
							}, function(e) {
								a[d](r, e)
							})
						} catch (i) {
							a[d](r, i)
						}
					}
					var v, m, y, w = Object[i].toString,
						S = E != typeof setImmediate ? function(e) {
							return setImmediate(e)
						} : setTimeout;
					try {
						Object[pt]({}, "x", {}), v = function(e, t, n, r) {
							return Object[pt](e, t, {
								value: n,
								writable: !0,
								configurable: r !== !1
							})
						}
					} catch (x) {
						v = function(e, t, n) {
							return e[t] = n, e
						}
					}
					y = function() {
						function e(e, t) {
							this.fn = e, this.self = t, this.next = void 0
						}
						var t, n, r;
						return {
							add: function(i, s) {
								r = new e(i, s), n ? n.next = r : t = r, n = r, r = void 0
							},
							drain: function() {
								var e = t;
								for (t = n = m = void 0; e;) e.fn[d](e.self), e = e.next
							}
						}
					}();
					var T = v({}, vt, p, !1);
					return v(p, i, T, !1), v(T, V, 0, !1), v(p, M, function(t) {
						var n = this;
						return t && g == typeof t && 1 === t[V] ? t : new n(function(n, r) {
							if (e != typeof n || e != typeof r) throw TypeError(l);
							n(t)
						})
					}), v(p, A, function(t) {
						return new this(function(n, r) {
							if (e != typeof n || e != typeof r) throw TypeError(l);
							r(t)
						})
					}), v(p, R, function(t) {
						var r = this;
						return $ != w[d](t) ? r[A](TypeError(rt)) : 0 === t[n] ? r[M]([]) : new r(function(i, s) {
							if (e != typeof i || e != typeof s) throw TypeError(l);
							var o = t[n],
								u = Array(o),
								a = 0;
							f(r, t, function(e, t) {
								u[e] = t, ++a === o && i(u)
							}, s)
						})
					}), v(p, "race", function(t) {
						var n = this;
						return $ != w[d](t) ? n[A](TypeError(rt)) : new n(function(r, i) {
							if (e != typeof r || e != typeof i) throw TypeError(l);
							f(n, t, function(e, t) {
								r(t)
							}, i)
						})
					}), p
				})
			}))[d](this, E != typeof self ? self : E != typeof window ? window : {})
		}, {}],
		3: [function(e, t) {
			t[o] = {}
		}, {}],
		4: [function(e, t, r) {
			r[k] = [], r[T] = [], r.reset = function() {
				for (; r[k][n];) r[k].pop();
				for (; r[T][n];) r[T].pop()
			}
		}, {}],
		5: [function(e, t) {
			var r = e(s),
				i = e(gt)[et],
				a = function(e) {
					for (var t, r = 0, i = {}; r < (e[m] || [])[n]; ++r) t = e[m][r], e[t] && (i[t] = e[t]);
					return i
				},
				l = function(e) {
					var t = {};
					for (var n in e) {
						var i = e[n],
							s = a(i),
							o = l(s);
						t[n] = i;
						for (var u in o) {
							var f = o[u];
							t[n + r[ht](u)] = f
						}
					}
					return t
				};
			t[o] = {
				hasListener: function(e) {
					for (var t, r, i, s = 0; s < (this[u] || [])[n]; ++s)
						for (i = [][ut](this[u][s].listenable), t = 0; t < i[n]; t++)
							if (r = i[t], r === e || r[j] && r[j](e)) return !0;
					return !1
				},
				listenToMany: function(e) {
					var t = l(e);
					for (var n in t) {
						var i = r.callbackName(n),
							s = this[i] ? i : this[n] ? n : void 0;
						s && this[Y](t[n], s, this[i + Ct] || this[s + Ct] || s)
					}
				},
				validateListening: function(e) {
					return e === this ? "Listener is not able to listen to itself" : r[h](e[ct]) ? e[j] && e[j](this) ? "Listener cannot listen to this listenable because of circular loop" : void 0 : e + " is missing a listen method"
				},
				listenTo: function(e, t, n) {
					var i, s, o, a = this[u] = this[u] || [];
					return r[P](this[dt](e)), this.fetchInitialState(e, n), i = e[ct](this[t] || t, this), s = function() {
						var e = a[I](o);
						r[P](-1 === e, "Tried to remove listen already gone from subscriptions list!"), a.splice(e, 1), i()
					}, o = {
						stop: s,
						listenable: e
					}, a[U](o), o
				},
				stopListeningTo: function(e) {
					for (var t, i = 0, s = this[u] || []; i < s[n]; i++)
						if (t = s[i], t.listenable === e) return t.stop(), r[P](-1 !== s[I](t), y), !0;
					return !1
				},
				stopListeningToAll: function() {
					for (var e, t = this[u] || []; e = t[n];) t[0].stop(), r[P](t[n] !== e - 1, y)
				},
				fetchInitialState: function(e, t) {
					t = t && this[t] || t;
					var n = this;
					if (r[h](t) && r[h](e[f])) {
						var i = e[f]();
						i && r[h](i.then) ? i.then(function() {
							t[b](n, arguments)
						}) : t[d](this, i)
					}
				},
				joinTrailing: i(xt),
				joinLeading: i("first"),
				joinConcat: i(R),
				joinStrict: i(ot)
			}
		}, {
			"./joins": 15,
			"./utils": 19
		}],
		6: [function(e, t) {
			var n = e(s),
				r = e(G);
			t[o] = n[B]({
				componentWillUnmount: r[D]
			}, r)
		}, {
			"./ListenerMethods": 5,
			"./utils": 19
		}],
		7: [function(e, t) {
			var n = e(s);
			t[o] = {
				preEmit: function() {},
				shouldEmit: function() {
					return !0
				},
				listen: function(e, t) {
					t = t || this;
					var n = function(n) {
							e[b](t, n)
						},
						r = this;
					return this[Et].addListener(this[z], n),
						function() {
							r[Et][w](r[z], n)
						}
				},
				promise: function(e) {
					var t = this,
						n = this[m][I](L) >= 0 && this[m][I](X) >= 0;
					if (!n) throw new Error(p);
					e.then(function(e) {
						return t[L](e)
					}), e["catch"](function(e) {
						return t[X](e)
					})
				},
				listenAndPromise: function(e, t) {
					var n = this;
					return t = t || this, this[ct](function() {
						if (!e) throw new Error("Expected a function returning a promise but got " + e);
						var r = arguments,
							i = e[b](t, r);
						return n[q][d](n, i)
					}, t)
				},
				trigger: function() {
					var e = arguments,
						t = this[bt][b](this, e);
					e = void 0 === t ? e : n.isArguments(t) ? t : [][ut](t), this[W][b](this, e) && this[Et].emit(this[z], e)
				},
				triggerAsync: function() {
					var e = arguments,
						t = this;
					n[lt](function() {
						t.trigger[b](t, e)
					})
				},
				triggerPromise: function() {
					var e = this,
						t = arguments,
						r = this[m][I](L) >= 0 && this[m][I](X) >= 0;
					if (!r) throw new Error(p);
					var i = n[Q](function(n, r) {
						var i = e[L][ct](function(e) {
								i(), s(), n(e)
							}),
							s = e[X][ct](function(e) {
								i(), s(), r(e)
							});
						e[F][b](e, t)
					});
					return i
				}
			}
		}, {
			"./utils": 19
		}],
		8: [function(e, t) {
			t[o] = {}
		}, {}],
		9: [function(t, n) {
			n[o] = function(t, n) {
				for (var r in n) {
					var i = n[r];
					e == typeof i && n[Tt](r) && (t[r] = i.bind(t))
				}
				return t
			}
		}, {}],
		10: [function(e, n) {
			var r = e(N),
				i = e(s);
			n[o] = function(e, n) {
				return {
					getInitialState: function() {
						return i[h](e[f]) ? void 0 === n ? e[f]() : i[g]([n], [e[f]()]) : {}
					},
					componentDidMount: function() {
						i[B](this, r[t]);
						var s = this,
							o = void 0 === n ? this[at] : function(e) {
								s[at](i[g]([n], [e]))
							};
						this[Y](e, o)
					},
					componentWillUnmount: r[K][it]
				}
			}
		}, {
			"./index": 14,
			"./utils": 19
		}],
		11: [function(e, n) {
			var r = e(N),
				i = e(s);
			n[o] = function(e, n, s) {
				return s = i[h](n) ? n : s, {
					getInitialState: function() {
						if (i[h](e[f])) {
							if (i[h](n)) return s[d](this, e[f]());
							var t = s[d](this, e[f]());
							return t ? i[g]([n], [t]) : {}
						}
						return {}
					},
					componentDidMount: function() {
						i[B](this, r[t]);
						var o = this,
							u = function(e) {
								if (i[h](n)) o[at](s[d](o, e));
								else {
									var t = s[d](o, e);
									o[at](i[g]([n], [t]))
								}
							};
						this[Y](e, u)
					},
					componentWillUnmount: r[K][it]
				}
			}
		}, {
			"./index": 14,
			"./utils": 19
		}],
		12: [function(e, t) {
			var r = e(s),
				i = e(N),
				u = e(ft),
				f = {
					preEmit: 1,
					shouldEmit: 1
				},
				l = function(e) {
					e = e || {}, r[Lt](e) || (e = {
						actionName: e
					});
					for (var t in i[Z])
						if (!f[t] && i[c][t]) throw new Error(a + t + " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead.");
					for (var s in e)
						if (!f[s] && i[c][s]) throw new Error(a + s + " in action creation. Use another method name or override it on Reflux.PublisherMethods instead.");
					e[m] = e[m] || [], e.asyncResult && (e[m] = e[m][ut]([L, X]));
					for (var o = 0, h = {}; o < e[m][n]; o++) {
						var p = e[m][o];
						h[p] = l(p)
					}
					var d = r[B]({
							eventLabel: "action",
							emitter: new r[x],
							_isAction: !0
						}, i[c], i[Z], e),
						v = function() {
							v[v.sync ? "trigger" : F][b](v, arguments)
						};
					return r[B](v, h, d), u[T][U](v), v
				};
			t[o] = l
		}, {
			"./Keep": 4,
			"./index": 14,
			"./utils": 19
		}],
		13: [function(e, r) {
			var f = e(s),
				l = e(N),
				p = e(ft),
				d = e("./mixer"),
				v = {
					preEmit: 1,
					shouldEmit: 1
				},
				m = e("./bindMethods");
			r[o] = function(e) {
				function r() {
					var t, r = 0;
					if (this[u] = [], this[Et] = new f[x], this[z] = "change", m(this, e), this.init && f[h](this.init) && this.init(), this.listenables)
						for (t = [][ut](this.listenables); r < t[n]; r++) this[tt](t[r])
				}
				e = e || {};
				for (var s in l[nt])
					if (!v[s] && (l[c][s] || l[t][s])) throw new Error(a + s + " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead.");
				for (var o in e)
					if (!v[o] && (l[c][o] || l[t][o])) throw new Error(a + o + " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead.");
				e = d(e), f[B](r[i], l[t], l[c], l[nt], e);
				var g = new r;
				return p[k][U](g), g
			}
		}, {
			"./Keep": 4,
			"./bindMethods": 9,
			"./index": 14,
			"./mixer": 18,
			"./utils": 19
		}],
		14: [function(e, n, r) {
			r[Z] = e("./ActionMethods"), r[t] = e(G), r[c] = e("./PublisherMethods"), r[nt] = e("./StoreMethods"), r.createAction = e("./createAction"), r.createStore = e(st), r.connect = e("./connect"), r.connectFilter = e("./connectFilter"), r[K] = e("./ListenerMixin"), r[Y] = e("./listenTo"), r[tt] = e("./listenToMany");
			var o = e(gt)[mt];
			r[wt] = r[R] = o(xt), r[St] = o("first"), r[Nt] = o(ot), r[kt] = o(R);
			var u = e(s);
			r.createActions = function(e) {
				var t = {};
				for (var n in e) {
					var i = e[n],
						s = u[Lt](i) ? n : i;
					t[s] = r.createAction(i)
				}
				return t
			}, r.setEventEmitter = function(t) {
				var n = e(s);
				n[x] = t
			}, r.setPromise = function(t) {
				var n = e(s);
				n[J] = t
			}, r.setPromiseFactory = function(t) {
				var n = e(s);
				n[Q] = t
			}, r[lt] = function(t) {
				var n = e(s);
				n[lt] = t
			}, r.__keep = e(ft), Function[i].bind || console.error("Function.prototype.bind not available. ES5 shim required. https://github.com/spoike/refluxjs#es5")
		}, {
			"./ActionMethods": 3,
			"./Keep": 4,
			"./ListenerMethods": 5,
			"./ListenerMixin": 6,
			"./PublisherMethods": 7,
			"./StoreMethods": 8,
			"./connect": 10,
			"./connectFilter": 11,
			"./createAction": 12,
			"./createStore": 13,
			"./joins": 15,
			"./listenTo": 16,
			"./listenToMany": 17,
			"./utils": 19
		}],
		15: [function(e, t, r) {
			function o(e, t, r) {
				return function() {
					var i, s = r[u],
						o = s ? s[I](e) : -1;
					for (h[P](-1 === o, "Tried to remove join already gone from subscriptions list!"), i = 0; i < t[n]; i++) t[i]();
					s.splice(o, 1)
				}
			}

			function a(e) {
				e[S] = new Array(e[O]), e.args = new Array(e[O])
			}

			function f(e, t) {
				return function() {
					var n = c[d](arguments);
					if (t[S][e]) switch (t.strategy) {
						case ot:
							throw new Error("Strict join failed because listener triggered twice.");
						case xt:
							t.args[e] = n;
							break;
						case R:
							t.args[e][U](n)
					} else t[S][e] = !0, t.args[e] = R === t.strategy ? [n] : n;
					l(t)
				}
			}

			function l(e) {
				for (var t = 0; t < e[O]; t++)
					if (!e[S][t]) return;
				e.callback[b](e.listener, e.args), a(e)
			}
			var c = Array[i].slice,
				h = e(s),
				p = e(st),
				v = {
					strict: Nt,
					first: St,
					last: wt,
					all: kt
				};
			r[mt] = function(e) {
				return function() {
					var t = c[d](arguments);
					return p({
						init: function() {
							this[v[e]][b](this, t[ut](F))
						}
					})
				}
			}, r[et] = function(e) {
				return function() {
					h[P](arguments[n] < 3, "Cannot create a join with less than 2 listenables!");
					var t, r, i = c[d](arguments),
						s = i.pop(),
						l = i[n],
						p = {
							numberOfListenables: l,
							callback: this[s] || s,
							listener: this,
							strategy: e
						},
						v = [];
					for (t = 0; l > t; t++) h[P](this[dt](i[t]));
					for (t = 0; l > t; t++) v[U](i[t][ct](f(t, p), this));
					return a(p), r = {
						listenable: i
					}, r.stop = o(r, v, this), this[u] = (this[u] || [])[ut](r), r
				}
			}
		}, {
			"./createStore": 13,
			"./utils": 19
		}],
		16: [function(e, n) {
			var r = e(N);
			n[o] = function(e, n, i) {
				return {
					componentDidMount: function() {
						for (var s in r[t])
							if (this[s] !== r[t][s]) {
								if (this[s]) throw _ + s + "' when using Reflux.listenTo!";
								this[s] = r[t][s]
							}
						this[Y](e, n, i)
					},
					componentWillUnmount: r[t][D]
				}
			}
		}, {
			"./index": 14
		}],
		17: [function(e, n) {
			var r = e(N);
			n[o] = function(e) {
				return {
					componentDidMount: function() {
						for (var n in r[t])
							if (this[n] !== r[t][n]) {
								if (this[n]) throw _ + n + "' when using Reflux.listenToMany!";
								this[n] = r[t][n]
							}
						this[tt](e)
					},
					componentWillUnmount: r[t][D]
				}
			}
		}, {
			"./index": 14
		}],
		18: [function(e, t) {
			var r = e(s);
			t[o] = function(e) {
				var t = {
						init: [],
						preEmit: [],
						shouldEmit: []
					},
					i = function s(e) {
						var n = {};
						return e.mixins && e.mixins[yt](function(e) {
							r[B](n, s(e))
						}), r[B](n, e), Object.keys(t)[yt](function(n) {
							e[Tt](n) && t[n][U](e[n])
						}), n
					}(e);
				return t.init[n] > 1 && (i.init = function() {
					var e = arguments;
					t.init[yt](function(t) {
						t[b](this, e)
					}, this)
				}), t[bt][n] > 1 && (i[bt] = function() {
					return t[bt].reduce(function(e, t) {
						var n = t[b](this, e);
						return void 0 === n ? e : [n]
					}.bind(this), arguments)
				}), t[W][n] > 1 && (i[W] = function() {
					var e = arguments;
					return !t[W].some(function(t) {
						return !t[b](this, e)
					}, this)
				}), Object.keys(t)[yt](function(e) {
					1 === t[e][n] && (i[e] = t[e][0])
				}), i
			}
		}, {
			"./utils": 19
		}],
		19: [function(t, r, i) {
			var s = i[Lt] = function(t) {
				var n = typeof t;
				return e === n || g === n && !!t
			};
			i[B] = function(e) {
				if (!s(e)) return e;
				for (var t, r, i = 1, o = arguments[n]; o > i; i++) {
					t = arguments[i];
					for (r in t) e[r] = t[r]
				}
				return e
			}, i[h] = function(t) {
				return e == typeof t
			}, i[x] = t("eventemitter3"), i[lt] = function(e) {
				setTimeout(e, 0)
			}, i[ht] = function(e) {
				return e.charAt(0).toUpperCase() + e.slice(1)
			}, i.callbackName = function(e) {
				return "on" + i[ht](e)
			}, i[g] = function(e, t) {
				for (var r = {}, i = 0; i < e[n]; i++) r[e[i]] = t[i];
				return r
			}, i[J] = t("native-promise-only"), i[Q] = function(e) {
				return new i[J](e)
			}, i.isArguments = function(e) {
				return g == typeof e && "callee" in e && "number" == typeof e[n]
			}, i[P] = function(e, t) {
				if (e) throw Error(t || e)
			}
		}, {
			eventemitter3: 1,
			"native-promise-only": 2
		}]
	}, {}, [14])(14)
});