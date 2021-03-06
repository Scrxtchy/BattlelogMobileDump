function ReportAbuseViewController(e) {
	this._name = "ReportAbuseView", this.game = session.getActiveGame(), this.params = e, ScrollableViewController.call(this, e), this.titleSID = "ID_WEB_COMMON_REPORT_ABUSE"
}
var app = require("app"),
	locale = require("locale"),
	dom = require("dom"),
	device = require("device"),
	session = require("session"),
	enums = require("enums"),
	util = require("util"),
	web = require("web"),
	template = require("template"),
	receipt = require("receipt"),
	ScrollableViewController = require("controllers/ScrollableViewController");
module.exports = ReportAbuseViewController, ReportAbuseViewController.prototype = new ScrollableViewController, ReportAbuseViewController.prototype.constructor = ReportAbuseViewController, ReportAbuseViewController.prototype.loadView = function(e) {
	e || (e = function() {});
	var t = this;
	ScrollableViewController.prototype.loadView.call(t, function() {
		return e()
	})
}, ReportAbuseViewController.prototype.viewDidLoad = function() {
	var e = this;
	ScrollableViewController.prototype.viewDidLoad.call(e), e.bindEvents()
}, ReportAbuseViewController.prototype.bindEvents = function() {
	var e = "$content",
		t = "scrollView",
		n = "params",
		r = "disabled",
		i = "reason",
		s = "/",
		o = "showReceipt",
		u = "error",
		a = "ID_WEB_SHOWRECEIPT_ABUSE_REPORT_ERROR",
		f = this,
		l = f[t][e].find(".reportbtn").addClick(function(l) {
			app.log(f[n]);
			var c = {};
			$(this).addClass(r).attr(r, 1);
			var h = f[t][e].find("#reason").val(),
				p = f[n].type,
				d = "viewcontent/";
			switch (p) {
				case "forumpost":
					c[i] = h, d += "reportForumAbuse/" + f[n].postId + s;
					break;
				case "club":
					c[i] = h, d += "reportPlatoonAbuse/" + f[n].clubId + s;
					break;
				case "feedItem":
					var v = f[n].feeditem;
					c[i] = h, d += "reportFeedItemAbuse/" + v.id + s, v.commentId && (d += v.commentId);
					break;
				case "profile":
					c[i] = h, d += "reportProfileAbuse/" + f[n].profileId + s
			}
			web.requestToBattlelog(f.game, d, c, function(n, i) {
				$(this).removeClass(r).attr(r, 0);
				try {
					if (i.success && i.data.guid != 0) f[t][e].append(template.render("ReportAbuseReceipt", {
						guid: i.data.guid
					})), f[t][e].find(".reportcontainer").slideToggle();
					else switch (i.data.message) {
						case "TooManyReports":
							receipt[o](locale.t("ID_WEB_SHOWRECEIPT_TOO_MANY_REPORTS_ERROR"), u);
							break;
						case "AlreadyReported":
							receipt[o](locale.t("ID_WEB_SHOWRECEIPT_ABUSE_ALREADY_REPORTED"), u);
							break;
						case "NoReportReason":
							receipt[o](locale.t("ID_WEB_SHOWRECEIPT_ABUSE_REPORT_ERROR_EMPTY_REASON"), u);
							break;
						default:
							receipt[o](locale.t(a), u)
					}
				} catch (s) {
					app[u](s), receipt[o](locale.t(a), u)
				}
			})
		})
};