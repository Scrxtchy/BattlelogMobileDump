React = require("react");
var events = require('events');
var device = require('device');
var locale = require('locale');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ChatRow = require('js/../public/jsx/components/ChatRow.js');

var ChatStore = require('js/../public/jsx/stores/ChatStore.js');
var Chats = React.createClass({displayName: 'Chats',

    shouldComponentUpdate: function() {
        // Only need to rerender whenever currentChat == false! or if you use tablet + portrait
        return !ChatStore.getCurrentChat() || (device.isTablet() && device.isOrientationLandscape());
    },

    /* Triggered from the Store... */
    onChatChange: function(){
        this.setState(this.getInitialState());
    },

    getInitialState: function () {
        return ChatStore.getDefaultState();
    },

    componentDidMount: function() {
        this.unsubscribe = ChatStore.listen(this.onChatChange);
    },

    componentWillUnmount: function() {
        this.unsubscribe();
    },

    componentDidUpdate: function() {
        /*if(ChatStore.getCurrentChat()) {
            $(".chat-messages").scrollTop(100000); // Hurray!
        }*/
    },

    onHideClick: function(){
        this.props.controller.close();
    },

    onNewClick: function(){
        ChatStore.createNewChat();
    },

    render: function() {


        // Sort chats on latest timetamp at the top if you don't look at it...
        this.state.chats = _.sortBy(this.state.chats, function(chat){
                try {
                    return -parseInt(_.last(chat.messages).timestamp)
                } catch(e) {
                    return 0;
                }
            }
        );

        var totalUnread = 0;
        var totalChatUnread = 0;
        var chats = _.map(this.state.chats, function(chat){
            if(chat.unreadCount > 0 ) {
                totalUnread+=chat.unreadCount;
                totalChatUnread += 1;
            }


            return React.createElement(ChatRow, {key: chat.chatId, chat: chat, isSelected: chat.chatId == ChatStore.getCurrentChat()});
        });

        if(!chats.length) {
            chats = React.createElement("li", {className: "no-chats"}, locale.t("ID_MOBILE_NO_CHATS"));
        }

        if(!this.cacheUnread || this.cacheUnread != totalChatUnread)
        {
            events.emit("ChatsUnread", totalChatUnread);
            this.cacheUnread = totalChatUnread;
        }

         var classes = React.addons.classSet({
            "chats": true,
            "nv-warsaw": true
        });


        return (
            React.createElement("div", {className: classes}, 
                React.createElement("div", {className: "button-container"}, 
                    React.createElement("button", {className: "button secondary", onClick: this.onNewClick}, locale.t('ID_MOBILE_CHAT_CREATE_NEW'))
                ), 
                React.createElement("div", {className: "sectiontitle"}, 
                    locale.t('ID_MOBILE_CHAT_TITLE')
                ), 
                React.createElement("ul", {className: "chats-list"}, chats)
            )
            );
    }
});

module.exports = Chats;



