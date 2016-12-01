var EditerBuildingWindowLayer = cc.Layer.extend({

	delegate : null,

	ctor : function() {
		this._super();

		this.init();
	},
	btn_addLine : null,
	btn_moveLayer : null,
	labelTR : cc.LabelTTF.create("建筑", "Transformers_Movie", 12),
	labelTR1 : null,
	labelTR2 : null,
	labelTR3 : null,
	init : function() {
		this._super();
		var winsize = cc.director.getWinSize();

		// create the background image and position it at the center of
		// screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		this.labelTR1 = cc.LabelTTF.create("HP 134123", "Transformers_Movie",
				25);
		this.labelTR2 = cc.LabelTTF.create("MP 134123", "Transformers_Movie",
				25);
		this.labelTR3 = cc.LabelTTF.create("DP 134123", "Transformers_Movie",
				25);

		this.labelTR.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR.setPosition(cc.p(winsize.width - 1, winsize.height - 1));
		this.addChild(this.labelTR, 1);

		this.labelTR1.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR1.setPosition(cc.p(winsize.width - 1, winsize.height - 15));
		this.addChild(this.labelTR1, 1);

		this.labelTR2.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR2.setPosition(cc.p(winsize.width - 1, winsize.height - 35));
		this.addChild(this.labelTR2, 1);

		this.labelTR3.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR3.setPosition(cc.p(winsize.width - 1, winsize.height - 55));
		this.addChild(this.labelTR3, 1);


		this.btn_moveLayer = new cc.Sprite(res.btn_moveLayerOpen);
		this.btn_moveLayer.setAnchorPoint(cc.p(0.0, 1.0));
		this.btn_moveLayer.name = "btn_moveLayer";
		this.btn_moveLayer.setPosition(cc.p(0 + 1, winsize.height - 1));
		this.btn_moveLayer.setColor(cc.color(255, 255, 255));
		this.addChild(this.btn_moveLayer);
 
		cc.eventManager.addListener(listener_EditerBuilding.clone(),
				this.btn_moveLayer);
	}

});

// 创建一个事件监听器 OneByOne 为单点触摸
var listener_EditerBuilding = cc.EventListener.create({
	event : cc.EventListener.TOUCH_ONE_BY_ONE,
	swallowTouches : true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
	onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数
		var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
		// 通常是cc.Node及其子类

		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		var s = target.getContentSize();
		var rect = cc.rect(0, 0, s.width, s.height);
		if (cc.rectContainsPoint(rect, locationInNode)) {

			// 判断触摸点是否在按钮范围内
			return true;
		}
		return false;
	},
	onTouchEnded : function(touch, event) { // 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();
		target.parent.labelTR1.setString("HP "
				+ Math.ceil(Math.random() * 35000));
		target.parent.labelTR2.setString("MP "
				+ Math.ceil(Math.random() * 35000));
		target.parent.labelTR3.setString("DP "
				+ Math.ceil(Math.random() * 35000));
		console.log("~~" + target.name);
		if (target.name == "btn_addLine") {
			target.parent.delegate.takeLine();
		} else if (target.name == "btn_moveLayer") {
			var isCan = target.parent.delegate.changeCanMoveMap();
			if (isCan) {
				target.setTexture(res.btn_moveLayerOpen);
			} else {
				target.setTexture(res.btn_moveLayerClose);
			}

		}

	}
});
