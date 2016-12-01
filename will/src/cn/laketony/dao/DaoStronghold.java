package cn.laketony.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import cn.laketony.dto.Point;
import cn.laketony.dto.Stronghold;
import cn.laketony.util.ConnectionPool;
import cn.laketony.util.DBUitlSeting;

public class DaoStronghold {

	private DaoStronghold() {

	}

	public static DaoStronghold fx() {
		return new DaoStronghold();
	}

	@Deprecated
	public int insert(Stronghold hold) {
		return -1;
	}

	public int insertInfo(String l_build_x, String l_build_y, String respath) {
		int okrow = -1;
		String sql = "INSERT INTO `buildingmap` (`x`, `y`, `respath`) VALUES (?,?,?)";

		Connection conn = ConnectionPool.getConnection();

		PreparedStatement ps = null;
		try {

			ps = conn.prepareStatement(sql);
			ps.setString(1, l_build_x);
			ps.setString(2, l_build_y);
			ps.setString(3, respath);

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

	public List<Stronghold> getAllStronghold() {
		List<Stronghold> reList = null;
		String sql = "SELECT * FROM `stronghold` LIMIT 0, 100";

		Connection conn = ConnectionPool.getConnection();

		PreparedStatement ps = null;
		try {

			ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();

			reList = DBUitlSeting.getList(rs, Stronghold.class);

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

	@Deprecated
	public List<Stronghold> findStronghold(String x, String y) {

		return null;
	}

	@Deprecated
	public List<Stronghold> findStronghold(Point point) {

		return null;
	}

}
