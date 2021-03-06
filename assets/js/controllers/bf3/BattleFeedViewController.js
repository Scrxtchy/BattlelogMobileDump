function BattleFeedViewController(e) {
	var t = null;
	this._name = "BattleFeedView", this._section = "bf3", this.user = t, ListContentViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_BATTLEFEED", this.templateBundle = "BattleFeed", this.template = t, this.canRefresh = !0, this.canLoadMore = !0, this.tappedItem = t, this.friendStatus = t, this.$writepost = t
}
var app = require("app"),
	session = require("session"),
	web = require("web"),
	dom = require("dom"),
	enums = require("enums"),
	locale = require("locale"),
	ListContentViewController = require("controllers/ListContentViewController");
module.exports = BattleFeedViewController, BattleFeedViewController.prototype = new ListContentViewController, BattleFeedViewController.constructor = BattleFeedViewController, BattleFeedViewController.prototype.viewDidLoad = function() {
	var e = "$battlefeed",
		t = "userId",
		n = "refresh",
		r = "addWritePostInput",
		i = this;
	ListContentViewController.prototype.viewDidLoad.call(i), i[e] = $('<div class="battlefeed"></div>'), i.$listContent.append(i[e]), session.isLoggedIn() && i.user && i.user[t] != session.tokenInfo.user[t] ? (i.showLoadingIndicator(), web.request("userfriendstatus", {
		userId: i.user[t]
	}, function(e, t) {
		if (e) return i[n]();
		i.friendStatus = t.friendstatus, i[r](), i[n]()
	})) : (i[r](), i[n]())
}, BattleFeedViewController.prototype.viewDidAppear = function() {
	var e = this;
	ListContentViewController.prototype.viewDidAppear.call(e);
	if (e.$battlefeed.children().length) {
		e.refresh();
		return
	}
}, BattleFeedViewController.prototype.addWritePostInput = function() {
	var e = "user",
		t = "userId",
		n = "$writepost",
		r = "children",
		i = "focused",
		s = "removeClass",
		o = "placeholder",
		u = "loading",
		a = this;
	if (!session.isLoggedIn()) return;
	if (a[e] && a[e][t] != session.tokenInfo[e][t] && a.friendStatus != enums.FriendStatus.ACCEPTED) return;
	a[n] = $('<div class="writepost hidden"><form><div class="textinput"><input type="text" maxlength="200" placeholder="" /></div></form></div>');
	var f = a[n][r]("form"),
		l = f[r](".textinput"),
		c = l[r]("input");
	c.bind("focus", function() {
		l.addClass(i)
	}).bind("blur", function() {
		l[s](i)
	});
	var h, p = {};
	a[e] && a[e][t] != session.tokenInfo[e][t] ? (h = "postwallmessage", p[t] = a[e][t], c.attr(o, locale.t("ID_MOBILE_BATTLEFEED_WRITE_POST"))) : (h = "setstatusmessage", c.attr(o, locale.t("ID_MOBILE_BATTLEFEED_UPDATE_STATUS"))), c.bind("keypress", function(e) {
		if (e.which != 13) return;
		e.preventDefault();
		if (!c.val().length) return;
		p.message = c.val(), c.blur().val(""), l.addClass(u), setTimeout(function() {
			l[s](u)
		}, 2e3), web.request(h, p, function(e, t) {
			if (e) return;
			setTimeout(function() {
				a.refresh()
			}, 2e3)
		})
	}), a.$listContent.prepend(a[n])
}, BattleFeedViewController.prototype.fetchItems = function(e, t) {
	typeof e == typeof

	function() {} && (t = e, e = {}), e || (e = {}), t || (t = function() {});
	var n = this;
	n.user ? (e.userId = n.user.userId, web.request("userfeed", e, function(e, n) {
		return e ? t(e) : t(e, n.feedEvents)
	})) : web.request("friendfeed", e, function(e, n) {
		return e ? t(e) : t(e, n.feedEvents)
	})
}, BattleFeedViewController.prototype.reset = function() {
	var e = "$writepost",
		t = "hidden",
		n = this;
	n.itemsLoaded = [], n.reachedLastItem = !1, n.scrollView.scrollToTop(), n[e] && n[e].addClass(t), n.$battlefeed.empty(), n.$bottomLoading.addClass(t)
}, BattleFeedViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = !0,
		r = "append",
		i = "$battlefeed",
		s = "error_row",
		o = "reachedLastItem",
		u = "hideLoadingIndicator",
		a = !1,
		f = "$writepost",
		l = "removeClass",
		c = "hidden";
	e || (e = function() {});
	var h = this;
	if (h[t]) return e("BUSY");
	h.showLoadingIndicator(), h[t] = n, h.lastRefresh = new Date, h.fetchItems(function(p, d) {
		h.reset();
		if (p) return p == "USER_FEED_DISABLED" ? h[i][r](dom[s](locale.t("ID_MOBILE_BATTLEFEED_DISABLED"))) : p == "USER_FEED_HIDDEN_BY_ADMIN" ? h[i][r](dom[s](locale.t("ID_WEB_PROFILE_OVERVIEW_FEED_HIDDEN_BY_ADMIN"))) : h[i][r](dom[s](locale.t("ID_MOBILE_BATTLEFEED_ERROR"))), h[o] = n, h[u](), h[t] = a, e(p);
		h[f] && h[f][l](c);
		if (!d.length) return h[i][r](dom[s](locale.t("ID_MOBILE_BATTLEFEED_NOPOSTS"))), h[o] = n, h[u](), h[t] = a, e();
		var v = $("<div></div>");
		return d.forEach(function(e, t) {
			session.isLoggedIn() && (!h.user || h.user.userId == session.tokenInfo.user.userId || h.friendStatus == enums.FriendStatus.ACCEPTED) && !e.COMMENTEDBLOG && !e.WROTEFORUMPOST && !e.CREATEDFORUMTHREAD && (e.isCommentable = n), h.itemsLoaded.push(e);
			var i = dom.feeditem(e);
			if (!i) return;
			i.find(".col-report").addClick(function(t) {
				t.stopPropagation(), app.go("ReportAbuseViewController", {
					section: a,
					type: "feedItem",
					feeditem: e
				})
			}), i.addClick(function(t) {
				h.tappedItem = {
					item: e,
					$item: i
				}, app.go("FeedItemViewController", {
					feeditem: e
				})
			}), v[r](i)
		}), h[i][r](v), h[u](), h.$bottomLoading[l](c), h[t] = a, h.getShouldLoadMore() && h.loadMore(), e()
	})
}, BattleFeedViewController.prototype.loadMore = function(e) {
	var t = "isLoading",
		n = !0,
		r = "itemsLoaded",
		i = "$bottomLoading",
		s = "hidden",
		o = "reachedLastItem",
		u = !1;
	e || (e = function() {});
	var a = this;
	if (a[t]) return e();
	a[t] = n, a.fetchItems({
		olderThanId: a[r][a[r].length - 1].id
	}, function(f, l) {
		a[i].addClass(s);
		if (f) return a[o] = n, a[t] = u, e();
		if (!l.length) return a[o] = n, a[t] = u, e();
		var c = $("<div></div>");
		return l.forEach(function(e, t) {
			session.isLoggedIn() && (!a.user || a.user.userId == session.tokenInfo.user.userId || a.friendStatus == enums.FriendStatus.ACCEPTED) && !e.COMMENTEDBLOG && !e.WROTEFORUMPOST && !e.CREATEDFORUMTHREAD && (e.isCommentable = n), a[r].push(e);
			var i = dom.feeditem(e);
			if (!i) return;
			i.find(".col-report").addClick(function(t) {
				t.stopPropagation(), app.go("ReportAbuseViewController", {
					section: u,
					type: "feedItem",
					feeditem: e
				})
			}), i.addClick(function(t) {
				a.tappedItem = {
					item: e,
					$item: i
				}, app.go("FeedItemViewController", {
					feeditem: e
				})
			}), c.append(i)
		}), a.$battlefeed.append(c), a[i].removeClass(s), a[t] = u, a.getShouldLoadMore() && a.loadMore(), e()
	})
};