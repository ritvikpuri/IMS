package com.example.demo.Controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Classes.Request;
import com.example.demo.Service.NotificationService;
import com.example.demo.Service.RequestService;
import com.example.demo.Classes.User;
import com.example.demo.Service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class RequestController {

	@Autowired
	RequestService requestService;
	
	@Autowired
	NotificationService notificationService;
	
	@Autowired
	UserService userService;

	private static final DateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");

	@PostMapping("/request")
	public void getRequest(@RequestBody Request request) {
		Request newRequest = new Request();
		newRequest.setActive(true);
		newRequest.setEmpId(request.getEmpId());
		newRequest.setItemName(request.getItemName());
		Date date = new Date();
		newRequest.setRequestDate(sdf.format(date));
		newRequest.setEmpName(request.getEmpName());
		newRequest.setDept(request.getDept());
		requestService.save(newRequest);
	}
	
	@GetMapping("/request/active")
	public List<Request> getActiveRequest(){
		return requestService.findByActive(true);
	}
	
	@GetMapping("/request/history")
	public List<Request> getHistory(){
		return requestService.findByActive(false);
	}
	
	@PostMapping("/request/reject")
	public void rejectRequest(@RequestBody Request request) {
		requestService.deleteById(request.getId());
	}
	
	@PostMapping("/request/accept")
	public void acceptRequest(ModelMap model, @RequestBody Request request) {
		User loggedInUser = userService.findByEmpId(request.getEmpId());
		Date date = new Date();
		request.setAcceptDate(sdf.format(date));
		notificationService.sendNotification(model, request, loggedInUser);
	}
	
	@PostMapping("/request/confirm")
	public void confirmRequest(@RequestBody Request request) {
		Request newRequest = new Request();
		newRequest.setActive(false);
		newRequest.setEmpId(request.getEmpId());
		newRequest.setItemName(request.getItemName());
		newRequest.setRequestDate(request.getRequestDate());
		Date date = new Date();
		newRequest.setAcceptDate(sdf.format(date));
		newRequest.setEmpName(request.getEmpName());
		newRequest.setDept(request.getDept());
		requestService.save(newRequest);
		requestService.deleteById(request.getId());
	}

}
