function SelectSettingsViewController(e) {
	var t = "_templateParams",
		n = "isWarsawUser",
		r = "isOmahaUser";
	this._name = "SelectSettingsView", this._section = null, this[t] = e, this[t][n] = session.tokenInfo[n], this[t][r] = session.tokenInfo[r], this.settings = null, this.game = session.getActiveGame(), ScrollableViewController.call(this, e), this.titleSID = this.getTitleSID(this[t].type)
}
var async = require("lib/async"), app = require("app"), enums = require("enums"), events = require("events"), receipt = require("receipt"), session = require("session"), storage = require("storage"), template = require("template"), device = require("device"), util = require("util"), web = require("web"), locale = require("locale"), eula = require("eula"), gamedata = {
	battlelog: require("gamedata/battlelog")
}, ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = SelectSettingsViewController, SelectSettingsViewController.prototype = new ScrollableViewController, SelectSettingsViewController.prototype.constructor = SelectSettingsViewController, SelectSettingsViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, SelectSettingsViewController.prototype.refresh = function(e) {
	var t = ".settings",
		n = "loader",
		r = ".sectionloading",
		s = "game",
		o = "</div>",
		u = "remove",
		a = !1,
		f = "request",
		l = "indexOf",
		c = !0,
		h = '<div class="row">',
		p = "html",
		d = "getPrivacyOptionName",
		v = "presencePrivacy",
		m = "getPrivacyOptionDescription",
		g = "render",
		y = "SelectSettingsRow",
		b = "usingActiveClubEmblem",
		w = '<div class="sectioninfo"><p>',
		E = "</p></div>",
		S = "emblems",
		x = "value",
		T = "templateParams",
		N = '<div class="sectionhead">',
		C = "true",
		k = "false",
		L = "SelectSettingsOptions",
		A = "getPushOptionName",
		O = "toLowerCase",
		M = this;
	M.settings = M.$(t), M[n] = M.$el.find(r);
	var _ = M[s] ? session.getUserActivePersonaForGame(M[s]) : null;
	try {
		var D = {
			platform: _.platform,
			personaId: _.personaId,
			game: M[s]
		}
	} catch (P) {
		return B = '<div class="settingrow">' + locale.t("ID_MOBILE_ERROR") + o, M.settings.append(B), M.$el.find(r)[u](), a
	}
	var H = this._templateParams.type,
		B = "";
	if (H == "portraits") web[f](M[s], "getportraits", D, function(e, r) {
		var i = r.allPortraits,
			f = r.unlockablePortraits,
			d = r.unlockedPortraits,
			v = r.premiumPortraits;
		B += '<div class="sectiontable soldierportraits">';
		for (var m = 0; m < i.length; m++) {
			var g = i[m],
				y = f[l](g) > -1,
				b = a,
				w = g == r.selected,
				E = v && v[l](g) > -1 ? c : a;
			b = E ? !session.getUserHasPremium(M[s]) : a, y && !b && (b = d[l](g) > -1 ? a : c);
			var S = "";
			b && (S += " disabled"), w && (S += " selected"), m % 4 == 0 && (m > 0 && (B += o), B += h), B += '<div class="col portrait' + S + '" data-function="setportrait" data-key="portrait" data-value="' + i[m] + '"><span class="unlock-info">', y && b && (B += '<i class="icon icon-battlepack"></i>'), E && (B += '<i class="icon icon-premium"></i>'), B += '</span><img class="imgportrait item-image" src="' + util.getSoldierImageUrl(M[s], "medium", i[m]) + '" />' + o
		}
		B += o, B += o, M.$(t)[p](B), M[n][u](), M.bindPortraitEvents()
	});
	else if (H == "privacy") web[f](M[s], "getprivacy", D, function(e, r) {
		for (key in r) {
			var i = r[key],
				s = M[d](key == v ? !i : i),
				o = {
					key: key,
					value: i,
					label: M[m](key),
					name: s
				};
			B += template[g](y, o)
		}
		M.$(t)[p](B), M[n][u](), M.bindPrivacyEvents()
	});
	else if (H == "tag") {
		var j = _.persona;
		B += template[g]("SelectSettingsTag", j), M.$(t)[p](B), M[n][u](), M.bindTagEvents()
	} else if (H == "presentation") web[f](M[s], "profilepage", {
		userId: session.getUserId(),
		platform: _.platform,
		game: M[s]
	}, function(e, r) {
		if (e) {
			M.scrollView.scrollToTop(), M.isLoading = a;
			return
		}
		var i = r.userprofile;
		B += template[g]("SelectSettingsPresentation", i), M.$(t)[p](B), M[n][u](), M.bindPresentationEvents()
	});
	else if (H == "emblem") web[f](M[s], "getemblems", D, function(e, r) {
		r && r[b] != undefined && r[b] ? B += w + locale.t("ID_MOBILE_EMBLEM_PLATOON_ACTIVE") + E : B += w + locale.t("ID_MOBILE_EMBLEM_INFO") + E, B += '<div class="sectiontable emblems-list">';
		if (r && r[S] != undefined) {
			var i = r.selectedEmblemId;
			for (var s in r[S]) {
				var a = r[S][s],
					f = a.id == i ? " emblemselected" : "",
					l = a.cdnUrl.replace("[SIZE]", 256).replace("[FORMAT]", "png");
				s % 2 === 0 && (B += h), B += '<div class="col item emblem ' + f + '" data-name="emblemId" data-value="' + a.id + '">', B += '<img src="' + l + '">', B += o, s % 2 === 1 && (B += o)
			}
		}
		B += o, M.$(t)[p](B), M[n][u](), M.bindEmblemEvents()
	});
	else if (H == "setprivacy") {
		var F = M[T][x];
		B += N + M[m](M[T].key) + o;
		var I = [C, k];
		if (I[l](F) != -1) $.each($(I), function(e, t) {
			var n = t === C,
				r = M[T].key,
				i = M[d](r == v ? !n : n),
				s = {
					key: r,
					value: t,
					name: i,
					selected: F == t
				};
			B += template[g](L, s)
		});
		else
			for (i = 1; i < 4; i++) {
				var j = {
					key: M[T].key,
					value: i,
					name: M[d](i),
					selected: i == F
				};
				B += template[g](L, j)
			}
		B += '<div class="sectioninfo privacy-description"><p>' + M.getPrivacyOptionDetails(M[T].key) + E, M.$(t)[p](B), M[n][u](), M.bindPrivacySettingsEvents()
	} else if (H == "setpush") {
		M.titleSID = M[A](this[T].key[O](), c);
		var F = M[T][x];
		B += N + M[A](this[T].key[O]()) + o;
		var I = [C, k];
		I[l](F) != -1 && $.each($(I), function(e, t) {
			var n = t === C,
				r = M[T].key,
				i = M[A](n),
				s = {
					key: r,
					value: t,
					name: i,
					selected: F == t
				};
			B += template[g](L, s)
		}), B += '<div class="sectioninfo transparent privacy-description"><p>' + M.getPushOptionDescription(M[T].key) + E, M.$(t)[p](B), M[n][u](), M.bindPushSettingsEvents()
	} else H == "pushnotifications" && web[f](M[s], "getpushsettings", D, function(e, r) {
		for (key in r) {
			var i = r[key][x],
				s = r[key].title;
			device.isiOS() && (device.appInfo.pushEnabled || (i = a));
			var o = M[A](i),
				f = {
					key: s,
					value: i,
					label: M[A](s[O]()),
					name: o
				};
			B += template[g](y, f)
		}
		M.$(t)[p](B), M[n][u](), M.bindPushEvents()
	});
	return e
}, SelectSettingsViewController.prototype.bindPrivacyEvents = function() {
	var e = "getAttribute",
		t = "data-value",
		n = this;
	n.$content.find(".sectionbutton.privacy").addClick(function() {
		var n = this,
			r = n[e]("data-name"),
			i = n[e](t) != 0 ? n[e](t) : 2;
		app.go("SelectSettingsViewController", {
			type: "setprivacy",
			key: r,
			value: i
		})
	})
}, SelectSettingsViewController.prototype.bindPushEvents = function() {
	var e = "getAttribute",
		t = "data-value",
		n = this;
	n.$content.find(".sectionbutton.privacy").addClick(function() {
		var n = this,
			r = n[e]("data-name"),
			i = n[e](t) != 0 ? n[e](t) : 2;
		app.go("SelectSettingsViewController", {
			type: "setpush",
			key: r,
			value: i
		})
	})
}, SelectSettingsViewController.prototype.bindPrivacySettingsEvents = function() {
	var e = "selected",
		t = "getViewAtIndex",
		n = "parentViewController",
		r = this,
		i = r.$content.find(".settingrow.setprivacy");
	i.addClick(function() {
		var s = $(this),
			o = {
				name: s.attr("data-name"),
				value: s.attr("data-value")
			};
		web.request(r.game, "setprivacy", o, function(o, u) {
			if (o) {
				receipt.showReceipt(locale.t("ID_MOBILE_ERROR_RECEIPT"), "error");
				return
			}
			i.removeClass(e), s.addClass(e);
			var a = r[n][t](-2);
			a._templateParams.type = "privacy", a[n][t](-2).refresh(), r.navigationController.goBack();
			return
		})
	})
}, SelectSettingsViewController.prototype.bindPushSettingsEvents = function() {
	var e = "pushSettings",
		t = "selected",
		n = "getViewAtIndex",
		r = "parentViewController",
		i = this,
		s = i.$content.find(".settingrow.setprivacy");
	s.addClick(function() {
		var o = $(this),
			u = {
				name: o.attr("data-name"),
				value: o.attr("data-value")
			};
		web.request(i.game, "setpush", u, function(a, f) {
			if (a) {
				receipt.showReceipt(locale.t("ID_MOBILE_ERROR_RECEIPT"), "error");
				return
			}
			try {
				session.tokenInfo[e] = f[e]
			} catch (l) {
				app.error("Could not update pushSettings in tokeninfo...")
			}
			if (u.value == "true" && device.isiOS()) try {
				app.checkPushEnabledAndShowHelpDialog()
			} catch (l) {
				app.log("Tried to check push enabled from web?")
			}
			s.removeClass(t), o.addClass(t);
			var c = i[r][n](-2);
			c._templateParams.type = "pushnotifications", c[r][n](-2).refresh(), i.navigationController.goBack();
			return
		})
	})
}, SelectSettingsViewController.prototype.bindTagEvents = function() {
	var e = "$content",
		t = "disabled",
		n = "removeClass",
		r = "hidden",
		i = "game",
		s = "showReceipt",
		o = "error",
		u = this,
		a = u[e].find(".sectionloading"),
		f = u[e].find(".post");
	f.addClick(function() {
		var l = $(this);
		f.addClass(t), a[n](r);
		var c = u[i] ? session.getUserActivePersonaForGame(u[i]) : null,
			h = {
				platform: c.platform,
				personaId: c.personaId,
				game: u[i],
				clanTag: u[e].find("#tag-input-field").val()
			};
		web.request(u[i], "settag", h, function(e, l) {
			f[n](t), a.addClass(r);
			if (e || l == undefined) {
				switch (e) {
					case "TAG_INVALID":
					case "TAG_RESERVED":
					case "TAG_PROFANITY":
						receipt[s](locale.t("ID_WEB_SHOWRECEIPT_INVALID_OR_RESERVED_TAGS"), o);
						break;
					default:
						receipt[s](locale.t("ID_MOBILE_ERROR_RECEIPT"), o)
				}
				return
			}
			session.setUserActivePersonaTagForGame(u[i], l.tag), u.navigationController.goBack(), receipt[s](locale.t("ID_MOBILE_TAG_SAVED"), "checkbox");
			return
		})
	})
}, SelectSettingsViewController.prototype.bindPresentationEvents = function() {
	var e = "$content",
		t = "hidden",
		n = "#profile-presentation",
		r = "showReceipt",
		i = "didChangePresentation",
		s = this,
		o = s[e].find(".sectionloading");
	s[e].find(".post").addClick(function() {
		var u = $(this);
		o.removeClass(t);
		var a = s.game ? session.getUserActivePersonaForGame(s.game) : null,
			f = {
				platform: a.platform,
				personaId: a.personaId,
				game: s.game,
				presentation: s[e].find(n).val()
			};
		web.request(s.game, "setpresentation", f, function(u, a) {
			o.addClass(t);
			if (u) {
				switch (u) {
					default: receipt[r](locale.t("ID_MOBILE_ERROR_RECEIPT"), "error")
				}
				return
			}
			s[e].find(n).blur(), events.emit(i, f), s.navigationController.goBack(), events.emit(i), receipt[r](locale.t("ID_MOBILE_PRESENTATOIN_SAVED"), "checkbox");
			return
		})
	})
}, SelectSettingsViewController.prototype.bindEmblemEvents = function() {
	var e = "emblemselected",
		t = this,
		n = t.$content.find(".emblem");
	n.addClick(function() {
		var r = $(this);
		if (r.hasClass(e)) return;
		var i = r.attr("data-name"),
			s = r.attr("data-value"),
			o = t.game ? session.getUserActivePersonaForGame(t.game) : null,
			u = {
				platform: o.platform,
				personaId: o.personaId,
				game: t.game
			};
		u[i] = s, web.request(t.game, "setemblem", u, function(t, i) {
			if (t) {
				receipt.showReceipt(locale.t("ID_MOBILE_ERROR_RECEIPT"), "error");
				return
			}
			n.removeClass(e), r.addClass(e)
		})
	})
}, SelectSettingsViewController.prototype.bindPortraitEvents = function() {
	var e = "selected",
		t = "getAttribute",
		n = this,
		r = n.$el.find(".soldierportraits .portrait");
	r.on("click", function() {
		var i = $(this);
		if (i.hasClass("disabled")) return;
		r.removeClass(e), i.addClass(e);
		var s = this[t]("data-function"),
			o = this[t]("data-value"),
			u = this[t]("data-key"),
			a = n.game ? session.getUserActivePersonaForGame(n.game) : null,
			f = {
				platform: a.platform,
				personaId: a.personaId,
				game: n.game
			};
		f[u] = o, web.request(n.game, s, f, function(e, t) {
			if (e) return;
			events.emit("didChangeSoldierPortrait")
		})
	})
}, SelectSettingsViewController.prototype.getPrivacyOptionName = function(e) {
	var t = "ID_WEB_PROFILE_EDIT_PRIVACY_FRIENDS",
		n = {
			0: locale.t(t),
			1: locale.t("ID_WEB_PROFILE_EDIT_PRIVACY_PRIVATE"),
			2: locale.t(t),
			3: locale.t("ID_WEB_PROFILE_EDIT_PRIVACY_PUBLIC"),
			"false": locale.t("ID_WEB_COMMON_NO"),
			"true": locale.t("ID_WEB_COMMON_YES")
		};
	return e in n ? n[e] : e
}, SelectSettingsViewController.prototype.getPushOptionDescription = function(e) {
	var t = {
		friendsplaying: locale.t("ID_MOBILE_PUSH_FRIENDS_DESC_SETTINGS"),
		newreleases: locale.t("ID_MOBILE_PUSH_RELEASES_DESC"),
		xpweekend: locale.t("ID_MOBILE_PUSH_XPWEEKEND_DESC"),
		newspost: locale.t("ID_MOBILE_PUSH_NEWSPOST_DESC"),
		chat: locale.t("ID_MOBILE_PUSH_CHAT_DESC")
	};
	return e = e.toLowerCase(), e in t ? t[e] : e
}, SelectSettingsViewController.prototype.getPushOptionName = function(e, t) {
	var n = {
		friendsplaying: "ID_MOBILE_PUSH_FRIENDS",
		newreleases: "ID_MOBILE_PUSH_RELEASES",
		xpweekend: "ID_MOBILE_PUSH_XPWEEKEND",
		newspost: "ID_MOBILE_PUSH_NEWSPOST",
		chat: "ID_MOBILE_PUSH_CHAT",
		"false": "ID_WEB_COMMON_OFF",
		"true": "ID_WEB_COMMON_ON"
	};
	return e in n ? t ? n[e] : locale.t(n[e]) : e
}, SelectSettingsViewController.prototype.getPrivacyOptionDescription = function(e) {
	var t = {
		privacyFeedAndGameActivity: locale.t("ID_WEB_PROFILE_EDIT_PRIVACY_EVENTS"),
		privacyShowFriends: locale.t("ID_WEB_PROFILE_EDIT_PRIVACY_YOUR_FRIENDS"),
		privacyDetails: locale.t("ID_WEB_PROFILE_EDIT_PRIVACY_DETAILS_PERSONAL_DETAILS"),
		allowFriendRequests: locale.t("ID_WEB_PROFILE_EDIT_PRIVACY_FRIENDREQUESTS"),
		presencePrivacy: locale.t("ID_WEB_HEADER_PROFILE_INVISIBLE_MODE")
	};
	return e in t ? t[e] : e
}, SelectSettingsViewController.prototype.getPrivacyOptionDetails = function(e) {
	var t = {
		privacyFeedAndGameActivity: locale.t("ID_WEB_PROFILE_EDIT_PRIVACY_EVENTS_INFO"),
		privacyShowFriends: locale.t("ID_WEB_PROFILE_SETTINGS_FRIENDS_INFO"),
		privacyDetails: locale.t("ID_WEB_PROFILE_EDIT_PRIVACY_DETAILS"),
		allowFriendRequests: locale.t("ID_WEB_PROFILE_EDIT_PRIVACY_ALLOW_FRIEND_REQUESTS"),
		presencePrivacy: locale.t("ID_WEB_PROFILE_EDIT_PRIVACY_INVISIBLE_INFO_2")
	};
	return e in t ? t[e] : e
}, SelectSettingsViewController.prototype.getTitleSID = function(e) {
	var t = "ID_WEB_PROFILE_EDIT_PRIVACY",
		n = "ID_MOBILE_PUSH_NOTIFICATIONS",
		r = {
			privacy: t,
			portraits: this.game == enums.Game.WARSAW ? "ID_WEB_POPUP_PROFILESOLDIERIMAGE_TITLE" : "ID_WEB_POPUP_PROFILEAGENTIMAGE_TITLE",
			emblem: "ID_WEB_COMMON_EMBLEM",
			tag: "ID_WEB_PROFILE_EDIT_SOLDIERS_TAG",
			presentation: "ID_WEB_PROFILE_PRESENTATION",
			pushnotifications: n,
			setprivacy: t,
			setpush: n
		};
	return e in r ? r[e] : e
};