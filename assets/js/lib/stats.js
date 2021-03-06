var Stats = function() {
	var e = "createElement",
		t = "div",
		n = "cssText",
		r = "style",
		i = "appendChild",
		s = "span",
		o = "display",
		u = "block",
		a = "none",
		f = "textContent",
		l = "firstChild",
		c = Date.now(),
		h = c,
		p = 0,
		d = Infinity,
		v = 0,
		m = 0,
		g = Infinity,
		y = 0,
		b = 0,
		w = 0,
		E = document[e](t);
	E.id = "stats", E.addEventListener("mousedown", function(e) {
		e.preventDefault(), A(++w % 2)
	}, !1), E[r][n] = "width:80px;opacity:0.9;cursor:pointer";
	var S = document[e](t);
	S.id = "fps", S[r][n] = "padding:0 0 3px 3px;text-align:left;background-color:#002", E[i](S);
	var x = document[e](t);
	x.id = "fpsText", x[r][n] = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", x.innerHTML = "FPS", S[i](x);
	var T = document[e](t);
	T.id = "fpsGraph", T[r][n] = "position:relative;width:74px;height:30px;background-color:#0ff";
	for (S[i](T); 74 > T.children.length;) {
		var N = document[e](s);
		N[r][n] = "width:1px;height:30px;float:left;background-color:#113", T[i](N)
	}
	var C = document[e](t);
	C.id = "ms", C[r][n] = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none", E[i](C);
	var k = document[e](t);
	k.id = "msText", k[r][n] = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", k.innerHTML = "MS", C[i](k);
	var L = document[e](t);
	L.id = "msGraph", L[r][n] = "position:relative;width:74px;height:30px;background-color:#0f0";
	for (C[i](L); 74 > L.children.length;) N = document[e](s), N[r][n] = "width:1px;height:30px;float:left;background-color:#131", L[i](N);
	var A = function(e) {
		w = e;
		switch (w) {
			case 0:
				S[r][o] = u, C[r][o] = a;
				break;
			case 1:
				S[r][o] = a, C[r][o] = u
		}
	};
	return {
		REVISION: 11,
		domElement: E,
		setMode: A,
		begin: function() {
			c = Date.now()
		},
		end: function() {
			var e = Date.now();
			p = e - c, d = Math.min(d, p), v = Math.max(v, p), k[f] = p + " MS (" + d + "-" + v + ")";
			var t = Math.min(30, 30 - 30 * (p / 200));
			return L[i](L[l])[r].height = t + "px", b++, e > h + 1e3 && (m = Math.round(1e3 * b / (e - h)), g = Math.min(g, m), y = Math.max(y, m), x[f] = m + " FPS (" + g + "-" + y + ")", t = Math.min(30, 30 - 30 * (m / 100)), T[i](T[l])[r].height = t + "px", h = e, b = 0), e
		},
		update: function() {
			c = this.end()
		}
	}
};