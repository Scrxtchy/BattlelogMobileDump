function ScrollViewController(e) {
	var t = !1,
		n = null;
	this._name = "ScrollView", this.pullToRefresh = t, ViewController.call(this, e), this.template = n, this.scrollPosition = {
		x: 0,
		y: 0
	}, this.savedScrollPosition = n, this.isLoading = t, this.loadingStartTime = n, this.isPulling = t, this.lastScrollPos = 0, this.isDisabled = t, this.scrollYOffset = 20
}
var device = require("device"),
	events = require("events"),
	locale = require("locale"),
	template = require("template"),
	util = require("util"),
	ViewController = require("controllers/ViewController");
module.exports = ScrollViewController, ScrollViewController.prototype = new ViewController, ScrollViewController.prototype.constructor = ScrollViewController, ScrollViewController.prototype.loadView = function(e) {
	var t = "$content",
		n = "append",
		r = "$wrapper",
		i = "pullToRefresh",
		s = "$pullToRefresh";
	e || (e = function() {});
	var o = this;
	ViewController.prototype.loadView.call(o, function() {
		var u = o.$el.children();
		u.detach(), o[t] = $('<div class="ScrollViewContent"></div>'), o[t][n](u), o[r] = $('<div class="ScrollViewWrapper"></div>'), o[r][n](o[t]), o.$el[n](o[r]);
		if (o[i]) try {
			o[s] = $(template.render("ScrollView-pulltorefresh")), o[r].prepend(o[s]), o.$el.addClass(i)
		} catch (a) {}
		return e()
	})
};
var latestKnownScrollY = 0,
	ticking = !1;
ScrollViewController.prototype.viewDidLoad = function() {
	function p() {
		a[o].y = latestKnownScrollY, a.isBottom(latestKnownScrollY), l(latestKnownScrollY), ticking = t
	}

	function d() {
		if (!ticking) try {
			f(p)
		} catch (e) {
			p()
		}
		ticking = i
	}
	var e = "pullToRefresh",
		t = !1,
		n = "$pullToRefresh",
		r = "isPulling",
		i = !0,
		s = "pulling",
		o = "scrollPosition",
		u = "updateHeightCaches",
		a = this;
	ViewController.prototype.viewDidLoad.call(a);
	var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame,
		l = function(e) {};
	if (a[e] && device.hasPullToRefresh() && !a.isLoading) {
		var c = t,
			h = a[n].children(".loader");
		l = function(e) {
			!a[r] && e < -65 ? (a[r] = i, a[n].addClass(s)) : a[r] && e > -65 && (a[r] = t, a[n].removeClass(s)), a[o].y < 0 && h.css("-webkit-transform", "scaleY(" + (e / -65).clamp(0, 1) + ")")
		}, a.$wrapper.bind("touchend", function(t) {
			if (a.isLoading) return;
			a[r] && (a.showLoadingIndicator(i), setTimeout(function() {
				a.emit(e)
			}, 500))
		})
	}
	a.$wrapper.bind("scroll", function(e) {
		latestKnownScrollY = e.target.scrollTop, d()
	}), $(window).on("resize", _.bind(a[u], a)), a.$content.on("DOMNodeInserted DOMNodeRemoved", _.bind(a[u], a))
}, ScrollViewController.prototype.updateHeightCaches = function() {
	var e = "cachedContentHeight";
	if (!this[e]) return;
	this[e] = !1, this.cachedWrapperHeight = this.$wrapper.height()
}, ScrollViewController.prototype.viewWillAppear = function() {
	var e = "savedScrollPosition",
		t = this;
	ViewController.prototype.viewWillAppear.call(t), device.hasNativeScrolling() && setTimeout(function() {
		t.isDisabled || (t.$el.removeClass("disabled"), t.$wrapper.get(0).style.cssText = ""), setTimeout(function() {
			t[e] && t.scrollTo(t[e])
		}, 0)
	}, 0)
}, ScrollViewController.prototype.viewDidAppear = function() {
	this.cachedWrapperHeight = this.$wrapper.height()
}, ScrollViewController.prototype.viewWillDisappear = function() {
	var e = "scrollPosition",
		t = this;
	ViewController.prototype.viewWillDisappear.call(t), t.savedScrollPosition = {
		x: t[e].x,
		y: t[e].y
	}
}, ScrollViewController.prototype.viewDidDisappear = function() {
	var e = this;
	ViewController.prototype.viewDidDisappear.call(e), device.hasNativeScrolling() && !e.isDisabled && (e.$el.addClass("disabled"), e.$wrapper.css("-webkit-transform", "translate3d(0, " + -e.scrollPosition.y + "px, 0)"))
}, ScrollViewController.prototype.scrollTo = function(e) {
	var t = "scrollPosition",
		n = this;
	n[t] = {
		x: e.x,
		y: e.y
	}, device.hasNativeScrolling() ? n.$wrapper.scrollTop(n[t].y) : n.$content.css("-webkit-transform", "translate3d(0, " + -n[t].y + "px, 0)")
}, ScrollViewController.prototype.scrollTop = function(e) {
	var t = "scrollPosition",
		n = this;
	if (e === undefined) return n[t].y;
	n.scrollTo({
		x: n[t].x,
		y: e
	})
}, ScrollViewController.prototype.scrollToTop = function() {
	var e = this;
	e.scrollTop(0)
}, ScrollViewController.prototype.scrollBottom = function(e) {
	var t = "getContentHeight",
		n = "cachedWrapperHeight",
		r = this;
	if (e === undefined) return r[t]() - (r.scrollTop() + r[n]);
	r.scrollTo({
		x: r.scrollPosition.x,
		y: r[t]() - (e + r[n])
	})
}, ScrollViewController.prototype.scrollToBottom = function() {
	var e = this;
	e.scrollTop(e.getContentHeight() - e.cachedWrapperHeight)
}, ScrollViewController.prototype.getContentHeight = function() {
	var e = "cachedContentHeight",
		t = this;
	return t[e] || (t[e] = t.$content.height()), t[e]
}, ScrollViewController.prototype.getContentWidth = function() {
	var e = this;
	return e.$content.width()
}, ScrollViewController.prototype.setContentOffset = function(e) {
	var t = this;
	device.hasNativeScrolling() && t.$content.css("-webkit-transform", "translate3d(0, " + e.y + "px, 0)")
}, ScrollViewController.prototype.showLoadingIndicator = function(e) {
	var t = "$pullToRefresh",
		n = this;
	if (n.isLoading) return;
	n.isLoading = !0, n.loadingStartTime = (new Date).getTime(), n.pullToRefresh && (device.hasPullToRefresh() && (n.isPulling = !1, n[t].removeClass("pulling"), e && (n.setContentOffset({
		y: 60
	}), n[t].addClass("pulled"))), n[t].addClass("loading"))
}, ScrollViewController.prototype.hideLoadingIndicator = function() {
	var e = "loadingStartTime",
		t = "removeClass",
		n = "$pullToRefresh",
		r = this;
	if (!r.isLoading) return;
	r.isLoading = !1;
	if (r.pullToRefresh)
		if (device.hasPullToRefresh()) {
			var i = ((new Date).getTime() - r[e]).clamp(0, 500);
			setTimeout(function() {
				r.setContentOffset({
					y: 0
				}), r[n][t]("loading pulled")
			}, i)
		} else r[n][t]("loading");
	r[e] = null
}, ScrollViewController.prototype.enableScrolling = function() {
	var e = this;
	e.isDisabled = !1, device.hasNativeScrolling() && e.$el.removeClass("disabled")
}, ScrollViewController.prototype.disableScrolling = function() {
	var e = this;
	e.isDisabled = !0, device.hasNativeScrolling() && e.$el.addClass("disabled")
}, ScrollViewController.prototype.isBottom = function(e) {
	var t = "lastScrollPos",
		n = this;
	e > n[t] && n.getContentHeight() && n.scrollBottom() < 240 && n.emit("scrolledToBottom"), n[t] = e
};