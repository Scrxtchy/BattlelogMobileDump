var _ = require("underscore"),
	BL = require("backbone-helper");
(function(e, t, n) {
	var r = Backbone.Model.extend({
		defaults: {
			loading: !0
		},
		parse: function(e) {
			return typeof e.data != "undefined" && (e = e.data), e.loading = !1, e
		}
	});
	n.extend(BL.backbone.model_definitions, {
		items_list_model: r,
		items_list_friend_model: r
	})
})(window, jQuery, _);