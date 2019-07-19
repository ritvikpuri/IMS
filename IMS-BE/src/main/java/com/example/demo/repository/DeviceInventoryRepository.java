package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.classes.DeviceInventory;

@Repository
public interface DeviceInventoryRepository extends JpaRepository<DeviceInventory, Long>{
	
	List<DeviceInventory> findByItemName(String itemName);
	
	void deleteBySerialNumber(String serialNumber);
}
