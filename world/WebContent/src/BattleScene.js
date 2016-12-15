var audioEngine=cc.audioEngine;
//var audioEngine = {
//		playMusic:function() {},
//		playEffect:function() {}
//};
var BattleScene = cc.Scene.extend({
	
	monsters:[],
	ctor: function() {
		this._super();
		this.createScene();
		audioEngine.playMusic("res/sound/bgm/战斗00.mp3",true);
	},
	onEnter : function() {
		this._super();
	},
	createScene : function() {
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

		// 底图
		var bgSprite  = new cc.Sprite("res/UI1/map_04.png");
		bgSprite.setPosition(centerPos);
		this.addChild(bgSprite);

		

		
		for (var i = -1.5; i <= 1; i++) {
			for (var j = 2; j >0; j--) {
				// 怪物区
				var bgSprite1  = new MonsterSprite(actor.mChara1,10);
				bgSprite1.setPosition(centerPos.x+140*i+70,centerPos.y+100+130*j);
				bgSprite1.setScale(0.4);
				this.addChild(bgSprite1);
				this.monsters.push(bgSprite1);
				
			}
		}
		
	   
		// 最前窗口
		var skillLayer  = new cc.Layer();
		skillLayer.centerPos = centerPos;
		this.addChild(skillLayer);
		this.skillLayer = skillLayer;
		
		var player= new cc.Sprite(actor.bookChara1_1);
		player.setAnchorPoint(0.5,0);
		player.setPosition(centerPos.x,0);
		player.HP = 2650;
		this.addChild(player);
		
		
		 
		for(var index in this.monsters){
			var monsters = this.monsters[index];
			monsters.startActiuon(player);
			
		}

//		var monsters = this.monsters[0];
//		monsters.startActiuon(player);
 
		
		// 战斗面板
		var combatLayer  = new cc.Layer();
		combatLayer.setPosition(0,0);
		this.addChild(combatLayer);
		

		 // 半黑背景
		 var combatLayerColor = new cc.LayerColor(cc.color(0, 0, 0,128), winSize.width,
				 280);
		 combatLayer.addChild(combatLayerColor, 0);
		 
		// 出招面板
		var labelHP  = cc.LabelTTF.create("HP:"+player.HP, "fontZi", 35); 
		labelHP.setAnchorPoint(cc.p(0.0, 0.0));
		labelHP.setPosition(cc.p(20,10));
		labelHP.setFontFillColor(cc.color(255,255,255)); 
		combatLayer.addChild(labelHP);
 
		player.labelHP = labelHP; 
		player.divHP=function(divValue){
			
			var lues = divValue;
			var labelAttr = initLabelAtlas2(lues);
			labelAttr.setPosition(this.width/2, this.height);
			this.addChild(labelAttr);
			
			var showMove = cc.moveBy(cc.random0To1()+0.5, cc.p(cc.randomMinus1To1() * 100, 35 * 4));
			var showRemove = cc.removeSelf(true);
			var shows = cc.sequence(showMove, showRemove);
			labelAttr.runAction(shows);
			
			
			this.HP-=divValue;
			var actionBy = cc.moveBy(0.1, cc.p(0, -3));
			var actionByBack = actionBy.reverse(); 
			this.runAction(cc.sequence(actionBy, actionByBack));
			
			if(this.HP<=0){
				this.parent.warOver(false);
			}
			this.labelHP.setString("HP:"+this.HP); 
		}
		 // ------------战斗条--------------
		 var combatBox  = new cc.Layer();
		combatBox.setPosition(55,240);
		this.addChild(combatBox);
		
		
		var combatOverX = winSize.width*0.8;
		
		var combatStop  = new cc.Sprite(UIs1.CaseSelect_FrameX100);
		combatStop.setPosition(combatOverX,0);
		combatBox.addChild(combatStop);
		
		var combatSpp  = new cc.Sprite(UIs.attrLight);
		combatBox.addChild(combatSpp);
		

		var attackinterval = 3.5
		var combatMove = cc.moveBy(attackinterval, cc.p(combatOverX, 0)); 
		var attarCallFunc = cc.callFunc(this.acaii, this);
	    var action1 = cc.sequence(cc.place(cc.p(0,0)), combatMove,attarCallFunc).repeatForever() ;
		combatSpp.runAction(action1);
		
		combatSpp.player = player;
		combatSpp.scene = this;
		// ----------战斗条------
		
		// ------选字板-----
		var sktillBox = new cc.Node();
		sktillBox.setPosition(centerPos.x,65); 
		
		combatSpp.skCardArray = [];
		for (var index = -1.5; index < 1.6; index++) {
			var sk_card  = new SKCard("","空");
			sk_card.changeZi();
			sk_card.setPosition(130*index,50);
			sktillBox.addChild(sk_card);
			combatSpp.skCardArray.push(sk_card);
		}
		
		combatLayer.addChild(sktillBox);
		// --------选字板---
		// ------字板-----
		
		var sktillZiBox = new cc.Node();
		sktillZiBox.setPosition(55,160); 
		combatLayer.addChild(sktillZiBox);
		
		 // 纯黑背景
		 var combatLayerColor2 = new cc.LayerColor(cc.color(0, 0, 0,188), winSize.width,42);
		 combatLayerColor2.setPosition(-55,0); 
		 sktillZiBox.addChild(combatLayerColor2, 0); 
		// 出招面板
		var label  = cc.LabelTTF.create(this.text, "fontZi", 35);
		label.setString("空");
		label.setAnchorPoint(cc.p(1.0, 0.0));
		label.setPosition(cc.p(winSize.width -35*4,3));
		label.setFontFillColor(cc.color(255,255,255));
		label.baiziArray = [];
		sktillZiBox.addChild(label);
		combatSpp.ziLabel=label;
		
		var labelDraw =new cc.DrawNode();
		label.labelDraw=labelDraw;
		label.addChild(labelDraw);
		// 出招面板
		

		
		cc.eventManager.addListener(this.listenerScene, this);

	},
	acaii : function(tager) {
		
		// --------
		console.log("acaii HP: "+tager.player.HP);
		if(tager.player.HP<=0){
			tager.scene.warOver(false);
		}
		
		//
		
		var addZinum = 0;
		for ( var sk_card_index in tager.skCardArray) {
			var sk_card = tager.skCardArray[sk_card_index];
			if(sk_card.isSeleced){
				var zi = sk_card.changeZi();
				tager.ziLabel.setString(tager.ziLabel.string+zi);
				addZinum++;
			}
			sk_card.normal()
		}
		if(addZinum==0){
			var zi = "空";
			tager.ziLabel.setString(tager.ziLabel.string+zi);
		}
		
	
		ziLength = tager.ziLabel.string.length;
		
		
		canUse = cc.rand()%100;
		var labelDraw = tager.ziLabel.labelDraw;
		
		// ----超长归组----
		if(ziLength>100){
			var nZi = tager.ziLabel.string.substring(80);
			tager.ziLabel.baiziArray.push(tager.ziLabel.string.substr(0,80));
			tager.ziLabel.setString(nZi);
			ziLength = tager.ziLabel.string.length;
			labelDraw.clear();
		}
		
		// ----

		
		var panding = tager.ziLabel.string.substring(ziLength-9);
		if(ziLength<=9){
			panding =  tager.ziLabel.string;
		}
		var skillBean = skillMatching(panding);
		
		var lineWidth = 3;
		var lineColor = LT.RunColor();
		labelDraw.drawDot(cc.p(35*ziLength,15),4, lineColor); 
		if(skillBean){
			console.log(skillBean);
			var ziNum = skillBean.SkillZiNum;
			
			if(ziNum>=5){
				labelDraw.drawRect(cc.p(35*ziLength,-2), cc.p(35*(ziLength-ziNum),37), null, lineWidth, lineColor);
			}else {
				console.log(ziLength-ziNum +" " +ziLength);
				labelDraw.drawSegment(cc.p(35*(ziLength-ziNum),0), cc.p(35*(ziLength),0), lineWidth, lineColor);
			}
			
			// labelDraw.x = labelDraw.x - 35*addZinum;
			
			 var winSize = cc.director.getWinSize();
			 var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
			 var lues = skillBean.name;
			 var label1 =  cc.LabelTTF.create(lues, "fontZi", 55);
			 label1.setPosition( tager.player.width/2,tager.player.height-24);
			 tager.player.addChild(label1);
			 
			 var showMove = cc.moveBy(3.5, cc.p(cc.randomMinus1To1() * 100, -35*4)); 
			 var showRemove = cc.removeSelf(true); 
			 var shows = cc.sequence(showMove,showRemove);
			 label1.runAction(shows); 
			 if(skillBean.Sound){
				 audioEngine.playEffect(skillBean.Sound); 
			 }
		}
		
		
		
		var allorone = Math.floor(cc.random0To1()*100);
//		console.log(allorone);
		if(allorone>90){ 
			for(var index in tager.scene.monsters){
				var monsters = tager.scene.monsters[index];
				if(skillBean){
					monsters.hurtFunc(350);
				}else{
					monsters.hurtFunc(150);
				}
			}
			
			var skillLayer = tager.scene.skillLayer;
						
			//动画效果
			var kkGlode = new cc.Sprite(EffectUNLoad.wing); 
			kkGlode.setPosition(skillLayer.centerPos.x,250 );
			kkGlode.scale = 0.4;
			var step1 = cc.scaleTo(0.2, 6);
			var step2 =cc.delayTime(0.5);
			var stepRm = cc.removeSelf(false);
			var seq = cc.sequence([step1,step2,stepRm]); 
			kkGlode.runAction(seq);
			skillLayer.addChild(kkGlode); 

			//音效
			audioEngine.playEffect("res/sound/HP08.ogg");  
			
			//实际作用
			tager.player.HP+=100;
			
		}else if(allorone>70){
			var monsters = tager.scene.monsters[0];

			var attarHurtFunc = cc.callFunc(monsters.hurtFunc,monsters, 50);
			
			var kkGlode = new cc.Sprite(EffectMap.darkboom01); 
			kkGlode.setPosition(monsters.width/2,monsters.height/2 );
			kkGlode.scale = 1.5;
			var step1 = cc.scaleTo(0.2, 0.4);
			var step2 =cc.delayTime(0.5);
			var stepRm = cc.removeSelf(false);
			var seq = cc.sequence([step1,attarHurtFunc,step2,stepRm]); 
			kkGlode.runAction(seq);
			monsters.addChild(kkGlode);
			//音效
			audioEngine.playEffect("res/sound/Attr01.ogg");  
		}else{
			for(var index in tager.scene.monsters){
				var monsters = tager.scene.monsters[index];
			}
			var monsters = tager.scene.monsters[0];
			var skillLayer = tager.scene.skillLayer;
				
			//动画效果
			var kkGlode = new cc.Sprite("res/eff/data.dat_000079.png"); 
			kkGlode.setPosition(cc.p(monsters.width/2,monsters.height+150)); 
			var step1 = cc.moveTo(0.2, cc.p(monsters.width/2,monsters.height/2)); 
			var attarHurtFunc = cc.callFunc(monsters.hurtFunc,monsters, 50);
			var step2 =cc.delayTime(0.5);
			var stepRm = cc.removeSelf(false);
			var seq = cc.sequence([step1,attarHurtFunc,step2,stepRm]); 
			kkGlode.runAction(seq);
			monsters.addChild(kkGlode); 

			//音效
			audioEngine.playEffect("res/sound/HP08.ogg");  
			
		}
		
		
		
	},
	warOver : function(isWin) {
		console.log(isWin?"win":"lose");
		cc.director.popScene();
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
	isSeleced:false,
	borderSprite:null,
	cardNN : ["临","兵","斗","者","皆","阵","列","前","行"],
	ctor : function(name,text) {
		this._super(UIs1.HostileBG);
		this.text = text;
		this.init(UIs1.HostileBG);
	},
	// 添加自己的属性和方法
	init : function(texture) {
		this._super(texture);
		
		var selfCenter = cc.p(this.width/2,this.height/2);
		
		var borderSprite  = this.borderSprite =  new cc.Sprite(UIs1.Hostile);
		borderSprite.setPosition(selfCenter);
		this.addChild(borderSprite);
		
		var label =this.label = cc.LabelTTF.create(this.text, "fontZi", 55);
		label.setString(this.text);
		label.setAnchorPoint(cc.p(0.5, 0.5));
		label.setPosition(selfCenter);
		label.setFontFillColor(cc.color(255,255,255));
		this.addChild(label, 1);
		
		cc.eventManager.addListener(ListenerSKCard.clone(), this);
	},
	setString : function(itext) {
		this.text = itext
		this.label.setString(itext);
	},
	changeZi : function(text) {
		var oldZi = this.cardNN[this.textIndex];
		this.textIndex =Math.floor( cc.rand()%this.cardNN.length);
		var textZi = this.cardNN[this.textIndex];
		while(!textZi){
			this.textIndex =Math.floor( cc.rand()%this.cardNN.length);
			var textZi = this.cardNN[this.textIndex];
			console.log(Math.floor( cc.rand()%this.cardNN.length));
		}
		this.setString(textZi);
		return oldZi;
	},
	initZi : function(text) {
		 this.changeZi();
	},
	select: function() {
		this.isSeleced=true;
		this.borderSprite.setTexture(UIs1.HostileSelect);//HostileSelect
		this.borderSprite.runAction(this.borderAction());
	},
	normal: function() {
		this.isSeleced=false;
		this.borderSprite.setTexture(UIs1.Hostile);
		this.borderSprite.rotation = 0;
		this.borderSprite.stopActionByTag("0xbb");
	},
	borderAction: function() {
		
		var actionBy = cc.rotateBy(1.2, 360);
		var reAction = actionBy.repeatForever();
		reAction.setTag("0xbb");
		console.log(reAction);
		return reAction;

	},
	changeSelect(){
		this.isSeleced=!this.isSeleced;
		if(this.isSeleced){
			this.select();
		}else{
			this.normal();
		}
	}
});


var ListenerSKCard = cc.EventListener.create({
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

		if(cc.rectContainsPoint(rect, locationInNode)){
			target.changeSelect();
			console.log(target.text);
			return true ;
		}
		return false;
	}
})

function initLabelAtlas(numberString) {
	var label1 =  new cc.LabelAtlas(numberString,
			UIs.imageNumberMemberEditType4, 267/10, 33, '0'); 
	label1.setAnchorPoint(0.5, 0.5);
	return label1;
}
function initLabelAtlas2(numberString) {
	var label1 =  new cc.LabelAtlas(numberString,
			UIs.imageNumberEnemyTurnRed, 388/10, 49, '0'); 
	label1.setAnchorPoint(0.5, 0.5);
	return label1;
}
// ["临","兵","斗","者","皆","阵","列","前","行"]
var jinengliebiao = {
"兵前行":{name:"淘汰之刃",SkillZiNum:3,Sound:""},//
"皆行":{name:"血之狂暴",SkillZiNum:2,Sound:""},//
"临阵行者":{name:"剑舞",SkillZiNum:3,Sound:""},//
"列阵斗":{name:"剑圣风暴",SkillZiNum:3,Sound:""},//
"列阵斗斗斗":{name:"无敌斩",SkillZiNum:5,Sound:""},//
"阵":{name:"龙破斩",SkillZiNum:1,Sound:""},//
"列兵前行":{name:"殊死一搏",SkillZiNum:3,Sound:""},//
"斗":{name:"重击",SkillZiNum:3,Sound:""},//
"阵兵":{name:"巨力挥舞",SkillZiNum:3,Sound:"res/sound/SNK_ATK.mp3"},//
"临兵斗者皆阵列前行":{name:"胜",SkillZiNum:9}
}


function skillMatching(numberString){
// console.log("9尾字 "+numberString)
	
	var relaunch_Skills = null;
	var ziLong = numberString.length
	for(var i = 1;i<=ziLong;i++){
		var skillKey = numberString.substring(ziLong-i);
// console.log("技能招式 "+skillKey)
		var launch_Skills = jinengliebiao[skillKey];
		if(launch_Skills){ 
			launch_Skills.SkillZiNum = skillKey.length;
			relaunch_Skills = launch_Skills;
		}
	}
	
// console.log("技能 "+relaunch_Skills)
	return relaunch_Skills;
	
}
// 临,
// 兵,
// 斗,
// 者,
// 皆,
// 阵,
// 列,
// 前,
// 行,

