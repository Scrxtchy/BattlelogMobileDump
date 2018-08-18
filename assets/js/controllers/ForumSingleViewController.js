function ForumSingleViewController(e) {
	this._name = "ForumSingleView", this.game = session.getActiveGame(), this.forum = null, this.game == enums.Game.OMAHA && (this.additionalStylesheetSection = enums.AppGameName[this.game]), RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_FORUM_TITLE", this.scrollViewTemplate = "ForumSingleView-scrollviewcontent"
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
module.exports = ForumSingleViewController, ForumSingleViewController.prototype = new RefreshableViewController, ForumSingleViewController.prototype.constructor = ForumSingleViewController, ForumSingleViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	t.title = t.forum.title, RefreshableViewController.prototype.loadView.call(t, function() {
		return t.$threads = t.scrollView.$content.find(".section.threads"), e()
	})
}, ForumSingleViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.bindEvents(), e.refresh()
}, ForumSingleViewController.prototype.getMoreThreads = function(e, t) {
	var n = "find",
		r = "$content",
		i = "scrollView",
		s = "append",
		o = "length",
		u = "$threads";
	t || (t = function() {});
	var a = this,
		f = a[i][r][n](".section.morethreadsbutton .button.morethreads"),
		l = parseInt(f.data("page"));
	web.request(a.game, "forumsingleview", {
		forumId: a.forum.id,
		page: l
	}, function(e, f) {
		if (e == "ACCESS_DENIED") return a[i][r].empty(), a[i][r][s](dom.error_row(locale.t("ID_MOBILE_FORUM_ACCESSDENIED"))), a.hideLoadingIndicator(), a.isLoading = !1, t();
		if (e) return;
		return a[u][n](".sectionloading")[o] && a[u].empty(), f.threads[o] < 1 && (a[i][r][n](".thread-row")[o] ? a[u][s](dom.empty_row(locale.t("ID_MOBILE_FORUMS_NO_ADDITIONAL_THREADS"))) : a[u].html(dom.empty_row(locale.t("ID_MOBILE_FORUMS_NO_THREADS"))), a[i][r][n](".section.morethreadsbutton").hide()), f.threads.forEach(function(e) {
			var t = $(template.render("ForumSingleView-thread", {
				thread: e
			}));
			t.addClick(function() {
				app.go("ForumThreadViewController", {
					section: !1,
					forum: a.forum,
					thread: e
				})
			}), a[u][s](t)
		}), a.forum.locked && a[i][r][n](".button.newthread").hide(), t()
	})
}, ForumSingleViewController.prototype.refresh = function(e) {
	e || (e = function() {});
	var t = this;
	t.$threads.html('<div class="sectionloading"></div>'), t.scrollView.$content.find(".section.morethreadsbutton .button.morethreads").data("page", 1), t.getMoreThreads()
}, ForumSingleViewController.prototype.bindEvents = function() {
	var e = "$content",
		t = "scrollView",
		n = ".section.morethreadsbutton .button.morethreads",
		r = "page",
		i = this;
	i[t][e].find(".section.newthreadbutton .button.newthread").addClick(function() {
		app.go("ForumCreateThreadViewController", {
			forum: i.forum
		})
	}), i[t][e].find(n).addClick(function() {
		var s = i[t][e].find(n),
			o = parseInt(s.data(r));
		s.data(r, o + 1), i.getMoreThreads()
	})
};