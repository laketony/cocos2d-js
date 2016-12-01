var LDialog = cc.Sprite.extend({

	titleString : "",
	contentString : "",
	showlong : 1.5,
	ctor : function(ititle, icontent, ishowlong) {
		this._super("cocos-res/dialogBg.png");

		// 自定义初始化
		if (ititle) {
			this.titleString = ititle;
		}
		if (icontent) {
			this.contentString = icontent;
		}
		if (ishowlong) {
			this.showlong = ishowlong;
		}

		this.init();
	},
	// 添加自己的属性和方法
	init : function() {

		var fontTitle = new cc.FontDefinition();
		fontTitle.fontSize = "65";
		var labelTitle = cc.LabelTTF.create(this.titleString, fontTitle);
		labelTitle.setPosition(cc.p(this.width / 2, this.height - 47));
		this.addChild(labelTitle);

		var fontContent = new cc.FontDefinition();
		fontContent.fontSize = "48";
		var labelContent = cc.LabelTTF.create(this.contentString, fontContent);
		labelContent.setPosition(cc.p(this.width / 2, this.height - 104));
		this.addChild(labelContent);

	},
	show : function() {
		var removeSelfAction = new cc.RemoveSelf(true);
		var actionRm = cc.sequence(cc.delayTime(this.showlong), removeSelfAction);
		this.runAction(actionRm);
	}
});