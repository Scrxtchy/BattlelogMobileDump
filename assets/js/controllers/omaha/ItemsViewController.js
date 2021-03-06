function ItemsViewController(e) {
	var t = "_display",
		n = "list",
		r = "_activePersona",
		i = "persona",
		s = "personaId",
		o = "_mysoldier";
	e = e || {}, this._type = e.type || "weapons", this._section = "omaha", this._game = enums.Game.OMAHA, this[t] = e.display || n, this._templateParams = {
		type: this._type,
		display: this[t],
		loading: !0
	}, this._name = "ItemsView", this[r] = session.getUserActivePersonaForGame(this._game), this._persona = e[i] || this[r][i], this._personaId = e[s] || this[r][i][s], this._platform = e.platform || this[r].platform, this[o] = e[s] == this[r][i][s], this.update_vars(), this._model = BL.backbone.get({
		model: {
			name: this[o] ? "items_list_model" : "items_list_friend_model"
		}
	}), ScrollableViewController.call(this, e), this.titleSID = this[t] == n ? "ID_MOBILE_VIEW_TITLE_STATS" : "ID_MOBILE_VIEW_TITLE_UNLOCKS", this.niceVehicleCategoryName = {
		"VEHICLE COUNTER ATTACK TRUCKS": "ID_WEB_VEHICLE_COUNTER_ATTACK_TRUCKS",
		"VEHICLE SUV": "ID_WEB_VEHICLE_SUV",
		"VEHICLE GUN BOAT": "ID_WEB_VEHICLE_GUN_BOAT",
		"VEHICLE CIVILIAN": "ID_WEB_VEHICLE_CIVILIAN",
		"VEHICLE COUPE": "ID_WEB_VEHICLE_COUPE",
		"VEHICLE STREET MOTORCYCLE": "ID_WEB_VEHICLE_STREET_MOTORCYCLE",
		"VEHICLE SEDAN": "ID_WEB_VEHICLE_SEDAN",
		"VEHICLE ATTACK HELICOPTER": "ID_WEB_VEHICLE_ATTACK_HELICOPTER",
		"VEHICLE MOBILE SPAWN POINT": "ID_WEB_VEHICLE_MOBILE_SPAWN_POINT",
		"VEHICLE JETSKI": "ID_WEB_VEHICLE_JETSKI",
		"VEHICLE OFFROAD MOTORCYCLE": "ID_WEB_VEHICLE_OFFROAD_MOTORCYCLE",
		"VEHICLE TRANSPORT HELICOPTER": "ID_WEB_VEHICLE_TRANSPORT_HELICOPTER",
		"VEHICLE PLANE": "ID_WEB_VEHICLE_PLANE"
	}, this.vehicleNoServiceStars = [], this._model.fetch(this.get_url())
}
var app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	util = require("util"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	Push = require("push"),
	web = require("web"),
	template = require("template"),
	_ = require("underscore"),
	items_json = require("gamedata/omaha/items"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	model = require("models/model.items");
module.exports = ItemsViewController, ItemsViewController.prototype = new ScrollableViewController, ItemsViewController.prototype.constructor = ItemsViewController, ItemsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.bind_fetch()
}, ItemsViewController.prototype.viewDidAppear = function() {
	this.$content.find(".sectiontable").length && this.bind_events(), this._model.on("change", this.render, this), this._model.get(this._type + "Stats") && this.render()
}, ItemsViewController.prototype.viewDidDisappear = function() {
	this.unbind_events(), this._model.off()
}, ItemsViewController.prototype.update_vars = function() {
	var e = "_type",
		t = "_friendlyname",
		n = this;
	n._items = items_json[n[e]], n[e] == "weapons" ? n[t] = "Weapon" : n[e] == "vehicles" ? n[t] = "Vehicle" : n[e] == "kititems" ? n[t] = "Item" : n[t] = ""
}, ItemsViewController.prototype.get_url = function() {
	return web.url(this._game, this._type, {
		personaId: this._personaId,
		platform: this._platform
	})
}, ItemsViewController.prototype.bind_fetch = function() {
	var e = this;
	Push.bind("UserStatsUpdated", function() {
		e._model.set({
			loading: !0
		}, {
			silent: !0
		}), e._model.fetch(e.get_url())
	})
}, ItemsViewController.prototype.bind_events = function() {
	var e = "_hasEvents",
		t = "click",
		n = "getAttribute",
		r = "data-type";
	if (this[e]) return;
	this[e] = !0;
	var i = this;
	i.$content.find(".segmentedcontrol a").on(t, function() {
		var e = this[n](r);
		i.switchTabs(e)
	}), i.$content.find(".item:not(.empty)").on(t, function() {
		var e = this[n](r),
			t = this[n]("data-guid"),
			s = this[n]("data-category");
		app.go("ItemViewController", {
			section: i._section,
			type: e,
			category: s,
			guid: t
		})
	})
}, ItemsViewController.prototype.unbind_events = function() {
	if (!this._hasEvents) return;
	this._hasEvents = !1, this.$content.find(".segmentedcontrol a").off(), this.$content.find(".item:not(.empty)").off()
}, ItemsViewController.prototype.switchTabs = function(e) {
	var t = this;
	t._type = e, t.update_vars(), t._model.set({
		loading: !0
	}, {
		silent: !0
	}), t._model.fetch(t.get_url())
}, ItemsViewController.prototype.build_grid = function(e) {
	var t = "weapons",
		n = "length",
		r = "weaponUnlock",
		i = "locked",
		s = !0,
		o = "licenseUnlocked",
		u = !1,
		a = "category",
		f = "unlockedBy",
		l = "imageConfig",
		c = "nameSID",
		h = "unlockType",
		p = "bucket",
		d = "completion",
		v = "bucketRelativeCompletion",
		m = "push",
		g = "kititems",
		y = "kitItemUnlock",
		b = "undefined",
		w = "valueNeeded",
		E = this,
		S = [],
		x = [],
		T = 0,
		N = 0;
	if (E._type == t) {
		x = {}, S = e.weaponsByCategory;
		var C = ["sc_assault", "sc_recon", "sc_support", "sc_engineer"],
			k = ["wA", "waS", "wSR", "wH", "wG"],
			L = {
				wA: "ID_WEB_ASSAULTRIFLES",
				wC: "ID_WEB_CARBINES",
				wD: "ID_WEB_DMRS",
				wG: "ID_WEB_HANDGRANADES",
				wH: "ID_WEB_HANDGUNS",
				wL: "ID_WEB_LMGS",
				waPDW: "ID_WEB_PDWS",
				waS: "ID_WEB_SHOTGUNS",
				wSR: "ID_WEB_SNIPERRIFLES",
				wSPk: "ID_WEB_KNIVES"
			},
			A = 0,
			O = k[n];
		while (A < O) {
			var M = k[A],
				_ = {
					bucketUnlocks: [],
					licenseUnlocks: []
				},
				D = S[M],
				P = 0,
				H = D[n];
			while (P < H) {
				T++;
				var B = D[P][r];
				B[i] = s, B[o] = u, B[a] = "";
				var j = B[f];
				j.completed && (B[i] = u, N++);
				var F = E._items[B.guid];
				if (F) {
					B[l] = F[l], B[c] = F[c];
					if (j[h] == p && C.indexOf(j.codeNeeded) == -1) {
						for (var I in j) B[I] = j[I];
						B[d] = j[v], _.bucketUnlocks[m](B)
					} else B[o] = s, _.licenseUnlocks[m](B)
				}
				P++
			}
			for (var q in _) {
				var R = _[q][n];
				R % 3 == 2 ? _[q][m]({
					empty: s
				}) : R % 3 == 1 && _[q][m]({
					empty: s
				}, {
					empty: s
				})
			}
			x[L[M]] = _, A++
		}
	} else if (E._type == g) {
		S = e.kititemsStats, x = {};
		var U = [1, 2, 32, 8],
			z = 0,
			W = U[n];
		while (z < W) {
			var X = U[z],
				V = S[X],
				$ = util.kitEnum_to_kitName(X, E._game, s);
			x[$] = [];
			var J = 0,
				K = V[n];
			while (J < K) {
				var Q = V[J],
					G = g,
					Y = null;
				if (Q[y] == null) Y = Q[r], G = t;
				else {
					Y = Q[y];
					var Z = ["defibrillator1", "carbine", "dmr", "shotgun", "m18-claymore1", "m2-slam1", "m15-at-mine1", "m224-mortar2"];
					if (Z.indexOf(Y.slug) != -1) {
						J++;
						continue
					}
				}
				T++;
				var et = items_json[G][Y.guid];
				typeof et !== b && (et[a] = X, et[i] = u, et[w] = Infinity, et[o] = u, Y[f] && (et[i] = s, Y[f].completed ? (et[i] = u, et[d] = 100, N++) : Y[f][h] == p && (et[d] = Y[f][v] || 0, et[d] == 100 && (et[i] = u, N++), et[w] = Y[f][w])), x[$][m](et)), J++
			}
			var tt = x[$][n];
			tt % 3 == 2 ? x[$][m]({
				empty: s
			}) : tt % 3 == 1 && x[$][m]({
				empty: s
			}, {
				empty: s
			}), z++
		}
	} else {
		S = e.vehiclesProgression, x = {};
		for (var nt in S) {
			var rt = E.niceVehicleCategoryName[nt.toUpperCase()],
				it = S[nt];
			x[rt] = [];
			var J = 0,
				K = it[n];
			T += K;
			while (J < K) {
				var et = it[J],
					F = items_json.vehicleunlocks[et.guid];
				typeof F !== b && (et[a] = nt, et[l] = F[l], et[c] = F[c], et[i] = u, et[w] = Infinity, et[f] ? (et[i] = s, et[f][h] == p && (et[d] = et[f][v] || 0, et[d] == 100 && (et[i] = u, N++), et[w] = et[f][w])) : N++, x[rt][m](et)), J++
			}
			K % 3 == 2 ? x[rt][m]({
				empty: s
			}) : K % 3 == 1 && x[rt][m]({
				empty: s
			}, {
				empty: s
			})
		}
	}
	var st = Math.floor(N / T * 100);
	return {
		items: x,
		completion: st,
		current: N,
		max: T
	}
}, ItemsViewController.prototype.build_list = function(e) {
	var t = "kills",
		n = "guid",
		r = "undefined",
		i = "isTrackedManually",
		s = !1,
		o = !0,
		u = "locked",
		a = "formatStatValue",
		f = "-",
		l = "friendlyDuration",
		c = "timeUsed",
		h = "time",
		p = "accuracy",
		d = "completion",
		v = "push",
		m = this,
		g = e[m._type + "Stats"],
		y = e[m._type + "Meta"],
		b = [],
		w = [],
		E = m._model.get("suggestions");
	g.sort(function(e, n) {
		return n[t] - e[t]
	});
	if (m._type == "weapons") {
		var S = 0,
			x = g.length;
		while (S < x) {
			var T = g[S],
				N = m._items[T[n]];
			if (typeof N !== r) {
				for (var C in T) N[C] = T[C];
				N[i] = s;
				if (E) {
					var k = 0;
					while (k < E.length) {
						var L = E[k];
						L[n] == N[n] && L[i] && (N[i] = o), k++
					}
				}
				N.hasServiceStars = o, N[u] = o, N[t] = N[t] > 0 ? util[a](N[t]) : f, N[l] = N[c] > 0 ? util[a](N[c], h) : f, N[p] = N[p] > 0 ? util[a](N[p], "percent") : f, N.kpm = s, N[t] > 0 && N[c] > 0 && (N.kpm = util[a](parseInt(N[t]) / (parseInt(N[c]) / 60), "float"));
				var A = util.getLockInfo(T[n], y.unlockProgression);
				A && !A.completed ? (A.valueNeeded && (N[d] = A[d]), N[t] != f || N[l] != f ? b[v](N) : (N[u] = o, w[v](N))) : (N[u] = s, b[v](N))
			}
			S++
		}
	} else {
		var O = _.groupBy(g, "category");
		for (var M in O) {
			var D = O[M],
				P = 0,
				H = 0,
				B = 0,
				j = 0,
				F = s,
				I = o,
				q = [],
				R = {
					civSEM: o
				};
			_.each(D, function(e) {
				if (R[e.code]) return;
				R[e.code] = o, P += parseInt(e[t]), H += parseInt(e[c]), B = e.serviceStars, j = e.serviceStarsProgress, F = e.serviceStarsByTier, q[v](e[n])
			}), D.sort(function(e, n) {
				var r = parseInt(n[t]),
					i = parseInt(e[t]);
				return r = isNaN(r) ? 0 : r, i = isNaN(i) ? 0 : i, i == r ? e[c] != n[c] ? e[c] > n[c] ? -1 : 1 : e.code < n.code ? -1 : 1 : r - i
			});
			var N = m._items[D[0][n]];
			$.inArray(N[n], this.vehicleNoServiceStars) != -1 && (I = s);
			var U = m.niceVehicleCategoryName[M.toUpperCase()];
			typeof N !== r && U && b[v]({
				nameSID: U,
				kills: P > 0 ? util[a](P) : f,
				serviceStars: B,
				serviceStarsProgress: j,
				serviceStarsByTier: F,
				guid: q,
				imageConfig: N.imageConfig,
				isTrackedManually: s,
				hasServiceStars: I,
				friendlyDuration: H > 0 ? util[a](H, h) : f,
				type: "vehicle"
			})
		}
		b.sort(function(e, n) {
			var r = parseInt(n[t]),
				i = parseInt(e[t]);
			return r = isNaN(r) ? 0 : r, i = isNaN(i) ? 0 : i, i == r ? e[l] != n[l] ? e[l] > n[l] ? -1 : 1 : e.nameSID < n.nameSID ? -1 : 1 : r - i
		})
	}
	return b[v].apply(b, w), {
		items: b
	}
}, ItemsViewController.prototype.render_detailed = function(e) {
	var t = ["accuracy", "quitPercentage"],
		n = ["kdRatio"],
		r = [{
			title: "ID_WEB_PROFILE_OVERVIEWSTATS_MULTIPLAYER_SCORE",
			values: {
				enforcer: "ID_WEB_BATTLEREPORT_WEBPRIZE_ENFORCER_SCORE",
				mechanic: "ID_WEB_BATTLEREPORT_WEBPRIZE_MECHANIC_SCORE",
				operator: "ID_WEB_BATTLEREPORT_WEBPRIZE_OPERATOR_SCORE",
				professional: "ID_WEB_BATTLEREPORT_WEBPRIZE_PROFESSIONAL_SCORE",
				commander: "BFH_ID_BL_GAMEPUSH_GEOLB_SCORETYPE_COMMANDER_SCORE",
				sc_vehicle: "ID_WEB_BATTLEREPORT_WEBPRIZE_VEHICLECREW_SCORE",
				sc_award: "ID_WEB_BATTLEREPORT_WEBPRIZE_AWARDSCORE_SCORE",
				sc_unlock: "ID_WEB_BATTLEREPORT_SCORE_UNLOCK_SCORE",
				totalScore: "ID_WEB_BATTLEREPORT_WEBPRIZE_SCORE_SCORE"
			}
		}, {
			title: "ID_WEB_LEADERBOARD_TIMEPERIOD_ALL_TIME",
			values: {
				kills: "ID_WEB_COMMON_KILLS",
				deaths: "ID_WEB_COMMON_DEATHS",
				killAssists: "ID_WEB_COMMON_KILL_ASSISTS",
				kdRatio: "ID_WEB_COMMON_KILL_DEATH_RATIO",
				numWins: "ID_WEB_PROFILE_OVERVIEW_WINS",
				numLosses: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_LOSS",
				shotsFired: "ID_WEB_BATTLEREPORT_WEBPRIZE_SHOTSFIRED_SCORE",
				shotsHit: "ID_WEB_BATTLEREPORT_WEBPRIZE_SHOTHITS_SCORE",
				accuracy: "ID_WEB_COMMON_ACCURACY"
			}
		}, {
			title: "ID_WEB_COMMON_GAME_MODES",
			values: {
				sc_turfwar: "ID_WEB_COMMON_GAMEMODE_1",
				sc_hit: "ID_WEB_BATTLEREPORT_WEBPRIZE_HIT_SCORE",
				sc_heist: "ID_WEB_BATTLEREPORT_WEBPRIZE_HEIST_SCORE",
				sc_hotwire: "ID_WEB_BATTLEREPORT_WEBPRIZE_HOTWIRE_SCORE",
				sc_hostage: "ID_WEB_BATTLEREPORT_WEBPRIZE_HOSTAGE_SCORE",
				sc_bloodmoney: "ID_WEB_BATTLEREPORT_WEBPRIZE_BLOODMONEY_SCORE",
				sc_deathmatch: "ID_WEB_BATTLEREPORT_WEBPRIZE_DEATHMATCH_SCORE"
			}
		}, {
			title: "ID_WEB_COMMON_TEAM",
			values: {
				sc_squad: "ID_WEB_GEOLB_SCORETYPE_SQUAD_SCORE",
				repairs: "ID_WEB_BATTLEREPORT_WEBPRIZE_REPAIRS_SCORE",
				revives: "ID_WEB_BATTLEREPORT_WEBPRIZE_REVIVES_SCORE",
				heals: "ID_WEB_BATTLEREPORT_WEBPRIZE_HEALS_SCORE",
				resupplies: "ID_WEB_BATTLEREPORT_WEBPRIZE_RESUPPLIES_SCORE",
				avengerKills: "ID_WEB_BATTLEREPORT_WEBPRIZE_AVENGERKILLS_SCORE",
				saviorKills: "ID_WEB_BATTLEREPORT_WEBPRIZE_SAVIORKILLS_SCORE",
				suppressionAssists: "ID_WEB_COMMON_STATS_SUPPRESSION_ASSISTS"
			}
		}, {
			title: "ID_WEB_GEOLB_PERSONAL",
			values: {
				longestHeadshot: "ID_WEB_PROFILE_STATS_LONGEST_HEADSHOT",
				killStreakBonus: "ID_WEB_COMMON_STATS_HIGHEST_KILL_STREAK",
				nemesisStreak: "ID_WEB_COMMON_STATS_HIGHEST_NEMESIS_STREAK"
			}
		}, {
			title: "ID_WEB_COMMON_MISCELLANEOUS_ABBR",
			values: {
				vehiclesDestroyed: "ID_WEB_COMMON_STATS_VEHICLES_DESTROYED",
				headshots: "ID_WEB_BATTLEREPORT_WEBPRIZE_HEADSHOTS_SCORE",
				quitPercentage: "ID_WEB_COMMON_STATS_QUIT"
			}
		}],
		i = [];
	return r.forEach(function(r) {
		i.push(template.render("DetailView", {
			title: locale.t(r.title),
			items: Object.keys(r.values).map(function(i) {
				return {
					key: locale.t(r.values[i]),
					value: util.formatStatValue(e.generalStats[i], n.indexOf(i) !== -1 ? "float" : "") + (t.indexOf(i) !== -1 ? "%" : "")
				}
			})
		}))
	}), i
}, ItemsViewController.prototype.render = function() {
	var e = "_display",
		t = "List",
		n = "render",
		r = "ItemsView",
		i = "_type",
		s = this,
		o = s._model.toJSON(),
		u = "",
		a = s[e] == "list" ? t : "Grid";
	if (o.loading) u = template[n](r, {
		type: s[i],
		display: s[e],
		loading: !0
	}), s.$content.html(u);
	else {
		s.unbind_events();
		var f = template[n](r, {
			type: s[i],
			display: s[e],
			loading: !1
		});
		if (s[i] == "general") u = f + s.render_detailed(o).join("");
		else {
			var l = a == t ? s.build_list(o) : s.build_grid(o);
			l.friendlyname = s._friendlyname, s[i] == "weapons" && device.isTablet() && (l.showExtraStats = !0);
			var c = template[n].call(template, "Items" + a + "View", l);
			u = [f, c].join("")
		}
		s.$content.html(u), s.bind_events()
	}
};