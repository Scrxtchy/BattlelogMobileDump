"no-require";
(function() {
	var e = "premiumcamo_deserttiger",
		t = "premiumcamo_digiflora",
		n = "premiumcamo_partizan",
		r = "premiumcamo_berkut",
		i = "premiumcamo_nwu",
		s = "premiumcamo_abu",
		o = "premiumcamo_kamysh",
		u = "premiumcamo_atacs",
		a = null,
		f = "placeholder",
		l = "BF3_ID_P_WDESC_40MM_SHG",
		c = "BF3_ID_P_WDESC_M26Mass_Flechette",
		h = "BF3_ID_P_WNAME_M26Mass_Flechette",
		p = "BF3_ID_P_WNAME_U_M26Mass_Slug",
		d = "BF3_ID_P_WDESC_M26Mass_Slug",
		v = "BF3_ID_P_WNAME_M26Mass_Frag",
		m = "BF3_ID_P_WDESC_M26Mass_Frag",
		g = "BF3_ID_P_XP4_WDESC_CROSSBOW",
		y = "BF3_ID_P_WNAME_40MM_SHG",
		b = "BF3_ID_P_WNAME_40MM_SMK",
		w = "BF3_ID_P_VUDESC_MBTATGM",
		E = "BF3_ID_P_WNAME_M16A4",
		S = "BF3_ID_P_WDESC_40MM",
		x = "BF3_ID_P_WNAME_Mk11",
		T = "BF3_ID_P_WDESC_Mk11",
		N = "BF3_ID_P_WDESC_RPK",
		C = "BF3_ID_P_WNAME_SVD",
		k = "BF3_ID_P_WNAME_RPK",
		L = "BF3_ID_P_WDESC_SVD",
		A = "BF3_ID_P_WDESC_M39",
		O = "BF3_ID_P_WNAME_M39",
		M = "BF3_ID_P_WDESC_AKS74u",
		_ = "BF3_ID_P_WNAME_AKS74u",
		D = "BF3_ID_P_WDESC_M16A4",
		P = "m26mass-flechette",
		H = "BF3_ID_P_WDESC_AK74M",
		B = "BF3_ID_P_WNAME_AK74M",
		j = "BF3_ID_P_WNAME_M4A1",
		F = "BF3_ID_P_WDESC_M4A1",
		I = "BF3_ID_P_WNAME_M27",
		q = "BF3_ID_P_WDESC_M27",
		R = "m4a1",
		U = "m26mass-slug",
		z = "m26mass-frag",
		W = "m67-grenade",
		X = "mk11-mod-0",
		V = "riflescope",
		$ = "m320-smoke",
		J = "ballistic",
		K = "extinguisher",
		Q = "m320-buck",
		G = "frag",
		Y = "flechette",
		Z = "dropship",
		et = "foregrip",
		tt = "rpk-74m",
		nt = "m16a4",
		rt = "gunship",
		it = "m39-emr",
		st = "m27-iar",
		ot = "aks-74u";
	exports.gadgetsLocale = {
		kititems: {
			"DC9734CD-D3D7-4870-A6A9-07B99BEE6DAC": {
				name: "BF3_ID_P_INAME_SOFLAM",
				image: "soflam",
				desc: "BF3_ID_P_IDESC_SOFLAM",
				slug: "soflam"
			},
			"2430C5A8-AB47-406F-B983-1BF7289CF8E6": {
				name: "BF3_ID_P_INAME_UGS",
				image: "tugs",
				desc: "BF3_ID_P_IDESC_UGS",
				slug: "t-ugs"
			},
			"13C4927A-C5B3-4075-A570-7FAA6A712C18": {
				name: "BF3_ID_P_INAME_EOD",
				image: "eod",
				desc: "BF3_ID_P_IDESC_EOD",
				slug: "eod-bot"
			},
			"3DBDDF9C-C07D-4714-89D2-178B9AE0C42B": {
				name: "BF3_ID_P_INAME_REPAIR",
				image: "repairtool",
				desc: "BF3_ID_P_IDESC_REPAIR",
				slug: "repair-tool"
			},
			"9F789F05-CE7B-DADC-87D7-16E847DBDD09": {
				name: "BF3_ID_P_INAME_M67",
				image: W,
				desc: "BF3_ID_P_IDESC_M67",
				slug: W
			},
			"90E12AB5-CF0F-4439-AFD0-C86E6C71BB7D": {
				name: "BF3_ID_P_INAME_MINE",
				image: "mine",
				desc: "BF3_ID_P_IDESC_MINE",
				slug: "m15-at-mine"
			},
			"D78EB213-CCB5-43FE-B148-E581575036B4": {
				name: "BF3_ID_P_INAME_AMMO",
				image: "ammobag",
				desc: "BF3_ID_P_IDESC_AMMO",
				slug: "ammo-box"
			},
			"1122B462-64B1-4AE6-8ED4-CEA3BF1BDFEF": {
				name: "BF3_ID_P_INAME_C4",
				image: "c4",
				desc: "BF3_ID_P_IDESC_C4",
				slug: "c4-explosives"
			},
			"3EA94E83-0E83-4ABF-9D8E-0B37DA37A243": {
				name: "BF3_ID_P_INAME_MAV",
				image: "mav",
				desc: "BF3_ID_P_IDESC_MAV",
				slug: "mav"
			},
			"6369B996-235A-AF95-4AE3-118E46C3926C": {
				name: "BF3_ID_P_INAME_BEACON",
				image: "radiobeacon",
				desc: "BF3_ID_P_IDESC_BEACON",
				slug: "radio-beacon"
			},
			"4C73E401-E151-459E-BD40-C394437533EA": {
				name: "BF3_ID_P_INAME_CLAYMORE",
				image: "claymore",
				desc: "BF3_ID_P_IDESC_CLAYMORE",
				slug: "m18-claymore"
			},
			"7D11603B-8188-45FD-AD95-B27A4B35980E": {
				name: "BF3_ID_P_INAME_DEFIB",
				image: "defib",
				desc: "BF3_ID_P_IDESC_DEFIB",
				slug: "defibrillator"
			},
			"00F16262-38F3-45F0-B577-C243CDB10A9E": {
				name: "BF3_ID_P_INAME_MEDKIT",
				image: "medkit",
				desc: "BF3_ID_P_IDESC_MEDKIT",
				slug: "medic-kit"
			},
			"6EF48118-EF16-4D47-BD18-F57792D88AB1": {
				name: "BF3_ID_P_INAME_MORTAR",
				image: "m224_mortar",
				desc: "BF3_ID_P_IDESC_MORTAR",
				slug: "m224-mortar"
			}
		},
		weaponaccessory: {
			ID_P_ANAME_M240_PARTIZAN_CAMO: {
				name: "BF3_ID_P_ANAME_M240_PARTIZAN_CAMO",
				image: n,
				desc: "BF3_ID_P_ADESC_M240_PARTIZAN_CAMO",
				slug: "m240b-woodland-oak-camo"
			},
			ID_P_ANAME_SGA_SLUG: {
				name: "BF3_ID_P_ANAME_SGA_SLUG",
				image: "slug",
				desc: "BF3_ID_P_ADESC_SGA_SLUG",
				slug: "12g-slug"
			},
			ID_P_ANAME_JACKHAMMER_ABU_CAMO: {
				name: "BF3_ID_P_ANAME_JACKHAMMER_ABU_CAMO",
				image: s,
				desc: "BF3_ID_P_ADESC_JACKHAMMER_ABU_CAMO",
				slug: "mk3a1-airman-camo"
			},
			"55ADFBFC-12CC-28E7-4DA4-3D4C49CDF7F3": {
				name: y,
				image: "40mm_shotgunshell",
				desc: l,
				slug: Q
			},
			ID_P_ANAME_BOLT_HE: {
				name: "BF3_ID_P_ANAME_BOLT_HE",
				image: "crossbowbolt_he",
				desc: "BF3_ID_P_ADESC_BOLT_HE",
				slug: "he-bolt"
			},
			ID_P_ANAME_RX01: {
				name: "BF3_ID_P_ANAME_RX01",
				image: "rx01",
				desc: "BF3_ID_P_ADESC_RX01",
				slug: "reflex-rds"
			},
			ID_P_ANAME_PKS: {
				name: "BF3_ID_P_ANAME_PKS",
				image: "pks07",
				desc: "BF3_ID_P_ADESC_PKS",
				slug: "pks-07-7x"
			},
			ID_P_ANAME_MAG: {
				name: "BF3_ID_P_ANAME_MAG",
				image: "ext_mag01",
				desc: "BF3_ID_P_ADESC_MAG",
				slug: "extended-mag"
			},
			ID_P_ANAME_HK53_NWU_CAMO: {
				name: "BF3_ID_P_ANAME_HK53_NWU_CAMO",
				image: i,
				desc: "BF3_ID_P_ADESC_HK53_NWU_CAMO",
				slug: "g53-navy-blue-digital-camo"
			},
			ID_P_ANAME_DEFAULTCAMO: {
				name: "BF3_ID_P_ANAME_DEFAULTCAMO",
				image: f,
				desc: "BF3_ID_P_ADESC_DEFAULTCAMO",
				slug: "default-camo"
			},
			ID_P_ANAME_BUCK: {
				name: "BF3_ID_P_ANAME_BUCK",
				image: "buck",
				desc: "BF3_ID_P_ADESC_BUCK",
				slug: "12g-buckshot"
			},
			ID_P_ANAME_LSAT_NWU_CAMO: {
				name: "BF3_ID_P_ANAME_LSAT_NWU_CAMO",
				image: i,
				desc: "BF3_ID_P_ADESC_LSAT_NWU_CAMO",
				slug: "lsat-navy-blue-digital-camo"
			},
			ID_P_ANAME_FOREGRIP: {
				name: "BF3_ID_P_ANAME_FOREGRIP",
				image: et,
				desc: "BF3_ID_P_ADESC_FOREGRIP",
				slug: et
			},
			ID_P_ANAME_RIFLE: {
				name: "BF3_ID_P_ANAME_RIFLE",
				image: V,
				desc: "BF3_ID_P_ADESC_RIFLE",
				slug: "rifle-scope-6x"
			},
			ID_P_ANAME_MTAR_ABU_CAMO: {
				name: "BF3_ID_P_ANAME_MTAR_ABU_CAMO",
				image: s,
				desc: "BF3_ID_P_ADESC_MTAR_ABU_CAMO",
				slug: "mtar-21-airman-camo"
			},
			ID_P_ANAME_M39_PARTIZAN_CAMO: {
				name: "BF3_ID_P_ANAME_M39_PARTIZAN_CAMO",
				image: n,
				desc: "BF3_ID_P_ADESC_M39_PARTIZAN_CAMO",
				slug: "m39-emr-woodland-oak-camo"
			},
			"Ballistic (20x)": {
				name: "Ballistic (20x)",
				image: J,
				desc: "A 20x version of the Ballistic Scope only available as a testing tool for DICE developers. Ballistic Scope reflections can reveal your position when aimed at enemies.",
				slug: "ballistic-20x"
			},
			"D67B1BD6-92FB-19D9-FBBC-53945F2DFB51": {
				name: p,
				image: U,
				desc: d,
				slug: "assault-m26-slug"
			},
			ID_P_ANAME_PECHENEG_ATACS_CAMO: {
				name: "BF3_ID_P_ANAME_PECHENEG_ATACS_CAMO",
				image: u,
				desc: "BF3_ID_P_ADESC_PECHENEG_ATACS_CAMO",
				slug: "pecheneg-tactical-camo"
			},
			ID_P_ANAME_PKAS: {
				name: "BF3_ID_P_ANAME_PKAS",
				image: "pkas",
				desc: "BF3_ID_P_ADESC_PKAS",
				slug: "pka-s-holo"
			},
			ID_P_ANAME_EOTECH: {
				name: "BF3_ID_P_ANAME_EOTECH",
				image: "eotech",
				desc: "BF3_ID_P_ADESC_EOTECH",
				slug: "holographic-holo"
			},
			ID_P_ANAME_LIGHT: {
				name: "BF3_ID_P_ANAME_LIGHT",
				image: "flashlight",
				desc: "BF3_ID_P_ADESC_LIGHT",
				slug: "tactical-light"
			},
			ID_P_ANAME_NOPRIMARY: {
				name: "BF3_ID_P_ANAME_NOPRIMARY",
				image: f,
				desc: "BF3_ID_P_ADESC_NOPRIMARY",
				slug: "no-primary"
			},
			ID_P_ANAME_SUPPRESS: {
				name: "BF3_ID_P_ANAME_SUPPRESS",
				image: "flashsuppressor",
				desc: "BF3_ID_P_ADESC_SUPPRESS",
				slug: "flash-supp"
			},
			ID_P_ANAME_M240_DSRTTIGER_CAMO: {
				name: "BF3_ID_P_ANAME_M240_DSRTTIGER_CAMO",
				image: e,
				desc: "BF3_ID_P_ADESC_M240_DSRTTIGER_CAMO",
				slug: "m240b-desert-stripe-camo"
			},
			ID_P_ANAME_MTAR_PARTIZAN_CAMO: {
				name: "BF3_ID_P_ANAME_MTAR_PARTIZAN_CAMO",
				image: n,
				desc: "BF3_ID_P_ADESC_MTAR_PARTIZAN_CAMO",
				slug: "mtar-21-woodland-oak-camo"
			},
			ID_P_ANAME_JNG90_BERKUT_CAMO: {
				name: "BF3_ID_P_ANAME_JNG90_BERKUT_CAMO",
				image: r,
				desc: "BF3_ID_P_ADESC_JNG90_BERKUT_CAMO",
				slug: "jng-90-berkut-camo"
			},
			ID_P_ANAME_LSAT_DIGIFLORA_CAMO: {
				name: "BF3_ID_P_ANAME_LSAT_DIGIFLORA_CAMO",
				image: t,
				desc: "BF3_ID_P_ADESC_LSAT_DIGIFLORA_CAMO",
				slug: "lsat-digital-woodland-camo"
			},
			ID_P_ANAME_PKA: {
				name: "BF3_ID_P_ANAME_PKA",
				image: "pka",
				desc: "BF3_ID_P_ADESC_PKA",
				slug: "pk-a-3-4x"
			},
			ID_P_ANAME_BOLT_STANDARD: {
				name: "BF3_ID_P_ANAME_BOLT_STANDARD",
				image: "crossbowbolt_arrow",
				desc: "BF3_ID_P_ADESC_BOLT_STANDARD",
				slug: "bolt"
			},
			ID_P_ANAME_BOLT_BA: {
				name: "BF3_ID_P_ANAME_BOLT_BA",
				image: "crossbowbolt_ba",
				desc: "BF3_ID_P_ADESC_BOLT_BA",
				slug: "ba-bolt"
			},
			ID_P_ANAME_SCARL_DSRTTIGER_CAMO: {
				name: "BF3_ID_P_ANAME_SCARL_DSRTTIGER_CAMO",
				image: e,
				desc: "BF3_ID_P_ADESC_SCARL_DSRTTIGER_CAMO",
				slug: "scar-l-desert-stripe-camo"
			},
			ID_P_ANAME_SKS_DSRTTIGER_CAMO: {
				name: "BF3_ID_P_ANAME_SKS_DSRTTIGER_CAMO",
				image: e,
				desc: "BF3_ID_P_ADESC_SKS_DSRTTIGER_CAMO",
				slug: "sks-desert-stripe-camo"
			},
			ID_P_ANAME_L85A2_ATACS_CAMO: {
				name: "BF3_ID_P_ANAME_L85A2_ATACS_CAMO",
				image: u,
				desc: "BF3_ID_P_ADESC_L85A2_ATACS_CAMO",
				slug: "l85a2-tactical-camo"
			},
			ID_P_ANAME_QBB95_ABU_CAMO: {
				name: "BF3_ID_P_ANAME_QBB95_ABU_CAMO",
				image: s,
				desc: "BF3_ID_P_ADESC_QBB95_ABU_CAMO",
				slug: "qbb-95-airman-camo"
			},
			ID_P_ANAME_LASER: {
				name: "BF3_ID_P_ANAME_LASER",
				image: "targetpointer",
				desc: "BF3_ID_P_ADESC_LASER",
				slug: "laser-sight"
			},
			ID_P_ANAME_IRNV: {
				name: "BF3_ID_P_ANAME_IRNV",
				image: "irnv",
				desc: "BF3_ID_P_ADESC_IRNV",
				slug: "irnv-ir-1x"
			},
			ID_P_ANAME_BIPOD: {
				name: "BF3_ID_P_ANAME_BIPOD",
				image: "bipod",
				desc: "BF3_ID_P_ADESC_BIPOD",
				slug: "bipod"
			},
			ID_P_ANAME_SGA_FRAG: {
				name: "BF3_ID_P_ANAME_SGA_FRAG",
				image: G,
				desc: "BF3_ID_P_ADESC_SGA_FRAG",
				slug: "12g-frag"
			},
			ID_P_ANAME_UMP45_NWU_CAMO: {
				name: "BF3_ID_P_ANAME_UMP45_NWU_CAMO",
				image: i,
				desc: "BF3_ID_P_ADESC_UMP45_NWU_CAMO",
				slug: "ump-45-navy-blue-digital-camo"
			},
			ID_P_ANAME_PECHENEG_KAMYSH_CAMO: {
				name: "BF3_ID_P_ANAME_PECHENEG_KAMYSH_CAMO",
				image: o,
				desc: "BF3_ID_P_ADESC_PECHENEG_KAMYSH_CAMO",
				slug: "pecheneg-woodland-stripe-camo"
			},
			ID_P_ANAME_SCARH_DSRTTIGER_CAMO: {
				name: "BF3_ID_P_ANAME_SCARH_DSRTTIGER_CAMO",
				image: e,
				desc: "BF3_ID_P_ADESC_SCARH_DSRTTIGER_CAMO",
				slug: "scar-h-desert-stripe-camo"
			},
			ID_P_ANAME_JACKHAMMER_PARTIZAN_CAMO: {
				name: "BF3_ID_P_ANAME_JACKHAMMER_PARTIZAN_CAMO",
				image: n,
				desc: "BF3_ID_P_ADESC_JACKHAMMER_PARTIZAN_CAMO",
				slug: "mk3a1-woodland-oak-camo"
			},
			ID_P_ANAME_KOBRA: {
				name: "BF3_ID_P_ANAME_KOBRA",
				image: "kobra",
				desc: "BF3_ID_P_ADESC_KOBRA",
				slug: "kobra-rds"
			},
			ID_P_ANAME_ACR_DIGIFLORA_CAMO: {
				name: "BF3_ID_P_ANAME_ACR_DIGIFLORA_CAMO",
				image: t,
				desc: "BF3_ID_P_ADESC_ACR_DIGIFLORA_CAMO",
				slug: "acw-r-digital-woodland-camo"
			},
			ID_P_ANAME_F2000_PARTIZAN_CAMO: {
				name: "BF3_ID_P_ANAME_F2000_PARTIZAN_CAMO",
				image: n,
				desc: "BF3_ID_P_ADESC_F2000_PARTIZAN_CAMO",
				slug: "f2000-woodland-oak-camo"
			},
			ID_P_ANAME_BALL: {
				name: "BF3_ID_P_ANAME_BALL",
				image: J,
				desc: "BF3_ID_P_ADESC_BALL",
				slug: "ballistic-12x"
			},
			ID_P_ANAME_HK53_KAMYSH_CAMO: {
				name: "BF3_ID_P_ANAME_HK53_KAMYSH_CAMO",
				image: o,
				desc: "BF3_ID_P_ADESC_HK53_KAMYSH_CAMO",
				slug: "g53-woodland-stripe-camo"
			},
			"9A0E2B30-5C19-842B-CECF-58A973A06951": {
				name: v,
				image: z,
				desc: m,
				slug: "m26-frag"
			},
			ID_P_ANAME_JNG90_NWU_CAMO: {
				name: "BF3_ID_P_ANAME_JNG90_NWU_CAMO",
				image: i,
				desc: "BF3_ID_P_ADESC_JNG90_NWU_CAMO",
				slug: "jng-90-navy-blue-digital-camo"
			},
			ID_P_ANAME_SILENCER: {
				name: "BF3_ID_P_ANAME_SILENCER",
				image: "soundsuppressor",
				desc: "BF3_ID_P_ADESC_SILENCER",
				slug: "suppressor"
			},
			ID_P_ANAME_PSO: {
				name: "BF3_ID_P_ANAME_PSO",
				image: "pso",
				desc: "BF3_ID_P_ADESC_PSO",
				slug: "pso-1-4x"
			},
			ID_P_ANAME_FLECHETTE: {
				name: "BF3_ID_P_ANAME_FLECHETTE",
				image: Y,
				desc: "BF3_ID_P_ADESC_FLECHETTE",
				slug: "12g-flechette"
			},
			ID_P_ANAME_FRAG: {
				name: "BF3_ID_P_ANAME_FRAG",
				image: G,
				desc: "BF3_ID_P_ADESC_FRAG",
				slug: "12g-frag1"
			},
			ID_P_ANAME_BOLT: {
				name: "BF3_ID_P_ANAME_BOLT",
				image: "straightbolt",
				desc: "BF3_ID_P_ADESC_BOLT",
				slug: "straight-pull-bolt"
			},
			ID_P_ANAME_ACOG: {
				name: "BF3_ID_P_ANAME_ACOG",
				image: "acog",
				desc: "BF3_ID_P_ADESC_ACOG",
				slug: "acog-4x"
			},
			ID_P_ANAME_BARREL: {
				name: "BF3_ID_P_ANAME_BARREL",
				image: "heavybarrel",
				desc: "BF3_ID_P_ADESC_BARREL",
				slug: "heavy-barrel"
			},
			ID_P_ANAME_QBB95_BERKUT_CAMO: {
				name: "BF3_ID_P_ANAME_QBB95_BERKUT_CAMO",
				image: r,
				desc: "BF3_ID_P_ADESC_QBB95_BERKUT_CAMO",
				slug: "qbb-95-berkut-camo"
			},
			ID_P_ANAME_L96_DIGIFLORA_CAMO: {
				name: "BF3_ID_P_ANAME_L96_DIGIFLORA_CAMO",
				image: t,
				desc: "BF3_ID_P_ADESC_L96_DIGIFLORA_CAMO",
				slug: "l96-digital-woodland-camo"
			},
			ID_P_ANAME_SNIPERRIFLE: {
				name: "BF3_ID_P_ANAME_SNIPERRIFLE",
				image: V,
				desc: "BF3_ID_P_ADESC_SNIPERRIFLE",
				slug: "rifle-scope-8x"
			},
			ID_P_ANAME_M416_ABU_CAMO: {
				name: "BF3_ID_P_ANAME_M416_ABU_CAMO",
				image: s,
				desc: "BF3_ID_P_ADESC_M416_ABU_CAMO",
				slug: "m416-airman-camo"
			},
			ID_P_ANAME_ACR_ATACS_CAMO: {
				name: "BF3_ID_P_ANAME_ACR_ATACS_CAMO",
				image: u,
				desc: "BF3_ID_P_ADESC_ACR_ATACS_CAMO",
				slug: "acw-r-tactical-camo"
			},
			"857E7B0D-7D26-CF09-BB5C-06F00C3F9189": {
				name: h,
				image: P,
				desc: c,
				slug: "m26-dart"
			},
			ID_P_ANAME_PP19_DIGIFLORA_CAMO: {
				name: "BF3_ID_P_ANAME_PP19_DIGIFLORA_CAMO",
				image: t,
				desc: "BF3_ID_P_ADESC_PP19_DIGIFLORA_CAMO",
				slug: "pp-19-digital-woodland-camo"
			},
			"FE6292D5-79AD-1230-7B9A-AF80D020E256": {
				name: b,
				image: "40mm_smoke",
				desc: "BF3_ID_P_WDESC_40MM_SMK",
				slug: $
			},
			ID_P_ANAME_NOSECONDARY: {
				name: "BF3_ID_P_ANAME_NOSECONDARY",
				image: f,
				desc: "BF3_ID_P_ADESC_NOSECONDARY",
				slug: "no-secondary"
			},
			ID_P_ANAME_UMP45_BERKUT_CAMO: {
				name: "BF3_ID_P_ANAME_UMP45_BERKUT_CAMO",
				image: r,
				desc: "BF3_ID_P_ADESC_UMP45_BERKUT_CAMO",
				slug: "ump-45-berkut-camo"
			},
			ID_P_ANAME_F2000_NWU_CAMO: {
				name: "BF3_ID_P_ANAME_F2000_NWU_CAMO",
				image: i,
				desc: "BF3_ID_P_ADESC_F2000_NWU_CAMO",
				slug: "f2000-navy-blue-digital-camo"
			},
			ID_P_ANAME_NOOPTIC: {
				name: "BF3_ID_P_ANAME_NOOPTIC",
				image: f,
				desc: "BF3_ID_P_ADESC_NOOPTIC",
				slug: "iron-sights"
			},
			ID_P_ANAME_L96_ABU_CAMO: {
				name: "BF3_ID_P_ANAME_L96_ABU_CAMO",
				image: s,
				desc: "BF3_ID_P_ADESC_L96_ABU_CAMO",
				slug: "l96-airman-camo"
			},
			ID_P_ANAME_BOLT_SCAN: {
				name: "BF3_ID_P_ANAME_BOLT_SCAN",
				image: "crossbowbolt_scan",
				desc: "BF3_ID_P_ADESC_BOLT_SCAN",
				slug: "scan-bolt"
			},
			ID_P_ANAME_SCARH_BERKUT_CAMO: {
				name: "BF3_ID_P_ANAME_SCARH_BERKUT_CAMO",
				image: r,
				desc: "BF3_ID_P_ADESC_SCARH_BERKUT_CAMO",
				slug: "scar-h-berkut-camo"
			},
			ID_P_ANAME_M39_ATACS_CAMO: {
				name: "BF3_ID_P_ANAME_M39_ATACS_CAMO",
				image: u,
				desc: "BF3_ID_P_ADESC_M39_ATACS_CAMO",
				slug: "m39-emr-tactical-camo"
			},
			ID_P_ANAME_SKS_KAMYSH_CAMO: {
				name: "BF3_ID_P_ANAME_SKS_KAMYSH_CAMO",
				image: o,
				desc: "BF3_ID_P_ADESC_SKS_KAMYSH_CAMO",
				slug: "sks-woodland-stripe-camo"
			},
			ID_P_ANAME_NOCAMO: {
				name: "BF3_ID_P_ANAME_NOCAMO",
				image: f,
				desc: "BF3_ID_P_ADESC_NOCAMO",
				slug: "no-camo"
			},
			ID_P_ANAME_SLUG: {
				name: "BF3_ID_P_ANAME_SLUG",
				image: "slug",
				desc: "BF3_ID_P_ADESC_SLUG",
				slug: "12g-slug1"
			},
			ID_P_ANAME_PP19_DSRTTIGER_CAMO: {
				name: "BF3_ID_P_ANAME_PP19_DSRTTIGER_CAMO",
				image: e,
				desc: "BF3_ID_P_ADESC_PP19_DSRTTIGER_CAMO",
				slug: "pp-19-desert-stripe-camo"
			},
			ID_P_ANAME_M416_KAMYSH_CAMO: {
				name: "BF3_ID_P_ANAME_M416_KAMYSH_CAMO",
				image: o,
				desc: "BF3_ID_P_ADESC_M416_KAMYSH_CAMO",
				slug: "m416-woodland-stripe-camo"
			},
			ID_P_ANAME_M145: {
				name: "BF3_ID_P_ANAME_M145",
				image: "m145",
				desc: "BF3_ID_P_ADESC_M145",
				slug: "m145-3-4x"
			},
			ID_P_ANAME_NOPRIMARYRAIL: {
				name: "BF3_ID_P_ANAME_NOPRIMARYRAIL",
				image: "rails",
				desc: "BF3_ID_P_ADESC_NOPRIMARYRAIL",
				slug: "underslung-rail"
			},
			ID_P_ANAME_L85A2_BERKUT_CAMO: {
				name: "BF3_ID_P_ANAME_L85A2_BERKUT_CAMO",
				image: r,
				desc: "BF3_ID_P_ADESC_L85A2_BERKUT_CAMO",
				slug: "l85a2-berkut-camo"
			},
			ID_P_ANAME_SCARL_DIGIFLORA_CAMO: {
				name: "BF3_ID_P_ANAME_SCARL_DIGIFLORA_CAMO",
				image: t,
				desc: "BF3_ID_P_ADESC_SCARL_DIGIFLORA_CAMO",
				slug: "scar-l-digital-woodland-camo"
			},
			ID_P_ANAME_SGA_FLECH: {
				name: "BF3_ID_P_ANAME_SGA_FLECH",
				image: Y,
				desc: "BF3_ID_P_ADESC_SGA_FLECH",
				slug: "12g-flechette1"
			}
		},
		soldierspecializations: {
			"204407B2-2186-4526-A50F-6F423E455311": {
				name: "BF3_ID_P_SNAME_SuppRes2",
				image: "supprresist2",
				desc: "BF3_ID_P_SDESC_SuppRes2",
				slug: "sqd-covr"
			},
			"5F1603F6-C6F5-438D-AF7A-FD45258BB81C": {
				name: "BF3_ID_P_SNAME_Clips2",
				image: "ammo2",
				desc: "BF3_ID_P_SDESC_Clips2",
				slug: "sqd-ammo"
			},
			"B8CEA0C3-E1FF-47CB-9D00-7022D819F973": {
				name: "BF3_ID_P_SNAME_Sprint2",
				image: "sprint2",
				desc: "BF3_ID_P_SDESC_Sprint2",
				slug: "sqd-sprnt"
			},
			"3991B59A-8CFB-4590-BAE2-64EED9B4E485": {
				name: "BF3_ID_P_SNAME_Suppr",
				image: "suppression",
				desc: "BF3_ID_P_SDESC_Suppr",
				slug: "supr"
			},
			"7B001B2F-5B24-4AE8-9C2E-3B8663E2F6C0": {
				name: "BF3_ID_P_SNAME_Expl",
				image: "explosives",
				desc: "BF3_ID_P_SDESC_Expl",
				slug: "expl"
			},
			"CCBBB3DB-F134-4CCA-A2C4-C74CA618C9DF": {
				name: "BF3_ID_P_SNAME_Clips",
				image: "ammo",
				desc: "BF3_ID_P_SDESC_Clips",
				slug: "ammo"
			},
			"9E4734B9-D312-4E38-84A7-73E0F1259EEB": {
				name: "BF3_ID_P_SNAME_Expl2",
				image: "explosives2",
				desc: "BF3_ID_P_SDESC_Expl2",
				slug: "sqd-expl"
			},
			"A8C8F62B-0E6C-462B-8489-4A5C46C9170F": {
				name: "BF3_ID_P_SNAME_Gren",
				image: "grenades",
				desc: "BF3_ID_P_SDESC_Gren",
				slug: G
			},
			"4D450662-7615-4F14-9C19-A27A6B45BA93": {
				name: "BF3_ID_P_SNAME_Suppr2",
				image: "suppression2",
				desc: "BF3_ID_P_SDESC_Suppr2",
				slug: "sqd-supr"
			},
			"BCE7C360-DFE6-4BF0-B020-7F2482177652": {
				name: "BF3_ID_P_SNAME_ExplRes",
				image: "explresist",
				desc: "BF3_ID_P_SDESC_ExplRes",
				slug: "flak"
			},
			"B128BA3C-1AFA-4487-84EF-A17F0D4C90EB": {
				name: "BF3_ID_P_SNAME_Gren2",
				image: "grenades2",
				desc: "BF3_ID_P_SDESC_Gren2",
				slug: "sqd-frag"
			},
			"9A845313-8450-442C-A30F-FAF5977B3DBA": {
				name: "BF3_ID_P_SNAME_SuppRes",
				image: "supprresist",
				desc: "BF3_ID_P_SDESC_SuppRes",
				slug: "covr"
			},
			"350432B9-5B42-49F4-8343-CD20DE1B82BD": {
				name: "BF3_ID_P_SNAME_Sprint",
				image: "sprint",
				desc: "BF3_ID_P_SDESC_Sprint",
				slug: "sprnt"
			},
			"9DFDE21C-A50D-48B7-B6C0-F1E4107D2F12": {
				name: "BF3_ID_P_SNAME_ExplRes2",
				image: "explresist2",
				desc: "BF3_ID_P_SDESC_ExplRes2",
				slug: "sqd-flak"
			}
		},
		vehicles: {
			"F998F5E4-220D-463A-A437-1C18D5C3A19E": {
				name: "BF3_ID_P_XP1_VNAME_BTR90",
				image: "btr90",
				desc: "BF3_ID_P_XP1_VDESC_BTR90",
				slug: "btr-90"
			},
			"89BEA1D6-2FF4-11DE-8C23-DAB1D69416DE": {
				name: "BF3_ID_P_VNAME_MI28",
				image: "mi28",
				desc: "BF3_ID_P_VDESC_MI28",
				slug: "mi-28-havoc"
			},
			"D35CA587-79AF-D351-6F65-967794C7F1B7": {
				name: "BF3_ID_P_VNAME_CENTURION",
				image: "centurion",
				desc: "BF3_ID_P_VDESC_CENTURION",
				slug: "centurion-c-ram"
			},
			"B3E9860F-EE10-44F3-B4DC-5730BE251159": {
				name: "BF3_ID_P_VNAME_A10",
				image: "a10",
				desc: "BF3_ID_P_VDESC_A10",
				slug: "a-10-thunderbolt"
			},
			"D780AFF6-38B7-11DE-BF1C-984D9AEE762C": {
				name: "BF3_ID_P_VNAME_Z11",
				image: "z11",
				desc: "BF3_ID_P_VDESC_Z11",
				slug: "z-11w"
			},
			"60106975-DD7D-11DD-A030-B04E425BA11E": {
				name: "BF3_ID_P_VNAME_T90",
				image: "t90",
				desc: "BF3_ID_P_VDESC_T90",
				slug: "t-90a"
			},
			"860157CA-6527-4123-B60E-71117DD878D7": {
				name: "BF3_ID_P_VNAME_LAVAD",
				image: "lav-ad",
				desc: "BF3_ID_P_VDESC_LAVAD",
				slug: "lav-ad"
			},
			"E7A99B55-B5BD-C101-2384-97458D4AC23C": {
				name: "BF3_ID_P_VNAME_GROWLER",
				image: "growler",
				desc: "BF3_ID_P_VDESC_GROWLER",
				slug: "growler-itv"
			},
			"AEA24188-AF40-499C-AAA6-A8BB3E85EFEE": {
				name: "BF3_ID_P_VNAME_RHINO",
				image: "xp4_van",
				desc: "BF3_ID_P_VDESC_RHINO",
				slug: "rhino"
			},
			"969D41AE-F886-4D06-A4F0-D2062057E6E8": {
				name: "BF3_ID_P_VNAME_ASRAD",
				image: "humvee_asrad",
				desc: "BF3_ID_P_VDESC_ASRAD",
				slug: "hmmwv-asrad"
			},
			"F1FFAE42-B67A-4E4F-2626-3CBF37AE287B": {
				name: "BF3_ID_P_VNAME_SU35",
				image: "su35",
				desc: "BF3_ID_P_VDESC_SU35",
				slug: "su-35bm-flanker-e"
			},
			"AE20A64D-871C-EA34-9931-1162BB8B0242": {
				name: "BF3_ID_P_VNAME_QUADBIKE",
				image: "quadbike",
				desc: "BF3_ID_P_VDESC_QUADBIKE",
				slug: "quad-bike"
			},
			"561E82B1-FDB8-CE19-B9B5-79CB5B57E94F": {
				name: "BF3_ID_P_VNAME_GUNSHIP",
				image: rt,
				desc: "BF3_ID_P_VDESC_GUNSHIP",
				slug: rt
			},
			"C645317B-45BB-E082-7E5C-918388C22D59": {
				name: "BF3_ID_P_VNAME_PANTSIR",
				image: "pantsir",
				desc: "BF3_ID_P_VDESC_PANTSIR",
				slug: "pantsir-s1"
			},
			"A36C9712-54B3-A5FF-8627-7BC7EFA0C668": {
				name: "BF3_ID_P_VNAME_9K22",
				image: "tunguska",
				desc: "BF3_ID_P_VDESC_9K22",
				slug: "9k22-tunguska-m"
			},
			"B26FD546-2ADF-1A90-3044-F7748B86DA26": {
				name: "BF3_ID_P_VNAME_RIB",
				image: "rhib",
				desc: "BF3_ID_P_VDESC_RIB",
				slug: "rhib-boat"
			},
			"A676D498-A524-42AD-BE78-72B071D8CD6A": {
				name: "BF3_ID_P_VNAME_AH1Z",
				image: "ah1z",
				desc: "BF3_ID_P_VDESC_AH1Z",
				slug: "ah-1z-viper"
			},
			"086AFD23-5DD9-430F-9430-B1DAA502DB0F": {
				name: "BF3_ID_P_VNAME_BMP2",
				image: "bmp2",
				desc: "BF3_ID_P_VDESC_BMP2",
				slug: "bmp-2m"
			},
			"98E5B9BF-0B68-4AF0-A20D-1A23D6B6BF8B": {
				name: "BF3_ID_P_VNAME_VODNIK",
				image: "vodnik",
				desc: "BF3_ID_P_VDESC_VODNIK",
				slug: "gaz-3937-vodnik"
			},
			"D7BAB9C1-1208-4923-BD3A-56EB945E04E1": {
				name: "BF3_ID_P_VNAME_KORNET",
				image: "kornet",
				desc: "BF3_ID_P_VDESC_KORNET",
				slug: "9m133-kornet-launcher"
			},
			"4092E519-1C9F-4243-88AE-E27F4F663E34": {
				name: "BF3_ID_P_VNAME_LAV25",
				image: "lav-25",
				desc: "BF3_ID_P_VDESC_LAV25",
				slug: "lav-25"
			},
			"9D35A483-0B6B-91AE-5025-351AD87B2B46": {
				name: "BF3_ID_P_XP1_VNAME_DPV",
				image: "dpv",
				desc: "BF3_ID_P_XP1_VDESC_DPV",
				slug: "dpv"
			},
			"CD8C281F-579D-4E7B-BE3D-F206E91407F8": {
				name: "BF3_ID_P_VNAME_SU39",
				image: "su39",
				desc: "BF3_ID_P_VDESC_SU39",
				slug: "su-25tm-frogfoot"
			},
			"C81F8757-E6D2-DF2D-1CFE-B72B4F74FE98": {
				name: "BF3_ID_P_VNAME_F18",
				image: "f18",
				desc: "BF3_ID_P_VDESC_F18",
				slug: "f-a-18e-super-hornet"
			},
			"F2C37A65-896D-F8A4-F7D8-F02063E0BA00": {
				name: "BF3_ID_P_VNAME_M1128",
				image: "m1128",
				desc: "BF3_ID_P_VDESC_M1128",
				slug: "m1128"
			},
			"3F18FCA6-A7D4-D3B5-28E5-44A5CAFFE6BE": {
				name: "BF3_ID_P_XP1_VNAME_F35",
				image: "f35",
				desc: "BF3_ID_P_XP1_VDESC_F35",
				slug: "f-35"
			},
			"B06A08AB-EECF-11DD-8117-9421284A74E5": {
				name: "BF3_ID_P_VNAME_M1ABRAMS",
				image: "m1a2",
				desc: "BF3_ID_P_VDESC_M1ABRAMS",
				slug: "m1-abrams"
			},
			"EDA4A0C6-8AF6-B83D-9886-F59CF515F118": {
				name: "BF3_ID_P_VNAME_BARSUK",
				image: "xp4_vodnik",
				desc: "BF3_ID_P_VDESC_BARSUK",
				slug: "barsuk"
			},
			"86E35E23-D6BA-4173-9A43-74DD632A87DE": {
				name: "BF3_ID_P_VNAME_2S25_SPRUTSD",
				image: "sprutsd",
				desc: "BF3_ID_P_VDESC_2S25_SPRUTSD",
				slug: "sprut-sd"
			},
			"F690A9CB-37ED-4148-8667-5606729079A8": {
				name: "BF3_ID_P_VNAME_VODAA",
				image: "vodnikaa",
				desc: "BF3_ID_P_VDESC_VODAA",
				slug: "vodnik-aa"
			},
			"3E148A16-F550-4927-ADF7-9BB822CAACE3": {
				name: "BF3_ID_P_VNAME_DROPSHIP",
				image: Z,
				desc: "BF3_ID_P_VDESC_DROPSHIP",
				slug: Z
			},
			"C3F3DE57-2E0F-F4BD-0C18-B95E7C5E0515": {
				name: "BF3_ID_P_VNAME_BM23",
				image: "bm23",
				desc: "BF3_ID_P_VDESC_BM23",
				slug: "bm-23"
			},
			"37A53096-BA80-5498-1347-8C7B238680C8": {
				name: "BF3_ID_P_VNAME_TOW",
				image: "tow",
				desc: "BF3_ID_P_VDESC_TOW",
				slug: "m220-tow-launcher"
			},
			"04331C0E-9651-8073-E772-2010E5ACF88D": {
				name: "BF3_ID_P_VNAME_HIMARS",
				image: "himars",
				desc: "BF3_ID_P_VDESC_HIMARS",
				slug: "m142"
			},
			"B9BAE0F8-72B9-4E1C-B5AD-F9353727C990": {
				name: "BF3_ID_P_VNAME_KA60",
				image: "ka60",
				desc: "BF3_ID_P_VDESC_KA60",
				slug: "ka-60-kasatka"
			},
			"D68E417F-6103-5140-3ABC-4C7505160A09": {
				name: "BF3_ID_P_VNAME_VDV",
				image: "vdv",
				desc: "BF3_ID_P_VDESC_VDV",
				slug: "vdv-buggy"
			},
			"D1B516CA-6119-F025-C923-1B0700B6AEBA": {
				name: "BF3_ID_P_VNAME_HUMVEE",
				image: "humvee",
				desc: "BF3_ID_P_VDESC_HUMVEE",
				slug: "m1114-hmmwv"
			},
			"0E09B2D0-BA4A-1509-E1D2-949FB0C04DBE": {
				name: "BF3_ID_P_VNAME_UH1Y",
				image: "venom",
				desc: "BF3_ID_P_VDESC_UH1Y",
				slug: "uh-1y-venom"
			},
			"FD8AB748-FF4D-11DD-A7B1-F7C6DEEC9D32": {
				name: "BF3_ID_P_VNAME_AH6",
				image: "ah6",
				desc: "BF3_ID_P_VDESC_AH6",
				slug: "ah-6j-little-bird"
			},
			"74866776-D5AF-BD32-7964-CD234506235D": {
				name: "BF3_ID_P_XP1_VNAME_SKIDLOADER",
				image: "skidloader",
				desc: "BF3_ID_P_XP1_VDESC_SKIDLOADER",
				slug: "skid-loader"
			},
			"A401FE88-C8AE-43D1-BD60-13F9464060B6": {
				name: "BF3_ID_P_VNAME_DIRTBIKE",
				image: "klr650",
				desc: "BF3_ID_P_VDESC_DIRTBIKE",
				slug: "dirtbike"
			},
			"BDA948F2-23AD-9908-A71D-5D3EE84A22B5": {
				name: "BF3_ID_P_VNAME_PHOENIX",
				image: "xp4_humvee",
				desc: "BF3_ID_P_VDESC_PHOENIX",
				slug: "phoenix"
			},
			"1E8653E6-11A0-DF93-C808-E48351D2F578": {
				name: "BF3_ID_P_VNAME_AAV",
				image: "aav",
				desc: "BF3_ID_P_VDESC_AAV",
				slug: "aav-7a1-amtrac"
			}
		},
		appearance: {
			"A1A16334-A874-4A58-B189-4942C08ECCFE": {
				name: "BF3_ID_P_CAMO_NAME_PREMIUM7",
				image: "camocombo17",
				desc: a,
				slug: "premium-4-camo"
			},
			"7133C95C-24CA-4F4F-A0A4-E702FE1E2237": {
				name: "BF3_ID_P_CAMO_NAME_CAMO7",
				image: "camo7",
				desc: a,
				slug: "jungle-pattern"
			},
			"4A57EF12-94CF-4F6C-A4EC-13136DF3EF9F": {
				name: "BF3_ID_P_CAMO_NAME_CAMO3",
				image: "camo3",
				desc: a,
				slug: "army-green"
			},
			"0ABDDBD3-93B6-4049-B49D-8B31D0139AA7": {
				name: "BF3_ID_P_CAMO_NAME_CAMO6",
				image: "camo6",
				desc: a,
				slug: "navy-blue"
			},
			"C738A40A-4AC3-427D-A3A4-B0BB501A9F9C": {
				name: "BF3_ID_P_CAMO_NAME_PREMIUM5",
				image: "camocombo16",
				desc: a,
				slug: "premium-3-camo"
			},
			"BBA3EDF9-06D6-4638-841B-B3350BDAFD9F": {
				name: "BF3_ID_P_CAMO_NAME_CAMO8",
				image: "camo8",
				desc: a,
				slug: "desert-khaki"
			},
			"4BA49FBC-4E15-4669-8A3E-0A3F46F346BE": {
				name: "BF3_ID_P_CAMO_NAME_CAMO_DEFAULT",
				image: "default",
				desc: a,
				slug: "default-camo1"
			},
			"E628556D-6CA5-4B9D-851A-CCE10BF6A59B": {
				name: "BF3_ID_P_CAMO_NAME_PEPPER",
				image: "camocombo13",
				desc: a,
				slug: "dr-pepper"
			},
			"FC7A9CD0-F58A-4476-B094-C30C9B14669C": {
				name: "BF3_ID_P_CAMO_NAME_CAMO1",
				image: "camo1",
				desc: a,
				slug: "woodland-pattern"
			},
			"96774D11-B0FE-4174-8407-C53352F0D9A5": {
				name: "BF3_ID_P_CAMO_NAME_PREMIUM1",
				image: "camocombo14",
				desc: a,
				slug: "premium-1-camo"
			},
			"F8389AA6-B23B-463E-A746-4081562D3516": {
				name: "BF3_ID_P_CAMO_NAME_CAMO4",
				image: "camo4",
				desc: a,
				slug: "expeditionary-force"
			},
			"1CD435BC-7173-4DB3-AD5F-BB551B6866B8": {
				name: "BF3_ID_P_CAMO_NAME_CAMO9",
				image: "camo9",
				desc: a,
				slug: "urban-pattern"
			},
			"25636973-295E-40CE-BD40-F0F2240F0E80": {
				name: "BF3_ID_P_CAMO_NAME_CAMO5",
				image: "camo5",
				desc: a,
				slug: "paratrooper"
			},
			"8A923743-2F34-4A81-B764-48BC53946C46": {
				name: "BF3_ID_P_CAMO_NAME_CAMO10",
				image: "camo10",
				desc: a,
				slug: "veteran-kit"
			},
			"F420379B-40A7-460E-9B4B-70EAB97CB2E3": {
				name: "BF3_ID_P_CAMO_NAME_PREMIUM2",
				image: "camocombo15",
				desc: a,
				slug: "premium-2-camo"
			},
			"D3EC06D5-817E-428C-9C05-AAB1667F839C": {
				name: "BF3_ID_P_CAMO_NAME_CAMO11",
				image: "camo11",
				desc: a,
				slug: "spec-ops-black"
			},
			"9C970EF8-5049-4332-9FB3-8FA7DC990B77": {
				name: "BF3_ID_P_CAMO_NAME_CAMO_SPECACT",
				image: "camocombo12",
				desc: a,
				slug: "specact"
			},
			"E3CDD406-BA95-43D4-83E2-64E177913C80": {
				name: "BF3_ID_P_CAMO_NAME_CAMO2",
				image: "camo2",
				desc: a,
				slug: "ranger-camo"
			}
		},
		weapons: {
			"75D1FFC8-D442-4212-B668-96AED9030FC6": {
				name: k,
				image: "rpk",
				desc: N,
				slug: tt
			},
			"55ADFBFC-12CC-28E7-4DA4-3D4C49CDF7F3": {
				name: y,
				image: Q,
				desc: S,
				slug: "m320-buck1"
			},
			"CB018ADD-3648-4504-9359-9BAFB8D92F7D": {
				name: x,
				image: "mk11_russian",
				desc: T,
				slug: X
			},
			"A9F5B1F6-D83E-4BD8-AFE8-08C4B0A3E697": {
				name: C,
				image: "svd_american",
				desc: L,
				slug: "svd"
			},
			"CB651B07-2CE4-4527-B1AC-2AEB6D04CBF5": {
				name: "BF3_ID_P_WNAME_SKS",
				image: "sks",
				desc: "BF3_ID_P_WDESC_SKS",
				slug: "sks"
			},
			"F0B12FF6-7D20-4E49-8F19-EF5F1E9CBA6D": {
				name: O,
				image: "m39",
				desc: A,
				slug: it
			},
			"EB17660D-D81B-4BB7-BE95-70662855489E": {
				name: O,
				image: "m39",
				desc: A,
				slug: it
			},
			"3F06931A-443C-6E78-DEF9-A33EB9F43D35": {
				name: "BF3_ID_P_WNAME_Pecheng",
				image: "pecheneg",
				desc: "BF3_ID_P_WDESC_Pecheng",
				slug: "pkp-pecheneg"
			},
			"4121E410-F5A8-F335-6FA5-782B486B0236": {
				name: "BF3_ID_P_WNAME_U_40MM_LVG",
				image: "m320-lvg",
				desc: l,
				slug: "assault-m320-lvg"
			},
			"5244385C-B7ED-4266-AB7C-C1C1B222A9CD": {
				name: "BF3_ID_P_WNAME_M4",
				image: R,
				desc: "BF3_ID_P_WDESC_M4",
				slug: "m4"
			},
			"42DB9F03-0224-4676-99FC-ED444E356290": {
				name: E,
				image: "m16a4_russian",
				desc: D,
				slug: "m16a3"
			},
			"1E5E0296-CFD0-448E-B1D7-F795E8F98E2C": {
				name: "BF3_ID_P_WNAME_G36C",
				image: "g36c",
				desc: "BF3_ID_P_WDESC_G36C",
				slug: "g36c"
			},
			"38C20C39-EE43-489F-AE95-DF0519F72409": {
				name: "BF3_ID_P_WNAME_M412Rex",
				image: "mp412rex",
				desc: "BF3_ID_P_WDESC_M412Rex",
				slug: "mp412-rex"
			},
			"9351DDBF-795A-4BC6-84D7-37B537E3D049": {
				name: "BF3_ID_P_WNAME_SV98",
				image: "sv98",
				desc: "BF3_ID_P_WDESC_SV98",
				slug: "sv98"
			},
			"A4F108EB-1FA2-4C94-93FE-357B1D7EBF4A": {
				name: _,
				image: "aks74u",
				desc: M,
				slug: ot
			},
			"FEFBA819-898F-4B66-8596-B6576FA9B28A": {
				name: C,
				image: "svd",
				desc: L,
				slug: "svd"
			},
			"96FC0A67-DEA2-4061-B955-E173A8DBB00D": {
				name: "BF3_ID_P_WNAME_Saiga12",
				image: "saiga12",
				desc: "BF3_ID_P_WDESC_Saiga12",
				slug: "saiga-12k"
			},
			"04FD6527-0BF0-4A67-9ABB-9F992BF2CBA0": {
				name: "BF3_ID_P_WNAME_Glock17",
				image: "glock17",
				desc: "BF3_ID_P_WDESC_Glock17",
				slug: "g17c"
			},
			"65D4A9F9-0ACD-46FD-9AE2-3E9670DD22FB": {
				name: "BF3_ID_P_WNAME_AN94",
				image: "an94",
				desc: "BF3_ID_P_WDESC_AN94",
				slug: "an-94"
			},
			"FE6292D5-79AD-1230-7B9A-AF80D020E256": {
				name: b,
				image: $,
				desc: l,
				slug: "m320-smoke1"
			},
			"1C689273-7637-40FF-89A5-E75F120D9E02": {
				name: I,
				image: "m27_russian",
				desc: q,
				slug: st
			},
			"4F90708E-6875-4A5E-B685-CAF310A0BA95": {
				name: "BF3_ID_P_WNAME_M1911LIT",
				image: "m1911flashlight_fancy",
				desc: "BF3_ID_P_WDESC_M1911LIT",
				slug: "m1911-tact"
			},
			"386F9329-7DE7-6FB9-1366-2877C698D9B7": {
				name: "BF3_ID_P_WNAME_SCARH",
				image: "scarh",
				desc: "BF3_ID_P_WDESC_SCARH",
				slug: "scar-h"
			},
			"BF6E6CB2-D5AA-4425-A0C8-0FB8D89A1372": {
				name: "BF3_ID_P_XP2_WNAME_LSAT",
				image: "xp2_lsat",
				desc: "BF3_ID_P_XP2_WDESC_LSAT",
				slug: "lsat"
			},
			"AC994B66-DA51-42FB-A234-FCBA33EB9AB7": {
				name: "BF3_ID_P_WNAME_GLOCK18SILENCED",
				image: "glock18_silenced",
				desc: "BF3_ID_P_WDESC_GLOCK18SILENCED",
				slug: "g18-supp"
			},
			"2A267103-14F2-4255-B0D4-819139A4E202": {
				name: "BF3_ID_P_WNAME_UMP45",
				image: "ump",
				desc: "BF3_ID_P_WDESC_UMP45",
				slug: "ump-45"
			},
			"F3EF48EB-37C3-4F5E-A2ED-ACE7E4D419DD": {
				name: "BF3_ID_P_WNAME_PDR",
				image: "magpul",
				desc: "BF3_ID_P_WDESC_PDR",
				slug: "pdw-r"
			},
			"05EB2892-8B51-488E-8956-4350C3D2BA27": {
				name: "BF3_ID_P_WNAME_M98B",
				image: "m98b",
				desc: "BF3_ID_P_WDESC_M98B",
				slug: "m98b"
			},
			"A4F683C2-40E2-464C-AE85-AFE4462F2D40": {
				name: "BF3_ID_P_WNAME_M9SILENCED",
				image: "m9_silenced",
				desc: "BF3_ID_P_WDESC_M9SILENCED",
				slug: "m9-supp"
			},
			"BA0AF247-2E5B-4574-8F89-515DFA1C767D": {
				name: "BF3_ID_P_XP2_WNAME_L86A1",
				image: "xp2_l86",
				desc: "BF3_ID_P_XP2_WDESC_L86A1",
				slug: "l86a2"
			},
			"07A6AB6A-457D-4481-94F9-A3FE15C3D923": {
				name: "BF3_ID_P_WNAME_MP443SILENCED",
				image: "mp443_silenced",
				desc: "BF3_ID_P_WDESC_MP443SILENCED",
				slug: "mp443-supp"
			},
			"6F741867-AE83-CC7D-BFB1-035452D7A5B4": {
				name: "BF3_ID_P_WNAME_USAS12",
				image: "usas12",
				desc: "BF3_ID_P_WDESC_USAS12",
				slug: "usas-12"
			},
			"655D5E41-6DB8-4F3C-9F2A-8117AE11699C": {
				name: x,
				image: "mk11",
				desc: T,
				slug: X
			},
			"FE05ACAA-32FC-4FD7-A34B-61413F6F7B1A": {
				name: "BF3_ID_P_XP1_WNAME_QBB95",
				image: "xp1_qbb95",
				desc: "BF3_ID_P_XP1_WDESC_QBB95",
				slug: "qbb-95"
			},
			"E7266EC2-4977-60F2-A7CB-6EF7D98A5E2E": {
				name: "BF3_ID_P_XP1_WNAME_HK53",
				image: "xp1_hk53",
				desc: "BF3_ID_P_XP1_WDESC_HK53",
				slug: "g53"
			},
			"A76BB99E-ABFE-48E9-9972-5D87E5365DAB": {
				name: "BF3_ID_P_WNAME_M1911",
				image: "m1911",
				desc: "BF3_ID_P_WDESC_M1911",
				slug: "m1911"
			},
			"AFF7E14E-5918-456B-9922-6ED1A50F3F15": {
				name: "BF3_ID_P_XP1_WNAME_QBU88",
				image: "xp1_qbu88",
				desc: "BF3_ID_P_XP1_WDESC_QBU88",
				slug: "qbu-88"
			},
			"5E2D49D1-D1BB-F553-78A5-8D537C43E624": {
				name: "BF3_ID_P_WNAME_AEK971",
				image: "aek971",
				desc: "BF3_ID_P_WDESC_AEK971",
				slug: "aek-971"
			},
			"60F775C4-7D70-4898-BD00-03AA60C8CE91": {
				name: "BF3_ID_P_XP2_WNAME_STEYRAUG",
				image: "xp2_steyraug",
				desc: "BF3_ID_P_XP2_WDESC_STEYRAUG",
				slug: "aug-a3"
			},
			"F3DF4C76-FD8F-0F11-3B8C-8B9C756EF089": {
				name: "BF3_ID_P_WNAME_M1014",
				image: "m1014",
				desc: "BF3_ID_P_WDESC_M1014",
				slug: "m1014"
			},
			"A7278B05-8D76-4A40-B65D-4414490F6886": {
				name: E,
				image: nt,
				desc: D,
				slug: "m16a3"
			},
			"512819DB-3E82-33B7-F1D5-E612C9A396BF": {
				name: "BF3_ID_P_WNAME_G3",
				image: "g3",
				desc: "BF3_ID_P_WDESC_G3",
				slug: "g3a3"
			},
			"1EA227D8-2EB5-A63B-52FF-BBA9CFE34AD8": {
				name: "BF3_ID_P_WNAME_Taurus44",
				image: "taurus44",
				desc: "BF3_ID_P_WDESC_Taurus44",
				slug: "44-magnum"
			},
			"120A0838-9E95-4564-A6F6-5A14A1E0AF85": {
				name: _,
				image: "aks74u_american",
				desc: M,
				slug: ot
			},
			"AEFD4BF4-4C08-4834-9DFF-1F7C529175AF": {
				name: "BF3_ID_P_WNAME_GLOCK17SILENCED",
				image: "glock17_silenced",
				desc: "BF3_ID_P_WDESC_GLOCK17SILENCED",
				slug: "g17c-supp"
			},
			"857E7B0D-7D26-CF09-BB5C-06F00C3F9189": {
				name: h,
				image: P,
				desc: c,
				slug: "m26-dart1"
			},
			"283C66DE-3866-46CD-A1C0-B456A5916537": {
				name: "BF3_ID_P_WNAME_40MM",
				image: "m320",
				desc: S,
				slug: "m320"
			},
			"3A6B6A16-E5A1-33E0-5B53-56E77833DAF4": {
				name: "BF3_ID_P_WNAME_M416",
				image: "m416",
				desc: "BF3_ID_P_WDESC_M416",
				slug: "m416"
			},
			"DB364A96-08FB-4C6E-856B-BD9749AE0A92": {
				name: "BF3_ID_P_WNAME_Glock18",
				image: "glock18",
				desc: "BF3_ID_P_WDESC_Glock18",
				slug: "g18"
			},
			"DC356150-2A5F-4FCA-BE6C-B993EE7F8A8B": {
				name: "BF3_ID_P_WNAME_Javelin",
				image: "fgm148",
				desc: "BF3_ID_P_WDESC_Javelin",
				slug: "fgm-148-javelin"
			},
			"69A28562-5569-4D76-82FB-98C4047306F1": {
				name: j,
				image: "m4a1_russian",
				desc: F,
				slug: R
			},
			"DB94F5EC-74D5-4DB2-9A15-E0C4154BFFD4": {
				name: "BF3_ID_P_WNAME_F2000",
				image: "f2000",
				desc: "BF3_ID_P_WDESC_F2000",
				slug: "f2000"
			},
			"1C426722-C0B6-492F-98B2-3B9D2B97C808": {
				name: "BF3_ID_P_WNAME_M1911SILENCED",
				image: "m1911silenced_fancy",
				desc: "BF3_ID_P_WDESC_M1911SILENCED",
				slug: "m1911-supp"
			},
			"F444F973-F411-4616-9A85-395B8ED7FEF2": {
				name: "BF3_ID_P_XP2_PREMIUM_WNAME_KNIFE_RAZOR",
				image: "combatknife",
				desc: "BF3_ID_P_XP2_PREMIUM_WDESC_KNIFE_RAZOR",
				slug: "acb-90"
			},
			"E43287AB-529D-4803-B585-6C17E2DD6AEB": {
				name: "BF3_ID_P_WNAME_MP443LIT",
				image: "mp443_flashlight",
				desc: "BF3_ID_P_WDESC_MP443LIT",
				slug: "mp443-tact"
			},
			"71B0A1D6-9E4F-40A3-9906-1A7F3AAD573A": {
				name: "BF3_ID_P_WNAME_MP443",
				image: "mp443_grach",
				desc: "BF3_ID_P_WDESC_MP443",
				slug: "mp443"
			},
			"CBAEC77C-A6AD-4D63-96BD-61FCA6C18417": {
				name: "BF3_ID_P_XP1_WNAME_L96",
				image: "xp1_l96",
				desc: "BF3_ID_P_XP1_WDESC_L96",
				slug: "l96"
			},
			"A607E88D-90B0-4ECD-B892-8BF66AEF90ED": {
				name: k,
				image: "rpk_american",
				desc: N,
				slug: tt
			},
			"9A97A9FE-DCE5-41E8-8D89-A421B103FA75": {
				name: "BF3_ID_P_XP1_XP1_WNAME_FAMAS",
				image: "xp1_famas",
				desc: "BF3_ID_P_XP1_WDESC_FAMAS",
				slug: "famas"
			},
			"3BA55147-6619-4697-8E2B-AC6B1D183C0E": {
				name: B,
				image: "ak74m",
				desc: H,
				slug: "ak-74m"
			},
			"AEAA518B-9253-40C2-AA18-A11F8F2D474C": {
				name: "BF3_ID_P_WNAME_M249",
				image: "m249",
				desc: "BF3_ID_P_WDESC_M249",
				slug: "m249"
			},
			"405F32BB-3E1A-4201-B96D-10B231D91BA5": {
				name: "BF3_ID_P_WNAME_M60",
				image: "m60",
				desc: "BF3_ID_P_WDESC_M60",
				slug: "m60e4"
			},
			"C79AAC6E-566E-40E1-B373-3B0029530393": {
				name: "BF3_ID_P_WNAME_A91",
				image: "a91",
				desc: "BF3_ID_P_WDESC_A91",
				slug: "a-91"
			},
			"21A80B6B-8FA6-4BCC-84D3-7ED782E978FA": {
				name: "BF3_ID_P_WNAME_ASVal",
				image: "asval",
				desc: "BF3_ID_P_WDESC_ASVal",
				slug: "as-val"
			},
			"C12E6868-FC08-4E25-8AD0-1C51201EA69B": {
				name: "BF3_ID_P_WNAME_P90",
				image: "p90",
				desc: "BF3_ID_P_WDESC_P90",
				slug: "p90"
			},
			"A8C7508A-F43B-4446-ACCE-F350EDFEDB28": {
				name: "BF3_ID_P_WNAME_M93R",
				image: "m93r",
				desc: "BF3_ID_P_WDESC_M93R",
				slug: "93r"
			},
			"CECC74B7-403F-4BA1-8ECD-4A59FB5379BD": {
				name: "BF3_ID_P_XP1_WNAME_PP19",
				image: "xp1_pp19",
				desc: "BF3_ID_P_XP1_WDESC_PP19",
				slug: "pp-19"
			},
			"07A4C87A-D325-4A73-8C5A-C001ACD13334": {
				name: "BF3_ID_P_WNAME_870",
				image: "remington870",
				desc: "BF3_ID_P_WDESC_870",
				slug: "870mcs"
			},
			"C48BC95B-1271-4F19-9D6C-A91C836F5432": {
				name: "BF3_ID_P_XP2_WNAME_HK417",
				image: "xp2_hk417",
				desc: "BF3_ID_P_XP2_WDESC_HK417",
				slug: "m417"
			},
			"9A0E2B30-5C19-842B-CECF-58A973A06951": {
				name: v,
				image: z,
				desc: m,
				slug: "m26-frag1"
			},
			"93CC5226-4381-7458-509E-B2D6F4498164": {
				name: "BF3_ID_P_WNAME_M40A5",
				image: "m40a5",
				desc: "BF3_ID_P_WDESC_M40A5",
				slug: "m40a5"
			},
			"6921F5C9-3487-43E6-86F5-296DA097FFFB": {
				name: "BF3_ID_P_WNAME_M16",
				image: nt,
				desc: "BF3_ID_P_WDESC_M16",
				slug: nt
			},
			"D4FF4D2C-361F-491E-B53D-207CF77FA609": {
				name: "BF3_ID_P_WNAME_M9LIT",
				image: "m9_flashlight",
				desc: "BF3_ID_P_WDESC_M9LIT",
				slug: "m9-tact"
			},
			"50849B49-F3DA-4C92-9830-D4A2932BC9E7": {
				name: "BF3_ID_P_WNAME_PP2000",
				image: "pp2000",
				desc: "BF3_ID_P_WDESC_PP2000",
				slug: "pp-2000"
			},
			"6D99F118-04BD-449A-BA0E-1978DDF5894D": {
				name: "BF3_ID_P_XP2_WNAME_SPAS12",
				image: "xp2_spas12",
				desc: "BF3_ID_P_XP2_WDESC_SPAS12",
				slug: "spas-12"
			},
			"04C8604E-37DE-4B51-B70A-66468003D604": {
				name: "BF3_ID_P_WNAME_MP7",
				image: "mp7",
				desc: "BF3_ID_P_WDESC_MP7",
				slug: "mp7"
			},
			"84B78F21-217A-4A46-A06E-34A90637BAC8": {
				name: B,
				image: "ak74m_american",
				desc: H,
				slug: "ak-74m"
			},
			"B2DEF86D-A127-769E-23ED-C9F47F29FAD3": {
				name: "BF3_ID_P_WNAME_M26Mass",
				image: "m26mass",
				desc: "BF3_ID_P_WDESC_M26Mass",
				slug: "m26-mass"
			},
			"6F3993B9-E8B2-412F-9361-341140FCBF79": {
				name: "BF3_ID_P_WNAME_Taurus44SCOPED",
				image: "taurus_scope",
				desc: "BF3_ID_P_WDESC_Taurus44SCOPED",
				slug: "44-scoped"
			},
			"12DA9127-4627-4A8F-88E5-1D43B4B9FBB6": {
				name: "BF3_ID_P_XP4_WNAME_CROSSBOW_RIFLESCOPE",
				image: "xp4_crossbowriflescope",
				desc: g,
				slug: "xbow-scoped"
			},
			"8DCA9ABD-0723-454C-9575-7E4CA0791D0B": {
				name: "BF3_ID_P_XP1_WNAME_L85A2",
				image: "xp1_l85a2",
				desc: "BF3_ID_P_XP1_WDESC_L85A2",
				slug: "l85a2"
			},
			"27F63AEA-DD70-4929-9B08-5FF8F075B75E": {
				name: "BF3_ID_P_WNAME_DAO12",
				image: "dao12",
				desc: "BF3_ID_P_WDESC_DAO12",
				slug: "dao-12"
			},
			"32B899E5-0542-45E6-A34B-86871C7FE098": {
				name: I,
				image: "m27",
				desc: q,
				slug: st
			},
			"0733BF61-8EBC-4666-9610-7E27D7313791": {
				name: "BF3_ID_P_WNAME_553",
				image: "sg553lb",
				desc: "BF3_ID_P_WDESC_553",
				slug: "sg553"
			},
			"D0E124FB-7116-4FBB-AF00-D8994AEB548D": {
				name: "BF3_ID_P_WNAME_Type88",
				image: "type88",
				desc: "BF3_ID_P_WDESC_Type88",
				slug: "type-88-lmg"
			},
			"35796A7B-C7FA-4C0F-AD99-3DDB3B60A293": {
				name: "BF3_ID_P_WNAME_IGLA",
				image: "sa18igla",
				desc: "BF3_ID_P_WDESC_IGLA",
				slug: "sa-18-igla"
			},
			"8963F500-E71D-41FC-4B24-AE17D18D8C73": {
				name: "BF3_ID_P_WNAME_knife",
				image: "knife",
				desc: "BF3_ID_P_WDESC_knife",
				slug: "knife"
			},
			"D67B1BD6-92FB-19D9-FBBC-53945F2DFB51": {
				name: p,
				image: U,
				desc: d,
				slug: "assault-m26-slug1"
			},
			"414C4598-4089-43E0-82FB-BBF7031D02E8": {
				name: "BF3_ID_P_WNAME_M240",
				image: "m240",
				desc: "BF3_ID_P_WDESC_M240",
				slug: "m240b"
			},
			"0A54B1A8-0368-4939-9558-D31E40FE488F": {
				name: "BF3_ID_P_XP2_WNAME_MTAR21",
				image: "xp2_mtar",
				desc: "BF3_ID_P_XP2_WDESC_MTAR21",
				slug: "mtar-21"
			},
			"08F58ECD-BC99-48AA-A9B3-47D412E99A4E": {
				name: "BF3_ID_P_WNAME_RPG7",
				image: "rpg7",
				desc: "BF3_ID_P_WDESC_RPG7",
				slug: "rpg-7v2"
			},
			"0E0E4701-359B-48FF-B91A-F4B6373435E4": {
				name: "BF3_ID_P_WNAME_KH2002",
				image: "kh2002",
				desc: "BF3_ID_P_WDESC_KH2002",
				slug: "kh2002"
			},
			"AAE173E4-8DD7-5C25-1763-7A4D9380EB10": {
				name: "BF3_ID_P_XP1_WNAME_JACKHAMMER",
				image: "xp1_jackhammer",
				desc: "BF3_ID_P_XP1_WDESC_JACKHAMMER",
				slug: "mk3a1"
			},
			"B20C05A8-D9E7-4ECB-AE8C-DEAD08A2E61E": {
				name: "BF3_ID_P_XP4_WNAME_CROSSBOW_KOBRA",
				image: "xp4_crossbowkobra",
				desc: g,
				slug: "xbow"
			},
			"94FADBCE-8D16-4736-85E8-D42FADCD174F": {
				name: "BF3_ID_P_XP2_WNAME_SCARL",
				image: "xp2_scarl",
				desc: "BF3_ID_P_XP2_WDESC_SCARL",
				slug: "scar-l"
			},
			"9B3AF503-2018-4BC9-893F-CD393D3BAD77": {
				name: "BF3_ID_P_WNAME_M1911TACTICAL",
				image: "m1911tactical_fancy",
				desc: "BF3_ID_P_WDESC_M1911TACTICAL",
				slug: "m1911-s-tac"
			},
			"DFBF6EA5-39C5-4ABA-B2C6-CAA6AD6C3786": {
				name: "BF3_ID_P_XP2_WNAME_MP5K",
				image: "xp2_mp5k",
				desc: "BF3_ID_P_XP2_WDESC_MP5K",
				slug: "m5k"
			},
			"E9BEDD8F-899F-3A3C-C561-5E58B350C60D": {
				name: "BF3_ID_P_WNAME_Stinger",
				image: "fim92a_stinger",
				desc: "BF3_ID_P_WDESC_Stinger",
				slug: "fim-92-stinger"
			},
			"B145A444-BC4D-48BF-806A-0CEFA0EC231B": {
				name: "BF3_ID_P_WNAME_M9",
				image: "m9",
				desc: "BF3_ID_P_WDESC_M9",
				slug: "m9"
			},
			"95AA1865-4324-4B23-BCC4-84F8F4D91922": {
				name: "BF3_ID_P_XP2_WNAME_ACR",
				image: "xp2_acr",
				desc: "BF3_ID_P_XP2_WDESC_ACR",
				slug: "acw-r"
			},
			"B1575807-C480-7286-719C-EE2520292A79": {
				name: j,
				image: R,
				desc: F,
				slug: R
			},
			"B8CA6D09-62C2-4208-A094-B8E50F716E47": {
				name: "BF3_ID_P_XP2_WNAME_JNG90",
				image: "xp2_jng90",
				desc: "BF3_ID_P_XP2_WDESC_JNG90",
				slug: "jng-90"
			},
			"D20984F3-364E-4C06-9879-09280EDF6DF3": {
				name: "BF3_ID_P_XP1_WNAME_QBZ95B",
				image: "xp1_qbz95b",
				desc: "BF3_ID_P_XP1_WDESC_QBZ95B",
				slug: "qbz-95b"
			},
			"95E00B23-BAD4-4F3B-A85E-990204EFF26B": {
				name: "BF3_ID_P_XP1_WNAME_MG36",
				image: "xp1_mg36",
				desc: "BF3_ID_P_XP1_WDESC_MG36",
				slug: "mg36"
			},
			"BFAC29DB-5193-4E69-96D9-37D4124C44C2": {
				name: "BF3_ID_P_WNAME_SMAW",
				image: "smaw",
				desc: "BF3_ID_P_WDESC_SMAW",
				slug: "smaw"
			}
		},
		vehicleunlocks: {
			ID_P_VUNAME_AASTEALTH: {
				name: "BF3_ID_P_VUNAME_AASTEALTH",
				image: "aastealth",
				desc: "BF3_ID_P_VUDESC_AASTEALTH",
				slug: "thermal-camo1"
			},
			ID_P_VUNAME_SHSTEALTH: {
				name: "BF3_ID_P_VUNAME_SHSTEALTH",
				image: "scoutstealth",
				desc: "BF3_ID_P_VUDESC_SHSTEALTH",
				slug: "stealth"
			},
			ID_P_VUNAME_SHFIREEX: {
				name: "BF3_ID_P_VUNAME_SHFIREEX",
				image: "scoutextinguisher",
				desc: "BF3_ID_P_VUDESC_SHFIREEX",
				slug: K
			},
			ID_P_VUNAME_IFVSTEALTH: {
				name: "BF3_ID_P_VUNAME_IFVSTEALTH",
				image: "ifvstealth",
				desc: "BF3_ID_P_VUDESC_IFVSTEALTH",
				slug: "thermal-camo"
			},
			ID_P_VUNAME_AHGUIDE: {
				name: "BF3_ID_P_VUNAME_AHGUIDE",
				image: "attackhelirocketguide",
				desc: "BF3_ID_P_VUDESC_AHGUIDE",
				slug: "guided-rocket"
			},
			ID_P_VUNAME_AHFIREEX: {
				name: "BF3_ID_P_VUNAME_AHFIREEX",
				image: "attackheliextinguisher",
				desc: "BF3_ID_P_VUDESC_AHFIREEX",
				slug: "extinguisher1"
			},
			ID_P_VUNAME_MBTATGM: {
				name: "BF3_ID_P_VUNAME_MBTATGM",
				image: "tank_destroyers_atgm",
				desc: w,
				slug: "guided-shell"
			},
			ID_P_VUNAME_AHAA: {
				name: "BF3_ID_P_VUNAME_AHAA",
				image: "attackhelisidewinders",
				desc: "BF3_ID_P_VUDESC_AHAA",
				slug: "heat-seekers"
			},
			ID_P_VUNAME_MBTARMOR: {
				name: "BF3_ID_P_VUNAME_MBTARMOR",
				image: "tank_destroyers_armor",
				desc: "BF3_ID_P_VUDESC_MBTARMOR",
				slug: "reactive-armor"
			},
			ID_P_VUNAME_AHPROX: {
				name: "BF3_ID_P_VUNAME_AHPROX",
				image: "attackheliproximity",
				desc: "BF3_ID_P_VUDESC_AHPROX",
				slug: "proximity-scan"
			},
			ID_P_VUNAME_ARTPROX: {
				name: "BF3_ID_P_VUNAME_ARTPROX",
				image: "mobile_artillery_proximity",
				desc: "BF3_ID_P_VUDESC_ARTPROX",
				slug: "proximity-scan1"
			},
			ID_P_VUNAME_MBTZOOM: {
				name: "BF3_ID_P_VUNAME_MBTZOOM",
				image: "tank_destroyers_zoom",
				desc: "BF3_ID_P_VUDESC_MBTZOOM",
				slug: "zoom-optics"
			},
			ID_P_VUNAME_SHBRADAR: {
				name: "BF3_ID_P_VUNAME_SHBRADAR",
				image: "scoutbelowradar",
				desc: "BF3_ID_P_VUDESC_SHBRADAR",
				slug: "below-radar"
			},
			ID_P_VUNAME_ARTZOOM: {
				name: "BF3_ID_P_VUNAME_ARTZOOM",
				image: "mobile_artillery_zoom",
				desc: "BF3_ID_P_VUDESC_ARTZOOM",
				slug: "zoom-optics1"
			},
			ID_P_VUNAME_IFVARMOR: {
				name: "BF3_ID_P_VUNAME_IFVARMOR",
				image: "ifvarmor",
				desc: "BF3_ID_P_VUDESC_IFVARMOR",
				slug: "reactive-armor1"
			},
			ID_P_VUNAME_JETAA: {
				name: "BF3_ID_P_VUNAME_JETAA",
				image: "jetsidewinder",
				desc: "BF3_ID_P_VUDESC_JETAA",
				slug: "heat-seekers1"
			},
			ID_P_VUNAME_AHZOOM: {
				name: "BF3_ID_P_VUNAME_AHZOOM",
				image: "attackhelizoom",
				desc: "BF3_ID_P_VUDESC_AHZOOM",
				slug: "zoom-optics2"
			},
			ID_P_VUNAME_ARTATACMS: {
				name: "BF3_ID_P_VUNAME_ARTATACMS",
				image: "mobile_artillery_atacms",
				desc: w,
				slug: "atacms-missile"
			},
			ID_P_VUNAME_MBTPROX: {
				name: "BF3_ID_P_VUNAME_MBTPROX",
				image: "tank_destroyers_proximity",
				desc: "BF3_ID_P_VUDESC_MBTPROX",
				slug: "proximity-scan2"
			},
			ID_P_VUNAME_AAAA: {
				name: "BF3_ID_P_VUNAME_AAAA",
				image: "aastinger",
				desc: "BF3_ID_P_VUDESC_AAAA",
				slug: "anti-air-missile"
			},
			ID_P_VUNAME_IFVENVG: {
				name: "BF3_ID_P_VUNAME_IFVENVG",
				image: "ifvenvg",
				desc: "BF3_ID_P_VUDESC_IFVENVG",
				slug: "thermal-optics"
			},
			ID_P_VUNAME_JETECM: {
				name: "BF3_ID_P_VUNAME_JETECM",
				image: "jetecm",
				desc: "BF3_ID_P_VUDESC_JETECM",
				slug: "ecm-jammer"
			},
			ID_P_VUNAME_MBTCITV: {
				name: "BF3_ID_P_VUNAME_MBTCITV",
				image: "mbtcitv",
				desc: "BF3_ID_P_VUDESC_MBTCITV",
				slug: "citv-station"
			},
			ID_P_VUNAME_MBTENVG: {
				name: "BF3_ID_P_VUNAME_MBTENVG",
				image: "tank_destroyers_envg",
				desc: "BF3_ID_P_VUDESC_MBTENVG",
				slug: "thermal-optics1"
			},
			ID_P_VUNAME_MBTCOAX: {
				name: "BF3_ID_P_VUNAME_MBTCOAX",
				image: "tank_destroyers_coax",
				desc: "BF3_ID_P_VUDESC_MBTCOAX",
				slug: "coaxial-lmg"
			},
			ID_P_VUNAME_AHSTEALTH: {
				name: "BF3_ID_P_VUNAME_AHSTEALTH",
				image: "attackhelistealth",
				desc: "BF3_ID_P_VUDESC_AHSTEALTH",
				slug: "stealth1"
			},
			ID_P_VUNAME_SHARADAR: {
				name: "BF3_ID_P_VUNAME_SHARADAR",
				image: "scoutradar",
				desc: "BF3_ID_P_VUDESC_SHARADAR",
				slug: "air-radar"
			},
			ID_P_VUNAME_AAWPNEFF: {
				name: "BF3_ID_P_VUNAME_AAWPNEFF",
				image: "aaweaponefficiency",
				desc: "BF3_ID_P_VUDESC_AAWPNEFF",
				slug: "belt-speed1"
			},
			ID_P_VUNAME_AAPROX: {
				name: "BF3_ID_P_VUNAME_AAPROX",
				image: "aaproximity",
				desc: "BF3_ID_P_VUDESC_AAPROX",
				slug: "proximity-scan3"
			},
			ID_P_VUNAME_IFVAT: {
				name: "BF3_ID_P_VUNAME_IFVAT",
				image: "ifvtow",
				desc: "BF3_ID_P_VUDESC_IFVAT",
				slug: "atgm-launcher"
			},
			ID_P_VUNAME_SHWPNEFF: {
				name: "BF3_ID_P_VUNAME_SHWPNEFF",
				image: "scoutweaponefficiency",
				desc: "BF3_ID_P_VUDESC_SHWPNEFF",
				slug: "belt-speed2"
			},
			ID_P_VUNAME_AHARADAR: {
				name: "BF3_ID_P_VUNAME_AHARADAR",
				image: "attackheliradar",
				desc: "BF3_ID_P_VUDESC_AHARADAR",
				slug: "air-radar2"
			},
			ID_P_VUNAME_AHFLARE: {
				name: "BF3_ID_P_VUNAME_AHFLARE",
				image: "attackheliflares",
				desc: "BF3_ID_P_VUDESC_AHFLARE",
				slug: "ir-flares"
			},
			ID_P_VUNAME_AAARMOR: {
				name: "BF3_ID_P_VUNAME_AAARMOR",
				image: "aaarmor",
				desc: "BF3_ID_P_VUDESC_AAARMOR",
				slug: "reactive-armor2"
			},
			ID_P_VUNAME_ARTSMOKE: {
				name: "BF3_ID_P_VUNAME_ARTSMOKE",
				image: "mobile_artillery_smoke",
				desc: "BF3_ID_P_VUDESC_ARTSMOKE",
				slug: "ir-smoke"
			},
			ID_P_VUNAME_SHFLARE: {
				name: "BF3_ID_P_VUNAME_SHFLARE",
				image: "scoutflares",
				desc: "BF3_ID_P_VUDESC_SHFLARE",
				slug: "ir-flares1"
			},
			ID_P_VUNAME_AHBRADAR: {
				name: "BF3_ID_P_VUNAME_AHBRADAR",
				image: "attackhelibelowradar",
				desc: "BF3_ID_P_VUDESC_AHBRADAR",
				slug: "below-radar1"
			},
			ID_P_VUNAME_ARTPREVENT: {
				name: "BF3_ID_P_VUNAME_ARTPREVENT",
				image: "mobile_artillery_regen",
				desc: "BF3_ID_P_VUDESC_ARTPREVENT",
				slug: "maintenance"
			},
			ID_P_VUNAME_JETSTEALTH: {
				name: "BF3_ID_P_VUNAME_JETSTEALTH",
				image: "jetstealth",
				desc: "BF3_ID_P_VUDESC_JETSTEALTH",
				slug: "stealth2"
			},
			ID_P_VUNAME_MBTSMOKE: {
				name: "BF3_ID_P_VUNAME_MBTSMOKE",
				image: "tank_destroyers_smoke",
				desc: "BF3_ID_P_VUDESC_MBTSMOKE",
				slug: "ir-smoke1"
			},
			ID_P_VUNAME_IFVSMOKE: {
				name: "BF3_ID_P_VUNAME_IFVSMOKE",
				image: "ifvsmoke",
				desc: "BF3_ID_P_VUDESC_IFVSMOKE",
				slug: "ir-smoke2"
			},
			ID_P_VUNAME_MBTWPNEFF: {
				name: "BF3_ID_P_VUNAME_MBTWPNEFF",
				image: "tank_destroyers_autloader",
				desc: "BF3_ID_P_VUDESC_MBTWPNEFF",
				slug: "autoloader"
			},
			ID_P_VUNAME_AAPREVENT: {
				name: "BF3_ID_P_VUNAME_AAPREVENT",
				image: "aapreventive",
				desc: "BF3_ID_P_VUDESC_AAPREVENT",
				slug: "maintenance5"
			},
			ID_P_VUNAME_JETMAVER: {
				name: "BF3_ID_P_VUNAME_JETMAVER",
				image: "jetmaverik",
				desc: "BF3_ID_P_VUDESC_JETMAVER",
				slug: "guided-missile"
			},
			ID_P_VUNAME_MBTCANISTER: {
				name: "BF3_ID_P_VUNAME_MBTCANISTER",
				image: "tank_destroyers_canister",
				desc: "BF3_ID_P_VUDESC_MBTCANISTER",
				slug: "canister-shell"
			},
			ID_P_VUNAME_AHPREV: {
				name: "BF3_ID_P_VUNAME_AHPREV",
				image: "attackhelipreventive",
				desc: "BF3_ID_P_VUDESC_AHPREV",
				slug: "maintenance1"
			},
			ID_P_VUNAME_AHWPNEFF: {
				name: "BF3_ID_P_VUNAME_AHWPNEFF",
				image: "attackheliweaponefficiency",
				desc: "BF3_ID_P_VUDESC_AHWPNEFF",
				slug: "autoloader1"
			},
			ID_P_VWNAME_ARTTOW: {
				name: "BF3_ID_P_VWNAME_ARTTOW",
				image: "mobile_artillery_tow",
				desc: "BF3_ID_P_VUDESC_ARTTOW",
				slug: "tow"
			},
			ID_P_VUNAME_SHPROX: {
				name: "BF3_ID_P_VUNAME_SHPROX",
				image: "scoutproximity",
				desc: "BF3_ID_P_VUDESC_SHPROX",
				slug: "proximity-scan4"
			},
			ID_P_VUNAME_JETFIREEX: {
				name: "BF3_ID_P_VUNAME_JETFIREEX",
				image: K,
				desc: "BF3_ID_P_VUDESC_LBTFIREEX",
				slug: "extinguisher2"
			},
			ID_P_VUNAME_IFVPROX: {
				name: "BF3_ID_P_VUNAME_IFVPROX",
				image: "ifvproximity",
				desc: "BF3_ID_P_VUDESC_IFVPROX",
				slug: "proximity-scan5"
			},
			ID_P_VUNAME_JETBRADAR: {
				name: "BF3_ID_P_VUNAME_JETBRADAR",
				image: "jetbelowradar",
				desc: "BF3_ID_P_VUDESC_JETBRADAR",
				slug: "below-radar2"
			},
			ID_P_VUNAME_IFVWPNEFF: {
				name: "BF3_ID_P_VUNAME_IFVWPNEFF",
				image: "ifvweaponefficiency",
				desc: "BF3_ID_P_VUDESC_IFVWPNEFF",
				slug: "belt-speed"
			},
			ID_P_VUNAME_AHECM: {
				name: "BF3_ID_P_VUNAME_AHECM",
				image: "attackheliecm",
				desc: "BF3_ID_P_VUDESC_AHECM",
				slug: "ecm-jammer1"
			},
			ID_P_VUNAME_AAENVG: {
				name: "BF3_ID_P_VUNAME_AAENVG",
				image: "aaenvg",
				desc: "BF3_ID_P_VUDESC_AAENVG",
				slug: "thermal-optics2"
			},
			ID_P_VUNAME_JETPROX: {
				name: "BF3_ID_P_VUNAME_JETPROX",
				image: "jetproximity",
				desc: "BF3_ID_P_VUDESC_JETPROX",
				slug: "proximity-scan6"
			},
			ID_P_VUNAME_SHHELL: {
				name: "BF3_ID_P_VUNAME_SHHELL",
				image: "scouthellfire",
				desc: "BF3_ID_P_VUDESC_SHHELL",
				slug: "guided-missile1"
			},
			ID_P_VUNAME_JETFLARE: {
				name: "BF3_ID_P_VUNAME_JETFLARE",
				image: "jetflares",
				desc: "BF3_ID_P_VUDESC_JETFLARE",
				slug: "ir-flares2"
			},
			ID_P_VUNAME_ARTAIRBURST: {
				name: "BF3_ID_P_VUNAME_ARTAIRBURST",
				image: "mobile_artillery_airburst",
				desc: "BF3_ID_P_VUDESC_ARTAIRBURST",
				slug: "air-burst-missile"
			},
			ID_P_VUNAME_AHENVG: {
				name: "BF3_ID_P_VUNAME_AHENVG",
				image: "attackhelienvg",
				desc: "BF3_ID_P_VUDESC_AHENVG",
				slug: "thermal-optics3"
			},
			ID_P_VUNAME_JETWPNEFF: {
				name: "BF3_ID_P_VUNAME_JETWPNEFF",
				image: "jetweaponefficiency",
				desc: "BF3_ID_P_VUDESC_JETWPNEFF",
				slug: "belt-speed3"
			},
			ID_P_VUNAME_AHGHELL: {
				name: "BF3_ID_P_VUNAME_AHGHELL",
				image: "attackhelihellfire",
				desc: "BF3_ID_P_VUDESC_AHGHELL",
				slug: "guided-missile2"
			},
			ID_P_VUNAME_JETAVIONIC: {
				name: "BF3_ID_P_VUNAME_JETAVIONIC",
				image: "jetavionics",
				desc: "BF3_ID_P_VUDESC_JETAVIONIC",
				slug: "beam-scanning"
			},
			ID_P_VUNAME_MBTPREVENT: {
				name: "BF3_ID_P_VUNAME_MBTPREVENT",
				image: "tank_destroyers_regen",
				desc: "BF3_ID_P_VUDESC_MBTPREVENT",
				slug: "maintenance2"
			},
			ID_P_VUNAME_AAARADAR: {
				name: "BF3_ID_P_VUNAME_AAARADAR",
				image: "aaradar",
				desc: "BF3_ID_P_VUDESC_AAARADAR",
				slug: "air-radar1"
			},
			ID_P_VUNAME_AHTVG: {
				name: "BF3_ID_P_VUNAME_AHTVG",
				image: "attackhelitvg",
				desc: "BF3_ID_P_VUDESC_AHTVG",
				slug: "tv-missile"
			},
			ID_P_VUNAME_JETROCKET: {
				name: "BF3_ID_P_VUNAME_JETROCKET",
				image: "rocketpod",
				desc: "BF3_ID_P_VUDESC_JETEROCKET",
				slug: "rocket-pods"
			},
			ID_P_VUNAME_IFVCOAX: {
				name: "BF3_ID_P_VUNAME_IFVCOAX",
				image: "ifvcoax",
				desc: "BF3_ID_P_VUDESC_IFVCOAX",
				slug: "coaxial-lmg1"
			},
			ID_P_VUNAME_SHECM: {
				name: "BF3_ID_P_VUNAME_SHECM",
				image: "scoutecm",
				desc: "BF3_ID_P_VUDESC_SHECM",
				slug: "ecm-jammer2"
			},
			ID_P_VUNAME_MBTHMG: {
				name: "BF3_ID_P_VUNAME_MBTHMG",
				image: "mbthmg",
				desc: "BF3_ID_P_VUDESC_MBTHMG",
				slug: "coaxial-hmg"
			},
			ID_P_VUNAME_SHPREV: {
				name: "BF3_ID_P_VUNAME_SHPREV",
				image: "scoutpreventive",
				desc: "BF3_ID_P_VUDESC_SHPREV",
				slug: "maintenance3"
			},
			ID_P_VUNAME_AAZOOM: {
				name: "BF3_ID_P_VUNAME_AAZOOM",
				image: "aazoom",
				desc: "BF3_ID_P_VUDESC_AAZOOM",
				slug: "zoom-optics3"
			},
			ID_P_VUNAME_IFVHELL: {
				name: "BF3_ID_P_VUNAME_IFVHELL",
				image: "ifvhellfire",
				desc: "BF3_ID_P_VUDESC_IFVHELL",
				slug: "guided-missile3"
			},
			ID_P_VUNAME_SHAA: {
				name: "BF3_ID_P_VUNAME_SHAA",
				image: "scoutsidewinder",
				desc: "BF3_ID_P_VUDESC_SHAA",
				slug: "heat-seekers2"
			},
			ID_P_VUNAME_AASMOKE: {
				name: "BF3_ID_P_VUNAME_AASMOKE",
				image: "aasmoke",
				desc: "BF3_ID_P_VUDESC_AASMOKE",
				slug: "ir-smoke3"
			},
			ID_P_VUNAME_ARTSTEALTH: {
				name: "BF3_ID_P_VUNAME_ARTSTEALTH",
				image: "mobile_artillery_stealth",
				desc: "BF3_ID_P_VUDESC_ARTSTEALTH",
				slug: "thermal-camo2"
			},
			ID_P_VUNAME_IFVPREVENT: {
				name: "BF3_ID_P_VUNAME_IFVPREVENT",
				image: "ifvpreventive",
				desc: "BF3_ID_P_VUDESC_IFVPREVENT",
				slug: "maintenance4"
			},
			ID_P_VUNAME_JETARADAR: {
				name: "BF3_ID_P_VUNAME_JETARADAR",
				image: "jetradar",
				desc: "BF3_ID_P_VUDESC_JETARADAR",
				slug: "air-radar3"
			},
			ID_P_VUNAME_IFVZOOM: {
				name: "BF3_ID_P_VUNAME_IFVZOOM",
				image: "ifvzoom",
				desc: "BF3_ID_P_VUDESC_IFVZOOM",
				slug: "zoom-optics4"
			},
			ID_P_VUNAME_ARTAA: {
				name: "BF3_ID_P_VUNAME_ARTAA",
				image: "mobile_artillery_aa",
				desc: "BF3_ID_P_VUDESC_ARTAA",
				slug: "anti-air-missile1"
			},
			ID_P_VUNAME_IFVAPFSDS: {
				name: "BF3_ID_P_VUNAME_IFVAPFSDS",
				image: "ifvapfsds-t",
				desc: "BF3_ID_P_VUDESC_IFVAPFSDS",
				slug: "apfsds-t-shell"
			},
			ID_P_VUNAME_AHLASER: {
				name: "BF3_ID_P_VUNAME_AHLASER",
				image: "attackhelilaser",
				desc: "BF3_ID_P_VUDESC_AHLASER",
				slug: "laser-painter"
			},
			ID_P_VWNAME_MBTAUTOCANNON: {
				name: "BF3_ID_P_VWNAME_MBTAUTOCANNON",
				image: "he_ammo",
				desc: "BF3_ID_P_VDESC_MBTAUTOCANNON",
				slug: "cannon-he"
			},
			ID_P_VUNAME_MBTSTEALTH: {
				name: "BF3_ID_P_VUNAME_MBTSTEALTH",
				image: "tank_destroyers_stealth",
				desc: "BF3_ID_P_VUDESC_MBTSTEALTH",
				slug: "thermal-camo3"
			},
			ID_P_VUNAME_JETPREV: {
				name: "BF3_ID_P_VUNAME_JETPREV",
				image: "jetpreventive",
				desc: "BF3_ID_P_VUDESC_JETPREV",
				slug: "maintenance6"
			},
			ID_P_VUNAME_ARTDEFENSE: {
				name: "BF3_ID_P_VUNAME_ARTDEFENSE",
				image: "mobile_artillery_defense",
				desc: "BF3_ID_P_VUDESC_ARTDEFENSE",
				slug: "proximity-defense"
			},
			ID_P_VUNAME_ARTWPNEFF: {
				name: "BF3_ID_P_VUNAME_ARTWPNEFF",
				image: "mobile_artillery_autoloader",
				desc: "BF3_ID_P_VUDESC_ARTWPNEFF",
				slug: "autoloader2"
			}
		}
	}
})();