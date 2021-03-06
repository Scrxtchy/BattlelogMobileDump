function ServerViewController(e) {
	this._name = "ServerView", this._section = "bf3", this.game = null, this.guid = null, this.server = null, ViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_SERVER"
}
var locale = require("locale"),
	dom = require("dom"),
	web = require("web"),
	ViewController = require("controllers/ViewController"),
	SegmentedTabsController = require("controllers/SegmentedTabsController"),
	ServerInfoViewController = require("controllers/bf3/ServerInfoViewController"),
	ServerMaplistViewController = require("controllers/bf3/ServerMaplistViewController"),
	ServerPlayersViewController = require("controllers/bf3/ServerPlayersViewController");
module.exports = ServerViewController, ServerViewController.prototype = new ViewController, ServerViewController.constructor = ServerViewController, ServerViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ViewController.prototype.loadView.call(t, function() {
		t.$toolbar = t.$c(".toolbar"), t.initSegmentedTabsView(function() {
			return e()
		})
	})
}, ServerViewController.prototype.initSegmentedTabsView = function(e) {
	var t = "tabsView",
		n = "server";
	e || (e = function() {});
	var r = this;
	r[t] = new SegmentedTabsController({
		parentViewController: r
	}), r.subviews.push(r[t]), r[t].init(function() {
		return r[t].setTabs([{
			tabitem: {
				titleSID: "ID_MOBILE_SERVER_INFO"
			},
			viewcontroller: new ServerInfoViewController({
				server: r[n]
			})
		}, {
			tabitem: {
				titleSID: "ID_MOBILE_SERVER_MAPLIST"
			},
			viewcontroller: new ServerMaplistViewController({
				server: r[n]
			})
		}, {
			tabitem: {
				titleSID: "ID_MOBILE_SERVER_PLAYERS"
			},
			viewcontroller: new ServerPlayersViewController({
				server: r[n]
			})
		}]), r[t].viewWillAppear(), r.$el.append(r[t].$el), r[t].viewDidAppear(), e()
	})
}, ServerViewController.prototype.viewDidLoad = function() {
	var e = "server",
		t = "append",
		n = "$toolbar",
		r = "server_row",
		i = "updateData",
		s = "viewcontroller",
		o = this;
	ViewController.prototype.viewDidLoad.call(o), o[e] && o[n][t](dom[r](o[e]));
	var u = o[e] ? o[e].game : o.game,
		a = o[e] ? o[e].guid : o.guid;
	web.request(u, "serverinfo", {
		guid: a
	}, function(e, u) {
		o[n].empty();
		if (e) {
			o[n][t](dom.error_row(locale.t("ID_MOBILE_SERVER_ERROR")));
			return
		}
		o[n][t](dom[r](u.info)), o.tabsView.tabs.forEach(function(e) {
			if (!e[s][i]) return;
			e[s][i]({
				server: u.info,
				players: u.players
			})
		})
	})
};