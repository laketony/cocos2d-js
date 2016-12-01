package cn.laketony.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import cn.laketony.dto.PlayerBean;
import cn.laketony.util.ConnectionPool;
import cn.laketony.util.DBUitlSeting;

public class DaoPlayer {

	private DaoPlayer() {

	}

	public static DaoPlayer fx() {
		return new DaoPlayer();
	}

	public int insert(String playerName) {
		int okrow = -1;
		String sql = "INSERT INTO `players` (`play_name`) VALUES (?)";

		Connection conn = ConnectionPool.getConnection();

		PreparedStatement ps = null;
		try {

			ps = conn.prepareStatement(sql);
			ps.setString(1, playerName);
			okrow = ps.executeUpdate();

			ps.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {

			ConnectionPool.closeps(ps);
			ConnectionPool.close(conn);
		}

		return okrow;
	}

	public int updatePoint(PlayerBean player) {
		int okrow = -1;
		String sql = "UPDATE `players` SET `x`=?, `y`=? WHERE (`id`=?)";

		Connection conn = ConnectionPool.getConnection();

		PreparedStatement ps = null;
		try {

			ps = conn.prepareStatement(sql);
			ps.setString(1, player.getX() + "");
			ps.setString(2, player.getY() + "");
			ps.setString(3, player.getId() + "");
			okrow = ps.executeUpdate();

			ps.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {

			ConnectionPool.closeps(ps);
			ConnectionPool.close(conn);
		}

		return okrow;
	}

	public int updatePlayer(PlayerBean player) {
		int okrow = -1;
		String sql = "UPDATE `players` SET " //
				+ " `x`=?, `y`=?, " //
				+ " `respath`=?, " //
				+ " `hp`=?, `mp`=?, `ms`=?, `at`=?, `lv`=?, `ex`=?" //
				+ " WHERE (`id`=?);"; //
		Connection conn = ConnectionPool.getConnection();

		PreparedStatement ps = null;
		try {

			ps = conn.prepareStatement(sql);
			ps.setString(1, player.getX() + "");
			ps.setString(2, player.getY() + "");
			ps.setString(3, player.getRespath() + "");
			ps.setString(4, player.getHp() + "");
			ps.setString(5, player.getMp() + "");
			ps.setString(6, player.getMs() + "");
			ps.setString(7, player.getAt() + "");
			ps.setString(8, player.getLv() + "");
			ps.setString(9, player.getEx() + "");
			ps.setString(10, player.getId() + "");

			okrow = ps.executeUpdate();

			ps.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {

			ConnectionPool.closeps(ps);
			ConnectionPool.close(conn);
		}

		return okrow;
	}

	public int updateAllPlayer(List<PlayerBean> playerList) {
		int okrow = 0;
		for (PlayerBean playerBean : playerList) {
			int isOk = updatePlayer(playerBean);
			if (isOk > 0) {
				okrow += isOk;
			}
		}

		return okrow;
	}

	public List<PlayerBean> getAllPlayer() {
		List<PlayerBean> reList = null;
		String sql = "SELECT * FROM `players` LIMIT 0, 1000";

		Connection conn = ConnectionPool.getConnection();

		PreparedStatement ps = null;
		try {

			ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();

			reList = DBUitlSeting.getList(rs, PlayerBean.class);

			ps.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {

			ConnectionPool.closeps(ps);
			ConnectionPool.close(conn);
		}

		return reList;

	}

	public List<PlayerBean> findBuilding(String x, String y) {

		return null;
	}
}
