function load_view(e, t) {
	var n = "type",
		r = "addClass",
		i = "hidden",
		s = "removeClass",
		o = ".section.challengetype",
		u = "<div></div>",
		a = "en_US",
		f = "description",
		l = "capitalize",
		c = "toLowerCase",
		h = "append",
		p = "render",
		d = "addClick",
		v = "find",
		m = "mission",
		g = "data",
		y = "map",
		b = "ChallengesCreateViewController",
		w = "html",
		E = "setTitle",
		S = "warsaw",
		x = "prepend",
		T = "$content",
		N = "error_row",
		C = ".section.challengemap",
		k = "maps",
		L = "levels",
		A = "length",
		O = "rounds",
		M = ".section.challengerounds",
		_ = "friends",
		D = "challenge_friends_row",
		P = "personaId",
		H = "user",
		B = ".challengefriendsrow",
		j = ".challengefriendsrow.selected",
		F = "selected",
		I = ".challengefriends .createchallengebutton",
		q = "disabled",
		R = ".selected",
		U = "invitepersona",
		z = "personas",
		W = "confirm",
		X = ".section.challengeconfirm",
		V = "getUserActivePersonaForGame",
		J = "navigationController";
	t || (t = n), e.$(".section")[r](i);
	if (t == n) {
		e.title = "Create Mission", e.$(o)[s](i), $challenge_types = $(u);
		var K = challengedata.getChallengeTypes(a);
		$.each(K.types, function(e, t) {
			t[f] && (t[f] = t[f][c]()[l]()), $challenge_types[h]($(template[p]("challenge_type_row", t)))
		}), $challenge_types[v](".challengetyperow")[d](function() {
			e[m][n] = $(this)[g]("challenge-id"), e[m].view = y, app.go(b, e[m])
		}), e.$(o)[w]($challenge_types)
	} else if (t == y) e[E](locale.t("ID_MOBILE_CHALLENGES_CREATE_SELECT_MAP")), web.request(S, "challengesmaps", {}, function(t, n) {
		if (t) {
			e[T][x](dom[N]("Could not fetch data maps"));
			return
		}
		e.$(C)[s](i), $challenge_maps = $(u);
		var r = [{
			label: "ID_MOBILE_CHALLENGES_CREATE_ANY_MAP",
			id: "ALL"
		}];
		for (var o in n[k]) {
			var a = gamedata[S][L][L][n[k][o]];
			a && (r[r[A]] = a)
		}
		$.each(r, function(e, t) {
			var n = $(template[p]("challenge_map_row", t));
			n[v](".name")[w](locale.t(t.label)), $challenge_maps[h](n)
		}), $challenge_maps[v](".challengemaprow")[d](function() {
			e[m][y] = $(this)[g]("challenge-map"), e[m].view = O, app.go(b, e[m])
		}), e.$(C)[w]($challenge_maps)
	});
	else if (t == O) e.$(M)[s](i), e[E]("Attempts"), $challenge_rounds = $(u), e.challenge_data[O].forEach(function(e) {
		e === 0 ? description = "UNLIMITED" : description = e, $challenge_rounds[h]($(template[p]("challenge_rounds_row", {
			num_rounds: e,
			description: description
		})))
	}), $challenge_rounds[v](".challengeroundsrow")[d](function() {
		e[m][O] = $(this)[g]("challenge-rounds"), e[m].view = _, app.go(b, e[m])
	}), e.$(M)[w]($challenge_rounds);
	else if (t == _) e[E](locale.t("ID_MOBILE_CHALLENGES_INVITE_FRIENDS")), $challenge_friends = $('<div class="friendscontainer"></div>'), e[_] = {}, $.each(e.challengeFriendPersonas, function(e, t) {
		$challenge_friends[h]($(template[p](D, {
			personaId: t[P],
			username: t[H].username,
			avatar: dom.user_avatar(t[H])[0].outerHTML,
			md5: t[H].gravatarMd5
		})))
	}), $challenge_friends[v](B)[d](function() {
		var t = e.$(j)[A];
		if (!$(this).hasClass(F) && t > 3) return;
		$(this).toggleClass(F);
		var n = e.$(j)[A];
		n ? (e.$(I)[s](q), n > 3 ? e.$(B).not(R)[r](q) : e.$(B).not(R)[s](q)) : e.$(I)[r](q)
	}), e.$(".section.challengefriends > .friendslist")[w]($challenge_friends), e[m][U] && (e.$("[data-challenge-personaid=" + e[m][U] + "]")[r](F), e.$(I)[s](q)), e.$(".section.challengefriends")[s](i), e.$(I)[d](function() {
		if (e.$(this).hasClass(q)) return;
		e[m][z] = [], e.$(j).each(function(t) {
			var n = e.$(this)[g]("challenge-personaid"),
				r = e.$(this)[g]("md5");
			e[m][z].push({
				personaId: n,
				username: e.$(this)[g]("challenge-username"),
				md5: r
			})
		}), e[m].view = W, app.go(b, e[m])
	});
	else if (t == W) {
		e.$(X)[s](i), e[E]("Confirm"), e.$(".challengeconfirm ");
		var Q = $(u);
		for (var G in e[m][z]) e[m][z][G].avatar = "<img src='" + util.gravatar(e[m][z][G].md5) + "'>", Q[h]($(template[p](D, e[m][z][G])));
		e.$(".section.challengeconfirm > .friendslist")[w](Q);
		var Y = e.$(X),
			Z = challengedata.getChallengeType(a, e[m][n]);
		Y[v](".type")[w](Z.name), Z[f] && Y[v](".description")[w](Z[f][c]()[l]());
		var et = "Unknown map";
		gamedata[S][L][L][e[y]] ? et = locale.t(gamedata[S][L][L][e[m][y]].label) : e[y] == "ALL" && (et = locale.t("ID_WEB_COMMON_ALL_MAPS")), Y[v](".mapname")[w](et);
		var tt = e[O];
		tt == 0 && (tt = "Unlimited"), Y[v](".roundcount")[w](tt), Y[v](".badge-image")[r](Z.badge), e.$(".createchallengebutton")[d](function() {
			var t = [];
			for (var i in e[m][z]) t[t[A]] = e[m][z][i][P];
			web.request(S, "createchallenge", {
				platform: session[V](enums.Game.WARSAW).platform,
				personaId: session[V](enums.Game.WARSAW)[P],
				invitees: t,
				statkey: e[m][n],
				map: e[m][y],
				rounds: e[m][O]
			}, function(t, n) {
				if (t) {
					t == "TOO_MANY_CHALLENGES" ? (e[T][x](dom[N]("You have too many active missions.")), e.$(".challengeconfirm .createchallengebutton")[r](q)) : e[T][x](dom[N]("Error creating mission, try again in a bit."));
					return
				}
				app.go("ChallengesItemViewController", {
					section: e._section,
					challenge_id: n.id,
					platform: n.platform
				}, function() {
					var t = e[J].getViewsOfType("ChallengesCreateView");
					while (t[A]) {
						var n = t.pop();
						e[J].removeView(n)
					}
				})
			})
		})
	}
}

function ChallengesCreateViewController(e) {
	var t = "invitepersona",
		n = "challengeFriends",
		r = "challenge_data";
	this._name = "ChallengesCreateView", this._section = "warsaw", e ? (this.mission = e, e[t] && (this[t] = e.invited), e[n] && (this.challengeFriendPersonas = e[n]), this[r] = {}, this[r].rounds = [0, 1, 3, 5], this[r].maps = [{
		label: locale.t("ID_WEB_COMMON_ALL_MAPS"),
		id: "ALL"
	}, gamedata.warsaw.levels.levels.MP_Siege]) : this.mission = {
		view: "type"
	}, ScrollableViewController.call(this, e), this.title = "Create Mission"
}
var app = require("app"),
	assets = require("assets"),
	locale = require("locale"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	dom = require("dom"),
	template = require("template"),
	gamedata = {
		warsaw: require("gamedata/warsaw")
	},
	challengedata = require("challengedata");
challengedata.init();
var ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = ChallengesCreateViewController, ChallengesCreateViewController.prototype = new ScrollableViewController, ChallengesCreateViewController.prototype.constructor = ChallengesCreateViewController, ChallengesCreateViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return load_view(t, t.view), e()
	})
}, ChallengesCreateViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e)
};