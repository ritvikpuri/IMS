package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.classes.User;

/**
 * The Interface UserService.
 */
@Service
public interface UserService {

	/**
	 * Find by emp id.
	 *
	 * @param username the username
	 * @return the user
	 */
	User findByEmpId(String username);
	
	/**
	 * Save.
	 *
	 * @param user the user
	 */
	void save(User user);
	
	/**
	 * Find all.
	 *
	 * @return the list
	 */
	List<User> findAll();
}
