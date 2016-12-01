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
	A2Anim : undefined,
	A2 : function() {
		if (!this.A2Anim) {
			// /////////////动画开始//////////////////////
			var animation = new cc.Animation();
			for (var j = 0; j < 3; j++) {
				for (var i = 0; i < 4; i++) {
					var rect = cc.rect(i * 100, j * 240, 100, 240);
					animation.addSpriteFrameWithTexture(effone.effect4, rect);
				}
			}

			animation.setDelayPerUnit(0.5/8); // 设置两个帧播放时间
			animation.setRestoreOriginalFrame(false); // 动画执行后还原初始状态

			// ////////////////动画结束///////////////////
			this.A2Anim = cc.animate(animation);
		}
		return this.A2Anim;
	},
	A3Anim : undefined,
	A3 : function() {
		if (!this.A3Anim) {
			
			var textureEffect33 = cc.textureCache.addImage(effone.effect33);
			var column = 2;
			var row = 4;
			var widthOne = textureEffect33.width/row;
			var heightOne = textureEffect33.height/column;
			
			// /////////////动画开始//////////////////////
			var animation = new cc.Animation();
			for (var j = 0; j < column; j++) {
				for (var i = 0; i < row; i++) {
					var rect = cc.rect(i * widthOne, j * heightOne, widthOne, heightOne);
					animation.addSpriteFrameWithTexture(textureEffect33, rect);
				}
			}
			animation.setDelayPerUnit(1.5/(column*row)); // 设置两个帧播放时间
			animation.setRestoreOriginalFrame(false); // 动画执行后还原初始状态

			// ////////////////动画结束///////////////////
			this.A3Anim = cc.animate(animation);
		}
		return this.A3Anim;
	}
};