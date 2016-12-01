window.onload = function() {
	cc.game.onStart = function() {
		// load resources
		cc.LoaderScene.preload(g_resources, function() {

			cc.director.runScene(new SignpostEditerScene());
		}, this);
		LT.signpostInput = $("#signpostInput");
	};
	cc.game.run("gameCanvas");

};
