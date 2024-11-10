package pe.edu.utp.inti_sayri_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.inti_sayri_backend.model.User;
import pe.edu.utp.inti_sayri_backend.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Map<String, Object> registrarUsuario(User usuario) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<User> usuarioExistente = userRepository.findByCorreoElectronico(usuario.getCorreoElectronico());
        
        if (usuarioExistente.isPresent()) {
            response.put("status", "error");
            response.put("message", "El correo ya está registrado.");
            response.put("errorType", "bad_request");
            return response;
        }
        
        userRepository.save(usuario);
        
        response.put("status", "success");
        response.put("message", "Registro exitoso.");
        response.put("data", usuario);
        return response;
    }
    
    public Map<String, Object> iniciarSesion(String correoElectronico, String contrasena) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<User> usuario = userRepository.findByCorreoElectronico(correoElectronico);
        
        if (usuario.isPresent() && usuario.get().getContrasena().equals(contrasena)) {
            response.put("status", "success");
            response.put("message", "Inicio de sesión exitoso.");
            response.put("nombreUsuario", usuario.get().getNombreCompleto());
        } else {
            response.put("status", "error");
            response.put("message", "Correo o contraseña incorrectos.");
            response.put("errorType", "unauthorized");
        }
        
        return response;
    }
    
    public User findById(Long userId) {
        return userRepository.findById(userId).get();
    }
    
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
    public Map<String, Object> addProfilePhotoUrl(Long userId, String photoUrl) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<User> usuario = userRepository.findById(userId);
            if (usuario.isPresent()) {
                usuario.get().setProfilePhotoUrl(photoUrl);
                User updatedUser = userRepository.save(usuario.get());
                response.put("status", "success");
                response.put("message", "Url actualizada correctamente.");
                response.put("data", updatedUser);
            } else {
                response.put("status", "error");
                response.put("message", "Usuario no encontrado.");
                response.put("errorType", "not_found");
            }
        } catch (Exception e) {
        }
        return response;
    }
    
    public Map<String, Object> getProfilePhotoUrl(Long userId) {
        Map<String, Object> response = new HashMap<>();
        
        String photoUrl = userRepository.findById(userId).get().getProfilePhotoUrl();
        
        if (photoUrl != null) {
            response.put("status", "success");
            response.put("message", "Url encontrada correctamente.");
            response.put("data", photoUrl);
        } else {
            response.put("status", "error");
            response.put("message", "Url no encontrada.");
            response.put("errorType", "not_found");
        }
        
        return response;
    }
    
    public Map<String, Object> getUserName(Long userId) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            response.put("nombreCompleto", user.getNombreCompleto());
        } else {
            response.put("error", "Usuario no encontrado");
        }

        return response;
    }
    
    
}
