package com.example.demo.classes;

import java.io.Serializable;

/**
 * The Class RejectDeviceRequest.
 */
public class RejectDeviceRequest implements Serializable{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 7890931622081998145L;

	/** The request. */
	private Request request;
	
	/** The change in invt. */
	private Integer changeInInvt;

	/**
	 * Gets the request.
	 *
	 * @return the request
	 */
	public Request getRequest() {
		return request;
	}

	/**
	 * Sets the request.
	 *
	 * @param request the new request
	 */
	public void setRequest(Request request) {
		this.request = request;
	}

	/**
	 * Gets the change in inventory.
	 *
	 * @return the change in inventory.
	 */
	public Integer getChangeInInvt() {
		return changeInInvt;
	}

	/**
	 * Sets the change in inventory.
	 *
	 * @param changeInInvt the new change in invt
	 */
	public void setChangeInInvt(Integer changeInInvt) {
		this.changeInInvt = changeInInvt;
	}
}
