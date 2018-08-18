require.config({
	baseUrl: "js/",
	paths: {
		text: "lib/cajon-text"
	},
	waitSeconds: 20,
	enableCache: !1,
	enableUpdates: !1,
	enableUpdatesCache: !1,
	updatesVersion: "2.0.0"
}), require(["lib/cajon-loader"], function() {
	require(["main_web"])
});