package com.example.demo.ServiceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Classes.DeviceInventory;
import com.example.demo.Repository.DeviceInventoryRepository;
import com.example.demo.Service.DeviceInventoryService;

@Service
@Transactional
public class DeviceInventoryServiceImpl implements DeviceInventoryService {

	@Autowired
	DeviceInventoryRepository deviceInventoryRepository;

	@Override
	public void save(DeviceInventory deviceInventory) {
		deviceInventoryRepository.save(deviceInventory);
	}

	@Override
	public List<DeviceInventory> findAll() {
		return deviceInventoryRepository.findAll();
	}

	@Override
	public List<DeviceInventory> findByItemName(String itemName) {
		return deviceInventoryRepository.findByItemName(itemName);
	}

	@Override
	public void deleteBySerialNumber(String serialNumber) {
		deviceInventoryRepository.deleteBySerialNumber(serialNumber);
	}

}
