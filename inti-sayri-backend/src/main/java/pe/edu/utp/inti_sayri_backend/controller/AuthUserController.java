package pe.edu.utp.inti_sayri_backend.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.utp.inti_sayri_backend.model.User;
import pe.edu.utp.inti_sayri_backend.service.UserService;
import pe.edu.utp.inti_sayri_backend.util.ResponseUtil;

@RestController
@RequestMapping("/api/v1/authUsusarios")
@CrossOrigin("*")
public class AuthUserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/registro")
    public ResponseEntity<Map<String, Object>> registrarUsuario(@RequestBody User usuario) {
        Map<String, Object> response = userService.registrarUsuario(usuario);
        return ResponseUtil.createResponse(response, HttpStatus.CREATED);
    }
    
    @GetMapping("/login/{correo_electronico}/{contrasena}")
    public ResponseEntity<Map<String, Object>> iniciarSesion(@PathVariable("correo_electronico") String correoElectronico, 
                                                             @PathVariable("contrasena") String contrasena) {
        Map<String, Object> response = userService.iniciarSesion(correoElectronico, contrasena);
        return ResponseUtil.createResponse(response, HttpStatus.OK);
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> iniciarSesionPost(@RequestParam("correo_electronico") String correoElectronico, 
                                                             @RequestParam("contrasena") String contrasena) {
        Map<String, Object> response = userService.iniciarSesion(correoElectronico, contrasena);
        return ResponseUtil.createResponse(response, HttpStatus.OK);
    }
}
