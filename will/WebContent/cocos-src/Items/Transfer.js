/**
 * 传送门
 * */
var Transfer = cc.Node.extend({
	labelName : null,
	labelDy : null,
	mineName : "",
	mineMark : "",

	mineBody : null,//

	door : null,
	door_x : 0,
	door_y : 0,

	drawNo : null,
	ctor : function(itexturename) {
		this._super();

		if (itexturename)
			this.texturename = itexturename;
		this.init();
	},
	init : function() {

		// 核心身体
		this.mineBody = new cc.Sprite("cocos-res/effect/a1/instance_galaxy_bg.png");
		this.mineBody.setAnchorPoint(0.5, 0.5);
		this.mineBody.setLocalZOrder(1);
		this.addChild(this.mineBody);
		this.mineBody.runAction(this.rotateAction());

		var fontDef = new cc.FontDefinition();
		fontDef.fontName = "Pantheon";
		fontDef.fontSize = "14";
		// 名字
		this.labelName = cc.LabelTTF.create(this.mineName);
		this.labelName.setTextDefinition(fontDef);
		this.labelName.setPosition(cc.p(0, -5));
		this.labelName.setColor(cc.color(255, 255, 0));
		this.addChild(this.labelName);

		this.labelDy = cc.LabelTTF.create(this.mineName);
		this.labelDy.setTextDefinition(fontDef);
		this.labelDy.setPosition(cc.p(0, -25));
		this.addChild(this.labelDy);

		var door = this.door = cc.Node.create();
		door.width = 100;
		door.height = 100;
		this.addChild(door);

	},
	rotateAction : function() {
		var actionBy = new cc.RotateBy(2, 360);
		var action = cc.sequence(actionBy).repeatForever();
		return action;

	},
	setMineName : function(imineName) {
		this.mineName = imineName;
		this.labelName.string = this.mineName;
	},
	setDoorPoint : function(ix, iy) {

		this.door.door_x = this.door_x = ix;
		this.door.door_y = this.door_y = iy;
		this.labelDy.string = "<TO " + this.door_x + " " + this.door_y + " >";
	}

});
