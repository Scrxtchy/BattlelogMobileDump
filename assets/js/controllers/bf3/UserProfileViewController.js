function UserProfileViewController(e) {
	this._name = "UserProfileView", this._section = "bf3", this.user = null, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_USER_PROFILE"
}
var app = require("app"),
	assets = require("assets"),
	dom = require("dom"),
	enums = require("enums"),
	locale = require("locale"),
	util = require("util"),
	web = require("web"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = UserProfileViewController, UserProfileViewController.prototype = new ScrollableViewController, UserProfileViewController.constructor = UserProfileViewController, UserProfileViewController.prototype.viewDidLoad = function() {
	var e = "children",
		t = "$content",
		n = this;
	ScrollableViewController.prototype.viewDidLoad.call(n), n.$playerdata = n[t][e](".section.playerdata"), n.$soldiers = n[t][e](".section.soldiers"), n.$presentation = n[t][e](".section.presentation"), n.refresh()
}, UserProfileViewController.prototype.refresh = function() {
	var e = this;
	e.loadUserInfo(), e.loadUserSoldiers(), e.loadUserGameExpansions()
}, UserProfileViewController.prototype.loadUserInfo = function(e) {
	var t = "find",
		n = "$playerdata",
		r = "removeClass",
		i = "hidden",
		s = "showDetails",
		o = !0,
		u = "presentation",
		a = "$presentation";
	e || (e = function() {});
	var f = this;
	if (f.user.createdAt) {
		var l = new Date(f.user.createdAt * 1e3);
		f[n][t](".profile-info .enlisted strong").text(util.formatDate(l, "Y-m-d")), f[n][t](".profile-info .enlisted")[r](i), f[n][r](i)
	}
	web.request("userprofile", {
		userId: f.user.userId
	}, function(l, c) {
		if (l) return e(l);
		var h = !1;
		c.name && c[s] && (f[n][t](".profile-info .name")[r](i).text(c.name), h = o);
		if (c.icon) {
			var p = {
				2: "dice",
				3: "ea",
				4: "mod",
				5: "battlelog"
			};
			c.icon && c.icon in p && f[n][t](".profile-info .icons")[r](i)[t](".special").append('<span class="profile-icon ' + p[c.icon] + '"></span>'), h = o
		}
		return c.age && c[s] && (f[n][t](".profile-info .age strong").text(c.age), f[n][t](".profile-info .age")[r](i), h = o), c.location && c[s] && (f[n][t](".profile-info .location .flag-icon").css("background-image", "url(" + assets.CDNResourceURL("/public/common/flags/" + c.location.toLowerCase() + ".gif") + ")"), f[n][t](".profile-info .location")[r](i), h = o), c[u] && !c.presentationHidden && (f[a][t](".content").html(c[u].escapeHTML().nl2br()), f[a][r](i)), h && f[n][r](i), e()
	})
}, UserProfileViewController.prototype.loadUserSoldiers = function(e) {
	var t = "append",
		n = "soldiers";
	e || (e = function() {});
	var r = this,
		i = r.$soldiers.children(".items");
	i.empty()[t]('<div class="sectionloading"></div>'), web.request("bf3", "usersoldiers", {
		userId: r.user.userId
	}, function(s, o) {
		i.empty();
		if (s) return i[t](dom.error_row(locale.t("ID_MOBILE_PROFILE_SOLDIERS_ERROR"))), e(s);
		if (!o[n] || !o[n].length) return i[t](dom.error_row(locale.t("ID_MOBILE_PROFILE_SOLDIERS_NOSOLDIERS"))), e("NO_SOLDIERS");
		var u = [];
		return o[n].forEach(function(e) {
			if (e.game != enums.Game.BF3) return;
			u.push(e)
		}), u.forEach(function(e) {
			var n = dom.soldier_row(e);
			n.addClick(function() {
				app.go("StatsViewController", {
					user: r.user,
					persona: e.persona,
					platform: e.platform
				})
			}), i[t](n)
		}), e()
	})
}, UserProfileViewController.prototype.loadUserGameExpansions = function(e) {
	var t = "userGameExpansions";
	e || (e = function() {});
	var n = this;
	web.request("usergameexpansions", {
		userId: n.user.userId
	}, function(r, i) {
		return r ? e(r) : i[t] ? i[t].length ? (util.hasExpansion(i[t], enums.GameExpansion.BF3PREMIUM) && n.$playerdata.find(".profile-info .icons").removeClass("hidden").find(".expansions").append('<span class="expansion-icon bf3 premium"></span>'), e()) : e() : e("Unable to fetch user expansions")
	})
};