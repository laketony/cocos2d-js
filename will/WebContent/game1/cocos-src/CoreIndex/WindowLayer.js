var WindowLayer = cc.Layer
		.extend({
			ctor : function() {
				this._super();

				this.init();
			},
			labelBR : cc.LabelTTF.create("写点提示", "Transformers_Movie", 15),
			labelTL : cc.LabelTTF.create("写点提示", "Transformers_Movie", 15),

			labelTR : cc.LabelTTF.create("基本状态", "Transformers_Movie", 12),
			labelTR1 : cc.LabelTTF
					.create("HP 134123", "Transformers_Movie", 25),
			labelTR2 : cc.LabelTTF
					.create("MP 134123", "Transformers_Movie", 25),
			labelTR3 : cc.LabelTTF
					.create("DP 134123", "Transformers_Movie", 25),
			init : function() {
				this._super();
				var winsize = cc.director.getWinSize();

				// create the background image and position it at the center of
				// screen
				var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

				this.labelTL.setAnchorPoint(cc.p(0.0, 1.0));
				this.labelTL.setPosition(cc.p(0 + 1, winsize.height - 1));
				this.addChild(this.labelTL, 1);
				this.labelBR.setAnchorPoint(cc.p(1.0, 0.0));
				this.labelBR.setPosition(cc.p(winsize.width - 1, 0));
				this.addChild(this.labelBR, 1);

				this.labelTR.setAnchorPoint(cc.p(1.0, 1.0));
				this.labelTR.setPosition(cc.p(winsize.width - 1,
						winsize.height - 1));
				this.addChild(this.labelTR, 1);

				this.labelTR1.setAnchorPoint(cc.p(1.0, 1.0));
				this.labelTR1.setPosition(cc.p(winsize.width - 1,
						winsize.height - 15));
				this.addChild(this.labelTR1, 1);

				this.labelTR2.setAnchorPoint(cc.p(1.0, 1.0));
				this.labelTR2.setPosition(cc.p(winsize.width - 1,
						winsize.height - 35));
				this.addChild(this.labelTR2, 1);

				this.labelTR3.setAnchorPoint(cc.p(1.0, 1.0));
				this.labelTR3.setPosition(cc.p(winsize.width - 1,
						winsize.height - 55));
				this.addChild(this.labelTR3, 1);

			}

		});
