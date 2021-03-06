var _ = require("underscore"),
	BL = require("backbone-helper");
(function(e, t, n) {
	var r = "dogtags",
		i = Backbone.Model.extend({
			defaults: {
				loading: !0
			},
			parse: function(e) {
				return e = e.data || e, e.loading = !1, e.basic = e.basic || {
					index: 0,
					imageConfig: {
						category: r,
						slug: "basic0"
					}
				}, e.advanced = e.advanced || {
					index: 0,
					imageConfig: {
						category: r,
						slug: "advanced0"
					}
				}, e
			}
		});
	n.extend(BL.backbone.model_definitions, {
		dogtags_model: i,
		dogtags_friend_model: i
	})
})(window, jQuery, _);