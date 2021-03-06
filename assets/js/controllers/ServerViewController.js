function ServerViewController(e) {
	var t = "backbone",
		n = "_collection",
		r = "_model";
	this._name = "ServerView", this.scrollViewTemplate = "ServerInfoView", this._params = e, this._section = null, this.game = e.game || session.getActiveGame(), this.gameName = enums.AppGameName[this.game], this._guid = e.guid, this._ugm = BL[t].get({
		model: "ugm_model"
	}), this[n] = BL[t].get({
		collection: "server_list_collection"
	}), this[r] = this[n].get(this._guid) || BL[t].get({
		model: {
			name: "server_model",
			data: {
				guid: this._guid,
				manual: !0
			}
		}
	}), this._templateParams = this[r] ? this[r].toJSON() : {
		loading: !0
	}, this._game = e.game, this._platform = e.platform, this._activeGamePersona = session.getUserActivePersonaForGame(this._game), this._pc = this._platform == enums.Platform.PC, RefreshableViewController.call(this, e), this._pc && (this.cssClass = "pc"), this.titleSID = "ID_MOBILE_VIEW_TITLE_SERVER_INFO"
}
var locale = require("locale"),
	dom = require("dom"),
	enums = require("enums"),
	presence = require("presence"),
	session = require("session"),
	template = require("template"),
	web = require("web"),
	events = require("events"),
	RefreshableViewController = require("controllers/RefreshableViewController"),
	receipt = require("receipt"),
	model = require("models/model.multiplayer"),
	ugm = require("models/model.ugm"),
	util = require("util"),
	device = require("device");
module.exports = ServerViewController, ServerViewController.prototype = new RefreshableViewController, ServerViewController.constructor = ServerViewController, ServerViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return e()
	}), t._model.get("name") || t.refresh(), t._ugm.on("change", t.render, t), t._model.on("change", t.render, t)
}, ServerViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.refresh()
}, ServerViewController.prototype.refresh = function() {
	var e = this;
	e.isLoading || (e.lastRefresh = new Date, e.isLoading = !0, e.render(), e._model.fetch(e.getUrl()), e.hideLoadingIndicator())
}, ServerViewController.prototype.getUrl = function() {
	var e = this,
		t = [e._game, "serverinfo", {
			platform: e._platform,
			guid: e._guid
		}];
	return web.url.apply(web, t)
}, ServerViewController.prototype.render = function() {
	var e = "_activeGamePersona",
		t = "disabled",
		n = "joinTabComClass",
		r = "gameExpansion",
		i = this,
		s = i._model.toJSON();
	i[e] ? s.joinClass = i._ugm.canJoin(i._platform, i._game, i[e]) ? "" : t : s.joinClass = t, s[n] = "", s[r] && (s[n] = util.hasExpansion(session.getUserGameExpansions(), s[r]) ? "" : t);
	if (s[n] == "") try {
		s[n] = s.maxCommanders > 0 ? "" : t
	} catch (o) {
		app.error("Could not calculate commander size in SB...")
	}
	s.isRushGameMode = s.mapMode == enums.GameMode.RUSH, s.onServer = i._ugm.onServer(s.guid), s.gameName = enums.Platform.toString(i._platform), s.isTablet = device.isTablet(), s.isBfh = i.game == enums.Game.OMAHA, s.ServerNotFound = s.error && s.error == "SERVER_NOT_FOUND", template.render("ServerInfoView", s, function(e, t) {
		i.isLoading = !1, i.scrollView.$content.html(t), i.bindEvents()
	})
}, ServerViewController.prototype.bindEvents = function() {
	var e = "_activeGamePersona",
		t = "scrollView",
		n = "disabled",
		r = "_model",
		i = !1,
		s = "showReceipt",
		o = "skull",
		u = "type",
		a = "blazeServiceName",
		f = "blazeEnvironment",
		l = "authenticationCode",
		c = "mutedPlayers",
		h = "JoinStates",
		p = this;
	p[e] && (p[t].$content.find(".join .remote").addClick(function() {
		if (this.className.indexOf(n) == -1) {
			p[r].set({
				joining: !0
			});
			var t = p[r].toJSON();
			web.request(t.game, "joinserver", {
				platform: t.platform,
				gameId: t.gameId,
				userId: session.getUserId(),
				personaId: p[e].persona.personaId
			}, function(e, t) {
				e ? (p[r].set({
					joining: i
				}), receipt[s](locale.t("ID_MOBILE_SERVERINFO_JOIN_FAIL"), o)) : receipt[s](locale.t("ID_MOBILE_SERVERINFO_JOIN_SUCCESS"))
			})
		} else receipt[s](locale.t("ID_MOBILE_SERVERINFO_JOIN_NEED_ONLINE").replace("%platform%", enums.Platform.toString(p._platform)), o)
	}), p[t].$content.find(".join .tabcom").addClick(function() {
		if (this.className.indexOf(n) === -1) {
			p[r].set({
				joiningTabCom: !0
			});
			var t = p[r].toJSON();
			web.request(t.game, "jointabcom", {
				platform: t.platform,
				reservePersonaId: p[e].persona.personaId,
				gameId: t.gameId,
				role: enums.GameServerRoleTypes.COMMANDER,
				sourceGuid: util.getGuidForWindow()
			}, function(e, n) {
				if (e || n && !n[u]) p[r].set({
					joiningTabCom: i
				}), receipt[s](n[u] ? n[u] : locale.t("ID_MOBILE_ERROR_RECEIPT"), o), console.error("Failed to join as Tablet Commander:", n);
				else if (n[u] === "RESERVATION") {
					var d = n.reservation;
					d[a] = n[a], d[f] = n[f], d[l] = n[l], d.gameProtocolVersion = parseInt(t.protocolVersionString, 10), d[c] = n[c] || [];
					switch (d.joinState) {
						case enums[h].GROUP_PARTIALLY_JOINED:
							receipt[s](locale.t("ID_MOBILE_SERVERINFO_JOIN_TABCOM_PARTIALLY_JOINED")), console.info("TABCOMJOIN: GROUP_PARTIALLY_JOINED");
							break;
						case enums[h].JOINED_GAME:
							p[r].set({
								joiningTabCom: i
							}), device.joinTabCom(d);
							break;
						case enums[h].IN_QUEUE:
							receipt[s](locale.t("ID_MOBILE_SERVERINFO_JOIN_TABCOM_IN_QUEUE")), console.info("TABCOMJOIN: IN_QUEUE");
							break;
						default:
							console.info("TABCOMJOIN: Join state not handled: " + d.joinState)
					}
				} else receipt[s](n[u], o), app.error("Failed to join as Tablet Commander, resp:", n)
			})
		}
	}))
};