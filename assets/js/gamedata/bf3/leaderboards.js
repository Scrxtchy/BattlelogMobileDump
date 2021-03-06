"no-require";
(function() {
	var e = "Mp_Main_Score",
		t = "Mp_Main_Seconds",
		n = "Mp_Main_Kills",
		r = "Mp_Vehicle_All_Kills_VehicleAll",
		i = "Mp_Main_Skill",
		s = "Mp_Main_ScorePerMinute",
		o = "Mp_Main_KillsDeathsRatio",
		u = "Mp_Accuracy_Accuracy",
		a = "Mp_Kill_Streak_Kill_Streak",
		f = "Mp_Melee_Kills_Melee",
		l = "Mp_Marksman_Longest_Headshot",
		c = "Mp_Headshots_",
		h = "Mp_Assault_Sc_Assault",
		p = "Mp_Engineer_Sc_Engineer",
		d = "Mp_Support_Sc_Support",
		v = "Mp_Recon_Sc_Recon",
		m = "Mp_Vehicle_MBT_Kills_MBT",
		g = "Mp_Vehicle_IFV_Kills_IFV",
		y = "Mp_Vehicle_AA_Kills_AA",
		b = "Mp_Vehicle_SH_Kills_SH",
		w = "Mp_Vehicle_Jet_Kills_Jet",
		E = "Mp_Vehicle_AH_Kills_AH",
		S = "Mp_WLR_Win_Loss_Ratio",
		x = "Mp_Nemesis_Nemesis",
		T = "Mp_Mvp_MVP_Ribbons",
		N = "Mp_Ace_Squad_ASQ_Ribbons",
		C = "score",
		k = "ID_WEB_LEADERBOARD_COLUMN_SCORE",
		L = "c___k_g",
		A = "ID_WEB_LEADERBOARD_COLUMN_KILLS",
		O = "playtime",
		M = "ID_WEB_LEADERBOARD_COLUMN_TIME_PLAYED",
		_ = "time",
		D = "rank",
		P = "ID_WEB_LEADERBOARD_COLUMN_RANK",
		H = "spm",
		B = "ID_WEB_LEADERBOARD_COLUMN_SCORE_PER_MINUTE",
		j = "elo",
		F = "ID_WEB_LEADERBOARD_COLUMN_SKILL",
		I = "kdr",
		q = "ID_WEB_LEADERBOARD_COLUMN_KILL_DEATH_RATIO",
		R = "float",
		U = "kills",
		z = "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_RIBBONS",
		W = "coopeasy_ts_ghva",
		X = "coopmedium_ts_ghva",
		V = "coophard_ts_ghva";
	exports.leaderboardSections = [{
		nameSID: "ID_WEB_LEADERBOARD_TABLIST_PROGRESSION",
		leaderboards: [e, t, n, r]
	}, {
		nameSID: "ID_WEB_LEADERBOARD_TABLIST_SKILL",
		leaderboards: [i, s, o, u]
	}, {
		nameSID: "ID_WEB_LEADERBOARD_TABLIST_KILLS",
		leaderboards: [a, f, l, c]
	}, {
		nameSID: "ID_WEB_LEADERBOARD_TABLIST_KIT",
		leaderboards: [h, p, d, v]
	}, {
		nameSID: "ID_WEB_LEADERBOARD_TABLIST_GROUND",
		leaderboards: [m, g, y]
	}, {
		nameSID: "ID_WEB_LEADERBOARD_TABLIST_AIR",
		leaderboards: [b, w, E]
	}, {
		nameSID: "ID_WEB_LEADERBOARD_TABLIST_TEAM",
		leaderboards: [S, x, T, N]
	}], exports.leaderboards = {
		soldier: {
			Mp_Main_Score: {
				keyName: e,
				sortby: 0,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: L,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: D,
					nameSID: P
				}, {
					name: H,
					nameSID: B
				}, {
					name: j,
					nameSID: F
				}, {
					name: I,
					nameSID: q,
					type: R
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_MAIN_SCORE"
			},
			Mp_Main_Kills: {
				keyName: n,
				sortby: 1,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: L,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: D,
					nameSID: P
				}, {
					name: H,
					nameSID: B
				}, {
					name: j,
					nameSID: F
				}, {
					name: I,
					nameSID: q,
					type: R
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_MAIN_KILLS"
			},
			Mp_Main_Seconds: {
				keyName: t,
				sortby: 2,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: L,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: D,
					nameSID: P
				}, {
					name: H,
					nameSID: B
				}, {
					name: j,
					nameSID: F
				}, {
					name: I,
					nameSID: q,
					type: R
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_MAIN_SECONDS"
			},
			Mp_Main_Rank: {
				keyName: "Mp_Main_Rank",
				sortby: 3,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: L,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: D,
					nameSID: P
				}, {
					name: H,
					nameSID: B
				}, {
					name: j,
					nameSID: F
				}, {
					name: I,
					nameSID: q,
					type: R
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_MAIN_RANK"
			},
			Mp_Main_ScorePerMinute: {
				keyName: s,
				sortby: 4,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: L,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: D,
					nameSID: P
				}, {
					name: H,
					nameSID: B
				}, {
					name: j,
					nameSID: F
				}, {
					name: I,
					nameSID: q,
					type: R
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_SCOREPERMINUTE"
			},
			Mp_Main_Skill: {
				keyName: i,
				sortby: 5,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: L,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: D,
					nameSID: P
				}, {
					name: H,
					nameSID: B
				}, {
					name: j,
					nameSID: F
				}, {
					name: I,
					nameSID: q,
					type: R
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_SKILL"
			},
			Mp_Main_KillsDeathsRatio: {
				keyName: o,
				sortby: 6,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: L,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: D,
					nameSID: P
				}, {
					name: H,
					nameSID: B
				}, {
					name: j,
					nameSID: F
				}, {
					name: I,
					nameSID: q,
					type: R
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_MAIN_KILLSDEATHSRATIO"
			},
			Mp_Assault_Sc_Assault: {
				keyName: h,
				sortby: 0,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: H,
					nameSID: B
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_ASSAULT_SC_ASSAULT"
			},
			Mp_Engineer_Sc_Engineer: {
				keyName: p,
				sortby: 0,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: H,
					nameSID: B
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_ENGINEER_SC_ENGINEER"
			},
			Mp_Recon_Sc_Recon: {
				keyName: v,
				sortby: 0,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: H,
					nameSID: B
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_RECON_SC_RECON"
			},
			Mp_Support_Sc_Support: {
				keyName: d,
				sortby: 0,
				columns: [{
					name: C,
					nameSID: k
				}, {
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: H,
					nameSID: B
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_SUPPORT_SC_SUPPORT"
			},
			Mp_Vehicle_MBT_Kills_MBT: {
				keyName: m,
				sortby: 0,
				columns: [{
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: C,
					nameSID: k
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_VEHICLE_MBT_KILLS_MBT"
			},
			Mp_Vehicle_IFV_Kills_IFV: {
				keyName: g,
				sortby: 0,
				columns: [{
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: C,
					nameSID: k
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_VEHICLE_IFV_KILLS_IFV"
			},
			Mp_Vehicle_AA_Kills_AA: {
				keyName: y,
				sortby: 0,
				columns: [{
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: C,
					nameSID: k
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_KILLS_AA"
			},
			Mp_Vehicle_AH_Kills_AH: {
				keyName: E,
				sortby: 0,
				columns: [{
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: C,
					nameSID: k
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_VEHICLE_AH_KILLS_AH"
			},
			Mp_Vehicle_SH_Kills_SH: {
				keyName: b,
				sortby: 0,
				columns: [{
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: C,
					nameSID: k
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_VEHICLE_SH_KILLS_SH"
			},
			Mp_Vehicle_Jet_Kills_Jet: {
				keyName: w,
				sortby: 0,
				columns: [{
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: C,
					nameSID: k
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_VEHICLE_JET_KILLS_JET"
			},
			Mp_Vehicle_All_Kills_VehicleAll: {
				keyName: r,
				sortby: 0,
				columns: [{
					name: U,
					nameSID: A
				}, {
					name: O,
					nameSID: M,
					type: _
				}, {
					name: C,
					nameSID: k
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_VEHICLE_ALL_KILLS_VEHICLEALL"
			},
			Mp_Accuracy_Accuracy: {
				keyName: u,
				sortby: 0,
				columns: [{
					name: "accuracy",
					nameSID: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_ACCURACY",
					type: "percent"
				}, {
					name: "hits",
					nameSID: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_HITS"
				}, {
					name: "shots",
					nameSID: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_SHOTS"
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_ACCURACY_ACCURACY"
			},
			Mp_Melee_Kills_Melee: {
				keyName: f,
				sortby: 0,
				columns: [{
					name: U,
					nameSID: A
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_MELEE_KILLS_MELEE"
			},
			Mp_Marksman_Longest_Headshot: {
				keyName: l,
				sortby: 0,
				columns: [{
					name: "distance",
					nameSID: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_DISTANCE",
					type: "distance_m"
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_MARKSMAN_LONGEST_HEADSHOT"
			},
			Mp_Headshots_: {
				keyName: c,
				sortby: 0,
				columns: [{
					name: "headshot",
					nameSID: "ID_WEB_COMMON_HEADSHOTS"
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_HEADSHOTS_"
			},
			Mp_WLR_Win_Loss_Ratio: {
				keyName: S,
				sortby: 0,
				columns: [{
					name: "win_loss_ratio",
					nameSID: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_RATIO",
					type: R
				}, {
					name: "wins",
					nameSID: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_WIN"
				}, {
					name: "loss",
					nameSID: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_LOSS"
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_WLR_WIN_LOSS_RATIO"
			},
			Mp_Kill_Streak_Kill_Streak: {
				keyName: a,
				sortby: 0,
				columns: [{
					name: "streak",
					nameSID: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_STREAK"
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_KILL_STREAK_KILL_STREAK"
			},
			Mp_Nemesis_Nemesis: {
				keyName: x,
				sortby: 0,
				columns: [{
					name: "nemesis",
					nameSID: "ID_WEB_LEADERBOARD_SPECIFIC_TABLE_NEMESIS"
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_NEMESIS_NEMESIS"
			},
			Mp_Mvp_MVP_Ribbons: {
				keyName: T,
				sortby: 0,
				columns: [{
					name: "r16_00",
					nameSID: z
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_MVP_MVP_RIBBONS"
			},
			Mp_Ace_Squad_ASQ_Ribbons: {
				keyName: N,
				sortby: 0,
				columns: [{
					name: "ribbons",
					nameSID: z
				}],
				nameSID: "ID_WEB_LEADERBOARD_TITLE_MP_ACE_SQUAD_ASQ_RIBBONS"
			}
		},
		coop: {
			Coop_002_Easy: {
				keyName: "Coop_002_Easy",
				sortby: 0,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_002_Medium: {
				keyName: "Coop_002_Medium",
				sortby: 1,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_002_Hard: {
				keyName: "Coop_002_Hard",
				sortby: 2,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_003_Easy: {
				keyName: "Coop_003_Easy",
				sortby: 0,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_003_Medium: {
				keyName: "Coop_003_Medium",
				sortby: 1,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_003_Hard: {
				keyName: "Coop_003_Hard",
				sortby: 2,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_006_Easy: {
				keyName: "Coop_006_Easy",
				sortby: 0,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_006_Medium: {
				keyName: "Coop_006_Medium",
				sortby: 1,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_006_Hard: {
				keyName: "Coop_006_Hard",
				sortby: 2,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_007_Easy: {
				keyName: "Coop_007_Easy",
				sortby: 0,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_007_Medium: {
				keyName: "Coop_007_Medium",
				sortby: 1,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_007_Hard: {
				keyName: "Coop_007_Hard",
				sortby: 2,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_009_Easy: {
				keyName: "Coop_009_Easy",
				sortby: 0,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_009_Medium: {
				keyName: "Coop_009_Medium",
				sortby: 1,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_009_Hard: {
				keyName: "Coop_009_Hard",
				sortby: 2,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_010_Easy: {
				keyName: "Coop_010_Easy",
				sortby: 0,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_010_Medium: {
				keyName: "Coop_010_Medium",
				sortby: 1,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			},
			Coop_010_Hard: {
				keyName: "Coop_010_Hard",
				sortby: 2,
				columns: [{
					name: W
				}, {
					name: X
				}, {
					name: V
				}]
			}
		}
	}
})();