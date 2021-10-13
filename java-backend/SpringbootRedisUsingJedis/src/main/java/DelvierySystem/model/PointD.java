package DelvierySystem.model;

import java.io.Serializable;

public class PointD implements Serializable{
Double x;
Double y;
public Double getX() {
	return x;
}
public void setX(Double x) {
	this.x = x;
}
public Double getY() {
	return y;
}
public void setY(Double y) {
	this.y = y;
}
public PointD(Double x, Double y) {
	super();
	this.x = x;
	this.y = y;
}
public PointD() {
	super();
}
}
