React = require("react");
var events = require('events');
var session = require('session');
var enums = require('enums');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ChatRow = require('js/../public/jsx/components/ChatRow.js');
var MessagesView = require('js/../public/jsx/components/MessagesView.js');

var ChatStore = require('js/../public/jsx/stores/ChatStore.js');
var ChatCurrent = React.createClass({
	displayName: 'ChatCurrent',

	/* Triggered from the Store... */
	onChatChange: function() {
		this.setState(this.getInitialState());
	},

	getInitialState: function() {
		return ChatStore.getDefaultState();
	},

	componentDidMount: function() {
		this.unsubscribe = ChatStore.listen(this.onChatChange);
	},

	componentWillUnmount: function() {
		this.unsubscribe();
	},

	componentDidUpdate: function() {
		if (ChatStore.getCurrentChat()) {
			var $el = $(".chat-messages");
			if ($el.length) {
				// Auto scroll to bottom if the user is close enough
				var lastMessageHeight = $el.find(".chat-section:last-child .chatmessage:last-child").height();
				if (!$el.scrollTop() || $el.scrollTop() > $el[0].scrollHeight - $el.height() - lastMessageHeight - 100) {
					$el.scrollTop($el[0].scrollHeight - $el.height());
				}
			}
		}
	},

	onHideClick: function() {
		this.props.controller.close();
	},

	render: function() {

		var currentChat = ChatStore.getCurrentChat();
		if (currentChat) {
			var currentChatObj = ChatStore.fetchChat(currentChat);
			currentChat = React.createElement(MessagesView, {
				chat: currentChatObj
			});
		}

		var game = session.getActiveGame();
		var classes = React.addons.classSet({
			"chat-view": true,
			"active": currentChat,
			"nv-omaha": game == enums.Game.OMAHA,
			"nv-warsaw": game == enums.Game.WARSAW,
			"nv-bf3": game == enums.Game.BF3
		});

		return (
			React.createElement("div", {
					className: classes
				},
				React.createElement("div", {
						className: "current-chat"
					},
					currentChat
				)
			)
		);
	}
});

module.exports = ChatCurrent;