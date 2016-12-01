var Dvv = [//
cc.rect(99 * 0, 1024 - 298 - 143, 96, 138),// 
cc.rect(99 * 1, 1024 - 298 - 143, 96, 138),//
cc.rect(99 * 2, 1024 - 298 - 143, 96, 138),//
cc.rect(99 * 3, 1024 - 298 - 143, 96, 138),//
//
cc.rect(99 * 0, 1024 - 298, 96, 138),//
cc.rect(99 * 1, 1024 - 298, 96, 138),//
cc.rect(99 * 2, 1024 - 298, 96, 138),//
cc.rect(99 * 3, 1024 - 298, 96, 138),//
cc.rect(99 * 4, 1024 - 301, 96, 138),//
cc.rect(99 * 5, 1024 - 301, 96, 138),//
//
cc.rect(0, 1024 - 161 - 146 - 146, 96, 145),//
];

var GameScene = cc.Scene.extend({
	tMap : cc.textureCache.addImage(res.helloBG_png),
	onEnter : function() {
		this._super();

		var winsize = cc.director.getWinSize();

		// create the background image and position it at the center of
		// screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
		var worldMapLayerColor = new cc.LayerColor(cc.color(128, 128, 128), winsize.width, winsize.height);
		this.addChild(worldMapLayerColor, 0);

		var boxMap = new cc.Node();
		this.addChild(boxMap, 1);
		var draw = new cc.DrawNode();
		boxMap.addChild(draw);

		var tMap = this.tMap;

		for (var i = 0; i < 14; i++) {
			for (var j = 10; j >= 0; j--) {
				var rindex = Math.floor(Math.random() * 10);
				if (rindex == 3 || rindex == 5 || rindex == 7 || rindex == 8) {
					rindex = 2;
				}
				var rectss = Dvv[rindex];

				var tiles = new cc.Sprite.create(this.tMap, rectss);
				tiles.setPosition(96 * i, 76 * j);
				boxMap.addChild(tiles);
			}
		}

		var label = cc.LabelTTF.create("Holly Wood", "Arial", 40);
		label.setPosition(winsize.width / 2, winsize.height / 2 - 144);
		this.addChild(label, 1);

		var s = boxMap.getBoundingBox();
		// var rect = cc.rect(0, 0, s.width, s.height);
		console.log(s);

		var s1 = boxMap.getBoundingBoxToWorld();
		// var rect = cc.rect(0, 0, s.width, s.height);
		console.log(s1);

		cc.eventManager.addListener(listenerWorldMapLayer.clone(), boxMap);

		var boxMapTools = new cc.Node();
		boxMapTools.setPosition(cc.p(winsize.width / 2, winsize.height - 150));
		this.addChild(boxMapTools, 1);
		for (var i = 0; i < 10; i++) {
			var rectss = Dvv[i];

			var tiles = new cc.Sprite.create(this.tMap, rectss);
			tiles.setPosition(96 * i, 0);
			boxMapTools.addChild(tiles);
			cc.eventManager.addListener(listenerWorldMapLayer.clone(), tiles);

		}
	},
	createNode : function() {
		var winsize = cc.director.getWinSize();
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		var sprite = cc.Sprite.create(this.tMap);
		sprite.setPosition(cc.p(winsize.width - 100, winsize.height - 100));
		sprite.setScale(0.8);
		this.addChild(sprite, 2);
		var draw = new cc.DrawNode();
		sprite.addChild(draw);
		// 顶条
		draw.drawRect(cc.p(0, 0), cc.p(640, 160), null, 1, cc.color(255, 0, 255, 50));

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 4; j++) {
				var fillColor = cc.color(0, 0, 255, 20);
				var bianColor = cc.color(0, 0, 0, 99);
				var lb = cc.p(643 + i * 99, 145 * j);
				var rt = cc.p(643 + i * 99 + 96, 145 * j + 145);
				draw.drawRect(lb, rt, fillColor, 1, bianColor);
			}
		}

		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 2; j++) {
				var fillColor = cc.color(0, 0, 255, 20);
				var bianColor = cc.color(0, 0, 0, 99);
				var lb = cc.p(i * 99, 139 * j + 162);
				var rt = cc.p(i * 99 + 96, 143 * j + 137 + 162);
				draw.drawRect(lb, rt, fillColor, 1, bianColor);
			}
		}

		sprite.setScale(0.3);
		// cc.eventManager.addListener(listenerWorldMapLayer.clone(), sprite);
	}
});

// 创建一个事件监听器 OneByOne 为单点触摸
var listenerWorldMapLayer = cc.EventListener.create({
	event : cc.EventListener.TOUCH_ONE_BY_ONE,
	swallowTouches : true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
	onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数
		var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
		// 通常是cc.Node及其子类

		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		var s = target.getBoundingBoxToWorld();
		var rect = cc.rect(0, 0, s.width, s.height);

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

		target.x += delta.x;// * 2;
		target.y += delta.y;// * 2;
		cc.log(target.x + " " + target.y + " -- " + delta.x + "" + delta.y);

	},
	onTouchEnded : function(touch, event) {
		// 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();
		cc.log("sprite onTouchesEnded.. ");
		target.setOpacity(255);

	}
});
