// ===============================================================
// WATCH OUT! THIS FILE IS COPIED FROM THE BFA LOADOUT 
// PLEASE CHANGE THE BFA LOADOUT AND RUN THE PIPELINE (omaha_loaduout_import.py ) INSTEAD OF EDITING HERE...
// Also note that files in loadoutmobile/ will be copied last and overwriting BFA loadout content...
// ===============================================================






// 

// ^^ You did read that right?


/** @jsx React.DOM */
var React = require("react");
var helpers = require("js/../public/jsx/loadout/helpers.js");

var HeaderSpendableInfo = React.createClass({
	displayName: 'HeaderSpendableInfo',
	render: function() {
		return (
			React.createElement("span", {
					className: "spendable-info"
				},
				React.createElement("span", {
						className: "cash"
					},
					helpers.locCurrency(this.props.cashBalance, "$")
				),

				React.createElement("span", {
						className: "vouchers"
					},
					(helpers.locale("ID_WEB_LOADOUT_VOUCHERS_COUNT")).replace("[X]", this.props.vouchersCount)
				)
			)
		);
	}
});

module.exports = HeaderSpendableInfo;