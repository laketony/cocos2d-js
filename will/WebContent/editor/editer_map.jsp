<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<meta name="description" content="">
<meta name="author" content="">
<link rel="icon" href="../../favicon.ico">

<title>Jumbotron Template for Bootstrap</title>

<!-- Bootstrap core CSS -->
<link href="../api/css/bootstrap.min.css" rel="stylesheet">
<link href="../api/css/buttons.css" rel="stylesheet">
<!-- Custom styles for this template -->
<link href="../css/index.css" rel="stylesheet">
<link href="../css/fonts.css" rel="stylesheet">


</head>

<body>

	<jsp:include page="titleMenu.jsp"></jsp:include>

	<div class="gameCanvasBox">
		<canvas id="gameCanvas" width="1280" height="720"></canvas>
	</div>
	<div></div>
	<br />
	<div class="container">
		<button class="button button-action  button-rounded  btn_point_up">
			<span class="glyphicon glyphicon-chevron-left"></span>上节点
		</button>
		<button class="button button-action  button-rounded ">Go</button>
		<button class="button button-action button-rounded btn_point_down">
			下节点<span class="glyphicon glyphicon-chevron-right"></span>
		</button>
	</div>
	<hr>
	<button class="button button-action button-square">
		<span class="glyphicon glyphicon-plus"></span>
	</button>

	<button class="button button-action button-box">
		<span class="glyphicon glyphicon-plus"></span>
	</button>
	<button class="button button-action button-circle">
		<span class="glyphicon glyphicon-plus"></span>
	</button>
	<hr>

	<div class="container">
		<footer>
			<p>&copy; Company 2014</p>
		</footer>
	</div>
	<!-- /container -->


	<!-- Bootstrap core JavaScript
    ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script type="text/javascript" src="../api/js/jquery.min.js"></script>
	<script type="text/javascript" src="../api/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="../api/cocos/cocos2d-js-v3.11-Full.js"
		charset="UTF-8"></script>
	<!-- 游戏控制器接入入口 -->
	<script type="text/javascript" src="src/core-mapediter.js"
		charset="UTF-8"></script>
</body>
</html>
