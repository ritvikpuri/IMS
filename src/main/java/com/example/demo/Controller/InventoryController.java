package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Classes.Inventory;
import com.example.demo.Service.InventoryService;

import com.example.demo.*;

@RestController
@CrossOrigin(origins = "*")
public class InventoryController {
	
	@Autowired
	InventoryService inventoryService;

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
			if(inventory.getItemName().equalsIgnoreCase(item.getItemName())) {
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
