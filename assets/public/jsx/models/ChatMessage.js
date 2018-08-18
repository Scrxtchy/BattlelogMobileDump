function ChatMessage(timestamp, chatId, username, message) {
	this.timestamp = timestamp;
	this.chatId = chatId;
	this.username = username;
	this.message = message;

	return Object.freeze(this);
}

ChatMessage.fromBackendData = function(data) {
	return new ChatMessage(data.timestamp, data.chatId, data.username, data.message);
};

module.exports = ChatMessage;