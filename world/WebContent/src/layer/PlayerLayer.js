var PlayerLayer = cc.Layer.extend({
	myRoomChara : null,
	ctor : function() {
		this._super();
		this.init();
	},

	init : function() {
		this._super();

		var kk = this.cwActor = new Actor(actor.bookChara1_1);
		kk.setPosition(0, 0);
		this.addChild(kk);

		var fontDef = new cc.FontDefinition();
		fontDef.fontName = "fontZi";
		fontDef.fontSize = "32";

		var actionBy = cc.moveBy(1, cc.p(0, 80));
		var actionByBack = actionBy.reverse();
		var fudong = cc.sequence(actionBy, actionByBack).repeatForever();

		var rr = 1500;

		// 底图
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage12);// 关卡图标
		war_bingdao.setPosition(0, rr);// 关卡位置
		war_bingdao.setScale(2.5);// 关卡缩放
		war_bingdao.scaleInit = 2.5;// 关卡默认缩放
		this.addChild(war_bingdao);// 添加关卡
		war_bingdao.runAction(fudong);// 关卡动画
		var myLabel = new cc.LabelTTF('冰川', fontDef);// 关卡名
		myLabel.setAnchorPoint(0.5, 1);// 关卡名
		myLabel.setPosition(war_bingdao.width / 2, 0);// 关卡名
		war_bingdao.addChild(myLabel);// 添加关卡名牌

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage1);
		war_bingdao.setPosition(rr * 0.5, rr * 0.866);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('灌丛', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage2);
		war_bingdao.setPosition(rr * 0.866, rr * 0.5);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('炎地', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage3);
		war_bingdao.setPosition(rr, 0);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('古塔', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage4);
		war_bingdao.setPosition(rr * 0.866, -rr * 0.5);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('沙野', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage5);
		war_bingdao.setPosition(rr * 0.5, -rr * 0.866);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('墓穴', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage6);
		war_bingdao.setPosition(0, -rr);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('冰台', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage7);
		war_bingdao.setPosition(-rr * 0.5, -rr * 0.866);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('魔域', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage8);
		war_bingdao.setPosition(-rr * 0.866, -rr * 0.5);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('天坛', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage9);
		war_bingdao.setPosition(-rr, 0);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('孤林', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage10);
		war_bingdao.setPosition(-rr * 0.866, rr * 0.5);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('神域', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage11);
		war_bingdao.setPosition(-rr * 0.5, rr * 0.866);
		war_bingdao.setScale(2.5);
		war_bingdao.scaleInit = 2.5;
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('鬼林', fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		war_bingdao.addChild(myLabel);


		for(var index in this.doorArray){
			var doorBean =  this.doorArray[index];
			this.putDoor(doorBean, fontDef);
		}
		

	},
	putDoor : function(doorBean, fontDef) {

		var door =new  DoorBase(doorBean);
		door.setPosition(doorBean.x, doorBean.y);
		door.setScale(doorBean.scale);
		door.scaleInit = doorBean.scale;
		door.setName(doorBean.name);
		
		this.addChild(door);
	},
	putGuanka : function(gkBeak) {
		
		var fontDef = new cc.FontDefinition();
		fontDef.fontName = "fontZi";
		fontDef.fontSize = "32";

		var actionBy = cc.moveBy(1, cc.p(0, 80));
		var actionByBack = actionBy.reverse();
		var fudong = cc.sequence(actionBy, actionByBack).repeatForever();
		
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage12);// 关卡图标
		war_bingdao.setPosition(0, rr);// 关卡位置
		war_bingdao.setScale(2.5);// 关卡缩放
		war_bingdao.scaleInit = 2.5;// 关卡默认缩放
		this.addChild(war_bingdao);// 添加关卡
		war_bingdao.runAction(fudong);// 关卡动画
		var myLabel = new cc.LabelTTF('冰川', fontDef);// 关卡名
		myLabel.setAnchorPoint(0.5, 1);// 关卡名
		myLabel.setPosition(war_bingdao.width / 2, 0);// 关卡名
		war_bingdao.addChild(myLabel);// 添加关卡名牌
		 
	},
	doorArray : [ {
		texture : UIs3.StageWeapon,
		x : -1550,
		y : 1550,
		scale : 2.5,
		name : "天剑天"
	}, {
		texture : UIs3.StageArmor,
		x : 1550,
		y : 1550,
		scale : 2.5,
		name : "冰狮王"
	}, {
		texture : UIs3.StageSummon,
		x : 1550,
		y : -1550,
		scale : 2.5,
		name : "风龙穴"
	}, {
		texture : UIs3.StageVehicle,
		x : -1550,
		y : -1550,
		scale : 2.5,
		name : "火龙穴"
	} ],
	gkArray:[{
		
	}]

});


