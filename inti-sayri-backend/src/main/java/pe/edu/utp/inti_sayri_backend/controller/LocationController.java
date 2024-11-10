package pe.edu.utp.inti_sayri_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.inti_sayri_backend.model.Location;
import pe.edu.utp.inti_sayri_backend.service.LocationService;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import pe.edu.utp.inti_sayri_backend.util.ResponseUtil;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/locations")
@CrossOrigin("*")
public class LocationController {

    private final LocationService locationService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllLocations() {
        Map<String, Object> response = locationService.getAllLocations();
        return ResponseUtil.createResponse(response, HttpStatus.OK);
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<Map<String, Object>> getLocationById(@PathVariable("locationId") Long id) {
        Map<String, Object> response = locationService.getLocationById(id);
        return ResponseUtil.createResponse(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createLocation(@RequestBody Location location) {
        Map<String, Object> response = locationService.saveLocation(location);
        return ResponseUtil.createResponse(response, HttpStatus.CREATED);
    }

    @PutMapping("/{locationId}")
    public ResponseEntity<Map<String, Object>> updateLocation(@PathVariable("locationId") Long id, @RequestBody Location location) {
        Map<String, Object> response = locationService.updateLocation(id, location);
        return ResponseUtil.createResponse(response, HttpStatus.OK);
    }

    @DeleteMapping("/{locationId}")
    public ResponseEntity<Map<String, Object>> deleteLocation(@PathVariable("locationId") Long id) {
        Map<String, Object> response = locationService.deleteLocation(id);
        return ResponseUtil.createResponse(response, HttpStatus.OK);
    }
    
    
}
