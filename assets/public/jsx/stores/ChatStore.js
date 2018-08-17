React = require("react");
var reflux = require('reflux');

var session = require('session');
var device = require('device');
var web = require('web');
var dialog = require('js/../public/jsx/components/SelectUsersDialog.js');
//var Immutable = require("Immutable");

var ChatClient = require('js/../public/jsx/clients/ChatClient.js');
var actions = reflux.createActions(["chatChange"]);

var receipt = require('receipt');

var ChatStore = reflux.createStore({

    removeMemberInChat: function(chatId, userId) {

        var chat = this.fetchChat(chatId);

        var filteredUserIds = _.reject(chat.userIds, function(uid) {
            return uid == userId;
        });

        var activeUserId = session.getUserId(),
            isInChat = _.find(filteredUserIds, function(uid){
                return uid == activeUserId;
            });

        if (!isInChat){
            this.removeChat(chat);
        } else {
            chat.userIds = filteredUserIds;
            if (activeUserId == userId){
                this.setChatWithoutTrigger(chat);
            } else {
                this.setChatAndTrigger(chat);
            }

        }

    },

    init: function () {
        this._user = session.getUser();
        this.chats = null;
        this.currentChat = null;
        this.listenToMany(actions);

        // TODO don't set the store here..  (Could not require it successfully
        ChatClient.store = this;
        ChatClient.loadChatsFromServer();
    },

    refreshChats: function() {
        ChatClient.loadChatsFromServer();
    },

    setCurrentChat: function(chatId) {
        if (!chatId && this.currentChat) {
            // Set the previous chat as read
            ChatClient.setChatAsRead(this.currentChat);
        }

        this.currentChat = chatId;
        if (chatId) {

            function chatOpenCallback(chat) {
                $(document).find(".RootView").addClass("chat");
                chat.unreadCount = 0;
                chat.menuOpen = false;

                // Also set this chat as read in backend
                ChatClient.setChatAsRead(chat.chatId);

                // Also track this as a screen in GA
                device.trackScreen("ChatView");
            }

            var chat = this.fetchChat(chatId, chatOpenCallback);
            if (chat) {
                chatOpenCallback(chat);
                this.setChatAndTrigger(chat);
            }

        } else {
            $(document).find(".RootView").removeClass("chat");
            this.trigger();
        }

    },

    createNewChat: function(){
        var _this = this;

        new dialog.SelectUsersDialog({
            title: "Select users",
            callback: function(users){
                if (!users) return;

                var userIds = _.pluck(users, "userId");
                _this.createChatWithUserIds( userIds );
            }
        });
    },

    createChatWithUserIds: function(userIds){
        var _this = this;
        web.request(session.getActiveGame(), 'chatcreate', {
            friendIds: userIds
        }, function(err, data) {
            if (err || !data || !data.chatId){
                // Handle errors better?
            } else {
                _this.setCurrentChat(data.chatId);
            }
        });
    },

    addChatMembers: function(chatId){
        var _this = this;
        var chat = this.fetchChat(chatId);

        new dialog.SelectUsersDialog({
            title: "",
            fixedUsers: _.map(chat.userIds, function(userId){
                return _.find(chat.users, function(user){
                    return user.userId == userId;
                });
            }),
            callback: function(users){
                if (!users) return;

                web.request(session.getActiveGame(), 'addFriendsToChat', {
                    chatId: chatId,
                    friendIds: _.map(users, function(user){
                        return user.userId
                    })
                }, function(err, data) {
                    if (err || !data || !data.addedFriendsIds){
                        return;
                    }

                    if (data.chatId != chatId){
                        _this.setCurrentChat( data.chatId );
                    }
                });
            }
        });
    },


    setChats: function(chats) {
        this.chats = chats;
        this.trigger();
    },

    setChatAndTrigger: function(chat) {
        /* Creates a new Object, so shouldComponentUpdate can compare the whole object.. */
        if (chat){
            this.chats[chat.chatId] = _.extend({}, chat);
        }
        this.trigger();
    },

    setChatWithoutTrigger: function(chat) {
        /* Creates a new Object, so shouldComponentUpdate can compare the whole object.. */
        this.chats[chat.chatId] = _.extend({}, chat);
    },

    removeChat: function(chat) {
        if (this.currentChat == chat.chatId) {
            this.setCurrentChat(null);
        }
        delete this.chats[chat.chatId];
        this.trigger();
    },

    setChatAsRead: function(chatId) {
        var chat = this.getChat(chatId);
        if (chat){
            chat.unreadCount = 0;
            this.setChatAndTrigger(chat)
        }
    },

    getCurrentChat: function() {
        return this.currentChat;
    },

    fetchChat: function (chatId, callback) {
        if (typeof this.chats[chatId] === "undefined") {
            ChatClient.loadChatFromServer(chatId, callback);
            return false;
        }
        return this.chats[chatId];
    },

    getChat: function (chatId) {
        if (typeof this.chats[chatId] === "undefined") {
            return false;
        }
        return this.chats[chatId];
    },

    toggleMenu: function(){
        this.chats[this.currentChat].menuOpen = !this.chats[this.currentChat].menuOpen;
        this.trigger();
    },

    addChatMessage: function(chatId, message) {
        var chat = this.fetchChat(chatId);

        if(chat) {

            // Remove temp message if it's your own
            if (message.userId == this._user.userId && chat.tempMessage && chat.tempMessage.length){
                chat.tempMessage.splice(0, 1);
            } else {

                chat.messages.push(message);

                // Increase the unread count if it isnt the currentChat
                if(this.currentChat != chatId && message.userId != this._user.userId ) {
                    chat.unreadCount += 1;

                    // And show a receipt
                    var user = _.find(chat.users, function(user){
                        return user.userId == message.userId;
                    });
                    if (user){
                        receipt.showChatMessage(chatId, message, user);
                    }
                }

                this.setChatAndTrigger(chat);

            }
        }
    },

    addTempMessage: function(chatId, message){
        var chat = this.getChat(chatId);
        if (chat) {
            chat.tempMessage = chat.tempMessage || [];
            chat.tempMessage.push(chat.messages.length);
            chat.messages.push(message);
            this.setChatAndTrigger(chat);
        }
    },

    getDefaultState: function() {
        return {
            chats: this.chats,
            currentChat: this.currentChat
        };
    }

});

module.exports = ChatStore;



