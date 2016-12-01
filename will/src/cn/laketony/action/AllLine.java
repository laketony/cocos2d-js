package cn.laketony.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.laketony.dao.DaoLinePoint;
import cn.laketony.dto.LineBean;
import net.sf.json.JSONArray;

/**
 * Servlet implementation class AllLine
 */
@WebServlet({"/AllLine","/editor/AllLine"})
public class AllLine extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AllLine() {
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
		List<LineBean> lineList = DaoLinePoint.fx().getAllPoint();
		JSONArray listJson = JSONArray.fromObject(lineList);
		System.out.println(listJson.toString());
		response.setCharacterEncoding("utf-8");
		response.getWriter().print(listJson.toString());
	}

}
