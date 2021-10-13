package DelvierySystem.dao;

import java.util.Collection;
/*CustomerRepo defines the actions we perform in front of the redis database*/
import java.util.Map;

import DelvierySystem.model.Customer;

public interface CustomerRepo {

	// Save a new customer.
	void save(Customer customer);
	
	// Find customer by id.
	Customer findById(String id);
	
	// Final all customers.
	Map<String, Customer> findAll();
	
	// Delete a customer.
	Boolean delete(String id);
}
