function PremiumViewController() {
	var e = "_activePersona";
	this._name = "PremiumView", this.game = session.getActiveGame(), this.gameName = enums.AppGameName[this.game], this[e] = session.getUserActivePersonaForGame(this.game), this.platform = this[e] ? this[e].platform : enums.Platform.PC, RefreshableViewController.call(this), this.titleSID = "ID_MOBILE_PREMIUM_TITLE"
}
var app = require("app"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	dom = require("dom"),
	locale = require("locale"),
	session = require("session"),
	carousel = require("carousel"),
	ScrollViewController = require("controllers/ScrollViewController"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = PremiumViewController, PremiumViewController.prototype = new RefreshableViewController, PremiumViewController.constructor = PremiumViewController, PremiumViewController.prototype.loadView = function(e) {
	var t = "parentViewController";
	e || (e = function() {});
	var n = this;
	RefreshableViewController.prototype.loadView.call(n, function() {
		n[t] && n[t].$el && session.getUserHasPremium(n.game) && n[t].$el.addClass("premium"), n.initScrollView(function() {
			return e()
		})
	})
}, PremiumViewController.prototype.initScrollView = function(e) {
	var t = "scrollView",
		n = this;
	n[t] = new ScrollViewController({
		parentViewController: n
	}), n.subviews.push(n[t]), n[t].init(function() {
		return n.$el.append(n[t].$el), e()
	})
}, PremiumViewController.prototype.viewDidLoad = function() {
	var e = this,
		t = session.getUserActivePersonaForGame(this.game);
	t && (e.platform = t.platform), e.bindEvents(), e.refresh()
}, PremiumViewController.prototype.bindEvents = function() {
	var e = "expansion",
		t = this;
	t.$el.find(".item").addClick(function() {
		var n = $(this);
		n.hasClass(e) && t.game == enums.Game.WARSAW && app.go("BF4PremiumItemViewController", {
			item_type: e
		})
	})
}, PremiumViewController.prototype.refresh = function(e) {
	var t = "append",
		n = "$content",
		r = "scrollView",
		i = "scrollToTop",
		s = "premiumitems",
		o = "getFullYear";
	e || (e = function() {});
	var u = this;
	u[r][n][t]("<div class='section loadingarea'><div class='sectionloading'></div></div>"), u.lastRefresh = new Date, u[r][i](), session.isLoggedIn() && !session.getUserHasPremium(u.game) && u[r][n].find(".premium-view-logo")[t]('<div class="bemore"><h2>' + locale.t("ID_MOBILE_PREMIUM_OWN_MORE") + "</h2><h3>" + locale.t("ID_MOBILE_PREMIUM_UPGRADE") + "</h3></div>"), web.request(u.gameName, s, {
		platform: u.platform,
		region: "us",
		language: locale.currentLanguage,
		game: u.game
	}, function(a, f) {
		u[r][i](), u[r][n].find(".loadingarea").remove();
		if (a || !f[s]) return u[r][n][t](dom.error_row(locale.t("ID_MOBILE_PREMIUM_ERROR"))), e();
		var l = {};
		f[s].forEach(function(e) {
			var t = (new Date(e.releaseDate * 1e3))[o](),
				n = e.month;
			l[t] || (l[t] = {}), l[t][n] || (l[t][n] = []), l[t][n].push(e)
		});
		var c, h = 0,
			p = [];
		for (var d = 0; d < f[s].length; d++) {
			c = f[s][d];
			if (!c || !c.featured) continue;
			p.push(c), h++
		}
		var v = $('<div class="upcomingitems"><div class="featured">' + locale.t("ID_MOBILE_PREMIUM_FEATURED") + '</div><div class="itemscollection"></div><div class="indicators"></div></div>');
		u[r][n][t](v), u.makeFeaturedCarousel(p, v);
		var m = $('<div class="section premiumitems"></div>');
		delete l[2013][10], _.each(l, function(e, n) {
			_.each(e, function(e, r) {
				var i = new Date(n, r - 1),
					s = "date-" + i.getMonth() + "-" + i[o]();
				m[t]('<div class="sectionhead ' + s + '">' + util.formatDate(i, "F Y") + "</div>"), e.forEach(function(e) {
					var n = u.premiumitem_row(e);
					n.addClick(function() {
						app.go("PremiumItemViewController", {
							item: e
						})
					}), m[t](n)
				})
			})
		}), u[r][n][t](m);
		var g = u[r][n].find(".sectionhead.date-2-2013");
		g.length && u[r].scrollTop(g.offset().top - u[r].$el.offset().top + 16)
	})
}, PremiumViewController.prototype.premiumitem_row = function(e, t) {
	var n = " released",
		r = "fullReleaseDate",
		i = "formatDate",
		s = "date",
		o = "</div>";
	if (e === undefined) return !1;
	var u = "";
	if (t == "wide") var a = e.featuredUrl,
		f = "",
		l = "",
		c = n;
	else {
		u = " sectioninfo";
		var a = e.thumbnailUrl,
			f = "48",
			l = "",
			c = " notreleased"
	}
	if (e[r]) {
		var h = (new Date).getTime();
		h = util[i](new Date(h), s);
		var p = util[i](new Date(e[r] * 1e3), s);
		h >= p && (c = n)
	}
	var d = $('<div class="item' + c + u + '">' + '<div class="icon" style="background-image: url(' + a + ')"></div>' + '<div class="info">' + '<div class="name"></div>' + '<div class="date"></div>' + o + o);
	d.find(".name").text(e.title), e.category == 10 && d.addClass("tall");
	var v = "";
	return e.startDate && !e.isStartDateShort && (v = util[i](new Date(e.startDate * 1e3), s)), e.endDate && !e.isEndDateShort && (v += " " + locale.t("ID_MOBILE_COMMON_DATE_RANGE_TO") + " " + util[i](new Date(e.endDate * 1e3), s)), d.find(".date").text(v), d
}, PremiumViewController.prototype.makeFeaturedCarousel = function(e, t) {
	var n = "find",
		r = "active",
		i = this,
		s = t[n](".itemscollection"),
		o = t[n](".indicators");
	s.empty(), o.empty(), e.forEach(function(e) {
		var t = i.premiumitem_row(e, "wide");
		t.addClick(function() {
			app.go("PremiumItemViewController", {
				item: e
			})
		}), s.append(t), o.append('<div class="indicator">&bull;</div>')
	}), o[n](".indicator:first").addClass(r), carousel.init(t, s, s[n](".item"), function(e, t) {
		var i = o[n](".indicator:nth(" + t + ")");
		i.addClass(r).siblings().removeClass(r)
	})
};