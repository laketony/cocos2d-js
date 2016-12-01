package cn.laketony.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import cn.laketony.dto.LineBean;
import cn.laketony.util.ConnectionPool;
import cn.laketony.util.DBUitlSeting;

public class DaoLinePoint {

	private DaoLinePoint() {

	}

	public static DaoLinePoint fx() {
		return new DaoLinePoint();
	}

	public int insert(LineBean line) {
		int okrow = -1;
		String sql = "INSERT INTO `linemap` (`l_from_x`, `l_from_y`, `l_to_x`, `l_to_y`, `l_ctrl_x`, `l_ctrl_y`) "
				+ " VALUES (?,?,?,?,?,?)";

		Connection conn = ConnectionPool.getConnection();

		PreparedStatement ps = null;
		try {

			ps = conn.prepareStatement(sql);
			ps.setString(1, line.l_from_x);
			ps.setString(2, line.l_from_y);
			ps.setString(3, line.l_to_x);
			ps.setString(4, line.l_to_y);
			ps.setString(5, line.l_ctrl_x);
			ps.setString(6, line.l_ctrl_y);
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

	public List<LineBean> getAllPoint() {
		List<LineBean> reList = null;
		String sql = "SELECT * FROM `linemap` LIMIT 0, 1000";

		Connection conn = ConnectionPool.getConnection();

		PreparedStatement ps = null;
		try {

			ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();

			reList = DBUitlSeting.getList(rs, LineBean.class);

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

}
