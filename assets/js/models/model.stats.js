var _ = require("underscore"),
	BL = require("backbone-helper");
(function(e, t, n) {
	var r = Backbone.Model.extend({
		defaults: {
			hasPlayed: !0
		}
	});
	n.extend(BL.backbone.model_definitions, {
		stats_model: r,
		stats_friend_model: r
	})
})(window, jQuery, _);