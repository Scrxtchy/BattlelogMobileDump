// ===============================================================
// WATCH OUT! THIS FILE IS COPIED FROM THE BFA LOADOUT 
// PLEASE CHANGE THE BFA LOADOUT AND RUN THE PIPELINE (omaha_loaduout_import.py ) INSTEAD OF EDITING HERE...
// Also note that files in loadoutmobile/ will be copied last and overwriting BFA loadout content...
// ===============================================================






// 

// ^^ You did read that right?


/** @jsx React.DOM */
var React = require('react');
var helpers = require("js/../public/jsx/loadout/helpers.js");


var ItemDetailsStats = React.createClass({
	displayName: 'ItemDetailsStats',
	getDefaultProps: function() {
		return {
			statKeys: ["fireModeSingle", "fireModeBurst", "fireModeAuto"],
			modeName: ["single", "burst", "auto"]
		};
	},

	render: function() {
		var firstRowNode = null;

		if (this.props.weaponData.rateOfFire) {
			var fireModeIconNodes = [];

			_.each(this.props.statKeys, function(statKey, i) {
				var classes = {
					"firemode-icon": true,
					"disabled": !this.props.weaponData[statKey]
				};
				classes[this.props.modeName[i]] = true;

				var cx = React.addons.classSet(classes);

				fireModeIconNodes.push(React.createElement("div", {
					className: cx,
					key: i
				}));
			}, this);

			var rateOfFire = this.props.weaponData.rateOfFire;
			rateOfFire = helpers.startswith(rateOfFire, "BFH_") ? helpers.locale(rateOfFire) : rateOfFire;

			firstRowNode = (
				React.createElement("tr", {
						className: "item-extended-stats"
					},
					React.createElement("td", null,
						React.createElement("p", {
							className: "title"
						}, helpers.locale("ID_WEB_PROFILE_STATS_RATEOFFIRE")),
						React.createElement("p", null, rateOfFire)
					),
					React.createElement("td", null,
						React.createElement("p", {
							className: "title"
						}, helpers.locale("ID_COMMON_FIREMODES")),

						React.createElement("div", {
								className: "fire-modes"
							},
							fireModeIconNodes
						)
					)
				)
			);
		} else {
			firstRowNode = (
				React.createElement("tr", {
						className: "item-extended-stats full"
					},
					React.createElement("td", {
							colSpan: "2"
						},
						React.createElement("p", {
							className: "title"
						}, helpers.locale("ID_WEB_PROFILE_STATS_RATEOFFIRE")),
						React.createElement("p", null, this.props.weaponData.fireModeString)
					)
				)
			);
		}

		return (
			React.createElement("table", {
					className: "item-details table"
				},
				React.createElement("tbody", null,
					firstRowNode,

					React.createElement("tr", {
							className: "item-extended-stats"
						},
						React.createElement("td", {
								colSpan: "2"
							},
							React.createElement("p", {
								className: "title"
							}, helpers.locale("ID_WEB_COMMON_MAGAZINE_SIZE")),
							React.createElement("p", null, this.props.weaponData.ammo)
						)
					)
				)
			)
		);
	}
});

module.exports = ItemDetailsStats;