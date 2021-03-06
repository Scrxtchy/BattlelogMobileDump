function AssignmentsViewController(e) {
	var t = null;
	this._name = "AssignmentsView", this._section = "bf3", this.user = t, this.persona = t, this.platform = t, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_ASSIGNMENTS", this.templateBundle = t, this.template = t, this.backButtonTitleSID = "ID_MOBILE_COMMON_BACK", this.loadedData = t
}
var app = require("app"),
	web = require("web"),
	util = require("util"),
	dom = require("dom"),
	locale = require("locale"),
	gamedata_bf3 = require("gamedata/bf3"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = AssignmentsViewController, AssignmentsViewController.prototype = new RefreshableViewController, AssignmentsViewController.constructor = AssignmentsViewController, AssignmentsViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, AssignmentsViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = !0,
		r = "overviewStats",
		i = "userGameExpansions",
		s = "missions",
		o = !1,
		u = "$content",
		a = "scrollView",
		f = "scrollToTop",
		l = "append",
		c = "hideLoadingIndicator",
		h = "forEach",
		p = "expansions",
		d = "code",
		v = "completion",
		m = "completed",
		g = "locked",
		y = "dependencies",
		b = "</div>",
		w = ".image";
	e || (e = function() {});
	var E = this;
	if (E[t]) return e("BUSY");
	E.showLoadingIndicator(), E.lastRefresh = new Date, E[t] = n, web.request("bf3", "soldierstats", {
		personaId: E.persona.personaId,
		platform: E.platform,
		statTypes: [r, i, s].join(",")
	}, function(S, x) {
		return E.itemsLoaded = [], E.reachedLastItem = o, E[a][u].empty(), S ? (E[a][f](), E[a][u][l](dom.error_row(locale.t("ID_MOBILE_STATS_ERROR"))), E[c](), E[t] = o, e()) : !x[r] || !x[s] ? (E[a][f](), E[a][u][l](dom.error_row(locale.t("ID_MOBILE_STATS_NOSTATS"))), E[c](), E[t] = o, e()) : (gamedata_bf3[p].assignmentExpansions[h](function(e) {
			if (!x[s][e]) return;
			var t = [],
				r = {};
			for (var o in x[s][e][s]) {
				if (!x[s][e][s].hasOwnProperty(o)) continue;
				var f = x[s][e][s][o];
				t.push(f), r[f[d]] = f
			}
			t.sort(function(e, t) {
				return e[d] < t[d] ? -1 : 1
			});
			var c = $('<div class="section missions-' + e + '"></div>');
			c[l]('<div class="sectionhead">' + locale.t(gamedata_bf3[p].expansionMap[e].label)), t[h](function(t) {
				t[v] >= 100 ? t[m] = n : t.license && !util.hasExpansion(x[i], e, E.platform) ? t[g] = n : t[y].length && t[y][h](function(e) {
					r[e[d]][v] < 100 && (t[g] = n, t.lockedReason = locale.t("ID_MOBILE_ASSIGNMENTS_DEPENDENCY", {
						name: locale.t(r[e[d]].stringID)
					}))
				});
				var s = t[g] ? g : t.imageName,
					o = $('<div class="statitem assignment progress"><div class="image"><span class="item-image assignment _' + s + '"></span>' + b + '<div class="info">' + '<div class="name">' + locale.t(t.stringID) + b + b + b);
				if (t[m]) o.addClass(m), o.find(w)[l]('<div class="progressbar compact completed"><div></div></div>');
				else if (t[g]) o.addClass(g), o.find(w)[l]('<div class="progressbar compact"><div></div></div>');
				else {
					var u = t[v] / 100;
					o.find(w)[l]('<div class="progressbar compact"><div style="-webkit-transform: scaleX(' + u + ');"></div></div>')
				}
				o.addClick(function(n) {
					app.go("AssignmentDetailViewController", {
						mission: t,
						gameExpansion: e
					})
				}), c[l](o)
			}), E[a][u][l](c)
		}), E.loadedData = x, E[c](), E[t] = o, e())
	})
};