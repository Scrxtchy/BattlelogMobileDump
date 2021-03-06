var app = require("app"),
	session = require("session"),
	template = require("template"),
	enums = require("enums"),
	device = require("device"),
	storage = require("storage"),
	locale = require("locale"),
	web = require("web"),
	eulaModal, callback;
exports.init = function(e) {
	callback = typeof e == "function" ? e : function() {};
	var t = session.tokenInfo.eulaStatus;
	t ? callback(!0) : exports.show()
}, exports.getLegalUrl = function(e) {
	var t = enums.Language.toString(locale.currentLanguage);
	t == "pt" && (t = "br"), t == "zh" && (t = "sc");
	var n = "http://tos.ea.com/legalapp/" + e + "/US/" + t + "/";
	if (e == "mobileeula") device.isAndroid() ? n += "GM/" : n += "OTHER/";
	else if (e == "WEBPRIVACY" || e == "WEBTERMS") n += "PC/";
	else if (e == "ROC") {
		var r = session.getActiveGame();
		r == enums.Game.OMAHA ? n += "PC/BFH" : n += "PC/BF4"
	}
	return n
}, exports.show = function() {
	var e = "goExternal",
		t = "getLegalUrl";
	eulaModal = $(template.render("EulaView")), eulaModal.find("[data-type]").addClick(function(r) {
		r.preventDefault();
		var i = $(this),
			s = i.data("type");
		switch (s) {
			case "privacy":
				app[e](exports[t]("WEBPRIVACY"));
				break;
			case "tos":
				app[e](exports[t]("WEBTERMS"));
				break;
			case "eula":
				app[e](exports[t]("mobileeula"))
		}
	}), eulaModal.find("[data-action]").addClick(function(e) {
		var t = $(this),
			n = t.data("action");
		switch (n) {
			case "agree":
				web.request(session.getActiveSection(), "seteulastatustoseen", {}, function(e, t) {
					if (e) return;
					session.tokenInfo.eulaStatus = !0
				}), callback(!0), eulaModal.remove();
				break;
			case "cancel":
				eulaModal.remove(), session.logout(), callback(!1)
		}
	}), $("body").append(eulaModal)
}, exports.destroy = function() {
	eulaModal.remove()
};