var EditerMapLayer2 = cc.Layer.extend({
	lineFromNode : new MapItemCircle(),
	lineToNode : new MapItemCircle(),
	lineCtrlNode : new MapItemDot(),
	pointCtrlNode : true,
	lineArray : [],
	lineIndex : 0,

	drawLinePen : cc.DrawNode.create(),
	drawLineMap : cc.DrawNode.create(),
	lineColor : cc.color(245, 245, 200),

	canMoveMap : true,

	ctor : function() {
		this._super();
		this.init();
	},

	init : function() {
		this._super();

		singularity = new cc.Sprite(res.btn_singularity);
		singularity.setPosition(cc.p(0, 0));
		this.addChild(singularity);

		var lineFromNode = this.lineFromNode;
		var lineToNode = this.lineToNode;
		var lineCtrlNode = this.lineCtrlNode;

		this.opacity = 1;
		this.addChild(this.drawLineMap);
		this.addChild(this.drawLinePen);
		lineToNode.opacity = 10;
		this.addChild(lineFromNode);

		lineToNode.opacity = 20;
		this.addChild(lineCtrlNode);

		lineToNode.opacity = 30;
		this.addChild(lineToNode);
		// 请求网络获取线段
		this.loadLine();
		this.loadBuild();

		cc.eventManager.addListener(listenerLayer, this);

		if ('mouse' in cc.sys.capabilities) {
			cc.eventManager.addListener(listenerLayerMouse, this);

			cc.eventManager.addListener(listenerItemMouseMove, lineToNode);
		} else {
			cc.log("MOUSE Not supported");
		}
		// cc.eventManager.addListener(listener_MapItem.clone(), lineToNode);
		// cc.eventManager.addListener(listener_MapItem.clone(), lineCtrlNode);
		if ('keyboard' in cc.sys.capabilities) {
			cc.eventManager.addListener({
				event : cc.EventListener.KEYBOARD,
				onKeyPressed : function(key, event) {
					// cc.log("Key down:" + key);
					if (key == 187) {
						target.scale += 0.01;
						target.x += 0.01;
						target.y += 0.01;
					}
					if (key == 189) {
						target.scale -= 0.01;
						target.x += 0.01;
						target.y += 0.01;
					}
				},
				onKeyReleased : function(key, event) {
					cc.log("Key up:" + key);
					target = event.getCurrentTarget();
					if (key == 67) {
						target.chageMouse();
					}
					// 0==48 9==57
					if (key == 49) {
						target.scale = 0.5;
					}
					if (key == 50) {
						target.scale = 1;
					}
					if (key == 51) {
						target.scale = 1.5;
					}

				}
			}, this);
		} else {
			cc.log("KEYBOARD Not supported");
		}
		initOutlineButton(this);
	},
	chageMouse : function() {
		cc.eventManager.removeListener(listenerItemMouseMove);
		if (this.pointCtrlNode) {
			cc.eventManager.addListener(listenerItemMouseMove, this.lineToNode);
		} else {
			cc.eventManager.addListener(listenerItemMouseMove, this.lineCtrlNode);
		}
		this.pointCtrlNode = !this.pointCtrlNode;
	},
	drawLine : function() {
		var pointCtrl = this.lineCtrlNode.getPosition();
		var pointFrom = this.lineFromNode.getPosition();
		var pointTo = this.lineToNode.getPosition();
		this.drawLinePen.clear();
		if (cc.pointEqualToPoint(pointCtrl, pointFrom)) {
			this.drawLinePen.drawSegment(pointFrom, pointTo, 2, this.lineColor);
		} else {
			// origin, control, destination
			this.drawLinePen.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50, 3, this.lineColor);
		}
	},
	takeLine : function() {

		var pointCtrl = this.lineCtrlNode.getPosition();
		var pointFrom = this.lineFromNode.getPosition();
		var pointTo = this.lineToNode.getPosition();
		this.drawLinePen.clear();
		this.drawLineMap.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50, 2, this.lineColor);

		if (this.checkLinePoint()) {
			alert("这段路太长了,缩短后才可添加");
		} else {
			$.post("AddLine", {
				l_from_x : pointFrom.x,
				l_from_y : pointFrom.y,
				l_to_x : pointTo.x,
				l_to_y : pointTo.y,
				l_ctrl_x : pointCtrl.x,
				l_ctrl_y : pointCtrl.y
			});

			this.lineFromNode.setPosition(pointTo);
			this.lineCtrlNode.setPosition(pointTo);
			this.lineToNode.setPosition(pointTo);
		}

	},
	loadLine : function() {
		var pos = $.post("AllLine", function(data) {
			pos.delegate.drawMap(data);
		});
		pos.delegate = this;

	},
	drawMap : function(data) {
		var lineArray = eval(data);
		var lasePoint = null;
		for ( var x in lineArray) {
			lineInfo = lineArray[x];
			var pointFrom = cc.p(parseInt(lineInfo.l_from_x), parseInt(lineInfo.l_from_y));
			var pointTo = cc.p(parseInt(lineInfo.l_to_x), parseInt(lineInfo.l_to_y));
			var pointCtrl = cc.p(parseInt(lineInfo.l_ctrl_x), parseInt(lineInfo.l_ctrl_y));
			this.drawLineMap.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50, 6, cc.color(0, 128, 255, 128));
			this.drawLineMap.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50, 2, this.lineColor);

			lasePoint = pointTo;
		}
		if (lasePoint != null) {
			this.lineFromNode.setPosition(lasePoint);
			this.lineCtrlNode.setPosition(lasePoint);
			this.lineToNode.setPosition(lasePoint);
			var nowPosition = this.getPosition();

			this.setPosition(cc.p(nowPosition.x - lasePoint.x, nowPosition.y - lasePoint.y));
		}
		this.lineArray = lineArray;

	},
	loadBuild : function() {
		var loadBuilding = $.post("FindBuilding", function(data) {
			loadBuilding.delegate.drawBuildings(data);
		});
		loadBuilding.delegate = this;

	},
	drawBuildings : function(data) {
		var buildingArray = eval(data);
		for ( var x in buildingArray) {
			buildingInfo = buildingArray[x];
			var build_point = cc.p(parseInt(buildingInfo.x), parseInt(buildingInfo.y));

			var build = cc.Sprite.create("../" + buildingInfo.respath);
			build.setPosition(build_point);
			this.addChild(build); 
		}
	},
	changeCanMoveMap : function(data) {
		this.canMoveMap = !this.canMoveMap;
		if (this.canMoveMap) {
			cc.eventManager.addListener(listenerLayer, this);
		} else {
			cc.eventManager.removeListener(listenerLayer);
		}
		return this.canMoveMap
	},
	checkLinePoint : function(data) {

		var pCtrl = this.lineCtrlNode.getPosition();
		var pFrom = this.lineFromNode.getPosition();
		var pTo = this.lineToNode.getPosition();

		var isLineTooLong = false;// false 短的 true 太长了
		var sss = lineSpace(pFrom.x, pFrom.y, pTo.x, pTo.y);
		var ssss = pointToLine(pFrom.x, pFrom.y, pTo.x, pTo.y, pCtrl.x, pCtrl.y);
		// cc.log(sss + " " + ssss);
		if (sss <= 500 && ssss <= 250) {
			this.lineColor = cc.color(245, 245, 200);
			isLineTooLong = false;
		} else {
			// origin, control, destination
			this.lineColor = cc.color(245, 0, 0);
			isLineTooLong = true;
		}
		return isLineTooLong;
	},
	pointToArrayUp : function() {
		if (this.lineIndex == 0) {
			this.lineIndex = this.lineArray.length - 2;
		} else {
			this.lineIndex = this.lineIndex - 1;
		}
		cc.log(this.lineArray.length + " : " + this.lineIndex);
		var lineInfo = this.lineArray[this.lineIndex];
		var pointTo = cc.p(parseInt(lineInfo.l_to_x), parseInt(lineInfo.l_to_y));
		this.lineFromNode.setPosition(pointTo);
		this.lineCtrlNode.setPosition(pointTo);
		this.lineToNode.setPosition(pointTo);

		var nowPosition = this.getPosition();
		this.setPosition(cc.p(640 - pointTo.x, 360 - pointTo.y));
	},
	pointToArrayDown : function() {
		this.lineIndex = this.lineIndex + 1;
		if (this.lineIndex >= this.lineArray.length) {
			this.lineIndex = 0;
		}
		cc.log(this.lineArray.length + " : " + this.lineIndex);
		var lineInfo = this.lineArray[this.lineIndex];
		var pointTo = cc.p(parseInt(lineInfo.l_to_x), parseInt(lineInfo.l_to_y));

		this.lineFromNode.setPosition(pointTo);
		this.lineCtrlNode.setPosition(pointTo);
		this.lineToNode.setPosition(pointTo);

		var nowPosition = this.getPosition();
		this.setPosition(cc.p(640 - pointTo.x, 360 - pointTo.y));
	}

});

// 创建一个事件监听器 OneByOne 为单点触摸
var listener_MapItem = cc.EventListener.create({
	event : cc.EventListener.TOUCH_ONE_BY_ONE,
	swallowTouches : true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
	onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数
		var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
		// 通常是cc.Node及其子类
		// console.log(target);
		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		var s = target.getContentSize();
		var rect = cc.rect(-50, -50, 100, 100);
		console.log(cc.rectContainsPoint(rect, locationInNode));
		if (cc.rectContainsPoint(rect, locationInNode)) {
			// 判断触摸点是否在按钮范围内
			return true;
		}
		return false;
	},
	onTouchMoved : function(touch, event) {
		// 实现onTouchMoved事件处理回调函数, 触摸移动时触发

		// 移动当前按钮精灵的坐标位置
		var target = event.getCurrentTarget();
		var delta = touch.getDelta(); // 获取事件数据: delta
		target.x += delta.x;
		target.y += delta.y;
		target.parent.checkLinePoint();
		target.parent.drawLine();

	},
	onTouchEnded : function(touch, event) { // 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();

		target.parent.drawLine();
	}
});

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

var listenerLayerMouse = cc.EventListener.create({
	event : cc.EventListener.MOUSE,
	onMouseScroll : function(event) {
		var target = event.getCurrentTarget();

		if (event.getScrollY() > 0) {
			if (target.scale <= 3.5) {
				target.scale += 0.01;
			}
		} else {
			if (target.scale > 0.02) {
				target.scale -= 0.01;
			}
		}
		console.log(target.scale);
	}
});

var listenerItemMouseMove = cc.EventListener.create({
	event : cc.EventListener.MOUSE,
	onMouseDown : function(event) {
		var pos = event.getLocation(), target = event.getCurrentTarget();
		if (event.getButton() === cc.EventMouse.BUTTON_RIGHT) {
			cc.log("onRightMouseDown at: " + pos.x + " " + pos.y);
			target.parent.takeLine();
		} else if (event.getButton() === cc.EventMouse.BUTTON_LEFT)
			cc.log("onLeftMouseDown at: " + pos.x + " " + pos.y);
		target.x = pos.x - target.parent.x;
		target.y = pos.y - target.parent.y;
	},
	onMouseMove : function(event) {
		var pos = event.getLocation(), target = event.getCurrentTarget();
		// cc.log("onMouseMove at: " + pos.x + " " + pos.y);
		target.x = pos.x - target.parent.x;
		target.y = pos.y - target.parent.y;
		target.parent.checkLinePoint();
		target.parent.drawLine();
	},
	onMouseUp : function(event) {
		var pos = event.getLocation(), target = event.getCurrentTarget();
		// cc.log("onMouseUp at: " + pos.x + " " + pos.y);
		target.x = pos.x - target.parent.x;
		target.y = pos.y - target.parent.y;

	}
});

function initOutlineButton(delegate) {
	cc.log("initOutlineButton");
	cc.log(delegate);
	$(".btn_point_up").click(function() {
		delegate.pointToArrayUp();
	});
	$(".btn_point_down").click(function() {
		delegate.pointToArrayDown();
	});

}
