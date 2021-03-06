function getGlobal() {
	return function() {
		return this.dust
	}.call(null)
}
var dust = window.dust = {};
(function(dust) {
	function Context(e, t, n) {
		this.stack = e, this.global = t, this.blocks = n
	}

	function Stack(e, t, n, r) {
		this.tail = t, this.isObject = !dust.isArray(e) && e && typeof e == "object", this.head = e, this.index = n, this.of = r
	}

	function Stub(e) {
		this.head = new Chunk(this), this.callback = e, this.out = ""
	}

	function Stream() {
		this.head = new Chunk(this)
	}

	function Chunk(e, t, n) {
		this.root = e, this.next = t, this.data = [], this.flushable = !1, this.taps = n
	}

	function Tap(e, t) {
		this.head = e, this.tail = t
	}
	dust.helpers = {}, dust.cache = {}, dust.register = function(e, t) {
		if (!e) return;
		dust.cache[e] = t
	}, dust.render = function(e, t, n) {
		var r = (new Stub(n)).head;
		dust.load(e, r, Context.wrap(t, e)).end()
	}, dust.stream = function(e, t) {
		var n = new Stream;
		return dust.nextTick(function() {
			dust.load(e, n.head, Context.wrap(t, e)).end()
		}), n
	}, dust.renderSource = function(e, t, n) {
		return dust.compileFn(e)(t, n)
	}, dust.compileFn = function(e, t) {
		var n = dust.loadSource(dust.compile(e, t));
		return function(e, r) {
			var i = r ? new Stub(r) : new Stream;
			return dust.nextTick(function() {
				n(i.head, Context.wrap(e, t)).end()
			}), i
		}
	}, dust.load = function(e, t, n) {
		var r = dust.cache[e];
		return r ? r(t, n) : dust.onLoad ? t.map(function(t) {
			dust.onLoad(e, function(r, i) {
				if (r) return t.setError(r);
				dust.cache[e] || dust.loadSource(dust.compile(i, e)), dust.cache[e](t, n).end()
			})
		}) : t.setError(new Error("Template Not Found: " + e))
	}, dust.loadSource = function(source, path) {
		return eval(source)
	}, Array.isArray ? dust.isArray = Array.isArray : dust.isArray = function(e) {
		return Object.prototype.toString.call(e) == "[object Array]"
	}, dust.nextTick = function() {
		return typeof process != "undefined" ? process.nextTick : function(e) {
			setTimeout(e, 0)
		}
	}(), dust.isEmpty = function(e) {
		return dust.isArray(e) && !e.length ? !0 : e === 0 ? !1 : !e
	}, dust.filter = function(e, t, n) {
		if (n)
			for (var r = 0, i = n.length; r < i; r++) {
				var s = n[r];
				s === "s" ? t = null : typeof dust.filters[s] == "function" && (e = dust.filters[s](e))
			}
		return t && (e = dust.filters[t](e)), e
	}, dust.filters = {
		h: function(e) {
			return dust.escapeHtml(e)
		},
		j: function(e) {
			return dust.escapeJs(e)
		},
		u: encodeURI,
		uc: encodeURIComponent,
		js: function(e) {
			return JSON ? JSON.stringify(e) : e
		},
		jp: function(e) {
			return JSON ? JSON.parse(e) : e
		}
	}, dust.makeBase = function(e) {
		return new Context(new Stack, e)
	}, Context.wrap = function(e, t) {
		if (e instanceof Context) return e;
		var n = {};
		return n.__templates__ = [], n.__templates__.push(t), new Context(new Stack(e), n)
	}, Context.prototype.get = function(e) {
		var t = this.stack,
			n;
		while (t) {
			if (t.isObject) {
				n = t.head[e];
				if (n !== undefined) return n
			}
			t = t.tail
		}
		return this.global ? this.global[e] : undefined
	}, Context.prototype.getPath = function(e, t) {
		var n = this.stack,
			r, i = t.length,
			s = e ? undefined : this.stack.tail;
		if (e && i === 0) return n.head;
		n = n.head;
		var o = 0;
		while (n && o < i) {
			r = n, n = n[t[o]], o++;
			while (!n && !e) {
				if (o > 1) return undefined;
				s ? (n = s.head, s = s.tail, o = 0) : e || (n = this.global, e = !0, o = 0)
			}
		}
		return typeof n == "function" ? function() {
			return n.apply(r, arguments)
		} : n
	}, Context.prototype.push = function(e, t, n) {
		return new Context(new Stack(e, this.stack, t, n), this.global, this.blocks)
	}, Context.prototype.rebase = function(e) {
		return new Context(new Stack(e), this.global, this.blocks)
	}, Context.prototype.current = function() {
		return this.stack.head
	}, Context.prototype.getBlock = function(e, t, n) {
		typeof e == "function" && (e = e(t, n).data.join(""), t.data = []);
		var r = this.blocks;
		if (!r) return;
		var i = r.length,
			s;
		while (i--) {
			s = r[i][e];
			if (s) return s
		}
	}, Context.prototype.shiftBlocks = function(e) {
		var t = this.blocks,
			n;
		return e ? (t ? n = t.concat([e]) : n = [e], new Context(this.stack, this.global, n)) : this
	}, Stub.prototype.flush = function() {
		var e = this.head;
		while (e) {
			if (!e.flushable) {
				if (e.error) {
					this.callback(e.error), this.flush = function() {};
					return
				}
				return
			}
			this.out += e.data.join(""), e = e.next, this.head = e
		}
		this.callback(null, this.out)
	}, Stream.prototype.flush = function() {
		var e = "error",
			t = this.head;
		while (t) {
			if (!t.flushable) {
				if (t[e]) {
					this.emit(e, t[e]), this.flush = function() {};
					return
				}
				return
			}
			this.emit("data", t.data.join("")), t = t.next, this.head = t
		}
		this.emit("end")
	}, Stream.prototype.emit = function(e, t) {
		if (!this.events) return !1;
		var n = this.events[e];
		if (!n) return !1;
		if (typeof n == "function") n(t);
		else {
			var r = n.slice(0);
			for (var i = 0, s = r.length; i < s; i++) r[i](t)
		}
	}, Stream.prototype.on = function(e, t) {
		var n = "events";
		return this[n] || (this[n] = {}), this[n][e] ? typeof this[n][e] == "function" ? this[n][e] = [this[n][e], t] : this[n][e].push(t) : this[n][e] = t, this
	}, Stream.prototype.pipe = function(e) {
		return this.on("data", function(t) {
			e.write(t, "utf8")
		}).on("end", function() {
			e.end()
		}).on("error", function(t) {
			e.error(t)
		}), this
	}, Chunk.prototype.write = function(e) {
		var t = this.taps;
		return t && (e = t.go(e)), this.data.push(e), this
	}, Chunk.prototype.end = function(e) {
		return e && this.write(e), this.flushable = !0, this.root.flush(), this
	}, Chunk.prototype.map = function(e) {
		var t = new Chunk(this.root, this.next, this.taps),
			n = new Chunk(this.root, t, this.taps);
		return this.next = n, this.flushable = !0, e(n), t
	}, Chunk.prototype.tap = function(e) {
		var t = this.taps;
		return t ? this.taps = t.push(e) : this.taps = new Tap(e), this
	}, Chunk.prototype.untap = function() {
		return this.taps = this.taps.tail, this
	}, Chunk.prototype.render = function(e, t) {
		return e(this, t)
	}, Chunk.prototype.reference = function(e, t, n, r) {
		if (typeof e == "function") {
			e.isFunction = !0, e = e.apply(t.current(), [this, t, null, {
				auto: n,
				filters: r
			}]);
			if (e instanceof Chunk) return e
		}
		return dust.isEmpty(e) ? this : this.write(dust.filter(e, n, r))
	}, Chunk.prototype.section = function(e, t, n, r) {
		var i = "head",
			s = "stack",
			o = "$len",
			u = "$idx";
		if (typeof e == "function") {
			e = e.apply(t.current(), [this, t, n, r]);
			if (e instanceof Chunk) return e
		}
		var a = n.block,
			f = n["else"];
		r && (t = t.push(r));
		if (dust.isArray(e)) {
			if (a) {
				var l = e.length,
					c = this;
				if (l > 0) {
					t[s][i] && (t[s][i][o] = l);
					for (var h = 0; h < l; h++) t[s][i] && (t[s][i][u] = h), c = a(c, t.push(e[h], h, l));
					return t[s][i] && (t[s][i][u] = undefined, t[s][i][o] = undefined), c
				}
				if (f) return f(this, t)
			}
		} else if (e === !0) {
			if (a) return a(this, t)
		} else if (e || e === 0) {
			if (a) return a(this, t.push(e))
		} else if (f) return f(this, t);
		return this
	}, Chunk.prototype.exists = function(e, t, n) {
		var r = n.block,
			i = n["else"];
		if (!dust.isEmpty(e)) {
			if (r) return r(this, t)
		} else if (i) return i(this, t);
		return this
	}, Chunk.prototype.notexists = function(e, t, n) {
		var r = n.block,
			i = n["else"];
		if (dust.isEmpty(e)) {
			if (r) return r(this, t)
		} else if (i) return i(this, t);
		return this
	}, Chunk.prototype.block = function(e, t, n) {
		var r = n.block;
		return e && (r = e), r ? r(this, t) : this
	}, Chunk.prototype.partial = function(e, t, n) {
		var r = "global",
			i = "__templates__",
			s = "stack",
			o;
		t[r] && t[r][i] && t[r][i].push(e), n ? (o = dust.makeBase(t[r]), o.blocks = t.blocks, t[s] && t[s].tail && (o[s] = t[s].tail), o = o.push(n), o = o.push(t[s].head)) : o = t;
		var u;
		return typeof e == "function" ? u = this.capture(e, o, function(e, t) {
			dust.load(e, t, o).end()
		}) : u = dust.load(e, this, o), t[r] && t[r][i] && t[r][i].pop(), u
	}, Chunk.prototype.helper = function(e, t, n, r) {
		return dust.helpers[e] ? dust.helpers[e](this, t, n, r) : this
	}, Chunk.prototype.capture = function(e, t, n) {
		return this.map(function(r) {
			var i = new Stub(function(e, t) {
				e ? r.setError(e) : n(t, r)
			});
			e(i.head, t).end()
		})
	}, Chunk.prototype.setError = function(e) {
		return this.error = e, this.root.flush(), this
	}, Tap.prototype.push = function(e) {
		return new Tap(e, this)
	}, Tap.prototype.go = function(e) {
		var t = this;
		while (t) e = t.head(e), t = t.tail;
		return e
	};
	var HCHARS = new RegExp(/[&<>\"\']/),
		AMP = /&/g,
		LT = /</g,
		GT = />/g,
		QUOT = /\"/g,
		SQUOT = /\'/g;
	dust.escapeHtml = function(e) {
		var t = "replace";
		return typeof e == "string" ? HCHARS.test(e) ? e[t](AMP, "&amp;")[t](LT, "&lt;")[t](GT, "&gt;")[t](QUOT, "&quot;")[t](SQUOT, "&#39;") : e : e
	};
	var BS = /\\/g,
		FS = /\//g,
		CR = /\r/g,
		LS = /\u2028/g,
		PS = /\u2029/g,
		NL = /\n/g,
		LF = /\f/g,
		SQ = /'/g,
		DQ = /"/g,
		TB = /\t/g;
	dust.escapeJs = function(e) {
		var t = "replace";
		return typeof e == "string" ? e[t](BS, "\\\\")[t](FS, "\\/")[t](DQ, '\\"')[t](SQ, "\\'")[t](CR, "\\r")[t](LS, "\\u2028")[t](PS, "\\u2029")[t](NL, "\\n")[t](LF, "\\f")[t](TB, "\\t") : e
	}
})(dust), typeof exports != "undefined" && (typeof process != "undefined" && require("./server")(dust), module.exports = dust);
var dustCompiler = function(e) {
	function y(n) {
		var r = {};
		return e[t](r, n)
	}

	function b(n, r) {
		var o = [r[0]];
		for (var u = 1, a = r[i]; u < a; u++) {
			var f = e[t](n, r[u]);
			f && o[s](f)
		}
		return o
	}

	function w(n, r) {
		var u = [r[0]],
			a;
		for (var f = 1, l = r[i]; f < l; f++) {
			var c = e[t](n, r[f]);
			c && (c[0] === o ? a ? a[1] += c[1] : (a = c, u[s](c)) : (a = null, u[s](c)))
		}
		return u
	}

	function S(e, t) {
		return [o, E[t[1]]]
	}

	function x(e, t) {
		return t
	}

	function T() {}

	function N(t, n) {
		var r = {
			name: n,
			bodies: [],
			blocks: {},
			index: 0,
			auto: "h"
		};
		return "(function(){dust.register(" + (n ? u + n + u : a) + f + e[l](r, t) + ");" + C(r) + k(r) + "return body_0;" + "})();"
	}

	function C(e) {
		var t = [],
			n = e[c];
		for (var r in n) t[s]("'" + r + "':" + n[r]);
		return t[i] ? (e[c] = "ctx=ctx.shiftBlocks(blocks);", "var blocks={" + t[h](f) + "};") : e[c] = ""
	}

	function k(e) {
		var t = [],
			n = e.bodies,
			r = e[c];
		for (var s = 0, o = n[i]; s < o; s++) t[s] = "function body_" + s + "(chk,ctx){" + r + "return chk" + n[s] + ";}";
		return t[h]("")
	}

	function L(t, n) {
		var r = "";
		for (var s = 1, o = n[i]; s < o; s++) r += e[l](t, n[s]);
		return r
	}

	function A(t, n, r) {
		return "." + r + "(" + e[l](t, n[1]) + f + e[l](t, n[2]) + f + e[l](t, n[4]) + f + e[l](t, n[3]) + d
	}
	var t = "filterNode",
		n = "optimizers",
		r = "pragmas",
		i = "length",
		s = "push",
		o = "buffer",
		u = '"',
		a = "null",
		f = ",",
		l = "compileNode",
		c = "blocks",
		h = "join",
		p = ".write(",
		d = ")",
		v = "text",
		m = "undefined",
		g = ".block(ctx.getBlock(";
	e.compile = function(t, n) {
		try {
			var r = y(e.parse(t));
			return N(r, n)
		} catch (i) {
			throw !i.line || !i.column ? i : new SyntaxError(i.message + " At line : " + i.line + ", column : " + i.column)
		}
	}, e[t] = function(t, r) {
		return e[n][r[0]](t, r)
	}, e[n] = {
		body: w,
		buffer: x,
		special: S,
		format: T,
		reference: b,
		"#": b,
		"?": b,
		"^": b,
		"<": b,
		"+": b,
		"@": b,
		"%": b,
		partial: b,
		context: b,
		params: b,
		bodies: b,
		param: b,
		filters: x,
		key: x,
		path: x,
		literal: x,
		comment: T,
		line: T,
		col: T
	}, e[r] = {
		esc: function(e, t, n, r) {
			var i = e.auto;
			t || (t = "h"), e.auto = t === "s" ? "" : t;
			var s = L(e, n.block);
			return e.auto = i, s
		}
	};
	var E = {
		s: " ",
		n: "\n",
		r: "\r",
		lb: "{",
		rb: "}"
	};
	e[l] = function(t, n) {
		return e.nodes[n[0]](t, n)
	}, e.nodes = {
		body: function(e, t) {
			var n = e.index++,
				r = "body_" + n;
			return e.bodies[n] = L(e, t), r
		},
		buffer: function(e, t) {
			return p + O(t[1]) + d
		},
		format: function(e, t) {
			return p + O(t[1] + t[2]) + d
		},
		reference: function(t, n) {
			return ".reference(" + e[l](t, n[1]) + ",ctx," + e[l](t, n[2]) + d
		},
		"#": function(e, t) {
			return A(e, t, "section")
		},
		"?": function(e, t) {
			return A(e, t, "exists")
		},
		"^": function(e, t) {
			return A(e, t, "notexists")
		},
		"<": function(t, n) {
			var r = n[4];
			for (var s = 1, o = r[i]; s < o; s++) {
				var u = r[s],
					a = u[1][1];
				if (a === "block") return t[c][n[1][v]] = e[l](t, u[2]), ""
			}
			return ""
		},
		"+": function(t, n) {
			return typeof n[1][v] === m && typeof n[4] === m ? g + e[l](t, n[1]) + ",chk, ctx)," + e[l](t, n[2]) + ", {}," + e[l](t, n[3]) + d : g + O(n[1][v]) + ")," + e[l](t, n[2]) + f + e[l](t, n[4]) + f + e[l](t, n[3]) + d
		},
		"@": function(t, n) {
			return ".helper(" + O(n[1][v]) + f + e[l](t, n[2]) + f + e[l](t, n[4]) + f + e[l](t, n[3]) + d
		},
		"%": function(t, n) {
			var s = n[1][1];
			if (!e[r][s]) return "";
			var o = n[4],
				u = {};
			for (var a = 1, f = o[i]; a < f; a++) {
				var l = o[a];
				u[l[1][1]] = l[2]
			}
			var c = n[3],
				h = {};
			for (var a = 1, f = c[i]; a < f; a++) {
				var p = c[a];
				h[p[1][1]] = p[2][1]
			}
			var d = n[2][1] ? n[2][1][v] : null;
			return e[r][s](t, d, u, h)
		},
		partial: function(t, n) {
			return ".partial(" + e[l](t, n[1]) + f + e[l](t, n[2]) + f + e[l](t, n[3]) + d
		},
		context: function(t, n) {
			return n[1] ? "ctx.rebase(" + e[l](t, n[1]) + d : "ctx"
		},
		params: function(t, n) {
			var r = [];
			for (var o = 1, u = n[i]; o < u; o++) r[s](e[l](t, n[o]));
			return r[i] ? "{" + r[h](f) + "}" : a
		},
		bodies: function(t, n) {
			var r = [];
			for (var o = 1, u = n[i]; o < u; o++) r[s](e[l](t, n[o]));
			return "{" + r[h](f) + "}"
		},
		param: function(t, n) {
			return e[l](t, n[1]) + ":" + e[l](t, n[2])
		},
		filters: function(e, t) {
			var n = [];
			for (var r = 1, o = t[i]; r < o; r++) {
				var a = t[r];
				n[s](u + a + u)
			}
			return u + e.auto + u + (n[i] ? ",[" + n[h](f) + "]" : "")
		},
		key: function(e, t) {
			return 'ctx.get("' + t[1] + '")'
		},
		path: function(t, n) {
			var r = n[1],
				o = n[2],
				a = [];
			for (var c = 0, p = o[i]; c < p; c++) e.isArray(o[c]) ? a[s](e[l](t, o[c])) : a[s](u + o[c] + u);
			return "ctx.getPath(" + r + ",[" + a[h](f) + "])"
		},
		literal: function(e, t) {
			return O(t[1])
		}
	};
	var O = typeof JSON === m ? function(t) {
		return u + e.escapeJs(t) + u
	} : JSON.stringify;
	return e
};
typeof exports != "undefined" ? module.exports = dustCompiler : dustCompiler(getGlobal()),
	function(e) {
		var t = null,
			n = "offset",
			r = "charCodeAt",
			i = "column",
			s = "line",
			o = "charAt",
			u = "concat",
			a = "literal",
			f = "push",
			l = "any character",
			c = "col",
			h = "length",
			p = "replace",
			d = "param",
			v = '"\\""',
			m = "SyntaxError",
			g = "test",
			y = "[0-9]",
			b = '"',
			w = !1,
			E = "join",
			S = "[0-9a-zA-Z_$\\-]",
			x = "bodies",
			T = '"."',
			N = ".",
			C = !0,
			k = "reference",
			L = "buffer",
			A = "substr",
			O = "body",
			M = "end of input",
			_ = "seenCR",
			D = "filters",
			P = "!}",
			H = '\\"',
			B = "context",
			j = '":"',
			F = "partial",
			I = "special",
			q = '"!}"',
			R = "comment",
			U = function() {
				function e(e) {
					return b + e[p](/\\/g, "\\\\")[p](/"/g, H)[p](/\x08/g, "\\b")[p](/\t/g, "\\t")[p](/\n/g, "\\n")[p](/\f/g, "\\f")[p](/\r/g, "\\r")[p](/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + b
				}
				var it = {
					parse: function(p, M) {
						function at(e, t, n) {
							var r = e,
								i = n - e[h];
							for (var s = 0; s < i; s++) r = t + r;
							return r
						}

						function ft(e) {
							var t = e[r](0),
								n, i;
							return t <= 255 ? (n = "x", i = 2) : (n = "u", i = 4), "\\" + n + at(t.toString(16).toUpperCase(), "0", i)
						}

						function lt(e) {
							var t = {};
							for (var n in e) t[n] = e[n];
							return t
						}

						function ct(e, t) {
							var r = e[n] + t;
							for (var u = e[n]; u < r; u++) {
								var a = p[o](u);
								a === "\n" ? (e[_] || e[s]++, e[i] = 1, e[_] = w) : a === "\r" || a === "\u2028" || a === "\u2029" ? (e[s]++, e[i] = 1, e[_] = C) : (e[i]++, e[_] = w)
							}
							e[n] += t
						}

						function ht(e) {
							if (it[n] < ot[n]) return;
							it[n] > ot[n] && (ot = lt(it), ut = []), ut[f](e)
						}

						function pt() {
							var e, r, o;
							o = lt(it), e = [], r = dt();
							while (r !== t) e[f](r), r = dt();
							return e !== t && (e = function(e, t, n, r) {
								return [O][u](r)[u]([
									[s, t],
									[c, n]
								])
							}(o[n], o[s], o[i], e)), e === t && (it = lt(o)), e
						}

						function dt() {
							var e;
							return e = Ft(), e === t && (e = vt(), e === t && (e = St(), e === t && (e = Tt(), e === t && (e = Et(), e === t && (e = Ht()))))), e
						}

						function vt() {
							var e, o, l, h, v, m, g, y, b;
							st++, y = lt(it), b = lt(it), e = mt();
							if (e !== t) {
								o = [], l = Xt();
								while (l !== t) o[f](l), l = Xt();
								o !== t ? (l = Rt(), l !== t ? (h = pt(), h !== t ? (v = wt(), v !== t ? (m = gt(), m = m !== t ? m : "", m !== t ? (g = function(e, t, n, r, i, s, o) {
									if (!o || r[1].text !== o.text) throw new Error("Expected end tag for " + r[1].text + " but it was not found. At line : " + t + ", column : " + n);
									return C
								}(it[n], it[s], it[i], e, h, v, m) ? "" : t, g !== t ? e = [e, o, l, h, v, m, g] : (e = t, it = lt(b))) : (e = t, it = lt(b))) : (e = t, it = lt(b))) : (e = t, it = lt(b))) : (e = t, it = lt(b))) : (e = t, it = lt(b))
							} else e = t, it = lt(b);
							e !== t && (e = function(e, t, n, r, i, o, l) {
								return o[f]([d, [a, "block"], i]), r[f](o), r[u]([
									[s, t],
									[c, n]
								])
							}(y[n], y[s], y[i], e[0], e[3], e[4], e[5])), e === t && (it = lt(y));
							if (e === t) {
								y = lt(it), b = lt(it), e = mt();
								if (e !== t) {
									o = [], l = Xt();
									while (l !== t) o[f](l), l = Xt();
									o !== t ? (p[r](it[n]) === 47 ? (l = "/", ct(it, 1)) : (l = t, st === 0 && ht('"/"')), l !== t ? (h = Rt(), h !== t ? e = [e, o, l, h] : (e = t, it = lt(b))) : (e = t, it = lt(b))) : (e = t, it = lt(b))
								} else e = t, it = lt(b);
								e !== t && (e = function(e, t, n, r) {
									return r[f]([x]), r[u]([
										[s, t],
										[c, n]
									])
								}(y[n], y[s], y[i], e[0])), e === t && (it = lt(y))
							}
							return st--, st === 0 && e === t && ht("section"), e
						}

						function mt() {
							var e, r, u, a, l, c, h, d;
							h = lt(it), d = lt(it), e = qt();
							if (e !== t) {
								/^[#?^<+@%]/ [g](p[o](it[n])) ? (r = p[o](it[n]), ct(it, 1)) : (r = t, st === 0 && ht("[#?^<+@%]"));
								if (r !== t) {
									u = [], a = Xt();
									while (a !== t) u[f](a), a = Xt();
									u !== t ? (a = Nt(), a !== t ? (l = yt(), l !== t ? (c = bt(), c !== t ? e = [e, r, u, a, l, c] : (e = t, it = lt(d))) : (e = t, it = lt(d))) : (e = t, it = lt(d))) : (e = t, it = lt(d))
								} else e = t, it = lt(d)
							} else e = t, it = lt(d);
							return e !== t && (e = function(e, t, n, r, i, s, o) {
								return [r, i, s, o]
							}(h[n], h[s], h[i], e[1], e[3], e[4], e[5])), e === t && (it = lt(h)), e
						}

						function gt() {
							var e, o, u, a, l, c, h, d;
							st++, h = lt(it), d = lt(it), e = qt();
							if (e !== t) {
								p[r](it[n]) === 47 ? (o = "/", ct(it, 1)) : (o = t, st === 0 && ht('"/"'));
								if (o !== t) {
									u = [], a = Xt();
									while (a !== t) u[f](a), a = Xt();
									if (u !== t) {
										a = Nt();
										if (a !== t) {
											l = [], c = Xt();
											while (c !== t) l[f](c), c = Xt();
											l !== t ? (c = Rt(), c !== t ? e = [e, o, u, a, l, c] : (e = t, it = lt(d))) : (e = t, it = lt(d))
										} else e = t, it = lt(d)
									} else e = t, it = lt(d)
								} else e = t, it = lt(d)
							} else e = t, it = lt(d);
							return e !== t && (e = function(e, t, n, r) {
								return r
							}(h[n], h[s], h[i], e[3])), e === t && (it = lt(h)), st--, st === 0 && e === t && ht("end tag"), e
						}

						function yt() {
							var e, o, u, a, f;
							return u = lt(it), a = lt(it), f = lt(it), p[r](it[n]) === 58 ? (e = ":", ct(it, 1)) : (e = t, st === 0 && ht(j)), e !== t ? (o = Nt(), o !== t ? e = [e, o] : (e = t, it = lt(f))) : (e = t, it = lt(f)), e !== t && (e = function(e, t, n, r) {
								return r
							}(a[n], a[s], a[i], e[1])), e === t && (it = lt(a)), e = e !== t ? e : "", e !== t && (e = function(e, t, n, r) {
								return r ? [B, r] : [B]
							}(u[n], u[s], u[i], e)), e === t && (it = lt(u)), e
						}

						function bt() {
							var e, o, l, c, h, v, m, g;
							st++, v = lt(it), e = [], m = lt(it), g = lt(it), l = Xt();
							if (l !== t) {
								o = [];
								while (l !== t) o[f](l), l = Xt()
							} else o = t;
							o !== t ? (l = Ot(), l !== t ? (p[r](it[n]) === 61 ? (c = "=", ct(it, 1)) : (c = t, st === 0 && ht('"="')), c !== t ? (h = Ct(), h === t && (h = Nt(), h === t && (h = Dt())), h !== t ? o = [o, l, c, h] : (o = t, it = lt(g))) : (o = t, it = lt(g))) : (o = t, it = lt(g))) : (o = t, it = lt(g)), o !== t && (o = function(e, t, n, r, i) {
								return [d, [a, r], i]
							}(m[n], m[s], m[i], o[1], o[3])), o === t && (it = lt(m));
							while (o !== t) {
								e[f](o), m = lt(it), g = lt(it), l = Xt();
								if (l !== t) {
									o = [];
									while (l !== t) o[f](l), l = Xt()
								} else o = t;
								o !== t ? (l = Ot(), l !== t ? (p[r](it[n]) === 61 ? (c = "=", ct(it, 1)) : (c = t, st === 0 && ht('"="')), c !== t ? (h = Ct(), h === t && (h = Nt(), h === t && (h = Dt())), h !== t ? o = [o, l, c, h] : (o = t, it = lt(g))) : (o = t, it = lt(g))) : (o = t, it = lt(g))) : (o = t, it = lt(g)), o !== t && (o = function(e, t, n, r, i) {
									return [d, [a, r], i]
								}(m[n], m[s], m[i], o[1], o[3])), o === t && (it = lt(m))
							}
							return e !== t && (e = function(e, t, n, r) {
								return ["params"][u](r)
							}(v[n], v[s], v[i], e)), e === t && (it = lt(v)), st--, st === 0 && e === t && ht("params"), e
						}

						function wt() {
							var e, o, l, c, h, v, m, g, y;
							st++, m = lt(it), e = [], g = lt(it), y = lt(it), o = qt(), o !== t ? (p[r](it[n]) === 58 ? (l = ":", ct(it, 1)) : (l = t, st === 0 && ht(j)), l !== t ? (c = Ot(), c !== t ? (h = Rt(), h !== t ? (v = pt(), v !== t ? o = [o, l, c, h, v] : (o = t, it = lt(y))) : (o = t, it = lt(y))) : (o = t, it = lt(y))) : (o = t, it = lt(y))) : (o = t, it = lt(y)), o !== t && (o = function(e, t, n, r, i) {
								return [d, [a, r], i]
							}(g[n], g[s], g[i], o[2], o[4])), o === t && (it = lt(g));
							while (o !== t) e[f](o), g = lt(it), y = lt(it), o = qt(), o !== t ? (p[r](it[n]) === 58 ? (l = ":", ct(it, 1)) : (l = t, st === 0 && ht(j)), l !== t ? (c = Ot(), c !== t ? (h = Rt(), h !== t ? (v = pt(), v !== t ? o = [o, l, c, h, v] : (o = t, it = lt(y))) : (o = t, it = lt(y))) : (o = t, it = lt(y))) : (o = t, it = lt(y))) : (o = t, it = lt(y)), o !== t && (o = function(e, t, n, r, i) {
								return [d, [a, r], i]
							}(g[n], g[s], g[i], o[2], o[4])), o === t && (it = lt(g));
							return e !== t && (e = function(e, t, n, r) {
								return [x][u](r)
							}(m[n], m[s], m[i], e)), e === t && (it = lt(m)), st--, st === 0 && e === t && ht(x), e
						}

						function Et() {
							var e, r, o, a, f, l;
							return st++, f = lt(it), l = lt(it), e = qt(), e !== t ? (r = Nt(), r !== t ? (o = xt(), o !== t ? (a = Rt(), a !== t ? e = [e, r, o, a] : (e = t, it = lt(l))) : (e = t, it = lt(l))) : (e = t, it = lt(l))) : (e = t, it = lt(l)), e !== t && (e = function(e, t, n, r, i) {
								return [k, r, i][u]([
									[s, t],
									[c, n]
								])
							}(f[n], f[s], f[i], e[1], e[2])), e === t && (it = lt(f)), st--, st === 0 && e === t && ht(k), e
						}

						function St() {
							var e, o, l, h, d, v, m, g, y, b, w, E;
							st++, b = lt(it), w = lt(it), e = qt();
							if (e !== t) {
								p[r](it[n]) === 62 ? (o = ">", ct(it, 1)) : (o = t, st === 0 && ht('">"')), o === t && (p[r](it[n]) === 43 ? (o = "+", ct(it, 1)) : (o = t, st === 0 && ht('"+"')));
								if (o !== t) {
									l = [], h = Xt();
									while (h !== t) l[f](h), h = Xt();
									if (l !== t) {
										E = lt(it), h = Ot(), h !== t && (h = function(e, t, n, r) {
											return [a, r]
										}(E[n], E[s], E[i], h)), h === t && (it = lt(E)), h === t && (h = Dt());
										if (h !== t) {
											d = yt();
											if (d !== t) {
												v = bt();
												if (v !== t) {
													m = [], g = Xt();
													while (g !== t) m[f](g), g = Xt();
													m !== t ? (p[r](it[n]) === 47 ? (g = "/", ct(it, 1)) : (g = t, st === 0 && ht('"/"')), g !== t ? (y = Rt(), y !== t ? e = [e, o, l, h, d, v, m, g, y] : (e = t, it = lt(w))) : (e = t, it = lt(w))) : (e = t, it = lt(w))
												} else e = t, it = lt(w)
											} else e = t, it = lt(w)
										} else e = t, it = lt(w)
									} else e = t, it = lt(w)
								} else e = t, it = lt(w)
							} else e = t, it = lt(w);
							return e !== t && (e = function(e, t, n, r, i, o, a) {
								var f = r === ">" ? F : r;
								return [f, i, o, a][u]([
									[s, t],
									[c, n]
								])
							}(b[n], b[s], b[i], e[1], e[3], e[4], e[5])), e === t && (it = lt(b)), st--, st === 0 && e === t && ht(F), e
						}

						function xt() {
							var e, o, a, l, c, h;
							st++, l = lt(it), e = [], c = lt(it), h = lt(it), p[r](it[n]) === 124 ? (o = "|", ct(it, 1)) : (o = t, st === 0 && ht('"|"')), o !== t ? (a = Ot(), a !== t ? o = [o, a] : (o = t, it = lt(h))) : (o = t, it = lt(h)), o !== t && (o = function(e, t, n, r) {
								return r
							}(c[n], c[s], c[i], o[1])), o === t && (it = lt(c));
							while (o !== t) e[f](o), c = lt(it), h = lt(it), p[r](it[n]) === 124 ? (o = "|", ct(it, 1)) : (o = t, st === 0 && ht('"|"')), o !== t ? (a = Ot(), a !== t ? o = [o, a] : (o = t, it = lt(h))) : (o = t, it = lt(h)), o !== t && (o = function(e, t, n, r) {
								return r
							}(c[n], c[s], c[i], o[1])), o === t && (it = lt(c));
							return e !== t && (e = function(e, t, n, r) {
								return [D][u](r)
							}(l[n], l[s], l[i], e)), e === t && (it = lt(l)), st--, st === 0 && e === t && ht(D), e
						}

						function Tt() {
							var e, o, a, f, l, h;
							return st++, l = lt(it), h = lt(it), e = qt(), e !== t ? (p[r](it[n]) === 126 ? (o = "~", ct(it, 1)) : (o = t, st === 0 && ht('"~"')), o !== t ? (a = Ot(), a !== t ? (f = Rt(), f !== t ? e = [e, o, a, f] : (e = t, it = lt(h))) : (e = t, it = lt(h))) : (e = t, it = lt(h))) : (e = t, it = lt(h)), e !== t && (e = function(e, t, n, r) {
								return [I, r][u]([
									[s, t],
									[c, n]
								])
							}(l[n], l[s], l[i], e[2])), e === t && (it = lt(l)), st--, st === 0 && e === t && ht(I), e
						}

						function Nt() {
							var e, r;
							return st++, r = lt(it), e = At(), e !== t && (e = function(e, t, n, r) {
								var i = ["path"][u](r);
								return i.text = r[1][E](N), i
							}(r[n], r[s], r[i], e)), e === t && (it = lt(r)), e === t && (r = lt(it), e = Ot(), e !== t && (e = function(e, t, n, r) {
								var i = ["key", r];
								return i.text = r, i
							}(r[n], r[s], r[i], e)), e === t && (it = lt(r))), st--, st === 0 && e === t && ht("identifier"), e
						}

						function Ct() {
							var e, r;
							return st++, r = lt(it), e = kt(), e === t && (e = Lt()), e !== t && (e = function(e, t, n, r) {
								return [a, r]
							}(r[n], r[s], r[i], e)), e === t && (it = lt(r)), st--, st === 0 && e === t && ht("number"), e
						}

						function kt() {
							var e, o, u, a, l, c;
							st++, l = lt(it), c = lt(it), e = Lt();
							if (e !== t) {
								p[r](it[n]) === 46 ? (o = N, ct(it, 1)) : (o = t, st === 0 && ht(T));
								if (o !== t) {
									a = Lt();
									if (a !== t) {
										u = [];
										while (a !== t) u[f](a), a = Lt()
									} else u = t;
									u !== t ? e = [e, o, u] : (e = t, it = lt(c))
								} else e = t, it = lt(c)
							} else e = t, it = lt(c);
							return e !== t && (e = function(e, t, n, r, i) {
								return parseFloat(r + N + i[E](""))
							}(l[n], l[s], l[i], e[0], e[2])), e === t && (it = lt(l)), st--, st === 0 && e === t && ht("float"), e
						}

						function Lt() {
							var e, r, u;
							st++, u = lt(it), /^[0-9]/ [g](p[o](it[n])) ? (r = p[o](it[n]), ct(it, 1)) : (r = t, st === 0 && ht(y));
							if (r !== t) {
								e = [];
								while (r !== t) e[f](r), /^[0-9]/ [g](p[o](it[n])) ? (r = p[o](it[n]), ct(it, 1)) : (r = t, st === 0 && ht(y))
							} else e = t;
							return e !== t && (e = function(e, t, n, r) {
								return parseInt(r[E](""), 10)
							}(u[n], u[s], u[i], e)), e === t && (it = lt(u)), st--, st === 0 && e === t && ht("integer"), e
						}

						function At() {
							var e, o, a, l, d;
							st++, l = lt(it), d = lt(it), e = Ot(), e = e !== t ? e : "";
							if (e !== t) {
								a = _t(), a === t && (a = Mt());
								if (a !== t) {
									o = [];
									while (a !== t) o[f](a), a = _t(), a === t && (a = Mt())
								} else o = t;
								o !== t ? e = [e, o] : (e = t, it = lt(d))
							} else e = t, it = lt(d);
							e !== t && (e = function(e, t, n, r, i) {
								return i = i[0], r && i ? (i.unshift(r), [w, i][u]([
									[s, t],
									[c, n]
								])) : [C, i][u]([
									[s, t],
									[c, n]
								])
							}(l[n], l[s], l[i], e[0], e[1])), e === t && (it = lt(l));
							if (e === t) {
								l = lt(it), d = lt(it), p[r](it[n]) === 46 ? (e = N, ct(it, 1)) : (e = t, st === 0 && ht(T));
								if (e !== t) {
									o = [], a = _t(), a === t && (a = Mt());
									while (a !== t) o[f](a), a = _t(), a === t && (a = Mt());
									o !== t ? e = [e, o] : (e = t, it = lt(d))
								} else e = t, it = lt(d);
								e !== t && (e = function(e, t, n, r) {
									return r[h] > 0 ? [C, r[0]][u]([
										[s, t],
										[c, n]
									]) : [C, []][u]([
										[s, t],
										[c, n]
									])
								}(l[n], l[s], l[i], e[1])), e === t && (it = lt(l))
							}
							return st--, st === 0 && e === t && ht("path"), e
						}

						function Ot() {
							var e, r, u, a, l;
							st++, a = lt(it), l = lt(it), /^[a-zA-Z_$]/ [g](p[o](it[n])) ? (e = p[o](it[n]), ct(it, 1)) : (e = t, st === 0 && ht("[a-zA-Z_$]"));
							if (e !== t) {
								r = [], /^[0-9a-zA-Z_$\-]/ [g](p[o](it[n])) ? (u = p[o](it[n]), ct(it, 1)) : (u = t, st === 0 && ht(S));
								while (u !== t) r[f](u), /^[0-9a-zA-Z_$\-]/ [g](p[o](it[n])) ? (u = p[o](it[n]), ct(it, 1)) : (u = t, st === 0 && ht(S));
								r !== t ? e = [e, r] : (e = t, it = lt(l))
							} else e = t, it = lt(l);
							return e !== t && (e = function(e, t, n, r, i) {
								return r + i[E]("")
							}(a[n], a[s], a[i], e[0], e[1])), e === t && (it = lt(a)), st--, st === 0 && e === t && ht("key"), e
						}

						function Mt() {
							var e, r, u, a, l, c, h, d;
							st++, a = lt(it), l = lt(it), c = lt(it), h = lt(it), e = Ut();
							if (e !== t) {
								d = lt(it), /^[0-9]/ [g](p[o](it[n])) ? (u = p[o](it[n]), ct(it, 1)) : (u = t, st === 0 && ht(y));
								if (u !== t) {
									r = [];
									while (u !== t) r[f](u), /^[0-9]/ [g](p[o](it[n])) ? (u = p[o](it[n]), ct(it, 1)) : (u = t, st === 0 && ht(y))
								} else r = t;
								r !== t && (r = function(e, t, n, r) {
									return r[E]("")
								}(d[n], d[s], d[i], r)), r === t && (it = lt(d)), r === t && (r = Nt()), r !== t ? (u = zt(), u !== t ? e = [e, r, u] : (e = t, it = lt(h))) : (e = t, it = lt(h))
							} else e = t, it = lt(h);
							return e !== t && (e = function(e, t, n, r) {
								return r
							}(c[n], c[s], c[i], e[1])), e === t && (it = lt(c)), e !== t ? (r = _t(), r = r !== t ? r : "", r !== t ? e = [e, r] : (e = t, it = lt(l))) : (e = t, it = lt(l)), e !== t && (e = function(e, t, n, r, i) {
								return i ? i.unshift(r) : i = [r], i
							}(a[n], a[s], a[i], e[0], e[1])), e === t && (it = lt(a)), st--, st === 0 && e === t && ht("array"), e
						}

						function _t() {
							var e, o, a, l, c, h, d;
							st++, l = lt(it), c = lt(it), h = lt(it), d = lt(it), p[r](it[n]) === 46 ? (o = N, ct(it, 1)) : (o = t, st === 0 && ht(T)), o !== t ? (a = Ot(), a !== t ? o = [o, a] : (o = t, it = lt(d))) : (o = t, it = lt(d)), o !== t && (o = function(e, t, n, r) {
								return r
							}(h[n], h[s], h[i], o[1])), o === t && (it = lt(h));
							if (o !== t) {
								e = [];
								while (o !== t) e[f](o), h = lt(it), d = lt(it), p[r](it[n]) === 46 ? (o = N, ct(it, 1)) : (o = t, st === 0 && ht(T)), o !== t ? (a = Ot(), a !== t ? o = [o, a] : (o = t, it = lt(d))) : (o = t, it = lt(d)), o !== t && (o = function(e, t, n, r) {
									return r
								}(h[n], h[s], h[i], o[1])), o === t && (it = lt(h))
							} else e = t;
							return e !== t ? (o = Mt(), o = o !== t ? o : "", o !== t ? e = [e, o] : (e = t, it = lt(c))) : (e = t, it = lt(c)), e !== t && (e = function(e, t, n, r, i) {
								return i ? r[u](i) : r
							}(l[n], l[s], l[i], e[0], e[1])), e === t && (it = lt(l)), st--, st === 0 && e === t && ht("array_part"), e
						}

						function Dt() {
							var e, o, l, h, d;
							st++, h = lt(it), d = lt(it), p[r](it[n]) === 34 ? (e = b, ct(it, 1)) : (e = t, st === 0 && ht(v)), e !== t ? (p[r](it[n]) === 34 ? (o = b, ct(it, 1)) : (o = t, st === 0 && ht(v)), o !== t ? e = [e, o] : (e = t, it = lt(d))) : (e = t, it = lt(d)), e !== t && (e = function(e, t, n) {
								return [a, ""][u]([
									[s, t],
									[c, n]
								])
							}(h[n], h[s], h[i])), e === t && (it = lt(h));
							if (e === t) {
								h = lt(it), d = lt(it), p[r](it[n]) === 34 ? (e = b, ct(it, 1)) : (e = t, st === 0 && ht(v)), e !== t ? (o = Bt(), o !== t ? (p[r](it[n]) === 34 ? (l = b, ct(it, 1)) : (l = t, st === 0 && ht(v)), l !== t ? e = [e, o, l] : (e = t, it = lt(d))) : (e = t, it = lt(d))) : (e = t, it = lt(d)), e !== t && (e = function(e, t, n, r) {
									return [a, r][u]([
										[s, t],
										[c, n]
									])
								}(h[n], h[s], h[i], e[1])), e === t && (it = lt(h));
								if (e === t) {
									h = lt(it), d = lt(it), p[r](it[n]) === 34 ? (e = b, ct(it, 1)) : (e = t, st === 0 && ht(v));
									if (e !== t) {
										l = Pt();
										if (l !== t) {
											o = [];
											while (l !== t) o[f](l), l = Pt()
										} else o = t;
										o !== t ? (p[r](it[n]) === 34 ? (l = b, ct(it, 1)) : (l = t, st === 0 && ht(v)), l !== t ? e = [e, o, l] : (e = t, it = lt(d))) : (e = t, it = lt(d))
									} else e = t, it = lt(d);
									e !== t && (e = function(e, t, n, r) {
										return [O][u](r)[u]([
											[s, t],
											[c, n]
										])
									}(h[n], h[s], h[i], e[1])), e === t && (it = lt(h))
								}
							}
							return st--, st === 0 && e === t && ht("inline"), e
						}

						function Pt() {
							var e, r;
							return e = Tt(), e === t && (e = Et(), e === t && (r = lt(it), e = Bt(), e !== t && (e = function(e, t, n, r) {
								return [L, r]
							}(r[n], r[s], r[i], e)), e === t && (it = lt(r)))), e
						}

						function Ht() {
							var e, r, a, d, v, m, g, y, b;
							st++, m = lt(it), g = lt(it), e = Wt();
							if (e !== t) {
								r = [], a = Xt();
								while (a !== t) r[f](a), a = Xt();
								r !== t ? e = [e, r] : (e = t, it = lt(g))
							} else e = t, it = lt(g);
							e !== t && (e = function(e, t, n, r, i) {
								return ["format", r, i[E]("")][u]([
									[s, t],
									[c, n]
								])
							}(m[n], m[s], m[i], e[0], e[1])), e === t && (it = lt(m));
							if (e === t) {
								m = lt(it), g = lt(it), y = lt(it), b = lt(it), st++, r = It(), st--, r === t ? r = "" : (r = t, it = lt(b)), r !== t ? (b = lt(it), st++, a = Ft(), st--, a === t ? a = "" : (a = t, it = lt(b)), a !== t ? (b = lt(it), st++, d = Wt(), st--, d === t ? d = "" : (d = t, it = lt(b)), d !== t ? (p[h] > it[n] ? (v = p[o](it[n]), ct(it, 1)) : (v = t, st === 0 && ht(l)), v !== t ? r = [r, a, d, v] : (r = t, it = lt(y))) : (r = t, it = lt(y))) : (r = t, it = lt(y))) : (r = t, it = lt(y)), r !== t && (r = function(e, t, n, r) {
									return r
								}(g[n], g[s], g[i], r[3])), r === t && (it = lt(g));
								if (r !== t) {
									e = [];
									while (r !== t) e[f](r), g = lt(it), y = lt(it), b = lt(it), st++, r = It(), st--, r === t ? r = "" : (r = t, it = lt(b)), r !== t ? (b = lt(it), st++, a = Ft(), st--, a === t ? a = "" : (a = t, it = lt(b)), a !== t ? (b = lt(it), st++, d = Wt(), st--, d === t ? d = "" : (d = t, it = lt(b)), d !== t ? (p[h] > it[n] ? (v = p[o](it[n]), ct(it, 1)) : (v = t, st === 0 && ht(l)), v !== t ? r = [r, a, d, v] : (r = t, it = lt(y))) : (r = t, it = lt(y))) : (r = t, it = lt(y))) : (r = t, it = lt(y)), r !== t && (r = function(e, t, n, r) {
										return r
									}(g[n], g[s], g[i], r[3])), r === t && (it = lt(g))
								} else e = t;
								e !== t && (e = function(e, t, n, r) {
									return [L, r[E]("")][u]([
										[s, t],
										[c, n]
									])
								}(m[n], m[s], m[i], e)), e === t && (it = lt(m))
							}
							return st--, st === 0 && e === t && ht(L), e
						}

						function Bt() {
							var e, r, u, l, c, h, d;
							st++, l = lt(it), c = lt(it), h = lt(it), d = lt(it), st++, r = It(), st--, r === t ? r = "" : (r = t, it = lt(d)), r !== t ? (u = jt(), u === t && (/^[^"]/ [g](p[o](it[n])) ? (u = p[o](it[n]), ct(it, 1)) : (u = t, st === 0 && ht('[^"]'))), u !== t ? r = [r, u] : (r = t, it = lt(h))) : (r = t, it = lt(h)), r !== t && (r = function(e, t, n, r) {
								return r
							}(c[n], c[s], c[i], r[1])), r === t && (it = lt(c));
							if (r !== t) {
								e = [];
								while (r !== t) e[f](r), c = lt(it), h = lt(it), d = lt(it), st++, r = It(), st--, r === t ? r = "" : (r = t, it = lt(d)), r !== t ? (u = jt(), u === t && (/^[^"]/ [g](p[o](it[n])) ? (u = p[o](it[n]), ct(it, 1)) : (u = t, st === 0 && ht('[^"]'))), u !== t ? r = [r, u] : (r = t, it = lt(h))) : (r = t, it = lt(h)), r !== t && (r = function(e, t, n, r) {
									return r
								}(c[n], c[s], c[i], r[1])), r === t && (it = lt(c))
							} else e = t;
							return e !== t && (e = function(e, t, n, r) {
								return r[E]("")
							}(l[n], l[s], l[i], e)), e === t && (it = lt(l)), st--, st === 0 && e === t && ht(a), e
						}

						function jt() {
							var e, r;
							return r = lt(it), p[A](it[n], 2) === H ? (e = H, ct(it, 2)) : (e = t, st === 0 && ht('"\\\\\\""')), e !== t && (e = function(e, t, n) {
								return b
							}(r[n], r[s], r[i])), e === t && (it = lt(r)), e
						}

						function Ft() {
							var e, r, a, d, v, m, g, y, b;
							st++, v = lt(it), m = lt(it), p[A](it[n], 2) === "{!" ? (e = "{!", ct(it, 2)) : (e = t, st === 0 && ht('"{!"'));
							if (e !== t) {
								r = [], g = lt(it), y = lt(it), b = lt(it), st++, p[A](it[n], 2) === P ? (a = P, ct(it, 2)) : (a = t, st === 0 && ht(q)), st--, a === t ? a = "" : (a = t, it = lt(b)), a !== t ? (p[h] > it[n] ? (d = p[o](it[n]), ct(it, 1)) : (d = t, st === 0 && ht(l)), d !== t ? a = [a, d] : (a = t, it = lt(y))) : (a = t, it = lt(y)), a !== t && (a = function(e, t, n, r) {
									return r
								}(g[n], g[s], g[i], a[1])), a === t && (it = lt(g));
								while (a !== t) r[f](a), g = lt(it), y = lt(it), b = lt(it), st++, p[A](it[n], 2) === P ? (a = P, ct(it, 2)) : (a = t, st === 0 && ht(q)), st--, a === t ? a = "" : (a = t, it = lt(b)), a !== t ? (p[h] > it[n] ? (d = p[o](it[n]), ct(it, 1)) : (d = t, st === 0 && ht(l)), d !== t ? a = [a, d] : (a = t, it = lt(y))) : (a = t, it = lt(y)), a !== t && (a = function(e, t, n, r) {
									return r
								}(g[n], g[s], g[i], a[1])), a === t && (it = lt(g));
								r !== t ? (p[A](it[n], 2) === P ? (a = P, ct(it, 2)) : (a = t, st === 0 && ht(q)), a !== t ? e = [e, r, a] : (e = t, it = lt(m))) : (e = t, it = lt(m))
							} else e = t, it = lt(m);
							return e !== t && (e = function(e, t, n, r) {
								return [R, r[E]("")][u]([
									[s, t],
									[c, n]
								])
							}(v[n], v[s], v[i], e[1])), e === t && (it = lt(v)), st--, st === 0 && e === t && ht(R), e
						}

						function It() {
							var e, r, i, s, u, a, c, d, v, m, y;
							v = lt(it), e = qt();
							if (e !== t) {
								r = [], i = Xt();
								while (i !== t) r[f](i), i = Xt();
								if (r !== t) {
									/^[#?^><+%:@\/~%]/ [g](p[o](it[n])) ? (i = p[o](it[n]), ct(it, 1)) : (i = t, st === 0 && ht("[#?^><+%:@\\/~%]"));
									if (i !== t) {
										s = [], u = Xt();
										while (u !== t) s[f](u), u = Xt();
										if (s !== t) {
											m = lt(it), y = lt(it), st++, a = Rt(), st--, a === t ? a = "" : (a = t, it = lt(y)), a !== t ? (y = lt(it), st++, c = Wt(), st--, c === t ? c = "" : (c = t, it = lt(y)), c !== t ? (p[h] > it[n] ? (d = p[o](it[n]), ct(it, 1)) : (d = t, st === 0 && ht(l)), d !== t ? a = [a, c, d] : (a = t, it = lt(m))) : (a = t, it = lt(m))) : (a = t, it = lt(m));
											if (a !== t) {
												u = [];
												while (a !== t) u[f](a), m = lt(it), y = lt(it), st++, a = Rt(), st--, a === t ? a = "" : (a = t, it = lt(y)), a !== t ? (y = lt(it), st++, c = Wt(), st--, c === t ? c = "" : (c = t, it = lt(y)), c !== t ? (p[h] > it[n] ? (d = p[o](it[n]), ct(it, 1)) : (d = t, st === 0 && ht(l)), d !== t ? a = [a, c, d] : (a = t, it = lt(m))) : (a = t, it = lt(m))) : (a = t, it = lt(m))
											} else u = t;
											if (u !== t) {
												a = [], c = Xt();
												while (c !== t) a[f](c), c = Xt();
												a !== t ? (c = Rt(), c !== t ? e = [e, r, i, s, u, a, c] : (e = t, it = lt(v))) : (e = t, it = lt(v))
											} else e = t, it = lt(v)
										} else e = t, it = lt(v)
									} else e = t, it = lt(v)
								} else e = t, it = lt(v)
							} else e = t, it = lt(v);
							return e === t && (e = Et()), e
						}

						function qt() {
							var e;
							return p[r](it[n]) === 123 ? (e = "{", ct(it, 1)) : (e = t, st === 0 && ht('"{"')), e
						}

						function Rt() {
							var e;
							return p[r](it[n]) === 125 ? (e = "}", ct(it, 1)) : (e = t, st === 0 && ht('"}"')), e
						}

						function Ut() {
							var e;
							return p[r](it[n]) === 91 ? (e = "[", ct(it, 1)) : (e = t, st === 0 && ht('"["')), e
						}

						function zt() {
							var e;
							return p[r](it[n]) === 93 ? (e = "]", ct(it, 1)) : (e = t, st === 0 && ht('"]"')), e
						}

						function Wt() {
							var e;
							return p[r](it[n]) === 10 ? (e = "\n", ct(it, 1)) : (e = t, st === 0 && ht('"\\n"')), e === t && (p[A](it[n], 2) === "\r\n" ? (e = "\r\n", ct(it, 2)) : (e = t, st === 0 && ht('"\\r\\n"')), e === t && (p[r](it[n]) === 13 ? (e = "\r", ct(it, 1)) : (e = t, st === 0 && ht('"\\r"')), e === t && (p[r](it[n]) === 8232 ? (e = "\u2028", ct(it, 1)) : (e = t, st === 0 && ht('"\\u2028"')), e === t && (p[r](it[n]) === 8233 ? (e = "\u2029", ct(it, 1)) : (e = t, st === 0 && ht('"\\u2029"')))))), e
						}

						function Xt() {
							var e;
							return /^[\t\x0B\f \xA0\uFEFF]/ [g](p[o](it[n])) ? (e = p[o](it[n]), ct(it, 1)) : (e = t, st === 0 && ht("[\\t\\x0B\\f \\xA0\\uFEFF]")), e === t && (e = Wt()), e
						}

						function Vt(e) {
							e.sort();
							var n = t,
								r = [];
							for (var i = 0; i < e[h]; i++) e[i] !== n && (r[f](e[i]), n = e[i]);
							return r
						}
						var $ = {
							body: pt,
							part: dt,
							section: vt,
							sec_tag_start: mt,
							end_tag: gt,
							context: yt,
							params: bt,
							bodies: wt,
							reference: Et,
							partial: St,
							filters: xt,
							special: Tt,
							identifier: Nt,
							number: Ct,
							"float": kt,
							integer: Lt,
							path: At,
							key: Ot,
							array: Mt,
							array_part: _t,
							inline: Dt,
							inline_part: Pt,
							buffer: Ht,
							literal: Bt,
							esc: jt,
							comment: Ft,
							tag: It,
							ld: qt,
							rd: Rt,
							lb: Ut,
							rb: zt,
							eol: Wt,
							ws: Xt
						};
						if (M !== undefined) {
							if ($[M] === undefined) throw new Error("Invalid rule name: " + e(M) + N)
						} else M = O;
						var it = {
								offset: 0,
								line: 1,
								column: 1,
								seenCR: w
							},
							st = 0,
							ot = {
								offset: 0,
								line: 1,
								column: 1,
								seenCR: w
							},
							ut = [],
							$t = $[M]();
						if ($t === t || it[n] !== p[h]) {
							var Jt = Math.max(it[n], ot[n]),
								Kt = Jt < p[h] ? p[o](Jt) : t,
								Qt = it[n] > ot[n] ? it : ot;
							throw new U[m](Vt(ut), Kt, Jt, Qt[s], Qt[i])
						}
						return $t
					},
					toSource: function() {
						return this._source
					}
				};
				return it[m] = function(t, r, o, u, a) {
					function f(t, n) {
						var r, i;
						switch (t[h]) {
							case 0:
								r = M;
								break;
							case 1:
								r = t[0];
								break;
							default:
								r = t.slice(0, t[h] - 1)[E](", ") + " or " + t[t[h] - 1]
						}
						return i = n ? e(n) : M, "Expected " + r + " but " + i + " found."
					}
					this.name = m, this.expected = t, this.found = r, this.message = f(t, r), this[n] = o, this[s] = u, this[i] = a
				}, it[m].prototype = Error.prototype, it
			}();
		e.parse = U.parse
	}(typeof exports != "undefined" ? exports : getGlobal());