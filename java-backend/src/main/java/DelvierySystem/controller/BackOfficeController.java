package DelvierySystem.controller;


import java.util.Collection;

/*BackOfficeController is responsible for operations related to the management of the Delivery system*/

import java.util.Map;
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
import DelvierySystem.model.Bacckoffice;
import DelvierySystem.model.Customer;
import DelvierySystem.model.DeliveryPerson;
import DelvierySystem.model.Package;
import DelvierySystem.model.PriceField;
import DelvierySystem.model.Role;
import DelvierySystem.model.UsersRole;
import DelvierySystem.service.CustomerService;
import DelvierySystem.service.DeliveryPersonService;
import DelvierySystem.service.DistributedLock;
import DelvierySystem.service.PackageService;
import DelvierySystem.service.BackOfficeService;
import DelvierySystem.service.PriceFieldService;
import DelvierySystem.service.UsersRoleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/redis/backOffice")
public class BackOfficeController {
	private static final Logger LOG = LoggerFactory.getLogger(BackOfficeController.class);

	@Autowired
	CustomerService serviceCustomer;

	@Autowired
	PackageService servicePackage;

	@Autowired
	DeliveryPersonService serviceDeliveryMen;

	@Autowired
	PriceFieldService servicePriceFieldService;

	@Autowired
	DistributedLock distributedLock;

	@Autowired
	UsersRoleService usersRoleService;

	@Autowired
	BackOfficeService servicebackOffice;

	// Save a new backoffice.
	// Url - http://localhost:10091y
	@PostMapping("/save_backoffice")
	public ResponseEntity<?> save(@Valid @RequestBody final Bacckoffice bacckoffice) {
		try {
			Bacckoffice temp = servicebackOffice.findById(bacckoffice.getUsername());
			if (temp.getUsername() == null)
				return null;
		} catch (Exception ex) {
			UsersRole newUser = new UsersRole(bacckoffice.getUsername(), Role.ROLE_BACKOFFICE,
					bacckoffice.getPassword());
			usersRoleService.save(newUser);
			servicebackOffice.save(bacckoffice);
			LOG.info("Saving the new bacckoffice to the redis.");
			return ResponseEntity.ok("A new bacckoffice is saved!!!");
		}
		return ResponseEntity.badRequest().body("Error: Username is already in use!");

		// return ResponseEntity.ok("The customer id is already in the database,you can
		// update him!!!");
	}

	// Get backoffice .
	// Url - http://localhost:10091/api/redis/customer/get/<package_id>
	@GetMapping("/get/backoffice")
	public Collection<Bacckoffice> findPackageById() {
		LOG.info("Fetching backoffice with id= ");
		return servicebackOffice.findAll().values();
	}

	// Save a new priceField.
	// Url - http://localhost:10091/api/redis/add_priceField
	@PostMapping("/add_priceField")
	public ResponseEntity<String> save_priceField(@Valid @RequestBody final PriceField priceField) {
		if (priceField.getId() == null) {
			long count = servicePriceFieldService.findAll().size() + 1;
			String id = String.valueOf(count);
			priceField.setId(id);
		}
		servicePriceFieldService.save(priceField);
		LOG.info("Saving the new priceField to the redis.");
		return ResponseEntity.ok("A new priceField is saved!!!");
	}

	// Delete DeliveryPerson by id.
	// Url
	// -http://localhost:10091/api/redis/DeliveryPerson/delete_DeliveryPerson/<deliveryMen_id>
	@DeleteMapping("/delete_DeliveryPerson/{id}")
	public ResponseEntity<String> delete(@PathVariable("id") final String id) {
		try {
			DeliveryPerson DeliveryPerson = serviceDeliveryMen.findById(id);
			serviceDeliveryMen.delete(DeliveryPerson.getUsername());
			usersRoleService.delete(DeliveryPerson.getUsername());
			LOG.info("Deleting deliveryMen with id= " + id);
			return ResponseEntity.ok("deliveryMen is deleted!!!");
		} catch (Exception e) {
			return ResponseEntity.ok("deliveryMen id not found!!!");
		}
	}

	// Get all customers.
	// Url - http://localhost:10091/api/redis/backOffice/getall/customer
	@GetMapping("/getall/customer")
	public Collection<Customer> find_customers() {
		LOG.info("Fetching all customers from the redis.");
		final Map<String, Customer> customerMap = serviceCustomer.findAll();
		return customerMap.values();
	}

	// Get all PriceFields.
	// Url - http://localhost:10091/api/redis/backOffice/getall/PriceField
	@GetMapping("/getall/PriceField")
	public Collection<PriceField> findAll_PriceField() {
		LOG.info("Fetching all PriceFields from the redis.");
		final Map<String, PriceField> customerMap = servicePriceFieldService.findAll();
		// Todo - If developers like they can sort the map (optional).
		return customerMap.values();
	}

	// Get all DeliveryPersons
	// Url - http://localhost:10091/api/redis/backOffice/getall/DeliveryPerson
	@GetMapping("/getall/DeliveryPerson")
	public Collection<DeliveryPerson> findAll_DeliveryPersons() {
		LOG.info("Fetching all DeliveryPersons from the redis.");
		final Map<String, DeliveryPerson> DeliveryPersonsMap = serviceDeliveryMen.findAll();
		// Todo - If developers like they can sort the map (optional).
		return DeliveryPersonsMap.values();
	}

	// Get all findAll_LockedDeliveryPersons
	// Url - http://localhost:10091/api/redis/backOffice/getall/locked/DeliveryPerson
	@GetMapping("/getall/locked/DeliveryPerson")
	public Collection<DeliveryPerson> findAll_LockedDeliveryPersons() {
		LOG.info("Fetching all DeliveryPersons from the redis.");
		final Map<String, DeliveryPerson> DeliveryPersonsMap = serviceDeliveryMen.findAll();
		DeliveryPersonsMap.values().removeIf(value -> value.getLock().equals("unlock"));
		return DeliveryPersonsMap.values();
	}

	// Get all packages
	// Url - http://localhost:10091/api/redis/backOffice/getall/package
	@GetMapping("/getall/package")
	public Collection<Package> findAll_packages() {
		LOG.info("Fetching all Packages from the redis.");
		final Map<String, Package> packageMenMap = servicePackage.findAll();
		// Todo - If developers like they can sort the map (optional).
		return packageMenMap.values();
	}

	// Update DeliveryPerson lock.
	// Url - http://localhost:10091/api/redis/realseLock/id/{id}
	@PutMapping("/realseLock/id/{id}")
	public ResponseEntity<String> realseLock(@Valid @PathVariable("id") String id) {
		try {
			DeliveryPerson temp = serviceDeliveryMen.findById(id);
			distributedLock.releaseLock(id);
			LOG.info("DeliveryPerson " + temp.getUsername() + " is unLocked ");
			return ResponseEntity.ok("DeliveryPerson " + temp.getFirstName() + " is unLocked");
		} catch (Exception ex) {
			return ResponseEntity.ok("An error occured!!!");
		}
	}
}
