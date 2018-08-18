function ItemsViewController(e) {
	var t = "_display",
		n = "list",
		r = "_activePersona",
		i = "persona",
		s = "personaId",
		o = "_mysoldier";
	e = e || {}, this._type = e.type || "weapons", this._section = "warsaw", this._game = enums.Game.WARSAW, this[t] = e.display || n, this._templateParams = {
		type: this._type,
		display: this[t],
		loading: !0
	}, this._name = "ItemsView", this[r] = session.getUserActivePersonaForGame(this._game), this._persona = e[i] || this[r][i], this._personaId = e[s] || this[r][i][s], this._platform = e.platform || this[r].platform, this[o] = e[s] == this[r][i][s], this.update_vars(), this._model = BL.backbone.get({
		model: {
			name: this[o] ? "items_list_model" : "items_list_friend_model"
		}
	}), ScrollableViewController.call(this, e), this.titleSID = this[t] == n ? "ID_MOBILE_VIEW_TITLE_STATS" : "ID_MOBILE_VIEW_TITLE_UNLOCKS", this.vehicleNoServiceStars = ["Soldier Equiment", "Vehicle Air", "Vehicle Boat", "Vehicle Mobile Artillery", "Weapon Stationary", "Vehicle Transport"], this._model.fetch(this.get_url())
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
	items_json = require("gamedata/warsaw/items"),
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
			guid: t,
			persona: i._persona,
			platform: i.platform
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
		l = "guid",
		c = "indexOf",
		h = "imageConfig",
		p = "nameSID",
		d = "unlockType",
		v = "bucket",
		m = "completion",
		g = "bucketRelativeCompletion",
		y = "push",
		b = "kititems",
		w = "kitItemUnlock",
		E = "undefined",
		S = "valueNeeded",
		x = this,
		T = [],
		N = [],
		C = 0,
		k = 0;
	if (x._type == t) {
		N = {}, T = e.weaponsByCategory;
		var L = ["sc_assault", "sc_recon", "sc_support", "sc_engineer"],
			A = ["wA", "wC", "waS", "wL", "waPDW", "wD", "wSR", "wH", "wG", "wSPk"],
			O = {
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
			M = 0,
			_ = A[n];
		while (M < _) {
			var D = A[M],
				P = {
					bucketUnlocks: [],
					licenseUnlocks: []
				},
				H = T[D],
				B = 0,
				j = H[n];
			while (B < j) {
				C++;
				var F = H[B][r];
				F[i] = s, F[o] = u, F[a] = "";
				var I = F[f];
				I.completed && (F[i] = u, k++);
				var q = x._items[F[l]];
				if (q && q.categorySID[c]("BATTLEPICKUP") === -1) {
					F[h] = q[h], F[p] = q[p];
					if (I[d] == v && L[c](I.codeNeeded) == -1) {
						for (var R in I) F[R] = I[R];
						F[m] = I[g], P.bucketUnlocks[y](F)
					} else F[o] = s, P.licenseUnlocks[y](F)
				}
				B++
			}
			for (var U in P) {
				var z = P[U][n];
				z % 3 == 2 ? P[U][y]({
					empty: s
				}) : z % 3 == 1 && P[U][y]({
					empty: s
				}, {
					empty: s
				})
			}
			N[O[D]] = P, M++
		}
	} else if (x._type == b) {
		T = e.kititemsStats, N = {};
		var W = [1, 2, 32, 8],
			X = 0,
			V = W[n],
			$ = {};
		while (X < V) {
			var J = W[X],
				K = T[J],
				Q = util.kitEnum_to_kitName(J, x._game, s);
			N[Q] = [];
			var G = 0,
				Y = K[n];
			while (G < Y) {
				var Z = K[G],
					et = b,
					tt = null;
				if (Z[w] == null) tt = Z[r], et = t;
				else {
					tt = Z[w];
					var nt = ["defibrillator1", "carbine", "dmr", "shotgun", "m18-claymore1", "m2-slam1", "m15-at-mine1", "m224-mortar2"];
					if (nt[c](tt.slug) != -1) {
						G++;
						continue
					}
				}
				C++;
				var rt = items_json[et][tt[l]];
				if ($[rt[l]] != undefined) {
					G++;
					continue
				}
				$[rt[l]] = 1, typeof rt !== E && (rt[a] = J, rt[i] = u, rt[S] = Infinity, rt[o] = u, tt[f] && (rt[i] = s, tt[f].completed ? (rt[i] = u, rt[m] = 100, k++) : tt[f][d] == v && (rt[m] = tt[f][g] || 0, rt[m] == 100 && (rt[i] = u, k++), rt[S] = tt[f][S])), N[Q][y](rt)), G++
			}
			var it = N[Q][n];
			it % 3 == 2 ? N[Q][y]({
				empty: s
			}) : it % 3 == 1 && N[Q][y]({
				empty: s
			}, {
				empty: s
			}), X++
		}
	} else {
		T = e.vehiclesProgression, N = {};
		for (var st in T) {
			var ot = enums.niceVehicleCategoryName[st.toUpperCase()],
				ut = T[st];
			N[ot] = [];
			var G = 0,
				Y = ut[n];
			C += Y;
			while (G < Y) {
				var rt = ut[G],
					q = items_json.vehicleunlocks[rt[l]];
				typeof q !== E && (rt[a] = st, rt[h] = q[h], rt[p] = q[p], rt[i] = u, rt[S] = Infinity, rt[f] ? (rt[i] = s, rt[f][d] == v ? (rt[m] = rt[f][g] || 0, rt[m] == 100 && (rt[i] = u, k++), rt[S] = rt[f][S]) : (rt[m] = rt[f][m] || 0, rt[m] == 100 && (rt[i] = u, k++))) : k++, N[ot][y](rt)), G++
			}
			Y % 3 == 2 ? N[ot][y]({
				empty: s
			}) : Y % 3 == 1 && N[ot][y]({
				empty: s
			}, {
				empty: s
			})
		}
	}
	var at = Math.floor(k / C * 100);
	return {
		items: N,
		completion: at,
		current: k,
		max: C
	}
}, ItemsViewController.prototype.build_list = function(e) {
	var t = "_type",
		n = "kills",
		r = "length",
		i = "guid",
		s = "undefined",
		o = "isTrackedManually",
		u = !1,
		a = !0,
		f = "locked",
		l = "formatStatValue",
		c = "-",
		h = "friendlyDuration",
		p = "timeUsed",
		d = "time",
		v = "accuracy",
		m = "percent",
		g = "nextAccessoryUnlock",
		y = "license",
		b = "completion",
		w = "push",
		E = this,
		S = e[E[t] + "Stats"],
		x = e[E[t] + "Meta"],
		T = [],
		N = [],
		C = E._model.get("suggestions"),
		k = e[E[t] + "SelectedAccessory"];
	S.sort(function(e, t) {
		return t[n] - e[n]
	});
	if (E[t] == "weapons") {
		var L = 0,
			A = S[r],
			O = ["1C2F96CC-940E-FA36-B7D2-2BDCA53DDFF7", "38B59920-3BA1-4DA7-B7D8-5C3E4E51F403", "6EF48118-EF16-4D47-BD18-F57792D88AB1"];
		while (L < A) {
			var M = S[L],
				D = E._items[M[i]];
			if (typeof D !== s) {
				for (var P in M) D[P] = M[P];
				if (O.indexOf(D[i]) > -1) {
					L++;
					continue
				}
				D[o] = u;
				var H = 0;
				while (H < C[r]) {
					var B = C[H];
					B[i] == D[i] && B[o] && (D[o] = a), H++
				}
				var j = a;
				$.inArray(D[i], this.weaponsNoStats) > -1 && (j = u), D.hasServiceStars = a, D[f] = a, D[n] = D[n] > 0 ? util[l](D[n]) : c, D[h] = D[p] > 0 ? util[l](D[p], d) : c, D[v] = D[v] > 0 ? util[l](D[v], m) : c;
				try {
					k[D[i]] && (D[g] = k[D[i]].weaponAddonUnlock, D[g].image = D[g].image.toLowerCase())
				} catch (F) {
					D[g] = null, app.log("Found no image?"), app.log(F)
				}
				D.kpm = u, D[n] > 0 && D[p] > 0 && (D.kpm = util[l](parseInt(D[n]) / (parseInt(D[p]) / 60), "float"));
				var I = util.getLockInfo(M[i], x.unlockProgression);
				j && (I && !I.completed ? (I.award && I.award[y] && (D[y] = I.award[y]), I.valueNeeded && (D[b] = I[b]), D[n] != c || D[h] != c ? T[w](D) : (D[f] = a, N[w](D))) : (D[f] = u, I[y] && (D[y] = I[y]), T[w](D)))
			}
			L++
		}
	} else {
		var q = _.groupBy(S, "category");
		for (var R in q) {
			var U = q[R],
				z = 0,
				W = 0,
				X = 0,
				V = 0,
				J = [],
				K = a,
				Q = 0,
				G = U[r];
			while (Q < G) {
				var M = U[Q];
				z += parseInt(M[n]), W += parseInt(M[p]), X = M.serviceStars, V = M.serviceStarsProgress, J[w](M[i]), Q++
			}
			var D = E._items[U[0][i]];
			D && (D[v] = D[v] > 0 ? util[l](D[v], m) : c), $.inArray(R, this.vehicleNoServiceStars) != -1 && (K = u);
			var Y = enums.niceVehicleCategoryName[R.toUpperCase()];
			typeof D !== s && Y && T[w]({
				nameSID: Y,
				kills: z > 0 ? util[l](z) : c,
				serviceStars: X,
				serviceStarsProgress: V,
				guid: J,
				imageConfig: D.imageConfig,
				isTrackedManually: u,
				hasServiceStars: K,
				category: R,
				friendlyDuration: W > 0 ? util[l](W, d) : c
			})
		}
		T.sort(function(e, t) {
			var r = parseInt(t[n].replace(/,/g, ""), 10),
				i = parseInt(e[n].replace(/,/g, ""), 10);
			return r = isNaN(r) ? 0 : r, i = isNaN(i) ? 0 : i, r - i
		})
	}
	return T[w].apply(T, N), {
		items: T
	}
}, ItemsViewController.prototype.render_detailed = function(e) {
	var t = ["accuracy", "quitPercentage"],
		n = ["kdRatio", "killsPerMinute"],
		r = [{
			title: "ID_WEB_PROFILE_OVERVIEWSTATS_MULTIPLAYER_SCORE",
			values: {
				assault: "ID_WEB_BATTLEREPORT_WEBPRIZE_ASSAULT_SCORE",
				engineer: "ID_WEB_BATTLEREPORT_WEBPRIZE_ENGINEER_SCORE",
				support: "ID_WEB_BATTLEREPORT_WEBPRIZE_SUPPORT_SCORE",
				recon: "ID_WEB_BATTLEREPORT_WEBPRIZE_RECON_SCORE",
				commander: "ID_WEB_BATTLEREPORT_WEBPRIZE_COMMANDER_SCORE",
				sc_squad: "ID_WEB_GEOLB_SCORETYPE_SQUAD_SCORE",
				sc_vehicle: "ID_WEB_BATTLEREPORT_WEBPRIZE_VEHICLECREW_SCORE",
				sc_award: "ID_WEB_BATTLEREPORT_WEBPRIZE_AWARDSCORE_SCORE",
				sc_unlock: "ID_WEB_BATTLEREPORT_SCORE_UNLOCK_SCORE",
				totalScore: "ID_WEB_BATTLEREPORT_WEBPRIZE_SCORE_SCORE",
				scorePerMinute: "ID_WEB_COMMON_STATS_SCORE_PER_ABBR_MINUTE"
			}
		}, {
			title: "ID_WEB_COMMON_STATS_GENERAL",
			values: {
				kills: "ID_WEB_COMMON_KILLS",
				deaths: "ID_WEB_COMMON_DEATHS",
				killAssists: "ID_WEB_COMMON_KILL_ASSISTS",
				kdRatio: "ID_WEB_COMMON_KILL_DEATH_RATIO",
				killsPerMinute: "ID_WEB_COMMON_STATS_KILLS_PER_MINUTE",
				numWins: "ID_WEB_PROFILE_OVERVIEW_WINS",
				numLosses: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_LOSS",
				shotsFired: "ID_WEB_BATTLEREPORT_WEBPRIZE_SHOTSFIRED_SCORE",
				shotsHit: "ID_WEB_BATTLEREPORT_WEBPRIZE_SHOTHITS_SCORE",
				accuracy: "ID_WEB_COMMON_ACCURACY"
			}
		}, {
			title: "ID_WEB_COMMON_GAME_MODES",
			values: {
				conquest: "ID_WEB_COMMON_GAMEMODE_1",
				rush: "ID_WEB_COMMON_GAMEMODE_2",
				teamdeathmatch: "ID_WEB_COMMON_GAMEMODE_32",
				domination: "ID_WEB_WARSAW_GAMEMODE_1024",
				obliteration: "ID_WEB_COMMON_GAMEMODE_2097152",
				elimination: "ID_WEB_COMMON_GAMEMODE_16777216",
				capturetheflag: "ID_WEB_COMMON_GAMEMODE_524288",
				airsuperiority: "ID_WEB_COMMON_GAMEMODE_8388608",
				carrierassault: "ID_WEB_COMMON_GAMEMODE_134217728",
				chainlink: "ID_WEB_COMMON_GAMEMODE_34359738368"
			}
		}, {
			title: "ID_WEB_COMMON_TEAM",
			values: {
				repairs: "ID_WEB_BATTLEREPORT_WEBPRIZE_REPAIRS_SCORE",
				revives: "ID_WEB_BATTLEREPORT_WEBPRIZE_REVIVES_SCORE",
				heals: "ID_WEB_BATTLEREPORT_WEBPRIZE_HEALS_SCORE",
				resupplies: "ID_WEB_BATTLEREPORT_WEBPRIZE_RESUPPLIES_SCORE",
				avengerKills: "ID_WEB_BATTLEREPORT_WEBPRIZE_AVENGERKILLS_SCORE",
				saviorKills: "ID_WEB_BATTLEREPORT_WEBPRIZE_SAVIORKILLS_SCORE",
				suppressionAssists: "ID_WEB_COMMON_STATS_SUPPRESSION_ASSISTS",
				quitPercentage: "ID_WEB_COMMON_STATS_QUIT"
			}
		}, {
			title: "ID_WEB_COMMON_EXTRA",
			values: {
				dogtagsTaken: "ID_WEB_COMMON_STATS_DOGTAGS_TAKEN",
				vehiclesDestroyed: "ID_WEB_COMMON_STATS_VEHICLES_DESTROYED",
				vehicleDamage: "ID_WEB_BATTLEREPORT_STATS_VEHICLE_DAMAGE",
				headshots: "ID_WEB_BATTLEREPORT_WEBPRIZE_HEADSHOTS_SCORE",
				longestHeadshot: "ID_WEB_PROFILE_STATS_LONGEST_HEADSHOT",
				killStreakBonus: "ID_WEB_COMMON_STATS_HIGHEST_KILL_STREAK",
				nemesisKills: "ID_WEB_COMMON_STATS_NEMESIS_KILLS",
				nemesisStreak: "ID_WEB_COMMON_STATS_HIGHEST_NEMESIS_STREAK"
			}
		}, {
			title: "ID_WEB_COMMON_GAME_OBJECTIVES",
			values: {
				flagCaptures: "ID_WEB_BATTLEREPORT_WEBPRIZE_FLAGCAPTURES_SCORE",
				flagDefend: "ID_WEB_BATTLEREPORT_WEBPRIZE_FLAGDEFENDS_SCORE"
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
	});
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
			s[i] == "weapons" && device.isTablet() && (l.showExtraStats = !0), l.friendlyname = s._friendlyname;
			var c = template[n].call(template, "Items" + a + "View", l);
			u = [f, c].join("")
		}
	}
	s.$content.html(u), s.bind_events()
};