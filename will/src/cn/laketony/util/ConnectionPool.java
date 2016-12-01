package cn.laketony.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class ConnectionPool {

	private ConnectionPool() {

	}

	public static synchronized Connection getConnection() {
		return getNewConnection();
	}

	private static Connection getNewConnection() {

		Connection con = null;
		try {
			Context initial = new InitialContext();
			// 其中mysql为数据源jndi名称
			DataSource ds = (DataSource) initial.lookup("java:comp/env/jdbc/DBPOOL_willwords");
			con = ds.getConnection();

		} catch (Exception e) {
			System.out.println("JNDI link Database ERR " + e.getMessage());
		}

		//System.out.println("DBconn[" + (con == null ? "NULL" : "OK") + "] ");

		if(con == null ){
			System.out.println("Database link fail");
		}
		
		return con;
	}

	public static synchronized void close(Connection conn) {
		try {
			if (conn != null) {
				conn.close();
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static synchronized void closers(ResultSet rs) {
		try {
			if (rs != null && !rs.isClosed()) {
				rs.close();
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static synchronized void closeps(PreparedStatement ps) {
		try {
			if (ps != null && !ps.isClosed()) {
				ps.close();
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
