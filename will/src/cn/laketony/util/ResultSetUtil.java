package cn.laketony.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResultSetUtil {
	
	/**
	 * 返回列表
	 * @param resultSet
	 * @param fields
	 * @param columnLabel
	 * @param cls
	 * @param flag
	 * @return
	 */
	public static <T> List<T> getByList(ResultSet resultSet,String[] fields, String[] columnLabel, Class<T> cls,Boolean flag) {
		List<T> result = new ArrayList<T>();
		try {
			ResultSetMetaData rsmd = resultSet.getMetaData();
			int columnCount=rsmd.getColumnCount();
			Map<String, Integer> map=new HashMap<String, Integer>();
			for(int i=1;i<=columnCount;i++){
				map.put(rsmd.getColumnLabel(i), 1);
			}
			while (resultSet.next()) {
				T entity=getObject(resultSet, columnCount, map, fields, columnLabel, cls, flag);
				if(entity!=null){
					result.add(entity);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result.size()==0?null:result;
	}
	
	/**
	 * 返回一个
	 * @param resultSet
	 * @param fields
	 * @param columnLabel
	 * @param cls
	 * @param flag
	 * @return
	 */
	public static <T> T getByOne(ResultSet resultSet,String[] fields, String[] columnLabel, Class<T> cls,Boolean flag) {
		try {
			ResultSetMetaData rsmd = resultSet.getMetaData();
			int columnCount=rsmd.getColumnCount();
			Map<String, Integer> map=new HashMap<String, Integer>();
			for(int i=1;i<=columnCount;i++){
				map.put(rsmd.getColumnLabel(i), 1);
			}
			while (resultSet.next()) {
				return getObject(resultSet, columnCount, map, fields, columnLabel, cls, flag);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	/**
	 * 获取列名字
	 * @param resultSet
	 * @return
	 */
	public static Map<String, Integer> getColumnLabelMap(ResultSet resultSet){
		Map<String, Integer> map=new HashMap<String, Integer>();
		try {
			ResultSetMetaData rsmd = resultSet.getMetaData();
			int columnCount=rsmd.getColumnCount();
			for(int i=1;i<=columnCount;i++){
				map.put(rsmd.getColumnLabel(i), 1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	
	public static int getColumnCount(ResultSet resultSet){
		int columnCount=-1;
		try {
			ResultSetMetaData rsmd = resultSet.getMetaData();
			columnCount=rsmd.getColumnCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return columnCount;
	}
	
	public static <T> T getObject(ResultSet resultSet, int columnCount,Map<String, Integer> columnLabelMap,String[] fields, String[] columnLabel, Class<T> cls,Boolean flag) {
		try {
			T entity = cls.newInstance();
			if(fields != null&&columnLabel!=null){
				for (int j = 0; j < fields.length; j++) {
					Object object = columnLabelMap.get(columnLabel[j])==null?null:resultSet.getObject(columnLabel[j]);
					if (object != null) {
						String fieldName = fields[j];
						Field field = getDeclaredField(cls, fieldName);
						Class<?> parameterClass = field.getType();
						Class<?>[] parameterTypes = new Class<?>[1];
						parameterTypes[0] = parameterClass;
						StringBuffer stringBuffer = new StringBuffer();
						stringBuffer.append("set");
						stringBuffer.append(fieldName.substring(0, 1)
								.toUpperCase());
						stringBuffer.append(fieldName.substring(1));
						Method method = cls.getMethod(stringBuffer.toString(),
								parameterTypes);
						Object value = null;
						value=resultSetValue(resultSet, parameterClass, object,columnLabel[j]);
						System.out.println(fieldName);
						method.invoke(entity, new Object[] { value });
					}
				}
			}
			else if (fields != null) {
				for (int j = 0; j < fields.length; j++) {
					Object object = j + 1>columnCount?null:resultSet.getObject(j + 1);
					if (object != null) {
						String fieldName = fields[j];
						Field field = getDeclaredField(cls, fieldName);
						Class<?> parameterClass = field.getType();
						Class<?>[] parameterTypes = new Class<?>[1];
						parameterTypes[0] = parameterClass;
						StringBuffer stringBuffer = new StringBuffer();
						stringBuffer.append("set");
						stringBuffer.append(fieldName.substring(0, 1)
								.toUpperCase());
						stringBuffer.append(fieldName.substring(1));
						Method method = cls.getMethod(stringBuffer.toString(),
								parameterTypes);
						Object value = null;
						value=resultSetValue(resultSet, parameterClass, object,j + 1);
						method.invoke(entity, new Object[] { value });
					}
				}
			}else	if(columnLabel!=null){
				Field[] fieldscls=cls.getDeclaredFields();
				for(int k=0;k<columnLabel.length;k++){
					Object object = columnLabelMap.get(columnLabel[k])==null?null:resultSet.getObject(columnLabel[k]);
					if(object!=null){
						Object value = null;
						Class<?> parameterClass=fieldscls[k].getType();
						value=resultSetValue(resultSet, parameterClass, object, columnLabel[k]);
						fieldscls[k].setAccessible(true);
						fieldscls[k].set(entity,value);
					}
				}	
			}else if(flag==true){
				Field[] fieldscls=cls.getDeclaredFields();
				for(int k=0;k<fieldscls.length;k++){			
					String fieldName=fieldscls[k].getName();
					Object object = columnLabelMap.get(fieldName)==null?null:resultSet.getObject(fieldName);
					if(object!=null){
						Object value = null;
						Class<?> parameterClass=fieldscls[k].getType();
						value=resultSetValue(resultSet, parameterClass, object,fieldName);
						fieldscls[k].setAccessible(true);
						fieldscls[k].set(entity,value);
					}
				}
			}else{
				Field[] fieldscls=cls.getDeclaredFields();
				int add=1;
				for(int k=0;k<fieldscls.length;k++){		
					if("serialVersionUID".equals(fieldscls[k].getName())){
						add--;
						continue;
					}
					Object object = k + add>columnCount?null:resultSet.getObject(k + add);
					if(object!=null){
						Object value = null;
						Class<?> parameterClass=fieldscls[k].getType();
						value=resultSetValue(resultSet, parameterClass, object,k+add);
						fieldscls[k].setAccessible(true);
						fieldscls[k].set(entity,value);
					}
				}
			}
			return entity;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	private static Object resultSetValue(ResultSet resultSet,Class<?> parameterClass,Object object,String columnLabel) throws SQLException{
    	Object value = null;
    	if (parameterClass.equals(String.class)) {
			value = resultSet.getString(columnLabel);			
		} else if (parameterClass.equals(Integer.class)) {
			value = resultSet.getInt(columnLabel);
		} else if (parameterClass.equals(Float.class)) {
			value = resultSet.getFloat(columnLabel);
		} else if (parameterClass.equals(Long.class)) {
			value = resultSet.getLong(columnLabel);
		} else if (parameterClass.equals(Double.class)) {
			value = resultSet.getDouble(columnLabel);
		} else if (parameterClass.equals(Short.class)) {
			value = resultSet.getShort(columnLabel);
		} else if (parameterClass.equals(Date.class)) {
			value = resultSet.getTimestamp(columnLabel);
		}else if (parameterClass.equals(BigDecimal.class)) {
			value = resultSet.getBigDecimal(columnLabel);
		}else {
			value = object;
		}
    	return value;
    }
	
	private static Object resultSetValue(ResultSet resultSet,Class<?> parameterClass,Object object,Integer columnIndex) throws SQLException{
    	Object value = null;
    	if (parameterClass.equals(String.class)) {
			value = resultSet.getString(columnIndex);			
		} else if (parameterClass.equals(Integer.class)) {
			value = resultSet.getInt(columnIndex);
		} else if (parameterClass.equals(Float.class)) {
			value = resultSet.getFloat(columnIndex);
		} else if (parameterClass.equals(Long.class)) {
			value = resultSet.getLong(columnIndex);
		} else if (parameterClass.equals(Double.class)) {
			value = resultSet.getDouble(columnIndex);
		} else if (parameterClass.equals(Short.class)) {
			value = resultSet.getShort(columnIndex);
		} else if (parameterClass.equals(Date.class)) {
			value = resultSet.getTimestamp(columnIndex);
		}else if (parameterClass.equals(BigDecimal.class)) {
			value = resultSet.getBigDecimal(columnIndex);
		}else {
			value = object;
		}
    	return value;
    }
	private static Field getDeclaredField(Class<?> clz, String fieldName) {
		Field field = null;
		while (clz != Object.class) {
			try {
				field = clz.getDeclaredField(fieldName);
				return field;
			} catch (NoSuchFieldException e) {
				e.printStackTrace();
			}
			clz = clz.getSuperclass();
		}
		return field;
	}
}
