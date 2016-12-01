/**
 * 玩家类
 */
var Player = cc.Node.extend({
	labelName : null,
	clock : 0,
	playerSprite : null,
	wuqiSprite : null,
	wuqifushou : null,
	_id : 0,
	_play_name : "",
	_respath : res.player1,

	_ap : 1,// 攻击力
	_hp : 0,// 生命
	_mp : 0,// 魔法
	_ms : 0,// 移动速度
	_at : 1,// 防御立场
	_lv : 0,// 等级
	_ex : 0,// 经验

	wuqiBean : {},

	ctor : function(iTextRes) {
		this._super();
		if (iTextRes) {
			this._respath = iTextRes;
		}
		this.init();
	},
	init : function() {
		this.playerSprite = new cc.Sprite(this._respath);
		this.playerSprite.setAnchorPoint(0.5, 0);
		this.addChild(this.playerSprite);

		this.labelName = cc.LabelTTF.create("人物名")
		this.labelName.setPosition(cc.p(0, -15));
		this.addChild(this.labelName);

		this.schedule(this.reply, 0.5);

		this.wuqiSprite = new Wuqi("cocos-res/zhuangbei/zhuangbei00054.png");
		this.wuqiSprite.setAnchorPoint(0.8, 0.9);
		this.wuqiSprite.setPosition(-19, 24);
		this.addChild(this.wuqiSprite);

	},
	reply : function() {
		if (this._hp < this.getMaxHP()) {
			this._hp += 10;
			if (this._hp > this.getMaxHP()) {
				this._hp = this.getMaxHP();
			}
		}

		this._mp += 20;

	},

	sync_data : function() {

	},
	setPlayerName : function(iName) {
		this._play_name = iName;
		this.labelName.string = this._play_name;
	},
	backlight : function() {

		var bxSprite = new BXSprite(BX2);
		bxSprite.setAnchorPoint(0.5, 0);
		bxSprite.setPosition(0, 199);
		bxSprite.zIndex = this.playerSprite.zIndex - 1;
		this.addChild(bxSprite);
		bxSprite.startAnim();

	},
	skill1 : function() {
		// 头 冒金星
		var bxSprite = new BXSprite();
		bxSprite.setAnchorPoint(0.5, 0);
		bxSprite.setPosition(0, 76);
		bxSprite.zIndex = this.playerSprite.zIndex - 1;
		bxSprite.setScale(1.2);
		LT.playerLayer.addChild(bxSprite);
		bxSprite.startAnim();

	},
	skill3 : function() {
		var r = 10;
		var r2 = 450;
		var a = 0, b = -50;
		var times = 0;
		for (var index = 0; index <= 360; index += 15) {
			times = index;

			var hudu = (Math.PI / 180) * times;
			var X = +a + Math.sin(hudu) * r;
			var Y = -b + Math.cos(hudu) * r
			// 注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。
			var paodan2 = new JianShiBase(res_jianshi.J8);

			paodan2.setPosition(cc.p(X, Y));
			paodan2.setRotation(times);
			LT.playerLayer.addChild(paodan2);

			var x2 = +a + Math.sin(hudu) * r2;
			var y2 = -b + Math.cos(hudu) * r2;

			var action1 = cc.moveTo(0.5, cc.p(x2, y2));
			var delay = cc.delayTime(3);
			var removeSelfAction = new cc.RemoveSelf(false);

			var seq = cc.sequence(action1, delay, removeSelfAction);

			paodan2.runAction(seq);

		}

	},
	skill2 : function(attClock) {
		var r2 = 750;// 攻击半径
		var r = 10;// 起点
		var a = this.x, b = -this.y;
		var times = 0;
		if (attClock) {
			times = attClock;
		} else {
			times = this.clock;
		}

		var hudu = (Math.PI / 180) * times;
		var X = +a + Math.sin(hudu) * r;
		var Y = -b + Math.cos(hudu) * r
		// 注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。

		//选择攻击样式
		var accd1 = parseInt(LT.windowLayer.skillBtn.wheel.ro);
		var accd2 = res_js_select.length;
		var res_jianshi_index =accd1%accd2;
		var res_jianshi = res_js_select[res_jianshi_index];
		
		//生成攻击实体
		var paodan2 = new JianShiBase(res_jianshi);
		paodan2.setName("paodan");
		paodan2.setPosition(cc.p(X, Y));
		paodan2.setRotation(times);
		paodan2.at = this._lv + 1;
		var x2 = +a + Math.sin(hudu) * r2;
		var y2 = -b + Math.cos(hudu) * r2;

		var action1 = cc.moveTo(1.44, cc.p(x2, y2));
		var removeSelfAction = new cc.RemoveSelf(false);
		var seq = cc.sequence(action1, removeSelfAction);

		LT.monsterLayer.addChild(paodan2);
		LT.monsterLayer._playerPaodnArray.push(paodan2);
		paodan2.runAction(seq);

		this.clock += 15;

	},
	skill2point : function(attPoint) {

		var aoxpoint = cc.pSub(attPoint, this.getPosition());

		var jiaodu = jiaoduAOX(aoxpoint);
		// 注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。
		var paodan2 = new JianShiBase(res_jianshi.J7);
		paodan2.setName("paodan");
		paodan2.setPosition(this.getPosition());
		paodan2.setRotation(90 - jiaodu);
		paodan2.at = this._lv + 1;

		var action1 = cc.moveTo(1.44, attPoint);
		var removeSelfAction = new cc.RemoveSelf(false);
		var seq = cc.sequence(action1, removeSelfAction);

		LT.monsterLayer.addChild(paodan2);
		LT.monsterLayer._playerPaodnArray.push(paodan2);
		paodan2.runAction(seq);

	},
	skill4 : function() {
		// d刀光
		var bxSprite = new BXSprite2(BX3);
		bxSprite.setAnchorPoint(0.5, 0.5);
		bxSprite.setPosition(0, 0);
		bxSprite.zIndex = this.playerSprite.zIndex - 1;
		// bxSprite.setScale(1.2);
		bxSprite.setScaleX(this.scaleX * bxSprite.scaleX);
		bxSprite.tag = "efBuffAnimA2";
		bxSprite.imagePerUnit = 0.1;
		// 效果函数
		LT.playerLayer.addChild(bxSprite);
		bxSprite.startAnim();

	},
	attackAction : function() {
		this.wuqiSprite.attackAction();
	},
	defenseAction : function() {
		this.wuqifushou.defenseAction();
	},
	setWuqiTexture : function(wuqiRespath) {
		this.wuqiSprite.setTexture(wuqiRespath);
	},
	getMaxHP : function() {
		return 300 + this._lv * this._lv * 10
	}
});
var Wuqi = cc.Sprite.extend({
	wuqiBean : {},
	_respath : "cocos-res/zhuangbei/zhuangbei00054.png",

	ctor : function(spriteFrameName) {
		if (spriteFrameName) {
			this._respath = spriteFrameName;
		}

		this._super(this._respath);
		// this.setScale(0.33);
	},
	attackAction : function() {
		var actionTo = cc.rotateTo(0.15, 45);
		var actionTo2 = cc.rotateTo(0.15, -45);
		var actionTo0 = cc.rotateTo(0.15, 0);

		this.runAction(cc.sequence(actionTo, actionTo2, actionTo0));
	},
	defenseAction : function() {
		var actionTo = cc.rotateTo(0.15, 45);
		var actionTo2 = cc.rotateTo(0.15, -45);
		var actionTo0 = cc.rotateTo(0.15, 0);

		this.runAction(cc.sequence(actionTo, actionTo2, actionTo0));
	}
});

var BXSprite = cc.Sprite.extend({
	_respath : BX1[0],
	index : 0,
	_resPathList : BX1,
	ctor : function(resPathList) {
		if (resPathList) {
			this._resPathList = resPathList;
		}
		this._respath = this._resPathList[0];

		this._super(this._respath);
	},
	startAnim : function() {
		var removeSelfAction = new cc.RemoveSelf(true);
		var actionRm = cc.sequence(cc.delayTime(1), removeSelfAction);
		this.runAction(actionRm);

		// 2秒更新玩家 提交自己载入他人
		this.schedule(this.changeTexture, 0.33);

	},
	changeTexture : function() {
		var resPathList = this._resPathList;
		this.setTexture(resPathList[this.index]);
		this.index++;
		if (this.index >= resPathList.length) {
			this.index = 0;
		}
	}
});

var BXSprite2 = cc.Sprite.extend({
	_respath : BX3[0],
	index : 0,
	_resPathList : BX3,
	imagePerUnit : 0.33,
	ctor : function(resPathList, imagePerUnit) {
		if (resPathList) {
			this._resPathList = resPathList;
		}
		this._respath = this._resPathList[0];

		this._super(this._respath);

		if (imagePerUnit) {
			this.imagePerUnit = imagePerUnit;
		}
	},
	startAnim : function() {
		var animation = new cc.Animation();

		for ( var x in this._resPathList) {
			animation.addSpriteFrameWithFile(this._resPathList[x]);
		}

		animation.setDelayPerUnit(this.imagePerUnit); // 设置两个帧播放时间 ⑤
		animation.setRestoreOriginalFrame(true); // 动画执行后还原初始状态 ⑥

		var action = cc.animate(animation);
		var removeSelfAction = new cc.RemoveSelf(true);
		var actionRm = cc.sequence(action, removeSelfAction);

		var isLorR = this.scaleX > 0 ? -1 : 1;

		// this.runAction(cc.rotateTo(0.31, 33 * isLorR));
		this.runAction(actionRm);

	}
});
