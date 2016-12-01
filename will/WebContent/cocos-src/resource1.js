var LTGV = {
	data : {}
}

var LT = {
	RunColor : function() {
		var rcolor = Math.random() * 255;
		var gcolor = Math.random() * 255;
		var bcolor = Math.random() * 255;
		var color = cc.color(rcolor, gcolor, bcolor);
		return color
	}
};
console.log("worlds LT is ready");
var res = {
	helloBG_png : "cocos-res/HelloWorld.png",
	nothing : "cocos-res/nothing.png",
	btn_addLine : "cocos-res/btn_addLine.png",
	btn_singularity : "cocos-res/btn_singularity.png",
	btn_moveLayerOpen : "cocos-res/btn_moveLayerOpenx55.png",
	btn_moveLayerClose : "cocos-res/btn_moveLayerClosex55.png",
	charmap_png : "cocos-res/TX580/font_N0.png",
//
};
var res_other = {
	special_7 : "cocos-res/TX580/special_7.png",
	guanhuan1 : "cocos-res/TX580/glowring05_mip_0.png"

};

var res_npc = {
	npc1 : "cocos-res/players/Legion/Golden/Roles_1@61x85.png",
	npc2 : "cocos-res/players/Legion/Golden/Roles_2@61x85.png",
	npc3 : "cocos-res/players/Legion/Golden/Roles_3@61x85.png",
	npc4 : "cocos-res/players/Legion/Golden/Roles_4@61x85.png",
	npc5 : "cocos-res/players/Legion/Golden/Roles_5@61x85.png",
	npc6 : "cocos-res/players/Legion/Golden/Roles_6@61x85.png",

}

var effone = {
	effect14 : "cocos-res/effect/effect14.png",//
	effect33 : "cocos-res/effect/effect33.png",//
	effect35 : "cocos-res/effect/effect35.png",//
	effect4 : "cocos-res/effect/effect4.png",//
	effect5 : "cocos-res/effect/effect5.png",//
	effect6 : "cocos-res/effect/effect6.png"
}

var BX1 = [ "cocos-res/effect/123/game_effec_clear_s1.png", //
"cocos-res/effect/123/game_effec_clear_s2.png",//
"cocos-res/effect/123/game_effec_clear_s3.png",//
"cocos-res/effect/123/game_effec_clear_s4.png" //
];

var BX2 = [ "cocos-res/effect/124/effect_firework_1_01.png",//
"cocos-res/effect/124/effect_firework_1_02.png",//
"cocos-res/effect/124/effect_firework_1_03.png",//
"cocos-res/effect/124/effect_firework_1_04.png" //
];

var BX3 = [ "cocos-res/effect/36/1.png", //
"cocos-res/effect/36/2.png", //
"cocos-res/effect/36/3.png", //
"cocos-res/effect/36/4.png", //
"cocos-res/effect/36/5.png", //
"cocos-res/effect/36/6.png", //
"cocos-res/effect/36/7.png" ];

var BX4 = [ "cocos-res/effect/103/a01.png", //
"cocos-res/effect/103/a02.png", //
"cocos-res/effect/103/a03.png", //
"cocos-res/effect/103/a04.png"//
];
var BX5 = [ "cocos-res/effect/a2/LAZY_LOAD_hit03_00.png", //
"cocos-res/effect/a2/LAZY_LOAD_hit03_01.png", //
"cocos-res/effect/a2/LAZY_LOAD_hit03_02.png" ];

var res_building = {
	jz_biaoju : "cocos-res/building/jz_biaoju.png",
	jz_dangpu : "cocos-res/building/jz_dangpu.png",
	jz_jiulou : "cocos-res/building/jz_jiulou.png",
	jz_kezhan : "cocos-res/building/jz_kezhan.png",
	jz_yamen : "cocos-res/building/jz_yamen.png",
	jz_ganglou : "cocos-res/building/jz_ganglou.png",
	jz_xiaomen : "cocos-res/building/jz_xiaomen.png",
	jz_xiaoyamen : "cocos-res/building/jz_xiaoyamen.png"
};

var res_jineng = {
	A1 : [ "cocos-res/jineng/a1d1.png", "cocos-res/jineng/a1d2.png", "cocos-res/jineng/a1d3.png" ],
	A2 : [ "cocos-res/jineng/a2d1.png", "cocos-res/jineng/a2d2.png", "cocos-res/jineng/a2d3.png",
			"cocos-res/jineng/a2d4.png" ],
	A3 : [ "cocos-res/jineng/a3d1.png", "cocos-res/jineng/a3d2.png", "cocos-res/jineng/a3d3.png",
			"cocos-res/jineng/a3d4.png", "cocos-res/jineng/a3d5.png" ],
	A4 : [ "cocos-res/jineng/a4d1.png", "cocos-res/jineng/a4d2.png", "cocos-res/jineng/a4d3.png",
			"cocos-res/jineng/a4d4.png", "cocos-res/jineng/a4d3.png", "cocos-res/jineng/a4d6.png",
			"cocos-res/jineng/a4d7.png", "cocos-res/jineng/a4d8.png" ],
	A6 : [ "cocos-res/jineng/a6d1.png", "cocos-res/jineng/a6d2.png" ]

};
var res_jianshi = {
	J5 : [ "cocos-res/jianshi/a5d1.png", "cocos-res/jianshi/a5d2.png", "cocos-res/jianshi/a1d3.png" ],
	J6 : [ "cocos-res/jianshi/a6d1.png", "cocos-res/jianshi/a6d2.png", "cocos-res/jianshi/a6d3.png" ],
	J7 : [ "cocos-res/jianshi/a8d1.png", "cocos-res/jianshi/a8d2.png", "cocos-res/jianshi/a8d3.png" ],
	J8 : [ "cocos-res/jianshi/a7d1.png", "cocos-res/jianshi/a7d2.png", "cocos-res/jianshi/a7d3.png" ],
	J9 : [ "cocos-res/jianshi/a9d1.png", "cocos-res/jianshi/a9d2.png", "cocos-res/jianshi/a9d3.png" ]
};
var res_js_select = new Array();
for ( var k in res_jianshi) {
	var v = res_jianshi[k];
	res_js_select.push(v);
}
var res_jianshi_dan = {
	a5 : "cocos-res/jianshi/a5d1.png",
	a6 : "cocos-res/jianshi/a6d1.png",
	a7 : "cocos-res/jianshi/a7d1.png",
	a8 : "cocos-res/jianshi/a8d1.png",
	a9 : "cocos-res/jianshi/a9d1.png"
};

var fonts = {
	Dotnation : {
		type : "font",
		name : "Dotnation",
		srcs : [ "cocos-res/fonts/Dotnation.ttf" ]
	},
	font04b08 : {
		type : "font",
		name : "font04b08",
		srcs : [ "cocos-res/fonts/04b08.TTF" ]
	},
	Pantheon : {
		type : "font",
		name : "Pantheon",
		srcs : [ "cocos-res/fonts/Pantheon.ttf" ]
	},
	Transformers_Movie : {
		type : "font",
		name : "Transformers_Movie",
		srcs : [ "cocos-res/fonts/Transformers Movie.ttf" ]
	},
	font486 : {
		type : "font",
		name : "font486",
		srcs : [ "cocos-res/fonts/486.ttf" ]
	},
	cn_lianwen : {
		type : "font",
		name : "cn_lianwen",
		srcs : [ "cocos-res/fonts/cn_a1.ttf" ]
	},
	cn_player : {
		type : "font",
		name : "cn_player",
		srcs : [ "cocos-res/fonts/cn_a1.ttf" ]

	},
	cn_xs_minijianyingbi : {
		type : "font",
		name : "cn_xs_minijianyingbi",
		srcs : [ "cocos-res/fonts/xs_minijianyingbi.TTF" ]

	}
};

var g_resources1 = [
// images
res.helloBG_png, res.btn_addLine, res.btn_singularity, res.btn_moveLayerOpen, res.btn_moveLayerClose, res.player1,
//
res_building.jz_biaoju, res_building.jz_dangpu, res_building.jz_jiulou, res_building.jz_kezhan, res_building.jz_yamen,
		res_building.jz_ganglou, res_building.jz_xiaomen, res_building.jz_xiaoyamen,
		// fonts
		fonts.Dotnation, fonts.font04b08, fonts.Pantheon, fonts.Transformers_Movie, fonts.font486
// over
];
var atlas = {
	forest : "cocos-res/TX580/0_forest Atlas.png",
	cave : "cocos-res/TX580/1_cave Atlas.png",
	ghostforest : "cocos-res/TX580/2_ghostforest Atlas.png",
	ice : "cocos-res/TX580/3_ice Atlas.png",
	desert : "cocos-res/TX580/4_desert Atlas.png",
	prison : "cocos-res/TX580/7_prison Atlas.png",
	castle : "cocos-res/TX580/8_castle_c Atlas.png",
	volcano : "cocos-res/TX580/9_volcano Atlas.png",
	prison : "cocos-res/TX580/B0_prison Atlas.png"

};
var g_resources = [
// images
res.helloBG_png, res.btn_addLine, res.btn_singularity, res.btn_moveLayerOpen, res.btn_moveLayerClose, res.nothing,
//
res_building.jz_biaoju, res_building.jz_dangpu, res_building.jz_jiulou, res_building.jz_kezhan, res_building.jz_yamen,
		res_building.jz_ganglou, res_building.jz_xiaomen, res_building.jz_xiaoyamen,
		//
		res_jianshi_dan.a5, res_jianshi_dan.a6, res_jianshi_dan.a7, res_jianshi_dan.a8,
		// fonts
		fonts.Dotnation, fonts.font04b08, fonts.Pantheon, fonts.Transformers_Movie, fonts.font486, fonts.cn_lianwen,
		fonts.cn_player,fonts.cn_xs_minijianyingbi
// over
];
g_resources = g_resources.concat(BX1, BX2);
g_resources = g_resources.concat(BX3, BX5);
g_resources = g_resources.concat(BX4);

for ( var k in res_other) {
	var v = res_other[k];
	g_resources.push(v);
}

for ( var k in effone) {
	var v = effone[k];
	g_resources.push(v);
}

// for ( var k in atlas) {
// var v = atlas[k];
// g_resources.push(v);
// }
for ( var k in res_npc) {
	var v = res_npc[k];
	g_resources.push(v);
}

