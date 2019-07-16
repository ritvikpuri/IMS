package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.VariableStrings;
import com.example.demo.Classes.DeviceInventory;
import com.example.demo.Classes.Inventory;
import com.example.demo.Service.DeviceInventoryService;
import com.example.demo.Service.InventoryService;

@Controller
@CrossOrigin(origins = "*")
public class DeviceInventoryController {
	
	@Autowired
	DeviceInventoryService deviceInventoryService;
	
	@Autowired
	InventoryService inventoryService;
	
	@PostMapping("/inventory/add/devices")
	public void addDevices(@RequestBody DeviceInventory deviceInventory) {
		deviceInventoryService.save(deviceInventory);
		List<Inventory> listOfInventory = inventoryService.findAll();
		boolean check = false;
		for(Inventory item: listOfInventory) {
			if(deviceInventory.getItemName().equalsIgnoreCase(item.getItemName())) {
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
	
	@GetMapping("/deviceinventory/devices")
	public List<DeviceInventory> getDevices() {
		return deviceInventoryService.findAll();
	}

}
