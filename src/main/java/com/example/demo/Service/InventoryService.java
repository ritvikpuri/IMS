package com.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Classes.Inventory;

@Service
public interface InventoryService {

	List<Inventory> findByType(String type);
	
	void save(Inventory inventory);
	
	List<Inventory> findAll();
	
	void deleteByItemName(String itemName);
	
	void deleteById(long id);
}
