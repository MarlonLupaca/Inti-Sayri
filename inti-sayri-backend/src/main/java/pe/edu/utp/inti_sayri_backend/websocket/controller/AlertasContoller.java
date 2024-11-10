package pe.edu.utp.inti_sayri_backend.websocket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.inti_sayri_backend.config.AlertWebSocketHandler;
import pe.edu.utp.inti_sayri_backend.model.AlertRequest;

@RestController
@RequestMapping("/api/alerts")
public class AlertasContoller {

    @Autowired
    private AlertWebSocketHandler alertWebSocketHandler;

    @PostMapping
    public ResponseEntity<String> sendAlert(@RequestBody AlertRequest alertRequest) {
        System.out.println("Alerta: " + alertRequest.getAlertMessage());
        System.out.println("Destinatarios: " + alertRequest.getRecipients());

        // Llamamos al método de envío de alertas a los destinatarios
        alertWebSocketHandler.sendAlertToRecipients(alertRequest.getAlertMessage(), alertRequest.getUserId());

        return ResponseEntity.ok("Alerta enviada con éxito.");
    }
}
