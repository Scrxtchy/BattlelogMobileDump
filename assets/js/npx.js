var app = require("app"),
	template = require("template"),
	assets = require("assets"),
	web = require("web"),
	enums = require("enums"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	npxModal;
exports.init = function() {
	var e = "hasExperienced",
		t = !1,
		n = "push",
		r = "xp1Experienced",
		i = "xp0Experienced",
		s = "xp2Experienced",
		o = "xp3Experienced",
		u = "xp4Experienced",
		a = session.getActiveGame(),
		f = [enums.Game.WARSAW];
	if (f.indexOf(a) == -1) return;
	web.request(a, "shownpx", {}, function(a, f) {
		if (a) return;
		var l = [];
		e in f && f[e] === t ? l[n](1, 2, 3) : r in f && f[r] === t ? l[n](4) : i in f && f[i] === t ? l[n](5) : s in f && f[s] === t ? l[n](7) : o in f && f[o] === t ? l[n](8) : u in f && f[u] === t && l[n](9), l.length && exports.show({
			cards: l.sort()
		})
	})
}, exports.show = function(e) {
	var t = "removeClass",
		n = "addClass",
		r = "find",
		i = "#card-",
		s = "cards",
		o = "hidden",
		u = "show",
		a = ".card",
		f = {
			cards: [1, 2, 3],
			isTablet: device.isTablet()
		},
		l = $.extend(f, e);
	npxModal = $(template.render("NpxView", l)), $("body #app").append(npxModal), npxModal[r](i + l[s][l[s].length - 1])[r](".button[data-action=next]")[n](o).siblings("[data-action=close]")[t](o), npxModal[r](i + l[s][0])[n](u), npxModal[r](".button").addClick(function() {
		var e = $(this),
			o = e.data("action"),
			f, c;
		if (o === "close") return npxModal.remove();
		f = e.parents(a), c = l[s].indexOf(parseInt(f.attr("id").replace("card-", "")));
		if (!(c !== -1 && c < l[s].length - 1)) return npxModal.remove();
		npxModal[r](a)[t](u), npxModal[r](i + l[s][c + 1])[n](u), c >= 2 && npxModal[r](".NpxView header").replaceWith("<header><h1>" + locale.t("ID_MOBILE_NPX_NEWRELEASE") + "</h1></header>")
	})
}, exports.destroy = function() {
	npxModal.remove()
};