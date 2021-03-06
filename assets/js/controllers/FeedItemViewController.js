function FeedItemViewController(e) {
	this._name = "FeedItemView", this.game = session.getActiveGame(), this.gameName = enums.AppGameName[this.game], this.feeditem = null, this.feedItemId = null, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_FEEDITEM"
}
var session = require("session"),
	locale = require("locale"),
	app = require("app"),
	dom = require("dom"),
	web = require("web"),
	util = require("util"),
	enums = require("enums"),
	receipt = require("receipt"),
	template = require("template"),
	RefreshableViewController = require("controllers/RefreshableViewController"),
	ScrollViewController = require("controllers/ScrollViewController");
module.exports = FeedItemViewController, FeedItemViewController.prototype = new RefreshableViewController, FeedItemViewController.constructor = FeedItemViewController, FeedItemViewController.prototype.loadView = function(e) {
	var t = "scrollView";
	e || (e = function() {});
	var n = this;
	RefreshableViewController.prototype.loadView.call(n, function() {
		n[t] = new ScrollViewController, n.subviews.push(n[t]), n[t].init(function() {
			return n.$el.append(n[t].$el), e()
		})
	})
}, FeedItemViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.refresh(), e.bindEvents()
}, FeedItemViewController.prototype.renderPage = function() {
	var e = "$social",
		t = "$hooah",
		n = "feeditem",
		r = !0,
		i = "append",
		s = "indexOf",
		o = "likeUserIds",
		u = "userId",
		a = "tokenInfo",
		f = '<div class="hooahs"></div>',
		l = "feeditem_hooahs",
		c = "isCommentable",
		h = "render",
		p = !1,
		d = "addClick",
		v = "find",
		m = ".button.hooah",
		g = ".hooahs",
		y = "request",
		b = ".col-report",
		w = "stopPropagation",
		E = "ReportAbuseViewController",
		S = "feedItem",
		x = "parent",
		T = "loading",
		N = "removeClass",
		C = "creationDate",
		k = "comment",
		L = "avatar",
		A = "owner",
		O = "small",
		M = "friendlyTimestamp",
		_ = "FeedItemView-comment",
		D = "goToProfileAction",
		P = "repaintSocial",
		H = this;
	H.$feed = $('<div class="section battlefeed"></div>'), H[e] = $('<div class="social detail sectioninfo"></div>'), H[t] = $('<div class="hooah-container clearfix"></div>'), H.$feeditem = dom[n](H[n], {
		isDetailView: r
	}), H[e][i](H[t]), H.$feed[i](H.$feeditem, H[e]), H.scrollView.$content[i](H.$feed), session.isLoggedIn() && H[n][o][s](session[a].user[u]) == -1 && H[n][o][s](session[a].user[u] - 2) == -1 && H[t][i]('<div class="button secondary hooah">' + locale.t("ID_WEB_COMMON_HOOAH") + "</div>"), H[n].numLikes && H[t][i]($(f)[i](dom[l](H[n]))), H[n][c] && (H.$el.addClass(c), H.$el[i](template[h]("FeedItemView-comment-toolbar")));
	var B = p;
	H[t][v](m)[d](function(e) {
		if (B) return;
		B = r, H[n][o][s](session[a].user[u]) == -1 && (H[t][v](m).remove(), H[n].numLikes += 1, H[n][o].push(session[a].user[u]), H[t][v](g).length || H[t][i](f), H[t][v](g).empty()[i](dom[l](H[n])), web[y]("feeditemlike", {
			feedItemId: H[n].id
		}, function(e, t) {
			B = p
		}))
	}), H.$(b)[d](function(e) {
		e[w](), app.go(E, {
			type: S,
			feeditem: H[n]
		})
	}), H.$(".toolbar .textinput input").bind("keypress", function(t) {
		if (t.which != 13) return;
		t.preventDefault();
		var s = $(this),
			o = s.val();
		if (!o) return;
		s.blur().val(""), s[x]().addClass(T), web[y]("postcomment", {
			type: "feed-item-comment",
			id: H[n].id,
			body: o
		}, function(t, n) {
			if (t == "NO_BODY") s[x]()[N](T), s.val(""), receipt.showReceipt(locale.t("ID_WEB_COMMON_RECEIPT_NO_MESSAGE_SET"), "error");
			else {
				var o;
				s[x]()[N](T);
				if (t) return;
				n[k][C] = (new Date).getTime() / 1e3, n[k][L] = template[h](L, {
					user: n[k][A],
					size: O
				}), n[k].date = util[M](n[k][C]), n[k].myComment = r, o = template[h](_, n[k]), H[e][i](o)[v](".author:last").on("click", function(e) {
					return e[w](), util[D](n[k][A]), p
				}), H[P]()
			}
		})
	}), web[y]("feeditemcomments", {
		feedItemId: H[n].id
	}, function(t, r) {
		if (t) return;
		var s = "";
		r.comments.forEach(function(e, t) {
			e[L] = template[h](L, {
				user: e[A],
				size: O
			}), e.date = util[M](e[C]), e.myComment = e[A][u] == session.getUserId(), s += template[h](_, e)
		}), s && (H[e][v](".comment").remove(), H[e][i](s)[v](".comment .author")[d](function(e) {
			var t = $(this).index();
			return e[w](), util[D](r.comments[t][A]), p
		}), H[e][v](b)[d](function(e) {
			e[w]();
			var t = $(this).data("commentid");
			app.go(E, {
				type: S,
				feeditem: {
					id: H[n].id,
					commentId: t
				}
			})
		})), H[P]()
	})
}, FeedItemViewController.prototype.refresh = function() {
	var e = "isLoading",
		t = "feeditem",
		n = "renderPage",
		r = this;
	if (r[e]) return callback("BUSY");
	r[t] ? r[n]() : (r.showLoadingIndicator(), r[e] = !0, web.request(t, {
		feedItemId: r.feedItemId
	}, function(i, s) {
		if (i || !s[t]) return;
		r[t] = s[t], r.hideLoadingIndicator(), r[e] = !1, r[n]()
	}))
}, FeedItemViewController.prototype.bindEvents = function() {
	var e = this
}, FeedItemViewController.prototype.repaintSocial = function() {
	var e = ".social",
		t = "hidden",
		n = this;
	n.$feeditem.find(e).addClass(t), n.$feeditem.find(e).removeClass(t)
};