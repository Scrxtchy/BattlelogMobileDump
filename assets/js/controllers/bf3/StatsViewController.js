function StatsViewController(e) {
	var t = null;
	this._name = "StatsView", this._section = "bf3", this.user = t, this.persona = t, this.platform = t, RefreshableViewController.call(this, e), this.titleSID = "ID_MOBILE_VIEW_TITLE_STATS", this.scrollViewTemplate = "StatsView-scrollviewcontent", this.loadedData = t
}
var app = require("app"),
	dom = require("dom"),
	enums = require("enums"),
	web = require("web"),
	util = require("util"),
	locale = require("locale"),
	session = require("session"),
	gamedata = {
		ranks: require("gamedata/bf3/ranks"),
		classes: require("gamedata/bf3/classes"),
		items: require("gamedata/bf3/items"),
		awards: require("gamedata/bf3/awards")
	},
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = StatsViewController, StatsViewController.prototype = new RefreshableViewController, StatsViewController.constructor = StatsViewController, StatsViewController.prototype.viewDidLoad = function() {
	var e = "platform",
		t = this;
	RefreshableViewController.prototype.viewDidLoad.call(t);
	var n = ["errors", "rank", "overall", "kits", "topweapons", "topvehicles", "latestawards", "progression", "mpscore", "alltime"];
	n.forEach(function(e) {
		t["$" + e] = t.scrollView.$content.children("." + e).addClass("hidden")
	});
	if (!t[e]) {
		var r = session.getUserActivePersonaForGame(enums.Game.BF3);
		t[e] = r[e]
	}
	var i = dom.stats_persona_row(enums.Game.BF3, t.user, t.persona, t[e]),
		s = t.user || t.persona.user;
	s && i.addClick(function(e) {
		app.go("UserViewController", {
			user: s
		})
	}), t.$c(".toolbar").empty().append(i), t.bindEvents(), t.refresh()
}, StatsViewController.prototype.bindEvents = function() {
	var e = "addClick",
		t = "user",
		n = "persona",
		r = "platform",
		i = this;
	i.$(".sectionbutton.weapons")[e](function() {
		app.go("WeaponsViewController", {
			user: i[t],
			persona: i[n],
			platform: i[r]
		})
	}), i.$(".sectionbutton.equipment")[e](function() {
		app.go("EquipmentViewController", {
			user: i[t],
			persona: i[n],
			platform: i[r]
		})
	}), i.$(".sectionbutton.vehicles")[e](function() {
		app.go("VehiclesViewController", {
			user: i[t],
			persona: i[n],
			platform: i[r]
		})
	}), i.$(".sectionbutton.awards")[e](function() {
		app.go("AwardsViewController", {
			user: i[t],
			persona: i[n],
			platform: i[r]
		})
	}), i.$(".sectionbutton.assignments")[e](function() {
		app.go("AssignmentsViewController", {
			user: i[t],
			persona: i[n],
			platform: i[r]
		})
	}), i.$(".sectionbutton.dogtags")[e](function() {
		app.go("DogtagsViewController", {
			user: i[t],
			persona: i[n],
			platform: i[r]
		})
	}), i.$(".sectionbutton.unlocks")[e](function() {
		app.go("UnlocksViewController", {
			user: i[t],
			persona: i[n],
			platform: i[r]
		})
	})
}, StatsViewController.prototype.refresh = function(e) {
	var t = "formatStatValue",
		n = "overviewStats",
		r = "-webkit-transform",
		i = "hidden",
		s = "</div>",
		o = "find",
		u = "$overall",
		a = "removeClass",
		f = "hideLoadingIndicator",
		l = "timePlayed",
		c = "text",
		h = '<div class="number">',
		p = '"></span>',
		d = ".items",
		v = '<div class="info">',
		m = '<div class="name">',
		g = "isLoading",
		y = "forEach",
		b = "$alltime",
		w = "append",
		E = "rotate(",
		S = "toggleClass",
		x = ".progressbar, .progress",
		T = "$rank",
		N = "kills",
		C = "$mpscore",
		k = "deaths",
		L = "float",
		A = "ranks",
		O = '<div class="kills">',
		M = '<div class="image">',
		_ = ".progressbar div",
		D = "ID_WEB_COMMON_KILLS",
		P = "pointsNeeded",
		H = !1,
		B = '.value[data-stat="',
		j = "shotsFired",
		F = "clamp",
		I = "$topweapons",
		q = "$latestawards",
		R = "deg)",
		U = "numLosses",
		z = ".image",
		W = "kitScores",
		X = "loadedData",
		V = "$topvehicles",
		J = "shotsHit",
		K = "latestAwards",
		Q = "numWins",
		G = "topVehicles",
		Y = "name",
		Z = "scaleX(",
		et = "topWeapons",
		tt = "gadgetsLocale",
		nt = "percent";
	e || (e = function() {});
	var rt = this;
	if (rt[g]) return e("BUSY");
	rt.showLoadingIndicator(), rt[g] = !0, rt.lastRefresh = new Date, web.request("bf3", "soldierstats", {
		personaId: rt.persona.personaId,
		platform: rt.platform,
		statTypes: [n, et, G, K].join(",")
	}, function(it, st) {
		rt.itemsLoaded = [], rt.reachedLastItem = H, rt.$errors.addClass(i).empty();
		if (it) return rt.scrollView.scrollToTop(), rt.$errors[w](dom.error_row(locale.t("ID_MOBILE_STATS_ERROR")))[a](i), rt[f](), rt[g] = H, e();
		if (!st[n]) return rt.scrollView.scrollToTop(), rt.$errors[w](dom.error_row(locale.t("ID_MOBILE_STATS_NOSTATS")))[a](i), rt[f](), rt[g] = H, e();
		if (rt[X] && st[n][l] == rt[X][n][l]) return rt[f](), rt[g] = H, e();
		rt[T][o](".name")[c](locale.t(gamedata[A][A][st[n].rank][Y])), rt[T][o](z)[w]('<span class="item-image rank large _' + st[n].rank + p);
		if (st[n].rank >= 145) rt[T][o](x).addClass(i);
		else {
			rt[T][o](x)[a](i);
			var ot = st[n].score - gamedata[A][A][st[n].rank][P],
				ut = gamedata[A][A][st[n].rank + 1][P] - gamedata[A][A][st[n].rank][P],
				at = ut - ot,
				ft = (ot / ut)[F](0, 1);
			rt[T][o]('[data-stat="rankProgressScore"]')[c](util[t](ot)), rt[T][o]('[data-stat="nextRankProgressScore"]')[c](util[t](ut)), rt[T][o]('[data-stat="scoreUntilRankup"]')[c](util[t](at)), rt[T][o](_).css(r, Z + ft + ")")
		}
		rt[T][a](i);
		var lt = [k, N, U, Q, "score", j, J, l],
			ct = {};
		lt[y](function(e) {
			ct[e] = (st[n][e] || 0) - (st[n]["rs" + e.capitalize()] || 0)
		});
		var ht = ct[l] ? ct.score / (ct[l] / 60) : 0,
			pt = (ht / 500)[F](0, 1),
			dt = 180 * pt - 90;
		setTimeout(function() {
			rt[u][o]('[data-stat-gauge="spm"]').css(r, E + dt + R)
		}, 200), rt[u][o]('[data-stat="scorePerMinute"]')[c](util[t](ht)), rt[u][o]('[data-stat="timePlayed"]')[c](util[t](ct[l], "time"));
		var vt = ct[j] ? ct[J] / ct[j] : 0,
			mt = Math.round((vt + .2)[F](0, 1) * 24),
			gt = Math.round((vt + .2)[F](0, 1) * 11);
		setTimeout(function() {
			rt[u][o]('[data-stat-gauge="accuracy"]').css(r, "translate(" + mt + "px," + gt + "px)")
		}, 400), rt[u][o]('[data-stat="accuracy"]')[c](util[t](vt, nt)), rt[u][o]('[data-stat="shotsHit"]')[c](util[t](ct[J]));
		var yt = ct[U] ? ct[Q] / ct[U] : 0,
			bt = yt[F](0, 2) / 2,
			wt = 180 * bt - 90;
		setTimeout(function() {
			rt[u][o]('[data-stat-gauge="wlr"]').css(r, E + wt + R)
		}, 600), rt[u][o]('[data-stat="wlr"]')[c](util[t](yt, L)), rt[u][o]('[data-stat="wins"]')[c](util[t](ct[Q]));
		var Et = ct[N] / (ct[k] || 1);
		rt[u][o]('[data-stat="kills"]')[c](util[t](ct[N])), rt[u][o]('[data-stat="deaths"]')[c](util[t](ct[k])), rt[u][o]('[data-stat="kdr"]')[c](util[t](Et, L)), rt[u][a](i);
		var St = 0;
		gamedata.classes.soldierKits[y](function(e) {
			var t = gamedata.classes.kitMap[e],
				i = st[n].kitTimesInPercentage[e] / 100,
				s = i * 360,
				u = St[F](0, 180),
				a = (St - 180)[F](0, 180);
			rt.$kits[o](".piechart.timeperkit .right ." + t[Y]).css(r, E + u + R), rt.$kits[o](".piechart.timeperkit .left ." + t[Y]).css(r, E + a + R), St += s;
			var f = rt.$kits[o](".servicestarrow." + t[Y]),
				l = st[n].serviceStarsProgress[e] / 100;
			f[o](_).css(r, Z + l + ")"), f[o](".numstars")[S]("zero", st[n].serviceStars[e] == 0), f[o](".numstars span")[c](st[n].serviceStars[e])
		}), rt.$kits[a](i), rt[I][o](d).empty();
		var xt = 0;
		st[et][y](function(e) {
			if (xt >= 3) return;
			var n = gamedata.items[tt].weapons[e.guid];
			if (!n) return;
			xt += 1;
			var r = n.image.replace("_american", "").replace("_russian", ""),
				i = $('<div class="statitem weapon">' + h + xt + s + M + '<span class="item-image item weapon _' + r + p + s + v + m + locale.t(n[Y]) + s + O + util[t](e[N]) + " " + locale.t(D).toLowerCase() + s + s + s);
			i.addClick(function() {
				app.go("WeaponDetailViewController", {
					itemStats: e
				})
			}), rt[I][o](d)[w](i)
		}), rt[I][S](i, xt < 1), rt[V][o](d).empty();
		var Tt = 0;
		st[G][y](function(e) {
			if (Tt >= 3) return;
			var n = gamedata.items[tt].vehicles[e.guid];
			if (!n) return;
			Tt += 1;
			var r = $('<div class="statitem vehicle">' + h + Tt + s + M + '<span class="item-image item vehicle _' + n.image + p + s + v + m + locale.t(n[Y]) + s + O + util[t](e[N]) + " " + locale.t(D).toLowerCase() + s + s + s);
			r.addClick(function() {
				app.go("VehicleDetailViewController", {
					itemStats: e
				})
			}), rt[V][o](d)[w](r)
		}), rt[V][S](i, Tt < 1), rt[q][o](d).empty();
		var Nt = 0;
		st[K][y](function(e) {
			if (Nt >= 3) return;
			var t = gamedata.awards.statsLocale.awards[e.unlockId];
			if (!t) return;
			Nt += 1;
			var n = $('<div class="statitem award">' + h + Nt + s + '<div class="image"></div>' + v + m + locale.t(t[Y]) + s + s + s);
			e.group == "AwardGroup_Medals" ? n[o](z)[w]('<span class="item-image medal _' + t.image + p) : e.group == "AwardGroup_Ribbons" && n[o](z)[w]('<span class="item-image ribbon _' + t.image + p), rt[q][o](d)[w](n)
		}), rt[q][S](i, Nt < 1), rt.$progression[a](i), rt[C][o]('.value[data-stat="sc_assault"]')[c](util[t](st[n][W][1])), rt[C][o]('.value[data-stat="sc_engineer"]')[c](util[t](st[n][W][2])), rt[C][o]('.value[data-stat="sc_support"]')[c](util[t](st[n][W][32])), rt[C][o]('.value[data-stat="sc_recon"]')[c](util[t](st[n][W][8])), ["sc_vehicle", "combatScore", "sc_award", "sc_unlock", "totalScore"][y](function(e) {
			rt[C][o](B + e + '"]')[c](util[t](st[n][e]))
		}), rt[C][a](i);
		var Ct = [N, k, "killAssists", "scorePerMinute", "vehiclesDestroyed", "vehiclesDestroyedAssists", "killStreakBonus", "elo", "sc_squad", "repairs", "revives", "heals", "resupplies"];
		return Ct[y](function(e) {
			rt[b][o](B + e + '"]')[c](util[t](st[n][e]))
		}), rt[b][o]('.value[data-stat="kdRatio"]')[c](util[t](st[n][N] / (st[n][k] || 1), L)), rt[b][o]('.value[data-stat="timePlayed"]')[c](util[t](st[n][l], "time")), rt[b][o]('.value[data-stat="quitPercentage"]')[c](util[t](st[n].quitPercentage / 100, nt)), rt[b][o]('.value[data-stat="accuracy"]')[c](util[t](st[n].accuracy / 100, L)), rt[b][o]('.value[data-stat="longestHeadshot"]')[c](util[t](st[n].longestHeadshot, "distance_m")), rt[b][a](i), rt[X] = st, rt[f](), rt[g] = H, e()
	})
};