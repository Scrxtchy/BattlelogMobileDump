function MultiplayerViewController(e) {
	var t = "_activePersona",
		n = "_platform",
		r = "platform",
		i = "_collection";
	e = e || {}, this._name = "MultiplayerView", this.scrollViewTemplate = "MultiplayerViewContent", this._type = e.type || "allservers", this._section = "omaha", this._game = enums.Game.OMAHA, this._hasRecommended = !0, this[t] = session.getUserActivePersonaForGame(this._game), this._persona = e.persona || this[t].persona, this[n] = e[r] || this[t][r], this._pc = this[n] == enums.Platform.PC, this._model = BL.backbone.get({
		model: "omaha_multiplayer_model"
	}), this._templateParams = {
		type: this._type,
		pc: this._pc,
		filterCount: this._model.get("filterCount")
	}, this[i] = BL.backbone.get({
		collection: "omaha_server_list_collection"
	});
	if (this[i].length) {
		var s = this[i].first();
		s.get(r) != this[n] && this[i].reset()
	}
	RefreshableViewController.call(this, e), this._pc && (this.cssClass = "pc"), this.titleSID = "ID_MOBILE_VIEW_TITLE_MULTIPLAYER"
}
var app = require("app"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	assets = require("assets"),
	dom = require("dom"),
	Push = require("push"),
	template = require("template"),
	util = require("util"),
	web = require("web"),
	receipt = require("receipt"),
	model = require("models/omaha/model.multiplayer"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = MultiplayerViewController, MultiplayerViewController.prototype = new RefreshableViewController, MultiplayerViewController.prototype.constructor = MultiplayerViewController, MultiplayerViewController.prototype.loadView = function(e) {
	var t = "userId",
		n = "_collection",
		r = "refresh";
	e || (e = function() {});
	var i = this;
	Push.bind("UserPresenceChanged", function(e) {
		e[t] = e[t] || 0;
		if (e[t] == session.getUserActivePersonaForGame(i._game)[t]) {
			var n = e.playingMp || e.onlineGame || !1;
			n && (i._platform = n.platform)
		}
	}), i[n].off().on("sync", i.renderServers, i), i[n].on("more", i.fetchMore, i), i[n].on("favorites", i.renderFavorites, i), i[n].on("history", i.renderHistory, i), i._model.off().on(r, i[r], i), i[n].on("recommended", i.renderRecommended, i), RefreshableViewController.prototype.loadView.call(i, function() {
		return e()
	})
}, MultiplayerViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.refresh(), e.scrollBind = e.scrollView.bind("scrolledToBottom", function() {
		e._collection.trigger("more")
	})
}, MultiplayerViewController.prototype.viewWillDisappear = function() {
	var e = this;
	RefreshableViewController.prototype.viewWillDisappear.call(e), e.scrollView.unbind("scrolledToBottom", e.scrollBind)
}, MultiplayerViewController.prototype.bindEvents = function() {
	function f(e) {
		var t = a[i].get(s);
		t.name = e, a[i].set(s, t), a[i].updateStorage(), a.refreshServerList()
	}
	var e = "find",
		t = "$content",
		n = "scrollView",
		r = "click",
		i = "_model",
		s = "filters",
		o = "removeClass",
		u = "active",
		a = this;
	a[n][t][e](".sectionbutton.filter").off().on(r, function() {
		app.go("ServerFiltersViewController", {
			game: a._game,
			platform: a._platform
		})
	}), a[n][t][e](".segmentedcontrol a").off().on(r, function() {
		var e = this.getAttribute("data-type");
		a.switchTabs(e)
	});
	var l = a[n][t][e](".serverfilter-search-container"),
		c = l[e]("#serverfilters-name"),
		h = l[e](".clear-button");
	c.off().on("change", function() {
		f(c.val()), l[o](u), c.val() ? h.show() : h.hide()
	}).on("focus", function() {
		l.addClass(u)
	}), h.addClick(function(e) {
		l[o](u), c.val("").blur(), h.hide(), f("")
	})
}, MultiplayerViewController.prototype.switchTabs = function(e) {
	var t = this;
	t._type = e, t.render()
}, MultiplayerViewController.prototype.fetchRecommended = function() {
	var e = "isLoadingRecommended",
		t = !0,
		n = !1,
		r = "_collection",
		i = "recommended",
		s = "_hasRecommended",
		o = this;
	o[e] = t, web.request(o._game, "recommendedservers", {
		platform: o._platform
	}, function(u, a) {
		o[e] = n, o[r].forEach(function(e) {
			e.set({
				recommended: n
			}, {
				silent: t
			})
		});
		if (a && a[i] && a[i].length) {
			o[s] = t;
			var f = a[i][0].server;
			f[i] = t, f.manual = t;
			var l = o[r].get(f.guid);
			l ? l.set({
				recommended: t
			}) : (f.inMain = n, o[r].add(new BL.backbone.model_definitions.omaha_server_model(f), {
				merge: t
			}))
		} else o[s] = n;
		o.renderRecommended()
	})
}, MultiplayerViewController.prototype.fetchFavorites = function() {
	var e = "isLoadingFavorites",
		t = !0,
		n = !1,
		r = "_collection",
		i = "servers",
		s = "_hasFavorites",
		o = this;
	o[e] = t, web.request(o._game, "favoriteservers", {
		platform: o._platform
	}, function(u, a) {
		o[e] = n, o[r].forEach(function(e) {
			e.set({
				inFavorites: n
			}, {
				silent: t
			})
		});
		if (a[i].length) {
			o[s] = t;
			var f = 0,
				l = a[i].length,
				c = [];
			while (f < l) {
				a[i][f].inFavorites = t, a[i][f].manual = t;
				var h = o[r].get(a[i][f].guid);
				h ? h.set({
					inFavorites: t
				}) : (a[i][f].inMain = n, c.push(new BL.backbone.model_definitions.omaha_server_model(a[i][f]))), f++
			}
			o[r].add(c, {
				merge: t
			})
		} else o[s] = n;
		o.renderFavorites()
	})
}, MultiplayerViewController.prototype.fetchHistory = function() {
	var e = "isLoadingHistory",
		t = !0,
		n = !1,
		r = "_collection",
		i = "servers",
		s = "_hasHistory",
		o = this;
	o[e] = t, web.request(o._game, "serverhistory", {
		platform: o._platform
	}, function(u, a) {
		o[e] = n, o[r].forEach(function(e) {
			e.set({
				inHistory: n
			}, {
				silent: t
			})
		});
		if (a[i].length) {
			o[s] = t;
			var f = 0,
				l = a[i].length,
				c = [];
			while (f < l) {
				a[i][f].inHistory = t, a[i][f].manual = t;
				var h = o[r].get(a[i][f].guid);
				h ? h.set({
					inHistory: t
				}) : (a[i][f].inMain = n, c.push(new BL.backbone.model_definitions.omaha_server_model(a[i][f]))), f++
			}
			o[r].add(c, {
				merge: t
			})
		} else o[s] = n;
		o.renderHistory()
	})
}, MultiplayerViewController.prototype.fetchMore = function(e) {
	var t = "isLoading",
		n = !0,
		r = "servers",
		i = "_collection";
	e = typeof e != "undefined" ? e : !1;
	var s = this;
	s[t] || (s[t] = n, s.lastRefresh = new Date, s.getUrl(n, function(e, o) {
		s[t] = !1;
		if (o && o[r]) {
			var u = 0,
				a = o[r].length,
				f = [];
			while (u < a) {
				var l = o[r][u];
				l.manual = n;
				var c = s[i].get(l.guid);
				c ? c.set({
					inMain: n
				}) : f.push(new BL.backbone.model_definitions.omaha_server_model(l)), u++
			}
			s[i].add(f).trigger("sync")
		} else receipt.showReceipt(locale.t("ID_MOBILE_SERVERS_FETCH_FAIL"), "skull")
	}, e))
}, MultiplayerViewController.prototype.getUrl = function(e, t, n) {
	var r = this,
		i = [r._game, "serverlist", {
			game: r._game,
			platform: r._platform,
			filters: JSON.stringify(r._model.get("filters"))
		}];
	return n && (i[2].start = r._collection.filter(function(e) {
		return e.get("inMain")
	}).length), typeof t == "function" && i.push(t), e ? web.request.apply(web, i) : web.url.apply(web, i)
}, MultiplayerViewController.prototype.refresh = function() {
	var e = this;
	e.isLoading || (e._collection.reset(), e.render(), e.fetchMore(!0), e.fetchRecommended(), e.hideLoadingIndicator())
}, MultiplayerViewController.prototype.refreshServerList = function() {
	var e = this;
	e.isLoading || (e._collection.reset(), e.fetchMore(!0))
}, MultiplayerViewController.prototype.render = function() {
	var e = "scrollView",
		t = "_type",
		n = "trigger",
		r = "_collection",
		i = "favorites",
		s = "history",
		o = this;
	o[e].scrollToTop();
	var u = function() {},
		a = "";
	o[t] == "allservers" ? (a = "MultiplayerContentView", u = function() {
		o[r][n]("recommended sync")
	}) : o[t] == i ? (a = "FavoriteServersView", o[r].filter(function(e) {
		return e.get("inFavorites")
	}).length ? u = function() {
		o[r][n](i)
	} : o.fetchFavorites()) : o[t] == s && (a = "ServerHistoryView", o[r].filter(function(e) {
		return e.get("inHistory")
	}).length ? u = function() {
		o[r][n](s)
	} : o.fetchHistory()), template.render(a, {
		loading: !0,
		pc: o._pc,
		type: o[t],
		filterCount: o._model.get("filterCount"),
		search: o._model.get("filters").name
	}, function(t, n) {
		o[e].$content.html(n), u(), o.bindEvents()
	})
}, MultiplayerViewController.prototype.renderRecommended = function() {
	var e = this,
		t = e._collection.find(function(e) {
			return e.get("recommended") == 1
		}),
		n = e.scrollView.$content.find(".recommended-container");
	if (t) {
		var r = t.toJSON();
		n.html(template.render("server_tile", {
			name: r.name,
			guid: r.guid,
			status: "",
			players: r.slots[2].current,
			maxplayers: r.slots[2].max,
			info: r.status,
			friends: null,
			map: r.map
		})), n.find(".server-tile").addClick(function() {
			app.go("ServerViewController", {
				guid: this.getAttribute("data-server-guid")
			})
		})
	} else e._hasRecommended || n.html(dom.empty_row_large(locale.t("ID_MOBILE_SERVERS_NO_RECOMMENDED")))
}, MultiplayerViewController.prototype.renderServers = function(e) {
	var t = "renderRecommended",
		n = this;
	typeof e == "object" && (n.isLoading = !1);
	var r = n._collection.chain().filter(function(e) {
			return e.get("inMain")
		}).invoke("toJSON").value(),
		i = n.scrollView.$content.find(".general.servers-list");
	r.length ? template.render("ServerRows", r, function(e, r) {
		i.html(r), i.find(".server-row").addClick(function() {
			app.go("ServerViewController", {
				guid: this.getAttribute("data-server-guid")
			})
		}), n[t](), n.bindEvents()
	}) : n.isLoading || (i.html(dom.empty_row_large(locale.t("ID_MOBILE_SERVERS_NO_SERVERS"))), n[t]())
}, MultiplayerViewController.prototype.renderFavorites = function() {
	var e = this,
		t = e._collection.chain().filter(function(e) {
			return e.get("inFavorites")
		}).invoke("toJSON").value(),
		n = e.scrollView.$content.find(".favorites.servers-list");
	t.length ? template.render("ServerRows", t, function(e, t) {
		n.html(t), n.find(".server-row").addClick(function() {
			app.go("ServerViewController", {
				guid: this.getAttribute("data-server-guid")
			})
		})
	}) : e.isLoadingFavorites || n.html(dom.empty_row_large(locale.t("ID_MOBILE_SERVERS_NO_FAVORITES")))
}, MultiplayerViewController.prototype.renderHistory = function() {
	var e = this,
		t = e._collection.chain().filter(function(e) {
			return e.get("inHistory")
		}).invoke("toJSON").value(),
		n = e.scrollView.$content.find(".history.servers-list");
	t.length ? template.render("ServerRows", t, function(e, t) {
		n.html(t), n.find(".server-row").addClick(function() {
			app.go("ServerViewController", {
				guid: this.getAttribute("data-server-guid")
			})
		})
	}) : e.isLoadingHistory || n.html(dom.empty_row_large(locale.t("ID_MOBILE_SERVERS_NO_HISTORY")))
};