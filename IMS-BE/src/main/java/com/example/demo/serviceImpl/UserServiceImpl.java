package com.example.demo.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.classes.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

/**
 * The Class UserServiceImpl.
 */
@Service
public class UserServiceImpl implements UserService {

	/** The user repository. */
	@Autowired
	private UserRepository userRepository;

	/**
	 * Find by emp id.
	 *
	 * @param empId the emp id
	 * @return the user
	 */
	@Override
	public User findByEmpId(String empId) {
		return userRepository.findByEmpId(empId);
	}

	/**
	 * Save.
	 *
	 * @param user the user
	 */
	@Override
	public void save(User user) {
		userRepository.save(user);
	}

	/**
	 * Find all.
	 *
	 * @return the list
	 */
	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}
}
