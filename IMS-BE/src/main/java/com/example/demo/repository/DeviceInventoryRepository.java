package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.classes.DeviceInventory;

/**
 * The Interface DeviceInventoryRepository.
 */
@Repository
public interface DeviceInventoryRepository extends JpaRepository<DeviceInventory, Long>{
	
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
