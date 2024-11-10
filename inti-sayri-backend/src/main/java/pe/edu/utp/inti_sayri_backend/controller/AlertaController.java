package pe.edu.utp.inti_sayri_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.inti_sayri_backend.model.Alerta;
import pe.edu.utp.inti_sayri_backend.service.AlertaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alertas")
@CrossOrigin("*")
public class AlertaController {

    @Autowired
    private AlertaService alertaService;

    @GetMapping
    public ResponseEntity<List<Alerta>> getAllAlertas() {
        List<Alerta> alertas = alertaService.getAllAlertas();
        return new ResponseEntity<>(alertas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alerta> getAlertaById(@PathVariable("id") Long id) {
        Optional<Alerta> alerta = alertaService.getAlertaById(id);
        return alerta.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Alerta> createAlerta(@RequestBody Alerta alerta) {
        Alerta createdAlerta = alertaService.createAlerta(alerta);
        return new ResponseEntity<>(createdAlerta, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alerta> updateAlerta(@PathVariable("id") Long id, @RequestBody Alerta alerta) {
        Alerta updatedAlerta = alertaService.updateAlerta(id, alerta);
        return updatedAlerta != null ? new ResponseEntity<>(updatedAlerta, HttpStatus.OK)
                                     : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlerta(@PathVariable("id") Long id) {
        alertaService.deleteAlerta(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @PostMapping("/community/{communityTitle}/user/{nombreCompleto}")
    public ResponseEntity<Alerta> createAlerta(@PathVariable("nombreCompleto") String nombreCompleto, 
                                               @PathVariable("communityTitle") String communityTitle, @RequestBody Alerta alerta) {
        Alerta createdAlerta = alertaService.createAlerta(nombreCompleto, communityTitle, alerta);
        return new ResponseEntity<>(createdAlerta, HttpStatus.CREATED);
    }
    
    @GetMapping("/community/{communityTitle}/user/{nombreCompleto}")
    public List<Alerta> getAlertasByCommunityAndUser(@PathVariable("communityTitle") String title, 
                                                     @PathVariable("nombreCompleto") String nombreCompleto) {
        return alertaService.getAlertasByCommunityTitleAndUserNombreCompleto(title, nombreCompleto);
    }
}
