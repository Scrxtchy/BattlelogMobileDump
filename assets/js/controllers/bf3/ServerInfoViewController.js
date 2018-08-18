function ServerInfoViewController(e) {
	var t = "ServerInfoView";
	this._name = t, this._section = "bf3", this.server = null, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_SERVER_INFO", this.scrollViewTemplate = t
}
var dom = require("dom"),
	enums = require("enums"),
	locale = require("locale"),
	util = require("util"),
	session = require("session"),
	web = require("web"),
	gamedata = {
		bf3: {
			gameserver: require("gamedata/bf3/gameserver")
		}
	},
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = ServerInfoViewController, ServerInfoViewController.prototype = new ScrollableViewController, ServerInfoViewController.constructor = ServerInfoViewController, ServerInfoViewController.prototype.viewDidLoad = function() {
	var e = "$content",
		t = this;
	ScrollableViewController.prototype.viewDidLoad.call(t), t.$basicsettings = t[e].find(".section.basicsettings"), t.$description = t[e].find(".section.description"), t.$settings = t[e].find(".section.settings"), t.refresh()
}, ServerInfoViewController.prototype.updateData = function(e) {
	var t = this;
	t.server = e.server, t.hasLoaded && t.refresh()
}, ServerInfoViewController.prototype.refresh = function() {
	var e = "addClass",
		t = "$basicsettings",
		n = "hidden",
		r = "$description",
		i = ".content",
		s = "$settings",
		o = ".items",
		u = "server",
		a = "extendedInfo",
		f = "removeClass",
		l = "append",
		c = "stat_row",
		h = "ID_WEB_COMMON_ON",
		p = "ID_WEB_COMMON_OFF",
		d = "bold uppercaseLabel",
		v = "preset",
		m = "serverPresetMap",
		g = "gameserver",
		y = "settings",
		b = "serverSettings",
		w = "</div>",
		E = this;
	E[t][e](n).empty(), E[r][e](n).find(i).empty(), E[s][e](n).find(o).empty();
	if (!E[u]) return;
	var S = enums.Game.toString(E[u].game);
	E[u][a] && E[u][a].desc && (E[r].find(i).text(E[u][a].desc), E[r][f](n)), E[t][l](dom[c](locale.t("ID_WEB_SERVERGUIDE_FILTEREXTRA_RANKED"), E[u].ranked ? locale.t(h) : locale.t(p))[e](d)), E[u][v] && gamedata[S][g][m][E[u][v]] && E[t][l](dom[c](locale.t("ID_WEB_SERVERGUIDE_FILTEREXTRA_PRESET"), locale.t(gamedata[S][g][m][E[u][v]].label))[e](d)), E[t][l](dom[c](locale.t("ID_WEB_SERVERGUIDE_FILTEREXTRA_PUNKBUSTER"), E[u].punkbuster ? locale.t(h) : locale.t(p))[e](d)), E[t][l](dom[c](locale.t("ID_WEB_COMMON_PASSWORD"), E[u].hasPassword ? locale.t(h) : locale.t(p))[e](d)), E[t][f](n);
	if (E[u][y] && E[u][y].vshe) {
		var x = $("<div></div>");
		for (var T in gamedata[S][g][b]) {
			if (!gamedata[S][g][b].hasOwnProperty(T)) continue;
			var N = gamedata[S][g][b][T],
				C = E[u][y][T];
			C === undefined && (C = 0), N.type == "bool" && (C = C ? locale.t(h) : locale.t(p));
			var k = $('<div class="statrow"><div class="label">' + locale.t(N.nameSID) + w + '<div class="value">' + C + w + w);
			x[l](k)
		}
		E[s].find(o)[l](x), E[s][f](n)
	}
};