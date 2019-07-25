package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.VariableStrings;
import com.example.demo.classes.DeviceInventory;
import com.example.demo.classes.Inventory;
import com.example.demo.service.DeviceInventoryService;
import com.example.demo.service.InventoryService;

/**
 * The Class DeviceInventoryController.
 */
@Controller
@CrossOrigin(origins = "*")
public class DeviceInventoryController {
	
	/** The device inventory service. */
	@Autowired
	DeviceInventoryService deviceInventoryService;
	
	/** The inventory service. */
	@Autowired
	InventoryService inventoryService;
	
	/**
	 * Adds a new device to the inventory.
	 *
	 * @param deviceInventory
	 */
	@PostMapping("/inventory/add/devices")
	public void addDevices(@RequestBody DeviceInventory deviceInventory) {
		deviceInventoryService.save(deviceInventory);
		List<Inventory> listOfInventory = inventoryService.findAll();
		boolean check = false;
		for(Inventory item: listOfInventory) {
			String inventoryNameToCompare = deviceInventory.getItemName().replaceAll("\\s+","");
			String itemNameToCompare = item.getItemName().replaceAll("\\s+","");
			if(itemNameToCompare.equalsIgnoreCase(inventoryNameToCompare)) {
				check = true;
				item.setQty(item.getQty()+1);
				inventoryService.saveAndFlush(item);
			}
		}
		if(!check) {
			Inventory item = new Inventory();
			item.setItemName(deviceInventory.getItemName());
			item.setQty(1);
			item.setType(VariableStrings.DEVICES);
			inventoryService.saveAndFlush(item);
		}
	}
	
	/**
	 * Gets the list of all devices.
	 *
	 * @return the devices
	 */
	@GetMapping("/deviceinventory/devices")
	public List<DeviceInventory> getDevices() {
		return deviceInventoryService.findAll();
	}

}
