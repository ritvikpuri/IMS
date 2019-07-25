package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.classes.Request;

/**
 * The Interface RequestRepository.
 */
@Repository
public interface RequestRepository extends JpaRepository<Request, Long>{

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
