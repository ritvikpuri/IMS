package com.example.demo.classes;

import java.io.Serializable;

/**
 * The Class ConfirmDeviceRequest.
 */
public class ConfirmDeviceRequest implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -3864992218173927244L;
	
	/** The serial number. */
	private String serialNumber;

	/** The request. */
	private Request request;

	/**
	 * Gets the serial number.
	 *
	 * @return the serial number
	 */
	public String getSerialNumber() {
		return serialNumber;
	}

	/**
	 * Sets the serial number.
	 *
	 * @param serialNumber the new serial number
	 */
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

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

}
