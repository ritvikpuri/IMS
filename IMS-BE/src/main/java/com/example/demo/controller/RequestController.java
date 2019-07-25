package com.example.demo.controller;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.VariableStrings;
import com.example.demo.classes.DeviceInventory;
import com.example.demo.classes.Inventory;
import com.example.demo.classes.Request;
import com.example.demo.classes.User;
import com.example.demo.exception.ItemNotFoundException;
import com.example.demo.service.DeviceInventoryService;
import com.example.demo.service.InventoryService;
import com.example.demo.service.NotificationService;
import com.example.demo.service.RequestService;
import com.example.demo.service.UserService;

/**
 * The Class RequestController.
 */
@RestController
@CrossOrigin(origins = "*")
public class RequestController {

	/** The request service. */
	@Autowired
	RequestService requestService;

	/** The notification service. */
	@Autowired
	NotificationService notificationService;

	/** The user service. */
	@Autowired
	UserService userService;

	/** The inventory service. */
	@Autowired
	InventoryService inventoryService;

	/** The device inventory service. */
	@Autowired
	DeviceInventoryService deviceInventoryService;

/** The formatter. */
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

	/**
	 * This method is called when the user sends a new request for an item.
	 *
	 * @param request
	 * @return the request
	 * @throws ParseException
	 */
	@PostMapping("/request")
	public void getRequest(@RequestBody Request request) throws ParseException {
		try {
			request.setActive(true);
			LocalDateTime date = LocalDateTime.now();
			String formatDateTime = date.format(formatter);
			request.setRequestDate(formatDateTime);
			request.setCurrentQty(requestService.findQtyByItemName(request.getItemName()));
			requestService.saveAndFlush(request);
		} catch (NullPointerException e) {
			System.out.println(e);
		}

	}

	/**
	 * Gets the list of all active requests.
	 *
	 * @return the active request
	 */
	@GetMapping("/request/active")
	public List<Request> getActiveRequest() {
		return requestService.findByActive(true);
	}

	/**
	 * Gets the list of all pending requests.
	 *
	 * @return the pending request
	 */
	@GetMapping("/request/pending")
	public List<Request> getPendingRequest() {
		return requestService.findByPending(true);
	}

	/**
	 * Gets the request history.
	 *
	 * @return the history
	 */
	@GetMapping("/request/history")
	public List<Request> getHistory() {
		List<Request> listOfRequests = requestService.findByActive(false);
		List<Request> newList = new ArrayList<Request>();
		for (Request currentRequest : listOfRequests) {
			if (!currentRequest.isPending()) {
				newList.add(currentRequest);
			}
		}
		return newList;
	}

	/**
	 * This method is called if the admin rejcts the request incase
	 * of an item being unavailable.
	 *
	 * @param model
	 * @param request
	 */
	@PostMapping("/request/reject")
	public void rejectRequest(ModelMap model, @RequestBody Request request) {
		requestService.deleteById(request.getId());
		User loggedInUser = userService.findByEmpId(request.getEmpId());
		notificationService.sendNotificationReject(model, request, loggedInUser);
	}

	/**
	 * This method is called incase the user does not come to collect an item
	 * after it has been assigned to him.
	 *
	 * @param model the modelMap
	 * @param request
	 */
	@PostMapping("/request/rejectAfterAccept")
	public void rejectAfterAccept(ModelMap model, @RequestBody Request request) {
		User loggedInUser = userService.findByEmpId(request.getEmpId());
		notificationService.sendNotificationRejectAfterAccept(model, request, loggedInUser);

		if (request.getSerialNumber()!=null) {
			Inventory inventoryItem = inventoryService.findByItemName(request.getItemName());
			inventoryItem.setQty(inventoryItem.getQty() + 1);
			inventoryService.saveAndFlush(inventoryItem);

			DeviceInventory newItem = new DeviceInventory();
			newItem.setItemName(request.getItemName());
			newItem.setSerialNumber(request.getSerialNumber());
			deviceInventoryService.save(newItem);
		}
		requestService.deleteById(request.getId());
	}

	/**
	 * This method is called when the admin accepts the request
	 * and an item is assgined.
	 *
	 * @param model the modelMap
	 * @param request the request
	 */
	@PostMapping("/request/accept/item")
	public void acceptItemRequest(ModelMap model, @RequestBody Request request) {
		User loggedInUser = userService.findByEmpId(request.getEmpId());
		LocalDateTime date = LocalDateTime.now();
		String formatDateTime = date.format(formatter);
		request.setAcceptDate(formatDateTime);
		requestService.saveAndFlush(request);
		notificationService.sendNotificationAccept(model, request, loggedInUser);

		Inventory currItem = inventoryService.findByItemName(request.getItemName());
		currItem.setQty(currItem.getQty() - 1);
		inventoryService.saveAndFlush(currItem);
	}

	/**
	 * This method is called when the user collects the item.
	 *
	 * @param request
	 */
	@PostMapping("/request/confirm/item")
	public void confirmItemRequest(@RequestBody Request request) {
		request.setActive(false);
		LocalDateTime date = LocalDateTime.now();
		String formatDateTime = date.format(formatter);
		request.setAcceptDate(formatDateTime);
		requestService.saveAndFlush(request);
	}

	/**
	 * This method is called when the user collects the device.
	 *
	 * @param request the request
	 */
	@PostMapping("/request/confirm/device")
	public void confrimDeviceRequest(@RequestBody Request request) {

		// Request currRequest = (Request) model.get("request");
		request.setActive(false);
		request.setPending(true);
		LocalDateTime date = LocalDateTime.now();
		String formatDateTime = date.format(formatter);
		request.setAcceptDate(formatDateTime);

		Inventory inventoryItem = inventoryService.findByItemName(request.getItemName());
		if (inventoryItem.getType().equalsIgnoreCase(VariableStrings.DEVICES)) {
			LocalDateTime newDate = date.plusHours(request.getHours());
			LocalDateTime finalDate = newDate.plusMinutes(request.getMinutes());
			String formatEstDate = finalDate.format(formatter);
			request.setEstimatedReturnDate(formatEstDate);
		}
		requestService.saveAndFlush(request);
	}

	/**
	 * Accept device request.
	 *
	 * @param model 
	 * @param request 
	 * @return the string
	 * @throws ItemNotFoundException
	 */
	@PostMapping("/request/accept/device")
	public String acceptDeviceRequest(ModelMap model, @RequestBody Request request) throws ItemNotFoundException {

		List<DeviceInventory> listOfDevices = deviceInventoryService.findByItemName(request.getItemName());
		if (CollectionUtils.isEmpty(listOfDevices)) {
			throw new ItemNotFoundException("Item not found");
		}
		String serialNumber = listOfDevices.get(0).getSerialNumber();
		User loggedInUser = userService.findByEmpId(request.getEmpId());
		LocalDateTime date = LocalDateTime.now();
		String formatDateTime = date.format(formatter);
		request.setAcceptDate(formatDateTime);
		request.setSerialNumber(serialNumber);
		requestService.saveAndFlush(request);
		notificationService.sendNotificationAccept(model, request, loggedInUser);
		deviceInventoryService.deleteBySerialNumber(listOfDevices.get(0).getSerialNumber());
		Inventory currItem = inventoryService.findByItemName(request.getItemName());
		currItem.setQty(currItem.getQty() - 1);
		inventoryService.saveAndFlush(currItem);
		return serialNumber;

	}

	/**
	 * This method is called when a device is returned.
	 *
	 * @param request the request
	 */
	@PostMapping("request/returned")
	public void itemReturned(@RequestBody Request request) {
		request.setActive(false);
		request.setPending(false);
		LocalDateTime date = LocalDateTime.now();
		String formatDateTime = date.format(formatter);
		request.setReturnDate(formatDateTime);
		requestService.saveAndFlush(request);

		Inventory item = inventoryService.findByItemName(request.getItemName());
		if (Objects.nonNull(item)) {
			item.setQty(item.getQty() + 1);
		} else {
			item = new Inventory();
			item.setItemName(request.getItemName());
			item.setType(request.getType());
			item.setQty(1);
		}
		inventoryService.saveAndFlush(item);

		DeviceInventory newItem = new DeviceInventory();
		newItem.setItemName(request.getItemName());
		newItem.setSerialNumber(request.getSerialNumber());
		deviceInventoryService.save(newItem);
	}
}
