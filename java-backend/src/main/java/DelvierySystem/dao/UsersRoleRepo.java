package DelvierySystem.dao;

import java.util.Map;

import DelvierySystem.model.UsersRole;

public interface UsersRoleRepo {
	       // Save a new customer.
			void save(UsersRole user);
			
			// Find customer by id.
			UsersRole findById(String id);
			
			// Final all customers.
			Map<String, UsersRole> findAll();
			
			// Delete a customer.
			void delete(String id);
}
