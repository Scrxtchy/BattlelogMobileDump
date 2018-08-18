function LoadoutViewController(e) {
	var t = "_activePersona",
		n = "persona",
		r = "_mysoldier";
	e = e || {}, this._name = "LoadoutView", this._section = "warsaw", this._game = e.game || enums.Game.WARSAW, this[t] = session.getUserActivePersonaForGame(this._game), this._persona = e[n] || this[t][n], this._platform = e.platform || this[t].platform, this[r] = this._persona == this[t][n], this._model = BL.backbone.get({
		model: {
			name: this[r] ? "loadoutModel" : "friendLoadoutModel"
		}
	}), e.reset && this._model.set({
		fetched: !1
	}), this._collection = BL.backbone.get({
		collection: {
			name: "loadoutAllItemsCollection"
		}
	}), ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_COMMON_LOADOUT"
}
var _ = require("underscore"),
	BL = require("backbone-helper"),
	template = require("template"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	json = require("gamedata/warsaw/loadout"),
	Push = require("push"),
	receipt = require("receipt"),
	model = require("models/model.loadout"),
	app = require("app"),
	locale = require("locale"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = LoadoutViewController, LoadoutViewController.prototype = new ScrollableViewController, LoadoutViewController.prototype.constructor = LoadoutViewController, LoadoutViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	t.loadoutInitialize(), t.accessedAlready = !1, t.updateModel(), ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, LoadoutViewController.prototype.viewWillPop = function() {
	var e = this;
	e.parentViewController.getViewsOfType("LoadoutView").length == 1 && e._mysoldier && e._model.set({
		fetched: !1
	}, {
		silent: !0
	}), ScrollableViewController.prototype.viewWillPop.call(e)
}, LoadoutViewController.prototype.viewDidLoad = function() {
	var e = this;
	e.navigate(), ScrollableViewController.prototype.viewDidLoad.call(e)
}, LoadoutViewController.prototype.loadoutInitialize = function() {
	var e = "_model",
		t = "presetApplied",
		n = this;
	n[e].get("items").length || n[e].set({
		items: n._collection
	}, {
		silent: !0
	});
	var r = n[e].get("fetched");
	r || (n.fetchLoadout(), n[e].off("fetch"), n[e].off("save"), n[e].on(t, n[t]), n.bindModelEvents())
}, LoadoutViewController.prototype.bindModelEvents = function() {
	var e = "_model",
		t = "fetchLoadout",
		n = "getViewsOfType",
		r = "parentViewController",
		i = "LoadoutView",
		s = "showReceipt",
		o = this;
	Push.bind("LoadoutUpdated", function() {
		o[e].get("saved") ? o[e].set({
			saved: !1
		}) : o[t](function() {
			var e = o[r][n](i),
				t = 0,
				u = e.length;
			while (t < u) e[t].navigate(), t++;
			receipt[s](locale.t("ID_WEB_LOADOUT_REFRESHED"))
		})
	}), Push.bind("LoadoutPresetsUpdated", function() {
		o[t](function() {
			var e = o[r][n](i),
				t = 0,
				u = e.length;
			while (t < u) e[t].navigate(), t++;
			receipt[s](locale.t("ID_MOBILE_LOADOUT_PRESETS_UPDATED"))
		})
	}), o[e].on("save", this.saveLoadout, this)
}, LoadoutViewController.prototype.fetchLoadout = function(e) {
	var t = "personaId",
		n = "personaName",
		r = "mySoldier",
		i = "_mysoldier",
		s = "_collection",
		o = "platformInt",
		u = !1,
		a = !0,
		f = "compatibility",
		l = "loadout",
		c = "length",
		h = "weapons",
		p = "configurable",
		d = "compatibilityLocked",
		v = this;
	web.request(v._game, "getloadout", {
		personaId: v._persona[t],
		personaName: v._persona[n],
		platformInt: v._platform
	}, function(m, g) {
		g = g || {};
		var y = {};
		y[r] = v[i], v[s][r] = v[i], y[r] && (y[t] = g[t], y[n] = g[n], y[o] = g[o], y.platformName = enums.Platform.toString(y[o]), y.game = g.game), y.stats = g.playerStats || u, y.licenses = g.playerLicenses || u, y.presetLoadouts = g.presets || {}, y.premiumMaxPresetSlots = g.maxPresetsPremium, y.standardMaxPresetSlots = g.maxPresetsStandard, y.isPremium = g.isPremium || u;
		var b = g.currentLoadout || u;
		y.fetched = a, y[f] = json[l][f] || {}, y.structure = json[l];
		if (!v[s][c]) {
			var w = json.compact,
				E = json[l];
			delete E[f];
			var S = [],
				x = 0,
				T = E.kits[c];
			while (x < T) E.kits[x].slots.pop(), x++;
			w = {
				item: w.kititems,
				vehicle: w.vehicles,
				appearance: w.appearances,
				vehicleUnlock: w.vehicleunlocks,
				accessory: w.weaponaccessory,
				weapon: w[h]
			};
			for (var N in w) {
				var C = w[N];
				for (var k in C) {
					var L = C[k];
					L.itemType = N;
					var A = L.see || u;
					if (A) {
						var O = 0,
							M = A[c];
						while (O < M) _.extend(L, C[A[O]]), O++;
						L.guid = k, N == "weapon" && (L[p] = u, E[h][k] && E[h][k].slots && (L[p] = a)), y[f][k] ? (L[f] = y[f][k], L[f].items ? L[d] = !L[f].exclusive : L[d] = u) : L[f] = u;
						if (L.req) {
							var D = u,
								P = L.req[c];
							while (P--) {
								var H = L.req[P];
								if (H.t == "l" && H.l == "dt_dev_team" && typeof y.licenses[H.l] == "undefined") {
									D = a;
									break
								}
							}
							if (D) continue
						}
						S.push(L)
					}
				}
			}
			v[s].add(_.values(S))
		}
		v._model.set(y), v[s].calculateStats(), v._model.initialLoadout(b), typeof e == "function" ? e() : v.navigate()
	})
}, LoadoutViewController.prototype.updateModel = function() {
	var e = "weaponId",
		t = "presetType",
		n = "managePresets",
		r = this,
		i = {};
	i.id = typeof r.id != "undefined" ? r.id : -1, i.type = r.type, i.slot = r.slot, i[e] = r[e], i[t] = r[t], i.presetKey = r.presetKey, i.presetId = r.presetId, i.accessory = r[e] ? r.accessory : undefined, i[n] = r[n] || !1, r._model.set(i)
}, LoadoutViewController.prototype.goBack = function() {
	var e = "parentViewController",
		t = this;
	t[e].getViewAtIndex(-2).navigate();
	var n = t[e].getViewsOfTypeBeforeIndex("LoadoutView", -2),
		r = 0,
		i = n.length;
	while (r < i) n[r].navigate(), r++;
	t[e].popView()
}, LoadoutViewController.prototype.presetApplied = function() {
	receipt.showReceipt(locale.t("ID_WEB_LOADOUT_APPLIED"))
}, LoadoutViewController.prototype.saveLoadout = function() {
	var e = "_model",
		t = "selectedKit",
		n = "undefined",
		r = "_activePersona",
		i = "showReceipt",
		s = ".save-loadout",
		o = this,
		u = o[e].get("loadout");
	o[e].set({
		changed: !1
	}), u[t] = o[e].get(t);
	var a = 0;
	for (var f in u.weapons) {
		var l = u.weapons[f];
		a = 0;
		while (a < 6) typeof l[a] === n && (l[a] = "0"), a++
	}
	f = 0;
	var c = u.kits.length;
	while (f < c) {
		var h = u.kits[f];
		a = 0;
		while (a < 8) typeof h[a] === n && (h[a] = "0"), a++;
		f++
	}
	f = 0, c = u.vehicles.length;
	while (f < c) {
		a = 0;
		var p = u.vehicles[f];
		while (a < 10) typeof p[a] === n && (p[a] = "0"), a++;
		f++
	}
	web.request(o._game, "saveloadout", {
		personaId: o[r].personaId,
		game: o[r].game,
		platformInt: o[r].platform,
		loadout: JSON.stringify(u)
	}, function(t, n) {
		if (!t) o[e].set({
			saved: !0
		}), receipt[i](locale.t("ID_WEB_LOADOUT_SAVED")), $(s).animate({
			marginTop: "-34px"
		}, function() {
			$(this).remove()
		});
		else {
			var r = locale.t("ID_WEB_LOADOUT_SAVE_FAILED");
			t == "LOADOUT_SAVE_FAIL_DUPLICATES" ? r += " - " + locale.t("ID_WEB_LOADOUT_SAVE_FAILED_DUPLICATES") : t == "LOADOUT_SAVE_FAIL_INCOMPATIBLE" && (r += " - " + locale.t("ID_WEB_LOADOUT_SAVE_FAILED_INCOMPATIBLE")), receipt[i](r, "skull"), $(s).removeClass("loading"), o[e].set({
				saved: !1,
				changed: !0
			})
		}
	})
}, LoadoutViewController.prototype.navigate = function() {
	var e = "_model",
		t = "presetType",
		n = this,
		r = "ID_WEB_COMMON_LOADOUT",
		i = !0;
	n.id > -1 ? (n._overview = !1, n.loadItems ? n.renderItems() : n.renderSlots(), r = n[e].getSid(n.type, n.id, n.slot, n.accessory)) : n.managePresets ? n[t] ? n.presetKey ? (r = n[e].getLoadoutPreview().name, i = !1, n.renderPresetPreview()) : (r = n[e].getSid(n[t], n.presetId), n.renderPresetList()) : (r = "ID_WEB_COMMON_BUTTON_PRESETS", n.renderPresets()) : (n._overview = !0, n.renderOverview()), i ? n.setTitleSID(r) : n.setTitle(r)
}, LoadoutViewController.prototype.bindSave = function() {
	var e = this;
	e.$(".save-loadout:not(.loading)").addClick(function(t) {
		t.currentTarget.parentElement.className += " loading", e.saveLoadout()
	})
}, LoadoutViewController.prototype.bindButtons = function() {
	var e = "addClick",
		t = "getAttribute",
		n = !1,
		r = "LoadoutViewController",
		i = "warsaw",
		s = "className",
		o = "parentElement",
		u = "currentTarget",
		a = "expanded",
		f = this;
	f.$(".sectionbutton:not(.split):not(.presets), .sectionbutton .split, .col")[e](function() {
		var e = this[t]("data-id"),
			s = this[t]("data-type"),
			o = this[t]("data-slot"),
			u = this[t]("data-accessory"),
			a = this[t]("data-weapon-id"),
			l = this[t]("data-load-items") || n;
		app.go(r, {
			section: i,
			id: e,
			type: s,
			slot: o,
			accessory: u,
			weaponId: a,
			loadItems: l,
			managePresets: n,
			platform: f._platform,
			persona: f._persona
		})
	}), f.$(".items-category:not(.first.last)")[e](function(e) {
		e[u][o][s].indexOf(a) == -1 ? e[u][o][s] += a : e[u][o][s] = e[u][o][s].replace(a, "")
	}), f.$(".sectionbutton.presets")[e](function() {
		app.go(r, {
			section: i,
			id: -1,
			type: undefined,
			slot: undefined,
			accessory: undefined,
			loadItems: n,
			managePresets: !0,
			presetType: undefined,
			presetId: undefined,
			presetKey: undefined,
			platform: f._platform,
			persona: f._persona
		})
	}), f.$(".set-active-kit")[e](function() {
		f._model.set({
			selectedKit: f._model.get("id"),
			changed: !0
		}), f.navigate()
	}), f.bindSave()
}, LoadoutViewController.prototype.bindPresetsEvents = function() {
	var e = "getAttribute",
		t = "data-id",
		n = "data-type",
		r = "LoadoutViewController",
		i = "warsaw",
		s = this;
	s.$(".sectionbutton.preset-type").addClick(function() {
		var o = this[e](t),
			u = this[e](n);
		app.go(r, {
			section: i,
			presetType: u,
			presetId: o,
			presetKey: undefined,
			managePresets: !0,
			platform: s._platform,
			persona: s._persona
		})
	}), s.$(".sectionbutton.preset-preview").addClick(function() {
		var o = this[e](t),
			u = this[e](n),
			a = this[e]("data-key");
		app.go(r, {
			section: i,
			presetType: u,
			presetId: o,
			presetKey: a,
			managePresets: !0,
			platform: s._platform,
			persona: s._persona
		})
	}), s.bindSave()
}, LoadoutViewController.prototype.bindPresetsApply = function() {
	var e = this;
	e.$(".apply-preset").addClick(function() {
		e._model.applyPreset(!1), e.goBack()
	}), e.bindSave()
}, LoadoutViewController.prototype.bindSelect = function() {
	var e = this;
	e.$(".loadout-item:not(.locked,.duplicated,.active,.incompatible)").addClick(function() {
		var t = this.getAttribute("data-guid");
		e.$content.find(".active").removeClass("active"), e._model.selectItem(t), e.goBack()
	}), e.$(".loadout-item-expand").addClick(function() {
		var e = $(this),
			t = e.parents(".loadout-item-container");
		t.toggleClass("open")
	})
}, LoadoutViewController.prototype.renderOverview = function() {
	var e = "_model",
		t = "mySoldier",
		n = this,
		r = n[e].getCurrentOverview(!0);
	r.buttons = n[e].get("changed"), r[t] = n[e].get(t), n.$content.html(template.render("LoadoutViewOverview", r)), n.bindButtons()
}, LoadoutViewController.prototype.renderSlots = function() {
	var e = "_model",
		t = this;
	t.updateModel();
	var n = t[e].toJSON(),
		r = t[e].getSlots(!0);
	n.type == "kits" && (r[0].slots = t[e].getAccessories(r[0].guid)), t.$content.html(template.render("LoadoutViewSlots", {
		slots: r,
		id: n.id,
		activeKit: n.selectedKit,
		type: n.type,
		mySoldier: n.mySoldier,
		slot: n.slot,
		accessory: n.accessory,
		buttons: n.changed
	})), t.bindButtons()
}, LoadoutViewController.prototype.renderPresets = function() {
	var e = "_model",
		t = this;
	t.$content.html(template.render("LoadoutViewPresetCategories", {
		buttons: t[e].get("changed"),
		data: t[e].getCurrentOverview(!0),
		mySoldier: t[e].get("mySoldier")
	})), t.bindPresetsEvents()
}, LoadoutViewController.prototype.renderPresetList = function() {
	var e = "_model",
		t = this;
	t.$content.html(template.render("LoadoutViewPresetList", {
		buttons: t[e].get("changed"),
		list: t[e].getLoadoutPresetsById(),
		mySoldier: t[e].get("mySoldier")
	})), t.bindPresetsEvents()
}, LoadoutViewController.prototype.renderPresetPreview = function() {
	var e = "_model",
		t = this;
	t.$content.html(template.render("LoadoutViewPresetPreview", {
		buttons: t[e].get("changed"),
		preset: t[e].getLoadoutPreview(),
		mySoldier: t[e].get("mySoldier")
	})), t.bindPresetsApply()
}, LoadoutViewController.prototype.renderItems = function() {
	var e = "_model",
		t = this;
	t.$content.html(template.render("LoadoutViewItems", {
		type: t[e].get("type"),
		mySoldier: t[e].get("mySoldier"),
		categories: t[e].loadItems(),
		buttons: t[e].get("changed")
	})), t.bindButtons(), t.bindSelect()
};