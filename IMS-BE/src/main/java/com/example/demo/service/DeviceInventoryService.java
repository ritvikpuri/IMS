package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.classes.DeviceInventory;

@Service
public interface DeviceInventoryService {

	void save(DeviceInventory deviceInventory);

	List<DeviceInventory> findAll();
	
	List<DeviceInventory> findByItemName(String itemName);
	
	void deleteBySerialNumber(String serialNumber);
	
}
