/**
 * 怪兽，移动单位
 * */
var Monster = cc.Node.extend({
	labelName : null,
	monsterName : "",
	monsterMark : "",
	texturename : "cocos-res/TX580/monster/E_unit_1_1.png",
	
	AP : 1,// Attack power
	LV : 1,// Grade 等级
	_hp : 99,
	_ex : 1,
	
	isDeathed :false,
	monsterBody : null,//
	mark : null,
	hunting_target:null,// 猎杀目标
	
	ctor : function(itexturename) {
		this._super();

		if (itexturename)
			this.texturename = itexturename;
		this.setName("monster");
		this.init();
	},
	init : function() {

		this.monsterBody = new cc.Sprite(this.texturename);
		this.monsterBody.setAnchorPoint(0.5, 0);
		this.addChild(this.monsterBody);

		this.monsterBody.runAction(this.jumpAction());

		this.labelName = cc.LabelTTF.create(this.monsterName);
		var fontDef = new cc.FontDefinition();
		fontDef.fontName = "Pantheon";
		fontDef.fontSize = "14";
		this.labelName.setTextDefinition(fontDef)
		this.labelName.setPosition(cc.p(0, -5));
		this.addChild(this.labelName);

		this.AP = parseInt(1 + Math.random() * 25);

	},
	// TODO 名字板
	setMonsterName : function(iMonsterName) {
		this.monsterName = iMonsterName;
		this.labelName.string = this.monsterName + " [" + this.AP + "]";
	},
	// TODO 小怪物平时蹦蹦跳跳
	jumpAction : function() {
		var actionUp = cc.jumpBy(2, cc.p(0, 0), 20, 4);
		var action = cc.sequence(actionUp).repeatForever();
		return action;
	},
	// TODO 融合动效
	runFuseAction : function() {
		var frameName = "cocos-res/TX580/shockwave03_01_mip_0.png";
		this.monsterBody.setTexture(frameName);
		var removeSelfAction = new cc.RemoveSelf(true);
		var actionRm = cc.sequence(cc.delayTime(0.125), removeSelfAction);
		this.runAction(actionRm);
	},
	// TODO 对外死亡特效
	runDeathAction:function(){
		this.rDeathAction1();
	},
	// TODO 尘土飞扬
	rDeathAction : function() {
		this.isDeathed = true;
		this.stopAllActions();
		// /////////////动画开始//////////////////////弃用
		var animation = new cc.Animation();
		
		for ( var x in BX4) {
			animation.addSpriteFrameWithFile(BX4[x]);
		}

		animation.setDelayPerUnit(0.15); // 设置两个帧播放时间
		animation.setRestoreOriginalFrame(false); // 动画执行后还原初始状态

		var action = cc.animate(animation);
		
		var removeSelfAction = new cc.RemoveSelf(true);
		var finish = cc.callFunc(this.removeFromParent, this,  true);
		var actionRm = cc.sequence(cc.delayTime(0.125), finish);
		var actionSQ = cc.sequence(action,actionRm);
		this.monsterBody.stopAllActions();
		this.monsterBody.runAction(actionSQ);
		// ////////////////动画结束///////////////////
	},
	// TODO 黄星 死亡
	rDeathAction1 : function() {
		this.isDeathed = true; 
		this.stopAllActions();
		// /////////////动画开始//////////////////////
		var animation = new cc.Animation();
		for (var i = 0; i < 7; i++) {
			var rect = cc.rect(i * 120, 0, 120, 120);
			animation.addSpriteFrameWithTexture(effone.effect14, rect);
		}
		animation.setDelayPerUnit(0.15); // 设置两个帧播放时间
		animation.setRestoreOriginalFrame(false); // 动画执行后还原初始状态
		var action = cc.animate(animation);
		var removeSelfAction = new cc.RemoveSelf(true);
		var finish = cc.callFunc(this.removeFromParent, this, true);
		var actionRm = cc.sequence(cc.delayTime(0.125), finish);
		var actionSQ = cc.sequence(action, actionRm);
		// ////////////////动画结束///////////////////
		this.monsterBody.stopAllActions();
		this.monsterBody.runAction(actionSQ);
	},
	// TODO 巨白星死亡
	rDeathAction2 : function() {
		this.isDeathed = true;
		var frameName = "cocos-res/TX580/compassStar.png";
		this.monsterBody.setTexture(frameName);
		var removeSelfAction = new cc.RemoveSelf(true);
		var actionRm = cc.sequence(cc.delayTime(0.125), removeSelfAction);
		this.runAction(actionRm);
	},
	lvUp : function() {
		this.AP++;
		this.labelName.string = this.monsterName + " [" + this.AP + "]";
		this._hp += 3 * (this.AP - 1);
		if (this.AP / 50 > 1) {

			var textureIndex = parseInt((this.AP / 50) % 4);
			var textureName = this.texturename.slice(0, -5) + textureIndex + ".png"
			this.monsterBody.setTexture(textureName);
			if (this.scale < 5) {
				this.setScale(1 + (this.AP / 25) * 0.1);
			}

			this.labelName.string = this.monsterName + " Lv." + this.AP + "{" + this._hp + "}";
		}
	},
	dHP : function(dhpnumber) {
		if (!dhpnumber) {
			dhpnumber = 1;
		}
		this._hp -= dhpnumber;
		this.labelName.string = this.monsterName + " Lv." + this.AP + "{" + this._hp + "}";
	},
	setColor : function(color) {
		this.labelName.setColor(color);
	},
	// TODO 狩猎目标
	runHunting_target:function(target) {
		this.hunting_target = target;
		this.acTagerPoint();
	},
	// 追踪目标前进
	acTagerPoint:function() {
		
		var tagerPoint = this.hunting_target.getPosition();
		var m_speed = 105;// 速度 px/s
		var m_distance = lineSpace(this.x, this.y, tagerPoint.x, tagerPoint.y);// 距离 px
		
	
		var m_time = m_distance / m_speed;// 时间 ＝ 距离 ／速度
		var action1 = cc.moveTo(m_time, tagerPoint);
		
		var action2 =cc.callFunc(this.acTagerPoint.bind(this)) ;
		var delay = cc.delayTime(3);
		
		var seq = cc.sequence(action1,action2);
		this.runAction(seq);
		this.ex++;
	}
});
/**
 * Boss
 * */
var MonsterBoss = Monster.extend({
	 
});