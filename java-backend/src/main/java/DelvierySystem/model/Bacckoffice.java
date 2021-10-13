package DelvierySystem.model;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class Bacckoffice extends User{
String phoneNumber;

public Bacckoffice() {
	super();
	// TODO Auto-generated constructor stub
}

public Bacckoffice(String username, @Valid @NotNull(message = "firstName can`t be null") String firstName,
		@Valid @NotNull(message = "lastName can`t be null") String lastName,
		@Valid @Email(message = "email should be valid") String email, @NotBlank @Size(max = 120) String password) {
	super(username, firstName, lastName, email, password);
	// TODO Auto-generated constructor stub
}

public Bacckoffice(String username, @Valid @NotNull(message = "firstName can`t be null") String firstName,
		@Valid @NotNull(message = "lastName can`t be null") String lastName,
		@Valid @Email(message = "email should be valid") String email, @NotBlank @Size(max = 120) String password,
		String phoneNumber) {
	super(username, firstName, lastName, email, password);
	this.phoneNumber = phoneNumber;
}

public String getPhoneNumber() {
	return phoneNumber;
}

public void setPhoneNumber(String phoneNumber) {
	this.phoneNumber = phoneNumber;
}
}
