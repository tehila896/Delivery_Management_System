package DelvierySystem.model;

public enum UnitOfDistance {
	FIVE_KM(1),
	FIFTEEN_KM(2),
	FIFTY_KM(3);
	int value;
	UnitOfDistance(int value) {
		this.value=value;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	
}
