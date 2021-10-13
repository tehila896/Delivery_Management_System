package DelvierySystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ConnectionToKafkaFailed extends RuntimeException{

	public ConnectionToKafkaFailed(String exception) {
		super(exception);
	}
}
