function NewsViewController(e) {
	var t = !0;
	this._name = "NewsView", this.game = session.getActiveGame(), this.game == enums.Game.OMAHA && (this.additionalStylesheetSection = enums.AppGameName[this.game]), ListContentViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_NEWS", this.canRefresh = t, this.canLoadMore = t, this.refreshButton = t, this.autoRefresh = t, this.autoRefreshDelay = 6e5, this.itemsPerPage = 5
}
var app = require("app"),
	enums = require("enums"),
	locale = require("locale"),
	device = require("device"),
	web = require("web"),
	dom = require("dom"),
	session = require("session"),
	ListContentViewController = require("controllers/ListContentViewController"),
	carousel = require("carousel");
module.exports = NewsViewController, NewsViewController.prototype = new ListContentViewController, NewsViewController.prototype.constructor = NewsViewController, NewsViewController.prototype.viewDidLoad = function() {
	var e = ".topstories",
		t = "$listContent",
		n = this;
	ListContentViewController.prototype.viewDidLoad.call(n);
	var r = n.$(e).remove();
	n[t].append(r), n.$topstory_container = n.$(e), n.$topstories = n.$(".topstories .items"), n.$topstory_indicators = n.$(".indicators"), n.$newsfeed = $('<div class="newsfeed section"></div>'), n[t].append(n.$newsfeed), n.refresh()
}, NewsViewController.prototype.fetchTopStories = function(e, t) {
	t || (t = function() {});
	var n = this,
		r = {
			language: locale.currentLanguage
		};
	web.request(e, "topstories", r, function(e, n) {
		if (e) return t(e);
		var r = [];
		return n.topStories.forEach(function(e, t) {
			e.wpguid ? e.type = "blogPost" : e.type = "legacyBlogPost", r.push(e)
		}), t(e, r)
	})
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
	var e = "hidden",
		t = this;
	t.pagesLoaded = 0, t.reachedLastPage = !1, t.scrollView.scrollToTop(), t.$topstory_container.addClass(e), t.$topstories.empty(), t.$topstory_indicators.empty(), t.$newsfeed.empty(), t.$bottomLoading.addClass(e)
}, NewsViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = !0,
		r = "removeClass",
		i = "$topstory_container",
		s = "hidden",
		o = "append",
		u = "$newsfeed",
		a = "ID_MOBILE_NEWS_NONEWS",
		f = "reachedLastPage",
		l = "hideLoadingIndicator",
		c = !1;
	e || (e = function() {});
	var h = this;
	if (h[t]) return e("BUSY");
	h.showLoadingIndicator(), h[t] = n, h.lastRefresh = new Date, h.reset(), h.fetchTopStories(h.game, function(t, n) {
		return !t && n.length ? (h[i][r](s).hide().fadeIn(800), h.makeTopstoryCarousel(n, h[i])) : h.$topstories.addClass(s), e()
	}), h.fetchItems(function(i, p) {
		if (i) return h[u][o](dom.error_row(locale.t(a))), h[f] = n, h[l](), h[t] = c, e();
		if (!p.length) return h[u][o](dom.error_row(locale.t(a))), h[f] = n, h[l](), h[t] = c, e();
		var d = $("<div></div>");
		return p.forEach(function(e, t) {
			var n = dom.newsitem_row(e);
			n.addClick(function() {
				app.go("NewsItemViewController", {
					newsitem: e
				})
			}), d[o](n)
		}), h[u][o](d), h.$bottomLoading[r](s), h[l](), h.pagesLoaded = 1, h[t] = c, h.getShouldLoadMore() && h.loadMore(), e()
	})
}, NewsViewController.prototype.makeTopstoryCarousel = function(e, t) {
	var n = "find",
		r = "active",
		i = t[n](".items"),
		s = t[n](".indicators");
	i.empty(), s.empty(), e.forEach(function(e) {
		var t = dom.topstory(e);
		t.addClick(function() {
			app.go("NewsItemViewController", {
				section: !1,
				newsitem: e
			})
		}), i.append(t), s.append('<div class="indicator">&bull;</div>')
	}), s[n](".indicator:first").addClass(r), carousel.init(t, i, i[n](".topstory"), function(e, t) {
		var i = s[n](".indicator:nth(" + t + ")");
		i.addClass(r).siblings().removeClass(r)
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