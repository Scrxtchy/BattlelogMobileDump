function ViewController(e) {
	var t = null,
		n = "_name",
		r = !1,
		i = "additionalStylesheetSection";
	app.clear(), this.parentViewController = t, this.templateBundle = this[n], this.templateBundleSection = this._section, this.templateParams = this._templateParams || t, this.template = this[n], this.cssClass = t, this.persist = r, this.hasLoader = this.hasLoader || r, this[i] = this[i] || r;
	if (e)
		for (var s in e) this[s] = e[s];
	this.isLoading = r, this.hasLoaded = r, this.isVisible = r, this.$el = t, this.subviews = [], this.eventBindings = {}, this[n] && events.emit("viewCreated", this[n])
}
var app = require("app"),
	template = require("template"),
	async = require("lib/async"), events = require("events");
module.exports = ViewController, ViewController.prototype.init = function(e) {
	var t = "hasLoaded",
		n = "isLoading",
		r = this;
	if (r[t]) return e();
	if (!r[n]) return r[n] = !0, r.loadView(function() {
		r[n] = !1, r[t] = !0, async.nextTick(function() {
			return r.viewDidLoad(), e()
		})
	});
	var i = null,
		s = function() {
			if (!r[t]) return;
			return clearInterval(i), i = null, e()
		};
	i = setInterval(s, 50)
}, ViewController.prototype.$ = function(e) {
	try {
		return this.$el.find(e)
	} catch (t) {
		app.error("Could not find selector: " + e)
	}
}, ViewController.prototype.$c = function(e) {
	return this.$el.children(e)
}, ViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	t._name && (t.$el = $("<div></div>").addClass(t._name)), t.cssClass && t.$el.addClass(t.cssClass);
	if (t.hasLoader && t.$el) {
		var n = $('<div class="loader-container"><div class="loader small centered"></div></div>');
		t.$el.append(n), t.bind("viewDidLoad", function() {
			n.remove()
		})
	}
	return t.setupDOM(function() {
		return e()
	})
}, ViewController.prototype.setupDOM = function(e) {
	var t = this;
	async.series([function(e) {
		t.loadTemplateBundle(e)
	}, function(e) {
		t.applyTemplate(e)
	}], function(t) {
		return e(t)
	})
}, ViewController.prototype.loadTemplateBundle = function(e) {
	var t = "templateBundle",
		n = "templateBundleSection",
		r = "additionalStylesheetSection",
		i = this;
	if (!i[t]) return e();
	template.loadTemplateBundle(i[n], i[t], function(n) {
		return n ? (app.log("View failed to load template bundle - " + i[t]), e(n)) : e()
	}), !i[n] && i[r] && template.loadStylesheet(i[r], i[t], function(e) {
		e && app.log("View failed to load stylesheet - " + i[t])
	})
}, ViewController.prototype.applyTemplate = function(e) {
	var t = this;
	if (!t.template) return e();
	template.render(t.template, t.templateParams, function(n, r) {
		return t.$el.append(r), e()
	})
}, ViewController.prototype.viewDidLoad = function() {
	var e = this;
	e.emit("viewDidLoad")
}, ViewController.prototype.viewWillAppear = function() {
	var e = "viewWillAppear",
		t = this;
	t.subviews.forEach(function(t) {
		t[e]()
	}), t.emit(e), t.$el && t.$el.trigger(e)
}, ViewController.prototype.viewDidAppear = function() {
	var e = "viewDidAppear",
		t = this;
	t.isVisible = !0, t.subviews.forEach(function(t) {
		t[e]()
	}), t.emit(e)
}, ViewController.prototype.viewWillDisappear = function() {
	var e = "viewWillDisappear",
		t = this;
	t.subviews.forEach(function(t) {
		t[e]()
	}), t.emit(e)
}, ViewController.prototype.viewDidDisappear = function() {
	var e = "viewDidDisappear",
		t = this;
	t.isVisible = !1, t.subviews.forEach(function(t) {
		t[e]()
	}), t.emit(e)
}, ViewController.prototype.viewWillPop = function() {
	var e = "viewWillPop",
		t = this;
	t.subviews.forEach(function(t) {
		t[e]()
	}), t.emit(e)
}, ViewController.prototype.viewDidPop = function() {
	var e = "viewDidPop",
		t = this;
	t.subviews.forEach(function(t) {
		t[e]()
	}), t.emit(e), this._name && events.emit("viewPopped", this._name)
}, ViewController.prototype.didReceiveMemoryWarning = function() {
	var e = "didReceiveMemoryWarning",
		t = this;
	t.subviews.forEach(function(t) {
		t[e]()
	}), t.emit(e)
}, ViewController.prototype.unloadView = function() {
	var e = !1,
		t = this;
	t.subviews.forEach(function(e) {
		e.unloadView()
	}), t.isLoading = e, t.hasLoaded = e, t.isVisible = e, t.$el && t.$el.empty(), t.$el = null, t.subviews = [], t.eventBindings = {}
}, ViewController.prototype.go = function(e, t, n) {
	t || (t = {}), n || (n = function() {});
	var r = this;
	app.error("View does not have a .go() handler")
}, ViewController.prototype.bind = function(e, t) {
	var n = "eventBindings",
		r = this;
	return r[n][e] || (r[n][e] = []), r[n][e].push(t), t
}, ViewController.prototype.unbind = function(e, t) {
	var n = "eventBindings",
		r = this;
	if (!r[n][e]) return;
	if (!t) {
		r[n][e] = null;
		return
	}
	var i = [];
	r[n][e].forEach(function(e, n) {
		e != t && i.push(e)
	}), r[n][e] = i
}, ViewController.prototype.emit = function(e, t) {
	var n = "eventBindings",
		r = this;
	if (!r[n][e]) return;
	r[n][e].forEach(function(e, n) {
		setTimeout(function() {
			e(t)
		}, 0)
	})
};