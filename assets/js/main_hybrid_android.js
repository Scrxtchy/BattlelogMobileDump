require.config({
	paths: {
		app: "app_hybrid_android",
		jquery: "lib/jquery",
		"jquery-transit": "lib/jquery.transit",
		"jquery-ui": "lib/jquery-ui",
		"touch-punch": "lib/touch-punch",
		backbone: "lib/backbone",
		"backbone-helper": "lib/backbone-helper",
		underscore: "lib/underscore",
		sockjs: "lib/sockjs",
		"beaconpush-client": "lib/beaconpush-client",
		dust: "lib/dust",
		mapbox: "lib/mapbox",
		fabricjs: "lib/fabric",
		emblemclass: "lib/emblemclass",
		tracker: "lib/tracker",
		react: "lib/react-with-addons",
		reflux: "lib/reflux",
		jsxtransformer: "lib/jsx-transformer",
		fastclick: "lib/fastclick"
	},
	shim: {
		jquery: {
			exports: "jQuery"
		},
		"jquery-transit": {
			deps: ["jquery"]
		},
		"jquery-ui": {
			deps: ["jquery"]
		},
		"touch-punch": {
			deps: ["jquery-ui"]
		},
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"backbone-helper": {
			deps: ["backbone"],
			exports: "BL"
		},
		sockjs: {
			exports: "SockJS"
		},
		"beaconpush-client": {
			deps: ["sockjs"],
			exports: "Beaconpush"
		},
		dust: {
			exports: "dust"
		},
		mapbox: {
			exports: "L"
		},
		tracker: {
			exports: "trackJs"
		}
	}
}), require(["jquery"], function() {
	var e = "trackJSOverride";
	require(["jquery-transit", "helpers/number", "helpers/string"], function() {
		require(["app", "config"], function(t, n) {
			t.init();
			var r = "7464ccf115674d2098deba77c70884b1";
			n[e] && (r = n[e]), window._trackJs = {
				customer: r
			}, require(["tracker"], function() {})
		})
	})
});