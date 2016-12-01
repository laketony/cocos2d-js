package cn.laketony.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import cn.laketony.dto.BuildingBean;
import cn.laketony.dto.Point;
import cn.laketony.util.ConnectionPool;
import cn.laketony.util.DBUitlSeting;

public class DaoBuilding {

	private DaoBuilding() {

	}

	public static DaoBuilding fx() {
		return new DaoBuilding();
	}

	public int insert(BuildingBean build) {
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

	public List<BuildingBean> getAllBuilding() {
		List<BuildingBean> reList = null;
		String sql = "SELECT * FROM `buildingmap` LIMIT 0, 100";

		Connection conn = ConnectionPool.getConnection();

		PreparedStatement ps = null;
		try {

			ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();

			reList = DBUitlSeting.getList(rs, BuildingBean.class);

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

	public List<BuildingBean> findBuilding(String x, String y) {

		return null;
	}

	public List<BuildingBean> findBuilding(Point point) {

		return null;
	}

}
