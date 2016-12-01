var WorldMapLayer = cc.Layer.extend({
	drawLineMap : cc.DrawNode.create(),
	ctor : function() {
		this._super();
		this.init();

	},

	init : function() {
		this._super();
		
		var singularity = new cc.Sprite(res.btn_singularity);
		singularity.setPosition(cc.p(0, 0));
		this.addChild(singularity);

		this.addChild(this.drawLineMap);
		
		this.loadLine();

		cc.eventManager.addListener(listenerLayer, this);
	},
	loadLine : function() {
		var pos = $.post("AllLine", function(data) {
			pos.delegate.drawMap(data);
		});
		pos.delegate = this;

	},
	drawMap : function(data) {
		var lineArray = eval(data);
		for ( var x in lineArray) {
			lineInfo = lineArray[x];
			var pointFrom = cc.p(parseInt(lineInfo.l_from_x),
					parseInt(lineInfo.l_from_y));
			var pointTo = cc.p(parseInt(lineInfo.l_to_x),
					parseInt(lineInfo.l_to_y));
			var pointCtrl = cc.p(parseInt(lineInfo.l_ctrl_x),
					parseInt(lineInfo.l_ctrl_y));
			this.drawLineMap.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50,
					6, cc.color(0, 128, 255, 128));
			this.drawLineMap.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50,
					2, this.lineColor);

		}
	}

});
// 创建一个事件监听器 OneByOne 为单点触摸
var listenerLayer = cc.EventListener.create({
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
	},
	onTouchMoved : function(touch, event) {
		// 实现onTouchMoved事件处理回调函数, 触摸移动时触发

		// 移动当前按钮精灵的坐标位置
		var target = event.getCurrentTarget();
		var delta = touch.getDelta(); // 获取事件数据: delta
		target.x += delta.x;
		target.y += delta.y;
	},
	onTouchEnded : function(touch, event) {
		// 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();
	}
});