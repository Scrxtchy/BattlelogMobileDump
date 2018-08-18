function PremiumItemViewController(e) {
	this._name = "PremiumItemView", this.item = null, ScrollableViewController.call(this, e), this.titleSID = "ID_MOBILE_PREMIUM_ITEM_TITLE"
}
var locale = require("locale"),
	util = require("util"),
	web = require("web"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = PremiumItemViewController, PremiumItemViewController.prototype = new ScrollableViewController, PremiumItemViewController.constructor = PremiumItemViewController, PremiumItemViewController.prototype.viewDidLoad = function() {
	var e = "detailImageUrl",
		t = "item",
		n = "find",
		r = "$content",
		i = ".image",
		s = "startDate",
		o = "formatDate",
		u = "dateshort",
		a = "date",
		f = "endDate",
		l = this,
		c = l[t][e] ? l[t][e] : l[t].timelineImageUrl;
	l[r][n](i).css("background-image", "url(" + c + ")"), l[r][n](".title").text(l[t].title);
	var h = "";
	l[t][s] && (l[t].isStartDateShort ? h = util[o](new Date(l[t][s] * 1e3), u) : h = util[o](new Date(l[t][s] * 1e3), a)), l[t][f] && (l[t].isEndDateShort ? h += " - " + util[o](new Date(l[t][f] * 1e3), u) : h += " - " + util[o](new Date(l[t][f] * 1e3), a)), l[r][n](".date").text(h), l[r][n](".description").html(l[t].description.nl2br()), l[t].type == 4 && l[t].videoMobileUrl && (new Date(l[t][s] * 1e3)).getTime() < (new Date).getTime() && web.request("premiumvideo", {
		platform: 1,
		region: "us",
		language: 1,
		startDate: l[t][s]
	}, function(e, s) {
		if (e) return;
		var o = $('<video controls="controls" poster="' + l[t].imageUrl + '">' + '<source src="' + s.videoMobileUrlWithToken + '" type="video/mp4">' + "</video>");
		l[r][n](i).empty().append(o)
	})
};