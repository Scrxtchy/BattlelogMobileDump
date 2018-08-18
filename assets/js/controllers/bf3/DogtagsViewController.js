function DogtagsViewController(e) {
	var t = null;
	this._name = "DogtagsView", this._section = "bf3", this.user = t, this.persona = t, this.platform = t, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_DOGTAGS", this.loadedData = t
}
var app = require("app"),
	assets = require("assets"),
	session = require("session"),
	locale = require("locale"),
	dom = require("dom"),
	web = require("web"),
	util = require("util"),
	gamedata_bf3 = require("gamedata/bf3"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = DogtagsViewController, DogtagsViewController.prototype = new RefreshableViewController, DogtagsViewController.constructor = DogtagsViewController, DogtagsViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.bindEvents(), e.refresh(function(t) {
		if (t) return;
		if (session.isLoggedIn() && e.user.userId == session.getUserId()) {
			var n = $('<div class="edit-button-container"><a class="button small grey edit">' + locale.t("ID_WEB_COMMON_EDIT") + "</a>" + "</div>");
			n.find("a.edit").addClick(function(t) {
				app.go("DogtagsEditorViewController", {
					user: e.user,
					persona: e.persona,
					platform: e.platform,
					loadedData: e.loadedData
				}, function(t) {
					t.bind("dogtagsSaved", function(t) {
						e.dogTagsEdited(t)
					})
				})
			}), e.$(".toolbar.currentdogtags").append(n)
		}
	})
}, DogtagsViewController.prototype.bindEvents = function() {
	var e = "addClass",
		t = "selected",
		n = "removeClass",
		r = "scrollView",
		i = "hidden",
		s = this;
	s.$(".segmentedcontrol.type a").addClick(function(o) {
		var u = $(this);
		u[e](t), u.siblings()[n](t);
		var a = u.data("type");
		s[r].$content.find(".dogtags")[e](i), s[r].$content.find(".dogtags." + a)[n](i), s[r].scrollToTop()
	}), s.$('.segmentedcontrol.type a[data-type="taken"]')[e](t)
}, DogtagsViewController.prototype.resetDOM = function() {
	var e = "selected",
		t = this;
	t.scrollView.$content.empty(), t.$(".segmentedcontrol.type a").removeClass(e), t.$('.segmentedcontrol.type a[data-type="taken"]').addClass(e)
}, DogtagsViewController.prototype.dogTagsEdited = function(e) {
	var t = this;
	["basic", "advanced"].forEach(function(n) {
		var r = e[n],
			i = gamedata_bf3.dogtags.dogtags[n][r];
		if (!i) return;
		t.loadedData.currentDogTags[n + "DogTag"] = i;
		var s = assets.prodCDNUrl("images/bf3/dogtags/" + i.image + ".png");
		t.$(".toolbar.currentdogtags ." + n).css("background-image", "url(" + s + ")")
	})
}, DogtagsViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = !0,
		r = "persona",
		i = "overviewStats",
		s = "currentDogTags",
		o = "dogTags",
		u = "loadedData",
		a = "scrollToTop",
		f = "scrollView",
		l = "append",
		c = "$content",
		h = "hideLoadingIndicator",
		p = !1,
		d = "forEach",
		v = "basic",
		m = "advanced",
		g = "dogtags",
		y = "index",
		b = "prodCDNUrl",
		w = "images/bf3/dogtags/",
		E = ".png",
		S = "background-image",
		x = "url(",
		T = "taken",
		N = "unlocked";
	e || (e = function() {});
	var C = this;
	if (C[t]) return e("BUSY");
	C.showLoadingIndicator(), C[t] = n, C.lastRefresh = new Date, web.request("bf3", "soldierstats", {
		personaId: C[r].personaId,
		platform: C.platform,
		statTypes: [i, s, o].join(",")
	}, function(k, L) {
		C[u] = null, C.resetDOM();
		if (k) return C[f][a](), C[f][c][l](dom.error_row(locale.t("ID_MOBILE_STATS_ERROR"))), C[h](), C[t] = p, e(n);
		if (!L[i] || !L[o]) return C[f][a](), C[f][c][l](dom.error_row(locale.t("ID_MOBILE_STATS_NOSTATS"))), C[h](), C[t] = p, e(n);
		C[r].clanTag && C.$(".toolbar.currentdogtags .basic .soldiername .clantag").text("[" + C[r].clanTag + "]"), C.$(".toolbar.currentdogtags .basic .soldiername .name").text(C[r].personaName), L[s] && [v, m][d](function(e) {
			var t = L[s][e + "DogTag"];
			if (!t) return;
			var n = gamedata_bf3[g][g][e][t[y]];
			if (!n) return;
			var r = assets[b](w + n.image + E);
			C.$(".toolbar.currentdogtags ." + e).css(S, x + r + ")")
		});
		var A = [],
			O = {};
		return L[o][T][v].concat(L[o][T][m])[d](function(e) {
			O[e[y]] || (O[e[y]] = {}), O[e[y]][T] = e.counter
		}), L[o][N][v].concat(L[o][N][m])[d](function(e) {
			O[e[y]] || (O[e[y]] = {}), O[e[y]][N] = n
		}), [T, N][d](function(e) {
			if (!L[o][e]) return;
			var t = $('<div class="dogtags ' + e + '"></div>');
			e != T && t.addClass("hidden");
			var n = $("<div></div>");
			[v, m][d](function(t) {
				if (!L[o][e][t]) return;
				L[o][e][t][d](function(r) {
					var i = gamedata_bf3[g][g][t][r[y]];
					if (!i) return;
					var s = $('<div class="dogtag"></div>'),
						o = assets[b](w + i.image + E);
					s.css(S, x + o + ")");
					if (e == N && t == m && r[y] == 0) return;
					O[r[y]][N] ? s[l]($('<div class="unlocked"></div>')) : s[l]($('<div class="locked"></div>')), O[r[y]][T] && s[l]($('<div class="taken">' + O[r[y]][T] + "x</div>")), n[l](s)
				})
			}), t[l](n), C[f][c][l](t)
		}), C[u] = L, C[h](), C[t] = p, e()
	})
};