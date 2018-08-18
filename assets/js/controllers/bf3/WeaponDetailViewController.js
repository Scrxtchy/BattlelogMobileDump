function WeaponDetailViewController(e) {
	this._name = "WeaponDetailView", this._section = "bf3", this.itemStats = null, ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_COMMON_WEAPON"
}
var locale = require("locale"),
	util = require("util"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = WeaponDetailViewController, WeaponDetailViewController.prototype = new ScrollableViewController, WeaponDetailViewController.constructor = WeaponDetailViewController, WeaponDetailViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.showItemInfo()
}, WeaponDetailViewController.prototype.showItemInfo = function() {
	var e = "find",
		t = "$content",
		n = "weapon",
		r = "itemStats",
		i = "append",
		s = ".section.characteristics .",
		o = " .value",
		u = "accuracy",
		a = "timeEquipped",
		f = "formatStatValue",
		l = this;
	l[t][e](".item-info .name").text(locale.t(l[r][n].nameSID));
	var c = l[r][n].image.replace("_american", "").replace("_russian", "");
	l[t][e](".item-info .image")[i]('<span class="item-image item weapon large _' + c + '"></span>'), l[t][e](".section.characteristics .sectioninfo.description")[i]("<p>" + locale.t(l[r][n].descriptionSID) + "</p>");
	var h = ["fireModeAuto", "fireModeSingle", "fireModeBurst", "rateOfFire", "ammo", "range"];
	h.forEach(function(u) {
		var a = l[r][n].weaponData[u];
		a === !0 ? a = locale.t("ID_WEB_COMMON_YES") : a === !1 ? a = locale.t("ID_WEB_COMMON_NO") : (a + "").indexOf("ID_") !== -1 && (a = locale.t(a)), a ? l[t][e](s + u + o)[i](a) : l[t][e](s + u).addClass("hidden")
	});
	var p = ["kills", "headshots", u, "shotsFired", a];
	p.forEach(function(n) {
		var s = l[r][n];
		n == u ? s = util[f](s, "percent") : n == a ? s = util[f](s, "time") : s = util[f](s), l[t][e](".section.statistics .statrow." + n + o)[i](s)
	})
};