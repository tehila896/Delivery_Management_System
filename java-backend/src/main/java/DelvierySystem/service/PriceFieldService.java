package DelvierySystem.service;

/*PriceFieldService implements the required actions belonging to the PriceFieldDao interface*/

import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import DelvierySystem.dao.PriceFieldDao;
import DelvierySystem.exception.ConnectionToRedisFailed;
import DelvierySystem.model.PriceField;
import DelvierySystem.model.UnitOfDistance;

@Service
public class PriceFieldService implements PriceFieldDao{
	private final String PRICEFIELD_CACHE = "PRICEFIELDS_CACHE";
	@Autowired
	RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String,String,PriceField> hashOperations;
	
	@PostConstruct
	private void intializeHashOperations() {
		hashOperations = redisTemplate.opsForHash();
	}
	@Override
	public void save(PriceField priceField) {
		 try {
			 hashOperations.put(PRICEFIELD_CACHE, priceField.getId(),priceField);
		 }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }	
	}

	@Override
	public PriceField findById(String id) {
		return (PriceField) hashOperations.get(PRICEFIELD_CACHE, id);
	}

	@Override
	public Map<String, PriceField> findAll() {
		return hashOperations.entries(PRICEFIELD_CACHE);
	}

	@Override
	public void delete(String id) {
		hashOperations.delete(PRICEFIELD_CACHE, id);
	}

}
