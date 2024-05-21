package lk.ijse.gdse66.shoeshopbackend.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class EmailSender {
    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        log.info("Sending email to {}", to);
      try {
          SimpleMailMessage message = new SimpleMailMessage();
          message.setTo(to);
          message.setSubject(subject);
          message.setText(text);
          mailSender.send(message);
          log.info("Email sent successfully to {}", to);

      }catch (Exception e){
          log.error("Error in sending email",e);}

    }
}
