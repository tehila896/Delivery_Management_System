package DelvierySystem.model;

import java.io.Serializable;

public class PayMentEvent implements Serializable{
	String paymentType;
	Double value;

	public PayMentEvent(String paymentType, Double value) {
	super();
	this.paymentType = paymentType;
	this.value = value;
}
	
	public PayMentEvent() {
	}

	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public Double getValue() {
		return value;
	}
	public void setValue(Double value) {
		this.value = value;
	}
	
}
