package DelvierySystem.model;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DeliveryPerson extends User{
	static final long serialVersionUID = 1L;
	@Valid
	@JsonProperty
	boolean statosCurrentlyWorking;
	@Valid
	@JsonProperty
	@NotNull(message = "communication_way can`t be null")
	String communication_way;
	@Valid
	@JsonProperty
	@NotNull(message = "getSalary_way can`t be null")
	String getSalary_way;
	@Valid
	@JsonProperty
	PointD position;
	@Valid
	@JsonProperty
	double speed;
	@Valid
	@JsonProperty
	CarryingCapacity carryingCapacity;
	@Valid
	@JsonProperty
	UnitOfDistance unitOfDistance;
	@Valid
	@JsonProperty
	double price_carryingCapacity;
	String lock;
	String current_delivery_id;
	public String getCurrent_delivery_id() {
		return current_delivery_id;
	}
	public void setCurrent_delivery_id(String current_delivery_id) {
		this.current_delivery_id = current_delivery_id;
	}
	public String getLock() {
		return lock;
	}
	public void setLock(String lock) {
		this.lock = lock;
	}
	public double getSpeed() {
		return speed;
	}
	public void setSpeed(double speed) {
		this.speed = speed;
	}
	public CarryingCapacity getCarryingCapacity() {
		return carryingCapacity;
	}
	public void setCarryingCapacity(CarryingCapacity carryingCapacity) {
		this.carryingCapacity = carryingCapacity;
	}
	public UnitOfDistance getUnitOfDistance() {
		return unitOfDistance;
	}
	public void setUnitOfDistance(UnitOfDistance unitOfDistance) {
		this.unitOfDistance = unitOfDistance;
	}

	public double getPrice_carryingCapacity() {
		return price_carryingCapacity;
	}
	public void setPrice_carryingCapacity(double price_carryingCapacity) {
		this.price_carryingCapacity = price_carryingCapacity;
	}

	public PointD getPosition() {
		return position;
	}
	public void setPosition(PointD position) {
		this.position = position;
	}
	public String getCommunication_way() {
		return communication_way;
	}
	public void setCommunication_way(String communication_way) {
		this.communication_way = communication_way;
	}
	public String getGetSalary_way() {
		return getSalary_way;
	}
	public void setGetSalary_way(String getSalary_way) {
		this.getSalary_way = getSalary_way;
	}
	public boolean isStatosCurrentlyWorking() {
		return statosCurrentlyWorking;
	}
	public void setStatosCurrentlyWorking(boolean statosCurrentlyWorking) {
		this.statosCurrentlyWorking = statosCurrentlyWorking;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public DeliveryPerson(String username, @Valid @NotNull(message = "firstName can`t be null") String firstName,
			@Valid @NotNull(message = "lastName can`t be null") String lastName,
			@Valid @Email(message = "email should be valid") String email, @NotBlank @Size(max = 120) String password,
			@Valid boolean statosCurrentlyWorking,
			@Valid @NotNull(message = "communication_way can`t be null") String communication_way,
			@Valid @NotNull(message = "getSalary_way can`t be null") String getSalary_way, @Valid PointD position,
			@Valid double speed, @Valid CarryingCapacity carryingCapacity, @Valid UnitOfDistance unitOfDistance,
			@Valid double price_carryingCapacity, String lock, String current_delivery_id) {
		super(username, firstName, lastName, email, password);
		this.statosCurrentlyWorking = statosCurrentlyWorking;
		this.communication_way = communication_way;
		this.getSalary_way = getSalary_way;
		this.position = position;
		this.speed = speed;
		this.carryingCapacity = carryingCapacity;
		this.unitOfDistance = unitOfDistance;
		this.price_carryingCapacity = price_carryingCapacity;
		this.lock = lock;
		this.current_delivery_id = current_delivery_id;
	}
	
}
