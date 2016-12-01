var haveRect = [];
var haveRectConter = [];
var GameScene = cc.Scene.extend({
	windowLayer : null,
	onEnter : function() {
		this._super();
		this.createScene();
	},
	createScene : function() {
		var winSize = cc.director.getWinSize();
		// create the background image and position it at the center of
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
		
		var worldMapLayerColor = new cc.LayerColor(cc.color(0, 0, 0), winSize.width, winSize.height);
		this.addChild(worldMapLayerColor, 0); 
		
		var spLayer = cc.Layer.create();
		spLayer.setPosition(centerPos);
		this.addChild(spLayer, 1); 

		var draw = new cc.DrawNode();
		spLayer.addChild(draw);
		
		var texture = cc.textureCache.addImage(res.card1);
		console.log(texture);
		var widthOne = texture.width/2
		var heightOne= texture.height/2
		var alScale = 0.2;
		for(var i = 0;i<2;i++){
			for (var j = 0; j < 2; j++) { 
				var spritePosition = cc.p((i*widthOne-widthOne*0.5)*alScale ,-(j*heightOne-heightOne*0.5)*alScale);
				var sprite = new cc.Sprite(texture, cc.rect(widthOne*i, heightOne*j,widthOne,heightOne));
				sprite.setScale(alScale);
				sprite.setPosition(spritePosition);
				spLayer.addChild(sprite);
				cc.eventManager.addListener(listener1.clone(), sprite);
				
				draw.drawDot(spritePosition, 4, cc.color(0, 255, 255, 255));
				// TODO
				haveRectConter.push(spritePosition);
				var lr = 1;
				if(i == 0){
					lr=-1;
				}
				var tb = 1;
				if(j == 0){
					tb = -1;
				}
				
				draw.drawRect(cc.p(0, 0), cc.p(-lr*widthOne*alScale, tb*heightOne*alScale),
						cc.color(0, 255, 255, 50), 2, cc.color(128, 128, 0, 255));
				
				var rect = cc.rect((i-1)*widthOne*alScale,-(j)*heightOne*alScale,widthOne*alScale,heightOne*alScale);
				// TODO
				haveRect.push(rect);
				
			}
		}
		 cc.log(haveRectConter);
		 cc.log(haveRect);
	}
});

// Make sprite1 touchable
var listener1 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();

        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) {
            target.opacity = 180;
            return true;
        }
        return false;
    },
    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        var delta = touch.getDelta();
        target.x += delta.x;
        target.y += delta.y;
    },
    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        target.setOpacity(255);
        var locationInNode = target._parent.convertToNodeSpace(touch.getLocation());
        var width =target.width*target.scale;
        var height =target.height*target.scale;
        cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
        
        var rects = [cc.rect(0,0,width,height),//
        	cc.rect(0,-height,width,height),//
        	cc.rect(-width,0,width,height),//
        	cc.rect(-width,-height,width,height)];
      
        for ( var indexRect in haveRect) {
        	var rect =  haveRect[indexRect];
        	 if (cc.rectContainsPoint(rect, locationInNode)) {
        		 cc.log(rect);
        		 target.setPosition(haveRectConter[indexRect]);
             }
		} 
    }
});


