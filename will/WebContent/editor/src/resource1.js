var LTGV = new Object();

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
	helloBG_png : "../cocos-res/HelloWorld.png",
	nothing : "../cocos-res/nothing.png",
	btn_addLine : "../cocos-res/btn_addLine.png",
	btn_singularity : "../cocos-res/btn_singularity.png",
	btn_moveLayerOpen : "../cocos-res/btn_moveLayerOpenx55.png",
	btn_moveLayerClose : "../cocos-res/btn_moveLayerClosex55.png",
	charmap_png : "../cocos-res/TX580/font_N0.png"

};
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
var BX1 = [ "cocos-res/TX680/123/game_effec_clear_s1.png",//
"cocos-res/TX680/123/game_effec_clear_s2.png",//
"cocos-res/TX680/123/game_effec_clear_s3.png", //
"cocos-res/TX680/123/game_effec_clear_s4.png" ];

var BX2 = [ "cocos-res/TX680/124/effect_firework_1_01.png", //
"cocos-res/TX680/124/effect_firework_1_02.png",//
"cocos-res/TX680/124/effect_firework_1_03.png", //
"cocos-res/TX680/124/effect_firework_1_04.png" ];

var BX3 = [ "cocos-res/effect/36/1.png", //
"cocos-res/effect/36/2.png", //
"cocos-res/effect/36/3.png", //
"cocos-res/effect/36/4.png", //
"cocos-res/effect/36/5.png", //
"cocos-res/effect/36/6.png", //
"cocos-res/effect/36/7.png" ];

var TX680 = {
	tx1 : {
		p1 : "cocos-res/TX680/103/a01.png",
		p2 : "cocos-res/TX680/103/a02.png",
		p3 : "cocos-res/TX680/103/a03.png",
		p4 : "cocos-res/TX680/103/a04.png"
	}
}
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
	J7 : [ "cocos-res/jianshi/a7d1.png", "cocos-res/jianshi/a7d2.png", "cocos-res/jianshi/a7d3.png" ],
	J8 : [ "cocos-res/jianshi/a8d1.png", "cocos-res/jianshi/a8d2.png", "cocos-res/jianshi/a8d3.png" ],
	J9 : [ "cocos-res/jianshi/a9d1.png", "cocos-res/jianshi/a9d2.png", "cocos-res/jianshi/a9d3.png" ]
};
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
		srcs : [ "../cocos-res/fonts/Dotnation.ttf" ]
	},
	font04b08 : {
		type : "font",
		name : "font04b08",
		srcs : [ "../cocos-res/fonts/04b08.TTF" ]
	},
	Pantheon : {
		type : "font",
		name : "Pantheon",
		srcs : [ "../cocos-res/fonts/Pantheon.ttf" ]
	},
	Transformers_Movie : {
		type : "font",
		name : "Transformers_Movie",
		srcs : [ "../cocos-res/fonts/Transformers Movie.ttf" ]
	},
	font486 : {
		type : "font",
		name : "font486",
		srcs : [ "../cocos-res/fonts/486.ttf" ]
	},
	cn_lianwen : {
		type : "font",
		name : "cn_lianwen",
		srcs : [ "../cocos-res/fonts/cn_a1.ttf" ]
	},
	cn_player : {
		type : "font",
		name : "cn_player",
		srcs : [ "../cocos-res/fonts/cn_a1.ttf" ]

	}

};

var g_fonts = [ fonts.Dotnation, fonts.font04b08, fonts.Pantheon, fonts.Transformers_Movie, fonts.font486,
		fonts.cn_lianwen, fonts.cn_player ];
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

//
TX680.tx1.p1, TX680.tx1.p2, TX680.tx1.p3, TX680.tx1.p4,
//
res_jianshi_dan.a5, res_jianshi_dan.a6, res_jianshi_dan.a7, res_jianshi_dan.a8,
// atlas
atlas.forest
// over
];

g_resources = g_resources.concat(BX1, BX2);
g_resources = g_resources.concat(BX3);
g_resources = g_resources.concat(atlas);
g_resources = g_resources.concat(res_building);
// 为全部资源从新添加索引 ../
for ( var k in g_resources) {
	var v = g_resources[k];
	g_resources[k] = "../" + v;
}
g_resources = g_resources.concat(res);
g_resources = g_resources.concat(g_fonts);