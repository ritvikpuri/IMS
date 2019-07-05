package com.example.demo.Controller;

import java.text.DateFormat;
import java.text.ParseException;
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

import com.example.demo.VariableStrings;
import com.example.demo.Classes.Inventory;
import com.example.demo.Classes.Request;
import com.example.demo.Service.InventoryService;
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
	
	@Autowired
	InventoryService inventoryService;

	private static final DateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
	
	public Inventory getInventoryFromRequestName(String name) {
		return inventoryService.findByItemName(name);
	}

	@PostMapping("/request")
	public void getRequest(@RequestBody Request request) throws ParseException {
		request.setActive(true);
		Date date = new Date();
		request.setRequestDate(sdf.format(date));
		
		Inventory inventoryItem = getInventoryFromRequestName(request.getItemName());
		if(inventoryItem.getType().equals(VariableStrings.DEVICES)) {
			Date estDate = sdf.parse(request.getRequestDate());
			StringBuffer sb=new StringBuffer(request.getRequestDate());
			int time=Integer.parseInt(sb.substring(11, 13))+request.getDuration();
			if(time>24) {time=21;}
			sb.replace(11, 13, Integer.toString(time));
			String t=sb.toString();
			request.setEstimatedReturnDate(t);
			
			
		}
		requestService.saveAndFlush(request);
	}
	
	@PostMapping("/request/device")
	public void getDeviceRequest(@RequestBody Request request) {
		
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
		
		Inventory currItem = inventoryService.findByItemName(request.getItemName());
		currItem.setQty(currItem.getQty()-1);
		inventoryService.saveAndFlush(currItem);
	}
	
	@PostMapping("/request/confirm")
	public void confirmRequest(@RequestBody Request request) {
		request.setActive(false);
		Date date = new Date();
		request.setAcceptDate(sdf.format(date));
		requestService.saveAndFlush(request);
	}

}
