package DelvierySystem.controller;

import java.util.Collection;
import java.util.Map;

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
import DelvierySystem.kafka.KafkaSender;
import DelvierySystem.model.Customer;
import DelvierySystem.model.Package;
import DelvierySystem.model.Role;
import DelvierySystem.model.State;
import DelvierySystem.model.UsersRole;
import DelvierySystem.service.CustomerService;
import DelvierySystem.service.PackageService;
import DelvierySystem.service.UsersRoleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/redis")
public class UsersRoleController {
	private static final Logger LOG = LoggerFactory.getLogger(CustomerController.class);

	@Autowired
	UsersRoleService usersRoleService;
	
	// Get userRole by id.
	// Url - http://localhost:10091/api/redis/userRole/get/<customer_id>
	@GetMapping("/login/{username}")
	public UsersRole findById(@PathVariable("username") final String username) {
		return usersRoleService.findById(username);
	}

	
	// Get all userRoles.
	// Url - http://localhost:10091/api/redis/userRole/getall/userRole
	@GetMapping("/getall/usersRole")
	public Collection<UsersRole> findAll_customers() {
		final Map<String, UsersRole> userRoleMap = usersRoleService.findAll();
		// Todo - If developers like they can sort the map (optional).
		return userRoleMap.values();
	}
}
