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




	<!-- container-fluid -->
	<div class="row">
		<div class="col-md-10">
			<div class="gameCanvasBox">
				<canvas id="gameCanvas" width="1544" height="777"></canvas>
			</div>
		</div>
		<div class="col-md-2">
			<button class="button button-action button-circle">
				<span class="glyphicon glyphicon-plus"></span>
			</button>
			<button class="button button-action button-circle">
				<span class="glyphicon glyphicon-plus"></span>
			</button>
			<button class="button button-action button-circle">
				<span class="glyphicon glyphicon-plus"></span>
			</button>
			<button class="button button-action button-circle">
				<span class="glyphicon glyphicon-plus"></span>
			</button>

			<div class="form-group">
				<label for="signpostInput">路标地址</label>
				<input type="text" class="form-control" id="signpostInput">
				<br /> <label>字体大小</label>
				<div class="radio">
					<label> <input type="radio" name="fontsizeRadios"
							value="50"> 50
					</label> <label> <input type="radio" name="fontsizeRadios"
							value="45">45
					</label><label> <input type="radio" name="fontsizeRadios"
							value="35">35
					</label> <label> <input type="radio" name="fontsizeRadios"
							value="30" checked>30
					</label> <label> <input type="radio" name="fontsizeRadios"
							value="25">25
					</label> <label> <input type="radio" name="fontsizeRadios"
							value="20">20
					</label>
				</div>
				<div class="radio">
					<label> <input type="radio" name="fontsizeRadios"
							value="19"> 19
					</label> <label> <input type="radio" name="fontsizeRadios"
							value="18">18
					</label> <label> <input type="radio" name="fontsizeRadios"
							value="17">17
					</label> <label> <input type="radio" name="fontsizeRadios"
							value="16">16
					</label> <label> <input type="radio" name="fontsizeRadios"
							value="15">15
					</label> <label> <input type="radio" name="fontsizeRadios"
							value="14">14
					</label>
				</div>

			</div>
			<button class="button button-action  button-rounded  btn_point_up">
				<span class="glyphicon glyphicon-chevron-left"></span>上节点
			</button>
			<button class="button button-action button-rounded btn_point_down">
				下节点<span class="glyphicon glyphicon-chevron-right"></span>
			</button>
			<br />
		</div>
	</div>



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
	<script type="text/javascript"
		src="../api/cocos/cocos2d-js-v3.11-Full.js" charset="UTF-8"></script>
	<!-- 游戏控制器接入入口 -->
	<script type="text/javascript" src="src/core-signpostediter.js"
		charset="UTF-8"></script>

</body>
</html>
