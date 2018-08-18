function LoginViewController(e) {
	this._name = "LoginView", ViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_LOGIN"
}
var app = require("app"),
	config = require("config"),
	enums = require("enums"),
	events = require("events"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	template = require("template"),
	web = require("web"),
	push = require("push"),
	meta = require("meta"),
	util = require("util"),
	ViewController = require("controllers/ViewController");
module.exports = LoginViewController, LoginViewController.prototype = new ViewController, LoginViewController.prototype.constructor = LoginViewController, LoginViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ViewController.prototype.loadView.call(t, function() {
		return (device.hasQRScanner() || config.isDeveloper) && t.$(".qr-login-container").removeClass("hidden"), e()
	})
}, LoginViewController.prototype.viewDidLoad = function() {
	var e = "min-height",
		t = "rootViewController",
		n = this;
	ViewController.prototype.viewDidLoad.call(n), config.showEnvironmentInfo && n.$el.append(template.render("LoginView-environment", {
		appVersion: util.getAppVersionString()
	})), n.$el.append(template.render("LoginView-forgotpwd", {
		userlocale: enums.Language.toString(locale.currentLanguage)
	})), meta.init(), n.$el.css(e, app[t].$el.height()), n.bindEvents(), events.bind("orientationChanged", function() {
		n.$el.css(e, app[t].$el.height())
	})
}, LoginViewController.prototype.viewDidDisappear = function() {
	var e = this;
	ViewController.prototype.viewDidDisappear.call(e), e.$('.login-form input[name="password"]').val("")
}, LoginViewController.prototype.bindEvents = function() {
	var e = "removeClass",
		t = "hidden",
		n = "addClick",
		r = "alert",
		i = "addClass",
		s = ".login-form",
		o = ".login-loading",
		u = "ID_MOBILE_LOGIN_ERROR_UNKNOWN",
		a = "keypress",
		f = "click",
		l = "scannedQRCode",
		c = this,
		h = c.$('.login-form input[name="email"]'),
		p = c.$('.login-form input[name="password"]'),
		d = c.$(".login-form .button.login"),
		v = c.$(".forgot-pwd a:last"),
		m = c.$(".forgot-pwd a:first");
	device.isHybridApp() || m[e](t), d[n](function() {
		if (!h.val() || !p.val()) return app[r](locale.t("ID_MOBILE_LOGIN_ERROR_EMPTY"));
		c.$(s)[i](t), c.$(o)[e](t), session.login({
			email: h.val(),
			password: p.val()
		}, function(n) {
			if (n) return c.$(s)[e](t), c.$(o)[i](t), n == "UNKNOWN_USER_ERROR" || n == "USER_CREDENTIALS_ERROR" ? app[r](locale.t("ID_MOBILE_LOGIN_ERROR_USER_CREDENTIALS")) : n == "USER_NOT_FOUND" || n == "PERSONAS_NOT_FOUND" ? app[r](locale.t(u)) : n == "APP_DISABLED" ? app[r](locale.t("ID_MOBILE_COMMON_APP_DISABLED")) : n == "USER_BANNED" ? app[r](locale.t("ID_MOBILE_ERROR_BANNED")) : app[r](locale.t(u))
		})
	}), h.bind(a, function(e) {
		if (e.which != 13) return;
		p.val() ? d.trigger(f) : h.val() != "" && p.focus()
	}), p.bind(a, function(e) {
		if (e.which != 13) return;
		h.val() ? d.trigger(f) : p.val() != "" && h.focus()
	}), v[n](function(e) {
		e.preventDefault(), app.goExternal($(this).data("href"))
	});
	if (device.hasQRScanner() || config.isDeveloper) c.$(".button.qr-login")[n](function() {
		var e = function(t) {
			events.unbind(l, e), c[l](t)
		};
		events.bind(l, e), device.cmd("scanQRCode")
	}), c.$(".qr-form .button.continue")[n](function() {
		c.continueQRLogin()
	}), c.$(".qr-form .button.cancel")[n](function() {
		c.$(".qr-form")[i](t), c.$(s)[e](t)
	})
};
var qrToken = null,
	qrChallenge = null,
	qrPlatform = null;
LoginViewController.prototype.scannedQRCode = function(e) {
	var t = "hidden",
		n = this;
	if (!e.code) return;
	if (e.code.substring(0, 25) != "http://battlelog.com/app?") return;
	qrToken = e.code.substring(25), n.$(".login-form").addClass(t), n.$(".qr-form").removeClass(t), web.request("tokenchallenge", {
		token: qrToken
	}, function(e, t) {
		if (e) return app.alert(locale.t("ID_MOBILE_LOGIN_QR_GENERICERROR") + " (" + e + ")");
		qrChallenge = t.challenge, qrPlatform = t.platform;
		var r = qrChallenge;
		qrPlatform === enums.Platform.PS4 && (r = r.replace(/(s|t|x|o)/gi, function(e, t) {
			return '<span class="ps4-btn-icon ps4-btn-' + t.toLowerCase() + '">' + t + "</span>"
		})), push.init(function() {
			n.$(".code").html(r), events.bind("push.AuthTokenChallengeConfirmed", function() {
				n.continueQRLogin()
			})
		}, t.beaconPushUser, t.beaconPushToken, null)
	})
}, LoginViewController.prototype.continueQRLogin = function() {
	var e = ".qr-form .button.continue",
		t = "disabled",
		n = "ID_MOBILE_LOGIN_QR_GENERICERROR",
		r = this;
	r.$(e).addClass(t).unbind("click"), web.request("getauthcode", {
		token: qrToken,
		challenge: qrChallenge
	}, function(i, s) {
		if (i) return r.$(e).removeClass(t).addClick(function() {
			r.continueQRLogin()
		}), app.alert(locale.t(n) + " (" + i + ")");
		push.getPushClient().disconnect(), session.login({
			authorizationCode: s.authorizationCode
		}, function(e) {
			if (e) return app.alert(locale.t(n) + " (" + e + ")")
		})
	})
};