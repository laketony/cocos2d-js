var SignpostEditerScene = cc.Scene.extend({
	a1Layer : null,
	w1Layer : null,
	onEnter : function() {
		this._super();

		var winsize = cc.director.getWinSize();

		// create the background image and position it at the center of screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		var worldMapLayerColor = new cc.LayerColor(cc.color(0, 0, 0),
				winsize.width, winsize.height);
		this.addChild(worldMapLayerColor);

		
		var backageLayer = new cc.Layer();
		backageLayer.setPosition(centerPos);
		backageLayer.build_item = this.build_item;
		this.addChild(backageLayer);
		
		var worldMapLayer = new WorldMapEditorLayer();
		worldMapLayer.setPosition(cc.p(0, 0));
		worldMapLayer.setName("worldMapLayer");
		backageLayer.addChild(worldMapLayer);
		
		cc.eventManager.addListener(listenerSignpostLayer, backageLayer);
		cc.eventManager.addListener(listenerLayerMouse, backageLayer);
	},build_item: function(locationInNode){
		var signpostName = LT.signpostInput.val();
		if(signpostName){
			var fontSize = $('input:radio[name=fontsizeRadios]:checked').val();
			var fontDef = new cc.FontDefinition();
			fontDef.fontName = "font04b08";
			fontDef.fontSize = fontSize;
			
			var labelName = new Signpost(signpostName,fontDef);
			labelName.setPosition(locationInNode);
			labelName.init();
			this.addChild(labelName);
			
			$.post("AddSignpost", {
				text : signpostName,
				y : labelName.y,
				x : labelName.x,
				fontsize : fontSize
			});
		} 
		
	}
});

// SignpostEditerScene.js
var listenerSignpostLayer = cc.EventListener.create({
	event : cc.EventListener.TOUCH_ONE_BY_ONE,
	isMoved : false,
	swallowTouches : true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
	onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数
		var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
		// 通常是cc.Node及其子类

		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		var s = target.getContentSize();
		var rect = cc.rect(0, 0, s.width, s.height);
		this.isMoved = false;
		return true;
	},
	onTouchMoved : function(touch, event) {
		// 实现onTouchMoved事件处理回调函数, 触摸移动时触发

		// 移动当前按钮精灵的坐标位置
		var target = event.getCurrentTarget();
		var delta = touch.getDelta(); // 获取事件数据: delta
		target.x += delta.x;
		target.y += delta.y;
		if (delta.x != 0 || delta.y != 0) {
			this.isMoved = true;
		}
	},
	onTouchEnded : function(touch, event) {
		// 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		if (this.isMoved == false) {

			target.build_item(locationInNode);
		}

		this.isMoved = false;
	}
});