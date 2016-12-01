var WindowLayer = cc.Layer.extend({
	ctor : function() {
		this._super();

		this.init();
	},
	labelBR : cc.LabelTTF.create("", "Transformers_Movie", 44),

	taskBox : cc.Node.create(),

	labelTR1 : cc.LabelTTF.create("car_speed", "Transformers_Movie", 25),
	labelTR2 : cc.LabelTTF.create("car_acceleration", "Transformers_Movie", 25),
	labelTR3 : cc.LabelTTF.create("MS", "Transformers_Movie", 25),
	labelTR4 : cc.LabelTTF.create("AT", "Transformers_Movie", 25),

	labelBL_LV : cc.LabelTTF.create("LV 1", "Transformers_Movie", 35),
	labelBL_EX : cc.LabelTTF.create("EX 0", "Transformers_Movie", 35),

	init : function() {
		this._super();
		var winsize = cc.director.getWinSize();

		// create the background image and position it at the center of
		// screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		this.labelBR.setAnchorPoint(cc.p(1.0, 0.0));
		this.labelBR.setPosition(cc.p(winsize.width - 1, 0));
		this.addChild(this.labelBR, 1);

		this.labelTR1.setString(0 + " car_speed");
		this.labelTR1.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR1.setPosition(cc.p(winsize.width - 1, winsize.height - 15));
		this.addChild(this.labelTR1, 1);

		this.labelTR2.setString(0 + " car_acceleration");
		this.labelTR2.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR2.setPosition(cc.p(winsize.width - 1, winsize.height - 35));
		this.addChild(this.labelTR2, 1);

		this.labelTR3.setString(0 + " MS");
		this.labelTR3.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR3.setPosition(cc.p(winsize.width - 1, winsize.height - 55));
		this.addChild(this.labelTR3, 1);

		this.labelTR4.setString(0 + " AT");
		this.labelTR4.setAnchorPoint(cc.p(1.0, 1.0));
		this.labelTR4.setPosition(cc.p(winsize.width - 1, winsize.height - 75));
		this.addChild(this.labelTR4, 1);

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

	},
	setLog : function(text) {
		this.labelBR.setString(text);
	},
	setCar_speed : function(text) {
		this.labelTR1.setString(text + " car_speed");

	},
	setCar_acceleration : function(text) {
		this.labelTR2.setString(text + " car_acceleration");
	}
});
