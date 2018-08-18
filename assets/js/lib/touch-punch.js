(function(e) {
	function g(e, t) {
		if (e[r].touches.length > 1) return;
		e.preventDefault();
		var n = e[r][i][0],
			u = document.createEvent("MouseEvents");
		u.initMouseEvent(t, s, s, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, o, o, o, o, 0, null), e.target.dispatchEvent(u)
	}
	var t = "_mouseInit",
		n = "_mouseDestroy",
		r = "originalEvent",
		i = "changedTouches",
		s = !0,
		o = !1,
		u = "_touchStart",
		a = "_touchMoved",
		f = "mousemove",
		l = "_touchMove",
		c = "_touchEnd",
		h = "proxy";
	e.support.touch = "ontouchend" in document;
	if (!e.support.touch) return;
	var p = e.ui.mouse.prototype,
		d = p[t],
		v = p[n],
		m;
	p[u] = function(e) {
		var t = this;
		if (m || !t._mouseCapture(e[r][i][0])) return;
		m = s, t[a] = o, g(e, "mouseover"), g(e, f), g(e, "mousedown")
	}, p[l] = function(e) {
		if (!m) return;
		this[a] = s, g(e, f)
	}, p[c] = function(e) {
		if (!m) return;
		g(e, "mouseup"), g(e, "mouseout"), this[a] || g(e, "click"), m = o
	}, p[t] = function() {
		var t = this;
		t.element.bind({
			touchstart: e[h](t, u),
			touchmove: e[h](t, l),
			touchend: e[h](t, c)
		}), d.call(t)
	}, p[n] = function() {
		var t = this;
		t.element.unbind({
			touchstart: e[h](t, u),
			touchmove: e[h](t, l),
			touchend: e[h](t, c)
		}), v.call(t)
	}
})(jQuery);