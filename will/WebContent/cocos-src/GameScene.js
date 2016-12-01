var SceneInstance = {
	GameScene:undefined, 
	getGameScene : function() {
		return new GameScene();
	}
}

var GameScene = cc.Scene.extend({
	inited:false,
	onEnter : function() {
		this._super();
		console.log("GameScene onEnter ");
		if(!this.inited){
			this.inited = true;
			this.init();
		}
	},
	init : function() {
		this._super();
		console.log("GameScene init ");
		var pos = $.getJSON("FindOne_player", function(playerInfo) {

			cc.log(playerInfo);
			
			LT.player = new Player(playerInfo.respath);
			LT.player.setPosition(cc.p(0, 0));

			LT.player.setName("player");
			LT.player.setPlayerName(playerInfo.play_name);
			LT.player._id = playerInfo.id;
			LT.player._hp = playerInfo.hp;
			LT.player._mp = playerInfo.mp;
			LT.player._ms = playerInfo.ms;
			LT.player._at = playerInfo.at;
			LT.player._lv = playerInfo.lv;
			LT.player._ex = playerInfo.ex;

			LT.player._exmax = LT.player._lv * LT.player._lv * 8;


			// 玩家数据载入完成 载入 游戏页面
			pos.delegate.createScene();
		});
		pos.delegate = this;

	},
	createScene : function() {
		var winsize = cc.director.getWinSize();

		// create the background image and position it at the center of screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		// 纯黑背景
		// var worldMapLayerColor = new cc.LayerColor(cc.color(0, 0, 0), winsize.width,
		// winsize.height);
		// this.addChild(worldMapLayerColor, 0);
		// LT.worldMapLayerColor = worldMapLayerColor;
		
		// var tilesMapLayer = new TilesMapLayer();
		// tilesMapLayer.setName("tilesMapLayer");
		// this.addChild(tilesMapLayer);
		// LT.tilesMapLayer = tilesMapLayer;

		var backageLayer = new cc.Layer();
		backageLayer.setPosition(centerPos);
		this.addChild(backageLayer);
		LT.backageLayer = backageLayer;

		cc.eventManager.addListener(this.listenerWorldMapLayer, backageLayer);

		var worldMapLayer = new WorldMapLayer();
		worldMapLayer.setPosition(cc.p(0, 0));
		worldMapLayer.setName("worldMapLayer");
		backageLayer.addChild(worldMapLayer);

		var monsterLayer = new MonsterLayer();
		monsterLayer.setPosition(cc.p(0, 0));
		monsterLayer.setName("monsterLayer");
		backageLayer.addChild(monsterLayer);
		LT.monsterLayer = monsterLayer;
		
		var playerLayer = new PlayerLayer();
		playerLayer.setPosition(centerPos);
		playerLayer.setName("playerLayer");
		this.addChild(playerLayer);
		LT.playerLayer = playerLayer;

		var windowLayer = new WindowLayer();
		windowLayer.setPosition(0, 0);
		this.addChild(windowLayer, 4);
		LT.windowLayer = windowLayer;

		LT.windowLayer.labelZuobiao.setString(parseInt(0) + " " + parseInt(0));
		
		 if( 'keyboard' in cc.sys.capabilities ) {
	          cc.eventManager.addListener(this.listenerWorldMapKeyLayer, backageLayer);
	     }
	
	},
	// 创建一个事件监听器 OneByOne 为单点触摸
	listenerWorldMapLayer : cc.EventListener.create({
		event : cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches : false, // 设置是否吞没事件，在 onTouchBegan 方法返回 true
		// 时吞掉事件，不再向下传递。
		onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数
			var target = event.getCurrentTarget(); // 获取事件所绑定的 target,
			// 通常是cc.Node及其子类

			// 获取当前触摸点相对于按钮所在的坐标
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			var s = target.getContentSize();
			var rect = cc.rect(0, 0, s.width, s.height);
			
			LT.player.attackAction();// 攻击特效
			
			return true;
		},
		onTouchMoved : function(touch, event) {
			// 实现onTouchMoved事件处理回调函数, 触摸移动时触发

			// 移动当前按钮精灵的坐标位置
			var target = event.getCurrentTarget();
			var delta = touch.getDelta(); // 获取事件数据: delta
			target.x += delta.x * LT.player._ms
			target.y += delta.y * LT.player._ms;

			var ponv = target.getChildByName("monsterLayer").getChildByName("player");
			ponv.x -= delta.x * LT.player._ms;
			ponv.y -= delta.y * LT.player._ms;

			LT.windowLayer.labelZuobiao.setString(parseInt(ponv.x) + " " + parseInt(ponv.y));

			if (delta.x != 0) {
				if (delta.x > 0) {
					LT.player.setScaleX(1);
					LT.player.labelName.setScaleX(1);
				} else {
					LT.player.setScaleX(-1);
					LT.player.labelName.setScaleX(-1);
				}
			}
			 
			if(map){
				var mapPoint = map.getCenter();
				var mapPixel = map.pointToPixel(mapPoint);
				mapPixel.x -= delta.x * LT.player._ms;
				mapPixel.y += delta.y * LT.player._ms;
				mapPoint = map.pixelToPoint(mapPixel);			
				map.setCenter(mapPoint);
			}
			
			// LT.tilesMapLayer.updateTiles();

		},
		onTouchEnded : function(touch, event) {
			// 实现onTouchEnded事件处理回调函数
			var target = event.getCurrentTarget();
			
		}
	}),
	// 创建一个事件监听器 OneByOne 为单点触摸
	listenerWorldMapKeyLayer :cc.EventListener.create({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed:function(key, event) {
            console.log("Key down:" + key);
            // 65 a
            // 68 d
            // 87 w
            // 83 s
			var target = event.getCurrentTarget();
			var ponv = target.getChildByName("monsterLayer").getChildByName("player");
			
			var movstep = 3;
			
            switch (key) {
            case 65:
				// a
            	target.x += movstep * LT.player._ms
            	ponv.x -= movstep * LT.player._ms;
				break;
			case 68:
				// d
				target.x -= movstep * LT.player._ms
				ponv.x += movstep * LT.player._ms;
				break;
			case 87:
				// w
				target.y -= movstep * LT.player._ms;
				ponv.y += movstep * LT.player._ms;
				break;
			case 83:
				// s
				target.y += movstep * LT.player._ms;
				ponv.y -= movstep * LT.player._ms;
				break;
			case 99:
				var shanghai_px = map.pointToPixel(new BMap.Point( 121.830053,31,148645));
				console.log(shanghai_px);
				break;
			case 74:// J
				cc.director.pushScene(new SettingScene());
				break;
			}
        },
        onKeyReleased:function(key, event) {
            cc.log("Key up:" + key);
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
		
		var backageLayer = new cc.Layer();
		backageLayer.setPosition(centerPos);
		this.addChild(backageLayer);
		
		var fontDef = new cc.FontDefinition();
		fontDef.fontName = "cn_xs_minijianyingbi";
		fontDef.fontSize = "32";
		
		
		var array2zi = ["阴","阳"];
		var array3zi = ["天","地","人"];
		var array4zi = ["玄武","青龙","朱雀","白虎"];
		var array5zi = ["金","木","水","火","土"];
		var array6zi = ["人道 ","天道","修罗 ","畜生","饿鬼","地狱"];
		var array7zi = ["天枢","天璇","天玑","天权","玉衡","开阳","瑶光"];
		var array8zi = ["乾","兑","离","震","巽","坎","艮","坤"];
		var array9zi = ["临","兵","斗","者","皆","阵","列","前","行"];
		var array10zi = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
		var array12zi = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

		var minglun =[array2zi,array3zi,//
			array4zi,array5zi,array6zi,array7zi,//
			array8zi,array9zi,array10zi,array12zi];
		
		
		var aDrawNode = new cc.DrawNode();
		backageLayer.addChild(aDrawNode);
		
		for ( var index in minglun) {
			var Rin = index*45;
			aDrawNode.drawCircle(cc.p(0,0), Rin, 0, 80, false, 3, cc.color(255, 255, 255, 123));
	        
			var well = new cc.Sprite();
			backageLayer.addChild(well);
			
			var ziArray = minglun[index];
			var angleOne=360/ziArray.length;
			
			
			var actionBy = new cc.RotateBy(index*index*3, 360);
			var rep = new cc.RepeatForever(actionBy);
			well.runAction(rep);
			
			for ( var ziArrayIndex in ziArray) {
				
				var zi = ziArray[ziArrayIndex];
				
				var ziNode = new cc.Node();  
				
				
				var myLabel = new cc.LabelTTF(zi,  fontDef);
				var myLabelBg = new cc.LabelTTF(zi,  fontDef);
				ziNode.addChild(myLabel);
				ziNode.addChild(myLabelBg);
//				var aDrawNodeq = new cc.DrawNode();
//				aDrawNodeq.drawCircle(cc.p(0,0), 30, 0, 80, false, 3, cc.color(255, 255, 255, 123));
//				ziNode.addChild(aDrawNodeq);
				
				
				
				var actionTo = cc.scaleTo(0.3, 1.5);
				var actionSequence = cc.sequence(
						cc.delayTime(0.3*Math.random()*100),
						cc.sequence(actionTo,
						cc.delayTime(0.3*Math.random()*10),
						cc.scaleTo(0.1,1)).repeatForever()
						);

				
				var rep = new cc.RepeatForever(actionSequence);
				myLabelBg.runAction(actionSequence);
				
				if(ziArrayIndex == 0){
					myLabelBg.runAction(actionSequence.repeatForever());
				}
				
				var ziAngle = angleOne*ziArrayIndex;
				
				var x = Math.sin(ziAngle*cc.PI/180)*Rin;
				var y = Math.cos(ziAngle*cc.PI/180)*Rin;
				var ziPoint = cc.p(x,y); 

				ziNode.setPosition(ziPoint);
				
				well.addChild(ziNode);
				
				var rep = new cc.RepeatForever(actionBy.reverse());
				ziNode.runAction(rep);
				
			}
			
		}

		
		
		
	},
	// 创建一个事件监听器 OneByOne 为单点触摸
	listenerWorldMapKeyLayer :cc.EventListener.create({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed:function(key, event) {
            console.log("Key down:" + key);
			
            switch (key) {
			case 74:// J
				cc.director.popScene();
				break;
			}
        },
        onKeyReleased:function(key, event) {
            cc.log("Key up:" + key);
        }
    })
});
