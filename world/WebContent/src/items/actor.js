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

		var attack_interval = cc.delayTime(3);
		var attarCallFunc = cc.callFunc(this.attarFunc,this);
		this.attarAction1 = cc.sequence(attack_interval, attarCallFunc).repeatForever();

	},
	attarFunc : function(age1, age2) {

		var lues = Math.floor(cc.rand() % 250+100);
		var labelAttr = initLabelAtlas2(lues);
		labelAttr.setPosition(this.tager.width/2, this.tager.height);
		this.tager.addChild(labelAttr);
		this.tager.HP-=lues;
		
		var showMove = cc.moveBy(cc.random0To1()+0.5, cc.p(cc.randomMinus1To1() * 100, 35 * 4));
		var showRemove = cc.removeSelf(true);
		var shows = cc.sequence(showMove, showRemove);
		labelAttr.runAction(shows);
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
		this.runAction(this.attarAction1);
	},
	
});