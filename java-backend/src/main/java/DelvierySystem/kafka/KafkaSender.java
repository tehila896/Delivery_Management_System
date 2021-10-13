package DelvierySystem.kafka;

/*When a customer orders a new package KafkaSender pushes the package id to kafka*/

import java.time.LocalDateTime;
import java.util.LinkedList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import DelvierySystem.model.State;
import DelvierySystem.controller.CustomerController;
import DelvierySystem.exception.ConnectionToKafkaFailed;
import DelvierySystem.model.Package;
import DelvierySystem.service.PackageService;

@Service
public class KafkaSender {
	
	@Autowired
	private KafkaTemplate<String,String> kafkaTemplate;
	
	@Autowired
	PackageService packageService;
	
	private static final Logger LOG = LoggerFactory.getLogger(CustomerController.class);

	
	String kafkaTopic = "packageIdd_topic";
	
	public void send(String package_id) {
		Package delveryPackage=packageService.findById(package_id);
		try {
			kafkaTemplate.send(kafkaTopic, package_id);
	        LOG.info("send"+package_id);
		} 
		catch (Exception e) {

			throw new ConnectionToKafkaFailed("Connection to kafka failed, please try later");
		}   
	}
}
