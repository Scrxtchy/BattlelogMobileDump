var _ = require("underscore"),
	Backbone = require("backbone");
(function(e, t) {
	function m(e, t) {
		var n = this[e + r],
			f = t[i],
			l = typeof n[f] !== s,
			c;
		return t.reset && l ? (e == o ? n[f][u]() : e == a && n[f].reset(), delete n[f], c = g.call(this, e, t)) : c = l ? n[f] : g.call(this, e, t), c
	}

	function g(e, t) {
		var n = this[e + "_definitions"],
			a = t[i],
			l = typeof n[a] !== s,
			c;
		if (!l) throw console.trace(), new Error(e + " definition not found: " + a + ". Did you add it to the BL.backbone." + e + "_definitions object?");
		c = this[e + r][a] = new n[a](t.data || null);
		if (t[f])
			for (var h in t[f]) {
				var p = t[f][h];
				c[h] = p
			}
		return c[i] = a, e == o && this[e + r][a].on(u, function() {
			delete this[e + r][a]
		}, this), c
	}
	var n = "backbone",
		r = "_instances",
		i = "name",
		s = "undefined",
		o = "model",
		u = "destroy",
		a = "collection",
		f = "options",
		l = "get_model",
		c = "get_collection",
		h = "view_instances",
		p = "remove",
		d = "create_view",
		exports, v = n;
	exports = {
		view_definitions: {},
		model_definitions: {},
		collection_definitions: {},
		view_instances: {},
		model_instances: {},
		collection_instances: {}
	}, exports[l] = function(e) {
		return typeof e[i] === s && (e = {
			name: e
		}), m.call(this, o, e)
	}, exports[c] = function(e) {
		return typeof e[i] === s && (e = {
			name: e
		}), m.call(this, a, e)
	}, exports.get_view = function(e, t, n) {
		typeof e[i] === s && (e = {
			name: e
		});
		var r = this[h],
			o = e[i];
		return e.reset && r[o] && r[o][p](), r[o] ? r[o] : this[d](e, t, n)
	}, exports[d] = function(e, t, n) {
		var r = e[i],
			s = this.view_definitions[r],
			o = !t || t instanceof Backbone.Model ? t : this[l](t),
			u = !n || n instanceof Backbone.Collection ? n : this[c](n);
		s = s ? this[h][r] = new s({
			model: o,
			collection: u
		}) : "";
		if (e[f])
			for (var a in e[f]) {
				var d = e[f][a];
				s[a] = d
			}
		return this[h][r].on(p, function() {
			delete this[h][r]
		}, this), s[i] = r, s
	}, exports.get = function(e) {
		var t;
		return e.view ? t = this.get_view(e.view, e[o], e[a]) : e[o] ? t = this[l](e[o]) : e[a] && (t = this[c](e[a])), t
	}, e.BL || (e.BL = {}), e.BL[n] = exports;
	var y = Backbone.View.prototype[p];
	Backbone.View.prototype[p] = function() {
		return this.trigger(p), y.apply(this, arguments)
	}
})(window, _);