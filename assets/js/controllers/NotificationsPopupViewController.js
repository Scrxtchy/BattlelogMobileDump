function NotificationsPopupViewController(e) {
	var t = "activePersona";
	this._name = "NotificationsPopupView", this.game = null, this.category = null, this[t] = session.getUserActivePersonaForGame(enums.Game.WARSAW), RefreshableViewController.call(this, e), this.personaId = this[t] ? this[t].personaId : 0, this.platform = this[t] ? this[t].platform : 0, this.title = "Notifications", this.scrollViewTemplate = "NotificationsPopupView-scrollviewcontent"
}
var async = require("lib/async"), app = require("app"), locale = require("locale"), session = require("session"), util = require("util"), web = require("web"), template = require("template"), assets = require("assets"), enums = require("enums"), leveldata = null;
if (session.getActiveGame() == enums.Game.WARSAW) var leveldata = require("gamedata/warsaw/levels");
else if (session.getActiveGame() == enums.Game.OMAHA) var leveldata = require("gamedata/omaha/levels");
var RefreshableViewController = require("controllers/RefreshableViewController"),
	notificationTypes = {
		friendrequestaccepted: {
			actionSID: "ID_WEB_NOTIFICATION_x_ACCEPTED_FRIEND_REQUEST"
		},
		friendrequestdeclined: {
			actionSID: "ID_WEB_NOTIFICATION_x_DECLINED_FRIEND_REQUEST"
		},
		wallpostcreated: {
			actionSID: "ID_WEB_NOTIFICATION_x_WROTE_IN_YOUR_FEED"
		},
		feedcomment: {
			actionSID: "ID_WEB_NOTIFICATION_x_COMMENTED_ON_YOUR_x"
		},
		feedcommentreply: {
			actionSID: "ID_WEB_NOTIFICATION_x_ALSO_COMMENTED_ON_yS_x",
			actionSIDOwn: "ID_WEB_NOTIFICATION_x_ALSO_COMMENTED_ON_YOUR_x"
		},
		feedlike: {
			actionSID: "ID_WEB_NOTIFICATION_x_HOOAHS_YOUR_y"
		}
	},
	challengeNotificationTypes = {
		ChallengeMemberAccepted: {
			actionSID: "ID_WEB_NOTIFICATION_MISSION_ACCEPTED"
		},
		ChallengeCanceled: {
			actionSID: "ID_WEB_NOTIFICATION_MISSION_CANCELED"
		},
		ChallengeMemberDeclined: {
			actionSID: "ID_WEB_NOTIFICATION_MISSION_DECLINED"
		},
		ChallengeCreated: {
			actionSID: "ID_WEB_NOTIFICATION_MISSION_INVITED"
		},
		ChallengeFinished: {
			actionSID: "ID_WEB_NOTIFICATION_MISSION_FINISHED"
		},
		ChallengeNewLeader: {
			actionSID: "ID_WEB_NOTIFICATION_MISSION_NEWLEADER"
		},
		ChallengeScoreUpdated: {
			actionSID: "ID_WEB_NOTIFICATION_MISSION_SCOREUPDATED"
		}
	};
module.exports = NotificationsPopupViewController, NotificationsPopupViewController.prototype = new RefreshableViewController, NotificationsPopupViewController.prototype.constructor = NotificationsPopupViewController, NotificationsPopupViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return t.$notifications = t.$(".notifications"), t.$loader = t.$(".loader"), e()
	})
}, NotificationsPopupViewController.prototype.viewDidAppear = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidAppear.call(e), e.refresh()
}, NotificationsPopupViewController.prototype.refresh = function(e) {
	var t = "notifications",
		n = "category",
		r = "challenges",
		i = "battlereports",
		s = "$notifications",
		o = "render",
		u = "type",
		a = null,
		f = "wallpostcreated",
		l = "username",
		c = "feedcomment",
		h = "feed item",
		p = "feedlike",
		d = "replace",
		v = "[username]",
		m = "feedcommentreply",
		g = "userId",
		y = "feedItemId",
		b = "friendlyDate",
		w = "numUnread",
		E = "forEach",
		S = "addClass",
		x = "unread",
		T = "addClick",
		N = "getActiveGame",
		C = "ProfileViewController",
		k = "closeIfOpen",
		L = "notificationBar",
		A = "rootViewController",
		O = "append",
		M = "missionType",
		_ = "mapName";
	e || (e = function() {});
	var D = this,
		P = t;
	D[n] == r ? P = "challengenotifications" : D[n] == i && (P = "battlereportnotifications");
	var H = setTimeout(function() {
		D[s].hide(), D.$loader.show()
	}, 200);
	web.request(D.game, P, function(P, B) {
		clearTimeout(H), D.$loader.hide(), D[s].empty();
		if (P) return e(P);
		if (!B[D[n]] || !B[D[n]].length) return D[s].html(template[o]("NotificationsPopupView-no-results", {
			message: "ID_MOBILE_NOTIFICATIONS_NONE"
		})), e();
		if (D[n] == t) return async.map(B[D[n]], function(e, t) {
			if (!notificationTypes[e[u]]) return t(a);
			var n = locale.t(notificationTypes[e[u]].actionSID);
			e[u] == "friendrequestaccepted" || e[u] == "friendrequestdeclined" || e[u] == f ? n = e[l] + " " + n : e[u] == c ? n = e[l] + " " + n + " " + h : e[u] == p ? n = n[d](v, e[l])[d]("[hooahs]", locale.t("ID_WEB_FEED_HOOAHS"))[d]("[feeditem]", h) : e[u] == m && (e.itemOwnerId == session.getUserId() ? (n = locale.t(notificationTypes[e[u]].actionSIDOwn), n = n[d](v, e[l])) : n = n[d]("[username1]", e[l])[d]("[username2]", e.itemOwnerUsername), n = n[d]("[notificationtype]", h));
			var r = {};
			e[l] && (r[l] = e[l]), e[g] && (r[g] = e[g]), e[y] && (r[y] = e[y]), template[o]("NotificationsPopupView-notifications-single", {
				action: n,
				type: e[u],
				urlparam: JSON.stringify(r),
				date: util[b](e.timestamp * 1e3)
			}, function(e, n) {
				return t(a, $(n))
			})
		}, function(t, n) {
			return B[w] && n.slice(0, B[w])[E](function(e) {
				try {
					e[S](x)
				} catch (t) {}
			}), n[E](function(e) {
				try {
					var t = e.data("urlparam"),
						n = e.data(u);
					t && e[T](function() {
						var e = enums.AppGameName[session[N]()];
						switch (n) {
							case c:
							case m:
							case p:
								app.go("FeedItemViewController", {
									feedItemId: t[y]
								});
								break;
							case f:
								app.go(C, {
									styleSection: e,
									user: session.getUser()
								});
								break;
							default:
								app.go(C, {
									styleSection: e,
									user: {
										username: t[l],
										userId: t[g]
									}
								})
						}
						app[A][L][k]()
					})
				} catch (r) {}
			}), D[s][O](n), D[s].show(), e()
		});
		if (D[n] == r) return async.map(B[D[n]], function(e, t) {
			if (!challengeNotificationTypes[e[M]]) return t(a);
			var n = locale.t(challengeNotificationTypes[e[M]].actionSID);
			n = n[d]("[USER]", e.senderUsername)[d]("[MISSION_TYPE]", locale.t(e.missionString)), template[o]("NotificationsPopupView-challenges-single", {
				action: n,
				date: util[b](e.timestamp * 1e3)
			}, function(n, r) {
				var i = $(r);
				return i[T](function() {
					app.go("ChallengesItemViewController", {
						section: "warsaw",
						challenge_id: e.missionId,
						platform_id: e.toPlatform
					}), app[A][L][k]()
				}), t(a, i)
			})
		}, function(t, n) {
			return B[w] && n.slice(0, B[w])[E](function(e) {
				e[S](x)
			}), D[s][O](n), D[s].show(), e()
		});
		if (D[n] == i) return async.map(B[D[n]], function(e, t) {
			if (session[N]() == enums.Game.WARSAW) var n = "gamedata/warsaw/levels";
			else if (session[N]() == enums.Game.OMAHA) var n = "gamedata/omaha/levels";
			require([n], function(n) {
				var r = e[_].toLowerCase(),
					i = n.levels[e[_]] ? n.levels[e[_]].label : "Unknown",
					s;
				session[N]() == enums.Game.OMAHA ? s = util.getBFHGameModeSID(e.gameMode) : s = "ID_WEB_COMMON_GAMEMODE_" + e.gameMode, template[o]("NotificationsPopupView-battlereports-single", {
					reportid: e.reportId,
					map: r,
					mapname: i,
					gamemode: s,
					date: util[b](e.createdAt * 1e3)
				}, function(n, r) {
					var i = $(r);
					return i[T](function() {
						var t = $(this),
							n = t.data("reportid");
						app.go("BattleReportViewController", {
							section: !1,
							reportId: n,
							platform_report: e.platform,
							personaId_report: e.personaId
						}), app[A][L][k]()
					}), t(a, i)
				})
			})
		}, function(t, n) {
			return B[w] && n.slice(0, B[w])[E](function(e) {
				e[S](x)
			}), D[s][O](n), D[s].show(), e()
		})
	})
};