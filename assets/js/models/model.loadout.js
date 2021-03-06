var _ = require("underscore"),
	BL = require("backbone-helper");
(function(e, t, n) {
	var r = "undefined",
		i = !1,
		s = "get",
		o = "length",
		u = "weapons",
		a = "loadout",
		f = "presetLoadouts",
		l = "presets",
		c = "structure",
		h = "weaponData",
		p = "items",
		d = "vehicles",
		v = "slots",
		m = "rateOfFire",
		g = !0,
		y = "trigger",
		b = "friendLoadoutModel",
		w = "weaponDataRelative",
		E = "bars",
		S = "weaponId",
		x = "compatibilityLocked",
		T = "compatibility",
		N = "selectedKit",
		C = "presetType",
		k = "parentStats",
		L = "loadoutModel",
		A = "type",
		O = "kits",
		M = "presetId",
		_ = "toJSON",
		D = "presetKey",
		P = "getAccessories",
		H = "indexOf",
		B = "accessory",
		j = "calculateModifiers",
		F = "mySoldier",
		I = "backbone",
		q = "set",
		R = "calcStats",
		U = "collection",
		z = "push",
		W = "object",
		X = "setupPresets",
		V = "id",
		$ = "active",
		J = "slot",
		K = "platformInt",
		Q = "personaId",
		G = "locked",
		Y = "stat",
		Z = "Type",
		et = "activeKey",
		tt = "extend",
		nt = "presetDeleted",
		rt = "weapon",
		it = "POST",
		st = "loadoutSaved",
		ot = "statKeys",
		ut = "presetSaved",
		at = "imageConfig",
		ft = "compatibilityName",
		lt = "getAllActives",
		ct = "loadoutUrl",
		ht = "stringify",
		pt = "itemType",
		dt = "game",
		vt = "refresh",
		mt = "resetStats",
		gt = "category",
		yt = "randomizeLoop",
		bt = "success",
		wt = Backbone.Model[tt]({
			defaults: {
				id: -1,
				type: undefined,
				slot: undefined,
				accessory: undefined,
				activeGuid: 0,
				previewGuid: 0,
				structure: {},
				loadout: {},
				slotAccessories: [0],
				itemsList: {},
				selectedKit: 0,
				fetched: i,
				mySoldier: i,
				changed: i,
				randomizing: i,
				compare: i,
				hideLocked: i,
				hideImages: i,
				baseStats: i,
				items: [],
				breadcrumbs: [],
				statKeys: ["Damage", "Accuracy", "Mobility", "Range", "Handling"]
			},
			initialize: function() {
				this.on("save", this.saveLoadout, this), this.on("fetch", this.fetchLoadout, this);
				var e = this;
				typeof Push !== r && Push.bind("LoadoutUpdated", function() {
					e.fetchLoadout()
				})
			},
			getCurrentOverview: function(e) {
				var t = this[s](c),
					n = this[s](p),
					i = this[s](a),
					u = this[s]("slotAccessories"),
					h = {
						kits: [],
						vehicles: [],
						presets: {}
					};
				h[N] = this[s](N);
				var m = this;
				if (t[O]) {
					var g = t[O][o],
						y = 0;
					while (y < g) {
						var b = t[O][y];
						h[O][y] = [], h[O][y].sid = b.sid, h[O][y][v] = [], h[O][y].iconClass = m.getClassInt(y), typeof i[O][y] === r && (i[O][y] = new Array(t[O][y][v][o]));
						var w = 0,
							E = b[v][o];
						while (w < E) {
							var S = b[v][w],
								x = i[O][y][w] || 0,
								T = m.getItem(O, y, w, x);
							T = T[_](), i[O][y][w] = T.guid, u[H](w) != -1 && (T[v] = m[P](T.guid)), h[O][y][v][w] = {
								sid: S.sid,
								item: T
							}, w++
						}
						y++
					}
					var C = 0,
						k = t[d][o];
					while (C < k) {
						var L = t[d][C],
							A = n[s](L.sid);
						h[d][C] = [];
						if (typeof A === r) {
							C++;
							continue
						}
						h[d][C][at] = A[s](at), h[d][C].sid = L.sid, h[d][C][v] = [], typeof i[d][C] === r && (i[d][C] = new Array(t[d][C][v][o]));
						var M = L[v][o],
							D = 0;
						while (D < M) {
							var B = L[v][D];
							if (B[p][o]) {
								var j = i[d][C][D] || 0,
									F = m.getItem(d, C, D, j);
								typeof F !== r && (F = F[_](), i[d][C][D] = F.guid, h[d][C][v][D] = {
									sid: B.sid,
									item: F
								})
							}
							D++
						}
						C++
					}
					h[d] = h[d].filter(function(e) {
						return e
					}), this[q]({
						loadout: i
					});
					if (e) {
						h[l] = this[s](f);
						for (var I in h[l]) {
							var R = h[l][I];
							for (var U in R) {
								var z = R[U][l];
								delete R[U][$];
								var W = i[I][U].join("");
								for (var X in z) {
									var V = z[X].ids.join("");
									if (V === W) {
										R[U][$] = X;
										break
									}
								}
							}
						}
					}
				}
				return h
			},
			getItem: function(e, t, n, i) {
				var o = this[s](p),
					u = this[s](c),
					a = o[s](i),
					f = u[e][t][v][n][p];
				if (typeof a === r || f[H](i) == -1) i = f[0], a = o[s](i);
				return a
			},
			getAccessories: function(e, t) {
				var n = this[s](a),
					f = this[s](p),
					l = this[s](c),
					h = n[u][e],
					d = l[u][e][v];
				h || (n[u][e] = [], h = new Array(d[o]));
				var m = [],
					g = 0,
					y = d[o];
				while (g < y) {
					var b = i;
					if (d[g])
						if (h[g] > 0) {
							b = f[s](h[g]);
							if (typeof b === r || d[g][p][H](h[g]) == -1) b = f[s](this.generateSlot(u, e, g))
						} else b = f[s](this.generateSlot(u, e, g));
					else b = 0;
					typeof b !== r && (t ? m[z](b[V]) : (b[q]({
						slotSid: d[g].sid
					}), m[z](b[_]()))), g++
				}
				return m
			},
			generateSlot: function(e, t, n) {
				var r = this[s](c),
					i = this[s](a),
					o = r[e][t][v][n],
					u = 0;
				return o && (u = r[e][t][v][n][p][0], i[e][t][n] = u, this[q]({
					loadout: i
				})), u
			},
			getSlots: function(e, t) {
				var n = this[s](a),
					f = n,
					l = this[s](c),
					h = this[s](p),
					d = this[s](A),
					m = this[s](V),
					g = this[s](J),
					y = t ? i : this[s](S),
					b = {},
					w = [];
				y ? (n = n[u][y], b = l[u][y][v]) : (n = n[d][m], b = l[d][m][v]);
				var E = 0,
					x = b[o];
				while (E < x) {
					var T = b[E],
						N = -1,
						C = 0,
						k = h[s](n[E]);
					if (typeof k === r && T[p][o] > 0) {
						var L = Object.keys(T[p]),
							O = T[p][L[0]];
						k = h[s](O), f[d][m][E] = O
					}
					var M = E;
					y && (N = M, M = y, C = y), typeof k !== r && (k[q]({
						parentSlotId: g,
						slotId: M,
						parentGuid: C || f[d][m][E],
						slotSid: T.sid,
						type: d,
						accessorySlot: N
					}), e ? w[z](k[_]()) : w[z](k)), E++
				}
				return w
			},
			getAllActives: function(e, t) {
				var n = this[s](a),
					r = this[s](c);
				n = n[e][t];
				var i = [],
					u = 0,
					f = r[e][t][v][o];
				while (u < f) i[z](n[u]), u++;
				return i
			},
			getActiveId: function(e) {
				var t = this[s](V),
					n = this[s](A),
					r = this[s](S),
					i = this[s](c),
					o = {};
				return r && !e ? o = i[u][r] : o = i[n][t], o
			},
			getIdSlots: function(e) {
				var t = this.getActiveId(e);
				return t[v]
			},
			getIdSlot: function(e) {
				var t = this.getIdSlots(e),
					r = this[s](S) && !e ? this[s](B) : this[s](J);
				return n.find(t, function(e, t) {
					return t == r
				})
			},
			loadItems: function(e, t) {
				t = typeof t === r ? g : t;
				var f = this[s](V),
					l = this[s](A),
					c = this[s](J),
					d = e ? i : this[s](S),
					v = this.getIdSlot(e),
					b = this[s](p),
					N = this[s](a),
					C = "",
					L = [],
					M = [],
					D = [],
					F = this[s](ot),
					I = F[o],
					U = [],
					W = this[s]("hideLocked"),
					X = this[s]("baseStats"),
					K = [],
					Q = 0;
				try {
					var et = v[p][o]
				} catch (tt) {
					app.error("Could not find slot items in loadout...");
					return
				}
				while (Q < et) L[z](v[p][Q]), Q++;
				var nt = {};
				if (d) {
					c = d;
					var it = this[s](B),
						st = N[u][c];
					typeof st === r && (st = this[P](c, g)), C = st[it], D = this[lt](u, c), nt = b[s](c)
				} else C = N[l][f][c], D = this[lt](l, f), nt = b[s](C);
				t && this[q]({
					activeGuid: C
				}), nt[j]();
				var ut = nt[_]();
				Q = 0, et = L[o];
				var at = X ? h : w;
				if (ut[h]) {
					ut[E] = {};
					var ct = 0;
					while (ct < I) {
						var ht = F[ct];
						ut[E][ht] = ut[at][Y + ht] * 100, ct++
					}
					ut[h][m] && (ut[E][m] = ut[h][m] / 10)
				}
				var dt = 0,
					vt = D[o];
				l == O && !d && (vt = 6);
				while (dt < vt) {
					if (D[dt] != 0) {
						var mt = b[s](D[dt])[_]();
						U[z](mt), K[z](mt[T][gt] || "")
					}
					dt++
				}
				while (Q < et) {
					var yt = b[s](L[Q]);
					if (L[Q] == "2830105186" && yt[s](G)) {
						Q++;
						continue
					}
					if (yt && (!yt[s](G) || !W)) {
						yt[s]("unlockCriterias") || yt[y](R), yt[s](pt) == rt && yt[j]();
						var wt = yt[_]();
						wt.guid == C ? wt[$] = g : l != u && D[H](wt.guid) > -1 && (wt.duplicate = g);
						if (wt[T] && !wt[$])
							if (wt[T][p]) {
								var Et = 0,
									St = wt[T][p][o];
								while (Et < St) {
									var xt = wt[T][p][Et],
										Tt = D[H](xt);
									if (wt[T].exclusive === "true") {
										if (Tt != -1) {
											wt[x] = g, wt[ft] = U[Tt].name;
											break
										}
									} else {
										wt[x] = g;
										if (Tt != -1) {
											wt[x] = i;
											break
										}
									}
									Et++
								}
							} else {
								var Ct = K[H](wt[T][gt]);
								wt[x] = i, Ct != -1 && Ct != c && !wt.duplicate && (wt[x] = g, wt[ft] = U[Ct].name)
							}
						if (wt[h] && ut[h]) {
							wt[E] = {};
							var Lt = w;
							d ? (wt[k] = Object.create(ut[w]), Lt = k) : X && (Lt = h);
							var ct = 0;
							while (ct < I) {
								var ht = F[ct];
								wt[E][ht] = wt[Lt][Y + ht] * 100, ct++
							}
							wt[h][m] && (wt[E][m] = wt[h][m] / 10);
							for (var At in wt[E]) {
								var Ot = At + "Difference",
									Mt = Y + At;
								if (d) {
									var _t = wt[k][Mt],
										Dt = {};
									Dt[it] = wt[h];
									var Pt = nt[j](Dt),
										Ht = Pt[Mt] - _t,
										Bt = Ht * 100;
									wt[E][At] = ut[E][At], Ht === 0 ? (wt[E][At + Z] = "info", wt[E][Ot] = 0) : Ht > 0 ? (wt[E][At + Z] = bt, wt[E][Ot] = Bt, wt[k][Mt] += Ht) : (wt[E][At + Z] = "danger", wt[E][Ot] = -Bt, wt[E][At] += Bt, wt[k][Mt] += Ht), wt[k][Mt] > 1 && (wt[k][Mt] = 1)
								} else wt[E][Ot] = wt[E][At] - ut[E][At], wt[E][Ot] < 0 ? (wt[E][At + Z] = "danger", wt[E][Ot] = -wt[E][Ot]) : wt[E][Ot] > 0 && (wt[E][At + Z] = bt, wt[E][At] -= wt[E][Ot]), wt[w][Mt] > 1 && (wt[w][Mt] = 1);
								wt[E][Ot] + wt[E][At] > 100 && At != m && (wt[E][Ot] = 100 - wt[E][At]);
								if (isNaN(wt[E][Ot]) || isNaN(ut[E][At])) wt[E][Ot] = 0
							}
							yt[q]({
								bars: wt[E]
							}, {
								silent: g
							})
						}
						M[z](wt)
					}
					Q++
				}
				var jt = n.groupBy(M, function(e) {
					return e[gt]
				});
				return this[q]({
					itemsList: jt
				})[y]("change:itemsList"), jt
			},
			applyPaint: function() {
				var e = this[s](V),
					t = this[s](S),
					n = t ? u : this[s](A),
					r = this[s](J),
					i = this[s](a),
					f = this[s](c)[n],
					l = i[n],
					h = 0;
				if (t) {
					var d = this[s](B);
					h = l[t][d];
					for (var m in f) {
						var b = l[m],
							w = f[m];
						if (w[v]) {
							b || (b = this[P](m));
							var E = 0,
								x = w[v][o];
							while (E < x) {
								var T = w[v][E];
								if (T[p][H](h) !== -1) {
									b[E] = h;
									break
								}
								E++
							}
						}
					}
				} else {
					h = l[e][r];
					var m = 0,
						N = f[o];
					while (m < N) {
						var C = f[m];
						if (C[v]) {
							var k = 0,
								L = C[v][o];
							while (k < L) {
								var O = C[v][k];
								if (O[p][H](h) !== -1) {
									l[m][k] = h;
									break
								}
								k++
							}
						}
						m++
					}
				}
				this[q]({
					changed: g
				})[y]("paintApplied")
			},
			selectItem: function(e) {
				var t = this[s](a),
					n = this[s](V),
					i = this[s](A),
					o = this[s](J),
					f = this[s](B);
				if (typeof f !== r) {
					var l = this[s](S);
					t[u][l][f] = e
				} else t[i][n][o] = e;
				this[q]({
					loadout: t,
					changed: g
				})[y]("change:loadout")
			},
			randomize: function() {
				if (!this[s]("randomizing")) {
					this[q]({
						randomizing: g
					});
					var e = this[s](a),
						t = this[s](p).chain().filter(function(e) {
							return !e[s](G)
						}).invoke(_).value(),
						n = {},
						r = this[s](c),
						i = {
							weapons: {},
							kits: [],
							vehicles: []
						},
						u = 0,
						f = t[o];
					while (u < f) {
						var l = t[u];
						n[l.guid] = l, u++
					}
					for (var h in i) {
						var d = r[h],
							m = Object.prototype.toString.call(d) === "[object Array]" ? "array" : W,
							y = m == W ? {} : [];
						for (var b in d) {
							var w = [],
								E = d[b],
								S = E[v] || [],
								x = 0,
								T = S[o];
							while (x < T) {
								var N = S[x][p],
									C = [],
									k = 0,
									L = N[o];
								while (k < L) n[N[k]] && C[z](N[k]), k++;
								w[z]({
									items: C
								}), x++
							}
							m == W ? y[b] = {
								slots: w
							} : y[z]({
								slots: w
							})
						}
						i[h] = y
					}
					this[yt](e, n, i, 0)
				}
			},
			randomizeLoop: function(t, n, r, u) {
				for (var a in r) {
					var f = r[a];
					for (var l in f) {
						var c = f[l],
							h = c[v] || [],
							d = 0,
							m = h[o];
						while (d < m) {
							var w = h[d][p];
							t[a][l] = t[a][l] || [], t[a][l][d] = w[Math.floor(Math.random() * w[o])], d++
						}
					}
				}
				this[q]({
					loadout: t,
					changed: g
				})[y](vt), u < 180 ? (u += 10, e.setTimeout(function() {
					var e = BL[I][s]({
						model: this[U][F] ? L : b
					});
					e[yt].apply(e, arguments)
				}, u, t, n, r, u)) : this[q]({
					randomizing: i
				})
			},
			encode: function() {
				var e = this,
					n = this[s](a);
				t.ajax({
					url: "{urlaction loadout.encode()}",
					data: {
						loadout: JSON[ht](n)
					},
					type: it,
					success: function(t) {
						e[y](ct, t)
					}
				})
			},
			getSid: function(e, t, n, r) {
				var i = "SLOT",
					o = this[s](c);
				if (e == u) {
					var f = this[s](a);
					if (parseInt(r) >= 0) i = o[u][n][v][r].sid;
					else {
						var l = this[s](p),
							h = l[s](n);
						i = h[s]("name")
					}
				} else i = parseInt(n) >= 0 ? o[e][t][v][n].sid : o[e][t].sid;
				return i
			},
			initialLoadout: function(e) {
				e = e || {
					weapons: {},
					selectedKit: 0,
					kits: [],
					version: 2,
					vehicles: []
				}, this[q]({
					loadout: e,
					selectedKit: e[N]
				}, {
					silent: g
				}), this.getCurrentOverview(), this[X]()
			},
			saveLoadout: function(e) {
				var n = this[s](a),
					f = this;
				f[q]({
					changed: i
				}), n[N] = this[s](N);
				var l = 0;
				for (var c in n[u]) {
					var h = n[u][c];
					l = 0;
					while (l < 6) typeof h[l] === r && (h[l] = "0"), l++
				}
				c = 0;
				var p = n[O][o];
				while (c < p) {
					var v = n[O][c];
					l = 0;
					while (l < 8) typeof v[l] === r && (v[l] = "0"), l++;
					c++
				}
				c = 0, p = n[d][o];
				while (c < p) {
					l = 0;
					var m = n[d][c];
					if (m)
						while (l < 10) typeof m[l] === r && (m[l] = "0"), l++;
					else n[d][c] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
					c++
				}
				t.ajax({
					url: "{urlaction loadout.save()}",
					data: {
						loadout: JSON[ht](n),
						personaId: f[s](Q),
						game: f[s](dt),
						platformInt: f[s](K)
					},
					type: it,
					success: function() {
						f[q]({
							saved: g
						})[y](st, i, e && e.preset)
					},
					error: function(e) {
						f[q]({
							changed: g
						})[y](st, e)
					},
					complete: function() {
						f[y]("saved")
					}
				})
			},
			fetchLoadout: function() {
				var e = this;
				e[s]("saved") ? e[q]({
					saved: i
				}) : this[s](F) && (e[q]({
					changed: i
				}), t.ajax({
					url: e[s](ct),
					type: "GET",
					success: function(t) {
						e.initialLoadout(t.data.currentLoadout || i), e[y]("refresh loadoutRefreshed", i)
					},
					error: function() {
						e[q]({
							changed: g
						})[y]("loadoutRefreshed", g)
					}
				}))
			},
			getClassInt: function(e) {
				switch (parseInt(e)) {
					case 0:
						e = 1;
						break;
					case 1:
						e = 2;
						break;
					case 2:
						e = 32;
						break;
					case 3:
						e = 8;
						break;
					default:
						e = 1
				}
				return e
			},
			setupPresets: function(e, t) {
				e = typeof e !== r ? e : this[s](A), typeof t === r && (e == u ? t = this[s](S) : t = this[s](V));
				var n = this[s](f),
					i = null,
					a = Object.keys(n);
				if (a[o] && typeof n[e] === W) {
					var c = Object.keys(n[e]);
					c[o] && typeof n[e][t] === W && (t == -1 && (e = a[0], t = c[0]), i = Object.keys(n[e][t][l])[0], this[q]({
						presetId: t,
						presetType: e,
						presetKey: i
					}))
				}
				if (i === null && a[o]) {
					var h = this[s](N);
					t == h ? (e = a[0], t = Object.keys(n[e])[0]) : (e = O, t = h), this[X](e, t)
				}
				this[y]("renderPresets")
			},
			getLoadoutPresetsByType: function() {
				var e = this[s](C) || this[s](A),
					t = this[s](f),
					n = this[s](D),
					r = this[s](M),
					i = {
						activeKey: 0,
						presets: {}
					};
				if (t && t[e]) {
					i[l] = t[e];
					var u = Object.keys(i[l]);
					if (u[o]) {
						var a = i[l][r] ? r : u[0],
							c = i[l][a][l];
						if (!c[n]) {
							var h = Object.keys(c)[0];
							i[et] = h, this[q]({
								presetKey: h,
								presetId: a
							})
						} else i[et] = n
					}
				}
				return i
			},
			getLoadoutPresetsById: function() {
				var e = this[s](C) || this[s](A),
					t = this[s](M) || this[s](V),
					n = this[s](f),
					r = this[s](D),
					i = {
						activeKey: 0,
						presets: {}
					};
				if (n && n[e]) {
					i[l] = n[e][t][l];
					if (!i[l][r]) {
						var o = Object.keys(i[l])[0];
						i[et] = o, this[q]({
							presetKey: o
						})
					} else i[et] = r
				}
				return i
			},
			getLoadoutPresets: function(e, t) {
				var n = typeof e !== r ? e : this[s](C),
					i = typeof t !== r ? t : this[s](M),
					o = this[s](f),
					u = {};
				if (o && o[n] && o[n][i]) {
					var c = this[s](a);
					u = o[n][i], u[$] = null;
					var h = c[n][i].join("");
					for (var p in u[l]) {
						var d = u[l][p].ids.join("");
						if (d === h) {
							u[$] = p;
							break
						}
					}
				}
				return u
			},
			getLoadoutPreview: function() {
				var e = this[s](C),
					t = this[s](M),
					n = this[s](D),
					r = this[s](f),
					i = {};
				if (r[e] && r[e][t] && r[e][t][l] && r[e][t][l][n]) {
					var u = r[e][t][l][n];
					i = {
						name: u.loadoutName,
						slots: []
					};
					var a = u.ids,
						h = this[s](p),
						d = this[s](c),
						m = d[e][t][v],
						g = 0,
						y = m[o];
					while (g < y) {
						var b = a[g],
							w = h[s](b),
							E = m[g],
							S = {
								slotSid: E.sid
							};
						S.item = w ? w[_]() : h[s](E[p][0])[_](), i[v][z](S), g++
					}
				}
				return i
			},
			applyPreset: function(e, t, n, i) {
				typeof t === r && (t = this[s](C), n = this[s](M), i = this[s](D));
				var o = this[s](f),
					u = this[s](a);
				u[t][n] = o[t][n][l][i].ids.slice(), this[y](vt), e ? this[y]("save", {
					preset: g
				}) : this[y]("presetApplied", {
					type: t,
					id: n
				})[q]({
					changed: g
				})
			},
			savePreset: function(e, n, o, c) {
				var h = this,
					p = this[s](a);
				n = n || this[s](A), typeof o === r && (o = n == u ? this[s](S) : this[s](V));
				var d = p[n][o],
					v = {
						name: e,
						type: n,
						id: o,
						ids: JSON[ht](d),
						personaId: h[s](Q),
						game: h[s](dt),
						platform: h[s](K)
					};
				if (c) {
					var m = this[s](f);
					v.key = e, v.name = m[n][o][l][e].loadoutName
				}
				t.ajax({
					url: "{urlaction loadout.savepreset()}",
					data: v,
					type: it,
					success: function(e) {
						h[q]({
							presetLoadouts: e.message[l]
						}), h[X](n, o), h[y](ut, i)
					},
					error: function(e) {
						h[y](ut, e)
					}
				})
			},
			deletePreset: function(e) {
				var n = this;
				e = typeof e !== r ? e : this[s](D), t.ajax({
					url: "{urlaction loadout.deletepreset()}",
					data: {
						key: e,
						personaId: n[s](Q),
						game: n[s](dt),
						platform: n[s](K)
					},
					type: it,
					success: function(e) {
						n[q]({
							presetLoadouts: e.message[l]
						})[y](nt, i), n[X](n[s](C), n[s](M))
					},
					error: function(e) {
						n[y](nt, g)
					}
				})
			}
		}),
		Et = Backbone.Model[tt]({
			defaults: {
				category: "None",
				type: "unknown",
				configurable: i,
				duplicate: i,
				locked: g,
				battlepack: i,
				categoryType: ""
			},
			idAttribute: "guid",
			initialize: function() {
				this[s]("configurable") && this.on(R, this.calculateUnlocks, this);
				var e = this[s](h);
				if (e) {
					var t = parseInt(e[m], 10);
					isNaN(t) ? (e.fireModeString = e[m], delete e[m]) : e[m] = t
				}
				this.on(R, this.checkUnlock, this), this.on(mt, this[mt], this)
			},
			calculateUnlocks: function() {
				var e = this[V],
					t = BL[I][s]({
						model: this[U][F] ? L : b
					}),
					n = t[s](p),
					r = t[s](c),
					a = r[u][e][v] || i;
				if (a) {
					var f = 0,
						l = 0,
						h = 0,
						d = a[o] - 1;
					while (h < d) {
						var m = a[h][p],
							y = 1,
							w = m[o];
						while (y < w) {
							var E = n[s](m[y]),
								S = g;
							E && (S = E[s](G), S || l++, f++), y++
						}
						h++
					}
					this[q]({
						unlockStats: {
							total: f,
							unlocked: l
						}
					})
				}
			},
			calculateModifiers: function(e) {
				if (this[s](pt) == rt) {
					var t = this[s](h);
					if (t) {
						var n = BL[I][s]({
								model: this[U][F] ? L : b
							}),
							r = n[s](p),
							i = n[s](a),
							u = Object.create(t),
							f = n[s](ot),
							l = f[o],
							c = n[P](this[V], g),
							d = {},
							v = 0;
						while (v < l) d[f[v]] = [], v++;
						var m = 0,
							y = c[o];
						while (m < y) {
							var w = c[m];
							if (w != 0) {
								var E = {};
								e && e[m] ? E = e[m] : E = r[s](w)[s](h);
								if (E) {
									v = 0;
									while (v < l) {
										var S = Y + f[v];
										if (E[S] !== 1) {
											var x = E[S],
												T = t[S],
												N = 0;
											x > 1 ? N = T * (x - 1) : x < 0 ? N = T * x : x < 1 && x !== 0 && (N = T * x - T), u[S] += N
										}
										d[f[v]][z](E[S]), v++
									}
								}
							}
							m++
						}
						if (e) return u;
						this[q]({
							weaponDataRelative: u,
							slotModifiers: d
						})
					}
				}
			},
			getPresets: function() {
				var e = BL[I][s]({
						model: this[U][F] ? L : b
					}),
					t = e[s](a),
					n = e[s](f),
					r = {};
				if (n[u] && n[u][this[V]]) {
					r = n;
					var i = n[u][this[V]];
					for (var o in i[l]) {
						var c = i[l][o].ids.join(""),
							h = t[u][this[V]].join("");
						if (c === h) {
							i[$] = o;
							break
						}
					}
				}
				this[q]({
					presets: r
				}, {
					silent: g
				})
			},
			checkUnlock: function() {
				var e = i,
					t = i,
					n = i,
					u = BL[I][s]({
						model: this[U][F] ? L : b
					}),
					a = this[s]("req") || i,
					f = {
						percentage: 100
					},
					l = u[s]("stats"),
					c = u[s]("licenses");
				if (a) {
					var h = a[o];
					while (h--) {
						var p = a[h],
							d = p.c,
							v = parseInt(p.v, 10),
							m = 0,
							y = p.t,
							w = i;
						y == "b" ? (y = "bucket", t = i, n = i, m = parseInt(l[d] || 0, 10)) : y == "w" ? (y = rt, t = i, n = i, m = parseInt(l[d] || 0, 10)) : y == "a" ? (y = "award", t = i, d.toLowerCase().substring(0, 2) == "xp" && (w = "xp" + d.substring(2, 3)), n = g, m = parseInt(l[d] || 0, 10)) : y == "l" ? (d = p.l, v = 1, y = "license", t = g, n = i, m = typeof c[d] !== r ? 1 : 0) : y == "c" && (d = p.c, v = 1, y = "consumable", t = i, n = i, m = typeof c[d] !== r ? 1 : 0), f = {
							codeNeeded: d,
							valueNeeded: v,
							actualValue: m,
							unlockType: y,
							license: i,
							award: i,
							expansion: w
						};
						if (!(m < v || typeof m == r)) {
							e = i, f.percentage = 100;
							break
						}
						e = g, f.percentage = m / v * 100
					}
				}
				this[q]({
					unlockCriterias: f,
					battlepack: t,
					award: n,
					locked: e
				})
			},
			resetStats: function() {
				this.unset("stars").unset("starProgress").unset("criterias").unset("unlockStats")
			}
		});
	n[tt](BL[I].collection_definitions, {
		loadoutAllItemsCollection: Backbone.Collection[tt]({
			model: Et,
			calculateStats: function() {
				this.each(function(e) {
					e[y](R)
				})
			}
		})
	}), n[tt](BL[I].model_definitions, {
		loadoutModel: wt,
		friendLoadoutModel: wt
	})
})(window, jQuery, _);