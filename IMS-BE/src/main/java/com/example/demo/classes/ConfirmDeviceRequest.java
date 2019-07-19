package com.example.demo.classes;

import java.io.Serializable;

public class ConfirmDeviceRequest implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3864992218173927244L;
	private String serialNumber;

	private Request request;

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public Request getRequest() {
		return request;
	}

	public void setRequest(Request request) {
		this.request = request;
	}

}
