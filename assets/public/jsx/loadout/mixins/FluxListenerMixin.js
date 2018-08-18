// ===============================================================
// WATCH OUT! THIS FILE IS COPIED FROM THE BFA LOADOUT 
// PLEASE CHANGE THE BFA LOADOUT AND RUN THE PIPELINE (omaha_loaduout_import.py ) INSTEAD OF EDITING HERE...
// Also note that files in loadoutmobile/ will be copied last and overwriting BFA loadout content...
// ===============================================================






// 

// ^^ You did read that right?


var React = require("react");
var invariant = require('react/lib/invariant');
var Reflux = require('reflux');

// Inspired from Fluxxors StoreWatchMixin
var FluxListenerMixin = function() {
	var stores = Array.prototype.slice.call(arguments);
	return {
		mixins: [Reflux.ListenerMixin],

		getInitialState: function() {
			invariant(this.getStateFromStore, "FluxListenerMixin used in component " + this.constructor.displayName +
				" but " + this.constructor.displayName + " does not define a method named getStateFromStore.");

			return this.getStateFromStore();
		},

		onStoreChange: function() {
			this.setState(this.getStateFromStore());
		},

		componentDidMount: function() {
			var self = this;
			_.each(stores, function(store) {
				self.listenTo(store, self.onStoreChange);
			});
		}
	};
};

module.exports = FluxListenerMixin;