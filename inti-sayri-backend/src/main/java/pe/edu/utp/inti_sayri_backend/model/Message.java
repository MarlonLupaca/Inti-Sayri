package pe.edu.utp.inti_sayri_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
@Table(name = "messages")
public class Message {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String contenido;
    
    private String marcaTemporal;
    
    @ManyToOne
    @JoinColumn(name = "remitente_id", nullable = false)
    @JsonIgnoreProperties("chats")
    private User remitente;
    
    @ManyToOne
    @JoinColumn(name = "destinatario_id", nullable = false)
    @JsonIgnoreProperties("chats")
    private User destinatario;
    
    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    @JsonIgnoreProperties("messages")
    private Chat chat;
}
