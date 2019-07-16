package com.example.demo.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Classes.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Service.UserService;


@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	
	@Override
	public User findByEmpId(String empId) {
		return userRepository.findByEmpId(empId);
	}


	@Override
	public void save(User user) {
		userRepository.save(user);
	}


	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}
}
