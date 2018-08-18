function ProfileFriendsViewController(e) {
	this._name = "ProfileFriendsView", this._section = null, this.game = session.getActiveGame(), ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_PROFILE", this.title = "Friends"
}
var app = require("app"),
	dom = require("dom"),
	web = require("web"),
	util = require("util"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	assets = require("assets"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = ProfileFriendsViewController, ProfileFriendsViewController.prototype = new ScrollableViewController, ProfileFriendsViewController.constructor = ProfileFriendsViewController, ProfileFriendsViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	t.mergedFriends = t.mutualFriends.concat(t.friends), ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, ProfileFriendsViewController.prototype.viewDidLoad = function() {
	var e = "toLowerCase",
		t = "index",
		n = this,
		r = n.mergedFriends.sort(function(t, n) {
			return t.username[e]() < n.username[e]() ? -1 : 1
		});
	for (var i in r) {
		var s = $(template.render("profile_friend_row", r[i])),
			o = dom.user_avatar(r[i]);
		s.find(".avatar").html(o), n.$(".section.friends").append(s), s.data(t, i).addClick(function() {
			app.go("ProfileViewController", {
				section: !1,
				user: r[n.$(this).data(t)]
			})
		}), n.$(".button.addfriend").data(t, i).addClick(function() {
			web.request(n.game, "sendfriendrequest", {
				userId: r[n.$(this).data(t)].userId
			}, function(e, t) {})
		})
	}
	ScrollableViewController.prototype.viewDidLoad.call(n)
};