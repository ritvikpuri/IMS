package com.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Classes.Request;

@Service
public interface RequestService {

	void save(Request request);
	
	List<Request> findByActive(boolean active);
	
	void deleteById(long id);
}
