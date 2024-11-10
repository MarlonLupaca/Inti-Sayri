package pe.edu.utp.inti_sayri_backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.utp.inti_sayri_backend.model.Alerta;

@Repository
public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    
    @Query("SELECT a FROM Alerta a JOIN a.community c JOIN a.community.users u WHERE c.title = :title AND u.nombreCompleto = :nombreCompleto")
    List<Alerta> findAlertasByCommunityTitleAndUserNombreCompleto(@Param("title") String title, @Param("nombreCompleto") String nombreCompleto);
}
