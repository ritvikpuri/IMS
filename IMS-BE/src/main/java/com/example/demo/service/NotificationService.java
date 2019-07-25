package com.example.demo.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.example.demo.classes.Request;
import com.example.demo.classes.User;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

/**
 * The Class NotificationService.
 */
@Service
public class NotificationService {

	/** The java mail sender. */
	private JavaMailSender javaMailSender;

	/**
	 * Instantiates a new notification service.
	 *
	 * @param javaMailSender the java mail sender
	 */
	@Autowired
	public NotificationService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	/** The config. */
	@Autowired
	private Configuration config;

	/**
	 * Send notification accept.
	 *
	 * @param model the model
	 * @param request the request
	 * @param loggedInUser the logged in user
	 */
	@Async("threadPoolTaskExecutor")
	public void sendNotificationAccept(ModelMap model, Request request, User loggedInUser) {
		sendEmail(model, request, loggedInUser, "email-template.ftl", "Request Approved!");
	}

	/**
	 * Send notification reject.
	 *
	 * @param model the model
	 * @param request the request
	 * @param loggedInUser the logged in user
	 */
	@Async("threadPoolTaskExecutor")
	public void sendNotificationReject(ModelMap model, Request request, com.example.demo.classes.User loggedInUser) {
		sendEmail(model, request, loggedInUser, "email-unavailable-template.ftl", "Item Unavailable");
	}
	
	/**
	 * Send notification reject after accept.
	 *
	 * @param model the model
	 * @param request the request
	 * @param loggedInUser the logged in user
	 */
	@Async("threadPoolTaskExecutor")
	public void sendNotificationRejectAfterAccept(ModelMap model, Request request, com.example.demo.classes.User loggedInUser) {
		sendEmail(model, request, loggedInUser, "email-not-collected-template.ftl", "Item Not Collected");
	}

	/**
	 * Send email.
	 *
	 * @param model the model
	 * @param request the request
	 * @param loggedInUser the logged in user
	 * @param templateName the template name
	 * @param subject the subject
	 */
	@Async("threadPoolTaskExecutor")
	private void sendEmail(ModelMap model, Request request, User loggedInUser, String templateName, String subject) {
		MimeMessage message = javaMailSender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
			helper.addAttachment("logo.png", new ClassPathResource("logo.png"));

			model.put("request", request);
			model.put("user", loggedInUser);

			Template t = config.getTemplate(templateName);
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

			helper.setTo(loggedInUser.getEmail());
			helper.setText(html, true);
			helper.setSubject(subject);
			helper.setFrom("iomedia.ims@gmail.com");

			javaMailSender.send(message);
		} catch (MessagingException | IOException | TemplateException e) {
			System.out.println(e.getMessage());
		}
	}

}