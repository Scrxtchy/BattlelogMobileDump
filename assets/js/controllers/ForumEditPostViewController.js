function ForumEditPostViewController(e) {
	this._name = "ForumEditPostView", this.game = session.getActiveGame(), this.forum = null, this.thread = null, this.post = null, ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_FORUM_EDITPOST"
}
var app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	template = require("template"),
	receipt = require("receipt"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = ForumEditPostViewController, ForumEditPostViewController.prototype = new ScrollableViewController, ForumEditPostViewController.prototype.constructor = ForumEditPostViewController, ForumEditPostViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return t.scrollView.$content.find(".thread-title").text(t.thread.title), e()
	})
}, ForumEditPostViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), web.request(e.game, "forumquotepostcontent", {
		post_id: e.post.id
	}, function(t, n) {
		if (t) {
			receipt.showReceipt(locale.t("ID_WEB_SHOWRECEIPT_GENERIC_ERROR"), "skull");
			return
		}
		e.post.body = n.body, e.renderForm(), e.bindEvents()
	})
}, ForumEditPostViewController.prototype.renderForm = function() {
	var e = this;
	e.scrollView.$content.find(".form-container").html(template.render("ForumEditPostView-form", {
		title: e.post.title,
		body: e.post.body
	}))
}, ForumEditPostViewController.prototype.bindEvents = function() {
	var e = "$content",
		t = "scrollView",
		n = ".section.editpost textarea",
		r = "selectionStart",
		i = "selectionEnd",
		s = "substring",
		o = "length",
		u = "showReceipt",
		a = "skull",
		f = this,
		l = f[t][e].find(n);
	l.bind("blur", function() {
		var e = $(this).get(0);
		f[r] = e[r], f[i] = e[i]
	}), f[t][e].find(".forum-bb-buttons .button").addClick(function(e) {
		var t = $(e.currentTarget),
			n = l,
			u = t.attr("data-before"),
			a = t.attr("data-after"),
			c = n.get(0),
			h = f[r],
			p = f[i],
			d = c.value[s](0, h),
			v = c.value[s](p),
			m = c.value[s](h, p),
			g;
		g = d + u + m + a + v, n.val(g);
		var y = p + u[o] + a[o];
		h == p && (y = p + u[o]), util.setCaretPosition(n[0], y)
	}), f[t][e].find(".section.editpost .button.post").addClick(function() {
		var r = f[t][e].find(n),
			i = r.val();
		if (!i) {
			receipt[u](locale.t("ID_MOBILE_FORUM_POSTTOOSHORT"), a);
			return
		}
		web.request(f.game, "forumupdatepost", {
			postId: f.post.id,
			body: i
		}, function(e, t) {
			if (e) {
				e == "ACCESS_DENIED" ? receipt[u](locale.t("ID_MOBILE_FORUM_ACCESSDENIED"), a) : e == "USER_BANNED" ? receipt[u](locale.t("ID_MOBILE_FORUM_BANNED"), a) : receipt[u](locale.t("ID_WEB_SHOWRECEIPT_GENERIC_ERROR"), a);
				return
			}
			r.val(""), app.go("ForumThreadViewController", {
				section: !1,
				forum: f.forum,
				thread: f.thread
			}, function() {
				f.navigationController.removeView(f)
			})
		})
	})
};