function PremiumViewController() {
	this._name = "PremiumView", this._section = "bf3", this.game = enums.Game.BF3, this.platform = enums.Platform.PC, ViewController.call(this), this.title = "Premium"
}
var app = require("app"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	dom = require("dom"),
	locale = require("locale"),
	session = require("session"),
	ViewController = require("controllers/ViewController"),
	ScrollViewController = require("controllers/ScrollViewController");
module.exports = PremiumViewController, PremiumViewController.prototype = new ViewController, PremiumViewController.constructor = PremiumViewController, PremiumViewController.prototype.loadView = function(e) {
	var t = "parentViewController";
	e || (e = function() {});
	var n = this;
	ViewController.prototype.loadView.call(n, function() {
		n[t] && n[t].$el && n[t].$el.addClass("premium"), n.initScrollView(function() {
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
		t = session.getUserActivePersonaForGame(enums.Game.BF3);
	t && (e.platform = t.platform), e.bindEvents(), e.refresh()
}, PremiumViewController.prototype.bindEvents = function() {
	var e = "expansion",
		t = "BF3PremiumItemViewController",
		n = "video",
		r = this;
	r.$el.find(".item").addClick(function() {
		var r = $(this);
		r.hasClass(e) ? app.go(t, {
			item_type: e
		}) : r.hasClass(n) && app.go(t, {
			item_type: n
		})
	})
}, PremiumViewController.prototype.refresh = function(e) {
	var t = "scrollToTop",
		n = "scrollView",
		r = "append",
		i = "$content",
		s = "premiumitems",
		o = "forEach",
		u = "isStartDateShort";
	e || (e = function() {});
	var a = this;
	a[n][t](), a[n][i].empty()[r]('<div class="sectionloading"></div>'), web.request("bf3", s, {
		platform: a.platform,
		region: "us",
		language: locale.currentLanguage,
		game: a.game
	}, function(f, l) {
		a[n][t](), a[n][i].empty();
		if (f) return a[n][i][r](dom.error_row(locale.t("ID_MOBILE_PREMIUM_ERROR"))), e();
		var c = [];
		l[s][o](function(e) {
			c[e.month] || (c[e.month] = []), c[e.month].push(e)
		});
		var h = $('<div class="premiumitems"></div>');
		c[o](function(e, t) {
			if (!e || !e.length) return;
			var n = new Date(2012, 5);
			n.setMonth(n.getMonth() + t);
			var i = "date-" + n.getMonth() + "-" + n.getFullYear();
			h[r]('<div class="sectionhead ' + i + '">' + util.formatDate(n, "F Y") + "</div>"), e.sort(function(e, t) {
				return e[u] && !t[u] ? 1 : !e[u] && t[u] ? -1 : 0
			}), e[o](function(e) {
				var t = a.premiumitem_row(e);
				t.addClick(function() {
					app.go("PremiumItemViewController", {
						item: e
					})
				}), h[r](t)
			})
		}), a[n][i][r](h);
		var p = a[n][i].find(".sectionhead.date-2-2013");
		p.length && a[n].scrollTop(p.offset().top - a[n].$el.offset().top + 16)
	})
}, PremiumViewController.prototype.premiumitem_row = function(e) {
	var t = "</div>",
		n = "formatDate",
		r = "date",
		i = $('<div class="item"><div class="icon"></div><div class="info"><div class="name"></div><div class="date"></div>' + t + t);
	i.addClass("type" + e.type), i.find(".name").text(e.title);
	var s = "";
	return e.startDate && !e.isStartDateShort && (s = util[n](new Date(e.startDate * 1e3), r)), e.endDate && !e.isEndDateShort && (s += " " + locale.t("ID_MOBILE_COMMON_DATE_RANGE_TO") + " " + util[n](new Date(e.endDate * 1e3), r)), i.find(".date").text(s), i
};