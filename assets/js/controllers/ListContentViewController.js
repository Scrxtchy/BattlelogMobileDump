function ListContentViewController(e) {
	var t = !1,
		n = null;
	this.canRefresh = t, this.canLoadMore = t, this.pullToRefresh = !0, this.refreshButton = !0, this.autoRefresh = t, this.autoRefreshDelay = 9e4, this.scrollViewTemplate = n, ViewController.call(this, e), this.isLoading = t, this.lastRefresh = n, this.pagesLoaded = 0, this.reachedLastPage = t, this.itemsLoaded = [], this.reachedLastItem = t, this.tappedItem = n, this.$refreshButton = n
}
var app = require("app"),
	device = require("device"),
	template = require("template"),
	ViewController = require("controllers/ViewController"),
	ScrollViewController = require("controllers/ScrollViewController");
module.exports = ListContentViewController, ListContentViewController.prototype = new ViewController, ListContentViewController.prototype.constructor = ListContentViewController, ListContentViewController.prototype.loadView = function(e) {
	var t = "$refreshButton",
		n = "removeClass",
		r = ".button-icon",
		i = "refresh",
		s = "loading";
	e || (e = function() {});
	var o = this;
	ViewController.prototype.loadView.call(o, function() {
		o.canRefresh && o.refreshButton && device.hasRefreshButton() && (!o.pullToRefresh || !device.hasPullToRefresh()) && (o[t] = $('<a class="button"><span class="button-icon refresh"></span></a>'), o[t].addClick(function() {
			if (o.isLoading) return;
			o[t].children(r)[n](i).addClass(s), o[i](function() {
				o[t].children(r)[n](s).addClass(i)
			})
		}), o.navbarRightItem = {
			$el: o[t]
		}), o.initScrollView(function() {
			return e()
		})
	})
}, ListContentViewController.prototype.initScrollView = function(e) {
	var t = "scrollView",
		n = "pullToRefresh",
		r = "canLoadMore",
		i = "scrollViewTemplate",
		s = "append",
		o = "$content",
		u = "$listContent",
		a = "$bottomLoading",
		f = this;
	f[t] = new ScrollViewController({
		parentViewController: f,
		pullToRefresh: f[n]
	}), f.subviews.push(f[t]), f[r] && f[t].bind("scroll", function(e) {
		if (f.isLoading) return;
		if (!f.pagesLoaded && !f.itemsLoaded.length) return;
		if (f.reachedLastPage || f.reachedLastItem) return;
		if (!f.getShouldLoadMore()) return;
		return f.loadMore()
	}), f.canRefresh && f[n] && device.hasPullToRefresh() && f[t].bind(n, function(e) {
		f.refresh(function() {
			f.hideLoadingIndicator()
		})
	}), f[t].init(function() {
		return f[i] && f[t][o][s](template.render(f[i])), f[u] = $('<div class="listContent"></div>'), f[t][o][s](f[u]), f[r] && (f[a] = $('<div class="bottom-loading hidden"></div>'), f[t][o][s](f[a])), f.$el[s](f[t].$el), e()
	})
}, ListContentViewController.prototype.viewDidAppear = function() {
	var e = "lastRefresh",
		t = this;
	ViewController.prototype.viewDidAppear.call(t);
	var n = t.autoRefresh && !t.isLoading && !t.tappedItem && t[e] && (new Date).getTime() - t[e] > t.autoRefreshDelay;
	t.canRefresh && n && (t.reset(), t.refresh())
}, ListContentViewController.prototype.showLoadingIndicator = function() {
	var e = this;
	if (!e.canRefresh) return;
	e.pullToRefresh && e.scrollView.showLoadingIndicator(), e.refreshButton && device.hasRefreshButton() && e.$refreshButton.children(".button-icon").removeClass("refresh").addClass("loading")
}, ListContentViewController.prototype.hideLoadingIndicator = function() {
	var e = this;
	if (!e.canRefresh) return;
	e.pullToRefresh && e.scrollView.hideLoadingIndicator(), e.refreshButton && device.hasRefreshButton() && e.$refreshButton.children(".button-icon").removeClass("loading").addClass("refresh")
}, ListContentViewController.prototype.getShouldLoadMore = function() {
	var e = "scrollView",
		t = this;
	if (!t[e].isVisible || !t[e].getContentHeight()) return;
	if (t[e].scrollBottom() > 240) return;
	return !0
};