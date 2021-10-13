package DelvierySystem.model;

public enum CarryingCapacity {
FIVE_KG(1),
FIFTEEN_KG(2),
FIFTY_KG(3);
int value;
CarryingCapacity(int value) {
    this.value = value;
}
public int getValue() {
	return value;
}
public void setValue(int value) {
	this.value = value;
}

}
