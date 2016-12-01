function demo1() {
	var clippingNode = cc.ClippingNode.create();
	
	var stencil = cc.Sprite.create(this.s_Spark );
	clippingNode.setStencil(stencil); 
	
	var content = cc.Sprite.create(this.s_Ghost_mip );
	
	clippingNode.addChild(content); // 设置底板
	clippingNode.setInverted( false );
	clippingNode.setAlphaThreshold(0.05);

	return clippingNode;
}