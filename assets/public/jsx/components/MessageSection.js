React = require("react");
var session = require('session');
var enums = require('enums');
var util = require('util');
var dom = require('dom');


var ChatHelper = require('js/../public/jsx/helpers/ChatHelper.js');
var ChatStore = require('js/../public/jsx/stores/ChatStore.js');
var MessageRow = require('js/../public/jsx/components/MessageRow.js');


var MessageSection = React.createClass({displayName: 'MessageSection',

    render: function() {
        var isYou = this.props.user.username == ChatStore._user.username;
        var isEvent = this.props.messages.length == 1 && this.props.messages[0].type != enums.ChatMessageType.MESSAGE;

        var messages = _.map(this.props.messages, function(msg, i) {
               return React.createElement(MessageRow, {key: "msg_"+i, message: msg})
        });

        var classes = React.addons.classSet({
            "chat-section": true,
            "is-event": isEvent,
            "is-you": isYou
        });

        if(isEvent) {
            return React.createElement("div", {className: classes}, 
                messages
            )
        }
        else if(isYou) {
            return React.createElement("div", {className: classes}, 
                React.createElement("div", {className: "section-messages"}, 
                    messages
                )
            )
        } else {

            var avatar = dom.user_avatar(this.props.user);


            return React.createElement("div", {className: classes}, 
                React.createElement("div", {className: "section-avatar"}, 
                    React.createElement("div", {className: "avatar-container", dangerouslySetInnerHTML: {__html: avatar[0].outerHTML}})
                ), 
                React.createElement("div", {className: "section-messages"}, 
                    React.createElement("div", {className: "section-username"}, 
                        this.props.user.username
                    ), 
                    messages
                )
            )

        }


    }
});

module.exports = MessageSection;
