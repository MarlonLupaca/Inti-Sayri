package pe.edu.utp.inti_sayri_backend.service;

import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.inti_sayri_backend.model.Favorito;
import pe.edu.utp.inti_sayri_backend.model.Location;
import pe.edu.utp.inti_sayri_backend.model.User;
import pe.edu.utp.inti_sayri_backend.repository.FavoritoRepository;
import pe.edu.utp.inti_sayri_backend.repository.LocationRepository;
import pe.edu.utp.inti_sayri_backend.repository.UserRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    public String addFavorito(Long userId, Long locationId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Location> locationOpt = locationRepository.findById(locationId);

        if (userOpt.isPresent() && locationOpt.isPresent()) {
            Favorito favorito = Favorito.builder()
                    .user(userOpt.get())
                    .location(locationOpt.get())
                    .build();
            favoritoRepository.save(favorito);
            return "Favorito agregado correctamente.";
        } else {
            return "Usuario o ubicación no encontrados.";
        }
    }
    
    public String addFavorito(String correoElectronico, Location location) {
        Optional<User> userOpt = userRepository.findByCorreoElectronico(correoElectronico);
        Location locationSaved = locationRepository.save(location);

        if (userOpt.isPresent() && locationSaved != null) {
            Favorito favorito = Favorito.builder()
                    .user(userOpt.get())
                    .location(locationSaved)
                    .build();
            favoritoRepository.save(favorito);
            return "Favorito agregado correctamente.";
        } else {
            return "Usuario o ubicación no encontrados.";
        }
    }
    
    public List<Location> getLocationsByCorreoElectronico(String correoElectronico) {
        Optional<User> userOpt = userRepository.findByCorreoElectronico(correoElectronico);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Buscar los favoritos de ese usuario
            List<Favorito> favoritos = favoritoRepository.findByUserId(user.getId());
            // Extraer las ubicaciones asociadas a esos favoritos
            List<Location> locations = favoritos.stream()
                    .map(Favorito::getLocation)
                    .collect(Collectors.toList());
            return locations;
        } else {
            return Collections.emptyList(); // Retorna una lista vacía si no se encuentra el usuario
        }
    }
    
    public List<Location> getLocationsByNombreCompleto(String nombreCompleto) {
        Optional<User> userOpt = userRepository.findByNombreCompleto(nombreCompleto);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Buscar los favoritos de ese usuario
            List<Favorito> favoritos = favoritoRepository.findByUserId(user.getId());
            // Extraer las ubicaciones asociadas a esos favoritos
            List<Location> locations = favoritos.stream()
                    .map(Favorito::getLocation)
                    .collect(Collectors.toList());
            return locations;
        } else {
            return Collections.emptyList(); // Retorna una lista vacía si no se encuentra el usuario
        }
    }

    public String removeFavorito(Long userId, Long locationId) {
        Optional<Favorito> favoritoOpt = favoritoRepository.findByUserIdAndLocationId(userId, locationId);
        if (favoritoOpt.isPresent()) {
            favoritoRepository.delete(favoritoOpt.get());
            return "Favorito eliminado correctamente.";
        } else {
            return "Favorito no encontrado.";
        }
    }
    
    public String removeFavoritoByCorreoElectronico(String correoElectronico, Long locationId) {
        Optional<User> userOpt = userRepository.findByCorreoElectronico(correoElectronico);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Optional<Favorito> favoritoOpt = favoritoRepository.findByUserIdAndLocationId(user.getId(), locationId);

            if (favoritoOpt.isPresent()) {
                favoritoRepository.delete(favoritoOpt.get());
                return "Favorito eliminado correctamente.";
            } else {
                return "Favorito no encontrado.";
            }
        } else {
            return "Usuario no encontrado.";
        }
    }
    
    public String addFavoritoByName(String nombreCompleto, Long locationId) {
        Optional<User> userOpt = userRepository.findByNombreCompleto(nombreCompleto);
        Optional<Location> locationOpt = locationRepository.findById(locationId);

        if (userOpt.isPresent() && locationOpt.isPresent()) {
            Favorito favorito = Favorito.builder()
                    .user(userOpt.get())
                    .location(locationOpt.get())
                    .build();
            favoritoRepository.save(favorito);
            return "Favorito agregado correctamente.";
        } else {
            return "Usuario o ubicación no encontrados.";
        }
    }

    public String addFavoritoByName(String nombreCompleto, Location location) {
        Optional<User> userOpt = userRepository.findByNombreCompleto(nombreCompleto);
        if (userOpt.isPresent()) {
            Location locationSaved = locationRepository.save(location);
            Favorito favorito = Favorito.builder()
                    .user(userOpt.get())
                    .location(locationSaved)
                    .build();
            favoritoRepository.save(favorito);
            return "Favorito agregado correctamente.";
        } else {
            return "Usuario no encontrado.";
        }
    }
}
