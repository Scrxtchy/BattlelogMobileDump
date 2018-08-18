var app = require("app"),
	device = require("device"),
	events = require("events"),
	template = require("template");
exports.showReceipt = function(e, t, n) {
	var r = "activeTimer",
		i = this;
	n = n || 2500, t = t || "checkbox";
	var s = template.render("Receipt", {
		message: e,
		type: t
	});
	return i[r] && (clearTimeout(i[r]), app.rootViewController.$el.find(".receipt").remove()), i.createReceipt(s, n), s
}, exports.createReceipt = function(e, t) {
	var n = "rootViewController",
		r = "activeTimer",
		i = this;
	app[n].mainView.centerView.$view.append(e);
	var s = app[n].$el.find(".receipt");
	s.fadeIn(function() {
		i[r] = setTimeout(function() {
			s.fadeOut(function() {
				$(this).remove(), delete i[r]
			})
		}, t)
	})
};
var chatMessages = {};
exports.showChatMessage = function(e, t, n) {
	var r = $(template.render("ChatMessageReceipt", {
		chatId: e,
		message: t,
		user: n
	}));
	chatMessages[e] ? chatMessages[e].update(r) : chatMessages[e] = new ChatMessageReceipt(e, r)
}, exports.removeChatMessage = function(e) {
	delete chatMessages[e]
};
var ChatMessageReceipt = function(e, t) {
	var n = "close",
		r = "show",
		i = this,
		s = 0,
		o = 3e3;
	this.$el = $("<li></li>").addClass("receipt chat-message-receipt").css("z-index", _.keys(chatMessages).length).append(t), this[n] = function() {
		s && (clearTimeout(s), s = !1), exports.removeChatMessage(e), i.$el.removeClass(r).one("webkitTransitionEnd transitionEnd", function() {
			i.$el.remove()
		})
	}, this.update = function(e) {
		clearTimeout(s), i.$el.html(e), s = setTimeout(i[n], o)
	}, this.$el.on("click", function(t) {
		require(["js/../public/jsx/stores/ChatStore.js"], function(t) {
			t.setCurrentChat(e), device.isTablet() && (events.emit("doOpenComcenter"), events.emit("doShowChat")), i[n]()
		})
	}), app.rootViewController.$el.find(".receipts").prepend(this.$el), setTimeout(function() {
		i.$el.addClass(r), s = setTimeout(i[n], o)
	}, 0)
};