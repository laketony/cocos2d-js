var EditerMapWindowLayer = cc.Layer.extend({

	delegate : null,

	ctor : function() {
		this._super();

		this.init();
	},
	btn_addLine : null,
	btn_moveLayer : null,
	labelTR : cc.LabelTTF.create("地图", "Transformers_Movie", 12),

	init : function() {
		this._super();
		var winsize = cc.director.getWinSize();

		// create the background image and position it at the center of
		// screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		this.labelTR.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR.setPosition(cc.p(winsize.width - 1, winsize.height - 1));
		this.addChild(this.labelTR, 1);

		this.btn_addLine = new cc.Sprite(res.btn_addLine);
		this.btn_addLine.setAnchorPoint(cc.p(1.0, 1.0));
		this.btn_addLine.name = "btn_addLine";
		this.btn_addLine.setPosition(cc.p(winsize.width - 1, winsize.height - 85));
		this.btn_addLine.setColor(cc.color(255, 255, 255));
		this.addChild(this.btn_addLine);

		this.btn_moveLayer = new cc.Sprite(res.btn_moveLayerOpen);
		this.btn_moveLayer.setAnchorPoint(cc.p(0.0, 1.0));
		this.btn_moveLayer.name = "btn_moveLayer";
		this.btn_moveLayer.setPosition(cc.p(0 + 1, winsize.height - 1));
		this.btn_moveLayer.setColor(cc.color(255, 255, 255));
		this.addChild(this.btn_moveLayer);

		cc.eventManager.addListener(listener_addlierButton, this.btn_addLine);
		cc.eventManager.addListener(listener_addlierButton.clone(), this.btn_moveLayer);

		
	}

});

// 创建一个事件监听器 OneByOne 为单点触摸
var listener_addlierButton = cc.EventListener.create({
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

 
