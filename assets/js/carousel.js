var events = require("events"),
	device = require("device");
exports.init = function(e, t, n, r) {
	var i = "right",
		s = "preventDefault",
		o = "left",
		u = "stopPropagation",
		a = "width",
		f = !0,
		l = "addEventListener",
		c = 0,
		h = 0,
		p = 0,
		d = 0,
		v = i,
		m = 0,
		g = 0,
		y = .1,
		b = 200;
	r = r || function() {};
	var w = function(e) {
			c = parseInt(t.css("x"), 10) || 0, h = e.touches[0].clientX
		},
		E = function(e) {
			e[s]();
			var n = e.touches[0].clientX,
				r = h - n;
			v = p < n ? i : o;
			var a = c - r;
			a <= m && a >= g && (t.css("x", a + "px"), e[s](), e[u]()), p = n
		},
		S = function(l) {
			var h = e[a](),
				p = !1,
				m = parseInt(t.css("x"), 10),
				g = $.map(n, function(e, t) {
					return h * t * -1
				}),
				y;
			c > m && v === o ? (m -= h * .3, p = f) : c < m && v === i && (m += h * .3, p = f), p || !l ? (y = g.sort(function(e, t) {
				var n = e - m,
					r = t - m;
				return Math.abs(n) < Math.abs(r) ? -1 : 1
			}).shift(), d = y) : y = d, t.transition({
				x: y + "px"
			}, b, function() {
				var t = Math.abs(y) / e[a]();
				r(n[t], t)
			}), c != m && l && l[s] && (l[s](), l[u]())
		},
		x = e[a]() * y;
	g = 1 - (e[a]() * (n.length - 1) + x), m = 0 + x, $(window).resize(function() {
		e[a](Math.min(device.getScreenWidth(), 700)), S()
	}), t[0][l]("touchstart", w, f), t[0][l]("touchmove", E, f), t[0][l]("touchend", S, f)
};