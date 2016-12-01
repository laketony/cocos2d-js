package cn.laketony.dto;

import java.io.Serializable;

import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class Point implements Serializable {
	private float x;
	private float y;

	public Point(float x, float y) {
		this.x = x;
		this.y = y;
	}

	public Point(String ix, String iy) {

		float x = 0;
		try {
			x = Float.parseFloat(ix);
		} catch (Exception e) {
			// TODO: handle exception
		}
		float y = 0;
		try {
			y = Float.parseFloat(iy);
		} catch (Exception e) {
			// TODO: handle exception
		}

		this.x = x;
		this.y = y;
	}

	public Point(int x, int y) {
		this.x = x;
		this.y = y;
	}

	public float getX() {
		return x;
	}

	public void setX(float x) {
		this.x = x;
	}

	public float getY() {
		return y;
	}

	public void setY(float y) {
		this.y = y;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		JSONObject jobj = JSONObject.fromObject(this);
		return jobj.toString();
	}
}
