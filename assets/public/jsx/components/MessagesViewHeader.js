React = require("react");
var enums = require("enums");
var session = require("session");
var locale = require("locale");
var ChatStore = require('js/../public/jsx/stores/ChatStore.js');
var ChatHelper = require('js/../public/jsx/helpers/ChatHelper.js');

var MessagesViewHeader = React.createClass({displayName: 'MessagesViewHeader',

    hideChat: function(event) {
        ChatStore.setCurrentChat(null);
    },

    render: function() {
        var classes = React.addons.classSet({
            "chat-header": true,
            "navbar": true
        });

        // this.props.type == chatType
        // this.props.users == chatUsers

        var txt = "NOT_SET";
        var icon;

        switch(this.props.type) {
            case enums.ChatType.GROUP:
            case enums.ChatType.REGULAR:
                txt = this.props.users || locale.t('ID_MOBILE_CHAT_EMPTY_CHAT');
                break;

            case enums.ChatType.PLATOON:
                var url = ChatHelper.getEmblemFromClub(this.props.view.props.chat.club, 26);
                icon = React.createElement("div", {className: "club-emblem"}, React.createElement("img", {src: url}))
                txt = this.props.view.props.chat.typeName;
                break;
            case enums.ChatType.ADMIN:
                txt = "ADMIN";
                break;

        }

        var btnBack = (this.props.back) ? React.createElement("button", {onClick: this.hideChat, className: "button back"}, React.createElement("span", {className: "button-icon minimize"})) : "";

        return React.createElement("div", {className: classes}, 
            React.createElement("button", {onClick: ChatStore.toggleMenu, className: "button menu"}, React.createElement("span", {className: "button-icon menu cog"})), 
            React.createElement("div", {className: "middle"}, 
            icon, React.createElement("strong", null, txt)
            ), 
            btnBack
        )
    }
});

module.exports = MessagesViewHeader;
