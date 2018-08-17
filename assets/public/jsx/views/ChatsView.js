React = require("react");

ChatsView = {};

var Chats = require('js/../public/jsx/components/Chats.js');

ChatsView.init = function(elem){
    React.render(
        React.createElement(Chats, null), elem
    );
}

module.exports = ChatsView;