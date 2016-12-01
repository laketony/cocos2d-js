// 点到直线的最短距离的判断 点（x0,y0） 到由两点组成的线段（x1,y1） ,( x2,y2 )
function pointToLine(x1, y1, x2, y2, x0, y0) {
	var space = 0;
	var a, b, c;
	a = lineSpace(x1, y1, x2, y2);// 线段的长度
	b = lineSpace(x1, y1, x0, y0);// (x1,y1)到点的距离
	c = lineSpace(x2, y2, x0, y0);// (x2,y2)到点的距离
	if (c <= 0.000001 || b <= 0.000001) {
		space = 0;
		return space;
	}
	if (a <= 0.000001) {
		space = b;
		return space;
	}
	if (c * c >= a * a + b * b) {
		space = b;
		return space;
	}
	if (b * b >= a * a + c * c) {
		space = c;
		return space;
	}
	var p = (a + b + c) / 2;// 半周长
	var s = Math.sqrt(p * (p - a) * (p - b) * (p - c));// 海伦公式求面积
	space = 2 * s / a;// 返回点到线的距离（利用三角形面积公式求高）
	return space;
}

// 计算两点之间的距离
function lineSpace(x1, y1, x2, y2) {
	var lineLength = 0;
	lineLength = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	return lineLength;
}

function getPointToPointRotation(x1, y1, x2, y2) {
	var deltaRotation = 90 - Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	return deltaRotation;
}

function randomColor() {
	var rcolor = Math.random() * 255;
	var gcolor = Math.random() * 255;
	var bcolor = Math.random() * 255;
	var color = cc.color(rcolor, gcolor, bcolor);
	return color;
}
function rwAdd(a, b) {
	return cc.p(a.x + b.x, a.y + b.y);
}
function rwSub(a, b) {
	return cc.p(a.x - b.x, a.y - b.y);
}

function rwMult(a, b) {
	return cc.p(a.x * b, a.y * b);
}

function rwLength(a) {
	return Math.sqrt(a.x * a.x + a.y * a.y);
}

// Makes a vector have a length of 1
function rwNormalize(a) {
	var length = rwLength(a);
	return cc.p(a.x / length, a.y / length);
}

// 已知两点，求直线
function kbline(x1, y1, x2, y2,x0,y0, long) {

	var p_word1 = cc.p(x1, y1);
	var p_word2 = cc.p(x2, y2);
	var p_local = cc.p(x0, y0);

	var offset = rwSub(p_word1, p_word2);
	cc.log(offset);
	 
	// 6 - Get the direction of where to shoot
	var direction = rwNormalize(offset);
	cc.log(direction); 
	// 7 - Make it shoot far enough to be guaranteed off screen
	var shootAmount = rwMult(direction, long);
	cc.log(shootAmount); 
	// 8 - Add the shoot amount to the current position
	var  realDest = rwAdd(shootAmount,p_local);
	cc.log(realDest); 
	return realDest;
}

//已知两点，求直线
function getX3_2(x1, y1, x2, y2,xl1) {

	var fangxiang = 1;
	if((x2-x1)<0){
		fangxiang = -1;
	}
	var long = 25;
	var x3 = fangxiang * long ; 
	return x3;
}
function getY3_2(x1, y1, x2, y2,xl1) {

	var fangxiang = 1;
	if((x2-x1)<0){
		fangxiang = -1;
	}
	var long = 25;
	var x3 = fangxiang * long +xl1;
	var y3 = getY3(x1, y1, x2, y2,x3)
	return y3;
}


//已知两点，求直线
function getY3(x1, y1, x2, y2,x3) {

	var y3 = ((y2-y1)/(x2-x1))*(x3-x1)+y1; 
	return y3;
}

function copyObj( obj ){
    // JSON解析之类的其实如果给定格式不对很容易出错滴，自己做好检验~
    return JSON.parse( JSON.stringify( obj ) );
}
