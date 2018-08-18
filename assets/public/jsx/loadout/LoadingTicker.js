// ===============================================================
// WATCH OUT! THIS FILE IS COPIED FROM THE BFA LOADOUT 
// PLEASE CHANGE THE BFA LOADOUT AND RUN THE PIPELINE (omaha_loaduout_import.py ) INSTEAD OF EDITING HERE...
// Also note that files in loadoutmobile/ will be copied last and overwriting BFA loadout content...
// ===============================================================






// 

// ^^ You did read that right?


/** @jsx React.DOM */
var React = require('react');

var LoadingTicker = React.createClass({
	displayName: 'LoadingTicker',
	render: function() {
		return (
			React.createElement("div", {
				className: "loadout-loader loader small"
			})
		);
	}
});

module.exports = LoadingTicker;