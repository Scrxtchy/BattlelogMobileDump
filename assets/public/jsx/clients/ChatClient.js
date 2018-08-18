var web = require('web');

var ChatClient = {

	store: null,

	sendNewChatMessage: function(chatId, message) {

		web.request("chatsend", message, function(err, data) {
			console.info("Chat send resp:");
			console.info(data);

		});
	},

	leaveChat: function(chatId) {
		web.request("chatleave", {
			"chatId": chatId
		}, function(err, data) {
			console.info("Chat leave resp:");
			console.info(data);

			if (!err && data == "CHAT_NOT_FOUND") {
				// Wipe the chat..
				require(['js/../public/jsx/stores/ChatStore.js'], function(ChatStore) {
					ChatStore.removeChat({
						"chatId": chatId
					});
				});
			}

		});
	},

	kickChatUser: function(chatId, userId) {
		var data = {
			chatId: chatId,
			userId: userId
		};
		// Remove the user locally at once for the speed feeling
		require(['js/../public/jsx/stores/ChatStore.js'], function(ChatStore) {
			ChatStore.removeMemberInChat(chatId, userId);
			web.request("chatkick", data, function(err, data) {
				if (!err && data == "CHAT_NOT_FOUND") {
					// Wipe the chat at once..
					ChatStore.removeChat({
						"chatId": chatId
					});
				}
			});
		});
	},

	loadChatsFromServer: function() {

		var _this = this;

		web.request("chats", {}, function(err, data) {
			console.log(err, data);

			var chats = {};
			_.each(data.chats, function(chat) {
				chats[chat.chatId] = chat;
			});

			_this.store.setChats(chats);
		});
	},

	loadChatFromServer: function(chatId, callback) {

		var _this = this;

		//console.debug(arguments.callee.caller.toString());

		web.request("chatget", {
			chatId: chatId
		}, function(err, data) {
			if (!err && data) {
				_this.store.setChatAndTrigger(data);
				if (typeof(callback) == "function")
					callback(data);
			}
		});
	},

	setChatAsRead: function(chatId) {
		var _this = this;
		web.request("chatread", {
			chatId: chatId
		}, function(err, data) {});
	}
};

module.exports = ChatClient;