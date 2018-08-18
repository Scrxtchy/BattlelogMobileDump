function UsageSharingViewController(e) {
	var t = "UsageSharingView";
	this._name = t, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_USAGESHARING", this.scrollViewTemplate = t
}
var app = require("app"),
	device = require("device"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = UsageSharingViewController, UsageSharingViewController.prototype = new ScrollableViewController, UsageSharingViewController.constructor = UsageSharingViewController, UsageSharingViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.bindEvents(), e.refresh()
}, UsageSharingViewController.prototype.bindEvents = function() {
	var e = "find",
		t = "$content",
		n = ".settingrow.usagesharing .segmentedcontrol a",
		r = "usageSharingEnabled",
		i = "appInfo",
		s = "removeClass",
		o = "selected",
		u = "hidden",
		a = this;
	a[t][e](n).addClick(function() {
		var f = $(this),
			l = f.data("value") == "yes";
		if (l == device[i][r]) return;
		a[t][e](n)[s](o), f.addClass(o), a[t][e](".usagesharing-message").addClass(u), l ? a[t][e](".usagesharing-message.enabled")[s](u) : a[t][e](".usagesharing-message.disabled")[s](u), device[i][r] = l, device.cmd("setUsageSharingEnabled", {
			usageSharingEnabled: device[i][r]
		})
	})
}, UsageSharingViewController.prototype.refresh = function() {
	var e = "removeClass",
		t = "$content",
		n = "hidden",
		r = "selected",
		i = this;
	device.appInfo.usageSharingEnabled ? (i[t].find(".usagesharing-message.enabled")[e](n), i[t].find('.settingrow.usagesharing .segmentedcontrol a[data-value="yes"]').addClass(r)) : (i[t].find(".usagesharing-message.disabled")[e](n), i[t].find('.settingrow.usagesharing .segmentedcontrol a[data-value="no"]').addClass(r))
};