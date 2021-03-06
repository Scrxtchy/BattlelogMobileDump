function AwardsViewController(e) {
	var t = null;
	this._name = "AwardsView", this._section = "bf3", this.user = t, this.persona = t, this.platform = t, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_AWARDS", this.loadedData = t
}
var web = require("web"),
	dom = require("dom"),
	util = require("util"),
	locale = require("locale"),
	gamedata_bf3 = require("gamedata/bf3"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = AwardsViewController, AwardsViewController.prototype = new RefreshableViewController, AwardsViewController.constructor = AwardsViewController, AwardsViewController.prototype.viewDidLoad = function() {
	var e = "scrollView",
		t = this;
	RefreshableViewController.prototype.viewDidLoad.call(t), t.$messages = $('<div class="messages"></div>'), t[e].$content.append(t.$messages), t.$table = $('<div class="awards show-medals"></div>'), t[e].$content.append(t.$table), t.bindEvents(), t.refresh()
}, AwardsViewController.prototype.bindEvents = function() {
	var e = "addClass",
		t = "selected",
		n = "removeClass",
		r = this;
	r.$(".segmentedcontrol.typefilter a").addClick(function(i) {
		var s = $(this);
		s[e](t), s.siblings()[n](t);
		var o = s.data("type") || "medals";
		r.$table[n]("show-medals show-ribbons"), r.$table[e]("show-" + o)
	}), r.$('.segmentedcontrol.typefilter a[data-type="medals"]')[e](t)
}, AwardsViewController.prototype.resetDOM = function() {
	var e = this;
	e.$messages.empty(), e.$table.empty()
}, AwardsViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "overviewStats",
		r = "awards",
		i = "loadedData",
		s = "append",
		o = "hideLoadingIndicator",
		u = !1,
		a = "awardsOrder",
		f = "award",
		l = "medal",
		c = "ribbon",
		h = "</div>",
		p = "timesTaken",
		d = "find",
		v = ".image";
	e || (e = function() {});
	var m = this;
	if (m[t]) return e("BUSY");
	m.showLoadingIndicator(), m[t] = !0, m.lastRefresh = new Date, web.request("bf3", "soldierstats", {
		personaId: m.persona.personaId,
		platform: m.platform,
		statTypes: [n, r].join(",")
	}, function(g, y) {
		m[i] = null, m.resetDOM();
		if (g) return m.scrollView.scrollToTop(), m.$messages[s](dom.error_row(locale.t("ID_MOBILE_STATS_ERROR"))), m[o](), m[t] = u, e();
		if (!y[n] || !y[r] || !y[r].length) return m.$messages[s](dom.error_row(locale.t("ID_MOBILE_STATS_NOSTATS"))), m[o](), m[t] = u, e();
		y[r].sort(function(e, t) {
			return gamedata_bf3[r][a].indexOf(e[f].code) - gamedata_bf3[r][a].indexOf(t[f].code)
		});
		var b = $('<div class="medals"></div>'),
			w = $('<div class="ribbons"></div>');
		return y[r].forEach(function(e) {
			var t = gamedata_bf3[r].statsLocale[r][e.unlockId];
			if (!t) return;
			var n = "";
			e.group == "AwardGroup_Medals" ? n = l : e.group == "AwardGroup_Ribbons" && (n = c);
			var i = $('<div class="statitem award ' + n + ' progress">' + '<div class="image"></div>' + '<div class="info">' + '<div class="name">' + locale.t(e[f].stringID) + h + '<div class="description">' + locale.t(e[f].descriptionID) + h + h + h);
			e[p] > 1 ? i[d](v)[s]('<div class="awardcount">x' + e[p] + h) : e[p] || i[d](v).addClass("not-taken");
			var o;
			if (n == l) {
				i[d](v)[s]('<span class="item-image medal _' + t.image + '"></span>');
				if (e[f].awardType != "AwardType_Limited" || e[p] != 100)
					if (e[f].awardType != "AwardType_OnceGlobally" || e[p] != 1) {
						var u = e.actualValue / e.valueNeeded;
						i[d](".name").after('<div class="progressbar"><div style="-webkit-transform: scaleX(' + u + ');"></div></div>')
					}
				b[s](i)
			} else n == c && (i[d](v)[s]('<span class="item-image ribbon _' + t.image + '""></span>'), w[s](i))
		}), m.$table[s](b), m.$table[s](w), m[i] = y, m[o](), m[t] = u, e()
	})
};