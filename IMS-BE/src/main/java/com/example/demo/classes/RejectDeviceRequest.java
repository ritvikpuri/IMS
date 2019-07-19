package com.example.demo.classes;

import java.io.Serializable;

public class RejectDeviceRequest implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7890931622081998145L;

	private Request request;
	
	private Integer changeInInvt;

	public Request getRequest() {
		return request;
	}

	public void setRequest(Request request) {
		this.request = request;
	}

	public Integer getChangeInInvt() {
		return changeInInvt;
	}

	public void setChangeInInvt(Integer changeInInvt) {
		this.changeInInvt = changeInInvt;
	}
}
