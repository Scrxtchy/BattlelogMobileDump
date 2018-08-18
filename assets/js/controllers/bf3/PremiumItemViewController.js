function PremiumItemViewController(e) {
	this._name = "PremiumItemView", this._section = "bf3", this.item = null, ScrollableViewController.call(this, e), this.title = "Premium Item"
}
var locale = require("locale"),
	util = require("util"),
	web = require("web"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = PremiumItemViewController, PremiumItemViewController.prototype = new ScrollableViewController, PremiumItemViewController.constructor = PremiumItemViewController, PremiumItemViewController.prototype.viewDidLoad = function() {
	var e = "find",
		t = "$content",
		n = "item",
		r = "startDate",
		i = "formatDate",
		s = "dateshort",
		o = "date",
		u = "endDate",
		a = this;
	a[t][e](".image img").attr("src", a[n].imageUrl), a[t][e](".title").text(a[n].title);
	var f = "";
	a[n][r] && (a[n].isStartDateShort ? f = util[i](new Date(a[n][r] * 1e3), s) : f = util[i](new Date(a[n][r] * 1e3), o)), a[n][u] && (a[n].isEndDateShort ? f += " - " + util[i](new Date(a[n][u] * 1e3), s) : f += " - " + util[i](new Date(a[n][u] * 1e3), o)), a[t][e](".date").text(f), a[t][e](".description").html(a[n].description.nl2br()), a[n].type == 4 && a[n].videoMobileUrl && (new Date(a[n][r] * 1e3)).getTime() < (new Date).getTime() && web.request("premiumvideo", {
		platform: 1,
		region: "us",
		language: 1,
		startDate: a[n][r]
	}, function(r, i) {
		if (r) return;
		var s = $('<video controls="controls" poster="' + a[n].imageUrl + '">' + '<source src="' + i.videoMobileUrlWithToken + '" type="video/mp4">' + "</video>");
		a[t][e](".image").empty().append(s)
	})
};