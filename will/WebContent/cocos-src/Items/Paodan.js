/**
 * 远程攻击炮弹 
 * 玩家射击向怪兽的子弹
 * 
 * */
var PaoDanBase = cc.Sprite.extend({
	at : 1,
	imageUriArray : null,
	ctor : function(inImageArray) {

		// 自定义初始化
		if (inImageArray == undefined || inImageArray == null) {
			inImageArray = res_jineng.A1;
		}
		this.imageUriArray = inImageArray;
		this._super(this.imageUriArray[0]);
		this.init();
	},
	// 添加自己的属性和方法
	init : function() {
		// this.goujinbody(this.imageUriArray);
	},
	imagePerUnit : 0.05,
	goujinbody : function(imageUriArray) {
		// /////////////动画开始//////////////////////
		var animation = new cc.Animation();

		for ( var x in imageUriArray) {
			animation.addSpriteFrameWithFile(imageUriArray[x]);
		}

		animation.setDelayPerUnit(this.imagePerUnit); // 设置两个帧播放时间 ⑤
		animation.setRestoreOriginalFrame(true); // 动画执行后还原初始状态 ⑥

		var action = cc.animate(animation);
		this.runAction(cc.repeatForever(action));
		// ////////////////动画结束///////////////////
	},
	rBoomAction : function() {
		this.stopAllActions();
		// /////////////动画开始//////////////////////弃用
		var animation = new cc.Animation();

		for ( var x in BX5) {
			animation.addSpriteFrameWithFile(BX5[x]);
		}

		animation.setDelayPerUnit(0.15); // 设置两个帧播放时间
		animation.setRestoreOriginalFrame(false); // 动画执行后还原初始状态

		var action = cc.animate(animation);

		var removeSelfAction = new cc.RemoveSelf(true);
		var finish = cc.callFunc(this.removeFromParent, this, true);
		var actionRm = cc.sequence(cc.delayTime(0.125), finish);
		var actionSQ = cc.sequence(action, actionRm);
		// this.monsterBody.runAction(actionSQ);
		// this.monsterBody.setTexture(BX4[0]);
		this.stopAllActions();
		this.runAction(actionSQ);
		// ////////////////动画结束///////////////////
	},
	rBigBoomAction : function() {
		this.setRotation(0);
		// /////////////动画开始//////////////////////弃用
		var animation = new cc.Animation();

		for (var j = 0; j < 2; j++) {
			for (var i = 0; i < 4; i++) {
				var rect = cc.rect(i * 372, j * 372, 372, 372);
				animation.addSpriteFrameWithTexture(effone.effect5, rect);
			}
		}

		animation.setDelayPerUnit(0.15); // 设置两个帧播放时间
		animation.setRestoreOriginalFrame(false); // 动画执行后还原初始状态

		var action = cc.animate(animation);

		var removeSelfAction = new cc.RemoveSelf(true);
		var finish = cc.callFunc(this.removeFromParent, this, true);
		var actionRm = cc.sequence(cc.delayTime(0.125), finish);
		var actionSQ = cc.sequence(action, actionRm);
		// this.monsterBody.runAction(actionSQ);
		// this.monsterBody.setTexture(BX4[0]);
		this.stopAllActions();
		this.runAction(actionSQ);
		// ////////////////动画结束///////////////////
	},
	rSimBoomAction : function() {
		this.setTexture(effone.effect6);
		this.setTextureRect(cc.rect(0,0,48,48));
		this.stopAllActions();
		this.setRotation(0);
		// /////////////动画开始//////////////////////弃用
		var animation = new cc.Animation();
		for (var i = 0; i < 3; i++) {
			var rect = cc.rect(i * 48, 0, 48, 48);
			animation.addSpriteFrameWithTexture(effone.effect6, rect);
		}
		animation.setDelayPerUnit(0.15); // 设置两个帧播放时间
		animation.setRestoreOriginalFrame(false); // 动画执行后还原初始状态
		var action = cc.animate(animation);
		var removeSelfAction = new cc.RemoveSelf(true);
		var finish = cc.callFunc(this.removeFromParent, this, true);
		var actionRm = cc.sequence(cc.delayTime(0.125), finish);
		var actionSQ = cc.sequence(action, actionRm);
		// ////////////////动画结束///////////////////
		
		this.runAction(actionSQ);
	}

});
/**
 * 箭
 * */
var JianShiBase = PaoDanBase.extend({
	imagePerUnit : 0.1
});