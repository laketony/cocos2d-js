window.onload = function() {

	cc.game.onStart = function() {
		// load resources
		// 357*667
		// 414*736
		// 828, 1472,
		var s = "";
		s += " 屏幕分辨率的高：" + window.screen.height;
		s += " 屏幕分辨率的宽：" + window.screen.width;
		s += " 屏幕可用工作区高度：" + window.screen.availHeight;
		s += " 屏幕可用工作区宽度：" + window.screen.availWidth;

		// alert(s);
		LT.scc = 1.5;
		cc.view.setDesignResolutionSize(window.screen.availWidth, window.screen.availHeight,
				cc.ResolutionPolicy.FIXED_WIDTH);
		cc.LoaderScene.preload(g_resources, function() {

			cc.director.runScene(new GameScene());
		}, this);

	};
	cc.game.run("gameCanvas");

};
