(function(e, t) {
	function B(t, n) {
		var r, i, s, u = t.nodeName[m]();
		return "area" === u ? (r = t[g], i = r.name, !t.href || !i || r.nodeName[m]() !== "map" ? y : (s = e("img[usemap=#" + i + "]")[0], !!s && j(s))) : (/input|select|textarea|button|object/ [o](u) ? !t.disabled : "a" === u ? t.href || n : n) && j(t)
	}

	function j(t) {
		return e.expr.filters.visible(t) && !e(t)[l]()[b]()[f](function() {
			return e[u](this, "visibility") === w
		})[d]
	}
	var n = "extend",
		r = "number",
		i = "each",
		s = "call",
		o = "test",
		u = "css",
		a = "position",
		f = "filter",
		l = "parents",
		c = "overflow",
		h = "overflow-y",
		p = "overflow-x",
		d = "length",
		v = "zIndex",
		m = "toLowerCase",
		g = "parentNode",
		y = !1,
		b = "addBack",
		w = "hidden",
		E = "createPseudo",
		S = "tabindex",
		x = "outerWidth",
		T = "Width",
		N = "inner",
		C = "outer",
		k = "prevObject",
		L = "removeData",
		A = "a-b",
		O = "selectstart",
		M = ".ui-disableSelection",
		_ = "plugins",
		D = "element",
		P = 0,
		H = /^ui-id-\d+$/;
	e.ui = e.ui || {}, e[n](e.ui, {
		version: "1.10.3",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), e.fn[n]({
		focus: function(t) {
			return function(n, o) {
				return typeof n === r ? this[i](function() {
					var t = this;
					setTimeout(function() {
						e(t).focus(), o && o[s](t)
					}, n)
				}) : t.apply(this, arguments)
			}
		}(e.fn.focus),
		scrollParent: function() {
			var t;
			return e.ui.ie && /(static|relative)/ [o](this[u](a)) || /absolute/ [o](this[u](a)) ? t = this[l]()[f](function() {
				return /(relative|absolute|fixed)/ [o](e[u](this, a)) && /(auto|scroll)/ [o](e[u](this, c) + e[u](this, h) + e[u](this, p))
			}).eq(0) : t = this[l]()[f](function() {
				return /(auto|scroll)/ [o](e[u](this, c) + e[u](this, h) + e[u](this, p))
			}).eq(0), /fixed/ [o](this[u](a)) || !t[d] ? e(document) : t
		},
		zIndex: function(n) {
			if (n !== t) return this[u](v, n);
			if (this[d]) {
				var r = e(this[0]),
					i, s;
				while (r[d] && r[0] !== document) {
					i = r[u](a);
					if (i === "absolute" || i === "relative" || i === "fixed") {
						s = parseInt(r[u](v), 10);
						if (!isNaN(s) && s !== 0) return s
					}
					r = r.parent()
				}
			}
			return 0
		},
		uniqueId: function() {
			return this[i](function() {
				this.id || (this.id = "ui-id-" + ++P)
			})
		},
		removeUniqueId: function() {
			return this[i](function() {
				H[o](this.id) && e(this).removeAttr("id")
			})
		}
	}), e[n](e.expr[":"], {
		data: e.expr[E] ? e.expr[E](function(t) {
			return function(n) {
				return !!e.data(n, t)
			}
		}) : function(t, n, r) {
			return !!e.data(t, r[3])
		},
		focusable: function(t) {
			return B(t, !isNaN(e.attr(t, S)))
		},
		tabbable: function(t) {
			var n = e.attr(t, S),
				r = isNaN(n);
			return (r || n >= 0) && B(t, !r)
		}
	}), e("<a>")[x](1).jquery || e[i]([T, "Height"], function(n, o) {
		function c(t, n, r, s) {
			return e[i](a, function() {
				n -= parseFloat(e[u](t, "padding" + this)) || 0, r && (n -= parseFloat(e[u](t, "border" + this + T)) || 0), s && (n -= parseFloat(e[u](t, "margin" + this)) || 0)
			}), n
		}
		var a = o === T ? ["Left", "Right"] : ["Top", "Bottom"],
			f = o[m](),
			l = {
				innerWidth: e.fn.innerWidth,
				innerHeight: e.fn.innerHeight,
				outerWidth: e.fn[x],
				outerHeight: e.fn.outerHeight
			};
		e.fn[N + o] = function(n) {
			return n === t ? l[N + o][s](this) : this[i](function() {
				e(this)[u](f, c(this, n) + "px")
			})
		}, e.fn[C + o] = function(t, n) {
			return typeof t !== r ? l[C + o][s](this, t) : this[i](function() {
				e(this)[u](f, c(this, t, !0, n) + "px")
			})
		}
	}), e.fn[b] || (e.fn[b] = function(e) {
		return this.add(e == null ? this[k] : this[k][f](e))
	}), e("<a>").data(A, "a")[L](A).data(A) && (e.fn[L] = function(t) {
		return function(n) {
			return arguments[d] ? t[s](this, e.camelCase(n)) : t[s](this)
		}
	}(e.fn[L])), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent[m]()), e.support[O] = "onselectstart" in document.createElement("div"), e.fn[n]({
		disableSelection: function() {
			return this.bind((e.support[O] ? O : "mousedown") + M, function(e) {
				e.preventDefault()
			})
		},
		enableSelection: function() {
			return this.unbind(M)
		}
	}), e[n](e.ui, {
		plugin: {
			add: function(module, t, n) {
				var r, i = e.ui[module].prototype;
				for (r in n) i[_][r] = i[_][r] || [], i[_][r].push([t, n[r]])
			},
			call: function(e, t, n) {
				var r, i = e[_][t];
				if (!i || !e[D][0][g] || e[D][0][g].nodeType === 11) return;
				for (r = 0; r < i[d]; r++) e.options[i[r][0]] && i[r][1].apply(e[D], n)
			}
		},
		hasScroll: function(t, n) {
			if (e(t)[u](c) === w) return y;
			var r = n && n === "left" ? "scrollLeft" : "scrollTop",
				i = y;
			return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
		}
	})
})(jQuery),
function(e, t) {
	var n = "prototype",
		r = null,
		i = "widget",
		s = "split",
		o = ".",
		u = "Widget",
		a = "toLowerCase",
		f = "data",
		l = "_createWidget",
		c = "length",
		h = "extend",
		p = "options",
		d = "each",
		v = "isFunction",
		m = "apply",
		g = "_super",
		y = "_superApply",
		b = "widgetEventPrefix",
		w = "_childConstructors",
		E = "widgetName",
		S = "isPlainObject",
		x = "widgetFullName",
		T = "string",
		N = !1,
		C = "element",
		k = "eventNamespace",
		L = "bindings",
		A = "hoverable",
		O = "focusable",
		M = !0,
		_ = "document",
		D = "noop",
		P = "removeData",
		H = "unbind",
		B = "removeClass",
		j = "aria-disabled",
		F = "ui-state-disabled",
		I = "ui-state-hover",
		q = "ui-state-focus",
		R = "_setOption",
		U = "disabled",
		z = "guid",
		W = "currentTarget",
		X = "number",
		V = 0,
		$ = Array[n].slice,
		J = e.cleanData;
	e.cleanData = function(t) {
		for (var n = 0, i;
			(i = t[n]) != r; n++) try {
			e(i).triggerHandler("remove")
		} catch (s) {}
		J(t)
	}, e[i] = function(t, r, S) {
		var x, T, N, C, k = {},
			L = t[s](o)[0];
		t = t[s](o)[1], x = L + "-" + t, S || (S = r, r = e[u]), e.expr[":"][x[a]()] = function(t) {
			return !!e[f](t, x)
		}, e[L] = e[L] || {}, T = e[L][t], N = e[L][t] = function(e, t) {
			if (!this[l]) return new N(e, t);
			arguments[c] && this[l](e, t)
		}, e[h](N, T, {
			version: S.version,
			_proto: e[h]({}, S),
			_childConstructors: []
		}), C = new r, C[p] = e[i][h]({}, C[p]), e[d](S, function(t, i) {
			if (!e[v](i)) {
				k[t] = i;
				return
			}
			k[t] = function() {
				var e = function() {
						return r[n][t][m](this, arguments)
					},
					s = function(e) {
						return r[n][t][m](this, e)
					};
				return function() {
					var t = this[g],
						n = this[y],
						r;
					return this[g] = e, this[y] = s, r = i[m](this, arguments), this[g] = t, this[y] = n, r
				}
			}()
		}), N[n] = e[i][h](C, {
			widgetEventPrefix: T ? C[b] : t
		}, k, {
			constructor: N,
			namespace: L,
			widgetName: t,
			widgetFullName: x
		}), T ? (e[d](T[w], function(t, r) {
			var s = r[n];
			e[i](s.namespace + o + s[E], N, r._proto)
		}), delete T[w]) : r[w].push(N), e[i].bridge(t, N)
	}, e[i][h] = function(n) {
		var r = $.call(arguments, 1),
			s = 0,
			o = r[c],
			u, a;
		for (; s < o; s++)
			for (u in r[s]) a = r[s][u], r[s].hasOwnProperty(u) && a !== t && (e[S](a) ? n[u] = e[S](n[u]) ? e[i][h]({}, n[u], a) : e[i][h]({}, a) : n[u] = a);
		return n
	}, e[i].bridge = function(s, o) {
		var u = o[n][x] || s;
		e.fn[s] = function(n) {
			var a = typeof n === T,
				l = $.call(arguments, 1),
				p = this;
			return n = !a && l[c] ? e[i][h][m](r, [n].concat(l)) : n, a ? this[d](function() {
				var r, i = e[f](this, u);
				if (!i) return e.error("cannot call methods on " + s + " prior to initialization; " + "attempted to call method '" + n + "'");
				if (!e[v](i[n]) || n.charAt(0) === "_") return e.error("no such method '" + n + "' for " + s + " widget instance");
				r = i[n][m](i, l);
				if (r !== i && r !== t) return p = r && r.jquery ? p.pushStack(r.get()) : r, N
			}) : this[d](function() {
				var t = e[f](this, u);
				t ? t.option(n || {})._init() : e[f](this, u, new o(n, this))
			}), p
		}
	}, e[u] = function() {}, e[u][w] = [], e[u][n] = {
		widgetName: i,
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: N,
			create: r
		},
		_createWidget: function(t, n) {
			n = e(n || this.defaultElement || this)[0], this[C] = e(n), this.uuid = V++, this[k] = o + this[E] + this.uuid, this[p] = e[i][h]({}, this[p], this._getCreateOptions(), t), this[L] = e(), this[A] = e(), this[O] = e(), n !== this && (e[f](n, this[x], this), this._on(M, this[C], {
				remove: function(e) {
					e.target === n && this.destroy()
				}
			}), this[_] = e(n.style ? n.ownerDocument : n[_] || n), this.window = e(this[_][0].defaultView || this[_][0].parentWindow)), this._create(), this._trigger("create", r, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: e[D],
		_getCreateEventData: e[D],
		_create: e[D],
		_init: e[D],
		destroy: function() {
			this._destroy(), this[C][H](this[k])[P](this[E])[P](this[x])[P](e.camelCase(this[x])), this[i]()[H](this[k]).removeAttr(j)[B](this[x] + "-disabled " + F), this[L][H](this[k]), this[A][B](I), this[O][B](q)
		},
		_destroy: e[D],
		widget: function() {
			return this[C]
		},
		option: function(n, u) {
			var a = n,
				f, l, d;
			if (arguments[c] === 0) return e[i][h]({}, this[p]);
			if (typeof n === T) {
				a = {}, f = n[s](o), n = f.shift();
				if (f[c]) {
					l = a[n] = e[i][h]({}, this[p][n]);
					for (d = 0; d < f[c] - 1; d++) l[f[d]] = l[f[d]] || {}, l = l[f[d]];
					n = f.pop();
					if (u === t) return l[n] === t ? r : l[n];
					l[n] = u
				} else {
					if (u === t) return this[p][n] === t ? r : this[p][n];
					a[n] = u
				}
			}
			return this._setOptions(a), this
		},
		_setOptions: function(e) {
			var t;
			for (t in e) this[R](t, e[t]);
			return this
		},
		_setOption: function(e, t) {
			return this[p][e] = t, e === U && (this[i]().toggleClass(this[x] + "-disabled ui-state-disabled", !!t).attr(j, t), this[A][B](I), this[O][B](q)), this
		},
		enable: function() {
			return this[R](U, N)
		},
		disable: function() {
			return this[R](U, M)
		},
		_on: function(t, n, r) {
			var s, o = this;
			typeof t != "boolean" && (r = n, n = t, t = N), r ? (n = s = e(n), this[L] = this[L].add(n)) : (r = n, n = this[C], s = this[i]()), e[d](r, function(r, i) {
				function u() {
					if (!t && (o[p][U] === M || e(this).hasClass(F))) return;
					return (typeof i === T ? o[i] : i)[m](o, arguments)
				}
				typeof i !== T && (u[z] = i[z] = i[z] || u[z] || e[z]++);
				var a = r.match(/^(\w+)\s*(.*)$/),
					f = a[1] + o[k],
					l = a[2];
				l ? s.delegate(l, f, u) : n.bind(f, u)
			})
		},
		_off: function(e, t) {
			t = (t || "")[s](" ").join(this[k] + " ") + this[k], e[H](t).undelegate(t)
		},
		_delay: function(e, t) {
			function n() {
				return (typeof e === T ? r[e] : e)[m](r, arguments)
			}
			var r = this;
			return setTimeout(n, t || 0)
		},
		_hoverable: function(t) {
			this[A] = this[A].add(t), this._on(t, {
				mouseenter: function(t) {
					e(t[W]).addClass(I)
				},
				mouseleave: function(t) {
					e(t[W])[B](I)
				}
			})
		},
		_focusable: function(t) {
			this[O] = this[O].add(t), this._on(t, {
				focusin: function(t) {
					e(t[W]).addClass(q)
				},
				focusout: function(t) {
					e(t[W])[B](q)
				}
			})
		},
		_trigger: function(t, n, r) {
			var i, s, o = this[p][t];
			r = r || {}, n = e.Event(n), n.type = (t === this[b] ? t : this[b] + t)[a](), n.target = this[C][0], s = n.originalEvent;
			if (s)
				for (i in s) i in n || (n[i] = s[i]);
			return this[C].trigger(n, r), !(e[v](o) && o[m](this[C][0], [n].concat(r)) === N || n.isDefaultPrevented())
		}
	}, e[d]({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(t, r) {
		e[u][n]["_" + t] = function(n, i, s) {
			typeof i === T && (i = {
				effect: i
			});
			var o, u = i ? i === M || typeof i === X ? r : i.effect || r : t;
			i = i || {}, typeof i === X && (i = {
				duration: i
			}), o = !e.isEmptyObject(i), i.complete = s, i.delay && n.delay(i.delay), o && e.effects && e.effects.effect[u] ? n[t](i) : u !== t && n[u] ? n[u](i.duration, i.easing, s) : n.queue(function(r) {
				e(this)[t](), s && s.call(n[0]), r()
			})
		}
	})
}(jQuery),
function(e, t) {
	var n = !1,
		r = "widgetName",
		i = !0,
		s = "target",
		o = ".preventClickEvent",
		u = "removeData",
		a = "unbind",
		f = "_mouseMoveDelegate",
		l = "mousemove.",
		c = "mouseup.",
		h = "_mouseUpDelegate",
		p = "_mouseStarted",
		d = "_mouseUp",
		v = "_mouseDownEvent",
		m = "options",
		g = "mouseDelayMet",
		y = "_mouseDistanceMet",
		b = "_mouseDelayMet",
		w = "_mouseStart",
		E = "preventDefault",
		S = "documentMode",
		x = "_mouseDrag",
		T = n;
	e(document).mouseup(function() {
		T = n
	}), e.widget("ui.mouse", {
		version: "1.10.3",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var t = this;
			this.element.bind("mousedown." + this[r], function(e) {
				return t._mouseDown(e)
			}).bind("click." + this[r], function(a) {
				if (i === e.data(a[s], t[r] + o)) return e[u](a[s], t[r] + o), a.stopImmediatePropagation(), n
			}), this.started = n
		},
		_mouseDestroy: function() {
			this.element[a]("." + this[r]), this[f] && e(document)[a](l + this[r], this[f])[a](c + this[r], this[h])
		},
		_mouseDown: function(t) {
			if (T) return;
			this[p] && this[d](t), this[v] = t;
			var a = this,
				S = t.which === 1,
				x = typeof this[m].cancel == "string" && t[s].nodeName ? e(t[s]).closest(this[m].cancel).length : n;
			if (!S || x || !this._mouseCapture(t)) return i;
			this[g] = !this[m].delay, this[g] || (this._mouseDelayTimer = setTimeout(function() {
				a[g] = i
			}, this[m].delay));
			if (this[y](t) && this[b](t)) {
				this[p] = this[w](t) !== n;
				if (!this[p]) return t[E](), i
			}
			return i === e.data(t[s], this[r] + o) && e[u](t[s], this[r] + o), this[f] = function(e) {
				return a._mouseMove(e)
			}, this[h] = function(e) {
				return a[d](e)
			}, e(document).bind(l + this[r], this[f]).bind(c + this[r], this[h]), t[E](), T = i, i
		},
		_mouseMove: function(t) {
			return e.ui.ie && (!document[S] || document[S] < 9) && !t.button ? this[d](t) : this[p] ? (this[x](t), t[E]()) : (this[y](t) && this[b](t) && (this[p] = this[w](this[v], t) !== n, this[p] ? this[x](t) : this[d](t)), !this[p])
		},
		_mouseUp: function(t) {
			return e(document)[a](l + this[r], this[f])[a](c + this[r], this[h]), this[p] && (this[p] = n, t[s] === this[v][s] && e.data(t[s], this[r] + o, i), this._mouseStop(t)), n
		},
		_mouseDistanceMet: function(e) {
			return Math.max(Math.abs(this[v].pageX - e.pageX), Math.abs(this[v].pageY - e.pageY)) >= this[m].distance
		},
		_mouseDelayMet: function() {
			return this[g]
		},
		_mouseStart: function() {},
		_mouseDrag: function() {},
		_mouseStop: function() {},
		_mouseCapture: function() {
			return i
		}
	})
}(jQuery),
function(e, t) {
	function G(e, t, n) {
		return [parseFloat(e[0]) * (K[r](e[0]) ? t / 100 : 1), parseFloat(e[1]) * (K[r](e[1]) ? n / 100 : 1)]
	}

	function Y(t, n) {
		return parseInt(e.css(t, n), 10) || 0
	}

	function Z(t) {
		var n = t[0];
		return n.nodeType === 9 ? {
			width: t[i](),
			height: t[s](),
			offset: {
				top: 0,
				left: 0
			}
		} : e[o](n) ? {
			width: t[i](),
			height: t[s](),
			offset: {
				top: t[u](),
				left: t[a]()
			}
		} : n[f] ? {
			width: 0,
			height: 0,
			offset: {
				top: n.pageY,
				left: n.pageX
			}
		} : {
			width: t[l](),
			height: t[c](),
			offset: t[h]()
		}
	}
	var n = "position",
		r = "test",
		i = "width",
		s = "height",
		o = "isWindow",
		u = "scrollTop",
		a = "scrollLeft",
		f = "preventDefault",
		l = "outerWidth",
		c = "outerHeight",
		h = "offset",
		p = "body",
		d = "offsetWidth",
		v = "scroll",
		m = "element",
		g = "auto",
		y = "scrollbarWidth",
		b = "apply",
		w = "extend",
		E = "within",
		S = "center",
		x = "right",
		T = "left",
		N = "bottom",
		C = "top",
		k = "marginLeft",
		L = "marginTop",
		A = "offsetFractions",
		O = "middle",
		M = "horizontal",
		_ = "vertical",
		D = "collisionPosition",
		P = "collisionWidth",
		H = "collisionHeight",
		B = "targetWidth",
		j = "elemHeight",
		F = "targetHeight",
		I = "createElement",
		q = "-1000px";
	e.ui = e.ui || {};
	var R, U = Math.max,
		z = Math.abs,
		W = Math.round,
		X = /left|center|right/,
		V = /top|center|bottom/,
		$ = /[\+\-]\d+(\.[\d]+)?%?/,
		J = /^\w+/,
		K = /%$/,
		Q = e.fn[n];
	e[n] = {
			scrollbarWidth: function() {
				if (R !== t) return R;
				var n, r, i = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
					s = i.children()[0];
				return e(p).append(i), n = s[d], i.css("overflow", v), r = s[d], n === r && (r = i[0].clientWidth), i.remove(), R = n - r
			},
			getScrollInfo: function(t) {
				var r = t[o] ? "" : t[m].css("overflow-x"),
					u = t[o] ? "" : t[m].css("overflow-y"),
					a = r === v || r === g && t[i] < t[m][0].scrollWidth,
					f = u === v || u === g && t[s] < t[m][0].scrollHeight;
				return {
					width: f ? e[n][y]() : 0,
					height: a ? e[n][y]() : 0
				}
			},
			getWithinInfo: function(t) {
				var n = e(t || window),
					r = e[o](n[0]);
				return {
					element: n,
					isWindow: r,
					offset: n[h]() || {
						left: 0,
						top: 0
					},
					scrollLeft: n[a](),
					scrollTop: n[u](),
					width: r ? n[i]() : n[l](),
					height: r ? n[s]() : n[c]()
				}
			}
		}, e.fn[n] = function(t) {
			if (!t || !t.of) return Q[b](this, arguments);
			t = e[w]({}, t);
			var o, u, a, p, d, v, m = e(t.of),
				g = e[n].getWithinInfo(t[E]),
				y = e[n].getScrollInfo(g),
				D = (t.collision || "flip").split(" "),
				P = {};
			return v = Z(m), m[0][f] && (t.at = "left top"), u = v[i], a = v[s], p = v[h], d = e[w]({}, p), e.each(["my", "at"], function() {
				var e = (t[this] || "").split(" "),
					n, i;
				e.length === 1 && (e = X[r](e[0]) ? e.concat([S]) : V[r](e[0]) ? [S].concat(e) : [S, S]), e[0] = X[r](e[0]) ? e[0] : S, e[1] = V[r](e[1]) ? e[1] : S, n = $.exec(e[0]), i = $.exec(e[1]), P[this] = [n ? n[0] : 0, i ? i[0] : 0], t[this] = [J.exec(e[0])[0], J.exec(e[1])[0]]
			}), D.length === 1 && (D[1] = D[0]), t.at[0] === x ? d[T] += u : t.at[0] === S && (d[T] += u / 2), t.at[1] === N ? d[C] += a : t.at[1] === S && (d[C] += a / 2), o = G(P.at, u, a), d[T] += o[0], d[C] += o[1], this.each(function() {
				var r, f, v = e(this),
					b = v[l](),
					E = v[c](),
					H = Y(this, k),
					B = Y(this, L),
					j = b + H + Y(this, "marginRight") + y[i],
					F = E + B + Y(this, "marginBottom") + y[s],
					I = e[w]({}, d),
					q = G(P.my, v[l](), v[c]());
				t.my[0] === x ? I[T] -= b : t.my[0] === S && (I[T] -= b / 2), t.my[1] === N ? I[C] -= E : t.my[1] === S && (I[C] -= E / 2), I[T] += q[0], I[C] += q[1], e.support[A] || (I[T] = W(I[T]), I[C] = W(I[C])), r = {
					marginLeft: H,
					marginTop: B
				}, e.each([T, C], function(i, s) {
					e.ui[n][D[i]] && e.ui[n][D[i]][s](I, {
						targetWidth: u,
						targetHeight: a,
						elemWidth: b,
						elemHeight: E,
						collisionPosition: r,
						collisionWidth: j,
						collisionHeight: F,
						offset: [o[0] + q[0], o[1] + q[1]],
						my: t.my,
						at: t.at,
						within: g,
						elem: v
					})
				}), t.using && (f = function(e) {
					var n = p[T] - I[T],
						r = n + u - b,
						i = p[C] - I[C],
						s = i + a - E,
						o = {
							target: {
								element: m,
								left: p[T],
								top: p[C],
								width: u,
								height: a
							},
							element: {
								element: v,
								left: I[T],
								top: I[C],
								width: b,
								height: E
							},
							horizontal: r < 0 ? T : n > 0 ? x : S,
							vertical: s < 0 ? C : i > 0 ? N : O
						};
					u < b && z(n + r) < u && (o[M] = S), a < E && z(i + s) < a && (o[_] = O), U(z(n), z(r)) > U(z(i), z(s)) ? o.important = M : o.important = _, t.using.call(this, e, o)
				}), v[h](e[w](I, {
					using: f
				}))
			})
		}, e.ui[n] = {
			fit: {
				left: function(e, t) {
					var n = t[E],
						r = n[o] ? n[a] : n[h][T],
						s = n[i],
						u = e[T] - t[D][k],
						f = r - u,
						l = u + t[P] - s - r,
						c;
					t[P] > s ? f > 0 && l <= 0 ? (c = e[T] + f + t[P] - s - r, e[T] += f - c) : l > 0 && f <= 0 ? e[T] = r : f > l ? e[T] = r + s - t[P] : e[T] = r : f > 0 ? e[T] += f : l > 0 ? e[T] -= l : e[T] = U(e[T] - u, e[T])
				},
				top: function(e, t) {
					var n = t[E],
						r = n[o] ? n[u] : n[h][C],
						i = t[E][s],
						a = e[C] - t[D][L],
						f = r - a,
						l = a + t[H] - i - r,
						c;
					t[H] > i ? f > 0 && l <= 0 ? (c = e[C] + f + t[H] - i - r, e[C] += f - c) : l > 0 && f <= 0 ? e[C] = r : f > l ? e[C] = r + i - t[H] : e[C] = r : f > 0 ? e[C] += f : l > 0 ? e[C] -= l : e[C] = U(e[C] - a, e[C])
				}
			},
			flip: {
				left: function(e, t) {
					var n = t[E],
						r = n[h][T] + n[a],
						s = n[i],
						u = n[o] ? n[a] : n[h][T],
						f = e[T] - t[D][k],
						l = f - u,
						c = f + t[P] - s - u,
						p = t.my[0] === T ? -t.elemWidth : t.my[0] === x ? t.elemWidth : 0,
						d = t.at[0] === T ? t[B] : t.at[0] === x ? -t[B] : 0,
						v = -2 * t[h][0],
						m, g;
					if (l < 0) {
						m = e[T] + p + d + v + t[P] - s - r;
						if (m < 0 || m < z(l)) e[T] += p + d + v
					} else if (c > 0) {
						g = e[T] - t[D][k] + p + d + v - u;
						if (g > 0 || z(g) < c) e[T] += p + d + v
					}
				},
				top: function(e, t) {
					var n = t[E],
						r = n[h][C] + n[u],
						i = n[s],
						a = n[o] ? n[u] : n[h][C],
						f = e[C] - t[D][L],
						l = f - a,
						c = f + t[H] - i - a,
						p = t.my[1] === C,
						d = p ? -t[j] : t.my[1] === N ? t[j] : 0,
						v = t.at[1] === C ? t[F] : t.at[1] === N ? -t[F] : 0,
						m = -2 * t[h][1],
						g, y;
					l < 0 ? (y = e[C] + d + v + m + t[H] - i - r, e[C] + d + v + m > l && (y < 0 || y < z(l)) && (e[C] += d + v + m)) : c > 0 && (g = e[C] - t[D][L] + d + v + m - a, e[C] + d + v + m > c && (g > 0 || z(g) < c) && (e[C] += d + v + m))
				}
			},
			flipfit: {
				left: function() {
					e.ui[n].flip[T][b](this, arguments), e.ui[n].fit[T][b](this, arguments)
				},
				top: function() {
					e.ui[n].flip[C][b](this, arguments), e.ui[n].fit[C][b](this, arguments)
				}
			}
		},
		function() {
			var t, n, r, i, s, o = document.getElementsByTagName(p)[0],
				u = document[I]("div");
			t = document[I](o ? "div" : p), r = {
				visibility: "hidden",
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				background: "none"
			}, o && e[w](r, {
				position: "absolute",
				left: q,
				top: q
			});
			for (s in r) t.style[s] = r[s];
			t.appendChild(u), n = o || document.documentElement, n.insertBefore(t, n.firstChild), u.style.cssText = "position: absolute; left: 10.7432222px;", i = e(u)[h]()[T], e.support[A] = i > 10 && i < 11, t.innerHTML = "", n.removeChild(t)
		}()
}(jQuery),
function(e, t) {
	var n = "scrollParent",
		r = "offset",
		i = "instance",
		s = "helperProportions",
		o = "options",
		u = "ui-draggable",
		a = "element",
		f = !1,
		l = "position",
		c = "containment",
		h = "helper",
		p = "_convertPositionTo",
		d = "offsetParent",
		v = "snapElements",
		m = "left",
		g = "relative",
		y = "scrollLeft",
		b = "margins",
		w = "scrollTop",
		E = "scrollSensitivity",
		S = "ddmanager",
		x = "cancelHelperRemoval",
		T = "cssPosition",
		N = "parent",
		C = "absolute",
		k = "top",
		L = "positionAbs",
		A = "zIndex",
		O = "draggable",
		M = "scrollSpeed",
		_ = "click",
		D = !0,
		P = "_trigger",
		H = "overflowOffset",
		B = "css",
		j = "scroll",
		F = "currentItem",
		I = "originalPosition",
		q = "opacity",
		R = "original",
		U = "offsetHeight",
		z = "originalPageY",
		W = "relative_container",
		X = "originalPageX",
		V = "cursor",
		$ = "height",
		J = "offsetWidth",
		K = "parentNode",
		Q = "ui-draggable-dragging",
		G = "body",
		Y = "pageY",
		Z = "pageX",
		et = "appendTo",
		tt = "contains",
		nt = "sortables",
		rt = "fixed",
		it = "offsetParentCssPosition",
		st = "_cacheHelperProportions",
		ot = "length",
		ut = "revert",
		at = "plugin",
		ft = "dropBehaviour",
		lt = "width",
		ct = "borderLeftWidth",
		ht = "scrollHeight",
		pt = "extend",
		dt = "drag",
		vt = "borderTopWidth",
		mt = "connectToSortable",
		gt = null,
		yt = "dropped",
		bt = "_uiHash",
		wt = "snapping",
		Et = "data",
		St = "isOver",
		xt = "auto",
		Tt = "disabled",
		Nt = "addClass",
		Ct = "_generatePosition",
		kt = "_getParentOffset",
		Lt = "tagName",
		At = "snap",
		Ot = "_intersectsWith",
		Mt = "axis",
		_t = "prepareOffsets",
		Dt = "containerCache",
		Pt = "_mouseUp",
		Ht = "grid",
		Bt = "ownerDocument",
		jt = "_opacity";
	e.widget("ui.draggable", e.ui.mouse, {
		version: "1.10.3",
		widgetEventPrefix: dt,
		options: {
			addClasses: D,
			appendTo: N,
			axis: f,
			connectToSortable: f,
			containment: f,
			cursor: xt,
			cursorAt: f,
			grid: f,
			handle: f,
			helper: R,
			iframeFix: f,
			opacity: f,
			refreshPositions: f,
			revert: f,
			revertDuration: 500,
			scope: "default",
			scroll: D,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: f,
			snapMode: "both",
			snapTolerance: 20,
			stack: f,
			zIndex: f,
			drag: gt,
			start: gt,
			stop: gt
		},
		_create: function() {
			this[o][h] === R && !/^(?:r|a|f)/.test(this[a][B](l)) && (this[a][0].style[l] = g), this[o].addClasses && this[a][Nt](u), this[o][Tt] && this[a][Nt]("ui-draggable-disabled"), this._mouseInit()
		},
		_destroy: function() {
			this[a].removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
		},
		_mouseCapture: function(t) {
			var n = this[o];
			return this[h] || n[Tt] || e(t.target).closest(".ui-resizable-handle")[ot] > 0 ? f : (this.handle = this._getHandle(t), this.handle ? (e(n.iframeFix === D ? "iframe" : n.iframeFix).each(function() {
				e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>")[B]({
					width: this[J] + "px",
					height: this[U] + "px",
					position: C,
					opacity: "0.001",
					zIndex: 1e3
				})[B](e(this)[r]())[et](G)
			}), D) : f)
		},
		_mouseStart: function(t) {
			var i = this[o];
			return this[h] = this._createHelper(t), this[h][Nt](Q), this[st](), e.ui[S] && (e.ui[S].current = this), this._cacheMargins(), this[T] = this[h][B](l), this[n] = this[h][n](), this[d] = this[h][d](), this[it] = this[d][B](l), this[r] = this[L] = this[a][r](), this[r] = {
				top: this[r][k] - this[b][k],
				left: this[r][m] - this[b][m]
			}, this[r][j] = f, e[pt](this[r], {
				click: {
					left: t[Z] - this[r][m],
					top: t[Y] - this[r][k]
				},
				parent: this[kt](),
				relative: this._getRelativeOffset()
			}), this[I] = this[l] = this[Ct](t), this[X] = t[Z], this[z] = t[Y], i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this[P]("start", t) === f ? (this._clear(), f) : (this[st](), e.ui[S] && !i[ft] && e.ui[S][_t](this, t), this._mouseDrag(t, D), e.ui[S] && e.ui[S].dragStart(this, t), D)
		},
		_mouseDrag: function(t, n) {
			this[it] === rt && (this[r][N] = this[kt]()), this[l] = this[Ct](t), this[L] = this[p](C);
			if (!n) {
				var i = this[bt]();
				if (this[P](dt, t, i) === f) return this[Pt]({}), f;
				this[l] = i[l]
			}
			if (!this[o][Mt] || this[o][Mt] !== "y") this[h][0].style[m] = this[l][m] + "px";
			if (!this[o][Mt] || this[o][Mt] !== "x") this[h][0].style[k] = this[l][k] + "px";
			return e.ui[S] && e.ui[S][dt](this, t), f
		},
		_mouseStop: function(t) {
			var n = this,
				r = f;
			return e.ui[S] && !this[o][ft] && (r = e.ui[S].drop(this, t)), this[yt] && (r = this[yt], this[yt] = f), this[o][h] === R && !e[tt](this[a][0][Bt], this[a][0]) ? f : (this[o][ut] === "invalid" && !r || this[o][ut] === "valid" && r || this[o][ut] === D || e.isFunction(this[o][ut]) && this[o][ut].call(this[a], r) ? e(this[h]).animate(this[I], parseInt(this[o].revertDuration, 10), function() {
				n[P]("stop", t) !== f && n._clear()
			}) : this[P]("stop", t) !== f && this._clear(), f)
		},
		_mouseUp: function(t) {
			return e("div.ui-draggable-iframeFix").each(function() {
				this[K].removeChild(this)
			}), e.ui[S] && e.ui[S].dragStop(this, t), e.ui.mouse.prototype[Pt].call(this, t)
		},
		cancel: function() {
			return this[h].is(".ui-draggable-dragging") ? this[Pt]({}) : this._clear(), this
		},
		_getHandle: function(t) {
			return this[o].handle ? !!e(t.target).closest(this[a].find(this[o].handle))[ot] : D
		},
		_createHelper: function(t) {
			var n = this[o],
				r = e.isFunction(n[h]) ? e(n[h].apply(this[a][0], [t])) : n[h] === "clone" ? this[a].clone().removeAttr("id") : this[a];
			return r.parents(G)[ot] || r[et](n[et] === N ? this[a][0][K] : n[et]), r[0] !== this[a][0] && !/(fixed|absolute)/.test(r[B](l)) && r[B](l, C), r
		},
		_adjustOffsetFromHelper: function(t) {
			typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
				left: +t[0],
				top: +t[1] || 0
			}), m in t && (this[r][_][m] = t[m] + this[b][m]), "right" in t && (this[r][_][m] = this[s][lt] - t.right + this[b][m]), k in t && (this[r][_][k] = t[k] + this[b][k]), "bottom" in t && (this[r][_][k] = this[s][$] - t.bottom + this[b][k])
		},
		_getParentOffset: function() {
			var t = this[d][r]();
			this[T] === C && this[n][0] !== document && e[tt](this[n][0], this[d][0]) && (t[m] += this[n][y](), t[k] += this[n][w]());
			if (this[d][0] === document[G] || this[d][0][Lt] && this[d][0][Lt].toLowerCase() === "html" && e.ui.ie) t = {
				top: 0,
				left: 0
			};
			return {
				top: t[k] + (parseInt(this[d][B](vt), 10) || 0),
				left: t[m] + (parseInt(this[d][B](ct), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if (this[T] === g) {
				var e = this[a][l]();
				return {
					top: e[k] - (parseInt(this[h][B](k), 10) || 0) + this[n][w](),
					left: e[m] - (parseInt(this[h][B](m), 10) || 0) + this[n][y]()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this[b] = {
				left: parseInt(this[a][B]("marginLeft"), 10) || 0,
				top: parseInt(this[a][B]("marginTop"), 10) || 0,
				right: parseInt(this[a][B]("marginRight"), 10) || 0,
				bottom: parseInt(this[a][B]("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this[s] = {
				width: this[h].outerWidth(),
				height: this[h].outerHeight()
			}
		},
		_setContainment: function() {
			var t, n, i, u = this[o];
			if (!u[c]) {
				this[c] = gt;
				return
			}
			if (u[c] === "window") {
				this[c] = [e(window)[y]() - this[r][g][m] - this[r][N][m], e(window)[w]() - this[r][g][k] - this[r][N][k], e(window)[y]() + e(window)[lt]() - this[s][lt] - this[b][m], e(window)[w]() + (e(window)[$]() || document[G][K][ht]) - this[s][$] - this[b][k]];
				return
			}
			if (u[c] === "document") {
				this[c] = [0, 0, e(document)[lt]() - this[s][lt] - this[b][m], (e(document)[$]() || document[G][K][ht]) - this[s][$] - this[b][k]];
				return
			}
			if (u[c].constructor === Array) {
				this[c] = u[c];
				return
			}
			u[c] === N && (u[c] = this[h][0][K]), n = e(u[c]), i = n[0];
			if (!i) return;
			t = n[B]("overflow") !== "hidden", this[c] = [(parseInt(n[B](ct), 10) || 0) + (parseInt(n[B]("paddingLeft"), 10) || 0), (parseInt(n[B](vt), 10) || 0) + (parseInt(n[B]("paddingTop"), 10) || 0), (t ? Math.max(i.scrollWidth, i[J]) : i[J]) - (parseInt(n[B]("borderRightWidth"), 10) || 0) - (parseInt(n[B]("paddingRight"), 10) || 0) - this[s][lt] - this[b][m] - this[b].right, (t ? Math.max(i[ht], i[U]) : i[U]) - (parseInt(n[B]("borderBottomWidth"), 10) || 0) - (parseInt(n[B]("paddingBottom"), 10) || 0) - this[s][$] - this[b][k] - this[b].bottom], this[W] = n
		},
		_convertPositionTo: function(t, i) {
			i || (i = this[l]);
			var s = t === C ? 1 : -1,
				o = this[T] !== C || this[n][0] !== document && !!e[tt](this[n][0], this[d][0]) ? this[n] : this[d];
			return this[r][j] || (this[r][j] = {
				top: o[w](),
				left: o[y]()
			}), {
				top: i[k] + this[r][g][k] * s + this[r][N][k] * s - (this[T] === rt ? -this[n][w]() : this[r][j][k]) * s,
				left: i[m] + this[r][g][m] * s + this[r][N][m] * s - (this[T] === rt ? -this[n][y]() : this[r][j][m]) * s
			}
		},
		_generatePosition: function(t) {
			var i, s, u, a, f = this[o],
				l = this[T] !== C || this[n][0] !== document && !!e[tt](this[n][0], this[d][0]) ? this[n] : this[d],
				h = t[Z],
				p = t[Y];
			return this[r][j] || (this[r][j] = {
				top: l[w](),
				left: l[y]()
			}), this[I] && (this[c] && (this[W] ? (s = this[W][r](), i = [this[c][0] + s[m], this[c][1] + s[k], this[c][2] + s[m], this[c][3] + s[k]]) : i = this[c], t[Z] - this[r][_][m] < i[0] && (h = i[0] + this[r][_][m]), t[Y] - this[r][_][k] < i[1] && (p = i[1] + this[r][_][k]), t[Z] - this[r][_][m] > i[2] && (h = i[2] + this[r][_][m]), t[Y] - this[r][_][k] > i[3] && (p = i[3] + this[r][_][k])), f[Ht] && (u = f[Ht][1] ? this[z] + Math.round((p - this[z]) / f[Ht][1]) * f[Ht][1] : this[z], p = i ? u - this[r][_][k] >= i[1] || u - this[r][_][k] > i[3] ? u : u - this[r][_][k] >= i[1] ? u - f[Ht][1] : u + f[Ht][1] : u, a = f[Ht][0] ? this[X] + Math.round((h - this[X]) / f[Ht][0]) * f[Ht][0] : this[X], h = i ? a - this[r][_][m] >= i[0] || a - this[r][_][m] > i[2] ? a : a - this[r][_][m] >= i[0] ? a - f[Ht][0] : a + f[Ht][0] : a)), {
				top: p - this[r][_][k] - this[r][g][k] - this[r][N][k] + (this[T] === rt ? -this[n][w]() : this[r][j][k]),
				left: h - this[r][_][m] - this[r][g][m] - this[r][N][m] + (this[T] === rt ? -this[n][y]() : this[r][j][m])
			}
		},
		_clear: function() {
			this[h].removeClass(Q), this[h][0] !== this[a][0] && !this[x] && this[h].remove(), this[h] = gt, this[x] = f
		},
		_trigger: function(t, n, r) {
			return r = r || this[bt](), e.ui[at].call(this, t, [n, r]), t === dt && (this[L] = this[p](C)), e.Widget.prototype[P].call(this, t, n, r)
		},
		plugins: {},
		_uiHash: function() {
			return {
				helper: this[h],
				position: this[l],
				originalPosition: this[I],
				offset: this[L]
			}
		}
	}), e.ui[at].add(O, mt, {
		start: function(t, n) {
			var r = e(this)[Et](u),
				i = r[o],
				s = e[pt]({}, n, {
					item: r[a]
				});
			r[nt] = [], e(i[mt]).each(function() {
				var n = e[Et](this, "ui-sortable");
				n && !n[o][Tt] && (r[nt].push({
					instance: n,
					shouldRevert: n[o][ut]
				}), n.refreshPositions(), n[P]("activate", t, s))
			})
		},
		stop: function(t, n) {
			var r = e(this)[Et](u),
				s = e[pt]({}, n, {
					item: r[a]
				});
			e.each(r[nt], function() {
				this[i][St] ? (this[i][St] = 0, r[x] = D, this[i][x] = f, this.shouldRevert && (this[i][o][ut] = this.shouldRevert), this[i]._mouseStop(t), this[i][o][h] = this[i][o]._helper, r[o][h] === R && this[i][F][B]({
					top: xt,
					left: xt
				})) : (this[i][x] = f, this[i][P]("deactivate", t, s))
			})
		},
		drag: function(t, n) {
			var l = e(this)[Et](u),
				c = this;
			e.each(l[nt], function() {
				var u = f,
					p = this;
				this[i][L] = l[L], this[i][s] = l[s], this[i][r][_] = l[r][_], this[i][Ot](this[i][Dt]) && (u = D, e.each(l[nt], function() {
					return this[i][L] = l[L], this[i][s] = l[s], this[i][r][_] = l[r][_], this !== p && this[i][Ot](this[i][Dt]) && e[tt](p[i][a][0], this[i][a][0]) && (u = f), u
				})), u ? (this[i][St] || (this[i][St] = 1, this[i][F] = e(c).clone().removeAttr("id")[et](this[i][a])[Et]("ui-sortable-item", D), this[i][o]._helper = this[i][o][h], this[i][o][h] = function() {
					return n[h][0]
				}, t.target = this[i][F][0], this[i]._mouseCapture(t, D), this[i]._mouseStart(t, D, D), this[i][r][_][k] = l[r][_][k], this[i][r][_][m] = l[r][_][m], this[i][r][N][m] -= l[r][N][m] - this[i][r][N][m], this[i][r][N][k] -= l[r][N][k] - this[i][r][N][k], l[P]("toSortable", t), l[yt] = this[i][a], l[F] = l[a], this[i].fromOutside = l), this[i][F] && this[i]._mouseDrag(t)) : this[i][St] && (this[i][St] = 0, this[i][x] = D, this[i][o][ut] = f, this[i][P]("out", t, this[i][bt](this[i])), this[i]._mouseStop(t, D), this[i][o][h] = this[i][o]._helper, this[i][F].remove(), this[i].placeholder && this[i].placeholder.remove(), l[P]("fromSortable", t), l[yt] = f)
			})
		}
	}), e.ui[at].add(O, V, {
		start: function() {
			var t = e(G),
				n = e(this)[Et](u)[o];
			t[B](V) && (n._cursor = t[B](V)), t[B](V, n[V])
		},
		stop: function() {
			var t = e(this)[Et](u)[o];
			t._cursor && e(G)[B](V, t._cursor)
		}
	}), e.ui[at].add(O, q, {
		start: function(t, n) {
			var r = e(n[h]),
				i = e(this)[Et](u)[o];
			r[B](q) && (i[jt] = r[B](q)), r[B](q, i[q])
		},
		stop: function(t, n) {
			var r = e(this)[Et](u)[o];
			r[jt] && e(n[h])[B](q, r[jt])
		}
	}), e.ui[at].add(O, j, {
		start: function() {
			var t = e(this)[Et](u);
			t[n][0] !== document && t[n][0][Lt] !== "HTML" && (t[H] = t[n][r]())
		},
		drag: function(t) {
			var r = e(this)[Et](u),
				i = r[o],
				s = f;
			if (r[n][0] !== document && r[n][0][Lt] !== "HTML") {
				if (!i[Mt] || i[Mt] !== "x") r[H][k] + r[n][0][U] - t[Y] < i[E] ? r[n][0][w] = s = r[n][0][w] + i[M] : t[Y] - r[H][k] < i[E] && (r[n][0][w] = s = r[n][0][w] - i[M]);
				if (!i[Mt] || i[Mt] !== "y") r[H][m] + r[n][0][J] - t[Z] < i[E] ? r[n][0][y] = s = r[n][0][y] + i[M] : t[Z] - r[H][m] < i[E] && (r[n][0][y] = s = r[n][0][y] - i[M])
			} else {
				if (!i[Mt] || i[Mt] !== "x") t[Y] - e(document)[w]() < i[E] ? s = e(document)[w](e(document)[w]() - i[M]) : e(window)[$]() - (t[Y] - e(document)[w]()) < i[E] && (s = e(document)[w](e(document)[w]() + i[M]));
				if (!i[Mt] || i[Mt] !== "y") t[Z] - e(document)[y]() < i[E] ? s = e(document)[y](e(document)[y]() - i[M]) : e(window)[lt]() - (t[Z] - e(document)[y]()) < i[E] && (s = e(document)[y](e(document)[y]() + i[M]))
			}
			s !== f && e.ui[S] && !i[ft] && e.ui[S][_t](r, t)
		}
	}), e.ui[at].add(O, At, {
		start: function() {
			var t = e(this)[Et](u),
				n = t[o];
			t[v] = [], e(n[At].constructor !== String ? n[At].items || ":data(ui-draggable)" : n[At]).each(function() {
				var n = e(this),
					i = n[r]();
				this !== t[a][0] && t[v].push({
					item: this,
					width: n.outerWidth(),
					height: n.outerHeight(),
					top: i[k],
					left: i[m]
				})
			})
		},
		drag: function(t, n) {
			var i, c, h, d, y, w, E, S, x, T, N = e(this)[Et](u),
				C = N[o],
				L = C.snapTolerance,
				A = n[r][m],
				O = A + N[s][lt],
				M = n[r][k],
				_ = M + N[s][$];
			for (x = N[v][ot] - 1; x >= 0; x--) {
				y = N[v][x][m], w = y + N[v][x][lt], E = N[v][x][k], S = E + N[v][x][$];
				if (O < y - L || A > w + L || _ < E - L || M > S + L || !e[tt](N[v][x].item[Bt], N[v][x].item)) {
					N[v][x][wt] && N[o][At].release && N[o][At].release.call(N[a], t, e[pt](N[bt](), {
						snapItem: N[v][x].item
					})), N[v][x][wt] = f;
					continue
				}
				C.snapMode !== "inner" && (i = Math.abs(E - _) <= L, c = Math.abs(S - M) <= L, h = Math.abs(y - O) <= L, d = Math.abs(w - A) <= L, i && (n[l][k] = N[p](g, {
					top: E - N[s][$],
					left: 0
				})[k] - N[b][k]), c && (n[l][k] = N[p](g, {
					top: S,
					left: 0
				})[k] - N[b][k]), h && (n[l][m] = N[p](g, {
					top: 0,
					left: y - N[s][lt]
				})[m] - N[b][m]), d && (n[l][m] = N[p](g, {
					top: 0,
					left: w
				})[m] - N[b][m])), T = i || c || h || d, C.snapMode !== "outer" && (i = Math.abs(E - M) <= L, c = Math.abs(S - _) <= L, h = Math.abs(y - A) <= L, d = Math.abs(w - O) <= L, i && (n[l][k] = N[p](g, {
					top: E,
					left: 0
				})[k] - N[b][k]), c && (n[l][k] = N[p](g, {
					top: S - N[s][$],
					left: 0
				})[k] - N[b][k]), h && (n[l][m] = N[p](g, {
					top: 0,
					left: y
				})[m] - N[b][m]), d && (n[l][m] = N[p](g, {
					top: 0,
					left: w - N[s][lt]
				})[m] - N[b][m])), !N[v][x][wt] && (i || c || h || d || T) && N[o][At][At] && N[o][At][At].call(N[a], t, e[pt](N[bt](), {
					snapItem: N[v][x].item
				})), N[v][x][wt] = i || c || h || d || T
			}
		}
	}), e.ui[at].add(O, "stack", {
		start: function() {
			var t, n = this[Et](u)[o],
				r = e.makeArray(e(n.stack)).sort(function(t, n) {
					return (parseInt(e(t)[B](A), 10) || 0) - (parseInt(e(n)[B](A), 10) || 0)
				});
			if (!r[ot]) return;
			t = parseInt(e(r[0])[B](A), 10) || 0, e(r).each(function(n) {
				e(this)[B](A, t + n)
			}), this[B](A, t + r[ot])
		}
	}), e.ui[at].add(O, A, {
		start: function(t, n) {
			var r = e(n[h]),
				i = e(this)[Et](u)[o];
			r[B](A) && (i._zIndex = r[B](A)), r[B](A, i[A])
		},
		stop: function(t, n) {
			var r = e(this)[Et](u)[o];
			r._zIndex && e(n[h])[B](A, r._zIndex)
		}
	})
}(jQuery),
function(e, t) {
	function W(e, t, n) {
		return e > t && e < t + n
	}
	var n = "element",
		r = "options",
		i = "ddmanager",
		s = "currentItem",
		o = "helperProportions",
		u = !1,
		a = "isover",
		f = "proportions",
		l = "droppables",
		c = "activeClass",
		h = ":data(ui-droppable)",
		p = "ui-droppable",
		d = "intersect",
		v = "hoverClass",
		m = "accept",
		g = "removeClass",
		y = "positionAbs",
		b = "isout",
		w = "scope",
		E = "offset",
		S = "disabled",
		x = "_trigger",
		T = "position",
		N = null,
		C = "refreshPositions",
		k = "call",
		L = !0,
		A = "visible",
		O = "scroll.droppable",
		M = "height",
		_ = "prepareOffsets",
		D = "current",
		P = "absolute",
		H = "tolerance",
		B = "addClass",
		j = "width",
		F = "length",
		I = "offsetHeight",
		q = "parentsUntil",
		R = "clickOffset",
		U = "offsetWidth",
		z = "drop";
	e.widget("ui.droppable", {
		version: "1.10.3",
		widgetEventPrefix: z,
		options: {
			accept: "*",
			activeClass: u,
			addClasses: L,
			greedy: u,
			hoverClass: u,
			scope: "default",
			tolerance: d,
			activate: N,
			deactivate: N,
			drop: N,
			out: N,
			over: N
		},
		_create: function() {
			var t = this[r],
				s = t[m];
			this[a] = u, this[b] = L, this[m] = e.isFunction(s) ? s : function(e) {
				return e.is(s)
			}, this[f] = {
				width: this[n][0][U],
				height: this[n][0][I]
			}, e.ui[i][l][t[w]] = e.ui[i][l][t[w]] || [], e.ui[i][l][t[w]].push(this), t.addClasses && this[n][B](p)
		},
		_destroy: function() {
			var t = 0,
				s = e.ui[i][l][this[r][w]];
			for (; t < s[F]; t++) s[t] === this && s.splice(t, 1);
			this[n][g]("ui-droppable ui-droppable-disabled")
		},
		_setOption: function(t, n) {
			t === m && (this[m] = e.isFunction(n) ? n : function(e) {
				return e.is(n)
			}), e.Widget.prototype._setOption.apply(this, arguments)
		},
		_activate: function(t) {
			var s = e.ui[i][D];
			this[r][c] && this[n][B](this[r][c]), s && this[x]("activate", t, this.ui(s))
		},
		_deactivate: function(t) {
			var s = e.ui[i][D];
			this[r][c] && this[n][g](this[r][c]), s && this[x]("deactivate", t, this.ui(s))
		},
		_over: function(t) {
			var o = e.ui[i][D];
			if (!o || (o[s] || o[n])[0] === this[n][0]) return;
			this[m][k](this[n][0], o[s] || o[n]) && (this[r][v] && this[n][B](this[r][v]), this[x]("over", t, this.ui(o)))
		},
		_out: function(t) {
			var o = e.ui[i][D];
			if (!o || (o[s] || o[n])[0] === this[n][0]) return;
			this[m][k](this[n][0], o[s] || o[n]) && (this[r][v] && this[n][g](this[r][v]), this[x]("out", t, this.ui(o)))
		},
		_drop: function(t, o) {
			var a =
				o || e.ui[i][D],
				f = u;
			return !a || (a[s] || a[n])[0] === this[n][0] ? u : (this[n].find(h).not(".ui-draggable-dragging").each(function() {
				var t = e.data(this, p);
				if (t[r].greedy && !t[r][S] && t[r][w] === a[r][w] && t[m][k](t[n][0], a[s] || a[n]) && e.ui[d](a, e.extend(t, {
						offset: t[n][E]()
					}), t[r][H])) return f = L, u
			}), f ? u : this[m][k](this[n][0], a[s] || a[n]) ? (this[r][c] && this[n][g](this[r][c]), this[r][v] && this[n][g](this[r][v]), this[x](z, t, this.ui(a)), this[n]) : u)
		},
		ui: function(e) {
			return {
				draggable: e[s] || e[n],
				helper: e.helper,
				position: e[T],
				offset: e[y]
			}
		}
	}), e.ui[d] = function(e, t, n) {
		if (!t[E]) return u;
		var r, i, s = (e[y] || e[T][P]).left,
			a = s + e[o][j],
			l = (e[y] || e[T][P]).top,
			c = l + e[o][M],
			h = t[E].left,
			p = h + t[f][j],
			v = t[E].top,
			m = v + t[f][M];
		switch (n) {
			case "fit":
				return h <= s && a <= p && v <= l && c <= m;
			case d:
				return h < s + e[o][j] / 2 && a - e[o][j] / 2 < p && v < l + e[o][M] / 2 && c - e[o][M] / 2 < m;
			case "pointer":
				return r = (e[y] || e[T][P]).left + (e[R] || e[E].click).left, i = (e[y] || e[T][P]).top + (e[R] || e[E].click).top, W(i, v, t[f][M]) && W(r, h, t[f][j]);
			case "touch":
				return (l >= v && l <= m || c >= v && c <= m || l < v && c > m) && (s >= h && s <= p || a >= h && a <= p || s < h && a > p);
			default:
				return u
		}
	}, e.ui[i] = {
		current: N,
		droppables: {
			"default": []
		},
		prepareOffsets: function(t, o) {
			var u, a, c = e.ui[i][l][t[r][w]] || [],
				p = o ? o.type : N,
				d = (t[s] || t[n]).find(h).addBack();
			e: for (u = 0; u < c[F]; u++) {
				if (c[u][r][S] || t && !c[u][m][k](c[u][n][0], t[s] || t[n])) continue;
				for (a = 0; a < d[F]; a++)
					if (d[a] === c[u][n][0]) {
						c[u][f][M] = 0;
						continue e
					}
				c[u][A] = c[u][n].css("display") !== "none";
				if (!c[u][A]) continue;
				p === "mousedown" && c[u]._activate[k](c[u], o), c[u][E] = c[u][n][E](), c[u][f] = {
					width: c[u][n][0][U],
					height: c[u][n][0][I]
				}
			}
		},
		drop: function(t, o) {
			var f = u;
			return e.each((e.ui[i][l][t[r][w]] || []).slice(), function() {
				if (!this[r]) return;
				!this[r][S] && this[A] && e.ui[d](t, this, this[r][H]) && (f = this._drop[k](this, o) || f), !this[r][S] && this[A] && this[m][k](this[n][0], t[s] || t[n]) && (this[b] = L, this[a] = u, this._deactivate[k](this, o))
			}), f
		},
		dragStart: function(t, s) {
			t[n][q]("body").bind(O, function() {
				t[r][C] || e.ui[i][_](t, s)
			})
		},
		drag: function(t, s) {
			t[r][C] && e.ui[i][_](t, s), e.each(e.ui[i][l][t[r][w]] || [], function() {
				if (this[r][S] || this.greedyChild || !this[A]) return;
				var i, o, f, l = e.ui[d](t, this, this[r][H]),
					c = !l && this[a] ? b : l && !this[a] ? a : N;
				if (!c) return;
				this[r].greedy && (o = this[r][w], f = this[n].parents(h).filter(function() {
					return e.data(this, p)[r][w] === o
				}), f[F] && (i = e.data(f[0], p), i.greedyChild = c === a)), i && c === a && (i[a] = u, i[b] = L, i._out[k](i, s)), this[c] = L, this[c === b ? a : b] = u, this[c === a ? "_over" : "_out"][k](this, s), i && c === b && (i[b] = u, i[a] = L, i._over[k](i, s))
			})
		},
		dragStop: function(t, s) {
			t[n][q]("body").unbind(O), t[r][C] || e.ui[i][_](t, s)
		}
	}
}(jQuery),
function(e, t) {
	function xt(e) {
		return parseInt(e, 10) || 0
	}

	function Tt(e) {
		return !isNaN(parseInt(e, 10))
	}
	var n = "position",
		r = "element",
		i = "originalElement",
		s = "height",
		o = "ui-resizable",
		u = "left",
		a = "_proportionallyResizeElements",
		f = "width",
		l = "originalPosition",
		c = "aspectRatio",
		h = "helper",
		p = "originalSize",
		d = "alsoResize",
		v = "top",
		m = "handles",
		g = "options",
		y = "css",
		b = "outerHeight",
		w = "_helper",
		E = "maxHeight",
		S = "minHeight",
		x = "_proportionallyResize",
		T = "outerWidth",
		N = "parentData",
		C = "resize",
		k = !1,
		L = "containerElement",
		A = "minWidth",
		O = "maxWidth",
		M = "length",
		_ = "containerOffset",
		D = "resizable",
		P = ".ui-resizable-handle",
		H = "size",
		B = "ui-resizable-autohide",
		j = "addClass",
		F = null,
		I = "sizeDiff",
		q = "borderDif",
		R = "offset",
		U = "test",
		z = "animate",
		W = "ghost",
		X = "containment",
		V = "_change",
		$ = "elementIsWrapper",
		J = "data",
		K = "containerPosition",
		Q = "extend",
		G = "ui-resizable-alsoresize",
		Y = "_handles",
		Z = "ui-resizable-resizing",
		et = "_propagate",
		tt = ".ui-resizable-",
		nt = "containerSize",
		rt = "nodeName",
		it = "elementOffset",
		st = "originalResizeStyle",
		ot = "absolute",
		ut = "hasScroll",
		at = "_aspectRatio",
		ft = "originalMousePosition",
		lt = "removeClass",
		ct = "apply",
		ht = "resizing",
		pt = "plugin",
		dt = "cursor",
		vt = "removeData",
		mt = "px",
		gt = "padding",
		yt = "disableSelection",
		bt = "body",
		wt = "relative",
		Et = "disabled",
		St = "shiftKey";
	e.widget("ui.resizable", e.ui.mouse, {
		version: "1.10.3",
		widgetEventPrefix: C,
		options: {
			alsoResize: k,
			animate: k,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: k,
			autoHide: k,
			containment: k,
			ghost: k,
			grid: k,
			handles: "e,s,se",
			helper: k,
			maxHeight: F,
			maxWidth: F,
			minHeight: 10,
			minWidth: 10,
			zIndex: 90,
			resize: F,
			start: F,
			stop: F
		},
		_create: function() {
			var t, s, f, l, p, d = this,
				w = this[g];
			this[r][j](o), e[Q](this, {
				_aspectRatio: !!w[c],
				aspectRatio: w[c],
				originalElement: this[r],
				_proportionallyResizeElements: [],
				_helper: w[h] || w[W] || w[z] ? w[h] || "ui-resizable-helper" : F
			}), this[r][0][rt].match(/canvas|textarea|input|select|button|img/i) && (this[r].wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>")[y]({
				position: this[r][y](n),
				width: this[r][T](),
				height: this[r][b](),
				top: this[r][y](v),
				left: this[r][y](u)
			})), this[r] = this[r].parent()[J](o, this[r][J](o)), this[$] = !0, this[r][y]({
				marginLeft: this[i][y]("marginLeft"),
				marginTop: this[i][y]("marginTop"),
				marginRight: this[i][y]("marginRight"),
				marginBottom: this[i][y]("marginBottom")
			}), this[i][y]({
				marginLeft: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0
			}), this[st] = this[i][y](C), this[i][y](C, "none"), this[a].push(this[i][y]({
				position: "static",
				zoom: 1,
				display: "block"
			})), this[i][y]({
				margin: this[i][y]("margin")
			}), this[x]()), this[m] = w[m] || (e(P, this[r])[M] ? {
				n: ".ui-resizable-n",
				e: ".ui-resizable-e",
				s: ".ui-resizable-s",
				w: ".ui-resizable-w",
				se: ".ui-resizable-se",
				sw: ".ui-resizable-sw",
				ne: ".ui-resizable-ne",
				nw: ".ui-resizable-nw"
			} : "e,s,se");
			if (this[m].constructor === String) {
				this[m] === "all" && (this[m] = "n,e,s,w,se,sw,ne,nw"), t = this[m].split(","), this[m] = {};
				for (s = 0; s < t[M]; s++) f = e.trim(t[s]), p = "ui-resizable-" + f, l = e("<div class='ui-resizable-handle " + p + "'></div>"), l[y]({
					zIndex: w.zIndex
				}), "se" === f && l[j]("ui-icon ui-icon-gripsmall-diagonal-se"), this[m][f] = tt + f, this[r].append(l)
			}
			this._renderAxis = function(t) {
				var n, s, o, u;
				t = t || this[r];
				for (n in this[m]) {
					this[m][n].constructor === String && (this[m][n] = e(this[m][n], this[r]).show()), this[$] && this[i][0][rt].match(/textarea|input|select|button/i) && (s = e(this[m][n], this[r]), u = /sw|ne|nw|se|n|s/ [U](n) ? s[b]() : s[T](), o = [gt, /ne|nw|n/ [U](n) ? "Top" : /se|sw|s/ [U](n) ? "Bottom" : /^e$/ [U](n) ? "Right" : "Left"].join(""), t[y](o, u), this[x]());
					if (!e(this[m][n])[M]) continue
				}
			}, this._renderAxis(this[r]), this[Y] = e(P, this[r])[yt](), this[Y].mouseover(function() {
				d[ht] || (this.className && (l = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), d.axis = l && l[1] ? l[1] : "se")
			}), w.autoHide && (this[Y].hide(), e(this[r])[j](B).mouseenter(function() {
				if (w[Et]) return;
				e(this)[lt](B), d[Y].show()
			}).mouseleave(function() {
				if (w[Et]) return;
				d[ht] || (e(this)[j](B), d[Y].hide())
			})), this._mouseInit()
		},
		_destroy: function() {
			this._mouseDestroy();
			var t, s = function(t) {
				e(t)[lt]("ui-resizable ui-resizable-disabled ui-resizable-resizing")[vt](D)[vt](o).unbind(".resizable").find(P).remove()
			};
			return this[$] && (s(this[r]), t = this[r], this[i][y]({
				position: t[y](n),
				width: t[T](),
				height: t[b](),
				top: t[y](v),
				left: t[y](u)
			}).insertAfter(t), t.remove()), this[i][y](C, this[st]), s(this[i]), this
		},
		_mouseCapture: function(t) {
			var n, r, i = k;
			for (n in this[m]) {
				r = e(this[m][n])[0];
				if (r === t.target || e.contains(r, t.target)) i = !0
			}
			return !this[g][Et] && i
		},
		_mouseStart: function(t) {
			var i, o, a, d = this[g],
				m = this[r][n](),
				E = this[r];
			return this[ht] = !0, /absolute/ [U](E[y](n)) ? E[y]({
				position: ot,
				top: E[y](v),
				left: E[y](u)
			}) : E.is(".ui-draggable") && E[y]({
				position: ot,
				top: m[v],
				left: m[u]
			}), this._renderProxy(), i = xt(this[h][y](u)), o = xt(this[h][y](v)), d[X] && (i += e(d[X]).scrollLeft() || 0, o += e(d[X]).scrollTop() || 0), this[R] = this[h][R](), this[n] = {
				left: i,
				top: o
			}, this[H] = this[w] ? {
				width: E[T](),
				height: E[b]()
			} : {
				width: E[f](),
				height: E[s]()
			}, this[p] = this[w] ? {
				width: E[T](),
				height: E[b]()
			} : {
				width: E[f](),
				height: E[s]()
			}, this[l] = {
				left: i,
				top: o
			}, this[I] = {
				width: E[T]() - E[f](),
				height: E[b]() - E[s]()
			}, this[ft] = {
				left: t.pageX,
				top: t.pageY
			}, this[c] = typeof d[c] == "number" ? d[c] : this[p][f] / this[p][s] || 1, a = e(tt + this.axis)[y](dt), e(bt)[y](dt, a === "auto" ? this.axis + "-resize" : a), E[j](Z), this[et]("start", t), !0
		},
		_mouseDrag: function(t) {
			var r, i = this[h],
				o = {},
				l = this[ft],
				c = this.axis,
				p = this[n][v],
				d = this[n][u],
				m = this[H][f],
				g = this[H][s],
				b = t.pageX - l[u] || 0,
				E = t.pageY - l[v] || 0,
				S = this[V][c];
			if (!S) return k;
			r = S[ct](this, [t, b, E]), this._updateVirtualBoundaries(t[St]);
			if (this[at] || t[St]) r = this._updateRatio(r, t);
			return r = this._respectSize(r, t), this._updateCache(r), this[et](C, t), this[n][v] !== p && (o[v] = this[n][v] + mt), this[n][u] !== d && (o[u] = this[n][u] + mt), this[H][f] !== m && (o[f] = this[H][f] + mt), this[H][s] !== g && (o[s] = this[H][s] + mt), i[y](o), !this[w] && this[a][M] && this[x](), e.isEmptyObject(o) || this._trigger(C, t, this.ui()), k
		},
		_mouseStop: function(t) {
			this[ht] = k;
			var i, o, c, p, d, m, b, E = this[g],
				S = this;
			return this[w] && (i = this[a], o = i[M] && /textarea/i [U](i[0][rt]), c = o && e.ui[ut](i[0], u) ? 0 : S[I][s], p = o ? 0 : S[I][f], d = {
				width: S[h][f]() - p,
				height: S[h][s]() - c
			}, m = parseInt(S[r][y](u), 10) + (S[n][u] - S[l][u]) || F, b = parseInt(S[r][y](v), 10) + (S[n][v] - S[l][v]) || F, E[z] || this[r][y](e[Q](d, {
				top: b,
				left: m
			})), S[h][s](S[H][s]), S[h][f](S[H][f]), this[w] && !E[z] && this[x]()), e(bt)[y](dt, "auto"), this[r][lt](Z), this[et]("stop", t), this[w] && this[h].remove(), k
		},
		_updateVirtualBoundaries: function(e) {
			var t, n, r, i, s, o = this[g];
			s = {
				minWidth: Tt(o[A]) ? o[A] : 0,
				maxWidth: Tt(o[O]) ? o[O] : Infinity,
				minHeight: Tt(o[S]) ? o[S] : 0,
				maxHeight: Tt(o[E]) ? o[E] : Infinity
			};
			if (this[at] || e) t = s[S] * this[c], r = s[A] / this[c], n = s[E] * this[c], i = s[O] / this[c], t > s[A] && (s[A] = t), r > s[S] && (s[S] = r), n < s[O] && (s[O] = n), i < s[E] && (s[E] = i);
			this._vBoundaries = s
		},
		_updateCache: function(e) {
			this[R] = this[h][R](), Tt(e[u]) && (this[n][u] = e[u]), Tt(e[v]) && (this[n][v] = e[v]), Tt(e[s]) && (this[H][s] = e[s]), Tt(e[f]) && (this[H][f] = e[f])
		},
		_updateRatio: function(e) {
			var t = this[n],
				r = this[H],
				i = this.axis;
			return Tt(e[s]) ? e[f] = e[s] * this[c] : Tt(e[f]) && (e[s] = e[f] / this[c]), i === "sw" && (e[u] = t[u] + (r[f] - e[f]), e[v] = F), i === "nw" && (e[v] = t[v] + (r[s] - e[s]), e[u] = t[u] + (r[f] - e[f])), e
		},
		_respectSize: function(e) {
			var t = this._vBoundaries,
				r = this.axis,
				i = Tt(e[f]) && t[O] && t[O] < e[f],
				o = Tt(e[s]) && t[E] && t[E] < e[s],
				a = Tt(e[f]) && t[A] && t[A] > e[f],
				c = Tt(e[s]) && t[S] && t[S] > e[s],
				h = this[l][u] + this[p][f],
				d = this[n][v] + this[H][s],
				m = /sw|nw|w/ [U](r),
				g = /nw|ne|n/ [U](r);
			return a && (e[f] = t[A]), c && (e[s] = t[S]), i && (e[f] = t[O]), o && (e[s] = t[E]), a && m && (e[u] = h - t[A]), i && m && (e[u] = h - t[O]), c && g && (e[v] = d - t[S]), o && g && (e[v] = d - t[E]), !e[f] && !e[s] && !e[u] && e[v] ? e[v] = F : !e[f] && !e[s] && !e[v] && e[u] && (e[u] = F), e
		},
		_proportionallyResize: function() {
			if (!this[a][M]) return;
			var e, t, n, i, o, u = this[h] || this[r];
			for (e = 0; e < this[a][M]; e++) {
				o = this[a][e];
				if (!this[q]) {
					this[q] = [], n = [o[y]("borderTopWidth"), o[y]("borderRightWidth"), o[y]("borderBottomWidth"), o[y]("borderLeftWidth")], i = [o[y]("paddingTop"), o[y]("paddingRight"), o[y]("paddingBottom"), o[y]("paddingLeft")];
					for (t = 0; t < n[M]; t++) this[q][t] = (parseInt(n[t], 10) || 0) + (parseInt(i[t], 10) || 0)
				}
				o[y]({
					height: u[s]() - this[q][0] - this[q][2] || 0,
					width: u[f]() - this[q][1] - this[q][3] || 0
				})
			}
		},
		_renderProxy: function() {
			var t = this[r],
				n = this[g];
			this[it] = t[R](), this[w] ? (this[h] = this[h] || e("<div style='overflow:hidden;'></div>"), this[h][j](this[w])[y]({
				width: this[r][T]() - 1,
				height: this[r][b]() - 1,
				position: ot,
				left: this[it][u] + mt,
				top: this[it][v] + mt,
				zIndex: ++n.zIndex
			}), this[h].appendTo(bt)[yt]()) : this[h] = this[r]
		},
		_change: {
			e: function(e, t) {
				return {
					width: this[p][f] + t
				}
			},
			w: function(e, t) {
				var n = this[p],
					r = this[l];
				return {
					left: r[u] + t,
					width: n[f] - t
				}
			},
			n: function(e, t, n) {
				var r = this[p],
					i = this[l];
				return {
					top: i[v] + n,
					height: r[s] - n
				}
			},
			s: function(e, t, n) {
				return {
					height: this[p][s] + n
				}
			},
			se: function(t, n, r) {
				return e[Q](this[V].s[ct](this, arguments), this[V].e[ct](this, [t, n, r]))
			},
			sw: function(t, n, r) {
				return e[Q](this[V].s[ct](this, arguments), this[V].w[ct](this, [t, n, r]))
			},
			ne: function(t, n, r) {
				return e[Q](this[V].n[ct](this, arguments), this[V].e[ct](this, [t, n, r]))
			},
			nw: function(t, n, r) {
				return e[Q](this[V].n[ct](this, arguments), this[V].w[ct](this, [t, n, r]))
			}
		},
		_propagate: function(t, n) {
			e.ui[pt].call(this, t, [n, this.ui()]), t !== C && this._trigger(t, n, this.ui())
		},
		plugins: {},
		ui: function() {
			return {
				originalElement: this[i],
				element: this[r],
				helper: this[h],
				position: this[n],
				size: this[H],
				originalSize: this[p],
				originalPosition: this[l]
			}
		}
	}), e.ui[pt].add(D, z, {
		stop: function(t) {
			var i = e(this)[J](o),
				c = i[g],
				h = i[a],
				p = h[M] && /textarea/i [U](h[0][rt]),
				d = p && e.ui[ut](h[0], u) ? 0 : i[I][s],
				m = p ? 0 : i[I][f],
				b = {
					width: i[H][f] - m,
					height: i[H][s] - d
				},
				w = parseInt(i[r][y](u), 10) + (i[n][u] - i[l][u]) || F,
				E = parseInt(i[r][y](v), 10) + (i[n][v] - i[l][v]) || F;
			i[r][z](e[Q](b, E && w ? {
				top: E,
				left: w
			} : {}), {
				duration: c.animateDuration,
				easing: c.animateEasing,
				step: function() {
					var n = {
						width: parseInt(i[r][y](f), 10),
						height: parseInt(i[r][y](s), 10),
						top: parseInt(i[r][y](v), 10),
						left: parseInt(i[r][y](u), 10)
					};
					h && h[M] && e(h[0])[y]({
						width: n[f],
						height: n[s]
					}), i._updateCache(n), i[et](C, t)
				}
			})
		}
	}), e.ui[pt].add(D, X, {
		start: function() {
			var t, i, a, l, c, h, p, d = e(this)[J](o),
				m = d[g],
				b = d[r],
				w = m[X],
				E = w instanceof e ? w.get(0) : /parent/ [U](w) ? b.parent().get(0) : w;
			if (!E) return;
			d[L] = e(E), /document/ [U](w) || w === document ? (d[_] = {
				left: 0,
				top: 0
			}, d[K] = {
				left: 0,
				top: 0
			}, d[N] = {
				element: e(document),
				left: 0,
				top: 0,
				width: e(document)[f](),
				height: e(document)[s]() || document[bt].parentNode.scrollHeight
			}) : (t = e(E), i = [], e(["Top", "Right", "Left", "Bottom"]).each(function(e, n) {
				i[e] = xt(t[y](gt + n))
			}), d[_] = t[R](), d[K] = t[n](), d[nt] = {
				height: t.innerHeight() - i[3],
				width: t.innerWidth() - i[1]
			}, a = d[_], l = d[nt][s], c = d[nt][f], h = e.ui[ut](E, u) ? E.scrollWidth : c, p = e.ui[ut](E) ? E.scrollHeight : l, d[N] = {
				element: E,
				left: a[u],
				top: a[v],
				width: h,
				height: p
			})
		},
		resize: function(t) {
			var i, a, l, p, d = e(this)[J](o),
				m = d[g],
				b = d[_],
				E = d[n],
				S = d[at] || t[St],
				x = {
					top: 0,
					left: 0
				},
				T = d[L];
			T[0] !== document && /static/ [U](T[y](n)) && (x = b), E[u] < (d[w] ? b[u] : 0) && (d[H][f] = d[H][f] + (d[w] ? d[n][u] - b[u] : d[n][u] - x[u]), S && (d[H][s] = d[H][f] / d[c]), d[n][u] = m[h] ? b[u] : 0), E[v] < (d[w] ? b[v] : 0) && (d[H][s] = d[H][s] + (d[w] ? d[n][v] - b[v] : d[n][v]), S && (d[H][f] = d[H][s] * d[c]), d[n][v] = d[w] ? b[v] : 0), d[R][u] = d[N][u] + d[n][u], d[R][v] = d[N][v] + d[n][v], i = Math.abs((d[w] ? d[R][u] - x[u] : d[R][u] - x[u]) + d[I][f]), a = Math.abs((d[w] ? d[R][v] - x[v] : d[R][v] - b[v]) + d[I][s]), l = d[L].get(0) === d[r].parent().get(0), p = /relative|absolute/ [U](d[L][y](n)), l && p && (i -= d[N][u]), i + d[H][f] >= d[N][f] && (d[H][f] = d[N][f] - i, S && (d[H][s] = d[H][f] / d[c])), a + d[H][s] >= d[N][s] && (d[H][s] = d[N][s] - a, S && (d[H][f] = d[H][s] * d[c]))
		},
		stop: function() {
			var t = e(this)[J](o),
				r = t[g],
				i = t[_],
				a = t[K],
				l = t[L],
				c = e(t[h]),
				p = c[R](),
				d = c[T]() - t[I][f],
				v = c[b]() - t[I][s];
			t[w] && !r[z] && /relative/ [U](l[y](n)) && e(this)[y]({
				left: p[u] - a[u] - i[u],
				width: d,
				height: v
			}), t[w] && !r[z] && /static/ [U](l[y](n)) && e(this)[y]({
				left: p[u] - a[u] - i[u],
				width: d,
				height: v
			})
		}
	}), e.ui[pt].add(D, d, {
		start: function() {
			var t = e(this)[J](o),
				n = t[g],
				r = function(t) {
					e(t).each(function() {
						var t = e(this);
						t[J](G, {
							width: parseInt(t[f](), 10),
							height: parseInt(t[s](), 10),
							left: parseInt(t[y](u), 10),
							top: parseInt(t[y](v), 10)
						})
					})
				};
			typeof n[d] == "object" && !n[d].parentNode ? n[d][M] ? (n[d] = n[d][0], r(n[d])) : e.each(n[d], function(e) {
				r(e)
			}) : r(n[d])
		},
		resize: function(t, r) {
			var a = e(this)[J](o),
				c = a[g],
				h = a[p],
				m = a[l],
				b = {
					height: a[H][s] - h[s] || 0,
					width: a[H][f] - h[f] || 0,
					top: a[n][v] - m[v] || 0,
					left: a[n][u] - m[u] || 0
				},
				w = function(t, n) {
					e(t).each(function() {
						var t = e(this),
							o = e(this)[J](G),
							a = {},
							l = n && n[M] ? n : t.parents(r[i][0])[M] ? [f, s] : [f, s, v, u];
						e.each(l, function(e, t) {
							var n = (o[t] || 0) + (b[t] || 0);
							n && n >= 0 && (a[t] = n || F)
						}), t[y](a)
					})
				};
			typeof c[d] == "object" && !c[d].nodeType ? e.each(c[d], function(e, t) {
				w(e, t)
			}) : w(c[d])
		},
		stop: function() {
			e(this)[vt]("resizable-alsoresize")
		}
	}), e.ui[pt].add(D, W, {
		start: function() {
			var t = e(this)[J](o),
				n = t[g],
				r = t[H];
			t[W] = t[i].clone(), t[W][y]({
				opacity: .25,
				display: "block",
				position: wt,
				height: r[s],
				width: r[f],
				margin: 0,
				left: 0,
				top: 0
			})[j]("ui-resizable-ghost")[j](typeof n[W] == "string" ? n[W] : ""), t[W].appendTo(t[h])
		},
		resize: function() {
			var t = e(this)[J](o);
			t[W] && t[W][y]({
				position: wt,
				height: t[H][s],
				width: t[H][f]
			})
		},
		stop: function() {
			var t = e(this)[J](o);
			t[W] && t[h] && t[h].get(0).removeChild(t[W].get(0))
		}
	}), e.ui[pt].add(D, "grid", {
		resize: function() {
			var t = e(this)[J](o),
				r = t[g],
				i = t[H],
				a = t[p],
				c = t[l],
				h = t.axis,
				d = typeof r.grid == "number" ? [r.grid, r.grid] : r.grid,
				m = d[0] || 1,
				y = d[1] || 1,
				b = Math.round((i[f] - a[f]) / m) * m,
				w = Math.round((i[s] - a[s]) / y) * y,
				x = a[f] + b,
				T = a[s] + w,
				N = r[O] && r[O] < x,
				C = r[E] && r[E] < T,
				k = r[A] && r[A] > x,
				L = r[S] && r[S] > T;
			r.grid = d, k && (x += m), L && (T += y), N && (x -= m), C && (T -= y), /^(se|s|e)$/ [U](h) ? (t[H][f] = x, t[H][s] = T) : /^(ne)$/ [U](h) ? (t[H][f] = x, t[H][s] = T, t[n][v] = c[v] - w) : /^(sw)$/ [U](h) ? (t[H][f] = x, t[H][s] = T, t[n][u] = c[u] - b) : (t[H][f] = x, t[H][s] = T, t[n][v] = c[v] - w, t[n][u] = c[u] - b)
		}
	})
}(jQuery),
function(e, t) {
	var n = !0,
		r = "touch",
		i = null,
		s = "addClass",
		o = "element",
		u = "dragged",
		a = !1,
		f = "refresh",
		l = "filter",
		c = "options",
		h = "ui-selectee",
		p = "each",
		d = "data",
		v = "selectable-item",
		m = "hasClass",
		g = "ui-selected",
		y = "ui-selecting",
		b = "ui-unselecting",
		w = "selectees",
		E = "helper",
		S = "removeClass",
		x = "_trigger",
		T = "startselected",
		N = "metaKey",
		C = "ctrlKey",
		k = "$element",
		L = "selected",
		A = "unselecting",
		O = "selecting";
	e.widget("ui.selectable", e.ui.mouse, {
		version: "1.10.3",
		options: {
			appendTo: "body",
			autoRefresh: n,
			distance: 0,
			filter: "*",
			tolerance: r,
			selected: i,
			selecting: i,
			start: i,
			stop: i,
			unselected: i,
			unselecting: i
		},
		_create: function() {
			var t, n = this;
			this[o][s]("ui-selectable"), this[u] = a, this[f] = function() {
				t = e(n[c][l], n[o][0]), t[s](h), t[p](function() {
					var t = e(this),
						n = t.offset();
					e[d](this, v, {
						element: this,
						$element: t,
						left: n.left,
						top: n.top,
						right: n.left + t.outerWidth(),
						bottom: n.top + t.outerHeight(),
						startselected: a,
						selected: t[m](g),
						selecting: t[m](y),
						unselecting: t[m](b)
					})
				})
			}, this[f](), this[w] = t[s](h), this._mouseInit(), this[E] = e("<div class='ui-selectable-helper'></div>")
		},
		_destroy: function() {
			this[w][S](h).removeData(v), this[o][S]("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
		},
		_mouseStart: function(t) {
			var r = this,
				i = this[c];
			this.opos = [t.pageX, t.pageY];
			if (this[c].disabled) return;
			this[w] = e(i[l], this[o][0]), this[x]("start", t), e(i.appendTo).append(this[E]), this[E].css({
				left: t.pageX,
				top: t.pageY,
				width: 0,
				height: 0
			}), i.autoRefresh && this[f](), this[w][l](".ui-selected")[p](function() {
				var i = e[d](this, v);
				i[T] = n, !t[N] && !t[C] && (i[k][S](g), i[L] = a, i[k][s](b), i[A] = n, r[x](A, t, {
					unselecting: i[o]
				}))
			}), e(t.target).parents().addBack()[p](function() {
				var n, i = e[d](this, v);
				if (i) return n = !t[N] && !t[C] || !i[k][m](g), i[k][S](n ? b : g)[s](n ? y : b), i[A] = !n, i[O] = n, i[L] = n, n ? r[x](O, t, {
					selecting: i[o]
				}) : r[x](A, t, {
					unselecting: i[o]
				}), a
			})
		},
		_mouseDrag: function(t) {
			this[u] = n;
			if (this[c].disabled) return;
			var i, f = this,
				l = this[c],
				h = this.opos[0],
				m = this.opos[1],
				M = t.pageX,
				_ = t.pageY;
			return h > M && (i = M, M = h, h = i), m > _ && (i = _, _ = m, m = i), this[E].css({
				left: h,
				top: m,
				width: M - h,
				height: _ - m
			}), this[w][p](function() {
				var i = e[d](this, v),
					u = a;
				if (!i || i[o] === f[o][0]) return;
				l.tolerance === r ? u = !(i.left > M || i.right < h || i.top > _ || i.bottom < m) : l.tolerance === "fit" && (u = i.left > h && i.right < M && i.top > m && i.bottom < _), u ? (i[L] && (i[k][S](g), i[L] = a), i[A] && (i[k][S](b), i[A] = a), i[O] || (i[k][s](y), i[O] = n, f[x](O, t, {
					selecting: i[o]
				}))) : (i[O] && ((t[N] || t[C]) && i[T] ? (i[k][S](y), i[O] = a, i[k][s](g), i[L] = n) : (i[k][S](y), i[O] = a, i[T] && (i[k][s](b), i[A] = n), f[x](A, t, {
					unselecting: i[o]
				}))), i[L] && !t[N] && !t[C] && !i[T] && (i[k][S](g), i[L] = a, i[k][s](b), i[A] = n, f[x](A, t, {
					unselecting: i[o]
				})))
			}), a
		},
		_mouseStop: function(t) {
			var r = this;
			return this[u] = a, e(".ui-unselecting", this[o][0])[p](function() {
				var n = e[d](this, v);
				n[k][S](b), n[A] = a, n[T] = a, r[x]("unselected", t, {
					unselected: n[o]
				})
			}), e(".ui-selecting", this[o][0])[p](function() {
				var i = e[d](this, v);
				i[k][S](y)[s](g), i[O] = a, i[L] = n, i[T] = n, r[x](L, t, {
					selected: i[o]
				})
			}), this[x]("stop", t), this[E].remove(), a
		}
	})
}(jQuery),
function(e, t) {
	function mn(e, t, n) {
		return e > t && e < t + n
	}

	function gn(e) {
		return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"))
	}
	var n = "currentItem",
		r = "scrollParent",
		i = "containers",
		s = "options",
		o = "offset",
		u = "containment",
		a = "placeholder",
		f = "helperProportions",
		l = "containerCache",
		c = "offsetParent",
		h = "helper",
		p = "left",
		d = !1,
		v = "currentContainer",
		m = "element",
		g = "positionAbs",
		y = "scrollLeft",
		b = "_trigger",
		w = "scrollSensitivity",
		E = "items",
		S = "scrollTop",
		x = "length",
		T = "_uiHash",
		N = null,
		C = "height",
		k = "parent",
		L = "top",
		A = "cssPosition",
		O = "margins",
		M = "ui-sortable-helper",
		_ = "scrollSpeed",
		D = "ddmanager",
		P = "click",
		H = "width",
		B = "absolute",
		j = "position",
		F = "parentNode",
		I = "lastPositionAbs",
		q = "relative",
		R = "overflowOffset",
		U = !0,
		z = "_storedCSS",
		W = ".ui-sortable-helper",
		X = "domPosition",
		V = "document",
		$ = "contains",
		J = "widgetName",
		K = "borderLeftWidth",
		Q = "floating",
		G = "fromOutside",
		Y = "opacity",
		Z = "borderTopWidth",
		et = "item",
		tt = "refreshPositions",
		nt = "_storedZIndex",
		rt = "removeClass",
		it = "isFunction",
		st = ".ui-sortable-placeholder",
		ot = "cursor",
		ut = "zIndex",
		at = "down",
		ft = "originalPosition",
		lt = "pageY",
		ct = "pageX",
		ht = "_getDragHorizontalDirection",
		pt = "disabled",
		dt = "original",
		vt = "_cacheHelperProportions",
		mt = "-item",
		gt = "_storedOpacity",
		yt = "_getDragVerticalDirection",
		bt = "tagName",
		wt = "auto",
		Et = "dropBehaviour",
		St = "originalPageY",
		xt = "right",
		Tt = "originalPageX",
		Nt = "storedCursor",
		Ct = "offsetHeight",
		kt = "fixed",
		Lt = "pointer",
		At = "connectWith",
		Ot = "offsetWidth",
		Mt = "outerHeight",
		_t = "over",
		Dt = "paddingBottom",
		Pt = "counter",
		Ht = "reverting",
		Bt = "update",
		jt = "_getRelativeOffset",
		Ft = "paddingRight",
		It = "body",
		qt = "appendTo",
		Rt = "change",
		Ut = "push",
		zt = "_convertPositionTo",
		Wt = "paddingLeft",
		Xt = "_rearrange",
		Vt = "addClass",
		$t = "_generatePosition",
		Jt = "outerWidth",
		Kt = "refreshContainers",
		Qt = "_getItemsAsjQuery",
		Gt = "deactivate",
		Yt = "paddingTop",
		Zt = "beforeStop",
		en = "_refreshItems",
		tn = "_getParentOffset",
		nn = "storedStylesheet",
		rn = "toleranceElement",
		sn = "remove",
		on = "forceHelperSize",
		un = "tolerance",
		an = "direction",
		fn = "prepareOffsets",
		ln = "widgetFullName",
		cn = "call",
		hn = "receive",
		pn = "style",
		dn = "colspan",
		vn = "dragging";
	e.widget("ui.sortable", e.ui.mouse, {
		version: "1.10.3",
		widgetEventPrefix: "sort",
		ready: d,
		options: {
			appendTo: k,
			axis: d,
			connectWith: d,
			containment: d,
			cursor: wt,
			cursorAt: d,
			dropOnEmpty: U,
			forcePlaceholderSize: d,
			forceHelperSize: d,
			grid: d,
			handle: d,
			helper: dt,
			items: "> *",
			opacity: d,
			placeholder: d,
			revert: d,
			scroll: U,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1e3,
			activate: N,
			beforeStop: N,
			change: N,
			deactivate: N,
			out: N,
			over: N,
			receive: N,
			remove: N,
			sort: N,
			start: N,
			stop: N,
			update: N
		},
		_create: function() {
			var e = this[s];
			this[l] = {}, this[m][Vt]("ui-sortable"), this.refresh(), this[Q] = this[E][x] ? e.axis === "x" || gn(this[E][0][et]) : d, this[o] = this[m][o](), this._mouseInit(), this.ready = U
		},
		_destroy: function() {
			this[m][rt]("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
			for (var e = this[E][x] - 1; e >= 0; e--) this[E][e][et].removeData(this[J] + mt);
			return this
		},
		_setOption: function(t, n) {
			t === pt ? (this[s][t] = n, this.widget().toggleClass("ui-sortable-disabled", !!n)) : e.Widget.prototype._setOption.apply(this, arguments)
		},
		_mouseCapture: function(t, r) {
			var i = N,
				o = d,
				u = this;
			if (this[Ht]) return d;
			if (this[s][pt] || this[s].type === "static") return d;
			this[en](t), e(t.target).parents().each(function() {
				if (e.data(this, u[J] + mt) === u) return i = e(this), d
			}), e.data(t.target, u[J] + mt) === u && (i = e(t.target));
			if (!i) return d;
			if (this[s].handle && !r) {
				e(this[s].handle, i).find("*").addBack().each(function() {
					this === t.target && (o = U)
				});
				if (!o) return d
			}
			return this[n] = i, this._removeCurrentsFromItems(), U
		},
		_mouseStart: function(t, a, f) {
			var l, c, d = this[s];
			this[v] = this, this[tt](), this[h] = this._createHelper(t), this[vt](), this._cacheMargins(), this[r] = this[h][r](), this[o] = this[n][o](), this[o] = {
				top: this[o][L] - this[O][L],
				left: this[o][p] - this[O][p]
			}, e.extend(this[o], {
				click: {
					left: t[ct] - this[o][p],
					top: t[lt] - this[o][L]
				},
				parent: this[tn](),
				relative: this[jt]()
			}), this[h].css(j, B), this[A] = this[h].css(j), this[ft] = this[$t](t), this[Tt] = t[ct], this[St] = t[lt], d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt), this[X] = {
				prev: this[n].prev()[0],
				parent: this[n][k]()[0]
			}, this[h][0] !== this[n][0] && this[n].hide(), this._createPlaceholder(), d[u] && this._setContainment(), d[ot] && d[ot] !== wt && (c = this[V].find(It), this[Nt] = c.css(ot), c.css(ot, d[ot]), this[nn] = e("<style>*{ cursor: " + d[ot] + " !important; }</style>")[qt](c)), d[Y] && (this[h].css(Y) && (this[gt] = this[h].css(Y)), this[h].css(Y, d[Y])), d[ut] && (this[h].css(ut) && (this[nt] = this[h].css(ut)), this[h].css(ut, d[ut])), this[r][0] !== document && this[r][0][bt] !== "HTML" && (this[R] = this[r][o]()), this[b]("start", t, this[T]()), this._preserveHelperProportions || this[vt]();
			if (!f)
				for (l = this[i][x] - 1; l >= 0; l--) this[i][l][b]("activate", t, this[T](this));
			return e.ui[D] && (e.ui[D].current = this), e.ui[D] && !d[Et] && e.ui[D][fn](this, t), this[vn] = U, this[h][Vt](M), this._mouseDrag(t), U
		},
		_mouseDrag: function(t) {
			var i, o, u, f, l = this[s],
				c = d;
			this[j] = this[$t](t), this[g] = this[zt](B), this[I] || (this[I] = this[g]), this[s].scroll && (this[r][0] !== document && this[r][0][bt] !== "HTML" ? (this[R][L] + this[r][0][Ct] - t[lt] < l[w] ? this[r][0][S] = c = this[r][0][S] + l[_] : t[lt] - this[R][L] < l[w] && (this[r][0][S] = c = this[r][0][S] - l[_]), this[R][p] + this[r][0][Ot] - t[ct] < l[w] ? this[r][0][y] = c = this[r][0][y] + l[_] : t[ct] - this[R][p] < l[w] && (this[r][0][y] = c = this[r][0][y] - l[_])) : (t[lt] - e(document)[S]() < l[w] ? c = e(document)[S](e(document)[S]() - l[_]) : e(window)[C]() - (t[lt] - e(document)[S]()) < l[w] && (c = e(document)[S](e(document)[S]() + l[_])), t[ct] - e(document)[y]() < l[w] ? c = e(document)[y](e(document)[y]() - l[_]) : e(window)[H]() - (t[ct] - e(document)[y]()) < l[w] && (c = e(document)[y](e(document)[y]() + l[_]))), c !== d && e.ui[D] && !l[Et] && e.ui[D][fn](this, t)), this[g] = this[zt](B);
			if (!this[s].axis || this[s].axis !== "y") this[h][0][pn][p] = this[j][p] + "px";
			if (!this[s].axis || this[s].axis !== "x") this[h][0][pn][L] = this[j][L] + "px";
			for (i = this[E][x] - 1; i >= 0; i--) {
				o = this[E][i], u = o[et][0], f = this._intersectsWithPointer(o);
				if (!f) continue;
				if (o.instance !== this[v]) continue;
				if (u !== this[n][0] && this[a][f === 1 ? "next" : "prev"]()[0] !== u && !e[$](this[a][0], u) && (this[s].type === "semi-dynamic" ? !e[$](this[m][0], u) : U)) {
					this[an] = f === 1 ? at : "up";
					if (this[s][un] !== Lt && !this._intersectsWithSides(o)) break;
					this[Xt](t, o), this[b](Rt, t, this[T]());
					break
				}
			}
			return this._contactContainers(t), e.ui[D] && e.ui[D].drag(this, t), this[b]("sort", t, this[T]()), this[I] = this[g], d
		},
		_mouseStop: function(t, n) {
			if (!t) return;
			e.ui[D] && !this[s][Et] && e.ui[D].drop(this, t);
			if (this[s].revert) {
				var r = this,
					i = this[a][o](),
					u = this[s].axis,
					f = {};
				if (!u || u === "x") f[p] = i[p] - this[o][k][p] - this[O][p] + (this[c][0] === document[It] ? 0 : this[c][0][y]);
				if (!u || u === "y") f[L] = i[L] - this[o][k][L] - this[O][L] + (this[c][0] === document[It] ? 0 : this[c][0][S]);
				this[Ht] = U, e(this[h]).animate(f, parseInt(this[s].revert, 10) || 500, function() {
					r._clear(t)
				})
			} else this._clear(t, n);
			return d
		},
		cancel: function() {
			if (this[vn]) {
				this._mouseUp({
					target: N
				}), this[s][h] === dt ? this[n].css(this[z])[rt](M) : this[n].show();
				for (var t = this[i][x] - 1; t >= 0; t--) this[i][t][b](Gt, N, this[T](this)), this[i][t][l][_t] && (this[i][t][b]("out", N, this[T](this)), this[i][t][l][_t] = 0)
			}
			return this[a] && (this[a][0][F] && this[a][0][F].removeChild(this[a][0]), this[s][h] !== dt && this[h] && this[h][0][F] && this[h][sn](), e.extend(this, {
				helper: N,
				dragging: d,
				reverting: d,
				_noFinalSort: N
			}), this[X].prev ? e(this[X].prev).after(this[n]) : e(this[X][k]).prepend(this[n])), this
		},
		serialize: function(t) {
			var n = this[Qt](t && t.connected),
				r = [];
			return t = t || {}, e(n).each(function() {
				var n = (e(t[et] || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
				n && r[Ut]((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] : n[2]))
			}), !r[x] && t.key && r[Ut](t.key + "="), r.join("&")
		},
		toArray: function(t) {
			var n = this[Qt](t && t.connected),
				r = [];
			return t = t || {}, n.each(function() {
				r[Ut](e(t[et] || this).attr(t.attribute || "id") || "")
			}), r
		},
		_intersectsWith: function(e) {
			var t = this[g][p],
				n = t + this[f][H],
				r = this[g][L],
				i = r + this[f][C],
				u = e[p],
				a = u + e[H],
				l = e[L],
				c = l + e[C],
				h = this[o][P][L],
				d = this[o][P][p],
				v = this[s].axis === "x" || r + h > l && r + h < c,
				m = this[s].axis === "y" || t + d > u && t + d < a,
				y = v && m;
			return this[s][un] === Lt || this[s].forcePointerForContainers || this[s][un] !== Lt && this[f][this[Q] ? H : C] > e[this[Q] ? H : C] ? y : u < t + this[f][H] / 2 && n - this[f][H] / 2 < a && l < r + this[f][C] / 2 && i - this[f][C] / 2 < c
		},
		_intersectsWithPointer: function(e) {
			var t = this[s].axis === "x" || mn(this[g][L] + this[o][P][L], e[L], e[C]),
				n = this[s].axis === "y" || mn(this[g][p] + this[o][P][p], e[p], e[H]),
				r = t && n,
				i = this[yt](),
				u = this[ht]();
			return r ? this[Q] ? u && u === xt || i === at ? 2 : 1 : i && (i === at ? 2 : 1) : d
		},
		_intersectsWithSides: function(e) {
			var t = mn(this[g][L] + this[o][P][L], e[L] + e[C] / 2, e[C]),
				n = mn(this[g][p] + this[o][P][p], e[p] + e[H] / 2, e[H]),
				r = this[yt](),
				i = this[ht]();
			return this[Q] && i ? i === xt && n || i === p && !n : r && (r === at && t || r === "up" && !t)
		},
		_getDragVerticalDirection: function() {
			var e = this[g][L] - this[I][L];
			return e !== 0 && (e > 0 ? at : "up")
		},
		_getDragHorizontalDirection: function() {
			var e = this[g][p] - this[I][p];
			return e !== 0 && (e > 0 ? xt : p)
		},
		refresh: function(e) {
			return this[en](e), this[tt](), this
		},
		_connectWith: function() {
			var e = this[s];
			return e[At].constructor === String ? [e[At]] : e[At]
		},
		_getItemsAsjQuery: function(t) {
			var r, i, o, u, a = [],
				f = [],
				l = this._connectWith();
			if (l && t)
				for (r = l[x] - 1; r >= 0; r--) {
					o = e(l[r]);
					for (i = o[x] - 1; i >= 0; i--) u = e.data(o[i], this[ln]), u && u !== this && !u[s][pt] && f[Ut]([e[it](u[s][E]) ? u[s][E][cn](u[m]) : e(u[s][E], u[m]).not(W).not(st), u])
				}
			f[Ut]([e[it](this[s][E]) ? this[s][E][cn](this[m], N, {
				options: this[s],
				item: this[n]
			}) : e(this[s][E], this[m]).not(W).not(st), this]);
			for (r = f[x] - 1; r >= 0; r--) f[r][0].each(function() {
				a[Ut](this)
			});
			return e(a)
		},
		_removeCurrentsFromItems: function() {
			var t = this[n].find(":data(" + this[J] + "-item)");
			this[E] = e.grep(this[E], function(e) {
				for (var n = 0; n < t[x]; n++)
					if (t[n] === e[et][0]) return d;
				return U
			})
		},
		_refreshItems: function(t) {
			this[E] = [], this[i] = [this];
			var r, o, u, a, f, l, c, h, p = this[E],
				d = [
					[e[it](this[s][E]) ? this[s][E][cn](this[m][0], t, {
						item: this[n]
					}) : e(this[s][E], this[m]), this]
				],
				v = this._connectWith();
			if (v && this.ready)
				for (r = v[x] - 1; r >= 0; r--) {
					u = e(v[r]);
					for (o = u[x] - 1; o >= 0; o--) a = e.data(u[o], this[ln]), a && a !== this && !a[s][pt] && (d[Ut]([e[it](a[s][E]) ? a[s][E][cn](a[m][0], t, {
						item: this[n]
					}) : e(a[s][E], a[m]), a]), this[i][Ut](a))
				}
			for (r = d[x] - 1; r >= 0; r--) {
				f = d[r][1], l = d[r][0];
				for (o = 0, h = l[x]; o < h; o++) c = e(l[o]), c.data(this[J] + mt, f), p[Ut]({
					item: c,
					instance: f,
					width: 0,
					height: 0,
					left: 0,
					top: 0
				})
			}
		},
		refreshPositions: function(t) {
			this[c] && this[h] && (this[o][k] = this[tn]());
			var r, u, a, f;
			for (r = this[E][x] - 1; r >= 0; r--) {
				u = this[E][r];
				if (u.instance !== this[v] && this[v] && u[et][0] !== this[n][0]) continue;
				a = this[s][rn] ? e(this[s][rn], u[et]) : u[et], t || (u[H] = a[Jt](), u[C] = a[Mt]()), f = a[o](), u[p] = f[p], u[L] = f[L]
			}
			if (this[s].custom && this[s].custom[Kt]) this[s].custom[Kt][cn](this);
			else
				for (r = this[i][x] - 1; r >= 0; r--) f = this[i][r][m][o](), this[i][r][l][p] = f[p], this[i][r][l][L] = f[L], this[i][r][l][H] = this[i][r][m][Jt](), this[i][r][l][C] = this[i][r][m][Mt]();
			return this
		},
		_createPlaceholder: function(t) {
			t = t || this;
			var r, i = t[s];
			if (!i[a] || i[a].constructor === String) r = i[a], i[a] = {
				element: function() {
					var i = t[n][0].nodeName.toLowerCase(),
						s = e("<" + i + ">", t[V][0])[Vt](r || t[n][0].className + " ui-sortable-placeholder")[rt](M);
					return i === "tr" ? t[n].children().each(function() {
						e("<td>&#160;</td>", t[V][0]).attr(dn, e(this).attr(dn) || 1)[qt](s)
					}) : i === "img" && s.attr("src", t[n].attr("src")), r || s.css("visibility", "hidden"), s
				},
				update: function(e, s) {
					if (r && !i.forcePlaceholderSize) return;
					s[C]() || s[C](t[n].innerHeight() - parseInt(t[n].css(Yt) || 0, 10) - parseInt(t[n].css(Dt) || 0, 10)), s[H]() || s[H](t[n].innerWidth() - parseInt(t[n].css(Wt) || 0, 10) - parseInt(t[n].css(Ft) || 0, 10))
				}
			};
			t[a] = e(i[a][m][cn](t[m], t[n])), t[n].after(t[a]), i[a][Bt](t, t[a])
		},
		_contactContainers: function(t) {
			var r, u, f, c, h, y, w, S, k, A, O = N,
				M = N;
			for (r = this[i][x] - 1; r >= 0; r--) {
				if (e[$](this[n][0], this[i][r][m][0])) continue;
				if (this._intersectsWith(this[i][r][l])) {
					if (O && e[$](this[i][r][m][0], O[m][0])) continue;
					O = this[i][r], M = r
				} else this[i][r][l][_t] && (this[i][r][b]("out", t, this[T](this)), this[i][r][l][_t] = 0)
			}
			if (!O) return;
			if (this[i][x] === 1) this[i][M][l][_t] || (this[i][M][b](_t, t, this[T](this)), this[i][M][l][_t] = 1);
			else {
				f = 1e4, c = N, A = O[Q] || gn(this[n]), h = A ? p : L, y = A ? H : C, w = this[g][h] + this[o][P][h];
				for (u = this[E][x] - 1; u >= 0; u--) {
					if (!e[$](this[i][M][m][0], this[E][u][et][0])) continue;
					if (this[E][u][et][0] === this[n][0]) continue;
					if (A && !mn(this[g][L] + this[o][P][L], this[E][u][L], this[E][u][C])) continue;
					S = this[E][u][et][o]()[h], k = d, Math.abs(S - w) > Math.abs(S + this[E][u][y] - w) && (k = U, S += this[E][u][y]), Math.abs(S - w) < f && (f = Math.abs(S - w), c = this[E][u], this[an] = k ? "up" : at)
				}
				if (!c && !this[s].dropOnEmpty) return;
				if (this[v] === this[i][M]) return;
				c ? this[Xt](t, c, N, U) : this[Xt](t, N, this[i][M][m], U), this[b](Rt, t, this[T]()), this[i][M][b](Rt, t, this[T](this)), this[v] = this[i][M], this[s][a][Bt](this[v], this[a]), this[i][M][b](_t, t, this[T](this)), this[i][M][l][_t] = 1
			}
		},
		_createHelper: function(t) {
			var r = this[s],
				i = e[it](r[h]) ? e(r[h].apply(this[m][0], [t, this[n]])) : r[h] === "clone" ? this[n].clone() : this[n];
			return i.parents(It)[x] || e(r[qt] !== k ? r[qt] : this[n][0][F])[0].appendChild(i[0]), i[0] === this[n][0] && (this[z] = {
				width: this[n][0][pn][H],
				height: this[n][0][pn][C],
				position: this[n].css(j),
				top: this[n].css(L),
				left: this[n].css(p)
			}), (!i[0][pn][H] || r[on]) && i[H](this[n][H]()), (!i[0][pn][C] || r[on]) && i[C](this[n][C]()), i
		},
		_adjustOffsetFromHelper: function(t) {
			typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
				left: +t[0],
				top: +t[1] || 0
			}), p in t && (this[o][P][p] = t[p] + this[O][p]), xt in t && (this[o][P][p] = this[f][H] - t[xt] + this[O][p]), L in t && (this[o][P][L] = t[L] + this[O][L]), "bottom" in t && (this[o][P][L] = this[f][C] - t.bottom + this[O][L])
		},
		_getParentOffset: function() {
			this[c] = this[h][c]();
			var t = this[c][o]();
			this[A] === B && this[r][0] !== document && e[$](this[r][0], this[c][0]) && (t[p] += this[r][y](), t[L] += this[r][S]());
			if (this[c][0] === document[It] || this[c][0][bt] && this[c][0][bt].toLowerCase() === "html" && e.ui.ie) t = {
				top: 0,
				left: 0
			};
			return {
				top: t[L] + (parseInt(this[c].css(Z), 10) || 0),
				left: t[p] + (parseInt(this[c].css(K), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if (this[A] === q) {
				var e = this[n][j]();
				return {
					top: e[L] - (parseInt(this[h].css(L), 10) || 0) + this[r][S](),
					left: e[p] - (parseInt(this[h].css(p), 10) || 0) + this[r][y]()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this[O] = {
				left: parseInt(this[n].css("marginLeft"), 10) || 0,
				top: parseInt(this[n].css("marginTop"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this[f] = {
				width: this[h][Jt](),
				height: this[h][Mt]()
			}
		},
		_setContainment: function() {
			var t, n, r, i = this[s];
			i[u] === k && (i[u] = this[h][0][F]);
			if (i[u] === V || i[u] === "window") this[u] = [0 - this[o][q][p] - this[o][k][p], 0 - this[o][q][L] - this[o][k][L], e(i[u] === V ? document : window)[H]() - this[f][H] - this[O][p], (e(i[u] === V ? document : window)[C]() || document[It][F].scrollHeight) - this[f][C] - this[O][L]];
			/^(document|window|parent)$/.test(i[u]) || (t = e(i[u])[0], n = e(i[u])[o](), r = e(t).css("overflow") !== "hidden", this[u] = [n[p] + (parseInt(e(t).css(K), 10) || 0) + (parseInt(e(t).css(Wt), 10) || 0) - this[O][p], n[L] + (parseInt(e(t).css(Z), 10) || 0) + (parseInt(e(t).css(Yt), 10) || 0) - this[O][L], n[p] + (r ? Math.max(t.scrollWidth, t[Ot]) : t[Ot]) - (parseInt(e(t).css(K), 10) || 0) - (parseInt(e(t).css(Ft), 10) || 0) - this[f][H] - this[O][p], n[L] + (r ? Math.max(t.scrollHeight, t[Ct]) : t[Ct]) - (parseInt(e(t).css(Z), 10) || 0) - (parseInt(e(t).css(Dt), 10) || 0) - this[f][C] - this[O][L]])
		},
		_convertPositionTo: function(t, n) {
			n || (n = this[j]);
			var i = t === B ? 1 : -1,
				s = this[A] !== B || this[r][0] !== document && !!e[$](this[r][0], this[c][0]) ? this[r] : this[c],
				u = /(html|body)/i.test(s[0][bt]);
			return {
				top: n[L] + this[o][q][L] * i + this[o][k][L] * i - (this[A] === kt ? -this[r][S]() : u ? 0 : s[S]()) * i,
				left: n[p] + this[o][q][p] * i + this[o][k][p] * i - (this[A] === kt ? -this[r][y]() : u ? 0 : s[y]()) * i
			}
		},
		_generatePosition: function(t) {
			var n, i, a = this[s],
				f = t[ct],
				l = t[lt],
				h = this[A] !== B || this[r][0] !== document && !!e[$](this[r][0], this[c][0]) ? this[r] : this[c],
				d = /(html|body)/i.test(h[0][bt]);
			return this[A] === q && (this[r][0] === document || this[r][0] === this[c][0]) && (this[o][q] = this[jt]()), this[ft] && (this[u] && (t[ct] - this[o][P][p] < this[u][0] && (f = this[u][0] + this[o][P][p]), t[lt] - this[o][P][L] < this[u][1] && (l = this[u][1] + this[o][P][L]), t[ct] - this[o][P][p] > this[u][2] && (f = this[u][2] + this[o][P][p]), t[lt] - this[o][P][L] > this[u][3] && (l = this[u][3] + this[o][P][L])), a.grid && (n = this[St] + Math.round((l - this[St]) / a.grid[1]) * a.grid[1], l = this[u] ? n - this[o][P][L] >= this[u][1] && n - this[o][P][L] <= this[u][3] ? n : n - this[o][P][L] >= this[u][1] ? n - a.grid[1] : n + a.grid[1] : n, i = this[Tt] + Math.round((f - this[Tt]) / a.grid[0]) * a.grid[0], f = this[u] ? i - this[o][P][p] >= this[u][0] && i - this[o][P][p] <= this[u][2] ? i : i - this[o][P][p] >= this[u][0] ? i - a.grid[0] : i + a.grid[0] : i)), {
				top: l - this[o][P][L] - this[o][q][L] - this[o][k][L] + (this[A] === kt ? -this[r][S]() : d ? 0 : h[S]()),
				left: f - this[o][P][p] - this[o][q][p] - this[o][k][p] + (this[A] === kt ? -this[r][y]() : d ? 0 : h[y]())
			}
		},
		_rearrange: function(e, t, n, r) {
			n ? n[0].appendChild(this[a][0]) : t[et][0][F].insertBefore(this[a][0], this[an] === at ? t[et][0] : t[et][0].nextSibling), this[Pt] = this[Pt] ? ++this[Pt] : 1;
			var i = this[Pt];
			this._delay(function() {
				i === this[Pt] && this[tt](!r)
			})
		},
		_clear: function(e, t) {
			this[Ht] = d;
			var r, s = [];
			!this._noFinalSort && this[n][k]()[x] && this[a].before(this[n]), this._noFinalSort = N;
			if (this[h][0] === this[n][0]) {
				for (r in this[z])
					if (this[z][r] === wt || this[z][r] === "static") this[z][r] = "";
				this[n].css(this[z])[rt](M)
			} else this[n].show();
			this[G] && !t && s[Ut](function(e) {
				this[b](hn, e, this[T](this[G]))
			}), (this[G] || this[X].prev !== this[n].prev().not(W)[0] || this[X][k] !== this[n][k]()[0]) && !t && s[Ut](function(e) {
				this[b](Bt, e, this[T]())
			}), this !== this[v] && (t || (s[Ut](function(e) {
				this[b](sn, e, this[T]())
			}), s[Ut](function(e) {
				return function(t) {
					e[b](hn, t, this[T](this))
				}
			} [cn](this, this[v])), s[Ut](function(e) {
				return function(t) {
					e[b](Bt, t, this[T](this))
				}
			} [cn](this, this[v]))));
			for (r = this[i][x] - 1; r >= 0; r--) t || s[Ut](function(e) {
				return function(t) {
					e[b](Gt, t, this[T](this))
				}
			} [cn](this, this[i][r])), this[i][r][l][_t] && (s[Ut](function(e) {
				return function(t) {
					e[b]("out", t, this[T](this))
				}
			} [cn](this, this[i][r])), this[i][r][l][_t] = 0);
			this[Nt] && (this[V].find(It).css(ot, this[Nt]), this[nn][sn]()), this[gt] && this[h].css(Y, this[gt]), this[nt] && this[h].css(ut, this[nt] === wt ? "" : this[nt]), this[vn] = d;
			if (this.cancelHelperRemoval) {
				if (!t) {
					this[b](Zt, e, this[T]());
					for (r = 0; r < s[x]; r++) s[r][cn](this, e);
					this[b]("stop", e, this[T]())
				}
				return this[G] = d, d
			}
			t || this[b](Zt, e, this[T]()), this[a][0][F].removeChild(this[a][0]), this[h][0] !== this[n][0] && this[h][sn](), this[h] = N;
			if (!t) {
				for (r = 0; r < s[x]; r++) s[r][cn](this, e);
				this[b]("stop", e, this[T]())
			}
			return this[G] = d, U
		},
		_trigger: function() {
			e.Widget.prototype[b].apply(this, arguments) === d && this.cancel()
		},
		_uiHash: function(t) {
			var r = t || this;
			return {
				helper: r[h],
				placeholder: r[a] || e([]),
				position: r[j],
				originalPosition: r[ft],
				offset: r[g],
				item: r[n],
				sender: t ? t[m] : N
			}
		}
	})
}(jQuery),
function(e, t) {
	var n = null,
		r = "transparent",
		i = "_rgba",
		s = "effects",
		o = "animateClass",
		u = "string",
		a = "cache",
		f = !0,
		l = "backgroundColor",
		c = "extend",
		h = "complete",
		p = "isFunction",
		d = "object",
		v = "length",
		m = "call",
		g = "each",
		y = "toggle",
		b = ".ui-effects-wrapper",
		w = "effect",
		E = "percent",
		S = "rgba",
		x = "apply",
		T = "slice",
		N = "relative",
		C = !1,
		k = "array",
		L = "props",
		A = "_default",
		O = "alpha",
		M = "style",
		_ = "css",
		D = "hsla",
		P = "number",
		H = "byte",
		B = "Color",
		j = "cssHooks",
		F = "type",
		I = "#ffffff",
		q = "show",
		R = "speeds",
		U = "parent",
		z = "hide",
		W = "auto",
		X = "position",
		V = "boolean",
		$ = ":hidden",
		J = "ownerDocument",
		K = "duration",
		Q = "activeElement",
		G = "ui-effects-";
	e[s] = {
			effect: {}
		},
		function(e, t) {
			function q(e, t, r) {
				var i = b[t[F]] || {};
				return e == n ? r || !t.def ? n : t.def : (e = i.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : i.mod ? (e + i.mod) % i.mod : 0 > e ? 0 : i.max < e ? i.max : e)
			}

			function R(t) {
				var n = p(),
					s = n[i] = [];
				return t = t.toLowerCase(), P(h, function(e, r) {
					var o, u = r.re.exec(t),
						f = u && r.parse(u),
						l = r.space || S;
					if (f) return o = n[l](f), n[y[l][a]] = o[y[l][a]], s = n[i] = o[i], C
				}), s[v] ? (s.join() === "0,0,0,0" && e[c](s, N[r]), n) : N[t]
			}

			function U(e, t, n) {
				return n = (n + 1) % 1, n * 6 < 1 ? e + (t - e) * n * 6 : n * 2 < 1 ? t : n * 3 < 2 ? e + (t - e) * (2 / 3 - n) * 6 : e
			}
			var s = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
				o = /^([\-+])=\s*(\d+\.?\d*)/,
				h = [{
					re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					parse: function(e) {
						return [e[1], e[2], e[3], e[4]]
					}
				}, {
					re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					parse: function(e) {
						return [e[1] * 2.55, e[2] * 2.55, e[3] * 2.55, e[4]]
					}
				}, {
					re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
					parse: function(e) {
						return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
					}
				}, {
					re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
					parse: function(e) {
						return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
					}
				}, {
					re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					space: D,
					parse: function(e) {
						return [e[1], e[2] / 100, e[3] / 100, e[4]]
					}
				}],
				p = e[B] = function(t, n, r, i) {
					return new e[B].fn.parse(t, n, r, i)
				},
				y = {
					rgba: {
						props: {
							red: {
								idx: 0,
								type: H
							},
							green: {
								idx: 1,
								type: H
							},
							blue: {
								idx: 2,
								type: H
							}
						}
					},
					hsla: {
						props: {
							hue: {
								idx: 0,
								type: "degrees"
							},
							saturation: {
								idx: 1,
								type: E
							},
							lightness: {
								idx: 2,
								type: E
							}
						}
					}
				},
				b = {
					"byte": {
						floor: f,
						max: 255
					},
					percent: {
						max: 1
					},
					degrees: {
						mod: 360,
						floor: f
					}
				},
				w = p.support = {},
				x = e("<p>")[0],
				N, P = e[g];
			x[M].cssText = "background-color:rgba(1,1,1,.5)", w[S] = x[M][l].indexOf(S) > -1, P(y, function(e, t) {
				t[a] = "_" + e, t[L][O] = {
					idx: 3,
					type: E,
					def: 1
				}
			}), p.fn = e[c](p.prototype, {
				parse: function(r, s, o, l) {
					if (r === t) return this[i] = [n, n, n, n], this;
					if (r.jquery || r.nodeType) r = e(r)[_](s), s = t;
					var c = this,
						h = e[F](r),
						v = this[i] = [];
					s !== t && (r = [r, s, o, l], h = k);
					if (h === u) return this.parse(R(r) || N[A]);
					if (h === k) return P(y[S][L], function(e, t) {
						v[t.idx] = q(r[t.idx], t)
					}), this;
					if (h === d) return r instanceof p ? P(y, function(e, t) {
						r[t[a]] && (c[t[a]] = r[t[a]][T]())
					}) : P(y, function(t, s) {
						var o = s[a];
						P(s[L], function(e, t) {
							if (!c[o] && s.to) {
								if (e === O || r[e] == n) return;
								c[o] = s.to(c[i])
							}
							c[o][t.idx] = q(r[e], t, f)
						}), c[o] && e.inArray(n, c[o][T](0, 3)) < 0 && (c[o][3] = 1, s.from && (c[i] = s.from(c[o])))
					}), this
				},
				is: function(e) {
					var t = p(e),
						r = f,
						s = this;
					return P(y, function(e, o) {
						var u, f = t[o[a]];
						return f && (u = s[o[a]] || o.to && o.to(s[i]) || [], P(o[L], function(e, t) {
							if (f[t.idx] != n) return r = f[t.idx] === u[t.idx], r
						})), r
					}), r
				},
				_space: function() {
					var e = [],
						t = this;
					return P(y, function(n, r) {
						t[r[a]] && e.push(n)
					}), e.pop()
				},
				transition: function(e, t) {
					var s = p(e),
						o = s._space(),
						u = y[o],
						f = this[O]() === 0 ? p(r) : this,
						l = f[u[a]] || u.to(f[i]),
						c = l[T]();
					return s = s[u[a]], P(u[L], function(e, r) {
						var i = r.idx,
							o = l[i],
							u = s[i],
							a = b[r[F]] || {};
						if (u === n) return;
						o === n ? c[i] = u : (a.mod && (u - o > a.mod / 2 ? o += a.mod : o - u > a.mod / 2 && (o -= a.mod)), c[i] = q((u - o) * t + o, r))
					}), this[o](c)
				},
				blend: function(t) {
					if (this[i][3] === 1) return this;
					var n = this[i][T](),
						r = n.pop(),
						s = p(t)[i];
					return p(e.map(n, function(e, t) {
						return (1 - r) * s[t] + r * e
					}))
				},
				toRgbaString: function() {
					var t = "rgba(",
						r = e.map(this[i], function(e, t) {
							return e == n ? t > 2 ? 1 : 0 : e
						});
					return r[3] === 1 && (r.pop(), t = "rgb("), t + r.join() + ")"
				},
				toHslaString: function() {
					var t = "hsla(",
						r = e.map(this[D](), function(e, t) {
							return e == n && (e = t > 2 ? 1 : 0), t && t < 3 && (e = Math.round(e * 100) + "%"), e
						});
					return r[3] === 1 && (r.pop(), t = "hsl("), t + r.join() + ")"
				},
				toHexString: function(t) {
					var n = this[i][T](),
						r = n.pop();
					return t && n.push(~~(r * 255)), "#" + e.map(n, function(e) {
						return e = (e || 0).toString(16), e[v] === 1 ? "0" + e : e
					}).join("")
				},
				toString: function() {
					return this[i][3] === 0 ? r : this.toRgbaString()
				}
			}), p.fn.parse.prototype = p.fn, y[D].to = function(e) {
				if (e[0] == n || e[1] == n || e[2] == n) return [n, n, n, e[3]];
				var t = e[0] / 255,
					r = e[1] / 255,
					i = e[2] / 255,
					s = e[3],
					o = Math.max(t, r, i),
					u = Math.min(t, r, i),
					a = o - u,
					f = o + u,
					l = f * .5,
					c, h;
				return u === o ? c = 0 : t === o ? c = 60 * (r - i) / a + 360 : r === o ? c = 60 * (i - t) / a + 120 : c = 60 * (t - r) / a + 240, a === 0 ? h = 0 : l <= .5 ? h = a / f : h = a / (2 - f), [Math.round(c) % 360, h, l, s == n ? 1 : s]
			}, y[D].from = function(e) {
				if (e[0] == n || e[1] == n || e[2] == n) return [n, n, n, e[3]];
				var t = e[0] / 360,
					r = e[1],
					i = e[2],
					s = e[3],
					o = i <= .5 ? i * (1 + r) : i + r - i * r,
					u = 2 * i - o;
				return [Math.round(U(u, o, t + 1 / 3) * 255), Math.round(U(u, o, t) * 255), Math.round(U(u, o, t - 1 / 3) * 255), s]
			}, P(y, function(r, s) {
				var f = s[L],
					l = s[a],
					c = s.to,
					h = s.from;
				p.fn[r] = function(r) {
					c && !this[l] && (this[l] = c(this[i]));
					if (r === t) return this[l][T]();
					var s, o = e[F](r),
						u = o === k || o === d ? r : arguments,
						a = this[l][T]();
					return P(f, function(e, t) {
						var r = u[o === d ? e : t.idx];
						r == n && (r = a[t.idx]), a[t.idx] = q(r, t)
					}), h ? (s = p(h(a)), s[l] = a, s) : p(a)
				}, P(f, function(t, i) {
					if (p.fn[t]) return;
					p.fn[t] = function(s) {
						var a = e[F](s),
							f = t === O ? this._hsla ? D : S : r,
							l = this[f](),
							c = l[i.idx],
							h;
						return a === "undefined" ? c : (a === "function" && (s = s[m](this, c), a = e[F](s)), s == n && i.empty ? this : (a === u && (h = o.exec(s), h && (s = c + parseFloat(h[2]) * (h[1] === "+" ? 1 : -1))), l[i.idx] = s, this[f](l)))
					}
				})
			}), p.hook = function(t) {
				var n = t.split(" ");
				P(n, function(t, n) {
					e[j][n] = {
						set: function(t, s) {
							var o, a, f = "";
							if (s !== r && (e[F](s) !== u || (o = R(s)))) {
								s = p(o || s);
								if (!w[S] && s[i][3] !== 1) {
									a = n === l ? t.parentNode : t;
									while ((f === "" || f === r) && a && a[M]) try {
										f = e[_](a, l), a = a.parentNode
									} catch (c) {}
									s = s.blend(f && f !== r ? f : A)
								}
								s = s.toRgbaString()
							}
							try {
								t[M][n] = s
							} catch (c) {}
						}
					}, e.fx.step[n] = function(t) {
						t.colorInit || (t.start = p(t.elem, n), t.end = p(t.end), t.colorInit = f), e[j][n].set(t.elem, t.start.transition(t.end, t.pos))
					}
				})
			}, p.hook(s), e[j].borderColor = {
				expand: function(e) {
					var t = {};
					return P(["Top", "Right", "Bottom", "Left"], function(n, r) {
						t["border" + r + B] = e
					}), t
				}
			}, N = e[B].names = {
				aqua: "#00ffff",
				black: "#000000",
				blue: "#0000ff",
				fuchsia: "#ff00ff",
				gray: "#808080",
				green: "#008000",
				lime: "#00ff00",
				maroon: "#800000",
				navy: "#000080",
				olive: "#808000",
				purple: "#800080",
				red: "#ff0000",
				silver: "#c0c0c0",
				teal: "#008080",
				white: I,
				yellow: "#ffff00",
				transparent: [n, n, n, 0],
				_default: I
			}
		}(jQuery),
		function() {
			function a(t) {
				var r, i, s = t[J].defaultView ? t[J].defaultView.getComputedStyle(t, n) : t.currentStyle,
					o = {};
				if (s && s[v] && s[0] && s[s[0]]) {
					i = s[v];
					while (i--) r = s[i], typeof s[r] === u && (o[e.camelCase(r)] = s[r])
				} else
					for (r in s) typeof s[r] === u && (o[r] = s[r]);
				return o
			}

			function l(t, n) {
				var r = {},
					s, o;
				for (s in n) o = n[s], t[s] !== o && !i[s] && (e.fx.step[s] || !isNaN(parseFloat(o))) && (r[s] = o);
				return r
			}
			var r = ["add", "remove", y],
				i = {
					border: 1,
					borderBottom: 1,
					borderColor: 1,
					borderLeft: 1,
					borderRight: 1,
					borderTop: 1,
					borderWidth: 1,
					margin: 1,
					padding: 1
				};
			e[g](["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, n) {
				e.fx.step[n] = function(e) {
					if (e.end !== "none" && !e.setAttr || e.pos === 1 && !e.setAttr) jQuery[M](e.elem, n, e.end), e.setAttr = f
				}
			}), e.fn.addBack || (e.fn.addBack = function(e) {
				return this.add(e == n ? this.prevObject : this.prevObject.filter(e))
			}), e[s][o] = function(t, n, i, s) {
				var o = e.speed(n, i, s);
				return this.queue(function() {
					var n = e(this),
						i = n.attr("class") || "",
						s, u = o.children ? n.find("*").addBack() : n;
					u = u.map(function() {
						var t = e(this);
						return {
							el: t,
							start: a(this)
						}
					}), s = function() {
						e[g](r, function(e, r) {
							t[r] && n[r + "Class"](t[r])
						})
					}, s(), u = u.map(function() {
						return this.end = a(this.el[0]), this.diff = l(this.start, this.end), this
					}), n.attr("class", i), u = u.map(function() {
						var t = this,
							n = e.Deferred(),
							r = e[c]({}, o, {
								queue: C,
								complete: function() {
									n.resolve(t)
								}
							});
						return this.el.animate(this.diff, r), n.promise()
					}), e.when[x](e, u.get()).done(function() {
						s(), e[g](arguments, function() {
							var t = this.el;
							e[g](this.diff, function(e) {
								t[_](e, "")
							})
						}), o[h][m](n[0])
					})
				})
			}, e.fn[c]({
				addClass: function(t) {
					return function(n, r, i, u) {
						return r ? e[s][o][m](this, {
							add: n
						}, r, i, u) : t[x](this, arguments)
					}
				}(e.fn.addClass),
				removeClass: function(t) {
					return function(n, r, i, u) {
						return arguments[v] > 1 ? e[s][o][m](this, {
							remove: n
						}, r, i, u) : t[x](this, arguments)
					}
				}(e.fn.removeClass),
				toggleClass: function(n) {
					return function(r, i, u, a, f) {
						return typeof i === V || i === t ? u ? e[s][o][m](this, i ? {
							add: r
						} : {
							remove: r
						}, u, a, f) : n[x](this, arguments) : e[s][o][m](this, {
							toggle: r
						}, i, u, a)
					}
				}(e.fn.toggleClass),
				switchClass: function(t, n, r, i, u) {
					return e[s][o][m](this, {
						add: n,
						remove: t
					}, r, i, u)
				}
			})
		}(),
		function() {
			function i(t, r, i, s) {
				e.isPlainObject(t) && (r = t, t = t[w]), t = {
					effect: t
				}, r == n && (r = {}), e[p](r) && (s = r, i = n, r = {});
				if (typeof r === P || e.fx[R][r]) s = i, i = r, r = {};
				return e[p](i) && (s = i, i = n), r && e[c](t, r), i = i || r[K], t[K] = e.fx.off ? 0 : typeof i === P ? i : i in e.fx[R] ? e.fx[R][i] : e.fx[R][A], t[h] = s || r[h], t
			}

			function o(t) {
				return !t || typeof t === P || e.fx[R][t] ? f : typeof t === u && !e[s][w][t] ? f : e[p](t) ? f : typeof t === d && !t[w] ? f : C
			}
			e[c](e[s], {
				version: "1.10.3",
				save: function(e, t) {
					for (var r = 0; r < t[v]; r++) t[r] !== n && e.data(G + t[r], e[0][M][t[r]])
				},
				restore: function(e, r) {
					var i, s;
					for (s = 0; s < r[v]; s++) r[s] !== n && (i = e.data(G + r[s]), i === t && (i = ""), e[_](r[s], i))
				},
				setMode: function(e, t) {
					return t === y && (t = e.is($) ? q : z), t
				},
				getBaseline: function(e, t) {
					var n, r;
					switch (e[0]) {
						case "top":
							n = 0;
							break;
						case "middle":
							n = .5;
							break;
						case "bottom":
							n = 1;
							break;
						default:
							n = e[0] / t.height
					}
					switch (e[1]) {
						case "left":
							r = 0;
							break;
						case "center":
							r = .5;
							break;
						case "right":
							r = 1;
							break;
						default:
							r = e[1] / t.width
					}
					return {
						x: r,
						y: n
					}
				},
				createWrapper: function(t) {
					if (t[U]().is(b)) return t[U]();
					var n = {
							width: t.outerWidth(f),
							height: t.outerHeight(f),
							"float": t[_]("float")
						},
						i = e("<div></div>").addClass("ui-effects-wrapper")[_]({
							fontSize: "100%",
							background: r,
							border: "none",
							margin: 0,
							padding: 0
						}),
						s = {
							width: t.width(),
							height: t.height()
						},
						o = document[Q];
					try {
						o.id
					} catch (u) {
						o = document.body
					}
					return t.wrap(i), (t[0] === o || e.contains(t[0], o)) && e(o).focus(), i = t[U](), t[_](X) === "static" ? (i[_]({
						position: N
					}), t[_]({
						position: N
					})) : (e[c](n, {
						position: t[_](X),
						zIndex: t[_]("z-index")
					}), e[g](["top", "left", "bottom", "right"], function(e, r) {
						n[r] = t[_](r), isNaN(parseInt(n[r], 10)) && (n[r] = W)
					}), t[_]({
						position: N,
						top: 0,
						left: 0,
						right: W,
						bottom: W
					})), t[_](s), i[_](n)[q]()
				},
				removeWrapper: function(t) {
					var n = document[Q];
					return t[U]().is(b) && (t[U]().replaceWith(t), (t[0] === n || e.contains(t[0], n)) && e(n).focus()), t
				},
				setTransition: function(t, n, r, i) {
					return i = i || {}, e[g](n, function(e, n) {
						var s = t.cssUnit(n);
						s[0] > 0 && (i[n] = s[0] * r + s[1])
					}), i
				}
			}), e.fn[c]({
				effect: function() {
					function u(n) {
						function u() {
							e[p](i) && i[m](r[0]), e[p](n) && n()
						}
						var r = e(this),
							i = t[h],
							s = t.mode;
						(r.is($) ? s === z : s === q) ? (r[s](), u()) : o[m](r[0], t, u)
					}
					var t = i[x](this, arguments),
						n = t.mode,
						r = t.queue,
						o = e[s][w][t[w]];
					return e.fx.off || !o ? n ? this[n](t[K], t[h]) : this[g](function() {
						t[h] && t[h][m](this)
					}) : r === C ? this[g](u) : this.queue(r || "fx", u)
				},
				show: function(e) {
					return function(t) {
						if (o(t)) return e[x](this, arguments);
						var n = i[x](this, arguments);
						return n.mode = q, this[w][m](this, n)
					}
				}(e.fn[q]),
				hide: function(e) {
					return function(t) {
						if (o(t)) return e[x](this, arguments);
						var n = i[x](this, arguments);
						return n.mode = z, this[w][m](this, n)
					}
				}(e.fn[z]),
				toggle: function(e) {
					return function(t) {
						if (o(t) || typeof t === V) return e[x](this, arguments);
						var n = i[x](this, arguments);
						return n.mode = y, this[w][m](this, n)
					}
				}(e.fn[y]),
				cssUnit: function(t) {
					var n = this[_](t),
						r = [];
					return e[g](["em", "px", "%", "pt"], function(e, t) {
						n.indexOf(t) > 0 && (r = [parseFloat(n), t])
					}), r
				}
			})
		}(),
		function() {
			var t = {};
			e[g](["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, n) {
				t[n] = function(t) {
					return Math.pow(t, e + 2)
				}
			}), e[c](t, {
				Sine: function(e) {
					return 1 - Math.cos(e * Math.PI / 2)
				},
				Circ: function(e) {
					return 1 - Math.sqrt(1 - e * e)
				},
				Elastic: function(e) {
					return e === 0 || e === 1 ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin(((e - 1) * 80 - 7.5) * Math.PI / 15)
				},
				Back: function(e) {
					return e * e * (3 * e - 2)
				},
				Bounce: function(e) {
					var t, n = 4;
					while (e < ((t = Math.pow(2, --n)) - 1) / 11);
					return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((t * 3 - 2) / 22 - e, 2)
				}
			}), e[g](t, function(t, n) {
				e.easing["easeIn" + t] = n, e.easing["easeOut" + t] = function(e) {
					return 1 - n(1 - e)
				}, e.easing["easeInOut" + t] = function(e) {
					return e < .5 ? n(e * 2) / 2 : 1 - n(e * -2 + 2) / 2
				}
			})
		}()
}(jQuery);