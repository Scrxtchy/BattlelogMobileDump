var LEADERBOARD_DIVISION_PERCENTILES = [3, 7, 16, 26, 40, 57, 74, 88, 96, 100],
	app = require("app"),
	device = require("device"),
	enums = require("enums"),
	locale = require("locale"),
	presence = require("presence"),
	session = require("session"),
	assets = require("assets"),
	gamedata = {
		battlelog: require("gamedata/battlelog"),
		bf3: {
			expansions: require("gamedata/bf3/expansions"),
			classes: require("gamedata/bf3/classes")
		},
		warsaw: {
			expansions: require("gamedata/warsaw/expansions"),
			classes: require("gamedata/warsaw/classes"),
			ranks: require("gamedata/warsaw/ranks")
		},
		omaha: {
			classes: require("gamedata/omaha/classes")
		}
	},
	NumberFormat = require("lib/numberformat"),
	statNameSID = {
		"damage assists": "ID_WEB_KIT_ITEM_DAMAGE_ASSISTS",
		heals: "ID_WEB_KIT_ITEM_HEALS",
		kills: "ID_WEB_KIT_ITEM_KILLS",
		repairs: "ID_WEB_KIT_ITEM_REPAIRS",
		resupplies: "ID_WEB_KIT_ITEM_RESUPPLIES",
		revives: "ID_WEB_KIT_ITEM_REVIVES",
		spawns: "ID_WEB_KIT_ITEM_SPAWNS",
		shots: "ID_WEB_KIT_ITEM_TIMES_FIRED",
		"throws": "ID_WEB_KIT_ITEM_TIMES_THROWN",
		"spot assists": "ID_WEB_KIT_ITEM_SPOT_ASSISTS"
	},
	dust = require("dust");
dust.helpers.localize = function(e, t, n, r) {
	var i = dust.helpers.tap(r.key, e, t);
	return e.write(locale.t(i))
}, exports.kitEnum_to_kitName = function(e, t, n) {
	t = typeof t == "undefined" ? enums.Game.BF3 : t;
	if (typeof parseInt(t, 10) != "number") throw new Error("Game must be an int");
	return t = enums.Game.toString(t), gamedata[t].classes.kitMap[e] ? gamedata[t].classes.kitMap[e][n ? "nameSID" : "name"] : ""
}, exports.kitEnum_to_kit = function(e, t) {
	t = typeof t == "undefined" ? enums.Game.OMAHA : t;
	if (typeof parseInt(t, 10) != "number") throw new Error("Game must be an int");
	return t = enums.Game.toString(t), gamedata[t].classes.kitMap[e]
}, exports.userpresence_to_status = function(e) {
	var t = "presence",
		n = "offline";
	return !e || !e[t] ? n : e[t].isPlaying ? "playing" : e[t].isOnline ? "online" : n
}, exports.consolepresence_to_status = function(e) {
	var t = "presence",
		n = "offline";
	return !e || !e[t] ? n : e[t].isPlaying ? "playing" : presence.isOnlineGame(e[t]) ? "online" : n
}, exports.gravatar = function(e, t) {
	return t = t || 30, t *= window.devicePixelRatio || 1, "http://www.gravatar.com/avatar/" + e + "?s=" + t + "&d=" + encodeURIComponent("http://battlelog-cdn.battlefield.com/public/base/shared/default-avatar-60.png?v=7910")
}, exports.goToProfileAction = function(e, t) {
	t || (t = function() {}), session.getActiveGame() == enums.Game.BF3 ? app.go("UserViewController", {
		user: e
	}, t) : app.go("ProfileViewController", {
		user: e
	}, t)
}, exports.userPresenceSort = function(e, t) {
	var n = "isPlaying",
		r = "presence",
		i = "isPlayingMp",
		s = "isPlayingCoop",
		o = "isOnline";
	if (e[r][n] && !t[r][n]) return -1;
	if (t[r][n] && !e[r][n]) return 1;
	var u = presence[i](e[r]) || presence[s](e[r]),
		a = presence[i](t[r]) || presence[s](t[r]);
	return u && !a ? -1 : a && !u ? 1 : e[r][o] && !t[r][o] ? -1 : t[r][o] && !e[r][o] ? 1 : exports.userNameSort(e, t)
}, exports.userNameSort = function(e, t) {
	var n = "toLowerCase",
		r = "username";
	return e[r][n]() > t[r][n]() ? 1 : t[r][n]() > e[r][n]() ? -1 : 0
}, exports.isGameActive = function(e) {
	return gamedata.battlelog.supportedGames.indexOf(e) !== -1
}, exports.hasExpansion = function(e, t, n) {
	var r = "expansions",
		i = "GameExpansion",
		s = !0;
	if (!e) return !1;
	if (gamedata.bf3[r].premiumExpansions.indexOf(t) !== -1 && exports.hasExpansion(e, enums[i].BF3PREMIUM, n)) return s;
	var o = !1;
	return e.forEach(function(e) {
		if (e.expansion == t) {
			if (!n || e.platform == n) o = s
		} else e.expansion == enums[i].BF4PREMIUM && gamedata.warsaw[r].expansionMap[t] && (o = s)
	}), o
}, exports.formatStatValue = function(e, t) {
	var n = "setPlaces",
		r = "toFormatted";
	e || (e = 0);
	var i;
	return t ? t == "float" ? (i = new NumberFormat(e), i[n](2), e = i[r]()) : t == "cash" ? (i = new NumberFormat(e), i[n](0), e = "$" + i[r]()) : t == "percent" ? (i = new NumberFormat(e * 100), i[n](1), e = i[r]() + "%") : t == "distance" ? (i = new NumberFormat(e / 1e3), i[n](1), e = i[r]() + " km") : t == "distance_m" ? (i = new NumberFormat(e), i[n](0), e = i[r]() + " m") : t == "time" && (e = exports.friendlyDuration(e)) : (i = new NumberFormat(e), i[n](0), e = i[r]()), e
}, exports.formatDate = function(e, t) {
	var n = "replace",
		r = "toString",
		i = "padL",
		s = "0",
		o = "indexOf";
	t ? t = locale.dateFormats[t] || t : t = "Y-m-d H:i:s";
	var u = e.getFullYear();
	t = t[n]("Y", u[r]()), t = t[n]("y", u[r]().substr(2, 2));
	var a = e.getMonth() + 1;
	t = t[n]("m", a[r]()[i](2, s)), t = t[n]("d", e.getDate()[r]()[i](2, s));
	var f = e.getHours();
	f > 11 ? t = t[n]("A", "PM") : t = t[n]("A", "AM");
	var l = f;
	f > 12 ? l -= 12 : f === 0 && (l = 12), t[o]("g") > -1 && (t = t[n]("g", l[r]())), t[o]("G") > -1 && (t = t[n]("G", f[r]())), t[o]("h") > -1 && (t = t[n]("h", l[r]()[i](2, s))), t[o]("H") > -1 && (t = t[n]("H", f[r]()[i](2, s))), t[o]("i") > -1 && (t = t[n]("i", e.getMinutes()[r]()[i](2, s))), t[o]("s") > -1 && (t = t[n]("s", e.getSeconds()[r]()[i](2, s)));
	var c = ["ID_WEB_MONTH_JAN", "ID_WEB_MONTH_FEB", "ID_WEB_MONTH_MAR", "ID_WEB_MONTH_APR", "ID_WEB_MONTH_MAY", "ID_WEB_MONTH_JUN", "ID_WEB_MONTH_JUL", "ID_WEB_MONTH_AUG", "ID_WEB_MONTH_SEP", "ID_WEB_MONTH_OCT", "ID_WEB_MONTH_NOV", "ID_WEB_MONTH_DEC"];
	return t = t[n]("F", locale.t(c[e.getMonth()])), t
}, exports.friendlyDate = function(e) {
	var t = "ID_WEB_TIME_AGO_WEEK",
		n = "day",
		r = "hour",
		i = "ID_WEB_TIME_JUST_NOW",
		s = Date.now() - e,
		o = [{
			id: "year",
			duration: 31570559999.999992,
			singular: "ID_WEB_TIME_AGO_YEAR",
			plural: "ID_WEB_TIME_AGO_YEARS"
		}, {
			id: "month",
			duration: 263088e4,
			singular: "ID_WEB_TIME_AGO_MONTH",
			plural: "ID_WEB_TIME_AGO_MONTHS"
		}, {
			id: "week",
			duration: 6048e5,
			singular: t,
			plural: "ID_WEB_TIME_AGO_WEEKS"
		}, {
			id: n,
			duration: 864e5,
			singular: "ID_WEB_TIME_AGO_DAY",
			plural: "ID_WEB_TIME_AGO_DAYS"
		}, {
			id: r,
			duration: 36e5,
			singular: "ID_WEB_TIME_AGO_HOUR",
			plural: "ID_WEB_TIME_AGO_HOURS"
		}, {
			id: "minute",
			duration: 6e4,
			singular: "ID_WEB_TIME_AGO_MINUTE",
			plural: "ID_WEB_TIME_AGO_MINUTES"
		}];
	for (var u = 0; u < o.length; u++) {
		var a = o[u],
			f = Math.floor(s / a.duration);
		if (!f) continue;
		if (f < 0) return locale.t(i);
		if (a.id == r || a.id == n) f = Math.ceil(s / a.duration);
		return a.id == n && f == 7 ? locale.t(t, [1]) : f == 1 ? locale.t(a.singular, [f]) : locale.t(a.plural, [f])
	}
	return locale.t(i)
}, exports.friendlyTimestamp = function(e) {
	return exports.friendlyDate(new Date(e * 1e3))
}, exports.pad = function(e, t, n) {
	return n = n || "0", e += "", e.length >= t ? e : (new Array(t - e.length + 1)).join(n) + e
}, exports.friendlyDuration = function(e, t, n) {
	var r = "",
		i = "",
		s = "";
	e = Math.round(e), e > 0 && (s = e % 60 + (t ? "" : "s")), e -= e % 60, e >= 60 && (i = e / 60 % 60 + (t ? "" : "m")), e -= e % 3600, e / 60 >= 60 && (r = e / 60 / 60 + (t ? "" : "h"));
	var o = " ",
		u = s,
		a = i,
		f = r;
	return t && (o = ":", u = exports.pad(s, 2, 0), a = exports.pad(i, 2, 0), t = exports.pad(r, 2, 0)), r ? n ? f + o + a + o + u : f + o + a : i ? a + o + u : s ? t ? "00:" + u : u : t ? "00:00" : "0s"
}, exports.getAppVersionString = function() {
	var e = "bundleVersion",
		t = "appInfo",
		n = "bundleShortVersionString",
		r = "getContentUpdateVersion",
		i = "";
	return device[t][e] && device[t][n] ? i = device[t][n] + " (" + device[t][e] + ")" : i = app.version, session[r]() != "" && (i += " # CL " + session[r]()), i
}, exports.getLockInfo = function(e, t) {
	var n = !1,
		r = "completed",
		i = n,
		s = t.bucket[e] || n,
		o = t.award[e] || n,
		u = t.license[e] || n;
	if (u) {
		i = u;
		if (i[r]) return i
	}
	if (o) {
		i = o;
		if (i[r]) return i
	}
	if (s) {
		i = s;
		if (i[r]) return i
	}
	return i
}, exports.licenseNiceText = function(e) {
	e = e.toLowerCase();
	var t = "Requires license " + e;
	return e == "dice" ? t = locale.t("ID_WEB_COMMON_LICENSE_DICE") : e == "veteran" ? t = locale.t("ID_WEB_COMMON_LICENSE_VETERAN") : e == "premium" ? t = locale.t("ID_WEB_COMMON_LICENSE_PREMIUM") : e.indexOf("pack") != -1 ? t = "Shortcut" : t = locale.t("ID_WEB_LOADOUT_UNLOCKED_BATTLEPACK"), t
}, exports.unlockedByTextCriteria = function(e, t, n, r) {
	var i = !1,
		s = "license",
		o = "award",
		u = "formatStatValue",
		a = " ",
		f = " / ",
		l = "awardGroup",
		c = "ID_WEB_COMMON_SCORE_COMPLETE_ASSIGNMENT",
		h = "ID_WEB_COMMON_SCORE_KILLS",
		p = "ID_WEB_COMMON_VEHICLESSTEALTHJET",
		d = this,
		v = i;
	if (e) {
		var m = e.codeNeeded,
			g = e.valueNeeded,
			y = e.actualValue || 0,
			b = e.unlockType,
			w = e[s],
			E = e[o],
			S = i;
		t = t || i, n = n || i;
		var x = this[u](g),
			T = this[u](y);
		if (b == s) return v = d.licenseNiceText(w), n ? ["", v] : v;
		if (b == "rank") return v = locale.t("ID_WEB_COMMON_SCORE_REACH_RANK") + a + x, n && (g = gamedata[enums.Game.toString(session.getActiveGame())].ranks[g].pointsNeeded, y = session.userScore, x = this[u](g), T = this[u](y), N = v, y < g ? v = [T + f + x, N] : v = [x + f + x, N]), v;
		if (b == o && E[l] && E[l] == "AwardGroup_Mission") {
			var v = [];
			return v[0] = locale.t(E.stringID), v[1] = locale.t(c), v
		}
		var N = locale.t("ID_WEB_COMMON_SCORE_SCORE");
		b == "weapon" || b == "accessory" ? N = r ? locale.t(r) + a + locale.t(h) : locale.t(h) : b == o && (N = locale.t(c));
		var C = {
				sc_assault: "ID_WEB_COMMON_CLASS_ASSAULT",
				sc_commander: "ID_WEB_COMMON_CLASS_COMMANDER",
				sc_conquest: "ID_WEB_COMMON_GAMEMODE_1",
				sc_rush: "ID_WEB_COMMON_GAMEMODE_2",
				sc_deathmatch: "ID_WEB_COMMON_GAMEMODE_DM",
				sc_domination: "ID_WEB_WARSAW_GAMEMODE_1024",
				sc_elimination: "ID_WEB_COMMON_GAMEMODE_16777216",
				sc_obliteration: "ID_WEB_COMMON_GAMEMODE_2097152",
				sc_engineer: "ID_WEB_COMMON_CLASS_ENGINEER",
				sc_support: "ID_WEB_COMMON_CLASS_SUPPORT",
				sc_recon: "ID_WEB_COMMON_CLASS_RECON",
				sc_coop: "ID_WEB_COMMON_COOP",
				sc_assaultrifles: "ID_WEB_COMMON_ASSAULT_RIFLES",
				sc_shotguns: "ID_WEB_COMMON_SHOTGUNS",
				sc_handguns: "ID_WEB_COMMON_HANDGUNS",
				sc_pdws: "ID_WEB_COMMON_PDWS",
				sc_carbines: "ID_WEB_COMMON_CARBINES",
				sc_dmrs: "ID_WEB_COMMON_DMRS",
				sc_handgrenades: "ID_WEB_COMMON_GRENADES",
				sc_lmgs: "ID_WEB_COMMON_LMGS",
				sc_sniperrifles: "ID_WEB_COMMON_SNIPER_RIFLES",
				sc_vehicleaa: "ID_WEB_COMMON_VEHICLEAA",
				sc_vehicleaboat: "ID_WEB_COMMON_VEHICLEABOAT",
				sc_vehicleah: "ID_WEB_COMMON_VEHICLEAH",
				sc_vehicleajet: "ID_WEB_COMMON_VEHICLEAJET",
				sc_vehicleifv: "ID_WEB_COMMON_VEHICLEIFV",
				sc_vehiclembt: "ID_WEB_COMMON_VEHICLEMBT",
				sc_vehiclesh: "ID_WEB_COMMON_VEHICLESHS",
				sc_vehiclesstealthjet: p,
				sc_vehiclesjet: p
			},
			k = "",
			L = C[m] || i;
		L ? k = L : typeof t == "string" && (k = t), k && (k = locale.t(k));
		var A = locale.t("ID_WEB_STATS_CRITERIATEXT_ITEM_UNIT"),
			O = A.replace("[ITEM]", k).replace("[UNIT]", N);
		v = "", n ? (v = [g, N], y < g ? v = [T + f + x, O] : v = [x + f + x, O]) : S ? v = x + a + O : y < g ? v = T + f + x + a + O : v = x + f + x + a + O
	}
	return v
}, exports.percentileToDivision = function(e) {
	for (var t = 0; t < LEADERBOARD_DIVISION_PERCENTILES.length; t++)
		if (e <= LEADERBOARD_DIVISION_PERCENTILES[t]) return t + 1;
	return 10
}, exports.getTranslatedExpansionById = function(e) {
	var t = {
		524288: locale.t("ID_WEB_COMMON_GAME_EXPANSION_BF4XP0SA"),
		1048576: locale.t("ID_WEB_COMMON_GAME_EXPANSION_BF4XP1CR"),
		2097152: locale.t("ID_WEB_COMMON_GAME_EXPANSION_BF4XP2NS"),
		4194304: locale.t("ID_WEB_COMMON_GAME_EXPANSION_BF4XP3DT"),
		8388608: locale.t("ID_WEB_COMMON_GAME_EXPANSION_BF4XP4FS")
	};
	return t[e] || locale.t("ID_WEB_COMMON_UNKNOWN")
}, exports.getBFHGameModeSID = function(e) {
	var t = {
		0: "ID_WEB_COMMON_GAMEMODE_0",
		32: "ID_WEB_COMMON_GAMEMODE_32",
		268435456: "ID_WEB_OMAHA_GAMEMODE_268435456",
		536870912: "ID_WEB_OMAHA_GAMEMODE_536870912",
		1073741824: "ID_WEB_OMAHA_GAMEMODE_134217728",
		2147483648: "ID_WEB_OMAHA_GAMEMODE_33554432",
		4294967296: "ID_WEB_OMAHA_GAMEMODE_67108864",
		8589934592: "ID_WEB_OMAHA_GAMEMODE_1073741824",
		17179869184: "ID_WEB_OMAHA_GAMEMODE_2147483648"
	};
	return t[e] || "ID_WEB_COMMON_UNKNOWN"
}, exports.getScoreTypeLocales = function(e) {
	var t = "GameMode",
		n = "push",
		r = "ID_WEB_BATTLEREPORT_TEAM_SCORE_OBJECTIVES",
		i = "ID_WEB_BATTLEREPORT_TEAM_SCORE_TICKETS",
		s = [];
	switch (parseInt(e)) {
		case enums[t].OBLITERATION:
			s[n](r);
			break;
		case enums[t].HEIST:
			s[n](i), s[n]("ID_WEB_BATTLEREPORT_TEAM_SCORE_LOOT_BAGS");
			break;
		case enums[t].BLOODMONEY:
			s[n]("ID_WEB_BATTLEREPORT_TEAM_SCORE_CASH");
			break;
		case enums[t].HOSTAGE:
			s[n]("ID_WEB_BATTLEREPORT_TEAM_SCORE_HOSTAGES_RESCUED");
			break;
		case enums[t].RUSH:
			s[n](null), s[n]("ID_WEB_BATTLEREPORT_TEAM_SCORE_TICKETS_REDUCED");
			break;
		case enums[t].ELIMINATION:
			s[n]("ID_WEB_BATTLEREPORT_TEAM_SCORE_ROUNDS");
			break;
		case enums[t].SQDM:
		case enums[t].TEAMDEATHMATCH:
			s[n]("ID_WEB_BATTLEREPORT_TEAM_SCORE_KILLS");
			break;
		case enums[t].CAPTURETHEFLAG:
			s[n]("ID_WEB_BATTLEREPORT_TEAM_SCORE_FLAGS_CAPTURED");
			break;
		case enums[t].CARRIERASSAULT:
		case enums[t].CARRIERASSAULTLARGE:
		case enums[t].CARRIERASSAULTSMALL:
			s[n]("ID_WEB_BATTLEREPORT_CARRIER_HEALTH"), s[n](r);
			break;
		default:
			s[n](i)
	}
	return s
}, exports.getTranslatedExpansionByName = function(e) {
	var t = {
		xp0: locale.t("ID_WEB_COMMON_GAME_EXPANSION_BF4XP0SA"),
		xp1: locale.t("ID_WEB_COMMON_GAME_EXPANSION_BF4XP1CR"),
		xp2: locale.t("ID_WEB_COMMON_GAME_EXPANSION_BF4XP2NS"),
		xp3: locale.t("ID_WEB_COMMON_GAME_EXPANSION_BF4XP3DT"),
		xp4: locale.t("ID_WEB_COMMON_GAME_EXPANSION_BF4XP4FS")
	};
	return t[e] || "-"
};
var soldierImages = {
	small: {
		"ch-assault-oceanicgreen": "3765739d",
		"ch-assault-urbanairborne": "df263268",
		"ch-engineer-oceanicgreen": "b1e44370",
		"ch-engineer-urbanairborne": "494accfe",
		"ch-engineer": "3436492c",
		"ch-recon-oceanicgreen": "947473bb",
		"ch-recon-urbanairborne": "66acb0c8",
		"ch-recon": "a4dd8b0f",
		"ch-support-oceanicgreen": "72358117",
		"ch-support-urbanairborne": "8e09e180",
		"ch-support": "037fbe62",
		"default": "07963e65",
		"ru-assault-berezka": "8be43f7d",
		"ru-assault-partizan": "86cece93",
		"ru-assault": "c5c8533e",
		"ru-engineer-berezka": "3f0a7610",
		"ru-engineer-partizan": "83b80332",
		"ru-engineer": "b7bf150a",
		"ru-recon-berezka": "04fa4270",
		"ru-recon-partizan": "2aedd0ad",
		"ru-recon": "9a823059",
		"ru-support-berezka": "ca8a90ad",
		"ru-support-partizan": "62eb3eac",
		"ru-support": "62774f1f",
		"soldier1-p": "6bd5426c",
		"sp-dima": "3c199650",
		"sp-hanna": "67cb4d8b",
		"sp-irish": "5b36e783",
		"sp-pac": "23a91431",
		"us-assault-chocchip": "bda7dd62",
		"us-assault-ucp": "a8771272",
		"us-assault": "eeef7ac7",
		"us-engineer-chocchip": "d34417d5",
		"us-engineer-ucp": "6ab2031b",
		"us-engineer": "cbcc98ec",
		"us-recon-chocchip": "81a98e0d",
		"us-recon-ucp": "4f2291a6",
		"us-recon": "85a31b58",
		"us-support-chocchip": "98eeb63e",
		"us-support-ucp": "a80b5f0e",
		"us-support": "acbdca6d",
		ch_water: "e678d306",
		ru_jet: "7908ee67",
		us_heli: "b17df714",
		us_land: "bd1a5da0",
		Premium_CH_Heli_01: "1aecd962",
		Premium_RU_Jeep_01: "bbff766b",
		Premium_US_Truck_01: "dfafa4b2",
		Premium_RU_Jet_01: "029f20c0",
		CH_Land_02: "e55bb7ae",
		RU_Tank_01: "179eb00e",
		US_Jet_01: "109cbcea",
		US_Tank_02: "b2381fef",
		Premium_CH_Heli_02: "457b071f",
		Premium_RU_Heli_02: "8eadc37b",
		Premium_RU_Tank_01: "4a857d0f",
		Premium_US_Truck_02: "d84f1482",
		Premium_CH_Jet_01: "0603b2d2",
		Premium_RU_Heli_01: "ef6365f2",
		Premium_RU_Tank_02: "4663b6a6",
		Premium_US_Jet_01: "2842569d",
		Premium_CH_Jet_02: "8286ddc6",
		Premium_CH_Land_01: "a412fde5",
		Premium_US_Truck_03: "fc7d53d9",
		Premium_US_Water_02: "4481b551"
	},
	medium: {
		"ch-assault-oceanicgreen": "dccd1d1f",
		"ch-assault-urbanairborne": "6c8a7003",
		"ch-engineer-oceanicgreen": "1105b1cd",
		"ch-engineer-urbanairborne": "a64dcbc0",
		"ch-engineer": "546c80da",
		"ch-recon-oceanicgreen": "3741386b",
		"ch-recon-urbanairborne": "84d9266f",
		"ch-recon": "31987a94",
		"ch-support-oceanicgreen": "855e8351",
		"ch-support-urbanairborne": "6eb3b8c3",
		"ch-support": "4265a44f",
		"default": "075ce49b",
		"ru-assault-berezka": "358a63c1",
		"ru-assault-partizan": "393f1b2f",
		"ru-assault": "01b5d6b2",
		"ru-engineer-berezka": "a3cb1d4e",
		"ru-engineer-partizan": "70213167",
		"ru-engineer": "5713291a",
		"ru-recon-berezka": "3101e027",
		"ru-recon-partizan": "6a76dba4",
		"ru-recon": "4907e3c1",
		"ru-support-berezka": "82839a60",
		"ru-support-partizan": "b4e36247",
		"ru-support": "b73d682a",
		soldier2: "569a3119",
		"sp-dima": "0b67194e",
		"sp-hanna": "2ad1f42d",
		"sp-irish": "8f4344de",
		"sp-pac": "0d625c0d",
		"us-assault-chocchip": "4a32e613",
		"us-assault-ucp": "cf75498a",
		"us-assault": "3691b32b",
		"us-engineer-chocchip": "6a4735cb",
		"us-engineer-ucp": "3147b7b9",
		"us-engineer": "608e501f",
		"us-recon-chocchip": "90d98d4c",
		"us-recon-ucp": "aef8d379",
		"us-recon": "766a5730",
		"us-support-chocchip": "786b55c8",
		"us-support-ucp": "36d6acb0",
		"us-support": "3d572f99",
		ch_water: "722ad758",
		ru_jet: "30cced04",
		us_heli: "754089ad",
		us_land: "e89015b2",
		Premium_CH_Heli_01: "401384d6",
		Premium_RU_Jeep_01: "35b738db",
		Premium_US_Truck_01: "3663c747",
		Premium_RU_Jet_01: "31c13bd1",
		CH_Land_02: "0a637949",
		RU_Tank_01: "e89d22c5",
		US_Jet_01: "8575e6e6",
		US_Tank_02: "ae689a64",
		Premium_CH_Heli_02: "983b3290",
		Premium_RU_Heli_02: "2289c14f",
		Premium_RU_Tank_01: "9ce93086",
		Premium_US_Truck_02: "addffb92",
		Premium_CH_Jet_01: "023a75e0",
		Premium_RU_Heli_01: "c9ee0309",
		Premium_RU_Tank_02: "6d058877",
		Premium_US_Jet_01: "24fc1a43",
		Premium_CH_Jet_02: "85ab8757",
		Premium_CH_Land_01: "d68d5b61",
		Premium_US_Truck_03: "af5fa776",
		Premium_US_Water_02: "5cf0db49"
	},
	large: {
		"ch-assault-oceanicgreen": "425698c4",
		"ch-assault-urbanairborne": "0dff3c96",
		"ch-engineer-oceanicgreen": "37de9aaf",
		"ch-engineer-urbanairborne": "c540a52b",
		"ch-engineer": "b565b8e7",
		"ch-recon-oceanicgreen": "f3e4ebdc",
		"ch-recon-urbanairborne": "8a8e6b10",
		"ch-recon": "a7985a0d",
		"ch-support-oceanicgreen": "6261d8bf",
		"ch-support-urbanairborne": "d8680048",
		"ch-support": "09b71be6",
		"default": "1066f14a",
		"ru-assault-berezka": "94750733",
		"ru-assault-partizan": "d0429b0f",
		"ru-assault": "ec78fba8",
		"ru-engineer-berezka": "913ee118",
		"ru-engineer-partizan": "9a77105a",
		"ru-engineer": "3fe89f2f",
		"ru-recon-berezka": "f06fc599",
		"ru-recon-partizan": "b756961c",
		"ru-recon": "e71bed12",
		"ru-support-berezka": "a6b586dd",
		"ru-support-partizan": "fa4bc7c0",
		"ru-support": "b262a936",
		soldier2: "d20536ef",
		"sp-dima": "5cd42d40",
		"sp-hanna": "b13d5204",
		"sp-irish": "ff5ad7c5",
		"sp-pac": "3632f96f",
		"us-assault-chocchip": "cecb5bc4",
		"us-assault-ucp": "5343cb62",
		"us-assault": "c09af291",
		"us-engineer-chocchip": "29c69984",
		"us-engineer-ucp": "95ab2a0d",
		"us-engineer": "463580b4",
		"us-recon-chocchip": "c27d3508",
		"us-recon-ucp": "02f828f4",
		"us-recon": "eccec0dd",
		"us-support-chocchip": "7bba2239",
		"us-support-ucp": "3b2bdc32",
		"us-support": "a06ca4bd",
		ch_water: "3bec7e65",
		ru_jet: "ea7e766a",
		us_heli: "e3ea401a",
		us_land: "c62dc0e8",
		Premium_CH_Heli_01: "77143c4b",
		Premium_RU_Jeep_01: "c9577753",
		Premium_US_Truck_01: "baeeaa07",
		Premium_RU_Jet_01: "2e169bff",
		CH_Land_02: "26158a18",
		RU_Tank_01: "4dd2406b",
		US_Jet_01: "588cdf47",
		US_Tank_02: "aa7f18c0",
		Premium_CH_Heli_02: "0cea3a07",
		Premium_RU_Heli_02: "679fba3a",
		Premium_RU_Tank_01: "2d02d91e",
		Premium_US_Truck_02: "ca9dc2d1",
		Premium_CH_Jet_01: "c4367b6b",
		Premium_RU_Heli_01: "1811748d",
		Premium_RU_Tank_02: "7f168362",
		Premium_US_Jet_01: "31f46b40",
		Premium_CH_Jet_02: "13f04e77",
		Premium_CH_Land_01: "6e30504d",
		Premium_US_Truck_03: "5c549521",
		Premium_US_Water_02: "e5d700b0"
	},
	xlarge: {
		"ch-assault-oceanicgreen": "5e1e7e70",
		"ch-assault-urbanairborne": "7618b837",
		"ch-engineer-oceanicgreen": "1896f877",
		"ch-engineer-urbanairborne": "56886ffd",
		"ch-engineer": "31b3446f",
		"ch-recon-oceanicgreen": "d63dfe08",
		"ch-recon-urbanairborne": "ca986bef",
		"ch-recon": "1a7d01af",
		"ch-support-oceanicgreen": "67866476",
		"ch-support-urbanairborne": "b93029ab",
		"ch-support": "69d11d4b",
		"default": "a105f57e",
		"ru-assault-berezka": "fb296cef",
		"ru-assault-partizan": "4cffb644",
		"ru-assault": "09fc0114",
		"ru-engineer-berezka": "ba7ea9ff",
		"ru-engineer-partizan": "4b832c43",
		"ru-engineer": "bd850b17",
		"ru-recon-berezka": "9cc6faed",
		"ru-recon-partizan": "b2557765",
		"ru-recon": "1717a10c",
		"ru-support-berezka": "128d8a51",
		"ru-support-partizan": "a511d19e",
		"ru-support": "0341dad3",
		soldier2: "76a56031",
		"sp-dima": "5b162f8e",
		"sp-hanna": "aff50215",
		"sp-irish": "7a4fa504",
		"sp-pac": "c2b23e14",
		"us-assault-chocchip": "d8aa79ba",
		"us-assault-ucp": "1e372ff6",
		"us-assault": "b87a4e87",
		"us-engineer-chocchip": "c218270f",
		"us-engineer-ucp": "b3d1c056",
		"us-engineer": "cbf85f1e",
		"us-recon-chocchip": "73057555",
		"us-recon-ucp": "1e5a2c5a",
		"us-recon": "3e2da452",
		"us-support-chocchip": "5e8fffd8",
		"us-support-ucp": "06985670",
		"us-support": "782f8f1d",
		ru_jet: "7a587d9f",
		us_heli: "8b05904e",
		us_land: "43834d09",
		ch_water: "4322321d",
		Premium_CH_Heli_01: "df422380",
		Premium_RU_Jeep_01: "b76cc997",
		Premium_US_Truck_01: "46cfaa54",
		Premium_RU_Jet_01: "3d1164e5",
		CH_Land_02: "d57918b6",
		RU_Tank_01: "97bdc70e",
		US_Jet_01: "3fc3f89a",
		US_Tank_02: "573e6e9e",
		Premium_CH_Heli_02: "3df996fd",
		Premium_RU_Heli_02: "6de80bac",
		Premium_RU_Tank_01: "97402202",
		Premium_US_Truck_02: "517e26fc",
		Premium_CH_Jet_01: "cd801858",
		Premium_RU_Heli_01: "b875c616",
		Premium_RU_Tank_02: "86376946",
		Premium_US_Jet_01: "3fc3f89a",
		Premium_CH_Jet_02: "d0b101ec",
		Premium_CH_Land_01: "c8cedd8a",
		Premium_US_Truck_03: "2407e8d4",
		Premium_US_Water_02: "c7272f86"
	}
};
exports.getSoldierImageUrl = function(e, t, n) {
	if (e == enums.Game.WARSAW) return exports.getBf4SoldierImageUrl(t, n);
	if (e == enums.Game.OMAHA) return exports.getOmahaSoldierImageUrl(t, n)
}, exports.getBf4SoldierImageUrl = function(e, t) {
	if (!t || !soldierImages[e][t]) t = "default";
	var n = soldierImages[e][t];
	return "http://d34ymitoc1pg7m.cloudfront.net/bf4/soldier/" + e + "/" + t + "-" + n + ".png"
}, exports.getOmahaSoldierImageUrl = function(e, t) {
	e || (e = "large");
	var n = t || "char",
		r = {
			small: {
				COP_Enforcer: "COP_Enforcer-e1d614ed.png",
				COP_Mastermind: "COP_Mastermind-9729b185.png",
				COP_Professional: "COP_Professional-1e8393d8.png",
				COP_Technician: "COP_Technician-930ed12c.png",
				CRIM_PRO_Enforcer: "CRIM_PRO_Enforcer-6bcf549a.png",
				CRIM_PRO_Mechanic: "CRIM_PRO_Mechanic-2567bdbf.png",
				CRIM_PRO_Operator: "CRIM_PRO_Operator-60909fe8.png",
				CRIM_PRO_Professional: "CRIM_PRO_Professional-a8fd5012.png",
				CRIM_STREET_Enforcer: "CRIM_STREET_Enforcer-85a7cc9c.png",
				CRIM_STREET_Mechanic: "CRIM_STREET_Mechanic-20e375e9.png",
				CRIM_STREET_Operator: "CRIM_STREET_Operator-b06352a6.png",
				CRIM_STREET_Professional: "CRIM_STREET_Professional-f60a9f2a.png",
				SWAT_Enforcer: "SWAT_Enforcer-2d853b06.png",
				SWAT_Operator: "SWAT_Operator-0a40603a.png",
				SWAT_Professional: "SWAT_Professional-3a7c1a02.png",
				SWAT_Technician: "SWAT_Technician-dfdc4ef4.png"
			},
			medium: {
				COP_Enforcer: "COP_Enforcer-443f1341.png",
				COP_Enforcer_Flair: "COP_Enforcer_Flair-654fe73a.png",
				COP_Enforcer_Stealth: "COP_Enforcer_Stealth-8e855d1d.png",
				COP_Enforcer_TeamPride: "COP_Enforcer_TeamPride-07e00210.png",
				COP_Mastermind: "COP_Mastermind-bb2c6f94.png",
				COP_Mastermind_Flair: "COP_Mastermind_Flair-dc40367c.png",
				COP_Mastermind_Stealth: "COP_Mastermind_Stealth-57d1a17d.png",
				COP_Mastermind_TeamPride: "COP_Mastermind_TeamPride-07021640.png",
				COP_Professional: "COP_Professional-908755ee.png",
				COP_Professional_Flair: "COP_Professional_Flair-dd3669bd.png",
				COP_Professional_Stealth: "COP_Professional_Stealth-db14ff28.png",
				COP_Professional_TeamPride: "COP_Professional_TeamPride-5e1065b2.png",
				COP_Technician: "COP_Technician-f379efb8.png",
				COP_Technician_Flair: "COP_Technician_Flair-aa077e23.png",
				COP_Technician_Stealth: "COP_Technician_Stealth-58cc1354.png",
				COP_Technician_TeamPride: "COP_Technician_TeamPride-3c575b4c.png",
				CRIM_PRO_Enforcer: "CRIM_PRO_Enforcer-36bceb32.png",
				CRIM_PRO_Enforcer_Flair: "CRIM_PRO_Enforcer_Flair-1c34eefc.png",
				CRIM_PRO_Enforcer_Stealth: "CRIM_PRO_Enforcer_Stealth-038570ec.png",
				CRIM_PRO_Enforcer_TeamPride: "CRIM_PRO_Enforcer_TeamPride-c79314c2.png",
				CRIM_PRO_Mechanic: "CRIM_PRO_Mechanic-61a1b56a.png",
				CRIM_PRO_Mechanic_Flair: "CRIM_PRO_Mechanic_Flair-820fb649.png",
				CRIM_PRO_Mechanic_Stealth: "CRIM_PRO_Mechanic_Stealth-9f73ca35.png",
				CRIM_PRO_Mechanic_TeamPride: "CRIM_PRO_Mechanic_TeamPride-9555f72c.png",
				CRIM_PRO_Operator: "CRIM_PRO_Operator-eafec43e.png",
				CRIM_PRO_Operator_Flair: "CRIM_PRO_Operator_Flair-aa865c47.png",
				CRIM_PRO_Operator_Stealth: "CRIM_PRO_Operator_Stealth-42bad04e.png",
				CRIM_PRO_Operator_TeamPride: "CRIM_PRO_Operator_TeamPride-9dcec22f.png",
				CRIM_PRO_Professional: "CRIM_PRO_Professional-941cd6b2.png",
				CRIM_PRO_Professional_Flair: "CRIM_PRO_Professional_Flair-329f0059.png",
				CRIM_PRO_Professional_Stealth: "CRIM_PRO_Professional_Stealth-973dbe78.png",
				CRIM_PRO_Professional_TeamPride: "CRIM_PRO_Professional_TeamPride-401e0ac3.png",
				CRIM_STREET_Enforcer: "CRIM_STREET_Enforcer-a6e0bde0.png",
				CRIM_STREET_Enforcer_Flair: "CRIM_STREET_Enforcer_Flair-6e9d0f18.png",
				CRIM_STREET_Enforcer_Stealth: "CRIM_STREET_Enforcer_Stealth-ee78d36c.png",
				CRIM_STREET_Enforcer_TeamPride: "CRIM_STREET_Enforcer_TeamPride-d37a39cf.png",
				CRIM_STREET_Mechanic: "CRIM_STREET_Mechanic-3a249d05.png",
				CRIM_STREET_Mechanic_Flair: "CRIM_STREET_Mechanic_Flair-078d0724.png",
				CRIM_STREET_Mechanic_Stealth: "CRIM_STREET_Mechanic_Stealth-221fa7fc.png",
				CRIM_STREET_Mechanic_TeamPride: "CRIM_STREET_Mechanic_TeamPride-c1829ec2.png",
				CRIM_STREET_Operator: "CRIM_STREET_Operator-04c711a4.png",
				CRIM_STREET_Operator_Flair: "CRIM_STREET_Operator_Flair-b5a449a1.png",
				CRIM_STREET_Operator_Stealth: "CRIM_STREET_Operator_Stealth-c7e4a7ba.png",
				CRIM_STREET_Operator_TeamPride: "CRIM_STREET_Operator_TeamPride-51d1ce4a.png",
				CRIM_STREET_Professional: "CRIM_STREET_Professional-d058fa16.png",
				CRIM_STREET_Professional_Flair: "CRIM_STREET_Professional_Flair-a796a210.png",
				CRIM_STREET_Professional_Stealth: "CRIM_STREET_Professional_Stealth-9d3ca9d4.png",
				CRIM_STREET_Professional_TeamPride: "CRIM_STREET_Professional_TeamPride-03f48fcb.png",
				SWAT_Enforcer: "SWAT_Enforcer-097eeb30.png",
				SWAT_Enforcer_Flair: "SWAT_Enforcer_Flair-9eb7907d.png",
				SWAT_Enforcer_Stealth: "SWAT_Enforcer_Stealth-7312c2f2.png",
				SWAT_Enforcer_TeamPride: "SWAT_Enforcer_TeamPride-0967faf2.png",
				SWAT_Operator: "SWAT_Operator-4ea548de.png",
				SWAT_Operator_Flair: "SWAT_Operator_Flair-af82aa7c.png",
				SWAT_Operator_Stealth: "SWAT_Operator_Stealth-1bd20449.png",
				SWAT_Operator_TeamPride: "SWAT_Operator_TeamPride-1991f6fa.png",
				SWAT_Professional: "SWAT_Professional-f8006e21.png",
				SWAT_Professional_Flair: "SWAT_Professional_Flair-31646c44.png",
				SWAT_Professional_Stealth: "SWAT_Professional_Stealth-a4591664.png",
				SWAT_Professional_TeamPride: "SWAT_Professional_TeamPride-d4410e86.png",
				SWAT_Technician: "SWAT_Technician-719dea2b.png",
				SWAT_Technician_Flair: "SWAT_Technician_Flair-191b584d.png",
				SWAT_Technician_Stealth: "SWAT_Technician_Stealth-d65087ee.png",
				SWAT_Technician_TeamPride: "SWAT_Technician_TeamPride-83a388a6.png"
			},
			large: {
				COP_Enforcer: "COP_Enforcer-c41805ab.png",
				COP_Enforcer_Flair: "COP_Enforcer_Flair-1a06c37d.png",
				COP_Enforcer_Stealth: "COP_Enforcer_Stealth-d678be1b.png",
				COP_Enforcer_TeamPride: "COP_Enforcer_TeamPride-48511dcd.png",
				COP_Mastermind: "COP_Mastermind-b1c1e20b.png",
				COP_Mastermind_Flair: "COP_Mastermind_Flair-95012c54.png",
				COP_Mastermind_Stealth: "COP_Mastermind_Stealth-72cb1290.png",
				COP_Mastermind_TeamPride: "COP_Mastermind_TeamPride-1837efac.png",
				COP_Professional: "COP_Professional-63c72ccf.png",
				COP_Professional_Flair: "COP_Professional_Flair-2df1f70a.png",
				COP_Professional_Stealth: "COP_Professional_Stealth-fea73655.png",
				COP_Professional_TeamPride: "COP_Professional_TeamPride-b91706f2.png",
				COP_Technician: "COP_Technician-bee9003c.png",
				COP_Technician_Flair: "COP_Technician_Flair-a5c8f6b6.png",
				COP_Technician_Stealth: "COP_Technician_Stealth-0eb3864a.png",
				COP_Technician_TeamPride: "COP_Technician_TeamPride-c3d5e8cb.png",
				CRIM_PRO_Enforcer: "CRIM_PRO_Enforcer-b168396e.png",
				CRIM_PRO_Enforcer_Flair: "CRIM_PRO_Enforcer_Flair-0b419241.png",
				CRIM_PRO_Enforcer_Stealth: "CRIM_PRO_Enforcer_Stealth-7b02653a.png",
				CRIM_PRO_Enforcer_TeamPride: "CRIM_PRO_Enforcer_TeamPride-0a19acb4.png",
				CRIM_PRO_Mechanic: "CRIM_PRO_Mechanic-c94a10db.png",
				CRIM_PRO_Mechanic_Flair: "CRIM_PRO_Mechanic_Flair-3a5bb822.png",
				CRIM_PRO_Mechanic_Stealth: "CRIM_PRO_Mechanic_Stealth-acd40a38.png",
				CRIM_PRO_Mechanic_TeamPride: "CRIM_PRO_Mechanic_TeamPride-7887fc5c.png",
				CRIM_PRO_Operator: "CRIM_PRO_Operator-e6b27b92.png",
				CRIM_PRO_Operator_Flair: "CRIM_PRO_Operator_Flair-f621583c.png",
				CRIM_PRO_Operator_Stealth: "CRIM_PRO_Operator_Stealth-f59d6f9f.png",
				CRIM_PRO_Operator_TeamPride: "CRIM_PRO_Operator_TeamPride-0a09c730.png",
				CRIM_PRO_Professional: "CRIM_PRO_Professional-54b5f292.png",
				CRIM_PRO_Professional_Flair: "CRIM_PRO_Professional_Flair-42c3a2bc.png",
				CRIM_PRO_Professional_Stealth: "CRIM_PRO_Professional_Stealth-9ac38a05.png",
				CRIM_PRO_Professional_TeamPride: "CRIM_PRO_Professional_TeamPride-082156ff.png",
				CRIM_STREET_Enforcer: "CRIM_STREET_Enforcer-bded3f69.png",
				CRIM_STREET_Enforcer_Flair: "CRIM_STREET_Enforcer_Flair-39845068.png",
				CRIM_STREET_Enforcer_Stealth: "CRIM_STREET_Enforcer_Stealth-4ca312f4.png",
				CRIM_STREET_Enforcer_TeamPride: "CRIM_STREET_Enforcer_TeamPride-1cf4fc86.png",
				CRIM_STREET_Mechanic: "CRIM_STREET_Mechanic-eba1ec19.png",
				CRIM_STREET_Mechanic_Flair: "CRIM_STREET_Mechanic_Flair-7e16580a.png",
				CRIM_STREET_Mechanic_Stealth: "CRIM_STREET_Mechanic_Stealth-0e6757cf.png",
				CRIM_STREET_Mechanic_TeamPride: "CRIM_STREET_Mechanic_TeamPride-9f21d059.png",
				CRIM_STREET_Operator: "CRIM_STREET_Operator-c6a4c4a5.png",
				CRIM_STREET_Operator_Flair: "CRIM_STREET_Operator_Flair-884e8ad0.png",
				CRIM_STREET_Operator_Stealth: "CRIM_STREET_Operator_Stealth-02f284af.png",
				CRIM_STREET_Operator_TeamPride: "CRIM_STREET_Operator_TeamPride-faf78d07.png",
				CRIM_STREET_Professional: "CRIM_STREET_Professional-db83f6b0.png",
				CRIM_STREET_Professional_Flair: "CRIM_STREET_Professional_Flair-856c9fbc.png",
				CRIM_STREET_Professional_Stealth: "CRIM_STREET_Professional_Stealth-933af7c7.png",
				CRIM_STREET_Professional_TeamPride: "CRIM_STREET_Professional_TeamPride-3e5edf6f.png",
				SWAT_Enforcer: "SWAT_Enforcer-9e182a3b.png",
				SWAT_Enforcer_Flair: "SWAT_Enforcer_Flair-616d6516.png",
				SWAT_Enforcer_Stealth: "SWAT_Enforcer_Stealth-fda3077d.png",
				SWAT_Enforcer_TeamPride: "SWAT_Enforcer_TeamPride-bcebea36.png",
				SWAT_Operator: "SWAT_Operator-eabc7eb6.png",
				SWAT_Operator_Flair: "SWAT_Operator_Flair-6d5f7741.png",
				SWAT_Operator_Stealth: "SWAT_Operator_Stealth-f3613c37.png",
				SWAT_Operator_TeamPride: "SWAT_Operator_TeamPride-eda31dd2.png",
				SWAT_Professional: "SWAT_Professional-5b277501.png",
				SWAT_Professional_Flair: "SWAT_Professional_Flair-79c902c9.png",
				SWAT_Professional_Stealth: "SWAT_Professional_Stealth-5c24c3b5.png",
				SWAT_Professional_TeamPride: "SWAT_Professional_TeamPride-ebf91bc1.png",
				SWAT_Technician: "SWAT_Technician-2956268a.png",
				SWAT_Technician_Flair: "SWAT_Technician_Flair-6ddcd91c.png",
				SWAT_Technician_Stealth: "SWAT_Technician_Stealth-e7355c4f.png",
				SWAT_Technician_TeamPride: "SWAT_Technician_TeamPride-0dd62ef9.png"
			},
			xlarge: {
				COP_Enforcer: "COP_Enforcer-bb4dfbfb.png",
				COP_Enforcer_Flair: "COP_Enforcer_Flair-17500d13.png",
				COP_Enforcer_Stealth: "COP_Enforcer_Stealth-1c75497d.png",
				COP_Enforcer_TeamPride: "COP_Enforcer_TeamPride-7074a2b9.png",
				COP_Mastermind: "COP_Mastermind-9d7f4ca8.png",
				COP_Mastermind_Flair: "COP_Mastermind_Flair-8e018733.png",
				COP_Mastermind_Stealth: "COP_Mastermind_Stealth-86bc92ec.png",
				COP_Mastermind_TeamPride: "COP_Mastermind_TeamPride-f2d55915.png",
				COP_Professional: "COP_Professional-c25e0bc4.png",
				COP_Professional_Flair: "COP_Professional_Flair-5eb5707c.png",
				COP_Professional_Stealth: "COP_Professional_Stealth-2e58b0c9.png",
				COP_Professional_TeamPride: "COP_Professional_TeamPride-bef05924.png",
				COP_Technician: "COP_Technician-a607ea53.png",
				COP_Technician_Flair: "COP_Technician_Flair-80cdf7a1.png",
				COP_Technician_Stealth: "COP_Technician_Stealth-a8467aed.png",
				COP_Technician_TeamPride: "COP_Technician_TeamPride-8e49475e.png",
				CRIM_PRO_Enforcer: "CRIM_PRO_Enforcer-96e672af.png",
				CRIM_PRO_Enforcer_Flair: "CRIM_PRO_Enforcer_Flair-7961af07.png",
				CRIM_PRO_Enforcer_Stealth: "CRIM_PRO_Enforcer_Stealth-3935d04d.png",
				CRIM_PRO_Enforcer_TeamPride: "CRIM_PRO_Enforcer_TeamPride-2dfadd4e.png",
				CRIM_PRO_Mechanic: "CRIM_PRO_Mechanic-be16f03d.png",
				CRIM_PRO_Mechanic_Flair: "CRIM_PRO_Mechanic_Flair-a86bcbec.png",
				CRIM_PRO_Mechanic_Stealth: "CRIM_PRO_Mechanic_Stealth-ecf2827d.png",
				CRIM_PRO_Mechanic_TeamPride: "CRIM_PRO_Mechanic_TeamPride-a5fcbc54.png",
				CRIM_PRO_Operator: "CRIM_PRO_Operator-9526ea1e.png",
				CRIM_PRO_Operator_Flair: "CRIM_PRO_Operator_Flair-b85991e4.png",
				CRIM_PRO_Operator_Stealth: "CRIM_PRO_Operator_Stealth-0f833889.png",
				CRIM_PRO_Operator_TeamPride: "CRIM_PRO_Operator_TeamPride-5fd4e77e.png",
				CRIM_PRO_Professional: "CRIM_PRO_Professional-0423e4fb.png",
				CRIM_PRO_Professional_Flair: "CRIM_PRO_Professional_Flair-ede5d59f.png",
				CRIM_PRO_Professional_Stealth: "CRIM_PRO_Professional_Stealth-c9a79421.png",
				CRIM_PRO_Professional_TeamPride: "CRIM_PRO_Professional_TeamPride-81b62c74.png",
				CRIM_STREET_Enforcer: "CRIM_STREET_Enforcer-3e028350.png",
				CRIM_STREET_Enforcer_Flair: "CRIM_STREET_Enforcer_Flair-d938e14c.png",
				CRIM_STREET_Enforcer_Stealth: "CRIM_STREET_Enforcer_Stealth-3bb50ecf.png",
				CRIM_STREET_Enforcer_TeamPride: "CRIM_STREET_Enforcer_TeamPride-26c71442.png",
				CRIM_STREET_Mechanic: "CRIM_STREET_Mechanic-7898c269.png",
				CRIM_STREET_Mechanic_Flair: "CRIM_STREET_Mechanic_Flair-0163f37b.png",
				CRIM_STREET_Mechanic_Stealth: "CRIM_STREET_Mechanic_Stealth-9ee74bad.png",
				CRIM_STREET_Mechanic_TeamPride: "CRIM_STREET_Mechanic_TeamPride-33ed24ad.png",
				CRIM_STREET_Operator: "CRIM_STREET_Operator-605db387.png",
				CRIM_STREET_Operator_Flair: "CRIM_STREET_Operator_Flair-4637fb3b.png",
				CRIM_STREET_Operator_Stealth: "CRIM_STREET_Operator_Stealth-89caa619.png",
				CRIM_STREET_Operator_TeamPride: "CRIM_STREET_Operator_TeamPride-b9f46756.png",
				CRIM_STREET_Professional: "CRIM_STREET_Professional-1679439c.png",
				CRIM_STREET_Professional_Flair: "CRIM_STREET_Professional_Flair-3b5ba38f.png",
				CRIM_STREET_Professional_Stealth: "CRIM_STREET_Professional_Stealth-58cb21f5.png",
				CRIM_STREET_Professional_TeamPride: "CRIM_STREET_Professional_TeamPride-796c43e5.png",
				SWAT_Enforcer: "SWAT_Enforcer-e5dce392.png",
				SWAT_Enforcer_Flair: "SWAT_Enforcer_Flair-faf2a25a.png",
				SWAT_Enforcer_Stealth: "SWAT_Enforcer_Stealth-44096510.png",
				SWAT_Enforcer_TeamPride: "SWAT_Enforcer_TeamPride-b479a678.png",
				SWAT_Operator: "SWAT_Operator-79a2d3c6.png",
				SWAT_Operator_Flair: "SWAT_Operator_Flair-81ed73db.png",
				SWAT_Operator_Stealth: "SWAT_Operator_Stealth-e2b0d645.png",
				SWAT_Operator_TeamPride: "SWAT_Operator_TeamPride-63109cd1.png",
				SWAT_Professional: "SWAT_Professional-e72c06d8.png",
				SWAT_Professional_Flair: "SWAT_Professional_Flair-38d70403.png",
				SWAT_Professional_Stealth: "SWAT_Professional_Stealth-b4393fae.png",
				SWAT_Professional_TeamPride: "SWAT_Professional_TeamPride-f56725fa.png",
				SWAT_Technician: "SWAT_Technician-72cce121.png",
				SWAT_Technician_Flair: "SWAT_Technician_Flair-b0d9c1f8.png",
				SWAT_Technician_Stealth: "SWAT_Technician_Stealth-05a8db3e.png",
				SWAT_Technician_TeamPride: "SWAT_Technician_TeamPride-f5821f28.png"
			}
		};
	return n = r[e][n], "http://eaassets-a.akamaihd.net/battlelog/bb/bfh/Portraits/" + e + "/" + n
}, exports.generateGuid = function() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
		var t = Math.random() * 16 | 0,
			n = e == "x" ? t : t & 3 | 8;
		return n.toString(16)
	})
}, exports.getGuidForWindow = function() {
	return typeof exports.guid == "undefined" && (exports.guid = exports.generateGuid()), exports.guid
}, exports.clamp = function(e, t, n) {
	return Math.
	min(Math.max(e, t), n)
}, exports.statNameToSID = function(e) {
	return statNameSID[e]
}, exports.setCaretPosition = function(e, t) {
	var n = "createTextRange";
	if (e != null)
		if (e[n]) {
			var r = e[n]();
			r.move("character", t), r.select()
		} else e.selectionStart ? (e.focus(), e.setSelectionRange(t, t)) : e.focus()
}, exports.stripEmojis = function(e) {
	return e.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, "")
};