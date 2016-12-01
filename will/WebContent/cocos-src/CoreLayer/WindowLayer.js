var renwu_task = [ {
	num_need : 15000,
	num_reach : 0,
	keyword : "骷髅",
	describe : "杀死小骷髅",
	mark : "kulou",
	type : 1
}, {
	num_need : 4500,
	num_reach : 0,
	keyword : "骷髅",
	describe : "获取骨精",
	mark : "gui1",
	type : 2
}, {
	num_need : 7555,
	num_reach : 0,
	keyword : "冰龙族",
	describe : "蓝色龙蛋壳",
	mark : "long1",
	type : 1
}, {
	num_need : 6520,
	num_reach : 0,
	keyword : "狼族",
	describe : "获取狼血",
	mark : "gui1",
	type : 2
}, {
	num_need : 5900,
	num_reach : 0,
	keyword : "冰怪族",
	describe : "极寒精华",
	mark : "gui1",
	type : 2
}, {
	num_need : 2000,
	num_reach : 0,
	keyword : "火龙族",
	describe : "极寒精华",
	mark : "gui1",
	type : 2
} ];

var WindowLayer = cc.Layer.extend({
	ctor : function() {
		this._super();

		this.init();
	},
	labelZuobiao : cc.LabelTTF.create("0 0", "Transformers_Movie", 55),

	taskBox : cc.Node.create(),

	labelHP : cc.LabelTTF.create("HP", "Transformers_Movie", 35),
	labelMP : cc.LabelTTF.create("MP", "Transformers_Movie", 35),
	labelMS : cc.LabelTTF.create("MS", "Transformers_Movie", 35),
	labelAT : cc.LabelTTF.create("AT", "Transformers_Movie", 35),
	myLabel2 : new cc.LabelAtlas("", res.charmap_png, 20, 23, 'a'),
	labelBL_LV : cc.LabelTTF.create("LV 1", "Transformers_Movie", 35),
	labelBL_EX : cc.LabelTTF.create("EX 0", "Transformers_Movie", 35),

	doorLayer : null,

	init : function() {
		this._super();
		var winsize = cc.director.getWinSize();

		// create the background image and position it at the center of
		// screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		this.labelZuobiao.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelZuobiao.setPosition(cc.p(winsize.width - 1, winsize.height - 15));
		this.addChild(this.labelZuobiao, 1);

		this.labelAT.setString(0 + " AT");
		this.labelAT.setAnchorPoint(cc.p(1.0, 0));
		this.labelAT.setPosition(cc.p(winsize.width - 1, 90));
		this.addChild(this.labelAT, 1);

		this.labelHP.setString(0 + " HP");
		this.labelHP.setAnchorPoint(cc.p(1.0, 0));
		this.labelHP.setPosition(cc.p(winsize.width - 1, 15));
		this.addChild(this.labelHP, 1);

		this.labelMP.setString(0 + " MP");
		this.labelMP.setAnchorPoint(cc.p(1.0, 0));
		this.labelMP.setPosition(cc.p(winsize.width - 1, 40));
		this.addChild(this.labelMP, 1);

		this.labelMS.setString(0 + " MS");
		this.labelMS.setAnchorPoint(cc.p(1.0, 0));
		this.labelMS.setPosition(cc.p(winsize.width - 1, 65));
		this.addChild(this.labelMS, 1);

		this.labelBL_LV.setString("LV " + 0);
		this.labelBL_LV.setAnchorPoint(cc.p(0.0, 0.0));
		this.labelBL_LV.setPosition(cc.p(13, 55));
		this.addChild(this.labelBL_LV, 1);

		this.labelBL_EX.setString("Ex " + 0 + "/" + 0);
		this.labelBL_EX.setAnchorPoint(cc.p(0.0, 0.0));
		this.labelBL_EX.setPosition(cc.p(13, 25));
		this.addChild(this.labelBL_EX, 1);

		this.taskBox.setPosition(cc.p(0, winsize.height));
		this.addChild(this.taskBox, 1);

		
		var skillBtn = new SkillWheel();
		skillBtn.setPosition(cc.p(0,winsize.height/2+65));
		skillBtn.rotation = 90;
		this.addChild(skillBtn, 1);
		this.skillBtn = skillBtn;
		// doorLayer
		this.doorLayer = new cc.Layer(winsize.width - 40, winsize.height - 250);
		// this.addChild(this.doorLayer);

		var doorLayer = this.doorLayer;
		doorLayer.setPosition(20, 125);
		var door_drawNo = new cc.DrawNode();
		door_drawNo.setPosition(cc.p(0, 0));
		doorLayer.addChild(door_drawNo);

		var prt = cc.p(winsize.width - 30, winsize.height - 325);
		var plb = cc.p(-10, -10);
		door_drawNo.drawRect(plb, prt, cc.color(14, 50, 239, 40), 7, cc.color(255, 255, 255));

		var title = "<Up>天晴客栈";
		var titlettf0 = new cc.LabelTTF(title, "Arial", 44, cc.size(winsize.width - 45, 50));
		titlettf0.x = 0;
		titlettf0.y = winsize.height - 325;
		titlettf0.anchorX = 0;
		titlettf0.anchorY = 1;
		titlettf0.setColor(cc.color(255, 255, 255, 100));
		doorLayer.addChild(titlettf0);

		var showtxt = "进来睡一下吗?\n";
		showtxt += "大床房\t $188" + "\n";
		showtxt += "通铺8人\t $288" + "\n";
		showtxt += "地子房\t $388" + "\n";
		showtxt += "天字房\t $488" + "\n";
		showtxt += "决战到天亮情趣套间 \t $888[限时]" + "\n";

		var ttf0 = new cc.LabelTTF(showtxt, "Arial", 25, cc.size(winsize.width - 45, winsize.height - 350));
		ttf0.x = 0;
		ttf0.y = winsize.height - 377;
		ttf0.anchorX = 0;
		ttf0.anchorY = 1;
		ttf0.setColor(cc.color(255, 255, 255, 100));
		doorLayer.addChild(ttf0);

		// creates the cc.LabelAtlas with a string, a char map file(the
		// atlas),
		// the width and height of each element and the starting char of
		// the
		// atlas

		LTGV.data.task_list_static = renwu_task;
		LTGV.data.task_list = [];
		for (var i = 0; i < 3; i++) {
			var taskAllList = LTGV.data.task_list_static;
			var randomIndex = parseInt(Math.random() * taskAllList.length);

			var taskinfo = taskAllList[randomIndex];
			var taskinfoNew = copyObj(taskinfo);
			LTGV.data.task_list.push(taskinfoNew);
		}

		this.synTaskLabel();

		this.scheduleUpdate();// 表示使用每帧更新函数,更新用户生命

		/*
		 * a 0 b 9 c / d 1 e 4 f : g 6 h 5 i 8 j 2 k 7 l 3 m + n , o - p x
		 * 
		 * djlehgkibamopcfn
		 */
		this.myLabel2.setPosition(cc.p(winsize.width / 2, winsize.height - 12));
		this.myLabel2.setAnchorPoint(cc.p(0.5, 1.0));
		this.addChild(this.myLabel2, 2);
		console.log("WindowLayer");

		var dialog = new LDialog("游戏开始", "");
		this.addChild(dialog);
		this.removeChild(dialog, true);
	},
	aaflus : function(dt) {
		var regDic = {
			"a" : "0",
			"b" : "9",
			"d" : "1",
			"e" : "4",
			"g" : "6",
			"h" : "5",
			"i" : "8",
			"j" : "2",
			"k" : "7",
			"l" : "3",
			"n" : "\\.",
			"o" : "-",
			"p" : "x",
			"f" : ":",
			"c" : "/",
			"m" : "\\+"
		};

		var stringObj = dt;
		for ( var p in regDic) {
			// cc.log("lt jj " + p + ">" + regDic[p]);
			var reg = new RegExp(regDic[p] + "", "g"); // 创建正则RegExp对象
			stringObj = stringObj.replace(reg, p);
		}
		this.myLabel2.setString(stringObj);

	},
	update : function(dt) {
		this.labelHP.setString(LT.player._hp + " HP");
		this.labelMP.setString(LT.player._mp + " MP");
		this.labelMS.setString(LT.player._ms + " MS");

		this.labelBL_LV.setString("LV " + LT.player._lv);

		this.labelBL_EX.setString("Ex " + LT.player._ex + "/" + LT.player._exmax);

		var task_list = LTGV.data.task_list;
		var allTaskLabel = this.taskBox.getChildren();

		if (task_list.length != allTaskLabel.length) {
			this.synTaskLabel();
		}
		this.synTaskString();
	},
	synTaskLabel : function() {
		var winsize = cc.director.getWinSize();
		this.taskBox.removeAllChildren(true);
		var task_list = LTGV.data.task_list;
		for (var i = 0; i < task_list.length; i++) {
			var ti = task_list[i];
			var labelLT = cc.LabelTTF.create("", "", 25);
			labelLT.setString(ti.describe + " " + ti.num_reach + "/" + ti.num_need);
			labelLT.setAnchorPoint(cc.p(0.0, 1.0));
			labelLT.setPosition(cc.p(13, 0 - 25 * i - 15));
			this.taskBox.addChild(labelLT, 1);
		}
	},
	synTaskString : function() {
		var allTaskLabel = this.taskBox.getChildren();
		var task_list = LTGV.data.task_list;

		for (var i = 0; i < task_list.length; i++) {

			var ti = task_list[i];
			var taskLabel = allTaskLabel[i];
			var showString = ti.describe + " " + ti.num_reach + "/" + ti.num_need;
			taskLabel.setString(showString);
		}
	},
	qintianbili : function() {
		var winsize = cc.director.getWinSize();
		// create the background image and position it at the center of screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
		var dialog = new LDialog("你死了！", "回到据点重生！");
		dialog.setPosition(centerPos);
		this.addChild(dialog);
		dialog.show();
	}

});

/**
 * 技能轮
 */

var SkillWheel = cc.Node.extend({
	wheel:null,
	ctor : function(iTextRes) {
		this._super();

		this.init();
	},
	init : function() {

		var vertices3 = [cc.p(40, 0), cc.p(-40, 0), cc.p(0, 140)];
		
		var shapeShow = new cc.DrawNode();
     
		shapeShow.drawPoly(vertices3,null, 3, cc.color(0, 255, 0, 255));
        shapeShow.drawCircle(cc.p(0,0), 80, 0, 80, false, 3, cc.color(0, 255, 0, 255));
        this.addChild(shapeShow);	
 
        var wheel = new cc.Node();
        this.addChild(wheel);
        
        for(var i = 0;i<5;i++){
        	var oneItem = this.getOneItem(i);
            oneItem.rotation =-72*i;
            wheel.addChild(oneItem);
        }
        wheel.ro=0;
        this.wheel = wheel;
        
        this.width = 80 ;
        this.height = 80 ;
        cc.eventManager.addListener(this.listener_SkillWheel, this);
	},
	getOneItem:function(i){
		
		var x = 30;
		var y=  Math.sin(36)*x/Math.sin(54);
		
		var vertices3 = [cc.p(-x, y), cc.p(x, y), cc.p(0, 0)];
		 
        var shape = new cc.DrawNode();
        shape.drawPoly(vertices3, cc.color(0, 255, 255, 255), 2, cc.color(255, 0, 255, 255));
        shape.drawQuadBezier(vertices3[0], cc.p(0, 140), vertices3[1],
        		50, 2, cc.color(255, 0, 255, 255));
        
        // 增加一个圆形显示
        var clipper = new cc.ClippingNode();
        clipper.setStencil(shape);  // 把刚刚创建的圆形模板放入
        
        
        var texturename =res_js_select[i][1];
		var abody = new cc.Sprite(texturename);
		abody.setPosition(cc.p(0,50));
		clipper.addChild(abody);
        
        return clipper;
	},
	listener_SkillWheel : cc.EventListener.create({
		event : cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches : false,
		// 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递
		onTouchEnded : function(touch, event) {
			// 实现 onTouchBegan 事件处理回调函数
			// 移动当前按钮精灵的坐标位置
			var target = event.getCurrentTarget();
			var actionBy = cc.rotateBy(3, 72);  
			target.wheel.ro++;
			target.wheel.rotation =72*target.wheel.ro;

		},
		onTouchBegan : function(touch, event) { // 实现 onTouchBegan 事件处理回调函数
			var target = event.getCurrentTarget();
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			var s = target.getContentSize();
			var rect = cc.rect(-s.width, 0, s.width*2, s.height);
			if(cc.rectContainsPoint(rect,locationInNode)){
				return true;	
			}
			return false;
		}
	}),
	changeSkill:function(){
	}
});

