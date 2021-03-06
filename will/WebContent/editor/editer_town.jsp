<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<!-- Custom styles for this template -->
<link href="../css/townediter.css" rel="stylesheet">
<link href="../css/fonts.css" rel="stylesheet">


</head>

<body>

	<jsp:include page="titleMenu.jsp"></jsp:include>

	<div class="container"></div>
	<div class="gameCanvasBox">
		<canvas id="gameCanvas" width="1266" height="576"></canvas>
	</div>
	<hr />

	<div class="buildingBox">

		<c:forTokens
			items="jz_biaoju.png,jz_dangpu.png,jz_ganglou.png,jz_jiulou.png,jz_kezhan.png,jz_xiaomen.png,jz_xiaoyamen.png,jz_yamen.png"
			delims="," var="name">
			<img alt="${name}" src="../cocos-res/building/${name}"
				style="float: left;" class="building " />
			<p>
		</c:forTokens>

		<div class="clear"></div>
	</div>

	<hr>

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
	<script type="text/javascript"
		src="../api/cocos/cocos2d-js-v3.11-Full.js" charset="UTF-8"></script>
	<!-- 游戏控制器接入入口 -->
	<script type="text/javascript" src="src/core-townediter.js"
		charset="UTF-8"></script>
	<script type="text/javascript" src="js/townediter.js" charset="UTF-8"></script>
</body>
</html>
