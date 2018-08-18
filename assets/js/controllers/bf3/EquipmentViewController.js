function EquipmentViewController(e) {
	var t = null;
	this._name = "EquipmentView", this._section = "bf3", this.user = t, this.persona = t, this.platform = t, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_EQUIPMENT", this.loadedData = t
}
var web = require("web"),
	util = require("util"),
	locale = require("locale"),
	dom = require("dom"),
	gamedata_bf3 = require("gamedata/bf3"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = EquipmentViewController, EquipmentViewController.prototype = new RefreshableViewController, EquipmentViewController.constructor = EquipmentViewController, EquipmentViewController.prototype.viewDidLoad = function() {
	var e = "scrollView",
		t = this;
	RefreshableViewController.prototype.viewDidLoad.call(t), t.$messages = $('<div class="messages"></div>'), t[e].$content.append(t.$messages), t.$table = $('<div class="sectiontable statitems equipment"></div>'), t[e].$content.append(t.$table), t.bindEvents(), t.refresh()
}, EquipmentViewController.prototype.bindEvents = function() {
	var e = "addClass",
		t = "selected",
		n = "removeClass",
		r = "$content",
		i = "scrollView",
		s = ".row",
		o = "hidden",
		u = this;
	u.$(".segmentedcontrol.kitfilter a").addClick(function(a) {
		var f = $(this);
		f[e](t), f.siblings()[n](t);
		var l = parseInt(f.data("kit"), 10);
		l ? (u[i][r].find(s)[e](o), u[i][r].find('.row[data-kit="' + l + '"]')[n](o)) : u[i][r].find(s)[n](o), u[i].scrollToTop()
	}), u.$('.segmentedcontrol.kitfilter a[data-kit="0"]')[e](t)
}, EquipmentViewController.prototype.resetDOM = function() {
	var e = "selected",
		t = this;
	t.$messages.empty(), t.$table.empty(), t.$(".segmentedcontrol.kitfilter a").removeClass(e), t.$('.segmentedcontrol.kitfilter a[data-kit="0"]').addClass(e)
}, EquipmentViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "overviewStats",
		r = "kitItems",
		i = "loadedData",
		s = "append",
		o = "hideLoadingIndicator",
		u = !1,
		a = "forEach",
		f = "performanceName",
		l = "formatStatValue",
		c = "performanceStatValue",
		h = "performances",
		p = "performancesString",
		d = "performancesValue",
		v = "</div>";
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
		var b = [];
		y[r][a](function(e) {
			var t = gamedata_bf3.items.gadgetsLocale.kititems[e.guid];
			if (!t) return;
			var n = [],
				r = 0;
			e[f] ? (n.push(util[l](e[c]) + " " + e[f]), r += e[c]) : e[h] && e[h].length && (e[h].sort(function(e, t) {
				return t.stat - e.stat
			}), e[h][a](function(e) {
				if (!e.name) return;
				var t = "ID_WEB_KIT_ITEM_" + e.name.toUpperCase().replace(" ", "_");
				n.push(util[l](e.stat) + " " + locale.t(t).toLowerCase()), r += e.stat
			}));
			var i = n.join("<br />"),
				s = {
					image: t.image,
					kit: e.kit,
					name: t.name,
					performancesString: i,
					performancesValue: r
				};
			b.push(s)
		}), b.sort(function(e, t) {
			return e[p] ? t[p] ? t[d] - e[d] : -1 : 1
		});
		var w = $("<div></div>"),
			E = 0;
		return b[a](function(e) {
			E += 1;
			var t = $('<div class="row equipment" data-kit="' + e.kit + '">' + '<div class="col number">' + '<div class="number">' + E + v + v + '<div class="col info">' + '<div class="image"><span class="item-image item gadget _' + e.image + '"></span></div>' + '<div class="name"><span class="kit-icon ' + util.kitEnum_to_kitName(e.kit) + '"></span> ' + locale.t(e.name) + v + v + '<div class="col performance">' + '<div class="performance">' + e[p] + v + v + v);
			t.data("kit", e.kit), w[s](t)
		}), m.$table[s](w), m[i] = y, m[o](), m[t] = u, e()
	})
};