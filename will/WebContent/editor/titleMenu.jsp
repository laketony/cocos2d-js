<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<nav class="navbar navbar-inverse">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#navbar" aria-expanded="false"
				aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Will US</a>
		</div>


		<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav">
				<li><a href="../index.html">游戏页</a></li>
				<li><a href="editer_map.jsp">路政编辑</a></li>
				<li><a href="editer_map2.jsp">路政编辑2</a></li>
				<li><a href="editer_signpost.jsp">路标编辑</a></li>
				<li><a href="editer_town.jsp">城镇编辑</a></li>
				<li><a href="about.jsp">联系我们</a></li>
			</ul>
			<form class="navbar-form navbar-right">
				<div class="form-group">
					<input type="password" placeholder="Password" class="form-control">
				</div>
				<button type="submit" class="btn btn-success">Sign in</button>
			</form>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#" class="dropdown-toggle" data-toggle="dropdown"
						role="button" aria-haspopup="true" aria-expanded="false">
						<span class="glyphicon glyphicon-tasks" aria-hidden="true"></span>
						存活2015天
					</a>
					<ul class="dropdown-menu">
						<li><a href="#">
								<span class="lebBar" aria-hidden="true">HP</span> 2511/10000
							</a></li>
						<li><a href="#">
								<span class="lebBar" aria-hidden="true">MP</span> 2511/10000
							</a></li>
						<li><a href="#">
								<span class="lebBar" aria-hidden="true">BP</span> 154/524
							</a></li>
						<li role="separator" class="divider"></li>
						<li class="dropdown-header">Nav header</li>
						<li><a href="calendar.html">Separated link</a></li>
					</ul></li>
			</ul>
		</div>
		<!--/.navbar-collapse -->
	</div>
</nav>