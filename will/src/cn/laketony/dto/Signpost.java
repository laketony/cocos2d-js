package cn.laketony.dto;

import java.io.Serializable;

import cn.laketony.dao.LTBaseDao;
import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class Signpost extends LTBaseDao<Signpost> implements Serializable {
	private int auto;
	private Point point; // : cc.p(0, 0),
	private String x; // : 0,
	private String y; // : 600,
	private String name; // :
	private String text; // :
	private int fontsize; // :

	public void initWith(String ix, String iy, String itext, String ifontsize) {
		// TODO Auto-generated constructor stub
		this.x = ix;
		this.y = iy;
		this.text = itext;
		int iiFontsize = 0;
		try {
			iiFontsize = Integer.parseInt(ifontsize);
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println(e.getMessage());
			System.err.println("iiFontsize " + iiFontsize);
		}

		this.fontsize = iiFontsize;
	}

	public int getAuto() {
		return auto;
	}

	public void setAuto(int auto) {
		this.auto = auto;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getFontsize() {
		return fontsize;
	}

	public void setFontsize(int fontsize) {
		this.fontsize = fontsize;
	}

	public Point getPoint() {
		return new Point(this.x, this.y);
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		JSONObject jobj = JSONObject.fromObject(this);
		return jobj.toString();
	}
}
