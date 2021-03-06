function ProfileViewController(e) {
	this._name = "ProfileView", this._section = null, this.game = session.getActiveGame(), this.gameName = enums.AppGameName[this.game], this.user = null, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_PROFILE", this.title = "Profile"
}
var app = require("app"),
	dom = require("dom"),
	web = require("web"),
	session = require("session"),
	storage = require("storage"),
	enums = require("enums"),
	events = require("events"),
	template = require("template"),
	assets = require("assets"),
	locale = require("locale"),
	receipt = require("receipt"),
	util = require("util"),
	presence = require("presence"),
	ScrollableViewController = require("controllers/ScrollableViewController"),
	InlineFeedsViewController = require("controllers/InlineFeedsViewController");
module.exports = ProfileViewController, ProfileViewController.prototype = new ScrollableViewController, ProfileViewController.constructor = ProfileViewController, ProfileViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, ProfileViewController.prototype.populateSoldier = function(e, t) {
	var n = "currentRankNeeded",
		r = "nextRankNeeded",
		i = "overviewStats",
		s = "pointsNeeded",
		o = "personaInfo",
		u = this,
		a = e[n].level == e[r].level ? !0 : !1;
	if (!a) var f = e[i].rankScore - e[n][s],
		l = e[r][s] - e[n][s];
	else var f = e[n][s],
		l = e[n][s];
	var c = enums.Platform.toString(t.platform),
		h = "",
		p = "";
	t[o] && t[o].picture && (h = t[o].picture), t[o] && t[o].tag && (p = t[o].tag);
	var d = $(template.render("soldier_row_large", {
		name: t.persona.personaName,
		game: u.gameName,
		platform: c,
		premium: u.userIsPremium,
		rank: {
			rank: e[i].rank,
			score: f,
			maxScore: l
		},
		picture: util.getSoldierImageUrl(u.game, "large", h),
		tag: p
	}));
	d.addClick(function() {
		app.go("StatsViewController", {
			section: u.gameName,
			persona: t.persona,
			platform: t.platform,
			user: u.user
		})
	}), u.$(".section.soldierstats").removeClass("loading").empty().append(d)
}, ProfileViewController.prototype.viewWillDisappear = function() {
	var e = this;
	e.scrollView.unbind("scrolledToBottom", e.scrollBind)
}, ProfileViewController.prototype.viewDidLoad = function() {
	var e = "game",
		t = "platform",
		n = "html",
		r = "removeClass",
		i = ".section.presentation",
		s = "hidden",
		o = ".presentationtext",
		u = "escapeHTML",
		a = "presentation",
		f = "scrollView",
		l = "click",
		c = "user",
		h = "addClick",
		p = "userId",
		d = "addClass",
		v = "request",
		m = "userprofile",
		g = "userIsPremium",
		y = "profileBlocked",
		b = "playingMp",
		w = '"></span>',
		E = "friendstatus",
		S = "userfriendstatus",
		x = "privacyDetails",
		T = "location",
		N = "length",
		C = "userfriends",
		k = "mutualfriends",
		L = ".button.add-friend",
		A = "disabled",
		O = "showReceipt",
		M = "ID_MOBILE_PROFILE_FRIEND_REQUEST_SENT",
		_ = ".button.friend-response",
		D = "soldiers",
		P = "usersoldiers",
		H = "personaId",
		B = "persona",
		j = ".sectionbutton.allsoldiers",
		F = "homestats.",
		I = "getObject",
		q = "populateSoldier",
		R = "inlineFeedsView",
		U = this,
		z = 0,
		W = 1,
		X = 2,
		V = 3,
		J = session.getUserActivePersonaForGame(U[e]),
		K = J ? J[t] : 0;
	events.bind("didChangePresentation", function(e) {
		U.$(i)[r](s).find(o)[n](e[a][u]().nl2br())
	}), U.scrollBind = U[f].bind("scrolledToBottom", function() {
		U.$(".more-button").trigger(l)
	}), ScrollableViewController.prototype.viewDidLoad.call(U);
	var Q = $(template.render("profile_user_row", U[c]));
	Q.find(".avatar")[n](dom.user_avatar(U[c])), U.$content.prepend(Q);
	var G = U.$(".col-report")[h](function() {
		app.go("ReportAbuseViewController", {
			type: "profile",
			profileId: U[c][p]
		})
	});
	U[c][p] == session.getUserId() && G[d](s), web[v](U[e], "profilepage", {
		userId: U[c][p],
		platform: K,
		game: U[e]
	}, function(z, W) {
		U.$(".loader").remove();
		if (z) {
			U[f].scrollToTop(), U.isLoading = !1;
			return
		}
		var V = parseInt(W[m][p]) == session.getUserId();
		U[g] = W.userpremium, U[g] && $(".ProfileView")[d]("premium"), U.$(".all-soldiers")[r](s), !V && session.hasRollout("MOBILE_CHAT") && U.$(".btn-chat")[r](s).show().on(l, function() {
			require(["js/../public/jsx/stores/ChatStore.js"], function(e) {
				e.createChatWithUserIds([W[m][p]])
			})
		});
		if (!W[m][y]) {
			var K = W.userpresence,
				Q = "";
			if (presence.isPlayingMp(K) && K[b][e] == U[e]) {
				Q += locale.t("ID_WEB_PROFILE_PLAYING") + " " + locale.t("ID_WEB_PROFILE_PLAYING_ON") + ":<br>", Q += K[b].serverName || locale.t("ID_MOBILE_USERPRESENCE_MULTIPLAYER"), Q += " &bull; ", Q += '<span class="game-icon ' + enums.Game.toString(K[b][e]) + w, Q += '<span class="platform-icon small ' + enums.Platform.toString(K[b][t]) + w;
				var G = U.$(".section.presence")[r](s).find(".sectionbutton")[n](Q)[h](function() {
					app.go("ServerViewController", {
						guid: K[b].serverGuid,
						game: K[b][e],
						platform: K[b][t]
					})
				})
			}
		}
		var Y = !1;
		if (W[S][E] === 1) {
			if (W[m][x] >= X || W[m][x] === 0) Y = !0
		} else V && (Y = !0);
		Y && $(".InlineFeedsView").css({
			display: "block"
		}), W[m][T] && Y && (U.$(".moreinfo .location")[r](s), U.$(".moreinfo .location span")[n](locale.t("ID_COUNTRY_" + W[m][T])), U.$(".moreinfo .location img").attr("src", assets.CDNResourceURL("/public/common/flags/small-square/" + W[m][T] + ".png"))), !W[m].presentationHidden && W[m][a] && W[m][a][N] > 0 && U.$(i)[r](s).find(o)[n](W[m][a][u]().nl2br()), W[m].showFriendsUI && (U.$("span.friendcount")[n]("(" + (W[C].friends[N] + W[C][k][N]) + ")").fadeIn(), U.$(".sectionbutton.friends")[r](s)[h](function() {
			app.go("ProfileFriendsViewController", {
				friends: W[C].friends,
				mutualFriends: W[C][k],
				user: U[c]
			})
		})), W[m][y] ? U.$(L).hide() : W[S][E] != 1 && W[S][E] != 8 && !V && (W[S][E] != 2 && U.$(L)[r](s).show(), W[S][E] == 0 ? U.$(L)[h](function() {
			U.$(L)[d](A), web[v](U[e], "sendfriendrequest", {
				userId: U[c][p]
			}, function(e, t) {
				if (e) {
					receipt[O](locale.t("ID_MOBILE_PROFILE_FRIEND_REQUEST_FAILED"));
					return
				}
				receipt[O](locale.t(M))
			})
		}) : W[S][E] == 2 ? (U.$("#friend-response-buttons")[r](s), U.$(_)[h](function() {
			var t = $(this).data("response");
			$(_)[d](A), web[v](U[e], t + "friendrequest", {
				userId: U[c][p]
			}, function(e, n) {
				var r = locale.t("ID_MOBILE_PROFILE_FRIEND_RESPONSE_" + t.toUpperCase());
				receipt[O](r), events.emit("refreshComcenter"), $(_).fadeOut()
			})
		})) : W[S][E] == 4 && (U.$(L)[d](A), U.$(L)[n](locale.t(M))));
		var Z = null;
		for (var et in W[P][D])
			if (V) {
				if (W[P][D][et][B][H] == J[H]) {
					Z = W[P][D][et];
					break
				}
			} else if (W[P][D][et][e] == U[e]) {
			Z = W[P][D][et];
			break
		}
		W[P][D][N] < 2 && U.$(j).hide(), U.$(j)[h](function() {
			app.go("ProfileSoldiersViewController", {
				section: U.gameName,
				soldiers: W[P][D],
				user: U[c]
			})
		});
		if (Z) {
			var tt = F + String(Z[B][H]) + "." + String(Z[t]),
				nt = F + String(Z[B][H]) + "." + String(Z[t]) + ".lastUpdated",
				rt = 6e5,
				it = storage[I](nt),
				st = null;
			it && it > (new Date).getTime() - rt && (st = storage[I](tt)), st ? U[q](storage[I](tt), Z) : web[v](Z[e], "homestats", {
				personaId: Z[B][H],
				platform: Z[t]
			}, function(e, t) {
				if (e || !t || !t.overviewStats || !t.currentRankNeeded || !t.nextRankNeeded) return;
				storage.setObject(nt, (new Date).getTime()), storage.setObject(tt, t), U[q](t, Z)
			})
		}
		U[R] = new InlineFeedsViewController({
			parentViewController: U,
			user: U[c]
		}), U.subviews.push(U[R]), U[R].init(function() {
			U.$content.append(U[R].$el)
		})
	})
};