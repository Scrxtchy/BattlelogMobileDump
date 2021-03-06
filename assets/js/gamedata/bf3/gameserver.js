"no-require";
(function() {
	var e = "percent",
		t = "true",
		n = "int",
		r = "false",
		i = "bool";
	exports.serverPresetMap = {
		1: {
			label: "ID_WEB_COMMON_DIFFICULTY_NORMAL"
		},
		2: {
			label: "ID_WEB_COMMON_DIFFICULTY_HARDCORE"
		},
		4: {
			label: "ID_WEB_FILTEREXTRABF3_INFANTRY_ONLY"
		},
		8: {
			label: "ID_WEB_FILTEREXTRABF3_CUSTOM"
		}
	}, exports.serverSettings = {
		vgmc: {
			min: 0,
			"default": 100,
			max: 5e3,
			descriptionSID: "ID_RSP_TICKET_PERCENTAGE_DESC",
			nameSID: "ID_RSP_TICKET_PERCENTAGE",
			unitType: e,
			ranked: t,
			key: "vgmc",
			type: n
		},
		vbdm: {
			min: 1,
			nameSID: "ID_RSP_BULLET_MODIFIER",
			max: 100,
			descriptionSID: "ID_RSP_BULLET_MODIFIER_DESC",
			"default": 100,
			unitType: e,
			ranked: r,
			key: "vbdm",
			type: n
		},
		vvsa: {
			min: 0,
			nameSID: "ID_RSP_VEHICLES",
			max: 1,
			descriptionSID: "ID_RSP_VEHICLES_DESC",
			"default": 1,
			unitType: "",
			ranked: t,
			key: "vvsa",
			type: i
		},
		vkca: {
			min: 0,
			nameSID: "ID_RSP_KILL_CAM",
			max: 1,
			descriptionSID: "ID_RSP_KILL_CAM_DESC",
			"default": 1,
			unitType: "",
			ranked: t,
			key: "vkca",
			type: i
		},
		vvsd: {
			min: 0,
			"default": 100,
			max: 500,
			descriptionSID: "ID_RSP_VEHICLE_RESPAWN_DELAY_DESC",
			nameSID: "ID_RSP_VEHICLE_RESPAWN_DELAY",
			unitType: e,
			ranked: t,
			key: "vvsd",
			type: n
		},
		vffi: {
			min: 0,
			nameSID: "ID_RSP_FRIENDLY_FIRE",
			max: 1,
			descriptionSID: "ID_RSP_FRIENDLY_FIRE_DESC",
			"default": 0,
			unitType: "",
			ranked: t,
			key: "vffi",
			type: i
		},
		vtkk: {
			min: 0,
			nameSID: "ID_RSP_BAN_AFTER_OF_TK",
			max: 100,
			descriptionSID: "ID_RSP_BAN_AFTER_OF_TK_DESC",
			"default": 3,
			unitType: "#",
			ranked: t,
			key: "vtkk",
			type: n
		},
		vnta: {
			min: 0,
			nameSID: "ID_RSP_NAMETAG",
			max: 1,
			descriptionSID: "ID_RSP_NAMETAG_DESC",
			"default": 1,
			unitType: "",
			ranked: t,
			key: "vnta",
			type: i
		},
		vnit: {
			min: 0,
			nameSID: "ID_RSP_KICK_IDLE_PLAYER",
			max: 1e3,
			descriptionSID: "ID_RSP_KICK_IDLE_PLAYER_DESC",
			"default": 300,
			unitType: "s",
			ranked: t,
			key: "vnit",
			type: n
		},
		vtkc: {
			min: 0,
			nameSID: "ID_RSP_KICK_AFTER_OF_TK",
			max: 100,
			descriptionSID: "ID_RSP_KICK_AFTER_OF_TK_DESC",
			"default": 5,
			unitType: "#",
			ranked: t,
			key: "vtkc",
			type: n
		},
		vhud: {
			min: 0,
			nameSID: "ID_RSP_HUD",
			max: 1,
			descriptionSID: "ID_RSP_HUD_DESC",
			"default": 1,
			unitType: "",
			ranked: t,
			key: "vhud",
			type: i
		},
		vaba: {
			min: 0,
			nameSID: "ID_RSP_TEAM_BALANCE",
			max: 1,
			descriptionSID: "ID_RSP_TEAM_BALANCE_DESC",
			"default": 1,
			unitType: "",
			ranked: t,
			key: "vaba",
			type: i
		},
		vmin: {
			min: 0,
			nameSID: "ID_RSP_MINIMAP",
			max: 1,
			descriptionSID: "ID_RSP_MINIMAP_DESC",
			"default": 1,
			unitType: "",
			ranked: t,
			key: "vmin",
			type: i
		},
		vrhe: {
			min: 0,
			nameSID: "ID_RSP_REGEN_HEALTH",
			max: 1,
			descriptionSID: "ID_RSP_REGEN_HEALTH_DESC",
			"default": 1,
			unitType: "",
			ranked: t,
			key: "vrhe",
			type: i
		},
		vmsp: {
			min: 0,
			nameSID: "ID_RSP_MINIMAP_SPOTTING",
			max: 1,
			descriptionSID: "ID_RSP_MINIMAP_SPOTTING_DESC",
			"default": 1,
			unitType: "",
			ranked: t,
			key: "vmsp",
			type: i
		},
		vshe: {
			min: 1,
			nameSID: "ID_RSP_PLAYER_HEALTH",
			max: 100,
			descriptionSID: "ID_RSP_PLAYER_HEALTH_DESC",
			"default": 100,
			unitType: e,
			ranked: r,
			key: "vshe",
			type: n
		},
		vpmd: {
			min: 0,
			nameSID: "ID_RSP_PLAYER_MAN_DOWN",
			max: 100,
			descriptionSID: "ID_RSP_PLAYER_MAN_DOWN_DESC",
			"default": 100,
			unitType: e,
			ranked: r,
			key: "vpmd",
			type: n
		},
		v3sp: {
			min: 0,
			nameSID: "ID_RSP_3D_SPOTTING",
			max: 1,
			descriptionSID: "ID_RSP_3D_SPOTTING_DESC",
			"default": 1,
			unitType: "",
			ranked: t,
			key: "v3sp",
			type: i
		},
		osls: {
			min: 0,
			nameSID: "ID_RSP_SQUAD_LEADER_SPAWN",
			max: 1,
			descriptionSID: "ID_RSP_SQUAD_LEADER_SPAWN_DESC",
			"default": 0,
			unitType: "",
			ranked: t,
			key: "osls",
			type: i
		},
		vprt: {
			min: 0,
			nameSID: "ID_RSP_PLAYER_RESPAWN",
			max: 100,
			descriptionSID: "ID_RSP_PLAYER_RESPAWN_DESC",
			"default": 100,
			unitType: e,
			ranked: r,
			key: "vprt",
			type: n
		},
		v3ca: {
			min: 0,
			nameSID: "ID_RSP_3P_VEHICLE_CAM",
			max: 1,
			descriptionSID: "ID_RSP_3P_VEHICLE_CAM_DESC",
			"default": 1,
			unitType: "",
			ranked: t,
			key: "v3ca",
			type: i
		}
	}
})();