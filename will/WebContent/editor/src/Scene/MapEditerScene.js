var MapEditerScene = cc.Scene.extend({
	a1Layer : null,
	w1Layer : null,
	onEnter : function() {
		this._super();

		var winsize = cc.director.getWinSize();

		// create the background image and position it at the center of screen
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		var worldMapLayerColor = new cc.LayerColor(cc.color(0, 0, 0),
				winsize.width, winsize.height);
		this.addChild(worldMapLayerColor);

		this.a1Layer = new EditerMapLayer();
		this.a1Layer.setPosition(centerPos);
		this.addChild(this.a1Layer);

		this.w1Layer = new EditerMapWindowLayer();
		this.w1Layer.setPosition(0, 0);
		this.w1Layer.delegate = this.a1Layer;
		this.addChild(this.w1Layer);
	}
});
