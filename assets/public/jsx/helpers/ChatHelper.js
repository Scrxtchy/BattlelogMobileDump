var enums = require('enums');
var assets = require('assets');
var locale = require('locale');

var ChatHelper = {

	formatMessage: function(msg, wordwrap) {
		var messageStr = "NOT_SET";

		switch (msg.type) {

			case enums.ChatMessageType.MESSAGE:
				messageStr = _.escape(msg.message);
				if (wordwrap) {
					messageStr = messageStr.replace(/\n/g, "<br>");
				}
				return messageStr;

			case enums.ChatMessageType.USERADDED:
				return msg.inviter + " " + locale.t("ID_MOBILE_CHAT_ADDED") + " " + msg.username + "!";

			case enums.ChatMessageType.USERJOIN:
				return msg.username + " " + locale.t("ID_MOBILE_CHAT_JOINED");

			case enums.ChatMessageType.USERLEAVE:
				return msg.username + " " + locale.t("ID_MOBILE_CHAT_LEFT");

			case enums.ChatMessageType.USERKICKED:
				return msg.kicker + " " + locale.t("ID_MOBILE_CHAT_KICKED") + " " + msg.username + "!";
		}
	},

	getEmblemFromClub: function(club, size) {

		// Add the emblem as icon
		var size = size || 26
		try {
			var url = club.emblemPath || "";
		} catch (e) {
			var url = "";
		}

		var format = (url.indexOf("emblems") > -1) ? "jpeg" : "png";
		url = url.replace("[FORMAT]", format).replace("[SIZE]", size);
		if (url && url.substr(0, 7) != "http://") {
			url = assets.CDNResourceURL("/emblems/" + size + "/" + club.emblemPath);
		}
		if (!url) {
			url = assets.CDNResourceURL("/public/platoon/default-emblem-" + size + ".png");
		}

		return url;

	}



};

module.exports = ChatHelper;