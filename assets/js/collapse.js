(function(e) {
	"use strict";

	function i() {
		var e = document.createElement("bootstrap"),
			n = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: t,
				OTransition: "oTransitionEnd otransitionend",
				transition: t
			};
		for (var r in n)
			if (e.style[r] !== undefined) return {
				end: n[r]
			}
	}
	var t = "transitionend",
		n = "transition",
		r = "support";
	e.fn.emulateTransitionEnd = function(t) {
		var i = !1,
			s = this;
		e(this).one(e[r][n].end, function() {
			i = !0
		});
		var o = function() {
			i || e(s).trigger(e[r][n].end)
		};
		return setTimeout(o, t), this
	}, e(function() {
		e[r][n] = i()
	})
})(window.jQuery),
function(e) {
	"use strict";
	var t = "$element",
		n = "options",
		r = "DEFAULTS",
		i = "transitioning",
		s = "$parent",
		o = "toggle",
		u = "dimension",
		a = "prototype",
		f = "hasClass",
		l = "width",
		c = "in",
		h = "trigger",
		p = "isDefaultPrevented",
		d = "data",
		v = "bs.collapse",
		m = "collapse",
		g = "hide",
		y = "addClass",
		b = "removeClass",
		w = "collapsing",
		E = "shown.bs.collapse",
		S = "transition",
		x = "support",
		T = "emulateTransitionEnd",
		N = "collapsed",
		C = function(u, a) {
			this[t] = e(u), this[n] = e.extend({}, C[r], a), this[i] = null, this[n].parent && (this[s] = e(this[n].parent)), this[n][o] && this[o]()
		};
	C[r] = {
		toggle: !0
	}, C[a][u] = function() {
		var e = this[t][f](l);
		return e ? l : "height"
	}, C[a].show = function() {
		if (this[i] || this[t][f](c)) return;
		var n = e.Event("show.bs.collapse");
		this[t][h](n);
		if (n[p]()) return;
		var r = this[s] && this[s].find(".in");
		if (r && r.length) {
			var o = r[d](v);
			if (o && o[i]) return;
			r[m](g), o || r[d](v, null)
		}
		var a = this[u]();
		this[t][b](m)[y](w)[a](0), this[i] = 1;
		var l = function() {
			this[t][b](w)[y](c)[a]("auto"), this[i] = 0, this[t][h](E)
		};
		if (!e[x][S]) return l.call(this);
		var N = e.camelCase(["scroll", a].join("-"));
		this[t].one(e[x][S].end, e.proxy(l, this))[T](350)[a](this[t][0][N])
	}, C[a][g] = function() {
		if (this[i] || !this[t][f](c)) return;
		var n = e.Event("hide.bs.collapse");
		this[t][h](n);
		if (n[p]()) return;
		var r = this[u]();
		this[t][r](this[t][r]())[0].offsetHeight, this[t][y](w)[b](m)[b](c), this[i] = 1;
		var s = function() {
			this[i] = 0, this[t][h]("hidden.bs.collapse")[b](w)[y](m)
		};
		if (!e[x][S]) return s.call(this);
		this[t][r](0).one(e[x][S].end, e.proxy(s, this))[T](350)
	}, C[a][o] = function() {
		this[this[t][f](c) ? g : "show"]()
	};
	var k = e.fn[m];
	e.fn[m] = function(t) {
		return this.each(function() {
			var n = e(this),
				i = n[d](v),
				s = e.extend({}, C[r], n[d](), typeof t == "object" && t);
			i || n[d](v, i = new C(this, s)), typeof t == "string" && i[t]()
		})
	}, e.fn[m].Constructor = C, e.fn[m].noConflict = function() {
		return e.fn[m] = k, this
	}, e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(t) {
		var n = e(this),
			r, s = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""),
			u = e(s),
			a = u[d](v),
			l = a ? o : n[d](),
			h = n.attr("data-parent"),
			p = h && n.parents(h).first();
		if (!a || !a[i]) p && p.find('[data-toggle=collapse][data-parent="' + h + '"]').not(n)[y](N), n[u[f](c) ? y : b](N);
		u[m](l)
	}), e(document).on(E, function(t) {
		var n = e(t.target),
			r = n.offset().top,
			i = n.parents(".ScrollViewWrapper").first(),
			s = e(".viewnavbar").height() + 32,
			o;
		if (!i) return t.target.scrollIntoView(), !0;
		o = i.scrollTop(), o > 0 && i.scrollTop(o + (r - s))
	})
}(window.jQuery);