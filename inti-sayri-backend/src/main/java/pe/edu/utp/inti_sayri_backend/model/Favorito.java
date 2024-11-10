package pe.edu.utp.inti_sayri_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.utp.inti_sayri_backend.model.id.FavoritoId;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
@IdClass(FavoritoId.class) 
@Table(name = "favoritos")
public class Favorito {
    
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Id
    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;
}
