package pe.edu.utp.inti_sayri_backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.inti_sayri_backend.model.Location;
import pe.edu.utp.inti_sayri_backend.service.FavoritoService;

@RestController
@RequestMapping("/api/location-favoritos")
@CrossOrigin("*")
public class FavoritoController {

    @Autowired
    private FavoritoService favoritoService;

    @PostMapping("/add")
    public String addFavorito(@RequestParam(value = "user-id") Long userId, @RequestParam(value = "location-id") Long locationId) {
        return favoritoService.addFavorito(userId, locationId);
    }
    
    @PostMapping("/{userId}/add/{locationId}")
    public String addUrlPathFavorito(@PathVariable("userId") Long userId, @PathVariable(value = "locationId") Long locationId) {
        return favoritoService.addFavorito(userId, locationId);
    }
    
    @PostMapping("/{correoElectronico}/add")
    public String addUrlPathFavorito(@PathVariable("correoElectronico") String correoElectronico, @RequestBody Location location) {
        return favoritoService.addFavorito(correoElectronico, location);
    }
    
    @GetMapping("/{correoElectronico}/locations")
    public List<Location> getLocationsByCorreoElectronico(@PathVariable("correoElectronico") String correoElectronico) {
        return favoritoService.getLocationsByCorreoElectronico(correoElectronico);
    }

    @DeleteMapping("/remove")
    public String removeFavorito(@RequestParam(value = "user-id") Long userId, @RequestParam(value = "location-id") Long locationId) {
        return favoritoService.removeFavorito(userId, locationId);
    }
    
    @DeleteMapping("/{userId}/remove-by-id/{locationId}")
    public String removeUrlPathFavorito(@PathVariable("userId") Long userId, @PathVariable(value = "locationId") Long locationId) {
        return favoritoService.removeFavorito(userId, locationId);
    }
    
    @DeleteMapping("/{correoElectronico}/remove/{locationId}")
    public String removeFavoritoByCorreoElectronico(@PathVariable("correoElectronico") String correoElectronico,
                                                    @PathVariable("locationId") Long locationId) {
        return favoritoService.removeFavoritoByCorreoElectronico(correoElectronico, locationId);
    }
    
    @PostMapping("/add-by-name")
    public String addFavoritoByName(@RequestParam(value = "nombreCompleto") String nombreCompleto, 
                                    @RequestParam(value = "location-id") Long locationId) {
        return favoritoService.addFavoritoByName(nombreCompleto, locationId);
    }
    
    @PostMapping("/{nombreCompleto}/add-location")
    public String addFavoritoByFullName(@PathVariable("nombreCompleto") String nombreCompleto, 
                                        @RequestBody Location location) {
        return favoritoService.addFavoritoByName(nombreCompleto, location);
    }
    
    @GetMapping("/{nombreCompleto}/get-locations")
    public List<Location> getLocationsByNombreCompleto(@PathVariable("nombreCompleto") String correoElectronico) {
        return favoritoService.getLocationsByNombreCompleto(correoElectronico);
    }
}
