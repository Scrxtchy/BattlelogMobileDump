function StatsViewController(e) {
	var t = "_activePersona",
		n = "_persona",
		r = "persona",
		i = "_mysoldier";
	e = e || {}, this._name = "StatsView", this._section = "warsaw", this.autoRefresh = !0, this._game = enums.Game.WARSAW, this[t] = session.getUserActivePersonaForGame(this._game), this[n] = e[r] || this[t][r], this._user = e.user || session.getUser(), this._platform = e.platform || this[t].platform, this[i] = this[n].userId == this[t][r].userId, this._myactivesoldier = this[n].personaId == this[t][r].personaId, this._model = BL.backbone.get({
		model: {
			name: this[i] ? "stats_model" : "stats_friend_model"
		}
	}), RefreshableViewController.call(this, e), this.titleSID = "ID_WEB_COMMON_SOLDIER", this.scrollViewTemplate = "StatsViewContent"
}
var _ = require("underscore"),
	BL = require("backbone-helper"),
	app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	template = require("template"),
	assets = require("assets"),
	items = require("gamedata/warsaw/items"),
	RefreshableViewController = require("controllers/RefreshableViewController"),
	modelStats = require("models/model.stats");
module.exports = StatsViewController, StatsViewController.prototype = new RefreshableViewController, StatsViewController.prototype.constructor = StatsViewController, StatsViewController.prototype.loadView = function(e) {
	e || (e = function() {}), RefreshableViewController.prototype.loadView.call(this, function() {
		return e()
	})
}, StatsViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, StatsViewController.prototype.refresh = function(e) {
	e || (e = function() {});
	var t = this;
	t.isLoading = !0, t.lastRefresh = new Date, web.request(t._game, "statsoverview", {
		personaId: t._persona.personaId,
		platform: t._platform
	}, function(n, r) {
		t.isLoading = !1;
		if (n || !r || !r.overviewStats) {
			var i = n ? "ID_MOBILE_STATS_ERROR" : "ID_MOBILE_STATS_NOSTATS";
			t.scrollView.$content.find(".error").html(dom.error_row(locale.t(i))), t.scrollView.scrollToTop()
		} else t._model.set(r), t.render();
		return e()
	})
}, StatsViewController.prototype.bindEvents = function() {
	var e = "$content",
		t = "scrollView",
		n = ".button.challenge-button",
		r = "disabled",
		i = "getUserActivePersonaForGame",
		s = "personaId",
		o = "addClick",
		u = "_section",
		a = "_persona",
		f = "find",
		l = "_platform",
		c = "ItemsViewController",
		h = "list",
		p = "general",
		d = "grid",
		v = "getAttribute",
		m = this,
		g = m[t][e],
		y = function() {
			m.$(n).unbind("click").addClass(r), web.request("warsaw", "challengesfriends", {
				platform: session[i](enums.Game.WARSAW).platform,
				personaId: session[i](enums.Game.WARSAW)[s]
			}, function(i, f) {
				m.$(n).removeClass(r)[o](y);
				if (i) {
					m[t][e].prepend(dom.error_row("Error fetching friends"));
					return
				}
				if (!f.length) {
					m[t][e].prepend(dom.error_row(locale.t("ID_MOBILE_CHALLENGES_NO_FRIENDS")));
					return
				}
				app.go("ChallengesCreateViewController", {
					section: m[u],
					challengeFriends: f,
					invitepersona: m[a][s]
				})
			})
		};
	m.$(n)[o](y), g[f](".set-as-active")[o](function() {
		session.setUserActivePersonaForGame(m._game, m[a], m[l])
	}), g[f](".sectionbutton.battlereports")[o](function() {
		app.go("BattleReportsViewController", {
			section: !1,
			personaId: m[a][s],
			platform: m[l]
		})
	}), g[f](".sectionbutton.profile")[o](function() {
		app.go("ProfileViewController", {
			section: !1,
			user: m._user
		})
	}), g[f](".sectionbutton.detailed-stats")[o](function() {
		app.go(c, {
			section: m[u],
			personaId: m[a][s],
			persona: m[a],
			platform: m[l],
			display: h,
			type: p
		})
	}), g[f](".sectionbutton.loadout")[o](function() {
		app.go("LoadoutViewController", {
			section: m[u],
			personaId: m[a][s],
			persona: m[a],
			platform: m[l],
			reset: !0
		})
	}), g[f](".sectionbutton.campaign")[o](function() {
		app.go("CampaignViewController", {
			section: m[u],
			personaId: m[a][s],
			persona: m[a],
			platform: m[l]
		})
	}), g[f](".sectionbutton.medals, .sectionbutton.ribbons")[o](function() {
		app.go("AwardsViewController", {
			section: m[u],
			personaId: m[a][s],
			persona: m[a],
			platform: m[l]
		})
	}), g[f](".sectionbutton.assignments")[o](function() {
		app.go("AssignmentsViewController", {
			section: m[u],
			personaId: m[a][s],
			persona: m[a],
			platform: m[l]
		})
	}), g[f](".sectionbutton.weapons")[o](function() {
		app.go(c, {
			section: m[u],
			personaId: m[a][s],
			persona: m[a],
			platform: m[l],
			type: "weapons",
			display: d
		})
	}), g[f](".sectionbutton.vehicles")[o](function() {
		app.go(c, {
			section: m[u],
			personaId: m[a][s],
			persona: m[a],
			platform: m[l],
			type: "vehicles",
			display: d
		})
	}), g[f](".sectionbutton.kits")[o](function() {
		app.go(c, {
			section: m[u],
			personaId: m[a][s],
			persona: m[a],
			platform: m[l],
			type: "kititems",
			display: d
		})
	}), g[f](".sectionbutton.dogtags")[o](function() {
		app.go("DogtagsViewController", {
			personaId: m[a][s],
			persona: m[a],
			platform: m[l]
		})
	}), g[f](".stats-overview-best [data-guid]")[o](function() {
		var e = this[v]("data-type"),
			t = this[v]("data-guid");
		e == p ? app.go(c, {
			section: m[u],
			personaId: m[a][s],
			persona: m[a],
			platform: m[l],
			display: h,
			type: p
		}) : app.go("ItemViewController", {
			section: m[u],
			type: e,
			guid: t,
			platform: m[l],
			personaId: m[a][s]
		})
	})
}, StatsViewController.prototype.render = function() {
	var e = ".stats-overview-persona",
		t = "userGameExpansions",
		n = "viewedPersonaInfo",
		r = this,
		i = r._model.toJSON();
	i.mysoldier = r._mysoldier, i.myactivesoldier = this._myactivesoldier;
	var s = $(template.render("StatsViewContent", i));
	if (s.find(e).length) {
		s = r.renderEmblem(s, i), s = r.renderRank(s, i), s = r.renderProgress(s, i), s = r.renderPersona(s), s = r.renderSkill(s, i), s = r.renderBest(s, i), s = r.renderServiceStars(s, i), s = r.renderCompletion(s, i);
		if (i[t] && i[t].hasOwnProperty(enums.GameExpansion.BF4PREMIUM.toString())) {
			s.find(e).addClass("premium");
			var o = '<div class="brief-premium-logo"></div>';
			s.find(".overview-head").append(o)
		}
		i[n] && s.find(".stats-overview-persona .soldier-image").css("background-image", "url(" + util.getBf4SoldierImageUrl("large", i[n].picture) + ")")
	}
	r.scrollView.$content.html(s), r.bindEvents()
}, StatsViewController.prototype.renderEmblem = function(e, t) {
	var n = "activeEmblem",
		r = e.find(".emblem-wrapper img");
	return t[n] && t[n].cdnUrl ? r.attr("src", t[n].cdnUrl.replace("[SIZE]", 256).replace("[FORMAT]", "png")) : r.remove(), e
}, StatsViewController.prototype.renderDogTags = function(e, t) {
	return e.find(".dogtag-wrapper").html(template.render("ui_dogtags", {
		left: t.dogTagBasic.image,
		right: t.dogTagAdvanced.image
	})), e
}, StatsViewController.prototype.renderRank = function(e, t) {
	var n = e.find(".rank-wrapper"),
		r = e.find(".rank-image-wrapper");
	return r.html('<div class="rank-image"><span class="item-image rank ' + (device.isTablet() ? "large" : "medium") + " r" + t.overviewStats.rank + '"></span></div>'), n.find(".rankName").text(locale.t(t.currentRankNeeded.name)), e
}, StatsViewController.prototype.renderProgress = function(e, t) {
	var n = "currentRankNeeded",
		r = "nextRankNeeded",
		i = "pointsNeeded",
		s = "formatStatValue",
		o = t[n].level == t[r].level ? !0 : !1;
	if (!o) var u = t.overviewStats.rankScore - t[n][i],
		a = t[r][i] - t[n][i];
	else var u = t[n][i],
		a = t[n][i];
	var f = e.find(".rank-wrapper");
	return f.find(".rankPoints").html(util[s](u) + " / " + util[s](a)), f.find(".rankProgress").html(template.render("ui_progressbar", {
		percent: u / a * 100,
		type: "warning",
		size: "thick"
	})), e
}, StatsViewController.prototype.renderPersona = function(e) {
	var t = this;
	return e.find(".overview-head").html(template.render("StatsViewHead", {
		name: t._persona.personaName,
		game: enums.Game.toString(t._game),
		platform: enums.Platform.toString(t._platform)
	})), e
}, StatsViewController.prototype.renderSkill = function(e, t) {
	var n = "timePlayed",
		r = "render",
		i = "StatsViewInfoListItem",
		s = "formatStatValue",
		o = t.overviewStats;
	e.find(".skill-number").html(o.skill), e.find(".skill-bar-inner").css("left", o.skill / 1e3 * 95 + "%");
	var u = o[n] > 0 ? Math.round(o.kills / (o[n] / 60) * 100) / 100 : 0;
	return e.find(".stat-row-1").html([template[r](i, {
		label: locale.t("ID_WEB_COMMON_KILLS_ABBR") + "/" + locale.t("ID_WEB_COMMON_DEATHS_ABBR"),
		value: o.kdRatio
	}), template[r](i, {
		label: locale.t("ID_WEB_COMMON_STATS_SCORE_PER_MINUTE_ABBR"),
		value: util[s](o.scorePerMinute)
	}), template[r](i, {
		label: locale.t("ID_WEB_COMMON_STATS_KILLS_PER_MINUTE_ABBR"),
		value: u
	})].join("")), e.find(".stat-row-2").html([template[r](i, {
		label: locale.t("ID_WEB_COMMON_KILLS"),
		value: util[s](o.kills)
	}), template[r](i, {
		label: locale.t("ID_WEB_COMMON_SCORE"),
		value: util[s](o.score)
	}), template[r](i, {
		label: locale.t("ID_WEB_COMMON_TIME"),
		value: util.friendlyDuration(o[n])
	})].join("")), e
}, StatsViewController.prototype.renderBest = function(e, t) {
	var n = "formatStatValue",
		r = "item-image",
		i = "unlockImageConfig",
		s = "toLowerCase",
		o = " ",
		u = "ID_WEB_COMMON_KILLS",
		a = this,
		f = t.overviewStats.kitScores,
		l = {},
		c = t.topWeapons[0],
		h = t.topVehicles[0],
		p = items.weapons[c.guid],
		d = items.vehicles[h.guid],
		v = [1, 2, 8, 32, 2048],
		m = 0,
		g = v.length;
	while (m < g) {
		var y = v[m],
			b = parseInt(f[y]);
		if (!l.score || l.score < b) l = {
			id: y,
			name: util.kitEnum_to_kitName(y, a._game),
			score: b
		};
		m++
	}
	var w = "",
		E = [{
			guid: "dummy",
			type: "general",
			imageClasses: "kit-icon medium " + l.name,
			label: util[n](l.score)
		}];
	p != undefined && E.push({
		imageClasses: [r, p[i].category, p[i].slug[s]()].join(o),
		label: util[n](c.kills) + o + locale.t(u)[s](),
		type: "weapon",
		guid: c.guid
	}), d != undefined && E.push({
		imageClasses: [r, d[i].category, d[i].slug[s]()].join(o),
		label: util[n](h.kills) + o + locale.t(u)[s](),
		type: "vehicle",
		guid: h.guid
	}), m = 0, g = E.length;
	while (m < g) w += template.render("StatsViewBestItem", E[m]), m++;
	return e.find(".stats-overview-best .row").html(w), e
}, StatsViewController.prototype.renderServiceStars = function(e, t) {
	var n = "overviewStats",
		r = this,
		i = "",
		s = [1, 2, 32, 8, 2048],
		o = 0,
		u = s.length;
	while (o < u) {
		var a = s[o];
		i += template.render("StatsViewServiceStar", {
			kit: util.kitEnum_to_kitName(a, r._game),
			progressBar: template.render("ui_progressbar", {
				percent: t[n].serviceStarsProgress[a],
				type: "warning",
				size: "thickest"
			}),
			starCount: t[n].serviceStars[a]
		}), o++
	}
	return e.find(".stats-overview-service-stars .sectioncontent").html(i), e
}, StatsViewController.prototype.renderCompletion = function(e, t) {
	var n = "gameProgress",
		r = "",
		i = 0,
		s = t[n].length;
	while (i < s) {
		var o = t[n][i];
		r += template.render("StatsViewCompletionRow", {
			title: o.name,
			slug: o.slug,
			progressBar: template.render("ui_progressbar", {
				percent: o.percent,
				type: "warning",
				size: "thickest"
			}),
			current: o.current,
			max: o.max
		}), i++
	}
	return e.find(".stats-overview-completion .sectioncontent").html(r), e
};