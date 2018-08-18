function FeedItemViewController(e) {
	this._name = "FeedItemView", this._section = "bf3", this.feeditem = null, ViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_FEEDITEM"
}
var session = require("session"),
	locale = require("locale"),
	dom = require("dom"),
	app = require("app"),
	web = require("web"),
	template = require("template"),
	ViewController = require("controllers/ViewController"),
	ScrollViewController = require("controllers/ScrollViewController");
module.exports = FeedItemViewController, FeedItemViewController.prototype = new ViewController, FeedItemViewController.constructor = FeedItemViewController, FeedItemViewController.prototype.loadView = function(e) {
	var t = "scrollView",
		n = "likeUserIds",
		r = "feeditem",
		i = "isCommentable";
	e || (e = function() {});
	var s = this;
	ViewController.prototype.loadView.call(s, function() {
		s[t] = new ScrollViewController, s.subviews.push(s[t]), s[t].init(function() {
			return s.$el.append(s[t].$el), session.isLoggedIn() && s[r][n].indexOf(session.tokenInfo.user.userId) == -1 && s[r][n].indexOf(session.tokenInfo.user.userId - 2) == -1 && (s.navbarRightItem = {
				$el: $('<a class="button grey">' + locale.t("ID_MOBILE_BATTLEFEED_HOOAH_ACTION") + "</a>")
			}), s[r][i] && (s.$el.addClass(i), s.$el.append(template.render("FeedItemView-comment-toolbar"))), e()
		})
	})
}, FeedItemViewController.prototype.viewDidLoad = function() {
	var e = "append",
		t = "scrollView",
		n = "$feeditem",
		r = "feeditem",
		i = "find",
		s = ".social",
		o = "numComments",
		u = "feeditem_comment",
		a = "repaintSocial",
		f = this;
	ViewController.prototype.viewDidLoad.call(f), f.bindEvents(), f[t].$content[e]('<div class="battlefeed"></div>'), f[n] = dom[r](f[r], {
		isDetailView: !0
	}), f[n][i](".col-body")[e]('<div class="social detail"></div>'), f[t].$content[i](".battlefeed")[e](f[n]), f[r].numLikes && f[n][i](s).prepend($('<div class="hooahs"></div>')[e](dom.feeditem_hooahs(f[r]))), f[r][o] > 2 ? web.request("feeditemcomments", {
		feedItemId: f[r].id
	}, function(t, r) {
		if (t) return;
		r.comments.forEach(function(t, r) {
			f[n][i](s)[e](dom[u](t))
		}), f[a]()
	}) : f[r][o] && (f[r].comment2 && f[n][i](s)[e](dom[u](f[r].comment2)), f[r].comment1 && f[n][i](s)[e](dom[u](f[r].comment1)), f[a]()), f[n][i](".col-report").addClick(function(e) {
		e.stopPropagation();
		var t = $(this).data("commentid");
		app.go("ReportAbuseViewController", {
			section: !1,
			type: "feedItem",
			feeditem: {
				id: f[r].id,
				commentId: t
			}
		})
	})
}, FeedItemViewController.prototype.bindEvents = function() {
	var e = "navbarRightItem",
		t = "likeUserIds",
		n = "feeditem",
		r = "$feeditem",
		i = ".social .hooahs",
		s = ".social",
		o = "loading",
		u = this;
	if (u[e]) {
		var a = !1;
		u[e].$el.addClick(function(o) {
			if (a) return;
			a = !0, u[n][t].indexOf(session.tokenInfo.user.userId) == -1 && (u[e].$el.remove(), u[e] = null, u[n].numLikes += 1, u[n][t].push(session.tokenInfo.user.userId), u[r].find(i).length || u[r].find(s).prepend('<div class="hooahs"></div>'), u[r].find(i).empty().append(dom.feeditem_hooahs(u[n])), web.request("feeditemlike", {
				feedItemId: u[n].id
			}, function(e, t) {
				a = !1
			}))
		})
	}
	u.$(".toolbar .textinput input").bind("keypress", function(e) {
		if (e.which != 13) return;
		e.preventDefault();
		var t = $(this),
			i = t.val();
		if (!i) return;
		t.blur().val(""), t.parent().addClass(o), web.request("postcomment", {
			type: "feed-item-comment",
			id: u[n].id,
			body: i
		}, function(e, n) {
			t.parent().removeClass(o);
			if (e) return;
			n.comment.creationDate = (new Date).getTime() / 1e3, u[r].find(s).append(dom.feeditem_comment(n.comment)), u.repaintSocial()
		})
	})
}, FeedItemViewController.prototype.repaintSocial = function() {
	var e = ".social",
		t = "hidden",
		n = this;
	n.$feeditem.find(e).addClass(t), n.$feeditem.find(e).removeClass(t)
};