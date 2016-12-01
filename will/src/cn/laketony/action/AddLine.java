package cn.laketony.action;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.laketony.dao.DaoLinePoint;
import cn.laketony.dto.LineBean;

/**
 * Servlet implementation class AddLine
 */
@WebServlet({"/AddLine","/editor/AddLine"})
public class AddLine extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AddLine() {
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
		String l_from_x = request.getParameter("l_from_x");
		String l_from_y = request.getParameter("l_from_y");
		String l_to_x = request.getParameter("l_to_x");
		String l_to_y = request.getParameter("l_to_y");
		String l_ctrl_x = request.getParameter("l_ctrl_x");
		String l_ctrl_y = request.getParameter("l_ctrl_y"); 
		LineBean line = new LineBean(l_from_x, l_from_y, l_to_x, l_to_y, l_ctrl_x, l_ctrl_y);
		DaoLinePoint.fx().insert(line); 
	}

}
