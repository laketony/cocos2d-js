package cn.laketony.ser;

import java.util.ArrayList;

import cn.laketony.dao.DaoPlayer;
import cn.laketony.dto.PlayerBean;

public class PlayerState {

	private PlayerState() {
	};

	private static PlayerState instance = null;

	public static PlayerState getInstance() {
		if (instance == null) {
			synchronized (PlayerState.class) {
				if (instance == null) {
					instance = new PlayerState();
				}
			}
		}
		return instance;
	}

	public ArrayList<PlayerBean> playerlist;

	public synchronized void update(PlayerBean player) {

		for (PlayerBean playerBean : playerlist) {
			if (playerBean.getId() == player.getId()) {
				playerBean.update(player);
			}
		}
	}

	public PlayerBean findPlayer(int playerid) {

		for (PlayerBean playerBean : playerlist) {
			if (playerBean.getId() == playerid) {
				return playerBean;
			}
		}
		return null;
	}

}
