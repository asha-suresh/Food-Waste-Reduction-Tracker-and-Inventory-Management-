package com.fwrt.dashboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    //for forget username or password.
    public void sendEmail(String to, String userName, String generatedPassword) {
        SimpleMailMessage message = new SimpleMailMessage();

        String subject = "Please Reset Your Password";
        String messageText = "Hi "+ userName +","
                + "Your password has been reset. Please use username as" + userName +" and password as :"+ generatedPassword + "to login. Please login and reset your password" +
                " as soon as possible"+
                "Thank you,"+
                "FWRT";

        message.setTo(to);
        message.setSubject(subject);
        message.setText(messageText);
        javaMailSender.send(message);
    }


}
