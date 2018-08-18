function NotificationBarViewController(e) {
	this._name = "NotificationBarView", this.game = null, this.category = null, ViewController.call(this, e), this.title = "Notifications", this.notifierItems = [], this.activeNotifierItem = null
}
var app = require("app"),
	device = require("device"),
	enums = require("enums"),
	events = require("events"),
	push = require("push"),
	session = require("session"),
	template = require("template"),
	web = require("web"),
	ViewController = require("controllers/ViewController");
module.exports = NotificationBarViewController, NotificationBarViewController.prototype = new ViewController, NotificationBarViewController.prototype.constructor = NotificationBarViewController, NotificationBarViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ViewController.prototype.loadView.call(t, function() {
		return t.$iconbuttons = t.$(".notification-icons"), t.$notifierContainer = t.$(".notifier-container"), t.$notifierOverlay = t.$(".notifier-overlay"), t.$notifier = t.$(".notifier"), t.refresh(), t.setupTouchGestures(), t.bindEvents(), e()
	})
}, NotificationBarViewController.prototype.setupTouchGestures = function() {
	if (!device.isTablet()) return;
	var e = this,
		t = function(t) {
			e.activeNotifierItem && !$(t.target).closest(".notifier, .notification-icons").length && e.closeIfOpen()
		};
	app.rootViewController.mainView.$centerView[0].addEventListener("touchend", t, !0)
}, NotificationBarViewController.prototype.bindEvents = function() {
	var e = this;
	events.bind(["didLogIn", "didLogOut", "activeGameDidChange", "didChangeActivePersona"], function() {
		e.refresh()
	}), e.$notifierOverlay.addClick(function() {
		e.setActiveNotifierItem(e.activeNotifierItem)
	})
}, NotificationBarViewController.prototype.closeIfOpen = function() {
	var e = "activeNotifierItem",
		t = "iconButtonItem",
		n = this;
	n[e] && (n[e][t] && n[e][t].$el.removeClass("selected"), n[e].view && n[e].view.$el.detach(), n[e] = null, n.$notifierOverlay.addClass("hidden"))
}, NotificationBarViewController.prototype.refresh = function(e) {
	var t = "forEach",
		n = "notifierItems",
		r = "view",
		i = "activeNotifierItem",
		s = "iconButtonItem",
		o = "addClass",
		u = "$iconbuttons",
		a = "push",
		f = "reports",
		l = "unreadGameReports",
		c = "PlayerGameReportReceived",
		h = "NotificationsPopupViewController",
		p = "battlereports",
		d = "challenges",
		v = "notifications",
		m = "unreadNotifications",
		g = "NotificationMessage",
		y = "unreadPushKey",
		b = "highlight";
	e || (e = function() {});
	var w = this,
		E = session.getActiveGame(),
		S = E ? session.getUserActivePersonaForGame(E) : null;
	w[n][t](function(e) {
		if (!e[r]) return;
		w[i] == e && (e[s] && e[s].$el.removeClass("selected"), e[r].viewWillDisappear(), e[r].detach(), e[r].viewDidDisappear(), w.$notifierOverlay[o]("hidden")), e[r].unloadView()
	}), w.navItems = [], w[n] = [], w[i] = null, w[u].empty(), E == enums.Game.WARSAW ? (S && (w[n][a]({
		iconButtonItem: {
			className: f,
			unreadKey: l,
			unreadPushKey: c
		},
		viewName: h,
		viewParams: {
			game: E,
			category: p
		}
	}), w[n][a]({
		iconButtonItem: {
			className: d,
			unreadKey: "unreadChallengeNotifications",
			unreadPushKey: "ChallengesNotification"
		},
		viewName: h,
		viewParams: {
			game: E,
			category: d
		}
	})), w[n][a]({
		iconButtonItem: {
			className: v,
			unreadKey: m,
			unreadPushKey: g
		},
		viewName: h,
		viewParams: {
			game: E,
			category: v
		}
	})) : E == enums.Game.OMAHA && (S && w[n][a]({
		iconButtonItem: {
			className: f,
			unreadKey: l,
			unreadPushKey: c
		},
		viewName: h,
		viewParams: {
			game: E,
			category: p
		}
	}), w[n][a]({
		iconButtonItem: {
			className: v,
			unreadKey: m,
			unreadPushKey: g
		},
		viewName: h,
		viewParams: {
			game: E,
			category: v
		}
	}));
	var x = [];
	w[n][t](function(e) {
		if (e[s]) {
			var t = $(template.render("NotificationBarView-iconButtonItem", {
				iconButtonItem: e[s]
			}));
			t.addClick(function() {
				w.setActiveNotifierItem(e)
			}), e[s][y] && push.bind(e[s][y], function() {
				t[o](b)
			}), e[s].$el = t, x[a](t)
		}
	}), w[u].append(x), session.isLoggedIn() && E && web.request(E, "notificationstatus", function(e, r) {
		if (e) return;
		w[n][t](function(e) {
			if (!e[s] || !e[s].unreadKey) return;
			r[e[s].unreadKey] > 0 && e[s].$el[o](b)
		})
	}), e()
}, NotificationBarViewController.prototype.setActiveNotifierItem = function(e) {
	var t = "activeNotifierItem",
		n = "iconButtonItem",
		r = "removeClass",
		i = "selected",
		s = "view",
		o = "$notifierOverlay",
		u = "hidden",
		a = "viewWillAppear",
		f = "viewDidAppear",
		l = this;
	if (l[t]) {
		l[t][n] && l[t][n].$el[r](i), l[t][s] && (l[t][s].viewWillDisappear(), l[t][s].$el.detach(), l[t][s].viewDidDisappear());
		if (l[t] == e) {
			l[t] = null, l[o].addClass(u);
			return
		}
	} else l[o][r](u);
	l[t] = e, e[n] && (e[n].$el[r]("highlight"), e[n].$el.addClass(i)), e[s] ? (e[s][a](), l.$notifier.append(e[s].$el), e[s][f]()) : e.viewName && require(["controllers/" + e.viewName], function(t) {
		var n = e.viewParams || {};
		n.parentViewController = l, e[s] = new t(n), e[s].init(function() {
			e[s][a](), l.$notifier.append(e[s].$el), e[s][f]()
		})
	})
};