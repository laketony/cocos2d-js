var ltgv = new Object();
var g_resources = [];
function Add_g_resources(toAddMap) {
	for ( var k in toAddMap) {
		var v = toAddMap[k];
		g_resources.push(v);
	}
}

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
	skillEffectSupport : "res/UI/skillEffectSupport.png"
};

var actor = {
	bookChara1_1 : "res/actor/bookChara1_1.png"
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

	// font
	imageNumberMemberEditType4 : "res/UI/imageNumberMemberEditType4.png"
}

Add_g_resources(actor);
Add_g_resources(EffectMap);
Add_g_resources(UIs);
