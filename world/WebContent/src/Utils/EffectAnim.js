var EffectAnim = {
	A1Anim : undefined,
	A1 : function() {
		if (!this.A1Anim) {
			var animation = new cc.Animation();
			for (var i = 1; i < 9; i++) {
				var frameName = "cocos-res/effect/15/" + i + ".png";
				animation.addSpriteFrameWithFile(frameName);
			}
			animation.setDelayPerUnit(0.5 / 8);
			animation.setRestoreOriginalFrame(true);

			this.A1Anim = cc.animate(animation);
		}
		return this.A1Anim;
	},
	A3Geter : function(effonename) {	
			var textureEffect = cc.textureCache.addImage(EffectMap.treasureMoneyEffect);
			var column = 4;
			var row = 5;
			var widthOne = textureEffect.width/row;
			var heightOne = textureEffect.height/column;
			
			// /////////////动画开始//////////////////////
			var animation = new cc.Animation();
			for (var j = 0; j < column; j++) {
				for (var i = 0; i < row; i++) {
					var rect = cc.rect(i * widthOne, j * heightOne, widthOne, heightOne);
					animation.addSpriteFrameWithTexture(textureEffect, rect);
				}
			}
			animation.setDelayPerUnit(1/(column*row)); // 设置两个帧播放时间
			animation.setRestoreOriginalFrame(false); // 动画执行后还原初始状态

			// ////////////////动画结束///////////////////
			var A3Anim = cc.animate(animation);
		return A3Anim;
	},
	A4Geter : function() {	
		return EffectAnim.EGeter(EffectMap.playerGameOverEffect,8,5,1.5);
	},
	A5Geter : function() {	
		return EffectAnim.EGeter(EffectMap.skillEffectAttackUp,5,9,1.5);
	},
	A6Geter : function() {	
		return EffectAnim.EGeter(EffectMap.skillEffectAttack,8,6,1.5);
	},
	A7Geter : function() {	
		return EffectAnim.EGeter(EffectMap.skillEffectSupport,4,3,0.5);
	},
	EGeter : function(effonename,column,row,time) {	
		//
		
		if(!effonename){
			effonename = EffectMap.treasureMoneyEffect;
			column = 4;
			row = 5;
			time=1;
		}
		
		//
		var textureEffect = cc.textureCache.addImage(effonename);
		var widthOne = textureEffect.width/row;
		var heightOne = textureEffect.height/column;
		
		// /////////////动画开始//////////////////////
		var animation = new cc.Animation();
		for (var j = 0; j < column; j++) {
			for (var i = 0; i < row; i++) {
				var rect = cc.rect(i * widthOne, j * heightOne, widthOne, heightOne);
				animation.addSpriteFrameWithTexture(textureEffect, rect);
			}
		}
		animation.setDelayPerUnit(time/(column*row)); // 设置两个帧播放时间
		animation.setRestoreOriginalFrame(false); // 动画执行后还原初始状态

		// ////////////////动画结束///////////////////
		var A3Anim = cc.animate(animation);
	return A3Anim;
}
};