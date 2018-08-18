window.Beaconpush = function(e, t, n, r, i) {
		var s = !1,
			o = "CONNECTING",
			u = "HANDSHAKING",
			a = "CONNECTED",
			f = "DISCONNECTING",
			l = "DISCONNECTED",
			c = "call",
			h = "toString",
			p = "prototype",
			d = "state",
			v = "localStorage",
			m = "setItem",
			g = null,
			y = "subscriptions",
			b = "log",
			w = "error",
			E = "length",
			S = "slice",
			x = "string",
			T = "console",
			N = "debug",
			C = "triggerInternal",
			k = "bp:internal",
			L = "trigger",
			A = "triggerUser",
			O = "bp:user",
			M = "callbacks",
			_ = "onHandshakeAccept",
			D = "handshake-accept",
			P = "message",
			H = "channelId",
			B = "options",
			j = this,
			F = {
				debug: s,
				protocolWhitelist: ["websocket", "xdr-streaming", "xhr-streaming", "iframe-eventsource", "iframe-htmlfile", "xdr-polling", "xhr-polling", "iframe-xhr-polling", "jsonp-polling"]
			};
		this.VERSION = 1, this[o] = o, this[u] = u, this[a] = a, this[f] = f, this[l] = l, this.operatorId = t, this.userId = n, this.token = r, Array.isArray || (Array.isArray = function(e) {
			return Object[p][h][c](e) === "[object Array]"
		}), this[d] = j[l];
		var I = "beaconpushConfig",
			q = "Beaconpush:",
			R = function() {
				return ((1 + Math.random()) * 65536 | 0)[h](16).substring(1)
			},
			U = function() {
				return R() + R() + R() + R() + R()
			},
			z = function() {
				var e = s;
				try {
					e = v in window && m in window[v]
				} catch (t) {}
				return e
			},
			W = function(e) {
				var t = {};
				try {
					t = JSON.parse(e)
				} catch (n) {}
				return t === g && (t = {}), t
			};
		this[y] = {}, this[b] = {}, this[b][w] = function(e) {
			Array[p][S][c](arguments)[E] == 1 && typeof Array[p][S][c](arguments)[0] == x ? window[T][w](q, Array[p][S][c](arguments)[h]()) : window[T][w](q, Array[p][S][c](arguments))
		}, this[b].info = function(e) {
			Array[p][S][c](arguments)[E] == 1 && typeof Array[p][S][c](arguments)[0] == x ? window[T].info(q, Array[p][S][c](arguments)[h]()) : window[T].info(q, Array[p][S][c](arguments))
		}, this[b].warn = function(e) {
			Array[p][S][c](arguments)[E] == 1 && typeof Array[p][S][c](arguments)[0] == x ? window[T].warn(q, Array[p][S][c](arguments)[h]()) : window[T].warn(q, Array[p][S][c](arguments))
		}, this[b][N] = function(e) {
			Array[p][S][c](arguments)[E] == 1 && typeof Array[p][S][c](arguments)[0] == x ? window[T][b](q, Array[p][S][c](arguments)[h]()) : window[T][b](q, Array[p][S][c](arguments))
		}, this[C] = function(e) {
			j[y][k] !== undefined && j[y][k][L].apply(this, arguments)
		}, this[A] = function(e) {
			j[y][O] !== undefined && j[y][O][L].apply(this, arguments)
		}, this[L] = function(e, t) {
			j[y][e] !== undefined ? j[y][e][L](t) : j[b][N]("Received message for channel not subscribed to. Channel: " + e + " Message: " + t)
		}, this[M] = {}, this[M].onOpen = function(e) {
			j[d] = j[u], j.retries = 0, j.sendHandshake(), j[C]("connected", {
				message: "Connected to " + j.url
			})
		}, this[M].onClose = function(e) {
			var t = j[d] != j[f];
			j[d] = j[l], j[C]("disconnected", {
				message: "Disconnected from " + j.url
			}), t && j.retry()
		}, this[M].onError = function(e) {
			j[b][w]("Error", e), j[d] = j[l], j[C]("connection-failure", {
				message: "Received error: " + e
			})
		}, this[M][_] = function() {
			j[d] = j[a];
			var e = [];
			for (var t in j[y]) j.isInternalChannel(t) || e.push(t);
			j.sendSetSubscriptions(e), j[C](D)
		}, this[M].onMessage = function(e) {
			j[C]("raw-recv", {
				data: e
			});
			try {
				var t = JSON.parse(e.data),
					n = t[0],
					r = t[1]
			} catch (i) {
				j[b][w]("Unable to parse message:", e, i);
				return
			}
			switch (n) {
				case D:
					j[M][_]();
					break;
				case "error-message":
					j[C](n, r), j.disconnect(s);
					break;
				case "handshake-reject":
				case "subscriptions-changed":
					j[C](n, r);
					break;
				case P:
					try {
						r[P] = JSON.parse(r[P])
					} catch (i) {
						j[b][w]("Unable to parse payload in message:", r[P]);
						return
					}
					var o = r[H].indexOf("user:") !== -1;
					o ? (r[H] = O, j[A](r[P])) : j[L](r[H], r[P]), j[C](P, r);
					break;
				default:
					j[b][w]("Unhandled message type:", n, t)
			}
		}, this.retryDelays = [1e3, 1e3, 3e3, 1e4, 2e4, 6e4, 6e4], this.retries = 0, this.url = e, this.sockJs = g, this.internal = {
			guid: U,
			setDebugMode: function(e) {
				if (!z()) return;
				var t = window[v].getItem(I),
					n = W(t);
				n[N] = e, window[v][m](I, JSON.stringify(n))
			}
		};
		for (var X in i) F[X] = i[X];
		this[B] = F;
		if (z()) {
			var V = W(window[v].getItem(I));
			if (V)
				for (var X in V) this[B][X] = V[X]
		}
		if (this[B][N]) j.subscribe(k).bind(function(e, t) {
			window[T][b]("BP event", e, t)
		});
		else {
			var $ = function() {};
			this[b] = {
				error: $,
				info: $,
				warn: $,
				debug: $
			}
		}
		return this[B].clientId == g && (this[B].clientId = R()), i = g, this
	},
	function() {
		var e = "send",
			t = "prototype",
			n = "sockJs";
		Beaconpush[t][e] = function(t, r) {
			this[n] && this[n].readyState == SockJS.OPEN && (this[n][e](JSON.stringify([t, r])), this.triggerInternal("raw-send", [t, r]))
		}, Beaconpush[t].sendSubscribe = function(t) {
			this[e]("subscribe-request", {
				subscriptions: [t]
			})
		}, Beaconpush[t].sendUnsubscribe = function(t) {
			this[e]("unsubscribe-request", {
				subscriptions: [t]
			})
		}, Beaconpush[t].sendSetSubscriptions = function(t) {
			t.length > 0 && this[e]("set-subscriptions-request", {
				subscriptions: t
			})
		}, Beaconpush[t].sendHandshake = function() {
			this[e]("handshake-request", {
				operatorId: this.operatorId,
				userId: this.userId,
				token: this.token,
				clientVersion: this.VERSION.toString()
			})
		}
	}(), Beaconpush.prototype.isInternalChannel = function(e) {
		return e.indexOf("bp:") != -1 || e.indexOf("user:") != -1
	}, Beaconpush.prototype.connect = function() {
		if (this.sockJs && this.sockJs.readyState == SockJS.OPEN) {
			this.log.debug("Cannot connect(), already connected.");
			return
		}
		this.reconnect()
	}, Beaconpush.prototype.disconnect = function(e) {
		e = typeof e == "undefined" ? !0 : e, e || (this.state = this.DISCONNECTING), this.sockJs && this.sockJs.close()
	}, Beaconpush.prototype.subscribe = function(e) {
		return !this.isInternalChannel(e) && this.state == this.CONNECTED && this.sendSubscribe(e), this.ensureSubscription(e)
	}, Beaconpush.prototype.unsubscribe = function(e) {
		var t = "sendUnsubscribe",
			n = "subscriptions";
		if (e == "*") {
			this.clearSubscriptions(), this[t]("*");
			return
		}
		if (!(e in this[n])) return;
		this[n][e].unbind(), delete this[n][e], this.isInternalChannel(e) || this[t](e)
	}, Beaconpush.prototype.setSubscriptions = function(e, t) {
		if (typeof t == "undefined") throw new Error("No listener supplied!");
		this.clearSubscriptions();
		for (var n = 0; n < e.length; n++) this.ensureSubscription(e[n]).unbind().bind(t);
		this.sendSetSubscriptions(e)
	}, Beaconpush.prototype.reconnect = function() {
		var e = "sockJs",
			t = "callbacks";
		if (this.state != this.DISCONNECTED) {
			this.log.error("Cannot reconnect. Must be DISCONNECTED, current state", this.state);
			return
		}
		this.state = this.CONNECTING;
		try {
			this[e] && (this[e].onopen = this[e].onclose = this[e].onerror = this[e].onmessage = function() {});
			var n = this.options.debug,
				r = this.options.protocolWhitelist;
			this[e] = new SockJS(this.url, null, {
				protocols_whitelist: r,
				debug: n,
				devel: n
			}), this[e].onopen = this[t].onOpen, this[e].onclose = this[t].onClose, this[e].onerror = this[t].onError, this[e].onmessage = this[t].onMessage, this.triggerInternal("connecting", {
				message: "Connecting to " + this.url
			})
		} catch (i) {
			this.log.error("Error creating SockJS object", i)
		}
	}, Beaconpush.prototype.retry = function() {
		var e = "retryDelays",
			t = "retries",
			n = "triggerInternal",
			r = this[e].length;
		if (this[t] >= r) {
			this[n]("retry-ended", {
				message: r + " retries attempted. Giving up."
			});
			return
		}
		var i = this[e][this[t]],
			s = this;
		setTimeout(function() {
			s.reconnect()
		}, i), this[n]("retry-started", {
			timeout: i,
			message: "Retrying in " + i / 1e3 + " seconds"
		}), this[t]++
	}, Beaconpush.prototype.clearSubscriptions = function() {
		var e = "subscriptions";
		for (var t in this[e]) this.isInternalChannel(t) || (this[e][t].unbind(), delete this[e][t])
	}, Beaconpush.prototype.ensureSubscription = function(e) {
		var t = "subscriptions",
			n = "length",
			r = "_callbacks";
		if (e in this[t]) return this[t][e];
		var i = {
			channel: e,
			_callbacks: {},
			bind: function(e, t) {
				arguments[n] == 1 && (t = e, e = "*");
				var s = i[r] || (i[r] = {}),
					o = i[r][e] || (i[r][e] = []);
				return o.push(t), this
			},
			unbind: function(e, t) {
				var s;
				if (!e) i[r] = {};
				else if (s = i[r])
					if (!t) s[e] = [];
					else {
						var o = s[e];
						if (!o) return i;
						for (var u = 0, a = o[n]; u < a; u++)
							if (t === o[u]) {
								o.splice(u, 1);
								break
							}
					}
				return this
			},
			trigger: function(e) {
				var t, s, o, u;
				if (!(s = i[r])) return i;
				if (t = s[e])
					for (o = 0, u = t[n]; o < u; o++) t[o].apply(this, Array.prototype.slice.call(arguments, 1));
				if (t = s["*"])
					for (o = 0, u = t[n]; o < u; o++) t[o].apply(i, arguments);
				return this
			}
		};
		return this[t][e] = i, i
	};