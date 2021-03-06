function UserServerListViewController(e) {
	var t = null;
	this._name = "UserServerListView", this._section = "warsaw", this.game = t, this.platform = t, this.userId = t, this.listType = t, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_SERVER_BROWSER", this.title = "Server Browser", this.templateBundle = t, this.template = t
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
	levels = require("gamedata/warsaw/levels"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = UserServerListViewController, UserServerListViewController.prototype = new RefreshableViewController, UserServerListViewController.prototype.constructor = UserServerListViewController, UserServerListViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, UserServerListViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "scrollView",
		r = "$content",
		i = "append",
		s = "hideLoadingIndicator",
		o = !1;
	e || (e = function() {});
	var u = this;
	if (u[t]) return e("BUSY");
	u[n].showLoadingIndicator(), u[t] = !0, u.lastRefresh = new Date, web.request(u.game, "userservers", {
		platform: u.platform,
		userId: u.userId,
		type: u.listType
	}, function(a, f) {
		u[n][r].empty();
		if (a) return u[n][r][i](dom.error_row(locale.t("ID_MOBILE_SERVERLIST_ERROR"))), u[n][s](), u[t] = o, e();
		if (!f.length) return u[n][r][i]('<div class="sectionmessage">' + locale.t("ID_MOBILE_SERVERLIST_NOSERVERS") + "</div>"), u[n][s](), u[t] = o, e();
		var l = $("<div></div>");
		return f.forEach(function(e) {
			var t = $(template.render("server_row", {
				serverImage: "images/" + enums.Game.toString(u.game) + "/maps/" + e.map.toLowerCase() + ".jpg",
				server: e,
				mapSID: levels.levels[e.map] ? levels.levels[e.map].label : "Unknown"
			}));
			t.addClick(function() {
				app.go("ServerViewController", {
					server: e
				})
			}), l[i](t)
		}), u[n][r][i](l), u[n][s](), u[t] = o, e()
	})
};