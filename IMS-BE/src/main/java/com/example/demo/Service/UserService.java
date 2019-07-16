package com.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Classes.User;

@Service
public interface UserService {

	User findByEmpId(String username);
	
	void save(User user);
	
	List<User> findAll();
}
