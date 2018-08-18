(function(e, t) {
	typeof define == "function" && define.amd ? define(["jquery"], t) : typeof exports == "object" ? module.exports = t(require("jquery")) : t(e.jQuery)
})(this, function(e) {
	function K(e) {
		if (e in $[s]) return e;
		var t = ["Moz", "Webkit", "O", "ms"],
			n = e.charAt(0).toUpperCase() + e.substr(1);
		for (var r = 0; r < t.length; ++r) {
			var i = t[r] + n;
			if (i in $[s]) return i
		}
	}

	function Q() {
		return $[s][J[o]] = "", $[s][J[o]] = "rotateY(90deg)", $[s][J[o]] !== ""
	}

	function tt(e) {
		return typeof e === C && this.parse(e), this
	}

	function nt(e, t, n) {
		t === i ? e[j](n) : t ? e[j](t, n) : e[F](function() {
			n.call(this)
		})
	}

	function rt(n) {
		var r = [];
		return e[F](n, function(n) {
			n = e.camelCase(n), n = e[t][I][n] || e.cssProps[n] || n, n = ot(n), J[n] && (n = ot(J[n])), e.inArray(n, r) === -1 && r[H](n)
		}), r
	}

	function it(t, n, r, i) {
		var s = rt(t);
		e[g][r] && (r = e[g][r]);
		var o = "" + at(n) + B + r;
		parseInt(i, 10) > 0 && (o += B + at(i));
		var u = [];
		return e[F](s, function(e, t) {
			u[H](t + B + o)
		}), u.join(", ")
	}

	function st(n, r) {
		r || (e.cssNumber[n] = i), e[t][I][n] = J[o], e[y][n] = {
			get: function(t) {
				var r = e(t).css(b);
				return r.get(n)
			},
			set: function(t, r) {
				var i = e(t).css(b);
				i[P](n, r), e(t).css({
					"transit:transform": i
				})
			}
		}
	}

	function ot(e) {
		return e.replace(/([A-Z])/g, function(e) {
			return "-" + e[u]()
		})
	}

	function ut(e, t) {
		return typeof e === C && !e.match(/^[\-0-9\.]+$/) ? e : "" + e + t
	}

	function at(t) {
		var n = t;
		return typeof n === C && !n.match(/^[\-0-9\.]+/) && (n = e.fx[V][n] || e.fx[V][X]), ut(n, "ms")
	}
	var t = "transit",
		n = "margin",
		r = "padding",
		i = !0,
		s = "style",
		o = "transform",
		u = "toLowerCase",
		a = "transition",
		f = "transitionDelay",
		l = "transformOrigin",
		c = "filter",
		h = "transform3d",
		p = "transitionend",
		d = null,
		v = "hasOwnProperty",
		m = "undefined",
		g = "cssEase",
		y = "cssHooks",
		b = "transit:transform",
		w = "scale",
		E = "translate",
		S = "rotateX",
		x = "rotateY",
		T = "rotate3d",
		N = "perspective",
		C = "string",
		k = "prototype",
		L = ",",
		A = "apply",
		O = "deg",
		M = "px",
		_ = "_translateX",
		D = "_translateY",
		P = "setFromString",
		H = "push",
		B = " ",
		j = "queue",
		F = "each",
		I = "propertyMap",
		q = "function",
		R = "easing",
		U = "delay",
		z = "complete",
		W = "duration",
		X = "_default",
		V = "speeds";
	e[t] = {
		version: "0.9.12",
		propertyMap: {
			marginLeft: n,
			marginRight: n,
			marginBottom: n,
			marginTop: n,
			paddingLeft: r,
			paddingRight: r,
			paddingBottom: r,
			paddingTop: r
		},
		enabled: i,
		useTransitionEnd: !1
	};
	var $ = document.createElement("div"),
		J = {},
		G = navigator.userAgent[u]().indexOf("chrome") > -1;
	J[a] = K(a), J[f] = K(f), J[o] = K(o), J[l] = K(l), J[c] = K("Filter"), J[h] = Q();
	var Y = {
			transition: p,
			MozTransition: p,
			OTransition: "oTransitionEnd",
			WebkitTransition: "webkitTransitionEnd",
			msTransition: "MSTransitionEnd"
		},
		Z = J.transitionEnd = Y[J[a]] || d;
	for (var et in J) J[v](et) && typeof e.support[et] === m && (e.support[et] = J[et]);
	return $ = d, e[g] = {
		_default: "ease",
		"in": "ease-in",
		out: "ease-out",
		"in-out": "ease-in-out",
		snap: "cubic-bezier(0,1,.5,1)",
		easeInCubic: "cubic-bezier(.550,.055,.675,.190)",
		easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
		easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
		easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
		easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
		easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
		easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
		easeOutExpo: "cubic-bezier(.19,1,.22,1)",
		easeInOutExpo: "cubic-bezier(1,0,0,1)",
		easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
		easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
		easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
		easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
		easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
		easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
		easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
		easeOutQuint: "cubic-bezier(.23,1,.32,1)",
		easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
		easeInSine: "cubic-bezier(.47,0,.745,.715)",
		easeOutSine: "cubic-bezier(.39,.575,.565,1)",
		easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
		easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
		easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
		easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
	}, e[y][b] = {
		get: function(t) {
			return e(t).data(o) || new tt
		},
		set: function(t, n) {
			var r = n;
			r instanceof tt || (r = new tt(r)), J[o] === "WebkitTransform" && !G ? t[s][J[o]] = r.toString(i) : t[s][J[o]] = r.toString(), e(t).data(o, r)
		}
	}, e[y][o] = {
		set: e[y][b].set
	}, e[y][c] = {
		get: function(e) {
			return e[s][J[c]]
		},
		set: function(e, t) {
			e[s][J[c]] = t
		}
	}, e.fn.jquery < "1.8" && (e[y][l] = {
		get: function(e) {
			return e[s][J[l]]
		},
		set: function(e, t) {
			e[s][J[l]] = t
		}
	}, e[y][a] = {
		get: function(e) {
			return e[s][J[a]]
		},
		set: function(e, t) {
			e[s][J[a]] = t
		}
	}), st(w), st("scaleX"), st("scaleY"), st(E), st("rotate"), st(S), st(x), st(T), st(N), st("skewX"), st("skewY"), st("x", i), st("y", i), tt[k] = {
		setFromString: function(e, t) {
			var n = typeof t === C ? t.split(L) : t.constructor === Array ? t : [t];
			n.unshift(e), tt[k].set[A](this, n)
		},
		set: function(e) {
			var t = Array[k].slice[A](arguments, [1]);
			this.setter[e] ? this.setter[e][A](this, t) : this[e] = t.join(L)
		},
		get: function(e) {
			return this.getter[e] ? this.getter[e][A](this) : this[e] || 0
		},
		setter: {
			rotate: function(e) {
				this.rotate = ut(e, O)
			},
			rotateX: function(e) {
				this[S] = ut(e, O)
			},
			rotateY: function(e) {
				this[x] = ut(e, O)
			},
			scale: function(e, t) {
				t === undefined && (t = e), this[w] = e + L + t
			},
			skewX: function(e) {
				this.skewX = ut(e, O)
			},
			skewY: function(e) {
				this.skewY = ut(e, O)
			},
			perspective: function(e) {
				this[N] = ut(e, M)
			},
			x: function(e) {
				this.set(E, e, d)
			},
			y: function(e) {
				this.set(E, d, e)
			},
			translate: function(e, t) {
				this[_] === undefined && (this[_] = 0), this[D] === undefined && (this[D] = 0), e !== d && e !== undefined && (this[_] = ut(e, M)), t !== d && t !== undefined && (this[D] = ut(t, M)), this[E] = this[_] + L + this[D]
			}
		},
		getter: {
			x: function() {
				return this[_] || 0
			},
			y: function() {
				return this[D] || 0
			},
			scale: function() {
				var e = (this[w] || "1,1").split(L);
				return e[0] && (e[0] = parseFloat(e[0])), e[1] && (e[1] = parseFloat(e[1])), e[0] === e[1] ? e[0] : e
			},
			rotate3d: function() {
				var e = (this[T] || "0,0,0,0deg").split(L);
				for (var t = 0; t <= 3; ++t) e[t] && (e[t] = parseFloat(e[t]));
				return e[3] && (e[3] = ut(e[3], O)), e
			}
		},
		parse: function(e) {
			var t = this;
			e.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(e, n, r) {
				t[P](n, r)
			})
		},
		toString: function(e) {
			var t = [];
			for (var n in this)
				if (this[v](n)) {
					if (!J[h] && (n === S || n === x || n === N || n === l)) continue;
					n[0] !== "_" && (e && n === w ? t[H](n + "3d(" + this[n] + ",1)") : e && n === E ? t[H](n + "3d(" + this[n] + ",0)") : t[H](n + "(" + this[n] + ")"))
				}
			return t.join(B)
		}
	}, e.fn[a] = e.fn[t] = function(n, r, o, u) {
		var f = this,
			l = 0,
			c = i,
			h = e.extend(i, {}, n);
		typeof r === q && (u = r, r = undefined), typeof r == "object" && (o = r[R], l = r[U] || 0, c = typeof r[j] === m ? i : r[j], u = r[z], r = r[W]), typeof o === q && (u = o, o = undefined), typeof h[R] !== m && (o = h[R], delete h[R]), typeof h[W] !== m && (r = h[W], delete h[W]), typeof h[z] !== m && (u = h[z], delete h[z]), typeof h[j] !== m && (c = h[j], delete h[j]), typeof h[U] !== m && (l = h[U], delete h[U]), typeof r === m && (r = e.fx[V][X]), typeof o === m && (o = e[g][X]), r = at(r);
		var p = it(h, r, o, l),
			v = e[t].enabled && J[a],
			y = v ? parseInt(r, 10) + parseInt(l, 10) : 0;
		if (y === 0) {
			var b = function(e) {
				f.css(h), u && u[A](f), e && e()
			};
			return nt(f, c, b), f
		}
		var w = {},
			E = function(n) {
				var r = !1,
					o = function() {
						r && f.unbind(Z, o), y > 0 && f[F](function() {
							this[s][J[a]] = w[this] || d
						}), typeof u === q && u[A](f), typeof n === q && n()
					};
				y > 0 && Z && e[t].useTransitionEnd ? (r = i, f.bind(Z, o)) : window.setTimeout(o, y), f[F](function() {
					y > 0 && (this[s][J[a]] = p), e(this).css(h)
				})
			},
			S = function(e) {
				this.offsetWidth, E(e)
			};
		return nt(f, c, S), this
	}, e[t].getTransitionValue = it, e
});