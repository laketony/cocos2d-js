var ltgv = new Object();
var g_resources = [];

function Add_g_resources(toAddMap) {
	for ( var k in toAddMap) {
		var v = toAddMap[k];
		g_resources.push(v);
	}
}

function Add_g_resources_inarray(toAddMap) {
	for ( var k in toAddMap) {
		var array = toAddMap[k];
		for ( var j in array) {
			var v = array[j];
			g_resources.push(v);
		}

	}
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

var daolist = {
	dao1 : "res/wuqi/080_22.png",
	dao2 : "res/wuqi/080_24.png",
	dao3 : "res/wuqi/080_36.png",
	dao4 : "res/wuqi/080_38.png"
};

var qiangList = {
	qiang1 : "res/wuqi1/018_15.png"

}

var EffectMap = {
	treasureMoneyEffect : "res/UI/treasureMoneyEffect.png",
	lightSend1 : "res/UI/lightSend1.png",
	playerGameOverEffect : "res/UI/playerGameOverEffect.png",
	skillEffectAttackUp : "res/UI/skillEffectAttackUp.png",
	skillEffectAttack : "res/UI/skillEffectAttack.png",
	skillEffectSupport : "res/UI/skillEffectSupport.png",
	playerAttackEffect: "res/UI/playerAttackEffect.png",
	debuff: "res/eff/debuff@2x.png",
	darkboom01: "res/eff/darkboom01@2x.png",
	dark01: "res/eff/dark01@2x.png"	
	
};
var EffectUNLoad = {
		item_background_1:"res/eff/item_background_1@2x.png",
		item_background_2:"res/eff/item_background_2@2x.png",
		item_background_3:"res/eff/item_background_3@2x.png",
		wing:"res/eff/wing@2x.png",
	
		
}

var EffectMap2 = {
	hero_compose_ef1 : [ "res/eff/hero_compose/hero_compose_effect_1.png", "res/eff/hero_compose/hero_compose_effect_2.png",
			"res/eff/hero_compose/hero_compose_effect_3.png", "res/eff/hero_compose/hero_compose_effect_4.png",
			"res/eff/hero_compose/hero_compose_effect_5.png" ],
	hero_pull_ef1 : [],
}

for (var i = 1; i <= 15; i++) {
	EffectMap2.hero_pull_ef1.push("res/eff/hero_compose/hero_pull_effect_1_" + i + ".png");
}

var actor = {
	bookChara1_1 : "res/actor/bookChara1_1.png",
	bookChara18_1 : "res/actor/bookChara18_1.png",
	mChara1 : "res/monster/bookChara87_1.png",
	mChara2 : "res/monster/bookChara88_1.png"
}

var UIs = {
	memberMonsterStateBack : "res/UI/memberMonsterStateBack.png",
	memberMonsterStateTag1 : "res/UI/memberMonsterStateTag1.png",
	memberMonsterStateTag1_ : "res/UI/memberMonsterStateTag1_.png",
	memberMonsterStateTag2 : "res/UI/memberMonsterStateTag2.png",
	memberMonsterStateTag2_ : "res/UI/memberMonsterStateTag2_.png",
	memberMonsterStateProfileFrame : "res/UI/memberMonsterStateProfileFrame.png",
	memberMonsterStateStatusFrame : "res/UI/memberMonsterStateStatusFrame.png",
	memberFaceChange : "res/UI/memberFaceChange.png",
	memberFaceChangeIcon1 : "res/UI/memberFaceChangeIcon1.png",
	returnButton : "res/UI/returnButton.png",
	header : "res/UI/header.png",

	dungeonTitleFrame1 : "res/UI/dungeonTitleFrame1.png",

	// font
	imageNumberMemberEditType4 : "res/UI/imageNumberMemberEditType4.png",
	imageNumberEnemyTurnRed : "res/UI/imageNumberEnemyTurnRed.png",
	attrLight :"res/UI/homeLightEffect.png"
}
var UIs1 = {
		HostileBG:"res/UI1/FX_Frame_HostileSelect_Back@100.png",
		HostileSelect : "res/UI1/FX_Frame_HostileSelect_Frame@100.png",
		Hostile : "res/UI1/FX_Frame_Hostile_Frame@100.png",
		Select_Hostile : "res/UI1/FX_Select_Hostile.png",
		CaseSelect_FrameX100 :"res/UI1/FX_Frame_CaseSelect_Frame@100.png",
		CaseSelect_Frame : "res/UI1/FX_Frame_CaseSelect_Frame.png",
		FrendlyTalk_Frame:"res/UI1/FX_Frame_FrendlyTalk_Frame@100.png"
	}

var UIs3 = {
		StageArmor : "res/UI3/UI_EnchantBoss_Button_StageArmor.png",
		StageSummon : "res/UI3/UI_EnchantBoss_Button_StageSummon.png",
		StageVehicle : "res/UI3/UI_EnchantBoss_Button_StageVehicle.png",
		StageWeapon : "res/UI3/UI_EnchantBoss_Button_StageWeapon.png"
}

for (var i = 1; i <= 12; i++) {
	UIs3["UI_Adventure_Button_Stage"+i] = "res/UI3/UI_Adventure_Button_Stage"+i+".png";
}


var fonts = {
	fontZi : {
		type : "font",
		name : "fontZi",
		srcs : [ "res/fonts/zi.ttf" ]
	}
}

Add_g_resources(actor);
Add_g_resources(EffectMap);
Add_g_resources(UIs);
Add_g_resources(UIs1);
Add_g_resources(UIs3);
Add_g_resources(fonts);

// Add_g_resources_inarray(EffectMap2);
