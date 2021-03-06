function PlatoonsViewController(e) {
	var t = "_activePersona",
		n = "persona";
	e = e || {}, this._name = "PlatoonsView", this._section = null, this.game = session.getActiveGame(), this[t] = session.getUserActivePersonaForGame(this.game), this._persona = e[n] || this[t][n], this._platform = e.platform || this[t].platform, this._mysoldier = this._persona == this[t][n], ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_COMMON_PLATOONS"
}
var app = require("app"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	web = require("web"),
	storage = require("storage"),
	dom = require("dom"),
	template = require("template"),
	expansions = require("expansions"),
	assets = require("assets"),
	util = require("util"),
	events = require("events"),
	receipt = require("receipt"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = PlatoonsViewController, PlatoonsViewController.prototype = new ScrollableViewController, PlatoonsViewController.prototype.constructor = PlatoonsViewController, PlatoonsViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, PlatoonsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, PlatoonsViewController.prototype.refresh = function() {
	var e = this;
	web.request(e.game, "platoonsindex", {
		userId: this._persona.userId
	}, function(t, n) {
		e.render(n), e.bindEvents()
	})
}, PlatoonsViewController.prototype.bindEvents = function() {
	var e = "$content",
		t = "click",
		n = ".platoon-dropdown-container",
		r = "dropdown-open",
		i = "currentTarget",
		s = "removeClass",
		o = "disabled",
		u = "showReceipt",
		a = this;
	this[e].find(".platoons-header").on(t, function(t) {
		a[e].find(n).toggleClass(r)
	}), this[e].find("[data-platoon-id]").on(t, function(t) {
		var o = $(t[i]),
			u = o.attr("data-platoon-id");
		web.request(a.game, "platoonshow", {
			clubId: u
		}, function(t, i) {
			i && i.club && (a[e].find(n)[s](r), a.render_club(i))
		})
	}), this[e].on(t, ".set-active-button", function(e) {
		e.preventDefault();
		var t = $(e[i]),
			n = t.attr("data-club-id");
		t.addClass(o), web.request(a.game, "platoonssetactive", {
			clubId: n
		}, function(e, n) {
			n && n.clubId ? (a.currentActiveClubId = n.clubId, receipt[u](locale.t("ID_WEB_CLUBS_RESP_SETACTIVE_OK"))) : (receipt[u](locale.t("ID_WEB_CLUBS_RESP_SETACTIVE_ERROR", "skull")), t[s](o))
		})
	})
}, PlatoonsViewController.prototype.render = function(e) {
	var t = "$content",
		n = "activeClub",
		r = this;
	if (e.platoons && _.keys(e.platoons).length) {
		var i = $(template.render("PlatoonsViewContent", e));
		r[t].html(i), r.$clubContainer = r[t].find(".club-container"), r.currentActiveClubId = e[n].club.id, r.render_club(e[n])
	} else r[t].html($(template.render("PlatoonsEmptyView")))
}, PlatoonsViewController.prototype.render_club = function(e) {
	var t = "currentClub",
		n = "find",
		r = "$content",
		i = "club",
		s = "active",
		o = "userId",
		u = !1,
		a = "click",
		f = "attr",
		l = "currentTarget",
		c = "data-userid",
		h = "ProfileViewController",
		p = "AppGameName",
		d = "getActiveGame",
		v = ".platoon-server",
		m = "data-guid",
		g = "playingServers",
		y = "gameServer",
		b = ".join-chat",
		w = this;
	w[t] = e, w[r][n](".platoons-header p").text(e[i].name), w[r][n](".platoon-dropdown .active").removeClass(s), w[r][n](".platoon-dropdown [data-platoon-id='" + e[i].id + "']").addClass(s);
	var E = _[n](e[i].members, function(e) {
			return e[o] == session.getUserId()
		}) ? !0 : u,
		S = $(template.render("PlatoonsViewClubContent", $.extend(e, {
			isActive: e[i].id == w.currentActiveClubId,
			isMember: E
		})));
	w.$clubContainer.html(S), this[r][n](".col-report").addClick(function(t) {
		t.stopPropagation(), app.go("ReportAbuseViewController", {
			type: i,
			clubId: e[i].id
		})
	}), this[r][n](".member").on(a, function(e) {
		var r = $(e[l])[f](c),
			s = _[n](w[t][i].members, function(e) {
				return e[o] == r
			});
		s && app.go(h, {
			section: u,
			styleSection: enums[p][session[d]()],
			user: s.user
		})
	}), this[r][n](".platoon-server-header").on(a, function(e) {
		var r = $(e[l]),
			i = r.closest(v)[f](m),
			s = _[n](w[t][g], function(e) {
				return e[y].guid = i
			});
		app.go("ServerViewController", {
			guid: i,
			game: s[y].game,
			platform: s[y].platform
		})
	}), this[r][n](".player").on(a, function(e) {
		var r = $(e[l]),
			i = r.closest(v),
			s = r[f](c),
			a = i[f](m),
			b = _[n](w[t][g], function(e) {
				return e[y].guid = a
			});
		if (b) {
			var E = _[n](b.players, function(e) {
				return e[o] = s
			});
			E && app.go(h, {
				section: u,
				styleSection: enums[p][session[d]()],
				user: E
			})
		}
	}), this[r][n](".view-all-members").on(a, function() {
		app.go("PlatoonMembersViewController", {
			clubId: w[t][i].id,
			styleSection: enums[p][session[d]()]
		})
	}), session.hasRollout("MOBILE_CHAT") || this[r][n](b).remove(), this[r][n](b).on(a, function() {
		var e = $(this)[f]("data-club-id");
		web.request(w.game, "platoonsjoinchat", {
			clubId: e
		}, function(e, t) {
			if (!e) {
				var n = t.chatId;
				require(["js/../public/jsx/stores/ChatStore.js"], function(e) {
					e.setCurrentChat(n), device.isTablet() && (events.emit("doOpenComcenter"), events.emit("doShowChat"))
				})
			}
		})
	})
};