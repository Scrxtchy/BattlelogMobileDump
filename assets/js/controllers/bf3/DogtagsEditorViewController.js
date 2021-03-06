function DogtagsEditorViewController(e) {
	var t = null;
	this._name = "DogtagsEditorView", this._section = "bf3", this.persona = t, this.user = t, this.loadedData = t, ViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_DOGTAGS_EDITOR", this.currentTags = t, this.editedTags = t, this.hasEdited = !1, this.isSaving = !1
}
var web = require("web"),
	gamedata_bf3 = require("gamedata/bf3"),
	ViewController = require("controllers/ViewController"),
	ScrollViewController = require("controllers/ScrollViewController"),
	locale = require("locale"),
	assets = require("assets");
module.exports = DogtagsEditorViewController, DogtagsEditorViewController.prototype = new ViewController, DogtagsEditorViewController.constructor = DogtagsEditorViewController, DogtagsEditorViewController.prototype.loadView = function(e) {
	var t = "scrollView",
		n = this;
	ViewController.prototype.loadView.call(n, function() {
		n[t] = new ScrollViewController({
			parentViewController: n
		}), n.subviews.push(n[t]), n[t].init(function() {
			return n.$content = n[t].$content, n.$el.append(n[t].$el), e()
		})
	})
}, DogtagsEditorViewController.prototype.viewDidLoad = function() {
	var e = this;
	ViewController.prototype.viewDidLoad.call(e), e.bindEvents(), e.initEditor()
}, DogtagsEditorViewController.prototype.bindEvents = function() {
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
		s.$(".toolbar .current-dogtags div")[n](t), s.$(".toolbar .current-dogtags ." + a)[e](t), s[r].$content.find(".dogtags")[e](i), s[r].$content.find(".dogtags." + a)[n](i), s[r].scrollToTop()
	}), s.$(".toolbar .current-dogtags .basic")[e](t), s.$('.segmentedcontrol.type a[data-type="basic"]')[e](t)
}, DogtagsEditorViewController.prototype.selectTag = function(e, t) {
	var n = "editedTags",
		r = "hasEdited",
		i = "isSaving",
		s = "loading",
		o = "parentViewController",
		u = "currentTags",
		a = this;
	a[n][e] = t.index, a.$(".toolbar .current-dogtags ." + e).css("background-image", "url(" + assets.prodCDNUrl("images/bf3/dogtags/" + t.image + ".png") + ")");
	if (!a[r]) {
		a[r] = !0;
		var f = $('<div class="edit-button-container"><a class="button small grey save">' + locale.t("ID_WEB_COMMON_BUTTON_SAVE") + "</a>" + "</div>");
		f.find("a.save").addClick(function(e) {
			if (a[i]) return;
			a[i] = !0;
			var t = $(this).addClass(s);
			web.request("bf3", "savedogtags", {
				personaId: a.persona.personaId,
				platform: a.platform,
				basic: a[n].basic,
				advanced: a[n].advanced
			}, function(e, f) {
				e && t.removeClass(s), a.navbarRightItem = null, a[o].updateNavbar(), a[i] = !1, a[u] = a[n], a[n] = {
					basic: a[u].basic,
					advanced: a[u].advanced
				}, a[r] = !1, a.emit("dogtagsSaved", a[n]), a.isVisible && a[o].goBack()
			})
		}), a.$(".toolbar.currentdogtags").append(f)
	}
}, DogtagsEditorViewController.prototype.initEditor = function(e) {
	var t = "persona",
		n = "currentTags",
		r = "currentDogTags",
		i = "forEach",
		s = "basic",
		o = "advanced",
		u = "dogtags",
		a = "index",
		f = "addClass",
		l = "image",
		c = "prodCDNUrl",
		h = "images/bf3/dogtags/",
		p = ".png",
		d = "background-image",
		v = "url(",
		m = "unlocked",
		g = "selected";
	e || (e = function() {});
	var y = this,
		b = y.loadedData;
	return y[t].clanTag && y.$(".toolbar .current-dogtags .basic .soldiername .clantag").text("[" + y[t].clanTag + "]"), y.$(".toolbar .current-dogtags .basic .soldiername .name").text(y[t].personaName), y[n] = {
		basic: 0,
		advanced: 0
	}, b[r] && [s, o][i](function(e) {
		var t = b[r][e + "DogTag"];
		if (!t) return;
		var i = gamedata_bf3[u][u][e][t[a]];
		if (!i) return;
		y[n][e] = t[a], y.$(".toolbar .current-dogtags ." + e)[f]("_" + i[l]);
		var s = assets[c](h + i[l] + p);
		y.$(".toolbar.currentdogtags ." + e).css(d, v + s + ")")
	}), [s, o][i](function(e) {
		if (!b.dogTags[m][e]) return;
		var t = $('<div class="dogtags ' + e + '"></div>');
		e != s && t[f]("hidden"), b.dogTags[m][e][i](function(r) {
			var i = gamedata_bf3[u][u][e][r[a]];
			if (!i) return;
			var s = $('<a class="item-image dogtag _' + i[l] + '"></a>');
			s.addClick(function() {
				s.siblings().removeClass(g), s[f](g), y.selectTag(e, i)
			}), y[n][e] == r[a] && s[f](g);
			var o = assets[c](h + i[l] + p);
			s.css(d, v + o + ")"), t.append(s)
		}), y.scrollView.$content.append(t)
	}), y.editedTags = {
		basic: y[n][s],
		advanced: y[n][o]
	}, e()
};