var TilesItem = cc.Node.extend({
	texture : null,
	rect : null,
	tilesBody : null,
	drawNode : null,
	ctor : function(itexture, irect) {
		this._super();
		if (itexture) {
			this.texture = itexture
		}
		if (irect) {
			this.rect = irect;
		}
		this.init();
	},
	init : function() {
		this.tilesBody = new cc.Sprite(this.texture, this.rect);
		this.tilesBody.zIndex = -10;
		this.addChild(this.tilesBody);
	},
	setTextureRect : function(rectss) {
		if (rectss) {
			this.rect = rectss;
		}
		this.tilesBody.setTextureRect(rectss);
	},
	setTexture : function(texture) {
		if (texture) {
			this.texture = texture
		}
		this.tilesBody.setTexture(texture);
	}
});
