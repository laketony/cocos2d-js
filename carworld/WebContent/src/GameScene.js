var index = 1;
var GameScene = cc.Scene.extend({
	fxp : null,
	windowLayer : null,
	carLiss : [],
	onEnter : function() {
		this._super();

		this.createScene();

	},
	createScene : function() {
		var winSize = cc.director.getWinSize();
		// create the background image and position it at the center of
		// screen
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

		var worldMapLayerColor = new cc.LayerColor(cc.color(0, 0, 0), winSize.width, winSize.height);
		this.addChild(worldMapLayerColor, 0);

		var backageLayer = new cc.Layer();
		backageLayer.setPosition(centerPos);
		this.addChild(backageLayer);

		this.worldMap = new WorldMapLayer();
		this.worldMap.setPosition(centerPos);
		this.addChild(this.worldMap);

		var playerLayer = new PlayerLayer();
		playerLayer.setPosition(centerPos);
		this.addChild(playerLayer);

		this.windowLayer = new WindowLayer();
		this.windowLayer.setPosition(0, 0);
		this.addChild(this.windowLayer, 4);

		this.fxp = new fangxiangpan(res.car1);
		playerLayer.addChild(this.fxp, 10);

		var fxp2 = new fangxiangpan(res.car3);
		var fxp3 = new fangxiangpan(res.car4);
		var fxp4 = new fangxiangpan(res.car2);
		playerLayer.addChild(fxp2, 10);
		playerLayer.addChild(fxp3, 10);
		playerLayer.addChild(fxp4, 10);

		this.carLiss.push(fxp3);
		this.carLiss.push(fxp4);

		cc.eventManager.addListener(listenerWorldMapLayer, backageLayer);
		this.schedule(this.changeCar, 1);
		this.scheduleUpdate(); // 开启每帧调用，对应update
	},
	changeCar : function() {
		this.fxp.car_acceleration += 0.1;
	},
	update : function(dt) {

		if (this.fxp.car_speed <= 10) {
			// 速度 = 速度+ 加速度
			this.fxp.car_speed = this.fxp.car_speed + this.fxp.car_acceleration;
		}

		var car_speed = this.fxp.car_speed;

		// 获取角度
		var angle = -this.fxp.getRotation() + 360;
		// 转乘弧度
		var radian = angle * (Math.PI / 180)
		// 计算向量
		cx = (Math.cos(radian) * car_speed);// .toFixed(2);
		cy = (Math.sin(radian) * car_speed);// .toFixed(2);

		// 汽车移动
		this.fxp.x += cx;
		this.fxp.y += cy;

		var log = "朝向" + angle.toFixed(2) + "[" + this.fxp.x.toFixed(2) + ":" + this.fxp.y.toFixed(2) + "]";

		this.windowLayer.setLog(log);
		this.windowLayer.setCar_speed(this.fxp.car_speed);
		this.windowLayer.setCar_acceleration(this.fxp.car_acceleration);
		// 窗口移动
		this.fxp.parent.x -= cx;
		this.fxp.parent.y -= cy;

		var car_speed_xlc = 10;
		// 巡逻车移动
		var fxp3 = this.carLiss[1];
		fxp3.x += 0.5 * car_speed_xlc;
		// 巡逻车移动
		var fxp4 = this.carLiss[0];
		fxp4.y += 0.5 * car_speed_xlc;
		fxp4.setRotation(-90);
	}
});
//创建一个事件监听器 OneByOne 为单点触摸
var listenerWorldMapLayer = cc.EventListener.create({
	event : cc.EventListener.TOUCH_ONE_BY_ONE,
	swallowTouches : true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
	onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数A
		var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
		// 通常是cc.Node及其子类

		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		var s = target.getContentSize();
		var rect = cc.rect(0, 0, s.width, s.height);
		// console.log(target);
		// console.log(locationInNode);

		return true;
	},
	onTouchMoved : function(touch, event) {
		// 实现onTouchMoved事件处理回调函数, 触摸移动时触发

		// 移动当前按钮精灵的坐标位置
		var target = event.getCurrentTarget();
		var delta = touch.getDelta(); // 获取事件数据: delta
		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());

		var x = locationInNode.x;
		var y = locationInNode.y;
		var c = Math.sqrt(x * x + y * y);

		var jiaodu = 0;
		if (locationInNode.y > 0) {
			jiaodu = Math.acos(x / c) * (180 / Math.PI);

		} else {
			jiaodu = 360 - Math.acos(x / c) * (180 / Math.PI);
		}
		target.parent.fxp.setRotation(360 - jiaodu);
		// var actionTo0 = cc.rotateTo(2, 360 - jiaodu);
		// target.parent.fxp.runAction(actionTo0);

	},
	onTouchEnded : function(touch, event) {
		// 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();

		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		// console.log(locationInNode);
	}
});