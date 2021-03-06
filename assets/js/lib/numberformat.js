(function() {
	function Y($, J) {
		this.VERSION = "Number Format v1.5.4", this[e] = ",", this[t] = ".", this.DASH = n, this[r] = "(", this[i] = ")", this[s] = 0, this[o] = 1, this[u] = 2, this[a] = 3, this[f] = 0, this[l] = 1, this[c] = 2, this[h] = -1, this.num, this[p], this[d] = v, this[m], this[g], this[y], this[b], this[w], this[E], this[S], this[x], this[T], this[N], this[C], this[k] = et, this.toUnformatted = tt, this[L] = Z, this[A] = st, this.setCommas = ot, this[O] = rt, this[M] = it, this[_] = ut, this[D] = ft, this[P] = at, this[H] = lt, this.setPlaces = ct, this.toFormatted = pt, this.toPercentage = dt, this.getOriginal = nt, this[B] = gt, this[j] = yt, this[F] = Et, this[I] = St, this[q] = xt, this[R] = mt, this.getZeros = vt, this[U] = bt, this[z] = wt, this[W] = ht, J == X ? this[k]($, this[t]) : this[k]($, J), this.setCommas(V), this[O](this[f]), this[M](v), this[_](v), this[D]("$"), this.setPlaces(2)
	}

	function Z(e) {
		this[g] = e
	}

	function et(e, t) {
		t != X && this[L](t), this[p] = e, this.num = this[q](e)
	}

	function tt() {
		return this.num
	}

	function nt() {
		return this[p]
	}

	function rt(e) {
		this[b] = e
	}

	function it(e) {
		this[w] = e
	}

	function st(n, r, i) {
		this[d] = n, r == X && (r = this[e]), i == X && (i = this[t]), r == i ? this[y] = i == this[t] ? this[e] : this[t] : this[y] = i, this[m] = r
	}

	function ot(n) {
		this[A](n, this[e], this[t])
	}

	function ut(e) {
		this[E] = e
	}

	function at(e) {
		this[x] = e
	}

	function ft(e) {
		this[P](e), this[H](this[s])
	}

	function lt(e) {
		this[S] = e
	}

	function ct(e, t) {
		this[N] = e != this[h], this[C] = t != X && t, this[T] = e < 0 ? 0 : e
	}

	function ht(e, t, n, r) {
		e += "";
		var i = e[$](t),
			s = "";
		i != -1 && (s = n + e[J](i + 1, e[K]), e = e[J](0, i));
		var o = /(\d+)(\d{3})/;
		while (o.test(e)) e = e[Q](o, "$1" + r + "$2");
		return e + s
	}

	function pt() {
		var e, n = this.num,
			h, p = new Array(2);
		this[N] ? (n = this[F](n), h = this[I](Math.abs(n))) : h = this[R](Math.abs(n)), this[d] ? h = this[W](h, this[t], this[y], this[m]) : h = h[Q](new RegExp("\\" + this[t]), this[y]);
		var v = "",
			g = "",
			T = "",
			C = "",
			k = "",
			L = "",
			A = "",
			O = "",
			M = this[b] == this[c] ? this[r] : this.DASH,
			_ = this[b] == this[c] ? this[i] : this.DASH;
		if (this[S] == this[s]) {
			if (n < 0) {
				if (this[b] == this[f] || this[b] == this[c]) C = M;
				if (this[b] == this[l] || this[b] == this[c]) k = _
			}
			this[E] && (v = this[x])
		} else if (this[S] == this[o]) {
			if (n < 0) {
				if (this[b] == this[f] || this[b] == this[c]) g = M;
				if (this[b] == this[l] || this[b] == this[c]) A = _
			}
			this[E] && (T = this[x])
		} else if (this[S] == this[u]) {
			if (n < 0) {
				if (this[b] == this[f] || this[b] == this[c]) g = M;
				if (this[b] == this[l] || this[b] == this[c]) A = _
			}
			this[E] && (L = this[x])
		} else if (this[S] == this[a]) {
			if (n < 0) {
				if (this[b] == this[f] || this[b] == this[c]) C = M;
				if (this[b] == this[l] || this[b] == this[c]) k = _
			}
			this[E] && (O = this[x])
		}
		return h = v + g + T + C + h + k + L + A + O, this[w] && n < 0 && (h = '<font color="red">' + h + "</font>"), h
	}

	function dt() {
		return nNum = this.num * 100, nNum = this[F](nNum), nNum + "%"
	}

	function vt(e) {
		var t = "",
			n;
		for (n = 0; n < e; n++) t += "0";
		return t
	}

	function mt(e) {
		if (isNaN(e)) return e;
		var t = parseFloat(e) + "",
			r = t[G]()[$]("e");
		if (r != -1) {
			var i = t[G]()[$]("+"),
				s = t[G]()[$](n, r),
				o = t[J](0, r);
			if (s != -1) {
				var u = t[J](s + 1, t[K]);
				o = this[U](o, V, parseInt(u))
			} else {
				i == -1 && (i = r);
				var u = t[J](i + 1, t[K]);
				o = this[U](o, v, parseInt(u))
			}
			t = o
		}
		return t
	}

	function gt(e, t) {
		var n = "";
		return t == X ? n = this[z](e, v) : n = this[z](e, v, t), n
	}

	function yt(e, t) {
		var n = "";
		return t == X ? n = this[z](e, V) : n = this[z](e, V, t), n
	}

	function bt(e, t, n) {
		var r = arguments[K] < 3 ? this[T] : n;
		if (r <= 0) return e;
		var i = e + "",
			s = this.getZeros(r),
			o = new RegExp("([0-9.]+)");
		if (t) {
			i = i[Q](o, s + "$1");
			var u = new RegExp("(-?)([0-9]*)([0-9]{" + r + "})(\\.?)");
			i = i[Q](u, "$1$2.$3")
		} else {
			var a = o.exec(i);
			a != X && (i = i[J](0, a.index) + a[1] + s + i[J](a.index + a[0][K]));
			var u = new RegExp("(-?)([0-9]*)(\\.?)([0-9]{" + r + "})");
			i = i[Q](u, "$1$2$4.")
		}
		return i = i[Q](/\.$/, ""), i
	}

	function wt(e, t, n) {
		var r = "";
		return n == X ? r = this[U](e, t) : r = this[U](e, t, n), parseFloat(r)
	}

	function Et(e) {
		return e = this[B](e), this[C] ? e = e >= 0 ? Math.floor(e) : Math.ceil(e) : e = Math.round(e), e = this[j](e), e
	}

	function St(e) {
		var t;
		e = this[R](e);
		if (this[T] <= 0) return e;
		var n = e[$](".");
		if (n == -1) {
			e += ".";
			for (t = 0; t < this[T]; t++) e += "0"
		} else {
			var r = e[K] - 1 - n,
				i = this[T] - r;
			for (t = 0; t < i; t++) e += "0"
		}
		return e
	}

	function xt(e) {
		newVal = e + "";
		var s = v;
		newVal[$]("%") != -1 && (newVal = newVal[Q](/\%/g, ""), s = V);
		var o = new RegExp("[^\\" + this[g] + "\\d\\-\\+\\(\\)eE]", "g");
		newVal = newVal[Q](o, "");
		var u = new RegExp("[" + this[g] + "]", "g"),
			a = u.exec(newVal);
		if (a != X) {
			var f = newVal[J](a.index + a[0][K]);
			newVal = newVal[J](0, a.index) + this[t] + f[Q](u, "")
		}
		return newVal.charAt(newVal[K] - 1) == this.DASH ? (newVal = newVal[J](0, newVal[K] - 1), newVal = n + newVal) : newVal.charAt(0) == this[r] && newVal.charAt(newVal[K] - 1) == this[i] && (newVal = newVal[J](1, newVal[K] - 1), newVal = n + newVal), newVal = parseFloat(newVal), isFinite(newVal) || (newVal = 0), s && (newVal = this[j](newVal, 2)), newVal
	}
	var e = "COMMA",
		t = "PERIOD",
		n = "-",
		r = "LEFT_PAREN",
		i = "RIGHT_PAREN",
		s = "LEFT_OUTSIDE",
		o = "LEFT_INSIDE",
		u = "RIGHT_INSIDE",
		a = "RIGHT_OUTSIDE",
		f = "LEFT_DASH",
		l = "RIGHT_DASH",
		c = "PARENTHESIS",
		h = "NO_ROUNDING",
		p = "numOriginal",
		d = "hasSeparators",
		v = !1,
		m = "separatorValue",
		g = "inputDecimalValue",
		y = "decimalValue",
		b = "negativeFormat",
		w = "negativeRed",
		E = "hasCurrency",
		S = "currencyPosition",
		x = "currencyValue",
		T = "places",
		N = "roundToPlaces",
		C = "truncate",
		k = "setNumber",
		L = "setInputDecimal",
		A = "setSeparators",
		O = "setNegativeFormat",
		M = "setNegativeRed",
		_ = "setCurrency",
		D = "setCurrencyPrefix",
		P = "setCurrencyValue",
		H = "setCurrencyPosition",
		B = "moveDecimalRight",
		j = "moveDecimalLeft",
		F = "getRounded",
		I = "preserveZeros",
		q = "justNumber",
		R = "expandExponential",
		U = "moveDecimalAsString",
		z = "moveDecimal",
		W = "addSeparators",
		X = null,
		V = !0,
		$ = "indexOf",
		J = "substring",
		K = "length",
		Q = "replace",
		G = "toLowerCase";
	typeof define == "function" && define.amd ? define(function() {
		return Y
	}) : window.NumberFormat = Y
})();