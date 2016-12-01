package cn.laketony.util;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.lang.reflect.Field;

public class DBUitlSeting {
	/**
	 * Rs中是否存在此字段
	 * 
	 * @param metaData
	 * @return
	 */
	private static boolean checkColumn(ResultSetMetaData metaData, String columnName) {
		boolean check = false;
		try {
			int count = metaData.getColumnCount();
			for (int i = 1; i <= count; i++) {
				String metaColumenName = metaData.getColumnName(i);
				// System.out.println(columnName.toUpperCase() + ":" +
				// metaColumenName.toUpperCase() );
				if (columnName.toUpperCase().equals(metaColumenName.toUpperCase())) {
					check = true;
					return check;
				}

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return check;
	}

	public static <T> List<T> getList(ResultSet rs, Class<?> item) throws SQLException {
		List<T> relist = new ArrayList<T>();
		while (rs.next()) {
			T ok = (T) retoObject(rs, item);
			relist.add(ok);
		}
		return relist;
	}
	// --------------------

	public static Object retoObject(ResultSet rs, Class<?> item) throws SQLException {
		Object obj = null;
		Method[] methods = item.getMethods();
		ResultSetMetaData rsme = rs.getMetaData();
		try {
			obj = item.newInstance();
			// 遍历对象的方法
			for (Method method : methods) {
				String methodName = method.getName();
				// 如果对象的方法以set开头
				if (methodName.startsWith("set")) {
					// 根据方法名字得到数据表格中字段的名字
					String columnName = methodName.substring(3, methodName.length());
					if (checkColumn(rsme, columnName)) {
						// 得到方法的参数类型
						Class[] parmts = method.getParameterTypes();

						// System.out.print("parmts "+parmts[0].toString()+" ");
						// System.out.print("[1 isint "+(parmts[0] ==
						// int.class)+"]");
						// System.out.print("[2 isString "+(parmts[0] ==
						// String.class)+"]");
						// System.out.print("[3 isInteger "+(parmts[0] ==
						// Integer.class)+"]");

						if (parmts[0] == String.class) {
							// 如果参数为String类型，则从结果集中按照列名取得对应的值，并且执行改set方法
							method.invoke(obj, rs.getString(columnName));
							// System.out.println(rs.getString(columnName));
						} else if (parmts[0] == Integer.class || parmts[0] == int.class) {
							method.invoke(obj, rs.getInt(columnName));
						} else {
							System.err.println("DBUitlSeting err = " + parmts[0].toString());
						}
					}

				}
			}
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return obj;

	}

	static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static String getString(Object o) {
		StringBuffer sb = new StringBuffer();
		sb.append("该Bean的字符串数据[");
		Field[] farr = o.getClass().getDeclaredFields();
		for (Field field : farr) {
			try {
				field.setAccessible(true);
				sb.append(field.getName());
				sb.append("=");
				if (field.get(o) instanceof Date) {
					// 日期的处理
					sb.append(sdf.format(field.get(o)));
				} else {
					sb.append(field.get(o));
				}
				sb.append("|");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		sb.append("]");
		return sb.toString();
	}

}
