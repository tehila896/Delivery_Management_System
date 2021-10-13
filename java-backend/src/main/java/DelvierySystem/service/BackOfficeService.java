package DelvierySystem.service;

import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import DelvierySystem.dao.BackofficeRepo;
import DelvierySystem.exception.ConnectionToRedisFailed;
import DelvierySystem.model.Bacckoffice;

@Service
public class BackOfficeService implements BackofficeRepo{
	private final String BACKOFFICE_CACHE = "CACHE_BACKOFFICE";

	@Autowired
	RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, Bacckoffice> hashOperations;

	@PostConstruct
	private void intializeHashOperations() {
		hashOperations = redisTemplate.opsForHash();
	}

	// Save operation.
	@Override
	public void save(final Bacckoffice bacckoffice) {
		 try {
			 hashOperations.put(BACKOFFICE_CACHE, bacckoffice.getUsername(), bacckoffice);
	        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }		
	}

	// Find by bacckoffice id operation.
	@Override
	public Bacckoffice findById(final String id) {
		 try {
			  return (Bacckoffice) hashOperations.get(BACKOFFICE_CACHE, id);
         }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }
	}

	// Find all bacckoffice operation.
	@Override
	public Map<String, Bacckoffice> findAll() {
		 try {
				return hashOperations.entries(BACKOFFICE_CACHE);
        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }
	}

	// Delete bacckoffice by id operation.
	@Override
	public Boolean delete(String id) {
		try {
		hashOperations.delete(BACKOFFICE_CACHE,id);
		return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }	
	}
}
