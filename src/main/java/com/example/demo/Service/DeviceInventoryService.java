package com.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Classes.DeviceInventory;

@Service
public interface DeviceInventoryService {

	void save(DeviceInventory deviceInventory);

	List<DeviceInventory> findAll();
	
	List<DeviceInventory> findByItemName(String itemName);
	
	void deleteBySerialNumber(String serialNumber);
	
}
