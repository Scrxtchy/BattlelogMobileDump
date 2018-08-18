var locale = require("locale"),
	util = require("util"),
	gamedata = {
		bf3: {
			items: require("gamedata/bf3/items"),
			classes: require("gamedata/bf3/classes")
		}
	};
exports.get_bf3_upcomingUnlock_data = function(e) {
	var t = "weaponUnlock",
		n = "category",
		r = "weapons",
		i = "unlockInfo",
		s = "itemInfo",
		o = "gadgetsLocale",
		u = "items",
		a = "unlockId",
		f = "name",
		l = "image",
		c = "imageType",
		h = "item",
		p = "weaponAddonUnlock",
		d = "weaponaccessory",
		v = "vehicleAddonUnlock",
		m = "vehicleunlocks",
		g = "soldierSpecializationUnlock",
		y = "soldierspecializations",
		b = "kitItemUnlock",
		w = "kititems",
		E = "appearanceUnlock",
		S = "appearance",
		x = "dogTagUnlock",
		T = {};
	if (e[t]) {
		T[n] = r, T[i] = e[t], T[s] = gamedata.bf3[u][o][r][T[i][a]];
		if (!T[s]) return;
		T[f] = T[s][f], T[l] = T[s][l], T[c] = h
	} else if (e[p]) {
		T[n] = d, T[i] = e[p], T[s] = gamedata.bf3[u][o][d][T[i][a]];
		if (!T[s]) return;
		T[f] = T[s][f], T[l] = T[s][l], T[c] = h
	} else if (e[v]) {
		T[n] = m, T[i] = e[v], T[s] = gamedata.bf3[u][o][m][T[i][a]];
		if (!T[s]) return;
		T[f] = T[s][f], T[l] = T[s][l], T[c] = h
	} else if (e[g]) {
		T[n] = y, T[i] = e[g], T[s] = gamedata.bf3[u][o][y][T[i][a]];
		if (!T[s]) return;
		T[f] = T[s][f], T[l] = T[s][l], T[c] = h
	} else if (e[b]) {
		T[n] = w, T[i] = e[b], T[s] = gamedata.bf3[u][o][w][T[i][a]];
		if (!T[s]) return;
		T[f] = T[s][f], T[l] = T[s][l], T[c] = h
	} else if (e[E]) {
		T[n] = S, T[i] = e[E], T[s] = gamedata.bf3[u][o][S][T[i][a]];
		if (!T[s]) return;
		T[f] = T[s][f], T[l] = T[s][l], T[c] = "camo"
	} else {
		if (!e[x]) return;
		T[i] = e[x], T[f] = T[i].nameSID, T[l] = T[i][l], T[c] = "dogtag"
	}
	return T
}, exports.bf3_unlockData_image = function(e) {
	return $('<span class="item-image ' + e.imageType + " _" + e.image + '"></span>')
}, exports.bf3_upcomingUnlock_row = function(e, t) {
	var n = "unlockedBy",
		r = "unlockType",
		i = "<strong>",
		s = "actualValue",
		o = "</strong>",
		u = "valueNeeded",
		a = "award",
		f = "formatStatValue",
		l = "classes",
		c = "vehicleCategory",
		h = "</div>",
		p = "append",
		d = exports.get_bf3_upcomingUnlock_data(e);
	if (!d) return;
	var v = d.unlockInfo,
		m;
	if (t && v[n]) {
		if (v[n][r] == "license") return;
		if (v[n][r] == "rank") m = locale.t("ID_MOBILE_UNLOCKS_PROGRESS_RANK", {
			value: i + v[n][s] + o,
			valueNeeded: v[n][u]
		});
		else if (v[n][r] == a) {
			if (!v[n][a] || v[n][a].awardGroup != "AwardGroup_Mission") return;
			m = locale.t("ID_MOBILE_UNLOCKS_PROGRESS_ASSIGNMENT", {
				name: locale.t(v[n][a].stringID)
			})
		} else if (v[n][r] == "weapon") {
			var g = gamedata.bf3.items.gadgetsLocale.weapons[v.weaponCode];
			m = locale.t("ID_MOBILE_UNLOCKS_PROGRESS_WEAPON_KILLS", {
				value: i + util[f](v[n][s]) + o,
				valueNeeded: util[f](v[n][u]),
				weaponName: locale.t(g.name)
			})
		} else {
			if (v[n][r] != "bucket") return;
			if (v[n].codeNeeded == "sc_coop") m = locale.t("ID_MOBILE_UNLOCKS_PROGRESS_COOP_SCORE", {
				value: i + util[f](v[n][s]) + o,
				valueNeeded: util[f](v[n][u])
			});
			else if (e.kit) {
				var y = "ID_WEB_COMMON_UNKNOWN";
				gamedata.bf3[l].kitMap[e.kit] && (y = gamedata.bf3[l].kitMap[e.kit].nameSID), m = locale.t("ID_MOBILE_UNLOCKS_PROGRESS_KIT_SCORE", {
					value: i + util[f](v[n][s]) + o,
					valueNeeded: util[f](v[n][u]),
					kitName: locale.t(y)
				})
			} else {
				if (!v[c]) return;
				m = locale.t("ID_MOBILE_UNLOCKS_PROGRESS_VEHICLECATEGORY_SCORE", {
					value: i + util[f](v[n][s]) + o,
					valueNeeded: util[f](v[n][u]),
					vehicleCategoryName: v[c]
				})
			}
		}
	}
	var b = $('<div class="statitem unlock"><div class="image"></div><div class="info"></div>' + h),
		w = b.children(".image");
	w[p](exports.bf3_unlockData_image(d)), e.kit && gamedata.bf3[l].soldierKits.indexOf(e.kit) != -1 && w[p]('<span class="kit-icon ' + util.kitEnum_to_kitName(e.kit) + '"></span>');
	var E = b.children(".info");
	return E[p]('<div class="name">' + locale.t(d.name) + h), t && (E[p]('<div class="progressbar"><div style="-webkit-transform: scaleX(' + v[n].completion / 100 + ');"></div></div>'), E[p]('<div class="progress">' + m + h), b.addClass("progress")), b
}, exports.bf3_weaponUnlock_row = function(e) {
	var t = "</div>",
		n = "append",
		r = "valueNeeded",
		i = "completion",
		s = "formatStatValue",
		o = $('<div class="statitem unlock"><div class="image"></div><div class="info"></div>' + t),
		u = o.find(".image");
	u[n]('<span class="item-image item _' + e.image + '"></span>');
	var a = o.find(".info");
	a[n]('<div class="name">' + locale.t(e.nameSID) + t);
	if (e[r] && e[i] < 100) {
		o.addClass("locked");
		var f = e[i] / 100;
		a[n]('<div class="progressbar compact"><div style="-webkit-transform:scaleX(' + f + ');"></div></div>'), a[n]('<div class="progress"><strong>' + util[s](e.valueActual) + "</strong> / " + util[s](e[r]) + " " + locale.t("ID_WEB_COMMON_KILLS").toLowerCase() + t)
	}
	return o
}, exports.bf3_vehicleUnlock_row = function(e) {
	var t = "</div>",
		n = "append",
		r = "valueNeeded",
		i = "unlockedBy",
		s = "completion",
		o = "unlockType",
		u = "formatStatValue",
		a = "award",
		f = gamedata.bf3.items.gadgetsLocale.vehicleunlocks[e.unlockId];
	if (!f) return;
	var l = $('<div class="statitem unlock"><div class="image"></div><div class="info"></div>' + t),
		c = l.find(".image");
	c[n]('<span class="item-image item _' + f.image + '"></span>');
	var h = l.find(".info");
	h[n]('<div class="name">' + locale.t(f.name) + t);
	if (e[i][r] && e[i][s] < 100) {
		l.addClass("locked");
		var p = e[i][s] / 100;
		h[n]('<div class="progressbar compact"><div style="-webkit-transform:scaleX(' + p + ');"></div></div>'), e[i][o] == "bucket" ? h[n]('<div class="progress"><strong>' + util[u](e[i].actualValue) + "</strong> / " + util[u](e[i][r]) + t) : e[i][o] == a && e[i][a] && e[i][a].awardGroup == "AwardGroup_Mission" && h[n]('<div class="progress">' + locale.t("ID_MOBILE_UNLOCKS_PROGRESS_ASSIGNMENT", {
			name: locale.t(e[i][a].stringID)
		}) + t)
	}
	return l
};