var _ = require("underscore"),
	BL = require("backbone-helper");
(function(e, t, n) {
	var r = Backbone.Model.extend({
		defaults: {
			loading: !0
		},
		parse: function(e) {
			return e = e.data || e, e.loading = !1, e
		}
	});
	n.extend(BL.backbone.model_definitions, {
		tracking_model: r
	})
})(window, jQuery, _);