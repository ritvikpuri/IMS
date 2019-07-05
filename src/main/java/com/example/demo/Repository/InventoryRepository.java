package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Classes.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long>{

	List<Inventory> findByType(String type);
	
	void deleteByItemName(String itemName);
	
	Inventory findByItemName(String name);
}
