function DrawerNavViewController() {
	var e = "DrawerNavView",
		t = null,
		n = this;
	this._name = e, this.drawerController = t, ViewController.call(this), this.title = "Navigation", this.templateBundle = e, this.template = e, this.scrollViewTemplate = "DrawerNavView-ScrollView", this.gotoAction = t, this.activeGame = t, this.navItems = [], this.activeNavItem = t, push.bind("CashBalanceUpdated", function(e) {
		session.setCashBalance(e.balance)
	})
}
var async = require("lib/async"), app = require("app"), config = require("config"), events = require("events"), enums = require("enums"), push = require("push"), util = require("util"), session = require("session"), storage = require("storage"), template = require("template"), device = require("device"), util = require("util"), push = require("push"), web = require("web"), locale = require("locale"), ViewController = require("controllers/ViewController"), ScrollViewController = require("controllers/ScrollViewController");
module.exports = DrawerNavViewController, DrawerNavViewController.prototype = new ViewController, DrawerNavViewController.constructor = DrawerNavViewController, DrawerNavViewController.prototype.loadView = function(e) {
	var t = "notificationBar",
		n = "rootViewController";
	e || (e = function() {});
	var r = this;
	ViewController.prototype.loadView.call(r, function() {
		r.initScrollView(function() {
			return r.$navbar = r.$c(".navbar"), r.$iconbuttons = r.$(".iconbuttons"), r.$tabs = r.scrollView.$content, device.isTablet() || (r.$navbar.find(".title").append(app[n][t].$el), r.$(".middle").append(app[n][t].$notifierContainer)), e()
		})
	})
}, DrawerNavViewController.prototype.initScrollView = function(e) {
	var t = "scrollView",
		n = this;
	n[t] = new ScrollViewController({
		parentViewController: n
	}), n.subviews.push(n[t]), n[t].init(function() {
		return n[t].$content.append(template.render(n.scrollViewTemplate)), n.$c(".middle").append(n[t].$el), n.addGameSpecificClass(), e()
	})
}, DrawerNavViewController.prototype.viewDidLoad = function() {
	var e = "bind",
		t = "refresh",
		n = this;
	ViewController.prototype.viewDidLoad.call(n), events[e](["didLogIn"], function() {
		n[t]()
	}), events[e](["didChangeActivePersona", "didChangeSoldierPortrait"], function() {
		n[t](!1, !0)
	}), events[e](["didLogOut"], function() {
		n.activeGame = null, n[t]()
	}), events[e](["cashBalanceUpdated"], function() {
		var e = n.$tabs.find(".cash");
		e.html(util.formatStatValue(session.getCashBalance(), "cash"))
	}), events[e](["rankUpdated"], function(e) {
		n.setRankInMenu(e)
	}), n.bindEvents(), n[t]()
}, DrawerNavViewController.prototype.addGameSpecificClass = function() {
	var e = ".middle",
		t = "addClass",
		n = this;
	n.$c(e).removeClass("warsaw omaha venice");
	switch (session.getActiveGame()) {
		case enums.Game.WARSAW:
			n.$c(e)[t]("warsaw");
			break;
		case enums.Game.OMAHA:
			n.$c(e)[t]("omaha");
			break;
		case enums.Game.VENICE:
			n.$c(e)[t]("venice")
	}
}, DrawerNavViewController.prototype.bindEvents = function() {
	var e = "gotoAction",
		t = "drawerController",
		n = "activeNavItem",
		r = this;
	events.bind("activeGameDidChange", function(t) {
		t[e] && (r[e] = t[e]), r.refresh(), r.addGameSpecificClass()
	}), r[t].bind("centerViewDidChange", function(e) {
		if (r[n] && r[n].view) {
			if (r[n].view == e.view) return;
			r[n].tabItem && r[n].tabItem.$el.removeClass("selected"), r[n] = null
		}
	}), r[t].bind("drawerDidClose", function() {
		device.isTablet() || app.rootViewController.notificationBar.closeIfOpen()
	})
}, DrawerNavViewController.prototype.isSoldierMenuCollapsed = function() {
	return !0
}, DrawerNavViewController.prototype.refresh = function(e, t) {
	var n = "NavigationController",
		r = "navItems",
		i = "isSoldierMenuCollapsed",
		s = "warsaw",
		o = "platform",
		u = !0,
		a = "push",
		f = "persona",
		l = "HelpAboutViewController",
		c = "activeGame",
		h = "omaha",
		p = "ID_MOBILE_NAV_HELP_ABOUT",
		d = "AssignmentsViewController",
		v = "DogtagsViewController",
		m = "SettingsViewController",
		g = "ID_MOBILE_NAV_SETTINGS",
		y = "ItemsViewController",
		b = "StatsViewController",
		w = "NewsViewController",
		E = "LeaderboardsOverviewViewController",
		S = !1,
		x = "getUser",
		T = "bf3",
		N = "BattleReportsViewController",
		C = "ID_MOBILE_NAV_LEADERBOARDS",
		k = "MultiplayerViewController",
		L = "ID_MOBILE_NAV_ASSIGNMENTS",
		A = "personaId",
		O = "ForumIndexViewController",
		M = "DevGuideHomeViewController",
		_ = "ID_WEB_COMMON_PLATOONS",
		D = "PlatoonsViewController",
		P = "LoadoutViewController",
		H = "ID_MOBILE_NAV_LOADOUT",
		B = "ID_MOBILE_NAV_REPORTS",
		j = "ID_MOBILE_NAV_PROFILE",
		F = "PremiumViewController",
		I = "isLoggedIn",
		q = "AwardsViewController",
		R = "ID_MOBILE_NAV_FORUMS",
		U = "setActiveNavItem",
		z = "ID_MOBILE_NAV_STATS",
		W = "ID_MOBILE_NAV_NEWS",
		X = "ProfileViewController",
		V = "HomeViewController",
		J = "ID_MOBILE_NAV_HOME",
		K = "weapons",
		Q = "startupViewOverride",
		G = "battlelogURL",
		Y = "tabItem",
		Z = "checkbox",
		et = "startupViewParams",
		tt = "gotoAction",
		nt = "activeNavItem",
		rt = "getActiveGame",
		it = "startupViewName",
		st = "enableDevGuide",
		ot = "Devguide",
		ut = "rootViewParams",
		at = "overviewStats";
	e || (e = function() {});
	var ft = this;
	if (!t && session[I]() && ft[c] && ft[c] == session[rt]()) return e;
	ft[r].forEach(function(e) {
		if (!e.view) return;
		if (ft[nt] == e) {
			e.view.persist = S;
			return
		}
		e.view.unloadView()
	}), ft[r] = [], ft[nt] = null, ft.$tabs.empty();
	if (!session[I]()) ft[r][a]({
		tabItem: {
			titleSID: "ID_MOBILE_NAV_SIGN_IN"
		},
		viewName: n,
		viewParams: {
			transparentNavbar: S,
			hideTitle: u,
			rootViewName: "LoginViewController"
		}
	}), ft[r][a]({
		tabItem: {
			titleSID: p
		},
		viewName: n,
		viewParams: {
			styleSection: s,
			rootViewName: l
		}
	});
	else {
		ft[c] = session[rt]();
		var lt = ft[c] ? session.getUserActivePersonaForGame(ft[c]) : null;
		ft[c] ? ft[c] == enums.Game.WARSAW ? (lt && (ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_SOLDIER",
				collapseHead: u,
				collapsed: u,
				showRank: u,
				platformName: enums.Platform.toString(lt[o])
			},
			viewName: n,
			viewParams: {
				section: s,
				rootViewName: b,
				rootViewParams: {
					user: session[x](),
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: z,
				collapsible: u,
				collapsed: ft[i](),
				icon: "pulse"
			},
			viewName: n,
			viewParams: {
				section: s,
				rootViewName: y,
				rootViewParams: {
					persona: lt[f],
					platform: lt[o],
					type: K,
					display: "list"
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: B,
				collapsible: u,
				collapsed: ft[i](),
				icon: Z
			},
			viewName: n,
			viewParams: {
				styleSection: s,
				rootViewName: N,
				rootViewParams: {
					personaId: lt[A],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_UNLOCKS",
				collapsible: u,
				collapsed: ft[i](),
				icon: "lock"
			},
			viewName: n,
			viewParams: {
				section: s,
				rootViewName: y,
				rootViewParams: {
					persona: lt[f],
					platform: lt[o],
					type: K,
					display: "grid"
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_DOG_TAGS",
				collapsible: u,
				collapsed: ft[i](),
				icon: "dogtags"
			},
			viewName: n,
			viewParams: {
				styleSection: s,
				rootViewName: v,
				rootViewParams: {
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: H,
				collapsible: u,
				collapsed: ft[i](),
				icon: "weapon"
			},
			viewName: n,
			viewParams: {
				section: s,
				rootViewName: P,
				rootViewParams: {
					reset: u,
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: L,
				collapsible: u,
				collapsed: ft[i](),
				icon: "check"
			},
			viewName: n,
			viewParams: {
				section: s,
				rootViewName: d,
				rootViewParams: {
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_AWARDS",
				collapsible: u,
				collapsed: ft[i](),
				icon: "medal"
			},
			viewName: n,
			viewParams: {
				section: s,
				rootViewName: q,
				rootViewParams: {
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_WEB_BATTLEPACKS_BATTLEPACKS",
				collapsible: u,
				collapsed: ft[i](),
				collapseBreak: u,
				sep: u,
				icon: "briefcase"
			},
			viewName: n,
			viewParams: {
				section: s,
				rootViewName: "BattlepacksViewController",
				rootViewParams: {
					persona: lt[f],
					platform: lt[o]
				}
			}
		})), ft[r][a]({
			isDefault: u,
			tabItem: {
				titleSID: J
			},
			viewName: n,
			viewParams: {
				persist: S,
				styleSection: s,
				rootViewName: V
			}
		}), lt && (ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_MULTIPLAYER"
			},
			viewName: n,
			viewParams: {
				section: s,
				rootViewName: k
			}
		}), ft[r][a]({
			isDefault: u,
			tabItem: {
				titleSID: _
			},
			viewName: n,
			viewParams: {
				persist: S,
				styleSection: s,
				rootViewName: D
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_CAMPAIGN"
			},
			viewName: n,
			viewParams: {
				section: s,
				rootViewName: "CampaignViewController",
				rootViewParams: {
					personaId: lt[f][A],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_MISSIONS",
				"class": "missions"
			},
			viewName: n,
			viewParams: {
				section: s,
				rootViewName: "ChallengesViewController"
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: C
			},
			viewName: n,
			viewParams: {
				styleSection: s,
				rootViewName: E
			}
		})), ft[r][a]({
			tabItem: {
				titleSID: R
			},
			viewName: n,
			viewParams: {
				usingCombinedController: u,
				styleSection: s,
				rootViewName: O
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: W
			},
			viewName: n,
			viewParams: {
				styleSection: s,
				rootViewName: w
			}
		}), device.isTablet() && ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_COMMANDER",
				action: device.launchTabCom,
				sep: u
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_PREMIUM",
				minor: u
			},
			viewName: n,
			viewParams: {
				styleSection: s,
				rootViewName: F
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: j,
				minor: u
			},
			viewName: n,
			viewParams: {
				styleSection: s,
				rootViewName: X,
				rootViewParams: {
					user: session[x]()
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: g,
				minor: u
			},
			viewName: n,
			viewParams: {
				persist: S,
				styleSection: s,
				rootViewName: m
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: p,
				minor: u
			},
			viewName: n,
			viewParams: {
				styleSection: s,
				rootViewName: l
			}
		}), config[st] && ft[r][a]({
			tabItem: {
				title: ot,
				minor: u
			},
			viewName: n,
			viewParams: {
				styleSection: s,
				rootViewName: M
			}
		})) : ft[c] == enums.Game.BF3 ? (ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_VIEW_TITLE_BATTLEFEED"
			},
			viewName: n,
			viewParams: {
				section: T,
				rootViewName: "BattleFeedViewController"
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_VIEW_TITLE_NEWS"
			},
			viewName: n,
			viewParams: {
				section: T,
				rootViewName: w,
				rootViewParams: {
					game: enums.Game.BF3
				}
			}
		}), lt && (ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_VIEW_TITLE_STATS"
			},
			viewName: n,
			viewParams: {
				section: T,
				rootViewName: b,
				rootViewParams: {
					user: session[x](),
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_VIEW_TITLE_ASSIGNMENTS"
			},
			viewName: n,
			viewParams: {
				section: T,
				rootViewName: d,
				rootViewParams: {
					user: session[x](),
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_VIEW_TITLE_DOGTAGS"
			},
			viewName: n,
			viewParams: {
				section: T,
				rootViewName: v,
				rootViewParams: {
					user: session[x](),
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_VIEW_TITLE_UNLOCKS"
			},
			viewName: n,
			viewParams: {
				section: T,
				rootViewName: "UnlocksViewController",
				rootViewParams: {
					user: session[x](),
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_TITLE"
			},
			viewName: n,
			viewParams: {
				section: T,
				rootViewName: "MyActivityStreamsViewController",
				rootViewParams: {
					game: enums.Game.BF3
				}
			}
		})), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_VIEW_TITLE_LEADERBOARDS"
			},
			viewName: n,
			viewParams: {
				section: T,
				rootViewName: "LeaderboardsListViewController"
			}
		}), util.hasExpansion(session.getUserGameExpansions(), enums.GameExpansion.BF3PREMIUM) && ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_VIEW_TITLE_PREMIUM"
			},
			viewName: n,
			viewParams: {
				section: T,
				hideTitle: u,
				rootViewName: F
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_VIEW_TITLE_FINDPLAYER",
				minor: u
			},
			viewName: n,
			viewParams: {
				section: T,
				rootViewName: "FindPlayerViewController"
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: g,
				minor: u
			},
			viewName: n,
			viewParams: {
				styleSection: T,
				rootViewName: m
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_VIEW_TITLE_HELPABOUT",
				minor: u
			},
			viewName: n,
			viewParams: {
				styleSection: T,
				rootViewName: l
			}
		})) : ft[c] == enums.Game.OMAHA && (lt && (ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_AGENT",
				collapseHead: u,
				collapsed: u,
				showRank: u,
				sep: S,
				cash: u,
				platformName: enums.Platform.toString(lt[o])
			},
			viewName: n,
			viewParams: {
				section: h,
				rootViewName: b,
				rootViewParams: {
					user: session[x](),
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: z,
				collapsible: u,
				collapsed: ft[i](),
				icon: "pulse"
			},
			viewName: n,
			viewParams: {
				section: h,
				rootViewName: y,
				rootViewParams: {
					persona: lt[f],
					platform: lt[o],
					type: K,
					display: "list"
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: B,
				collapsible: u,
				collapsed: ft[i](),
				icon: Z
			},
			viewName: n,
			viewParams: {
				styleSection: h,
				rootViewName: N,
				rootViewParams: {
					personaId: lt[A],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_WEB_COMMON_STATS_COINS",
				collapsible: u,
				collapsed: ft[i](),
				icon: "medal"
			},
			viewName: n,
			viewParams: {
				section: h,
				rootViewName: q,
				rootViewParams: {
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_STATS_PROGRESSION",
				collapsible: u,
				collapsed: ft[i](),
				icon: "lock"
			},
			viewName: n,
			viewParams: {
				section: h,
				rootViewName: "ProgressionsViewController",
				rootViewParams: {
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_WEB_HEADER_PATCHES",
				collapsible: u,
				collapsed: ft[i](),
				icon: "patches"
			},
			viewName: n,
			viewParams: {
				styleSection: h,
				rootViewName: v,
				rootViewParams: {
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: L,
				collapsible: u,
				collapsed: ft[i](),
				icon: "check",
				sep: u
			},
			viewName: n,
			viewParams: {
				section: h,
				rootViewName: d,
				rootViewParams: {
					persona: lt[f],
					platform: lt[o]
				}
			}
		})), ft[r][a]({
			isDefault: u,
			tabItem: {
				titleSID: J
			},
			viewName: n,
			viewParams: {
				persist: S,
				styleSection: h,
				rootViewName: V
			}
		}), lt && (ft[r][a]({
			tabItem: {
				titleSID: H
			},
			viewName: n,
			viewParams: {
				section: h,
				rootViewName: P,
				rootViewParams: {
					reset: u,
					persona: lt[f],
					platform: lt[o]
				}
			}
		}), ft[r][a]({
			isDefault: u,
			tabItem: {
				titleSID: _
			},
			viewName: n,
			viewParams: {
				persist: S,
				styleSection: h,
				rootViewName: D
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: C
			},
			viewName: n,
			viewParams: {
				styleSection: h,
				rootViewName: E
			}
		})), ft[r][a]({
			tabItem: {
				titleSID: R
			},
			viewName: n,
			viewParams: {
				usingCombinedController: u,
				styleSection: h,
				rootViewName: O
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: W,
				sep: u
			},
			viewName: n,
			viewParams: {
				styleSection: h,
				rootViewName: w
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: j,
				minor: u
			},
			viewName: n,
			viewParams: {
				styleSection: h,
				rootViewName: X,
				rootViewParams: {
					user: session[x]()
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: g,
				minor: u
			},
			viewName: n,
			viewParams: {
				persist: S,
				styleSection: h,
				rootViewName: m
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: p,
				minor: u
			},
			viewName: n,
			viewParams: {
				styleSection: h,
				rootViewName: l
			}
		}), config[st] && ft[r][a]({
			tabItem: {
				title: ot,
				minor: u
			},
			viewName: n,
			viewParams: {
				styleSection: h,
				rootViewName: M
			}
		})) : (ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_SELECT_GAME"
			},
			viewName: n,
			viewParams: {
				rootViewName: "SelectGameViewController"
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: p
			},
			viewName: n,
			viewParams: {
				styleSection: s,
				rootViewName: l
			}
		})), device.isTablet() && ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_NAV_FULL_SITE",
				minor: u,
				action: function() {
					app.goExternal(config[G])
				}
			}
		}), ft[r][a]({
			tabItem: {
				titleSID: "ID_MOBILE_COMMON_LOGOUT",
				minor: u,
				action: function() {
					session.logout()
				}
			}
		})
	}
	var ct = [];
	return ft[r].forEach(function(e) {
		if (e[Y]) {
			var t = $(template.render("DrawerNavView-tabItem", {
				tabItem: e[Y]
			}));
			t.find(".tab").addClick(function(t) {
				e[Y].action ? e[Y].action() : ft[U](e)
			}), t.is("[data-bind-collapsible=yes]") && t.find(".collapse-toggle").addClick(function() {
				ft.toggleCollapsible()
			}), e[Y].$el = t.find(".tab"), ct[a](t)
		}
	}), ct[a]($('<div class="battlelog-logo"></div>')), config[G].indexOf("//battlelog.battlefield.com") == -1 && ct[a]($('<div class="env">' + config[G] + "<br>v " + util.getAppVersionString() + "</div>")), ft.$tabs.append(ct), session[I]() && ft[c] && (web.request(ft[c], "homestats", {
		personaId: lt ? lt[f][A] : 0,
		platform: lt ? lt[o] : 0
	}, function(e, t) {
		if (e || !t || !t[at] || !t.currentRankNeeded || !t.nextRankNeeded) return;
		ft.setRankInMenu(t[at].rank), t.cashBalance && session.setCashBalance(t.cashBalance)
	}), web.request(ft[c], "getactivechallengecount", {
		platform: lt ? lt[o] : 0,
		personaId: lt ? lt[f][A] : 0
	}, function(e, t) {
		if (e || !t) return;
		var n = $('<span class="counter">(' + t.active + ")</span>");
		ft.$tabs.find(".missions .title .counter").remove(), ft.$tabs.find(".missions .title").append(n)
	})), async.nextTick(function() {
		ft.scrollView.scrollToTop();
		if (location.hash && location.hash == "#bf4/servers") setTimeout(function() {
			app.go(k, {})
		}, 1e3);
		else if (config[Q] && session[I]()) {
			var t = storage.get(Q);
			t || (t = {}), config[it] && (t.rootViewName = config[it], config[et] && (t[ut] = config[et])), t && setTimeout(function() {
				app.go(t.rootViewName, t[ut])
			}, 1e3)
		}
		ft[tt] && (ft[tt](ft), ft[tt] = null);
		for (var n in ft[r])
			if (ft[r][n].isDefault) return ft[U](ft[r][n]);
		return ft[U](ft[r][0]), e()
	})
}, DrawerNavViewController.prototype.setRankInMenu = function(e) {
	var t = this,
		n = t.$tabs.find(".rank-icon-wrapper span.rank");
	n.removeClass(function(e, t) {
		return (t.match(/\br\d+/g) || []).join(" ")
	}), n.addClass("r" + e), n.addClass(enums.AppGameName[session.getActiveGame()])
}, DrawerNavViewController.prototype.toggleCollapsible = function() {
	var e = "toggleClass",
		t = "collapsed",
		n = this;
	n.$el.find("[data-bind-collapsible=yes]")[e](t), n.$el.find("[data-collapsible=yes]")[e](t)
}, DrawerNavViewController.prototype.setActiveNavItem = function(e) {
	var t = "activeNavItem",
		n = "tabItem",
		r = "removeClass",
		i = "selected",
		s = ".platform-icon",
		o = "inverted",
		u = "drawerController",
		a = this;
	a[t] && a[t][n] && (a[t][n].$el[r](i), a[t][n].$el.find(s)[r](o)), a[t] = e, e[n] && (e[n].$el.addClass(i), e[n].$el.find(s).addClass(o)), e.view ? a[u].setCenterView(e.view) : e.viewName && a[u].setCenterViewWithNameParams(e.viewName, e.viewParams, function(t, n) {
		e.view = n
	})
};