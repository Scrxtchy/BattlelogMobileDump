function SettingsViewController(e) {
	this._name = "SettingsView", ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_SETTINGS"
}
var app = require("app"),
	enums = require("enums"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = SettingsViewController, SettingsViewController.prototype = new ScrollableViewController, SettingsViewController.constructor = SettingsViewController, SettingsViewController.prototype.viewDidLoad = function() {
		var e = this,
			t = session.getActiveGame(),
			n = session.getUserActivePersonaForGame(t);
		ScrollableViewController.prototype.viewDidLoad.call(e), e.bindEvents(), (t == enums.Game.BF3 || (t == enums.Game.WARSAW || t == enums.Game.OMAHA) && !n) && e.$content.find(".sectionbutton").not(".selectgame").addClass("hidden")
	},
	function() {
		var e = "addClick",
			t = "find",
			n = "$content",
			r = "SelectSettingsViewController";
		SettingsViewController.prototype.bindEvents = function() {
			this[n][t](".sectionbutton.selectsoldier")[e](function() {
				app.go("SelectSoldierViewController")
			}), this[n][t](".sectionbutton.selectgame")[e](function() {
				app.go("SelectGameViewController")
			}), this[n][t](".sectionbutton.selectportrait")[e](function() {
				app.go(r, {
					type: "portraits"
				})
			}), this[n][t](".sectionbutton.selectprivacy")[e](function() {
				app.go(r, {
					type: "privacy"
				})
			}), this[n][t](".sectionbutton.selectemblem")[e](function() {
				app.go(r, {
					type: "emblem"
				})
			}), this[n][t](".sectionbutton.selecttag")[e](function() {
				app.go(r, {
					type: "tag"
				})
			}), this[n][t](".sectionbutton.selectpresentation")[e](function() {
				app.go(r, {
					type: "presentation"
				})
			}), this[n][t](".sectionbutton.selectpushnotifications")[e](function() {
				app.go(r, {
					type: "pushnotifications"
				})
			})
		}
	}();