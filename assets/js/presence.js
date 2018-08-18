var enums = require("enums");
exports.inState = function(e, t) {
	return e.presenceStates & t
}, exports.isPlayingMp = function(e) {
	return e.isPlaying && exports.inState(e, enums.UserPresenceState.PLAYING_MP)
}, exports.isOnlineGame = function(e) {
	return e.isOnline && exports.inState(e, enums.UserPresenceState.ONLINE_GAME)
}, exports.isPlayingCoop = function(e) {
	return e.isPlaying && exports.inState(e, enums.UserPresenceState.PLAYING_COOP)
}, exports.isPlayingOrigin = function(e) {
	return e.isPlaying && exports.inState(e, enums.UserPresenceState.PLAYING_ORIGIN)
}, exports.isInvisibleWeb = function(e) {
	return exports.inState(e, enums.UserPresenceState.INVISIBLE_WEB)
}, exports.isOnlineWeb = function(e) {
	return e.isOnline && exports.inState(e, enums.UserPresenceState.ONLINE_WEB)
}, exports.isOnlineMobile = function(e) {
	return e.isOnline && exports.inState(e, enums.UserPresenceState.ONLINE_MOBILE)
}, exports.isOnlineTablet = function(e) {
	return e.isOnline && exports.inState(e, enums.UserPresenceState.ONLINE_TABLET)
}, exports.isOnlineOrigin = function(e) {
	return e.isOnline && exports.inState(e, enums.UserPresenceState.ONLINE_ORIGIN)
}, exports.isAwayOrigin = function(e) {
	return e.isOnline && exports.inState(e, enums.UserPresenceState.AWAY_ORIGIN)
}, exports.isChattable = function(e) {
	return e.isOnline && exports.inOnlineWeb(e) || !e.isOnline
}, exports.isGroupable = function(e) {
	return e.isOnline && exports.isOnlineWeb(e)
}, exports.hasPresenceOnSamePlatform = function(e, t) {
	if (e.isPlaying && exports.isPlayingMp(e)) {
		if (e.playingMp.platform == t) return !0
	} else if (exports.isPlayingCoop(e) && e.playingMp.platform == t) return !0;
	return !1
}, exports.isPlayingMpInGame = function(e, t) {
	return exports.isPlayingMp(e) && e.playingMp.game == t
}, exports.getConnectedGame = function(e) {
	if (exports.isPlayingMp(e)) return e.playingMp.game;
	if (exports.isOnlineGame(e)) return e.onlineGame.game
}, exports.isConnectedToGame = function(e, t) {
	return exports.getConnectedGame(e) == t
}, exports.getConnectedPlatform = function(e, t) {
	if (!exports.isConnectedToGame(e, t)) return;
	if (exports.isPlayingMp(e)) return e.playingMp.platform;
	if (exports.isOnlineGame(e)) return e.onlineGame.platform
}, exports.isConnectedToGamePlatform = function(e, t, n) {
	return exports.isConnectedToGame(t) && exports.getConnectedPlatform(e, t) == n
}, exports.userCanJoinFriend = function(e, t) {
	return exports.isPlayingMpInGame(t, enums.Game.WARSAW) && exports.isConnectedToGamePlatform(e, enums.Game.WARSAW, t.playingMp.platform)
};