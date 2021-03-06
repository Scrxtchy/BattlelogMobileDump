function InlineFeedsViewController(e) {
	this._name = "InlineFeedsView", this.game = session.getActiveGame(), this.gameName = enums.AppGameName[this.game], this.user = null, ViewController.call(this, e), this.activeTab = "battlefeed"
}
var app = require("app"),
	locale = require("locale"),
	device = require("device"),
	receipt = require("receipt"),
	session = require("session"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	dom = require("dom"),
	template = require("template"),
	ViewController = require("controllers/ViewController");
module.exports = InlineFeedsViewController, InlineFeedsViewController.prototype = new ViewController, InlineFeedsViewController.prototype.constructor = InlineFeedsViewController, InlineFeedsViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ViewController.prototype.loadView.call(t, function() {
		return t.$battlefeed = t.$(".feedsection.battlefeed"), t.$activitystream = t.$(".feedsection.activitystream"), e()
	})
}, InlineFeedsViewController.prototype.viewDidAppear = function() {
	var e = this;
	ViewController.prototype.viewDidAppear.call(e), e.$el.css("min-height", e.parentViewController.$el.height() - 16)
}, InlineFeedsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ViewController.prototype.viewDidLoad.call(e), e.bindEvents(), e.refresh()
}, InlineFeedsViewController.prototype.bindEvents = function() {
	var e = "activeTab",
		t = "removeClass",
		n = "selected",
		r = "hidden",
		i = this;
	i.$(".segmentedcontrol.feed-selection a").addClick(function() {
		var s = $(this).data("selection");
		if (i[e] == s) return;
		i[e] = s, $(this).siblings()[t](n), $(this).addClass(n), i.$(".feedsection").addClass(r), i.$(".feedsection." + i[e])[t](r), i.refresh()
	})
}, InlineFeedsViewController.prototype.refresh = function(e) {
	e || (e = function() {});
	var t = this;
	if (t.activeTab == "battlefeed") return t.refreshBattleFeed(e);
	if (t.activeTab == "activitystream") return t.refreshActivityStream(e)
}, InlineFeedsViewController.prototype.refreshBattleFeed = function(e) {
	var t = this;
	t.loadBattleFeed(null, e)
}, InlineFeedsViewController.prototype.loadBattleFeed = function(e, t) {
	var n = "user",
		r = "userId",
		i = "olderThanId",
		s = "$battlefeed",
		o = "append",
		u = "error_row",
		a = "length",
		f = "addWritePostInput";
	e || (e = {}), t || (t = function() {});
	var l = this,
		c = l[n] ? "userfeed" : "friendfeed";
	l[n] && (e[r] = l[n][r]), web.request(c, e, function(c, h) {
		e[i] || l[s].empty();
		if (c) return c == "USER_FEED_DISABLED" ? (l[s][o](dom[u](locale.t("ID_WEB_PROFILE_STATS_ACTIVITYSTREAM_FEED_HIDDEN"))), t()) : c == "USER_FEED_HIDDEN_BY_ADMIN" ? (l[s][o](dom[u](locale.t("ID_WEB_PROFILE_OVERVIEW_FEED_HIDDEN_BY_ADMIN"))), t()) : (l[s][o](dom[u](locale.t("ID_MOBILE_BATTLEFEED_ERROR"))), t(c));
		var p = h.feedEvents;
		if (!p[a]) return e[i] || l[s][o](dom.empty_row(locale.t("ID_MOBILE_BATTLEFEED_NOPOSTS"))), t();
		e[i] || (session.isLoggedIn() && l[n] && l[n][r] != session.tokenInfo[n][r] ? web.request("userfriendstatus", {
			userId: l[n][r]
		}, function(e, t) {
			if (e) return;
			l.friendStatus = t.friendstatus, l[f]()
		}) : l[f]());
		var d = [];
		p.forEach(function(e, t) {
			var n = dom.feeditem(e);
			if (!n) return;
			n.addClass("link").addClick(function(t) {
				l.tappedItem = {
					item: e,
					$item: n
				}, app.go("FeedItemViewController", {
					feeditem: e
				})
			}), d.push(n)
		}), l[s][o](d);
		if (p[a] > 0) {
			var v = $('<div class="button more-button sectioninfo">' + locale.t("ID_WEB_FEED_VIEW_MORE_EVENTS") + "</div>");
			v.addClick(function() {
				var e = $('<div class="sectionmessage"><div class="loader loader-small"></div></div>');
				v.replaceWith(e), l.loadBattleFeed({
					olderThanId: p[p[a] - 1].id
				}, function() {
					e.remove()
				})
			}), l[s][o](v)
		}
		return t()
	})
}, InlineFeedsViewController.prototype.refreshActivityStream = function(e) {
	var t = this;
	t.loadActivityStream(null, e)
}, InlineFeedsViewController.prototype.loadActivityStream = function(e, t) {
	var n = "userId",
		r = "olderThanId",
		i = "$activitystream",
		s = "append",
		o = "error_row",
		u = "length";
	e || (e = {}), t || (t = function() {});
	var a = this,
		f = "profileactivitystream";
	a.user ? e[n] = a.user[n] : e[n] = session.getUserId(), web.request(a.game, f, e, function(n, f) {
		e[r] || a[i].empty();
		if (n) return n == "USER_FEED_DISABLED" ? (a[i][s](dom[o](locale.t("ID_WEB_PROFILE_STATS_ACTIVITYSTREAM_FEED_HIDDEN"))), t()) : n == "USER_FEED_HIDDEN_BY_ADMIN" ? (a[i][s](dom[o](locale.t("ID_WEB_PROFILE_OVERVIEW_FEED_HIDDEN_BY_ADMIN"))), t()) : (a[i][s](dom[o](locale.t("ID_MOBILE_ACTIVITYSTREAM_ERROR"))), t(n));
		var l = f.feedEvents;
		if (!l[u]) return e[r] || a[i][s](dom[o](locale.t("ID_MOBILE_ACTIVITYSTREAM_NOPOSTS"))), t();
		var c = [];
		l.forEach(function(e, t) {
			var n = dom.activitystreamitem(e);
			if (!n) return;
			c.push(n)
		}), a[i][s](c);
		if (l[u] > 0) {
			var h = $('<div class="button more-button sectioninfo">' + locale.t("ID_WEB_FEED_VIEW_MORE_EVENTS") + "</div>");
			h.addClick(function() {
				var e = $('<div class="sectionmessage"><div class="loader loader-small"></div></div>');
				h.replaceWith(e), a.loadActivityStream({
					olderThanId: l[l[u] - 1].id
				}, function() {
					e.remove()
				})
			}), a[i][s](h)
		}
		return t()
	})
}, InlineFeedsViewController.prototype.addWritePostInput = function() {
	var e = "user",
		t = "userId",
		n = "$writepost",
		r = "children",
		i = "focused",
		s = "removeClass",
		o = "placeholder",
		u = "message",
		a = this;
	if (!session.isLoggedIn()) return;
	if (a[e] && a[e][t] != session.tokenInfo[e][t] && a.friendStatus != enums.FriendStatus.ACCEPTED) return;
	a[n] = $(template.render("InlineFeedsUpdateStatusView", {}));
	var f = a[n][r]("form"),
		l = f[r](".textinput"),
		c = l[r]("textarea"),
		h = l.find(".loader"),
		p = a[n].find("a.button.primary");
	c.bind("focus", function() {
		f.addClass(i)
	}).bind("blur", function() {
		setTimeout(function() {
			c.val() == "" && f[s](i)
		}, 200)
	});
	var d, v = {};
	a[e] && a[e][t] != session.tokenInfo[e][t] ? (d = "postwallmessage", v[t] = a[e][t], c.attr(o, locale.t("ID_MOBILE_BATTLEFEED_WRITE_POST"))) : (d = "setstatusmessage", c.attr(o, locale.t("ID_MOBILE_BATTLEFEED_UPDATE_STATUS")));
	var m = function(e) {
		e.preventDefault(), v[u] = util.stripEmojis(c.val()).trim(), c.val(v[u]);
		if (!v[u].length) return;
		c.blur().val(""), h.show(), web.request(d, v, function(e, t) {
			e == "NO_MESSAGE" ? (h.hide(), c.val(""), receipt.showReceipt(locale.t("ID_WEB_COMMON_RECEIPT_NO_MESSAGE_SET"), "error")) : (f[s](i), setTimeout(function() {
				h.hide(), e || a.refreshBattleFeed()
			}, 2e3))
		})
	};
	p.addClick(function(e) {
		m(e)
	}), a.$battlefeed.prepend(a[n])
};