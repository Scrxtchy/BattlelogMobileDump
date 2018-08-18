var __indexOf = [].indexOf || function(e) {
	for (var t = 0, n = this.length; t < n; t++)
		if (t in this && this[t] === e) return t;
	return -1
};
module.exports = {
	PatternPrototype: {
		match: function(e) {
			var t = null,
				n, r, i, s, o, u, a, f;
			s = this.regex.exec(e);
			if (s == t) return t;
			r = s.slice(1);
			if (this.isRegex) return r;
			n = {};
			for (i = a = 0, f = r.length; a < f; i = ++a) {
				u = r[i], o = this.names[i];
				if (u == t) continue;
				o === "_" ? (n._ == t && (n._ = []), n._.push(u)) : n[o] = u
			}
			return n
		}
	},
	newPattern: function(e, t) {
		var n = "exports",
			r, i, s;
		t == null && (t = "/"), r = e instanceof RegExp;
		if ("string" != typeof e && !r) throw new TypeError("argument must be a regex or a string");
		return [":", "*"].forEach(function(e) {
			if (t === e) throw new Error("separator can't be " + e)
		}), i = Object.create(module[n].PatternPrototype), i.isRegex = r, i.regex = r ? e : (s = module[n].toRegexString(e, t), new RegExp(s)), r || (i.names = module[n].getNames(e, t)), i
	},
	escapeForRegex: function(e) {
		return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
	},
	getNames: function(e, t) {
		var n, r, i, s, o;
		t == null && (t = "/");
		if (e instanceof RegExp) return [];
		n = module.exports.escapeForRegex(t), s = new RegExp("((:?:[^" + n + "()]+)|(?:[*]))", "g"), i = [], o = s.exec(e);
		while (o != null) {
			r = o[1].slice(1);
			if (r === "_") throw new TypeError(":_ can't be used as a pattern name in pattern " + e);
			if (__indexOf.call(i, r) >= 0) throw new TypeError("duplicate pattern name :" + r + " in pattern " + e);
			i.push(r || "_"), o = s.exec(e)
		}
		return i
	},
	escapeSeparators: function(e, t) {
		var n, r;
		return t == null && (t = "/"), n = module.exports.escapeForRegex(t), r = new RegExp(n, "g"), e.replace(r, n)
	},
	toRegexString: function(e, t) {
		var n = "exports",
			r = "replace",
			i, s;
		return t == null && (t = "/"), s = module[n].escapeSeparators(e, t), s = s[r](/\((.*?)\)/g, "(?:$1)?")[r](/\*/g, "(.*?)"), i = module[n].escapeForRegex(t), module[n].getNames(e, t).forEach(function(e) {
			return s = s[r](":" + e, "([^\\" + t + "]+)")
		}), "^" + s + "$"
	}
};