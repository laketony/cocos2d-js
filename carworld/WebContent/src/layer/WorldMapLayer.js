var WorldMapLayer = cc.Layer.extend({
	drawLineMap : cc.DrawNode.create(),
	lineArraySet : [],
	ctor : function() {
		this._super();
		this.init();
	},

	init : function() {
		this._super();

//		var singularity = new cc.Sprite(hello);
//		singularity.setPosition(cc.p(0, 0));
//		this.addChild(singularity);

		this.addChild(this.drawLineMap);
		ltgv.lineArraySet = this.lineArraySet;
		this.loadDB();
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
	},
	drawMap : function(data) {
		var lineArray = eval(data);
		this.lineArraySet.push(lineArray);

		for ( var x in lineArray) {
			lineInfo = lineArray[x];
			var pointFrom = cc.p(parseInt(lineInfo.l_from_x),
					parseInt(lineInfo.l_from_y));
			var pointTo = cc.p(parseInt(lineInfo.l_to_x),
					parseInt(lineInfo.l_to_y));
			var pointCtrl = cc.p(parseInt(lineInfo.l_ctrl_x),
					parseInt(lineInfo.l_ctrl_y));
			this.drawLineMap.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50,
					6, cc.color(0, 128, 255, 128));
			this.drawLineMap.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50,
					2, this.lineColor);
		}
	},
	drawBuilding : function(data) {
		var buildingArray = eval(data);
		for ( var x in buildingArray) {
			buildingInfo = buildingArray[x];
			var build_point = cc.p(parseInt(buildingInfo.x),
					parseInt(buildingInfo.y));

			var build = cc.Sprite.create(buildingInfo.respath);
			build.setPosition(build_point);
			this.addChild(build);
		}
	}

});
