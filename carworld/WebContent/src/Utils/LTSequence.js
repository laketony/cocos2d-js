function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 顺序地执行动作。
 * @class
 * @extends cc.ActionInterval
 * @param {Array|cc.FiniteTimeAction} tempArray
 * @example
 * // 使用动作创建序列
 * var seq = new cc.Sequence(act1, act2);
 *
 * // 使用数组创建序列
 * var seq = new cc.Sequence(actArray);
 */
cc.Sequence = cc.ActionInterval.extend(/** @lends cc.Sequence# */{
    _actions:null,
    _split:null,
    _last:0,

	/**
     	 * 构造函数，重载它以扩展构造函数的行为，记得在扩展的“ctor”方法中调用“this._super()”。<br />
     	 * 创建一组顺序执行的动作序列。
	 * @param {Array|cc.FiniteTimeAction} tempArray
	 */
    ctor:function (tempArray) {
        cc.ActionInterval.prototype.ctor.call(this);
        this._actions = [];
        //LT改
		//var paramArray = (tempArray instanceof Array) ? tempArray : arguments;
        var paraArray = (isArray(tempArray)) ? tempArray : arguments;
        var last = paramArray.length - 1;
		if ((last >= 0) && (paramArray[last] == null))
			cc.log("parameters should not be ending with null in Javascript");

        if (last >= 0) {
            var prev = paramArray[0], action1;
            for (var i = 1; i < last; i++) {
                if (paramArray[i]) {
                    action1 = prev;
                    prev = cc.Sequence._actionOneTwo(action1, paramArray[i]);
                }
            }
            this.initWithTwoActions(prev, paramArray[last]);
        }
    },

    /**
     * 初始化这个动作。 <br/>
     * @param {cc.FiniteTimeAction} actionOne
     * @param {cc.FiniteTimeAction} actionTwo
     * @return {Boolean}
     */
    initWithTwoActions:function (actionOne, actionTwo) {
        if(!actionOne || !actionTwo)
            throw "cc.Sequence.initWithTwoActions(): arguments must all be non nil";

        var d = actionOne._duration + actionTwo._duration;
        this.initWithDuration(d);

        this._actions[0] = actionOne;
        this._actions[1] = actionTwo;
        return true;
    },

    /**
     * 返回动作的克隆对象。
     * @returns {cc.Sequence}
     */
    clone:function () {
        var action = new cc.Sequence();
        this._cloneDecoration(action);
        action.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
        return action;
    },

    /**
     * 指定目标，并且开始动作。
     * @param {cc.Node} target
     */
    startWithTarget:function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
        this._split = this._actions[0]._duration / this._duration;
        this._last = -1;
    },

    /**
     * 停止动作。
     */
    stop:function () {
        // Issue #1305
        if (this._last !== -1)
            this._actions[this._last].stop();
        cc.Action.prototype.stop.call(this);
    },

    /**
     * 每帧调用一次。时间是两帧之间间隔的秒数。
     * @param {Number}  dt
     */
    update:function (dt) {
        dt = this._computeEaseTime(dt);
        var new_t, found = 0;
        var locSplit = this._split, locActions = this._actions, locLast = this._last;
        if (dt < locSplit) {
            // action[0]
            new_t = (locSplit !== 0) ? dt / locSplit : 1;

            if (found === 0 && locLast === 1) {
                // Reverse mode ?
                // XXX: Bug. this case doesn't contemplate when _last==-1, found=0 and in "reverse mode"
                // since it will require a hack to know if an action is on reverse mode or not.
                // "step" should be overriden, and the "reverseMode" value propagated to inner Sequences.
                locActions[1].update(0);
                locActions[1].stop();
            }
        } else {
            // action[1]
            found = 1;
            new_t = (locSplit === 1) ? 1 : (dt - locSplit) / (1 - locSplit);

            if (locLast === -1) {
                // action[0] was skipped, execute it.
                locActions[0].startWithTarget(this.target);
                locActions[0].update(1);
                locActions[0].stop();
            }
            if (!locLast) {
                // switching to action 1. stop action 0.
                locActions[0].update(1);
                locActions[0].stop();
            }
        }

        // Last action found and it is done.
        if (locLast === found && locActions[found].isDone())
            return;

        // Last action found and it is done
        if (locLast !== found)
            locActions[found].startWithTarget(this.target);

        locActions[found].update(new_t);
        this._last = found;
    },

    /**
     * 返回一个反转的动作。
     * @return {cc.Sequence}
     */
    reverse:function () {
        var action = cc.Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());
        this._cloneDecoration(action);
        this._reverseEaseList(action);
        return action;
    }
});