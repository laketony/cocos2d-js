/**
 * 远程攻击炮弹 玩家射击向怪兽的子弹
 * 
 */
var PaoDanBase = cc.Sprite.extend({
	at : 1,
	imageUriArray : null,
	ctor : function(inImageArray) {

		// 自定义初始化
		if (inImageArray == undefined || inImageArray == null) {
			inImageArray = res_jineng.A1;
		}
		this.imageUriArray = inImageArray;
		this._super(this.imageUriArray[0]);
		this.init();
	},
	// 添加自己的属性和方法
	init : function() {
		var spr_dao = new cc.Sprite(qiangList.qiang1);
		spr_dao.setAnchorPoint(0.35, 0.5);
		spr_dao.setRotation(-65);
		spr_dao.setPosition(80, 140);
		spr_dao.delegate = this;
		this.addChild(spr_dao);

		var draw = new cc.DrawNode();
		// spr_dao.anchorX*spr_dao.width, spr_dao.anchorY*spr_dao.height
		draw.setPosition(spr_dao.anchorX * spr_dao.width, spr_dao.anchorY
				* spr_dao.height);
		draw.drawDot(cc.p(0, 0), 45, cc.color(0, 0, 255, 128));
		draw.drawSegment(cc.p(0, 0), cc.p(
				spr_dao.anchorX * spr_dao.width * 0.5, spr_dao.anchorY
						* spr_dao.height * 0.5), 1, cc
				.color(255, 255, 255, 255));

		spr_dao.addChild(draw);

		var spr_dao1 = new cc.Sprite(qiangList.qiang1);
		spr_dao1.setAnchorPoint(0.35, 0.5);
		spr_dao1.setPosition(340, 140);
		spr_dao1.setScaleY(-1);
		spr_dao1.setRotation(-107);
		spr_dao1.delegate = this;
		this.addChild(spr_dao1);

		var draw1 = new cc.DrawNode();
		// spr_dao.anchorX*spr_dao.width, spr_dao.anchorY*spr_dao.height
		draw1.setPosition(spr_dao1.anchorX * spr_dao1.width, spr_dao1.anchorY
				* spr_dao1.height);
		draw1.drawDot(cc.p(0, 0), 45, cc.color(0, 0, 255, 128));
		draw1.drawSegment(cc.p(0, 0), cc.p(spr_dao.anchorX * spr_dao.width
				* 0.5, spr_dao.anchorY * spr_dao.height * 0.5), 1, cc.color(
				255, 255, 255, 255));
		spr_dao1.addChild(draw1);
	}
});
/**
 * 远程攻击炮弹 玩家射击向怪兽的子弹
 * 
 */
var DoorBase = cc.Sprite.extend({
	at : 1,
	imageUriArray : null,
	bean:null,
	ctor : function(bean) {
		this.bean = bean;
		this._super(bean.texture);
		this.init(bean.texture);
	},
	// 添加自己的属性和方法
	init : function(texture) {
		this._super(texture);
		var doorBean = this.bean;
		
		var war_bingdao = new cc.Sprite(doorBean.texture); 
		war_bingdao.setPosition(this.width/2,this.height/2);
		war_bingdao.zIndex = -1;
		
		var fontDef = new cc.FontDefinition();
		fontDef.fontName = "fontZi";
		fontDef.fontSize = "32";
		
		var myLabel = new cc.LabelTTF(doorBean.name, fontDef);
		myLabel.setAnchorPoint(0.5, 1);
		myLabel.setPosition(war_bingdao.width / 2, 0);
		this.addChild(myLabel);
		
		var actionBy = cc.moveBy(1, cc.p(0, 7));
		var actionByBack = actionBy.reverse();
		var fudong = cc.sequence(actionBy, actionByBack).repeatForever();

		
		this.addChild(war_bingdao);
		war_bingdao.runAction(fudong);
	}
});

