package pe.edu.utp.inti_sayri_backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.utp.inti_sayri_backend.model.Contacto;

public interface ContactoRepository extends JpaRepository<Contacto, Long> {
    
    List<Contacto> findAllByUsuarioId(Long usuarioId);
    
    void deleteByUsuarioIdAndContactoIdOrContactoIdAndUsuarioId(Long usuarioId, Long contactoId, Long contactoId2, Long usuarioId2);
}
