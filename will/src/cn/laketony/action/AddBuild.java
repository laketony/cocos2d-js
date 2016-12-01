package cn.laketony.action;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.laketony.dao.DaoBuilding;

/**
 * Servlet implementation class AddLine
 */
@WebServlet({"/AddBuild","/editor/AddBuild"})
public class AddBuild extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AddBuild() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String l_build_x = request.getParameter("l_build_x");
		String l_build_y = request.getParameter("l_build_y");
		String l_build_res = request.getParameter("l_build_res");

		DaoBuilding.fx().insertInfo(l_build_x, l_build_y, l_build_res);

		

	}

}
