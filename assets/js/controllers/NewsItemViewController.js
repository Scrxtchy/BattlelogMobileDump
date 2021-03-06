function NewsItemViewController(e) {
	this._name = "NewsItemView", this.game = session.getActiveGame(), this.game == enums.Game.OMAHA && (this.additionalStylesheetSection = enums.AppGameName[this.game]), this.newsitem = null, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_NEWSITEM"
}
var locale = require("locale"),
	util = require("util"),
	enums = require("enums"),
	web = require("web"),
	session = require("session"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = NewsItemViewController, NewsItemViewController.prototype = new ScrollableViewController, NewsItemViewController.prototype.constructor = NewsItemViewController, NewsItemViewController.prototype.viewDidLoad = function() {
	var e = "newsitem",
		t = "loadNewsItem",
		n = this;
	ScrollableViewController.prototype.viewDidLoad.call(n), n[e].postId ? web.request(n.game, "getnewspost", {
		postId: n[e].postId
	}, function(r, i) {
		n[e] = i.blogPost, n[t]()
	}) : n[t]()
}, NewsItemViewController.prototype.loadNewsItem = function() {
	var e = "find",
		t = "$content",
		n = "newsitem",
		r = "append",
		i = "user",
		s = this;
	s[t][e](".title").html(s[n].title);
	var o = $("<div></div>");
	s[n].wpguid ? o[r](s[n].content) : (s[n].preamble && o[r](s[n].preamble)[r]("<br /><br />"), o[r](s[n].body)), o[e]("iframe").each(function(e, t) {
		var n = $(t),
			r = $(t).attr("src");
		if (r.substring(0, 23) == "http://www.youtube.com/") {
			var i = $('<a class="button youtube"></a>').html("&#9658;").attr("href", r);
			n.replaceWith(i)
		} else n.remove()
	}), o[e]("a").addClick(function(e) {
		return !1
	}), s[t][e](".body")[r](o), s[n][i] && s[n][i].username ? (s[t][e](".author-avatar").addClass(util.userpresence_to_status(s[n][i])), s[t][e](".author-avatar > img").attr("src", util.gravatar(s[n][i].gravatarMd5, 20)), s[t][e](".author-name").text(s[n][i].username), s[t][e](".author-link").addClick(function() {
		var e = enums.AppGameName[session.getActiveGame()];
		util.goToProfileAction(s[n][i])
	})) : s[t][e](".author").addClass("hidden"), s[t][e](".date").text(util.friendlyTimestamp(s[n].publishDate))
};