package DelvierySystem.dao;

import java.util.Map;
import DelvierySystem.model.Bacckoffice;


public interface BackofficeRepo {
	
	// Save a new Bacckoffice.
	void save(Bacckoffice bacckoffice);
	
	// Find Bacckoffice by id.
	Bacckoffice findById(String id);
	
	// Final all Bacckoffices.
	Map<String, Bacckoffice> findAll();
	
	// Delete a Bacckoffice.
	Boolean delete(String id);
}
