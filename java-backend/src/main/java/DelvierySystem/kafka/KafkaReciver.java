package DelvierySystem.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
* KafkaReciver listens to Kafka,
And when a customer orders a new package it pulls out the new package id from it*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.sun.tools.sjavac.Log;

import DelvierySystem.controller.CustomerController;
import DelvierySystem.controller.DeliveryPersonController;
import DelvierySystem.model.Package;
import DelvierySystem.service.DeliveryPersonService;
import DelvierySystem.service.PackageService;

@Component
public class KafkaReciver {
	
	@Autowired
	DeliveryPersonService deliveryMenService;
	
	@Autowired
	PackageService packageService;
	
	@Autowired
	KafkaSender kafkaSender;
	private static final Logger LOG = LoggerFactory.getLogger(KafkaReciver.class);

	@KafkaListener(topics = "packageIdd_topic", groupId = "packages", concurrency = "4")
	public void listenGroupFoo(String package_id) {
		Package delveryPackage=packageService.findById(package_id);
		Boolean flag=deliveryMenService.calclute_Distance(delveryPackage);
//		if(flag==false)
//		{
//			kafkaSender.send(package_id);
//			return;
//		}
		LOG.info("recived"+package_id);
		System.out.println("Proccessing message with thread id: " + Thread.currentThread().getName());
	    System.out.println("Received Message in group packages: " + package_id);
	}
}
