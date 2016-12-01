window.onload = function() {
	cc.game.onStart = function() {
		// load resources
		cc.LoaderScene.preload(g_resources, function() {

			cc.director.runScene(new GameScene());

		}, this);
		// cc.view.setDesignResolutionSize(window.screen.width,
		// window.screen.height, cc.ResolutionPolicy.SHOW_ALL);
		// width="1100" height="618"
		cc.view.setDesignResolutionSize(2200, 1236,
				cc.ResolutionPolicy.SHOW_ALL);

	};
	cc.game.run("gameCanvas");
};
