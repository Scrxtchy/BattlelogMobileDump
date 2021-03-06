var app = require("app"),
	template = require("template"),
	events = require("events"),
	enums = require("enums"),
	session = require("session"),
	storage = require("storage"),
	web = require("web"),
	device = require("device"),
	alreadyAddedPushFeatures = !1;
exports.addPushFeatures = function() {
	if (alreadyAddedPushFeatures) {
		app.log("Not readding push features...");
		return
	}
	app.log("Adding push features?"), this.setupPushNotificationsCallback(), this.setupPushOptInFlow(), alreadyAddedPushFeatures = !0, app.log("Push features added!")
}, exports.setupPushOptInFlow = function() {
	var e = "pushSettings",
		t = "tokenInfo",
		n = "pushfriends";
	events.bind("drawerDidOpenRight", function() {
		app.log("Did open.., pushsettings is " + session[t][e]);
		var r = storage.get("pushNpxFriends1");
		!r && session[t] && session[t][e] == -1 ? web.request(session.getActiveSection(), "showpushnpx", {}, function(e, t) {
			app.log("showpushnpx result...");
			if (e) return;
			app.log("pushfriends: " + t[n]), n in t && t[n] === !1 && require(["dialog"], function(e) {
				e.showPushInfoDialog()
			})
		}) : app.log("Not showing since you have already seen this or changed settings before... clear ls!")
	})
}, exports.setupPushNotificationsCallback = function() {
	var e = "PushNotificationType",
		t = "doOpenComcenter";
	events.bind("openedAppFromPush", function(r) {
		app.log("Got openedFromPush in app!"), app.log(r);
		switch (parseInt(r.type)) {
			case enums[e].NEWSPOST:
				function i() {
					setTimeout(function() {
						app.go("NewsItemViewController", {
							styleSection: enums.AppGameName[parseInt(r.game)],
							newsitem: {
								postId: r.postId
							}
						})
					}, 1500)
				}
				var s = session.getActiveGame();
				if (r.game == "" || !!s && s == parseInt(r.game)) i();
				else {
					app.log("Changing section!");
					try {
						session.setActiveGame(parseInt(r.game), i)
					} catch (o) {
						app.error(o)
					}
				}
				break;
			case enums[e].CHAT:
				if (session.hasRollout("MOBILE_CHAT")) {
					var u = r.chatId;
					require(["js/../public/jsx/stores/ChatStore.js"], function(e) {
						e.setCurrentChat(u), device.isTablet() && (events.emit(t), events.emit("doShowChat"))
					})
				}
				break;
			case enums[e].FRIENDSPLAYING:
				events.emit(t);
				break;
			case enums[e].XPWEEKEND || r.type == enums[e].NEWRELEASES:
				require(["npx"], function(e) {
					e.init()
				});
				break;
			default:
				app.error("Got a non handled push notification type: " + r.type)
		}
		session.pushNotifications = [], app.log("Did reset pushnotifications in js...")
	})
};