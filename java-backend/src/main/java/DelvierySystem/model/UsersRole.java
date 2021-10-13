 package DelvierySystem.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class UsersRole implements Serializable{
	private String username;
	Role role;
	String password;
	public UsersRole() {
	}

	public UsersRole(String username, Role role,String password) {
		super();
		this.username = username;
		this.role = role;
		this.password=password;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	
}
 