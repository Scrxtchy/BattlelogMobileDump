function CampaignLeaderboardViewController(e) {
	this._name = "CampaignLeaderboardView", this._section = "warsaw", this.personaId = e.personaId, this.hasLoader = !0, ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_COMMON_TOP_FRIENDS"
}
var app = require("app"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	web = require("web"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = CampaignLeaderboardViewController, CampaignLeaderboardViewController.prototype = new ScrollableViewController, CampaignLeaderboardViewController.prototype.constructor = CampaignLeaderboardViewController, CampaignLeaderboardViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	t.activePersona = session.getUserActivePersonaForGame(enums.Game.WARSAW), t.personaId = t.activePersona.persona.personaId, ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, CampaignLeaderboardViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, CampaignLeaderboardViewController.prototype.refresh = function() {
	var e = this,
		t = e && e.level ? e.level.level : "";
	web.request(e.game, "campaignleaderboard", {
		personaId: e.personaId,
		platform: e.platform,
		level: t
	}, function(t, n) {
		if (t) return;
		e.entries = n.entries, e.renderView(), e.$el.find(".hidden").removeClass("hidden")
	})
}, CampaignLeaderboardViewController.prototype.renderView = function() {
	var e = "forEach",
		t = "entries",
		n = "personaId",
		r = "persona",
		i = !1,
		s = "score",
		o = "hide",
		u = "classes",
		a = "username",
		f = "#leaderboard-list",
		l = ".show-more",
		c = this,
		h;
	c[t][e](function(e, t) {
		if (e[r][n] === c[n]) return h = t, i
	});
	var p = 0,
		d = [],
		v = c[t].length;
	c[t][e](function(e, t) {
		var a = c[n] === e[r][n];
		if (!a && e[s] === 0) return;
		e[o] = i, e[u] = "", p += 1, p != h && p >= 6 && v > 7 && p != h - 1 && (e[o] = !0), e.pos = p, e.posText = e[s] === 0 ? "-" : e.pos, e.avatar = template.render("avatar", {
			user: e[r].user,
			size: "medium"
		}), e[s] = util.formatStatValue(e[s] || 0), e[u] += a ? " me" : "", e[u] += e[o] ? " hide" : "", d.push(e)
	});
	var m = function(n) {
		var i = {};
		return c[t][e](function(e, t) {
			e[r].user && e[r].user[a] === n && (i = e[r].user)
		}), i
	};
	c.$el.find(f).html(template.render("CampaignLeaderboardList", {
		entries: d
	})).find(l).addClick(function(e) {
		$(this).addClass(o).nextAll(".hide").removeClass(o)
	}), c.$el.find(f).find("tr").not(l).addClick(function(e) {
		var t = m($(this).data(a));
		t && app.go("ProfileViewController", {
			section: i,
			user: t
		})
	})
};