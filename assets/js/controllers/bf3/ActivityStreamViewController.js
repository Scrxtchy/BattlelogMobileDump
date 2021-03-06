function ActivityStreamViewController(e) {
	this._name = "ActivityStreamView", this._section = "bf3", this.game = null, this.platform = null, this.user = null, ListContentViewController.call(this, e), this.titleSID = "ID_WEB_ACTIVITYSTREAM_ACTIVITY_TITLE", this.canRefresh = !0, this.canLoadMore = !0
}
var enums = require("enums"),
	web = require("web"),
	dom = require("dom"),
	locale = require("locale"),
	session = require("session"),
	ListContentViewController = require("controllers/ListContentViewController");
module.exports = ActivityStreamViewController, ActivityStreamViewController.prototype = new ListContentViewController, ActivityStreamViewController.constructor = ActivityStreamViewController, ActivityStreamViewController.prototype.viewDidLoad = function() {
	var e = "$activitystream",
		t = this;
	ListContentViewController.prototype.viewDidLoad.call(t), t[e] = $('<div class="activitystream"></div>'), t.$listContent.append(t[e]), t.refresh()
}, ActivityStreamViewController.prototype.fetchItems = function(e, t) {
	var n = "platform",
		r = "feedEvents";
	typeof e == typeof

	function() {} && (t = e, e = {}), e || (e = {}), t || (t = function() {});
	var i = this;
	e[n] || (e[n] = i[n]), i.user ? (e.userId = i.user.userId, web.request(i.game, "profileactivitystream", e, function(e, n) {
		return e ? t(e) : t(e, n[r])
	})) : web.request(i.game, "friendactivitystream", e, function(e, n) {
		return e ? t(e) : t(e, n[r])
	})
}, ActivityStreamViewController.prototype.reset = function() {
	var e = this;
	e.itemsLoaded = [], e.reachedLastItem = !1, e.scrollView.scrollToTop(), e.$activitystream.empty(), e.$bottomLoading.addClass("hidden")
}, ActivityStreamViewController.prototype.drawItems = function(e) {
	var t = "append",
		n = '<div class="action-done"><span class="button-icon star"></span></div>',
		r = "replaceWith",
		i = this,
		s = $("<div></div>");
	e.forEach(function(e, o) {
		i.itemsLoaded.push(e);
		var u = dom.activitystreamitem(e);
		if (!u) return;
		var a = u.find(".actions");
		if (i.user && i.user.userId == session.getUserId())
			if (e.isShared) a[t](n);
			else {
				var f = $('<a class="button small"><span class="button-icon star"></span></a>');
				f.addClick(function() {
					var t = $('<div class="action-loading"></div>');
					f[r](t), web.request(i.game, "activityeventshare", {
						eventId: e.id
					}, function(e, i) {
						t[r](n)
					})
				}), a[t](f)
			}
		s[t](u)
	}), i.$activitystream[t](s)
}, ActivityStreamViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = !0,
		r = "append",
		i = "$activitystream",
		s = "error_row",
		o = "reachedLastItem",
		u = "hideLoadingIndicator",
		a = !1;
	e || (e = function() {});
	var f = this;
	if (f[t]) return e("BUSY");
	f.showLoadingIndicator(), f[t] = n, f.lastRefresh = new Date, f.fetchItems(function(l, c) {
		return f.reset(), l ? (f[i][r](dom[s](locale.t("ID_WEB_SERVERGUIDE_SCOREBOARD_NO_DATA"))), f[o] = n, f[u](), f[t] = a, e(l)) : c.length ? (f.drawItems(c), f[u](), f.$bottomLoading.removeClass("hidden"), f[t] = a, f.getShouldLoadMore() && f.loadMore(), e()) : (f.user && f.user.userId == session.getUserId() ? f[i][r](dom[s](locale.t("ID_WEB_ACTIVITYSTREAM_NO_EVENTS_DESCRIPTION_YOU"))) : f.user ? f[i][r](dom[s](locale.t("ID_WEB_ACTIVITYSTREAM_NO_EVENTS_DESCRIPTION_OTHER"))) : f[i][r](dom[s](locale.t("ID_WEB_ACTIVITYSTREAM_NO_EVENTS_DESCRIPTION"))), f[o] = n, f[u](), f[t] = a, e())
	})
}, ActivityStreamViewController.prototype.loadMore = function(e) {
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
	}, function(r, f) {
		return a[i].addClass(s), r ? (a[o] = n, a[t] = u, e()) : f.length ? (a.drawItems(f), a[i].removeClass(s), a[t] = u, a.getShouldLoadMore() && a.loadMore(), e()) : (a[o] = n, a[t] = u, e())
	})
};