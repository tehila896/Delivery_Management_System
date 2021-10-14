package DelvierySystem.service;

import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import DelvierySystem.dao.UsersRoleRepo;
import DelvierySystem.exception.ConnectionToRedisFailed;
import DelvierySystem.model.Customer;
import DelvierySystem.model.UsersRole;

@Service
public class UsersRoleService implements UsersRoleRepo{
	private final String USER_CACHE = "USERSROLE_CACHE";

	@Autowired
	RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, UsersRole> hashOperations;
	
	@PostConstruct
	private void intializeHashOperations() {
		hashOperations = redisTemplate.opsForHash();
	}

	@Override
	public void save(UsersRole user) {
		// TODO Auto-generated method stub
		 try {
			 hashOperations.put(USER_CACHE, user.getUsername(), user);
	        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }
	}

	@Override
	public UsersRole findById(String id) {
		 try {
			  return (UsersRole) hashOperations.get(USER_CACHE, id);
        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }
	}

	@Override
	public Map<String, UsersRole> findAll() {
		 try {
			 return hashOperations.entries(USER_CACHE);
	        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }
	}

	@Override
	public void delete(String id) {
		 try {
				hashOperations.delete(USER_CACHE, id);
	        }
		 catch (Exception e) {
	            e.printStackTrace();
	            throw new ConnectionToRedisFailed("Connection to Radis failed, please try later");
	        }	
	}
}
