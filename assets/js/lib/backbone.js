(function() {
	var e = "attributes",
		t = !1,
		n = "extend",
		r = "trigger",
		i = "length",
		s = !0,
		o = "_previousAttributes",
		u = "prototype",
		a = "_wantsHashChange",
		f = "comparator",
		l = "collection",
		c = null,
		h = "_events",
		p = "replace",
		d = "apply",
		v = "_hasPushState",
		m = "getFragment",
		g = "models",
		y = "result",
		b = "location",
		w = "fragment",
		E = "callback",
		S = "success",
		x = "options",
		T = "emulateJSON",
		N = "history",
		C = "parse",
		k = "constructor",
		L = "sync",
		A = "object",
		O = "changed",
		M = "remove",
		_ = "_prepareModel",
		D = "defaults",
		P = "idAttribute",
		H = "checkUrl",
		B = "initialize",
		j = "_listeners",
		F = "undefined",
		I = "routes",
		q = "_wantsPushState",
		R = "clone",
		U = "_validate",
		z = "_changing",
		W = "silent",
		X = "isFunction",
		V = "iframe",
		$ = "pushState",
		J = "_pending",
		K = "_listenerId",
		Q = "emulateHTTP",
		G = ".delegateEvents",
		Y = "className",
		Z = "started",
		et = "getHash",
		tt = "patch",
		nt = "route",
		rt = "uniqueId",
		it = "Backbone",
		st = "_byId",
		ot = "_checkUrlInterval",
		ut = "undelegateEvents",
		at = "hashchange",
		ft = "_removeReference",
		lt = "PATCH",
		ct = "urlRoot",
		ht = "loadUrl",
		pt = "replaceState",
		dt = "reset",
		vt = "indexOf",
		mt = "model",
		gt = "delegateEvents",
		yt = "isEmpty",
		bt = "popstate",
		wt = "validate",
		Et = "destroy",
		St = "invalid",
		xt = "handlers",
		Tt = "navigate",
		Nt = "change:",
		Ct = "_onModelEvent",
		kt = "sort",
		Lt = "tagName",
		At = this,
		Ot = At[it],
		Mt = [],
		_t = Mt.push,
		Dt = Mt.slice,
		Pt = Mt.splice,
		Ht;
	typeof exports !== F ? Ht = exports : Ht = At[it] = {}, Ht.VERSION = "1.0.0";
	var Bt = At._;
	!Bt && typeof require !== F && (Bt = require("underscore")), Ht.$ = At.jQuery || At.Zepto || At.ender || At.$, Ht.noConflict = function() {
		return At[it] = Ot, this
	}, Ht[Q] = t, Ht[T] = t;
	var jt = Ht.Events = {
			on: function(e, t, n) {
				if (!It(this, "on", e, [t, n]) || !t) return this;
				this[h] || (this[h] = {});
				var r = this[h][e] || (this[h][e] = []);
				return r.push({
					callback: t,
					context: n,
					ctx: n || this
				}), this
			},
			once: function(e, t, n) {
				if (!It(this, "once", e, [t, n]) || !t) return this;
				var r = this,
					i = Bt.once(function() {
						r.off(e, i), t[d](this, arguments)
					});
				return i._callback = t, this.on(e, i, n)
			},
			off: function(e, t, n) {
				var r, s, o, u, a, f, l, c;
				if (!this[h] || !It(this, "off", e, [t, n])) return this;
				if (!e && !t && !n) return this[h] = {}, this;
				u = e ? [e] : Bt.keys(this[h]);
				for (a = 0, f = u[i]; a < f; a++) {
					e = u[a];
					if (o = this[h][e]) {
						this[h][e] = r = [];
						if (t || n)
							for (l = 0, c = o[i]; l < c; l++) s = o[l], (t && t !== s[E] && t !== s[E]._callback || n && n !== s.context) && r.push(s);
						r[i] || delete this[h][e]
					}
				}
				return this
			},
			trigger: function(e) {
				if (!this[h]) return this;
				var t = Dt.call(arguments, 1);
				if (!It(this, r, e, t)) return this;
				var n = this[h][e],
					i = this[h].all;
				return n && qt(n, t), i && qt(i, arguments), this
			},
			stopListening: function(e, t, n) {
				var r = this[j];
				if (!r) return this;
				var i = !t && !n;
				typeof t === A && (n = this), e && ((r = {})[e[K]] = e);
				for (var s in r) r[s].off(t, n, this), i && delete this[j][s];
				return this
			}
		},
		Ft = /\s+/,
		It = function(e, n, r, o) {
			if (!r) return s;
			if (typeof r === A) {
				for (var u in r) e[n][d](e, [u, r[u]].concat(o));
				return t
			}
			if (Ft.test(r)) {
				var a = r.split(Ft);
				for (var f = 0, l = a[i]; f < l; f++) e[n][d](e, [a[f]].concat(o));
				return t
			}
			return s
		},
		qt = function(e, t) {
			var n, r = -1,
				s = e[i],
				o = t[0],
				u = t[1],
				a = t[2];
			switch (t[i]) {
				case 0:
					while (++r < s)(n = e[r])[E].call(n.ctx);
					return;
				case 1:
					while (++r < s)(n = e[r])[E].call(n.ctx, o);
					return;
				case 2:
					while (++r < s)(n = e[r])[E].call(n.ctx, o, u);
					return;
				case 3:
					while (++r < s)(n = e[r])[E].call(n.ctx, o, u, a);
					return;
				default:
					while (++r < s)(n = e[r])[E][d](n.ctx, t)
			}
		},
		Rt = {
			listenTo: "on",
			listenToOnce: "once"
		};
	Bt.each(Rt, function(e, t) {
		jt[t] = function(t, n, r) {
			var i = this[j] || (this[j] = {}),
				s = t[K] || (t[K] = Bt[rt]("l"));
			return i[s] = t, typeof n === A && (r = this), t[e](n, r, this), this
		}
	}), jt.bind = jt.on, jt.unbind = jt.off, Bt[n](Ht, jt);
	var Ut = Ht.Model = function(t, r) {
			var i, s = t || {};
			r || (r = {}), this.cid = Bt[rt]("c"), this[e] = {}, Bt[n](this, Bt.pick(r, zt)), r[C] && (s = this[C](s, r) || {});
			if (i = Bt[y](this, D)) s = Bt[D]({}, s, i);
			this.set(s, r), this[O] = {}, this[B][d](this, arguments)
		},
		zt = ["url", ct, l];
	Bt[n](Ut[u], jt, {
		changed: c,
		validationError: c,
		idAttribute: "id",
		initialize: function() {},
		toJSON: function(t) {
			return Bt[R](this[e])
		},
		sync: function() {
			return Ht[L][d](this, arguments)
		},
		get: function(t) {
			return this[e][t]
		},
		escape: function(e) {
			return Bt.escape(this.get(e))
		},
		has: function(e) {
			return this.get(e) != c
		},
		set: function(n, u, a) {
			var f, l, h, p, d, v, m, g;
			if (n == c) return this;
			typeof n === A ? (l = n, a = u) : (l = {})[n] = u, a || (a = {});
			if (!this[U](l, a)) return t;
			h = a.unset, d = a[W], p = [], v = this[z], this[z] = s, v || (this[o] = Bt[R](this[e]), this[O] = {}), g = this[e], m = this[o], this[P] in l && (this.id = l[this[P]]);
			for (f in l) u = l[f], Bt.isEqual(g[f], u) || p.push(f), Bt.isEqual(m[f], u) ? delete this[O][f] : this[O][f] = u, h ? delete g[f] : g[f] = u;
			if (!d) {
				p[i] && (this[J] = s);
				for (var y = 0, b = p[i]; y < b; y++) this[r](Nt + p[y], this, g[p[y]], a)
			}
			if (v) return this;
			if (!d)
				while (this[J]) this[J] = t, this[r]("change", this, a);
			return this[J] = t, this[z] = t, this
		},
		unset: function(e, t) {
			return this.set(e, void 0, Bt[n]({}, t, {
				unset: s
			}))
		},
		clear: function(t) {
			var r = {};
			for (var i in this[e]) r[i] = void 0;
			return this.set(r, Bt[n]({}, t, {
				unset: s
			}))
		},
		hasChanged: function(e) {
			return e == c ? !Bt[yt](this[O]) : Bt.has(this[O], e)
		},
		changedAttributes: function(n) {
			if (!n) return this.hasChanged() ? Bt[R](this[O]) : t;
			var r, i = t,
				s = this[z] ? this[o] : this[e];
			for (var u in n) {
				if (Bt.isEqual(s[u], r = n[u])) continue;
				(i || (i = {}))[u] = r
			}
			return i
		},
		previous: function(e) {
			return e == c || !this[o] ? c : this[o][e]
		},
		previousAttributes: function() {
			return Bt[R](this[o])
		},
		fetch: function(e) {
			e = e ? Bt[R](e) : {}, e[C] === void 0 && (e[C] = s);
			var n = this,
				i = e[S];
			return e[S] = function(s) {
				if (!n.set(n[C](s, e), e)) return t;
				i && i(n, s, e), n[r](L, n, s, e)
			}, pn(this, e), this[L]("read", this, e)
		},
		save: function(i, o, u) {
			var a, f, l, h = this[e];
			i == c || typeof i === A ? (a = i, u = o) : (a = {})[i] = o;
			if (a && (!u || !u.wait) && !this.set(a, u)) return t;
			u = Bt[n]({
				validate: s
			}, u);
			if (!this[U](a, u)) return t;
			a && u.wait && (this[e] = Bt[n]({}, h, a)), u[C] === void 0 && (u[C] = s);
			var p = this,
				d = u[S];
			return u[S] = function(i) {
				p[e] = h;
				var s = p[C](i, u);
				u.wait && (s = Bt[n](a || {}, s));
				if (Bt.isObject(s) && !p.set(s, u)) return t;
				d && d(p, i, u), p[r](L, p, i, u)
			}, pn(this, u), f = this.isNew() ? "create" : u[tt] ? tt : "update", f === tt && (u.attrs = a), l = this[L](f, this, u), a && u.wait && (this[e] = h), l
		},
		destroy: function(e) {
			e = e ? Bt[R](e) : {};
			var n = this,
				i = e[S],
				s = function() {
					n[r](Et, n, n[l], e)
				};
			e[S] = function(t) {
				(e.wait || n.isNew()) && s(), i && i(n, t, e), n.isNew() || n[r](L, n, t, e)
			};
			if (this.isNew()) return e[S](), t;
			pn(this, e);
			var o = this[L]("delete", this, e);
			return e.wait || s(), o
		},
		url: function() {
			var e = Bt[y](this, ct) || Bt[y](this[l], "url") || hn();
			return this.isNew() ? e : e + (e.charAt(e[i] - 1) === "/" ? "" : "/") + encodeURIComponent(this.id)
		},
		parse: function(e, t) {
			return e
		},
		clone: function() {
			return new this[k](this[e])
		},
		isNew: function() {
			return this.id == c
		},
		isValid: function(e) {
			return this[U]({}, Bt[n](e || {}, {
				validate: s
			}))
		},
		_validate: function(i, o) {
			if (!o[wt] || !this[wt]) return s;
			i = Bt[n]({}, this[e], i);
			var u = this.validationError = this[wt](i, o) || c;
			return u ? (this[r](St, this, u, Bt[n](o || {}, {
				validationError: u
			})), t) : s
		}
	});
	var Wt = ["keys", "values", "pairs", "invert", "pick", "omit"];
	Bt.each(Wt, function(t) {
		Ut[u][t] = function() {
			var n = Dt.call(arguments);
			return n.unshift(this[e]), Bt[t][d](Bt, n)
		}
	});
	var Xt = Ht.Collection = function(e, t) {
			t || (t = {}), t.url && (this.url = t.url), t[mt] && (this[mt] = t[mt]), t[f] !== void 0 && (this[f] = t[f]), this._reset(), this[B][d](this, arguments), e && this[dt](e, Bt[n]({
				silent: s
			}, t))
		},
		Vt = {
			add: s,
			remove: s,
			merge: s
		},
		$t = {
			add: s,
			merge: t,
			remove: t
		};
	Bt[n](Xt[u], jt, {
		model: Ut,
		initialize: function() {},
		toJSON: function(e) {
			return this.map(function(t) {
				return t.toJSON(e)
			})
		},
		sync: function() {
			return Ht[L][d](this, arguments)
		},
		add: function(e, t) {
			return this.set(e, Bt[D](t || {}, $t))
		},
		remove: function(e, t) {
			e = Bt.isArray(e) ? e.slice() : [e], t || (t = {});
			var n, s, o, u;
			for (n = 0, s = e[i]; n < s; n++) {
				u = this.get(e[n]);
				if (!u) continue;
				delete this[st][u.id], delete this[st][u.cid], o = this[vt](u), this[g].splice(o, 1), this[i]--, t[W] || (t.index = o, u[r](M, u, this, t)), this[ft](u)
			}
			return this
		},
		set: function(n, o) {
			o = Bt[D](o || {}, Vt), o[C] && (n = this[C](n, o)), Bt.isArray(n) || (n = n ? [n] : []);
			var u, a, l, h, p, v, m = o.at,
				y = this[f] && m == c && o[kt] !== t,
				b = Bt.isString(this[f]) ? this[f] : c,
				w = [],
				E = [],
				S = {};
			for (u = 0, a = n[i]; u < a; u++) {
				if (!(l = this[_](n[u], o))) continue;
				(p = this.get(l)) ? (o[M] && (S[p.cid] = s), o.merge && (p.set(l[e], o), y && !v && p.hasChanged(b) && (v = s))) : o.add && (w.push(l), l.on("all", this[Ct], this), this[st][l.cid] = l, l.id != c && (this[st][l.id] = l))
			}
			if (o[M]) {
				for (u = 0, a = this[i]; u < a; ++u) S[(l = this[g][u]).cid] || E.push(l);
				E[i] && this[M](E, o)
			}
			w[i] && (y && (v = s), this[i] += w[i], m != c ? Pt[d](this[g], [m, 0].concat(w)) : _t[d](this[g], w)), v && this[kt]({
				silent: s
			});
			if (o[W]) return this;
			for (u = 0, a = w[i]; u < a; u++)(l = w[u])[r]("add", l, this, o);
			return v && this[r](kt, this, o), this
		},
		reset: function(e, t) {
			t || (t = {});
			for (var o = 0, u = this[g][i]; o < u; o++) this[ft](this[g][o]);
			return t.previousModels = this[g], this._reset(), this.add(e, Bt[n]({
				silent: s
			}, t)), t[W] || this[r](dt, this, t), this
		},
		push: function(e, t) {
			return e = this[_](e, t), this.add(e, Bt[n]({
				at: this[i]
			}, t)), e
		},
		pop: function(e) {
			var t = this.at(this[i] - 1);
			return this[M](t, e), t
		},
		unshift: function(e, t) {
			return e = this[_](e, t), this.add(e, Bt[n]({
				at: 0
			}, t)), e
		},
		shift: function(e) {
			var t = this.at(0);
			return this[M](t, e), t
		},
		slice: function(e, t) {
			return this[g].slice(e, t)
		},
		get: function(e) {
			return e == c ? void 0 : this[st][e.id != c ? e.id : e.cid || e]
		},
		at: function(e) {
			return this[g][e]
		},
		where: function(e, n) {
			return Bt[yt](e) ? n ? void 0 : [] : this[n ? "find" : "filter"](function(n) {
				for (var r in e)
					if (e[r] !== n.get(r)) return t;
				return s
			})
		},
		findWhere: function(e) {
			return this.where(e, s)
		},
		sort: function(e) {
			if (!this[f]) throw new Error("Cannot sort a set without a comparator");
			return e || (e = {}), Bt.isString(this[f]) || this[f][i] === 1 ? this[g] = this.sortBy(this[f], this) : this[g][kt](Bt.bind(this[f], this)), e[W] || this[r](kt, this, e), this
		},
		sortedIndex: function(e, t, n) {
			t || (t = this[f]);
			var r = Bt[X](t) ? t : function(e) {
				return e.get(t)
			};
			return Bt.sortedIndex(this[g], e, r, n)
		},
		pluck: function(e) {
			return Bt.invoke(this[g], "get", e)
		},
		fetch: function(e) {
			e = e ? Bt[R](e) : {}, e[C] === void 0 && (e[C] = s);
			var t = e[S],
				n = this;
			return e[S] = function(i) {
				var s = e[dt] ? dt : "set";
				n[s](i, e), t && t(n, i, e), n[r](L, n, i, e)
			}, pn(this, e), this[L]("read", this, e)
		},
		create: function(e, n) {
			n = n ? Bt[R](n) : {};
			if (!(e = this[_](e, n))) return t;
			n.wait || this.add(e, n);
			var r = this,
				i = n[S];
			return n[S] = function(t) {
				n.wait && r.add(e, n), i && i(e, t, n)
			}, e.save(c, n), e
		},
		parse: function(e, t) {
			return e
		},
		clone: function() {
			return new this[k](this[g])
		},
		_reset: function() {
			this[i] = 0, this[g] = [], this[st] = {}
		},
		_prepareModel: function(e, n) {
			if (e instanceof Ut) return e[l] || (e[l] = this), e;
			n || (n = {}), n[l] = this;
			var i = new this[mt](e, n);
			return i[U](e, n) ? i : (this[r](St, this, e, n), t)
		},
		_removeReference: function(e) {
			this === e[l] && delete e[l], e.off("all", this[Ct], this)
		},
		_onModelEvent: function(e, t, n, i) {
			if ((e === "add" || e === M) && n !== this) return;
			e === Et && this[M](t, i), t && e === Nt + t[P] && (delete this[st][t.previous(t[P])], t.id != c && (this[st][t.id] = t)), this[r][d](this, arguments)
		}
	});
	var Jt = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", vt, "shuffle", "lastIndexOf", yt, "chain"];
	Bt.each(Jt, function(e) {
		Xt[u][e] = function() {
			var t = Dt.call(arguments);
			return t.unshift(this[g]), Bt[e][d](Bt, t)
		}
	});
	var Kt = ["groupBy", "countBy", "sortBy"];
	Bt.each(Kt, function(e) {
		Xt[u][e] = function(t, n) {
			var r = Bt[X](t) ? t : function(e) {
				return e.get(t)
			};
			return Bt[e](this[g], r, n)
		}
	});
	var Qt = Ht.View = function(e) {
			this.cid = Bt[rt]("view"), this._configure(e || {}), this._ensureElement(), this[B][d](this, arguments), this[gt]()
		},
		Gt = /^(\S+)\s*(.*)$/,
		Yt = [mt, l, "el", "id", e, Y, Lt, "events"];
	Bt[n](Qt[u], jt, {
		tagName: "div",
		$: function(e) {
			return this.$el.find(e)
		},
		initialize: function() {},
		render: function() {
			return this
		},
		remove: function() {
			return this.$el[M](), this.stopListening(), this
		},
		setElement: function(e, n) {
			return this.$el && this[ut](), this.$el = e instanceof Ht.$ ? e : Ht.$(e), this.el = this.$el[0], n !== t && this[gt](), this
		},
		delegateEvents: function(e) {
			if (!e && !(e = Bt[y](this, "events"))) return this;
			this[ut]();
			for (var t in e) {
				var n = e[t];
				Bt[X](n) || (n = this[e[t]]);
				if (!n) continue;
				var r = t.match(Gt),
					i = r[1],
					s = r[2];
				n = Bt.bind(n, this), i += G + this.cid, s === "" ? this.$el.on(i, n) : this.$el.on(i, s, n)
			}
			return this
		},
		undelegateEvents: function() {
			return this.$el.off(G + this.cid), this
		},
		_configure: function(e) {
			this[x] && (e = Bt[n]({}, Bt[y](this, x), e)), Bt[n](this, Bt.pick(e, Yt)), this[x] = e
		},
		_ensureElement: function() {
			if (!this.el) {
				var r = Bt[n]({}, Bt[y](this, e));
				this.id && (r.id = Bt[y](this, "id")), this[Y] && (r["class"] = Bt[y](this, Y));
				var i = Ht.$("<" + Bt[y](this, Lt) + ">").attr(r);
				this.setElement(i, t)
			} else this.setElement(Bt[y](this, "el"), t)
		}
	}), Ht[L] = function(e, i, s) {
		var o = Zt[e];
		Bt[D](s || (s = {}), {
			emulateHTTP: Ht[Q],
			emulateJSON: Ht[T]
		});
		var u = {
			type: o,
			dataType: "json"
		};
		s.url || (u.url = Bt[y](i, "url") || hn()), s.data == c && i && (e === "create" || e === "update" || e === tt) && (u.contentType = "application/json", u.data = JSON.stringify(s.attrs || i.toJSON(s))), s[T] && (u.contentType = "application/x-www-form-urlencoded", u.data = u.data ? {
			model: u.data
		} : {});
		if (s[Q] && (o === "PUT" || o === "DELETE" || o === lt)) {
			u.type = "POST", s[T] && (u.data._method = o);
			var a = s.beforeSend;
			s.beforeSend = function(e) {
				e.setRequestHeader("X-HTTP-Method-Override", o);
				if (a) return a[d](this, arguments)
			}
		}
		u.type !== "GET" && !s[T] && (u.processData = t), u.type === lt && window.ActiveXObject && (!window.external || !window.external.msActiveXFilteringEnabled) && (u.xhr = function() {
			return new ActiveXObject("Microsoft.XMLHTTP")
		});
		var f = s.xhr = Ht.ajax(Bt[n](u, s));
		return i[r]("request", i, f, s), f
	};
	var Zt = {
		create: "POST",
		update: "PUT",
		patch: lt,
		"delete": "DELETE",
		read: "GET"
	};
	Ht.ajax = function() {
		return Ht.$.ajax[d](Ht.$, arguments)
	};
	var en = Ht.Router = function(e) {
			e || (e = {}), e[I] && (this[I] = e[I]), this._bindRoutes(), this[B][d](this, arguments)
		},
		tn = /\((.*?)\)/g,
		nn = /(\(\?)?:\w+/g,
		rn = /\*\w+/g,
		sn = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	Bt[n](en[u], jt, {
		initialize: function() {},
		route: function(e, t, n) {
			Bt.isRegExp(e) || (e = this._routeToRegExp(e)), Bt[X](t) && (n = t, t = ""), n || (n = this[t]);
			var i = this;
			return Ht[N][nt](e, function(s) {
				var o = i._extractParameters(e, s);
				n && n[d](i, o), i[r][d](i, ["route:" + t].concat(o)), i[r](nt, t, o), Ht[N][r](nt, i, t, o)
			}), this
		},
		navigate: function(e, t) {
			return Ht[N][Tt](e, t), this
		},
		_bindRoutes: function() {
			if (!this[I]) return;
			this[I] = Bt[y](this, I);
			var e, t = Bt.keys(this[I]);
			while ((e = t.pop()) != c) this[nt](e, this[I][e])
		},
		_routeToRegExp: function(e) {
			return e = e[p](sn, "\\$&")[p](tn, "(?:$1)?")[p](nn, function(e, t) {
				return t ? e : "([^/]+)"
			})[p](rn, "(.*?)"), new RegExp("^" + e + "$")
		},
		_extractParameters: function(e, t) {
			var n = e.exec(t).slice(1);
			return Bt.map(n, function(e) {
				return e ? decodeURIComponent(e) : c
			})
		}
	});
	var on = Ht.History = function() {
			this[xt] = [], Bt.bindAll(this, H), typeof window !== F && (this[b] = window[b], this[N] = window[N])
		},
		un = /^[#\/]|\s+$/g,
		an = /^\/+|\/+$/g,
		fn = /msie [\w.]+/,
		ln = /\/$/;
	on[Z] = t, Bt[n](on[u], jt, {
		interval: 50,
		getHash: function(e) {
			var t = (e || this)[b].href.match(/#(.*)$/);
			return t ? t[1] : ""
		},
		getFragment: function(e, t) {
			if (e == c)
				if (this[v] || !this[a] || t) {
					e = this[b].pathname;
					var n = this.root[p](ln, "");
					e[vt](n) || (e = e.substr(n[i]))
				} else e = this[et]();
			return e[p](un, "")
		},
		start: function(e) {
			if (on[Z]) throw new Error("Backbone.history has already been started");
			on[Z] = s, this[x] = Bt[n]({}, {
				root: "/"
			}, this[x], e), this.root = this[x].root, this[a] = this[x].hashChange !== t, this[q] = !!this[x][$], this[v] = !!(this[x][$] && this[N] && this[N][$]);
			var r = this[m](),
				i = document.documentMode,
				o = fn.exec(navigator.userAgent.toLowerCase()) && (!i || i <= 7);
			this.root = ("/" + this.root + "/")[p](an, "/"), o && this[a] && (this[V] = Ht.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this[Tt](r)), this[v] ? Ht.$(window).on(bt, this[H]) : this[a] && "onhashchange" in window && !o ? Ht.$(window).on(at, this[H]) : this[a] && (this[ot] = setInterval(this[H], this.interval)), this[w] = r;
			var u = this[b],
				f = u.pathname[p](/[^\/]$/, "$&/") === this.root;
			if (this[a] && this[q] && !this[v] && !f) return this[w] = this[m](c, s), this[b][p](this.root + this[b].search + "#" + this[w]), s;
			this[q] && this[v] && f && u.hash && (this[w] = this[et]()[p](un, ""), this[N][pt]({}, document.title, this.root + this[w] + u.search));
			if (!this[x][W]) return this[ht]()
		},
		stop: function() {
			Ht.$(window).off(bt, this[H]).off(at, this[H]), clearInterval(this[ot]), on[Z] = t
		},
		route: function(e, t) {
			this[xt].unshift({
				route: e,
				callback: t
			})
		},
		checkUrl: function(e) {
			var n = this[m]();
			n === this[w] && this[V] && (n = this[m](this[et](this[V])));
			if (n === this[w]) return t;
			this[V] && this[Tt](n), this[ht]() || this[ht](this[et]())
		},
		loadUrl: function(e) {
			var t = this[w] = this[m](e),
				n = Bt.any(this[xt], function(e) {
					if (e[nt].test(t)) return e[E](t), s
				});
			return n
		},
		navigate: function(e, n) {
			if (!on[Z]) return t;
			if (!n || n === s) n = {
				trigger: n
			};
			e = this[m](e || "");
			if (this[w] === e) return;
			this[w] = e;
			var i = this.root + e;
			if (this[v]) this[N][n[p] ? pt : $]({}, document.title, i);
			else {
				if (!this[a]) return this[b].assign(i);
				this._updateHash(this[b], e, n[p]), this[V] && e !== this[m](this[et](this[V])) && (n[p] || this[V].document.open().close(), this._updateHash(this[V][b], e, n[p]))
			}
			n[r] && this[ht](e)
		},
		_updateHash: function(e, t, n) {
			if (n) {
				var r = e.href[p](/(javascript:|#).*$/, "");
				e[p](r + "#" + t)
			} else e.hash = "#" + t
		}
	}), Ht[N] = new on;
	var cn = function(e, t) {
		var r = this,
			i;
		e && Bt.has(e, k) ? i = e[k] : i = function() {
			return r[d](this, arguments)
		}, Bt[n](i, r, t);
		var s = function() {
			this[k] = i
		};
		return s[u] = r[u], i[u] = new s, e && Bt[n](i[u], e), i.__super__ = r[u], i
	};
	Ut[n] = Xt[n] = en[n] = Qt[n] = on[n] = cn;
	var hn = function() {
			throw new Error('A "url" property or function must be specified')
		},
		pn = function(e, t) {
			var n = t.error;
			t.error = function(i) {
				n && n(e, i, t), e[r]("error", e, i, t)
			}
		}
}).call(this);