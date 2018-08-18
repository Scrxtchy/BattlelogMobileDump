"no-require";
(function() {
	var e = "scavenger2d",
		t = "gunmaster2d",
		n = "conquest_domination2d",
		r = "servicestar";
	exports.awardsOrder = ["m01", "m02", "m03", "m04", "m05", "m06", "m07", "m08", "m09", "m10", "m11", "m12", "m13", "m14", "m15", "m16", "m17", "m18", "m19", "m20", "m21", "m22", "m23", "m24", "m25", "m26", "m27", "m28", "m29", "m30", "m31", "m32", "m33", "m34", "m35", "m36", "xp2mdom", "xp2mgm", "xp2mtdmcq", "xp3mts", "xp4mscv", "xp5m501", "xp5mas", "m37", "m38", "m39", "m40", "m41", "m42", "m43", "m44", "m45", "m46", "m47", "m48", "m49", "m50", "r01", "r02", "r03", "r04", "r05", "r06", "r07", "r08", "r10", "r11", "r12", "r13", "r14", "r15", "r16", "r17", "r18", "r19", "r20", "r24", "r25", "r27", "r26", "r28", "r29", "r30", "r31", "r32", "r33", "r34", "r40", "r41", "r42", "r43", "r44", "r45", "xp3rdom", "xp2rgm", "xp2rtdmc", "xp3rts", "xp4rscav", "xp5r501", "xp5asw", "r09", "r21", "r22", "r23", "r35", "r36", "r37", "r38", "r39", "xp4rndom", "xp3rngm", "xp2rntdmcq", "xp3rnts", "xp4rnscv", "xp5r502", "xp5ras"], exports.statsLocale = {
		awards: {
			m41: {
				image: "m41",
				name: "BF3_ID_P_AWARD_M41_NAME",
				desc: "BF3_ID_P_AWARD_M41_DESC"
			},
			m46: {
				image: "m46",
				name: "BF3_ID_P_AWARD_M46_NAME",
				desc: "BF3_ID_P_AWARD_M46_DESC"
			},
			m47: {
				image: "m47",
				name: "BF3_ID_P_AWARD_M47_NAME",
				desc: "BF3_ID_P_AWARD_M47_DESC"
			},
			m11: {
				image: "m11",
				name: "BF3_ID_P_AWARD_M11_NAME",
				desc: "BF3_ID_P_AWARD_M11_DESC"
			},
			m10: {
				image: "m10",
				name: "BF3_ID_P_AWARD_M10_NAME",
				desc: "BF3_ID_P_AWARD_M10_DESC"
			},
			m13: {
				image: "m13",
				name: "BF3_ID_P_AWARD_M13_NAME",
				desc: "BF3_ID_P_AWARD_M13_DESC"
			},
			m12: {
				image: "m12",
				name: "BF3_ID_P_AWARD_M12_NAME",
				desc: "BF3_ID_P_AWARD_M12_DESC"
			},
			m15: {
				image: "m15",
				name: "BF3_ID_P_AWARD_M15_NAME",
				desc: "BF3_ID_P_AWARD_M15_DESC"
			},
			m14: {
				image: "m14",
				name: "BF3_ID_P_AWARD_M14_NAME",
				desc: "BF3_ID_P_AWARD_M14_DESC"
			},
			m17: {
				image: "m17",
				name: "BF3_ID_P_AWARD_M17_NAME",
				desc: "BF3_ID_P_AWARD_M17_DESC"
			},
			m16: {
				image: "m16",
				name: "BF3_ID_P_AWARD_M16_NAME",
				desc: "BF3_ID_P_AWARD_M16_DESC"
			},
			m19: {
				image: "m19",
				name: "BF3_ID_P_AWARD_M19_NAME",
				desc: "BF3_ID_P_AWARD_M19_DESC"
			},
			m18: {
				image: "m18",
				name: "BF3_ID_P_AWARD_M18_NAME",
				desc: "BF3_ID_P_AWARD_M18_DESC"
			},
			m45: {
				image: "m45",
				name: "BF3_ID_P_AWARD_M45_NAME",
				desc: "BF3_ID_P_AWARD_M45_DESC"
			},
			m44: {
				image: "m44",
				name: "BF3_ID_P_AWARD_M44_NAME",
				desc: "BF3_ID_P_AWARD_M44_DESC"
			},
			xp4mscv: {
				image: e,
				name: "BF3_ID_XP4_P_AWARD_M_SCAVENGER_NAME",
				desc: "BF3_ID_XP4_P_AWARD_M_SCAVENGER_DESC"
			},
			m50: {
				image: "m50",
				name: "BF3_ID_P_AWARD_M50_NAME",
				desc: "BF3_ID_P_AWARD_M50_DESC"
			},
			m39: {
				image: "m39",
				name: "BF3_ID_P_AWARD_M39_NAME",
				desc: "BF3_ID_P_AWARD_M39_DESC"
			},
			m38: {
				image: "m38",
				name: "BF3_ID_P_AWARD_M38_NAME",
				desc: "BF3_ID_P_AWARD_M38_DESC"
			},
			m37: {
				image: "m37",
				name: "BF3_ID_P_AWARD_M37_NAME",
				desc: "BF3_ID_P_AWARD_M37_DESC"
			},
			m36: {
				image: "m36",
				name: "BF3_ID_P_AWARD_M36_NAME",
				desc: "BF3_ID_P_AWARD_M36_DESC"
			},
			m35: {
				image: "m35",
				name: "BF3_ID_P_AWARD_M35_NAME",
				desc: "BF3_ID_P_AWARD_M35_DESC"
			},
			m34: {
				image: "m34",
				name: "BF3_ID_P_AWARD_M34_NAME",
				desc: "BF3_ID_P_AWARD_M34_DESC"
			},
			m33: {
				image: "m33",
				name: "BF3_ID_P_AWARD_M33_NAME",
				desc: "BF3_ID_P_AWARD_M33_DESC"
			},
			m32: {
				image: "m32",
				name: "BF3_ID_P_AWARD_M32_NAME",
				desc: "BF3_ID_P_AWARD_M32_DESC"
			},
			m31: {
				image: "m31",
				name: "BF3_ID_P_AWARD_M31_NAME",
				desc: "BF3_ID_P_AWARD_M31_DESC"
			},
			m30: {
				image: "m30",
				name: "BF3_ID_P_AWARD_M30_NAME",
				desc: "BF3_ID_P_AWARD_M30_DESC"
			},
			xp5m501: {
				image: "m501",
				name: "BF3_ID_P_XP5_AWARD_M501_NAME",
				desc: "BF3_ID_P_XP5_AWARD_M501_DESC"
			},
			xp2mtdmcq: {
				image: "tdmcq2s",
				name: "BF3_ID_XP2_P_AWARD_M_TDMCQ_NAME",
				desc: "BF3_ID_XP2_P_AWARD_M_TDMCQ_DESC"
			},
			m06: {
				image: "m06",
				name: "BF3_ID_P_AWARD_M06_NAME",
				desc: "BF3_ID_P_AWARD_M06_DESC"
			},
			m07: {
				image: "m07",
				name: "BF3_ID_P_AWARD_M07_NAME",
				desc: "BF3_ID_P_AWARD_M07_DESC"
			},
			m04: {
				image: "m04",
				name: "BF3_ID_P_AWARD_M04_NAME",
				desc: "BF3_ID_P_AWARD_M04_DESC"
			},
			m05: {
				image: "m05",
				name: "BF3_ID_P_AWARD_M05_NAME",
				desc: "BF3_ID_P_AWARD_M05_DESC"
			},
			m02: {
				image: "m02",
				name: "BF3_ID_P_AWARD_M02_NAME",
				desc: "BF3_ID_P_AWARD_M02_DESC"
			},
			m03: {
				image: "m03",
				name: "BF3_ID_P_AWARD_M03_NAME",
				desc: "BF3_ID_P_AWARD_M03_DESC"
			},
			m01: {
				image: "m01",
				name: "BF3_ID_P_AWARD_M01_NAME",
				desc: "BF3_ID_P_AWARD_M01_DESC"
			},
			m08: {
				image: "m08",
				name: "BF3_ID_P_AWARD_M08_NAME",
				desc: "BF3_ID_P_AWARD_M08_DESC"
			},
			m09: {
				image: "m09",
				name: "BF3_ID_P_AWARD_M09_NAME",
				desc: "BF3_ID_P_AWARD_M09_DESC"
			},
			xp2mgm: {
				image: t,
				name: "BF3_ID_XP3_P_AWARD_M_GUNMASTER_NAME",
				desc: "BF3_ID_XP3_P_AWARD_M_GUNMASTER_DESC"
			},
			m48: {
				image: "m48",
				name: "BF3_ID_P_AWARD_M48_NAME",
				desc: "BF3_ID_P_AWARD_M48_DESC"
			},
			m49: {
				image: "m49",
				name: "BF3_ID_P_AWARD_M49_NAME",
				desc: "BF3_ID_P_AWARD_M49_DESC"
			},
			m28: {
				image: "m28",
				name: "BF3_ID_P_AWARD_M28_NAME",
				desc: "BF3_ID_P_AWARD_M28_DESC"
			},
			m29: {
				image: "m29",
				name: "BF3_ID_P_AWARD_M29_NAME",
				desc: "BF3_ID_P_AWARD_M29_DESC"
			},
			m24: {
				image: "m24",
				name: "BF3_ID_P_AWARD_M24_NAME",
				desc: "BF3_ID_P_AWARD_M24_DESC"
			},
			m25: {
				image: "m25",
				name: "BF3_ID_P_AWARD_M25_NAME",
				desc: "BF3_ID_P_AWARD_M25_DESC"
			},
			m26: {
				image: "m26",
				name: "BF3_ID_P_AWARD_M26_NAME",
				desc: "BF3_ID_P_AWARD_M26_DESC"
			},
			m27: {
				image: "m27",
				name: "BF3_ID_P_AWARD_M27_NAME",
				desc: "BF3_ID_P_AWARD_M27_DESC"
			},
			m20: {
				image: "m20",
				name: "BF3_ID_P_AWARD_M20_NAME",
				desc: "BF3_ID_P_AWARD_M20_DESC"
			},
			m21: {
				image: "m21",
				name: "BF3_ID_P_AWARD_M21_NAME",
				desc: "BF3_ID_P_AWARD_M21_DESC"
			},
			m22: {
				image: "m22",
				name: "BF3_ID_P_AWARD_M22_NAME",
				desc: "BF3_ID_P_AWARD_M22_DESC"
			},
			m23: {
				image: "m23",
				name: "BF3_ID_P_AWARD_M23_NAME",
				desc: "BF3_ID_P_AWARD_M23_DESC"
			},
			m42: {
				image: "m42",
				name: "BF3_ID_P_AWARD_M42_NAME",
				desc: "BF3_ID_P_AWARD_M42_DESC"
			},
			xp2mdom: {
				image: n,
				name: "BF3_ID_XP3_P_AWARD_M_DOMINATION_NAME",
				desc: "BF3_ID_XP3_P_AWARD_M_DOMINATION_DESC"
			},
			m43: {
				image: "m43",
				name: "BF3_ID_P_AWARD_M43_NAME",
				desc: "BF3_ID_P_AWARD_M43_DESC"
			},
			xp5mas: {
				image: "as",
				name: "BF3_ID_P_XP5_AWARD_M_AS_NAME",
				desc: "BF3_ID_P_XP5_AWARD_M_AS_DESC"
			},
			m40: {
				image: "m40",
				name: "BF3_ID_P_AWARD_M40_NAME",
				desc: "BF3_ID_P_AWARD_M40_DESC"
			},
			xp3mts: {
				image: "tank_superiority2d",
				name: "BF3_ID_XP3_P_AWARD_M_TANKSUPERIORITY_NAME",
				desc: "BF3_ID_XP3_P_AWARD_M_TANKSUPERIORITY_DESC"
			},
			r01: {
				image: "r01",
				name: "BF3_ID_P_AWARD_R01_NAME",
				desc: "BF3_ID_P_AWARD_R01_DESC"
			},
			r03: {
				image: "r03",
				name: "BF3_ID_P_AWARD_R03_NAME",
				desc: "BF3_ID_P_AWARD_R03_DESC"
			},
			r02: {
				image: "r02",
				name: "BF3_ID_P_AWARD_R02_NAME",
				desc: "BF3_ID_P_AWARD_R02_DESC"
			},
			r05: {
				image: "r05",
				name: "BF3_ID_P_AWARD_R05_NAME",
				desc: "BF3_ID_P_AWARD_R05_DESC"
			},
			r04: {
				image: "r04",
				name: "BF3_ID_P_AWARD_R04_NAME",
				desc: "BF3_ID_P_AWARD_R04_DESC"
			},
			r07: {
				image: "r07",
				name: "BF3_ID_P_AWARD_R07_NAME",
				desc: "BF3_ID_P_AWARD_R07_DESC"
			},
			r06: {
				image: "r06",
				name: "BF3_ID_P_AWARD_R06_NAME",
				desc: "BF3_ID_P_AWARD_R06_DESC"
			},
			r09: {
				image: "r09",
				name: "BF3_ID_P_AWARD_R09_NAME",
				desc: "BF3_ID_P_AWARD_R09_DESC"
			},
			r08: {
				image: "r08",
				name: "BF3_ID_P_AWARD_R08_NAME",
				desc: "BF3_ID_P_AWARD_R08_DESC"
			},
			r28: {
				image: "r28",
				name: "BF3_ID_P_AWARD_R28_NAME",
				desc: "BF3_ID_P_AWARD_R28_DESC"
			},
			xp3rts: {
				image: "tanksuperiority2d",
				name: "BF3_ID_XP3_P_AWARD_R_TANKSUPERIORITY_NAME",
				desc: "BF3_ID_XP3_P_AWARD_R_TANKSUPERIORITY_DESC"
			},
			r45: {
				image: "r45",
				name: "BF3_ID_P_AWARD_R45_NAME",
				desc: "BF3_ID_P_AWARD_R45_DESC"
			},
			r44: {
				image: "r44",
				name: "BF3_ID_P_AWARD_R44_NAME",
				desc: "BF3_ID_P_AWARD_R44_DESC"
			},
			r41: {
				image: "r41",
				name: "BF3_ID_P_AWARD_R41_NAME",
				desc: "BF3_ID_P_AWARD_R41_DESC"
			},
			r40: {
				image: "r40",
				name: "BF3_ID_P_AWARD_R40_NAME",
				desc: "BF3_ID_P_AWARD_R40_DESC"
			},
			r29: {
				image: "r29",
				name: "BF3_ID_P_AWARD_R29_NAME",
				desc: "BF3_ID_P_AWARD_R29_DESC"
			},
			r42: {
				image: "r42",
				name: "BF3_ID_P_AWARD_R42_NAME",
				desc: "BF3_ID_P_AWARD_R42_DESC"
			},
			r27: {
				image: "r27",
				name: "BF3_ID_P_AWARD_R27_NAME",
				desc: "BF3_ID_P_AWARD_R27_DESC"
			},
			r26: {
				image: "r26",
				name: "BF3_ID_P_AWARD_R26_NAME",
				desc: "BF3_ID_P_AWARD_R26_DESC"
			},
			r25: {
				image: "r25",
				name: "BF3_ID_P_AWARD_R25_NAME",
				desc: "BF3_ID_P_AWARD_R25_DESC"
			},
			r24: {
				image: "r24",
				name: "BF3_ID_P_AWARD_R24_NAME",
				desc: "BF3_ID_P_AWARD_R24_DESC"
			},
			r23: {
				image: "r23",
				name: "BF3_ID_P_AWARD_R23_NAME",
				desc: "BF3_ID_P_AWARD_R23_DESC"
			},
			r22: {
				image: "r22",
				name: "BF3_ID_P_AWARD_R22_NAME",
				desc: "BF3_ID_P_AWARD_R22_DESC"
			},
			r21: {
				image: "r21",
				name: "BF3_ID_P_AWARD_R21_NAME",
				desc: "BF3_ID_P_AWARD_R21_DESC"
			},
			r20: {
				image: "r20",
				name: "BF3_ID_P_AWARD_R20_NAME",
				desc: "BF3_ID_P_AWARD_R20_DESC"
			},
			xp3rngm: {
				image: "gmribbon",
				name: "BF3_ID_XP4_P_AWARD_N_GM_NAME",
				desc: "BF3_ID_XP4_P_AWARD_N_GM_DESC"
			},
			r30: {
				image: "r30",
				name: "BF3_ID_P_AWARD_R30_NAME",
				desc: "BF3_ID_P_AWARD_R30_DESC"
			},
			xp4rscav: {
				image: e,
				name: "BF3_ID_XP4_P_AWARD_R_SCAVENGER_NAME",
				desc: "BF3_ID_XP4_P_AWARD_R_SCAVENGER_DESC"
			},
			xp2rtdmc: {
				image: "tdmcq2d",
				name: "BF3_ID_XP2_P_AWARD_R_TDMCQ_NAME",
				desc: "BF3_ID_XP2_P_AWARD_R_TDMCQ_DESC"
			},
			xp2rgm: {
				image: t,
				name: "BF3_ID_XP3_P_AWARD_R_GUNMASTER_NAME",
				desc: "BF3_ID_XP3_P_AWARD_R_GUNMASTER_DESC"
			},
			xp3rnts: {
				image: "tanksuperiorityribbon",
				name: "BF3_ID_XP4_P_AWARD_N_TS_NAME",
				desc: "BF3_ID_XP4_P_AWARD_N_TS_DESC"
			},
			xp4rndom: {
				image: "conquest_dominationribbon",
				name: "BF3_ID_XP4_P_AWARD_N_DOMINATION_NAME",
				desc: "BF3_ID_XP4_P_AWARD_N_DOMINATION_DESC"
			},
			xp5ras: {
				image: "xp5_as",
				name: "BF3_ID_P_XP5_AWARD_R_AS_NAME",
				desc: "BF3_ID_P_XP5_AWARD_R_AS_DESC"
			},
			r16: {
				image: "r16",
				name: "BF3_ID_P_AWARD_R16_NAME",
				desc: "BF3_ID_P_AWARD_R16_DESC"
			},
			r17: {
				image: "r17",
				name: "BF3_ID_P_AWARD_R17_NAME",
				desc: "BF3_ID_P_AWARD_R17_DESC"
			},
			r14: {
				image: "r14",
				name: "BF3_ID_P_AWARD_R14_NAME",
				desc: "BF3_ID_P_AWARD_R14_DESC"
			},
			r15: {
				image: "r15",
				name: "BF3_ID_P_AWARD_R15_NAME",
				desc: "BF3_ID_P_AWARD_R15_DESC"
			},
			r12: {
				image: "r12",
				name: "BF3_ID_P_AWARD_R12_NAME",
				desc: "BF3_ID_P_AWARD_R12_DESC"
			},
			r13: {
				image: "r13",
				name: "BF3_ID_P_AWARD_R13_NAME",
				desc: "BF3_ID_P_AWARD_R13_DESC"
			},
			r10: {
				image: "r10",
				name: "BF3_ID_P_AWARD_R10_NAME",
				desc: "BF3_ID_P_AWARD_R10_DESC"
			},
			r11: {
				image: "r11",
				name: "BF3_ID_P_AWARD_R11_NAME",
				desc: "BF3_ID_P_AWARD_R11_DESC"
			},
			r43: {
				image: "r43",
				name: "BF3_ID_P_AWARD_R43_NAME",
				desc: "BF3_ID_P_AWARD_R43_DESC"
			},
			r18: {
				image: "r18",
				name: "BF3_ID_P_AWARD_R18_NAME",
				desc: "BF3_ID_P_AWARD_R18_DESC"
			},
			r19: {
				image: "r19",
				name: "BF3_ID_P_AWARD_R19_NAME",
				desc: "BF3_ID_P_AWARD_R19_DESC"
			},
			xp3rdom: {
				image: n,
				name: "BF3_ID_XP3_P_AWARD_R_DOMINATION_NAME",
				desc: "BF3_ID_XP3_P_AWARD_R_DOMINATION_DESC"
			},
			r38: {
				image: "r38",
				name: "BF3_ID_P_AWARD_R38_NAME",
				desc: "BF3_ID_P_AWARD_R38_DESC"
			},
			r39: {
				image: "r39",
				name: "BF3_ID_P_AWARD_R39_NAME",
				desc: "BF3_ID_P_AWARD_R39_DESC"
			},
			r34: {
				image: "r34",
				name: "BF3_ID_P_AWARD_R34_NAME",
				desc: "BF3_ID_P_AWARD_R34_DESC"
			},
			r35: {
				image: "r35",
				name: "BF3_ID_P_AWARD_R35_NAME",
				desc: "BF3_ID_P_AWARD_R35_DESC"
			},
			r36: {
				image: "r36",
				name: "BF3_ID_P_AWARD_R36_NAME",
				desc: "BF3_ID_P_AWARD_R36_DESC"
			},
			r37: {
				image: "r37",
				name: "BF3_ID_P_AWARD_R37_NAME",
				desc: "BF3_ID_P_AWARD_R37_DESC"
			},
			xp4rnscv: {
				image: "scavengerribbon",
				name: "BF3_ID_XP4_P_AWARD_N_SCAVENGER_NAME",
				desc: "BF3_ID_XP4_P_AWARD_N_SCAVENGER_DESC"
			},
			r31: {
				image: "r31",
				name: "BF3_ID_P_AWARD_R31_NAME",
				desc: "BF3_ID_P_AWARD_R31_DESC"
			},
			r32: {
				image: "r32",
				name: "BF3_ID_P_AWARD_R32_NAME",
				desc: "BF3_ID_P_AWARD_R32_DESC"
			},
			r33: {
				image: "r33",
				name: "BF3_ID_P_AWARD_R33_NAME",
				desc: "BF3_ID_P_AWARD_R33_DESC"
			},
			xp5asw: {
				image: "xp5_aswinner",
				name: "BF3_ID_P_XP5_AWARD_R_W_AS_NAME",
				desc: "BF3_ID_P_XP5_AWARD_R_W_AS_DESC"
			},
			xp5r501: {
				image: "r501",
				name: "BF3_ID_P_XP5_AWARD_R501_NAME",
				desc: "BF3_ID_P_XP5_AWARD_R501_DESC"
			},
			xp5r502: {
				image: "r502",
				name: "BF3_ID_P_XP5_AWARD_R502_NAME",
				desc: "BF3_ID_P_XP5_AWARD_R502_DESC"
			},
			xp2rntdmcq: {
				image: "tdmcqribbon",
				name: "BF3_ID_XP4_P_AWARD_N_TDMCQ_NAME",
				desc: "BF3_ID_XP4_P_AWARD_N_TDMCQ_DESC"
			},
			sshapG17: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_GLOCK17",
				desc: "BF3_ID_P_WSTAR_DESC_GLOCK17"
			},
			sshaarAK74: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_AK74M",
				desc: "BF3_ID_P_WSTAR_DESC_AK74M"
			},
			sshasgUSAS: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_USAS12",
				desc: "BF3_ID_P_WSTAR_DESC_USAS12"
			},
			sshasrL96: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_L96",
				desc: "BF3_ID_P_WSTAR_DESC_L96"
			},
			sshaarSCARL: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_SCARL",
				desc: "BF3_ID_P_WSTAR_DESC_SCARL"
			},
			sshasmVAL: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_ASVAL",
				desc: "BF3_ID_P_WSTAR_DESC_ASVAL"
			},
			sshasmPP2000: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_PP2000",
				desc: "BF3_ID_P_WSTAR_DESC_PP2000"
			},
			sshapg18: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_GLOCK18",
				desc: "BF3_ID_P_WSTAR_DESC_GLOCK18"
			},
			sshasgDAO: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_DAO12",
				desc: "BF3_ID_P_WSTAR_DESC_DAO12"
			},
			sshasmPP19: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_PP19",
				desc: "BF3_ID_P_WSTAR_DESC_PP19"
			},
			sshapG17S: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_GLOCK17SILENCED",
				desc: "BF3_ID_P_WSTAR_DESC_GLOCK17SILENCED"
			},
			sshawasK: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_KNIFE",
				desc: "BF3_ID_P_WSTAR_DESC_KNIFE"
			},
			sshasmM5K: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_MP5K",
				desc: "BF3_ID_P_WSTAR_DESC_MP5K"
			},
			sshaarAN94: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_AN94",
				desc: "BF3_ID_P_WSTAR_DESC_AN94"
			},
			sshawLATSMAW: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_SMAW",
				desc: "BF3_ID_P_WSTAR_DESC_SMAW"
			},
			sshaarKH: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_KH2002",
				desc: "BF3_ID_P_WSTAR_DESC_KH2002"
			},
			sshacaG36: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_G36C",
				desc: "BF3_ID_P_WSTAR_DESC_G36C"
			},
			sshapg18S: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_GLOCK18SILENCED",
				desc: "BF3_ID_P_WSTAR_DESC_GLOCK18SILENCED"
			},
			sshapTaur: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_TAURUS44",
				desc: "BF3_ID_P_WSTAR_DESC_TAURUS44"
			},
			sshawaeC4: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_C4",
				desc: "BF3_ID_P_WSTAR_DESC_C4"
			},
			sshasrJNG90: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_JNG90",
				desc: "BF3_ID_P_WSTAR_DESC_JNG90"
			},
			sshawaeClay: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_CLAY",
				desc: "BF3_ID_P_WSTAR_DESC_CLAY"
			},
			sshasmP90: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_P90",
				desc: "BF3_ID_P_WSTAR_DESC_P90"
			},
			sshawLATRPG: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_RPG7",
				desc: "BF3_ID_P_WSTAR_DESC_RPG7"
			},
			sshasrQBU88: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_QBU88",
				desc: "BF3_ID_P_WSTAR_DESC_QBU88"
			},
			sshacaHK53: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_HK53",
				desc: "BF3_ID_P_WSTAR_DESC_HK53"
			},
			sshasrM40: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M40A5",
				desc: "BF3_ID_P_WSTAR_DESC_M40A5"
			},
			sshasgSaiga: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_SAIGA",
				desc: "BF3_ID_P_WSTAR_DESC_SAIGA"
			},
			sshaarAEK: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_AEK971",
				desc: "BF3_ID_P_WSTAR_DESC_AEK971"
			},
			sshacaSG553: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_SG553",
				desc: "BF3_ID_P_WSTAR_DESC_SG553"
			},
			sshamgLSAT: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_LSAT",
				desc: "BF3_ID_P_WSTAR_DESC_LSAT"
			},
			sscobc: {
				image: r,
				name: "BF3_ID_P_COOP_STAR_NAME_COOP",
				desc: "BF3_ID_P_COOP_STAR_DESC_COOP"
			},
			ssclbas: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_ASSAULT",
				desc: "BF3_ID_P_CLASS_STAR_DESC_ASSAULT"
			},
			ssclbvifv: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_IFV",
				desc: "BF3_ID_P_CLASS_STAR_DESC_IFV"
			},
			sshaarM16: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M16A4",
				desc: "BF3_ID_P_WSTAR_DESC_M16A4"
			},
			sshasrMK11: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_MK11",
				desc: "BF3_ID_P_WSTAR_DESC_MK11"
			},
			sshawasXBK: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_XBOW",
				desc: "BF3_ID_P_WSTAR_DESC_XBOW"
			},
			sshaarL85A2: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_L85A2",
				desc: "BF3_ID_P_WSTAR_DESC_L85A2"
			},
			sshawasXBS: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_XBOWSCOPED",
				desc: "BF3_ID_P_WSTAR_DESC_XBOWSCOPED"
			},
			sshaarF2: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_F2000",
				desc: "BF3_ID_P_WSTAR_DESC_F2000"
			},
			sshawahUSG: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M26",
				desc: "BF3_ID_P_WSTAR_DESC_M26"
			},
			ssclbvlbt: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_TANKDESTROYER",
				desc: "BF3_ID_P_CLASS_STAR_DESC_TANKDESTROYER"
			},
			sshasrSVD: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_SVD",
				desc: "BF3_ID_P_WSTAR_DESC_SVD"
			},
			sshapMP443S: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_MP443SILENCED",
				desc: "BF3_ID_P_WSTAR_DESC_MP443SILENCED"
			},
			sshapM9: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M9",
				desc: "BF3_ID_P_WSTAR_DESC_M9"
			},
			sshaarFAMAS: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_FAMAS",
				desc: "BF3_ID_P_WSTAR_DESC_FAMAS"
			},
			sshapM412: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M412REX",
				desc: "BF3_ID_P_WSTAR_DESC_M412REX"
			},
			sshasgSPAS12: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_SPAS12",
				desc: "BF3_ID_P_WSTAR_DESC_SPAS12"
			},
			sshaarAUG: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_STEYRAUG",
				desc: "BF3_ID_P_WSTAR_DESC_STEYRAUG"
			},
			sshapMP443L: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_MP443LIT",
				desc: "BF3_ID_P_WSTAR_DESC_MP443LIT"
			},
			sshasrM98: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M98B",
				desc: "BF3_ID_P_WSTAR_DESC_M98B"
			},
			sshaarG3: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_G3A4",
				desc: "BF3_ID_P_WSTAR_DESC_G3A4"
			},
			sshamgM249: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M249",
				desc: "BF3_ID_P_WSTAR_DESC_M249"
			},
			sshamgM240: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M240",
				desc: "BF3_ID_P_WSTAR_DESC_M240"
			},
			sshasmUMP: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_UMP",
				desc: "BF3_ID_P_WSTAR_DESC_UMP"
			},
			sshamgQBB95: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_QBB95",
				desc: "BF3_ID_P_WSTAR_DESC_QBB95"
			},
			sshaarM416: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M416",
				desc: "BF3_ID_P_WSTAR_DESC_M416"
			},
			sshamgL86A1: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_L86A1",
				desc: "BF3_ID_P_WSTAR_DESC_L86A1"
			},
			sshamgM27: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M27",
				desc: "BF3_ID_P_WSTAR_DESC_M27"
			},
			sshasg870: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_870",
				desc: "BF3_ID_P_WSTAR_DESC_870"
			},
			ssclbvah: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_AHELI",
				desc: "BF3_ID_P_CLASS_STAR_DESC_AHELI"
			},
			sshapTaurS: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_TAURUS44SCOPED",
				desc: "BF3_ID_P_WSTAR_DESC_TAURUS44SCOPED"
			},
			sshacaQBZ95B: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_QBZ95B",
				desc: "BF3_ID_P_WSTAR_DESC_QBZ95B"
			},
			ssclbvaa: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_AA",
				desc: "BF3_ID_P_CLASS_STAR_DESC_AA"
			},
			sshasmPDR: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_PDR",
				desc: "BF3_ID_P_WSTAR_DESC_PDR"
			},
			sshasgJackH: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_JACKH",
				desc: "BF3_ID_P_WSTAR_DESC_JACKH"
			},
			ssclbsu: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_SUPPORT",
				desc: "BF3_ID_P_CLASS_STAR_DESC_SUPPORT"
			},
			ssclbvjet: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_JET",
				desc: "BF3_ID_P_CLASS_STAR_DESC_JET"
			},
			sshamgMG36: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_MG36",
				desc: "BF3_ID_P_WSTAR_DESC_MG36"
			},
			sshasgM1014: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M1014",
				desc: "BF3_ID_P_WSTAR_DESC_M1014"
			},
			sshasrSV98: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_SV98",
				desc: "BF3_ID_P_WSTAR_DESC_SV98"
			},
			ssclbr: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_RECON",
				desc: "BF3_ID_P_CLASS_STAR_DESC_RECON"
			},
			sshawahUGL: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M320HE",
				desc: "BF3_ID_P_WSTAR_DESC_M320HE"
			},
			sshacaSCAR: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_SCARH",
				desc: "BF3_ID_P_WSTAR_DESC_SCARH"
			},
			ssclbe: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_ENGINEER",
				desc: "BF3_ID_P_CLASS_STAR_DESC_ENGINEER"
			},
			sshawLAAIGL: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_IGLA",
				desc: "BF3_ID_P_WSTAR_DESC_IGLA"
			},
			sshacaA91: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_A91",
				desc: "BF3_ID_P_WSTAR_DESC_A91"
			},
			sshacaAKS: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_AKS74U",
				desc: "BF3_ID_P_WSTAR_DESC_AKS74U"
			},
			sshapM1911: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M1911",
				desc: "BF3_ID_P_WSTAR_DESC_M1911"
			},
			sshamgRPK: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_RPK",
				desc: "BF3_ID_P_WSTAR_DESC_RPK"
			},
			ssclbvsh: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_SHELI",
				desc: "BF3_ID_P_CLASS_STAR_DESC_SHELI"
			},
			sshawLATJAV: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_JAVELIN",
				desc: "BF3_ID_P_WSTAR_DESC_JAVELIN"
			},
			sshacaACR: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_ACR",
				desc: "BF3_ID_P_WSTAR_DESC_ACR"
			},
			sshasrHK417: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_HK417",
				desc: "BF3_ID_P_WSTAR_DESC_HK417"
			},
			sshapM1911T: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M1911TACTICAL",
				desc: "BF3_ID_P_WSTAR_DESC_M1911TACTICAL"
			},
			sshasmMP7: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_MP7",
				desc: "BF3_ID_P_WSTAR_DESC_MP7"
			},
			sshapM93R: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M93R",
				desc: "BF3_ID_P_WSTAR_DESC_M93R"
			},
			sshapM1911S: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M1911SILENCED",
				desc: "BF3_ID_P_WSTAR_DESC_M1911SILENCED"
			},
			sshamgM60: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M60",
				desc: "BF3_ID_P_WSTAR_DESC_M60"
			},
			sshapM1911L: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M1911LIT",
				desc: "BF3_ID_P_WSTAR_DESC_M1911LIT"
			},
			sshapM9S: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M9SILENCED",
				desc: "BF3_ID_P_WSTAR_DESC_M9SILENCED"
			},
			ssclbvmbt: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_MBT",
				desc: "BF3_ID_P_CLASS_STAR_DESC_MBT"
			},
			sshapMP443: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_MP443",
				desc: "BF3_ID_P_WSTAR_DESC_MP443"
			},
			sshasrSKS: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_SKS",
				desc: "BF3_ID_P_WSTAR_DESC_SKS"
			},
			sshamgT88: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_TYPE88",
				desc: "BF3_ID_P_WSTAR_DESC_TYPE88"
			},
			sshacaM4: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M4A1",
				desc: "BF3_ID_P_WSTAR_DESC_M4A1"
			},
			sshawaeMine: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_MINE",
				desc: "BF3_ID_P_WSTAR_DESC_MINE"
			},
			sshamgPech: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_PECHENEG",
				desc: "BF3_ID_P_WSTAR_DESC_PECHENEG"
			},
			sshacaMTAR21: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_MTAR21",
				desc: "BF3_ID_P_WSTAR_DESC_MTAR21"
			},
			ssclbvart: {
				image: r,
				name: "BF3_ID_P_CLASS_STAR_NAME_ARTILLERY",
				desc: "BF3_ID_P_CLASS_STAR_DESC_ARTILLERY"
			},
			sshasrM39: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_M39",
				desc: "BF3_ID_P_WSTAR_DESC_M39"
			},
			sshawLAAFIM: {
				image: r,
				name: "BF3_ID_P_WSTAR_NAME_STINGER",
				desc: "BF3_ID_P_WSTAR_DESC_STINGER"
			}
		}
	}
})();