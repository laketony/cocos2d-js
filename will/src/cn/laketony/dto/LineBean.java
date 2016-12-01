package cn.laketony.dto;

import java.io.Serializable;

import net.sf.json.JSONObject;

public class LineBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public String l_from_x;
	public String l_from_y;
	public String l_to_x;
	public String l_to_y;
	public String l_ctrl_x;
	public String l_ctrl_y;

	public String getL_from_x() {
		return l_from_x;
	}

	public void setL_from_x(String l_from_x) {
		this.l_from_x = l_from_x;
	}

	public String getL_from_y() {
		return l_from_y;
	}

	public void setL_from_y(String l_from_y) {
		this.l_from_y = l_from_y;
	}

	public String getL_to_x() {
		return l_to_x;
	}

	public void setL_to_x(String l_to_x) {
		this.l_to_x = l_to_x;
	}

	public String getL_to_y() {
		return l_to_y;
	}

	public void setL_to_y(String l_to_y) {
		this.l_to_y = l_to_y;
	}

	public String getL_ctrl_x() {
		return l_ctrl_x;
	}

	public void setL_ctrl_x(String l_ctrl_x) {
		this.l_ctrl_x = l_ctrl_x;
	}

	public String getL_ctrl_y() {
		return l_ctrl_y;
	}

	public void setL_ctrl_y(String l_ctrl_y) {
		this.l_ctrl_y = l_ctrl_y;
	}

	public LineBean() {

	}

	public LineBean(String l_from_x, String l_from_y, String l_to_x, String l_to_y, String l_ctrl_x, String l_ctrl_y) {
		this.initWith(l_from_x, l_from_y, l_to_x, l_to_y, l_ctrl_x, l_ctrl_y);
	}

	public static LineBean create(String l_from_x, String l_from_y, String l_to_x, String l_to_y, String l_ctrl_x,
			String l_ctrl_y) {
		LineBean line = new LineBean();
		line.initWith(l_from_x, l_from_y, l_to_x, l_to_y, l_ctrl_x, l_ctrl_y);
		return line;
	}

	public void initWith(String l_from_x, String l_from_y, String l_to_x, String l_to_y, String l_ctrl_x,
			String l_ctrl_y) {
		this.l_from_x = l_from_x;
		this.l_from_y = l_from_y;
		this.l_to_x = l_to_x;
		this.l_to_y = l_to_y;
		this.l_ctrl_x = l_ctrl_x;
		this.l_ctrl_y = l_ctrl_y;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		JSONObject jobj = JSONObject.fromObject(this);
		return jobj.toString();
	}
}
