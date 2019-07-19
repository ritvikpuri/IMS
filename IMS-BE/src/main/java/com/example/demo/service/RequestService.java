package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.classes.Request;

@Service
public interface RequestService {

	void saveAndFlush(Request request);
	
	List<Request> findByActive(boolean active);
	
	void deleteById(long id);
	
	Request findByItemName(String name);
	
	int findQtyByItemName(String name);
	
	List<Request> findByPending(Boolean pending);
}
