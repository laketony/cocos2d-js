var MonsterLayer = cc.Layer.extend({
	s_Ghost_mip : "cocos-res/test/CFXM2_T_Ghost_mip_0.png",
	s_Spark : "cocos-res/test/spike.png",
	s_GameTitle : "cocos-res/building/jz_yamen.png",
	scaleRate : 0.8,
	updataTime : 0,
	player : null,
	_mineObjectArray : [],
	_monsterArray : [],
	_monster2Array : [],
	_fortessArray : [],
	_transferDoorArray:[],
	_playerArray : [],
	_playerPaodnArray : [],
	_playerMap : {},

	ctor : function() {
		this._super();
		this.init();

	},
	init : function() {
		this._super();
		this.player = LT.player;
		this.player.setLocalZOrder(1);
		this.addChild(this.player);

		
		
		
		// 载入兵点
		this.loadMonster();
		// 碰撞检测
		this.scheduleUpdate();// 表示使用每帧更新函数,更新用户生命
		// 4秒刷兵
		this.schedule(this.timeout, 1);
		// 2秒更新玩家 提交自己载入他人
		this.schedule(this.loadPlayers, 2);
		console.log("MonsterLayer");
		
	},
	loadMonster : function() {
		var pos = $.post("FindStronghold", function(data) {
			// console.log(data);
			pos.delegate.drawMonster(data);
		});
		pos.delegate = this;

		var mineObject = new MineObject();
		var x = 0;
		var y = 350;
		mineObject.setMineName("<K>" + "祝福蜡烛");
		mineObject.setPosition(cc.p(x, y));
		mineObject.setLocalZOrder(0);
		this.addChild(mineObject);

		this._mineObjectArray.push(mineObject);
		
		
		var mineObject = new MineObject(res_other.special_7,res_other.guanhuan1);
		var x = -256;
		var y = -274;
		mineObject.setMineName("<K>" + "智慧之书");
		mineObject.setPosition(cc.p(x, y));
		mineObject.setLocalZOrder(0);
		this.addChild(mineObject);

		this._mineObjectArray.push(mineObject);
		
		
		var inxx = 0;
		for ( var k in res_npc) {
			var v = res_npc[k];
			var point = cc.p((-844 + inxx*120),-610);
			npcBoday = new NpcObject(v);
			npcBoday.setPosition(point);
			npcBoday.setNpcName("花木兰");
			this.addChild(npcBoday);
			inxx++;
		}
		this.loadDoor();
	},
	drawMonster : function(data) {
		var strongholdArray = eval(data);
		for ( var x in strongholdArray) {
			var Stronghold_A1 = strongholdArray[x];
			// console.log(Stronghold_A1);
//			this.drawStronghold(Stronghold_A1);
			
			var shItem = Stronghold_A1;
			if (!shItem) {
				return;
			}
			if("Stronghold" == shItem.classname){
				var fortress = new Fortress(shItem.f1, shItem.f1m, shItem.radius);
				fortress.setPosition(cc.p(shItem.x, shItem.y));
				fortress.setFortressName(shItem.name);
				fortress.zIndex = 1;
				this.addChild(fortress);
				this._fortessArray.push(fortress);
			}
			if("Barracks" == shItem.classname){
				var shItem = Stronghold_A1;
				var barracks = new Barracks(shItem.f1, shItem.f1m, shItem.radius);
				barracks.setPosition(cc.p(100,100+x*100));
				barracks.setFortressName(shItem.name);
				barracks.zIndex = 1;
				barracks.tager = this.player;
				barracks.pr = this;
				this.addChild(barracks);
			}
						
		}
	},
	loadDoor: function(data){
		var transferObj = new Transfer();
		transferObj.setMineName("<K>" + "喆酱镇");
		transferObj.setDoorPoint(9012,-1315);
		transferObj.setPosition(cc.p(1000, 5050));
		transferObj.setLocalZOrder(0);
		this.addChild(transferObj);

		this._transferDoorArray.push(transferObj.door);
		
		
		var transferObj2 = new Transfer();
		transferObj2.setMineName("<K>" + "下江村");
		transferObj2.setDoorPoint(0,0);
		transferObj2.setPosition(cc.p(9012, -915));
		transferObj2.setLocalZOrder(0);
		this.addChild(transferObj2);

		this._transferDoorArray.push(transferObj2.door);
		
		
		
		var transferObj3 = new Transfer();
		transferObj3.setMineName("<K>" + "下江西");
		transferObj3.setDoorPoint(-1009,140);
		transferObj3.setPosition(cc.p(1067, -25));
		transferObj3.setLocalZOrder(0);
		this.addChild(transferObj3);

		this._transferDoorArray.push(transferObj3.door);
		
		
		var transferObj4 = new Transfer();
		transferObj4.setMineName("<K>" + "下江动");
		transferObj4.setDoorPoint(1067,-140);
		transferObj4.setPosition(cc.p(-1009, -58));
		transferObj4.setLocalZOrder(0);
		this.addChild(transferObj4);

		this._transferDoorArray.push(transferObj4.door);
		
		
		// 浦东机场
		var transferObj5 = new Transfer();
		transferObj5.setMineName("<TO>" + "首都");
		transferObj5.setDoorPoint(0,0);
		transferObj5.setPosition(cc.p(19907, -38524));
		transferObj5.setLocalZOrder(0);
		this.addChild(transferObj5);

		this._transferDoorArray.push(transferObj5.door);
		
		
		// 首都机场
		var transferObj6 = new Transfer();
		transferObj6.setMineName("<TO>" + "上海");
		transferObj6.setDoorPoint(19707,-38324);
		transferObj6.setPosition(cc.p(738, 635));
		transferObj6.setLocalZOrder(0);
		this.addChild(transferObj6);

		this._transferDoorArray.push(transferObj6.door);
		
		
		
	},
	loadPlayers : function() {
		var pos = $.post("sync_player", {
			id : this.player._id,
			hp : this.player._hp,
			mp : this.player._mp,
			ms : this.player._ms,
			at : this.player._at,
			lv : this.player._lv,
			ex : this.player._ex,
			x : this.player.x,
			y : this.player.y,
			play_name : this.player._play_name,
			respath : this.player._respath
		}, function(data) {
			pos.delegate.ctrlPlayers(data);
		});
		pos.delegate = this;

	},
	ctrlPlayers : function(data) {
		var playerInfoArray = eval(data);
		for ( var index in playerInfoArray) {
			var playerinfo = playerInfoArray[index];

			if (playerinfo.id == LT.player._id) {
				continue;
			}

			var playBoday = this._playerMap[playerinfo.id];
			// this.playerCreditOrMove(playBoday);
		}

	},
	playerCreditOrMove : function(playBoday) {
		if (playBoday == undefined) {
			var point = cc.p(playerinfo.x, playerinfo.y);
			playBoday = new Player(playerinfo.respath);
			playBoday.setPosition(point);
			playBoday.setPlayerName(playerinfo.play_name);

			playBoday._id = playerinfo.id;
			playBoday._hp = playerinfo.hp;
			playBoday._mp = playerinfo.mp;
			playBoday._ms = playerinfo.ms;
			playBoday._at = playerinfo.at;
			playBoday._lv = playerinfo.lv;
			playBoday._ex = playerinfo.ex;

			var index = parseInt(Math.random() * 3) + 30;

			playBoday.setWuqiTexture("cocos-res/zhuangbei/zhuangbei00048.png");

			this.addChild(playBoday);
			this._playerArray.push(playBoday);
			this._playerMap[playerinfo.id] = playBoday;
		} else {
			var point = cc.p(playerinfo.x, playerinfo.y);
			var action1 = cc.moveTo(1.5, point);
			playBoday.runAction(action1);
		}
	},
	timeout : function() {
		this.updataTime++;
		
		var rect = cc.rect(-999,  -999, 1070 + 999, 852 + 999); // 新手村 安全区域
		var point = cc.p(this.player.x, this.player.y);
		
		if (!cc.rectContainsPoint(rect, point)) {
			if (this.updataTime % 20 == 0) {

				var number = Math.random() * 5 + 3;
				for (var i = 0; i < number; i++) {
					 this.createMovMunaiyi();
				}
			}

			 this.createMovMunaiyi();
		}

		// var number = Math.random() * 5 + 2;
		// for (var i = 0; i < number; i++) {
		// this.createMov2();
		// }
		//
		// var texturename = "cocos-res/TX580/monster/E_unit_1_1.png";
		// // 沿线运动
		// this.createMov(texturename, LTGV.lineArraySet[0]);
		
	},
	createMovMunaiyi : function() {

		var moslvs = parseInt(Math.random() * 3);

		var texturename = "cocos-res/TX580/monster/unit_0_" + moslvs + ".png";

		var monster = new Monster(texturename);
		monster.AP += moslvs * 1000 + parseInt(Math.random() * 500) + 100;

		var xlr = cc.randomMinus1To1();
		var xislr = xlr > 0 ? 1 : xlr < 0 ? -1 : 0;
		var x = this.player.x + (xlr * Math.random() * 1100) + xislr * 500;

		var ytb = cc.randomMinus1To1();
		var yistb = ytb > 0 ? 1 : ytb < 0 ? -1 : 0;
		var y = this.player.y + (ytb * Math.random() * 600) + yistb * 300;

		if (x == 0 && y == 0) {
			x = 1500;
			y = 0;
		}

		monster.setPosition(cc.p(x, y));
		monster.setMonsterName("<M>木乃伊" + monster.AP); 
		monster.setName("monster"); 
		this.addChild(monster);
		

		
		if(monster.AP >= this.player._hp*0.9){
			monster.labelName.setColor(cc.color(255, 0, 0, 255));
		}
		if(monster.AP <= this.player._hp*0.1){
			monster.labelName.setColor(cc.color(33, 33, 33, 255));
		}
		
		

		this._monsterArray.push(monster);

		monster.runHunting_target( this.player); 
		
	},
	createMov2 : function() {

		var texturename = "cocos-res/TX580/monster/E_unit_1_0.png";
		var monster = new Monster(texturename);
		monster.AP += parseInt(Math.random() * 755) + 100;
		var x = Math.random() * 1100 - 500;
		var y = Math.random() * 600 - 300;
		monster.setPosition(cc.p(x, y));
		monster.setMonsterName("<MZ>小贼" + this.updataTime);
		this.addChild(monster);

		this._monsterArray.push(monster);

		var action1 = cc.moveTo(4, cc.p(0, 0));
		var removeSelfAction = new cc.RemoveSelf(false);
		var seq = cc.sequence(action1, removeSelfAction);

		monster.runAction(seq);
	},
	createMov : function(texturename, lines) {

		var monster = new Monster(texturename);
		monster.AP += parseInt(Math.random() * 1550) + 100;
		monster.setPosition(cc.p(0, 0));
		monster.setMonsterName("<MZ>运输兵" + this.updataTime);
		this.addChild(monster);

		var moveArray = new Array();
		for ( var index in lines) {
			var lineInfo = lines[index];

			var actionMove = this.moveActionCreate(lineInfo);
			moveArray.push(actionMove)

		}

		var removeSelfAction = new cc.RemoveSelf(false);
		moveArray.push(removeSelfAction);
		var seq = new cc.Sequence(moveArray);
		monster.runAction(seq);

		this._monsterArray.push(monster);

	},
	moveActionCreate : function(lineInfo) {
		var pointFrom = cc.p(parseInt(lineInfo.l_from_x), parseInt(lineInfo.l_from_y));
		var pointTo = cc.p(parseInt(lineInfo.l_to_x), parseInt(lineInfo.l_to_y));
		var pointCtrl = cc.p(parseInt(lineInfo.l_ctrl_x), parseInt(lineInfo.l_ctrl_y));

		var bezier = [ pointFrom, pointCtrl, pointTo ];
		var bezierForward = new cc.BezierTo(1.5, bezier);

		return bezierForward;
	},
	jianyu : function() {
		// gongjian 弓箭
		var gj_number = Math.random() * 7;
		for (var int = 0; int < gj_number; int++) {

			var point = this.player.getPosition(cc.p(0, 0));
			point.y += Math.random() * 60;
			var gongjian = new JianShiBase(res_jianshi.J6);
			var x = point.x + Math.random() * 1100 - 500;
			var y = point.y + Math.random() * 600 - 300;
			gongjian.setPosition(cc.p(x, y));
			var needangle = getPointToPointRotation(x, y, point.x, point.y);
			gongjian.setRotation(needangle);
			this.addChild(gongjian);

			var needtime = lineSpace(x, y, point.x, point.y) / 50;
			var action1 = cc.moveTo(0.2, point);
			var removeSelfAction = new cc.RemoveSelf(false);
			var seq = cc.sequence(action1, removeSelfAction);
			gongjian.runAction(seq);
		}
	},
	update : function(dt) {
		this.checkPlayer();
		this.checkMonter2Monter();
	},
	clear_monsterArray : function() {
		// 清理独立怪物区
		for ( var j in this._monsterArray) {
			var monster = this._monsterArray[j];
			monster.removeFromParent(true);
		}
		var arylength = this._monsterArray.length ;
		this._monsterArray.splice(0,arylength);
	},
	drWBox: function(tWBox) {
		 if (!LT.windowLayer.drawNo) {
			 var draw = new cc.DrawNode();
			 LT.windowLayer.addChild(draw);
			 LT.windowLayer.drawNo = draw;
		 }
		
		 var plb =cc.p(tWBox.x, tWBox.y); // cc.p(-60, -20);
		 var prt = cc.p(tWBox.width +tWBox.x,  tWBox.y+tWBox.height );
		 LT.windowLayer.drawNo.drawRect(plb, prt, null, 1, cc.color(255, 0, 0,50));
	},
	// 碰撞飞离
	accident_treatment : function(awBox, bwBox, monster) {
		var x1 = awBox.x / awBox.x;
		var y1 = awBox.y / awBox.x;
		var x2 = bwBox.x / awBox.x;
		var y2 = bwBox.y / awBox.x;

		var x3 = 20 * (x2 - x1);
		var y3 = getY3(x1, y1, x2, y2, x3);

		var pianyi = cc.p(x3, y3);

		var endpoint = rwAdd(pianyi, monster.getPosition());

		monster.setPosition(endpoint);
	},
	synTaskChange : function(monster) {

		// 经验增加
		LT.player._ex++;


		var task_list = LTGV.data.task_list;
		if (task_list == 0)
			return;

		for ( var index in task_list) {
			var taskItem = task_list[index];

			if ("<M>" + taskItem.keyword == monster.monsterName) {
				taskItem.num_reach += 1;
			}
		}

		for (var i = 0; i < task_list.length; i++) {
			var ti = task_list[i];

			if (ti.num_reach >= ti.num_need) {
				// 任务条件达成

				var upex = 10 + parseInt(Math.random() * 50) + ti.num_reach * 2;
				// 结算任务经验 结算经验是 10+[0~50)+清理怪物*2

				LT.player._ex = LT.player._ex + upex;

				task_list.splice(i, 1);// 移除任务
			}

		}
		// 升级
		if (LT.player._exmax <= LT.player._ex) {
			LT.player._ex = LT.player._ex - LT.player._exmax;// 移除升级所需经验
			LT.player._lv++;// 等级升级
			LT.player._exmax = LT.player._lv * LT.player._lv * 8;// 夏季所需经验是，等级的平方成8
		}

	},
	checkPlayer : function() {
		var awBox = this.player.playerSprite.getBoundingBoxToWorld();// 玩家的物体
		// console.log(awBox);
		// console.log(this.player.getBoundingBoxToWorld());
		this.checkPlayer2Door(awBox);
		this.checkPlayer2Mine(awBox);
		this.checkPlayer2Monster(awBox);
		this.checkPlayer2FortessMonter(awBox);
	},
	checkPlayer2Monster : function(awBox) {
		this.enumerateChildren("monster",function(monster){ 
			 // 处理野生怪物
			var isIn = $.inArray(monster, monster.parent._monsterArray) ;
			if(isIn == -1 && monster.isDeathed == false)
			{
				LT.monsterLayer._monsterArray.push(monster);
			}
			return false;
		});
		
		// TODO 检测独立怪物区
		for ( var j in this._monsterArray) {
			var monster = this._monsterArray[j];		
			var bwBox = monster.getBoundingBoxToWorld();// 怪物的物体
			
			// 炮弹和怪兽的碰撞事件
			for ( var k in this._playerPaodnArray) {
				var paodan = this._playerPaodnArray[k];
				
				var cwBox = paodan.getBoundingBoxToWorld();// 怪物的物体
				if (cc.rectIntersectsRect(bwBox, cwBox)) {// 判断怪兽与炮弹是否发生碰撞
					this.synTaskChange(monster);
					monster.rDeathAction();
					this._monsterArray.splice(j, 1);// 从怪物数组中删除怪物
					paodan.removeFromParent(true);
					this._playerPaodnArray.splice(k, 1);// 从子弹数组中删除子弹
				}
			}
			if (cc.rectIntersectsRect(bwBox, awBox)) {// 判断怪兽与玩家是否发生碰撞
				this.synTaskChange(monster);
				
				LT.player._hp -= monster.AP;

				if (LT.player._hp <= 0) {
					this.player.skill1();
					LT.player._hp = LT.player.getMaxHP();
					// 复活事件
					var fixPos = cc.p(0, 0);
					var winsize = cc.director.getWinSize();
					var centerPos = cc.p(winsize.width / 2 - fixPos.x, winsize.height / 2 - fixPos.y);

					 LT.windowLayer.qintianbili();
					 LT.backageLayer.setPosition(centerPos);
					 this.player.setPosition(fixPos);
					 if(map){
						 map.centerAndZoom(new BMap.Point(116.404269, 39.916042), 13);
					 }
					 this.clear_monsterArray();
				}
				monster.runDeathAction();
				this._monsterArray.splice(j, 1);// 从怪物数组中删除怪物
				
			}
		}
	},
	checkPlayer2FortessMonter: function(awBox){
		
		// TODO 检测兵点怪物区 与玩家
		for ( var a1 in this._fortessArray) {
			var checkFortress = this._fortessArray[a1];// 获取兵点
			var checkMonsterArray = checkFortress._monsterArray;// 获取兵点的怪物集合
			for ( var a2 in checkMonsterArray) {
				var monster = checkMonsterArray[a2];// 获取怪物
				var bwBox = monster.getBoundingBoxToWorld();// 怪物的物理体积
		
				if(isNaN(bwBox.x)){
					continue;
				}
				
				if (cc.rectIntersectsRect(bwBox, awBox)) {
					LT.player._mp -= monster.AP;
					if (LT.player._mp <= 0) {
						if (monster.monsterName == "<M>狼族") {
							this.player.skill4();
						} else {
							this.player.skill1();
						}
						LT.player._mp = 2500;
					}
					monster.dHP(1);
					if (monster._hp <= 0) {
						checkMonsterArray.splice(a2, 1);// 从怪物数组中删除怪物
						monster.runDeathAction();// 从怪物数组中删除怪物
					}
				}
			}
		}
	},
	checkPlayer2Door: function(awBox){
		// TODO 检查传送门
		for ( var j in this._transferDoorArray) {
			var transferDoor = this._transferDoorArray[j];
			var bwBox = transferDoor.getBoundingBoxToWorld();// 怪物的物体
			

			
			if (cc.rectIntersectsRect(bwBox, awBox)) {// 判断子弹与敌人是否发生碰撞
				var door_x =  transferDoor.door_x;
				var door_y =  transferDoor.door_y;

				var fixPos = cc.p(door_x, door_y);
				var winsize = cc.director.getWinSize();
				var centerPos = cc.p(winsize.width / 2 - fixPos.x, winsize.height / 2 - fixPos.y);
				var centerMap = cc.p(winsize.width / 2, winsize.height / 2 );
				
	

				
				LT.backageLayer.setPosition(centerPos);
				this.player.setPosition(fixPos);
				 
				
				if(map){
					map.setCenter(new BMap.Point(116.404269, 39.916042));
					var mapPixel = cc.pAdd(fixPos,centerMap);
					mapPixel.y = -mapPixel.y; 
					var mapPoint = map.pixelToPoint(mapPixel);	
					map.setCenter(mapPoint);
				}
			
			}
		}
	},
	checkPlayer2Mine: function(awBox){
		// 检测泉水
		for ( var j in this._mineObjectArray) {
			var mineObject = this._mineObjectArray[j];
			var bwBox = mineObject.getBoundingBoxToWorld();
			if (cc.rectContainsRect(bwBox, awBox)) {// 判断是否发生包含
				mineObject.efBuffAnim(this.player, function() {
					var playHp = LT.player._hp; 
					if (playHp <= LT.player.getMaxHP()) {
						LT.player._hp += mineObject.AP;
						if (LT.player._hp > LT.player.getMaxHP()) {
							LT.player._hp = LT.player.getMaxHP();
						}
					}
				});
			}
		}
	},
	checkMonter2Monter: function(){
		// TODO 检测兵点怪物融合
		for ( var b1 in this._fortessArray) {
			var checkFortress1 = this._fortessArray[b1];// 获取兵点
			var checkMonsterArray1 = checkFortress1._monsterArray;// 获取兵点的怪物集合
			for ( var b2 in checkMonsterArray1) {
				var monster1 = checkMonsterArray1[b2];// 获取怪物
				var bwBox = monster1.getBoundingBoxToWorld();// 怪物的物理体积

				for ( var c1 in this._fortessArray) {
					var checkFortress2 = this._fortessArray[c1];// 获取兵点
					var checkMonsterArray2 = checkFortress2._monsterArray;// 获取兵点的怪物集合
					for ( var c2 in checkMonsterArray2) {
						var monster2 = checkMonsterArray2[c2];// 获取怪物
						var cwBox = monster2.getBoundingBoxToWorld();// 怪物的物理体积

						// 包含
						var rnRect = cc.rectIntersection(bwBox, cwBox)
						// console.log(rnRect);
						// {x: 3546.409309014368, y: 2026.5, width:
						// -167.88430901436777, height: -5699.308935098723}
						if (rnRect.width>20&&rnRect.height>20) {
							
							if (b1 == c1 && b2 == c2) {
								continue;
							}
							if (monster2.AP > monster1.AP) {
								checkMonsterArray1.splice(b2, 1);// 从怪物数组中删除怪物
								monster1.runFuseAction();// 从怪物数组中删除怪物
								monster2.lvUp();
							} else {
								checkMonsterArray2.splice(c2, 1);// 从怪物数组中删除怪物
								monster2.runFuseAction();// 从怪物数组中删除怪物
								monster1.lvUp();
							}
						}
					}
				}
			}
		}
	}

});
