package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.classes.Inventory;

@Service
public interface InventoryService {

	List<Inventory> findByType(String type);
	
	void saveAndFlush(Inventory inventory);
	
	List<Inventory> findAll();
	
	void deleteByItemName(String itemName);
	
	void deleteById(long id);

	Inventory findByItemName(String name);
}
