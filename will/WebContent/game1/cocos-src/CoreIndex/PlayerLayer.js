var PlayerLayer = cc.Layer.extend({

	attackFrom : cc.p(-10000, -100000),
	attackTo : cc.p(-10000, -100000),
	ctor : function() {
		this._super();

		this.init();
	},

	init : function() {
		this._super();

		var singularity = new cc.Sprite(res.player1);
		singularity.setPosition(cc.p(0, 0));
		this.addChild(singularity);
		
		cc.eventManager.addListener(this.listener_mouse, this);

		this.schedule(this.timeCallback, 2);

	},
	timeCallback : function() {

		var array = [ this.attackFrom, this.attackTo ];
		console.log(array);
		var drawNode1 = cc.DrawNode.create();
		this.addChild(drawNode1);
		drawNode1.drawCardinalSpline(array, 1, 100, 1);

		var res_js_keys = Object.keys(res_jianshi);
		var paodanType = Math.ceil(Math.random() * res_js_keys.length);

		for (var i = 0; i < 10; i++) {

			var x1 = this.attackFrom.x;
			var y1 = this.attackFrom.y;
//			var x2 = this.attackFrom.x - this.attackTo.x;
//			var y2 = this.attackFrom.y - this.attackTo.y;
			var x2 =  this.attackTo.x;
			var y2 =  this.attackTo.y;
			
			var zeroPointLeg = pointToLine(0,0,x1,y1,x2,y2);
			console.log(zeroPointLeg)
			console.log(this.attackTo)
			console.log(x1 + " " + y1 + " " + x2 + " " + y2)
			var paodan2 = new JianShiBase(res_jianshi[res_js_keys[paodanType]]);
			paodan2.setPosition(this.attackFrom);
			paodan2.setScale(0.3 * 2);

			var deltaRotation = 90 - Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
			paodan2.setRotation(deltaRotation);

			this.addChild(paodan2);

			var delay = cc.delayTime(0.55 * i);
			var delay025 = cc.delayTime(0.25);
			var action1 = cc.moveTo(2, cc.p(x2, y2));
			var reverse1 = action1.reverse();
			var removeSelfAction = new cc.RemoveSelf(false);
			var seq = cc.sequence(delay, action1, delay025, removeSelfAction);

			paodan2.runAction(seq);

		}
	},
	// 创建一个事件监听器 OneByOne 为单点触摸
	listener_mouse : cc.EventListener.create({
		event : cc.EventListener.MOUSE,
		onMouseUp : function(event) {
			var target = event.getCurrentTarget();
			target.attackTo = target.convertToNodeSpace(event.getLocation());
		},
		onMouseDown : function(event) {
			var str = "Mouse Down detected, Key: " + event.getButton() + event.getLocation();
			// do something...
			console.log(str);
			var target = event.getCurrentTarget();
			target.attackFrom = target.convertToNodeSpace(event.getLocation());

		}
	})

});
