
//标准数据结构
var Stronghold = {
		classname : "Stronghold",
		point : cc.p(0, 0),
		x : 1066,
		y : 700,
		f1 : "cocos-res/TX580/object_31.png",
		f1m : "cocos-res/TX580/monster/unit_6_1.png",
		name : "法老墓",
		radius : 20
	};

/**
 * 堡垒 兵圈型精灵 怪物在一定范围内移动。 并且相互吞噬升级。
 */
var Fortress = cc.Node.extend({

	labelName : null,
	textureLandmark : "cocos-res/TX580/PS_circle_01.png",
	textureMonster : "cocos-res/TX580/special_1.png",
	
	AP : 1,// Attack power
	LV : 1,// Grade 等级
	
	delegate : null,
	eachTime : 1,// 每秒一个
	_monsterArray : null,// 怪物数组

	maxMonsterMunber : 5,// 最多包涵体
	existenceRadius : 250,
	drawNode : null,

	
	ctor : function(itextureLandmark, itextureMonster, existenceRadius) {
		this._super();

		if (itextureLandmark != null && itextureLandmark != "" && itextureLandmark != undefined)
			this.textureLandmark = itextureLandmark;

		if (itextureMonster != null && itextureMonster != "" && itextureMonster != undefined)
			this.textureMonster = itextureMonster;

		if (existenceRadius) {
			this.existenceRadius = existenceRadius;
		}

		this.init();
	},
	init : function() {
 
		this._monsterArray = new Array();

		var monsterBody = new cc.Sprite(this.textureLandmark);
		monsterBody.setAnchorPoint(0.5, 0);
		monsterBody.zIndex = this.zInde + 1;
		this.addChild(monsterBody);

		this.drawNode = cc.DrawNode.create();
		this.drawNode.setPosition(cc.p(0, 0));
		this.drawNode.drawCircle(cc.p(0, 0), this.existenceRadius, 0, 100, false, 2, cc.color(128, 128, 128, 128));
		this.addChild(this.drawNode);

		this.labelName = cc.LabelTTF.create(this.monsterName);
		this.labelName.setPosition(cc.p(0, -5));
		this.addChild(this.labelName);

		this.schedule(this.createMonster, this.eachTime);

		
	},
	setFortressName : function(iFortressName) {
		this.fortressName = iFortressName;
		this.labelName.string = this.fortressName + " [" + this.LV + "]";
	},
	// 生成怪物
	createMonster : function() {
		if (this._monsterArray.length < this.maxMonsterMunber) {
			this.createMov(this.tager);
		}
	},
	// 生成怪物
	createMov : function(tager) {

		var monster = new Monster(this.textureMonster);
		monster.setPosition(cc.p(0, 0));
		monster.zIndex = this.zInde + 20;
		monster.setMonsterName("<M>" + this.fortressName);
		monster.setName("monster");
		
		this.addChild(monster);
		monster.pr = this;
		monster.monsterMoveAI = this.monsterMoveAI;
		this.monsterMoveAI(monster);
		this._monsterArray.push(monster);
		
	},
	// TODO 圈内移动
	monsterMoveAI : function(monster) {
		var x = (1 - (parseInt(Math.random() * 3))) * (Math.random() * monster.pr.existenceRadius);
		var y = (1 - (parseInt(Math.random() * 3))) * (Math.random() * monster.pr.existenceRadius);

		var tagerPoint = monster.getPosition();

		var m_speed = 55;// 速度 px/s
		var m_distance = lineSpace(x, y, tagerPoint.x, tagerPoint.y);// 距离 px
		var m_time = m_distance / m_speed;// 时间 ＝ 距离 ／速度

		var actionMove = cc.moveTo(m_time, cc.p(x, y));
		var isToLeft = x > monster.x;

		monster.monsterBody.runAction(cc.flipX(isToLeft));

		var action2 = cc.sequence(actionMove,//
		cc.callFunc(monster.monsterMoveAI, monster)//
		);

		monster.runAction(action2);
	}
});
/**
 * 兵营 兵营型精灵 每隔一定时间生成一个单位的怪物向玩家攻击
 */
var Barracks = Fortress.extend({
	tager:null,
	pr:null,
	eachTime : 3,// 每eachTime秒
	init : function() {
		this._super(); 
			
	},
	createMonster : function() { 
 
		this.createMov();
	},
	createMov : function() {
		var tager = this.tager;
		var monster = new Monster(this.textureMonster); 
		monster.zIndex = this.zInde + 20;
		monster.setMonsterName("<M>" + this.fortressName);
		monster.setName("monster");
		
 
		monster.setPosition(this.getPosition());
		
		if(this.pr !=null){
			this.pr.addChild(monster);
		}
		monster.runHunting_target(tager); 

		this._monsterArray.push(monster);
		
	}
});


