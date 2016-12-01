$(document).ready(function() {
	$(".btn_point_up").click(function() {
		var size = $('input:radio[name=fontsizeRadios]:checked').val();
		console.log(size);
	});
});