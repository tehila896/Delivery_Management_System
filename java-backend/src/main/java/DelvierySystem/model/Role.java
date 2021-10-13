package DelvierySystem.model;

public enum Role {
	ROLE_CUSTOMER(1),
    ROLE_DELIVERY_PERSON(2),
    ROLE_BACKOFFICE(3);
    int value;
	Role(int value) {
		this.value=value;
	}
}
