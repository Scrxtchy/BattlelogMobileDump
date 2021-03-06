var async = require("lib/async"), app = require("app"), device = require("device"), rowsDisabled = !1, selectedElement = null, rowSelectTimeout = null, startX = null, startY = null, movedOut = !1, cancelTouchOnMove = !1;
exports.init = function() {
	var e = "touches",
		t = "originalEvent",
		n = "length",
		r = "target",
		i = "hasClass",
		s = "disabled",
		o = "closest",
		u = !1,
		a = "hasTouch",
		f = "clientX",
		l = "clientY",
		c = "addClass",
		h = "pressed",
		p = null,
		d = "removeClass",
		v = "preventDefault",
		m = "trigger",
		g = "href",
		y = "childNodes",
		b = "touchstart",
		w = "tagName",
		E = "activeElement",
		S = "INPUT",
		x = "TEXTAREA",
		T = ".ScrollViewWrapper",
		N = "scroll",
		C = "scrollTop",
		k = "stopPropagation",
		L = "scrollHeight",
		A = function(p) {
			var d = p[e] || p[t][e];
			if (d && d[n] > 1) return;
			var v = $(this),
				m = $(p[r]);
			if (m[i](s)) return;
			if (m[0] != v[0] && m[o]("a, div.touchify, tr.touchify")[0] != v[0]) return;
			selectedElement = this, movedOut = u, startX = device[a]() ? d[0][f] : p[f], startY = device[a]() ? d[0][l] : p[l], rowSelectTimeout = setTimeout(function() {
				v[c](h)
			}, 100)
		},
		O = function(n) {
			rowSelectTimeout && (clearTimeout(rowSelectTimeout), rowSelectTimeout = p);
			if (selectedElement != this) return;
			var r = n[e] || n[t][e],
				i = device[a]() ? r[0][f] : n[f],
				s = device[a]() ? r[0][l] : n[l];
			if (Math.abs(i - startX) > 5 || Math.abs(s - startY) > 5) {
				selectedElement = p, startX = p, startY = p;
				var o = $(this);
				o[d](h)
			}
		},
		M = function(e) {
			e[v](), rowSelectTimeout && (clearTimeout(rowSelectTimeout), rowSelectTimeout = p);
			if (selectedElement != this) return;
			selectedElement = p, startX = p, startY = p;
			var t = $(this);
			t.one("click", function() {
				return u
			}), t[c](h), async.nextTick(function() {
				t[m]("tap")
			});
			var r = t.parents(".NavigationView > .view > div");
			r[n] ? t[i]("external") ? setTimeout(function() {
				t[d](h)
			}, 250) : r.one("viewWillAppear", function(e) {
				setTimeout(function() {
					t[d](h)
				}, 150)
			}) : t[d](h)
		},
		_ = function(e) {
			rowSelectTimeout && (clearTimeout(rowSelectTimeout), rowSelectTimeout = p);
			if (selectedElement != this) return;
			selectedElement = p, startX = p, startY = p;
			var t = $(this);
			t[d](h)
		},
		D = function() {
			rowSelectTimeout && (clearTimeout(rowSelectTimeout), rowSelectTimeout = p), selectedElement && ($(selectedElement)[d](h), selectedElement = p)
		},
		P = function(r) {
			var p = r[e] || r[t][e];
			if (p && p[n] > 1) return;
			selectedElement = this, movedOut = u, startX = device[a]() ? p[0][f] : r[f], startY = device[a]() ? p[0][l] : r[l];
			var d = $(this);
			if (d[i](s)) return;
			cancelTouchOnMove = d[o](".ScrollViewController")[n] >= 1 || d[i]("cancelTouchOnMove"), d.click(function() {
				return u
			}), d[c](h)
		},
		H = function(n) {
			if (selectedElement != this) return;
			var r = n[e] || n[t][e],
				i = device[a]() ? r[0][f] : n[f],
				s = device[a]() ? r[0][l] : n[l],
				o = cancelTouchOnMove ? 5 : 50,
				p = $(this);
			Math.abs(i - startX) > o || Math.abs(s - startY) > o ? movedOut || (movedOut = !0, p[d](h)) : movedOut && (movedOut = u, p[c](h))
		},
		B = function(e) {
			e[v]();
			if (selectedElement != this) return;
			selectedElement = p, startX = p, startY = p;
			if (movedOut) return;
			var t = $(this);
			setTimeout(function() {
				t[d](h)
			}, 200), t.attr(g) && app.goExternal(t.attr(g)), t[m]("tap")
		},
		j = function(e) {
			if (selectedElement != this) return;
			selectedElement = p, startX = p, startY = p;
			var t = $(this);
			t[d](h)
		},
		F = function(e) {
			if (e[r] != this || this[y][n] != 1) return;
			P.call(this[y][0], e)
		},
		I = function(e) {
			if (e[r] != this || this[y][n] != 1) return;
			H.call(this[y][0], e)
		},
		q = function(e) {
			if (e[r] != this || this[y][n] != 1) return;
			B.call(this[y][0], e)
		},
		R = function(e) {
			if (e[r] != this || this[y][n] != 1) return;
			j.call(this[y][0], e)
		},
		U = $(document);
	U.on({
		touchstart: P,
		touchmove: H,
		touchend: B,
		touchcancel: j
	}, "a").on({
		touchstart: A,
		touchmove: O,
		touchend: M,
		touchcancel: _
	}, "div.touchify, tr.touchify, li.touchify").on({
		touchstart: F,
		touchmove: I,
		touchend: q,
		touchcancel: R
	}, "div.touchifyHitbox").on(b, function(e) {
		if (document[E][w] != S && document[E][w] != x) return;
		if (!(!e[r] || e[r][w] != S && e[r].className.indexOf("clear-button") == -1)) return;
		if (e[r] && e[r][w] == x) return;
		document[E].blur()
	});
	if (!device[a]()) $.each({
		down: "start",
		move: "move",
		up: "end",
		out: "cancel"
	}, function(e, t) {
		U.on("mouse" + e, function(e) {
			if (e.which === 3 || e.which === 2) return;
			e.type = "touch" + t, U[m](e)
		})
	}), U.on("mousewheel", function(e) {
		var s = $(e[r]);
		s[i]("ScrollViewContent") || (s = s[o](".ScrollViewContent"));
		if (s[n] === -1) return;
		var u = parseInt(s.css("top"), 10),
			a = u + (e[t].detail || e[t].wheelDelta),
			f = s.outerHeight() - s[o](T).height();
		a > 0 ? a = 0 : -a > f && (a = -f);
		if (typeof a != "number") return;
		s.css("top", a)
	});
	else if (device.isDesktop()) {
		var z, W, X, V;
		U.on("touchstart touchmove touchend touchcancel", function(n) {
			var i, s, a, f, c, h;
			if (n.type === b) i = $(n[r])[o](T), i.css("overflow-y") === N && (z = i, W = z[C](), X = n[t][e][0][l], V = X);
			else if (n.type === "touchmove") z && (n[k](), a = parseInt(z[C](), 10), c = n[t][e][0][l], h = c - X, f = a + h * 1.5, z[C](f), s = $.Event(N, {
				bubbles: u,
				cancelable: u,
				originalEvent: n[t],
				target: z[0],
				currentTarget: z[0],
				delegateTarget: z[0]
			}), z[m](s), X = c, W = f);
			else if (z) {
				a = parseInt(z[C](), 10), c = n[t].changedTouches[0][l], h = c - X, f = a + h * 50, f > z[0][L] ? (h = z[0][L] - a, f = z[0][L]) : f < 0 && (h = a, f = 0), h > z[0][L] && (h = z[0][L] - a);
				var p = 100 + Math.abs(h);
				p > 1500 && (p = 1500), z.stop().animate({
					scrollTop: f
				}, p, "easeOutQuad"), s = $.Event(N, {
					bubbles: u,
					cancelable: u,
					originalEvent: n[t],
					target: z[0],
					currentTarget: z[0],
					delegateTarget: z[0]
				}), z[m](s), Math.abs(V - X) > 10 && n[k](), z = undefined
			}
		})
	}
	exports.force_row_touchcancel = D
};