package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.classes.DeviceInventory;

/**
 * The Interface DeviceInventoryService.
 */
@Service
public interface DeviceInventoryService {

	/**
	 * Save an item in deviceInventory.
	 *
	 * @param deviceInventory the device inventory
	 */
	void save(DeviceInventory deviceInventory);

	/**
	 * Find all item.
	 *
	 * @return the list
	 */
	List<DeviceInventory> findAll();
	
	/**
	 * Find by item name.
	 *
	 * @param itemName the item name
	 * @return the list
	 */
	List<DeviceInventory> findByItemName(String itemName);
	
	/**
	 * Delete by serial number.
	 *
	 * @param serialNumber the serial number
	 */
	void deleteBySerialNumber(String serialNumber);
	
}
