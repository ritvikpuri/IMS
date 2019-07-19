package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.VariableStrings;
import com.example.demo.classes.Inventory;
import com.example.demo.service.InventoryService;

@RestController
@CrossOrigin(origins = "*")
public class InventoryController {
	
	@Autowired
	InventoryService inventoryService;
	
	@GetMapping("/inventory")
	public List<Inventory> getInventory() {
		return inventoryService.findAll();
	}
	
	@GetMapping("/inventory/medicine")
	public List<Inventory> getMedicine() {
		return inventoryService.findByType(VariableStrings.MEDICINES);
	}
	
	@GetMapping("/inventory/stationary")
	public List<Inventory> getStationary() {
		return inventoryService.findByType(VariableStrings.STATIONARY);
	}
	
	@GetMapping("/inventory/devices")
	public List<Inventory> getDevices() {
		return inventoryService.findByType(VariableStrings.DEVICES);
	}
	
	@PostMapping("/inventory/add")
	public void addInventory(@RequestBody Inventory inventory) {
		List<Inventory> listOfInventory = inventoryService.findAll();
		boolean check = false;
		for(Inventory item: listOfInventory) {
			String inventoryNameToCompare = inventory.getItemName().replaceAll("\\s+","");
			String itemNameToCompare = item.getItemName().replaceAll("\\s+","");
			if(itemNameToCompare.equalsIgnoreCase(inventoryNameToCompare)) {
				check = true;
				int currentQty = item.getQty();
				inventoryService.deleteById(item.getId());
				Inventory newInventoryItem = new Inventory();
				newInventoryItem.setItemName(item.getItemName());
				newInventoryItem.setType(item.getType());
				newInventoryItem.setQty(currentQty+inventory.getQty());
				inventoryService.saveAndFlush(newInventoryItem);
			}
		}
		if(!check) {
			inventoryService.saveAndFlush(inventory);
		}
	}
}
