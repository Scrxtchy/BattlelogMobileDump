(function() {
	"use strict";

	function bt(u, f) {
		function c(e, t) {
			return function() {
				return e.apply(t, arguments)
			}
		}
		var l;
		f = f || {}, this[o] = s, this[a] = 0, this[t] = y, this[F] = 0, this[I] = 0, this[w] = 0, this[_] = f[_] || 10, this.layer = u, this[B] = f[B] || 200, this[W] = f[W] || 700;
		if (bt.notNeeded(u)) return;
		var d = [p, q, S, N, L, g],
			v = this;
		for (var m = 0, b = d.length; m < b; m++) v[d[m]] = c(v[d[m]], v);
		Et && (u[n](tt, this[p], r), u[n](M, this[p], r), u[n](dt, this[p], r)), u[n](x, this[q], r), u[n](Z, this[S], s), u[n](nt, this[N], s), u[n](ot, this[L], s), u[n](V, this[g], s), Event[i][h] || (u[e] = function(t, n, r) {
			var s = Node[i][e];
			t === x ? s.call(u, t, n[pt] || n, r) : s.call(u, t, n, r)
		}, u[n] = function(e, t, r) {
			var s = Node[i][n];
			e === x ? s.call(u, e, t[pt] || (t[pt] = function(e) {
				e[X] || t(e)
			}), r) : s.call(u, e, t, r)
		}), typeof u.onclick === ct && (l = u.onclick, u[n](x, function(e) {
			l(e)
		}, s), u.onclick = y)
	}
	var e = "removeEventListener",
		t = "targetElement",
		n = "addEventListener",
		r = !0,
		i = "prototype",
		s = !1,
		o = "trackingClick",
		u = "fastClickScrollParent",
		a = "trackingClickStart",
		f = "userAgent",
		l = "getTargetElementFromEventTarget",
		c = "clickElement",
		h = "stopImmediatePropagation",
		p = "onMouse",
		d = "preventDefault",
		v = "setActive",
		m = "meta[name=viewport]",
		g = "onTouchCancel",
		y = null,
		b = "active-item",
		w = "lastTouchIdentifier",
		E = "user-scalable=no",
		S = "onTouchStart",
		x = "click",
		T = "indexOf",
		N = "onTouchMove",
		C = "timeStamp",
		k = "querySelector",
		L = "onTouchEnd",
		A = "toLowerCase",
		O = "select",
		M = "mousedown",
		_ = "touchBoundary",
		D = "documentElement",
		P = "cancelNextClick",
		H = "changedTouches",
		B = "tapDelay",
		j = "activeElement",
		F = "touchStartX",
		I = "touchStartY",
		q = "onClick",
		R = "lastClickTime",
		U = "fastClickLastScrollTop",
		z = "needsClick",
		W = "tapTimeout",
		X = "propagationStopped",
		V = "touchcancel",
		J = "input",
		K = "forwardedTouchEvent",
		Q = "scrollWidth",
		G = "touchAction",
		Y = "sendClick",
		Z = "touchstart",
		et = "determineEventType",
		tt = "mouseover",
		nt = "touchmove",
		rt = "manipulation",
		it = "updateScrollParent",
		st = "outerWidth",
		ot = "touchend",
		ut = "identifier",
		at = ".click-item",
		ft = "disabled",
		lt = "textarea",
		ct = "function",
		ht = "setSelectionRange",
		pt = "hijacked",
		dt = "mouseup",
		vt = "undefined",
		mt = "addClass",
		gt = "touchHasMoved",
		yt = "targetTouches",
		wt = navigator[f][T]("Windows Phone") >= 0,
		Et = navigator[f][T]("Android") > 0 && !wt,
		St = /iP(ad|hone|od)/.test(navigator[f]) && !wt,
		xt = St && /OS 4_\d(_\d)?/.test(navigator[f]),
		Tt = St && /OS [6-7]_\d/.test(navigator[f]),
		Nt = navigator[f][T]("BB10") > 0;
	bt[i][z] = function(e) {
		switch (e.nodeName[A]()) {
			case "button":
			case O:
			case lt:
				if (e[ft]) return r;
				break;
			case J:
				if (St && e.type === "file" || e[ft]) return r;
				break;
			case "label":
			case "iframe":
			case "video":
				return r
		}
		return /\bneedsclick\b/.test(e.className)
	}, bt[i].needsFocus = function(e) {
		switch (e.nodeName[A]()) {
			case lt:
				return r;
			case O:
				return !Et;
			case J:
				switch (e.type) {
					case "button":
					case "checkbox":
					case "file":
					case "image":
					case "radio":
					case "submit":
						return s
				}
				return !e[ft] && !e.readOnly;
			default:
				return /\bneedsfocus\b/.test(e.className)
		}
	}, bt[i][Y] = function(e, t) {
		var n, i;
		document[j] && document[j] !== e && document[j].blur(), i = t[H][0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this[et](e), r, r, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, s, s, s, s, 0, y), n[K] = r, e.dispatchEvent(n)
	}, bt[i][et] = function(e) {
		return Et && e.tagName[A]() === O ? M : x
	}, bt[i].focus = function(e) {
		var t;
		St && e[ht] && e.type[T]("date") !== 0 && e.type !== "time" && e.type !== "month" ? (t = e.value.length, e[ht](t, t)) : e.focus()
	}, bt[i][it] = function(e) {
		var t, n;
		t = e[u];
		if (!t || !t.contains(e)) {
			n = e;
			do {
				if (n.scrollHeight > n.offsetHeight) {
					t = n, e[u] = n;
					break
				}
				n = n.parentElement
			} while (n)
		}
		t && (t[U] = t.scrollTop)
	}, bt[i][l] = function(e) {
		return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
	}, bt[i][S] = function(e) {
		var n, i, u;
		if (e[yt].length > 1) return r;
		n = this[l](e.target), i = e[yt][0];
		if (St) {
			u = window.getSelection();
			if (u.rangeCount && !u.isCollapsed) return r;
			if (!xt) {
				if (i[ut] && i[ut] === this[w]) return e[d](), s;
				this[w] = i[ut], this[it](n)
			}
		}
		this[o] = r, this[a] = e[C], this[t] = n;
		var f;
		return this[c] = f = $(n).closest(at), this[v] && clearTimeout(this[v]), this[c] && (this[v] = setTimeout(function() {
			f[mt](b)
		}, 50)), this[F] = i.pageX, this[I] = i.pageY, e[C] - this[R] < this[B] && e[d](), r
	}, bt[i][gt] = function(e) {
		var t = e[H][0],
			n = this[_];
		return Math.abs(t.pageX - this[F]) > n || Math.abs(t.pageY - this[I]) > n ? r : s
	}, bt[i][N] = function(e) {
		this[v] && (clearTimeout(this[v]), this[v] = y), this[c] && (this[c].removeClass(b), this[c] = y);
		if (!this[o]) return r;
		if (this[t] !== this[l](e.target) || this[gt](e)) this[o] = s, $(this[t]).closest(at)[mt]("no-active"), this[t] = y;
		return r
	}, bt[i].findControl = function(e) {
		return e.control !== undefined ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e[k]("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
	}, bt[i][L] = function(e) {
		var n, i, f, l, h, p = this[t],
			m = this[c];
		this[v] && clearTimeout(this[v]), m && (m[mt](b), this[c] = y, setTimeout(function() {
			m.removeClass(b)
		}, 700));
		if (!this[o]) return r;
		if (e[C] - this[R] < this[B]) return this[P] = r, r;
		if (e[C] - this[a] > this[W]) return r;
		this[P] = s, this[R] = e[C], i = this[a], this[o] = s, this[a] = 0, Tt && (h = e[H][0], p = document.elementFromPoint(h.pageX - window.pageXOffset, h.pageY - window.pageYOffset) || p, p[u] = this[t][u]), f = p.tagName[A]();
		if (f === "label") {
			n = this.findControl(p);
			if (n) {
				this.focus(p);
				if (Et) return s;
				p = n
			}
		} else if (this.needsFocus(p)) {
			if (e[C] - i > 100 || St && window.top !== window && f === J) return this[t] = y, s;
			this.focus(p), this[Y](p, e);
			if (!St || f !== O) this[t] = y, e[d]();
			return s
		}
		if (St && !xt) {
			l = p[u];
			if (l && l[U] !== l.scrollTop) return r
		}
		return this[z](p) || (e[d](), this[Y](p, e)), s
	}, bt[i][g] = function() {
		this[o] = s, this[t] = y
	}, bt[i][p] = function(e) {
		return this[t] ? e[K] ? r : e.cancelable ? !this[z](this[t]) || this[P] ? (e[h] ? e[h]() : e[X] = r, e.stopPropagation(), e[d](), s) : r : r : r
	}, bt[i][q] = function(e) {
		var n;
		return this[o] ? (this[t] = y, this[o] = s, r) : e.target.type === "submit" && e.detail === 0 ? r : (n = this[p](e), n || (this[t] = y), n)
	}, bt[i].destroy = function() {
		var t = this.layer;
		Et && (t[e](tt, this[p], r), t[e](M, this[p], r), t[e](dt, this[p], r)), t[e](x, this[q], r), t[e](Z, this[S], s), t[e](nt, this[N], s), t[e](ot, this[L], s), t[e](V, this[g], s)
	}, bt.notNeeded = function(e) {
		var t, n, i, o;
		if (typeof window.ontouchstart === vt) return r;
		n = +(/Chrome\/([0-9]+)/.exec(navigator[f]) || [, 0])[1];
		if (n) {
			if (!Et) return r;
			t = document[k](m);
			if (t) {
				if (t.content[T](E) !== -1) return r;
				if (n > 31 && document[D][Q] <= window[st]) return r
			}
		}
		if (Nt) {
			i = navigator[f].match(/Version\/([0-9]*)\.([0-9]*)/);
			if (i[1] >= 10 && i[2] >= 3) {
				t = document[k](m);
				if (t) {
					if (t.content[T](E) !== -1) return r;
					if (document[D][Q] <= window[st]) return r
				}
			}
		}
		if (e.style.msTouchAction === "none" || e.style[G] === rt) return r;
		o = +(/Firefox\/([0-9]+)/.exec(navigator[f]) || [, 0])[1];
		if (o >= 27) {
			t = document[k](m);
			if (t && (t.content[T](E) !== -1 || document[D][Q] <= window[st])) return r
		}
		return e.style[G] === "none" || e.style[G] === rt ? r : s
	}, bt.attach = function(e, t) {
		return new bt(e, t)
	}, typeof define === ct && typeof define.amd == "object" && define.amd ? define(function() {
		return bt
	}) : typeof module !== vt && module.exports ? (module.exports = bt.attach, module.exports.FastClick = bt) : window.FastClick = bt
})();