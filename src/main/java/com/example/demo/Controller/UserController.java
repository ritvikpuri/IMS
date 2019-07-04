package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.Classes.User;
import com.example.demo.Service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public User login(@RequestBody User user) {
		User currentUser = userService.findByEmpId(user.getEmpId());
		if (currentUser != null && currentUser.getPassword().equals(user.getPassword())) {
			return currentUser;
		}
		User bt = new User();
		bt.setEmpId("0");
		return bt;
	}

	@PostMapping("/signup")
	public String signUp(@RequestBody User user) {
		try {
			userService.save(user);
			return "valid";
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Email/id is already in use", e);
		}
	}

}
