
window.onload = function() {

	cc.game.onStart = function() {
		LT.scc = 1.5;
		// load resources
		cc.LoaderScene.preload(g_resources, function() {

			cc.director.runScene(SceneInstance.getGameScene());
			//cc.director.runScene(new SettingScene());
			
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 13);
		}, this);
		cc.view.setDesignResolutionSize(window.screen.width, window.screen.height, cc.ResolutionPolicy.SHOW_ALL);
	};
	cc.game.run("gameCanvas");
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 13);
};
