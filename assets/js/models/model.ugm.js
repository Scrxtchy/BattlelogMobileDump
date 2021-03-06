var _ = require("underscore"),
	BL = require("backbone-helper");
(function(e, t, n) {
	var r = !0,
		i = !1,
		s = "personaId",
		o = "platform",
		u = "game",
		a = "playingMp",
		f = "onlineGame",
		l = Backbone.Model.extend({
			defaults: {
				hidden: r,
				isHidden: r,
				error: i,
				warning: i,
				isPlaying: i,
				onlineGame: i,
				playingMp: i,
				isSelf: r
			},
			isSelf: function(e, t) {
				if (!e) return i;
				t = t || this.toJSON(), t[s] = t[s] || e[s], t[o] = t[o] || e[o], t[u] = t[u] || e[u];
				if (t[a] || t[f]) t[a] ? (t[s] = t[a][s], t[o] = t[a][o], t[u] = t[a][u]) : (t[s] = t[f][s], t[o] = t[f][o], t[u] = t[f][u]), this.set({
					personaId: t[s],
					platform: t[o],
					game: t[u]
				}, {
					silent: r
				});
				return e[s] == t[s] && e[o] == t[o]
			},
			canJoin: function(e, t, n) {
				var s = i,
					l = this.get(a) || this.get(f) || i;
				if (typeof n != "object") throw new Error("You must provide a soldier object to validate against");
				return l && e == l[o] && t == l[u] && e == n[o] && t == n[u] && (s = r), s
			},
			onServer: function(e) {
				var t = i,
					n = this.get(a) || i;
				return n && (t = n.serverGuid == e), t
			}
		});
	n.extend(BL.backbone.model_definitions, {
		ugm_model: l
	})
})(window, jQuery, _);