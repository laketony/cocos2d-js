var flipXAction = cc.flipX(true);
var flipX1Action = cc.flipX(false);
var flipYAction = cc.flipY(true);
var flipY1Action = cc.flipY(false);

this.labelName.runAction(cc.repeatForever(cc.sequence([//
cc.delayTime(0.5),//
flipXAction, //
cc.delayTime(0.5),//
flipYAction, //
cc.delayTime(0.5), //
flipX1Action,//
cc.delayTime(0.5), //
flipY1Action ])));