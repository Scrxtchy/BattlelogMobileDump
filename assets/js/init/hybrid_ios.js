require.config({
	'baseUrl': 'js/',
	'paths': {
		'text': 'lib/cajon-text'
	},
	'waitSeconds': 20,
	'enableCache': true,
	'enableUpdates': true,
	'enableUpdatesCache': true,
	'updatesVersion': '2.7.0_ios',
	'updatesURL': 'http://m.battlelog.battlefield.com/updates'
});

require(['lib/cajon-loader'], function() {
	require(['main_hybrid_ios']);
});