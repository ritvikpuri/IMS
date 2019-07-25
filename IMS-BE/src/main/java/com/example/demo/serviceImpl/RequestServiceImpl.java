package com.example.demo.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.classes.Inventory;
import com.example.demo.classes.Request;
import com.example.demo.repository.RequestRepository;
import com.example.demo.service.InventoryService;
import com.example.demo.service.RequestService;

/**
 * The Class RequestServiceImpl.
 */
@Service
public class RequestServiceImpl implements RequestService{
	
	/** The request repo. */
	@Autowired
	RequestRepository requestRepo;
	
	/** The inventory service. */
	@Autowired
	InventoryService inventoryService;

	/**
	 * Save and flush.
	 *
	 * @param request the request
	 */
	@Override
	public void saveAndFlush(Request request) {
		requestRepo.saveAndFlush(request);
	}

	/**
	 * Find by active.
	 *
	 * @param active the active
	 * @return the list
	 */
	@Override
	public List<Request> findByActive(boolean active) {
		return requestRepo.findByActive(active);
	}

	/**
	 * Delete by id.
	 *
	 * @param id the id
	 */
	@Override
	public void deleteById(long id) {
		requestRepo.deleteById(id);
	}

	/**
	 * Find by item name.
	 *
	 * @param name the name
	 * @return the request
	 */
	@Override
	public Request findByItemName(String name) {
		return requestRepo.findByItemName(name);
	}

	/**
	 * Find qty by item name.
	 *
	 * @param name the name
	 * @return the int
	 */
	@Override
	public int findQtyByItemName(String name) {
		Inventory item = inventoryService.findByItemName(name);
		return item.getQty();
	}

	/**
	 * Find by pending.
	 *
	 * @param pending the pending
	 * @return the list
	 */
	@Override
	public List<Request> findByPending(Boolean pending) {
		return requestRepo.findByPending(pending);
	}

}
