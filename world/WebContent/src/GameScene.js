var GameScene = cc.Scene.extend({
	ctor: function() {
		this._super();
		console.log("GameScene ctor");
		this.createScene();

		if( 'keyboard' in cc.sys.capabilities ) {
	          cc.eventManager.addListener( ListenerKEYBOARD, this);
	    }
		ListenerKEYBOARD.delegate = this;
	},
	onEnter : function() {
		this._super();
		console.log("GameScene onEnter");
		audioEngine.playMusic("res/sound/bgm/naruto/naruto-选择.mp3",true);
	},
	createScene : function() {
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
		console.log("GameScene createScene");
		
		var playerLayer = new PlayerLayer();
		playerLayer.setAnchorPoint(0,0);
		playerLayer.setScale(0.4);
		playerLayer.setPosition(centerPos);
		this.playerLayer = playerLayer;
		this.addChild(playerLayer);
		
		
		
		var windowLayer = new WindowLayer();
		this.windowLayer = windowLayer;
		this.addChild(windowLayer);
		
		
		var wLayer = new cc.Layer(); 
		wLayer.setPosition(centerPos);
		this.addChild(wLayer);
		this.cwActor=wLayer;
		
// //--------------------
// var shape = new cc.DrawNode();
// shape.drawRect(cc.p(0,0),cc.p(500,500),
// cc.color(255, 25, 255, 255), 2, cc.color(0, 0, 0, 0));
// shape.setLocalZOrder(20);
// //---------------------
// var kkGlode = new cc.Sprite();
// var step1 = EffectAnim.A4Geter();
// var stepRm = cc.removeSelf(false);
// var seq = cc.sequence([step1]).repeatForever();
// kkGlode.runAction(seq);
// //--------------------
// var clippingNode = cc.ClippingNode.create();
// clippingNode.addChild(shape,101); // 设置底板
// clippingNode.setInverted( false );
// clippingNode.setAlphaThreshold(0.05);
// clippingNode.setStencil(kkGlode);
// wLayer.addChild(clippingNode);
//		 
// console.log(clippingNode);
// wLayer.clippingNodex = clippingNode;
 


		
		
		cc.eventManager.addListener(ListenerWorldMapLayer, this);

	}
});
// 创建一个事件监听器 OneByOne 为单点触摸
var ListenerWorldMapLayer = cc.EventListener.create({
	event : cc.EventListener.TOUCH_ONE_BY_ONE,
	swallowTouches : false, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
	isMoved:false,
	onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数A
		this.isMoved = false;
		var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
		// 通常是cc.Node及其子类

		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		var s = target.getContentSize();
		var rect = cc.rect(0, 0, s.width, s.height);
		// console.log(target);
		// console.log(locationInNode);
		// console.log(target.width + " " + target.height);
		console.log("~~~~~~~~~");
		for(var index in target.playerLayer.children ){
			var item = target.playerLayer.children[index];
			var locationInNode = item.convertToNodeSpace(touch.getLocation());
			
			var rect = cc.rect(0,0,item.width,item.height);
			if(cc.rectContainsPoint(rect, locationInNode)){
				item.scale = 0.4;
				var step = cc.scaleTo(0.2, item.scaleInit);
				item.runAction(step);
			}
		
		}
		return true;
	},
	onTouchMoved : function(touch, event) {
		// 实现onTouchMoved事件处理回调函数, 触摸移动时触发
		this.isMoved = true;
		// 移动当前按钮精灵的坐标位置
		var target = event.getCurrentTarget();
		var delta = touch.getDelta(); // 获取事件数据: delta
		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		
		var delta = touch.getDelta(); // 获取事件数据: delta
		target.playerLayer.x += delta.x ;
		target.playerLayer.y += delta.y ;
	},
	onTouchEnded : function(touch, event) {
		
		if(this.isMoved == true)
			return;
		// 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();

		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		// console.log(locationInNode);
		console.log("~~~222~~~~~~");
		
		for(var index in target.playerLayer.children ){
			var item = target.playerLayer.children[index];
			var locationInNode = item.convertToNodeSpace(touch.getLocation());
			console.log(item.getName());
			var rect = cc.rect(0,0,item.width,item.height);
			if(cc.rectContainsPoint(rect, locationInNode)){ 
				console.log("~~~23~~~~~~");
				if(item.getName()){
					var scene = new BattleScene2();
					var trans = new cc.TransitionProgressInOut(1,scene);
					cc.director.pushScene(scene); 
				}else{
					
					gkMap={bguri:"res/bgmap/1/bg_bridge1.png"};
					
					var scene = new BattleScene(bguri);
					var trans = new cc.TransitionProgressInOut(1,scene);
					cc.director.pushScene(scene); 
				}
				
			}
		}
	}
});


// 创建一个事件监听器 OneByOne 为单点触摸
var ListenerKEYBOARD = cc.EventListener.create({
    event: cc.EventListener.KEYBOARD,
    onKeyPressed:function(key, event) {

    	switch (key) {
    	case 'P'.charCodeAt():// J
			cc.director.pushScene(new PCardScene());
			break;
    	case 'L'.charCodeAt():// J
			cc.director.pushScene(new BattleScene());
			break;
		}
    },
    onKeyReleased:function(key, event) {
    	var gameScene = this.delegate;
    	
    	var actor = gameScene.cwActor;
    	console.log("key Released"+key+" "+String.fromCharCode(key) ); 
    	switch (key) {
    	case 'Q'.charCodeAt():
    		var kkGlode = new cc.Sprite();
		var step1 = EffectAnim.A3Geter();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);
		actor.addChild(kkGlode);
		kkGlode.runAction(seq);
			break;
    	case 'W'.charCodeAt():
    		var kkGlode = new cc.Sprite();
		var step1 = EffectAnim.A4Geter();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);
		actor.addChild(kkGlode);
		kkGlode.runAction(seq);
			break;
    	case 'E'.charCodeAt():
    		var kkGlode = new cc.Sprite();
		var step1 = EffectAnim.A5Geter();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);
		actor.addChild(kkGlode);
		kkGlode.runAction(seq);
		break;
    	case 'R'.charCodeAt():
    		var kkGlode = new cc.Sprite();
		var step1 = EffectAnim.A6Geter();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);
		actor.addChild(kkGlode);
		kkGlode.runAction(seq);
			break;
    	case 'T'.charCodeAt():
    		var kkGlode = new cc.Sprite();
		var step1 = EffectAnim.A6Geter();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);
		actor.addChild(kkGlode);
		kkGlode.runAction(seq);
		
			break;
    	case 'A'.charCodeAt():
    		var kkGlode = new cc.Sprite();
		var step1 = EffectAnim.A7Geter();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);
		actor.addChild(kkGlode);
		kkGlode.runAction(seq);
			break;
    	case 'S'.charCodeAt():
    		var kkGlode = new cc.Sprite();
		var step1 = EffectAnim.A4Geter();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);
		kkGlode.setRotation(90);
		actor.addChild(kkGlode);
		kkGlode.runAction(seq);
			break;
    	case 'D'.charCodeAt():
    		var kkGlode = new cc.Sprite();
    		var step1 = EffectAnim.A7Geter();
    		var stepRm = cc.removeSelf(false);
    		var seq = cc.sequence([step1,stepRm]);
    		actor.addChild(kkGlode);
    		kkGlode.runAction(seq);
			break;
    	case 'F'.charCodeAt():
    		var kkGlode = new cc.Sprite();
		var step1 = EffectAnim.A2();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);
		actor.addChild(kkGlode);
		kkGlode.runAction(seq);
			break;
    	case 'G'.charCodeAt():
    		var kkGlode = new cc.Sprite();
		var step1 = EffectAnim.A3();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);
		actor.addChild(kkGlode);
		kkGlode.runAction(seq);
			break;
		}
    	
    	
    }
});

var PCardScene = cc.Scene.extend({
	player:null,
	onEnter : function() {
		this._super();
		this.createScene();
		if( 'keyboard' in cc.sys.capabilities ) {
	          cc.eventManager.addListener(this.listenerWorldMapKeyLayer, this);
	    }
		this.listenerWorldMapKeyLayer.delegate = this;
	},
	
	createScene : function() {
		var winSize = cc.director.getWinSize();

		// create the background image and position it at the center of screen
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
		var worldMapLayerColor = new cc.LayerColor(cc.color(0,0, 0), winSize.width, winSize.height);
		this.addChild(worldMapLayerColor, 0);
		
		var bg = new cc.Sprite(UIs.memberMonsterStateBack);
		bg.setPosition(centerPos);
		this.addChild(bg);
		
		
		var memberMonsterStateTag1_ = new cc.Sprite(UIs.memberMonsterStateTag1_);
		memberMonsterStateTag1_.anchorX = 1;
		memberMonsterStateTag1_.anchorY = 0;
		memberMonsterStateTag1_.setPosition(bg.width/2 ,bg.height / 2-340);
		bg.addChild(memberMonsterStateTag1_);
		
		var memberMonsterStateTag2 = new cc.Sprite(UIs.memberMonsterStateTag2);
		memberMonsterStateTag2.anchorX = 0;
		memberMonsterStateTag2.anchorY = 0;
		memberMonsterStateTag2.setPosition(bg.width/2 ,bg.height / 2-340);
		bg.addChild(memberMonsterStateTag2);
		
		
		var memberMonsterStateStatusFrame = new cc.Sprite(UIs.memberMonsterStateStatusFrame);
		memberMonsterStateStatusFrame.anchorY = 1;
		memberMonsterStateStatusFrame.setPosition(bg.width / 2 ,bg.height / 2-340);
		bg.addChild(memberMonsterStateStatusFrame);
		
		var kk =  this.player = new cc.Sprite(actor.bookChara1_1);
		kk.setPosition(cc.p(bg.width / 2, bg.height / 2+100));
		bg.addChild(kk);
		
		var header = new cc.Sprite(UIs.header);
		header.anchorY = 1;
		header.setPosition(bg.width / 2,bg.height);
		bg.addChild(header);
		
		var returnButton = new cc.Sprite(UIs.returnButton);
		returnButton.anchorX = 0;
		returnButton.anchorY = 1;
		returnButton.setPosition(0,bg.height-header.height-12);
		bg.addChild(returnButton);
		
		cc.eventManager.addListener(this.lisReturnBtn, returnButton);
			
	},
	lisReturnBtn: cc.EventListener.create({
		event : cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches : true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true
								// 时吞掉事件，不再向下传递。
		onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数A
			var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
			// 通常是cc.Node及其子类

			// 获取当前触摸点相对于按钮所在的坐标
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			var s = target.getContentSize();
			var rect = cc.rect(0, 0, s.width, s.height);
			if(cc.rectContainsPoint(rect, locationInNode)){
				cc.director.popScene();
				return true;
			}
			return false;
		}
	})
	,
	// 创建一个事件监听器 OneByOne 为单点触摸
	listenerWorldMapKeyLayer :cc.EventListener.create({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed:function(key, event) {
        	   cc.log("Key onKeyPressed:" + key+" "+String.fromCharCode(key));
        	switch (key) {
			case 27:// J
				cc.director.popScene();
				break;
			}
        },
        onKeyReleased:function(key, event) {
            cc.log("Key up:" + key+" "+String.fromCharCode(key));
            console.log(this);
            console.log(this.delegate);
            if(key>=48||key<=58){
            	this.delegate.player.setTexture("res/actor/bookChara"+String.fromCharCode(key)+"_1.png");	
            }
            
        }
    })
});
var SettingScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		this.createScene();
	},
	createScene : function() {
		var winsize = cc.director.getWinSize();

		// create the background image and position it at the center of screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
		var worldMapLayerColor = new cc.LayerColor(cc.color(0, 0, 0), winsize.width, winsize.height);
		this.addChild(worldMapLayerColor, 0);
		
		if( 'keyboard' in cc.sys.capabilities ) {
	          cc.eventManager.addListener(this.listenerWorldMapKeyLayer, this);
	    }
		
		
		var gameTitle = new cc.Sprite();
		var step1 = EffectAnim.A4Geter();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);


		var clip = cc.ClippingNode.create();                      // 创建模板
		
		// clip.setInverted(true);
        clip.setStencil(gameTitle);                               // 创建标题模板
        clip.setAlphaThreshold(0);                                
        // 给模板设置透明度阈值，这里为了达到标题外没有光晕的效果，模板透明度一定要为0，否则会把所有的光晕加进来，模板就不起作用了
       
        var gameTitle1 = cc.Sprite.create(res.iconVS );
        clip.addChild(gameTitle1, 1); // 先添加标题,会完全显示出来,因为跟模板一样大小
        //
        
        var spark = cc.Sprite.create(qiangList.qiang1);
        
        clip.addChild(spark,2);   
        clip.setPosition(centerPos);
        
        this.addChild(clip);
// gameTitle.runAction(step1.repeatForever());
        
        var gameTitle2 = new cc.Sprite();
		var step1 = EffectAnim.A4Geter();
		var stepRm = cc.removeSelf(false);
		var seq = cc.sequence([step1,stepRm]);
		this.addChild(gameTitle2);
		gameTitle2.setPosition(centerPos);
		gameTitle2.runAction(step1.repeatForever());
		
	},
	// 创建一个事件监听器 OneByOne 为单点触摸
	listenerWorldMapKeyLayer :cc.EventListener.create({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed:function(key, event) {
            console.log("Key down:" + key);
			
            switch (key) {
			case 27:// J
				cc.director.popScene();
				break;
			}
        },
        onKeyReleased:function(key, event) {
            cc.log("Key up:" + key);
        }
    })
});
