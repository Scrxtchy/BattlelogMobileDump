"use strict";
var invariant = function(e, t, n, r, i, s, o, u) {
	if (!e) {
		var a;
		if (t === undefined) a = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
		else {
			var f = [n, r, i, s, o, u],
				l = 0;
			a = new Error("Invariant Violation: " + t.replace(/%s/g, function() {
				return f[l++]
			}))
		}
		throw a.framesToPop = 1, a
	}
};
module.exports = invariant;