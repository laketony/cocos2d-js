package cn.laketony.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.laketony.dao.DaoSignpost;
import cn.laketony.dao.DaoStronghold;
import cn.laketony.dto.Signpost;
import cn.laketony.dto.Stronghold;
import net.sf.json.JSONArray;

/**
 * Servlet implementation class FindStronghold
 */
@WebServlet({ "/FindStronghold", "/editor/FindStronghold" })
public class FindStronghold extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FindStronghold() {
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

		List<Stronghold> reList = DaoStronghold.fx().getAllStronghold();
		JSONArray listJson = JSONArray.fromObject(reList);
		System.out.println(listJson.toString());

		response.setCharacterEncoding("utf-8");
		response.getWriter().print(listJson.toString());
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
