var _ = require("underscore"),
	BL = require("backbone-helper"),
	locale = require("locale"),
	levels = require("gamedata/omaha/levels"),
	storage = require("storage"),
	serverdata = require("gamedata/omaha/gameserver");
(function(e, t) {
	var n = "extend",
		r = !1,
		i = "filters",
		s = "omaha.filters",
		o = !0,
		u = "disabled",
		a = "data",
		f = "isFavorite",
		l = "extendedInfo",
		c = "serverTypeFilter",
		h = "gamepresets",
		p = "On",
		d = "Off",
		v = "parsedSettings",
		m = "settings",
		g = "gameServerSettings",
		y = "currentPlayers",
		b = "maxPlayers",
		w = "gameExpansion",
		E = "slots",
		S = Backbone.Model[n]({
			defaults: {
				isChanged: r,
				filters: {
					gamepresets: [8],
					gameslots: [1, 2, 4, 8],
					serverTypeFilter: [1, 2]
				},
				filterCount: 3
			},
			initialize: function() {
				this.readStorage()
			},
			updateStorage: function() {
				var e = this.get(i);
				this.set({
					filterCount: Object.keys(e).length || r
				}), storage.setObject(s, e)
			},
			clearFilter: function() {
				this.set({
					filters: this.defaults[i]
				}).trigger("change:filters")
			},
			readStorage: function() {
				var e = storage.getObject(s);
				e ? this.set({
					filters: e,
					filterCount: Object.keys(e).length || r
				}, {
					silent: o
				}) : this.updateStorage()
			}
		}),
		x = Backbone.Model[n]({
			defaults: {
				joinClass: u,
				joinTabComClass: u,
				joining: r,
				joiningTabCom: r,
				isTablet: r,
				inMain: o,
				inHistory: r,
				inFavorites: r,
				onServer: r,
				loading: o,
				xpack: r
			},
			idAttribute: "guid",
			initialize: function(e) {
				e.manual && this.set(this.parse(e))
			},
			parse: function(e) {
				var t = {};
				if (e[a]) {
					t = e[a].info, t[f] = e[a][f], t.players = e[a].players, t.loading = r, t[l] && (t[l].desc = t[l].desc || r, t[l].message = t[l].message || r, t[l].bannerUrl = t[l].bannerUrl || r), t.parsedBasicSettings = [{
						label: "ID_WEB_COMMON_TYPE",
						value: serverdata[c][serverdata[c].map(function(e) {
							return e.id
						}).indexOf(t.serverType)].label
					}, {
						label: "ID_WEB_COMMON_SERVERFILTER_PRESET",
						value: serverdata[h][serverdata[h].map(function(e) {
							return e.id
						}).indexOf(t.preset)].label
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
							typeof s == "undefined" && (s = 0), i.type == "bool" && (s = s ? p : d), t[v].push({
								label: locale.t(i.nameSID),
								value: s
							})
						}
					}
				} else t = e;
				t.mapClass = t.map.toLowerCase(), t.status = "", t[y] = "-", t[b] = "-", t[w] && (t.xpack = t[w]);
				if (t.online && t.map) {
					var o = levels.levels[t.map];
					o && (t.status = locale.t(o.label) + " - " + locale.t("ID_WEB_COMMON_GAMEMODE_" + t.mapMode))
				}
				return t[E] && t[E][2] && (t[y] = t[E][2].current, t[b] = t[E][2].max), t
			}
		});
	t[n](BL.backbone.collection_definitions, {
		omaha_server_list_collection: Backbone.Collection[n]({
			model: x,
			parse: function(e) {
				return e[a] && e[a].servers || e.servers
			}
		})
	}), t[n](BL.backbone.model_definitions, {
		omaha_multiplayer_model: S,
		omaha_server_model: x
	})
})(window, _);