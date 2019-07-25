package com.example.demo.classes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The Class Inventory.
 */
@Entity
@Table(name="inventory")
public class Inventory {

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	/** The item name. */
	@Column
	private String itemName;
	
	/** The qty. */
	@Column
	private int qty;
	
	/** The type. */
	@Column
	private String type;

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
	 * Gets the qty.
	 *
	 * @return the qty
	 */
	public int getQty() {
		return qty;
	}

	/**
	 * Sets the qty.
	 *
	 * @param qty the new qty
	 */
	public void setQty(int qty) {
		this.qty = qty;
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
	
}
