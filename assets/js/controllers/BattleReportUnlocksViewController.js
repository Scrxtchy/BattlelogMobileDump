function BattleReportUnlocksViewController(e) {
	this._name = "BattleReportUnlocksView", this._section = null, this.game = session.getActiveGame(), this.gameName = enums.AppGameName[this.game], ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_BATTLEREPORT_AWARDS"
}
var app = require("app"),
	template = require("template"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = BattleReportUnlocksViewController, BattleReportUnlocksViewController.prototype = new ScrollableViewController, BattleReportUnlocksViewController.prototype.constructor = BattleReportUnlocksViewController, BattleReportUnlocksViewController.prototype.bind_events = function() {
	var e = "addClick",
		t = "attr",
		n = "data-guid",
		r = "ItemViewController",
		i = "gameName",
		s = this;
	s.$("[data-category='vehiclespecs']")[e](function() {
		var e = $(this)[t](n);
		app.go(r, {
			section: s[i],
			type: "vehicleunlock",
			guid: e
		})
	}), s.$("[data-category='weapons']")[e](function() {
		var e = $(this)[t](n);
		app.go(r, {
			section: s[i],
			type: "weapon",
			guid: e
		})
	}), s.$("[data-category='awards']")[e](function() {
		var e = $(this)[t]("data-code");
		app.go(r, {
			section: s[i],
			type: "award",
			code: e
		})
	}), s.$("[data-category='weaponaddons']")[e](function() {
		var e = $(this)[t](n),
			o = $(this)[t]("data-parentsid");
		app.go(r, {
			section: s[i],
			type: "weaponaccessory",
			parentSID: o,
			guid: e
		})
	}), s.$("[data-category='dogtags']")[e](function() {
		var e = $(this)[t]("data-index"),
			n = $(this)[t]("data-type");
		app.go(r, {
			section: s[i],
			type: "dogtag",
			index: e,
			tag_type: n
		})
	})
}, BattleReportUnlocksViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, BattleReportUnlocksViewController.prototype.viewDidLoad = function(e) {
	var t = "awards",
		n = "toUpperCase";
	e || (e = function() {});
	var r = this,
		i = "";
	ScrollableViewController.prototype.viewDidLoad.call(r);
	var s = ["gadgets", "weapons", t, "weaponaddons", "vehiclespecs", "dogtags"];
	s.forEach(function(e) {
		var s = r[e];
		e == t && (s = _.filter(s, function(e) {
			return e.group != "AwardGroup_Mission"
		}));
		if (s && s.length) {
			var o = "ID_WEB_BATTLEREPORT_UNLOCKS_" + e[n]();
			e[n]() == "DOGTAGS" && r.game == enums.Game.OMAHA && (o = "ID_WEB_COMMON_STATS_PATCHES"), i += template.render("BattleReportUnlocksView_cat", {
				nameSID: o,
				items: s,
				unlockCategory: e
			})
		}
	}), r.$content.html(i), r.bind_events()
};