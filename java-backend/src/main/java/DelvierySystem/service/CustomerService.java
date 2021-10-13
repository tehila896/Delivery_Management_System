package DelvierySystem.service;

/*CustomerService implements the required actions belonging to the customerRepo interface*/
import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import DelvierySystem.dao.CustomerRepo;
import DelvierySystem.exception.ConnectionToRedisFailed;
import DelvierySystem.model.Customer;
@Service
public class CustomerService implements CustomerRepo {

	private final String CUSTOMER_CACHE = "CACHE_CUSTOMERS";

	@Autowired
	RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, Customer> hashOperations;

	@PostConstruct
	private void intializeHashOperations() {
		hashOperations = redisTemplate.opsForHash();
	}

	// Save operation.
	@Override
	public void save(final Customer customer) {
		 try {
			 hashOperations.put(CUSTOMER_CACHE, customer.getUsername(), customer);
	        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }		
	}

	// Find by customer id operation.
	@Override
	public Customer findById(final String id) {
		 try {
			  return (Customer) hashOperations.get(CUSTOMER_CACHE, id);
         }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }
	}

	// Find all customer operation.
	@Override
	public Map<String, Customer> findAll() {
		 try {
				return hashOperations.entries(CUSTOMER_CACHE);
        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }
	}

	// Delete customer by id operation.
	@Override
	public Boolean delete(String id) {
		try {
		hashOperations.delete(CUSTOMER_CACHE,id);
		return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }	
	}
}
