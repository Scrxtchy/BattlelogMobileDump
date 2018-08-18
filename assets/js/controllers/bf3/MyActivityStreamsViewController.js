function MyActivityStreamsViewController(e) {
	var t = null;
	this._name = "MyActivityStreamsView", this._section = "bf3", this.game = t, this.platform = t, ViewController.call(this, e), this.titleSID = "ID_WEB_ACTIVITYSTREAM_ACTIVITY_TITLE", this.templateBundle = t, this.template = t
}
var session = require("session"),
	util = require("util"),
	locale = require("locale"),
	ViewController = require("controllers/ViewController"),
	SegmentedTabsController = require("controllers/SegmentedTabsController"),
	ActivityStreamViewController = require("controllers/bf3/ActivityStreamViewController");
module.exports = MyActivityStreamsViewController, MyActivityStreamsViewController.prototype = new ViewController, MyActivityStreamsViewController.constructor = MyActivityStreamsViewController, MyActivityStreamsViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this,
		n = session.getUserActivePersonaForGame(t.game);
	t.platform = n.platform, ViewController.prototype.loadView.call(t, function() {
		t.initSegmentedTabsView(function() {
			return e()
		})
	})
}, MyActivityStreamsViewController.prototype.initSegmentedTabsView = function(e) {
	var t = "tabsView",
		n = this;
	n[t] = new SegmentedTabsController({
		parentViewController: n
	}), n.subviews.push(n[t]), n[t].init(function() {
		return n[t].setTabs([{
			tabitem: {
				title: locale.t("ID_WEB_COMMON_YOU")
			},
			viewcontroller: new ActivityStreamViewController({
				game: n.game,
				platform: n.platform,
				user: session.tokenInfo.user
			})
		}, {
			tabitem: {
				title: locale.t("ID_WEB_PROFILE_DOGTAGS_FILTER_ALL")
			},
			viewcontroller: new ActivityStreamViewController({
				game: n.game,
				platform: n.platform
			})
		}]), n.$el.append(n[t].$el), e()
	})
};