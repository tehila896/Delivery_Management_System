package DelvierySystem.dao;

/*PackageRepo defines the actions we perform in front of the redis database*/

import java.util.Map;

import DelvierySystem.model.Package;
import DelvierySystem.model.State;

public interface PackageRepo {
	
	// Save a new package.
	void save(Package package_);
	
	// Find package by id.
	Package findById(String id);
		
	// Final all packages.
	Map<String, Package> findAll();
	
	// Delete a package.
	void delete(String id);
	
	//update package state
	void update_state(String id,State state);
}
