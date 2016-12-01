var MapNode = cc.DrawNode.extend({
	lines : {},
	lineColor : cc.color(152, 245, 255, 128),
	ctor : function(mapLines) {
		this._super();
		this.lines = mapLines;
		this.init();

	},
	// 添加自己的属性和方法
	init : function() {
		var lineColor = this.lineColor
		this.setContentSize(50, 50);
		// drawDot --- 绘制圆点
		this.drawDot(cc.p(0, 0), 5, lineColor);
		this.penLine
	},
	penLine : function() {
		for ( var index in lines) {

			var lineItem = this.lines[index];
			if (lineItem.type = "line") {
				console.log("line");
				this.drawLinePen.drawSegment(pointFrom, pointTo, 2, this.lineColor);
			} else {
				console.log("bezier");
				// origin, control, destination
				this.drawLinePen.drawQuadBezier(pointFrom, pointCtrl, pointTo, 50, 2, this.lineColor);
			}
		}

	},
	addLine : function(lineItem) {
		this.lines.push(lineItem);
		this.penLine();
	}
});
var MapItemNode = cc.DrawNode.extend({
	lineColor : cc.color(0, 255, 255, 128),
	ctor : function(ilineColor) {
		this._super();
		if (ilineColor != undefined) {
			this.lineColor = lineColor;
		}
		this.init();

	},
	// 添加自己的属性和方法
	init : function() {
		var lineColor = this.lineColor
		var r = 5;
		// drawDot --- 绘制圆点
		this.drawDot(cc.p(0, 0), r, lineColor);
		this.setContentSize(2 * r, 2 * r);
	}
});
var MapItemDot = MapItemNode.extend({

	// 添加自己的属性和方法
	init : function() {
		this._super();
		var r = 5;
		// drawCircle --- 绘制圆形
		this.drawDot(cc.p(0, 0), 15, this.lineColor);
		this.setContentSize(2 * r, 2 * r);

		var pointLB = cc.p(-50, -50);// 左下
		var pointRT = cc.p(50, 50);// 右上
		this.drawRect(pointLB, pointRT, null, 2, this.lineColor);
	}
});

var MapItemCircle = MapItemNode.extend({

	// 添加自己的属性和方法
	init : function() {
		this._super();

		var r = 20;
		// drawCircle --- 绘制圆形
		this.drawCircle(cc.p(0, 0), r, 0, 100, false, 5, this.lineColor);
		this.setContentSize(2 * r, 2 * r);
		this.drawCircle(cc.p(0, 0), r, 0, 100, false, 5, this.lineColor);

		var pointLB = cc.p(-50, -50);// 左下
		var pointRT = cc.p(50, 50);// 右上
		this.drawRect(pointLB, pointRT, null, 2, this.lineColor);
	}
});

//
// drawSegment --- 绘制直线
// this.drawSegment(cc.p(0, 0), cc.p(100, 0), 1, lineColor);
