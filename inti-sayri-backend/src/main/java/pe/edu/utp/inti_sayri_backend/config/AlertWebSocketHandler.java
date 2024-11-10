package pe.edu.utp.inti_sayri_backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import pe.edu.utp.inti_sayri_backend.model.AlertRequest;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component  // Convertimos esta clase en un componente de Spring
public class AlertWebSocketHandler extends TextWebSocketHandler {

    // Mapa que almacena las sesiones activas, con el userId como clave
    private static final ConcurrentHashMap<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    // Este método se llama cuando un cliente se conecta
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String userId = getUserIdFromSession(session);

        // Si tenemos un userId válido, registramos la sesión
        if (userId != null) {
            userSessions.put(userId, session);
            System.out.println("Usuario conectado: " + userId);
        } else {
            session.close();  // Si no hay un userId, cerramos la sesión
        }
    }

    // Este método se llama cuando se recibe un mensaje del cliente
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        // Procesar el mensaje JSON recibido
        ObjectMapper mapper = new ObjectMapper();
        AlertRequest alertRequest = mapper.readValue(message.getPayload(), AlertRequest.class);

        System.out.println("Mensaje recibido de " + alertRequest.getUserId() + ": " + alertRequest.getAlertMessage());

        // Reenviar el mensaje a otros usuarios
        sendAlertToRecipients(alertRequest.getAlertMessage(), alertRequest.getUserId());
    }

    // Método para obtener el userId de los parámetros de la URL
    private String getUserIdFromSession(WebSocketSession session) {
        String uri = session.getUri().toString();
        return uri.split("\\?")[1].split("=")[1];
    }

    // Este método se llama cuando un cliente se desconecta
    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        String userId = getUserIdFromSession(session);
        if (userId != null) {
            userSessions.remove(userId);
            System.out.println("Usuario desconectado: " + userId);
        }
    }

    // Método para enviar alertas a los destinatarios
    public void sendAlertToRecipients(String alertMessage, String userId) {
        userSessions.forEach((id, session) -> {
            if (!id.equals(userId)) {  // No enviar al mismo usuario que envió la alerta
                try {
                    session.sendMessage(new TextMessage(alertMessage));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
