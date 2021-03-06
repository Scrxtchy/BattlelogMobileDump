function ScrollableViewController(e) {
	ViewController.call(this, e), this.innerTemplate = null
}
var template = require("template"),
	ViewController = require("controllers/ViewController"),
	ScrollViewController = require("controllers/ScrollViewController");
module.exports = ScrollableViewController, ScrollableViewController.prototype = new ViewController, ScrollableViewController.constructor = ScrollableViewController, ScrollableViewController.prototype.loadView = function(e) {
	var t = "template",
		n = "innerTemplate",
		r = "scrollView";
	e || (e = function() {});
	var i = this;
	i[t] && !i[n] && (i[n] = i[t], i[t] = null), ViewController.prototype.loadView.call(i, function() {
		i.initScrollView(function() {
			return i.$content = i[r].$content, i.$el.append(i[r].$el), e()
		})
	})
}, ScrollableViewController.prototype.initScrollView = function(e) {
	var t = "scrollView",
		n = "innerTemplate",
		r = this;
	r[t] = new ScrollViewController({
		parentViewController: r
	}), r.subviews.push(r[t]), r[t].init(function() {
		return r[n] ? template.render(r[n], r.templateParams, function(n, i) {
			return r[t].$content.html(i), e()
		}) : e()
	})
};