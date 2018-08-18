function AssignmentDetailViewController(e) {
	this._name = "AssignmentDetailView", this._section = "bf3", this.mission = null, this.gameExpansion = null, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_ASSIGNMENT"
}
var locale = require("locale"),
	global = require("global-bf3"),
	util = require("util"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = AssignmentDetailViewController, AssignmentDetailViewController.prototype = new ScrollableViewController, AssignmentDetailViewController.constructor = AssignmentDetailViewController, AssignmentDetailViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.loadAssignmentInfo()
}, AssignmentDetailViewController.prototype.loadAssignmentInfo = function() {
	var e = "find",
		t = "$content",
		n = "mission",
		r = "completed",
		i = "append",
		s = "removeClass",
		o = ".section.info",
		u = "hidden",
		a = "</div>",
		f = "lockedReason",
		l = "formatStatValue",
		c = "completion",
		h = this;
	h[t][e](".assignment-name").text(locale.t(h[n].stringID)), h[n][r] && h[t][e](o)[s](u)[i]('<div class="sectionmessage"><span class="assignment-status-icon completed"></span> ' + locale.t("ID_MOBILE_ASSIGNMENT_DETAIL_COMPLETED") + a);
	var p = h[n].imageName;
	h[n].locked && (p = "locked", h[n][f] && h[t][e](o)[i]('<div class="sectionmessage">' + h[n][f] + a)[s](u)), h[t][e](".assignment-image")[i]('<div class="item-image assignment large _' + p + '"></div>'), h[n].criterias.forEach(function(n) {
		var s = null;
		n.unit == "time_hours" && (s = "time");
		var o = $('<div class="objective"><div class="label">' + locale.t(n.descriptionID) + a + '<div class="value">' + util[l](n.actualValue, s) + " / " + util[l](n.completionValue, s) + a + '<div class="progress" style="-webkit-transform: scaleX(' + n[c] / 100 + ')"></div>' + a);
		n[c] >= 100 && o[e](".progress").addClass(r), h[t][e](".objectives .items")[i](o)
	}), h[n].upcomingUnlocks.forEach(function(n) {
		var r = global.bf3_upcomingUnlock_row(n);
		if (!r) return;
		h[t][e](".rewards .items")[i](r)
	})
};