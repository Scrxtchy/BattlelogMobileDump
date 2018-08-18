(function() {
	var e = "forEach",
		t = "length",
		n = "push",
		r = "reduce",
		i = "hasOwnProperty",
		s = "undefined",
		o = "nextTick",
		u = null,
		a = "forEachSeries",
		f = "call",
		l = "slice",
		c = "prototype",
		h = "apply",
		p = "concat",
		d = "value",
		v = "index",
		m = "reduceRight",
		g = "filterSeries",
		y = !0,
		b = "constructor",
		w = "tasks",
		E = "unmemoized",
		S = {},
		x = this,
		T = x.async;
	S.noConflict = function() {
		return x.async = T, S
	};
	var N = function(n, r) {
			if (n[e]) return n[e](r);
			for (var i = 0; i < n[t]; i += 1) r(n[i], i, n)
		},
		C = function(e, t) {
			if (e.map) return e.map(t);
			var r = [];
			return N(e, function(e, i, s) {
				r[n](t(e, i, s))
			}), r
		},
		k = function(e, t, n) {
			return e[r] ? e[r](t, n) : (N(e, function(e, r, i) {
				n = t(n, e, r, i)
			}), n)
		},
		L = function(e) {
			if (Object.keys) return Object.keys(e);
			var t = [];
			for (var r in e) e[i](r) && t[n](r);
			return t
		};
	typeof process === s || !process[o] ? S[o] = function(e) {
		setTimeout(e, 0)
	} : S[o] = process[o], S[e] = function(e, n, r) {
		r = r || function() {};
		if (!e[t]) return r();
		var i = 0;
		N(e, function(s) {
			n(s, function(n) {
				n ? (r(n), r = function() {}) : (i += 1, i === e[t] && r(u))
			})
		})
	}, S[a] = function(e, n, r) {
		r = r || function() {};
		if (!e[t]) return r();
		var i = 0,
			s = function() {
				n(e[i], function(n) {
					n ? (r(n), r = function() {}) : (i += 1, i === e[t] ? r(u) : s())
				})
			};
		s()
	}, S.forEachLimit = function(e, n, r, i) {
		i = i || function() {};
		if (!e[t] || n <= 0) return i();
		var s = 0,
			o = 0,
			u = 0;
		(function a() {
			if (s === e[t]) return i();
			while (u < n && o < e[t]) o += 1, u += 1, r(e[o - 1], function(n) {
				n ? (i(n), i = function() {}) : (s += 1, u -= 1, s === e[t] ? i() : a())
			})
		})()
	};
	var A = function(t) {
			return function() {
				var n = Array[c][l][f](arguments);
				return t[h](u, [S[e]][p](n))
			}
		},
		O = function(e) {
			return function() {
				var t = Array[c][l][f](arguments);
				return e[h](u, [S[a]][p](t))
			}
		},
		M = function(e, t, n, r) {
			var i = [];
			t = C(t, function(e, t) {
				return {
					index: t,
					value: e
				}
			}), e(t, function(e, t) {
				n(e[d], function(n, r) {
					i[e[v]] = r, t(n)
				})
			}, function(e) {
				r(e, i)
			})
		};
	S.map = A(M), S.mapSeries = O(M), S[r] = function(e, t, n, r) {
		S[a](e, function(e, r) {
			n(t, e, function(e, n) {
				t = n, r(e)
			})
		}, function(e) {
			r(e, t)
		})
	}, S.inject = S[r], S.foldl = S[r], S[m] = function(e, t, n, i) {
		var s = C(e, function(e) {
			return e
		}).reverse();
		S[r](s, t, n, i)
	}, S.foldr = S[m];
	var _ = function(e, t, r, i) {
		var s = [];
		t = C(t, function(e, t) {
			return {
				index: t,
				value: e
			}
		}), e(t, function(e, t) {
			r(e[d], function(r) {
				r && s[n](e), t()
			})
		}, function(e) {
			i(C(s.sort(function(e, t) {
				return e[v] - t[v]
			}), function(e) {
				return e[d]
			}))
		})
	};
	S.filter = A(_), S[g] = O(_), S.select = S.filter, S.selectSeries = S[g];
	var D = function(e, t, r, i) {
		var s = [];
		t = C(t, function(e, t) {
			return {
				index: t,
				value: e
			}
		}), e(t, function(e, t) {
			r(e[d], function(r) {
				r || s[n](e), t()
			})
		}, function(e) {
			i(C(s.sort(function(e, t) {
				return e[v] - t[v]
			}), function(e) {
				return e[d]
			}))
		})
	};
	S.reject = A(D), S.rejectSeries = O(D);
	var P = function(e, t, n, r) {
		e(t, function(e, t) {
			n(e, function(n) {
				n ? (r(e), r = function() {}) : t()
			})
		}, function(e) {
			r()
		})
	};
	S.detect = A(P), S.detectSeries = O(P), S.some = function(t, n, r) {
		S[e](t, function(e, t) {
			n(e, function(e) {
				e && (r(y), r = function() {}), t()
			})
		}, function(e) {
			r(!1)
		})
	}, S.any = S.some, S.every = function(t, n, r) {
		S[e](t, function(e, t) {
			n(e, function(e) {
				e || (r(!1), r = function() {}), t()
			})
		}, function(e) {
			r(y)
		})
	}, S.all = S.every, S.sortBy = function(e, t, n) {
		S.map(e, function(e, n) {
			t(e, function(t, r) {
				t ? n(t) : n(u, {
					value: e,
					criteria: r
				})
			})
		}, function(e, t) {
			if (e) return n(e);
			var r = function(e, t) {
				var n = e.criteria,
					r = t.criteria;
				return n < r ? -1 : n > r ? 1 : 0
			};
			n(u, C(t.sort(r), function(e) {
				return e[d]
			}))
		})
	}, S.auto = function(e, n) {
		n = n || function() {};
		var r = L(e);
		if (!r[t]) return n(u);
		var s = {},
			o = [],
			a = function(e) {
				o.unshift(e)
			},
			h = function(e) {
				for (var n = 0; n < o[t]; n += 1)
					if (o[n] === e) {
						o.splice(n, 1);
						return
					}
			},
			p = function() {
				N(o[l](0), function(e) {
					e()
				})
			};
		a(function() {
			L(s)[t] === r[t] && (n(u, s), n = function() {})
		}), N(r, function(r) {
			var o = e[r] instanceof Function ? [e[r]] : e[r],
				u = function(e) {
					if (e) n(e), n = function() {};
					else {
						var i = Array[c][l][f](arguments, 1);
						i[t] <= 1 && (i = i[0]), s[r] = i, p()
					}
				},
				d = o[l](0, Math.abs(o[t] - 1)) || [],
				v = function() {
					return k(d, function(e, t) {
						return e && s[i](t)
					}, y) && !s[i](r)
				};
			if (v()) o[o[t] - 1](u, s);
			else {
				var m = function() {
					v() && (h(m), o[o[t] - 1](u, s))
				};
				a(m)
			}
		})
	}, S.waterfall = function(e, r) {
		r = r || function() {};
		if (!e[t]) return r();
		var i = function(e) {
			return function(t) {
				if (t) r(t), r = function() {};
				else {
					var s = Array[c][l][f](arguments, 1),
						a = e.next();
					a ? s[n](i(a)) : s[n](r), S[o](function() {
						e[h](u, s)
					})
				}
			}
		};
		i(S.iterator(e))()
	}, S.parallel = function(n, r) {
		r = r || function() {};
		if (n[b] === Array) S.map(n, function(e, n) {
			e && e(function(e) {
				var r = Array[c][l][f](arguments, 1);
				r[t] <= 1 && (r = r[0]), n[f](u, e, r)
			})
		}, r);
		else {
			var i = {};
			S[e](L(n), function(e, r) {
				n[e](function(n) {
					var s = Array[c][l][f](arguments, 1);
					s[t] <= 1 && (s = s[0]), i[e] = s, r(n)
				})
			}, function(e) {
				r(e, i)
			})
		}
	}, S.series = function(e, n) {
		n = n || function() {};
		if (e[b] === Array) S.mapSeries(e, function(e, n) {
			e && e(function(e) {
				var r = Array[c][l][f](arguments, 1);
				r[t] <= 1 && (r = r[0]), n[f](u, e, r)
			})
		}, n);
		else {
			var r = {};
			S[a](L(e), function(n, i) {
				e[n](function(e) {
					var s = Array[c][l][f](arguments, 1);
					s[t] <= 1 && (s = s[0]), r[n] = s, i(e)
				})
			}, function(e) {
				n(e, r)
			})
		}
	}, S.iterator = function(e) {
		var n = function(r) {
			var i = function() {
				return e[t] && e[r][h](u, arguments), i.next()
			};
			return i.next = function() {
				return r < e[t] - 1 ? n(r + 1) : u
			}, i
		};
		return n(0)
	}, S[h] = function(e) {
		var t = Array[c][l][f](arguments, 1);
		return function() {
			return e[h](u, t[p](Array[c][l][f](arguments)))
		}
	};
	var H = function(e, t, n, r) {
		var i = [];
		e(t, function(e, t) {
			n(e, function(e, n) {
				i = i[p](n || []), t(e)
			})
		}, function(e) {
			r(e, i)
		})
	};
	S[p] = A(H), S.concatSeries = O(H), S.whilst = function(e, t, n) {
		e() ? t(function(r) {
			if (r) return n(r);
			S.whilst(e, t, n)
		}) : n()
	}, S.until = function(e, t, n) {
		e() ? n() : t(function(r) {
			if (r) return n(r);
			S.until(e, t, n)
		})
	}, S.queue = function(e, r) {
		var i = 0,
			s = {
				tasks: [],
				concurrency: r,
				saturated: u,
				empty: u,
				drain: u,
				push: function(e, i) {
					e[b] !== Array && (e = [e]), N(e, function(e) {
						s[w][n]({
							data: e,
							callback: typeof i == "function" ? i : u
						}), s.saturated && s[w][t] == r && s.saturated(), S[o](s.process)
					})
				},
				process: function() {
					if (i < s.concurrency && s[w][t]) {
						var n = s[w].shift();
						s.empty && s[w][t] == 0 && s.empty(), i += 1, e(n.data, function() {
							i -= 1, n.callback && n.callback[h](n, arguments), s.drain && s[w][t] + i == 0 && s.drain(), s.process()
						})
					}
				},
				length: function() {
					return s[w][t]
				},
				running: function() {
					return i
				}
			};
		return s
	};
	var B = function(e) {
		return function(t) {
			var n = Array[c][l][f](arguments, 1);
			t[h](u, n[p]([function(t) {
				var n = Array[c][l][f](arguments, 1);
				typeof console !== s && (t ? console.error && console.error(t) : console[e] && N(n, function(t) {
					console[e](t)
				}))
			}]))
		}
	};
	S.log = B("log"), S.dir = B("dir"), S.memoize = function(e, r) {
		var i = {},
			s = {};
		r = r || function(e) {
			return e
		};
		var o = function() {
			var o = Array[c][l][f](arguments),
				a = o.pop(),
				d = r[h](u, o);
			d in i ? a[h](u, i[d]) : d in s ? s[d][n](a) : (s[d] = [a], e[h](u, o[p]([function() {
				i[d] = arguments;
				var e = s[d];
				delete s[d];
				for (var n = 0, r = e[t]; n < r; n++) e[n][h](u, arguments)
			}])))
		};
		return o[E] = e, o
	}, S.unmemoize = function(e) {
		return function() {
			return (e[E] || e)[h](u, arguments)
		}
	}, typeof define !== s && define.amd ? define("lib/async", [], function() {
		return S
	}) : typeof module !== s && module.exports ? module.exports = S : x.async = S
})();