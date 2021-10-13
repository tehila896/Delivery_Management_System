package DelvierySystem.dao;

/*DeliveryPersonRepo defines the actions we perform in front of the redis database*/

import java.util.Map;

import DelvierySystem.model.DeliveryPerson;
import DelvierySystem.model.Package;

public interface DeliveryPersonRepo {
	
	// Save a new deliveryMen.
	void save(DeliveryPerson deliveryMen);
	
	// Find deliveryMen by id.
	DeliveryPerson findById(String id);
	
	// Final all deliveryMens.
	Map<String, DeliveryPerson> findAll();
	
	// Delete a deliveryMen.
	Boolean delete(String id);
	
	// find the closest deliveryMend.
	Boolean calclute_Distance(Package deliveryPackage);
	
	double distance_Between_LatLong(double lat1, double lon1, double lat2, double lon2);
}
