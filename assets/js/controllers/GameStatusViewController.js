function GameStatusViewController(e) {
	this._name = "GameStatusView", this._game = session.getActiveGame(), this._gameName = enums.AppGameName[this._game], this._model = BL.backbone.get({
		model: {
			name: "ugm_model"
		}
	}), this._height = 50, ViewController.call(this, e)
}
require("jquery-ui");
var _ = require("underscore"),
	BL = require("backbone-helper"),
	app = require("app"),
	device = require("device"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	events = require("events"),
	presence = require("presence"),
	push = require("push"),
	template = require("template"),
	util = require("util"),
	web = require("web"),
	ViewController = require("controllers/ViewController"),
	model = require("models/model.ugm");
module.exports = GameStatusViewController, GameStatusViewController.prototype = new ViewController, GameStatusViewController.prototype.constructor = GameStatusViewController, GameStatusViewController.prototype.viewDidLoad = function() {
	var e = "bindEvents",
		t = this;
	t._game != enums.Game.BF3 && t[e](), events.bind("didLogOut", function() {
		t.reset(!0)
	}), events.bind("activeGameDidChange", function(n) {
		game = n.game, t._game = game, game != enums.Game.BF3 ? (t[e](), t.animate_ugm()) : t.reset(!0)
	}), events.bind("didChangeActivePersona", function(e) {
		e.personaId = e.persona.personaId, e.isSelf = t._model.isSelf(e), t._model.set(e)
	}), events.bind("didLogIn", function() {
		session.getActiveGame() != enums.Game.BF3 && t[e]()
	})
}, GameStatusViewController.prototype.bindEvents = function() {
	var e = "_model",
		t = "userId",
		n = !1,
		r = "onlineGame",
		i = "personaName",
		s = this;
	s[e].set(session.getUserPresence()), s._beacon = push.bind("UserPresenceChanged", function(o) {
		o[t] = o[t] || 0;
		var u = session.getUserActivePersonaForGame(s._game);
		if (u == undefined) return;
		o[t] == u[t] && (o.isPlaying = o.isPlaying || n, o.playingMp = o.playingMp || n, o[r] = o[r] || n, o.isSelf = s[e].isSelf(u, o), o[i] = u.persona[i], s[e].set(o), events.emit("ugmUpdated", o))
	}), s.emit("didBind")
}, GameStatusViewController.prototype.viewDidAppear = function() {
	var e = "_model",
		t = "change",
		n = "personaName",
		r = this;
	r[e].on(t, r.animate_ugm, r);
	if (session.isLoggedIn()) {
		var i = session.getUserActivePersonaForGame(r._game);
		if (i) {
			var s = session.getUserPresence();
			s.isSelf = r[e].isSelf(i, s), s[n] = i.persona[n], r[e].set(s, {
				silent: !0
			}).trigger(t)
		}
	}
}, GameStatusViewController.prototype.viewWillDisappear = function() {
	var e = this;
	e._model.off("change", e.animate_ugm, e)
}, GameStatusViewController.prototype.bindButtons = function() {
	var e = "addClick",
		t = "viewStack",
		n = "centerView",
		r = "mainView",
		i = "rootViewController",
		s = !1,
		o = "length",
		u = "_name",
		a = "LoadoutView",
		f = !0,
		l = "MultiplayerView",
		c = "getActiveGame",
		h = "click",
		p = "playingMp",
		d = "serverGuid",
		v = "getAttribute",
		m = this;
	m.$(".btn-loadout:not(.active)")[e](function() {
		var e = app[i][r][n][t],
			l = s,
			c = 0,
			h = e[o];
		if (h > 1)
			while (c < h) {
				if (c > 20) break;
				var p = e[c];
				if (p[u] != undefined && p[u] == a && p._overview) {
					l = f, app[i][r][n].popToView(p);
					break
				}
				c++
			}!l && (h == 0 || e[h - 1][u] == undefined || e[h - 1][u] != a) && app.go("LoadoutViewController", {
				section: "warsaw",
				modal: f
			})
	}), m.$(".btn-server-browser:not(.active)")[e](function() {
		var e = app[i][r][n][t],
			a = s,
			h = 0,
			p = e[o];
		if (p > 1)
			while (h < p) {
				if (h > 20) break;
				var d = e[h];
				if (d[u] != undefined && d[u] == l) {
					a = f, app[i][r][n].popToView(d);
					break
				}
				h++
			}
		if (!a && (p == 0 || e[p - 1][u] == undefined || e[p - 1][u] != l)) {
			var v = enums.AppGameName[session[c]()];
			app.go("MultiplayerViewController", {
				section: v,
				modal: f
			})
		}
	}), m.$(".btn-battlescreen")[e](function() {
		web.request(session[c](), "battlescreendata", function(e, t) {
			if (e || !t) {
				app.error(e);
				return
			}
			model.platform === enums.Platform.XBOXONE ? device.launchSmartGlass(enums.URLGame[session[c]()]) : device.launchBattlescreen(enums.URLGame[session[c]()], t.ip, t.port, t.token)
		})
	}), m.$(".ugm-server-info .ugm-server-name").on(h, function() {
		var e = session.getUserPresence();
		if (typeof e[p] != "undefined") {
			var s = app[i][r][n][t],
				a = s[o] - 1,
				f = s[a],
				l = f[u] == "ServerView",
				c = l && f.guid == e[p][d];
			if (!c) {
				var h = ["ServerViewController", {
					styleSection: m._gameName,
					game: m._game,
					platform: e[p].platform,
					guid: e[p][d]
				}];
				l && h.push(function() {
					app[i][r][n].removeViewAtIndex(a)
				}), app.go.apply(app, h)
			}
		}
	}), m.$(".btn-switch-soldier").on(h, function() {
		var e = parseInt(this[v]("data-game"), 10),
			t = this[v]("data-persona-id"),
			n = parseInt(this[v]("data-platform"), 10),
			r = session.getUserPersonasForGame(e),
			i = s,
			u = 0,
			a = r[o];
		while (u < a) {
			var f = r[u];
			if (f.personaId == t) {
				i = f;
				break
			}
			u++
		}
		i && session.setUserActivePersonaForGame(e, i, n)
	})
}, GameStatusViewController.prototype.reset = function(e) {
	var t = this;
	t._model.clear({
		silent: !0
	}).set(t._model.defaults), e && (push.unbind("UserPresenceChanged", t._beacon), t.emit("didUnbind")), t.emit("didReset")
}, GameStatusViewController.prototype.animate_ugm = function() {
	var e = this,
		t = e._model.toJSON(),
		n = t.playingMp || t.onlineGame || !1;
	n != 0 && n.game == e._game ? e.animate_show() : e.$el.height() > 0 && e.animate_hide()
}, GameStatusViewController.prototype.animate_hide = function(e) {
	e = typeof e == "function" ? e : function() {};
	var t = this;
	t._model.set({
		hidden: !0
	}, {
		silent: !0
	}), t.$el.stop().animate({
		bottom: "-100px"
	}, 500, "easeInBack", function() {
		t.$el.css("height", 0), t.render(), e(), t.emit("didHide")
	})
}, GameStatusViewController.prototype.animate_show = function() {
	var e = "_model",
		t = "isSelf",
		n = this,
		r = n[e].get("hidden"),
		i = n[e].get(t);
	n.render();
	if (r || i != n[e].previous(t)) {
		n[e].set({
			hidden: !1
		}, {
			silent: !0
		});
		var s = -n._height;
		n.$el.css("height", n._height * 2).stop().animate({
			bottom: s
		}, 500, "easeOutBack", function() {
			n.emit("didShow")
		})
	}
}, GameStatusViewController.prototype.render = function() {
	var e = !1,
		t = !0,
		n = "playingMp",
		r = "platform",
		i = "personaId",
		s = "serverName",
		o = "game",
		u = " ",
		a = "ID_MOBILE_UGM_ON",
		f = "Platform",
		l = "onlineGame",
		c = this,
		h = c._model.toJSON(),
		p = {
			isPlaying: e,
			isSelf: h.isSelf,
			personaName: h.personaName,
			singleTitle: h.isSelf,
			message: "",
			isTablet: device.isTablet(),
			battlescreenAvailable: e,
			loadoutAvailable: t,
			serverbrowserAvailable: t,
			ifBfh: e
		};
	if (h[n]) {
		p[r] = h[n][r], p[i] = h[n][i], p[s] = h[n][s], p[o] = h[n][o], p.singleTitle = e, p.state = "playing", p.isPlaying = t, p.message = locale.t("ID_MOBILE_UGM_PLAYING") + u + enums.GameTitle[p[o]] + u + locale.t(a) + u + enums[f].toString(p[r]);
		var d = [enums.Game.WARSAW].indexOf(p[o]) > -1,
			v = [enums[f].PC, enums[f].PS4, enums[f].XBOXONE].indexOf(p[r]) > -1;
		p.battlescreenAvailable = device.isTablet() && d && v
	} else h[l] && (p[r] = h[l][r], p[i] = h[l][i], p[o] = h[l][o], p.state = "connected", p.message = locale.t("ID_MOBILE_UGM_CONNECTED") + u + enums.GameTitle[p[o]] + u + locale.t(a) + u + enums[f].toString(p[r]));
	p[o] == enums.Game.OMAHA && (p.loadoutAvailable = e, p.serverbrowserAvailable = e, p.isBfh = t), template.render("GameStatusView", p, function(e, t) {
		c.$el.html(t), c.bindButtons()
	})
};