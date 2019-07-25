package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The Class ItemNotFoundException.
 */
@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ItemNotFoundException extends Exception {

	/**
	 * Instantiates a new item not found exception.
	 *
	 * @param message the message
	 */
	public ItemNotFoundException(String message) {
		super(message);
	}	
}