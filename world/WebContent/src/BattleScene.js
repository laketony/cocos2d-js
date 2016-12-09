var cardNN = ["临","兵","斗","者","皆","阵","列","前","行"];
var BattleScene = cc.Scene.extend({
	ctor: function() {
		this._super();
		this.createScene();
	},
	onEnter : function() {
		this._super();
	},
	createScene : function() {
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

		var bgSprite  = new cc.Sprite("res/UI1/map_04.png");
		bgSprite.setPosition(centerPos);
		this.addChild(bgSprite);
			
		
		var combatLayer  = new cc.Layer();
		combatLayer.setPosition(0,0);
		this.addChild(combatLayer);
		
		 // 纯黑背景
		 var combatLayerColor = new cc.LayerColor(cc.color(0, 0, 0,128), winSize.width,
				 440);
		 combatLayer.addChild(combatLayerColor, 0);
		 
		 // ------------战斗条--------------
		 var combatBox  = new cc.Layer();
		combatBox.setPosition(55,340);
		this.addChild(combatBox);
		
		
		var combatOverX = winSize.width*0.8;
		
		var combatStop  = new cc.Sprite("res/UI1/FX_Frame_CaseSelect_Frame@100.png");
		combatStop.setPosition(combatOverX,0);
		combatBox.addChild(combatStop);
		
		var combatSpp  = new cc.Sprite("res/UI/homeLightEffect.png");
		combatBox.addChild(combatSpp);
		

	
		var combatMove = cc.moveBy(0.4, cc.p(combatOverX, 0)); 
		var attarCallFunc = cc.callFunc(this.acaii, this);
	    var action1 = cc.sequence(cc.place(cc.p(0,0)), combatMove,attarCallFunc).repeatForever() ;
		combatSpp.runAction(action1);
		// ----------战斗条------
		
		var sk_card1  = new SKCard("res/UI1/FX_Frame_Hostile_Frame@100.png","临");
		sk_card1.setPosition(55+100*0,50); 
		combatLayer.addChild(sk_card1);
		
		var sk_card2  = new SKCard("res/UI1/FX_Frame_Hostile_Frame@100.png","兵");
		sk_card2.setPosition(55+100*1,50);
		combatLayer.addChild(sk_card2);
		
		var sk_card3  = new SKCard("res/UI1/FX_Frame_Hostile_Frame@100.png","斗");
		sk_card3.setPosition(55+100*2,50);
		combatLayer.addChild(sk_card3);
		
		var sk_card4  = new SKCard("res/UI1/FX_Frame_Hostile_Frame@100.png","者");
		sk_card4.setPosition(55+100*3,50);
		combatLayer.addChild(sk_card4);
		
		var sk_card5  = new SKCard("res/UI1/FX_Frame_Hostile_Frame@100.png","列");
		sk_card5.setPosition(55+100*4,50);
		combatLayer.addChild(sk_card5);
		
		
		combatSpp.sk_card1 = sk_card1;
		combatSpp.sk_card2 = sk_card2;
		combatSpp.sk_card3 = sk_card3;
		combatSpp.sk_card4 = sk_card4;
		combatSpp.sk_card5 = sk_card5;
	
		
		cc.eventManager.addListener(this.listenerScene, this);

	},
	acaii : function(tager) {
		
		tager.sk_card1.setString(cardNN[tager.sk_card1.textIndex]);
		tager.sk_card1.textIndex++;
		 
		if(tager.sk_card1.textIndex >= cardNN.length){
			tager.sk_card1.textIndex = 0;
		}
		 
	},
	listenerScene :cc.EventListener.create({
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
			console.log(locationInNode);
			console.log(target.width + " " + target.height);

			
			var kkGlode = new cc.Sprite();
			kkGlode.setPosition(locationInNode);
			var step1 = EffectAnim.A7Geter();
			var stepRm = cc.removeSelf(false);
			var seq = cc.sequence([step1,stepRm]);
			target.addChild(kkGlode);
			kkGlode.runAction(seq);
			
			
			return true;
		},
		onTouchMoved : function(touch, event) {
			// 实现onTouchMoved事件处理回调函数, 触摸移动时触发

			// 移动当前按钮精灵的坐标位置
			var target = event.getCurrentTarget();
			var delta = touch.getDelta(); // 获取事件数据: delta
			// 获取当前触摸点相对于按钮所在的坐标
			var locationInNode = target.convertToNodeSpace(touch.getLocation());

		},
		onTouchEnded : function(touch, event) {
			// 实现onTouchEnded事件处理回调函数
			var target = event.getCurrentTarget();

			// 获取当前触摸点相对于按钮所在的坐标
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			// console.log(locationInNode);

		}
	})

});

var SKCard = cc.Sprite.extend({
	text:"",
	textIndex:1,
	label:null,
	ctor : function(name,text) {
		this._super(name);
		this.text = text;
		this.init();
	},
	// 添加自己的属性和方法
	init : function() {
		this._super();
		var label =this.label = cc.LabelTTF.create(this.text, "Transformers_Movie", 55);
		label.setString(this.text);
		label.setAnchorPoint(cc.p(0.5, 0.5));
		label.setPosition(cc.p(50,45));
		label.setFontFillColor(cc.color(255,255,255));
		this.addChild(label, 1);
	},
	setString : function(text) {
		this.label.setString(text);
	}
});
