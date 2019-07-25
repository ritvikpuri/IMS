package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The Class BadCredentialsException.
 */
@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public class BadCredentialsException extends Exception {

	/**
	 * Instantiates a new bad credentials exception.
	 *
	 * @param message the message
	 */
	public BadCredentialsException(String message) {
		super(message);
	}	
}