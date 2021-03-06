function ForumCreateThreadViewController(e) {
	this._name = "ForumCreateThreadView", this.selectionStart = this.selectionEnd = !1, this.game = session.getActiveGame(), RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_FORUM_CREATE_TITLE", this.scrollViewTemplate = "ForumCreateThreadView-scrollviewcontent"
}
var app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	receipt = require("receipt"),
	template = require("template"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = ForumCreateThreadViewController, ForumCreateThreadViewController.prototype = new RefreshableViewController, ForumCreateThreadViewController.prototype.constructor = ForumCreateThreadViewController, ForumCreateThreadViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, ForumCreateThreadViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.bindEvents(), e.refresh()
}, ForumCreateThreadViewController.prototype.refresh = function(e) {
	e || (e = function() {});
	var t = this
}, ForumCreateThreadViewController.prototype.bindEvents = function() {
	var e = "find",
		t = "$content",
		n = "scrollView",
		r = ".section.newthread textarea",
		i = "selectionStart",
		s = "selectionEnd",
		o = "substring",
		u = "length",
		a = "showReceipt",
		f = "ID_MOBILE_FORUM_POSTTOOSHORT",
		l = "skull",
		c = this;
	c[n][t][e](r).bind("blur", function() {
		var e = $(this).get(0);
		c[i] = e[i], c[s] = e[s]
	}), c[n][t][e](".forum-bb-buttons .button").addClick(function(a) {
		var f = $(a.currentTarget),
			l = c[n][t][e](r),
			h = f.attr("data-before"),
			p = f.attr("data-after"),
			d = l.get(0),
			v = c[i],
			m = c[s],
			g = d.value[o](0, v),
			y = d.value[o](m),
			b = d.value[o](v, m),
			w;
		w = g + h + b + p + y, l.val(w);
		var E = m + h[u] + p[u];
		v == m && (E = m + h[u]), util.setCaretPosition(l[0], E)
	}), c[n][t][e](".section.newthread .button.post").addClick(function() {
		var i = c[n][t][e](".section.newthread input"),
			s = c[n][t][e](r),
			o = i.val(),
			u = s.val();
		if (!o || !u) {
			receipt[a](locale.t(f), l);
			return
		}
		web.request(c.game, "forumcreatethread", {
			forumId: c.forum.id,
			topic: o,
			body: u,
			publishToFeed: "False"
		}, function(r, o) {
			if (r) {
				r == "COOLDOWN" && c[n][t][e](".section.newthread .cooldown").removeClass("hidden"), r == "POST_TOO_SHORT" && receipt[a](locale.t(f), l), r == "USER_BANNED" && receipt[a](locale.t("ID_MOBILE_FORUM_BANNED"), l), r == "MISSING_TITLE" && (i.val(""), receipt[a](locale.t(f), l));
				return
			}
			i.val(""), s.val(""), app.go("ForumSingleViewController", {
				section: !1,
				forum: c.forum
			}, function() {
				c.navigationController.removeView(c)
			})
		})
	})
};