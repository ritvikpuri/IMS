package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.classes.Inventory;

/**
 * The Interface InventoryService.
 */
@Service
public interface InventoryService {

	/**
	 * Find by type.
	 *
	 * @param type the type
	 * @return the list
	 */
	List<Inventory> findByType(String type);
	
	/**
	 * Save and flush.
	 *
	 * @param inventory the inventory
	 */
	void saveAndFlush(Inventory inventory);
	
	/**
	 * Find all.
	 *
	 * @return the list
	 */
	List<Inventory> findAll();
	
	/**
	 * Delete by item name.
	 *
	 * @param itemName the item name
	 */
	void deleteByItemName(String itemName);
	
	/**
	 * Delete by id.
	 *
	 * @param id the id
	 */
	void deleteById(long id);

	/**
	 * Find by item name.
	 *
	 * @param name the name
	 * @return the inventory
	 */
	Inventory findByItemName(String name);
}
