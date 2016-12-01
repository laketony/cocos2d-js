$(document).ready(function() {

	$(".building").click(function() {
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		console.log($(this).attr("src"));
		cc.glLtdata = new Object();
		cc.glLtdata.SelectBuildRes = $(this).attr("src");
	});
});
