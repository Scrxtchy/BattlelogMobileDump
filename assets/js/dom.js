var app = require("app"),
	assets = require("assets"),
	device = require("device"),
	enums = require("enums"),
	session = require("session"),
	locale = require("locale"),
	template = require("template"),
	util = require("util"),
	presence = require("presence"),
	challengedata = require("challengedata"),
	gamedata = {
		battlelog: require("gamedata/battlelog"),
		bf3: {
			expansions: require("gamedata/bf3/expansions")
		},
		warsaw: {
			expansions: require("gamedata/warsaw/expansions"),
			levels: require("gamedata/warsaw/levels")
		},
		omaha: {
			expansions: {
				activeExpansions: []
			}
		}
	};
require(["gamedata/omaha/levels"], function(e) {
	gamedata.omaha.levels = e
}, function() {
	return !0
}), exports.t = function(e, t) {
	var n = locale.t(e);
	return !t || !t.length ? n : (t.forEach(function(e) {
		n = n.replace("[" + e + "]", '<t class="' + e + '"></t>')
	}), n)
}, exports.user_avatar = function(e, t) {
	e = e || {};
	var n = "avatar";
	return t && (n += "-" + t), $('<div class="' + n + " " + util.userpresence_to_status(e) + '"><img src="' + util.gravatar(e.gravatarMd5) + '" /></div>')
}, exports.soldier_avatar = function(e) {
	return $('<div class="soldier-avatar ' + e.picture + '"></div>')
}, exports.user_link = function(e) {
	return $("<a></a>").text(e.username).addClick(function(t) {
		t.stopPropagation(), util.goToProfileAction(e)
	})
}, exports.user_name = function(e) {
	return $('<strong class="username"></strong>').text(e.username)
}, exports.thread_link = function(e, t) {
	return $("<a></a>").text(t).addClick(function(n) {
		return n.stopPropagation(), app.go("ForumThreadViewController", {
			section: !1,
			thread: {
				id: e,
				title: t
			},
			page: 1
		}), !1
	})
}, exports.thread_name = function(e) {
	return $('<span class="thread"></span>').text(e)
};
var get_userpresence_description = function(e) {
	var t = "presence",
		n = '<span class="game-icon ',
		r = "toString",
		i = "playingMp",
		s = '"></span>',
		o = '<span class="platform-icon small ',
		u = " &bull; ",
		a = "playingCoop";
	if (!e[t]) return "";
	if (e[t].isPlaying) {
		var f = "";
		return presence.isPlayingMp(e[t]) ? (f += n + enums.Game[r](e[t][i].game) + s, f += o + enums.Platform[r](e[t][i].platform) + s, f += u, f += e[t][i].serverName || locale.t("ID_MOBILE_USERPRESENCE_MULTIPLAYER")) : presence.isPlayingCoop(e[t]) ? (f += n + enums.Game[r](e[t][a].game) + s, f += o + enums.Platform[r](e[t][a].platform) + s, f += u + locale.t("ID_MOBILE_USERPRESENCE_COOP")) : presence.isPlayingOrigin(e[t]) && (f += e[t].playingOrigin.gameTitle), f
	}
	return e[t].isIdle && e[t].isOnline ? locale.t("ID_MOBILE_USERPRESENCE_AWAY") : e[t].isOnline ? "" : ""
};
exports.user_row = function(e) {
		var t = "addClass",
			n = "presence",
			r = util.userpresence_to_status(e),
			i = get_userpresence_description(e),
			s = $(template.render("user_row", {
				divId: "cc_user_" + e.userId,
				gravatar: util.gravatar(e.gravatarMd5),
				username: e.username,
				statusdesc: i
			}));
		return s[t](r), e[n] && e[n].isOnline && e[n].isIdle && s[t]("away"), i || s[t]("hidestatus"), s
	}, exports.console_user_row = function(e) {
		var t = util.consolepresence_to_status(e),
			n = get_userpresence_description(e),
			r = $(template.render("user_row", {
				divId: "cc_console_" + e.userId,
				gravatar: util.gravatar(e.gravatarMd5),
				username: e.username,
				statusdesc: n
			}));
		return r.addClass(t), n || r.addClass("hidestatus"), r
	}, exports.persona_row = function(e) {
		var t = $(template.render("persona_row", {
			name: e.personaName,
			status: null
		}));
		return t
	}, exports.stats_persona_row = function(e, t, n, r) {
		var i = "append",
			s = "</div>",
			o = "personaName";
		t = t || n.user;
		var u = $('<div class="persona"></div>');
		t ? u[i](exports.user_avatar(t)) : u[i](exports.soldier_avatar(n));
		var a = $('<div class="info"><div class="name"></div><div class="platform"><span class="game-icon"></span>' + s + s);
		return a.find(".name").text((n.clanTag ? "[" + n.clanTag + "] " : "") + n[o]), a.find(".game-icon").addClass(enums.Game.toString(e)), a.find(".platform-icon").addClass(enums.Platform.toString(r)), t && t.username != n[o] && a.find(".platform")[i](" &bull; " + t.username), u[i](a), u
	}, exports.soldier_row = function(e) {
		var t = "toString",
			n = "persona",
			r = "</div>",
			i = $('<div class="soldier"><div class="soldier-avatar ' + enums.Game[t](e.game) + '"></div>' + '<div class="info">' + '<div class="name">' + (e[n].clanTag ? "[" + e[n].clanTag + "] " : "") + e[n].personaName + r + '<div class="platform"><span class="game-icon ' + enums.Game[t](e.game) + '"></span><span class="platform-icon small ' + enums.Platform[t](e.platform) + '"></span></div>' + r + r);
		if (e[n].picture) {
			var s = "images/" + enums.Game[t](e.game) + "/kit-avatars/" + e[n].picture + ".png";
			i.find(".soldier-avatar").css("background-image", "url(" + s + ")")
		}
		return e.stats && e.stats.rank && i.append('<div class="rank"><span class="item-image rank _' + (e.stats.rank || 0) + '"></span>' + r), i
	}, exports.statItem_image = function(e, t, n) {
		var r = "WARSAW",
			i = "Game",
			s = "getActiveGame",
			o = "imageConfig",
			u = "versions",
			a = "mediumns",
			f = "StatItemType",
			l = "imageName",
			c = exports.get_statItem_type(t);
		if (!c) return;
		if (e == enums[i][r] && session[s]() != enums[i][r] && t[o]) {
			var h = "images/warsaw/gamedata/" + t[o].category + "/" + t[o].slug + ".png",
				p = "";
			return t[o][u] && t[o][u][a] && (p = ' width="' + t[o][u][a].width / 2 + '" height="' + t[o][u][a].height / 2 + '"'), $('<img src="' + h + '"' + p + ">")
		}
		if (e == enums[i].BF3 && session[s]() != enums[i].BF3) {
			if (t.type == enums[f].RIBBON) return $('<img src="images/bf3/ribbons/' + t[l] + '.png" width="70" height="26">');
			if (t.type == enums[f].MEDAL) return $('<img src="images/bf3/medals/' + t[l] + '.png" width="47" height="47">')
		}
		var d = "";
		e == enums[i][r] || e == enums[i].OMAHA ? t[o] && (d = t[o].category) : e == enums[i].BF3 && (["weapon", "gadget", "specialization", "weaponaddon", "vehicleaddon"].indexOf(c) !== -1 ? d = "item" : d = c);
		var v = "";
		e == enums[i][r] || e == enums[i].OMAHA ? t[o] ? v = t[o].slug : t.slug && (v = t.slug) : e == enums[i].BF3 && (v = t.image || t[l], v && (v = "_" + v));
		if (!v) return;
		n = n || {};
		var m = n.size || "small";
		return $('<span class="item-image ' + m + " " + d + " " + v.toLowerCase() + '"></span>')
	}, exports.battlepack_image = function(e) {
		var t = "imageConfig",
			n = "versions",
			r = "mediumns";
		if (e[t]) {
			var i = "images/warsaw/gamedata/" + e[t].category + "/" + e[t].slug + ".png",
				s = "";
			return e[t][n] && e[t][n][r] && (s = ' width="' + e[t][n][r].width / 2 + '" height="' + e[t][n][r].height / 2 + '"'), '<img src="' + i + '"' + s + ">"
		}
	}, exports.get_statItem_type = function(e) {
		return enums.StatItemType.toString(e.type)
	}, exports.is_valid_statItem = function(e) {
		if (exports.get_statItem_type(e)) return !0
	}, exports.statItem_row = function(e, t) {
		var n = "</div>",
			r = "parentNameSID",
			i = exports.get_statItem_type(t);
		if (!i) return;
		var s = $('<div class="statitem ' + i + '">' + '<div class="image"></div>' + '<div class="info">' + '<div class="name">' + locale.t(t.nameSID) + n + n + n);
		return s.find(".image").append(exports.statItem_image(e, t)), t[r] && s.find(".info").append('<div class="parent">' + locale.t(t[r]) + n), s
	}, exports.get_map_image = function(e, t, n) {
		n = n || "large";
		var r = t.toLowerCase(),
			i = $('<div class="map-image ' + n + " " + r + '"></div>');
		if (e == enums.Game.WARSAW) {
			var s = assets.CDNResourceURL("/public/base/bf4/map_images/992x345/" + r + ".jpg");
			i.css("background-image", "url('" + s + "')")
		}
		return i
	}, exports.server_link = function(e, t) {
		return $('<a class="serverlink"></a>').text(e.serverName).addClick(function(n) {
			return n.stopPropagation(), app.go("ServerViewController", {
				guid: e.serverGuid,
				game: enums.Game.WARSAW,
				platform: t
			}), !1
		})
	}, exports.server_name = function(e) {
		return $('<span class="server-name"></span>').text(e.serverName)
	}, exports.server_status = function(e) {
		var t = "toString",
			n = '"></span>',
			r = "&nbsp;&bull;&nbsp;",
			i = "",
			s = enums.Game[t](e.game);
		i += '<span class="game-icon ' + enums.Game[t](e.game) + n, i += '<span class="platform-icon inverted small ' + enums.Platform[t](e.platform) + n;
		if (e.online && e.map && e.mapMode) {
			var o = gamedata[s].levels.levels[e.map];
			o && (i += r, i += locale.t(o.label), i += r, i += locale.t("ID_WEB_COMMON_GAMEMODE_" + e.mapMode))
		}
		return i
	}, exports.server_row = function(e) {
		var t = "</div>",
			n = "",
			r = "unknown",
			i = enums.Game.toString(e.game);
		if (e.online && e.map && e.mapMode) {
			var s = gamedata[i].levels.levels[e.map];
			s && (n += locale.t(s.label), n += "&nbsp;&bull;&nbsp;", n += locale.t("ID_WEB_COMMON_GAMEMODE_" + e.mapMode), r = s.id.toLowerCase())
		}
		var o = "images/" + i + "/maps/" + r + ".jpg",
			u = $('<div class="server"><div class="image"><span class="server-image" style="background-image:url(' + o + ');"></span>' + t + '<div class="info">' + '<div class="name-players">' + '<div class="name"></div>' + '<div class="players"></div>' + t + '<div class="status"></div>' + t + t);
		return u.find(".name").text(e.name), u.find(".players").text(e.numPlayers + "/" + e.maxPlayers), u.find(".status").append(n), u
	}, exports.topstory = function(e) {
		var t = "type",
			n = "blogPost",
			r = "legacyBlogPost",
			i;
		if (e[t] == n || e[t] == r) {
			var s = "";
			e[t] == n ? s = e.content.stripTags() : e[t] == r && (s = e.preamble.stripTags());
			var o = "";
			e[t] == n && (o = e.thumbnail), device.isPhone() && (s = s.ellipsize(100, !0)), i = $(template.render("topstory", {
				image: o,
				title: e.title,
				commentsCount: e.visibleCommentCount || 0,
				votesCount: e.votes || 0,
				summary: s,
				date: util.friendlyTimestamp(e.publishDate)
			}))
		}
		return i
	}, exports.newsitem_row = function(e) {
		var t = "type",
			n = "blogPost",
			r = "legacyBlogPost",
			i;
		if (e[t] == n || e[t] == r) {
			var s = "";
			e[t] == n ? s = e.content.stripTags() : e[t] == r && (s = e.preamble.stripTags());
			var o = "";
			e[t] == n && (o = e.thumbnail), s = s.ellipsize(300, !0), i = $(template.render("newsitem_row", {
				title: e.title,
				image: o,
				summary: s,
				date: util.friendlyTimestamp(e.publishDate)
			}))
		}
		return i
	}, exports.empty_row = function(e) {
		return $('<div class="sectionempty sectionmessage">' + e + "</div>")
	}, exports.empty_row_large = function(e) {
		return $('<div class="sectionempty sectionmessage large">' + e + "</div>")
	}, exports.error_row = function(e) {
		return $('<div class="sectionerror">' + e + "</div>")
	}, exports.stat_row = function(e, t) {
		var n = "</div>";
		return $('<div class="statrow"><div class="label">' + e + n + '<div class="value">' + t + n + n)
	},
	function() {
		var e = !0,
			t = "Game",
			n = "WARSAW";
		exports.gameevent_types = {
			BF3ASSIGNMENTS: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BF3ASSIGNMENTS",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_BF3ASSIGNMENTS",
				hasStatItems: e,
				game: enums[t].BF3
			},
			BF3AWARDS: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BF3AWARDS",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_BF3AWARDS",
				hasStatItems: e,
				game: enums[t].BF3
			},
			BF3GAMEREPORT: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BF3GAMEREPORT",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_BF3GAMEREPORT",
				hasStatItems: e,
				game: enums[t].BF3
			},
			BF3RANKUP: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BF3RANKUP",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_BF3RANKUP",
				hasRank: e,
				game: enums[t].BF3
			},
			BF4ASSIGNMENTS: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BF4ASSIGNMENTS",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_BF4ASSIGNMENTS",
				hasStatItems: e,
				game: enums[t][n]
			},
			BF4AWARDS: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BF4AWARDS",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_BF4AWARDS",
				hasStatItems: e,
				game: enums[t][n]
			},
			BF4GAMEREPORT: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BF4GAMEREPORT",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_BF4GAMEREPORT",
				hasStatItems: e,
				game: enums[t][n]
			},
			BF4RANKUP: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BF4RANKUP",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_BF4RANKUP",
				hasRank: e,
				game: enums[t][n]
			},
			BFHAWARDS: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BFHAWARDS",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_OMAHAAWARDS",
				hasStatItems: e,
				game: enums[t].OMAHA
			},
			BFHRANKUP: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BFHRANKUP",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_OMAHARANKUP",
				hasRank: e,
				game: enums[t].OMAHA
			},
			BFHGAMEREPORT: {
				battleFeedSID: "ID_WEB_FEED_GAMEEVENT_SHARE_BFHGAMEREPORT",
				activityStreamSID: "ID_WEB_ACTIVITYSTREAM_ACTIVITY_DESCRIPTION_BFHGAMEREPORT",
				hasStatItems: e,
				game: enums[t].OMAHA
			}
		}
	}(), exports.feeditem_types = {
		_default: {
			avatar: function(e, t) {
				return t.append(exports.user_avatar(e.owner)), t
			},
			heading: function(e, t, n) {
				var r = "heading_label",
					i = "feeditem_types",
					s = "author";
				return exports[i][e.event][r] ? (t.append(exports.t(exports[i][e.event][r], ["username"])), t.find("t.username").replaceWith(exports.feed.user(e.owner, n).addClass(s)), t) : (t.append(exports.feed.user(e.owner, n).addClass(s)), t)
			}
		},
		addedfavserver: {
			icon: "favorite",
			heading_label: "ID_MOBILE_FEED_ADDEDFAVSERVER",
			is_shown: function(e) {
				return util.isGameActive(e.ADDEDFAVSERVER.game) ? !0 : !1
			},
			body: function(e, t, n) {
				return t.append(exports.feed.server(e.ADDEDFAVSERVER, n)), t
			}
		},
		becamefriends: {
			icon: "friend",
			heading: function(e, t, n) {
				return t.append(exports.t("ID_WEB_FEED_ADDED_FRIEND", ["username1", "username2"])), t.find("t.username1").replaceWith(exports.feed.user(e.owner, n).addClass("author")), t.find("t.username2").replaceWith(exports.feed.user(e.BECAMEFRIENDS.friendUser, n)), t
			}
		},
		gamereporthighlight: {
			icon: "report",
			is_shown: function(e) {
				var t = !1,
					n = "levels",
					r = "GAMEREPORTHIGHLIGHT",
					i = session.getActiveGame();
				return i != enums.Game.WARSAW && i != enums.Game.OMAHA ? t : i == enums.Game.WARSAW && !gamedata.warsaw[n][n][e[r].map] ? t : i == enums.Game.OMAHA && !gamedata.omaha[n][n][e[r].map] ? t : !0
			},
			heading: function(e, t, n) {
				var r = "getActiveGame",
					i = "levels",
					s = "GAMEREPORTHIGHLIGHT",
					o = "replaceWith",
					u;
				session[r]() == enums.Game.WARSAW ? u = gamedata.warsaw[i][i][e[s].map] : u = gamedata.omaha[i][i][e[s].map], t.append(exports.t("ID_WEB_FEED_HIGHLIGHTED_GAMEREPORT", ["username", "action", "gamemode", "mapname"])), t.find("t.username")[o](exports.feed.user(e.owner, n).addClass("author"));
				var a = locale.t("ID_WEB_BATTLEREPORT_PLAYED");
				e[s].playerTeam == e[s].winTeam && (a = locale.t("ID_WEB_BATTLEREPORT_WON")), t.find("t.action")[o](a);
				var f;
				return session[r]() == enums.Game.OMAHA ? f = util.getBFHGameModeSID(e[s].gameMode) : f = "ID_WEB_COMMON_GAMEMODE_" + e[s].gameMode, t.find("t.gamemode")[o](locale.t(f)), t.find("t.mapname")[o](locale.t(u.label)), e.shareText && t.append($('<p class="feed-br-share-text"></p>').text(e.shareText)), t
			},
			body: function(e, t, n) {
				var r = "GAMEREPORTHIGHLIGHT",
					i = "Game",
					s = "gameMode",
					o = "getActiveGame",
					u = "toLowerCase",
					a = "levels",
					f = e[r],
					l = enums[i].toString(f.game),
					c = util.getScoreTypeLocales(f[s]),
					h = {
						persona: e.persona,
						team: f.playerTeam
					},
					p;
				session[o]() == enums[i].OMAHA ? p = "images/omaha/gamedata/maps/992x345/" + f.map[u]() + ".png" : p = assets.CDNResourceURL("/public/base/bf4/map_images/992x345/" + f.map[u]() + ".jpg");
				var d;
				return session[o]() == enums[i].OMAHA ? d = util.getBFHGameModeSID(f[s]) : d = "ID_WEB_COMMON_GAMEMODE_" + f[s], html = template.render("end_of_round", {
					isBfh: session[o]() == enums[i].OMAHA,
					isActivePlayer: !1,
					map: gamedata[l][a][a][f.map] ? gamedata[l][a][a][f.map].label : "Unknown",
					gameMode: f[s],
					mapModeSid: d,
					duration: util.friendlyDuration(f.duration),
					player: h,
					teams: f.teamScores,
					scoreTypeLocales: c,
					mapImage: p,
					size: "mobile-feed"
				}), t.append(html), n && t.append($(template.render("share_battlereport_box", {
					battleReport: e[r],
					is_detail: n
				}))), n && session[o]() != enums[i].BF3 && t.addClick(function(t) {
					app.go("BattleReportViewController", {
						section: !1,
						reportId: e.itemId,
						platform: e.platform,
						personaId: e.personaId
					})
				}), t
			}
		},
		gameaccess: {
			icon: "checkbox",
			heading: function(e, t, n) {
				return t.append(exports.t("ID_MOBILE_FEED_GAME_ACCESS", ["username"])), t.find("t.username").replaceWith(exports.feed.user(e.owner, n).addClass("author")), t
			},
			is_shown: function(e) {
				var t = "GAMEACCESS";
				return gamedata.battlelog.supportedGames.indexOf(e[t].game) == -1 ? !1 : gamedata[enums.Game.toString(e[t].game)].expansions.activeExpansions.indexOf(e[t].expansion) == -1 ? !1 : !0
			},
			body: function(e, t, n) {
				var r = "GAMEACCESS",
					i = "expansion",
					s = "expansions",
					o = "append",
					u = "gameaccess_" + e[r].game + "_" + e[r][i],
					a = $('<div class="gameaccess"><div class="image ' + u + '"></div>' + "</div>"),
					f = gamedata[enums.Game.toString(e[r].game)][s].expansionMap[e[r][i]];
				e[r][i] && e[r][i] != enums.GameExpansion.BF3PREMIUM && a[o]('<div class="info"><strong class="name">' + locale.t(f.label) + "</strong></div>"), t[o](a);
				var l = gamedata[enums.Game.toString(e[r].game)][s].expansionDetails[e[r][i]];
				if (l && (n || device.isTablet())) {
					var c = $('<ul class="expansion-details"></ul>');
					l.forEach(function(e) {
						c[o]("<li>" + locale.t(e) + "</li>")
					}), device.isTablet() ? a.find(".info")[o](c) : t[o](c)
				}
				return t
			}
		},
		receivedwallpost: {
			icon: "forumpost",
			avatar: function(e, t) {
				return t.append(exports.user_avatar(e.RECEIVEDWALLPOST.writerUser)), t
			},
			heading: function(e, t, n) {
				return t.append('<t class="username1"></t> &raquo; <t class="username2"></t>'), t.find("t.username1").replaceWith(exports.feed.user(e.RECEIVEDWALLPOST.writerUser, n).addClass("author")), t.find("t.username2").replaceWith(exports.feed.user(e.owner, n)), t
			},
			body: function(e, t) {
				var n = $('<div class="wallpost"></div>').text(e.RECEIVEDWALLPOST.wallBody);
				return t.append(n), t
			}
		},
		sharedgameevent: {
			icon: "award",
			is_shown: function(e) {
				var t = "eventName",
					n = "SHAREDGAMEEVENT",
					r = !1,
					i = exports.gameevent_types[e[n][t]];
				if (!i || i.game != session.getActiveGame()) return r;
				if (i.hasStatItems) {
					if (!e[n][e[n][t]].statItems) return r;
					if (!e[n][e[n][t]].statItems.length) return r
				}
				return !0
			},
			heading: function(e, t, n) {
				return t.append(exports.t(exports.gameevent_types[e.SHAREDGAMEEVENT.eventName].battleFeedSID, ["username"])), t.find("t.username").replaceWith(exports.feed.user(e.owner, n).addClass("author")), t
			},
			body: function(e, t, n) {
				return t.append(exports.feed_gameevent(e.SHAREDGAMEEVENT, n)), t
			}
		},
		statusmessage: {
			icon: "forumpost",
			body: function(e, t) {
				var n = "STATUSMESSAGE",
					r = "preview",
					i = $('<div class="statusmessage"></div>').text(e[n].statusMessage);
				if (e[n][r] && e[n][r] != "null") try {
					var s = JSON.parse(e[n][r].replace(/\\"/g, "")),
						o = $('<div class="linkpreview"></div>').text(s.title);
					i.append(o)
				} catch (u) {
					app.log("Failed to get statusmessage item preview"), app.log(e[n][r])
				}
				return t.append(i), t
			},
			detail_body: function(e, t) {
				var n = "STATUSMESSAGE",
					r = "preview",
					i = "append",
					s = $('<div class="statusmessage"></div>').text(e[n].statusMessage);
				if (e[n][r] && e[n][r] != "null") try {
					var o = JSON.parse(e[n][r].replace(/\\"/g, "")),
						u = $("<a></a>").text(o.title);
					u.addClick(function() {
						app.goExternal(o.url)
					});
					var a = $('<div class="linkpreview"></div>')[i](u);
					s[i](a)
				} catch (f) {
					app.log("Failed to get statusmessage item preview"), app.log(e[n][r])
				}
				return t[i](s), t
			}
		},
		wroteforumpost: {
			icon: "forumpost",
			heading: function(e, t, n) {
				return t.append(exports.t("ID_WEB_FEED_x_WROTE_IN_THREAD_y", ["username", "thread"])), t.find("t.username").replaceWith(exports.feed.user(e.owner, n).addClass("author")), t.find("t.thread").replaceWith(exports.feed.forumpost(e.itemId, e.WROTEFORUMPOST.threadTitle, n)), t
			},
			body: function(e, t, n) {
				var r = "WROTEFORUMPOST",
					i = 150,
					s = 500,
					o = jQuery.trim(e[r].postBody).substring(0, n == 1 ? s : i).split(" ").slice(0, -1).join(" ") + "...",
					u = $('<div class="forumpost"></div>').text(o);
				return t.append(u), n && session.getActiveGame() == enums.Game.WARSAW && t.addClick(function(t) {
					app.go("ForumThreadViewController", {
						section: !1,
						thread: {
							id: e.itemId,
							title: e[r].threadTitle
						},
						page: 1
					})
				}), t
			}
		},
		createdforumthread: {
			icon: "forumpost",
			heading: function(e, t, n) {
				return t.append(exports.t("ID_WEB_FEED_CREATEDFORUMTHREAD_x_CREATED_FORUM_THREAD_y", ["username", "thread"])), t.find("t.username").replaceWith(exports.feed.user(e.owner, n).addClass("author")), t.find("t.thread").replaceWith(exports.feed.forumpost(e.itemId, e.CREATEDFORUMTHREAD.threadTitle, n)), t
			},
			body: function(e, t, n) {
				var r = "CREATEDFORUMTHREAD",
					i = 150,
					s = 500,
					o = jQuery.trim(e[r].threadBody).substring(0, n == 1 ? s : i).split(" ").slice(0, -1).join(" ") + "...",
					u = $('<div class="forumpost"></div>').text(o);
				return t.append(u), n && session.getActiveGame() != enums.Game.BF3 && t.addClick(function(t) {
					app.go("ForumThreadViewController", {
						section: !1,
						thread: {
							id: e.itemId,
							title: e[r].threadTitle
						},
						page: 1
					})
				}), t
			}
		},
		battlepack: {
			icon: "battlepack",
			is_shown: function(e) {
				return e.section == session.getActiveGame()
			},
			heading: function(e, t, n) {
				return t.append(exports.t("ID_WEB_FEED_BATTLEPACK_x_USER_SHARED_BATTLEPACK_y", ["username", "battlepack"])), t.find("t.username").replaceWith(exports.feed.user(e.owner, n).addClass("author")), t.find("t.battlepack").replaceWith(exports.feed.battlepack_name(e.BATTLEPACK.nameSID)), t
			},
			body: function(e, t, n) {
				var r = "BATTLEPACK",
					i = "category";
				return e[r].openedAt = "", e[r].isFeed = !0, e[r][i] == "battlepacks_open" ? e[r].openImageConfig = {
					category: e[r][i],
					slug: e[r].slug
				} : e[r].imageConfig = {
					category: e[r][i],
					slug: e[r].slug
				}, t.append($(template.render("battlepack_opened", e[r]))), t
			}
		},
		addedfavserver: {
			icon: "favorite",
			is_shown: function(e) {
				return session.getActiveGame() == enums.Game.BF3 ? !1 : !0
			},
			heading: function(e, t, n) {
				return t.append(exports.t("ID_WEB_FEED_ADDEDFAVSERVER", ["username", "server"])), t.find("t.username").replaceWith(exports.feed.user(e.owner, n).addClass("author")), t.find("t.server").replaceWith(exports.feed.server(e.ADDEDFAVSERVER, e.platform, n)), t
			}
		},
		itempurchased: {
			icon: "checkbox",
			is_shown: function(e) {
				return session.getActiveGame() == enums.Game.OMAHA
			},
			heading: function(e, t, n) {
				return t.append(exports.t("ID_WEB_FEED_GAMEEVENT_SHARE_ITEMPURCHASE", ["username", "item"])), t.find("t.username").replaceWith(exports.feed.user(e.owner, n).addClass("author")), t.find("t.item").replaceWith(exports.t(e.ITEMPURCHASED.sid)), t
			},
			body: function(e, t, n) {
				var r = "toLowerCase",
					i = "imageData",
					s = "ITEMPURCHASED",
					o = e[s][i].slug[r]().indexOf("paint") == -1;
				return t.append('<div class="item-image ' + (o ? "inverted " : "") + e[s][i].category + " " + e[s][i].slug[r]() + '"></div>'), t
			}
		},
		assignmentcomplete: {
			icon: "checkbox",
			heading_label: "ID_WEB_FEED_COMPLETED_ASSIGNMENT",
			body: function(e, t, n) {
				return t.append(exports.feed_statItems(e.game, e.ASSIGNMENTCOMPLETE.statItems, n)), t
			}
		},
		gamereport: {
			icon: "report",
			is_shown: function(e) {
				var t = 0;
				return e.GAMEREPORT.statItems.forEach(function(e) {
					exports.is_valid_statItem(e) && t++
				}), t > 0
			},
			heading: function(e, t, n) {
				var r = "username",
					i = "replaceWith",
					s = 0;
				return e.GAMEREPORT.statItems.forEach(function(e) {
					exports.is_valid_statItem(e) && s++
				}), s > 1 ? t.append(exports.t("ID_WEB_FEED_GAMEREPORT_RECEIVED_MULTI", [r, "num"])) : t.append(exports.t("ID_WEB_FEED_GAMEREPORT_RECEIVED_SINGLE", [r])), t.find("t.username")[i](exports.feed.user(e.owner, n).addClass("author")), t.find("t.num")[i](s), t
			},
			body: function(e, t, n) {
				return t.append(exports.feed_statItems(e.game, e.GAMEREPORT.statItems, n)), t
			}
		},
		receivedaward: {
			icon: "award",
			is_shown: function(e) {
				var t = 0;
				return e.RECEIVEDAWARD.statItems.forEach(function(e) {
					exports.is_valid_statItem(e) && t++
				}), t > 0
			},
			heading: function(e, t, n) {
				var r = "username",
					i = "replaceWith",
					s = 0;
				return e.RECEIVEDAWARD.statItems.forEach(function(e) {
					exports.is_valid_statItem(e) && s++
				}), s > 1 ? t.append(exports.t("ID_WEB_FEED_RECEIVED_AWARD_MULTI", [r, "num"])) : t.append(exports.t("ID_WEB_FEED_RECEIVED_AWARD_SINGLE", [r])), t.find("t.username")[i](exports.feed.user(e.owner, n).addClass("author")), t.find("t.num")[i](s), t
			},
			body: function(e, t, n) {
				return t.append(exports.feed_statItems(e.game, e.RECEIVEDAWARD.statItems, n))
			}
		},
		rankedup: {
			icon: "rankup",
			heading_label: "ID_MOBILE_FEED_RANKED_UP",
			is_shown: function(e) {
				return e.section && session.getActiveGame() != e.section ? !1 : !0
			},
			body: function(e, t, n) {
				return t.append(exports.feed.rankup(e.section, e.RANKEDUP, n)), t
			}
		}
	}, exports.feed_statItems = function(e, t, n) {
		var r = $('<div class="' + (n ? "statitems-detail" : "statitems") + '"></div>');
		return t.forEach(function(t, i) {
			if (!exports.is_valid_statItem(t)) return;
			var s = n ? exports.statItem_row(e, t) : exports.statItem_image(e, t);
			if (!s) return;
			r.append(s)
		}), r
	}, exports.feed_gameevent = function(e, t) {
		var n = "eventName",
			r = e[e[n]],
			i = exports.gameevent_types[e[n]];
		if (!i) return;
		if (e[n] == "BF3ASSIGNMENTS" || e[n] == "BF4ASSIGNMENTS") return exports.feed_gameevent_assignments(r.statItems, t, e[n]);
		if (i.hasRank) return exports.feed.rankup(i.game, r, t);
		if (i.hasStatItems) return exports.feed_statItems(i.game, r.statItems, t)
	}, exports.feed_gameevent_assignments = function(e, t, n) {
		var r = $('<div class="' + (t ? "statitems-detail" : "statitems") + '"></div>');
		return e.forEach(function(e) {
			var i = t ? exports.feed_gameevent_assignment_row(e, n) : exports.feed_gameevent_assignment_image(e, n);
			if (!i) return;
			r.append(i)
		}), r
	}, exports.feed_gameevent_assignment_image = function(e, t) {
		var n = '"></span>';
		try {
			if (t == "BF4ASSIGNMENTS") var r = $('<span class="item-image award_mission ' + e.imageConfig.slug + n);
			else var r = $('<span class="item-image assignment _' + e.image + n)
		} catch (i) {
			app.error(i);
			var r = $("<span></span>")
		}
		return r
	}, exports.feed_gameevent_assignment_row = function(e, t) {
		var n = "</div>",
			r = $('<div class="statitem"><div class="image"></div><div class="info"><div class="name"></div>' + n + n);
		return r.addClass("assignment"), r.find("div.image").append(exports.feed_gameevent_assignment_image(e, t)), r.find("div.name").text(locale.t(e.nameSID), {}, "ID_WEB_COMMON_UNKNOWN"), r
	}, exports.feeditem = function(e, t) {
		var n = "feeditem_types",
			r = "RECEIVEDWALLPOST",
			i = "append";
		t || (t = {});
		if (e.event in exports[n]) {
			var s = exports[n][e.event];
			if (s.is_shown && !s.is_shown(e)) return;
			var o = !1;
			e[r] ? o = e[r].writerUserId == session.getUserId() : o = e.owner.userId == session.getUserId();
			var u = $('<div class="sectioninfo item ' + (o ? "myfeed " : "") + e.event + " feeditem-" + e.id + '"></div>');
			try {
				u[i](exports.feeditem_col_avatar(e, t))[i](exports.feeditem_col_body(e, t))[i](exports.feeditem_col_report(e, t))
			} catch (a) {
				app.error(a.stack);
				return
			}
			return u
		}
		return
	}, exports.feeditem_col_avatar = function(e, t) {
		var n = "feeditem_types",
			r = "detail_avatar",
			i = "avatar",
			s = "_default",
			o = exports[n][e.event],
			u = $('<div class="col-avatar"></div>');
		return t.isDetailView && o[r] ? u = o[r](e, u) : o[i] ? u = o[i](e, u) : exports[n][s][i] && (u = exports[n][s][i](e, u)), u
	}, exports.feeditem_col_body = function(e, t) {
		var n = "append",
			r = $('<div class="col-headerinfo"></div>');
		r[n](exports.feeditem_heading(e, t))[n](exports.feeditem_body(e, t))[n](exports.feeditem_info(e, t));
		var i = $('<div class="col-body"></div>');
		return t.isDetailView || i[n](exports.feeditem_social(e, t)), r.add($('<div class="clear"></div>')).add(i)
	}, exports.feeditem_col_report = function(e, t) {
		var n = $('<div class="col-report"></div>');
		return n
	}, exports.feeditem_heading = function(e, t) {
		var n = "feeditem_types",
			r = "isDetailView",
			i = "detail_heading",
			s = "heading",
			o = "_default",
			u = exports[n][e.event],
			a = $('<div class="heading"></div>');
		return t[r] && u[i] ? a = u[i](e, a) : u[s] ? a = u[s](e, a, t[r]) : t[r] && exports[n][o][i] ? a = exports[n][o][i](e, a) : exports[n][o][s] && (a = exports[n][o][s](e, a, t[r])), a
	}, exports.feeditem_body = function(e, t) {
		var n = "feeditem_types",
			r = "isDetailView",
			i = "detail_body",
			s = "_default",
			o = exports[n][e.event],
			u = $('<div class="body"></div>');
		return t[r] && o[i] ? u = o[i](e, u) : o.body ? u = o.body(e, u, t[r]) : exports[n][s].body && (u = exports[n][s].body(e, u, t[r])), u
	}, exports.feeditem_info = function(e, t) {
		var n = $('<div class="info"><span class="posticon"></span>&nbsp;<span class="date"></span></div>');
		return n.find("span.posticon").append(exports.feeditem_icon(e)), n.find("span.date").text(util.friendlyTimestamp(e.creationDate)), e.section && e.platform && n.append('&nbsp;&bull;&nbsp;&nbsp;<span class="game-icon ' + enums.Game.toString(e.section) + '"></span><span class="platform-icon small ' + enums.Platform.toString(e.platform) + '"></span>'), n
	}, exports.feeditem_icon = function(e) {
		return $('<span class="feed-icon"></span>').addClass(exports.feeditem_types[e.event].icon)
	}, exports.feeditem_social = function(e) {
		var t = $('<div class="social"></div>');
		return e.numLikes && t.append(exports.feeditem_num_hooahs(e)), e.numComments && t.append(exports.feeditem_num_comments(e)), t
	}, exports.feeditem_num_hooahs = function(e) {
		var t = $('<div class="hooahs-count"></div>');
		return e.numLikes && t.text(locale.t("ID_WEB_FEED_x_PEOPLE_LIKED", {
			num: e.numLikes
		})), t
	}, exports.feeditem_num_comments = function(e) {
		var t = "numComments",
			n = $('<div class="comments-count"></div>');
		return e[t] == 1 ? n.text(e[t] + " " + locale.t("ID_WEB_BLOG_COMMENT")) : e[t] > 1 && n.text(e[t] + " " + locale.t("ID_WEB_BLOG_COMMENTS")), n
	}, exports.feeditem_hooahs = function(e) {
		var t = "numLikes",
			n = "likeUserIds",
			r = "text";
		if (!e[t]) return "";
		var i = $('<div class="hooahs-count"></div>');
		if (session.isLoggedIn())
			if (e[n].indexOf(session.tokenInfo.user.userId) != -1 || e[n].indexOf(session.tokenInfo.user.userId - 2) != -1) return e[t] == 1 ? i[r](locale.t("ID_MOBILE_BATTLEFEED_HOOAHS_YOU")) : e[t] == 2 ? i[r](locale.t("ID_MOBILE_BATTLEFEED_HOOAHS_YOU_SINGLE")) : i[r](locale.t("ID_MOBILE_BATTLEFEED_HOOAHS_YOU_MULTI", {
				num: e[t] - 1
			}));
		return e[t] == 1 ? i[r](locale.t("ID_MOBILE_BATTLEFEED_HOOAHS_SINGLE")) : i[r](locale.t("ID_MOBILE_BATTLEFEED_HOOAHS_MULTI", {
			num: e[t]
		}))
	}, exports.feeditem_comment = function(e) {
		var t = "</div>",
			n = $('<div class="comment"><div data-commentid="' + e.id + '" class="col-report"></div>' + '<div class="col-avatar"></div>' + '<div class="col-body">' + '<div class="text">' + '<span class="user-link"></span> <span class="body"></span>' + t + '<div class="info">' + '<span class="date"></span>' + t + t + t);
		return n.find("div.col-avatar").append(exports.user_avatar(e.owner, 20)), n.find("span.user-link").replaceWith(exports.user_link(e.owner).addClass("author")), n.find("span.body").text(e.body), n.find("span.date").text(util.friendlyTimestamp(e.creationDate)), n
	}, exports.activitystreamitem = function(e) {
		var t = "</div>",
			n = "append",
			r = "find",
			i = exports.gameevent_types[e.eventName];
		if (!i) return;
		var s = $('<div class="sectioninfo item"><div class="col-avatar"></div><div class="col-body"><div class="row-info"><div class="col-meta"><div class="heading"><span class="author"></span> <span class="action"></span></div><div class="info"><span class="date"></span></div>' + t + '<div class="col-actions">' + '<div class="actions"></div>' + t + t + '<div class="body"></div>' + t + t);
		return s[r](".col-avatar")[n](exports.user_avatar(e.user)), s[r](".heading .author")[n](exports.user_link(e.user)), s[r](".heading .action")[n](locale.t(i.activityStreamSID)), s[r](".info .date")[n](util.friendlyTimestamp(e.timestamp)), s[r](".body")[n](exports.feed_gameevent(e, !0)), s
	}, exports.feed = {}, exports.feed.rankup = function(e, t, n) {
		var r = "</div>",
			i = t.rank;
		e == enums.Game.WARSAW || e == enums.Game.OMAHA ? i = "r" + i : e == enums.Game.BF3 && (i = "_" + i);
		var s = t.nameSID,
			o = $('<div class="' + (n ? "rankups detail" : "rankups") + '">' + '<div class="rankup"> ' + '<div class="image">' + '<span class="item-image rank small ' + i + '"></span>' + r + '<div class="info">' + (s ? '<div class="rankname">' + locale.t(s) + r : "") + r + r + r);
		return o
	}, exports.feed.user = function(e, t) {
		return t ? exports.user_link(e) : exports.user_name(e)
	}, exports.feed.forumpost = function(e, t, n) {
		return n && session.getActiveGame() != enums.Game.BF3 ? exports.thread_link(e, t) : exports.thread_name(t)
	}, exports.feed.battlepack_name = function(e) {
		var t = locale.t(e);
		return $('<span class="battlepack-name"></span>').text(t)
	}, exports.feed.server = function(e, t, n) {
		return n ? exports.server_link(e, t) : exports.server_name(e)
	}, exports.get_leaderboard_translation = function(e) {
		if (e.nameSID == "BFH_ID_BL_MISSION_BEST_HACKER_NAME_LOWER") return locale.t("ID_WEB_GEOLB_BEST_HACKER");
		if (e.nameSID) return locale.t(e.nameSID);
		var t = e.namesuffix.toUpperCase().replace(/ /g, "_");
		return t == "HACKER_SCORE" ? t = "HACKER" : t == "BEST_HACKER_PLAYER" && (t = "BEST_HACKER"), locale.t("ID_WEB_GEOLB_" + t)
	}, exports.leaderboard_formatting = function(e, t) {
		var n = "indexOf",
			r = "formatStatValue",
			i = parseFloat(String(e).replace(/,/g, ""));
		return t[n]("accuracy") != -1 ? i = util[r](i, "percent") : t[n]("cpm") != -1 ? i = util[r](i, "cash") : t[n]("kdr") != -1 || t[n]("win_loss_ratio") != -1 ? i = util[r](i, "float") : t[n]("c_kany__sa_g") != -1 ? i = util[r](i, "time") : i = util[r](i, !1), i
	}, exports.get_expansion_icon = function(e) {
		var t = ["524288", "1048576", "2097152", "4194304", "8388608"];
		return e && $.inArray(e, t) > -1 ? "<i class='icon xpack-icon xpack-" + e + "'></i>" : ""
	}, exports.get_expansion_icon_by_name = function(e) {
		var t = {
			xp0: "524288",
			xp1: "1048576",
			xp2: "2097152",
			xp3: "4194304",
			xp4: "8388608"
		};
		return t[e] ? exports.get_expansion_icon(t[e]) : ""
	};