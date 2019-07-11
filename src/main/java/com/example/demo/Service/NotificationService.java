package com.example.demo.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.example.demo.Classes.Request;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
public class NotificationService {

	private JavaMailSender javaMailSender;

	@Autowired
	public NotificationService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	@Autowired
	private Configuration config;

	public void sendNotificationAccept(ModelMap model, Request request, com.example.demo.Classes.User loggedInUser) {
		MimeMessage message = javaMailSender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
			helper.addAttachment("logo.png", new ClassPathResource("logo.png"));

			model.put("request", request);
			model.put("user", loggedInUser);

			Template t = config.getTemplate("email-template.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

			helper.setTo(loggedInUser.getEmail());
			helper.setText(html, true);
			helper.setSubject("Request Approved!");
			helper.setFrom("iomedia.ims@gmail.com");

			javaMailSender.send(message);
		} catch (MessagingException | IOException | TemplateException e) {
			System.out.println(e.getMessage());
		}
	}
	
	public void sendNotificationReject(ModelMap model, Request request, com.example.demo.Classes.User loggedInUser) {
		MimeMessage message = javaMailSender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
			helper.addAttachment("logo.png", new ClassPathResource("logo.png"));

			model.put("request", request);
			model.put("user", loggedInUser);

			Template t = config.getTemplate("email-unavailable-template.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

			helper.setTo(loggedInUser.getEmail());
			helper.setText(html, true);
			helper.setSubject("Item Unavailable!");
			helper.setFrom("iomedia.ims@gmail.com");

			javaMailSender.send(message);
		} catch (MessagingException | IOException | TemplateException e) {
			System.out.println(e.getMessage());
		}
	}
}