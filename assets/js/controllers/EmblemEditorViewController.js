function EmblemEditorViewController(e) {
	if (!device.isTablet()) return;
	this._name = "EmblemEditorView", ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_COMMON_BATTLEFIELD_4", this.activePersona = null, this.emblem = null
}
var device = require("device"),
	web = require("web"),
	session = require("session"),
	EmblemClass = require("emblemclass"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = EmblemEditorViewController, EmblemEditorViewController.prototype = new ScrollableViewController, EmblemEditorViewController.prototype.constructor = EmblemEditorViewController, EmblemEditorViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	t.activePersona = session.getUserActivePersonaForGame(t.game), ScrollableViewController.prototype.loadView.call(t, function() {
		var n = t.$("#emblem-canvas")[0];
		return t.emblem = new EmblemClass(n, null, "%SRC%", 480), t.emblem.controlsSize = 24, e()
	})
}, EmblemEditorViewController.prototype.viewDidLoad = function() {
	var e = null,
		t = "activePersona",
		n = "emblem",
		r = "platoonBadgeData",
		i = "jsonShapeData",
		s = this;
	web.request("emblemedit", {
		type: "personal",
		emblemId: e,
		personaId: s[t].personaId,
		platform: s[t].platform
	}, function(t, o) {
		function u() {
			function r() {
				t && !s[n].data.background && s[n].setBackground(t)
			}
			var t = e;
			r()
		}
		if (t) {
			console.error("Could not load emblem editor", t);
			return
		}
		s[n].emblemObjectsData = o.badgeParts, o.legacyEmblem && o[r] ? (console.info("Loading emblem v1"), s[n].loadLegacy(o[r], u)) : o[n] && o[n][i] ? (console.info("Loading emblem v2"), s[n].load(o[n][i], u)) : (console.info("Loading empty emblem v2"), s[n].load(e, u))
	}), ScrollableViewController.prototype.viewDidLoad.call(s)
};