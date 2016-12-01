var PlayerLayer = cc.Layer.extend({
	ctor : function() {
		this._super();
		this.init();

	},

	init : function() {
		this._super();

		var winsize = cc.director.getWinSize();
		var size = cc.director.getWinSize();

		console.log("PlayerLayer");

		cc.eventManager.addListener(this.listener_PlayerLayer, this);

	},
	// 创建一个事件监听器 OneByOne 为单点触摸
	listener_PlayerLayer : cc.EventListener.create({
		event : cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches : false,
		// 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递
		onTouchBegan : function(touch, event) {
			// 实现 onTouchBegan 事件处理回调函数
			// 移动当前按钮精灵的坐标位置
			var target = event.getCurrentTarget();
			var delta = touch.getDelta(); // 获取事件数据: delta
			// 获取当前触摸点相对于按钮所在的坐标
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			var jiaodu = jiaoduAOX(locationInNode);
			LT.player.skill2(90 - jiaodu);

		}
	})
});
