require.config({
	'baseUrl': 'js/',
	'paths': {
		'text': 'lib/cajon-text'
	},
	'waitSeconds': 20,
	'enableCache': true,
	'enableUpdates': false
});

require(['lib/cajon-loader'], function() {
	require(['main_web']);
});