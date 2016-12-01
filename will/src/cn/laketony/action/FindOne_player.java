package cn.laketony.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import cn.laketony.dto.PlayerBean;
import cn.laketony.ser.PlayerState;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class Sync_player
 */
@WebServlet({ "/FindOne_player", "/findoneplayer" })
public class FindOne_player extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FindOne_player() {
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
		
		HttpSession sessoion = request.getSession();
		

		List<PlayerBean> playerlist = PlayerState.getInstance().playerlist;
		

		Object playerid_Object = sessoion.getAttribute("playerid");
		if(playerid_Object == null){
			int size = PlayerState.getInstance().playerlist.size();
			int num = (int) (Math.random() * size); // [0,size)
			playerid_Object = playerlist.get(num).getId();
			sessoion.setAttribute("playerid", playerid_Object);
		}

		int playerid = (int) playerid_Object;
		
		PlayerBean playerBean =  PlayerState.getInstance().findPlayer(playerid);
		
		JSONObject playerJson = JSONObject.fromObject(playerBean); 
		response.setCharacterEncoding("utf-8");
		response.getWriter().print(playerJson.toString());
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
