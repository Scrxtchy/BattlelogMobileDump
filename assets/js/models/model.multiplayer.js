var _ = require("underscore"),
	BL = require("backbone-helper"),
	locale = require("locale"),
	levels = require("gamedata/warsaw/levels"),
	storage = require("storage"),
	serverdata = require("gamedata/warsaw/gameserver");
(function(e, t) {
	var n = "extend",
		r = !1,
		i = "filters",
		s = !0,
		o = "disabled",
		u = "data",
		a = "isFavorite",
		f = "extendedInfo",
		l = "serverTypeFilter",
		c = "gamepresets",
		h = "preset",
		p = "ID_WEB_COMMON_ON",
		d = "ID_WEB_COMMON_OFF",
		v = "parsedSettings",
		m = "settings",
		g = "gameServerSettings",
		y = "toLowerCase",
		b = "status",
		w = "currentPlayers",
		E = "maxPlayers",
		S = "gameExpansion",
		x = "slots",
		T = Backbone.Model[n]({
			defaults: {
				isChanged: r,
				filters: {
					gameslots: [1, 2, 4, 8],
					serverTypeFilter: [1, 2]
				},
				filterCount: 2
			},
			initialize: function() {
				this.readStorage()
			},
			updateStorage: function() {
				var e = this.get(i);
				this.set({
					filterCount: Object.keys(e).length || r
				}), storage.setObject(i, e)
			},
			clearFilter: function() {
				var e = JSON.parse(JSON.stringify(this.defaults[i]));
				this.set({
					filters: e
				}).trigger("change:filters")
			},
			readStorage: function() {
				var e = storage.getObject(i);
				e ? this.set({
					filters: e,
					filterCount: Object.keys(e).length || r
				}, {
					silent: s
				}) : this.updateStorage()
			}
		}),
		N = Backbone.Model[n]({
			defaults: {
				joinClass: o,
				joinTabComClass: o,
				joining: r,
				joiningTabCom: r,
				isTablet: r,
				inMain: s,
				inHistory: r,
				inFavorites: r,
				onServer: r,
				loading: s,
				xpack: r
			},
			idAttribute: "guid",
			initialize: function(e) {
				e.manual && this.set(this.parse(e))
			},
			parse: function(e) {
				var t = {};
				if (e[u]) {
					t = e[u].info, t[a] = e[u][a], t.players = e[u].players, t.loading = r, t[f] && (t[f].desc = t[f].desc || r, t[f].message = t[f].message || r, t[f].bannerUrl = t[f].bannerUrl || r), t.parsedBasicSettings = [{
						label: "ID_WEB_COMMON_TYPE",
						value: serverdata[l][serverdata[l].map(function(e) {
							return e.id
						}).indexOf(t.serverType)].label
					}, {
						label: "ID_WEB_COMMON_SERVERFILTER_PRESET",
						value: serverdata[c][serverdata[c].map(function(e) {
							return e.id
						}).indexOf(t[h])].label
					}, {
						label: "ID_WEB_COMMON_SERVERFILTER_FAIRFIGHT",
						value: t.fairfight ? p : d
					}, {
						label: "ID_WEB_COMMON_SERVERFILTER_PUNKBUSTER",
						value: t.punkbuster ? p : d
					}, {
						label: "ID_WEB_COMMON_SERVERFILTER_RANKED",
						value: t.ranked ? p : d
					}, {
						label: "ID_WEB_COMMON_PASSWORD",
						value: t.hasPassword ? p : d
					}], t[v] = r;
					if (t[m] && t[m].vshe) {
						t[v] = [];
						for (var n in serverdata[g]) {
							if (!serverdata[g].hasOwnProperty(n)) continue;
							var i = serverdata[g][n],
								s = t[m][n];
							typeof s == "undefined" && (s = 0), i.type == "bool" && (s = s ? "On" : "Off"), t[v].push({
								label: locale.t(i.nameSID),
								value: s
							})
						}
					}
				} else t = e;
				if (t.name) {
					t.mapClass = t.map[y](), t[b] = "", t[w] = "-", t[E] = "-", t[S] && (t.xpack = t[S]);
					if (t.online && t.map) {
						var o = levels.levels[t.map];
						o && (t[b] = locale.t(o.label)[y]() + " - " + locale.t("ID_WEB_COMMON_GAMEMODE_" + t.mapMode)), t[h] && (t[b] && (t[b] += " - "), t[b] += locale.t("ID_WEB_SERVERGUIDE_PRESET_" + t[h]))
					}
					t[x] && t[x][2] && (t[w] = t[x][2].current, t[E] = t[x][2].max), t[x] && t[x][4] && (t.currentCommanders = t[x][4].current, t.maxCommanders = t[x][4].max)
				}
				return t
			}
		});
	t[n](BL.backbone.collection_definitions, {
		server_list_collection: Backbone.Collection[n]({
			model: N,
			parse: function(e) {
				return e[u] && e[u].servers || e.servers
			}
		})
	}), t[n](BL.backbone.model_definitions, {
		multiplayer_model: T,
		server_model: N
	})
})(window, _);