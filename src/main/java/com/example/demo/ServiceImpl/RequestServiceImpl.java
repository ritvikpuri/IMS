package com.example.demo.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Classes.Inventory;
import com.example.demo.Classes.Request;
import com.example.demo.Repository.RequestRepository;
import com.example.demo.Service.InventoryService;
import com.example.demo.Service.RequestService;

@Service
public class RequestServiceImpl implements RequestService{
	
	@Autowired
	RequestRepository requestRepo;
	
	@Autowired
	InventoryService inventoryService;

	@Override
	public void saveAndFlush(Request request) {
		requestRepo.saveAndFlush(request);
	}

	@Override
	public List<Request> findByActive(boolean active) {
		return requestRepo.findByActive(active);
	}

	@Override
	public void deleteById(long id) {
		requestRepo.deleteById(id);
	}

	@Override
	public Request findByItemName(String name) {
		return requestRepo.findByItemName(name);
	}

	@Override
	public int findQtyByItemName(String name) {
		Inventory item = inventoryService.findByItemName(name);
		return item.getQty();
	}

	@Override
	public List<Request> findByPending(Boolean pending) {
		return requestRepo.findByPending(pending);
	}

}
