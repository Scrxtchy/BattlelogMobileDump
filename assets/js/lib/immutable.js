function t() {
	function Bt(i, s, o, u) {
		var a;
		if (u) {
			var f = u[e];
			a = ii[t](f)
		} else a = i[e];
		return ii.keys(s)[n](function(e) {
			a[e] = s[e]
		}), ii.keys(o)[n](function(e) {
			i[e] = o[e]
		}), a[r] = i, i[e] = a, i
	}

	function jt(e, t, n, r) {
		return ii[s](t)[n][i](e, r)
	}

	function Ft(e, t, n) {
		jt(e, t, r, n)
	}

	function It(e, t) {
		return e === t || e !== e && t !== t ? !0 : e && t ? (o == typeof e[u] && o == typeof t[u] && (e = e[u](), t = t[u]()), o == typeof e.equals && o == typeof t.equals ? e.equals(t) : e === t || e !== e && t !== t) : !1
	}

	function qt(e, t) {
		if (!e) throw Error(t)
	}

	function Rt(e) {
		return e[a] = !1, e
	}

	function Ut(e) {
		e && (e[a] = !0)
	}

	function zt() {}

	function Wt(e, t) {
		t = t || 0;
		for (var n = Math.max(0, e[f] - t), r = Array(n), i = 0; n > i; i++) r[i] = e[i + t];
		return r
	}

	function Xt(e) {
		qt(1 / 0 !== e, "Cannot perform this action with an infinite size.")
	}

	function Vt(e) {
		return void 0 === e[l] && (e[l] = e[c](Jt)), e[l]
	}

	function $t(e, t) {
		return t >= 0 ? +t : Vt(e) + +t
	}

	function Jt() {
		return !0
	}

	function Kt(e, t, n) {
		return (0 === e || void 0 !== n && -n >= e) && (void 0 === t || void 0 !== n && t >= n)
	}

	function Qt(e, t) {
		return Yt(e, t, 0)
	}

	function Gt(e, t) {
		return Yt(e, t, t)
	}

	function Yt(e, t, n) {
		return void 0 === e ? n : 0 > e ? Math.max(0, t + e) : void 0 === t ? e : Math.min(t, e)
	}

	function Zt(e) {
		return e >>> 1 & 1073741824 | 3221225471 & e
	}

	function en(e) {
		if (e === !1 || h === e || void 0 === e) return 0;
		if (o == typeof e[u] && (e = e[u](), e === !1 || h === e || void 0 === e)) return 0;
		if (e === !0) return 1;
		var t = typeof e;
		if ("number" === t) {
			for (var n = 0 | e; e > 4294967295;) e /= 4294967295, n ^= e;
			return Zt(n)
		}
		return "string" === t ? e[f] > yi ? tn(e) : nn(e) : o == typeof e.hashCode ? e.hashCode() : rn(e)
	}

	function tn(e) {
		var t = Ei[e];
		return void 0 === t && (t = nn(e), wi === bi && (wi = 0, Ei = {}), wi++, Ei[e] = t), t
	}

	function nn(e) {
		for (var t = 0, n = 0; e[f] > n; n++) t = 31 * t + e.charCodeAt(n) | 0;
		return Zt(t)
	}

	function rn(t) {
		var n = vi && vi.get(t);
		if (n) return n;
		if (n = t[gi]) return n;
		if (!di) {
			if (n = t[p] && t[p][gi]) return n;
			if (n = sn(t)) return n
		}
		if (Object.isExtensible && !Object.isExtensible(t)) throw Error("Non-extensible objects are not allowed as keys.");
		if (n = ++mi, 1073741824 & mi && (mi = 0), vi) vi.set(t, n);
		else if (di) Object[d](t, gi, {
			enumerable: !1,
			configurable: !1,
			writable: !1,
			value: n
		});
		else if (t[p] && t[p] === t[r][e][p]) t[p] = function() {
			return this[r][e][p][i](this, arguments)
		}, t[p][gi] = n;
		else {
			if (!t[v]) throw Error("Unable to set a non-enumerable property on object.");
			t[gi] = n
		}
		return n
	}

	function sn(e) {
		if (e && e[v] > 0) switch (e[v]) {
			case 1:
				return e.uniqueID;
			case 9:
				return e[m] && e[m].uniqueID
		}
	}

	function on(e, t, n, r) {
		var i = 0 === e ? t : 1 === e ? n : [t, n];
		return r ? r[a] = i : r = {
			value: i,
			done: !1
		}, r
	}

	function un() {
		return {
			value: void 0,
			done: !0
		}
	}

	function an(e) {
		return !!cn(e)
	}

	function fn(e) {
		return e && o == typeof e[g]
	}

	function ln(e) {
		var t = cn(e);
		return t && t[y](e)
	}

	function cn(e) {
		var t = e && (Ci && e[Ci] || e[Ni]);
		return o == typeof t ? t : void 0
	}

	function hn(e) {
		return !!e && !!e[_i]
	}

	function pn(e) {
		return !!e && !!e[Di]
	}

	function dn(e) {
		return !!e && !!e[Pi]
	}

	function vn(e) {
		return pn(e) || dn(e)
	}

	function mn(e) {
		return !!e && !!e[Hi]
	}

	function gn(e, t) {
		return t
	}

	function yn(e, t) {
		return [t, e]
	}

	function bn(e) {
		return function() {
			return !e[i](this, arguments)
		}
	}

	function wn(e) {
		return function() {
			return -e[i](this, arguments)
		}
	}

	function En(e) {
		return "string" == typeof e ? JSON.stringify(e) : e
	}

	function Sn(e, t) {
		return e > t ? -1 : t > e ? 1 : 0
	}

	function xn(e, t) {
		if (e === t) return !0;
		if (!hn(t) || void 0 !== e[l] && void 0 !== t[l] && e[l] !== t[l] || void 0 !== e[b] && void 0 !== t[b] && e[b] !== t[b] || pn(e) !== pn(t) || dn(e) !== dn(t) || mn(e) !== mn(t)) return !1;
		if (0 === e[l] && 0 === t[l]) return !0;
		var n = !vn(e);
		if (mn(e)) {
			var r = e[w]();
			return t.every(function(e, t) {
				var i = r[g]()[a];
				return i && It(i[1], e) && (n || It(i[0], t))
			}) && r[g]()[E]
		}
		var i = !1;
		if (void 0 === e[l])
			if (void 0 === t[l]) e[S]();
			else {
				i = !0;
				var s = e;
				e = t, t = s
			}
		var o = !0,
			u = t[c](function(t, r) {
				return (n ? e.has(t) : i ? It(t, e.get(r, li)) : It(e.get(r, li), t)) ? void 0 : (o = !1, !1)
			});
		return o && e[l] === u
	}

	function Tn(e) {
		if (1 / 0 === e[l]) return 0;
		var t = mn(e),
			n = pn(e),
			r = t ? 1 : 0,
			i = e[c](n ? t ? function(e, t) {
				r = 31 * r + Cn(en(e), en(t)) | 0
			} : function(e, t) {
				r = r + Cn(en(e), en(t)) | 0
			} : t ? function(e) {
				r = 31 * r + en(e) | 0
			} : function(e) {
				r = r + en(e) | 0
			});
		return Nn(i, r)
	}

	function Nn(e, t) {
		return t = pi(t, 3432918353), t = pi(t << 15 | t >>> -15, 461845907), t = pi(t << 13 | t >>> -13, 5), t = (t + 3864292196 | 0) ^ e, t = pi(t ^ t >>> 16, 2246822507), t = pi(t ^ t >>> 13, 3266489909), t = Zt(t ^ t >>> 16)
	}

	function Cn(e, t) {
		return e ^ t + 2654435769 + (e << 6) + (e >> 2) | 0
	}

	function kn(t, r) {
		var i = t[e],
			s = function(e) {
				i[e] = r[e]
			};
		return Object.keys(r)[n](s), Object[x] && Object[x](r)[n](s), t
	}

	function Ln(e) {
		return !!e && !!e[Ki]
	}

	function An() {
		return es || (es = new Qi([]))
	}

	function On(e) {
		var t = Array[T](e) ? (new Qi(e))[N]() : fn(e) ? (new Zi(e))[N]() : an(e) ? (new Yi(e))[N]() : "object" == typeof e ? new Gi(e) : void 0;
		if (!t) throw new TypeError("Expected Array or iterable object of [k, v] entries, or keyed object: " + e);
		return t
	}

	function Mn(e) {
		var t = Dn(e);
		if (!t) throw new TypeError("Expected Array or iterable object of values: " + e);
		return t
	}

	function _n(e) {
		var t = Dn(e) || "object" == typeof e && new Gi(e);
		if (!t) throw new TypeError("Expected Array or iterable object of values, or keyed object: " + e);
		return t
	}

	function Dn(e) {
		return Pn(e) ? new Qi(e) : fn(e) ? new Zi(e) : an(e) ? new Yi(e) : void 0
	}

	function Pn(e) {
		return e && "number" == typeof e[f]
	}

	function Hn(e, t, n, r) {
		Xt(e[l]);
		var i = e[C];
		if (i) {
			for (var s = i[f] - 1, o = 0; s >= o; o++) {
				var u = i[n ? s - o : o];
				if (t(u[1], r ? u[0] : o, e) === !1) return o + 1
			}
			return o
		}
		return e[k](t, n)
	}

	function Bn(e, t, n, r) {
		var i = e[C];
		if (i) {
			var s = i[f] - 1,
				o = 0;
			return new Li(function() {
				var e = i[n ? s - o : o];
				return o++ > s ? un() : on(t, r ? e[0] : o - 1, e[1])
			})
		}
		return e[L](t, n)
	}

	function jn(e, t) {
		return t ? Fn(t, e, "", {
			"": e
		}) : In(e)
	}

	function Fn(e, t, n, r) {
		return Array[T](t) ? e[y](r, n, Xi(t).map(function(n, r) {
			return Fn(e, n, r, t)
		})) : qn(t) ? e[y](r, n, zi(t).map(function(n, r) {
			return Fn(e, n, r, t)
		})) : t
	}

	function In(e) {
		return Array[T](e) ? Xi(e).map(In).toList() : qn(e) ? zi(e).map(In).toMap() : e
	}

	function qn(e) {
		return e && e[r] === Object
	}

	function Rn(e) {
		return !!e && !!e[fs]
	}

	function Un(e, t) {
		return on(e, t[0], t[1])
	}

	function zn(e, t) {
		return {
			node: e,
			index: 0,
			__prev: t
		}
	}

	function Wn(e, n, r, i) {
		var s = Object[t](ls);
		return s[l] = e, s[A] = n, s[O] = r, s[b] = i, s[M] = !1, s
	}

	function Xn() {
		return Ss || (Ss = Wn(0))
	}

	function Vn(e, t, n) {
		var r, i;
		if (e[A]) {
			var s = Rt(ci),
				o = Rt(hi);
			if (r = $n(e[A], e[O], 0, void 0, t, n, s, o), !o[a]) return e;
			i = e[l] + (s[a] ? n === li ? -1 : 1 : 0)
		} else {
			if (n === li) return e;
			i = 1, r = new cs(e[O], [
				[t, n]
			])
		}
		return e[O] ? (e[l] = i, e[A] = r, e[b] = void 0, e[M] = !0, e) : r ? Wn(i, r) : Xn()
	}

	function $n(e, t, n, r, i, s, o, u) {
		return e ? e[_](t, n, r, i, s, o, u) : s === li ? e : (Ut(u), Ut(o), new bs(t, r, [i, s]))
	}

	function Jn(e) {
		return e[r] === bs || e[r] === gs
	}

	function Kn(e, t, n, r, i) {
		if (e[D] === r) return new gs(t, r, [e[P], i]);
		var s, o = (0 === n ? e[D] : e[D] >>> n) & fi,
			u = (0 === n ? r : r >>> n) & fi,
			a = o === u ? [Kn(e, t, n + ui, r, i)] : (s = new bs(t, r, i), u > o ? [e, s] : [s, e]);
		return new ps(t, 1 << o | 1 << u, a)
	}

	function Qn(e, t, n, r) {
		e || (e = new zt);
		for (var i = new bs(e, en(n), [n, r]), s = 0; t[f] > s; s++) {
			var o = t[s];
			i = i[_](e, 0, void 0, o[0], o[1])
		}
		return i
	}

	function Gn(e, t, n, r) {
		for (var i = 0, s = 0, o = Array(n), u = 0, a = 1, l = t[f]; l > u; u++, a <<= 1) {
			var c = t[u];
			void 0 !== c && u !== r && (i |= a, o[s++] = c)
		}
		return new ps(e, i, o)
	}

	function Yn(e, t, n, r, i) {
		for (var s = 0, o = Array(ai), u = 0; 0 !== n; u++, n >>>= 1) o[u] = 1 & n ? t[s++] : void 0;
		return o[r] = i, new vs(e, s + 1, o)
	}

	function Zn(e, t, n) {
		for (var r = [], i = 0; n[f] > i; i++) {
			var s = n[i],
				o = ji(s);
			hn(s) || (o = o.map(function(e) {
				return jn(e)
			})), r.push(o)
		}
		return tr(e, t, r)
	}

	function er(e) {
		return function(t, n) {
			return t && t[H] && hn(n) ? t[H](e, n) : e ? e(t, n) : n
		}
	}

	function tr(e, t, i) {
		return i = i[B](function(e) {
			return 0 !== e[l]
		}), 0 === i[f] ? e : 0 === e[l] && 1 === i[f] ? e[r](i[0]) : e[j](function(e) {
			for (var r = t ? function(n, r) {
					e[_](r, li, function(e) {
						return e === li ? n : t(e, n)
					})
				} : function(t, n) {
					e.set(n, t)
				}, s = 0; i[f] > s; s++) i[s][n](r)
		})
	}

	function nr(e, t, n, r) {
		var i = e === li,
			s = t[g]();
		if (s[E]) {
			var o = i ? n : e,
				u = r(o);
			return u === o ? e : u
		}
		qt(i || e && e.set, "invalid keyPath");
		var f = s[a],
			l = i ? li : e.get(f, li),
			c = nr(l, t, n, r);
		return c === l ? e : c === li ? e[F](f) : (i ? Xn() : e).set(f, c)
	}

	function rr(e) {
		return e -= e >> 1 & 1431655765, e = (858993459 & e) + (e >> 2 & 858993459), e = e + (e >> 4) & 252645135, e += e >> 8, e += e >> 16, 127 & e
	}

	function ir(e, t, n, r) {
		var i = r ? e : Wt(e);
		return i[t] = n, i
	}

	function sr(e, t, n, r) {
		var i = e[f] + 1;
		if (r && t + 1 === i) return e[t] = n, e;
		for (var s = Array(i), o = 0, u = 0; i > u; u++) u === t ? (s[u] = n, o = -1) : s[u] = e[u + o];
		return s
	}

	function or(e, t, n) {
		var r = e[f] - 1;
		if (n && t === r) return e.pop(), e;
		for (var i = Array(r), s = 0, o = 0; r > o; o++) o === t && (s = 1), i[o] = e[o + s];
		return i
	}

	function ur(e) {
		var t = kr(e);
		return t[I] = e, t[l] = e[l], t.flip = function() {
			return e
		}, t[q] = function() {
			var t = e[q][i](this);
			return t.flip = function() {
				return e[q]()
			}, t
		}, t.has = function(t) {
			return e[R](t)
		}, t[R] = function(t) {
			return e.has(t)
		}, t[S] = Lr, t[k] = function(t, n) {
			var r = this;
			return e[c](function(e, n) {
				return t(n, e, r) !== !1
			}, n)
		}, t[L] = function(t, n) {
			if (t === Ti) {
				var r = e[U](t, n);
				return new Li(function() {
					var e = r[g]();
					if (!e[E]) {
						var t = e[a][0];
						e[a][0] = e[a][1], e[a][1] = t
					}
					return e
				})
			}
			return e[U](t === xi ? Si : xi, n)
		}, t
	}

	function ar(e, t, n) {
		var r = kr(e);
		return r[l] = e[l], r.has = function(t) {
			return e.has(t)
		}, r.get = function(r, i) {
			var s = e.get(r, li);
			return s === li ? i : t[y](n, s, r, e)
		}, r[k] = function(r, i) {
			var s = this;
			return e[c](function(e, i, o) {
				return r(t[y](n, e, i, o), i, s) !== !1
			}, i)
		}, r[L] = function(r, i) {
			var s = e[U](Ti, i);
			return new Li(function() {
				var i = s[g]();
				if (i[E]) return i;
				var o = i[a],
					u = o[0];
				return on(r, u, t[y](n, o[1], u, e), i)
			})
		}, r
	}

	function fr(e, t) {
		var n = kr(e);
		return n[I] = e, n[l] = e[l], n[q] = function() {
			return e
		}, e.flip && (n.flip = function() {
			var t = ur(e);
			return t[q] = function() {
				return e.flip()
			}, t
		}), n.get = function(n, r) {
			return e.get(t ? n : -1 - n, r)
		}, n.has = function(n) {
			return e.has(t ? n : -1 - n)
		}, n[R] = function(t) {
			return e[R](t)
		}, n[S] = Lr, n[c] = function(t, n) {
			var r = this;
			return e[c](function(e, n) {
				return t(e, n, r)
			}, !n)
		}, n[U] = function(t, n) {
			return e[U](t, !n)
		}, n
	}

	function lr(e, t, n, r) {
		var i = kr(e);
		return r && (i.has = function(r) {
			var i = e.get(r, li);
			return i !== li && !!t[y](n, i, r, e)
		}, i.get = function(r, i) {
			var s = e.get(r, li);
			return s !== li && t[y](n, s, r, e) ? s : i
		}), i[k] = function(i, s) {
			var o = this,
				u = 0;
			return e[c](function(e, s, a) {
				return t[y](n, e, s, a) ? (u++, i(e, r ? s : u - 1, o)) : void 0
			}, s), u
		}, i[L] = function(i, s) {
			var o = e[U](Ti, s),
				u = 0;
			return new Li(function() {
				for (;;) {
					var s = o[g]();
					if (s[E]) return s;
					var f = s[a],
						l = f[0],
						c = f[1];
					if (t[y](n, c, l, e)) return on(i, r ? l : u++, c, s)
				}
			})
		}, i
	}

	function cr(e, t, n) {
		var r = as()[z]();
		return e[c](function(i, s) {
			r[_](t[y](n, i, s, e), 0, function(e) {
				return e + 1
			})
		}), r[W]()
	}

	function hr(e, t, n) {
		var r = pn(e),
			i = as()[z]();
		e[c](function(s, o) {
			i[_](t[y](n, s, o, e), function(e) {
				return e = e || [], e.push(r ? [o, s] : s), e
			})
		});
		var s = Cr(e);
		return i.map(function(t) {
			return xr(e, s(t))
		})
	}

	function pr(e, t) {
		if (t > e[l]) return e;
		0 > t && (t = 0);
		var n = kr(e);
		return n[l] = e[l] && Math.min(e[l], t), n[k] = function(n, r) {
			var i = this;
			if (0 === t) return 0;
			if (r) return this[S]()[c](n, r);
			var s = 0;
			return e[c](function(e, r) {
				return ++s && n(e, r, i) !== !1 && t > s
			}), s
		}, n[L] = function(n, r) {
			if (r) return this[S]()[U](n, r);
			var i = t && e[U](n, r),
				s = 0;
			return new Li(function() {
				return s++ > t ? un() : i[g]()
			})
		}, n
	}

	function dr(e, t, n) {
		var r = kr(e);
		return r[k] = function(r, i) {
			var s = this;
			if (i) return this[S]()[c](r, i);
			var o = 0;
			return e[c](function(e, i, u) {
				return t[y](n, e, i, u) && ++o && r(e, i, s)
			}), o
		}, r[L] = function(r, i) {
			var s = this;
			if (i) return this[S]()[U](r, i);
			var o = e[U](Ti, i),
				u = !0;
			return new Li(function() {
				if (!u) return un();
				var e = o[g]();
				if (e[E]) return e;
				var i = e[a],
					f = i[0],
					l = i[1];
				return t[y](n, l, f, s) ? r === Ti ? e : on(r, f, l, e) : (u = !1, un())
			})
		}, r
	}

	function vr(e, t, n) {
		if (0 >= t) return e;
		var r = kr(e);
		return r[l] = e[l] && Math.max(0, e[l] - t), r[k] = function(r, i) {
			var s = this;
			if (i) return this[S]()[c](r, i);
			var o = 0,
				u = !0,
				a = 0;
			return e[c](function(e, i) {
				return u && (u = o++ < t) ? void 0 : (a++, r(e, n ? i : a - 1, s))
			}), a
		}, r[L] = function(r, i) {
			if (i) return this[S]()[U](r, i);
			var s = t && e[U](r, i),
				o = 0,
				u = 0;
			return new Li(function() {
				for (; t > o;) o++, s[g]();
				var e = s[g]();
				return n || r === xi ? e : r === Si ? on(r, u++, void 0, e) : on(r, u++, e[a][1], e)
			})
		}, r
	}

	function mr(e, t, n, r) {
		var i = kr(e);
		return i[k] = function(i, s) {
			var o = this;
			if (s) return this[S]()[c](i, s);
			var u = !0,
				a = 0;
			return e[c](function(e, s, f) {
				return u && (u = t[y](n, e, s, f)) ? void 0 : (a++, i(e, r ? s : a - 1, o))
			}), a
		}, i[L] = function(i, s) {
			var o = this;
			if (s) return this[S]()[U](i, s);
			var u = e[U](Ti, s),
				f = !0,
				l = 0;
			return new Li(function() {
				var e, s, c;
				do {
					if (e = u[g](), e[E]) return r || i === xi ? e : i === Si ? on(i, l++, void 0, e) : on(i, l++, e[a][1], e);
					var h = e[a];
					s = h[0], c = h[1], f && (f = t[y](n, c, s, o))
				} while (f);
				return i === Ti ? e : on(i, s, c, e)
			})
		}, i
	}

	function gr(e, t) {
		var n = pn(e),
			r = [e].concat(t).map(function(e) {
				return hn(e) ? n && (e = ji(e)) : e = n ? On(e) : Mn(Array[T](e) ? e : [e]), e
			})[B](function(e) {
				return 0 !== e[l]
			});
		if (0 === r[f]) return e;
		if (1 === r[f]) {
			var i = r[0];
			if (i === e || n && pn(i) || dn(e) && dn(i)) return i
		}
		var s = new Qi(r);
		return n ? s = s[X]() : dn(e) || (s = s[V]()), s = s.flatten(!0), s[l] = r.reduce(function(e, t) {
			if (void 0 !== e) {
				var n = t[l];
				if (void 0 !== n) return e + n
			}
		}, 0), s
	}

	function yr(e, t, n) {
		var r = kr(e);
		return r[k] = function(r, i) {
			function s(e, a) {
				var f = this;
				e[c](function(e, i) {
					return (!t || t > a) && hn(e) ? s(e, a + 1) : r(e, n ? i : o++, f) === !1 && (u = !0), !u
				}, i)
			}
			var o = 0,
				u = !1;
			return s(e, 0), o
		}, r[L] = function(r, i) {
			var s = e[U](r, i),
				o = [],
				u = 0;
			return new Li(function() {
				for (; s;) {
					var e = s[g]();
					if (e[E] === !1) {
						var l = e[a];
						if (r === Ti && (l = l[1]), t && !(t > o[f]) || !hn(l)) return n ? e : on(r, u++, l, e);
						o.push(s), s = l[U](r, i)
					} else s = o.pop()
				}
				return un()
			})
		}, r
	}

	function br(e, t, n) {
		var r = Cr(e);
		return e[$]().map(function(i, s) {
			return r(t[y](n, i, s, e))
		}).flatten(!0)
	}

	function wr(e, t) {
		var n = kr(e);
		return n[l] = e[l] && 2 * e[l] - 1, n[k] = function(n, r) {
			var i = this,
				s = 0;
			return e[c](function(e) {
				return (!s || n(t, s++, i) !== !1) && n(e, s++, i) !== !1
			}, r), s
		}, n[L] = function(n, r) {
			var i, s = e[U](xi, r),
				o = 0;
			return new Li(function() {
				return (!i || o % 2) && (i = s[g](), i[E]) ? i : o % 2 ? on(n, o++, t) : on(n, o++, i[a], i)
			})
		}, n
	}

	function Er(e, t, r) {
		t || (t = Ar);
		var i = pn(e),
			s = 0,
			o = e[$]().map(function(t, n) {
				return [n, t, s++, r ? r(t, n, e) : t]
			})[J]();
		return o.sort(function(e, n) {
			return t(e[3], n[3]) || e[2] - n[2]
		})[n](i ? function(e, t) {
			o[t][f] = 2
		} : function(e, t) {
			o[t] = e[1]
		}), i ? zi(o) : dn(e) ? Xi(o) : $i(o)
	}

	function Sr(e, t, n) {
		if (t || (t = Ar), n) {
			var r = e[$]().map(function(t, r) {
				return [t, n(t, r, e)]
			}).reduce(function(e, n) {
				return t(n[1], e[1]) > 0 ? n : e
			});
			return r && r[0]
		}
		return e.reduce(function(e, n) {
			return t(n, e) > 0 ? n : e
		})
	}

	function xr(e, t) {
		return Ln(e) ? t : e[r](t)
	}

	function Tr(e) {
		if (e !== Object(e)) throw new TypeError("Expected [K, V] tuple: " + e)
	}

	function Nr(e) {
		return Xt(e[l]), Vt(e)
	}

	function Cr(e) {
		return pn(e) ? ji : dn(e) ? Ii : qi
	}

	function kr(n) {
		return Object[t]((pn(n) ? zi : dn(n) ? Xi : $i)[e])
	}

	function Lr() {
		return this[I][S] ? (this[I][S](), this[l] = this[I][l], this) : Ri[e][S][y](this)
	}

	function Ar(e, t) {
		return e > t ? 1 : t > e ? -1 : 0
	}

	function Or(e) {
		return !!e && !!e[Ms]
	}

	function Mr(e, t, n, r, i, s) {
		var o, u = e && e[K];
		if (0 === t) {
			var a = 0 > n ? -n : 0,
				f = r - n;
			for (f > ai && (f = ai), o = a; f > o; o++)
				if (i(u && u[s ? a + f - 1 - o : o]) === !1) return !1
		} else {
			var l = 1 << t,
				c = t - ui;
			for (o = 0; fi >= o; o++) {
				var h = s ? fi - o : o,
					p = n + (h << t);
				if (r > p && p + l > 0) {
					var d = u && u[h];
					if (!Mr(d, c, p, r, i, s)) return !1
				}
			}
		}
		return !0
	}

	function _r(e, t, n, r, i) {
		return {
			array: e,
			level: t,
			offset: n,
			max: r,
			rawMax: r - n >> t,
			index: 0,
			__prev: i
		}
	}

	function Dr(e, n, r, i, s, o, u) {
		var a = Object[t](_s);
		return a[l] = n - e, a[Q] = e, a[G] = n, a[Y] = r, a[A] = i, a[Z] = s, a[O] = o, a[b] = u, a[M] = !1, a
	}

	function Pr() {
		return Bs || (Bs = Dr(0, 0, ui))
	}

	function Hr(e, t, n) {
		if (t = $t(e, t), t >= e[l] || 0 > t) return e[j](function(e) {
			0 > t ? Ir(e, t).set(0, n) : Ir(e, 0, t + 1).set(t, n)
		});
		t += e[Q];
		var r = e[Z],
			i = e[A],
			s = Rt(hi);
		return t >= Rr(e[G]) ? r = Br(r, e[O], 0, t, n, s) : i = Br(i, e[O], e[Y], t, n, s), s[a] ? e[O] ? (e[A] = i, e[Z] = r, e[b] = void 0, e[M] = !0, e) : Dr(e[Q], e[G], e[Y], i, r) : e
	}

	function Br(e, t, n, r, i, s) {
		var o = r >>> n & fi,
			u = e && e[K][f] > o;
		if (!u && void 0 === i) return e;
		var a;
		if (n > 0) {
			var l = e && e[K][o],
				c = Br(l, t, n - ui, r, i, s);
			return c === l ? e : (a = jr(e, t), a[K][o] = c, a)
		}
		return u && e[K][o] === i ? e : (Ut(s), a = jr(e, t), void 0 === i && o === a[K][f] - 1 ? a[K].pop() : a[K][o] = i, a)
	}

	function jr(e, t) {
		return t && e && t === e[et] ? e : new Ds(e ? e[K][tt]() : [], t)
	}

	function Fr(e, t) {
		if (t >= Rr(e[G])) return e[Z];
		if (1 << e[Y] + ui > t) {
			for (var n = e[A], r = e[Y]; n && r > 0;) n = n[K][t >>> r & fi], r -= ui;
			return n
		}
	}

	function Ir(e, t, n) {
		var r = e[O] || new zt,
			i = e[Q],
			s = e[G],
			o = i + t,
			u = void 0 === n ? s : 0 > n ? s + n : i + n;
		if (o === i && u === s) return e;
		if (o >= u) return e.clear();
		for (var a = e[Y], c = e[A], p = 0; 0 > o + p;) c = new Ds(c && c[K][f] ? [void 0, c] : [], r), a += ui, p += 1 << a;
		p && (o += p, i += p, u += p, s += p);
		for (var d = Rr(s), v = Rr(u); v >= 1 << a + ui;) c = new Ds(c && c[K][f] ? [c] : [], r), a += ui;
		var m = e[Z],
			g = d > v ? Fr(e, u - 1) : v > d ? new Ds([], r) : m;
		if (m && v > d && s > o && m[K][f]) {
			c = jr(c, r);
			for (var y = c, w = a; w > ui; w -= ui) {
				var E = d >>> w & fi;
				y = y[K][E] = jr(y[K][E], r)
			}
			y[K][d >>> ui & fi] = m
		}
		if (s > u && (g = g && g[nt](r, 0, u)), o >= v) o -= v, u -= v, a = ui, c = h, g = g && g[rt](r, 0, o);
		else if (o > i || d > v) {
			for (p = 0; c;) {
				var S = o >>> a & fi;
				if (S !== v >>> a & fi) break;
				S && (p += (1 << a) * S), a -= ui, c = c[K][S]
			}
			c && o > i && (c = c[rt](r, a, o - p)), c && d > v && (c = c[nt](r, a, v - p)), p && (o -= p, u -= p)
		}
		return e[O] ? (e[l] = u - o, e[Q] = o, e[G] = u, e[Y] = a, e[A] = c, e[Z] = g, e[b] = void 0, e[M] = !0, e) : Dr(o, u, a, c, g)
	}

	function qr(e, t, n) {
		for (var r = [], i = 0, s = 0; n[f] > s; s++) {
			var o = n[s],
				u = Ii(o);
			u[l] > i && (i = u[l]), hn(o) || (u = u.map(function(e) {
				return jn(e)
			})), r.push(u)
		}
		return i > e[l] && (e = e.setSize(i)), tr(e, t, r)
	}

	function Rr(e) {
		return ai > e ? 0 : e - 1 >>> ui << ui
	}

	function Ur(e) {
		return Rn(e) && mn(e)
	}

	function zr(n, r, i, s) {
		var o = Object[t](js[e]);
		return o[l] = n ? n[l] : 0, o[it] = n, o[st] = r, o[O] = i, o[b] = s, o
	}

	function Wr() {
		return Fs || (Fs = zr(Xn(), Pr()))
	}

	function Xr(e, t, n) {
		var r, i, s = e[it],
			o = e[st],
			u = s.get(t),
			a = void 0 !== u;
		if (n === li) {
			if (!a) return e;
			o[l] >= ai && o[l] >= 2 * s[l] ? (i = o[B](function(e, t) {
				return void 0 !== e && u !== t
			}), r = i[X]().map(function(e) {
				return e[0]
			}).flip().toMap(), e[O] && (r[O] = i[O] = e[O])) : (r = s[F](t), i = u === o[l] - 1 ? o.pop() : o.set(u, void 0))
		} else if (a) {
			if (n === o.get(u)[1]) return e;
			r = s, i = o.set(u, [t, n])
		} else r = s.set(t, o[l]), i = o.set(o[l], [t, n]);
		return e[O] ? (e[l] = r[l], e[it] = r, e[st] = i, e[b] = void 0, e) : zr(r, i)
	}

	function Vr(e) {
		return !!e && !!e[Rs]
	}

	function $r(e, n, r, i) {
		var s = Object[t](Us);
		return s[l] = e, s[ot] = n, s[O] = r, s[b] = i, s[M] = !1, s
	}

	function Jr() {
		return zs || (zs = $r(0))
	}

	function Kr(e) {
		return !!e && !!e[Xs]
	}

	function Qr(e, t) {
		return e[O] ? (e[l] = t[l], e[it] = t, e) : t === e[it] ? e : 0 === t[l] ? e.__empty() : e.__make(t)
	}

	function Gr(e, n) {
		var r = Object[t](Vs);
		return r[l] = e ? e[l] : 0, r[it] = e, r[O] = n, r
	}

	function Yr() {
		return $s || ($s = Gr(Xn()))
	}

	function Zr(e) {
		return Kr(e) && mn(e)
	}

	function ei(e, n) {
		var r = Object[t](Ks);
		return r[l] = e ? e[l] : 0, r[it] = e, r[O] = n, r
	}

	function ti() {
		return Qs || (Qs = ei(Wr()))
	}

	function ni(e, n, r) {
		var i = Object[t](Object[s](e));
		return i[it] = n, i[O] = r, i
	}

	function ri(e) {
		return e._name || e[r].name
	}
	var e = "prototype",
		t = "create",
		n = "forEach",
		r = "constructor",
		i = "apply",
		s = "getPrototypeOf",
		o = "function",
		u = "valueOf",
		a = "value",
		f = "length",
		l = "size",
		c = "__iterate",
		h = null,
		p = "propertyIsEnumerable",
		d = "defineProperty",
		v = "nodeType",
		m = "documentElement",
		g = "next",
		y = "call",
		b = "__hash",
		w = "entries",
		E = "done",
		S = "cacheResult",
		x = "getOwnPropertySymbols",
		T = "isArray",
		N = "fromEntrySeq",
		C = "_cache",
		k = "__iterateUncached",
		L = "__iteratorUncached",
		A = "_root",
		O = "__ownerID",
		M = "__altered",
		_ = "update",
		D = "keyHash",
		P = "entry",
		H = "mergeDeepWith",
		B = "filter",
		j = "withMutations",
		F = "remove",
		I = "_iter",
		q = "reverse",
		R = "contains",
		U = "__iterator",
		z = "asMutable",
		W = "asImmutable",
		X = "toKeyedSeq",
		V = "toSetSeq",
		$ = "toSeq",
		J = "toArray",
		K = "array",
		Q = "_origin",
		G = "_capacity",
		Y = "_level",
		Z = "_tail",
		et = "ownerID",
		tt = "slice",
		nt = "removeAfter",
		rt = "removeBefore",
		it = "_map",
		st = "_list",
		ot = "_head",
		ut = "createClass",
		at = "defaultSuperCall",
		ft = "valueSeq",
		lt = "__toJS",
		ct = "toIndexedSeq",
		ht = "__toStringMapper",
		pt = "__toString",
		dt = "entrySeq",
		vt = "_object",
		mt = "hasOwnProperty",
		gt = "_iterable",
		yt = "_iterator",
		bt = "_iteratorCache",
		wt = "updateIn",
		Et = "mergeDeep",
		St = "wasAltered",
		xt = "__ensureOwner",
		Tt = "iterate",
		Nt = "nodes",
		Ct = "_reverse",
		kt = "_stack",
		Lt = "_useKeys",
		At = "mergeIn",
		Ot = "mergeDeepIn",
		Mt = "mergeWith",
		_t = "_defaultValues",
		Dt = "_start",
		Pt = "_step",
		Ht = "_value",
		ii = Object,
		si = {};
	si[ut] = Bt, si.superCall = jt, si[at] = Ft;
	var oi = "delete",
		ui = 5,
		ai = 1 << ui,
		fi = ai - 1,
		li = {},
		ci = {
			value: !1
		},
		hi = {
			value: !1
		},
		pi = o == typeof Math.imul && -2 === Math.imul(4294967295, 2) ? Math.imul : function(e, t) {
			e = 0 | e, t = 0 | t;
			var n = 65535 & e,
				r = 65535 & t;
			return n * r + ((e >>> 16) * r + n * (t >>> 16) << 16 >>> 0) | 0
		},
		di = function() {
			try {
				return Object[d]({}, "x", {}), !0
			} catch (e) {
				return !1
			}
		}(),
		vi = o == typeof WeakMap && new WeakMap,
		mi = 0,
		gi = "__immutablehash__";
	o == typeof Symbol && (gi = Symbol(gi));
	var yi = 16,
		bi = 255,
		wi = 0,
		Ei = {},
		Si = 0,
		xi = 1,
		Ti = 2,
		Ni = "@@iterator",
		Ci = o == typeof Symbol && Symbol.iterator,
		ki = Ci || Ni,
		Li = function(e) {
			this[g] = e
		};
	si[ut](Li, {
		toString: function() {
			return "[Iterator]"
		}
	}, {}), Li.KEYS = Si, Li.VALUES = xi, Li.ENTRIES = Ti;
	var Ai = Li[e];
	Ai.inspect = Ai.toSource = function() {
		return "" + this
	}, Ai[ki] = function() {
		return this
	};
	var Oi = function(e) {
			return hn(e) ? e : Ri(e)
		},
		Mi = Oi;
	si[ut](Oi, {
		toArray: function() {
			Xt(this[l]);
			var e = Array(this[l] || 0);
			return this[ft]()[c](function(t, n) {
				e[n] = t
			}), e
		},
		toIndexedSeq: function() {
			return new ks(this)
		},
		toJS: function() {
			return this[$]().map(function(e) {
				return e && o == typeof e.toJS ? e.toJS() : e
			})[lt]()
		},
		toKeyedSeq: function() {
			return new Cs(this, !0)
		},
		toMap: function() {
			return Xt(this[l]), as(this[X]())
		},
		toObject: function() {
			Xt(this[l]);
			var e = {};
			return this[c](function(t, n) {
				e[n] = t
			}), e
		},
		toOrderedMap: function() {
			return Xt(this[l]), js(this[X]())
		},
		toOrderedSet: function() {
			return Xt(this[l]), Js(pn(this) ? this[ft]() : this)
		},
		toSet: function() {
			return Xt(this[l]), Ws(pn(this) ? this[ft]() : this)
		},
		toSetSeq: function() {
			return new Ls(this)
		},
		toSeq: function() {
			return dn(this) ? this[ct]() : pn(this) ? this[X]() : this[V]()
		},
		toStack: function() {
			return Xt(this[l]), Is(pn(this) ? this[ft]() : this)
		},
		toList: function() {
			return Xt(this[l]), Os(pn(this) ? this[ft]() : this)
		},
		toString: function() {
			return "[Iterable]"
		},
		__toString: function(e, t) {
			return 0 === this[l] ? e + t : e + " " + this[$]().map(this[ht]).join(", ") + " " + t
		},
		concat: function() {
			for (var e = [], t = 0; arguments[f] > t; t++) e[t] = arguments[t];
			return xr(this, gr(this, e))
		},
		contains: function(e) {
			return this.some(function(t) {
				return It(t, e)
			})
		},
		entries: function() {
			return this[U](Ti)
		},
		every: function(e, t) {
			var n = !0;
			return this[c](function(r, i, s) {
				return e[y](t, r, i, s) ? void 0 : (n = !1, !1)
			}), n
		},
		filter: function(e, t) {
			return xr(this, lr(this, e, t, !0))
		},
		find: function(e, t, n) {
			var r = n;
			return this[c](function(n, i, s) {
				return e[y](t, n, i, s) ? (r = n, !1) : void 0
			}), r
		},
		forEach: function(e, t) {
			return this[c](t ? e.bind(t) : e)
		},
		join: function(e) {
			e = void 0 !== e ? "" + e : ",";
			var t = "",
				n = !0;
			return this[c](function(r) {
				n ? n = !1 : t += e, t += h !== r && void 0 !== r ? r : ""
			}), t
		},
		keys: function() {
			return this[U](Si)
		},
		map: function(e, t) {
			return xr(this, ar(this, e, t))
		},
		reduce: function(e, t, n) {
			var r, i;
			return 2 > arguments[f] ? i = !0 : r = t, this[c](function(t, s, o) {
				i ? (i = !1, r = t) : r = e[y](n, r, t, s, o)
			}), r
		},
		reduceRight: function() {
			var e = this[X]()[q]();
			return e.reduce[i](e, arguments)
		},
		reverse: function() {
			return xr(this, fr(this, !0))
		},
		slice: function(e, t) {
			if (Kt(e, t, this[l])) return this;
			var n = Qt(e, this[l]),
				r = Gt(t, this[l]);
			if (n !== n || r !== r) return this[$]()[S]()[tt](e, t);
			var i = 0 === n ? this : this.skip(n);
			return xr(this, void 0 === r || r === this[l] ? i : i.take(r - n))
		},
		some: function(e, t) {
			return !this.every(bn(e), t)
		},
		sort: function(e) {
			return xr(this, Er(this, e))
		},
		values: function() {
			return this[U](xi)
		},
		butLast: function() {
			return this[tt](0, -1)
		},
		count: function(e, t) {
			return Vt(e ? this[$]()[B](e, t) : this)
		},
		countBy: function(e, t) {
			return cr(this, e, t)
		},
		equals: function(e) {
			return xn(this, e)
		},
		entrySeq: function() {
			var e = this;
			if (e[C]) return new Qi(e[C]);
			var t = e[$]().map(yn)[ct]();
			return t[N] = function() {
				return e[$]()
			}, t
		},
		filterNot: function(e, t) {
			return this[B](bn(e), t)
		},
		findLast: function(e, t, n) {
			return this[X]()[q]().find(e, t, n)
		},
		first: function() {
			return this.find(Jt)
		},
		flatMap: function(e, t) {
			return xr(this, br(this, e, t))
		},
		flatten: function(e) {
			return xr(this, yr(this, e, !0))
		},
		fromEntrySeq: function() {
			return new As(this)
		},
		get: function(e, t) {
			return this.find(function(t, n) {
				return It(n, e)
			}, void 0, t)
		},
		getIn: function(e, t) {
			var n = this;
			if (e)
				for (var r, i = ln(e) || ln(Mi(e)); !(r = i[g]())[E];) {
					var s = r[a];
					if (n = n && n.get ? n.get(s, li) : li, n === li) return t
				}
			return n
		},
		groupBy: function(e, t) {
			return hr(this, e, t)
		},
		has: function(e) {
			return this.get(e, li) !== li
		},
		isSubset: function(e) {
			return e = o == typeof e[R] ? e : Mi(e), this.every(function(t) {
				return e[R](t)
			})
		},
		isSuperset: function(e) {
			return e.isSubset(this)
		},
		keySeq: function() {
			return this[$]().map(gn)[ct]()
		},
		last: function() {
			return this[$]()[q]().first()
		},
		max: function(e) {
			return Sr(this, e)
		},
		maxBy: function(e, t) {
			return Sr(this, t, e)
		},
		min: function(e) {
			return Sr(this, e ? wn(e) : Sn)
		},
		minBy: function(e, t) {
			return Sr(this, t ? wn(t) : Sn, e)
		},
		rest: function() {
			return this[tt](1)
		},
		skip: function(e) {
			return xr(this, vr(this, e, !0))
		},
		skipLast: function(e) {
			return xr(this, this[$]()[q]().skip(e)[q]())
		},
		skipWhile: function(e, t) {
			return xr(this, mr(this, e, t, !0))
		},
		skipUntil: function(e, t) {
			return this.skipWhile(bn(e), t)
		},
		sortBy: function(e, t) {
			return xr(this, Er(this, t, e))
		},
		take: function(e) {
			return xr(this, pr(this, e))
		},
		takeLast: function(e) {
			return xr(this, this[$]()[q]().take(e)[q]())
		},
		takeWhile: function(e, t) {
			return xr(this, dr(this, e, t))
		},
		takeUntil: function(e, t) {
			return this.takeWhile(bn(e), t)
		},
		valueSeq: function() {
			return this[ct]()
		},
		hashCode: function() {
			return this[b] || (this[b] = Tn(this))
		}
	}, {});
	var _i = "@@__IMMUTABLE_ITERABLE__@@",
		Di = "@@__IMMUTABLE_KEYED__@@",
		Pi = "@@__IMMUTABLE_INDEXED__@@",
		Hi = "@@__IMMUTABLE_ORDERED__@@",
		Bi = Oi[e];
	Bi[_i] = !0, Bi[ki] = Bi.values, Bi.toJSON = Bi.toJS, Bi[lt] = Bi[J], Bi[ht] = En, Bi.inspect = Bi.toSource = function() {
			return "" + this
		}, Bi.chain = Bi.flatMap,
		function() {
			try {
				Object[d](Bi, f, {
					get: function() {
						if (!Oi.noLengthWarning) {
							var e;
							try {
								throw Error()
							} catch (t) {
								e = t.stack
							}
							if (-1 === e.indexOf("_wrapObject")) return console && console.warn && console.warn("iterable.length has been deprecated, use iterable.size or iterable.count(). This warning will become a silent error in a future version. " + e), this[l]
						}
					}
				})
			} catch (e) {}
		}();
	var ji = function(e) {
		return pn(e) ? e : zi(e)
	};
	si[ut](ji, {
		flip: function() {
			return xr(this, ur(this))
		},
		findKey: function(e, t) {
			var n;
			return this[c](function(r, i, s) {
				return e[y](t, r, i, s) ? (n = i, !1) : void 0
			}), n
		},
		findLastKey: function(e, t) {
			return this[$]()[q]().findKey(e, t)
		},
		keyOf: function(e) {
			return this.findKey(function(t) {
				return It(t, e)
			})
		},
		lastKeyOf: function(e) {
			return this[$]()[q]().keyOf(e)
		},
		mapEntries: function(e, t) {
			var n = this,
				r = 0;
			return xr(this, this[$]().map(function(i, s) {
				return e[y](t, [s, i], r++, n)
			})[N]())
		},
		mapKeys: function(e, t) {
			var n = this;
			return xr(this, this[$]().flip().map(function(r, i) {
				return e[y](t, r, i, n)
			}).flip())
		}
	}, {}, Oi);
	var Fi = ji[e];
	Fi[Di] = !0, Fi[ki] = Bi[w], Fi[lt] = Bi.toObject, Fi[ht] = function(e, t) {
		return t + ": " + En(e)
	};
	var Ii = function(e) {
		return dn(e) ? e : Xi(e)
	};
	si[ut](Ii, {
		toKeyedSeq: function() {
			return new Cs(this, !1)
		},
		filter: function(e, t) {
			return xr(this, lr(this, e, t, !1))
		},
		findIndex: function(e, t) {
			var n = this[X]().findKey(e, t);
			return void 0 === n ? -1 : n
		},
		indexOf: function(e) {
			var t = this[X]().keyOf(e);
			return void 0 === t ? -1 : t
		},
		lastIndexOf: function(e) {
			var t = this[X]().lastKeyOf(e);
			return void 0 === t ? -1 : t
		},
		reverse: function() {
			return xr(this, fr(this, !1))
		},
		splice: function(e, t) {
			var n = arguments[f];
			if (t = Math.max(0 | t, 0), 0 === n || 2 === n && !t) return this;
			e = Qt(e, this[l]);
			var r = this[tt](0, e);
			return xr(this, 1 === n ? r : r.concat(Wt(arguments, 2), this[tt](e + t)))
		},
		findLastIndex: function(e, t) {
			var n = this[X]().findLastKey(e, t);
			return void 0 === n ? -1 : n
		},
		first: function() {
			return this.get(0)
		},
		flatten: function(e) {
			return xr(this, yr(this, e, !1))
		},
		get: function(e, t) {
			return e = $t(this, e), 0 > e || 1 / 0 === this[l] || void 0 !== this[l] && e > this[l] ? t : this.find(function(t, n) {
				return n === e
			}, void 0, t)
		},
		has: function(e) {
			return e = $t(this, e), e >= 0 && (void 0 !== this[l] ? 1 / 0 === this[l] || this[l] > e : -1 !== this.indexOf(e))
		},
		interpose: function(e) {
			return xr(this, wr(this, e))
		},
		last: function() {
			return this.get(-1)
		},
		skip: function(e) {
			var t = this,
				n = vr(t, e, !1);
			return Ln(t) && n !== t && (n.get = function(n, r) {
				return n = $t(this, n), n >= 0 ? t.get(n + e, r) : r
			}), xr(this, n)
		},
		skipWhile: function(e, t) {
			return xr(this, mr(this, e, t, !1))
		},
		take: function(e) {
			var t = this,
				n = pr(t, e);
			return Ln(t) && n !== t && (n.get = function(n, r) {
				return n = $t(this, n), n >= 0 && e > n ? t.get(n, r) : r
			}), xr(this, n)
		}
	}, {}, Oi), Ii[e][Pi] = !0, Ii[e][Hi] = !0;
	var qi = function(e) {
		return hn(e) && !vn(e) ? e : $i(e)
	};
	si[ut](qi, {
		get: function(e, t) {
			return this.has(e) ? e : t
		},
		contains: function(e) {
			return this.has(e)
		},
		keySeq: function() {
			return this[ft]()
		}
	}, {}, Oi), qi[e].has = Bi[R], Oi.isIterable = hn, Oi.isKeyed = pn, Oi.isIndexed = dn, Oi.isAssociative = vn, Oi.isOrdered = mn, Oi.Keyed = ji, Oi.Indexed = Ii, Oi.Set = qi, Oi.Iterator = Li;
	var Ri = function(e) {
			return h === e || void 0 === e ? An() : hn(e) ? e[$]() : _n(e)
		},
		Ui = Ri;
	si[ut](Ri, {
		toSeq: function() {
			return this
		},
		toString: function() {
			return this[pt]("Seq {", "}")
		},
		cacheResult: function() {
			return !this[C] && this[k] && (this[C] = this[dt]()[J](), this[l] = this[C][f]), this
		},
		__iterate: function(e, t) {
			return Hn(this, e, t, !0)
		},
		__iterator: function(e, t) {
			return Bn(this, e, t, !0)
		}
	}, { of: function() {
			return Ui(arguments)
		}
	}, Oi);
	var zi = function(e) {
			return h === e || void 0 === e ? An()[X]() : hn(e) ? pn(e) ? e[$]() : e[N]() : On(e)
		},
		Wi = zi;
	si[ut](zi, {
		toKeyedSeq: function() {
			return this
		},
		toSeq: function() {
			return this
		}
	}, { of: function() {
			return Wi(arguments)
		}
	}, Ri), kn(zi, ji[e]);
	var Xi = function(e) {
			return h === e || void 0 === e ? An() : hn(e) ? pn(e) ? e[dt]() : e[ct]() : Mn(e)
		},
		Vi = Xi;
	si[ut](Xi, {
		toIndexedSeq: function() {
			return this
		},
		toString: function() {
			return this[pt]("Seq [", "]")
		},
		__iterate: function(e, t) {
			return Hn(this, e, t, !1)
		},
		__iterator: function(e, t) {
			return Bn(this, e, t, !1)
		}
	}, { of: function() {
			return Vi(arguments)
		}
	}, Ri), kn(Xi, Ii[e]);
	var $i = function(e) {
			return (h === e || void 0 === e ? An() : hn(e) ? pn(e) ? e[dt]() : e : Mn(e))[V]()
		},
		Ji = $i;
	si[ut]($i, {
		toSetSeq: function() {
			return this
		}
	}, { of: function() {
			return Ji(arguments)
		}
	}, Ri), kn($i, qi[e]), Ri.isSeq = Ln, Ri.Keyed = zi, Ri.Set = $i, Ri.Indexed = Xi;
	var Ki = "@@__IMMUTABLE_SEQ__@@";
	Ri[e][Ki] = !0;
	var Qi = function(e) {
		this._array = e, this[l] = e[f]
	};
	si[ut](Qi, {
		get: function(e, t) {
			return this.has(e) ? this._array[$t(this, e)] : t
		},
		__iterate: function(e, t) {
			for (var n = this._array, r = n[f] - 1, i = 0; r >= i; i++)
				if (e(n[t ? r - i : i], i, this) === !1) return i + 1;
			return i
		},
		__iterator: function(e, t) {
			var n = this._array,
				r = n[f] - 1,
				i = 0;
			return new Li(function() {
				return i > r ? un() : on(e, i, n[t ? r - i++ : i++])
			})
		}
	}, {}, Xi);
	var Gi = function(e) {
		var t = Object.keys(e);
		this[vt] = e, this._keys = t, this[l] = t[f]
	};
	si[ut](Gi, {
		get: function(e, t) {
			return void 0 === t || this.has(e) ? this[vt][e] : t
		},
		has: function(e) {
			return this[vt][mt](e)
		},
		__iterate: function(e, t) {
			for (var n = this[vt], r = this._keys, i = r[f] - 1, s = 0; i >= s; s++) {
				var o = r[t ? i - s : s];
				if (e(n[o], o, this) === !1) return s + 1
			}
			return s
		},
		__iterator: function(e, t) {
			var n = this[vt],
				r = this._keys,
				i = r[f] - 1,
				s = 0;
			return new Li(function() {
				var o = r[t ? i - s : s];
				return s++ > i ? un() : on(e, o, n[o])
			})
		}
	}, {}, zi), Gi[e][Hi] = !0;
	var Yi = function(e) {
		this[gt] = e, this[l] = e[f] || e[l]
	};
	si[ut](Yi, {
		__iterateUncached: function(e, t) {
			if (t) return this[S]()[c](e, t);
			var n = this[gt],
				r = ln(n),
				i = 0;
			if (fn(r))
				for (var s; !(s = r[g]())[E] && e(s[a], i++, this) !== !1;);
			return i
		},
		__iteratorUncached: function(e, t) {
			if (t) return this[S]()[U](e, t);
			var n = this[gt],
				r = ln(n);
			if (!fn(r)) return new Li(un);
			var i = 0;
			return new Li(function() {
				var t = r[g]();
				return t[E] ? t : on(e, i++, t[a])
			})
		}
	}, {}, Xi);
	var Zi = function(e) {
		this[yt] = e, this[bt] = []
	};
	si[ut](Zi, {
		__iterateUncached: function(e, t) {
			if (t) return this[S]()[c](e, t);
			for (var n = this[yt], r = this[bt], i = 0; r[f] > i;)
				if (e(r[i], i++, this) === !1) return i;
			for (var s; !(s = n[g]())[E];) {
				var o = s[a];
				if (r[i] = o, e(o, i++, this) === !1) break
			}
			return i
		},
		__iteratorUncached: function(e, t) {
			if (t) return this[S]()[U](e, t);
			var n = this[yt],
				r = this[bt],
				i = 0;
			return new Li(function() {
				if (i >= r[f]) {
					var t = n[g]();
					if (t[E]) return t;
					r[i] = t[a]
				}
				return on(e, i, r[i++])
			})
		}
	}, {}, Xi);
	var es, ts = function() {
		throw TypeError("Abstract")
	};
	si[ut](ts, {}, {}, Oi);
	var ns = function() {
			si[at](this, rs[e], arguments)
		},
		rs = ns;
	si[ut](ns, {}, {}, ts), kn(ns, ji[e]);
	var is = function() {
			si[at](this, ss[e], arguments)
		},
		ss = is;
	si[ut](is, {}, {}, ts), kn(is, Ii[e]);
	var os = function() {
			si[at](this, us[e], arguments)
		},
		us = os;
	si[ut](os, {}, {}, ts), kn(os, qi[e]), ts.Keyed = ns, ts.Indexed = is, ts.Set = os;
	var as = function(e) {
		return h === e || void 0 === e ? Xn() : Rn(e) ? e : Xn()[j](function(t) {
			ji(e)[n](function(e, n) {
				return t.set(n, e)
			})
		})
	};
	si[ut](as, {
		toString: function() {
			return this[pt]("Map {", "}")
		},
		get: function(e, t) {
			return this[A] ? this[A].get(0, void 0, e, t) : t
		},
		set: function(e, t) {
			return Vn(this, e, t)
		},
		setIn: function(e, t) {
			return this[wt](e, function() {
				return t
			})
		},
		remove: function(e) {
			return Vn(this, e, li)
		},
		removeIn: function(e) {
			return this[wt](e, function() {
				return li
			})
		},
		update: function(e, t, n) {
			return 1 === arguments[f] ? e(this) : this[wt]([e], t, n)
		},
		updateIn: function(e, t, n) {
			n || (n = t, t = void 0);
			var r = nr(this, ln(e) || ln(Oi(e)), t, n);
			return r === li ? void 0 : r
		},
		clear: function() {
			return 0 === this[l] ? this : this[O] ? (this[l] = 0, this[A] = h, this[b] = void 0, this[M] = !0, this) : Xn()
		},
		merge: function() {
			return Zn(this, void 0, arguments)
		},
		mergeWith: function(e) {
			for (var t = [], n = 1; arguments[f] > n; n++) t[n - 1] = arguments[n];
			return Zn(this, e, t)
		},
		mergeIn: function(e) {
			for (var t = [], n = 1; arguments[f] > n; n++) t[n - 1] = arguments[n];
			return this[wt](e, Xn(), function(e) {
				return e.merge[i](e, t)
			})
		},
		mergeDeep: function() {
			return Zn(this, er(void 0), arguments)
		},
		mergeDeepWith: function(e) {
			for (var t = [], n = 1; arguments[f] > n; n++) t[n - 1] = arguments[n];
			return Zn(this, er(e), t)
		},
		mergeDeepIn: function(e) {
			for (var t = [], n = 1; arguments[f] > n; n++) t[n - 1] = arguments[n];
			return this[wt](e, Xn(), function(e) {
				return e[Et][i](e, t)
			})
		},
		sort: function(e) {
			return js(Er(this, e))
		},
		sortBy: function(e, t) {
			return js(Er(this, t, e))
		},
		withMutations: function(e) {
			var t = this[z]();
			return e(t), t[St]() ? t[xt](this[O]) : this
		},
		asMutable: function() {
			return this[O] ? this : this[xt](new zt)
		},
		asImmutable: function() {
			return this[xt]()
		},
		wasAltered: function() {
			return this[M]
		},
		__iterator: function(e, t) {
			return new Es(this, e, t)
		},
		__iterate: function(e, t) {
			var n = this,
				r = 0;
			return this[A] && this[A][Tt](function(t) {
				return r++, e(t[1], t[0], n)
			}, t), r
		},
		__ensureOwner: function(e) {
			return e === this[O] ? this : e ? Wn(this[l], this[A], e, this[b]) : (this[O] = e, this[M] = !1, this)
		}
	}, {}, ns), as.isMap = Rn;
	var fs = "@@__IMMUTABLE_MAP__@@",
		ls = as[e];
	ls[fs] = !0, ls[oi] = ls[F];
	var cs = function(e, t) {
			this[et] = e, this[w] = t
		},
		hs = cs;
	si[ut](cs, {
		get: function(e, t, n, r) {
			for (var i = this[w], s = 0, o = i[f]; o > s; s++)
				if (It(n, i[s][0])) return i[s][1];
			return r
		},
		update: function(e, t, n, r, i, s, o) {
			for (var u = i === li, a = this[w], l = 0, c = a[f]; c > l && !It(r, a[l][0]); l++);
			var h = c > l;
			if (h ? a[l][1] === i : u) return this;
			if (Ut(o), (u || !h) && Ut(s), !u || 1 !== a[f]) {
				if (!h && !u && a[f] >= xs) return Qn(e, a, r, i);
				var p = e && e === this[et],
					d = p ? a : Wt(a);
				return h ? u ? l === c - 1 ? d.pop() : d[l] = d.pop() : d[l] = [r, i] : d.push([r, i]), p ? (this[w] = d, this) : new hs(e, d)
			}
		}
	}, {});
	var ps = function(e, t, n) {
			this[et] = e, this.bitmap = t, this[Nt] = n
		},
		ds = ps;
	si[ut](ps, {
		get: function(e, t, n, r) {
			void 0 === t && (t = en(n));
			var i = 1 << ((0 === e ? t : t >>> e) & fi),
				s = this.bitmap;
			return 0 === (s & i) ? r : this[Nt][rr(s & i - 1)].get(e + ui, t, n, r)
		},
		update: function(e, t, n, r, i, s, o) {
			void 0 === n && (n = en(r));
			var u = (0 === t ? n : n >>> t) & fi,
				a = 1 << u,
				l = this.bitmap,
				c = 0 !== (l & a);
			if (!c && i === li) return this;
			var h = rr(l & a - 1),
				p = this[Nt],
				d = c ? p[h] : void 0,
				v = $n(d, e, t + ui, n, r, i, s, o);
			if (v === d) return this;
			if (!c && v && p[f] >= Ts) return Yn(e, p, l, u, v);
			if (c && !v && 2 === p[f] && Jn(p[1 ^ h])) return p[1 ^ h];
			if (c && v && 1 === p[f] && Jn(v)) return v;
			var m = e && e === this[et],
				g = c ? v ? l : l ^ a : l | a,
				y = c ? v ? ir(p, h, v, m) : or(p, h, m) : sr(p, h, v, m);
			return m ? (this.bitmap = g, this[Nt] = y, this) : new ds(e, g, y)
		}
	}, {});
	var vs = function(e, t, n) {
			this[et] = e, this.count = t, this[Nt] = n
		},
		ms = vs;
	si[ut](vs, {
		get: function(e, t, n, r) {
			void 0 === t && (t = en(n));
			var i = (0 === e ? t : t >>> e) & fi,
				s = this[Nt][i];
			return s ? s.get(e + ui, t, n, r) : r
		},
		update: function(e, t, n, r, i, s, o) {
			void 0 === n && (n = en(r));
			var u = (0 === t ? n : n >>> t) & fi,
				a = i === li,
				f = this[Nt],
				l = f[u];
			if (a && !l) return this;
			var c = $n(l, e, t + ui, n, r, i, s, o);
			if (c === l) return this;
			var h = this.count;
			if (l) {
				if (!c && (h--, Ns > h)) return Gn(e, f, h, u)
			} else h++;
			var p = e && e === this[et],
				d = ir(f, u, c, p);
			return p ? (this.count = h, this[Nt] = d, this) : new ms(e, h, d)
		}
	}, {});
	var gs = function(e, t, n) {
			this[et] = e, this[D] = t, this[w] = n
		},
		ys = gs;
	si[ut](gs, {
		get: function(e, t, n, r) {
			for (var i = this[w], s = 0, o = i[f]; o > s; s++)
				if (It(n, i[s][0])) return i[s][1];
			return r
		},
		update: function(e, t, n, r, i, s, o) {
			void 0 === n && (n = en(r));
			var u = i === li;
			if (n !== this[D]) return u ? this : (Ut(o), Ut(s), Kn(this, e, t, n, [r, i]));
			for (var a = this[w], l = 0, c = a[f]; c > l && !It(r, a[l][0]); l++);
			var h = c > l;
			if (h ? a[l][1] === i : u) return this;
			if (Ut(o), (u || !h) && Ut(s), u && 2 === c) return new bs(e, this[D], a[1 ^ l]);
			var p = e && e === this[et],
				d = p ? a : Wt(a);
			return h ? u ? l === c - 1 ? d.pop() : d[l] = d.pop() : d[l] = [r, i] : d.push([r, i]), p ? (this[w] = d, this) : new ys(e, this[D], d)
		}
	}, {});
	var bs = function(e, t, n) {
			this[et] = e, this[D] = t, this[P] = n
		},
		ws = bs;
	si[ut](bs, {
		get: function(e, t, n, r) {
			return It(n, this[P][0]) ? this[P][1] : r
		},
		update: function(e, t, n, r, i, s, o) {
			var u = i === li,
				a = It(r, this[P][0]);
			return (a ? i === this[P][1] : u) ? this : (Ut(o), u ? void Ut(s) : a ? e && e === this[et] ? (this[P][1] = i, this) : new ws(e, this[D], [r, i]) : (Ut(s), Kn(this, e, t, en(r), [r, i])))
		}
	}, {}), cs[e][Tt] = gs[e][Tt] = function(e, t) {
		for (var n = this[w], r = 0, i = n[f] - 1; i >= r; r++)
			if (e(n[t ? i - r : r]) === !1) return !1
	}, ps[e][Tt] = vs[e][Tt] = function(e, t) {
		for (var n = this[Nt], r = 0, i = n[f] - 1; i >= r; r++) {
			var s = n[t ? i - r : r];
			if (s && s[Tt](e, t) === !1) return !1
		}
	}, bs[e][Tt] = function(e) {
		return e(this[P])
	};
	var Es = function(e, t, n) {
		this._type = t, this[Ct] = n, this[kt] = e[A] && zn(e[A])
	};
	si[ut](Es, {
		next: function() {
			for (var e = this._type, t = this[kt]; t;) {
				var n, r = t.node,
					i = t.index++;
				if (r[P]) {
					if (0 === i) return Un(e, r[P])
				} else if (r[w]) {
					if (n = r[w][f] - 1, n >= i) return Un(e, r[w][this[Ct] ? n - i : i])
				} else if (n = r[Nt][f] - 1, n >= i) {
					var s = r[Nt][this[Ct] ? n - i : i];
					if (s) {
						if (s[P]) return Un(e, s[P]);
						t = this[kt] = zn(s, t)
					}
					continue
				}
				t = this[kt] = this[kt].__prev
			}
			return un()
		}
	}, {}, Li);
	var Ss, xs = ai / 4,
		Ts = ai / 2,
		Ns = ai / 4,
		Cs = function(e, t) {
			this[I] = e, this[Lt] = t, this[l] = e[l]
		};
	si[ut](Cs, {
		get: function(e, t) {
			return this[I].get(e, t)
		},
		has: function(e) {
			return this[I].has(e)
		},
		valueSeq: function() {
			return this[I][ft]()
		},
		reverse: function() {
			var e = this,
				t = fr(this, !0);
			return this[Lt] || (t[ft] = function() {
				return e[I][$]()[q]()
			}), t
		},
		map: function(e, t) {
			var n = this,
				r = ar(this, e, t);
			return this[Lt] || (r[ft] = function() {
				return n[I][$]().map(e, t)
			}), r
		},
		__iterate: function(e, t) {
			var n, r = this;
			return this[I][c](this[Lt] ? function(t, n) {
				return e(t, n, r)
			} : (n = t ? Nr(this) : 0, function(i) {
				return e(i, t ? --n : n++, r)
			}), t)
		},
		__iterator: function(e, t) {
			if (this[Lt]) return this[I][U](e, t);
			var n = this[I][U](xi, t),
				r = t ? Nr(this) : 0;
			return new Li(function() {
				var i = n[g]();
				return i[E] ? i : on(e, t ? --r : r++, i[a], i)
			})
		}
	}, {}, zi), Cs[e][Hi] = !0;
	var ks = function(e) {
		this[I] = e, this[l] = e[l]
	};
	si[ut](ks, {
		contains: function(e) {
			return this[I][R](e)
		},
		__iterate: function(e, t) {
			var n = this,
				r = 0;
			return this[I][c](function(t) {
				return e(t, r++, n)
			}, t)
		},
		__iterator: function(e, t) {
			var n = this[I][U](xi, t),
				r = 0;
			return new Li(function() {
				var t = n[g]();
				return t[E] ? t : on(e, r++, t[a], t)
			})
		}
	}, {}, Xi);
	var Ls = function(e) {
		this[I] = e, this[l] = e[l]
	};
	si[ut](Ls, {
		has: function(e) {
			return this[I][R](e)
		},
		__iterate: function(e, t) {
			var n = this;
			return this[I][c](function(t) {
				return e(t, t, n)
			}, t)
		},
		__iterator: function(e, t) {
			var n = this[I][U](xi, t);
			return new Li(function() {
				var t = n[g]();
				return t[E] ? t : on(e, t[a], t[a], t)
			})
		}
	}, {}, $i);
	var As = function(e) {
		this[I] = e, this[l] = e[l]
	};
	si[ut](As, {
		entrySeq: function() {
			return this[I][$]()
		},
		__iterate: function(e, t) {
			var n = this;
			return this[I][c](function(t) {
				return t ? (Tr(t), e(t[1], t[0], n)) : void 0
			}, t)
		},
		__iterator: function(e, t) {
			var n = this[I][U](xi, t);
			return new Li(function() {
				for (;;) {
					var t = n[g]();
					if (t[E]) return t;
					var r = t[a];
					if (r) return Tr(r), e === Ti ? t : on(e, r[0], r[1], t)
				}
			})
		}
	}, {}, zi), ks[e][S] = Cs[e][S] = Ls[e][S] = As[e][S] = Lr;
	var Os = function(e) {
		var t = Pr();
		if (h === e || void 0 === e) return t;
		if (Or(e)) return e;
		e = Ii(e);
		var r = e[l];
		return 0 === r ? t : r > 0 && ai > r ? Dr(0, r, ui, h, new Ds(e[J]())) : t[j](function(t) {
			t.setSize(r), e[n](function(e, n) {
				return t.set(n, e)
			})
		})
	};
	si[ut](Os, {
		toString: function() {
			return this[pt]("List [", "]")
		},
		get: function(e, t) {
			if (e = $t(this, e), 0 > e || e >= this[l]) return t;
			e += this[Q];
			var n = Fr(this, e);
			return n && n[K][e & fi]
		},
		set: function(e, t) {
			return Hr(this, e, t)
		},
		remove: function(e) {
			return this.has(e) ? 0 === e ? this.shift() : e === this[l] - 1 ? this.pop() : this.splice(e, 1) : this
		},
		clear: function() {
			return 0 === this[l] ? this : this[O] ? (this[l] = this[Q] = this[G] = 0, this[Y] = ui, this[A] = this[Z] = h, this[b] = void 0, this[M] = !0, this) : Pr()
		},
		push: function() {
			var e = arguments,
				t = this[l];
			return this[j](function(n) {
				Ir(n, 0, t + e[f]);
				for (var r = 0; e[f] > r; r++) n.set(t + r, e[r])
			})
		},
		pop: function() {
			return Ir(this, 0, -1)
		},
		unshift: function() {
			var e = arguments;
			return this[j](function(t) {
				Ir(t, -e[f]);
				for (var n = 0; e[f] > n; n++) t.set(n, e[n])
			})
		},
		shift: function() {
			return Ir(this, 1)
		},
		merge: function() {
			return qr(this, void 0, arguments)
		},
		mergeWith: function(e) {
			for (var t = [], n = 1; arguments[f] > n; n++) t[n - 1] = arguments[n];
			return qr(this, e, t)
		},
		mergeDeep: function() {
			return qr(this, er(void 0), arguments)
		},
		mergeDeepWith: function(e) {
			for (var t = [], n = 1; arguments[f] > n; n++) t[n - 1] = arguments[n];
			return qr(this, er(e), t)
		},
		setSize: function(e) {
			return Ir(this, 0, e)
		},
		slice: function(e, t) {
			var n = this[l];
			return Kt(e, t, n) ? this : Ir(this, Qt(e, n), Gt(t, n))
		},
		__iterator: function(e, t) {
			return new Hs(this, e, t)
		},
		__iterate: function(e, t) {
			var n = this,
				r = 0,
				i = function(t) {
					return e(t, r++, n)
				},
				s = Rr(this[G]);
			return t ? Mr(this[Z], 0, s - this[Q], this[G] - this[Q], i, t) && Mr(this[A], this[Y], -this[Q], s - this[Q], i, t) : Mr(this[A], this[Y], -this[Q], s - this[Q], i, t) && Mr(this[Z], 0, s - this[Q], this[G] - this[Q], i, t), r
		},
		__ensureOwner: function(e) {
			return e === this[O] ? this : e ? Dr(this[Q], this[G], this[Y], this[A], this[Z], e, this[b]) : (this[O] = e, this)
		}
	}, { of: function() {
			return this(arguments)
		}
	}, is), Os.isList = Or;
	var Ms = "@@__IMMUTABLE_LIST__@@",
		_s = Os[e];
	_s[Ms] = !0, _s[oi] = _s[F], _s.setIn = ls.setIn, _s.removeIn = ls.removeIn, _s[_] = ls[_], _s[wt] = ls[wt], _s[At] = ls[At], _s[Ot] = ls[Ot], _s[j] = ls[j], _s[z] = ls[z], _s[W] = ls[W], _s[St] = ls[St];
	var Ds = function(e, t) {
			this[K] = e, this[et] = t
		},
		Ps = Ds;
	si[ut](Ds, {
		removeBefore: function(e, t, n) {
			if (n === t ? 1 << t : 0 === this[K][f]) return this;
			var r = n >>> t & fi;
			if (r >= this[K][f]) return new Ps([], e);
			var i, s = 0 === r;
			if (t > 0) {
				var o = this[K][r];
				if (i = o && o[rt](e, t - ui, n), i === o && s) return this
			}
			if (s && !i) return this;
			var u = jr(this, e);
			if (!s)
				for (var a = 0; r > a; a++) u[K][a] = void 0;
			return i && (u[K][r] = i), u
		},
		removeAfter: function(e, t, n) {
			if (n === t ? 1 << t : 0 === this[K][f]) return this;
			var r = n - 1 >>> t & fi;
			if (r >= this[K][f]) return this;
			var i, s = r === this[K][f] - 1;
			if (t > 0) {
				var o = this[K][r];
				if (i = o && o[nt](e, t - ui, n), i === o && s) return this
			}
			if (s && !i) return this;
			var u = jr(this, e);
			return s || u[K].pop(), i && (u[K][r] = i), u
		}
	}, {});
	var Hs = function(e, t, n) {
		this._type = t, this[Ct] = !!n, this._maxIndex = e[l] - 1;
		var r = Rr(e[G]),
			i = _r(e[A] && e[A][K], e[Y], -e[Q], r - e[Q] - 1),
			s = _r(e[Z] && e[Z][K], 0, r - e[Q], e[G] - e[Q] - 1);
		this[kt] = n ? s : i, this[kt].__prev = n ? i : s
	};
	si[ut](Hs, {
		next: function() {
			for (var e = this[kt]; e;) {
				var t = e[K],
					n = e.index++;
				if (this[Ct] && (n = fi - n, n > e.rawMax && (n = e.rawMax, e.index = ai - n)), n >= 0 && ai > n && e.rawMax >= n) {
					var r = t && t[n];
					if (0 === e.level) {
						var i, s = this._type;
						return 1 !== s && (i = e.offset + (n << e.level), this[Ct] && (i = this._maxIndex - i)), on(s, i, r)
					}
					this[kt] = e = _r(r && r[K], e.level - ui, e.offset + (n << e.level), e.max, e)
				} else e = this[kt] = this[kt].__prev
			}
			return un()
		}
	}, {}, Li);
	var Bs, js = function(e) {
		return h === e || void 0 === e ? Wr() : Ur(e) ? e : Wr()[j](function(t) {
			ji(e)[n](function(e, n) {
				return t.set(n, e)
			})
		})
	};
	si[ut](js, {
		toString: function() {
			return this[pt]("OrderedMap {", "}")
		},
		get: function(e, t) {
			var n = this[it].get(e);
			return void 0 !== n ? this[st].get(n)[1] : t
		},
		clear: function() {
			return 0 === this[l] ? this : this[O] ? (this[l] = 0, this[it].clear(), this[st].clear(), this) : Wr()
		},
		set: function(e, t) {
			return Xr(this, e, t)
		},
		remove: function(e) {
			return Xr(this, e, li)
		},
		wasAltered: function() {
			return this[it][St]() || this[st][St]()
		},
		__iterate: function(e, t) {
			var n = this;
			return this[st][c](function(t) {
				return t && e(t[1], t[0], n)
			}, t)
		},
		__iterator: function(e, t) {
			return this[st][N]()[U](e, t)
		},
		__ensureOwner: function(e) {
			if (e === this[O]) return this;
			var t = this[it][xt](e),
				n = this[st][xt](e);
			return e ? zr(t, n, e, this[b]) : (this[O] = e, this[it] = t, this[st] = n, this)
		}
	}, { of: function() {
			return this(arguments)
		}
	}, as), js.isOrderedMap = Ur, js[e][Hi] = !0, js[e][oi] = js[e][F];
	var Fs, Is = function(e) {
			return h === e || void 0 === e ? Jr() : Vr(e) ? e : Jr().unshiftAll(e)
		},
		qs = Is;
	si[ut](Is, {
		toString: function() {
			return this[pt]("Stack [", "]")
		},
		get: function(e, t) {
			for (var n = this[ot]; n && e--;) n = n[g];
			return n ? n[a] : t
		},
		peek: function() {
			return this[ot] && this[ot][a]
		},
		push: function() {
			if (0 === arguments[f]) return this;
			for (var e = this[l] + arguments[f], t = this[ot], n = arguments[f] - 1; n >= 0; n--) t = {
				value: arguments[n],
				next: t
			};
			return this[O] ? (this[l] = e, this[ot] = t, this[b] = void 0, this[M] = !0, this) : $r(e, t)
		},
		pushAll: function(e) {
			if (e = Ii(e), 0 === e[l]) return this;
			var t = this[l],
				r = this[ot];
			return e[q]()[n](function(e) {
				t++, r = {
					value: e,
					next: r
				}
			}), this[O] ? (this[l] = t, this[ot] = r, this[b] = void 0, this[M] = !0, this) : $r(t, r)
		},
		pop: function() {
			return this[tt](1)
		},
		unshift: function() {
			return this.push[i](this, arguments)
		},
		unshiftAll: function(e) {
			return this.pushAll(e)
		},
		shift: function() {
			return this.pop[i](this, arguments)
		},
		clear: function() {
			return 0 === this[l] ? this : this[O] ? (this[l] = 0, this[ot] = void 0, this[b] = void 0, this[M] = !0, this) : Jr()
		},
		slice: function(t, n) {
			if (Kt(t, n, this[l])) return this;
			var r = Qt(t, this[l]),
				i = Gt(n, this[l]);
			if (i !== this[l]) return si.superCall(this, qs[e], tt, [t, n]);
			for (var s = this[l] - r, o = this[ot]; r--;) o = o[g];
			return this[O] ? (this[l] = s, this[ot] = o, this[b] = void 0, this[M] = !0, this) : $r(s, o)
		},
		__ensureOwner: function(e) {
			return e === this[O] ? this : e ? $r(this[l], this[ot], e, this[b]) : (this[O] = e, this[M] = !1, this)
		},
		__iterate: function(e, t) {
			if (t) return this[$]()[S][c](e, t);
			for (var n = 0, r = this[ot]; r && e(r[a], n++, this) !== !1;) r = r[g];
			return n
		},
		__iterator: function(e, t) {
			if (t) return this[$]()[S]()[U](e, t);
			var n = 0,
				r = this[ot];
			return new Li(function() {
				if (r) {
					var t = r[a];
					return r = r[g], on(e, n++, t)
				}
				return un()
			})
		}
	}, { of: function() {
			return this(arguments)
		}
	}, is), Is.isStack = Vr;
	var Rs = "@@__IMMUTABLE_STACK__@@",
		Us = Is[e];
	Us[Rs] = !0, Us[j] = ls[j], Us[z] = ls[z], Us[W] = ls[W], Us[St] = ls[St];
	var zs, Ws = function(e) {
		return h === e || void 0 === e ? Yr() : Kr(e) ? e : Yr()[j](function(t) {
			qi(e)[n](function(e) {
				return t.add(e)
			})
		})
	};
	si[ut](Ws, {
		toString: function() {
			return this[pt]("Set {", "}")
		},
		has: function(e) {
			return this[it].has(e)
		},
		add: function(e) {
			return Qr(this, this[it].set(e, !0))
		},
		remove: function(e) {
			return Qr(this, this[it][F](e))
		},
		clear: function() {
			return Qr(this, this[it].clear())
		},
		union: function() {
			for (var e = [], t = 0; arguments[f] > t; t++) e[t] = arguments[t];
			return e = e[B](function(e) {
				return 0 !== e[l]
			}), 0 === e[f] ? this : 0 === this[l] && 1 === e[f] ? this[r](e[0]) : this[j](function(t) {
				for (var r = 0; e[f] > r; r++) qi(e[r])[n](function(e) {
					return t.add(e)
				})
			})
		},
		intersect: function() {
			for (var e = [], t = 0; arguments[f] > t; t++) e[t] = arguments[t];
			if (0 === e[f]) return this;
			e = e.map(function(e) {
				return qi(e)
			});
			var r = this;
			return this[j](function(t) {
				r[n](function(n) {
					e.every(function(e) {
						return e[R](n)
					}) || t[F](n)
				})
			})
		},
		subtract: function() {
			for (var e = [], t = 0; arguments[f] > t; t++) e[t] = arguments[t];
			if (0 === e[f]) return this;
			e = e.map(function(e) {
				return qi(e)
			});
			var r = this;
			return this[j](function(t) {
				r[n](function(n) {
					e.some(function(e) {
						return e[R](n)
					}) && t[F](n)
				})
			})
		},
		merge: function() {
			return this.union[i](this, arguments)
		},
		mergeWith: function() {
			for (var e = [], t = 1; arguments[f] > t; t++) e[t - 1] = arguments[t];
			return this.union[i](this, e)
		},
		sort: function(e) {
			return Js(Er(this, e))
		},
		sortBy: function(e, t) {
			return Js(Er(this, t, e))
		},
		wasAltered: function() {
			return this[it][St]()
		},
		__iterate: function(e, t) {
			var n = this;
			return this[it][c](function(t, r) {
				return e(r, r, n)
			}, t)
		},
		__iterator: function(e, t) {
			return this[it].map(function(e, t) {
				return t
			})[U](e, t)
		},
		__ensureOwner: function(e) {
			if (e === this[O]) return this;
			var t = this[it][xt](e);
			return e ? this.__make(t, e) : (this[O] = e, this[it] = t, this)
		}
	}, { of: function() {
			return this(arguments)
		},
		fromKeys: function(e) {
			return this(ji(e).keySeq())
		}
	}, os), Ws.isSet = Kr;
	var Xs = "@@__IMMUTABLE_SET__@@",
		Vs = Ws[e];
	Vs[Xs] = !0, Vs[oi] = Vs[F], Vs[Et] = Vs.merge, Vs[H] = Vs[Mt], Vs[j] = ls[j], Vs[z] = ls[z], Vs[W] = ls[W], Vs.__empty = Yr, Vs.__make = Gr;
	var $s, Js = function(e) {
		return h === e || void 0 === e ? ti() : Zr(e) ? e : ti()[j](function(t) {
			qi(e)[n](function(e) {
				return t.add(e)
			})
		})
	};
	si[ut](Js, {
		toString: function() {
			return this[pt]("OrderedSet {", "}")
		}
	}, { of: function() {
			return this(arguments)
		},
		fromKeys: function(e) {
			return this(ji(e).keySeq())
		}
	}, Ws), Js.isOrderedSet = Zr;
	var Ks = Js[e];
	Ks[Hi] = !0, Ks.__empty = ti, Ks.__make = ei;
	var Qs, Gs = function(i, s) {
		var o = function(e) {
				return this instanceof o ? void(this[it] = as(e)) : new o(e)
			},
			u = Object.keys(i),
			a = o[e] = Object[t](Ys);
		a[r] = o, s && (a._name = s), a[_t] = i, a._keys = u, a[l] = u[f];
		try {
			u[n](function(t) {
				Object[d](o[e], t, {
					get: function() {
						return this.get(t)
					},
					set: function(e) {
						qt(this[O], "Cannot set on an immutable record."), this.set(t, e)
					}
				})
			})
		} catch (c) {}
		return o
	};
	si[ut](Gs, {
		toString: function() {
			return this[pt](ri(this) + " {", "}")
		},
		has: function(e) {
			return this[_t][mt](e)
		},
		get: function(e, t) {
			if (!this.has(e)) return t;
			var n = this[_t][e];
			return this[it] ? this[it].get(e, n) : n
		},
		clear: function() {
			if (this[O]) return this[it] && this[it].clear(), this;
			var e = Object[s](this)[r];
			return e._empty || (e._empty = ni(this, Xn()))
		},
		set: function(e, t) {
			if (!this.has(e)) throw Error('Cannot set unknown key "' + e + '" on ' + ri(this));
			var n = this[it] && this[it].set(e, t);
			return this[O] || n === this[it] ? this : ni(this, n)
		},
		remove: function(e) {
			if (!this.has(e)) return this;
			var t = this[it] && this[it][F](e);
			return this[O] || t === this[it] ? this : ni(this, t)
		},
		wasAltered: function() {
			return this[it][St]()
		},
		__iterator: function(e, t) {
			var n = this;
			return ji(this[_t]).map(function(e, t) {
				return n.get(t)
			})[U](e, t)
		},
		__iterate: function(e, t) {
			var n = this;
			return ji(this[_t]).map(function(e, t) {
				return n.get(t)
			})[c](e, t)
		},
		__ensureOwner: function(e) {
			if (e === this[O]) return this;
			var t = this[it] && this[it][xt](e);
			return e ? ni(this, t, e) : (this[O] = e, this[it] = t, this)
		}
	}, {}, ns);
	var Ys = Gs[e];
	Ys[oi] = Ys[F], Ys.merge = ls.merge, Ys[Mt] = ls[Mt], Ys[At] = ls[At], Ys[Et] = ls[Et], Ys[H] = ls[H], Ys[Ot] = ls[Ot], Ys.setIn = ls.setIn, Ys[_] = ls[_], Ys[wt] = ls[wt], Ys[j] = ls[j], Ys[z] = ls[z], Ys[W] = ls[W];
	var Zs = function(e, t, n) {
			return this instanceof eo ? (qt(0 !== n, "Cannot step a Range by 0"), e = e || 0, void 0 === t && (t = 1 / 0), e === t && no ? no : (n = void 0 === n ? 1 : Math.abs(n), e > t && (n = -n), this[Dt] = e, this._end = t, this[Pt] = n, void(this[l] = Math.max(0, Math.ceil((t - e) / n - 1) + 1)))) : new eo(e, t, n)
		},
		eo = Zs;
	si[ut](Zs, {
		toString: function() {
			return 0 === this[l] ? "Range []" : "Range [ " + this[Dt] + "..." + this._end + (this[Pt] > 1 ? " by " + this[Pt] : "") + " ]"
		},
		get: function(e, t) {
			return this.has(e) ? this[Dt] + $t(this, e) * this[Pt] : t
		},
		contains: function(e) {
			var t = (e - this[Dt]) / this[Pt];
			return t >= 0 && this[l] > t && t === Math.floor(t)
		},
		slice: function(e, t) {
			return Kt(e, t, this[l]) ? this : (e = Qt(e, this[l]), t = Gt(t, this[l]), e >= t ? no : new eo(this.get(e, this._end), this.get(t, this._end), this[Pt]))
		},
		indexOf: function(e) {
			var t = e - this[Dt];
			if (t % this[Pt] === 0) {
				var n = t / this[Pt];
				if (n >= 0 && this[l] > n) return n
			}
			return -1
		},
		lastIndexOf: function(e) {
			return this.indexOf(e)
		},
		take: function(e) {
			return this[tt](0, Math.max(0, e))
		},
		skip: function(e) {
			return this[tt](Math.max(0, e))
		},
		__iterate: function(e, t) {
			for (var n = this[l] - 1, r = this[Pt], i = t ? this[Dt] + n * r : this[Dt], s = 0; n >= s; s++) {
				if (e(i, s, this) === !1) return s + 1;
				i += t ? -r : r
			}
			return s
		},
		__iterator: function(e, t) {
			var n = this[l] - 1,
				r = this[Pt],
				i = t ? this[Dt] + n * r : this[Dt],
				s = 0;
			return new Li(function() {
				var o = i;
				return i += t ? -r : r, s > n ? un() : on(e, s++, o)
			})
		},
		equals: function(e) {
			return e instanceof eo ? this[Dt] === e[Dt] && this._end === e._end && this[Pt] === e[Pt] : xn(this, e)
		}
	}, {}, Xi);
	var to = Zs[e];
	to[lt] = to[J], to.first = _s.first, to.last = _s.last;
	var no = Zs(0, 0),
		ro = function(e, t) {
			return 0 >= t && oo ? oo : this instanceof io ? (this[Ht] = e, this[l] = void 0 === t ? 1 / 0 : Math.max(0, t), void(0 === this[l] && (oo = this))) : new io(e, t)
		},
		io = ro;
	si[ut](ro, {
		toString: function() {
			return 0 === this[l] ? "Repeat []" : "Repeat [ " + this[Ht] + " " + this[l] + " times ]"
		},
		get: function(e, t) {
			return this.has(e) ? this[Ht] : t
		},
		contains: function(e) {
			return It(this[Ht], e)
		},
		slice: function(e, t) {
			var n = this[l];
			return Kt(e, t, n) ? this : new io(this[Ht], Gt(t, n) - Qt(e, n))
		},
		reverse: function() {
			return this
		},
		indexOf: function(e) {
			return It(this[Ht], e) ? 0 : -1
		},
		lastIndexOf: function(e) {
			return It(this[Ht], e) ? this[l] : -1
		},
		__iterate: function(e) {
			for (var t = 0; this[l] > t; t++)
				if (e(this[Ht], t, this) === !1) return t + 1;
			return t
		},
		__iterator: function(e) {
			var t = this,
				n = 0;
			return new Li(function() {
				return t[l] > n ? on(e, n++, t[Ht]) : un()
			})
		},
		equals: function(e) {
			return e instanceof io ? It(this[Ht], e[Ht]) : xn(e)
		}
	}, {}, Xi);
	var so = ro[e];
	so.last = so.first, so.has = to.has, so.take = to.take, so.skip = to.skip, so[lt] = to[lt];
	var oo, uo = {
		Iterable: Oi,
		Seq: Ri,
		Collection: ts,
		Map: as,
		OrderedMap: js,
		List: Os,
		Stack: Is,
		Set: Ws,
		OrderedSet: Js,
		Record: Gs,
		Range: Zs,
		Repeat: ro,
		is: It,
		fromJS: jn
	};
	return uo
}
"object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : Immutable = t();