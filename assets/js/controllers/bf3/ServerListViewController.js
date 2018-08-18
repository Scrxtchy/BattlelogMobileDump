function ServerListViewController(e) {
	this._name = "ServerListView", this._section = "bf3", this.game = enums.Game.BF3, this.platform = enums.Platform.PC, ListContentViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_SERVER_LIST", this.title = "Servers", this.template = null, this.canRefresh = !0, this.canLoadMore = !0, this.itemsPerPage = 5
}
var app = require("app"),
	assets = require("assets"),
	dom = require("dom"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	util = require("util"),
	web = require("web"),
	ListContentViewController = require("controllers/ListContentViewController");
module.exports = ServerListViewController, ServerListViewController.prototype = new ListContentViewController, ServerListViewController.prototype.constructor = ServerListViewController, ServerListViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ListContentViewController.prototype.loadView.call(t, function() {
		return t.$servers = $('<div class="section servers"></div>'), t.$listContent.append(t.$servers), e()
	})
}, ServerListViewController.prototype.viewDidLoad = function() {
	var e = this;
	ListContentViewController.prototype.viewDidLoad.call(e), e.refresh()
}, ServerListViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "scrollView",
		r = "append",
		i = "$listContent",
		s = "hideLoadingIndicator",
		o = !1;
	e || (e = function() {});
	var u = this;
	if (u[t]) return e("BUSY");
	u[n].showLoadingIndicator(), u[t] = !0, u.lastRefresh = new Date, web.request(u.game, "serverlist", {
		platform: u.platform
	}, function(a, f) {
		if (a) return u[i][r](dom.error_row(locale.t("ID_MOBILE_SERVERLIST_ERROR"))), u[n][s](), u[t] = o, e();
		if (!f.servers.length) return u[i][r](dom.error_row(locale.t("ID_MOBILE_SERVERLIST_NOSERVERS"))), u[n][s](), u[t] = o, e();
		var l = $("<div></div>");
		return f.servers.forEach(function(e) {
			var t = $(template.render("ServerListView-server", {
				serverImage: "images/" + enums.Game.toString(u.game) + "/maps/" + e.map.toLowerCase() + ".jpg",
				server: e
			}));
			t.addClick(function() {
				app.go("ServerViewController", {
					server: e
				})
			}), l[r](t)
		}), u.$servers[r](l), u[n][s](), u.pagesLoaded = 1, u[t] = o, u.getShouldLoadMore() && u.loadMore(), e()
	})
}, ServerListViewController.prototype.loadMore = function(e) {
	var t = "isLoading",
		n = !0,
		r = "pagesLoaded",
		i = "$bottomLoading",
		s = "hidden",
		o = "reachedLastPage",
		u = !1;
	e || (e = function() {});
	var a = this;
	if (a[t]) return e("BUSY");
	a[t] = n, web.request(a.game, "serverlist", {
		platform: a.platform,
		start: a[r] * a.itemsPerPage
	}, function(f, l) {
		a[i].addClass(s);
		if (f) return a[o] = n, a[t] = u, e();
		if (!l.servers.length) return a[o] = n, a[t] = u, e();
		var c = $("<div></div>");
		return l.servers.forEach(function(e) {
			var t = $(template.render("ServerListView-server", {
				serverImage: "images/" + enums.Game.toString(a.game) + "/maps/" + e.map.toLowerCase() + ".jpg",
				server: e
			}));
			t.addClick(function() {
				app.go("ServerViewController", {
					server: e
				})
			}), c.append(t)
		}), a.$servers.append(c), a[i].removeClass(s), a[r]++, a[t] = u, a.getShouldLoadMore() && a.loadMore(), e()
	})
};