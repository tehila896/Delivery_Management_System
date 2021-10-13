package DelvierySystem.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/*CustomerController is responsible for actions performed by the customer in the Delivery system*/

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DelvierySystem.dao.UsersRoleRepo;
import DelvierySystem.kafka.KafkaSender;
import DelvierySystem.model.Customer;
import DelvierySystem.model.DeliveryPerson;
import DelvierySystem.model.Package;
import DelvierySystem.model.Role;
import DelvierySystem.model.State;
import DelvierySystem.model.UnitOfDistance;
import DelvierySystem.model.UsersRole;
import DelvierySystem.service.CustomerService;
import DelvierySystem.service.PackageService;
import DelvierySystem.service.UsersRoleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/redis/customer")
public class CustomerController {

	private static final Logger LOG = LoggerFactory.getLogger(CustomerController.class);

	@Autowired
	CustomerService serviceCustomer;

	@Autowired
	PackageService servicePackage;

	@Autowired
	UsersRoleService usersRoleService;

	@Autowired
	KafkaSender kafkaSender;

	// Get all Packages by customer id.
	// Url - http://localhost:10091/api/redis/customer/findPackageBy_customerId
	@GetMapping("/findPackageBy_customerId/{id}")
	public Collection<Package> findPackageBy_customerId(@PathVariable("id") final String id) {
		LOG.info("Fetching all customers from the redis.");
		final Map<String, Package> packageMap = servicePackage.findAll();
		final Map<String, Package> packageByCustomerIdMap = new HashMap<>();
		for (Package item : packageMap.values()) {
			if (item.getCustomer_id().equals(id))
				packageByCustomerIdMap.put(item.getId(), item);
		}
		// Todo - If developers like they can sort the map (optional).
		return packageByCustomerIdMap.values();
	}

	// Save a new customer.
	// Url - http://localhost:10091y
	@PostMapping("/save_customer")
	public ResponseEntity<?> save(@Valid @RequestBody final Customer customer) {
		try {
			Customer temp = serviceCustomer.findById(customer.getUsername());
			if (temp.getUsername() == null)
				return null;
		} catch (Exception ex) {
			UsersRole newUser = new UsersRole(customer.getUsername(), Role.ROLE_CUSTOMER, customer.getPassword());
			usersRoleService.save(newUser);
			serviceCustomer.save(customer);
			LOG.info("Saving the new customer to the redis.");
			return ResponseEntity.ok("A new customer is saved!!!");
		}
		return ResponseEntity.badRequest().body("Error: Username is already in use!");

		// return ResponseEntity.ok("The customer id is already in the database,you can
		// update him!!!");
	}

	// Update a new customer.
	// Url - http://localhost:10091/api/redis/update_customer
	@PutMapping("/save_customer/{id}")
	public ResponseEntity<String> update(@Valid @RequestBody final Customer customer) {
		serviceCustomer.save(customer);
		;
		return ResponseEntity.ok("customer is updated!!!");
	}

	// Order a new package.
	// Url - http://localhost:10091/api/redis/customer/order_package
	@PostMapping("/order_package")
	public ResponseEntity<String> orderPackage(@Valid @RequestBody Package deliveryPackage) {
		Map<String, Package> packageMenMap = servicePackage.findAll();
		long count = packageMenMap.size() + 1;
		String id = String.valueOf(count);
		try {
			Customer temp = serviceCustomer.findById(deliveryPackage.getCustomer_id());
			if (temp.getUsername() == null)
				return null;
		} catch (Exception ex) {
			return ResponseEntity.ok("you have a mistake, The customer id is not in the database");
		}
		try {
			Package temp = servicePackage.findById(deliveryPackage.getId());
			if (temp.getId() == null)
				return null;
		} catch (Exception ex) {
			deliveryPackage.setId(id);
			servicePackage.save(deliveryPackage);
			LOG.info("Saving the new Package to the redis.");
			kafkaSender.send(deliveryPackage.getId());
			LOG.info("sending to kafka send.");
			return ResponseEntity.ok(deliveryPackage.getId());
		}
		return ResponseEntity.ok("This Package id is already in the database");

	}

	// update package.
	// Url - http://localhost:10091/api/redis/customer/order_package
	@PutMapping("/order_package")
	public ResponseEntity<String> updatePackage(@Valid @RequestBody Package deliveryPackage) {
		Package temp = servicePackage.findById(deliveryPackage.getId());
		servicePackage.save(deliveryPackage);
		return ResponseEntity.ok(" Package is update");

	}

	// Get package by id.
	// Url - http://localhost:10091/api/redis/customer/get/<package_id>
	@GetMapping("/get/PackageById/{package_id}")
	public ResponseEntity<Package> findPackageById(@PathVariable("package_id") final String package_id) {
		LOG.info("Fetching package with id= " + package_id);
		return ResponseEntity.ok(servicePackage.findById(package_id));
	}

	// check State
	// Url - http://localhost:10091/api/redis/customer/checkState/<package_id>
	@GetMapping("/getState/{package_id}")
	public ResponseEntity<State> checkState(@PathVariable("package_id") final String package_id) {
		LOG.info("Fetching state of package= " + package_id);
		return ResponseEntity.ok(servicePackage.findById(package_id).getList_states().getLast());
	}

	// Get customer by id.
	// Url - http://localhost:10091/api/redis/customer/get/<customer_id>
	@GetMapping("/get/{id}")
	public Customer findById(@PathVariable("id") final String id) {
		LOG.info("Fetching customer with id= " + id);
		return serviceCustomer.findById(id);
	}

	// Delete customer by id.
	// Url - http://localhost:10091/api/redis/customer/delete_customer/<customer_id>
	@DeleteMapping("/delete_customer/{id}")
	public ResponseEntity<String> delete(@PathVariable("id") final String id) {
		try {
			Customer customer = serviceCustomer.findById(id);
			serviceCustomer.delete(customer.getUsername());
			usersRoleService.delete(customer.getUsername());
			LOG.info("Deleting customer with id= " + id);
			return ResponseEntity.ok("customer is deleted!!!");
		} catch (Exception e) {
			return ResponseEntity.ok("id customer not found!!!");
		}
	}
}
