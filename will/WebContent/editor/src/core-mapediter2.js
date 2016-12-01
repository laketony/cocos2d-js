window.onload = function() {
	cc.game.onStart = function() {

		// load resources
		cc.LoaderScene.preload(g_resources, function() {

			cc.director.runScene(new MapEditerScene2());
		}, this);
	};
	cc.game.run("gameCanvas");
};
