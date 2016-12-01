/**
 * 泉水 每个@effect_interval时间，向玩家提供一定回复能力
 */
var MineObject = cc.Node.extend({
	labelName : null,
	labelDy : null,
	mineName : "",
	mineMark : "",
	texturename : "cocos-res/TX580/E_deco_3.png",
	texturenGuanghuan : "cocos-res/TX580/Rune03_mip_0.png",

	AP : 1,// Attack power
	LV : 1,// Grade 等级
	_hp : 7,
	_ex : 1,

	effect_interval : 1.0,

	mineBody : null,//
	mark : null,
	drawNo : null,
	ctor : function(itexturename, itexturenGuanghuan) {
		this._super();

		if (itexturename)
			this.texturename = itexturename;
		if (itexturenGuanghuan)
			this.texturenGuanghuan = itexturenGuanghuan;
		this.init();
	},
	init : function() {

		// 核心身体
		this.mineBody = new cc.Sprite(this.texturename);
		this.mineBody.setAnchorPoint(0.5, 0);
		this.mineBody.setLocalZOrder(1);
		this.addChild(this.mineBody);

		var mineGuanghuan = cc.Node.create();
		mineGuanghuan.setLocalZOrder(0);
		mineGuanghuan.rotationX = 75// * Math.PI / 180;
		mineGuanghuan.rotationY = 15.0;// * Math.PI / 180;
		// 光环
		var mineGuanghuanSprite = new cc.Sprite(this.texturenGuanghuan);
		mineGuanghuanSprite.setLocalZOrder(0);
		mineGuanghuanSprite.runAction(this.rotateAction());

		mineGuanghuan.addChild(mineGuanghuanSprite);
		this.addChild(mineGuanghuan);

		var fontDef = new cc.FontDefinition();
		fontDef.fontName = "Pantheon";
		fontDef.fontSize = "14";
		// 名字
		this.labelName = cc.LabelTTF.create(this.mineName);
		this.labelName.setTextDefinition(fontDef);
		this.labelName.setPosition(cc.p(0, -5));
		this.addChild(this.labelName);

		this.labelDy = cc.LabelTTF.create(this.mineName);
		this.labelDy.setTextDefinition(fontDef);
		this.labelDy.setPosition(cc.p(0, -25));
		this.addChild(this.labelDy);

		if (this.AP > 0) {
			this.labelDy.setColor(cc.color(0, 255, 0));
		} else {
			this.labelDy.setColor(cc.color(255, 0, 0));
		}

		this.AP = parseInt(1 + Math.random() * 25) + 100;

		if (!this.drawNo) {
			var draw = new cc.DrawNode();
			draw.setPosition(cc.p(0, 0));
			draw.setAnchorPoint(0.5, 0.5);
			this.addChild(draw);
			this.drawNo = draw;
		}

	},
	rotateAction : function() {
		var actionBy = new cc.RotateBy(2, 360);
		var action = cc.sequence(actionBy).repeatForever();
		return action;

	},
	setMineName : function(imineName) {
		this.mineName = imineName;
		this.labelName.string = this.mineName;
		this.labelDy.string = " Lv." + this.LV + " En" + this.effect_interval + " Ap." + this.AP;
	},
	runDeathAction : function() {
		var frameName = "cocos-res/TX580/PS_twinkle_01.png";
		this.mineBody.setTexture(frameName);
		var removeSelfAction = new cc.RemoveSelf(true);
		var actionRm = cc.sequence(cc.delayTime(0.125), removeSelfAction);
		this.runAction(actionRm);
	},
	lvUp : function() {
		this.LV++;
		this._hp += 3;
		this.setmineName(this.mineName);
	},
	dHP : function(dhpnumber) {
		if (dhpnumber) {
			dhpnumber = 1;
		}
		this._hp -= dhpnumber;
		this.setmineName(this.mineName);
	},
	efBuffAnim : function(tager, ef_func) {
		// tager对象与ef_func回调函数
		var action = EffectAnim.A2();
		// example
		var removeSelfAction = new cc.RemoveSelf(false);
		var delayAction = cc.delayTime(this.effect_interval - 0.5);
		animNode = new cc.Sprite(res.nothing);
		animNode.setAnchorPoint(0.5, 0.15);
		animNode.runAction(cc.sequence(action, delayAction, removeSelfAction));

		if (!tager.getChildByTag("efBuffAnimA1")) {
			animNode.tag = "efBuffAnimA1";
			// 效果函数
			ef_func();
			tager.addChild(animNode, -5);
		}
	}
});
