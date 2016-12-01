package cn.laketony.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.laketony.dao.DaoTalkImpl;
import cn.laketony.dto.NpcTalks;
import net.sf.json.JSONArray;

/**
 * Servlet implementation class FindTalks
 */
@WebServlet({"/FindTalks","/editor/FindTalks"})
public class FindTalks extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FindTalks() {
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

		List<NpcTalks> reList = DaoTalkImpl.fx().getContents(1);
		JSONArray reJson = JSONArray.fromObject(reList);
		System.out.println(reJson.toString());

		response.setCharacterEncoding("utf-8");
		response.getWriter().print(reJson.toString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
