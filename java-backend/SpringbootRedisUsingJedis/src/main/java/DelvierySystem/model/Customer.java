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
public class Customer extends User {

	public Customer(String username, @Valid @NotNull(message = "firstName can`t be null") String firstName,
			@Valid @NotNull(message = "lastName can`t be null") String lastName,
			@Valid @Email(message = "email should be valid") String email, @NotBlank @Size(max = 120) String password) {
		super(username, firstName, lastName, email, password);
		// TODO Auto-generated constructor stub
	}
   
}
