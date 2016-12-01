var EditerBuildingLayer = cc.Layer.extend({
	_buildingList : [],
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

		this.opacity = 1;
		this.addChild(this.drawLineMap);

		this.loadLine();
		this.loadBuild();
		cc.eventManager.addListener(listenerBudildMenuLayer, this);
		cc.eventManager.addListener(listenerLayerMouse, this);

		this.scheduleUpdate();// 表示使用每帧更新函数
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
			this._buildingList.push(build);
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
	build_item : function(build_point) {

		// var res_js_keys = Object.keys(res_building);
		// var paodanType = Math.ceil(Math.random() *
		// res_js_keys.length);
		// var budileTexture = res_building[res_js_keys[paodanType]];

		if (cc.glLtdata == undefined || undefined == cc.glLtdata.SelectBuildRes) {
			alert("请选择需要的建筑物");
			return;
		}

		var budileTexture = cc.glLtdata.SelectBuildRes;

		var build = cc.Sprite.create(budileTexture);
		build.setPosition(build_point);
		this.addChild(build);

		if (this.isbuildonly(build) == false) {
			alert("建筑物位置已经包涵建筑");
			return false;
		} else {
			this._buildingList.push(build);
			budileTexture = budileTexture.replace("../", "");
			console.log("budileTexture "+budileTexture);
			$.post("AddBuild", {
				l_build_res : budileTexture,
				l_build_y : build_point.y,
				l_build_x : build_point.x
			});
		}

	},
	update : function(dt) {

		this.time += dt;// dt为每一帧执行的时间，把它加起来等于运行了多长时间
		if (this.time > 7) {
			cc.log("每7秒显示一次");
			this.time = 0;// 每7秒重置为0，以达到循环显示
		}
		// cc.log(this.time);//time的当前时间

		for ( var i in this._buildingList) {// 遍历所有子弹
			var bulletA = this._buildingList[i];
			var aBox = bulletA.getBoundingBox();// 子弹碰撞框
			for ( var j in this._buildingList) {
				if (i != j) {
					var bulletB = this._buildingList[j];
					var bBox = bulletB.getBoundingBox();// 子弹碰撞框

					if (cc.rectIntersectsRect(bBox, aBox)) {// 判断子弹与敌人是否发生碰撞
						// this._bullets.splice(i, 1);// 从子弹数组中删除子弹
						// this.removeChild(bullet, true);// 移除子弹
						var rcolor = Math.random() * 255;
						var gcolor = Math.random() * 255;
						var bcolor = Math.random() * 255;
						var color = cc.color(rcolor, gcolor, bcolor);
						bulletA.setColor(color);
						bulletB.setColor(color);
					}
				}
			}
		}
	},
	isbuildonly : function(bulletA) {
		var isOnly = true;
		var aBox = bulletA.getBoundingBox();// 准备建立的建筑物
		for ( var j in this._buildingList) {
			if (i != j) {
				var bulletB = this._buildingList[j];
				var bBox = bulletB.getBoundingBox();// 已经建立的建筑物
				if (cc.rectIntersectsRect(bBox, aBox)) {// 建筑物发生重叠
					isOnly = false;
					bulletA.setColor(cc.color(255, 0, 0));
					var action1 = cc.blink(2, 10);
					var removeSelfAction = new cc.RemoveSelf(false);
					var action = cc.sequence(action1, removeSelfAction);
					bulletA.runAction(action);

				}
			}
		}
		return isOnly;
	}
});

var listenerBudildMenuLayer = cc.EventListener.create({
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