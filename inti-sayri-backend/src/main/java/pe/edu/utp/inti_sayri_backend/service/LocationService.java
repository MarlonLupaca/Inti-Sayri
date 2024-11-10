package pe.edu.utp.inti_sayri_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.inti_sayri_backend.model.Location;
import pe.edu.utp.inti_sayri_backend.repository.LocationRepository;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public Map<String, Object> getAllLocations() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Location> locations = locationRepository.findAll();
            completeResponse(response, "success", "Lista de ubicaciones obtenida con éxito", locations);
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al obtener las ubicaciones: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> getLocationById(Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Location> location = locationRepository.findById(id);
            if (location.isPresent()) {
                completeResponse(response, "success", "Ubicación obtenida con éxito", location.get());
            } else {
                incompleteResponse(response, "error", "Ubicación no encontrada", "not_found");
            }
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al obtener la ubicación: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> saveLocation(Location location) {
        Map<String, Object> response = new HashMap<>();
        try {
            Location locationToSave = Location.builder()
                    .id(location.getId() != null ? location.getId() : null)
                    .address(location.getAddress() != null ? location.getAddress() : null)
                    .position(location.getPosition()!= null ? location.getPosition(): null)
                    .name(location.getName() != null ? location.getName() : null)
                    .phone(location.getPhone() != null ? location.getPhone() : null)
                    .build();

            Location savedLocation = locationRepository.save(locationToSave);
            completeResponse(response, "success", "Ubicación guardada con éxito", savedLocation);
        } catch (IllegalArgumentException e) {
            incompleteResponse(response, "error", "Datos de la ubicación no válidos: " + e.getMessage(), "bad_request");
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al guardar la ubicación: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> updateLocation(Long id, Location newLocationData) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Location> location = locationRepository.findById(id);
            if (location.isPresent()) {
                Location updatedLocation = location.get();
                updatedLocation.setAddress(newLocationData.getAddress());
                updatedLocation.setPosition(newLocationData.getPosition());
                updatedLocation.setName(newLocationData.getName());
                updatedLocation.setPhone(newLocationData.getPhone());
                locationRepository.save(updatedLocation);
                completeResponse(response, "success", "Ubicación actualizada con éxito", updatedLocation);
            } else {
                incompleteResponse(response, "error", "Ubicación no encontrada", "not_found");
            }
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al actualizar la ubicación: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> deleteLocation(Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            locationRepository.deleteById(id);
            completeResponse(response, "success", "Ubicación eliminada con éxito", null);
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al eliminar la ubicación: " + e.getMessage());
        }
        return response;
    }

    private void completeResponse(Map<String, Object> response, String status, String message, Object data) {
        response.put("status", status);
        response.put("message", message);
        if (data != null)
            response.put("data", data);
    }

    private void incompleteResponse(Map<String, Object> response, String status, String message, String errorType) {
        response.put("errorType", errorType);
        completeResponse(response, status, message, null);
    }
    
    private void incompleteResponse(Map<String, Object> response, String status, String message) {
        incompleteResponse(response, status, message, null);
    }
}
