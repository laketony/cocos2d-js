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
		var size = winSize = cc.director.getWinSize();
		// create the background image and position it at the center of
		// screen
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

		var worldMapLayerColor = new cc.LayerColor(cc.color(129,129,129), winSize.width, winSize.height);
		this.addChild(worldMapLayerColor, 0);

		var clip = cc.ClippingNode.create();                      // 创建模板
		
		
        var gameTitle = cc.Sprite.create(res.iconVS); //蒙板
        
        var actionBy = cc.rotateBy(2, 360); 
        var repeatAction = cc.RepeatForever.create(actionBy);
        //gameTitle.runAction(repeatAction); 
        
        clip.setStencil(gameTitle);                               // 创建标题模板
        clip.setAlphaThreshold(0);                                // 给模板设置透明度阈值，这里为了达到标题外没有光晕的效果，模板透明度一定要为0，否则会把所有的光晕加进来，模板就不起作用了
       
        var gameTitle1 = cc.Sprite.create(res.iconVS );
        clip.addChild(gameTitle1, 1); // 先添加标题,会完全显示出来,因为跟模板一样大小
        //
        
        var spark = cc.Sprite.create(res.hello);
        spark.setPosition(-size.width,0);
        clip.addChild(spark,2);                                  // 闪亮图片，会被裁减

        var moveAction = cc.MoveBy.create(3.6, cc.p(size.width*2, 0));    // 闪亮图片做的动作
        var seq = cc.Sequence.create(moveAction, moveAction.reverse());
        var repeatAction = cc.RepeatForever.create(seq);
        spark.runAction(repeatAction);                           // 进行左右移动的重复动作
        
        clip.setPosition(cc.p(size.width / 2, 0+100));  // clippingNode添加到layer上
        this.addChild(clip,4);
        
        

        var shape = new cc.DrawNode();
        shape.drawRect(cc.p(-200, -100), cc.p(200, 100), null, 2, cc.color(255, 0, 255, 255));

  
        var clipper = new cc.ClippingNode();
        clipper.setPosition(cc.pAdd(centerPos,cc.p(0,100)));
        clipper.stencil = shape;  // 把刚刚创建的圆形模板放入
        this.addChild(clipper);

  
        
        var col1 = new cc.Node();
       
        var col2 = new cc.Node();
        var col3 = new cc.Node();
        
        var cols = [col1,col2,col3];
        for(var colindex in cols){
        	var col = cols[colindex]; 
        	col.x = 100*colindex-100;
        	for(var i =0;i<30;i++){
        		var car1  = new cc.Sprite(carlist[i%5]);
        		car1.scale = 0.2;
        		car1.y = (i-5)*60;

        		var fontDef = new cc.FontDefinition();
        		fontDef.fontName = "Arial";
        		fontDef.fontSize = "32";
        		var myLabel = new cc.LabelTTF('i:'+i,  fontDef);
        		
        		car1.addChild(myLabel);
        		
        		col.addChild(car1);
        	}
        	
        	clipper.addChild(col);
        	
            var moveAction = cc.MoveBy.create(0.4*(colindex+5), cc.p(0,-60*15));   
            var moveActionZreo = cc.place(col.x, -60*5);
            var seq = cc.Sequence.create(moveAction,moveActionZreo);
            var repeatAction = cc.RepeatForever.create(seq);

        	col.runAction(repeatAction); 
        	  
        }
        // 
        
        var clip = cc.ClippingNode.create();                      // 创建模板
		
		
        var gameTitle = cc.Sprite.create(res.iconVS); //蒙板
        
        var actionBy = cc.rotateBy(2, 360); 
        var repeatAction = cc.RepeatForever.create(actionBy);
        //gameTitle.runAction(repeatAction); 
        
        clip.setStencil(gameTitle);                               // 创建标题模板
        clip.setAlphaThreshold(0);                                // 给模板设置透明度阈值，这里为了达到标题外没有光晕的效果，模板透明度一定要为0，否则会把所有的光晕加进来，模板就不起作用了
       
        var gameTitle1 = cc.Sprite.create(res.iconVS );
        clip.addChild(gameTitle1, 1); // 先添加标题,会完全显示出来,因为跟模板一样大小
        
        var color = cc.color(255,255, 255, 255);
       
        var shape2 = new cc.DrawNode();
        shape2.drawRect(cc.p(-200, -100), cc.p(200, 100), null, 2, color);
        shape2.drawCircle(cc.p(-200, -100), 40, 360, 50, false, 2, color);
        shape2.drawCircle(cc.p(200, 100), 40, 360, 50, false, 2, color);
        shape2.drawCircle(cc.p(-200, 100), 40, 360, 50, false, 2, color);
        shape2.drawCircle(cc.p(200, -100), 40, 360, 50, false, 2, color); 
        
//        this.addChild(shape2);
        
        
        var clip2 = cc.ClippingNode.create();                      // 创建模板
        clip2.setPosition(cc.pAdd(centerPos,cc.p(0,100)));
        clip2.setStencil(shape2);                               // 创建标题模板
        
        var spark2 = cc.Sprite.create(res.hello); 
        clip2.addChild(spark2,2);                                  // 闪亮图片，会被裁减
        this.addChild(clip2);
        
        cc.eventManager.addListener(this.listenerWorldMapLayer, clip2);

        
	},
	// 创建一个事件监听器 OneByOne 为单点触摸
	listenerWorldMapLayer : cc.EventListener.create({
		event : cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches : false, // 设置是否吞没事件，在 onTouchBegan 方法返回 true
		// 时吞掉事件，不再向下传递。
		onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数

			return true;
		},
		onTouchMoved : function(touch, event) {
			// 实现onTouchMoved事件处理回调函数, 触摸移动时触发

			// 移动当前按钮精灵的坐标位置
			var target = event.getCurrentTarget();
			var delta = touch.getDelta(); // 获取事件数据: delta
			target.x += delta.x ;
			target.y += delta.y;


		},
		onTouchEnded : function(touch, event) {
			// 实现onTouchEnded事件处理回调函数
			var target = event.getCurrentTarget();
			
		}
	})
});
