var fangxiangpan = cc.Node.extend({
	delegate : null,
	drawNode : null,
	carBody : null,
	car_speed : 0,
	car_acceleration : 0,
	textureCar : res.car1,
	ctor : function(itextureCar) {
		this._super();

		if (itextureCar) {
			this.textureCar = itextureCar;
		}
		this.init();
	},
	init : function() {

		this._monsterArray = new Array();

		this.carBody = new cc.Sprite(this.textureCar);
		this.addChild(this.carBody);

		this.drawNode = cc.DrawNode.create();
		this.drawNode.setPosition(cc.p(0, 0));
		this.drawNode.drawCircle(cc.p(0, 0), this.existenceRadius, 0, 100,
				false, 2, cc.color(128, 128, 128, 128));
		this.addChild(this.drawNode);

		var draw = this.drawNode;
		var r = 250;
		var color_a = cc.color(255, 255, 255, 255);
		// drawCircle
		draw.drawCircle(cc.p(0, 0), r, 0, 50, false, 4, color_a);

		var vertices2 = [ cc.p(r, 0), cc.p(-r / 2, r * (Math.sqrt(3) / 2)),
				cc.p(-r / 2, -r * (Math.sqrt(3) / 2)) ];
		draw.drawPoly(vertices2, null, 2, color_a);
		console.log(Math.sqrt(3));
	},
	setTexture : function(tt) {
		console.log(tt);
		this.carBody.setTexture(tt);
	}

});
