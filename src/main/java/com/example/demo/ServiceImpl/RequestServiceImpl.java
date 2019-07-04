package com.example.demo.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Classes.Request;
import com.example.demo.Repository.RequestRepository;
import com.example.demo.Service.RequestService;

@Service
public class RequestServiceImpl implements RequestService{
	
	@Autowired
	RequestRepository requestRepo;

	@Override
	public void save(Request request) {
		requestRepo.save(request);
	}

	@Override
	public List<Request> findByActive(boolean active) {
		return requestRepo.findByActive(active);
	}

	@Override
	public void deleteById(long id) {
		requestRepo.deleteById(id);
	}

}