package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.classes.Request;

/**
 * The Interface RequestService.
 */
@Service
public interface RequestService {

	/**
	 * Save and flush.
	 *
	 * @param request the request
	 */
	void saveAndFlush(Request request);
	
	/**
	 * Find by active.
	 *
	 * @param active the active
	 * @return the list
	 */
	List<Request> findByActive(boolean active);
	
	/**
	 * Delete by id.
	 *
	 * @param id the id
	 */
	void deleteById(long id);
	
	/**
	 * Find by item name.
	 *
	 * @param name the name
	 * @return the request
	 */
	Request findByItemName(String name);
	
	/**
	 * Find qty by item name.
	 *
	 * @param name the name
	 * @return the int
	 */
	int findQtyByItemName(String name);
	
	/**
	 * Find by pending.
	 *
	 * @param pending the pending
	 * @return the list
	 */
	List<Request> findByPending(Boolean pending);
}
