package pe.edu.utp.inti_sayri_backend.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
@Embeddable
public class LocationPosition {
    
    private double latitude;
    
    private double longitude;
}
