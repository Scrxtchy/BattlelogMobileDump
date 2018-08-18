(function() {
	var e = "prototype",
		t = "push",
		n = "slice",
		r = "concat",
		i = "isArray",
		s = "keys",
		o = "_wrapped",
		u = "undefined",
		a = null,
		f = "call",
		l = "apply",
		c = "iteratee",
		h = "identity",
		p = "isFunction",
		d = "isObject",
		v = "matches",
		m = "property",
		g = "each",
		y = "length",
		b = !0,
		w = "filter",
		E = "negate",
		S = !1,
		x = "contains",
		T = "values",
		N = "indexOf",
		C = "random",
		k = "sortedIndex",
		L = "isArguments",
		A = "difference",
		O = "object",
		M = "number",
		_ = "partial",
		D = "[object Boolean]",
		P = "constructor",
		H = "[object Array]",
		B = "function",
		j = "replace",
		F = "templateSettings",
		I = "source",
		q = "'+\n((__t=(",
		R = "';\n",
		U = "variable",
		z = "shift",
		W = "splice",
		X = this,
		V = X._,
		$ = Array[e],
		J = Object[e],
		K = Function[e],
		Q = $[t],
		G = $[n],
		Y = $[r],
		Z = J.toString,
		et = J.hasOwnProperty,
		tt = Array[i],
		nt = Object[s],
		rt = K.bind,
		it = function(e) {
			if (e instanceof it) return e;
			if (!(this instanceof it)) return new it(e);
			this[o] = e
		};
	typeof exports !== u ? (typeof module !== u && module.exports && (exports = module.exports = it), exports._ = it) : X._ = it, it.VERSION = "1.7.0";
	var st = function(e, t, n) {
		if (t === void 0) return e;
		switch (n == a ? 3 : n) {
			case 1:
				return function(n) {
					return e[f](t, n)
				};
			case 2:
				return function(n, r) {
					return e[f](t, n, r)
				};
			case 3:
				return function(n, r, i) {
					return e[f](t, n, r, i)
				};
			case 4:
				return function(n, r, i, s) {
					return e[f](t, n, r, i, s)
				}
		}
		return function() {
			return e[l](t, arguments)
		}
	};
	it[c] = function(e, t, n) {
		return e == a ? it[h] : it[p](e) ? st(e, t, n) : it[d](e) ? it[v](e) : it[m](e)
	}, it[g] = it.forEach = function(e, t, n) {
		if (e == a) return e;
		t = st(t, n);
		var r, i = e[y];
		if (i === +i)
			for (r = 0; r < i; r++) t(e[r], r, e);
		else {
			var o = it[s](e);
			for (r = 0, i = o[y]; r < i; r++) t(e[o[r]], o[r], e)
		}
		return e
	}, it.map = it.collect = function(e, t, n) {
		if (e == a) return [];
		t = it[c](t, n);
		var r = e[y] !== +e[y] && it[s](e),
			i = (r || e)[y],
			o = Array(i),
			u;
		for (var f = 0; f < i; f++) u = r ? r[f] : f, o[f] = t(e[u], u, e);
		return o
	};
	var ot = "Reduce of empty array with no initial value";
	it.reduce = it.foldl = it.inject = function(e, t, n, r) {
		e == a && (e = []), t = st(t, r, 4);
		var i = e[y] !== +e[y] && it[s](e),
			o = (i || e)[y],
			u = 0,
			f;
		if (arguments[y] < 3) {
			if (!o) throw new TypeError(ot);
			n = e[i ? i[u++] : u++]
		}
		for (; u < o; u++) f = i ? i[u] : u, n = t(n, e[f], f, e);
		return n
	}, it.reduceRight = it.foldr = function(e, t, n, r) {
		e == a && (e = []), t = st(t, r, 4);
		var i = e[y] !== +e[y] && it[s](e),
			o = (i || e)[y],
			u;
		if (arguments[y] < 3) {
			if (!o) throw new TypeError(ot);
			n = e[i ? i[--o] : --o]
		}
		while (o--) u = i ? i[o] : o, n = t(n, e[u], u, e);
		return n
	}, it.find = it.detect = function(e, t, n) {
		var r;
		return t = it[c](t, n), it.some(e, function(e, n, i) {
			if (t(e, n, i)) return r = e, b
		}), r
	}, it[w] = it.select = function(e, n, r) {
		var i = [];
		return e == a ? i : (n = it[c](n, r), it[g](e, function(e, r, s) {
			n(e, r, s) && i[t](e)
		}), i)
	}, it.reject = function(e, t, n) {
		return it[w](e, it[E](it[c](t)), n)
	}, it.every = it.all = function(e, t, n) {
		if (e == a) return b;
		t = it[c](t, n);
		var r = e[y] !== +e[y] && it[s](e),
			i = (r || e)[y],
			o, u;
		for (o = 0; o < i; o++) {
			u = r ? r[o] : o;
			if (!t(e[u], u, e)) return S
		}
		return b
	}, it.some = it.any = function(e, t, n) {
		if (e == a) return S;
		t = it[c](t, n);
		var r = e[y] !== +e[y] && it[s](e),
			i = (r || e)[y],
			o, u;
		for (o = 0; o < i; o++) {
			u = r ? r[o] : o;
			if (t(e[u], u, e)) return b
		}
		return S
	}, it[x] = it.include = function(e, t) {
		return e == a ? S : (e[y] !== +e[y] && (e = it[T](e)), it[N](e, t) >= 0)
	}, it.invoke = function(e, t) {
		var n = G[f](arguments, 2),
			r = it[p](t);
		return it.map(e, function(e) {
			return (r ? t : e[t])[l](e, n)
		})
	}, it.pluck = function(e, t) {
		return it.map(e, it[m](t))
	}, it.where = function(e, t) {
		return it[w](e, it[v](t))
	}, it.findWhere = function(e, t) {
		return it.find(e, it[v](t))
	}, it.max = function(e, t, n) {
		var r = -Infinity,
			i = -Infinity,
			s, o;
		if (t == a && e != a) {
			e = e[y] === +e[y] ? e : it[T](e);
			for (var u = 0, f = e[y]; u < f; u++) s = e[u], s > r && (r = s)
		} else t = it[c](t, n), it[g](e, function(e, n, s) {
			o = t(e, n, s);
			if (o > i || o === -Infinity && r === -Infinity) r = e, i = o
		});
		return r
	}, it.min = function(e, t, n) {
		var r = Infinity,
			i = Infinity,
			s, o;
		if (t == a && e != a) {
			e = e[y] === +e[y] ? e : it[T](e);
			for (var u = 0, f = e[y]; u < f; u++) s = e[u], s < r && (r = s)
		} else t = it[c](t, n), it[g](e, function(e, n, s) {
			o = t(e, n, s);
			if (o < i || o === Infinity && r === Infinity) r = e, i = o
		});
		return r
	}, it.shuffle = function(e) {
		var t = e && e[y] === +e[y] ? e : it[T](e),
			n = t[y],
			r = Array(n);
		for (var i = 0, s; i < n; i++) s = it[C](0, i), s !== i && (r[i] = r[s]), r[s] = t[i];
		return r
	}, it.sample = function(e, t, r) {
		return t == a || r ? (e[y] !== +e[y] && (e = it[T](e)), e[it[C](e[y] - 1)]) : it.shuffle(e)[n](0, Math.max(0, t))
	}, it.sortBy = function(e, t, n) {
		return t = it[c](t, n), it.pluck(it.map(e, function(e, n, r) {
			return {
				value: e,
				index: n,
				criteria: t(e, n, r)
			}
		}).sort(function(e, t) {
			var n = e.criteria,
				r = t.criteria;
			if (n !== r) {
				if (n > r || n === void 0) return 1;
				if (n < r || r === void 0) return -1
			}
			return e.index - t.index
		}), "value")
	};
	var ut = function(e) {
		return function(t, n, r) {
			var i = {};
			return n = it[c](n, r), it[g](t, function(r, s) {
				var o = n(r, s, t);
				e(i, r, o)
			}), i
		}
	};
	it.groupBy = ut(function(e, n, r) {
		it.has(e, r) ? e[r][t](n) : e[r] = [n]
	}), it.indexBy = ut(function(e, t, n) {
		e[n] = t
	}), it.countBy = ut(function(e, t, n) {
		it.has(e, n) ? e[n]++ : e[n] = 1
	}), it[k] = function(e, t, n, r) {
		n = it[c](n, r, 1);
		var i = n(t),
			s = 0,
			o = e[y];
		while (s < o) {
			var u = s + o >>> 1;
			n(e[u]) < i ? s = u + 1 : o = u
		}
		return s
	}, it.toArray = function(e) {
		return e ? it[i](e) ? G[f](e) : e[y] === +e[y] ? it.map(e, it[h]) : it[T](e) : []
	}, it.size = function(e) {
		return e == a ? 0 : e[y] === +e[y] ? e[y] : it[s](e)[y]
	}, it.partition = function(e, n, r) {
		n = it[c](n, r);
		var i = [],
			s = [];
		return it[g](e, function(e, r, o) {
			(n(e, r, o) ? i : s)[t](e)
		}), [i, s]
	}, it.first = it.head = it.take = function(e, t, n) {
		return e == a ? void 0 : t == a || n ? e[0] : t < 0 ? [] : G[f](e, 0, t)
	}, it.initial = function(e, t, n) {
		return G[f](e, 0, Math.max(0, e[y] - (t == a || n ? 1 : t)))
	}, it.last = function(e, t, n) {
		return e == a ? void 0 : t == a || n ? e[e[y] - 1] : G[f](e, Math.max(e[y] - t, 0))
	}, it.rest = it.tail = it.drop = function(e, t, n) {
		return G[f](e, t == a || n ? 1 : t)
	}, it.compact = function(e) {
		return it[w](e, it[h])
	};
	var at = function(e, n, r, s) {
		if (n && it.every(e, it[i])) return Y[l](s, e);
		for (var o = 0, u = e[y]; o < u; o++) {
			var a = e[o];
			!it[i](a) && !it[L](a) ? r || s[t](a) : n ? Q[l](s, a) : at(a, n, r, s)
		}
		return s
	};
	it.flatten = function(e, t) {
		return at(e, t, S, [])
	}, it.without = function(e) {
		return it[A](e, G[f](arguments, 1))
	}, it.uniq = it.unique = function(e, n, r, i) {
		if (e == a) return [];
		it.isBoolean(n) || (i = r, r = n, n = S), r != a && (r = it[c](r, i));
		var s = [],
			o = [];
		for (var u = 0, f = e[y]; u < f; u++) {
			var l = e[u];
			if (n)(!u || o !== l) && s[t](l), o = l;
			else if (r) {
				var h = r(l, u, e);
				it[N](o, h) < 0 && (o[t](h), s[t](l))
			} else it[N](s, l) < 0 && s[t](l)
		}
		return s
	}, it.union = function() {
		return it.uniq(at(arguments, b, b, []))
	}, it.intersection = function(e) {
		if (e == a) return [];
		var n = [],
			r = arguments[y];
		for (var i = 0, s = e[y]; i < s; i++) {
			var o = e[i];
			if (it[x](n, o)) continue;
			for (var u = 1; u < r; u++)
				if (!it[x](arguments[u], o)) break;
			u === r && n[t](o)
		}
		return n
	}, it[A] = function(e) {
		var t = at(G[f](arguments, 1), b, b, []);
		return it[w](e, function(e) {
			return !it[x](t, e)
		})
	}, it.zip = function(e) {
		if (e == a) return [];
		var t = it.max(arguments, y)[y],
			n = Array(t);
		for (var r = 0; r < t; r++) n[r] = it.pluck(arguments, r);
		return n
	}, it[O] = function(e, t) {
		if (e == a) return {};
		var n = {};
		for (var r = 0, i = e[y]; r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
		return n
	}, it[N] = function(e, t, n) {
		if (e == a) return -1;
		var r = 0,
			i = e[y];
		if (n) {
			if (typeof n != M) return r = it[k](e, t), e[r] === t ? r : -1;
			r = n < 0 ? Math.max(0, i + n) : n
		}
		for (; r < i; r++)
			if (e[r] === t) return r;
		return -1
	}, it.lastIndexOf = function(e, t, n) {
		if (e == a) return -1;
		var r = e[y];
		typeof n == M && (r = n < 0 ? r + n + 1 : Math.min(r, n + 1));
		while (--r >= 0)
			if (e[r] === t) return r;
		return -1
	}, it.range = function(e, t, n) {
		arguments[y] <= 1 && (t = e || 0, e = 0), n = n || 1;
		var r = Math.max(Math.ceil((t - e) / n), 0),
			i = Array(r);
		for (var s = 0; s < r; s++, e += n) i[s] = e;
		return i
	};
	var ft = function() {};
	it.bind = function(t, n) {
		var i, s;
		if (rt && t.bind === rt) return rt[l](t, G[f](arguments, 1));
		if (!it[p](t)) throw new TypeError("Bind must be called on a function");
		return i = G[f](arguments, 2), s = function() {
			if (this instanceof s) {
				ft[e] = t[e];
				var o = new ft;
				ft[e] = a;
				var u = t[l](o, i[r](G[f](arguments)));
				return it[d](u) ? u : o
			}
			return t[l](n, i[r](G[f](arguments)))
		}, s
	}, it[_] = function(e) {
		var r = G[f](arguments, 1);
		return function() {
			var i = 0,
				s = r[n]();
			for (var o = 0, u = s[y]; o < u; o++) s[o] === it && (s[o] = arguments[i++]);
			while (i < arguments[y]) s[t](arguments[i++]);
			return e[l](this, s)
		}
	}, it.bindAll = function(e) {
		var t, n = arguments[y],
			r;
		if (n <= 1) throw new Error("bindAll must be passed function names");
		for (t = 1; t < n; t++) r = arguments[t], e[r] = it.bind(e[r], e);
		return e
	}, it.memoize = function(e, t) {
		var n = function(r) {
			var i = n.cache,
				s = t ? t[l](this, arguments) : r;
			return it.has(i, s) || (i[s] = e[l](this, arguments)), i[s]
		};
		return n.cache = {}, n
	}, it.delay = function(e, t) {
		var n = G[f](arguments, 2);
		return setTimeout(function() {
			return e[l](a, n)
		}, t)
	}, it.defer = function(e) {
		return it.delay[l](it, [e, 1][r](G[f](arguments, 1)))
	}, it.throttle = function(e, t, n) {
		var r, i, s, o = a,
			u = 0;
		n || (n = {});
		var f = function() {
			u = n.leading === S ? 0 : it.now(), o = a, s = e[l](r, i), o || (r = i = a)
		};
		return function() {
			var c = it.now();
			!u && n.leading === S && (u = c);
			var h = t - (c - u);
			return r = this, i = arguments, h <= 0 || h > t ? (clearTimeout(o), o = a, u = c, s = e[l](r, i), o || (r = i = a)) : !o && n.trailing !== S && (o = setTimeout(f, h)), s
		}
	}, it.debounce = function(e, t, n) {
		var r, i, s, o, u, f = function() {
			var c = it.now() - o;
			c < t && c > 0 ? r = setTimeout(f, t - c) : (r = a, n || (u = e[l](s, i), r || (s = i = a)))
		};
		return function() {
			s = this, i = arguments, o = it.now();
			var c = n && !r;
			return r || (r = setTimeout(f, t)), c && (u = e[l](s, i), s = i = a), u
		}
	}, it.wrap = function(e, t) {
		return it[_](t, e)
	}, it[E] = function(e) {
		return function() {
			return !e[l](this, arguments)
		}
	}, it.compose = function() {
		var e = arguments,
			t = e[y] - 1;
		return function() {
			var n = t,
				r = e[t][l](this, arguments);
			while (n--) r = e[n][f](this, r);
			return r
		}
	}, it.after = function(e, t) {
		return function() {
			if (--e < 1) return t[l](this, arguments)
		}
	}, it.before = function(e, t) {
		var n;
		return function() {
			return --e > 0 ? n = t[l](this, arguments) : t = a, n
		}
	}, it.once = it[_](it.before, 2), it[s] = function(e) {
		if (!it[d](e)) return [];
		if (nt) return nt(e);
		var n = [];
		for (var r in e) it.has(e, r) && n[t](r);
		return n
	}, it[T] = function(e) {
		var t = it[s](e),
			n = t[y],
			r = Array(n);
		for (var i = 0; i < n; i++) r[i] = e[t[i]];
		return r
	}, it.pairs = function(e) {
		var t = it[s](e),
			n = t[y],
			r = Array(n);
		for (var i = 0; i < n; i++) r[i] = [t[i], e[t[i]]];
		return r
	}, it.invert = function(e) {
		var t = {},
			n = it[s](e);
		for (var r = 0, i = n[y]; r < i; r++) t[e[n[r]]] = n[r];
		return t
	}, it.functions = it.methods = function(e) {
		var n = [];
		for (var r in e) it[p](e[r]) && n[t](r);
		return n.sort()
	}, it.extend = function(e) {
		if (!it[d](e)) return e;
		var t, n;
		for (var r = 1, i = arguments[y]; r < i; r++) {
			t = arguments[r];
			for (n in t) et[f](t, n) && (e[n] = t[n])
		}
		return e
	}, it.pick = function(e, t, n) {
		var r = {},
			i;
		if (e == a) return r;
		if (it[p](t)) {
			t = st(t, n);
			for (i in e) {
				var s = e[i];
				t(s, i, e) && (r[i] = s)
			}
		} else {
			var o = Y[l]([], G[f](arguments, 1));
			e = new Object(e);
			for (var u = 0, c = o[y]; u < c; u++) i = o[u], i in e && (r[i] = e[i])
		}
		return r
	}, it.omit = function(e, t, n) {
		if (it[p](t)) t = it[E](t);
		else {
			var r = it.map(Y[l]([], G[f](arguments, 1)), String);
			t = function(e, t) {
				return !it[x](r, t)
			}
		}
		return it.pick(e, t, n)
	}, it.defaults = function(e) {
		if (!it[d](e)) return e;
		for (var t = 1, n = arguments[y]; t < n; t++) {
			var r = arguments[t];
			for (var i in r) e[i] === void 0 && (e[i] = r[i])
		}
		return e
	}, it.clone = function(e) {
		return it[d](e) ? it[i](e) ? e[n]() : it.extend({}, e) : e
	}, it.tap = function(e, t) {
		return t(e), e
	};
	var lt = function(e, n, r, i) {
		if (e === n) return e !== 0 || 1 / e === 1 / n;
		if (e == a || n == a) return e === n;
		e instanceof it && (e = e[o]), n instanceof it && (n = n[o]);
		var u = Z[f](e);
		if (u !== Z[f](n)) return S;
		switch (u) {
			case "[object RegExp]":
			case "[object String]":
				return "" + e == "" + n;
			case "[object Number]":
				if (+e !== +e) return +n !== +n;
				return +e === 0 ? 1 / +e === 1 / n : +e === +n;
			case "[object Date]":
			case D:
				return +e === +n
		}
		if (typeof e != O || typeof n != O) return S;
		var l = r[y];
		while (l--)
			if (r[l] === e) return i[l] === n;
		var c = e[P],
			h = n[P];
		if (c !== h && P in e && P in n && !(it[p](c) && c instanceof c && it[p](h) && h instanceof h)) return S;
		r[t](e), i[t](n);
		var d, v;
		if (u === H) {
			d = e[y], v = d === n[y];
			if (v)
				while (d--)
					if (!(v = lt(e[d], n[d], r, i))) break
		} else {
			var m = it[s](e),
				g;
			d = m[y], v = it[s](n)[y] === d;
			if (v)
				while (d--) {
					g = m[d];
					if (!(v = it.has(n, g) && lt(e[g], n[g], r, i))) break
				}
		}
		return r.pop(), i.pop(), v
	};
	it.isEqual = function(e, t) {
		return lt(e, t, [], [])
	}, it.isEmpty = function(e) {
		if (e == a) return b;
		if (it[i](e) || it.isString(e) || it[L](e)) return e[y] === 0;
		for (var t in e)
			if (it.has(e, t)) return S;
		return b
	}, it.isElement = function(e) {
		return !!e && e.nodeType === 1
	}, it[i] = tt || function(e) {
		return Z[f](e) === H
	}, it[d] = function(e) {
		var t = typeof e;
		return t === B || t === O && !!e
	}, it[g](["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
		it["is" + e] = function(t) {
			return Z[f](t) === "[object " + e + "]"
		}
	}), it[L](arguments) || (it[L] = function(e) {
		return it.has(e, "callee")
	}), typeof /./ !== B && (it[p] = function(e) {
		return typeof e == B || S
	}), it.isFinite = function(e) {
		return isFinite(e) && !isNaN(parseFloat(e))
	}, it.isNaN = function(e) {
		return it.isNumber(e) && e !== +e
	}, it.isBoolean = function(e) {
		return e === b || e === S || Z[f](e) === D
	}, it.isNull = function(e) {
		return e === a
	}, it.isUndefined = function(e) {
		return e === void 0
	}, it.has = function(e, t) {
		return e != a && et[f](e, t)
	}, it.noConflict = function() {
		return X._ = V, this
	}, it[h] = function(e) {
		return e
	}, it.constant = function(e) {
		return function() {
			return e
		}
	}, it.noop = function() {}, it[m] = function(e) {
		return function(t) {
			return t[e]
		}
	}, it[v] = function(e) {
		var t = it.pairs(e),
			n = t[y];
		return function(e) {
			if (e == a) return !n;
			e = new Object(e);
			for (var r = 0; r < n; r++) {
				var i = t[r],
					s = i[0];
				if (i[1] !== e[s] || !(s in e)) return S
			}
			return b
		}
	}, it.times = function(e, t, n) {
		var r = Array(Math.max(0, e));
		t = st(t, n, 1);
		for (var i = 0; i < e; i++) r[i] = t(i);
		return r
	}, it[C] = function(e, t) {
		return t == a && (t = e, e = 0), e + Math.floor(Math[C]() * (t - e + 1))
	}, it.now = Date.now || function() {
		return (new Date).getTime()
	};
	var ct = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;",
			"`": "&#x60;"
		},
		ht = it.invert(ct),
		pt = function(e) {
			var t = function(t) {
					return e[t]
				},
				n = "(?:" + it[s](e).join("|") + ")",
				r = RegExp(n),
				i = RegExp(n, "g");
			return function(e) {
				return e = e == a ? "" : "" + e, r.test(e) ? e[j](i, t) : e
			}
		};
	it.escape = pt(ct), it.unescape = pt(ht), it.result = function(e, t) {
		if (e == a) return void 0;
		var n = e[t];
		return it[p](n) ? e[t]() : n
	};
	var dt = 0;
	it.uniqueId = function(e) {
		var t = ++dt + "";
		return e ? e + t : t
	}, it[F] = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	var vt = /(.)^/,
		mt = {
			"'": "'",
			"\\": "\\",
			"\r": "r",
			"\n": "n",
			"\u2028": "u2028",
			"\u2029": "u2029"
		},
		gt = /\\|'|\r|\n|\u2028|\u2029/g,
		yt = function(e) {
			return "\\" + mt[e]
		};
	it.template = function(e, t, r) {
		!t && r && (t = r), t = it.defaults({}, t, it[F]);
		var i = RegExp([(t.escape || vt)[I], (t.interpolate || vt)[I], (t.evaluate || vt)[I]].join("|") + "|$", "g"),
			s = 0,
			o = "__p+='";
		e[j](i, function(t, r, i, u, a) {
			return o += e[n](s, a)[j](gt, yt), s = a + t[y], r ? o += q + r + "))==null?'':_.escape(__t))+\n'" : i ? o += q + i + "))==null?'':__t)+\n'" : u && (o += R + u + "\n__p+='"), t
		}), o += R, t[U] || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
		try {
			var u = new Function(t[U] || "obj", "_", o)
		} catch (a) {
			throw a[I] = o, a
		}
		var l = function(e) {
				return u[f](this, e, it)
			},
			c = t[U] || "obj";
		return l[I] = "function(" + c + "){\n" + o + "}", l
	}, it.chain = function(e) {
		var t = it(e);
		return t._chain = b, t
	};
	var bt = function(e) {
		return this._chain ? it(e).chain() : e
	};
	it.mixin = function(t) {
		it[g](it.functions(t), function(n) {
			var r = it[n] = t[n];
			it[e][n] = function() {
				var e = [this[o]];
				return Q[l](e, arguments), bt[f](this, r[l](it, e))
			}
		})
	}, it.mixin(it), it[g](["pop", t, "reverse", z, "sort", W, "unshift"], function(t) {
		var n = $[t];
		it[e][t] = function() {
			var e = this[o];
			return n[l](e, arguments), (t === z || t === W) && e[y] === 0 && delete e[0], bt[f](this, e)
		}
	}), it[g]([r, "join", n], function(t) {
		var n = $[t];
		it[e][t] = function() {
			return bt[f](this, n[l](this[o], arguments))
		}
	}), it[e].value = function() {
		return this[o]
	}, typeof define === B && define.amd && define("underscore", [], function() {
		return it
	})
}).call(this);