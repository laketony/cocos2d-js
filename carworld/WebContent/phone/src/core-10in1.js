window.onload = function() {
	cc.game.onStart = function() {
		cc.view.setDesignResolutionSize(375 * 2, 667 * 2, cc.ResolutionPolicy.SHOW_ALL);
		// load resources
		cc.LoaderScene.preload(g_resources, function() {

			cc.director.runScene(new GameScene());

		}, this);

	};
	cc.game.run("gameCanvas");
};
