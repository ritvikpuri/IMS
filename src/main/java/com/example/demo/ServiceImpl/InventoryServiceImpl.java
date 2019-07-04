package com.example.demo.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Classes.Inventory;
import com.example.demo.Repository.InventoryRepository;
import com.example.demo.Service.InventoryService;

@Service
public class InventoryServiceImpl implements InventoryService{
	
	@Autowired
	InventoryRepository inventoryRepo;

	@Override
	public List<Inventory> findByType(String type) {
		return inventoryRepo.findByType(type);
	}

	@Override
	public void save(Inventory inventory) {
		inventoryRepo.save(inventory);
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

}
