function ChallengesViewController(e) {
	this._name = "ChallengesView", this._section = "warsaw", RefreshableViewController.call(this, e), this.pullToRefresh = !0, this.refreshButton = !1, this.title = "Missions", this.scrollViewTemplate = "ChallengesView-scrollviewcontent"
}
var app = require("app"),
	assets = require("assets"),
	web = require("web"),
	util = require("util"),
	dom = require("dom"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	template = require("template"),
	gamedata = {
		warsaw: require("gamedata/warsaw")
	},
	challengedata = require("challengedata");
challengedata.init();
var RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = ChallengesViewController, ChallengesViewController.prototype = new RefreshableViewController, ChallengesViewController.prototype.constructor = ChallengesViewController, ChallengesViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, ChallengesViewController.prototype.viewDidAppear = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidAppear.call(e), e.refresh()
}, ChallengesViewController.prototype.viewDidLoad = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidLoad.call(e), e.$messages = $('<div class="messages"></div>'), e.scrollView.$content.prepend(e.$messages), e.bindEvents()
}, ChallengesViewController.prototype.bindEvents = function() {
	var e = ".button.createchallenge",
		t = "disabled",
		n = "getUserActivePersonaForGame",
		r = "scrollView",
		i = this,
		s = function() {
			i.$(e).unbind("click").addClass(t), web.request("warsaw", "challengesfriends", {
				platform: session[n](enums.Game.WARSAW).platform,
				personaId: session[n](enums.Game.WARSAW).personaId
			}, function(n, o) {
				i.$(e).removeClass(t).addClick(s);
				if (n) {
					i[r].$content.prepend(dom.error_row("Error fetching friends"));
					return
				}
				if (!o.length) {
					i[r].$content.prepend(dom.error_row(locale.t("ID_MOBILE_CHALLENGES_NO_FRIENDS")));
					return
				}
				app.go("ChallengesCreateViewController", {
					section: i._section,
					challengeFriends: o
				})
			})
		};
	i.$(e).addClick(s)
}, ChallengesViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = "addClass",
		r = ".section.invites",
		i = "hidden",
		s = ".section.ongoing",
		o = ".section.completed",
		u = !0,
		a = "WARSAW",
		f = "challenges",
		l = "getUserActivePersonaForGame",
		c = "personaId",
		h = "append",
		p = "hideLoadingIndicator",
		d = !1,
		v = "<div></div>",
		m = "html",
		g = "find",
		y = "members",
		b = "removeClass",
		w = ".challenges";
	e || (e = function() {});
	var E = this;
	if (E[t]) return e("BUSY");
	E.$(r)[n](i), E.$(s)[n](i), E.$(o)[n](i), E.showLoadingIndicator(), E[t] = u, E.lastRefresh = new Date, E.$messages.empty(), web.request(enums.Game[a], f, {
		platform: session[l](enums.Game[a]).platform,
		personaId: session[l](enums.Game[a])[c]
	}, function(n, S) {
		return n ? (E.scrollView.scrollToTop(), E.$messages[h](dom.error_row(locale.t("ID_MOBILE_CHALLENGES_NOTLOAD"))), E[p](), E[t] = d, e()) : ($challenge_invites = $(v), $active_challenges = $(v), $completed_challenges = $(v), S[f].forEach(function(e) {
			var t = E.challenge_row(e, S.personatouser, "invites");
			t.addClick(function() {
				app.go("ChallengesItemViewController", {
					section: E._section,
					challenge_id: e.id,
					platform: e.platform
				})
			}), t[g](".map")[m]("");
			if (e.status == "ACTIVE") {
				var n = d;
				for (var f in e[y]) e[y][f][c] == session[l](enums.Game[a])[c] && !e[y][f].isAccepted && (n = u);
				t[g](".timeleft")[m]("Ends in " + util.friendlyDuration(e.ttl, u)), t[g](".rounds")[m](e.rounds), n ? (E.$(r)[b](i), $challenge_invites[h](t)) : (E.$(s)[b](i), $active_challenges[h](t))
			} else e.status == "COMPLETED" && (E.$(o)[b](i), $completed_challenges[h](t))
		}), E.$(r)[g](w)[m]($challenge_invites), E.$(s)[g](w)[m]($active_challenges), E.$(o)[g](w)[m]($completed_challenges), E.$(".button.createchallenge")[b](i), E[p](), E[t] = d, e())
	})
}, ChallengesViewController.prototype.challenge_row = function(e, t, n) {
	var r = "was_aborted",
		i = "challenge_row";
	if (n == "invites" || n == "active") i = "challenge_invite_overview_row";
	var n = challengedata.getChallengeType("en_US", e.statKey),
		s = $(template.render(i, {
			icon_url: "images/warsaw/challenges/type_placeholder.png",
			name: "",
			map_name: "",
			time_left: "",
			badge: n.badge,
			was_aborted: e[r] ? r : ""
		}));
	s.find(".timeleft").html("Ended " + util.friendlyTimestamp(e.createdTime));
	var o = 0;
	return e.members.forEach(function(e) {
		o++ < 4 && t[e.personaId] && s.find(".members").append(dom.user_avatar(t[e.personaId], 30))
	}), s
};