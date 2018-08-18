function LeaderboardsListViewController(e) {
	this._name = "LeaderboardsListView", this._section = "bf3", ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_LEADERBOARDS", this.backButtonTitleSID = "ID_MOBILE_COMMON_BACK", this.templateBundle = null, this.template = null
}
var app = require("app"),
	enums = require("enums"),
	locale = require("locale"),
	util = require("util"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	gamedata = {
		bf3: {
			leaderboards: require("gamedata/bf3/leaderboards")
		}
	};
module.exports = LeaderboardsListViewController, LeaderboardsListViewController.prototype = new ScrollableViewController, LeaderboardsListViewController.constructor = LeaderboardsListViewController, LeaderboardsListViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.showList()
}, LeaderboardsListViewController.prototype.showList = function() {
	var e = "leaderboards",
		t = "append",
		n = "nameSID",
		r = "soldier",
		i = this,
		s = $("<div></div>");
	gamedata.bf3[e].leaderboardSections.forEach(function(i) {
		s[t]('<div class="sectionhead">' + locale.t(i[n]) + "</div>"), i[e].forEach(function(i) {
			var o = gamedata.bf3[e][e][r][i],
				u = $('<div class="sectionbutton"></div>');
			u.text(locale.t(o[n])), u.addClick(function(e) {
				app.go("LeaderboardViewController", {
					title: locale.t(o[n]),
					game: enums.Game.BF3,
					lb_category: r,
					lb_name: o.keyName
				})
			}), s[t](u)
		})
	}), i.scrollView.$content[t](s)
};