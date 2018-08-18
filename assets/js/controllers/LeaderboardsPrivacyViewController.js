function LeaderboardsPrivacyViewController(e) {
	this._name = "LeaderboardsPrivacyView", this._section = null, this.game = session.getActiveGame(), RefreshableViewController.call(this, e), this.location = {
		lat: e.lat,
		lng: e.lng
	}, this.pullToRefresh = !0, this.refreshButton = !1, this.title = locale.t("ID_MOBILE_LEADERBOARDS_PRIVACY_TITLE"), this.scrollViewTemplate = "LeaderboardsPrivacyView-scrollviewcontent"
}
var app = require("app"),
	assets = require("assets"),
	web = require("web"),
	util = require("util"),
	dom = require("dom"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = LeaderboardsPrivacyViewController, LeaderboardsPrivacyViewController.prototype = new RefreshableViewController, LeaderboardsPrivacyViewController.prototype.constructor = LeaderboardsPrivacyViewController, LeaderboardsPrivacyViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, LeaderboardsPrivacyViewController.prototype.viewDidAppear = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidAppear.call(e)
}, LeaderboardsPrivacyViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.$messages = $('<div class="messages"></div>'), e.scrollView.$content.prepend(e.$messages), e.bindEvents(), e.refresh()
}, LeaderboardsPrivacyViewController.prototype.bindEvents = function() {
	var e = ".selectrow",
		t = "selected",
		n = ".button.continue",
		r = "removeView",
		i = "navigationController",
		s = this;
	s.$(e).addClick(function() {
		$(e).removeClass(t), $(this).addClass(t), $("#privacy-bottomcontrols h2").hide(), $("#privacy-bottomcontrols h2." + $(this).data("selection")).show()
	}), s.$(n).addClick(function() {
		s.$(n).addClass("disabled");
		var e = "public";
		s.$(".selectrow.private").hasClass(t) && (e = "private");
		var o = session.getUserActivePersonaForGame(s.game);
		web.request("setleaderboardlocation", {
			game: s.game,
			platform: o.platform,
			personaId: o.personaId,
			lat: s.location.lat,
			lng: s.location.lng,
			privacy: e
		}, function(e, t) {
			app.go("LeaderboardsOverviewViewController", {}, function() {
				s[i][r](s);
				var e = s[i].getViewAtIndex(-2);
				e && e._name == "LeaderboardsOverviewView" && s[i][r](e)
			})
		})
	})
}, LeaderboardsPrivacyViewController.prototype.refresh = function(e) {
	var t = "isLoading";
	e || (e = function() {});
	var n = this;
	if (n[t]) return e("BUSY");
	n.showLoadingIndicator(), n[t] = !0, n.lastRefresh = new Date, n.$messages.empty(), n.hideLoadingIndicator(), n[t] = !1
};