package cn.laketony.action;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.laketony.dao.DaoSignpost;
import cn.laketony.dto.Signpost;

/**
 * Servlet implementation class AddSignpost
 */
@WebServlet({"/AddSignpost","/editor/AddSignpost"})
public class AddSignpost extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AddSignpost() {
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

		String x = request.getParameter("x");
		String y = request.getParameter("y");
		String text = request.getParameter("text");
		String fontsize = request.getParameter("fontsize");

		Signpost signpost = new Signpost();
		signpost.initWith(x, y, text, fontsize);
		DaoSignpost.fx().addSignpost(signpost);

	}

}
