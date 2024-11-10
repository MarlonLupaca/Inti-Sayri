package pe.edu.utp.inti_sayri_backend.util;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {
        
    public static ResponseEntity<Map<String, Object>> createResponse(Map<String, Object> response, HttpStatus successStatus) {
        String status = (String) response.get("status");
        
        if ("success".equals(status)) {
            return new ResponseEntity<>(response, successStatus);
        } else {
            String errorType = (String) response.get("errorType");
            HttpStatus errorStatus = getErrorStatus(errorType == null ? "" : errorType);
            return new ResponseEntity<>(response, errorStatus);
        }
    }
    
    private static HttpStatus getErrorStatus(String errorType) {
    switch (errorType) {
        case "not_found":
            return HttpStatus.NOT_FOUND;
        case "bad_request":
            return HttpStatus.BAD_REQUEST;
        case "unauthorized":
            return HttpStatus.UNAUTHORIZED;
        case "internal_error":
            return HttpStatus.INTERNAL_SERVER_ERROR;
        default:
            return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
}
