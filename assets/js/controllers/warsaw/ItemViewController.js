function ItemViewController(e) {
	var t = "_params",
		n = "isTrackedManually",
		r = "_activePersona",
		i = "persona";
	e = e || {}, this[t] = e, this[t][n] = this[t][n] || !1, this._section = "warsaw", this._game = enums.Game.WARSAW, this._name = "ItemView", this[r] = session.getUserActivePersonaForGame(this._game), this._persona = e[i] || this[r][i], this._platform = e.platform || this[r].platform, this._mysoldier = this._persona == this[r][i], this.titleSID = "ID_MOBILE_PULLTOREFRESH_LABEL_LOADING", this.modelinfo(e.type), ScrollableViewController.call(this, e)
}
var app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	util = require("util"),
	device = require("device"),
	events = require("events"),
	session = require("session"),
	enums = require("enums"),
	Push = require("push"),
	web = require("web"),
	template = require("template"),
	_ = require("underscore"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	HomeViewController = require("controllers/HomeViewController"),
	items_json = require("gamedata/warsaw/items"),
	awards_json = require("gamedata/warsaw/awards"),
	dogtags_json = require("gamedata/warsaw/dogtags"),
	receipt = require("receipt");
module.exports = ItemViewController, ItemViewController.prototype = new ScrollableViewController, ItemViewController.prototype.constructor = ItemViewController,
	function() {
		var e = "model_file",
			t = "models/model.awards",
			n = "model_name",
			r = "awards",
			i = "_type",
			s = "suggestionTypeId",
			o = "assignments",
			u = "servicestar",
			a = "dogtags",
			f = "vehicles",
			l = "battlepack";
		ItemViewController.prototype.modelinfo = function(c) {
			c == "award" || c == 32 ? (this[e] = t, this[n] = r, this[i] = r, this[s] = 32) : c == "assignment" ? (this[e] = "models/model.assignments", this[n] = o, this[i] = o, this[s] = 128) : c == u ? (this[e] = t, this[n] = r, this[i] = u, this[s] = 512) : c == "dogtag" ? (this[e] = "models/model.dogtags", this[n] = a, this[i] = a) : (this[e] = "models/model.items", this[n] = "items_list", c == "vehicle" ? (this[s] = 1, this[i] = f) : c == "kititem" ? (this[s] = 16, this[i] = "kititems") : c == "vehicleunlock" ? (this[s] = 8, this[i] = f) : c == "weaponaccessory" ? (this[s] = 4, this[i] = "weaponaccessories") : c == l ? (this[s] = 1024, this[i] = l) : (this[s] = 2, this[i] = "weapons"))
		}
	}(), ItemViewController.prototype.viewDidLoad = function() {
		var e = "$suggestions",
			t = "mpsuggestions",
			n = this;
		ScrollableViewController.prototype.viewDidLoad.call(n), n[e] = [], web.request(enums.Game.WARSAW, t, {
			personaId: n._persona.personaId,
			platform: n._platform
		}, function(r, i) {
			r ? n[e].empty() : n[e] = i[t]
		}), n.instantiate_model()
	}, ItemViewController.prototype.instantiate_model = function() {
		var e = "_model",
			t = "model_name",
			n = this;
		require([n.model_file], function() {
			n[e] && n[e].off(), n[t] = n._mysoldier ? n[t] + e : n[t] + "_friend_model", n[e] = BL.backbone.get({
				model: n[t]
			}), n.bind_fetch(), n.render(), n[e].on("change", n.render, n)
		})
	}, ItemViewController.prototype.get_url = function() {
		var e = "_persona";
		return web.url(this._game, this._type, {
			personaId: this[e].personaId,
			platform: this._platform,
			userId: this[e].userId,
			personaName: this[e].personaName
		})
	}, ItemViewController.prototype.fetch_data = function() {
		return this.model_fetch(), template.render("ItemView")
	}, ItemViewController.prototype.model_fetch = function() {
		var e = this;
		e._model.set({
			loading: !0
		}, {
			silent: !0
		}).fetch(e.get_url())
	}, ItemViewController.prototype.bind_fetch = function() {
		var e = "pushBind",
			t = this;
		t[e] && Push.unbind(t[e]), t[e] = Push.bind("UserStatsUpdated", function() {
			t.model_fetch()
		})
	}, ItemViewController.prototype.atindex_view = function() {
		var e = "find",
			t = "$content",
			n = ".suggestionatindex",
			r = "open",
			i = "addClick",
			s = "removeClass",
			o = ".confirm",
			u = this,
			a = !1,
			f = template.render("SuggestionAtIndexView", {});
		u[t][e](n).remove(), u[t][e](".track.button").parent().append(f);
		var l = u[t][e](n);
		setTimeout(function() {
			l.addClass(r)
		}, 100), l[e](".suggestionlist").append(u.$suggestions), l[e](".suggestion")[i](function(t) {
			$(this).siblings()[s]("pressed"), l[e](o)[s]("disabled"), a = this.getAttribute("data-atindex")
		}), l[e](o)[i](function() {
			a = parseInt(a, 10) - 1, u.track_item(a), session.refreshSuggestions = !0
		}), l[e](".cancel")[i](function() {
			l[s](r), setTimeout(function() {
				l.remove()
			}, 350)
		})
	}, ItemViewController.prototype.track_item = function(e) {
		var t = "showReceipt",
			n = this,
			r = {
				personaId: n._persona.personaId,
				platform: n._platform,
				guid: n.guid,
				suggestionTypeId: n.suggestionTypeId,
				atIndex: e,
				game: n._game
			};
		r.atIndex = parseInt(r.atIndex, 10) + 1, web.request(n._game, "settrackeditem", r, function(r, i) {
			r ? receipt[t](locale.t("ID_WEB_SUGGESTIONS_UNABLE_TO_TRACK_ITEM"), "skull") : (n.$content.find(".tracked").addClass("vis"), n.$content.find(".suggestionatindex").hide(), receipt[t](locale.t("ID_WEB_SUGGESTIONS_TRACKING")), events.emit("suggestionsDidChange", n._persona.personaId, n._platform, e))
		})
	}, ItemViewController.prototype.bind_events = function() {
		var e = "_model",
			t = "suggestions",
			n = "$content",
			r = "click",
			i = "$suggestions",
			s = "getAttribute",
			o = "basic",
			u = "advanced",
			a = "index",
			f = "showReceipt",
			l = this,
			c = l._params.atIndex;
		events.bind("suggestionsDidRefresh", function(n) {
			l[e].set(t, n)
		}), l[n].find(".track").on(r, function() {
			if (typeof c == "undefined") {
				l[i] = [];
				var n = l[e].get(t);
				n.forEach(function(e, t) {
					var n = $(template.render("suggestion", {
						suggestion: e,
						atIndex: t + 1
					}));
					l[i].push(n)
				}), l.atindex_view()
			} else $(this).addClass("disabled").removeClass("pressed"), l.track_item(c)
		}), l._type == "dogtags" && l[n].find(".equip:not(.disabled)").on(r, function() {
			this.className += " disabled";
			var t = this[s]("data-index"),
				n = this[s]("data-type"),
				r = {
					personaId: l._persona.personaId,
					platform: l._platform
				};
			r[n] = t, n == o ? r[u] = l[e].get(u)[a] : r[o] = l[e].get(o)[a], web.request(l._game, "savedogtags", r, function(r, i) {
				if (!r) {
					receipt[f](locale.t("ID_WEB_SHOWRECEIPT_DOGTAGS_SAVED"));
					var s = {};
					s[n] = dogtags_json[n][t], l[e].set(s), l.parentViewController.popView()
				} else receipt[f](locale.t("ID_WEB_SHOWRECEIPT_GENERIC_ERROR"), "skull")
			})
		}), l._type == "weapons" && l[n].find(".accessory-item").on(r, function() {
			var e = this[s]("data-guid");
			app.go("ItemViewController", {
				section: l._section,
				type: "weaponaccessory",
				parentSID: l.titleSID,
				guid: e
			})
		}), l[n].find(".refreshSuggestion").addClick(function() {
			l.refreshSuggestion()
		})
	}, ItemViewController.prototype.render = function() {
		var e = this,
			t = e["render_" + e._params.type]();
		t !== "WAIT" && (t ? (e.$content.html(t), e.bind_events()) : e.fetch_data())
	}, ItemViewController.prototype.render_award = function() {
		var e = !1,
			t = "_model",
			n = "_params",
			r = "dependencies",
			i = "valueNeeded",
			s = "formatStatValue",
			o = "time",
			u = "actualValue",
			a = "isTrackedManually",
			f = this,
			l = e,
			c = f[t].get("medalAwardByCode"),
			h = f[t].get("ribbonAwardByCode"),
			p = f[n].code,
			d = f[n].medal || (c ? c[p] : e);
		if (h) {
			if (!d)
				for (var v in c)
					if (c.hasOwnProperty(v)) {
						var m = c[v].award[r],
							g = m.length;
						for (var y = 0; y < g; y++)
							if (m[y].code == p) {
								d = c[v];
								break
							}
						if (d) break
					}
			var b = h[f[n].dependency || d.award[r][0].code];
			d.valueNeededUnit == "time_hours" && (d[i] = util[s](d[i], o), d[u] = util[s](d[u], o)), d.atIndex = f[n].atIndex, d[a] = e, d.tracked = e, d.mysoldier = f._mysoldier, d.guid = p, f.guid = p;
			var w = f[t].get("suggestions"),
				E = w.length;
			if (E) {
				var y = 0;
				while (y < E) {
					if (w[y].guid == f.guid) {
						d.tracked = !0, w[y][a] && (d[a] = !0);
						break
					}
					y++
				}
			}
			f.setTitleSID(d.award.stringID), l = template.render("AwardView", {
				medal: d,
				ribbon: b
			})
		}
		return l
	}, ItemViewController.prototype.render_assignment = function() {
		var e = "_params",
			t = !1,
			n = "_model",
			r = "allMissions",
			i = "length",
			s = "criterias",
			o = "isTrackedManually",
			u = "upcomingUnlocks",
			a = "dogTagUnlock",
			f = "imageConfig",
			l = "appearanceUnlock",
			c = this,
			h = c[e].assignment,
			p = t,
			d = c[e].code;
		!h && c[n].get(r) && (h = c[n].get(r)[d]);
		if (h) {
			var v = c[n].get("spAssignments");
			!h[s][i] && v[d] && (h[s] = v[d][s], h[s][0].originalCriteria = h[s][0], h.award.awardRealm = "sp"), h[o] = t, h.tracked = t, h.mysoldier = c._mysoldier;
			var m = 0,
				g = h[u][i],
				y = [],
				b = [];
			while (m < g) {
				var w = h[u][m][a] || t;
				if (w) {
					var E = w.isAdvanced ? "advanced" : "basic";
					h[u][m][a][f] = dogtags_json[E][w.index][f]
				}
				var S = h[u][m];
				if (S[l]) {
					var x = S[l][f].slug;
					b.indexOf(x) == -1 && (b.push(x), y.push(S))
				}
				m++
			}
			y[i] && (h[u] = y);
			var T = c[n].get("suggestions"),
				N = 0;
			h.guid = d, c.guid = h.guid, h.atIndex = c[e].atIndex;
			if (T) {
				var C = T[i];
				while (N < C) {
					if (T[N].guid == d) {
						h.tracked = !0, T[N][o] && (h[o] = !0);
						break
					}
					N++
				}
			}
			c.setTitleSID(h.award.stringID), p = template.render("AssignmentView", h)
		}
		return p
	}, ItemViewController.prototype.render_weapon = function() {
		var e = "_params",
			t = "accessories",
			n = "unlockedBy",
			r = "license",
			i = "push",
			s = !0,
			o = "make_weapon",
			u = this,
			a = u._model.get("weaponsStats"),
			f = u._model.get("weaponsMeta"),
			l = u[e].thisitem != undefined ? u[e].thisitem.guid : u[e].guid,
			c = items_json.weapons[l];
		return f && a ? (u.setTitleSID(c.nameSID), typeof c[t] == "undefined" ? (u.fetch && u.fetch.abort(), u.fetch = web.request(u.game, "weaponaccessories", {
			personaId: u._persona.personaId,
			platform: u._platform,
			guid: l
		}, function(e, h) {
			c[t] = {
				license: [],
				bucket: []
			}, h.statsItemUnlocks.forEach(function(e) {
				var s = items_json.weaponaccessory[e.guid];
				s && (s[n] = e[n], s[n].unlockType == r ? c[t][r][i](s) : c[t].bucket[i](s))
			});
			for (var p in c[t]) {
				var d = c[t][p].length;
				d % 4 == 3 ? c[t][p][i]({
					empty: s
				}) : d % 4 == 2 ? c[t][p][i]({
					empty: s
				}, {
					empty: s
				}) : d % 4 == 1 && c[t][p][i]({
					empty: s
				}, {
					empty: s
				}, {
					empty: s
				})
			}
			u.$content.html(u[o](l, c, f, a)), u.bind_events()
		}), "WAIT") : u[o](l, c, f, a)) : !1
	}, ItemViewController.prototype.make_weapon = function(e, t, n, r) {
		var i = "locked_data",
			s = !1,
			o = "length",
			u = "locked",
			a = !0,
			f = "progressBar",
			l = "completion",
			c = "_params",
			h = "isTrackedManually",
			p = "playerProgress",
			d = "criterias",
			v = "unlockedByTextCriteria",
			m = "unlockType",
			g = "bucket",
			y = "weaponData",
			b = "statDamage",
			w = this;
		t[i] = s;
		if (r != undefined && n != undefined) {
			t[i] = util.getLockInfo(e, n.unlockProgression);
			var E = 0,
				S = r[o];
			while (E < S) {
				if (r[E].guid == e) {
					t.stats = r[E];
					break
				}
				E++
			}
		} else t.stats = s;
		t[u] = a, t[f] = s, t.equipped = s, t.mysoldier = w._mysoldier, t[l] = null, t.tracked = s, t.atIndex = w[c].atIndex, t[h] = s, t.guid = e, t[p] = s, t[d] = s;
		if (t[i]) {
			t[d] = util[v](t[i], s, a);
			if (t[i][m] == g || t[i][m] == "license" || t[i][m] == "award") t[l] = t[i][l], t[l] == 100 ? t[u] = s : (t[p] = a, t[i][m] == g && (t[f] = a), w[c].thisitem && (t[p] = w[c].thisitem[p][0], t[d] = t[p].completed ? s : util[v](t[p], s, a)))
		} else t[u] = s;
		if (t[y] && t[y][b] > 0) {
			var x = [b, "statAccuracy", "statMobility", "statRange", "statHandling"],
				T = 0,
				N = x[o];
			while (T < N) t[y][x[T].replace("stat", "")] = Math.floor(t[y][x[T]] * 100), T++
		}
		var C = w._model.get("suggestions");
		if (C && C[o]) {
			var k = C[o],
				L = 0;
			while (L < k) {
				if (C[L].guid == e) {
					t.tracked = a, C[L][h] && (t[h] = a);
					break
				}
				L++
			}
		}
		return delete w.fetch, template.render("WeaponView", t)
	}, ItemViewController.prototype.render_vehicle = function() {
		var e = "_params",
			t = "setTitleSID",
			n = this,
			r = n._model.get("vehiclesStats"),
			i = n._model.get("vehiclesMeta"),
			s = n[e].category,
			o = String(n[e].guid).split(","),
			u = 0,
			a = "",
			f;
		if (r && i) {
			while (u < o.length) {
				var l = o[u],
					c = items_json.vehicles[l];
				if (c) {
					var h = 0;
					c.atIndex = n[e].atIndex, c.mysoldier = n._mysoldier;
					var p = r.length;
					while (h < p) {
						if (r[h].guid == l) {
							c.stats = r[h];
							break
						}
						h++
					}
					c.stats && (c.time = util.formatStatValue(c.stats.timeUsed, "time")), u === 0 && n[t](c.nameSID), a += template.render("VehicleView", c)
				}
				u++
			}
			s && n[t](enums.niceVehicleCategoryName[s.toUpperCase()])
		}
		return a
	}, ItemViewController.prototype.render_generalitem = function(e, t, n) {
		var r = "_model",
			i = "guid",
			s = "_params",
			o = !1,
			u = "isTrackedManually",
			a = "thisitem",
			f = "playerProgress",
			l = !0,
			c = "stats",
			h = "length",
			p = "$suggestions",
			d = this,
			v = d[r].get(t),
			m = d[r].get(n),
			g = items_json[e][d[s][i]],
			y = o;
		if (v && m) {
			g[u] = o, g.tracked = o, g.atIndex = d[s].atIndex, g.mysoldier = d._mysoldier, g.criterias = o;
			var b = d[r].get("suggestions");
			d[s][a] && d[s][a][f] && (g[f] = d[s][a][f][0], g.criterias = g[f].completed ? o : util.unlockedByTextCriteria(g[f], o, l)), g[c] = [];
			var w = 0,
				E = v[h];
			while (w < E) {
				if (v[w][i] == d[s][i]) {
					g[c] = v[w];
					break
				}
				w++
			}
			if (m[d[s][i]]) {
				var S = m[d[s][i]],
					x = S[h];
				for (var T = 0; T < x; T++) g[c].push(S[T])
			}
			var T = 0,
				N = d[p][h];
			if (N)
				while (T < N) {
					if (d[p][T][i] == d[s][i]) {
						g.tracked = l, d[p][T][u] && (g[u] = l);
						break
					}
					T++
				}
			g[c].forEach(function(e) {
				e.name = locale.t(util.statNameToSID(e.name))
			}), g[i] = d[s][i], d.setTitleSID(g.nameSID), y = template.render("GeneralItemView", g)
		}
		return y
	}, ItemViewController.prototype.render_kititem = function() {
		return this.render_generalitem("kititems", "kititemsStats", "kititemsMeta")
	}, ItemViewController.prototype.render_servicestar = function() {
		var e = "thisitem",
			t = "_params",
			n = "isTrackedManually",
			r = !1,
			i = "playerProgress",
			s = !0,
			o = "$suggestions",
			u = this,
			a = awards_json.mp.AwardGroup_Star[u[t][e].slug];
		a[n] = r, a.tracked = r, a.atIndex = u[t].atIndex, a.mysoldier = u._mysoldier, a[i] = u[t][e][i][0], a.criterias = a[i].completed ? r : util.unlockedByTextCriteria(a[i], r, s);
		var f = 0,
			l = u[o].length;
		if (l)
			while (f < l) {
				if (u[o][f].guid == u[t][e].guid) {
					a.tracked = s, u[o][f][n] && (a[n] = s);
					break
				}
				f++
			}
		return a.guid = u[t][e].guid, u.setTitleSID(a.stringID), template.render("ServiceStarItemView", a)
	}, ItemViewController.prototype.render_vehicleunlock = function() {
		var e = "_params",
			t = !1,
			n = "isTrackedManually",
			r = "length",
			i = "playerProgress",
			s = "unlockedBy",
			o = !0,
			u = this,
			a = u._model.get("vehiclesProgression"),
			f = u[e].guid,
			l = items_json.vehicleunlocks[f],
			c = t;
		if (l && a) {
			l[n] = t, l.tracked = t, l.atIndex = u[e].atIndex, l.mysoldier = u._mysoldier;
			var h = u._model.get("suggestions"),
				p = a[u[e].category],
				d = 0;
			if (p) {
				var v = p[r];
				for (d = 0; d < v; d++)
					if (p[d].guid == f) {
						l[i] = p[d][s];
						break
					}
			} else
				for (var m in a)
					if (a.hasOwnProperty(m)) {
						p = a[m];
						var v = p[r],
							g = t;
						for (d = 0; d < v; d++)
							if (p[d].guid == f) {
								l[i] = p[d][s], g = o;
								break
							}
						if (g) break
					}
			var h = u.$suggestions,
				y = h[r];
			if (y) {
				var d = 0;
				while (d < y) {
					if (h[d].guid == f) {
						l.tracked = o, h[d][n] && (l[n] = o);
						break
					}
					d++
				}
			}
			l.criterias = l[i].completed ? t : util.unlockedByTextCriteria(l[i], t, o), u.setTitleSID(l.nameSID), c = template.render("VehicleUnlockView", l)
		}
		return c
	}, ItemViewController.prototype.render_weaponaccessory = function() {
		var e = "_params",
			t = "isTrackedManually",
			n = !1,
			r = "unlockedBy",
			i = !0,
			s = this,
			o = null,
			u = items_json.weaponaccessory[s[e].guid],
			a = s[e].guid;
		u[t] = n, u.tracked = n, u.atIndex = s[e].atIndex, s.setTitleSID(u.nameSID), u[r] ? u.criterias = u[r].completed ? n : util.unlockedByTextCriteria(u[r], n, i, s[e].parentSID) : u[r] = n;
		var f = s.$suggestions,
			l = f.length;
		if (l) {
			var c = 0;
			while (c < l) {
				if (f[c].guid == a) {
					u.tracked = i, f[c][t] && (u[t] = i);
					break
				}
				c++
			}
		}
		return o = template.render("WeaponAccessoryItemView", u), o
	}, ItemViewController.prototype.render_battlepack = function() {
		var e = "thisitem",
			t = "_params",
			n = "isTrackedManually",
			r = !1,
			i = "$suggestions",
			s = !0,
			o = "playerProgress",
			u = this,
			a = u[t][e];
		a[n] = r, a.tracked = r, a.atIndex = u[t].atIndex, a.mysoldier = u._mysoldier;
		var f = u[i].length;
		if (f) {
			var l = 0;
			while (l < f) {
				if (u[i][l].guid == u[t][e].guid) {
					a.tracked = s, u[i][l][n] && (a[n] = s);
					break
				}
				l++
			}
		}
		return a.criterias = a[o][0].complete ? util.unlockedByTextCriteria(a[o][0], r, s) : r, a.guid = u[t][e].guid, u.setTitleSID(a.name), template.render("BattlepackItemView", a)
	}, ItemViewController.prototype.render_dogtag = function() {
		var e = "_model",
			t = "index",
			n = "seen_data",
			r = this,
			i = r[e].get("seenDogTags"),
			s = r[e].get("seenDogTagsIndices"),
			o = r[e].get("unlockedDogTagsIndices"),
			u = r._params.tag_type,
			a = parseInt(r._params[t]),
			f = !1;
		if (i && s && o) {
			var l = dogtags_json[u][a];
			r.setTitleSID(l.nameSID), l.seen = s[u].indexOf(a) !== -1, l.seen && (l[n] = i[u][a], l[n] && (l[n].friendly = l[n].timestamp ? util.friendlyDate(l[n].timestamp * 1e3) : "-")), l.type = u, l.locked = o[u].indexOf(parseInt(a, 10)) == -1, l.equipped = r[e].get(u)[t] == l[t], f = template.render("DogtagView", l)
		}
		return f
	}, ItemViewController.prototype.refreshSuggestion = function(e) {
		var t = "_model",
			n = "newmpsuggestion",
			r = "_params",
			i = "vehicleunlock",
			s = this;
		s[t].set({
			loading: !0
		}), web.request(enums.Game.WARSAW, n, {
			personaId: s._persona.personaId,
			platform: s._platform,
			atIndex: parseInt(s[r].atIndex, 10) + 1
		}, function(o, u) {
			if (o) receipt.showReceipt(locale.t("ID_MOBILE_SUGGESTIONS_REFRESH_FAIL"), "skull"), s[t].set({
				loading: !1
			});
			else {
				s[r].thisitem = u[n];
				var a = u[n].guid,
					f = u[n].category,
					l = u[n].type;
				l == 2 ? l = "weapon" : l == 4 ? l = "weaponaccessory" : l == 8 ? l = i : l == 16 ? l = "kititem" : l == 32 ? l = "award" : l == 128 ? l = "assignments" : l == 512 ? l = "servicestar" : l == 1024 && (l = "battlepack"), l == i && (s[r].category = u.newmpsuggestionitemCategoryID), s[r].type = l, s[r].guid = a, s[r].code = a, s.guid = a, s._type = f, s.modelinfo(l), s.instantiate_model(), s[t].set({
					loading: !1
				}, {
					silent: !0
				}), events.emit("suggestionsDidChange", s._persona.personaId, s._platform, e)
			}
		})
	};