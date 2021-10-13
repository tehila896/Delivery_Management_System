package DelvierySystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ConnectionToRedisFailed extends RuntimeException{

	public ConnectionToRedisFailed(String exception) {
		super(exception);
	}
}
