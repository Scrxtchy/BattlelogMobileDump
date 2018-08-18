(function(dust) {
	function isSelect(e) {
		var t = e.current();
		return typeof t == "object" && t.isSelect === !0
	}

	function jsonFilter(e, t) {
		return typeof t == "function" ? t.toString() : t
	}

	function filter(e, t, n, r, i) {
		var s = "current",
			o = "isResolved",
			u = " helper ",
			a = "else";
		r = r || {};
		var f = n.block,
			l, c, h = r.filterOpType || "";
		if (typeof r.key != "undefined") l = dust.helpers.tap(r.key, e, t);
		else {
			if (!isSelect(t)) return _console.log("No key specified for filter in:" + h + u), e;
			l = t[s]().selectKey, t[s]()[o] && (i = function() {
				return !1
			})
		}
		return c = dust.helpers.tap(r.value, e, t), i(coerce(c, r.type, t), coerce(l, r.type, t)) ? (isSelect(t) && (t[s]()[o] = !0), f ? e.render(f, t) : (_console.log("Missing body block in the " + h + u), e)) : n[a] ? e.render(n[a], t) : e
	}

	function coerce(e, t, n) {
		if (e) switch (t || typeof e) {
			case "number":
				return +e;
			case "string":
				return String(e);
			case "boolean":
				return e = e === "false" ? !1 : e, Boolean(e);
			case "date":
				return new Date(e);
			case "context":
				return n.get(e)
		}
		return e
	}
	var _console = typeof console != "undefined" ? console : {
			log: function() {}
		},
		helpers = {
			tap: function(e, t, n) {
				var r = e;
				return typeof e == "function" && (e.isFunction === !0 ? r = e() : (r = "", t.tap(function(e) {
					return r += e, ""
				}).render(e, n).untap(), r === "" && (r = !1))), r
			},
			sep: function(e, t, n) {
				var r = n.block;
				return t.stack.index === t.stack.of - 1 ? e : r ? n.block(e, t) : e
			},
			idx: function(e, t, n) {
				var r = n.block;
				return r ? n.block(e, t.push(t.stack.index)) : e
			},
			contextDump: function(e, t, n, r) {
				var i = r || {},
					s = i.to || "output",
					o = i.key || "current",
					u;
				return s = dust.helpers.tap(s, e, t), o = dust.helpers.tap(o, e, t), o === "full" ? u = JSON.stringify(t.stack, jsonFilter, 2) : u = JSON.stringify(t.stack.head, jsonFilter, 2), s === "console" ? (_console.log(u), e) : e.write(u)
			},
			"if": function(chunk, context, bodies, params) {
				var body = bodies.block,
					skip = bodies["else"];
				if (params && params.cond) {
					var cond = params.cond;
					cond = dust.helpers.tap(cond, chunk, context);
					if (eval(cond)) return body ? chunk.render(bodies.block, context) : (_console.log("Missing body block in the if helper!"), chunk);
					if (skip) return chunk.render(bodies["else"], context)
				} else _console.log("No condition given in the if helper!");
				return chunk
			},
			math: function(e, t, n, r) {
				var i = "round",
					s = null;
				if (r && typeof r.key != "undefined" && r.method) {
					var o = r.key,
						u = r.method,
						a = r.operand,
						f = r[i],
						l = s,
						c = function() {
							return _console.log("operand is required for this math method"), s
						};
					o = dust.helpers.tap(o, e, t), a = dust.helpers.tap(a, e, t);
					switch (u) {
						case "mod":
							(a === 0 || a === 0) && _console.log("operand for divide operation is 0/-0: expect Nan!"), l = parseFloat(o) % parseFloat(a);
							break;
						case "add":
							l = parseFloat(o) + parseFloat(a);
							break;
						case "subtract":
							l = parseFloat(o) - parseFloat(a);
							break;
						case "multiply":
							l = parseFloat(o) * parseFloat(a);
							break;
						case "divide":
							(a === 0 || a === 0) && _console.log("operand for divide operation is 0/-0: expect Nan/Infinity!"), l = parseFloat(o) / parseFloat(a);
							break;
						case "ceil":
							l = Math.ceil(parseFloat(o));
							break;
						case "floor":
							l = Math.floor(parseFloat(o));
							break;
						case i:
							l = Math[i](parseFloat(o));
							break;
						case "abs":
							l = Math.abs(parseFloat(o));
							break;
						default:
							_console.log("method passed is not supported")
					}
					return l !== s ? (f && (l = Math[i](l)), n && n.block ? e.render(n.block, t.push({
						isSelect: !0,
						isResolved: !1,
						selectKey: l
					})) : e.write(l)) : e
				}
				return _console.log("Key is a required parameter for math helper along with method/operand!"), e
			},
			select: function(e, t, n, r) {
				var i = n.block;
				if (r && typeof r.key != "undefined") {
					var s = dust.helpers.tap(r.key, e, t);
					return i ? e.render(n.block, t.push({
						isSelect: !0,
						isResolved: !1,
						selectKey: s
					})) : (_console.log("Missing body block in the select helper "), e)
				}
				return _console.log("No key given in the select helper!"), e
			},
			eq: function(e, t, n, r) {
				return r && (r.filterOpType = "eq"), filter(e, t, n, r, function(e, t) {
					return t === e
				})
			},
			ne: function(e, t, n, r) {
				return r ? (r.filterOpType = "ne", filter(e, t, n, r, function(e, t) {
					return t !== e
				})) : e
			},
			lt: function(e, t, n, r) {
				if (r) return r.filterOpType = "lt", filter(e, t, n, r, function(e, t) {
					return t < e
				})
			},
			lte: function(e, t, n, r) {
				return r ? (r.filterOpType = "lte", filter(e, t, n, r, function(e, t) {
					return t <= e
				})) : e
			},
			gt: function(e, t, n, r) {
				return r ? (r.filterOpType = "gt", filter(e, t, n, r, function(e, t) {
					return t > e
				})) : e
			},
			gte: function(e, t, n, r) {
				return r ? (r.filterOpType = "gte", filter(e, t, n, r, function(e, t) {
					return t >= e
				})) : e
			},
			"default": function(e, t, n, r) {
				return r && (r.filterOpType = "default"), filter(e, t, n, r, function(e, t) {
					return !0
				})
			},
			size: function(e, t, n, r) {
				var i, s = 0,
					o, u;
				r = r || {}, i = r.key;
				if (!i || i === !0) s = 0;
				else if (dust.isArray(i)) s = i.length;
				else if (!isNaN(parseFloat(i)) && isFinite(i)) s = i;
				else if (typeof i == "object") {
					o = 0;
					for (u in i) Object.hasOwnProperty.call(i, u) && o++;
					s = o
				} else s = (i + "").length;
				return e.write(s)
			}
		};
	dust.helpers = helpers
})(typeof exports != "undefined" ? module.exports = require("dust") : dust);