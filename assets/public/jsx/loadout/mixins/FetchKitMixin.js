// ===============================================================
// WATCH OUT! THIS FILE IS COPIED FROM THE BFA LOADOUT 
// PLEASE CHANGE THE BFA LOADOUT AND RUN THE PIPELINE (omaha_loaduout_import.py ) INSTEAD OF EDITING HERE...
// Also note that files in loadoutmobile/ will be copied last and overwriting BFA loadout content...
// ===============================================================






// 

// ^^ You did read that right?


var React = require("react");
var client = require("js/../public/jsx/loadout/client.js");
var store = require("js/../public/jsx/loadout/store.js");

var FetchKitMixin = {
	propTypes: {
		kitIndex: React.PropTypes.number.isRequired,
		personaId: React.PropTypes.string.isRequired,
		platform: React.PropTypes.string.isRequired
	},

	getStateFromStore: function(newProps) {
		var kitIndex = newProps && !_.isNull(newProps.kitIndex) ? newProps.kitIndex : this.props.kitIndex;

		return {
			kit: store.getKit(kitIndex),
			cashBalance: store.getCashBalance(),
			vouchersCount: store.getVoucherCount(),
			focusedFaction: store.getFocusedFaction()
		};
	},

	componentWillReceiveProps: function(newProps) {
		this.setState(this.getStateFromStore(newProps));
	},

	componentDidMountOrUpdate: function() {
		if (!this.state.kit) {
			client.fetchKit(
				this.props.personaId,
				this.props.platform,
				this.props.kitIndex
			);
		}
	},

	componentDidMount: function() {
		this.componentDidMountOrUpdate();
	},
	componentDidUpdate: function() {
		this.componentDidMountOrUpdate();
	}
};

module.exports = FetchKitMixin;