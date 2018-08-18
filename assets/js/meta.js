var app = require("app"),
	device = require("device"),
	web = require("web"),
	enums = require("enums"),
	template = require("template"),
	storage = require("storage");
exports.init = function() {
	exports.setAppMetaHeaders()
}, exports.setAppMetaHeaders = function() {
	if (app.frontend != "web") return;
	web.request(enums.Game.WARSAW, "getcountry", {}, function(e, t) {
		if (!t || t["country"] == undefined) return;
		exports.setCorrectAppMeta(t.country.toLowerCase()), exports.mimicSmartAppBanner()
	})
}, exports.mimicSmartAppBanner = function() {
	var e = "hasSeenAppBanner";
	if (!device.isAndroid() || storage.getObject(e)) return;
	try {
		var t = $('meta[name="google-play-app"]').attr("content"),
			n = t.split("=")[1],
			r = template.render("LoginView-smartAppBanner", {
				url: "market://details?id=" + n
			}),
			i = $("body"),
			s = "show-smart-app-bar";
		i.prepend(r).addClass(s);
		var o = $(".base-header-headinfo"),
			u = o.find(".base-header-headinfo-closebutton");
		u.addClick(function(t) {
			t.preventDefault(), o.remove(), i.removeClass(s), storage.setObject(e, {
				seen: !0
			})
		})
	} catch (a) {}
}, exports.setCorrectAppMeta = function(e) {
	var t = "us",
		n = "content",
		r = "app-id=";
	if (e == t || e == "can") {
		var i = $('meta[name="google-play-app"]'),
			s = $('meta[name="apple-itunes-app"]');
		i.attr(n, r + i.data(t)), s.attr(n, r + s.data(t))
	}
};