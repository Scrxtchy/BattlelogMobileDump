function NotificationsViewController(e) {
	this._name = "NotificationsView", this._section = "warsaw", this.game = enums.Game.WARSAW, RefreshableViewController.call(this, e), this.title = "Notifications", this.scrollViewTemplate = "NotificationsView-scrollviewcontent"
}
var app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	template = require("template"),
	RefreshableViewController = require("controllers/RefreshableViewController"),
	notificationTypes = {
		friendrequestaccepted: {
			actionSID: "ID_WEB_NOTIFICATION_x_ACCEPTED_FRIEND_REQUEST"
		},
		friendrequestdeclined: {
			actionSID: "ID_WEB_NOTIFICATION_x_DECLINED_FRIEND_REQUEST"
		},
		wallpostcreated: {
			actionSID: "ID_WEB_NOTIFICATION_WROTE_IN_YOUR"
		},
		feedcomment: {
			actionSID: "ID_WEB_NOTIFICATION_x_COMMENTED_ON_YOUR_x"
		},
		feedcommentreply: {
			actionSID: "ID_WEB_NOTIFICATION_x_ALSO_COMMENTED_ON_YOUR_x",
			actionSID2: "ID_WEB_NOTIFICATION_x_ALSO_COMMENTED_ON_yS_x"
		},
		feedlike: {
			actionSID: "ID_WEB_NOTIFICATION_x_HOOAHS_YOUR_y"
		}
	};
module.exports = NotificationsViewController, NotificationsViewController.prototype = new RefreshableViewController, NotificationsViewController.prototype.constructor = NotificationsViewController, NotificationsViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return t.$notifications = t.$(".section.notifications"), e()
	})
}, NotificationsViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, NotificationsViewController.prototype.refresh = function(e) {
	var t = "notifications",
		n = "$notifications";
	e || (e = function() {});
	var r = this;
	web.request(r.game, t, {}, function(i, s) {
		r[n].empty();
		if (i) return;
		if (!s[t].length) return;
		var o = $("<div></div>");
		return s[t].forEach(function(e, t) {
			var n = $(template.render("NotificationsView-notification", {
				notification: e,
				notificationTypes: notificationTypes
			}));
			o.append(n)
		}), r[n].append(o), e()
	})
};