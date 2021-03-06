function ForumIndexViewController(e) {
	this._section = null, this._name = "ForumIndexView", this.game = session.getActiveGame(), this.game == enums.Game.OMAHA && (this.additionalStylesheetSection = enums.AppGameName[this.game]), RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_FORUM_TITLE"
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
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = ForumIndexViewController, ForumIndexViewController.prototype = new RefreshableViewController, ForumIndexViewController.prototype.constructor = ForumIndexViewController, ForumIndexViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, ForumIndexViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e)
}, ForumIndexViewController.prototype.viewDidAppear = function() {
	var e = this;
	e.refresh()
}, ForumIndexViewController.prototype.getMoreActivity = function(e) {
	var t = "scrollView",
		n = "page",
		r = "forumactivity",
		i = "activity";
	e || (e = function() {});
	var s = this,
		o = s[t].$content.find(".button.moreactivity"),
		u = parseInt(o.data(n));
	o.data(n, u + 10), web.request(s.game, r, {
		start: u
	}, function(n, o) {
		if (n) return;
		return (o[i][r].length < 1 || !o[i].forumactivityloadmore) && s[t].$content.find(".moreactivitybutton").hide(), o[i][r].forEach(function(e) {
			var t = $(template.render("ForumSingleActivity-thread", {
				thread: e
			}));
			t.addClick(function() {
				app.go("ForumThreadViewController", {
					section: !1,
					forum: s.forum,
					thread: e
				})
			}), s[i].append(t)
		}), e()
	})
}, ForumIndexViewController.prototype.refresh = function(e) {
	var t = "$content",
		n = "scrollView",
		r = "activity",
		i = "render",
		s = ".category-forums",
		o = "forEach",
		u = "addClick",
		a = "append";
	e || (e = function() {});
	var f = this;
	web.request(f.game, "forumindex", {
		language: locale.currentLanguage
	}, function(l, c) {
		f[n][t].empty();
		if (l) return;
		if (c[r] != undefined) {
			var h = $(template[i]("ForumAcitivyView", {
				category: {
					title: locale.t("ID_MOBILE_FORUM_ACTIVITY")
				}
			}));
			f[r] = h.find(s), c[r].forumactivity[o](function(e) {
				var t = $(template[i]("ForumSingleActivity-thread", {
					thread: e
				}));
				t[u](function() {
					app.go("ForumThreadViewController", {
						section: !1,
						forum: f.forum,
						thread: e
					})
				}), f[r][a](t)
			}), f[n][t][a](h), f[n][t].find(".button.moreactivity")[u](function() {
				f.getMoreActivity()
			})
		}
		return c.categories[o](function(e) {
			if (!e.forums.length) return;
			var r = $(template[i]("ForumIndexView-category", {
					category: e
				})),
				l = r.find(s);
			e.forums[o](function(e) {
				if (!e) return;
				var t = $(template[i]("ForumIndexView-forum", {
					forum: e
				}));
				e.linked ? t.addClass("external")[u](function() {
					app.goExternal(e.linked)
				}) : t[u](function() {
					app.go("ForumSingleViewController", {
						section: !1,
						forum: e
					})
				}), l[a](t)
			}), r[a](l), f[n][t][a](r)
		}), e()
	})
};