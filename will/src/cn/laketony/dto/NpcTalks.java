package cn.laketony.dto;

import java.io.Serializable;

import net.sf.json.JSONObject;

@SuppressWarnings("serial")
public class NpcTalks implements Serializable {
	private String message_values;

	public String getMessage_values() {
		return message_values;
	}

	public void setMessage_values(String message_values) {
		this.message_values = message_values;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		JSONObject jobj = JSONObject.fromObject(this);
		return jobj.toString();
	}
}
