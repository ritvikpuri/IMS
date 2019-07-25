package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.classes.Inventory;

/**
 * The Interface InventoryRepository.
 */
@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long>{

	/**
	 * Find by type.
	 *
	 * @param type the type
	 * @return the list
	 */
	List<Inventory> findByType(String type);
	
	/**
	 * Delete by item name.
	 *
	 * @param itemName the item name
	 */
	void deleteByItemName(String itemName);
	
	/**
	 * Find by item name.
	 *
	 * @param name the name
	 * @return the inventory
	 */
	Inventory findByItemName(String name);
}
