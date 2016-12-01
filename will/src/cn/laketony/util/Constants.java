package cn.laketony.util;

/**
 * ClassName:Constants
 *
 * TODO(保存项目中常量)
 *
 * @project ans
 *
 * @date   2015年7月20日 上午11:16:03	
 *
 */ 
public class Constants {
	
	/** 图片存储地址 */
	public static final String UPLOADURL = "D:/WebResource/resourceview";//121 D:/WebResource/resourceview 192 "E:\\WebResource\\resourceview\\";//192上 E:\\WebResource\\resourceview\\   自己F://BLH/
	
	/**
	 * 上传临时目录
	 */
	public static final String UPLOADURL_TEMP = UPLOADURL+"/temp";
	
	/** 图片发布地址 */
//	public static final String FILEURL = "http://192.168.1.94:8088/pic/";
	public static final String FILEURL = "";
	
	/** 分页条数 */
	public static final int PAGESIZE = 15;
	
	/**
	 * 状态,删除
	 */
	public static final Integer STATUS_DELETE =0;
	
	/**
	 * 状态,正常使用
	 */
	public static final Integer STATUS_NORMAL =1;
	
	/**
	 * 任务类型,拍照
	 */
	public static final Integer TASK_PHOTO =1;
	
	/**
	 * 任务类型,回答问题
	 */
	public static final Integer TASK_QUESTION =2;
	
	/**
	 * 任务类型,扫描
	 */
	public static final Integer TASK_SCAN =3;
	
	

}
