function StatsViewController(e) {
	var t = "_activePersona",
		n = "_persona",
		r = "persona",
		i = "_mysoldier";
	e = e || {}, this._name = "StatsView", this._section = "omaha", this.autoRefresh = !0, this._game = enums.Game.OMAHA, this[t] = session.getUserActivePersonaForGame(this._game), this[n] = e[r] || this[t][r], this._user = e.user || session.getUser(), this._platform = e.platform || this[t].platform, this[i] = this[n].userId == this[t][r].userId, this._myactivesoldier = this[n].personaId == this[t][r].personaId, this._model = BL.backbone.get({
		model: {
			name: this[i] ? "stats_model" : "stats_friend_model"
		}
	}), RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_NAV_AGENT", this.scrollViewTemplate = "StatsViewContent"
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
	items = require("gamedata/omaha/items"),
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
	var e = "addClick",
		t = "find",
		n = "_persona",
		r = "_platform",
		i = "personaId",
		s = "ItemsViewController",
		o = "_section",
		u = "list",
		a = "weapons",
		f = "grid",
		l = "getAttribute",
		c = "general",
		h = this,
		p = h.scrollView.$content;
	p[t](".set-as-active")[e](function() {
		session.setUserActivePersonaForGame(h._game, h[n], h[r])
	}), p[t](".sectionbutton.battlereports")[e](function() {
		app.go("BattleReportsViewController", {
			platform: h[r],
			persona: h[n],
			personaId: h[n][i]
		})
	}), p[t](".sectionbutton.profile")[e](function() {
		app.go("ProfileViewController", {
			section: !1,
			user: h._user
		})
	}), p[t](".sectionbutton.detailed-stats")[e](function() {
		app.go(s, {
			section: h[o],
			personaId: h[n][i],
			persona: h[n],
			platform: h[r],
			display: u,
			type: a
		})
	}), p[t](".sectionbutton.loadout")[e](function() {
		app.go("LoadoutViewController", {
			section: h[o],
			personaId: h[n][i],
			platform: h[r],
			persona: h[n]
		})
	}), p[t](".sectionbutton.campaign")[e](function() {
		app.go("CampaignViewController", {
			section: h[o],
			personaId: h[n][i],
			platform: h[r],
			persona: h[n]
		})
	}), p[t](".sectionbutton.medals, .sectionbutton.ribbons, .sectionbutton.awards")[e](function() {
		app.go("AwardsViewController", {
			section: h[o],
			persona: h[n],
			personaId: h[n][i],
			platform: h[r]
		})
	}), p[t](".sectionbutton.assignments")[e](function() {
		app.go("AssignmentsViewController", {
			section: h[o],
			personaId: h[n][i],
			persona: h[n],
			platform: h[r]
		})
	}), p[t](".sectionbutton.weapons")[e](function() {
		app.go(s, {
			section: h[o],
			personaId: h[n][i],
			platform: h[r],
			persona: h[n],
			type: a,
			display: f
		})
	}), p[t](".sectionbutton.vehicles")[e](function() {
		app.go(s, {
			section: h[o],
			personaId: h[n][i],
			platform: h[r],
			persona: h[n],
			type: "vehicles",
			display: f
		})
	}), p[t](".sectionbutton.kits")[e](function() {
		app.go(s, {
			section: h[o],
			personaId: h[n][i],
			persona: h[n],
			platform: h[r],
			type: "kititems",
			display: f
		})
	}), p[t](".sectionbutton.dogtags")[e](function() {
		app.go("DogtagsViewController", {
			personaId: h[n][i],
			persona: h[n],
			platform: h[r]
		})
	}), p[t](".stats-overview-best [data-guid]")[e](function() {
		var e = this[l]("data-type"),
			t = this[l]("data-guid");
		e == c ? app.go(s, {
			section: h[o],
			personaId: h[n][i],
			persona: h[n],
			platform: h[r],
			display: u,
			type: c
		}) : app.go("ItemViewController", {
			section: h[o],
			type: e,
			guid: t,
			platform: h[r],
			personaId: h[n][i]
		})
	}), p[t](".sectionbutton.progression")[e](function() {
		app.go("ProgressionsViewController", {
			section: h[o],
			personaId: h[n][i],
			persona: h[n],
			platform: h[r]
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
		s = r.renderEmblem(s, i), s = r.renderRank(s, i), s = r.renderProgress(s, i), s = r.renderPersona(s), s = r.renderSkill(s, i), s = r.renderBest(s, i);
		if (i[t] && i[t].hasOwnProperty(enums.GameExpansion.BFHPREMIUM.toString())) {
			s.find(e).addClass("premium");
			var o = '<div class="brief-premium-logo"></div>';
			s.find(".overview-head").append(o)
		}
		i[n] && s.find(".stats-overview-persona .soldier-image").css("background-image", "url(" + util.getOmahaSoldierImageUrl("large", i[n].picture) + ")")
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
	var n = e.find(".rank-wrapper");
	return n.find(".image").html('<div class="rank-image"><span class="item-image rank medium r' + t.overviewStats.rank + '"></span></div>'), e
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
		clanTag: t._persona.clanTag,
		game: enums.Game.toString(t._game),
		platform: enums.Platform.toString(t._platform)
	})), e
}, StatsViewController.prototype.renderSkill = function(e, t) {
	var n = "formatStatValue",
		r = "timePlayed",
		i = "render",
		s = "StatsViewInfoListItem",
		o = t.overviewStats;
	e.find(".skill-number").html(util[n](o.cashPerMinute, "cash"));
	var u = o[r] > 0 ? Math.round(o.kills / (o[r] / 60) * 100) / 100 : 0;
	return e.find(".stat-row-1").html([template[i](s, {
		label: locale.t("ID_WEB_BATTLEREPORT_TEAM_SCORE_CASH"),
		value: "$" + util[n](o.cashEarned)
	}), template[i](s, {
		label: locale.t("ID_WEB_COMMON_TIME"),
		value: util.friendlyDuration(o[r])
	})].join("")), e.find(".stat-row-2").html([template[i](s, {
		label: locale.t("ID_WEB_COMMON_KILLS"),
		value: util[n](o.kills)
	}), template[i](s, {
		label: locale.t("ID_WEB_COMMON_KILLS_ABBR") + "/" + locale.t("ID_WEB_COMMON_DEATHS_ABBR"),
		value: o.kdRatio
	}), template[i](s, {
		label: locale.t("ID_WEB_COMMON_STATS_KILLS_PER_MINUTE_ABBR"),
		value: u
	})].join("")), e
}, StatsViewController.prototype.renderBest = function(e, t) {
	var n = "formatStatValue",
		r = "item-image inverted",
		i = "imageConfig",
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
		v = [2048, 4096, 8192, 16384, 32768],
		m = 0,
		g = v.length;
	while (m < g) {
		var y = v[m],
			b = parseInt(f[y]);
		if (!l.score || l.score < b) {
			var w = util.kitEnum_to_kit(y, a.game);
			l = {
				id: y,
				name: w.name,
				nameSID: w.nameSID,
				score: b
			}
		}
		m++
	}
	var E = "",
		S = [{
			type: "general",
			guid: "dummy",
			imageClasses: "kit-icon medium " + l.name,
			nameSID: l.nameSID,
			label: util[n](l.score)
		}];
	p != undefined && S.push({
		imageClasses: [r, p[i].category, p[i].slug[s]()].join(o),
		label: util[n](c.kills) + o + locale.t(u)[s](),
		type: "weapon",
		guid: c.guid
	}), d != undefined && S.push({
		imageClasses: d[i] ? [r, d[i].category, d[i].slug[s]()].join(o) : [],
		label: util[n](h.kills) + o + locale.t(u)[s](),
		type: "vehicle",
		guid: h.guid
	}), m = 0, g = S.length;
	while (m < g) E += template.render("StatsViewBestItem", S[m]), m++;
	return e.find(".stats-overview-best .row").html(E), e
}, StatsViewController.prototype.renderServiceStars = function(e, t) {
	var n = "overviewStats",
		r = this,
		i = "",
		s = [1, 2, 8, 32, 2048],
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