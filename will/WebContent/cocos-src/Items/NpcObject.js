var NpcObject = cc.Node.extend({
	labelName : null,
	clock : 0,
	npcSprite : null,

	_id : 0,
	_npc_name : "",
	_respath : res_npc.npc1,

	wuqiBean : {},

	ctor : function(iTextRes) {
		this._super();
		if (iTextRes) {
			this._respath = iTextRes;
		}
		this.init();
	},
	init : function() {

		this.npcSprite = new cc.Sprite(this._respath);
		this.npcSprite.setAnchorPoint(0.5, 0);
		this.addChild(this.npcSprite);

		this.labelName = cc.LabelTTF.create("人物名")
		this.labelName.setPosition(cc.p(0, -15));
		this.addChild(this.labelName);

	},
	setNpcName : function(iName) {
		this._npc_name = iName;
		this.labelName.string = this._npc_name;
	},
});
