var PlayerLayer = cc.Layer.extend({
	ctor : function() {
		this._super();
		this.init();
	},

	init : function() {
		this._super();

		cc.eventManager.addListener(this.listener_PlayerLayer, this);
	},
	// 创建一个事件监听器 OneByOne 为单点触摸
	listener_PlayerLayer : cc.EventListener.create({
		event : cc.EventListener.TOUCH_ONE_BY_ONE,
		onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数

		}
	})

});
