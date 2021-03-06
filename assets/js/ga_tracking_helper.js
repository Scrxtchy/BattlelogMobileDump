var app = require("app"),
	config = require("config");
module.exports = {
	GATrackingHelper: function(e) {
		e = e || {};
		var t = e.gaqId || config.gaId || !1,
			n = e.domainName || !1;
		if (!t) {
			app.log("No google analytics id given");
			return
		}
		var r = {
			_load: function() {
				var e = e || [];
				return e.push(["_setAccount", t]), n && e.push(["_setDomainName", n]),
					function() {
						var e = document.createElement("script");
						e.type = "text/javascript", e.async = !0, e.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js", document.getElementsByTagName("head")[0].appendChild(e)
					}(), this
			},
			trackPageview: function(e) {
				_gaq.push(["_trackPageview", e])
			}
		};
		return r._load()
	}
};