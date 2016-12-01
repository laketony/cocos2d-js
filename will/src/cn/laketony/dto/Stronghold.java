package cn.laketony.dto;

import java.io.Serializable;

import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class Stronghold implements Serializable {

	private String classname; // : "Stronghold",
	private String point; // : cc.p(0, 0),
	private String x; // : 0,
	private String y; // : 600,
	private String f1; // : "cocos-res/TX580/object_19.png",
	private String f1m; // : "cocos-res/TX580/monster/unit_19_0.png",
	private String name; // : "龙族",
	private String radius; // : 150

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getPoint() {
		return point;
	}

	public void setPoint(String point) {
		this.point = point;
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

	public String getF1() {
		return f1;
	}

	public void setF1(String f1) {
		this.f1 = f1;
	}

	public String getF1m() {
		return f1m;
	}

	public void setF1m(String f1m) {
		this.f1m = f1m;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRadius() {
		return radius;
	}

	public void setRadius(String radius) {
		this.radius = radius;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		JSONObject jobj = JSONObject.fromObject(this);
		return jobj.toString();
	}
}
