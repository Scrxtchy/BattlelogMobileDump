function ServerMaplistViewController(e) {
	this._name = "ServerMaplistView", this._section = "bf3", this.server = null, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_SERVER_MAPLIST", this.templateBundle = null, this.template = null
}
var assets = require("assets"),
	locale = require("locale"),
	gamedata = require("gamedata/all"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = ServerMaplistViewController, ServerMaplistViewController.prototype = new ScrollableViewController, ServerMaplistViewController.constructor = ServerMaplistViewController, ServerMaplistViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, ServerMaplistViewController.prototype.updateData = function(e) {
	var t = this;
	t.server = e.server, t.hasLoaded && t.refresh()
}, ServerMaplistViewController.prototype.refresh = function() {
	var e = "server",
		t = "mapMode",
		n = "mapVariant",
		r = "</div>",
		i = this;
	i.$content.empty();
	if (!i[e] || !i[e].maps || !i[e].maps.length) return;
	var s = $('<div class="maplist"></div>');
	i[e].maps.forEach(function(o) {
		var u = gamedata.bf3.levels.levels[o.map],
			a = "",
			f = "",
			l = "unknown";
		u ? (a = locale.t(u.label), f = locale.t("ID_WEB_COMMON_GAMEMODE_" + o[t], {}, ""), l = u.id.toLowerCase()) : a = locale.t("ID_WEB_COMMON_UNKNOWN");
		var c = "images/bf3/maps/" + l + ".jpg",
			h = o.map == i[e].map && o[t] == i[e][t] && o[n] == i[e][n],
			p = $('<div class="map"><div class="image"><span class="map-image" style="background-image:url(' + c + ');"></span></div>' + '<div class="info">' + '<div class="name">' + a + r + '<div class="gamemode">' + f + r + r + r);
		h && p.addClass("current"), s.append(p)
	}), i.$content.append(s)
};