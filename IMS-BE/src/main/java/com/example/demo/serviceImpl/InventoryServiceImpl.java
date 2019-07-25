package com.example.demo.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.classes.Inventory;
import com.example.demo.repository.InventoryRepository;
import com.example.demo.service.InventoryService;

/**
 * The Class InventoryServiceImpl.
 */
@Service
public class InventoryServiceImpl implements InventoryService{
	
	/** The inventory repo. */
	@Autowired
	InventoryRepository inventoryRepo;

	/**
	 * Find by type.
	 *
	 * @param type the type
	 * @return the list
	 */
	@Override
	public List<Inventory> findByType(String type) {
		return inventoryRepo.findByType(type);
	}

	/**
	 * Save and flush.
	 *
	 * @param inventory the inventory
	 */
	@Override
	public void saveAndFlush(Inventory inventory) {
		inventoryRepo.saveAndFlush(inventory);
	}

	/**
	 * Find all.
	 *
	 * @return the list
	 */
	@Override
	public List<Inventory> findAll() {
		return inventoryRepo.findAll();
	}

	/**
	 * Delete by item name.
	 *
	 * @param itemName the item name
	 */
	@Override
	public void deleteByItemName(String itemName) {
		inventoryRepo.deleteByItemName(itemName);
	}

	/**
	 * Delete by id.
	 *
	 * @param id the id
	 */
	@Override
	public void deleteById(long id) {
		inventoryRepo.deleteById(id);
	}



	/**
	 * Find by item name.
	 *
	 * @param name the name
	 * @return the inventory
	 */
	@Override
	public Inventory findByItemName(String name) {
		return inventoryRepo.findByItemName(name);
	}

}
