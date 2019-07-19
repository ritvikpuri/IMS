package com.example.demo.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.classes.Inventory;
import com.example.demo.repository.InventoryRepository;
import com.example.demo.service.InventoryService;

@Service
public class InventoryServiceImpl implements InventoryService{
	
	@Autowired
	InventoryRepository inventoryRepo;

	@Override
	public List<Inventory> findByType(String type) {
		return inventoryRepo.findByType(type);
	}

	@Override
	public void saveAndFlush(Inventory inventory) {
		inventoryRepo.saveAndFlush(inventory);
	}

	@Override
	public List<Inventory> findAll() {
		return inventoryRepo.findAll();
	}

	@Override
	public void deleteByItemName(String itemName) {
		inventoryRepo.deleteByItemName(itemName);
	}

	@Override
	public void deleteById(long id) {
		inventoryRepo.deleteById(id);
	}



	@Override
	public Inventory findByItemName(String name) {
		return inventoryRepo.findByItemName(name);
	}

}
