package cn.laketony.dto;

import java.io.Serializable;

import net.sf.json.JSONObject;

public class PlayerBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int id;
	private String play_name;
	private int x;
	private int y;
	private String respath;
	private int hp;
	private int mp;
	private int ms;
	private int at;
	private int lv;
	private int ex;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPlay_name() {
		return play_name;
	}

	public void setPlay_name(String play_name) {
		this.play_name = play_name;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public String getRespath() {
		return respath;
	}

	public void setRespath(String respath) {
		this.respath = respath;
	}

	public int getHp() {
		return hp;
	}

	public void setHp(int hp) {
		this.hp = hp;
	}

	public int getMp() {
		return mp;
	}

	public void setMp(int mp) {
		this.mp = mp;
	}

	public int getMs() {
		return ms;
	}

	public void setMs(int ms) {
		this.ms = ms;
	}

	public int getAt() {
		return at;
	}

	public void setAt(int at) {
		this.at = at;
	}

	public int getLv() {
		return lv;
	}

	public void setLv(int lv) {
		this.lv = lv;
	}

	public int getEx() {
		return ex;
	}

	public void setEx(int ex) {
		this.ex = ex;
	}

	public void update(PlayerBean player) {
		// TODO Auto-generated method stub
		this.id = player.getId();
		this.play_name = player.getPlay_name();
		this.x = player.getX();
		this.y = player.getY();
		this.respath = player.getRespath();
		this.hp = player.getHp();
		this.mp = player.getMp();
		this.ms = player.getMs();
		this.at = player.getAt();
		this.lv = player.getLv();
		this.ex = player.getEx();
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		JSONObject jobj = JSONObject.fromObject(this);
		return jobj.toString();
	}
}
