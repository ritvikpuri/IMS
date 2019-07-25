package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.classes.User;

/**
 * The Interface UserRepository.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	/**
	 * Find by emp id.
	 *
	 * @param username the username
	 * @return the user
	 */
	User findByEmpId(String username);
	
}
