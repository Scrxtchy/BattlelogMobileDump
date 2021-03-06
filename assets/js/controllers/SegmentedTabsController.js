function SegmentedTabsController(e) {
	var t = "SegmentedTabsView";
	this._name = t, this.tabsOnBottom = !1, ViewController.call(this, e), this.templateBundle = t, this.css = t, this.css_android = "SegmentedTabsView_android", this.tabs = [], this.selectedIndex = null
}
var locale = require("locale"),
	ViewController = require("controllers/ViewController");
module.exports = SegmentedTabsController, SegmentedTabsController.prototype = new ViewController, SegmentedTabsController.prototype.constructor = SegmentedTabsController, SegmentedTabsController.prototype.loadView = function(e) {
	var t = "tabsOnBottom";
	e || (e = function() {});
	var n = this;
	ViewController.prototype.loadView.call(n, function() {
		return n.$view = n.$c(".view"), n.$segmentedcontrol = n.$(".toolbar .segmentedcontrol"), n[t] && n.$el.addClass(t), e()
	})
}, SegmentedTabsController.prototype.viewWillAppear = function() {
	var e = "viewWillAppear",
		t = "viewcontroller",
		n = this;
	ViewController.prototype[e].call(n);
	var r = n.tabs[n.selectedIndex];
	if (!r || !r[t].hasLoaded) return;
	r[t][e]()
}, SegmentedTabsController.prototype.viewDidAppear = function() {
	var e = "viewDidAppear",
		t = "viewcontroller",
		n = this;
	ViewController.prototype[e].call(n);
	var r = n.tabs[n.selectedIndex];
	if (!r || !r[t].hasLoaded) return;
	r[t][e]()
}, SegmentedTabsController.prototype.viewWillDisappear = function() {
	var e = "viewWillDisappear",
		t = "viewcontroller",
		n = this;
	ViewController.prototype[e].call(n);
	var r = n.tabs[n.selectedIndex];
	if (!r || !r[t].hasLoaded) return;
	r[t][e]()
}, SegmentedTabsController.prototype.viewDidDisappear = function() {
	var e = "viewDidDisappear",
		t = "viewcontroller",
		n = this;
	ViewController.prototype[e].call(n);
	var r = n.tabs[n.selectedIndex];
	if (!r || !r[t].hasLoaded) return;
	r[t][e]()
}, SegmentedTabsController.prototype.setTabs = function(e) {
	var t = "$segmentedcontrol",
		n = "tabitem",
		r = "setSelectedIndex",
		i = this;
	i.tabs = [], i.selectedIndex = null, i[t].empty(), i.$view.empty(), e.forEach(function(e, s) {
		e.viewcontroller.parentViewController = i, e[n].$el = $("<a></a>"), e[n].title ? e[n].$el.text(e[n].title) : e[n].titleSID && e[n].$el.text(locale.t(e[n].titleSID)), e[n].$el.addClick(function() {
			i[r](s)
		}), i[t].append(e[n].$el), i.tabs.push(e)
	}), i[r](0)
}, SegmentedTabsController.prototype.setSelectedIndex = function(e) {
	var t = "selectedIndex",
		n = "popToRootView",
		r = "viewcontroller",
		i = "selected",
		s = this;
	if (s[t] !== null) {
		var o = s.tabs[s[t]];
		if (s[t] == e) {
			n in o[r] && o[r][n]();
			return
		}
		o.tabitem.$el.removeClass(i)
	}
	s[t] = e;
	var u = s.tabs[e];
	u.tabitem.$el.addClass(i), u[r].init(function() {
		o && o[r].viewWillDisappear(), u[r].viewWillAppear(), s.$view.empty().append(u[r].$el), o && o[r].viewDidDisappear(), u[r].viewDidAppear()
	})
};