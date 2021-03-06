function UserFriendsViewController(e) {
	this._name = "UserFriendsView", this._section = "bf3", this.user = null, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_USER_FRIENDS", this.isLoading = !1
}
var app = require("app"),
	dom = require("dom"),
	locale = require("locale"),
	util = require("util"),
	web = require("web"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = UserFriendsViewController, UserFriendsViewController.prototype = new ScrollableViewController, UserFriendsViewController.constructor = UserFriendsViewController, UserFriendsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, UserFriendsViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "scrollView",
		r = "addClass",
		i = "find",
		s = "$content",
		o = "hidden",
		u = ".section.other .sectionhead",
		a = "append",
		f = "hideLoadingIndicator",
		l = !1,
		c = "length",
		h = "mutualfriends",
		p = "mutual",
		d = "removeClass";
	e || (e = function() {});
	var v = this;
	if (v[t]) return e("BUSY");
	v[n].showLoadingIndicator(), v[t] = !0, v.lastRefresh = new Date, web.request("userfriends", {
		userId: v.user.userId
	}, function(m, g) {
		v[s][i](".section")[r](o), v[s][i](".section .friends").empty(), v[s][i](u)[r](o), v[s][i](".sectionerror").remove();
		if (m) return v[s][a](dom.error_row(locale.t("ID_MOBILE_PROFILE_FRIENDS_ERROR"))), v[n][f](), v[t] = l, e();
		if (!g[h][c] && !g.friends[c]) return v[s][a](dom.error_row(locale.t("ID_MOBILE_PROFILE_FRIENDS_NOFRIENDS"))), v[n][f](), v[t] = l, e();
		var y = {
			mutual: [],
			other: []
		};
		y[p] = g[h], y[p].sort(util.userPresenceSort), y.other = g.friends, y.other.sort(util.userNameSort);
		for (var b in y) {
			if (!y.hasOwnProperty(b)) continue;
			if (!y[b][c]) continue;
			var w = $("<div></div>");
			y[b].forEach(function(e) {
				var t = dom.user_row(e);
				t[r]("hidestatus"), t.addClick(function(t) {
					app.go("UserViewController", {
						user: e
					})
				}), w[a](t)
			});
			var E = v[s][i](".section." + b);
			E[i](".sectionhead .count").text(y[b][c]), E[i](".friends")[a](w), E[d](o)
		}
		return y[p][c] && y.other[c] && v[s][i](u)[d](o), v[n][f](), v[t] = l, e()
	})
};