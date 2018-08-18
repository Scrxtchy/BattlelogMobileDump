React = require("react");
var dom = require('dom');
var enums = require('enums');
var session = require('session');
var assets = require('assets')

var ChatStore = require('js/../public/jsx/stores/ChatStore.js');
var ChatHelper = require('js/../public/jsx/helpers/ChatHelper.js');

var ChatRow = React.createClass({
	displayName: 'ChatRow',

	viewChat: function() {
		ChatStore.setCurrentChat(this.props.chat.chatId);
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return nextProps.chat !== this.props.chat || nextProps.isSelected !== this.props.isSelected;
	},

	render: function() {

		// "1-on-1 or a group chat?
		var isGroup = this.props.chat.type != enums.ChatType.REGULAR;
		var activeUserId = session.getUser().userId;
		var lastMessageObj = (this.props.chat.messages.length > 0) ? _.last(this.props.chat.messages) : false;
		var lastMessage = lastMessageObj ? ChatHelper.formatMessage(lastMessageObj, false) : "";
		var lastMessageUser = (isGroup && lastMessageObj) ? "" : React.createElement("b", null, lastMessageObj.username, ": ");

		// Setup a user map. Should perhaps be moved to chat?
		var chatUsersMap = _.reduce(this.props.chat.users, function(memo, user) {
			memo[user.userId] = user;
			return memo;
		}, {});

		// Get all active users in the chat, yourself excluded
		var chatUsers = _.map(_.reject(this.props.chat.userIds, function(userId) {
			return userId == activeUserId;
		}), function(userId) {
			return chatUsersMap[userId];
		});

		// Construct the usernames string for the chat row
		if (this.props.chat.type == enums.ChatType.PLATOON) {
			var chatUsersString = this.props.chat.typeName;
		} else {
			var chatUsersString = _.map(chatUsers, function(user) {
				return user.username;
			}).join(", ");
		}

		var chatIcon = "";
		if (this.props.chat.type == enums.ChatType.PLATOON) {

			var url = ChatHelper.getEmblemFromClub(this.props.chat.club, 26);
			chatIcon = React.createElement("div", {
				className: "club-emblem"
			}, React.createElement("img", {
				src: url
			}))
		} else if (!isGroup && chatUsers.length == 1) {
			// "1-on-1"
			var avatar = dom.user_avatar(chatUsers[0]);
			chatIcon = React.createElement("div", {
				className: "chat-icon"
			}, React.createElement("div", {
				className: "avatar-container",
				dangerouslySetInnerHTML: {
					__html: avatar[0].outerHTML
				}
			}))
		} else {
			chatIcon = React.createElement("div", {
				className: "chat-icon"
			}) // Group Icon as default
		}


		var classes = React.addons.classSet({
			"chat": true,
			"selected": this.props.isSelected,
			"unread": this.props.chat.unreadCount > 0,
			"no-user": !chatUsersString
		});

		return React.createElement("li", {
				onClick: this.viewChat,
				className: classes
			},

			chatIcon,

			React.createElement("div", {
					className: "chat-row-info"
				},
				React.createElement("div", {
					className: "usernames"
				}, React.createElement("span", {
					className: "unreadCount"
				}, this.props.chat.unreadCount), " ", chatUsersString),
				React.createElement("div", {
						className: "lastmessage"
					},
					lastMessageUser, lastMessage
				)
			),
			React.createElement("div", {
				className: "clear"
			})
		)
	}
});

module.exports = ChatRow;