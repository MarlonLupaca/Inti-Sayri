package pe.edu.utp.inti_sayri_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import pe.edu.utp.inti_sayri_backend.model.id.ContactoId;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
@IdClass(ContactoId.class)
@Table(name = "contactos")
public class Contacto {
    
    @Id
    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    @JsonBackReference
    private User usuario;
    
    @Id
    @ManyToOne
    @JoinColumn(name = "id_contacto", referencedColumnName = "id")
    @JsonBackReference
    private User contacto;

    @Column(name = "fecha_agregado")
    private LocalDate fechaAgregado;
}
