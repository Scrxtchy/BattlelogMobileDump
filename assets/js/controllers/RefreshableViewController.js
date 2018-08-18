function RefreshableViewController(e) {
	var t = !1,
		n = null;
	this.pullToRefresh = !0, this.refreshButton = t, this.autoRefresh = t, this.autoRefreshDelay = 9e4, this.scrollViewTemplate = n, ViewController.call(this, e), this.isLoading = t, this.lastRefresh = n, this.$refreshButton = n
}
var app = require("app"),
	device = require("device"),
	template = require("template"),
	ViewController = require("controllers/ViewController"),
	ScrollViewController = require("controllers/ScrollViewController");
module.exports = RefreshableViewController, RefreshableViewController.prototype = new ViewController, RefreshableViewController.constructor = RefreshableViewController, RefreshableViewController.prototype.loadView = function(e) {
	var t = "$refreshButton",
		n = "removeClass",
		r = ".button-icon",
		i = "refresh",
		s = "loading";
	e || (e = function() {});
	var o = this;
	ViewController.prototype.loadView.call(o, function() {
		o.refreshButton && device.hasRefreshButton() && (!o.pullToRefresh || !device.hasPullToRefresh()) && (o[t] = $('<a class="button"><span class="button-icon refresh"></span></a>'), o[t].addClick(function() {
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
}, RefreshableViewController.prototype.initScrollView = function(e) {
	var t = "scrollView",
		n = "pullToRefresh",
		r = "scrollViewTemplate",
		i = this;
	i[t] = new ScrollViewController({
		parentViewController: i,
		pullToRefresh: i[n]
	}), i.subviews.push(i[t]), i[n] && device.hasPullToRefresh() && i[t].bind(n, function() {
		i.refresh(function() {
			i.hideLoadingIndicator()
		})
	}), i[t].init(function() {
		i[r] && i[t].$content.append(template.render(i[r], i._templateParams)), i.$el.append(i[t].$el), e()
	})
}, RefreshableViewController.prototype.viewDidAppear = function() {
	var e = "lastRefresh",
		t = this;
	ViewController.prototype.viewDidAppear.call(t);
	var n = t.autoRefresh && !t.isLoading && t[e] && (new Date).getTime() - t[e] > t.autoRefreshDelay;
	n && t.refresh()
}, RefreshableViewController.prototype.refresh = function(e) {}, RefreshableViewController.prototype.showLoadingIndicator = function() {
	var e = this;
	e.pullToRefresh && e.scrollView.showLoadingIndicator(), e.refreshButton && device.hasRefreshButton() && e.$refreshButton.children(".button-icon").removeClass("refresh").addClass("loading")
}, RefreshableViewController.prototype.hideLoadingIndicator = function() {
	var e = this;
	e.pullToRefresh && e.scrollView.hideLoadingIndicator(), e.refreshButton && device.hasRefreshButton() && e.$refreshButton.children(".button-icon").removeClass("loading").addClass("refresh")
};