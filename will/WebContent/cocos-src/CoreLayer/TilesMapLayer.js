//
//	forest : "cocos-res/TX580/0_forest Atlas.png",
//	cave : "cocos-res/TX580/1_cave Atlas.png",
//	ghostforest : "cocos-res/TX580/2_ghostforest Atlas.png",
//	ice : "cocos-res/TX580/3_ice Atlas",
//	desert : "cocos-res/TX580/4_desert Atlas",
//	prison : "cocos-res/TX580/7_prison Atlas.png",
//	castle : "cocos-res/TX580/8_castle_c Atlas.png",
//	volcano : "cocos-res/TX580/9_volcano Atlas.png",
//	prison : "cocos-res/TX580/B0_prison Atlas.png"	

var TilesMapLayer = cc.Layer.extend({
	box : null,
	ttCache : null,
	ctor : function() {
		this._super();
		this.init();

	},

	init : function() {
		this._super();
		this.createTiles();
		console.log("TilesMapLayer");
		cc.eventManager.addListener(this.listener_TilesMapLayer, this);

	},
	createTiles : function() {
		var size = cc.director.getWinSize();

		var box = new cc.Node();
		box.zIndex = -2;
		var tt = cc.textureCache.addImage(atlas.forest);
		this.ttCache = tt;
		console.log("ll " + size.width / 96 + " _ " + size.height / 76);
		var scale = 1;
		for (var i = 0; i < (size.width / 96 * 2) / scale; i++) {

			for (var j = (size.height / 76 + 1) / scale; j >= 0; j--) {
				var rectss = cc.rect(0, tt.height - 161 - 146 - 146, 96, 146);
				if (Math.random() * 100 > 50) {
					rectss = cc.rect(99 * 2, tt.height - 160 - 139, 96, 138);
				} else if (Math.random() * 100 > 50) {
					rectss = cc.rect(99 * 2, tt.height - 161 - 146 - 146, 96, 146);
				}

				var tiles = new TilesItem(tt, rectss);
				tiles.zIndex = box.zIndex - 1;

				tiles.setPosition(96 * i * scale, 76 * j * scale);
				tiles.setScale(scale);
				box.addChild(tiles);
			}
		}
		this.addChild(box);
		this.box = box;
	},
	updateTiles : function() {
		var updatenumber = 0;

		var allChildren = this.box.getChildren();
		for (var i = 0; i < allChildren.length; i++) {
			if (Math.random() * 1000 > 999 && updatenumber < 2) {
				var rectss = cc.rect(0, this.ttCache.height - 161 - 146 - 146, 96, 146);
				if (Math.random() * 100 > 50) {
					rectss = cc.rect(99 * 2, this.ttCache.height - 160 - 139, 96, 138);
				} else if (Math.random() * 100 > 50) {
					rectss = cc.rect(99 * 2, this.ttCache.height - 161 - 146 - 146, 96, 146);
				}
				allChildren[i].setTextureRect(rectss);
				updatenumber++;
			}
		}
	},
	// 创建一个事件监听器 OneByOne 为单点触摸
	listener_TilesMapLayer : cc.EventListener.create({
		event : cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches : false,
		// 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递
		onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数
			var target = event.getCurrentTarget();
			target.removeAllChildren(true);
			target.createTiles();
		}
	})

});
