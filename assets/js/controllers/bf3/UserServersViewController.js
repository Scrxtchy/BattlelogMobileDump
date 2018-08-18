function UserServersViewController(e) {
	this._name = "UserServersView", this._section = "bf3", this.user = null, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_USER_SERVERS", this.isLoading = !1
}
var app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = UserServersViewController, UserServersViewController.prototype = new ScrollableViewController, UserServersViewController.constructor = UserServersViewController, UserServersViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, UserServersViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "scrollView",
		r = "find",
		i = "$content",
		s = "hidden",
		o = "append",
		u = "hideLoadingIndicator",
		a = !1;
	e || (e = function() {});
	var f = this;
	if (f[t]) return e("BUSY");
	f[n].showLoadingIndicator(), f[t] = !0, f.lastRefresh = new Date, web.request(enums.Game.BF3, "userservers", {
		userId: f.user.userId,
		platform: enums.Platform.PC,
		type: "favorite"
	}, function(l, c) {
		f[i][r](".section").addClass(s), f[i][r](".section .servers").empty(), f[i][r](".message").remove();
		if (l) return f[i][o](dom.error_row(locale.t("ID_MOBILE_PROFILE_SERVERS_ERROR"))), f[n][u](), f[t] = a, e();
		if (!c || !c.length) return f[i][o](dom.error_row(locale.t("ID_MOBILE_PROFILE_SERVERS_NOSERVERS"))), f[n][u](), f[t] = a, e();
		var h = $("<div></div>");
		c.forEach(function(e) {
			var t = dom.server_row(e);
			if (!t) return;
			t.addClick(function() {
				app.go("ServerViewController", {
					server: e
				})
			}), h[o](t)
		});
		var p = f[i][r](".section.bookmarks");
		return p[r](".items")[o](h), p.removeClass(s), f[n][u](), f[t] = a, e()
	})
};