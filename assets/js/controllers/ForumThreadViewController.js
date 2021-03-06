function ForumThreadViewController(e) {
	var t = null;
	this._name = "ForumThreadView", this._section = t, this.game = session.getActiveGame(), this.forum = t, this.thread = t, this.posts = t, this.lastPosterId = t, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_FORUM_THREAD_TITLE", this.scrollViewTemplate = "ForumThreadView-scrollviewcontent"
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
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = ForumThreadViewController, ForumThreadViewController.prototype = new RefreshableViewController, ForumThreadViewController.prototype.constructor = ForumThreadViewController, ForumThreadViewController.prototype.loadView = function(e) {
	var t = "find",
		n = "$content",
		r = "scrollView",
		i = "totalPosts",
		s = "totalPages",
		o = "$pagination",
		u = "addClick",
		a = "hasClass",
		f = "disabled",
		l = "page",
		c = "addClass",
		h = ".button",
		p = "refresh";
	e || (e = function() {});
	var d = this;
	d.forum && (d.title = d.forum.title), RefreshableViewController.prototype.loadView.call(d, function() {
		d.$posts = d[r][n][t](".section.posts"), d[r][n][t](".thread-title").text(d.thread.title), d[i] = d.thread.numberOfPosts + 1, d[s] = Math.ceil(d[i] / enums.ForumDefinitions.PAGESIZE), d[o] = d[r][n][t](".section.pagination");
		if (d[s] > 1) {
			var v = d[o][t](".button.first"),
				m = d[o][t](".button.last"),
				g = d[o][t](".button.next"),
				y = d[o][t](".button.previous");
			g[u](function() {
				g[a](f) || (d[l] = d[l] + 1, d[o][t](h)[c](f), d[p]())
			}), m[u](function() {
				m[a](f) || (d[l] = d[s], d[o][t](h)[c](f), d[p]())
			}), y[u](function() {
				y[a](f) || (d[l] = d[l] - 1, d[o][t](h)[c](f), d[p]())
			}), v[u](function() {
				v[a](f) || (d[l] = 1, d[o][t](h)[c](f), d[p]())
			})
		} else d[o].hide();
		return e()
	})
}, ForumThreadViewController.prototype.viewDidLoad = function() {
	var e = this;
	e.page = 1, RefreshableViewController.prototype.viewDidLoad.call(e), e.bindEvents(), e.refresh()
}, ForumThreadViewController.prototype.refresh = function(e) {
	var t = "page",
		n = "totalPages",
		r = "scrollView",
		i = "thread",
		s = "lastPosterId",
		o = "getUserId",
		u = "find",
		a = "$content",
		f = ".section.reply",
		l = "posts",
		c = "owner",
		h = "friendlyDate",
		p = "lastEditedDate",
		d = "append",
		v = "$pagination",
		m = "removeClass",
		g = "disabled",
		y = "addClass",
		b = "addClick",
		w = "closest",
		E = ".post-row",
		S = "post-id",
		x = "data-post-id",
		T = "showReceipt",
		N = "skull";
	e || (e = function() {});
	var C = this;
	C[t] != 1 && C[n] && (C[t] = util.clamp(C[t], 1, C[n])), C[r].scrollTop(0), web.request(C.game, "forumthreadview", {
		threadId: C[i].id,
		page: C[t]
	}, function(k, L) {
		if (k) return;
		C.$posts.empty(), C[s] = L[i][s], C[s] == session[o]() && (C[r][a][u](f).hide(), C[r][a][u](".section.cannot-reply").show());
		var A = $("<div></div>"),
			O = session[o]();
		return C[l] = L[l], L[l].forEach(function(e) {
			e.isCensored && (e.formattedBody = locale.t("ID_WEB_FORUM_POST_CENSORED")), e.myPost = e[c].userId == O;
			var t = $(template.render("ForumThreadView-post", {
				edit: e[c].userId == O,
				post: e,
				postdate: util[h](e.creationDate * 1e3),
				lastEditedDate: e[p] ? util[h](e[p] * 1e3) : !1
			}));
			t[u](".post-author-avatar")[d](dom.user_avatar(e[c])), A[d](t)
		}), C.$posts[d](A), C[n] > 1 && (C[t] = util.clamp(C[t], 1, C[n]), C[v][u](".pagenumber").html(C[t] + "/" + C[n]), C[v][u](".button")[m](g), C[t] == 1 ? (C[v][u](".button.first")[y](g), C[v][u](".button.previous")[y](g)) : C[t] == C[n] && (C[v][u](".button.next")[y](g), C[v][u](".button.last")[y](g))), C[r][a][u](".post-author")[b](function() {
			var e = $(this)[w](E).data(S);
			for (var t in C[l])
				if (C[l][t].id == e) {
					var n = enums.AppGameName[session.getActiveGame()];
					app.go("ProfileViewController", {
						styleSection: n,
						user: C[l][t][c]
					});
					break
				}
		}), C[r][a][u](".col-report")[b](function(e) {
			e.stopPropagation();
			var t = $(this)[w](E).data(S);
			for (var n in C[l])
				if (C[l][n].id == t) {
					app.go("ReportAbuseViewController", {
						type: "forumpost",
						postId: C[l][n].id
					});
					break
				}
		}), C[r][a][u](".edit-post")[b](function() {
			var e = $(this)[w](E).attr(x),
				t = _[u](C[l], function(t) {
					return t.id == e
				});
			app.go("ForumEditPostViewController", {
				forum: C.forum,
				thread: C[i],
				post: t
			})
		}), C[r][a][u](".quote-post")[b](function() {
			if (C[s] == session[o]()) {
				receipt[T](locale.t("ID_MOBILE_FORUM_THREADVIEW_NO_DOUBLE_POSTS"), N);
				return
			}
			var e = $(this)[w](E).attr(x);
			$(this)[y](g);
			var t = this;
			web.request(C.game, "forumquotepostcontent", {
				post_id: e
			}, function(n, i) {
				$(t)[m](g);
				if (n) {
					receipt[T](locale.t("ID_WEB_SHOWRECEIPT_GENERIC_ERROR"), N);
					return
				}
				var s = _[u](C[l], function(t) {
						return t.id == e
					}),
					o = s[c].username,
					f = "[quote " + o + " " + locale.t("ID_WEB_FORUM_QUOTE_SAID") + "]" + i.body.trim() + "[/quote]",
					h = C[r][a][u](".section.reply textarea");
				h.val(h.val() + f + "\n").focus()
			})
		}), C[r][a][u](".post-content .spoiler")[b](function() {
			$(this)[y]("revealed")
		}), C[r][a][u](".post-content a")[b](function(e) {
			return e.preventDefault(), app.goExternal($(this).attr("href")), !1
		}), C[i].isLocked && (C[r][a][u](f).hide(), C[r][a][u](".section.thread-locked").show(), C[r][a][u](".post-options").hide()), e()
	})
}, ForumThreadViewController.prototype.bindEvents = function() {
	var e = "find",
		t = "$content",
		n = "scrollView",
		r = ".section.reply textarea",
		i = "selectionStart",
		s = "selectionEnd",
		o = "substring",
		u = "length",
		a = "showReceipt",
		f = "skull",
		l = this,
		c = l[n][t][e](r);
	c.bind("blur", function() {
		var e = $(this).get(0);
		l[i] = e[i], l[s] = e[s]
	}), l[n][t][e](".forum-bb-buttons .button").addClick(function(e) {
		var t = $(e.currentTarget),
			n = c,
			r = t.attr("data-before"),
			a = t.attr("data-after"),
			f = n.get(0),
			h = l[i],
			p = l[s],
			d = f.value[o](0, h),
			v = f.value[o](p),
			m = f.value[o](h, p),
			g;
		g = d + r + m + a + v, n.val(g);
		var y = p + r[u] + a[u];
		h == p && (y = p + r[u]), util.setCaretPosition(n[0], y)
	}), l[n][t][e](r).bind("focus change", function(e) {
		window.setTimeout(function() {
			l[n].$wrapper.scrollTop(l[n].$wrapper[0].scrollHeight)
		}, 1e3)
	}), l[n][t][e](".section.reply .button.post").addClick(function() {
		var i = l[n][t][e](r),
			s = i.val();
		i.val(""), web.request(l.game, "forumcreatepost", {
			threadId: l.thread.id,
			body: s,
			publishToFeed: "False"
		}, function(e, t) {
			e == "POST_TOO_SHORT" && receipt[a](locale.t("ID_MOBILE_FORUM_POSTTOOSHORT"), f), e == "USER_BANNED" && receipt[a](locale.t("ID_MOBILE_FORUM_BANNED"), f);
			if (e) return;
			if (!t.post) return;
			l.refresh()
		})
	})
};