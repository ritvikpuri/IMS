package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.classes.User;

@Service
public interface UserService {

	User findByEmpId(String username);
	
	void save(User user);
	
	List<User> findAll();
}
