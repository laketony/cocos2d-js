var Actor = cc.Node.extend({
	_respath : null,
	pysBodySprite : null,

	ctor : function(iTextRes) {
		this._super();
		if (iTextRes) {
			this._respath = iTextRes;
		}
		this.init();
	},
	init : function() {
		this.pysBodySprite = new cc.Sprite(this._respath);
		this.pysBodySprite.setAnchorPoint(0.5, 0);
		this.addChild(this.pysBodySprite);

	}
});

var MonsterSprite = cc.Sprite.extend({
	attarAction1 : null,
	tager:null,
	HP:1000,
	ctor : function(iname, hp) {
		var name = iname + "";
		this._super(name);
		this.setAnchorPoint(0.5, 0);
		this.init(name);
	},
	// 添加自己的属性和方法
	init : function(name) {
		this._super(name);

		// var bgSprite1 = new
		// cc.Sprite("res/UI1/FX_Frame_Hostile_Frame@100.png");
		// this.addChild(bgSprite1);
		//
		// var bgSprite2 = new
		// cc.Sprite("res/UI1/FX_Frame_FrendlyTalk_Frame.png");
		// bgSprite2.setPosition(this.width, 0);
		// this.addChild(bgSprite2);
		//
		// var bgSprite3 = new cc.Sprite("res/UI1/FX_Select_Hostile.png");
		// bgSprite3.setPosition(0, this.height);
		// this.addChild(bgSprite3);

		var bgSprite4 = new cc.Sprite("res/UI1/FX_Select_Hostile.png");
		bgSprite4.setPosition(this.width, this.height);
		this.addChild(bgSprite4);

		var attack_interval_time = cc.random0To1()*3+4;		
		var attack_interval = cc.delayTime(attack_interval_time);
		var attarCallFunc = cc.callFunc(this.attarFunc,this);

		var attack_action = cc.sequence(attack_interval, attarCallFunc);
		
		var actionBy1 = cc.moveBy(0.3, cc.p(0, -60));
		var actionBy1Back = actionBy1.reverse(); 
		var actionBy2 = cc.scaleBy(0.3, 1.5);
		var actionBy2Back = actionBy2.reverse(); 
		
		
		var attack_motion =cc.spawn([cc.sequence(actionBy1, actionBy1Back),cc.sequence(actionBy2, actionBy2Back)]) ;
		
		
		var attack_loop = cc.sequence(attack_interval,attack_motion ,attarCallFunc).repeatForever();
		this.attarAction1 = attack_loop;

	},
	attarFunc : function(age1, age2) {
		//向目标发送攻击,让其掉血
		var lues = Math.floor(cc.random0To1()*20+10);
		var labelAttr = new cc.Sprite();
		labelAttr.setPosition(this.tager.width/2+145*cc.randomMinus1To1(), this.tager.height/2+145*cc.random0To1());
		this.tager.addChild(labelAttr);

		var showEff = EffectAnim.BGererInArray();
		var showRemove = cc.removeSelf(true);
		var shows = cc.sequence(showEff, showRemove);
		labelAttr.runAction(shows);
		//出发目标扣除生命事件
		this.tager.divHP(lues); 
	},
	hurtFunc : function(age1, age2) {

		var lues = Math.floor(cc.rand() % 5000);
		var labelAttr = initLabelAtlas2(age1);
		labelAttr.setLocalZOrder(10);
		labelAttr.setPosition(this.width/2, this.height);
		this.addChild(labelAttr);

		var showMove = cc.moveBy(cc.random0To1()+0.5, cc.p(cc.randomMinus1To1() * 100, 35 * 4));
		var showRemove = cc.removeSelf(true);
		var shows = cc.sequence(showMove, showRemove);
		labelAttr.runAction(shows);
	},
	startActiuon : function(iTager) {
		this.tager = iTager;
		
		var waitTime = cc.random0To1()*3;		
		console.log(waitTime);
		var attack_delay =  cc.delayTime(waitTime);
		var attarCallFunc = cc.callFunc(this.waitToActtar,this);
		var attack_wait = cc.sequence(attarCallFunc, attarCallFunc);
		this.runAction(attack_wait);
	},
	waitToActtar : function(iTager) {
		this.runAction(this.attarAction1);
	}
	
});