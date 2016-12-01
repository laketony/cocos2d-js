var index = 1;
var cardFaces = [res.car3, res.car3, res.car3, res.car3 ];
var GameScene = cc.Scene.extend({
	cards:[],
	btn_start:null,
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

		
		for(var i = 0;i<3;i++){
			for(var index in cardFaces){
				
				if(i==1&&(index==1||index==2)){
					continue;
				}
				
				var cardface = cardFaces[index];
				// 核心身体
				var mineBody = new cc.Sprite(cardface); 
				mineBody.setPosition((-250+160*index),-320+320*i);
				mineBody.delegate = this;
				
				if(index==3&&i==1)
				{
					mineBody.setTexture(res.cardcc);
				}
				
				backageLayer.addChild(mineBody);
				this.cards.push(mineBody);
				
			}
		}
		
		this.btn_start = new cc.Sprite(res.btn_start);  
		backageLayer.addChild(this.btn_start);
		this.btn_start.delegate = this;
		cc.eventManager.addListener(listenerStart, this.btn_start);
		
		// cc.eventManager.addListener(listenercard.clone(), mineBody);
		 
		var fontDef = new cc.FontDefinition();
		fontDef.fontName = "Arial";
		fontDef.fontSize = "32";
		var myLabel = new cc.LabelTTF('5次机会中了我就给你个iphone7',  fontDef);
		myLabel.setPosition(cc.p(winSize.width / 2, winSize.height-25));
		this.addChild(myLabel);

	},
	animSet: function() { 
		for(var index in this.cards){
			var target = this.cards[index];
			target.setTexture(res.cardNone);
			var anim = this.animCredit(target);
			target.runAction(anim);
			
		}

	},
	animCredit: function(target) {
		var pZero = cc.p(0,0);
		var pFrom = target.getPosition();
		var pTo = cc.pSub(pZero,pFrom);
		console.log(pTo);
		
		var actionMoveBy = cc.moveBy(1, pTo); 
		var actionRv = actionMoveBy.reverse(); 
				
		var actionRBy = cc.rotateBy(2, 360*5);
		
		 var step1 = cc.spawn(
				 cc.sequence(actionMoveBy,actionRv),
				 actionRBy );
		
		var actionCall = cc.callFunc(this.bindClick, this)  
		var over=cc.sequence(step1,actionCall );
		return over;
	},
	bindClick(target){
		cc.eventManager.addListener(listenercard.clone(), target);
	},
	opencard: function(target) { 
		
		for(var index in this.cards){
			var other =  this.cards[index];

			if(target.__instanceId != other.__instanceId){
				other.setTexture(cardFaces[1]);
			}
		}
		target.setTexture(res.cardcc);
		cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
		cc.eventManager.addListener(listenerStart, this.btn_start);
	}
});
// 创建一个事件监听器 OneByOne 为单点触摸
var listenercard = cc.EventListener.create({
	event : cc.EventListener.TOUCH_ONE_BY_ONE,
	swallowTouches : true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
	onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();

        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) {
            return true;
        }
        return false;
    },
	onTouchEnded : function(touch, event) {
		// 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();
		target.delegate.opencard(target);
	}
});
// 创建一个事件监听器 OneByOne 为单点触摸
var listenerStart = cc.EventListener.create({
	event : cc.EventListener.TOUCH_ONE_BY_ONE,
	swallowTouches : true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
	onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();

        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) {
            return true;
        }
        return false;
    },
	onTouchEnded : function(touch, event) {
		// 实现onTouchEnded事件处理回调函数
		var target = event.getCurrentTarget();

		// 获取当前触摸点相对于按钮所在的坐标
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		target.delegate.animSet();
	}
});