package com.example.demo.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public class BadCredentialsException extends Exception {

	public BadCredentialsException(String message) {
		super(message);
	}	
}