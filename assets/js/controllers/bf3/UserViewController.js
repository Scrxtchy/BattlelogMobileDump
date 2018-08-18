function UserViewController(e) {
	this._name = "UserView", this._section = "bf3", this.user = null, ViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_USER"
}
var app = require("app"),
	dom = require("dom"),
	enums = require("enums"),
	locale = require("locale"),
	session = require("session"),
	web = require("web"),
	ViewController = require("controllers/ViewController"),
	SegmentedTabsController = require("controllers/SegmentedTabsController"),
	BattleFeedViewController = require("controllers/bf3/BattleFeedViewController"),
	UserProfileViewController = require("controllers/bf3/UserProfileViewController"),
	UserFriendsViewController = require("controllers/bf3/UserFriendsViewController"),
	UserServersViewController = require("controllers/bf3/UserServersViewController");
module.exports = UserViewController, UserViewController.prototype = new ViewController, UserViewController.constructor = UserViewController, UserViewController.prototype.loadView = function(e) {
	var t = "$user_row";
	e || (e = function() {});
	var n = this;
	ViewController.prototype.loadView.call(n, function() {
		n[t] = dom.user_row(n.user), n[t].append($('<div class="col-report"></div>')).addClick(function() {
			app.go("ReportAbuseViewController", {
				section: !1,
				type: "profile",
				profileId: n.user.userId
			})
		}), n.$c(".toolbar").append(n[t]), n.initSegmentedTabsView(function() {
			return e()
		})
	})
}, UserViewController.prototype.initSegmentedTabsView = function(e) {
	var t = "tabsView",
		n = this;
	n[t] = new SegmentedTabsController({
		parentViewController: n
	}), n.subviews.push(n[t]), n[t].loadView(function() {
		return n[t].setTabs([{
			tabitem: {
				titleSID: "ID_MOBILE_PROFILE_FEED"
			},
			viewcontroller: new BattleFeedViewController({
				user: n.user
			})
		}, {
			tabitem: {
				titleSID: "ID_MOBILE_PROFILE_PROFILE"
			},
			viewcontroller: new UserProfileViewController({
				user: n.user
			})
		}, {
			tabitem: {
				titleSID: "ID_MOBILE_PROFILE_FRIENDS"
			},
			viewcontroller: new UserFriendsViewController({
				user: n.user
			})
		}, {
			tabitem: {
				titleSID: "ID_MOBILE_PROFILE_SERVERS"
			},
			viewcontroller: new UserServersViewController({
				user: n.user
			})
		}]), n.$el.append(n[t].$el), e()
	})
}, UserViewController.prototype.viewDidLoad = function() {
	var e = this;
	ViewController.prototype.viewDidLoad.call(e), e.loadFriendStatus()
}, UserViewController.prototype.loadFriendStatus = function(e) {
	var t = "userId",
		n = "user",
		r = "request",
		i = "$user_row",
		s = "friendstatus",
		o = "FriendStatus",
		u = '<div class="actions">',
		a = "</div>",
		f = "append",
		l = "loadFriendStatus",
		c = "addClick",
		h = "children",
		p = "stopPropagation",
		d = '<div class="loading"></div>';
	e || (e = function() {});
	var v = this;
	if (!session.isLoggedIn() || session.getUserId() == v[n][t]) return;
	web[r]("userfriendstatus", {
		userId: v[n][t]
	}, function(m, g) {
		v[i].find("div.actions").remove();
		if (m) return e(m);
		var y;
		if (g[s] != enums[o].ACCEPTED)
			if (g[s] == enums[o].OUTGOING) y = $(u + '<div class="message">' + locale.t("ID_WEB_SHOWRECEIPT_FRIEND_REQUEST_SENT") + a + a), v[i][f](y);
			else if (g[s] == enums[o].INCOMING) {
			y = $(u + '<a class="button green accept"><span class="button-icon accept"></span></a>' + '<a class="button deny"><span class="button-icon deny"></span></a>' + a);
			var b = function(e, t) {
				e && app.error(e), v[l]()
			};
			y[h](".accept")[c](function(e) {
				e[p](), y.empty()[f](d), web[r]("acceptfriendrequest", {
					userId: v[n][t]
				}, b)
			}), y[h](".deny")[c](function(e) {
				e[p](), y.empty()[f](d), web[r]("denyfriendrequest", {
					userId: v[n][t]
				}, b)
			}), v[i][f](y)
		} else g[s] == enums[o].NONE && (y = $(u + '<a class="button small sendfriendrequest">' + locale.t("ID_WEB_PROFILE_ADD_FRIEND") + "</a>" + a), y[h](".sendfriendrequest")[c](function(e) {
			e[p](), y.empty()[f](d), web[r]("sendfriendrequest", {
				userId: v[n][t]
			}, function(e, t) {
				return e && app.error(e), v[l]()
			})
		}), v[i][f](y));
		return e()
	})
};