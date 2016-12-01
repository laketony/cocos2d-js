var index = 1;
var cardFaces = [res.car3, res.car3, res.car3, res.car3 ];
var GameScene = cc.Scene.extend({
	cards:[],
	car_start:null, 
	car_array:[],
	backageLayer:null,
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
		backageLayer.setPosition(cc.p(winSize.width / 2,255));
		this.addChild(backageLayer);
		this.backageLayer = backageLayer;

		
		this.car_start = new cc.Sprite(res.car1);  
		backageLayer.addChild(this.car_start);
		this.car_start.delegate = this;
		
		cc.eventManager.addListener(listenerStart, this.car_start);
		
		// 1秒飞车
		this.schedule(this.timeout, 1);
		// 碰撞检测
		this.scheduleUpdate();// 表示使用每帧更新函数,更新用户生命
	}, update : function(dt) {
		this.checkPlayerMonster();
	},
	timeout : function() { 
		this.creditCar();
	},
	animCredit: function(target) {
		var winSize = cc.director.getWinSize();
		var pZero = cc.p(0,0);
		var pFrom = target.getPosition();
		var pTo = cc.p(0,-winSize.height-150);
	 
		
		var actionMoveBy = cc.moveBy(10*Math.random()+2, pTo);  
				
		// var actionRBy = cc.rotateBy(2, 360*5);
		
		// var step1 = cc.spawn(
		// cc.sequence(actionMoveBy,actionRv),
		// actionRBy );
		
		var actionCall = cc.callFunc(this.bindClick, this) 
		var removeSelf = cc.removeSelf(true) ;
		var over=cc.sequence(actionMoveBy,actionCall,removeSelf );
		return over;
	},
	creditCar: function(target){
		var winSize = cc.director.getWinSize();
		var xstart =  (winSize.width/2)	*cc.randomMinus1To1();
		
		var topPoint = cc.p(xstart,winSize.height-150);
		var car_d = new cc.Sprite(res.car2);  
		car_d.setPosition(topPoint);
		car_d.rotation = 180;
		this.backageLayer.addChild(car_d);  
		
		this.car_array.push(car_d);
		
		var runCar = this.animCredit(car_d);
		car_d.runAction(runCar);
	} ,
	overcar: function(target) {
	},
	checkPlayerMonster : function() {

		var awBox = this.car_start.getBoundingBoxToWorld();// 玩家的物体

		// 检测独立怪物区
		for ( var j in this.car_array) {
			var car_d = this.car_array[j];
			var bwBox = car_d.getBoundingBoxToWorld();// 怪物的物体
			if (cc.rectIntersectsRect(bwBox, awBox)) {// 判断子弹与敌人是否发生碰撞
				
				this.car_array.splice(j, 1);// 从怪物数组中删除怪物
				car_d.removeFromParent(true);

				this.car_start.runAction(cc.blink(1, 5));
			}
		}
	}
});

// 创建一个事件监听器 OneByOne 为单点触摸
var listenerStart = cc.EventListener.create({
	event : cc.EventListener.TOUCH_ONE_BY_ONE,
	swallowTouches : true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
	onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数A
		var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
		// 通常是cc.Node及其子类

		return true;
	},
	onTouchMoved : function(touch, event) {
		// 实现onTouchMoved事件处理回调函数, 触摸移动时触发

		// 移动当前按钮精灵的坐标位置
		var target = event.getCurrentTarget();
		var delta = touch.getDelta(); // 获取事件数据: delta
		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		
		var winSize = cc.director.getWinSize();
		
		var bianjiexL = -winSize.width/2+60;
		var bianjiexR = winSize.width/2-60;
		var willx = target.x + delta.x;
		
		if(willx<=bianjiexR&&willx>=bianjiexL)
		{
		target.x += delta.x;
		}
		
		

		
	},
	onTouchEnded : function(touch, event) {
		// 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();

		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		// console.log(locationInNode);
	}
});