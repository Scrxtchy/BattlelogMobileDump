function PingLimiter(e) {
	var t = null,
		n = "length",
		r = "startBatch",
		i = "isEmptyObject",
		s = this,
		o = {};
	for (var u = 0; u < e; u++) o[u] = t;
	var a = [];
	this.addRequest = function(n, r) {
		var i = new PingRequest(s, n, r);
		for (var u = 0; u < e; u++)
			if (o[u] === t) {
				o[u] = i;
				return
			}
		a.push(i)
	}, this.removeRequest = function(e) {
		$.each(o, function(r, i) {
			if (i === e) {
				if (a[n] > 0) {
					var s = a.shift();
					o[r] = s
				} else o[r] = t;
				return !1
			}
		})
	}, this[r] = function() {
		var e = {};
		$.each(o, function(t, n) {
			if (n) {
				var r = n.onStart();
				r && (e["" + t] = r)
			}
		});
		if (!$[i](e)) {
			var t = [];
			for (var r in e) {
				if (!e.hasOwnProperty(r)) continue;
				t.push([r, e[r]])
			}
			if (t[n] > 3) {
				var s = -1;
				s = setInterval(function() {
					var e = t.shift(),
						r = {};
					r[e[0]] = e[1], device.cmd(PING_SERVERS_COMMAND, {
						servers: r
					}), t[n] === 0 && clearInterval(s)
				}, 50)
			} else device.cmd(PING_SERVERS_COMMAND, {
				servers: e
			})
		}
	}, this.onBatchResult = function(e) {
		var t = {};
		$.each(e, function(e, n) {
			e = parseInt(e, 10);
			var r = o[e],
				i = r.onResult(n);
			i && (t[r.getName()] = i)
		}), $[i](t) || events.emit("pingResult", t), s[r]()
	}
}

function PingRequest(e, t, n) {
	var r = !1,
		i = "roundTripMSEC",
		s = "removeRequest",
		o = 1,
		u = 2,
		a = 3,
		f = this,
		l = 0,
		c = o;
	this.getName = function() {
		return t
	}, this.onStart = function() {
		return c === o ? (c = u, n) : r
	}, this.onResult = function(t) {
		return c != u ? r : t[i] >= 0 ? (c = a, e[s](f), t[i]) : (l >= 5 ? (c = a, e[s](f)) : (c = o, l++), r)
	}
}
var device = require("device"),
	storage = require("storage"),
	web = require("web"),
	events = require("events"),
	pingLimiter = new PingLimiter(32),
	PING_SERVERS_COMMAND = "pingServers";
exports.pingServers = function(e) {
	$.each(e, function(e, t) {
		pingLimiter.addRequest(e, t)
	}), pingLimiter.startBatch()
}, exports.handlePingResults = function(e) {
	pingLimiter.onBatchResult(e)
};