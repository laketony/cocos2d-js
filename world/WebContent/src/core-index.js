window.onload = function() {

	cc.game.onStart = function() {
		// load resources
		cc.view
				.setDesignResolutionSize(640, 1136,
						cc.ResolutionPolicy.SHOW_ALL);

		cc.LoaderScene.preload(g_resources, function() {
			cc.director.runScene(new GameScene());
		}, this);
	};
	cc.game.run("gameCanvas");
};
