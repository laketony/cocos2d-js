window.onload = function() {
	cc.game.onStart = function() {
		// load resources
		cc.LoaderScene.preload(g_resources, function() {

			cc.director.runScene(new TownEditerScene());
		}, this);
	};
	cc.game.run("gameCanvas");
};
