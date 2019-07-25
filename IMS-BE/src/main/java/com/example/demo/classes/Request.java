package com.example.demo.classes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The Class Request.
 */
@Entity
@Table(name="request")
public class Request {

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	/** The emp id. */
	@Column
	private String empId;
	
	/** The emp name. */
	@Column
	private String empName;
	
	/** The dept. */
	@Column
	private String dept;
	
	/** The item name. */
	@Column
	private String itemName;
	
	/** The request date. */
	@Column
	private String requestDate;
	
	/** The accept date. */
	@Column
	private String acceptDate;
	
	/** The estimated return date. */
	@Column
	private String estimatedReturnDate;
	
	/** The return date. */
	@Column
	private String returnDate;
	
	/** The active. */
	@Column
	private boolean active;
	
	/** The pending. */
	@Column
	private Boolean pending=false;

	/** The hours. */
	@Column
	private Integer hours;
	
	/** The minutes. */
	@Column
	private Integer minutes;
	
	/** The current qty. */
	@Column
	private Integer currentQty;
	
	/** The type. */
	@Column
	private String type;
	
	/** The serial number. */
	@Column
	private String serialNumber;

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
	 * Gets the id.
	 *
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(long id) {
		this.id = id;
	}

	/**
	 * Gets the emp id.
	 *
	 * @return the emp id
	 */
	public String getEmpId() {
		return empId;
	}

	/**
	 * Sets the emp id.
	 *
	 * @param empId the new emp id
	 */
	public void setEmpId(String empId) {
		this.empId = empId;
	}

	/**
	 * Gets the item name.
	 *
	 * @return the item name
	 */
	public String getItemName() {
		return itemName;
	}

	/**
	 * Sets the item name.
	 *
	 * @param itemName the new item name
	 */
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	/**
	 * Gets the request date.
	 *
	 * @return the request date
	 */
	public String getRequestDate() {
		return requestDate;
	}

	/**
	 * Sets the request date.
	 *
	 * @param string the new request date
	 */
	public void setRequestDate(String string) {
		this.requestDate = string;
	}

	/**
	 * Gets the accept date.
	 *
	 * @return the accept date
	 */
	public String getAcceptDate() {
		return acceptDate;
	}

	/**
	 * Sets the accept date.
	 *
	 * @param acceptDate the new accept date
	 */
	public void setAcceptDate(String acceptDate) {
		this.acceptDate = acceptDate;
	}

	/**
	 * Checks if is active.
	 *
	 * @return true, if is active
	 */
	public boolean isActive() {
		return active;
	}

	/**
	 * Sets the active.
	 *
	 * @param active the new active
	 */
	public void setActive(boolean active) {
		this.active = active;
	}

	/**
	 * Gets the emp name.
	 *
	 * @return the emp name
	 */
	public String getEmpName() {
		return empName;
	}

	/**
	 * Sets the emp name.
	 *
	 * @param empName the new emp name
	 */
	public void setEmpName(String empName) {
		this.empName = empName;
	}

	/**
	 * Gets the dept.
	 *
	 * @return the dept
	 */
	public String getDept() {
		return dept;
	}

	/**
	 * Sets the dept.
	 *
	 * @param dept the new dept
	 */
	public void setDept(String dept) {
		this.dept = dept;
	}

	/**
	 * Gets the return date.
	 *
	 * @return the return date
	 */
	public String getReturnDate() {
		return returnDate;
	}

	/**
	 * Sets the return date.
	 *
	 * @param returnDate the new return date
	 */
	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}

	/**
	 * Gets the hours.
	 *
	 * @return the hours
	 */
	public Integer getHours() {
		return hours;
	}

	/**
	 * Sets the hours.
	 *
	 * @param hours the new hours
	 */
	public void setHours(Integer hours) {
		this.hours = hours;
	}

	/**
	 * Gets the minutes.
	 *
	 * @return the minutes
	 */
	public Integer getMinutes() {
		return minutes;
	}

	/**
	 * Sets the minutes.
	 *
	 * @param minutes the new minutes
	 */
	public void setMinutes(Integer minutes) {
		this.minutes = minutes;
	}

	/**
	 * Gets the estimated return date.
	 *
	 * @return the estimated return date
	 */
	public String getEstimatedReturnDate() {
		return estimatedReturnDate;
	}

	/**
	 * Sets the estimated return date.
	 *
	 * @param estimatedReturnDate the new estimated return date
	 */
	public void setEstimatedReturnDate(String estimatedReturnDate) {
		this.estimatedReturnDate = estimatedReturnDate;
	}

	/**
	 * Gets the current qty.
	 *
	 * @return the current qty
	 */
	public Integer getCurrentQty() {
		return currentQty;
	}

	/**
	 * Sets the current qty.
	 *
	 * @param currentQty the new current qty
	 */
	public void setCurrentQty(Integer currentQty) {
		this.currentQty = currentQty;
	}

	/**
	 * Gets the type.
	 *
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * Sets the type.
	 *
	 * @param type the new type
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * Checks if is pending.
	 *
	 * @return the boolean
	 */
	public Boolean isPending() {
		return pending;
	}

	/**
	 * Sets the pending.
	 *
	 * @param pending the new pending
	 */
	public void setPending(Boolean pending) {
		this.pending = pending;
	}

	
}
