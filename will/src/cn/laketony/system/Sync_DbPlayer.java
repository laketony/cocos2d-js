package cn.laketony.system;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.laketony.dao.DaoPlayer;
import cn.laketony.dto.PlayerBean;
import cn.laketony.ser.PlayerState;

/**
 * Servlet implementation class Sync_DbPlayer
 */
@WebServlet({ "/Sync_DbPlayer", "/syncdb" })
public class Sync_DbPlayer extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Sync_DbPlayer() {
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
		DaoPlayer.fx().updateAllPlayer(PlayerState.getInstance().playerlist);	
		
		PlayerState.getInstance().playerlist = (ArrayList<PlayerBean>) DaoPlayer.fx().getAllPlayer();

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
