var PlayerLayer = cc.Layer.extend({
	myRoomChara:null,
	ctor : function() {
		this._super();
		this.init();
	},

	init : function() {
		this._super();
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
		
		

	}

});



