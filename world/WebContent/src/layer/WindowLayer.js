var WindowLayer = cc.Layer.extend({

	ctor : function() {
		this._super();
		this.init();
	},
	labelBR : cc.LabelTTF.create("", "Transformers_Movie", 44),

	taskBox : cc.Node.create(),

	labelTR1 : cc.LabelTTF.create("HP", "Transformers_Movie", 25),
	labelTR2 : cc.LabelTTF.create("MP", "Transformers_Movie", 25),
	labelTR3 : cc.LabelTTF.create("MS", "Transformers_Movie", 25),
	labelTR4 : cc.LabelTTF.create("AT", "Transformers_Movie", 25),

	labelBL_LV : cc.LabelTTF.create("LV 1", "Transformers_Movie", 35),
	labelBL_EX : cc.LabelTTF.create("EX 0", "Transformers_Movie", 35),

	init : function() {
		this._super();
		var winSize = cc.director.getWinSize();

		// create the background image and position it at the center of
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

		this.labelBR.setAnchorPoint(cc.p(1.0, 0.0));
		this.labelBR.setPosition(cc.p(winSize.width - 1, 0));
		this.addChild(this.labelBR, 1);

		this.labelTR1.setString(0 + " HP");
		this.labelTR1.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR1.setPosition(cc.p(winSize.width - 1, winSize.height - 15));
		this.addChild(this.labelTR1, 1);

		this.labelTR2.setString(0 + " MP");
		this.labelTR2.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR2.setPosition(cc.p(winSize.width - 1, winSize.height - 35));
		this.addChild(this.labelTR2, 1);

		this.labelTR3.setString(0 + " MS");
		this.labelTR3.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR3.setPosition(cc.p(winSize.width - 1, winSize.height - 55));
		this.addChild(this.labelTR3, 1);

		this.labelTR4.setString(0 + " AT");
		this.labelTR4.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR4.setPosition(cc.p(winSize.width - 1, winSize.height - 75));
		this.addChild(this.labelTR4, 1);

		this.labelBL_LV.setString("LV " + 0);
		this.labelBL_LV.setAnchorPoint(cc.p(0.0, 0.0));
		this.labelBL_LV.setPosition(cc.p(13, winSize.height - 75));
		this.addChild(this.labelBL_LV, 1);

		this.labelBL_EX.setString("Ex " + 0 + "/" + 0);
		this.labelBL_EX.setAnchorPoint(cc.p(0.0, 0.0));
		this.labelBL_EX.setPosition(cc.p(13, winSize.height - 105));
		this.labelBL_EX.setFontFillColor(cc.color(128,0,255));
		this.addChild(this.labelBL_EX, 1);

		this.taskBox.setPosition(cc.p(0, winSize.height));
		this.addChild(this.taskBox, 1);
		

		
		
		var myRoomChara = this.myRoomChara = new cc.Sprite("res/actor/myRoomChara1_1.png");
		myRoomChara.setPosition(winSize.width+400,-400);
		this.addChild(myRoomChara);
		cc.eventManager.addListener(this.listener_PlayerLayer, this);
				
		
		
		var warrr  = new cc.Sprite(UIs.dungeonTitleFrame1);
		warrr.setPosition(55,65);
		
		this.addChild(warrr);
			
	     
	},
	// 创建一个事件监听器 OneByOne 为单点触摸
	listener_PlayerLayer : cc.EventListener.create({
		event : cc.EventListener.TOUCH_ONE_BY_ONE,
		onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数
			
			
			var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
			// 通常是cc.Node及其子类


			// 获取当前触摸点相对于按钮所在的坐标
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			
			// 获取当前触摸点相对于按钮所在的坐标
			var rect = cc.rect(0, 0, 150, 150);
			if(cc.rectContainsPoint(rect, locationInNode)){
				console.log("玫瑰花");
				return true;
			}
			
			var kkGlode = new cc.Sprite();
			kkGlode.setPosition(locationInNode);
			var step1 = EffectAnim.A7Geter();
			var stepRm = cc.removeSelf(false);
			var seq = cc.sequence([step1,stepRm]);
			target.addChild(kkGlode);
			kkGlode.runAction(seq);
			
			return false;
		}
	}),
	show: function() {
		
		var winSize = cc.director.getWinSize();
		
		
		var myRoomChara = target.myRoomChara;
		myRoomChara.setPosition(winSize.width+myRoomChara.width/4,0-myRoomChara.height/4);
		var step1 =cc.moveTo(0.3 , winSize.width-myRoomChara.width/2,myRoomChara.height/2);
		console.log(myRoomChara);
		myRoomChara.stopAllActions();
		myRoomChara.runAction(step1);
		
		myRoomChara.setScale(0.4);
		
		var actionTo = cc.scaleTo(0.3, 1);
		myRoomChara.runAction(actionTo);
	},
	showOpenBox:function(){
		 var kaibaoxiang = new cc.Sprite();
		 kaibaoxiang.setPosition(centerPos);
		 var step1 = EffectAnim.A3();
		 var stepRm = cc.removeSelf(false);
		 var seq = cc.sequence([step1]).repeatForever();
				
		 this.addChild(kaibaoxiang);
		 kaibaoxiang.runAction(seq);
	}
});
