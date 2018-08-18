function HomeViewController(e) {
	this._name = "HomeView", this._section = null, this.game = session.getActiveGame(), this.gameName = enums.AppGameName[this.game], this.activePersona = null, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_COMMON_BATTLEFIELD_4"
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
	npx = require("npx"),
	expansions = require("expansions"),
	assets = require("assets"),
	util = require("util"),
	events = require("events"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	NewsController = require("controllers/NewsViewController"),
	InlineFeedsViewController = require("controllers/InlineFeedsViewController");
module.exports = HomeViewController, HomeViewController.prototype = new ScrollableViewController, HomeViewController.prototype.constructor = HomeViewController, HomeViewController.prototype.loadView = function(e) {
	var t = "addClick",
		n = "hideSurvey",
		r = "surveyData",
		i = "tokenInfo",
		s = "inlineFeedsView";
	e || (e = function() {});
	var o = this;
	o.activePersona = session.getUserActivePersonaForGame(o.game), ScrollableViewController.prototype.loadView.call(o, function() {
		var u = $('<div class="game-logo ' + o.gameName + '"></div>');
		u[t](function() {
			app.go("SelectGameViewController")
		}), o.navbarTitleItem = {
			$el: u
		};
		if (!device.isDesktop() && device.isTablet() && locale.currentLanguage == enums.Language.EN) {
			var a = storage.get(n);
			if (session[i][r] && session[i][r].title && !a) {
				var f = $(template.render("Survey", session[i][r]));
				f.insertBefore(o.$(".section.leaderboard")), f.find(".opensurvey")[t](function(e) {
					app.goExternal(session[i][r].url)
				}), session[i][r].threadId && f.find(".openthread")[t](function(e) {
					app.go("ForumThreadViewController", {
						section: !1,
						thread: {
							id: session[i][r].threadId,
							title: session[i][r].threadTitle
						},
						page: 1
					})
				}), f.find(".close")[t](function(e) {
					storage.set(n, !0), f.fadeOut()
				})
			}
		}
		expansions.init(), npx.init(), o.$topstoryContainer = o.$(".section.news .topstories"), o.$activesoldier = o.$(".section.stats .activesoldier"), o.$suggestions = o.$(".section.stats .suggestions"), o[s] = new InlineFeedsViewController({
			parentViewController: o
		}), o.subviews.push(o[s]), o[s].init(function() {
			return o.$content.append(o[s].$el), e()
		})
	})
}, HomeViewController.prototype.viewDidAppear = function() {
	var e = "refreshSuggestions",
		t = !1,
		n = "refreshFeed",
		r = "isXpBoostActive",
		i = ".alertbar",
		s = "hidden",
		o = "activePersona",
		u = "hasExpansion",
		a = "getUserGameExpansions",
		f = "GameExpansion",
		l = "platform",
		c = "removeClass",
		h = this;
	session[e] && (this[e](), session[e] = t), session[n] && (h.inlineFeedsView.refresh(), session[n] = t), web.request(h.game, "homexpboost", {}, function(e, n) {
		if (!e && typeof n[r] != "undefined" && n[r] != "NONE" && h.$(i).hasClass(s)) {
			var p = locale.t("ID_WEB_SERVERGUIDE_2XP_BOOST_ACTIVE");
			if (n[r] == "premium" && h[o]) {
				var d = t;
				h.game == enums.Game.BF3 ? d = util[u](session[a](), enums[f].BF3PREMIUM, h[o][l]) : h.game == enums.Game.WARSAW ? d = util[u](session[a](), enums[f].BF4PREMIUM, h[o][l]) : h.game == enums.Game.OMAHA && (d = util[u](session[a](), enums[f].BFHPREMIUM, h[o][l])), d || (p = locale.t("ID_WEB_SERVERGUIDE_2XP_BOOST_ACTIVE_PREMIUM_ONLY"))
			}
			h.$(i).text(p)[c](s).slideDown()
		}
		if (n.notices) {
			var v = "";
			_.each(n.notices, function(e) {
				if (e != null) {
					var t = e["lang_" + enums.Language.toLocale(locale.currentLanguage).substring(0, 2)];
					t && h.$(i).text(t)[c](s).slideDown()
				}
			})
		}
	}), events.bind(["didChangeSoldierPortrait", "didChangeTag"], function() {
		h.refreshSoldierBox(!0)
	}), ScrollableViewController.prototype.viewDidAppear.call(h)
}, HomeViewController.prototype.viewDidLoad = function() {
	var e = "addClass",
		t = "hidden",
		n = this;
	ScrollableViewController.prototype.viewDidLoad.call(n), n.bindEvents(), n.scrollBind = n.scrollView.bind("scrolledToBottom", function() {
		n.$(".more-button").trigger("click")
	}), n.refresh(), n.activePersona || (n.$(".section.stats")[e](t), n.$(".section.leaderboard")[e](t), n.$(".section.homemenu")[e](t)), this.game == enums.Game.OMAHA && (n.$(".sectionbutton.battlepacks")[e](t), n.$(".suggestions-container")[e](t))
}, HomeViewController.prototype.viewWillDisappear = function() {
	var e = this;
	e.scrollView.unbind("scrolledToBottom", e.scrollBind)
}, HomeViewController.prototype.refresh = function() {
	var e = this;
	e.activePersona = session.getUserActivePersonaForGame(this.game), e.refreshTopStories(), e.refreshSoldierBox(), e.refreshSuggestions(), e.refreshLeaderboardStatus()
}, HomeViewController.prototype.bindEvents = function() {
	var e = "addClick",
		t = "gameName",
		n = this;
	n.$(".sectionbutton.multiplayer")[e](function() {
		app.go("MultiplayerViewController", {
			section: n[t]
		})
	}), n.$(".sectionbutton.loadout")[e](function() {
		app.go("LoadoutViewController", {
			section: n[t]
		})
	}), n.$(".sectionbutton.battlepacks")[e](function() {
		app.go("BattlepacksViewController", {
			section: n[t]
		})
	}), !n.activePersona && this.game == enums.Game.WARSAW && n.$(".section.getbf4").removeClass("hidden")[e](function() {
		app.goExternal("http://battlelog.battlefield.com/bf4/store/")
	}), events.bind("suggestionsDidChange", _.bind(n.refreshSuggestions, n))
}, HomeViewController.prototype.refreshTopStories = function() {
	var e = "$topstoryContainer",
		t = ".items",
		n = this;
	NewsController.prototype.fetchTopStories(n.game, function(r, i) {
		try {
			!r && i.length ? NewsController.prototype.makeTopstoryCarousel(i, n[e]) : n[e].find(t).empty()
		} catch (s) {
			app.error(s), n[e].find(t).empty()
		}
	})
}, HomeViewController.prototype.refreshSoldierBox = function(e) {
	var t = "activePersona",
		n = "$activesoldier",
		r = "overviewStats",
		i = "userHasScore",
		s = "userScore",
		o = "currentRankNeeded",
		u = "nextRankNeeded",
		a = "pointsNeeded",
		f = "platform",
		l = "persona",
		c = "game",
		h = "homestats",
		p = "getObject",
		d = "personaId",
		v = "lastUpdated",
		m = this;
	if (!m[t]) {
		m[n].empty();
		return
	}
	var g = function(e) {
			e[r].timePlayed ? (session[i] = !0, session[s] = e[r].rankScore) : (session[i] = !1, session[s] = 0);
			var h = e[o].level == e[u].level ? !0 : !1;
			if (!h) var p = e[r].rankScore - e[o][a],
				d = e[u][a] - e[o][a];
			else var p = e[o][a],
				d = e[o][a];
			var v = enums.Platform.toString(m[t][f]),
				g = "",
				y = "";
			e.picture && (g = e.picture), e.clanTag && (y = e.clanTag);
			var b = $(template.render("soldier_row_large", {
				name: m[t][l].personaName,
				game: m[c],
				platform: v,
				premium: session.getUserHasPremium(m[c]),
				rank: {
					rank: e[r].rank,
					score: p,
					maxScore: d
				},
				picture: util.getSoldierImageUrl(m[c], "medium", g),
				tag: y
			}));
			b.addClick(function() {
				app.go("StatsViewController", {
					section: m.gameName,
					persona: m[t][l],
					platform: m[t][f]
				})
			}), m[n].empty().append(b), b.hide().fadeIn()
		},
		y = h,
		b = "homestats.info",
		w = 6e5,
		E = storage[p](b),
		S = null;
	E && E[d] == m[t][l][d] && E[f] == m[t][f] && E[c] == m[c] && E[v] && E[v] > (new Date).getTime() - w && (S = storage[p](y)), e || !S ? web.request(m[c], h, {
		personaId: m[t][l][d],
		platform: m[t][f]
	}, function(e, i) {
		if (e || !i || !i[r] || !i[o] || !i[u]) {
			m[n].empty();
			return
		}
		try {
			storage.setObject(b, {
				personaId: m[t][l][d],
				platform: m[t][f],
				game: m[c],
				lastUpdated: (new Date).getTime()
			}), storage.setObject(y, i)
		} catch (s) {
			app.error("Could not store soldier stats data on home...")
		}
		g(i)
	}) : g(storage[p](y))
}, HomeViewController.prototype.refreshSuggestions = function(e, t, n) {
	var r = "activePersona",
		i = "$suggestions",
		s = "mpsuggestions",
		o = "length",
		u = "error",
		a = "playerProgress",
		f = "complete",
		l = "completionPercentage",
		c = "actualValue",
		h = "valueNeeded",
		p = "getAttribute",
		d = this;
	if ((e == undefined || t == undefined) && !d[r]) {
		d[i].empty();
		return
	}
	e = e || d[r].persona.personaId, t = t || d[r].platform;
	if (d.game == enums.Game.OMAHA) {
		app.log("No suggestions for BFH..");
		return
	}
	web.request(d.game, s, {
		personaId: e,
		platform: t
	}, function(e, t) {
		if (e) {
			d[i].empty();
			return
		}
		if (!d[i] || !$.contains(document, d[i])) d[i] = $(".HomeView .suggestions");
		d[i].empty(), t[s][o] ? (events.emit("suggestionsDidRefresh", t[s]), d[i].removeClass(u), t[s].forEach(function(e, t) {
			if (t > 2) return;
			n == t && (e.isTrackedManually = !0);
			if (e[a]) {
				e[f] = 0, e[l] = 0;
				if (e[a][o] > 1) {
					for (var r = 0; e[a][o] > r; r++) e[f] += e[a][r][f], e[l] += e[a][r][c] / e[a][r][h];
					e[f] = e[f] / e[a][o] < 1 ? 0 : 1, e[l] = e[l] / e[a][o] * 100
				} else e[a][o] ? (e[f] = e[a][0][c] >= e[a][0][h] ? 1 : 0, e[l] = e[a][0][c] / e[a][0][h] * 100) : (e[f] = 0, e[l] = 0)
			}
			app.log(e);
			var s = $(template.render("suggestion", {
				suggestion: e,
				atIndex: t
			}));
			d[i].append(s)
		}), d[i].find(".suggestion").addClick(function() {
			var e = this[p]("data-type"),
				n = this[p]("data-guid"),
				r = this[p]("data-atindex"),
				i = {
					section: d.gameName,
					type: e,
					slug: this[p]("data-slug"),
					atIndex: r,
					isTrackedManually: $(this).find(".item-tracked")[o] > 0,
					thisitem: t[s][r],
					guid: n
				},
				u = this[p]("data-category");
			u && (i.category = u);
			if (e == "assignment" || e == "award") i.code = n;
			if (e == "battlepack") return app.go("BattlepacksViewController", {
				section: d.gameName
			});
			if (i.slug == "") return !1;
			app.go("ItemViewController", i)
		})) : d[i].addClass(u).html(locale.t("ID_MOBILE_HOME_SUGGESTIONS_ERROR"), "skull")
	})
}, HomeViewController.prototype.refreshLeaderboardStatus = function() {
	var e = this;
	if (!e.activePersona) {
		e.$suggestions.empty();
		return
	}
};