function ItemViewController(e) {
	var t = "_params",
		n = "isTrackedManually",
		r = "_activePersona",
		i = "persona";
	e = e || {}, this[t] = e, this[t][n] = this[t][n] || !1, this._section = "omaha", this._game = enums.Game.OMAHA, this._name = "ItemView", this[r] = session.getUserActivePersonaForGame(this._game), this._persona = e[i] || this[r][i], this._platform = e.platform || this[r].platform, this._mysoldier = this._persona == this[r][i], this.titleSID = "ID_WEB_BASE_LOADING", this.modelinfo(e.type), ScrollableViewController.call(this, e)
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
	ScrollableViewController = require("controllers/ScrollableViewController"),
	HomeViewController = require("controllers/HomeViewController"),
	items_json = require("gamedata/omaha/items"),
	awards_json = require("gamedata/omaha/awards"),
	dogtags_json = require("gamedata/omaha/dogtags"),
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
			f = "vehicles";
		ItemViewController.prototype.modelinfo = function(l) {
			l == "award" || l == 32 ? (this[e] = t, this[n] = r, this[i] = r, this[s] = 32) : l == "assignment" ? (this[e] = "models/model.assignments", this[n] = o, this[i] = o, this[s] = 128) : l == u ? (this[e] = t, this[n] = r, this[i] = u, this[s] = 512) : l == "dogtag" ? (this[e] = "models/model.dogtags", this[n] = a, this[i] = a) : (this[e] = "models/model.items", this[n] = "items_list", l == "vehicle" ? (this[s] = 1, this[i] = f) : l == "kititem" ? (this[s] = 16, this[i] = "kititems") : l == "vehicleunlock" ? (this[s] = 8, this[i] = f) : l == "weaponaccessory" ? (this[s] = 4, this[i] = "weaponaccessories") : (this[s] = 2, this[i] = "weapons"))
		}
	}(), ItemViewController.prototype.viewDidLoad = function() {
		var e = "$suggestions",
			t = "mpsuggestions",
			n = this;
		ScrollableViewController.prototype.viewDidLoad.call(n), n[e] = [], web.request(enums.Game.OMAHA, t, {
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
		var e = "$content",
			t = "find",
			n = "open",
			r = "addClick",
			i = "removeClass",
			s = ".suggestionatindex .confirm",
			o = this,
			u = !1,
			a = template.render("SuggestionAtIndexView", {});
		o[e].append(a);
		var f = o[e][t](".suggestionatindex");
		setTimeout(function() {
			f.addClass(n)
		}, 100), o[e][t](".suggestionatindex .suggestionlist").append(o.$suggestions), o[e][t](".suggestionatindex .suggestion")[r](function(n) {
			o[e][t](s)[i]("disabled"), u = this.getAttribute("data-atindex")
		}), o[e][t](s)[r](function() {
			u = parseInt(u, 10) - 1, o.track_item(u), session.refreshSuggestions = !0
		}), o[e][t](".suggestionatindex .cancel")[r](function() {
			f[i](n), setTimeout(function() {
				f.remove()
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
			r ? receipt[t](locale.t("ID_WEB_SUGGESTIONS_UNABLE_TO_TRACK_ITEM"), "skull") : (n.$content.find(".tracked").addClass("vis"), n.$content.find(".suggestionatindex").hide(), receipt[t](locale.t("ID_WEB_SUGGESTIONS_TRACKING")), HomeViewController.prototype.refreshSuggestions(n._persona.personaId, n._platform, e))
		})
	}, ItemViewController.prototype.bind_events = function() {
		var e = "find",
			t = "$content",
			n = "click",
			r = "$suggestions",
			i = "_model",
			s = "getAttribute",
			o = "basic",
			u = "advanced",
			a = "index",
			f = "showReceipt",
			l = "ItemViewController",
			c = this,
			h = c._params.atIndex;
		c[t][e](".track").on(n, function() {
			if (typeof h == "undefined") {
				c[r] = [];
				var e = c[i].get("suggestions");
				e.forEach(function(e, t) {
					var n = $(template.render("suggestion", {
						suggestion: e,
						atIndex: t + 1
					}));
					c[r].push(n)
				}), c.atindex_view()
			} else $(this).addClass("disabled").removeClass("pressed"), c.track_item(h)
		}), c._type == "dogtags" && c[t][e](".equip:not(.disabled)").on(n, function() {
			this.className += " disabled";
			var e = this[s]("data-index"),
				t = this[s]("data-type"),
				n = {
					personaId: c._persona.personaId,
					platform: c._platform
				};
			n[t] = e, t == o ? n[u] = c[i].get(u)[a] : n[o] = c[i].get(o)[a], web.request(c._game, "savedogtags", n, function(n, r) {
				if (!n) {
					receipt[f](locale.t("ID_WEB_SHOWRECEIPT_PATCHES_SAVED"));
					var s = {};
					s[t] = dogtags_json[t][e], c[i].set(s), c.parentViewController.popView()
				} else receipt[f](locale.t("ID_WEB_SHOWRECEIPT_GENERIC_ERROR"), "skull")
			})
		}), c._type == "weapons" && (c[t][e](".accessory-item").on(n, function() {
			var e = this[s]("data-guid");
			app.go(l, {
				section: c._section,
				type: "weaponaccessory",
				parentSID: c.titleSID,
				guid: e
			})
		}), c[t][e](".assignment").on(n, function() {
			var e = this[s]("data-code");
			app.go(l, {
				section: c._section,
				type: "assignment",
				code: e
			})
		})), c[t][e](".refreshSuggestion").addClick(function() {
			c.refreshSuggestion()
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
			i = "length",
			s = "valueNeeded",
			o = "formatStatValue",
			u = "time",
			a = "actualValue",
			f = "isTrackedManually",
			l = this,
			c = e,
			h = l[t].get("medalAwardByCode"),
			p = l[t].get("ribbonAwardByCode"),
			d = l[n].code,
			v = l[n].medal || h ? h[d] : e;
		if (p) {
			if (!v)
				for (var m in h)
					if (h.hasOwnProperty(m)) {
						var g = h[m].award[r],
							y = g[i];
						for (var b = 0; b < y; b++)
							if (g[b].code == d) {
								v = h[m];
								break
							}
						if (v) break
					}
			var w = p[l[n].dependency || v.award[r][0].code];
			v.valueNeededUnit == "time_hours" && (v[s] = util[o](v[s], u), v[a] = util[o](v[a], u)), v.atIndex = l[n].atIndex, v[f] = e, v.tracked = e, v.mysoldier = l._mysoldier, v.guid = d, l.guid = d;
			var E = l[t].get("suggestions");
			if (E && E[i]) {
				var S = E[i],
					b = 0;
				while (b < S) {
					if (E[b].guid == l.guid) {
						v.tracked = !0, E[b][f] && (v[f] = !0);
						break
					}
					b++
				}
			}
			l.setTitleSID(v.award.stringID), c = template.render("AwardView", {
				medal: v,
				ribbon: w
			})
		}
		return c
	}, ItemViewController.prototype.render_assignment = function() {
		var e = "_params",
			t = !1,
			n = "_model",
			r = "allMissions",
			i = "isTrackedManually",
			s = "imageConfig",
			o = this,
			u = o[e].assignment,
			a = t,
			f = o[e].code;
		!u && o[n].get(r) && (u = o[n].get(r)[f]);
		if (u) {
			u[i] = t, u.tracked = t, u.mysoldier = o._mysoldier, _.indexOf(["as011", "as012", "as042", "as043", "as044", "as045", "as046", "as047", "as048", "as049", "as050", "as051", "as052", "as053", "as054", "as055", "as056", "sy001", "sy002", "sy003", "sy004", "sy005", "sy006", "sy007", "sy008", "sy009", "sy010", "sy011", "sy012", "sy013", "sy014", "sy015"], f) && u.locked && (u.unlockDependencies = []), _.each(u.upcomingUnlocks, function(e) {
				var n = e.dogTagUnlock || t;
				if (n) {
					var r = n.isAdvanced ? "advanced" : "basic";
					n[s] = dogtags_json[r][n.index][s]
				}
			});
			var l = o[n].get("suggestions");
			o.guid = u.guid = f, u.atIndex = o[e].atIndex;
			if (l) {
				var c = _.find(l, function(e) {
					return e.guid == f
				});
				c && (u.tracked = !0, c[i] && (u[i] = !0))
			}
			o.setTitleSID(u.award.stringID), a = template.render("AssignmentView", u)
		}
		return a
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
			f = "completion",
			l = "_params",
			c = "isTrackedManually",
			h = "playerProgress",
			p = "criterias",
			d = "unlockedByTextCriteria",
			v = "weaponData",
			m = "statDamage",
			g = this;
		t[i] = s;
		if (r != undefined && n != undefined) {
			t[i] = util.getLockInfo(e, n.unlockProgression);
			var y = 0,
				b = r[o];
			while (y < b) {
				if (r[y].guid == e) {
					t.stats = r[y];
					break
				}
				y++
			}
		} else t.stats = s;
		t[u] = a, t.equipped = s, t.mysoldier = g._mysoldier, t[f] = null, t.tracked = s, t.atIndex = g[l].atIndex, t[c] = s, t.guid = e, t[h] = s, t[p] = s, t[i] ? (t[p] = util[d](t[i], s, a), t[i].unlockType == "bucket" && (t[f] = t[i][f], t[f] == 100 ? t[u] = s : (t[h] = a, g[l].thisitem && (t[h] = g[l].thisitem[h][0], t[p] = t[h].completed ? s : util[d](t[h], s, a))))) : t[u] = s;
		if (t[v] && t[v][m] > 0) {
			var w = [m, "statAccuracy", "statMobility", "statRange", "statHandling"],
				E = 0,
				S = w[o];
			while (E < S) t[v][w[E].replace("stat", "")] = Math.floor(t[v][w[E]] * 100), E++
		}
		var x = g._model.get("suggestions");
		if (x && x[o]) {
			var T = x[o],
				N = 0;
			while (N < T) {
				if (x[N].guid == e) {
					t.tracked = a, x[N][c] && (t[c] = a);
					break
				}
				N++
			}
		}
		return delete g.fetch, template.render("WeaponView", t)
	}, ItemViewController.prototype.render_vehicle = function() {
		var e = this,
			t = e._model.get("vehiclesStats"),
			n = e._model.get("vehiclesMeta"),
			r = String(e._params.guid).split(","),
			i = "";
		return t && n && _.each(r, function(n) {
			var r = items_json.vehicles[n];
			r.atIndex = e._params.atIndex, r.mysoldier = e._mysoldier;
			var s = _.find(t, function(e) {
				return e.guid == n
			});
			s && (r.stats = s, r.time = util.formatStatValue(r.stats.timeUsed, "time")), e.setTitleSID(r.nameSID), i += template.render("VehicleView", r)
		}), i
	}, ItemViewController.prototype.render_generalitem = function(e, t, n) {
		var r = "_model",
			i = "guid",
			s = "_params",
			o = !1,
			u = "isTrackedManually",
			a = "thisitem",
			f = "playerProgress",
			l = !0,
			c = "length",
			h = "$suggestions",
			p = this,
			d = p[r].get(t),
			v = p[r].get(n),
			m = items_json[e][p[s][i]],
			g = o;
		if (d && v) {
			m[u] = o, m.tracked = o, m.atIndex = p[s].atIndex, m.mysoldier = p._mysoldier, m.criterias = o;
			var y = p[r].get("suggestions");
			p[s][a] && p[s][a][f] && (m[f] = p[s][a][f][0], m.criterias = m[f].completed ? o : util.unlockedByTextCriteria(m[f], o, l)), m.stats = [];
			var b = 0,
				w = d[c];
			while (b < w) {
				if (d[b][i] == p[s][i]) {
					m.stats = d[b];
					break
				}
				b++
			}
			if (v[p[s][i]]) {
				var E = v[p[s][i]],
					S = E[c];
				for (var x = 0; x < S; x++) m.stats.push(E[x])
			}
			var x = 0,
				T = p[h][c];
			if (T)
				while (x < T) {
					if (p[h][x][i] == p[s][i]) {
						m.tracked = l, p[h][x][u] && (m[u] = l);
						break
					}
					x++
				}
			m[i] = p[s][i], p.setTitleSID(m.nameSID), g = template.render("GeneralItemView", m)
		}
		return g
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
			r.setTitleSID(l.nameSID), l.seen = s[u].indexOf(a) !== -1, l.seen && (l[n] = i[u][a], l[n] && (l[n].friendly = l[n].timestamp ? util.friendlyDate(l[n].timestamp * 1e3) : "-")), l.type = u, l.locked = o[u].indexOf(a) == -1 || !r._mysoldier, l.equipped = r[e].get(u)[t] == l[t], f = template.render("DogtagView", l)
		}
		return f
	}, ItemViewController.prototype.refreshSuggestion = function(e) {
		var t = "_model",
			n = "newmpsuggestion",
			r = "_params",
			i = "showReceipt",
			s = this;
		s[t].set({
			loading: !0
		}), web.request(enums.Game.OMAHA, n, {
			personaId: s._persona.personaId,
			platform: s._platform,
			atIndex: parseInt(s[r].atIndex, 10) + 1
		}, function(o, u) {
			if (o) receipt[i](locale.t("ID_MOBILE_SUGGESTIONS_REFRESH_FAIL"), "skull"), s[t].set({
				loading: !1
			});
			else {
				receipt[i](locale.t("ID_MOBILE_SUGGESTIONS_REFRESHED")), s[r].thisitem = u[n];
				var a = u[n].guid,
					f = u[n].category,
					l = u[n].type;
				l == 2 ? l = "weapon" : l == 4 ? l = "weaponaccessory" : l == 8 ? l = "vehicleunlock" : l == 16 ? l = "kititem" : l == 32 ? l = "award" : l == 128 ? l = "assignments" : l == 512 ? l = "servicestar" : l == 1024 && (l = "battlepack"), s[r].type = l, s[r].guid = a, s[r].code = a, s.guid = a, s._type = f, s.modelinfo(l), s.instantiate_model(), s[t].set({
					loading: !1
				}, {
					silent: !0
				}), HomeViewController.prototype.refreshSuggestions(s._persona.personaId, s._platform, e)
			}
		})
	};