function RootViewController(e) {
	var t = null;
	this._name = "RootView", ViewController.call(this, e), this.templateBundle = t, this.template = t, this.mainView = t, this.gameStatus = t, this.notificationBar = t, this.comcenter = t
}
var async = require("lib/async"), app = require("app"), events = require("events"), enums = require("enums"), session = require("session"), storage = require("storage"), web = require("web"), ViewController = require("controllers/ViewController"), DrawerController = require("controllers/DrawerController"), GameStatusViewController = require("controllers/GameStatusViewController");
module.exports = RootViewController, RootViewController.prototype = new ViewController, RootViewController.prototype.constructor = RootViewController, RootViewController.prototype.loadView = function(e) {
	var t = "mainView",
		n = "gameStatus",
		r = "notificationBar",
		i = "$centerView",
		s = this;
	ViewController.prototype.loadView.call(s, function() {
		s[t] = new DrawerController({
			parentViewController: s
		}), s.subviews.push(s[t]), s[n] = new GameStatusViewController({
			parentViewController: s[t]
		}), s[t].subviews.push(s[n]), async.series([function(e) {
			async.parallel([function(e) {
				s[t].init(e)
			}, function(e) {
				s[n].init(e)
			}], e)
		}, function(e) {
			require(["controllers/NotificationBarViewController"], function(t) {
				s[r] = new t, s[r].init(e)
			})
		}, function(e) {
			async.parallel([function(e) {
				s[t].setLeftViewWithNameParams("DrawerNavViewController", {}, e)
			}, function(e) {
				s[t].setRightViewWithNameParams("DrawerComCenterViewController", {}, function(t, n) {
					s.comcenter = n, e()
				})
			}], e)
		}], function() {
			return s[t].$center.append(s[n].$el), s.$el.append(s[t].$el), s[n].bind("didShow", function() {
				s[t][i].stop().animate({
					bottom: s[n]._height
				}, 500)
			}), s[n].bind("didHide", function() {
				s[t][i].stop().animate({
					bottom: 0
				}, 500)
			}), e()
		})
	})
}, RootViewController.prototype.go = function(e, t, n) {
	var r = this;
	r.mainView.go(e, t, n)
};