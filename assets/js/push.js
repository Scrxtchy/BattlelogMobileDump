var app = require("app"),
	async = require("lib/async"), config = require("config"), events = require("events"), session = require("session"), Beaconpush = require("beaconpush-client"), pushClient = null, adler32 = function(e) {
		for (var t = 65521, n = 1, r = 0, i = 0, s; s = e.charCodeAt(i++); r = (r + n) % t) n = (n + s) % t;
		return r << 16 | n
	}, connect = function(e, t, n) {
		var r = "sessionInfo",
			i = "beaconpushServers",
			s = "beaconpushOperator";
		if (!e || !t) {
			if (!session.isLoggedIn() || !session[r]) return;
			if (!session[r].pushToken) {
				app.error("Client has no push token, not starting Beaconpush");
				return
			}
			e = session.getUserId(), t = session[r].pushToken
		}
		if (!config[i] || !config[i].length) {
			app.error("No Beaconpush servers set, not starting Beaconpush");
			return
		}
		if (!config[s]) {
			app.error("No Beaconpush operator set, not starting Beaconpush");
			return
		}
		var o = config[i][adler32(e) % config[i].length],
			u = config[s];
		pushClient = new Beaconpush(o + "/session", u, e, t, {
			debug: config.enableBeaconpushDebug || !1
		}), pushClient.connect();
		var a = ["bp:user", "mobile"];
		n && (a = a.concat([n])), pushClient.setSubscriptions(a, onMessage)
	}, disconnect = function() {
		if (!pushClient) return;
		pushClient.disconnect()
	}, onMessage = function(e) {
		events.emit("push." + e.eventName, e.data)
	};
exports.getPushClient = function() {
	return pushClient
}, exports.init = function(e, t, n, r) {
	return e || (e = function() {}), events.bind(["didLogIn", "didRenewSession"], function() {
		pushClient && pushClient.unsubscribe("*"), disconnect(), connect()
	}), events.bind(["didLogOut"], function() {
		pushClient && pushClient.unsubscribe("*")
	}), connect(t, n, r), async.nextTick(function() {
		return e()
	})
}, exports.bind = function(e, t) {
	events.bind("push." + e, t)
}, exports.unbind = function(e, t) {
	events.unbind("push." + e, t)
};