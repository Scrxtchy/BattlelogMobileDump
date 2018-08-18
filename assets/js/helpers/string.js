(function(e) {
	var t = "click",
		n = "active-item";
	require(["fastclick"], function(r) {
		var i = r.notNeeded(document.body);
		e.fn.addClick = function(r) {
			if (i) {
				var s = e(this);
				return this.bind(t, r), this.bind(t, function(e) {
					s.addClass(n), setTimeout(function() {
						s.removeClass(n)
					}, 300)
				})
			}
			return this.addClass("click-item").bind(t, r)
		}
	})
})(jQuery), String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1)
}, String.prototype.ellipsize = function(e, t) {
	if (this.length <= e) return this + "";
	if (t) {
		var n = this.substr(0, e);
		return n.substr(0, n.lastIndexOf(" ")).trim() + "..."
	}
	return this.substr(0, e).trim() + "..."
}, String.prototype.trim = function() {
	return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}, String.prototype.stripTags = function() {
	return this.replace(/(<([^>]+)>)/ig, "")
}, String.prototype.stripNewlines = function() {
	return this.replace(/(\r\n|\n|\r)/gm, "")
}, String.prototype.nl2br = function() {
	return this.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br />$2")
}, String.prototype.escapeHTML = function() {
	return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}, String.repeat = function(e, t) {
	var n = "";
	for (var r = 0; r < t; r++) n += e;
	return n
}, String.prototype.padL = function(e, t) {
	if (!e || e < 1) return this;
	t || (t = " ");
	var n = e - this.length;
	return n < 1 ? this.substr(0, e) : (String.repeat(t, n) + this).substr(0, e)
}, String.prototype.padR = function(e, t) {
	if (!e || e < 1) return this;
	t || (t = " ");
	var n = e - this.length;
	return n < 1 ? this.substr(0, e) : (this + String.repeat(t, n)).substr(0, e)
};
var sprintf_regex = /%%|%(\d+\$)?([-+#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
String.prototype.sprintf = function() {
	function l(t, n, r, i) {
		var s = t[e] >= n ? "" : Array(1 + n - t[e] >>> 0).join(r);
		return i ? t + s : s + t
	}

	function c(i, s, o, u, a) {
		var f = u - i[e];
		return f > 0 && (o || !a ? i = l(i, u, " ", o) : i = i[t](0, s[e]) + l("", f, n, r) + i[t](s[e])), i
	}

	function h(e, t, r, o, u, a, f) {
		var h = e >>> 0;
		return r = r && h && {
			2: "0b",
			8: n,
			16: "0x"
		} [t] || "", e = r + l(h[i](t), a || 0, n, s), c(e, r, o, u, f)
	}

	function p(e, n, r, i, s) {
		return i != null && (e = e[t](0, i)), c(e, "", n, r, s)
	}
	var e = "length",
		t = "slice",
		n = "0",
		r = !0,
		i = "toString",
		s = !1,
		o = "charAt",
		u = "*",
		a = "indexOf",
		f = "toUpperCase",
		d = arguments,
		v = 0;
	return this.replace(sprintf_regex, function(m, g, y, b, w, E, S) {
		if (m == "%%") return "%";
		var x = s,
			T = "",
			N = s,
			C = s;
		for (var k = 0; y && k < y[e]; k++) switch (y[o](k)) {
			case " ":
				T = " ";
				break;
			case "+":
				T = "+";
				break;
			case "-":
				x = r;
				break;
			case n:
				N = r;
				break;
			case "#":
				C = r
		}
		b ? b == u ? b = +d[v++] : b[o](0) == u ? b = +d[b[t](1, -1)] : b = +b : b = 0, b < 0 && (b = -b, x = r);
		if (!isFinite(b)) throw new Error("sprintf: (minimum-)width must be finite");
		E ? E == u ? E = +d[v++] : E[o](0) == u ? E = +d[E[t](1, -1)] : E = +E : E = "fFeE" [a](S) > -1 ? 6 : S == "d" ? 0 : void 0;
		var L = g ? d[g[t](0, -1)] : d[v++];
		switch (S) {
			case "s":
				return p(String(L), x, b, E, N);
			case "c":
				return p(String.fromCharCode(+L), x, b, E, N);
			case "b":
				return h(L, 2, C, x, b, E, N);
			case "o":
				return h(L, 8, C, x, b, E, N);
			case "x":
				return h(L, 16, C, x, b, E, N);
			case "X":
				return h(L, 16, C, x, b, E, N)[f]();
			case "u":
				return h(L, 10, C, x, b, E, N);
			case "i":
			case "d":
				var A = parseInt(+L),
					O = A < 0 ? "-" : T;
				return L = O + l(String(Math.abs(A)), E, n, s), c(L, O, x, b, N);
			case "e":
			case "E":
			case "f":
			case "F":
			case "g":
			case "G":
				var A = +L,
					O = A < 0 ? "-" : T,
					M = ["toExponential", "toFixed", "toPrecision"]["efg" [a](S.toLowerCase())],
					_ = [i, f]["eEfFgG" [a](S) % 2];
				return L = O + Math.abs(A)[M](E), c(L, O, x, b, N)[_]();
			default:
				return m
		}
	})
};