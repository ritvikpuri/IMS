package com.example.demo.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.classes.DeviceInventory;
import com.example.demo.repository.DeviceInventoryRepository;
import com.example.demo.service.DeviceInventoryService;

/**
 * The Class DeviceInventoryServiceImpl.
 */
@Service
@Transactional
public class DeviceInventoryServiceImpl implements DeviceInventoryService {

	/** The device inventory repository. */
	@Autowired
	DeviceInventoryRepository deviceInventoryRepository;

	/**
	 * Save.
	 *
	 * @param deviceInventory the device inventory
	 */
	@Override
	public void save(DeviceInventory deviceInventory) {
		deviceInventoryRepository.save(deviceInventory);
	}

	/**
	 * Find all.
	 *
	 * @return the list
	 */
	@Override
	public List<DeviceInventory> findAll() {
		return deviceInventoryRepository.findAll();
	}

	/**
	 * Find by item name.
	 *
	 * @param itemName the item name
	 * @return the list
	 */
	@Override
	public List<DeviceInventory> findByItemName(String itemName) {
		return deviceInventoryRepository.findByItemName(itemName);
	}

	/**
	 * Delete by serial number.
	 *
	 * @param serialNumber the serial number
	 */
	@Override
	public void deleteBySerialNumber(String serialNumber) {
		deviceInventoryRepository.deleteBySerialNumber(serialNumber);
	}

}
