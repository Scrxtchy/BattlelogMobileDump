function NewsViewController(e) {
	this._name = "NewsView", this._section = "bf3", this.game = enums.Game.BF3, ListContentViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_NEWS", this.canRefresh = !0, this.canLoadMore = !0, this.refreshButton = !0, this.itemsPerPage = 5
}
var app = require("app"),
	enums = require("enums"),
	locale = require("locale"),
	device = require("device"),
	web = require("web"),
	util = require("util"),
	dom = require("dom"),
	ListContentViewController = require("controllers/ListContentViewController");
module.exports = NewsViewController, NewsViewController.prototype = new ListContentViewController, NewsViewController.prototype.constructor = NewsViewController, NewsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ListContentViewController.prototype.viewDidLoad.call(e), e.$newsfeed = $('<div class="newsfeed"></div>'), e.$listContent.append(e.$newsfeed), e.refresh()
}, NewsViewController.prototype.fetchItems = function(e, t) {
	typeof e == typeof

	function() {} && (t = e, r = {}), e || (e = {}), t || (t = function() {});
	var n = this,
		r = {
			language: locale.currentLanguage
		};
	for (var i in e) {
		if (!e.hasOwnProperty(i)) continue;
		r[i] = e[i]
	}
	web.request(n.game, "news", r, function(e, n) {
		if (e) return t(e);
		var r = [];
		return n.blogPosts.forEach(function(e, t) {
			e.wpguid ? e.type = "blogPost" : e.type = "legacyBlogPost", r.push(e)
		}), r.sort(function(e, t) {
			var n = e.postedAt || e.publishDate,
				r = t.postedAt || t.publishDate;
			return r - n
		}), t(e, r)
	})
}, NewsViewController.prototype.reset = function() {
	var e = this;
	e.pagesLoaded = 0, e.reachedLastPage = !1, e.scrollView.scrollToTop(), e.$newsfeed.empty(), e.$bottomLoading.addClass("hidden")
}, NewsViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = !0,
		r = "append",
		i = "$newsfeed",
		s = "ID_MOBILE_NEWS_NONEWS",
		o = "reachedLastPage",
		u = "hideLoadingIndicator",
		a = !1;
	e || (e = function() {});
	var f = this;
	if (f[t]) return e("BUSY");
	f.showLoadingIndicator(), f[t] = n, f.lastRefresh = new Date, f.fetchItems(function(l, c) {
		f.reset();
		if (l) return f[i][r](dom.error_row(locale.t(s))), f[o] = n, f[u](), f[t] = a, e();
		if (!c.length) return f[i][r](dom.error_row(locale.t(s))), f[o] = n, f[u](), f[t] = a, e();
		var h = $("<div></div>");
		return c.forEach(function(e, t) {
			var n = dom.newsitem_row(e);
			n.addClick(function() {
				app.go("NewsItemViewController", {
					newsitem: e
				})
			}), h[r](n)
		}), f[i][r](h), f.$bottomLoading.removeClass("hidden"), f[u](), f.pagesLoaded = 1, f[t] = a, f.getShouldLoadMore() && f.loadMore(), e()
	})
}, NewsViewController.prototype.loadMore = function(e) {
	var t = "isLoading",
		n = !0,
		r = "pagesLoaded",
		i = "$bottomLoading",
		s = "hidden",
		o = "reachedLastPage",
		u = !1;
	e || (e = function() {});
	var a = this;
	if (a[t]) return e();
	a[t] = n, a.fetchItems({
		start: a[r] * a.itemsPerPage
	}, function(f, l) {
		a[i].addClass(s);
		if (f) return a[o] = n, a[t] = u, e();
		if (!l.length) return a[o] = n, a[t] = u, e();
		var c = $("<div></div>");
		return l.forEach(function(e, t) {
			var n = dom.newsitem_row(e);
			n.addClick(function() {
				app.go("NewsItemViewController", {
					newsitem: e
				})
			}), c.append(n)
		}), a.$newsfeed.append(c), a[i].removeClass(s), a[r]++, a[t] = u, a.getShouldLoadMore() && a.loadMore(), e()
	})
};