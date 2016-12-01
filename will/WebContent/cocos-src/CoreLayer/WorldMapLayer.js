var WorldMapLayer = cc.Layer.extend({
	drawLineMap : cc.DrawNode.create(),
	anquanqu : [],
	lineArraySet : [],
	ctor : function() {
		this._super();
		this.init();

	},

	init : function() {
		this._super();

		var singularity = new cc.Sprite(res.btn_singularity);
		singularity.setPosition(cc.p(0, 0));
		this.addChild(singularity);

		this.addChild(this.drawLineMap);
		LTGV.lineArraySet = this.lineArraySet;

		this.loadDB();

		// var npcObject = new NpcObject(res.player1);
		// npcObject.setPosition(cc.p(-450, 225));
		// this.addChild(npcObject);

		console.log("WorldMapLayer");
	},
	loadDB : function() {
		var loadLine = $.post("AllLine", function(data) {
			loadLine.delegate.drawMap(data);
		});
		loadLine.delegate = this;

		var loadBuilding = $.post("FindBuilding", function(data) {
			loadBuilding.delegate.drawBuilding(data);
		});
		loadBuilding.delegate = this;

		var loadSignpost = $.post("FindSignpost", function(data) {
			loadSignpost.delegate.drawSignpost(data);
		});
		loadSignpost.delegate = this;
	},
	drawMap : function(data) {
		var lineArray = eval(data);
		this.lineArraySet.push(lineArray);

		for ( var x in lineArray) {
			lineInfo = lineArray[x];
			var pointFrom = cc.p(parseInt(lineInfo.l_from_x), parseInt(lineInfo.l_from_y));
			var pointTo = cc.p(parseInt(lineInfo.l_to_x), parseInt(lineInfo.l_to_y));
			var pointCtrl = cc.p(parseInt(lineInfo.l_ctrl_x), parseInt(lineInfo.l_ctrl_y));
			this.drawLineMap.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50, 6, cc.color(0, 128, 255, 128));
			this.drawLineMap.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50, 2, this.lineColor);
		}

		// 绘制新手村
		this.drawLineMap.drawRect(cc.p(-999, -999), cc.p(1070, 852), null, 6, cc.color(0, 255, 153, 255));
		this.drawLineMap.drawRect(cc.p(-999, -999), cc.p(1070, 852), null, 4, this.lineColor);

	},
	drawBuilding : function(data) {
		var buildingArray = eval(data);
		for ( var x in buildingArray) {
			buildingInfo = buildingArray[x];
			var build_point = cc.p(parseInt(buildingInfo.x), parseInt(buildingInfo.y));

			var build = cc.Sprite.create(buildingInfo.respath);
			build.setPosition(build_point);
			this.addChild(build);
		}
	},
	drawSignpost : function(data) {
		var signpostArray = eval(data);
		for ( var x in signpostArray) {
			signpostInfo = signpostArray[x];
			var signpost_point = cc.p(parseInt(signpostInfo.x), parseInt(signpostInfo.y));

			var fontSize = $('input:radio[name=fontsizeRadios]:checked').val();
			var fontDef = new cc.FontDefinition();
			fontDef.fontName = "font04b08";
			fontDef.fontSize = signpostInfo.fontsize;

			var labelName = new Signpost(signpostInfo.text, fontDef);
			labelName.setPosition(signpost_point);
			labelName.init();
			this.addChild(labelName);
		}
	}

});
