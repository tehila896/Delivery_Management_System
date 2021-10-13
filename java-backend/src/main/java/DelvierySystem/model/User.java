package DelvierySystem.model;

import java.io.Serializable;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class User implements Serializable{
	    @Id
	    String username;
		@Valid
		@JsonProperty
		@NotNull(message = "firstName can`t be null")
		String firstName;
		@Valid
		@JsonProperty
		@NotNull(message = "lastName can`t be null")
	    String lastName;
		@Valid
		@JsonProperty
		@Email(message ="email should be valid")
		String email;
		@NotBlank
		@Size(max = 120)
		private String password;
		public User(String username, @Valid @NotNull(message = "firstName can`t be null") String firstName,
				@Valid @NotNull(message = "lastName can`t be null") String lastName,
				@Valid @Email(message = "email should be valid") String email,
				@NotBlank @Size(max = 120) String password) {
			super();
			this.username = username;
			this.firstName = firstName;
			this.lastName = lastName;
			this.email = email;
			this.password = password;
		}
		public User() {
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getFirstName() {
			return firstName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public String getLastName() {
			return lastName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
	   
}
