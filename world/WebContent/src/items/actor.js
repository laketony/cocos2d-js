var Actor = cc.Node.extend({
	_respath : null,
	pysBodySprite : null,

	ctor : function(iTextRes) {
		this._super();
		if (iTextRes) {
			this._respath = iTextRes;
		}
		this.init();
	},
	init : function() {
		this.pysBodySprite = new cc.Sprite(this._respath);
		this.pysBodySprite.setAnchorPoint(0.5, 0);
		this.addChild(this.pysBodySprite);

	}
});