function PlatoonMembersViewController(e) {
	e = e || {}, this._name = "PlatoonMembersView", this._section = null, this.game = session.getActiveGame(), this._clubId = e.clubId, ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_COMMON_MEMBERS"
}
var app = require("app"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	web = require("web"),
	storage = require("storage"),
	dom = require("dom"),
	template = require("template"),
	expansions = require("expansions"),
	assets = require("assets"),
	util = require("util"),
	events = require("events"),
	receipt = require("receipt"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = PlatoonMembersViewController, PlatoonMembersViewController.prototype = new ScrollableViewController, PlatoonMembersViewController.prototype.constructor = PlatoonMembersViewController, PlatoonMembersViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, PlatoonMembersViewController.prototype.refresh = function() {
	var e = this;
	web.request(e.game, "platoonmembers", {
		clubId: this._clubId
	}, function(t, n) {
		e.club = n, e.render(n), e.bindEvents()
	})
}, PlatoonMembersViewController.prototype.bindEvents = function() {
	var e = this;
	this.$content.find(".member").on("click", function(t) {
		var n = $(t.currentTarget),
			r = n.attr("data-type"),
			i = n.attr("data-userid"),
			s = _.find(e.club[r], function(e) {
				return e.userId == i
			});
		s && app.go("ProfileViewController", {
			section: !1,
			styleSection: enums.AppGameName[e.game],
			user: s.user
		})
	})
}, PlatoonMembersViewController.prototype.render = function(e) {
	var t = this,
		n = $(template.render("PlatoonMembersViewContent", e));
	t.$content.html(n)
};