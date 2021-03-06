function DrawerViewController(e) {
	var t = null;
	this._name = "DrawerView", this.leftView = t, this.centerView = t, this.rightView = t, ViewController.call(this, e), this.tabs = [], this.selectedIndex = t, this.selectedIndexHistory = [], this.isOpen = !1
}
var async = require("lib/async"), app = require("app"), device = require("device"), events = require("events"), enums = require("enums"), template = require("template"), session = require("session"), pushnotifications = require("pushnotifications"), ViewController = require("controllers/ViewController");
module.exports = DrawerViewController, DrawerViewController.prototype = new ViewController, DrawerViewController.prototype.constructor = DrawerViewController, DrawerViewController.prototype.loadView = function(e) {
	var t = "$centerView",
		n = "leftView",
		r = "parentViewController",
		i = "append",
		s = "centerView",
		o = "rightView";
	e || (e = function() {});
	var u = this;
	ViewController.prototype.loadView.call(u, function() {
		u.$left = u.$c(".left"), u.$center = u.$c(".center"), u[t] = u.$center.children(".view"), u.$right = u.$c(".right"), u.$bgr = u.$c(".bgr"), async.parallel([function(e) {
			if (!u[n]) return e();
			u[n][r] = u, u[n].init(function() {
				return u.$left[i](u[n].$el), e()
			})
		}, function(e) {
			if (!u[s]) return e();
			u[s][r] = u, u[s].init(function() {
				return u[t][i](u[s].$el), e()
			})
		}, function(e) {
			if (!u[o]) return e();
			u[o][r] = u, u[o].init(function() {
				return u.$right[i](u[o].$el), e()
			})
		}], function() {
			return e()
		})
	})
}, DrawerViewController.prototype.viewDidLoad = function() {
	var e = "bind",
		t = "openDrawerRight",
		n = this;
	ViewController.prototype.viewDidLoad.call(n), n.setupTouchGestures(), events[e](["selectGameView", "didLogOut"], n.closeDrawer[e](n)), events[e](["doOpenComcenter"], n[t][e](n)), events[e](["doOpenChat"], n[t][e](n))
}, DrawerViewController.prototype.viewWillAppear = function() {
	var e = "viewWillAppear",
		t = "centerView",
		n = this;
	ViewController.prototype[e].call(n), n[t] && n[t][e]()
}, DrawerViewController.prototype.viewDidAppear = function() {
	var e = "viewDidAppear",
		t = "centerView",
		n = this;
	ViewController.prototype[e].call(n), n[t] && n[t][e]()
}, DrawerViewController.prototype.viewWillDisappear = function() {
	var e = "viewWillDisappear",
		t = "centerView",
		n = this;
	ViewController.prototype[e].call(n), n[t] && n[t][e]()
}, DrawerViewController.prototype.viewDidDisappear = function() {
	var e = "viewDidDisappear",
		t = "centerView",
		n = this;
	ViewController.prototype[e].call(n), n[t] && n[t][e]()
}, DrawerViewController.prototype.didReceiveMemoryWarning = function() {
	var e = "didReceiveMemoryWarning",
		t = "centerView",
		n = this;
	ViewController.prototype[e].call(n), n[t] && n[t][e]()
}, DrawerViewController.prototype.unloadView = function() {
	var e = "unloadView",
		t = "centerView",
		n = this;
	n.leftView && n.leftView[e](), n[t] && n[t][e](), n.rightView && n.rightView[e](), events.bind("selectGameView", n.closeDrawer.bind(n)), ViewController.prototype[e].call(n)
}, DrawerViewController.prototype.setupTouchGestures = function() {
	var e = null,
		t = !1,
		n = "isTablet",
		r = !0,
		i = "isTouching",
		s = "center",
		o = "css",
		u = "$center",
		a = "none",
		f = "translate3d(",
		l = "px, 0, 0)",
		c = "view",
		h = "$centerViewMain",
		p = "gameView",
		d = "$gameView",
		v = "left",
		m = "$left",
		g = "right",
		y = "$right",
		b = "goBackAvailable",
		w = "length",
		E = "target",
		S = "touches",
		x = "originalEvent",
		T = "isOpenLeft",
		N = "isOpenRight",
		C = "isOrientationLandscape",
		k = "stopPropagation",
		L = "preventDefault",
		A = "pageY",
		O = "pageX",
		M = "leftView",
		D = "rightView",
		P = "push",
		H = "pressed",
		B = "removeClass",
		j = "cssText",
		F = "style",
		I = "get",
		q = "-webkit-transform 0.5s cubic-bezier(0, 0, 0, 1)",
		R = "closeDrawer",
		U = ".pressed",
		z = "addEventListener",
		W = this;
	if (device.isAndroid()) return;
	var X = 0,
		V = e,
		J = e,
		K = e,
		Q = t,
		G, Y, Z, et = 0,
		tt = 25;
	device[n]() && (tt = 60);
	var nt = r,
		rt = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame,
		it = function(e, n) {
			function b() {
				if (!W[i]) {
					nt = r;
					return
				}
				_.each(e, function(e) {
					switch (e) {
						case s:
							W[u][o]({
								"-webkit-transition": a,
								"-webkit-transform": f + n + l
							});
							break;
						case c:
							W[h][o]({
								"-webkit-transition": a,
								"-webkit-transform": f + n + l,
								opacity: Math.max(260 / G - 1, .1)
							});
							break;
						case p:
							W[d][o]({
								"-webkit-transition": a,
								"-webkit-transform": f + -n / 2 + l
							});
							break;
						case "bgr":
							W.$bgr[o]({
								"-webkit-transition": a,
								"-webkit-transform": f + n / 260 * 400 + l
							});
							break;
						case v:
							W[m][o]({
								"-webkit-transition": a,
								"-webkit-transform": f + n + l
							});
							break;
						case g:
							W[y][o]({
								"-webkit-transition": a,
								"-webkit-transform": f + n + l
							})
					}
				}), nt = r
			}
			if (nt) {
				nt = t;
				try {
					rt(b, e, n)
				} catch (w) {
					b()
				}
			}
		},
		st = function(e) {
			W[i] = r, W[h] = W.$(".NavigationView .view:first > div:not(.pushLeft)"), W[b] = W.centerView.viewStack[w] > 1 && !$(e[E]).is("input:text, textarea") && $(e[E]).closest(".LeaderboardsMapView")[w] == 0, G = Y = Z = 0;
			var t = tt,
				s = e[S] || e[x][S];
			if (s[w] != 1) return;
			W[d] = W[u].find(".view .view");
			if (W[T] || W[N])
				if (!device[n]() || !device[C]()) t += 150, e[k](), e[L]();
			var o = s[0];
			if (o[A] > 43 || W[T] || W[N]) {
				o[O] < (W[T] ? 260 + t : t) && (Y = 1);
				var a = $(window).width();
				o[O] > (W[N] ? a - t - 260 : a - t) && (Z = 1)
			}
			V = et = o[O], J = o[A], W[T] ? X = 260 : W[N] ? X = -260 : X = 0
		},
		ot = function(t) {
			if (V === e) return;
			var i = t[S] || t[x][S];
			if (i[w] != 1) return;
			var o = i[0],
				u = o[O] - V,
				a = o[A] - J;
			G = o[O] - et, (W[T] || W[N]) && t[k]();
			if (!Q && Math.abs(a) > Math.abs(u)) {
				K = e, V = e, J = e, Y = Z = G = 0, app.log("You moved in y direction!");
				return
			}
			var f = X + u;
			W[M] ? f > 260 && (f = 260) : f > 0 && (f = 0), W[D] ? f < -260 && (f = -260) : f < 0 && (f = 0);
			var l = [];
			Y || Z ? (device[n]() ? (l[P](s), l[P](p), device.isAndroid() || l[P]("bgr")) : l[P](s), W[M] && l[P](v), console.log("CHECK IT", Y, Z), W[D] && l[P](g), it(l, f)) : G > 100 && W[b] && it([c], G - 80), f > X ? (K = 1, Q = r) : f < X ? (K = -1, Q = r) : K = 0, X = f, V = o[O], J = o[A], t[L]()
		},
		ut = function(r) {
			W[i] = t;
			if (V === e) return;
			if (W[h]) {
				if (W[b] && G > 100 && !Y && !Z) {
					app.log("go back!"), $(r[E]).hasClass(H) && (r[k](), $(r[E])[B](H)), G = 0, W[h][o]({
						"-webkit-transition": "opacity 0.1s cubic-bezier(0, 0, 0, 1)",
						opacity: 0
					}), W.goBack();
					return
				}
				W[h][I](0)[F][j] = "", W[h][o]({
					"-webkit-transition": q
				})
			}
			if (W[T] || W[N]) device[n]() && device[C]() ? $(r[E]).closest(".drawertoggle, .comcenter")[w] && r[k]() : r[k]();
			if (Y || Z) W[u][I](0)[F][j] = "", W.$bgr[I](0)[F][j] = "", W[M] && (W[m][I](0)[F][j] = ""), W[D] && (W[y][I](0)[F][j] = ""), W[d] && (W[d][I](0)[F][j] = ""), Q ? (W[u][o]({
				"-webkit-transition": q
			}), W[M] && W[m][o]({
				"-webkit-transition": q
			}), W[D] && W[y][o]({
				"-webkit-transition": q
			}), setTimeout(function() {
				if (V !== e) return;
				W[u][I](0)[F][j] = "", W[M] && (W[m][I](0)[F][j] = ""), W[D] && (W[y][I](0)[F][j] = "")
			}, 500), !W[T] && !W[N] ? W[M] && (X >= 200 || K == 1 && X > 0) ? W.openDrawerLeft() : W[D] && (X <= -200 || K == -1 && X < 0) && W.openDrawerRight() : W[T] ? K == 1 || X >= 200 || (W[R](), r[k](), $(U)[B](H)) : W[N] && (K == -1 || X <= -200 || (W[R](), r[k](), $(U)[B](H)))) : (!device[n]() || !device[C]()) && (W[T] || W[N]) && W[R]();
			V = e, J = e, K = e, Q = t, Y = 0, Z = 0
		};
	W[u][0][z]("touchstart", st, r), W[u][0][z]("touchmove", ot, r), W[u][0][z]("touchcancel", ut, r), W[u][0][z]("touchend", ut, r)
}, DrawerViewController.prototype.preinitWrap = function(e, t) {
	var n = this;
	if (e._name == "NavigationView") {
		var r = $('<a class="drawertoggle button cancelTouchOnMove"><span class="icon drawertoggle"></span></a>');
		r.addClick(function() {
			n.toggleDrawerLeft()
		}), e.navbarLeftItem = {
			$el: r
		};
		if (session.isLoggedIn()) {
			var i = $('<a class="comcenter button cancelTouchOnMove"><span class="icon comcenter"></span><span id="comcenter-friends-online">' + (t ? String(t) : "0") + "</span></a>");
			i.addClick(function(e) {
				return e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), n.toggleDrawerRight(), !1
			}), e.navbarRightItem = {
				$el: i
			}, pushnotifications.addPushFeatures()
		}
	}
	e._preinitWrap = !0
}, DrawerViewController.prototype.setCenterView = function(e, t) {
	var n = "rightView",
		r = "_nOnline",
		i = "centerView",
		s = "#comcenter-friends-online",
		o = "friends-online";
	t || (t = function() {});
	var u = this,
		a = u[n] && u[n][r] ? u[n][r] : 0;
	async.series([function(e) {
		return (!device.isTablet() || !device.isOrientationLandscape()) && u.closeDrawer(), async.nextTick(e)
	}, function(e) {
		u.emit("centerViewWillChange");
		var t = u[i];
		return t && (t.viewWillDisappear(), t.$el && t.$el.detach(), t.viewDidDisappear(), t.persist || t.unloadView()), async.nextTick(e)
	}, function(t) {
		e._preinitWrap || u.preinitWrap(e, a), u[i] = e, e.parentViewController = u, e.drawerController = u;
		var f = u[i].styleSection || u[i].section || u[i]._section || null;
		template.setActiveSection(f, function() {
			e.init(function() {
				e.viewWillAppear(), u.$centerView.html(e.$el), e.viewDidAppear(), a = u[n] ? u[n][r] || 0 : 0, savedHasRequest = u[n] ? u[n]._hasRequest || 0 : 0, $(s).html(a);
				var i = $(s).closest(".button");
				return a || savedHasRequest ? i.addClass(o) : i.removeClass(o), u.emit("centerViewDidChange", {
					view: e
				}), t()
			})
		})
	}], function() {
		return t(null, e)
	})
}, DrawerViewController.prototype.setCenterViewWithNameParams = function(e, t, n) {
	n || (n = function() {});
	var r = this;
	require(["controllers/" + e], function(e) {
		var i = new e(t);
		return r.setCenterView(i, n)
	})
}, DrawerViewController.prototype.removeCenterView = function() {
	callback || (callback = function() {});
	var e = this,
		t = e.centerView;
	if (!t) return;
	t.viewWillDisappear(), t.$el && t.$el.detach(), t.viewDidDisappear(), t && !t.persist && t.unloadView(), e.emit("centerViewDidChange", {
		view: null
	})
}, DrawerViewController.prototype.setLeftView = function(e, t) {
	t || (t = function() {});
	var n = this,
		r = n.leftView;
	e.parentViewController = n, e.drawerController = n, n.leftView = e, e.init(function() {
		n.$left.empty().append(e.$el), t(null, e), n.emit("leftViewDidChange", {
			view: e
		})
	})
}, DrawerViewController.prototype.setLeftViewWithNameParams = function(e, t, n) {
	n || (n = function() {});
	var r = this;
	require(["controllers/" + e], function(e) {
		var i = new e(t);
		return r.setLeftView(i, n)
	})
}, DrawerViewController.prototype.setRightView = function(e, t) {
	t || (t = function() {});
	var n = this,
		r = n.rightView;
	e.parentViewController = n, e.drawerController = n, n.rightView = e, e.init(function() {
		n.$right.empty().append(e.$el), t(null, e), n.emit("rightViewDidChange", {
			view: e
		})
	})
}, DrawerViewController.prototype.setRightViewWithNameParams = function(e, t, n) {
	n || (n = function() {});
	var r = this;
	require(["controllers/" + e], function(e) {
		var i = new e(t);
		return r.setRightView(i, n)
	})
}, DrawerViewController.prototype.openDrawerLeft = function() {
	var e = "leftView",
		t = this;
	t.isOpenRight && t.closeDrawer();
	if (!t[e]) return;
	t.emit("drawerWillOpenLeft"), t[e].viewWillAppear(), t.$el.addClass("open-left"), t.isOpenLeft = !0, setTimeout(function() {
		t.emit("drawerDidOpenLeft"), t[e].viewDidAppear()
	}, 500)
}, DrawerViewController.prototype.openDrawerRight = function() {
	var e = "rightView",
		t = "isOpenRight",
		n = "disabled",
		r = "drawerDidOpenRight",
		i = this;
	i.isOpenLeft && i.closeDrawer();
	if (!i[e] || i[t]) return;
	var s = i[e].$el.find("#comcenter-search");
	s.length && s.prop(n, !0), i.emit("drawerWillOpenRight"), i[e].viewWillAppear(), i.$el.addClass("open-right"), i[t] = !0, setTimeout(function() {
		i.emit(r), events.emit(r), s.length && s.prop(n, !1), i[e].viewDidAppear()
	}, 500)
}, DrawerViewController.prototype.closeDrawerLeft = function() {
	var e = "isOpenLeft",
		t = this;
	t[e] && (t.emit("drawerWillClose"), t.leftView.viewWillDisappear(), t.$el.removeClass("open-left"), t[e] = !1, setTimeout(function() {
		t.emit("drawerDidClose"), t.leftView.viewDidDisappear()
	}, 500))
}, DrawerViewController.prototype.closeDrawerRight = function() {
	var e = "isOpenRight",
		t = this;
	t[e] && (t.emit("drawerWillClose"), t.rightView.viewWillDisappear(), t.$el.removeClass("open-right"), t[e] = !1, setTimeout(function() {
		t.emit("drawerDidClose"), t.rightView.viewDidDisappear()
	}, 500))
}, DrawerViewController.prototype.closeDrawer = function() {
	var e = this;
	e.isOpenLeft ? e.closeDrawerLeft() : e.isOpenRight && e.closeDrawerRight()
}, DrawerViewController.prototype.toggleDrawerLeft = function() {
	var e = this;
	e.isOpenLeft ? e.closeDrawer() : e.openDrawerLeft()
}, DrawerViewController.prototype.toggleDrawerRight = function() {
	var e = this;
	e.isOpenRight ? e.closeDrawer() : e.openDrawerRight()
}, DrawerViewController.prototype.go = function(e, t, n) {
	var r = "section",
		i = "centerView",
		s = this;
	t && t[r] && app.log("Going to " + e + " section:" + t[r]), t && t[r] == undefined && session.getActiveGame() != enums.Game.BF3 && (t[r] = !1), (!device.isTablet() || !device.isOrientationLandscape()) && s.closeDrawer(), t && t.modal ? s.setCenterViewWithNameParams("NavigationController", {
		styleSection: t.styleSection,
		section: t[r],
		rootViewName: e,
		rootViewParams: t
	}, n) : s[i] ? s[i].go(e, t, n) : app.error("Sliding drawer received .go() with no center view set")
}, DrawerViewController.prototype.goBack = function() {
	var e = "centerView",
		t = this;
	(!device.isTablet() || !device.isOrientationLandscape()) && t.closeDrawer(), t[e].viewStack.length > 1 && t[e].goBack()
};