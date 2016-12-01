<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>
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

<title>PointList</title>



<!-- Bootstrap core CSS -->
<link href="api/css/bootstrap.min.css" rel="stylesheet">
<!-- Custom styles for this template -->
<link href="css/fonts.css" rel="stylesheet">

</head>

<body>

	<jsp:include page="titleMenu.jsp"></jsp:include>



	<div class="container">
		<!-- Example row of columns -->
		<div class="row">
 
			<table border="1" width="100%">
         			<tr>
         				<th>PointId</th>
						<th>l_frome_x</th>
						<th>l_from_y</th>
						<th>l_to_x</th>
						<th>l_to_y</th>
						<th>l_ctrl_x</th>
						<th>l_ctrl_y</th>
					</tr>
				<sql:query var="result" dataSource="jdbc/DBPOOL_willwords"> 
              		SELECT * FROM `LineMap` LIMIT 0, 1000;
         		</sql:query>

				<c:forEach var="row" items="${result.rows}">
					<tr>
						<td>${row.autoid}</td>
						<td>${row.l_from_x}</td>
						<td>${row.l_from_y}</td>
						<td>${row.l_to_x}</td>
						<td>${row.l_to_y}</td>
						<td>${row.l_ctrl_x}</td>
						<td>${row.l_ctrl_y}</td>
					</tr>
				</c:forEach>
			</table>
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
	<script type="text/javascript" src="api/js/jquery.min.js"></script>
	<script type="text/javascript" src="api/js/bootstrap.min.js"></script>
</body>
</html>
