package pe.edu.utp.inti_sayri_backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pe.edu.utp.inti_sayri_backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import pe.edu.utp.inti_sayri_backend.model.User;
import pe.edu.utp.inti_sayri_backend.util.ResponseUtil;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
    
    @PostMapping("/{userId}/profile-photo")
    public ResponseEntity<?> uploadPhoto(@PathVariable("userId") Long userId, @RequestParam("file") MultipartFile file) {
        String userFolder = "uploads/" + userId + "/profile";
        Path userDirectory = Paths.get( userFolder );
        
        if (!Files.exists(userDirectory)) {
            try {
                // Crea la carpeta para el usuario si no existe.
                Files.createDirectories(userDirectory);
            } catch (IOException ex) {
                Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, "Error creating user folder", ex);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user folder");
            }
        }
        
        // 1. Guarda el archivo en una carpeta del servidor.
        String fileName = file.getOriginalFilename();
        Path path = userDirectory.resolve(fileName);
        
        try {
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user folder");
        }

        // 2. Guarda la ruta en la base de datos.
        String photoUrl = "/" + userFolder + "/" + fileName;
        
        Map<String, Object> response = userService.addProfilePhotoUrl(userId, photoUrl);
        return ResponseUtil.createResponse(response, HttpStatus.OK);
    }
    
    @GetMapping("/{userId}/profile-photo")
    public ResponseEntity<Map<String, Object>> getProfilePhoto(@PathVariable("userId") Long userId) {
        // Busca la URL de la foto de perfil en la base de datos
        Map<String, Object> response = userService.getProfilePhotoUrl(userId);
        return ResponseUtil.createResponse(response, HttpStatus.OK);
    }
    
    @GetMapping("/{userId}/name")
    public ResponseEntity<Map<String, Object>> getUserName(@PathVariable("userId") Long userId) {
        // Llama al servicio para obtener solo el nombre del usuario
        Map<String, Object> response = userService.getUserName(userId);
        return ResponseUtil.createResponse(response, HttpStatus.OK);
    }

}
