React = require("react");

var dom = require('dom');
var dialog = require('dialog');
var locale = require('locale');
var session = require('session');
var enums = require('enums');
var MessageSection = require('js/../public/jsx/components/MessageSection.js');
var MessagesViewHeader = require('js/../public/jsx/components/MessagesViewHeader.js');


var ChatStore = require('js/../public/jsx/stores/ChatStore.js');
var ChatClient = require('js/../public/jsx/clients/ChatClient.js');

var ChatMessageModel = require('js/../public/jsx/models/ChatMessage.js');

// ******************** Components ********************
var ChatMemberRow = React.createClass({
	displayName: 'ChatMemberRow',
	onKickClick: function(e) {
		/*var $bn = $(e.currentTarget);
		if ($bn.hasClass("disabled")){
		    return;
		}
		$bn.addClass("disabled");*/
		ChatClient.kickChatUser(this.props.chatId, this.props.user.userId);
	},
	render: function() {
		var adminMenu = "";
		if (this.props.isAdmin && !this.props.isSelf) {
			adminMenu = React.createElement("div", {
					className: "btns"
				},
				React.createElement("button", {
					onClick: this.onKickClick,
					className: "button small"
				}, locale.t("ID_MOBILE_CHAT_KICK"))
			)
		}

		var avatar = dom.user_avatar(this.props.user);
		return (
			React.createElement("div", {
					className: "sectioninfo"
				},
				React.createElement("div", {
					dangerouslySetInnerHTML: {
						__html: avatar[0].outerHTML
					}
				}),
				React.createElement("div", {
					className: "username"
				}, this.props.user.username),
				adminMenu
			)
		);
	}
});


var MessagesView = React.createClass({
	displayName: 'MessagesView',


	inputFieldFocused: false,
	blurTimeout: null,

	addNewMessage: function(event) {
		event.stopPropagation();


		var chatId = this.props.chat.chatId;
		var message = this.refs.message.getDOMNode().value;

		var msg = ChatMessageModel.fromBackendData({
			"chatId": chatId,
			username: session.getUser().username,
			message: message
		});

		ChatStore.addTempMessage(chatId, {
			chatId: chatId,
			user: session.getUser(),
			userId: session.getUser().userId,
			username: session.getUser().username,
			message: message,
			type: "msg",
			temp: true,
			timestamp: new Date().getTime() / 1000
		});

		// Send to backend and listen to BP chat..  let bp trigger the add to the store..
		ChatClient.sendNewChatMessage(chatId, msg);

		var txt = this.refs.message.getDOMNode();
		txt.value = "";
		txt.style.height = "30px";
		txt.scrollTop = 0;


		if (this.inputFieldFocused)
			txt.focus();

		return false;
	},

	leaveChat: function(event) {
		var _this = this;

		dialog.confirm(locale.t("ID_MOBILE_CHAT_CONFIRM_LEAVE"), locale.t("ID_WEB_COMMON_DIALOG_HEADER_CONFIRM"), function(result) {
			if (!result) {
				return;
			}
			ChatClient.leaveChat(_this.props.chat.chatId);
		});
	},

	addChatMembers: function(event) {
		ChatStore.addChatMembers(this.props.chat.chatId);
	},

	checkHeight: function() {
		// Check if should expand to multiline
		var txt = this.refs.message.getDOMNode();

		if (txt.scrollHeight > 36) {
			txt.style.height = "42px";
		} else {
			txt.style.height = "30px";
		}
	},

	onBlur: function() {
		var _this = this;

		// Set this to not active, so we dont focus it
		this.blurTimeout = setTimeout(function() {
			_this.inputFieldFocused = false;
		}, 200);
	},

	onFocus: function() {
		clearTimeout(this.blurTimeout);
		this.inputFieldFocused = true;
	},


	render: function() {
		var _this = this;
		var lastUsername = false;
		var chatId = this.props.chat.chatId;
		var lastSection = [];
		var lastUser = false;
		var messages = [];

		// Create a lookup map on userId
		var chatUsersMap = _.reduce(_this.props.chat.users, function(memo, user) {
			memo[user.userId] = user;
			return memo;
		}, {});
		// Construct MessageSections
		// We should probably cache this instead, at least everything except the last one..
		_.each(this.props.chat.messages, function(message, i) {

			var isEvent = message.type != enums.ChatMessageType.MESSAGE;

			if (!lastUsername || lastUsername != message.username) {
				// A new section
				if (lastSection.length > 0) {
					messages.push(React.createElement(MessageSection, {
						key: "msg_" + chatId + "_" + i,
						user: lastUser,
						messages: lastSection
					}));
				}
				lastSection = [];
			}

			lastUser = chatUsersMap[message.userId];
			lastUsername = (isEvent) ? false : message.username;
			lastSection.push(message);
		});

		// Also add the last section if present
		if (lastSection.length > 0) {
			messages.push(React.createElement(MessageSection, {
				key: "msg_" + chatId + "_-1",
				user: lastUser,
				messages: lastSection
			}));
		}


		var activeUserId = session.getUserId();
		var currentChatUsers = _.map(this.props.chat.userIds, function(userId) {
			return chatUsersMap[userId];
		});

		// Construct a string with current users (except self) for the header
		var currentChatUsersString = _.map(_.reject(currentChatUsers, function(user) {
			return user.userId == activeUserId;
		}), function(user) {
			return user.username;
		}).join(", ");



		var chatMemberList = "";
		var footer;
		if (currentChatUsers.length == 1 && this.props.chat.type != enums.ChatType.PLATOON) {
			try {
				var linkString = locale.t('ID_MOBILE_CHAT_NO_USERS');
				var linkStringArr = linkString.split("[LINK]");
				var preLink = linkStringArr[0];
				linkStringArr = linkStringArr[1].split("[/LINK]");
				var link = React.createElement("a", {
					onClick: this.addChatMembers
				}, linkStringArr[0])
				var postLink = linkStringArr[1];

				footer = React.createElement("footer", null,
					React.createElement("p", {
						className: "empty-chat"
					}, preLink, link, postLink)
				)
			} catch (e) {
				// pass
			}

		} else {
			footer = React.createElement("footer", null,
				React.createElement("div", {
						className: "inner"
					},
					React.createElement("form", {
							onSubmit: this.addNewMessage
						},

						React.createElement("div", {
								className: "textinput"
							},
							React.createElement("textarea", {
								onBlur: this.onBlur,
								onFocus: this.onFocus,
								onKeyUp: this.checkHeight,
								ref: "message",
								placeholder: locale.t('ID_MOBILE_CHAT_TEXTFIELD_PLACEHOLDER')
							})
						),
						React.createElement("button", {
							className: "button primary",
							type: "submit"
						}, locale.t('ID_WEB_COMMON_POST'))

					)
				)
			)
		}

		var addChatMemberBtn;
		if (this.props.chat.type != enums.ChatType.PLATOON) {
			addChatMemberBtn = React.createElement("a", {
				className: "button primary",
				onClick: this.addChatMembers
			}, locale.t('ID_MOBILE_CHAT_ADD_FRIENDS'));
		}


		var content;
		if (this.props.chat.menuOpen) {
			var isAdmin = this.props.chat.type != enums.ChatType.PLATOON;

			// Sort users list
			currentChatUsers = currentChatUsers.sort(function(a, b) {
				// First sort on presence
				if (a.presence.isOnline == b.presence.isOnline) {
					// Secondly sort on username
					return (a.username.toLowerCase() < b.username.toLowerCase()) ? -1 : 1;
				} else {
					if (a.presence.isOnline) return -1;
					else if (b.presence.isOnline) return 1;
					else return 0;
				}
			});

			var chatMemberRows = _.map(currentChatUsers, function(user) {
				var isAdminRef = isAdmin;
				var isSelf = false;
				if (user.userId == activeUserId) {
					isAdminRef = false;
					isSelf = true
				}

				return React.createElement(ChatMemberRow, {
					user: user,
					isSelf: isSelf,
					isAdmin: isAdminRef,
					chatId: chatId
				});
			});
			chatMemberList = React.createElement("div", {
					className: "section chat-members"
				},
				React.createElement("div", {
					className: "sectionhead"
				}, locale.t('ID_MOBILE_CHAT_MEMBERS')),
				chatMemberRows
			)


			content = React.createElement("section", {
					className: "menu"
				},
				React.createElement("div", {
					className: "bgr"
				}),
				React.createElement("div", {
						className: "content"
					},
					addChatMemberBtn,
					React.createElement("a", {
						className: "button secondary",
						onClick: this.leaveChat
					}, locale.t('ID_MOBILE_CHAT_LEAVE')),

					chatMemberList
				)
			)
		} else {
			content = React.createElement("div", null,
				React.createElement("section", {
						className: "chat-messages"
					},
					React.createElement("div", {
							className: "inner"
						},
						React.createElement("div", {
								className: "container"
							},
							messages
						)
					)
				),
				footer
			)
		}


		var classes = React.addons.classSet({
			"message-view": true,
			"menu": this.props.chat.menuOpen
		});

		return (
			React.createElement("div", {
					ref: "view",
					className: classes
				},

				React.createElement("header", null,
					React.createElement(MessagesViewHeader, {
						view: this,
						back: !this.props.chat.menuOpen,
						type: this.props.chat.type,
						users: currentChatUsersString
					})
				),

				content
			)
		);
	}
});

module.exports = MessagesView;