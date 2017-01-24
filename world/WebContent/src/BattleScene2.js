var BattleScene2 = cc.Scene.extend({
	
	monsters:[],
	ctor: function() {

		cc.view
		.setDesignResolutionSize(1136,640,
				cc.ResolutionPolicy.SHOW_ALL);
		this._super();
		this.createScene();
	},
	onEnter : function() {
		this._super();
	},
	createScene : function() {
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
		// 底图
		var bgSprite  = new cc.LayerColor(cc.color(255, 255, 255), winSize.width,
				winSize.height);
		bgSprite.setPosition(cc.p(0,0));
		this.addChild(bgSprite);

		// 最前窗口
		var skillLayer  = new cc.Layer();
		skillLayer.centerPos = centerPos;
		this.addChild(skillLayer);
		this.skillLayer = skillLayer;
		
		
		var player_CASTER= new cc.Sprite(actor.bookChara1_1);
		player_CASTER.setAnchorPoint(0.5,0);
		player_CASTER.setPosition(160,160);
		player_CASTER.setScale(0.2);
		player_CASTER.HP = 2650;
		this.addChild(player_CASTER);
		
		
		var player_TARGET= new cc.Sprite(actor.bookChara18_1);
		player_TARGET.setAnchorPoint(0.5,0);
		player_TARGET.setPosition(winSize.width-130,60);
		player_TARGET.setScale(0.2);
		player_TARGET.HP = 2650;
		this.addChild(player_TARGET);
		
		var ctrl= new cc.Sprite(UIs1.FrendlyTalk_Frame);
		ctrl.setPosition(player_CASTER.getPosition());
		ctrl.player_CASTER_Position = player_CASTER.getPosition();
		this.addChild(ctrl);
		
		
		var ctrlLand= new cc.Sprite("res/UI1/FX_Frame_CaseSelect_Frame@100.png");
		ctrlLand.setPosition(player_CASTER.getPosition());
		this.addChild(ctrlLand);
		ctrl.ctrlLand = ctrlLand; 
		
		
		cc.eventManager.addListener(this.listenerCtrlPoint, ctrl);
		
		var drawNode = new  cc.DrawNode();
		drawNode.setPosition(cc.p(0,0));
		this.addChild(drawNode);
		this.drawNode = drawNode;
		var drawNodeMap = new  cc.DrawNode();
		drawNodeMap.setPosition(cc.p(0,0));
		this.addChild(drawNodeMap);
		this.drawNode = drawNode;
		drawNodeMap.drawSegment(player_CASTER.getPosition(),player_TARGET.getPosition(),  1, cc.color(0, 0, 255, 255));
		drawNodeMap.drawCircle(player_CASTER.getPosition(), 150, 0, 50, false, 6, cc.color(0, 255, 0, 255));
	},
	listenerCtrlPoint :cc.EventListener.create({
		event : cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches : false, // 设置是否吞没事件，在 onTouchBegan 方法返回 true
								// 时吞掉事件，不再向下传递。
		onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数A
			var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
			// 通常是cc.Node及其子类

			// 获取当前触摸点相对于按钮所在的坐标
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			var s = target.getContentSize();
			var rect = cc.rect(0, 0, s.width, s.height);
// console.log(target);
// console.log(locationInNode);
// console.log(target.width + " " + target.height);

			if(cc.rectContainsPoint(rect, locationInNode)){ 
				
				var paodan= new cc.Sprite(EffectMap.darkboom01);
				paodan.setPosition(target.getPosition());
				paodan.setScale(0.2);
				target.paodan =paodan;
				target.parent.addChild(paodan);
				
				return true;	
			}
			return false;
		},
		onTouchMoved : function(touch, event) {
			// 实现onTouchMoved事件处理回调函数, 触摸移动时触发

			// 移动当前按钮精灵的坐标位置
			var target = event.getCurrentTarget();
			var delta = touch.getDelta(); // 获取事件数据: delta
			// 获取当前触摸点相对于按钮所在的坐标
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			
			var delta = touch.getDelta(); // 获取事件数据: delta
			var fpoint = cc.p(target.x+delta.x,target.y+delta.y);
			var fLidu = cc.pDistance(fpoint,target.player_CASTER_Position);
			if(fLidu<150){
				target.x += delta.x ;
				target.y += delta.y ;
			}
			
// console.log(target.getPosition());
// console.log(target.player_CASTER_Position);
			var sld = cc.pSub(target.getPosition(), target.player_CASTER_Position); 
			var fld =  cc.pDistance(target.getPosition(),target.player_CASTER_Position);
			var fldPo = fld/150.0; 
			
			var zongli = 250*fldPo; 
			var sldToAngle = jiaoduAOX(sld); 
			
			var a = target.player_CASTER_Position.x, b = -target.player_CASTER_Position.y;
			var hudu = (Math.PI / 180) * (-90-sldToAngle);
			var x2 = +a + Math.sin(hudu) * zongli;
			var y2 = -b + Math.cos(hudu) * zongli;

			var overpoint = cc.p(x2,y2);
			target.ctrlLand.setPosition(overpoint); 
			target.paodan.rotation = 180-sldToAngle;
	
			
			var drawNode = target.parent.drawNode;
			drawNode.clear();
			//drawNode.drawSegment(target.player_CASTER_Position,overpoint,  1, cc.color(255, 0, 255, 255));
		
		
			var xjuli = target.player_CASTER_Position.x-target.x
			console.log(xjuli);
			var lineX = (xjuli/150 )*1500;
			
			target.downPoint = cc.p(lineX+target.player_CASTER_Position.x,0);
			target.ctrl1Point = cc.p(lineX*0.2+target.player_CASTER_Position.x,overpoint.y*1.7);
			target.ctrl2Point =cc.p(lineX*0.6+target.player_CASTER_Position.x,overpoint.y*1.3);
			drawNode.drawCubicBezier(target.player_CASTER_Position, //
					target.ctrl1Point ,//
					target.ctrl2Point, //
					target.downPoint , //
					    50, 3, cc.color(128, 128, 128, 255));
			//drawNode.drawSegment(target.player_CASTER_Position,target.downPoint,  1, cc.color(255, 0, 255, 128));
			drawNode.drawDot(target.ctrl1Point, 5, cc.color(255, 0, 255, 128));
			drawNode.drawDot(target.ctrl2Point , 5, cc.color(255, 0, 255, 128));
			 
		},
		onTouchEnded : function(touch, event) {
			// 实现onTouchEnded事件处理回调函数
			var target = event.getCurrentTarget();

			// 获取当前触摸点相对于按钮所在的坐标
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			// console.log(locationInNode);

// target.paodan.removeFromParent();
			
			
			console.log(target.getPosition());
			console.log(target.player_CASTER_Position);
			var sld = cc.pSub(target.getPosition(), target.player_CASTER_Position);
		
			var fld =  cc.pDistance(target.getPosition(),target.player_CASTER_Position);
			console.log("力度:"+fld);
			var fldPo = fld/150.0;
			console.log("力度比例:"+fldPo);
			
			var zongli = 1000*fldPo;
			
			var sudu = 540;
			
			var a = target.player_CASTER_Position.x, b = -target.player_CASTER_Position.y;
			var hudu = (Math.PI / 180) * (target.paodan.rotation-270);
			var x2 = +a + Math.sin(hudu) * zongli;
			var y2 = -b + Math.cos(hudu) * zongli;

			var overpoint = cc.p(x2,y2);
			
			var time = cc.pDistance(target.paodan.getPosition(),overpoint)/sudu;
			
			var actionTo = cc.moveTo(time, overpoint);
			var remove = cc.removeSelf(true);
			var overaction = cc.sequence(actionTo, remove);
			target.paodan.runAction(overaction);
			
			
			
			console.log(EffectMap.dark01);
			var paodan1= new cc.Sprite(EffectMap.dark01);
			paodan1.setPosition(target.player_CASTER_Position); 
			paodan1.setScale(0.2);
			target.parent.addChild(paodan1);

			
			
			
			
			
			
			var drawNode = target.parent.drawNode;
			drawNode.drawCubicBezier(target.player_CASTER_Position, //
					target.ctrl1Point ,//
					target.ctrl2Point, //
					target.downPoint , //
					    50, 3, cc.color(128, 128, 128, 255));
			

			var controlPoints2 = [ 
				target.ctrl1Point ,//
				target.ctrl2Point, //
				target.downPoint ];
			var bezierTo1 = cc.bezierTo(2, controlPoints2); 
			var remove1 = cc.removeSelf(true);
			var overaction1 = cc.sequence(bezierTo1, remove1);
			paodan1.runAction(overaction1);
			var rotateByForever =cc.rotateBy(0.5, 360).repeatForever(); 
			paodan1.runAction(rotateByForever);
			
			// 回位
			target.setPosition(target.player_CASTER_Position); 
			target.ctrlLand.setPosition(target.player_CASTER_Position); 
		}
	})
});
