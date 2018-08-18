function LeaderboardsMapViewController(e) {
	var t = null;
	this._name = "LeaderboardsMapView", this._section = t, this.game = session.getActiveGame(), this.map = t, RefreshableViewController.call(this, e), this.pullToRefresh = !0, this.refreshButton = !1, this.geolocation = t, this.marker = t, this.game == enums.Game.OMAHA && (this.additionalStylesheetSection = this.gameName), this.title = locale.t("ID_MOBILE_LEADERBOARDS_LOCATION_SETUP"), this.scrollViewTemplate = "LeaderboardsMapView-scrollviewcontent"
}
var mapbox = require("lib/mapbox"),
	app = require("app"),
	assets = require("assets"),
	web = require("web"),
	util = require("util"),
	dom = require("dom"),
	locale = require("locale"),
	session = require("session"),
	enums = require("enums"),
	RefreshableViewController = require("controllers/RefreshableViewController");
module.exports = LeaderboardsMapViewController, LeaderboardsMapViewController.prototype = new RefreshableViewController, LeaderboardsMapViewController.prototype.constructor = LeaderboardsMapViewController, LeaderboardsMapViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	RefreshableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, LeaderboardsMapViewController.prototype.viewDidAppear = function() {
	var e = this;
	RefreshableViewController.prototype.viewDidAppear.call(e), e.refresh()
}, LeaderboardsMapViewController.prototype.viewDidLoad = function() {
	var e = "scrollView",
		t = this;
	RefreshableViewController.prototype.viewDidLoad.call(t), t.$messages = $('<div class="messages"></div>'), t[e].$content.prepend(t.$messages);
	var n = this.game == enums.Game.OMAHA ? locale.t("ID_MOBILE_LEADERBOARDS_MAP_HEADLINE_OMAHA") : locale.t("ID_MOBILE_LEADERBOARDS_MAP_HEADLINE");
	t[e].$content.find("#leaderboard-title").html(n), t.bindEvents()
}, LeaderboardsMapViewController.prototype.bindEvents = function() {
	var e = "geolocation",
		t = "animate",
		n = "#bottomcontrols",
		r = "easeOutCubic",
		i = "#topinfo",
		s = "-200px",
		o = "easeInCubic",
		u = this;
	u.$(".button.setlocation").addClick(function() {
		u[e] && u.map.setView({
			lat: u[e].coords.latitude,
			lng: u[e].coords.longitude
		}, 3, {
			animate: !0
		}), $("#leaderboards-container").fadeOut(function() {
			$(n)[t]({
				bottom: "0px"
			}, 400, r), $(i)[t]({
				top: "0px"
			}, 400, r)
		})
	}), u.$(".button.continue").addClick(function() {
		$(n)[t]({
			bottom: s
		}, 400, o), $(i)[t]({
			top: s
		}, 400, o, function() {
			var e = u.map.getCenter();
			app.go("LeaderboardsPrivacyViewController", {
				lat: e.lat,
				lng: e.lng
			}, function() {
				u.navigationController.removeView(u)
			})
		})
	})
}, LeaderboardsMapViewController.prototype.resetView = function(e) {
	var t = "-200px",
		n = "geolocation",
		r = this;
	$("#bottomcontrols").css("bottom", t), $("#topinfo").css("top", t), $("#leaderboards-container").fadeIn(), $("#geomap").length != 0 && (r[n] ? r.map.setView({
		lat: r[n].coords.latitude,
		lng: r[n].coords.longitude
	}, 3, {
		animate: !0
	}) : r.map.setView({
		lat: 30,
		lng: 10
	}, 3))
}, LeaderboardsMapViewController.prototype.refresh = function(e) {
	var t = "isLoading",
		n = !0,
		r = "geolocation",
		i = "length",
		s = !1,
		o = "map",
		u = "getCenter",
		a = "totalUserCount",
		f = "#bottomcontrols h3",
		l = "marker";
	e || (e = function() {});
	var c = this;
	if (c[t]) return e("BUSY");
	c[t] = n, c.lastRefresh = new Date, c.$messages.empty(), c.resetView(), navigator[r] && navigator[r].getCurrentPosition(function(e) {
		c[r] = e
	});
	if ($("#geomap")[i] == 0) {
		var h = $("<div>").attr("id", "geomap");
		$("#mapcontainer").append(h);
		var p = c[r] ? c[r].latitude : 30,
			d = c[r] ? c[r].longitude : 10,
			v = {
				zoomControl: s,
				attributionControl: s,
				dragging: n,
				scrollWheelZoom: n,
				doubleClickZoom: n,
				center: [p, d],
				zoom: 2,
				worldCopyJump: n,
				personaId: null
			};
		c[o] = L.mapbox[o](h[0], "blmb.map-v0obm9v6", v), c[o].whenReady(function() {
			c[o].on("load", function(e) {
				c[o].setZoom(3)
			}), c[o].on("moveend", function(e) {
				var t = c[o][u]();
				web.request("getleaderboardsbylocation", {
					game: c.game,
					platform: enums.Platform.PC,
					lat: t.lat,
					lng: t.lng
				}, function(e, t) {
					var n = "";
					for (var r in t) t[r].area.name.substring(0, 3) == "ID_" && (t[r].area.name = locale.t(t[r].area.name.replace("ID_", "ID_MOBILE_"))), n += t[r].area.name, r < t[i] - 1 && (n += ", ");
					$("#bottomcontrols h2").html(n), t && t[i] > 0 && t[0][a] ? $(f).html("" + t[0][a] + " players") : $(f).html("")
				})
			});
			var e = L.Icon.extend({
				options: {
					iconUrl: "images/warsaw/leaderboards/crosshair.png",
					iconSize: [58, 58],
					iconAnchor: [29, 29]
				}
			});
			c[o].on("move", function() {
				c[l] || (c[l] = L[l](c[o][u](), {
					icon: new e
				}), c[l].setZIndexOffset(1e3), c[l].addTo(c[o]));
				var t = c[o][u]();
				c[l].setLatLng(t)
			})
		})
	}
	c[t] = s
};