package DelvierySystem.model;

import java.io.Serializable;
import java.time.LocalDateTime;

public class State implements Serializable{

	String description;
	LocalDateTime date;
	PointD position;
	public State() {

	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	public PointD getPosition() {
		return position;
	}
	public void setPosition(PointD position) {
		this.position = position;
	}
	public State(String description, LocalDateTime date, PointD position) {
		super();
		this.description = description;
		this.date = date;
		this.position = position;
	}
}
