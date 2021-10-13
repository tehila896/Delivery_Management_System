package DelvierySystem.model;


import java.io.Serializable;
import java.util.Date;
import java.util.LinkedList;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Package implements Serializable{

@Id
@JsonProperty
@Valid
String id;
@JsonProperty
String description;
@JsonProperty
@Valid
@NotNull(message = "customer_id can`t be null")
String customer_id;
@JsonProperty
@Valid
String delivery_id;
@JsonProperty
@Valid
PointD p_source;
@JsonProperty
@Valid
PointD p_destninon;
@JsonProperty
@Valid
Date dateStartOrder;
@JsonProperty
@Valid
Date dateEndOrder;
@JsonProperty
@Valid
LinkedList<State> list_states=new LinkedList<State>();
@JsonProperty
@Valid
Boolean statosCompletedPackage;
@JsonProperty
@Valid
PayMentEvent payment;
@Valid
@JsonProperty
CarryingCapacity carryingCapacity;
@Valid
@JsonProperty
UnitOfDistance unitOfDistance;
public Package(@Valid String id, String description,
		@Valid @NotNull(message = "customer_id can`t be null") String customer_id, @Valid String delivery_id,
		@Valid PointD p_source, @Valid PointD p_destninon, @Valid Date dateStartOrder, @Valid Date dateEndOrder,
		@Valid LinkedList<State> list_states, @Valid Boolean statosCompletedPackage, @Valid PayMentEvent payment,
		@Valid CarryingCapacity carryingCapacity, @Valid UnitOfDistance unitOfDistance) {
	super();
	this.id = id;
	this.description = description;
	this.customer_id = customer_id;
	this.delivery_id = delivery_id;
	this.p_source = p_source;
	this.p_destninon = p_destninon;
	this.dateStartOrder = dateStartOrder;
	this.dateEndOrder = dateEndOrder;
	this.list_states = list_states;
	this.statosCompletedPackage = statosCompletedPackage;
	this.payment = payment;
	this.carryingCapacity = carryingCapacity;
	this.unitOfDistance = unitOfDistance;
}

public Package() {

}

public UnitOfDistance getUnitOfDistance() {
	return unitOfDistance;
}
 
public String getDescription() {
	return description;
}

public void setDescription(String description) {
	this.description = description;
}

public void setUnitOfDistance(UnitOfDistance unitOfDistance) {
	this.unitOfDistance = unitOfDistance;
}
public CarryingCapacity getCarryingCapacity() {
	return carryingCapacity;
}
public void setCarryingCapacity(CarryingCapacity carryingCapacity) {
	this.carryingCapacity = carryingCapacity;
}
public String getDelivery_id() {
	return delivery_id;
}
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public void setCustomer_id(String customer_id) {
	this.customer_id = customer_id;
}
public void setDelivery_id(String delivery_id) {
	this.delivery_id = delivery_id;
}
public String getCustomer_id() {
	return customer_id;
}
public PointD getP_source() {
	return p_source;
}
public void setP_source(PointD p_source) {
	this.p_source = p_source;
}
public PointD getP_destninon() {
	return p_destninon;
}
public void setP_destninon(PointD p_destninon) {
	this.p_destninon = p_destninon;
}
public LinkedList<State> getList_states() {
	return list_states;
}
public void setList_states(LinkedList<State> list_states) {
	this.list_states = list_states;
}
public Boolean getStatosCompletedPackage() {
	return statosCompletedPackage;
}
public void setStatosCompletedPackage(Boolean statosCompletedPackage) {
	this.statosCompletedPackage = statosCompletedPackage;
}
public PayMentEvent getPayment() {
	return payment;
}
public void setPayment(PayMentEvent payment) {
	this.payment = payment;
}

public Date getDateStartOrder() {
	return dateStartOrder;
}
public void setDateStartOrder(Date dateStartOrder) {
	this.dateStartOrder = dateStartOrder;
}
public Date getDateEndOrder() {
	return dateEndOrder;
}
public void setDateEndOrder(Date dateEndOrder) {
	this.dateEndOrder = dateEndOrder;
}
}
