window.onload = function() {

	cc.game.onStart = function() {
		// load resources
		// 414*736
		cc.view
				.setDesignResolutionSize(828, 1472,
						cc.ResolutionPolicy.SHOW_ALL);
		cc.LoaderScene.preload(g_resources, function() {

			cc.director.runScene(new GameScene());
		}, this);

	};
	cc.game.run("gameCanvas");

};
