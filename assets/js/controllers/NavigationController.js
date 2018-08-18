function NavigationController(e) {
	var t = null;
	this._name = "NavigationView", this.section = t, this.usingCombinedController = t, this.styleSection = t, this.rootView = t, this.topView = t, this.navbarLeftItem = t, this.navbarRightItem = t, this.transparentNavbar = !1, this.hideTitle = !1, this.game = session.getActiveGame(), ViewController.call(this, e), this.userInteractionEnabled = !0, this.viewStack = []
}
var async = require("lib/async"), app = require("app"), enums = require("enums"), storage = require("storage"), locale = require("locale"), events = require("events"), device = require("device"), session = require("session"), template = require("template"), ViewController = require("controllers/ViewController");
module.exports = NavigationController, NavigationController.prototype = new ViewController, NavigationController.prototype.constructor = NavigationController, NavigationController.prototype.loadView = function(e) {
	var t = "$navbar",
		n = "addClass",
		r = "transparentNavbar",
		i = "hideTitle",
		s = "styleSection",
		o = "section",
		u = "navbarLeftItem",
		a = "$navbarLeft",
		f = "append",
		l = "navbarRightItem",
		c = "$navbarRight";
	e || (e = function() {});
	var h = this;
	ViewController.prototype.loadView.call(h, function() {
		return h.$view = h.$c(".view"), h.$viewOverlay = h.$c(".view-overlay"), h[t] = h.$c(".navbar"), session.getUserHasPremium(h.game) && h[t][n]("premium"), h[r] && h.$el[n](r), h[i] && h.$el[n](i), h[s] ? (h.$view[n]("nv-" + h[s]), h[t][n](h[s])) : h[o] && (h.$view[n]("nv-" + h[o]), h[t][n](h[o])), h[u] && (h[a] = $('<div class="left"></div>'), h[a][f](h[u].$el), h[t][f](h[a])), h[l] && (h[c] = $('<div class="right"></div>'), h[c][f](h[l].$el), h[t][f](h[c]), device.isTablet() && app.rootViewController.notificationBar.$el.appendTo(h[c])), e()
	})
}, NavigationController.prototype.viewDidLoad = function() {
	var e = "rootViewName",
		t = this;
	ViewController.prototype.viewDidLoad.call(t), t.rootView ? t.pushView(t.rootView) : t[e] && t.go(t[e], t.rootViewParams)
}, NavigationController.prototype.viewWillAppear = function() {
	var e = "viewWillAppear",
		t = this;
	ViewController.prototype[e].call(t), t.topView && t.topView[e]()
}, NavigationController.prototype.viewDidAppear = function() {
	var e = "viewDidAppear",
		t = "evtHashchange",
		n = "topView",
		r = this;
	ViewController.prototype[e].call(r), app.frontend != "hybrid_ios" && (location.hash || (location.hash = (new Date).getTime()), r[t] = function(e) {
		r.windowHashChanged(e)
	}, $(window).bind("hashchange", r[t])), r[n] && (r[n][e](), r.trackScreen(r[n]))
}, NavigationController.prototype.viewWillDisappear = function() {
	var e = "viewWillDisappear",
		t = this;
	ViewController.prototype[e].call(t), t.topView && t.topView[e]()
}, NavigationController.prototype.viewDidDisappear = function() {
	var e = "viewDidDisappear",
		t = this;
	ViewController.prototype[e].call(t), app.frontend != "hybrid_ios" && $(window).unbind("hashchange", t.evtHashchange), t.topView && t.topView[e]()
}, NavigationController.prototype.didReceiveMemoryWarning = function() {
	var e = this;
	ViewController.prototype.didReceiveMemoryWarning.call(e), e.isVisible || e.popToRootView()
}, NavigationController.prototype.unloadView = function() {
	var e = "unloadView",
		t = "navbarLeftItem",
		n = "detach",
		r = "navbarRightItem",
		i = this;
	i.viewStack.forEach(function(t) {
		t[e]()
	}), i.topView = null, i.rootView = null, i.viewStack = [], i[t] && i[t].$el[n](), device.isTablet() && app.rootViewController.notificationBar.$el[n](), i[r] && i[r].$el[n](), ViewController.prototype[e].call(i)
}, NavigationController.prototype.windowHashChanged = function(e) {
	var t = this;
	if (location.hash) return;
	if (!t.userInteractionEnabled) {
		location.hash = (new Date).getTime();
		return
	}
	t.viewStack.length > 1 ? t.goBack() : t.parentViewController.goBack()
}, NavigationController.prototype.buildNavbar = function(e) {
	var t = "navbarTitleItem",
		n = "append",
		r = "navbarLeftItem",
		i = "handleBackButton",
		s = '<a class="button back"><span class="button-icon back"></span></a>',
		o = "navbarRightItem",
		u = this,
		a = $('<div class="viewnavbar"></div>'),
		f = $('<div class="title"></div>'),
		l = $('<div class="left"></div>'),
		c = $('<div class="right"></div>');
	e[t] ? f[n](e[t].$el) : e.title ? f.text(e.title) : e.titleSID && f.text(locale.t(e.titleSID));
	if (device.isAndroid()) e[r] && l[n](e[r].$el);
	else if (e[r]) l[n](e[r].$el);
	else if (e[i]) {
		var h = $(s);
		l[n](h);
		var p = !1;
		u.viewStack.length > 1 && (p = function() {
			if (u.topView != e) return;
			u.popView()
		}), e[i](h, p)
	} else if (u.viewStack.length > 1) {
		var d = $(s);
		d.addClick(function() {
			if (u.topView != e) return;
			u.popView()
		}), l[n](d)
	}
	return e[o] && c[n](e[o].$el), a[n](l)[n](f)[n](c)
}, NavigationController.prototype.updateNavbar = function() {
	var e = "navbarTitleItem",
		t = "detach",
		n = "navbarLeftItem",
		r = "navbarRightItem",
		i = "$navbar",
		s = this;
	if (!s.topView) return;
	var o = s.topView;
	o[e] && o[e].$el[t](), o[n] && o[n].$el[t](), o[r] && o[r].$el[t](), o[i].remove(), o[i] = s.buildNavbar(o), s[i].append(o[i])
}, NavigationController.prototype.pushView = function(e, t) {
	var n = "$navbar",
		r = "children",
		i = ".title",
		s = "append",
		o = "$el",
		u = "navbarLeftItem",
		a = "navbarRightItem",
		f = "viewStack",
		l = "length",
		c = "hasLoaded",
		h = "nextTick",
		p = "addClass",
		d = "pushRight",
		v = "pushLeft",
		m = "removeClass",
		g = "viewDidAppear",
		y = "enableUserInteraction";
	t || (t = function() {});
	var b = this;
	b.disableUserInteraction(), e.parentViewController = b, e.navigationController = b, e.setTitle = function(t) {
		e.title = t, e[n] && e[n][r](i).text(t)
	}, e.setTitleSID = function(t) {
		e.titleSID = t, e[n] && e[n][r](i).text(locale.t(t))
	}, e.setNavbarTitleItem = function(t) {
		e.navbarTitleItem = t, e[n] && e[n][r](i).empty()[s](t[o])
	}, e.setNavbarLeftItem = function(t) {
		e[u] = t, e[n] && e[n][r](".left").empty()[s](t[o])
	}, e.setNavbarRightItem = function(t) {
		e[a] = t, e[n] && e[n][r](".right").empty()[s](t[o])
	}, e.init(function(r) {
		var i = b.topView;
		b[f].push(e), b.topView = e, b.rootView || (b.rootView = e), b[f][l] > 2 && b[f][b[f][l] - 3][o].detach(), e[n] = b.buildNavbar(e), i && i.viewWillDisappear(), b[c] && e.viewWillAppear(), i ? async.series([function(t) {
			async [h](function() {
				return e[n][p](d), e[o][p](d), t()
			})
		}, function(t) {
			async [h](function() {
				return b[n][s](e[n]), b.$view[s](e[o]), t()
			})
		}, function(t) {
			async [h](function() {
				return i[n][p](v), i[o][p](v), b[u] && (e[u] || !device.isAndroid() && b[f][l] > 1) && b.$navbarLeft[p](v), b[a] && e[a] && b.$navbarRight[p](v), t()
			})
		}, function(t) {
			async [h](function() {
				return e[n][m](d), e[o][m](d), t()
			})
		}, function(t) {
			setTimeout(function() {
				return i && i.viewDidDisappear(), b[c] && e[g](), b[y](), t()
			}, 500)
		}], function() {
			return t(e)
		}): async.series([function(t) {
			async [h](function() {
				return b[n][s](e[n]), b.$view[s](e[o]), t()
			})
		}, function(t) {
			async [h](function() {
				return b[c] && e[g](), b[y](), t()
			})
		}], function() {
			return t(e)
		}), app.frontend != "hybrid_ios" && (location.hash || (location.hash = (new Date).getTime()))
	}), b.trackScreen(e)
}, NavigationController.prototype.popView = function(e) {
	var t = "viewStack",
		n = "length",
		r = "topView",
		i = "$navbar",
		s = "pushRight",
		o = "removeClass",
		u = "pushLeft",
		a = "navbarLeftItem",
		f = "$navbarLeft",
		l = "navbarRightItem",
		c = "$navbarRight",
		h = "remove",
		p = "viewDidDisappear",
		d = "viewDidPop",
		v = "unloadView",
		m = "enableUserInteraction";
	e || (e = function() {});
	var g = this;
	if (!g.rootView) return;
	g.disableUserInteraction(), app.frontend != "hybrid_ios" && (location.hash || (location.hash = (new Date).getTime()));
	var y = g[t][g[t][n] - 1];
	return y.viewWillDisappear(), y.viewWillPop(), g[t].pop(), g[t][n] ? (g[r] = g[t][g[t][n] - 1], g[r].viewWillAppear(), g.trackScreen(g[r]), async.series([function(e) {
		async.nextTick(function() {
			return y[i].addClass(s), y.$el.addClass(s), g[r][i][o](u), g[r].$el[o](u), g[a] && g[t][n] < 2 && !g[r][a] && g[f][o](u), g[l] && !g[r][l] && g[c][o](u), e()
		})
	}, function(e) {
		setTimeout(function() {
			return g[r].viewDidAppear(), y[i][h](), y.$el[h](), y[p](), y[d](), y[v](), g[t][n] > 1 && g.$view.append(g[t][g[t][n] - 2].$el), g[m](), e()
		}, 500)
	}], function() {
		return e()
	})) : (g[r] = null, g.rootView = null, y[i][h](), y.$el[h](), g[a] && g[f][o](u), g[l] && g[c][o](u), y[p](), y[d](), y[v](), async.nextTick(function() {
		return g[m](), e()
	}))
}, NavigationController.prototype.popToView = function(e, t) {
	var n = "viewStack",
		r = "length";
	t || (t = function() {});
	var i = this,
		s;
	for (var o in i[n])
		if (i[n][o] == e) {
			s = o;
			continue
		}
	if (!s) return t(new Error("Tried to pop a nonexistent view"));
	if (s == i[n][r] - 1) return t();
	if (s == i[n][r] - 2) return i.popView(t);
	var u = [];
	for (var a = i[n][r] - 2; a > s; a--) u.push(i[n][a]);
	return u.forEach(function(e) {
		e.viewWillPop(), e.$navbar.remove(), e.$el.remove()
	}), s > 0 && i.$view.append(i[n][s - 1].$el), i.$view.append(i[n][s].$el), i[n].splice(s + 1, i[n][r] - (s + 2)), u.forEach(function(e) {
		e.viewDidPop(), e.unloadView()
	}), i.popView(t)
}, NavigationController.prototype.popToRootView = function(e) {
	var t = "rootView",
		n = "viewStack",
		r = "$navbar",
		i = "removeClass",
		s = "pushLeft";
	e || (e = function() {});
	var o = this;
	if (!o[t]) return e(new Error("No root view exists"));
	if (o[n].length <= 1) return e(new Error("Root view is already visible"));
	o.disableUserInteraction();
	var u = [];
	for (var a = o[n].length - 1; a > 0; a--) u.push(o[n][a]);
	var f = o.topView;
	return f.viewWillDisappear(), u.forEach(function(e) {
		e.viewWillPop()
	}), o[t].viewWillAppear(), o[n] = [o[t]], o.topView = o[t], o[r].children(".viewnavbar").remove(), o.$view.empty(), f.viewDidDisappear(), u.forEach(function(e) {
		e.viewDidPop(), e.unloadView()
	}), o[r].append(o[t][r][i](s)), o.$view.append(o[t].$el[i](s)), o[t].viewDidAppear(), o.enableUserInteraction(), async.nextTick(e)
}, NavigationController.prototype.go = function(e, t, n) {
	var r = "/",
		i = "section",
		s = "getActiveGame";
	n || (n = function() {});
	var o = this;
	o.disableUserInteraction();
	if (e.charAt(0) == r) e = e.substr(1);
	else if (t && t[i]) e = t[i] + r + e;
	else if (!t || t[i] !== !1)
		if (o.usingCombinedController && e.indexOf("Forum") == -1) {
			var u = session[s]();
			u && (e = enums.AppGameName[session[s]()] + r + e)
		} else o[i] && (o[i] == "warsaw" && e == "UserViewController" && (e = "ProfileViewController", o[i] = null), e = o[i] + r + e);
	require(["controllers/" + e], function(e) {
		var r = new e(t);
		return o.pushView(r, function(e) {
			return n(e, r)
		})
	})
}, NavigationController.prototype.goBack = function(e) {
	e || (e = function() {});
	var t = this;
	t.popView(e)
}, NavigationController.prototype.enableUserInteraction = function() {
	var e = this;
	e.userInteractionEnabled = !0, e.$viewOverlay.removeClass("enabled")
}, NavigationController.prototype.disableUserInteraction = function() {
	var e = this;
	e.userInteractionEnabled = !1, e.$viewOverlay.addClass("enabled")
}, NavigationController.prototype.getViewAtIndex = function(e) {
	var t = "viewStack",
		n = this;
	return e < 0 ? n[t][n[t].length + e] : n[t][e]
}, NavigationController.prototype.getViewOfType = function(e) {
	var t = this,
		n = t.viewStack,
		r = n.length,
		i = 0;
	while (i < r) {
		var s = n[i];
		if (s._name == e) return s;
		i++
	}
}, NavigationController.prototype.getViewsOfType = function(e) {
	return this.getViewsOfTypeBeforeIndex(e)
}, NavigationController.prototype.getViewsOfTypeBeforeIndex = function(e, t) {
	var n = this,
		r = [],
		i = 0,
		s = n.viewStack,
		o = t || s.length;
	o < 0 && (o = s.length + t);
	while (i < o) {
		var u = s[i];
		u._name == e && r.push(u), i++
	}
	return r
}, NavigationController.prototype.removeView = function(e) {
	var t = this,
		n;
	for (var r in t.viewStack)
		if (t.viewStack[r] == e) {
			n = r;
			continue
		}
	if (!n) {
		app.error("NavigationController.removeView was called for nonexistent view");
		return
	}
	t.removeViewAtIndex(n)
}, NavigationController.prototype.removeViewAtIndex = function(e) {
	var t = "length",
		n = "viewStack",
		r = "navbarLeftItem",
		i = this;
	e < 0 && (e = i[n][t] + e), i[n][t] > 2 && i[n][i[n][t] - 3].$el.detach();
	var s = i[n][e];
	s.viewWillPop(), s.$navbar.remove(), s.$el.remove(), e == i[n][t] - 2 && i[n][t] > 2 && i.$view.append(i[n][i[n][t] - 3].$el), i[n].splice(e, 1), i.updateNavbar(), s.viewDidPop(), s.unloadView(), i[r] && i[n][t] < 2 && !i.topView[r] && i.$navbarLeft.removeClass("pushLeft")
}, NavigationController.prototype.trackScreen = function(e) {
	var t = [e._section, e._name].filter(function(e) {
		return e
	}).join("/");
	device.trackScreen(t)
};