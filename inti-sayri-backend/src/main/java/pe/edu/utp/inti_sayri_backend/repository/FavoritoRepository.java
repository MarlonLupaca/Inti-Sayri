package pe.edu.utp.inti_sayri_backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.utp.inti_sayri_backend.model.Favorito;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    
    Optional<Favorito> findByUserIdAndLocationId(Long userId, Long locationId);
    
    List<Favorito> findByUserId(Long userId);
}
