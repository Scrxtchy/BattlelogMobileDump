React = require("react");
var session = require('session');
var enums = require('enums');
var util = require('util');

var ChatHelper = require('js/../public/jsx/helpers/ChatHelper.js');

var MessageRow = React.createClass({
	displayName: 'MessageRow',

	toggleTimestamp: function(e) {
		this.refs.ts.getDOMNode().classList.toggle("hidden");
	},

	render: function() {

		var msg = this.props.message;
		var messageStr = ChatHelper.formatMessage(msg, true);
		var ts = util.friendlyTimestamp(msg.timestamp);

		var isYou = msg.username == session.getUser().username;
		var isEvent = msg.type != enums.ChatMessageType.MESSAGE;
		var classes = React.addons.classSet({
			"chatmessage": true,
			"clear": true,
			"is-event": isEvent,
			"is-you": isYou && !isEvent,
			"is-friend": !isYou && !isEvent
		});

		return React.createElement("div", {
				onClick: this.toggleTimestamp,
				className: classes
			},
			React.createElement("span", {
				dangerouslySetInnerHTML: {
					__html: messageStr
				}
			}),
			React.createElement("div", {
				ref: "ts",
				className: "ts hidden"
			}, "Sent ", ts)
		)
	}
});

module.exports = MessageRow;