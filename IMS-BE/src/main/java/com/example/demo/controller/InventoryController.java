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

/**
 * The Class InventoryController.
 */
@RestController
@CrossOrigin(origins = "*")
public class InventoryController {
	
	/** The inventory service. */
	@Autowired
	InventoryService inventoryService;
	
	/**
	 * Gets the list of all items in inventory.
	 *
	 * @return the inventory
	 */
	@GetMapping("/inventory")
	public List<Inventory> getInventory() {
		return inventoryService.findAll();
	}
	
	/**
	 * Gets the list of all medicines.
	 *
	 * @return the medicine
	 */
	@GetMapping("/inventory/medicine")
	public List<Inventory> getMedicine() {
		return inventoryService.findByType(VariableStrings.MEDICINES);
	}
	
	/**
	 * Gets the list of all stationary.
	 *
	 * @return the stationary
	 */
	@GetMapping("/inventory/stationary")
	public List<Inventory> getStationary() {
		return inventoryService.findByType(VariableStrings.STATIONARY);
	}
	
	/**
	 * Gets the list of all devices.
	 *
	 * @return the devices
	 */
	@GetMapping("/inventory/devices")
	public List<Inventory> getDevices() {
		return inventoryService.findByType(VariableStrings.DEVICES);
	}
	
	/**
	 * This method is called when a new item is added to the inventory.
	 *
	 * @param inventory 
	 */
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
