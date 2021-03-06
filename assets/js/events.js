function isArray(e) {
	return Object.prototype.toString.call(e) === "[object Array]"
}
var app = require("app"),
	eventBindings = {};
exports.bind = function(e, t) {
	if (isArray(e)) {
		e.forEach(function(e) {
			exports.bind(e, t)
		});
		return
	}
	return eventBindings[e] || (eventBindings[e] = []), eventBindings[e].push(t), t
}, exports.unbind = function(e, t) {
	if (isArray(e)) {
		e.forEach(function(e) {
			exports.unbind(e, t)
		});
		return
	}
	if (!eventBindings[e]) return;
	if (!t) {
		eventBindings[e] = null;
		return
	}
	var n = [];
	eventBindings[e].forEach(function(e) {
		e != t && n.push(e)
	}), eventBindings[e] = n
}, exports.emit = function(e, t) {
	if (isArray(e)) {
		for (var n in e) exports.emit(e[n], t);
		return
	}
	if (!eventBindings[e]) return;
	eventBindings[e].forEach(function(e) {
		try {
			e(t)
		} catch (n) {
			app.error(n)
		}
	})
};