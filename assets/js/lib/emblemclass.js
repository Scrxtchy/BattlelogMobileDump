(function() {
	"use strict";
	var e = "undefined",
		t = "_cache",
		n = "emblemObjectsData",
		r = "assetsPath",
		i = "size",
		s = "presentedSize",
		o = "_multiplier",
		u = "controlsColor",
		a = "#353535",
		f = "controlsSize",
		l = "loaded",
		c = !1,
		h = "headless",
		p = "data",
		d = !0,
		v = "canvas",
		m = "length",
		g = "_objects",
		y = "opacity",
		b = "emblemObject",
		w = "get",
		E = "fill",
		x = "left",
		T = "width",
		N = "height",
		C = "angle",
		k = "flipX",
		L = "flipY",
		A = "selectable",
		O = "OBJECT_DEFAULTS",
		M = "apply",
		_ = "debug",
		D = "error",
		P = "prototype",
		H = "objects",
		B = "asset",
		j = "background",
		F = "setBackground",
		I = "renderObject",
		q = "indexOf",
		R = "render",
		U = "fetchShapeData",
		z = ".svg",
		W = null,
		X = "getFabricObject",
		V = "center",
		$ = "setCoords",
		J = typeof window !== e && typeof window.phantom === e,
		K = J && typeof Surface !== e,
		Q;
	J && (K ? Q = window.fabric : Q = require("fabricjs").fabric);
	var G = function() {
		function K(e, S, O, M) {
			var _ = this;
			this[t] = {}, this[n] = S, this[r] = O, this[i] = 320, this[s] = M || this[i], this[o] = this[s] / this[i], this[u] = a, this[f] = 12, this[l] = c, this[h] = c, this[p] = c, e || (this[h] = d, e = document.createElement(v)), this[v] = new Q.Canvas(e, {
				perPixelTargetFind: d,
				controlsAboveOverlay: d,
				selection: c
			}), this[v].setWidth(this[s]), this[v].setHeight(this[s]), J && this[v].observe("after:render", function() {
				if (!_[l]) return;
				var e;
				for (var t = 0; t < _[v][g][m]; t++) e = _[v][g][t], e[b][y] = e[w](y), e[b][E] = e[w](E), e[b][x] = e[w](x) / _[o], e[b].top = e[w]("top") / _[o], e[b][T] = e[w]("scaleX") * e[T] / _[o], e[b][N] = e[w]("scaleY") * e[N] / _[o], e[b][C] = e[w](C), e[b][k] = e[w](k), e[b][L] = e[w](L), e[b][A] = e[w](A)
			})
		}
		return K[O] = {
			left: 50,
			top: 50,
			angle: 0,
			width: 100,
			height: 100,
			opacity: 1,
			fill: a,
			flipX: c,
			flipY: c,
			selectable: d
		}, K.log = function() {
			typeof console !== e && console.log && console.log[M] && console.log[M](console, arguments)
		}, K[_] = function() {
			typeof console !== e && console[_] && console[_][M] && console[_][M](console, arguments)
		}, K.info = function() {
			typeof console !== e && console.info && console.info[M] && console.info[M](console, arguments)
		}, K[D] = function() {
			typeof console !== e && console[D] && console[D][M] && console[D][M](console, arguments)
		}, K[P].load = function(t, n) {
			function u() {
				G[_]("Emblem is now fully loaded and rendered."), J && r[v].observe("object:removed", function(e) {
					var t = e.target;
					G[_]("Object removed from emblem", t);
					var n = r[p][H][q](t[b]);
					r[p][H].splice(n, 1)
				}), r[v].deactivateAllWithDispatch(), r[R](), r[l] = d, n && n()
			}
			var r = this;
			G[_]("Emblem data to load", t);
			if (t == "" || arguments[m] === 0 || !t) t = {
				objects: []
			};
			typeof t == "object" ? r[p] = t : r[p] = JSON.parse(t), J && typeof S !== e && (r[p][H] = r[p][H].filter(function(e) {
				return !!S.globalContext.badgeParts[e[B]]
			})), r[p][j] && (G[_]("Setting background for emblem"), r[F](r[p][j]));
			if (!r[p][H][m]) return u(), this;
			G[_]("Starting rendering of emblem objects.");
			var i = 0;
			for (var s = 0; s < r[p][H][m]; s++) {
				var o = r[p][H][s];
				r[I](o, function() {
					i++, i === r[p][H][m] && u()
				})
			}
			return this
		}, K[P].loadLegacy = function(t, n) {
			var r = {
				objects: [],
				background: "#F4F4F4"
			};
			for (var i = 0; i < t[H][m]; i++) {
				var s = t[H][i],
					o = {};
				o[B] = s.partId, s[T] *= s.scaleX, s[N] *= s.scaleY, r[H].push(o);
				for (var u in K[O]) {
					if (!K[O].hasOwnProperty(u)) continue;
					o[u] = typeof s[u] === e ? K[O][u] : s[u]
				}
			}
			return typeof t[j] !== e && (r[j] = t[j]), this.load(r, n)
		}, K[P].createImage = function(e) {
			return this[v].deactivateAll(), this[v].toDataURL({
				format: "png",
				multiplier: e ? parseInt(e, 10) / this[i] : 1
			})
		}, K[P][U] = function(e, i) {
			G[_]("Fetching shape data for", e);
			if (this[t][e]) G[_]("Shape data was cached for", e), i && i(this[t][e]);
			else {
				var s = this;
				G[_]("Shape data was not cached for", e, "... fetching...");
				var o = function(n) {
						s[t][e] = n, i && i(s[t][e])
					},
					u;
				J ? (u = this[n][e].src + z, u = this[r].replace("%SRC%", u), G[_]("... Fetching client-side, path:", u), Q.util.request(u, {
					method: w,
					onComplete: function(e) {
						o(e.responseText)
					}
				})) : (u = this[r].replace("%SECTION%", this[n][e].sectionString), u += e + z, G[_]("... Fetching server-side, path:", u), fs.exists(u) ? o(fs.read(u)) : (G[D]("File does not exists, can not fetch it.", u), i && i(W)))
			}
		}, K[P][X] = function(e, t) {
			G[_]("Getting (fabric) object", e), this[U](e, function(n) {
				if (n === W) {
					t && t(W);
					return
				}
				Q.loadSVGFromString(n, function(n, r) {
					G[_]("Loaded SVG", e);
					var i = Q.util.groupSVGElements(n, r);
					i.hasRotatingPoint = d, i.originX = V, i.originY = V, i.padding = 14, G[_]("Object fully loaded", e, i), t && t(i)
				})
			})
		}, K[P][R] = function() {
			var e = this;
			return this[v][g].sort(function(t, n) {
				var r = e[p][H][q](t[b]),
					i = e[p][H][q](n[b]);
				return r - i
			}), this[v].renderAll(), this
		}, K[P][F] = function(e) {
			this[p][j] = e, this[v].backgroundColor = e, this[R]()
		}, K[P].setOverlay = function(e, t) {
			var n = this;
			G[_]("Setting overlay"), this[v].setOverlayImage(e, function() {
				G[_]("Set overlay image"), n[R](), t && t()
			})
		}, K[P][I] = function(e, t) {
			var n = this;
			return G[_]("Render object", e), this[X](e[B], function(r) {
				if (r === W) {
					G[_]("Could not get asset", e[B], "... Ignoring"), t && t(W);
					return
				}
				G[_]("Got (fabric)object", r, "... Adding it to canvas", e), r[b] = e, e[T] && e[N] ? r.set({
					scaleX: e[T] / r[T] * n[o],
					scaleY: e[N] / r[N] * n[o]
				})[$]() : r[T] > r[N] ? r.scaleToWidth(G[O][T] * n[o])[$]() : r.scaleToHeight(G[O][N] * n[o])[$](), e[x] && e.top ? r.set({
					left: e[x] * n[o],
					top: e.top * n[o]
				})[$]() : r.set({
					left: n[i] / 2,
					top: n[i] / 2
				})[$](), r.set({
					opacity: e[y],
					fill: e[E],
					angle: e[C],
					flipX: e[k],
					flipY: e[L],
					selectable: e[A],
					borderColor: n[u],
					cornerColor: n[u],
					cornerSize: n[f],
					transparentCorners: c,
					rotatingPointOffset: 16 + n[f]
				})[$](), n[v].add(r), n[R](), t && t(r)
			}), this
		}, K[P].toJson = function() {
			return JSON.stringify(this[p])
		}, K[P].createObject = function(t, n, r) {
			if (this[h]) return G[D]("Cannot create emblem item. Emblem is not editable."), c;
			n = n || {};
			var i = typeof n[A] !== e,
				s = {
					asset: t,
					left: n[x] || c,
					top: n.top || c,
					angle: n[C] || 0,
					width: n[T] || c,
					height: n[N] || c,
					opacity: n[y] || G[O][y],
					fill: n[E] || G[O][E],
					flipX: n[k] || c,
					flipY: n[L] || c,
					selectable: i ? n[A] : G[O][A]
				};
			return this[p][H].push(s), this[I](s, r), this
		}, K
	}();
	J ? K ? window.emblem.EmblemClass = G : module.exports = G : exports.EmblemClass = G
})();