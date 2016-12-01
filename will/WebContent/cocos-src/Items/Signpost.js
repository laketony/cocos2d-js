/**
 * 路标
 * 
 * */
var Signpost = cc.LabelTTF.extend({
	boder : 4,
	init : function() {

		var draw1 = new cc.DrawNode();
		// draw1.setPosition(spr_dao1.anchorX * spr_dao1.width, spr_dao1.anchorY
		// * spr_dao1.height);
		// drawRect(origin, destination, fillColor, lineWidth, lineColor)
		var boderWidth = this.boder;//边距数值
		var pointLB = cc.p(-boderWidth, -boderWidth);//左下
		var pointRT = cc.p(this.width + boderWidth, this.height + boderWidth);//右上
		var backageColor = cc.color(33, 33, 33, 128);//背景色 黑晶
		var miaobian = cc.color(255, 255, 255, 255);//外框白
		var miaobianWai = cc.color(0, 0, 255, 128);//外发光兰

		draw1.drawRect(pointLB, pointRT, null, 5, miaobianWai);
		draw1.drawRect(pointLB, pointRT, backageColor, 3, miaobian);

		this.addChild(draw1, -1);
	}
});
