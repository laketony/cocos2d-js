<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>
<!DOCTYPE html PUBLIC >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<!-- Bootstrap core CSS -->
<link href="../api/css/bootstrap.min.css" rel="stylesheet">
<link href="../api/css/buttons.css" rel="stylesheet">
<!-- Custom styles for this template -->

<link href="css/fonts.css" rel="stylesheet">

<link href="css/index.css" rel="stylesheet">
</head>
<body>
	<jsp:include page="titleMenu.jsp"></jsp:include>
	<div class="container">
		<c:forEach var="i" begin="0" end="5">
			<div class="row">
				<c:forEach var="j" begin="1" end="6">
					<div class="col-md-2">
						<div class="thumbnail">
							<img class="panel-profile-img"
								src="../cocos-res/TX580/object_${i*6+j}.png">

							<div class="caption text-center">
								<h3 class="panel-title">对象</h3>
								<p>object_${i*6+j}.png</p>
								<p>${i }${j }</p>
								<p>。。。。。。。。。。</p>
								<p>
									<a href="#" class="btn btn-primary-outline btn-sm m-b"> <span
										class="icon icon-add-user"></span> View GitHub
									</a>
								</p>
							</div>
						</div>
					</div>
				</c:forEach>
			</div>
		</c:forEach>
	</div>
	<hr />
	<div class="container">
		<c:forEach var="i" begin="0" end="7">
			<div class="row">
				<c:forEach var="j" begin="1" end="6">
					<div class="col-md-2">
						<div class="thumbnail">
							<img class="panel-profile-img"
								src="../cocos-res/TX580/deco_${i*6+j}.png">

							<div class="caption text-center">
								<h3 class="panel-title">装饰</h3>
								<p>deco_${i*6+j}</p>
								<p>${i }${j }</p>
								<p>。。。。。。。。。。</p>
								<p>
									<a href="#" class="btn btn-primary-outline btn-sm m-b"> <span
										class="icon icon-add-user"></span> View GitHub
									</a>
								</p>
							</div>
						</div>
					</div>
				</c:forEach>
			</div>
		</c:forEach>
	</div>
</body>
</html>