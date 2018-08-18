function DrawerComCenterViewController() {
	var e = "DrawerComCenterView",
		t = null,
		n = "chatsUnread",
		r = "getActiveGame",
		i = "renderComCenterIconWithCount",
		s = this;
	this._name = e, this.drawerController = t, this[n] = 0, this.ccButton = t, RefreshableViewController.call(this), this.titleSID = "ID_MOBILE_VIEW_TITLE_COMCENTER", this.templateBundle = e, this.template = e, this.scrollViewTemplate = "DrawerComCenterView-scrollviewcontent", this.autoRefresh = !0, this.autoRefreshDelay = 6e4, this.userItems = [], this.activeUserItem = t, this.game = session[r](), this.gameName = enums.AppGameName[this.game], push.bind("UserPresenceChanged", function(e) {
		if (session[r]() == t) return;
		try {
			s.setPresenceAndRenderUser(e.userId, e)
		} catch (n) {
			app.error(n)
		}
	}), events.bind(["didLogOut"], function() {
		s.$el.find(".cc-container .friends").empty()
	}), events.bind(["ChatsUnread"], function(e) {
		app.log("ChatsUnread event (" + e + ")"), s[n] = e, $("#comcenter-friends-online").length ? $(function() {
			s[i]()
		}) : setTimeout(function() {
			s[i]()
		}, 500)
	})
}
var app = require("app"),
	dom = require("dom"),
	enums = require("enums"),
	locale = require("locale"),
	session = require("session"),
	template = require("template"),
	util = require("util"),
	web = require("web"),
	events = require("events"),
	presence = require("presence"),
	push = require("push"),
	storage = require("storage"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = DrawerComCenterViewController, DrawerComCenterViewController.prototype = new RefreshableViewController, DrawerComCenterViewController.constructor = DrawerComCenterViewController, DrawerComCenterViewController.prototype.viewDidLoad = function() {
	var e = "comcenter.hideoffline",
		t = "updateChatVisibility",
		n = this;
	RefreshableViewController.prototype.viewDidLoad.call(n), n.bindEvents(), n.refresh(), storage.getItem(e) && storage.getItem(e) != "false" && n.$el.find(".comcenter-list").addClass("hide-offline"), events.bind(["didLogIn"], function() {
		n[t]()
	}), n[t]()
}, DrawerComCenterViewController.prototype.updateChatVisibility = function() {
	var e = "hasRollout",
		t = "MOBILE_CHAT",
		n = "chatViewController",
		r = "removeClass",
		i = "scrollView",
		s = "header",
		o = "hidden",
		u = "has-chats",
		a = this;
	session[e](t) && !a[n] ? (a[i].$content.find(s)[r](o), a.$el.addClass(u), require(["js/../public/jsx/views/ChatViewController.js"], function(e) {
		a[n] = new e, a[n].init()
	})) : session[e](t) || (a[i].$content.find(s).addClass(o), a.$el[r](u))
}, DrawerComCenterViewController.prototype.bindEvents = function() {
	var e = "bind",
		t = "activeUserItem",
		n = "removeClass",
		r = "$el",
		i = "addClick",
		s = "find",
		o = ".search-container",
		u = "active",
		a = "empty",
		f = ".comcenter-search-results",
		l = "addClass",
		c = "#comcenter-search",
		h = ".comcenter-list",
		p = "hidden",
		d = "userSearch",
		v = "toLowerCase",
		m = "length",
		g = "forEach",
		y = "user",
		b = "userpresence_to_status",
		w = "<div></div>",
		E = "setActiveUserItem",
		S = "DrawerComCenterSearchNoMatches",
		x = "hide-offline",
		T = "chatViewController",
		N = "click",
		C = this;
	events[e]("activeGameDidChange", function() {
		C.addGameSpecificClass(), C.refresh()
	}), events[e]("refreshComcenter", function() {
		C.refresh()
	}), C.drawerController[e]("centerViewDidChange", function(e) {
		if (C[t]) {
			if (C[t].view == e.view) return;
			C[t][r][n]("selected"), C[t] = null
		}
	}), C[r][s](".clear-button")[i](function(e) {
		var t = C[r][s](o)[n](u);
		t[s](f)[a](), t[s](c).val("").blur()[l]("inactive"), C[r][s](h)[n](p), C[r][s](f)[l](p)
	}), C[r][s](c)[e]("focus paste keyup", function(e) {
		C[r][s](h)[l](p), C[r][s](f)[n](p), C[r][s](o)[l](u), C[d] = [];
		var t = $(this).val(),
			c = [],
			x = t[v]();
		if (x[m] > 0) {
			C.userItems[g](function(e) {
				e[y].username[v]().indexOf(x) == 0 && (C[d].push({
					status: util[b](e[y]),
					user: e[y]
				}), c.push(e[y].userId))
			});
			if (C[d][m]) {
				var T = $(w);
				C[d][g](function(e) {
					var t = dom.user_row(e[y]);
					t[i](function() {
						C[E](e)
					}), e[r] = t, T.append(e[r])
				}), C[r][s](f)[a]().html(T)
			}
		} else C[r][s](f)[a]().html(template.render(S));
		t[m] > 2 && web.request(session.getActiveGame(), "search", {
			name: t
		}, function(e, t) {
			if (t == undefined || t.matches[m] == 0 && C[d][m] == 0) {
				C[r][s](f)[a]().html(template.render(S));
				return
			}
			t.matches[g](function(e) {
				if (_[s](c, function(t) {
						return t == "" + e.userId
					})) return;
				C[d].push({
					status: util[b](e),
					user: e
				})
			});
			var n = $(w);
			C[d][g](function(e) {
				var t = dom.user_row(e[y]);
				t[i](function() {
					C[E](e)
				}), e[r] = t, n.append(e[r])
			}), C[r][s](f)[a]().html(n)
		})
	}), C[r][s](".toggle-offline-visible")[i](function(e) {
		var t = C[r][s](h);
		t.toggleClass(x), storage.setItem("comcenter.hideoffline", t.hasClass(x))
	});
	var k = C[r][s](".comcenter-button");
	try {
		events[e](["doShowChat"], function() {
			C[T].open()
		});
		var L = C[r][s](".chat-button");
		L.on(N, function() {
			C[T].open()
		}), k.on(N, function() {
			C[T].close()
		})
	} catch (A) {
		app.log(A)
	}
}, DrawerComCenterViewController.prototype.addGameSpecificClass = function() {
	var e = "closest",
		t = "$content",
		n = "scrollView",
		r = ".DrawerComCenterView",
		i = "addClass",
		s = this;
	s[n][t][e](r).removeClass("nv-warsaw nv-omaha venice");
	switch (session.getActiveGame()) {
		case enums.Game.WARSAW:
			s[n][t][e](r)[i]("nv-warsaw");
			break;
		case enums.Game.OMAHA:
			s[n][t][e](r)[i]("nv-omaha");
			break;
		case enums.Game.VENICE:
			s[n][t][e](r)[i]("venice")
	}
}, DrawerComCenterViewController.prototype.setPresenceAndRenderUser = function(e, t) {
	var n = "#cc_user_",
		r = !1,
		i = "userId",
		s = "user",
		o = "Could not find user in CC with userId; ",
		u = "status",
		a = "renderSection",
		f = "#cc_console_",
		l = "activeUserItem";
	if (this.isLoading) {
		app.log("Not setting presence since CC not loaded...");
		return
	}
	if ($(n + e).length) {
		var c = r;
		this.userItems.forEach(function(t) {
			if (t[s][i] == e) {
				c = t;
				return
			}
		});
		if (c == r) {
			app.log(o + e);
			return
		}
		c[s].presence = t, c[u] = util.userpresence_to_status(c[s]), this.createUserElement(c), $(n + e).remove(), this[a]("originfriends", c[u])
	}
	if ($(f + e).length) {
		var c = r;
		this.consoleItems.forEach(function(t) {
			if (t[s][i] == e) {
				c = t;
				return
			}
		});
		if (c == r) {
			app.log(o + e);
			return
		}
		c[s].presence = t, c[u] = util.consolepresence_to_status(c[s]), this.createConsoleUserElement(c), $(f + e).remove(), this[a]("consolefriends", c[u])
	}
	this.renderComCenterIconWithCount(), this[l] && this[l][s][i] == e && c.$el.addClass("selected")
}, DrawerComCenterViewController.prototype.createConsoleUserElement = function(e) {
	var t = this,
		n = session.getUserPresence(),
		r = session.getUserActivePersonas(),
		i = dom.console_user_row(e.user);
	if (presence.userCanJoinFriend(n, e.user.presence)) {
		var s = $('<div class="actions"></div>'),
			o = $('<a class="button primary join">&#9654;</a>');
		s.append(o), o.addClick(function(i) {
			i.stopPropagation(), events.emit("joiningFriend"), o.text("..."), web.request(enums.Game.WARSAW, "joinfriendserver", {
				platform: n.onlineGame.platform,
				friendPersonaId: e.user.presence.playingMp.personaId,
				personaId: r[enums.Game.WARSAW].personaId
			}, function() {
				setTimeout(function() {
					t.refresh()
				}, 1e3)
			})
		}), i.append(s)
	}
	i.addClick(function() {
		t.setActiveUserItem(e)
	}), e.$el = i
}, DrawerComCenterViewController.prototype.createUserElement = function(e) {
	var t = "user",
		n = "request",
		r = "addClick",
		i = "stopPropagation",
		s = "append",
		o = '<div class="loader small"></div>',
		u = "refresh",
		a = this,
		f = session.getUserPresence(),
		l = session.getUserActivePersonas(),
		c = dom.user_row(e[t]);
	if (e.status == n) {
		c.addClass("hidestatus");
		var h = $('<div class="actions"><a class="button inline accept"><span class="button-icon accept"></span></a><a class="button inline deny"><span class="button-icon deny"></span></a></div>');
		h.children(".accept")[r](function(r) {
			r[i](), h.empty()[s](o), web[n]("acceptfriendrequest", {
				userId: e[t].userId
			}, function(e, t) {
				e && app.error(e), a[u]()
			})
		}), h.children(".deny")[r](function(r) {
			r[i](), h.empty()[s](o), web[n]("denyfriendrequest", {
				userId: e[t].userId
			}, function(e, t) {
				e && app.error(e), a[u]()
			})
		}), c[s](h)
	} else if (presence.userCanJoinFriend(f, e[t].presence)) {
		var h = $('<div class="actions"></div>'),
			p = $('<a class="button primary join"><span class="inner">&#9654;</span></a>');
		h[s](p), p[r](function(r) {
			r[i](), events.emit("joiningFriend"), p.text("..."), web[n](enums.Game.WARSAW, "joinfriendserver", {
				platform: f.onlineGame.platform,
				friendPersonaId: e[t].presence.playingMp.personaId,
				personaId: l[enums.Game.WARSAW].personaId
			}, function() {
				setTimeout(function() {
					a[u]()
				}, 1e3)
			})
		}), c[s](h)
	}
	c[r](function() {
		a.setActiveUserItem(e)
	}), e.$el = c
}, DrawerComCenterViewController.prototype.renderComCenterIconWithCount = function() {
	var e = "ccButton",
		t = "#comcenter-friends-online",
		n = "ccIconAmount",
		r = "chatIcon",
		i = "chatsAmount",
		s = "chatsUnread",
		o = "addClass",
		u = "chat",
		a = "highlight",
		f = "removeClass",
		l = "playing",
		c = "online",
		h = "status",
		p = "friends-online",
		d = this;
	try {
		if (!this[e] || this[e].length == 0) this[e] = $(t).closest(".comcenter"), this[n] = this.$el.find(".cc-amount"), this[r] = this.$el.find(".chat-button"), this[i] = this.$el.find(".chats-amount");
		d[s] > 0 ? (this[e][o](u), this[r][o](a), this[i].html(d[s])) : (this[e][f](u), this[r][f](a), this[i].html(""));
		var v = {},
			m = !1;
		try {
			d.userItems.forEach(function(e) {
				[l, c].indexOf(e[h]) != -1 ? v[e.user.userId] = 1 : e[h] == "request" && (m = !0)
			})
		} catch (g) {
			app.log(g)
		}
		try {
			d.consoleItems.forEach(function(e) {
				[l, c].indexOf(e[h]) != -1 && (v[e.user.userId] = 1)
			})
		} catch (g) {
			app.log(g)
		}
		var y = Object.keys(v).length;
		d._nOnline = y, d._hasRequest = m, $(t).html(y), this[n].html(y), y || m ? this[e][o](p) : this[e][f](p)
	} catch (g) {}
}, DrawerComCenterViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "getActiveGame",
		r = "forEach",
		i = "userItems",
		s = "activeUserItem",
		o = !1,
		u = "request",
		a = "addClass",
		f = "find",
		l = "$content",
		c = "scrollView",
		h = "hidden",
		p = "removeClass",
		d = "scrollToTop",
		v = "length",
		m = "consolefriends",
		g = "renderSection",
		y = "originfriends";
	e || (e = function() {});
	var b = this;
	if (b[t]) return e();
	if (session[n]() == null) return;
	this.game = session[n](), this.gameName = enums.AppGameName[this.game], session.hasRollout("MOBILE_CHAT") && b.chatViewController && require(["js/../public/jsx/stores/ChatStore.js"], function(e) {
		e.refreshChats()
	}), b[i][r](function(e) {
		if (!e.view) return;
		if (b[s] == e) {
			e.view.persist = o;
			return
		}
		e.view.unloadView()
	}), b[t] = !0, b.lastRefresh = new Date, b.addGameSpecificClass(), web[u](session[n](), "comcenter", {
		game: session[n]()
	}, function(w, E) {
		return b[c][l][f](".cc-container .section")[a](h), b[c][l][f](".cc-container .sectiontitle")[a](h), b[c][l][f](".cc-container .friends").empty(), b[c][l][f](".cc-container .sectionerror").remove(), session[n]() != enums.Game.BF3 && b[c][l][f](".search-container")[a]("nv-" + b.gameName)[p](h), b[i] = [], b.consoleItems = [], b[s] = null, w ? (b[c][d](), b[c][l].append(dom.error_row(locale.t("ID_MOBILE_COMCENTER_ERROR"))), b[t] = o, e()) : !E.friends[v] && (!E[m] || !E[m][v]) ? (b[c][d](), b[c][l].append(dom.error_row(locale.t("ID_MOBILE_COMCENTER_NOFRIENDS"))), b[t] = o, e()) : (E.requests[r](function(e) {
			b[i].push({
				status: u,
				user: e
			})
		}), E.friends[r](function(e) {
			b[i].push({
				status: util.userpresence_to_status(e),
				user: e
			})
		}), b[i][r](function(e) {
			b.createUserElement(e)
		}), b[g]("", u), b[g](y, "playing"), b[g](y, "online"), b[g](y, "offline"), b[c][l][f](".originfriends .sectiontitle")[p](h), E[m] && E[m][v] && b.renderConsoleFriends(E[m]), b.renderComCenterIconWithCount(), b[t] = o, e())
	})
}, DrawerComCenterViewController.prototype.renderConsoleFriends = function(e) {
	var t = "consoleItems",
		n = "renderSection",
		r = "consolefriends",
		i = this;
	e.forEach(function(e) {
		var n = e.user;
		n.username = e.personaName, n.isConsole = !0, i[t].push({
			status: util.consolepresence_to_status(n),
			user: n,
			persona: e
		})
	}), i[t].forEach(function(e) {
		i.createConsoleUserElement(e)
	}), i[n](r, "playing"), i[n](r, "online"), i[n](r, "offline");
	var s = enums.Platform.toString(session.getUserActivePersonaForGame(enums.Game.WARSAW).platform);
	i.scrollView.$content.find(".consolefriends .sectiontitle .platform").html(s).parent().removeClass("hidden")
}, DrawerComCenterViewController.prototype.renderSection = function(e, t) {
	var n = "forEach",
		r = this,
		i = e == "consolefriends",
		e = e ? "." + e + " " : "",
		s = r.$(e + ".section." + t),
		o = s.find(".sectionhead .count"),
		u = s.find(".friends"),
		a = [];
	i ? r.consoleItems[n](function(e) {
		if (e.status != t) return;
		a.push(e)
	}) : r.userItems[n](function(e) {
		if (e.status != t) return;
		a.push(e)
	}), a.sort(function(e, t) {
		return util.userPresenceSort(e.user, t.user)
	});
	var f = $("<div></div>");
	a[n](function(e) {
		f.append(e.$el)
	}), u.empty().append(f), o.text(a.length), s.toggleClass("hidden", a.length === 0)
}, DrawerComCenterViewController.prototype.setActiveUserItem = function(e) {
	var t = "activeUserItem",
		n = "selected",
		r = "view",
		i = "drawerController",
		s = "getActiveGame",
		o = "setCenterViewWithNameParams",
		u = "NavigationController",
		a = !0,
		f = "ProfileViewController",
		l = this;
	l[t] && l[t].$el.removeClass(n), l[t] = e, e.$el.addClass(n), e[r] ? l[i].setCenterView(e[r]) : session[s]() == enums.Game.WARSAW ? l[i][o](u, {
		persist: a,
		styleSection: "warsaw",
		rootViewName: f,
		rootViewParams: {
			user: e.user
		}
	}, function(t, n) {
		e[r] = n
	}) : session[s]() == enums.Game.BF3 ? l[i][o](u, {
		persist: a,
		section: "bf3",
		rootViewName: "UserViewController",
		rootViewParams: {
			user: e.user
		}
	}, function(t, n) {
		e[r] = n
	}) : session[s]() == enums.Game.OMAHA && l[i][o](u, {
		persist: a,
		styleSection: "omaha",
		rootViewName: f,
		rootViewParams: {
			user: e.user
		}
	}, function(t, n) {
		e[r] = n
	})
};