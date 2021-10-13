package DelvierySystem.controller;

/*DeliveryMenController is responsible for actions performed by the deliveryPerson in the Delivery system*/

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DelvierySystem.exception.ConnectionToRedisFailed;
import DelvierySystem.model.Customer;
import DelvierySystem.model.DeliveryPerson;
import DelvierySystem.model.Package;
import DelvierySystem.model.PointD;
import DelvierySystem.model.Role;
import DelvierySystem.model.State;
import DelvierySystem.model.UsersRole;
import DelvierySystem.service.DeliveryPersonService;
import DelvierySystem.service.DistributedLock;
import DelvierySystem.service.PackageService;
import DelvierySystem.service.PriceFieldService;
import DelvierySystem.service.UsersRoleService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/redis/DeliveryPerson")
public class DeliveryPersonController {

	private static final Logger LOG = LoggerFactory.getLogger(DeliveryPersonController.class);

	@Autowired
	DeliveryPersonService serviceDeliveryMen;

	@Autowired
	PackageService servicePackage;
	@Autowired
	PriceFieldService servicePriceFieldService;
	@Autowired
	DistributedLock distributedLock;

	@Autowired
	UsersRoleService usersRoleService;

	// save a new DeliveryPerson.
	// Url - http://localhost:10091/api/redis/DeliveryPerson/update_DeliveryPerson
	@PutMapping("/add_DeliveryPerson/{id}")
	public ResponseEntity<String> update(@Valid @RequestBody final DeliveryPerson deliveryMen) {
		UsersRole newUser = new UsersRole(deliveryMen.getUsername(), Role.ROLE_DELIVERY_PERSON,
				deliveryMen.getPassword());
		usersRoleService.save(newUser);
		serviceDeliveryMen.save(deliveryMen);
		LOG.info("Update the DeliveryPerson to the redis");
		return ResponseEntity.ok("DeliveryPerson is updated!!!");
	}

	// Update deliveryMen position.
	// Url -
	// http://localhost:10091/api/redis/DeliveryPerson/updadate_DeliveryPerson_Position/position_Y/{position_Y}/position_X/{position_X}/id/{id}
	@PutMapping("/updadate_DeliveryPerson_Position/position_Y/{position_Y}/position_X/{position_X}/id/{id}")
	public ResponseEntity<String> updadate_DeliveryPerson_Position(@PathVariable("id") String id,
			@PathVariable("position_X") double position_X, @PathVariable("position_Y") double position_Y) {
		try {
			DeliveryPerson temp = serviceDeliveryMen.findById(id);
			if (temp.getUsername() == null)
				return null;
			temp.setPosition(new PointD(position_X, position_Y));
			serviceDeliveryMen.save(temp);
			LOG.info("Update the deliveryMen`postion to the redis");
			return ResponseEntity.ok("postion is updated!!!");
		} catch (Exception ex) {
			return ResponseEntity.ok("you have a mistake, The deliveryMen id is not in the database");
		}
	}

	// Get deliveryMen by id.
	// Url - http://localhost:10091/api/redis/DeliveryPerson/get/<package_id>
	@GetMapping("getById/{DeliveryPerson_id}")
	public DeliveryPerson findPackageById(@PathVariable("DeliveryPerson_id") final String DeliveryPerson_id) {
		LOG.info("Fetching package with id= " + DeliveryPerson_id);
		return serviceDeliveryMen.findById(DeliveryPerson_id);
	}

	// Get package by deliveryMenid.
	// Url - http://localhost:10091/api/redis/DeliveryPerson/get/<package_id>
	@GetMapping("findPackageByDELIId/{DeliveryPerson_id}")
	public Package findPackageByDELIId(@PathVariable("DeliveryPerson_id") final String DeliveryPerson_id) {
		LOG.info("Fetching package with id= " + DeliveryPerson_id);
		DeliveryPerson temp = serviceDeliveryMen.findById(DeliveryPerson_id);
		if (temp.getCurrent_delivery_id() == null)
			throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
		return servicePackage.findById(temp.getCurrent_delivery_id());
	}

	// Update deliveryMen statos.
	// Url - http://localhost:10091/api/redis/DeliveryPerson/update_Statos_Package
	@PutMapping("/update_Statos_Package/statos/{statos}/id/{id}")
	public ResponseEntity<String> update_Statos_Package(@Valid @PathVariable("id") String id,
			@Valid @PathVariable("statos") Boolean statos) {
		try {
			Package temp = servicePackage.findById(id);
			if (temp.getId() == null)
				return null;
			temp.setStatosCompletedPackage(statos);
			servicePackage.save(temp);
			LOG.info("Update the Package`statos to the redis");
			return ResponseEntity.ok("statos is updated!!!");
		} catch (Exception ex) {
			return ResponseEntity.ok("you have a mistake, The package id is not in the database");
		}
	}

	// Update deliveryMen state.
	// http://localhost:10091/api/redis/DeliveryPerson/update_State/state/{state}/id/{id}
	@PutMapping("/update_State_Package/id/{id}")
	public ResponseEntity<String> update_State_Package(@Valid @PathVariable("id") String id,
			@Valid @RequestBody State state) {
		try {
			servicePackage.update_state(id, state);
			LOG.info("Update the DeliveryPerson`statos to the redis");
			return ResponseEntity.ok("state is updated!!!");

		} catch (Exception ex) {
			return ResponseEntity.ok("you have a mistake, The package id is not in the database");
		}
	}

	// Update deliveryMen statosCurrentlyWorking.
	// http://localhost:10091/api/redis/DeliveryPerson/update_DeliveryMen_statosCurrentlyWorking
	@PutMapping("/update_DeliveryMen_statosCurrentlyWorking/statosCurrentlyWorking/{statosCurrentlyWorking}/id/{id}")
	public ResponseEntity<String> update_DeliveryMen_statosCurrentlyWorking(@Valid @PathVariable("id") String id,
			@Valid @PathVariable("statosCurrentlyWorking") Boolean statosCurrentlyWorking) {
		try {
			DeliveryPerson temp = serviceDeliveryMen.findById(id);
			if (temp.getUsername() == null)
				return null;
			temp.setStatosCurrentlyWorking(statosCurrentlyWorking);
			serviceDeliveryMen.save(temp);
			LOG.info("statos Currently Working is updated!!!");
			return ResponseEntity.ok("statos Currently Working is updated!!!");
		} catch (Exception ex) {
			return ResponseEntity.ok("you have a mistake, The deliveryMen id is not in the database");
		}
	}
}