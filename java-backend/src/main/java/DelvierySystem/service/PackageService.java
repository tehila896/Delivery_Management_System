package DelvierySystem.service;

import java.util.LinkedList;

/*PackageService implements the required actions belonging to the PackageRepo interface*/

import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import DelvierySystem.dao.PackageRepo;
import DelvierySystem.exception.ConnectionToRedisFailed;
import DelvierySystem.model.DeliveryPerson;
import DelvierySystem.model.Package;
import DelvierySystem.model.State;

@Service
public class PackageService implements PackageRepo{
	private final String PACKAGE_CACHE = "CACES_ORDER";

	@Autowired
	RedisTemplate<String, Object> redisTemplate;
	
	@Autowired
	DeliveryPersonService serviceDeliveryMen;
	
	private HashOperations<String, String, Package> hashOperations;
	
	@PostConstruct
	private void intializeHashOperations() {
		hashOperations = redisTemplate.opsForHash();
	}
	@Override
	public void save(Package package_) {
		 try {
			 hashOperations.put(PACKAGE_CACHE, package_.getId(), package_);
	        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }			
	}
	@Override
	public Package findById(String id) {
		 try {
				return (Package) hashOperations.get(PACKAGE_CACHE, id);
	        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }	
	}
	@Override
	public Map<String, Package> findAll() {
		 try {
			 return hashOperations.entries(PACKAGE_CACHE);
	        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }	
	}
	@Override
	public void delete(String id) {
		 try {
				hashOperations.delete(PACKAGE_CACHE, id);
	        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }	
	}
	@Override
	public void update_state(String id,State state)
	{
		 try {
				Package temp =findById(id);
				if(state.getDescription().equals("Have been signed"))
				{
					temp.setStatosCompletedPackage(true);
					DeliveryPerson deliveryPerson=serviceDeliveryMen.findById(temp.getDelivery_id());
					deliveryPerson.setStatosCurrentlyWorking(false);
					deliveryPerson.setCurrent_delivery_id(null);
					serviceDeliveryMen.save(deliveryPerson);
				}				
				LinkedList<State> list_states = temp.getList_states();
				list_states.add(state);
				temp.setList_states(list_states);
				save(temp);
	        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }
	}
}
