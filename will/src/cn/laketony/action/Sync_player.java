package cn.laketony.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.laketony.dto.PlayerBean;
import cn.laketony.ser.PlayerState;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class Sync_player
 */
@WebServlet({ "/Sync_player", "/sync_player" })
public class Sync_player extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Sync_player() {
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

		Map map = request.getParameterMap();
		HashMap<String, String> infoMap = new HashMap<>();
		Set keSet = map.entrySet();
		for (Iterator itr = keSet.iterator(); itr.hasNext();) {
			Map.Entry me = (Map.Entry) itr.next();
			Object ok = me.getKey();
			Object ov = me.getValue();
			String[] value = new String[1];
			if (ov instanceof String[]) {
				value = (String[]) ov;
			} else {
				value[0] = ov.toString();
			}

			// for (int k = 0; k < value.length; k++) {
			// System.out.print(ok + "=" + value[k]);
			// }

			infoMap.put((String) ok, value[0]);
		}

		JSONObject jsonObject = JSONObject.fromObject(infoMap);

		PlayerBean player = (PlayerBean) JSONObject.toBean(jsonObject, PlayerBean.class);

		PlayerState.getInstance().update(player);

		List<PlayerBean> lineList = PlayerState.getInstance().playerlist;
		JSONArray listJson = JSONArray.fromObject(lineList);

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
