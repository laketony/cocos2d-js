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
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage12);
		war_bingdao.setPosition(0, rr);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong);
		var myLabel = new cc.LabelTTF('冰川',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage1);
		war_bingdao.setPosition(rr*0.5, rr*0.866);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('灌丛',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage2);
		war_bingdao.setPosition(rr*0.866, rr*0.5);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('炎地',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage3);
		war_bingdao.setPosition(rr, 0);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('古塔',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage4);
		war_bingdao.setPosition(rr*0.866, -rr*0.5);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('沙野',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage5);
		war_bingdao.setPosition(rr*0.5, -rr*0.866);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('墓穴',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);

		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage6);
		war_bingdao.setPosition(0, -rr);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('冰台',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage7);
		war_bingdao.setPosition(-rr*0.5, -rr*0.866);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('魔域',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage8);
		war_bingdao.setPosition(-rr*0.866, -rr*0.5);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('天坛',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage9);
		war_bingdao.setPosition(-rr,0);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('孤林',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage10);
		war_bingdao.setPosition(-rr*0.866, rr*0.5);		
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('神域',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.UI_Adventure_Button_Stage11);
		war_bingdao.setPosition(-rr*0.5, rr*0.866);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('鬼林',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		
		
		var war_bingdao = new cc.Sprite(UIs3.StageArmor);
		war_bingdao.setPosition(550, 550);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('冰狮王',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.StageSummon);
		war_bingdao.setPosition(550, -550);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('风龙穴',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.StageVehicle);
		war_bingdao.setPosition(-550, -550);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('火龙穴',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		var war_bingdao = new cc.Sprite(UIs3.StageWeapon);
		war_bingdao.setPosition(-550, 550);
		war_bingdao.setScale(2.5);
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong.clone());
		var myLabel = new cc.LabelTTF('天剑天',  fontDef);
		myLabel.setAnchorPoint(0.5,1);
		myLabel.setPosition(war_bingdao.width/2, 0);
		war_bingdao.addChild(myLabel);
		
		
		
	}

});
