package cn.laketony.dto;

import java.io.Serializable;

import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class BuildingBean implements Serializable {

	private String id;
	private String x;
	private String y;
	private String respath;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	public String getRespath() {
		return respath;
	}

	public void setRespath(String respath) {
		this.respath = respath;
	}

	public BuildingBean() {

	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		JSONObject jobj = JSONObject.fromObject(this);
		return jobj.toString();
	}
}
