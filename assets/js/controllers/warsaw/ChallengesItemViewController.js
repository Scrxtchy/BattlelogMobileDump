function ChallengesItemViewController(e) {
	this._name = "ChallengesItemView", this._section = "warsaw", RefreshableViewController.call(this, e), this.pullToRefresh = !0, this.refreshButton = !1, this.challenge_id = e.challenge_id, this.platform = session.getUserActivePersonaForGame(enums.Game.WARSAW).platform, this.title = "Mission", this.scrollViewTemplate = "ChallengesItemView-scrollviewcontent", this.ttlTimer = null
}

function newComment(e, t) {
	var n = "challenge_comment";
	if (t.challengeId != e.challenge_id) return;
	var r = e.$(".challengeitem .comments-content");
	if (r.length) {
		t.timestamp = util.friendlyTimestamp(t.timestamp), t.avatar = util.gravatar(t.owner.gravatarMd5);
		var i = e.$(".challengeitem .viewmore").detach();
		t.page ? r.prepend($(template.render(n, t))) : r.append($(template.render(n, t))), r.append(i), e.$(".challengeitem .nocomment").hide()
	}
}
var app = require("app"),
	assets = require("assets"),
	web = require("web"),
	util = require("util"),
	dom = require("dom"),
	locale = require("locale"),
	receipt = require("receipt"),
	session = require("session"),
	events = require("events"),
	enums = require("enums"),
	template = require("template"),
	challengedata = require("challengedata");
challengedata.init();
var gamedata = {
		warsaw: require("gamedata/warsaw")
	},
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = ChallengesItemViewController, ChallengesItemViewController.prototype = new RefreshableViewController, ChallengesItemViewController.prototype.constructor = ChallengesItemViewController, ChallengesItemViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, ChallengesItemViewController.prototype.unloadView = function() {
	var e = this;
	e.ttlTimer = null
}, ChallengesItemViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.$messages = $('<div class="messages"></div>'), e.scrollView.$content.prepend(e.$messages), e.bindEvents(), e.refresh()
}, ChallengesItemViewController.prototype.ttlCountdown = function(e, t) {
	if (!(t > 0)) return;
	var n = this;
	e.html(util.friendlyDuration(t, !0, !0)), n.ttlTimer = setTimeout(function() {
		n.ttlCountdown(e, t - 1)
	}, 1e3)
}, ChallengesItemViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = !0,
		r = "platform_id",
		i = "request",
		s = "warsaw",
		o = "challenge_id",
		u = "hideLoadingIndicator",
		a = !1,
		f = "challenge",
		l = "html",
		c = "levels",
		h = "gameMap",
		p = "find",
		d = "ACTIVE",
		v = ".ttl",
		m = "friendlyTimestamp",
		g = "commentsloaded",
		y = "comments",
		b = "length",
		w = ".challengeitem .viewmore",
		E = "addClick",
		S = "personaId",
		x = "getUserActivePersonaForGame",
		T = "WARSAW",
		N = "members",
		C = "isAccepted",
		k = "showReceipt",
		L = "error";
	e || (e = function() {});
	var A = this;
	if (A[t]) return e("BUSY");
	A.showLoadingIndicator(), A[t] = n, A.lastRefresh = new Date, A.$messages.empty();
	var O = 0;
	A[r] ? O = A[r] : O = A.platform, web[i](s, "getchallenge", {
		platform: O,
		id: A[o]
	}, function(r, O) {
		if (r) return A.scrollView.scrollToTop(), A.$messages.append(dom.error_row(locale.t("ID_MOBILE_CHALLENGES_NOTLOAD"))), A[u](), A[t] = a, e();
		$challenge_item = A.challenge_item(O[f], O.personatouser), $challenge_item.css("width", "100%"), A.$(".challengeitem")[l]($challenge_item), O[f].was_aborted;
		var M = "Unknown map";
		if (gamedata[s][c][c][O[f][h]]) M = locale.t(gamedata[s][c][c][O[f][h]].label);
		else if (O[f][h] == "ALL" || !O[f][h]) M = locale.t("ID_WEB_COMMON_ALL_MAPS");
		$challenge_item[p](".map")[l](M);
		var _ = O[f].rounds > 0 ? String(O[f].rounds) : locale.t("ID_MOBILE_CHALLENGES_UNLIMITED");
		$challenge_item[p](".overviewdata .rounds")[l](_), O[f].status != d ? ($challenge_item[p](".temporal")[l]("Ended"), $challenge_item[p](v)[l](util[m](O[f].createdTime))) : A.ttlCountdown($challenge_item[p](v), O[f].ttl), A[u](), A[t] = a;
		var D = a,
			P = a,
			H = 0,
			B = A.$(".comments-content");
		A[g] = 0;
		for (var j in O[f][y]) {
			if (!O[f][y][j].owner) continue;
			if (j > 5) break;
			O[f][y][j].timestamp = util[m](O[f][y][j].timestamp), O[f][y][j].avatar = util.gravatar(O[f][y][j].owner.gravatarMd5), B.prepend($(template.render("challenge_comment", O[f][y][j])))
		}
		O[f][y][b] > 5 && !A.$(w)[b] && B.append("<div class='button secondary viewmore'>" + locale.t("ID_WEB_COMMON_VIEW_MORE") + "</div>"), A.$(w)[E](function() {
			A[g]++, web[i](s, "loadmorecomments", {
				challengeId: A[o],
				page: A[g]
			}, function(e, t) {
				var n = 0;
				for (var r in t[y]) {
					if (++n > 5) break;
					t[y][r].page = t.page, newComment(A, t[y][r])
				}
				t[y][b] != 6 && A.$(w).hide()
			})
		}), O[f].creator == session[x](enums.Game[T])[S] && (P = n);
		for (var F in O[f][N]) O[f][N][F][C] && H++, O[f][N][F][S] == session[x](enums.Game[T])[S] && (O[f][N][F][C] || (D = n));
		D && (A.$(".invite-buttons").show(), A.$(".button.respond-invite")[E](function() {
			web[i](s, A.$(this).data("answer") + "invite", {
				platform: A.platform,
				challengeId: A[o],
				personaId: session[x](enums.Game[T])[S]
			}, function(e, t) {
				var n = A.parentViewController;
				n.popToView(n.viewStack[n.viewStack[b] - 2])
			})
		})), P && H == 1 && O[f].status == d;
		var I = A.$(".section.comments .button.submit-comment"),
			q = A.$('.section.comments input[type="text"]');
		return I[E](function() {
			web[i](s, "addcomment", {
				challengeId: A[o],
				message: A.$(".section.comments .textinput input").val()
			}, function(e, t) {
				I.removeClass("pressed");
				if (e) {
					e == "TOO_SHORT" ? receipt[k](locale.t("ID_MOBILE_FORUM_POSTTOOSHORT"), L) : receipt[k](locale.t("ID_MOBILE_ERROR"), L);
					return
				}
				newComment(A, t.comment), q.val("")
			})
		}), e()
	})
}, ChallengesItemViewController.prototype.bindEvents = function() {
	var e = this;
	events.bind("push.ChallengesNewComment", newComment)
}, ChallengesItemViewController.prototype.challenge_item = function(e, t) {
	var n = "score",
		r = "isAccepted",
		i = "personaId",
		s = "isDeclined",
		o = $("<div></div>"),
		u = challengedata.getChallengeType("en_US", e.statKey);
	o.append($(template.render("challenge_item", {
		challenge: e,
		challenge_type: u
	})));
	var a = $('<div class="members"></div>'),
		f = 1,
		l = 1,
		c = -1,
		h = e.members.concat(e.declinedMembers);
	return h.forEach(function(o) {
		o[n] != c && (f = l), c = o[n], l++, o[r] ? o.rank = f : o.rank = "-";
		var u = t[o[i]];
		if (u) {
			o[n] >= 1e4 && (o[n] /= 1e3, o[n] = parseFloat(o[n]).toFixed(2) + "k");
			var h = $(template.render("challenge_member", {
				extraClass: o[i] == session.getUserActivePersonaForGame(enums.Game.WARSAW)[i] ? "myself" : "",
				username: u.username,
				isAccepted: o[r],
				isDeclined: o[s],
				roundsPlayed: o.roundsPlayed,
				maxRounds: e.rounds,
				score: o[r] ? o[n] : "",
				rank: o.rank,
				gravatarMd5: u.gravatarMd5
			}));
			h.find(".avatartd").html(dom.user_avatar(u, 30)), o[s] && h.addClass("declined"), a.append(h), h.data(i, o[i]).addClick(function() {
				app.go("ProfileViewController", {
					section: !1,
					user: t[$(this).data(i)]
				})
			})
		}
	}), o.find(".members-container").html(a), o
};