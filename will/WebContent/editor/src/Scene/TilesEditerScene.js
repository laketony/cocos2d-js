var TilesEditerScene = cc.Scene.extend({
	a1Layer : null,
	w1Layer : null,
	onEnter : function() {
		this._super();

		var winsize = cc.director.getWinSize();

		// create the background image and position it at the center of screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		var worldMapLayerColor = new cc.LayerColor(cc.color(0, 0, 0), winsize.width, winsize.height);
		this.addChild(worldMapLayerColor);

		var box = new cc.Node();

		// var ghostforest = new cc.Sprite(atlas.ghostforest);
		// ghostforest.setPosition(centerPos);
		// box.addChild(ghostforest);
		//
		// var forest = new cc.Sprite(atlas.forest);
		// forest.setPosition(centerPos);
		// box.addChild(forest);

		var tt = cc.textureCache.addImage(atlas.forest);
		console.log(tt);

		for (var i = 0; i < 100; i++) {
			for (var j = 100; j >= 0; j--) {
				var rectss = cc.rect(0, 1024 - 161 - 146 - 146, 96, 146);
				if (Math.random() * 100 > 50) {
					rectss = cc.rect(99 * 3, 1024 - 161 - 146 - 146, 96, 146);
				} else if (Math.random() * 100 > 50) {
					rectss = cc.rect(99 * 2, 1024 - 161 - 146 - 146, 96, 146);
				}

				var tiles = new TilesItem(tt, rectss);
				tiles.setPosition(96 * i, 76 * j);
				box.addChild(tiles);
			}
		}
		this.addChild(box);
		console.log(box);

		var ghostforest2 = new cc.Sprite(tt, cc.rect(0, 1024 - 161, 640, 160));
		console.log("TITLE");
		console.log(ghostforest2);
		ghostforest2.setPosition(winsize.width / 2, winsize.height - 80);
		this.addChild(ghostforest2);
		box.scale = 0.5;

		cc.eventManager.addListener(listenerWorldMapLayerTiles.clone(), box);
		// cc.eventManager.addListener(listenerWorldMapLayer.clone(), forest);

	}
});

//创建一个事件监听器 OneByOne 为单点触摸
var listenerWorldMapLayerTiles = cc.EventListener.create({
	event : cc.EventListener.TOUCH_ONE_BY_ONE,
	swallowTouches : true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
	onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数
		var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
		// 通常是cc.Node及其子类

		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		var s = target.getContentSize();
		var rect = cc.rect(0, 0, s.width, s.height);
		return true;
		if (cc.rectContainsPoint(rect, locationInNode)) {
			cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
			target.opacity = 180;
			return true;
		}
		return false;

	},
	onTouchMoved : function(touch, event) {
		// 实现onTouchMoved事件处理回调函数, 触摸移动时触发

		// 移动当前按钮精灵的坐标位置
		var target = event.getCurrentTarget();
		var delta = touch.getDelta(); // 获取事件数据: delta

		if (target.x >= 24 && delta.x > 0) {
			target.x = 24;
		} else if (target.x <= -1880 && delta.x < 0) {
			target.x = -1880;
		} else {
			target.x += delta.x;// * 2;
		}

		if (target.y <= 12 && delta.y > 0) {
			target.y = 12;
		} else if (target.y <= -1800 && delta.y < 0) {
			target.y = -1800;
		} else {
			target.y += delta.y;// * 2;
		}

		cc.log(target.x + " " + target.y + " -- " + delta.x + "" + delta.y);

	},
	onTouchEnded : function(touch, event) {
		// 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();
		cc.log("sprite onTouchesEnded.. ");
		target.setOpacity(255);

	}
});
