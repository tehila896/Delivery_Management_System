package DelvierySystem.model;

import java.io.Serializable;
import java.util.Map;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import nonapi.io.github.classgraph.json.Id;

@Data
public class PriceField implements Serializable{
	@Valid
	@JsonProperty
	@Id
	String id;
	@Valid
	@JsonProperty
	UnitOfDistance row1;
	@Valid
	@JsonProperty
	UnitOfDistance row2;
	@Valid
	@JsonProperty
	UnitOfDistance row3;
    @Valid
    @JsonProperty
    Map<CarryingCapacity,Double> columns1;
    @Valid
    @JsonProperty
    Map<CarryingCapacity,Double> columns2;
    @Valid
    @JsonProperty
    Map<CarryingCapacity,Double> columns3;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public UnitOfDistance getRow1() {
		return row1;
	}
	public void setRow1(UnitOfDistance row1) {
		this.row1 = row1;
	}
	public UnitOfDistance getRow2() {
		return row2;
	}
	public void setRow2(UnitOfDistance row2) {
		this.row2 = row2;
	}
	public UnitOfDistance getRow3() {
		return row3;
	}
	public void setRow3(UnitOfDistance row3) {
		this.row3 = row3;
	}
	public Map<CarryingCapacity, Double> getColumns1() {
		return columns1;
	}
	public void setColumns1(Map<CarryingCapacity, Double> columns1) {
		this.columns1 = columns1;
	}
	public Map<CarryingCapacity, Double> getColumns2() {
		return columns2;
	}
	public void setColumns2(Map<CarryingCapacity, Double> column2) {
		this.columns2 = column2;
	}
	public Map<CarryingCapacity, Double> getColumns3() {
		return columns3;
	}
	public void setColumns3(Map<CarryingCapacity, Double> column3) {
		this.columns3 = column3;
	}

}