var React = require("react");
var Chats = require('js/../public/jsx/components/Chats.js');
var ChatCurrent = require('js/../public/jsx/components/ChatCurrent.js');
var push = require('push');
var device = require('device');
var session = require('session');
var ChatStore = require('js/../public/jsx/stores/ChatStore.js');


module.exports = ChatViewController;

function ChatViewController() {
	this.$el = $("<div></div>").addClass("chats-container");
}

ChatViewController.prototype.init = function() {
	React.initializeTouchEvents(true);
	React.render(
		React.createElement(Chats, {
			controller: this
		}), this.$el[0]
	);

	var chatContainer = $("<div id='current-chat'></div>");
	React.render(
		React.createElement(ChatCurrent, {
			controller: this
		}), chatContainer[0]
	);

	$("#app .RootView").append(chatContainer); // Appending to root so we can go fullscreen
	$("#cc-chats").html(this.$el);

	push.bind('ChatMessageIncoming', function(message) {
		if (session.getActiveGame() == null) return;
		ChatStore.addChatMessage(message.chatId, message);
	});

	push.bind('ChatMemberLeft', function(event) {
		if (session.getActiveGame() == null) return;

		ChatStore.removeMemberInChat(event.chatId, event.userId);
		if (event.userId !== ChatStore._user.userId)
			ChatStore.addChatMessage(event.chatId, event);
	});

	push.bind('ChatRead', function(event) {
		if (session.getActiveGame() == null) return;
		ChatStore.setChatAsRead(event.chatId);
	});

	push.bind('ChatMemberJoined', function(event) {
		if (session.getActiveGame() == null) return;
		var chat = ChatStore.fetchChat(event.chat.chatId);
		if (chat) {
			// Delete the message key before extending the chat obj, since it's not populated
			delete event.chat["messages"];
			chat = $.extend(chat, event.chat);
			ChatStore.setChatWithoutTrigger(chat);
			_.each(event.joinMessages, function(joinMessage) {
				ChatStore.addChatMessage(chat.chatId, joinMessage);
			});

		}
	});

	// Scroll chat to bottom when native keyboard appears
	if (device.isAndroid()) {
		$(window).on("resize", function() {
			var $msg = $(".chat-messages");
			if ($msg.length) {
				$msg.scrollTop($msg[0].scrollHeight - $msg.height());
			}
		});
	}

	this.ccButton = this.$el.closest(".DrawerComCenterView").find("header .comcenter-button");
	this.chatButton = this.$el.closest(".DrawerComCenterView").find("header .chat-button");

};

ChatViewController.prototype.open = function() {
	if (this.$el.closest(".DrawerComCenterView").hasClass("chats")) return;
	this.$el.closest(".DrawerComCenterView").addClass("chats");
	this.ccButton.removeClass("active");
	this.chatButton.addClass("active");
};

ChatViewController.prototype.close = function() {
	if (!this.$el.closest(".DrawerComCenterView").hasClass("chats")) return;
	this.$el.closest(".DrawerComCenterView").removeClass("chats");
	this.ccButton.addClass("active");
	this.chatButton.removeClass("active");
};