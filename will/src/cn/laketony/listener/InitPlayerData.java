package cn.laketony.listener;

import java.util.ArrayList;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import cn.laketony.dao.DaoPlayer;
import cn.laketony.dto.PlayerBean;
import cn.laketony.ser.PlayerState;

/**
 * Application Lifecycle Listener implementation class InitPlayerData
 *
 */
@WebListener
public class InitPlayerData implements ServletContextListener {

	/**
	 * Default constructor.
	 */
	public InitPlayerData() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see ServletContextListener#contextDestroyed(ServletContextEvent)
	 */
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		System.out.println("用户数据持久化开始");
		int number = DaoPlayer.fx().updateAllPlayer(PlayerState.getInstance().playerlist);
		System.out.println("用户数据持久化完成" + number);
	}

	/**
	 * @see ServletContextListener#contextInitialized(ServletContextEvent)
	 */
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		PlayerState.getInstance().playerlist = (ArrayList<PlayerBean>) DaoPlayer.fx().getAllPlayer();
		System.out.println("用户初始化完成");
	}

}
