React = require("react");
var dom = require('dom');
var session = require('session');

var MessageUserRow = React.createClass({
	displayName: 'MessageUserRow',
	render: function() {

		var name = this.props.user.username;
		var isYou = name == session.getUser().username;

		var classes = React.addons.classSet({
			"chatmessage": true,
			"username": true,
			"is-you": isYou
		});

		var avatar = dom.user_avatar(this.props.user);
		return React.createElement("div", {
				className: classes
			},
			React.createElement("div", {
				className: "avatar-container",
				dangerouslySetInnerHTML: {
					__html: avatar[0].outerHTML
				}
			}),
			name
		)
	}
});

module.exports = MessageUserRow;