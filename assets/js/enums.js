var app = require("app"),
	EnumBase = function(e) {
		this.stringMap = {};
		for (var t in e) {
			if (!e.hasOwnProperty(t)) continue;
			this[t] = e[t], this.stringMap[e[t]] = t.toLowerCase()
		}
	};
EnumBase.prototype.toString = function(e) {
		return this.stringMap[e]
	}, EnumBase.prototype.fromString = function(e) {
		try {
			return this[e.toUpperCase()]
		} catch (t) {
			return app.error("Could not find enum " + e), !1
		}
	}, exports.EnumBase = EnumBase, exports.PushNotificationType = new EnumBase({
		DRYRUN: 1,
		REMOVE_TYPE: 2,
		REMOVE_ALL: 4,
		MESSAGE: 8,
		XPWEEKEND: 16,
		NEWRELEASES: 32,
		FRIENDSPLAYING: 64,
		CHAT: 128,
		NEWSPOST: 256
	}), exports.Language = new EnumBase({
		EN: 1,
		DE: 2,
		FR: 4,
		ES: 8,
		IT: 16,
		PL: 32,
		RU: 64,
		JA: 128,
		KO: 256,
		ZH: 512,
		CS: 1024,
		PT: 2048
	}), exports.Language.localeMap = {
		EN: "en_US",
		DE: "de_DE",
		FR: "fr_FR",
		ES: "es_ES",
		IT: "it_IT",
		PL: "pl_PL",
		RU: "ru_RU",
		JA: "ja_JP",
		KO: "ko_KR",
		ZH: "zh_CN",
		CS: "cs_CZ",
		PT: "pt_BR"
	}, exports.Language.fromLocale = function(e) {
		var t = "Language";
		for (var n in exports[t].localeMap)
			if (exports[t].localeMap[n] == e) return exports[t].fromString(n)
	}, exports.Language.toLocale = function(e) {
		return exports.Language.localeMap[exports.Language.toString(e).toUpperCase()]
	},
	function() {
		var e = "omaha",
			t = "BF4XP2NS",
			n = "ID_WEB_VEHICLE_STATIONARY_WEAPON";
		exports.Game = new EnumBase({
			BFBC2: 1,
			BF3: 2,
			BF1942: 4,
			BF1943: 8,
			BFVIETNAM: 16,
			BF2: 32,
			BF2142: 64,
			BFBC: 128,
			BFHEROES: 256,
			BFMC: 512,
			BFP4F: 1024,
			WARSAW: 2048,
			MOHW: 4096,
			OMAHA: 8192
		}), exports.URLGame = new EnumBase({
			2048: "bf4",
			4096: "mohw",
			8192: e
		}), exports.AppGameName = new EnumBase({
			2: "bf3",
			2048: "warsaw",
			8192: e
		}), exports.GameTitle = new EnumBase({
			2: "BF3",
			2048: "BF4",
			8192: "BFH"
		}), exports.GameExpansion = new EnumBase({
			VANILLA: 0,
			BF1942RTR: 1,
			BF1942SW: 2,
			BF2142NS: 4,
			BF2AF: 8,
			BF2EF: 16,
			BF2SF: 32,
			BFBC360DEMO: 64,
			BFBCPS3DEMO: 128,
			BFBC2NAM: 256,
			BF3B2K: 512,
			BF3PREMIUM: 1024,
			BF3CQ: 2048,
			BF3AK: 4096,
			BF3AM: 8192,
			BF3EG: 16384,
			MOHWPDLC0: 32768,
			BF4PREPURCHASE: 65536,
			BF4DDPREPURCHASE: 131072,
			BF4PREMIUM: 262144,
			BF4XP0SA: 524288,
			BF4XP1CR: 1048576,
			BF4XP2NS: 2097152,
			BF4XP3DT: 4194304,
			BF4XP4FS: 8388608,
			BF4TRIAL: 16777216,
			BFHPREORDER: 33554432,
			XBOXEAACCESS: 67108864,
			BFHPREMIUM: 134217728
		}), exports.GameType = new EnumBase({
			NOT_PLAYING: 0,
			MP: 1,
			SP: 2,
			COOP: 4
		}), exports.Platform = new EnumBase({
			PC: 1,
			XBOX360: 2,
			PS3: 4,
			XBOX: 8,
			PS2: 16,
			PS4: 32,
			XBOXONE: 64
		}), exports.GameMode = new EnumBase({
			UNKNOWN: 0,
			CONQUEST: 1,
			RUSH: 2,
			SQRUSH: 4,
			SQDM: 8,
			ONSLAUGHT: 16,
			TEAMDEATHMATCH: 32,
			CONQUESTLARGE: 64,
			CONQUESTASSAULTLARGE: 128,
			CONQUESTASSAULTSMALL: 256,
			GUNMASTER: 512,
			DOMINATION: 1024,
			TEAMDEATHMATCHC: 2048,
			TEAMDEATHMATCH_FIRETEAM: 4096,
			COMBATMISSION: 8192,
			SECTORCONTROL: 16384,
			FIRETEAM_SURVIVOR: 32768,
			SPORT: 65536,
			TANKSUPERIORITY: 131072,
			OBJECTIVERAID: 262144,
			CAPTURETHEFLAG: 524288,
			BOMBSQUAD: 1048576,
			OBLITERATION: 2097152,
			SCAVENGER: 4194304,
			AIRSUPERIORITY: 8388608,
			ELIMINATION: 16777216,
			CARRIERASSAULT: 33554432,
			CARRIERASSAULTLARGE: 67108864,
			CARRIERASSAULTSMALL: 134217728,
			BLOODMONEY: 268435456,
			TURFWARSMALL: 536870912,
			TURFWARLARGE: 1073741824,
			HEIST: 2147483648,
			HOSTAGE: 17179869184,
			CONQUESTLADDER: 68719476736,
			NONE: 1,
			CONQUESTSMALL: 1,
			RUSHLARGE: 2,
			RUSHSMALL: 2,
			SQUADDEATHMATCH: 8,
			SQUADRUSH: 4
		}), exports.gamemodeToXpack = {
			524288: "BF4XP0SA",
			8388608: "BF4XP1CR",
			67108864: t,
			134217728: t
		}, exports.ServerPreset = new EnumBase({
			NORMAL: 1,
			HARDCORE: 2,
			INFANTRY: 4,
			CUSTOM: 8,
			IMMERSIVE: 16,
			CLASSIC: 32,
			NOOB: 64
		}), exports.LeaderboardType = new EnumBase({
			ALL: 0,
			FRIENDS: 1
		}), exports.FriendStatus = new EnumBase({
			NONE: 0,
			ACCEPTED: 1,
			INCOMING: 2,
			OUTGOING: 4,
			FORBIDDEN: 8
		}), exports.StatItemType = new EnumBase({
			INSIGNIA: 1,
			PIN: 2,
			ACHIEVEMENT: 4,
			GADGET: 8,
			SPECIALIZATION: 32,
			WEAPON: 64,
			VEHICLE: 128,
			WEAPONADDON: 256,
			VEHICLEADDON: 512,
			MEDAL: 1024,
			RIBBON: 2048,
			RANKUP: 4096,
			SERVICESTAR: 8192,
			MISSION: 16384,
			BATTLEPACK: 32768
		}), exports.UserPresenceState = new EnumBase({
			ONLINE_WEB: 1,
			ONLINE_TABLET: 2,
			ONLINE_MOBILE: 4,
			ONLINE_GAME: 8,
			ONLINE_ORIGIN: 16,
			PLAYING_MP: 256,
			PLAYING_COOP: 512,
			PLAYING_ORIGIN: 1024,
			AWAY_WEB: 65536,
			AWAY_ORIGIN: 1 << 17,
			INVISIBLE_WEB: 1 << 24,
			INVISIBLE_TABLET: 1 << 25,
			INVISIBLE_MOBILE: 1 << 26,
			GROUP_WEB: 1,
			GROUP_ORIGIN: 2
		}), exports.MobileClientDeviceType = new EnumBase({
			PHONE: 1,
			TABLET: 2
		}), exports.MobileClientDeviceOS = new EnumBase({
			IOS: 1,
			ANDROID: 2
		}), exports.GameServerRoleTypes = new EnumBase({
			SOLDIER: 1,
			COMMANDER: 2,
			SPECTATOR: 4
		}), exports.JoinStates = new EnumBase({
			JOINED_GAME: "JOINED_GAME",
			IN_QUEUE: "IN_QUEUE",
			GROUP_PARTIALLY_JOINED: "GROUP_PARTIALLY_JOINED"
		}), exports.niceVehicleCategoryName = new EnumBase({
			"WEAPON STATIONARY ": n,
			"WEAPON STATIONARY": n,
			"VEHICLE AIR": "ID_WEB_VEHICLE_AIR",
			"VEHICLE AIR HELICOPTER SCOUT": "ID_WEB_VEHICLE_AIR_HELICOPTER_SCOUT",
			"VEHICLE AIR JET ATTACK": "ID_WEB_VEHICLE_ATTACK_JET",
			"VEHICLE JET ATTACK": "ID_WEB_VEHICLE_AIR_JET_ATTACK",
			"VEHICLE AIR JET STEALTH": "ID_WEB_VEHICLE_AIR_JET_STEALTH",
			"VEHICLE AIR HELICOPTER ATTACK": "ID_WEB_VEHICLE_AIR_HELICOPTER_ATTACK",
			"VEHICLE ANTI AIR": "ID_WEB_VEHICLE_ANTI_AIR",
			"VEHICLE BOAT": "ID_WEB_VEHICLE_BOAT",
			"VEHICLE FAST ATTACK CRAFT": "WARSAW_ID_EOR_SCORINGBUCKET_VEHICLEATTACKBOAT",
			"VEHICLE INFANTRY FIGHTING VEHICLE": "ID_WEB_VEHICLE_INFANTRY_FIGHTING_VEHICLE",
			"VEHICLE MAIN BATTLE TANKS": "ID_WEB_VEHICLE_MAIN_BATTLE_TANKS",
			"SOLDIER EQUIMENT": "ID_WEB_VEHICLE_SOLDIER_EQUIPMENT",
			"VEHICLE STATIONARY": "ID_WEB_VEHICLE_STATIONARY",
			"VEHICLE TRANSPORT": "ID_WEB_VEHICLE_TRANSPORT",
			"VEHICLE MOBILE ARTILLERY": "ID_WEB_VEHICLE_PROGRESS_VEHICLE_MOBILE_ARTILLERY"
		}), exports.ForumDefinitions = new EnumBase({
			PAGESIZE: 20
		}), exports.ChatMessageType = new EnumBase({
			MESSAGE: "msg",
			USERJOIN: "joined",
			USERLEAVE: "left",
			USERADDED: "added",
			USERKICKED: "kicked"
		}), exports.ChatType = new EnumBase({
			REGULAR: 1,
			ADMIN: 2,
			PLATOON: 3,
			GROUP: 4
		})
	}();