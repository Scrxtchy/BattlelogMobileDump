function FindPlayerViewController(e) {
	this._name = "FindPlayerView", this._section = "bf3", ViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_FINDPLAYER", this.autoSearchTimeout = null
}
var app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	web = require("web"),
	ViewController = require("controllers/ViewController"),
	ScrollViewController = require("controllers/ScrollViewController");
module.exports = FindPlayerViewController, FindPlayerViewController.prototype = new ViewController, FindPlayerViewController.prototype.constructor = FindPlayerViewController, FindPlayerViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ViewController.prototype.loadView.call(t, function() {
		t.initScrollView(function() {
			return e()
		})
	})
}, FindPlayerViewController.prototype.initScrollView = function(e) {
	var t = "scrollView",
		n = this;
	n[t] = new ScrollViewController({
		parentViewController: n
	}), n.subviews.push(n[t]), n[t].init(function() {
		return n.$el.append(n[t].$el), n.bindEvents(), e()
	})
}, FindPlayerViewController.prototype.runSearch = function(e) {
	var t = ".toolbar .textinput",
		n = "loading",
		r = "$content",
		i = "scrollView",
		s = "append",
		o = "matches",
		u = this;
	u.$(t).addClass(n), web.request("search", {
		name: e
	}, function(e, a) {
		u.$(t).removeClass(n), u[i][r].empty();
		if (e) {
			u[i][r][s](dom.error_row(locale.t("ID_MOBILE_FINDPLAYER_ERROR")));
			return
		}
		if (!a[o] || !a[o].length) {
			u[i][r][s](dom.error_row(locale.t("ID_MOBILE_FINDPLAYER_EMPTY")));
			return
		}
		var f = $("<div></div>");
		a[o].forEach(function(e, t) {
			var n = dom.user_row(e);
			n.addClick(function() {
				app.go("UserViewController", {
					user: e
				})
			}), f[s](n)
		}), u[i][r][s](f)
	})
}, FindPlayerViewController.prototype.bindEvents = function() {
	var e = "hidden",
		t = "length",
		n = "delayedSearchTimeout",
		r = this,
		i = r.$(".toolbar .textinput input");
	i.bind("keyup", function(s) {
		i.siblings(".clear-button").toggleClass(e, i.val()[t] === 0), r[n] && clearTimeout(r[n]);
		if (i.val()[t] < 3 || i.val()[t] > 32) return;
		r[n] = setTimeout(function() {
			r.runSearch(i.val())
		}, s.which == 13 ? 0 : 1e3)
	}), i.bind("keypress", function(e) {
		e.which == 13 && e.preventDefault()
	}), r.$(".toolbar .textinput .clear-button").addClick(function(t) {
		r[n] && clearTimeout(r[n]), $(this).addClass(e), i.val(""), r.scrollView.$content.empty()
	})
};