var app = require("app"),
	template = require("template"),
	assets = require("assets"),
	web = require("web"),
	locale = require("locale"),
	device = require("device"),
	enums = require("enums"),
	events = require("events"),
	receipt = require("receipt"),
	session = require("session"),
	storage = require("storage"),
	dialogModal, data;
exports.init = function() {}, exports.show = function(e) {
	var t = {
		type: "Information",
		title: " ",
		body: "Are you sure?",
		dismissText: locale.t("ID_MOBILE_DIALOG_CLOSE"),
		okText: locale.t("ID_MOBILE_DIALOG_OK"),
		isTablet: device.isTablet(),
		closeCallback: function() {}
	};
	data = $.extend(t, e), dialogModal && dialogModal.remove();
	var n = session.getActiveGame(),
		r = enums.AppGameName[n];
	return dialogModal = $(template.render("Dialog" + data.type, data)).addClass("nv-" + r), $("body #app").append(dialogModal), dialogModal.find("[data-choice]").addClick(function(e) {
		return exports.close($(this).data("choice"), e)
	}), dialogModal
}, exports.close = function(e, t) {
	data.closeCallback(e, t) !== !1 && dialogModal.remove()
}, exports.showPushInfoDialog = function() {
	var e = "trackEvent",
		t = "Push",
		n = "showReceipt",
		r = "pushSettings",
		i = session.getActiveGame(),
		s = i ? session.getUserActivePersonaForGame(i) : null;
	if (!s) {
		app.log("No active persona, not adding push opt-in flow...");
		return
	}
	device[e](t, "NPX-dialog-opened");
	var o = {
		type: "Confirm",
		title: "",
		body: template.render("DialogPushFriendsContent"),
		dismissText: locale.t("ID_WEB_COMMON_CLOSE"),
		okText: locale.t("ID_MOBILE_PUSH_DIALOG_YES"),
		closeCallback: function(i) {
			if (i == "ok") {
				var s = {
					name: "FRIENDSPLAYING",
					value: !0
				};
				device[e](t, "NPX-dialog-activated-friends"), web.request(session.getActiveSection(), "setpush", s, function(e, t) {
					if (e) {
						receipt[n](locale.t("ID_MOBILE_ERROR_RECEIPT"), "error");
						return
					}
					try {
						session.tokenInfo[r] = t[r]
					} catch (i) {
						app.error("Could not update pushSettings in tokeninfo...")
					}
					device.isiOS() && app.checkPushEnabledAndShowHelpDialog(), receipt[n](locale.t("ID_MOBILE_PUSH_FRIENDS_ENABLED"), "checkbox")
				})
			} else device[e](t, "NPX-dialog-dismissed-friends");
			app.log("saved seen status in LS..."), storage.setObject("pushNpxFriends1", 1)
		}
	};
	exports.show(o)
}, exports.showTurnOnPushHelpDialog = function() {
	var e = {
		type: "Confirm",
		title: locale.t("ID_MOBILE_PUSH_HELP_TITLE"),
		body: template.render("DialogPushTurnOnHelpContent"),
		dismissText: locale.t("ID_WEB_COMMON_CLOSE"),
		okText: ""
	};
	exports.show(e)
}, exports.showBuyItemDialog = function(e, t) {
	var n = {
		fullDialogContent: template.render("DialogBuyItemLoadoutContent", e),
		type: "FullBody",
		closeCallback: function(e, n) {
			return t(e == "ok", n)
		}
	};
	return exports.show(n)
}, exports.confirm = function(e, t, n) {
	var r = {
		type: "Confirm",
		title: t,
		body: e,
		dismissText: locale.t("ID_MOBILE_DIALOG_CLOSE"),
		okText: locale.t("ID_MOBILE_DIALOG_OK"),
		closeCallback: function(e) {
			return n(e == "ok")
		}
	};
	exports.show(r)
};