package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.classes.User;
import com.example.demo.exception.BadCredentialsException;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public User login(@RequestBody User user) throws BadCredentialsException {
		User currentUser = userService.findByEmpId(user.getEmpId());
		if (currentUser != null && currentUser.getPassword().equals(user.getPassword())) {
			return currentUser;
		}else {
			throw new BadCredentialsException("Invalid Credentials");
		}
	}

	@PostMapping("/signup")
	public boolean signUp(@RequestBody User user) {
		try {
			userService.save(user);
			return true;//"Signed up successfully. Please try logging in.";
		} catch (Exception e) {
			return false;
		}
	}
	
	@GetMapping("/userlist")
	public List<User> getUsers(){
		return userService.findAll();
	}

}
