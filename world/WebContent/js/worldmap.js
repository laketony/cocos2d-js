$(document).ready(function() {
	$(".worldmap").click(function(ev) {
		var point = getMousePos(ev);
		var oLeft = point.x + 'px';
		var oTop = point.y + 'px';
		console.log("" + oTop + ',' + oLeft);
	});
});
function getMousePos(event) {
	var e = event || window.event;
	var scrollX = document.documentElement.scrollLeft
			|| document.body.scrollLeft;
	var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	var x = e.pageX || e.clientX + scrollX;
	var y = e.pageY || e.clientY + scrollY;
	return {
		'x' : x,
		'y' : y
	};
}

document.onclick = function(ev) {
	var point = getMousePos(ev);
	console.log(point.x + ',' + point.y)

}

window.onload = function() {
	location.hash = "start";
};
document.onmousemove = function(ev) {
	var point = getMousePos(ev);
	var posx = point.x;
	var posy = point.y;
	$(".mose").css("left", posx + "px");
	$(".mose").css("top", posy + "px");
}