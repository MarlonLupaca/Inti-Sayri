package pe.edu.utp.inti_sayri_backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.utp.inti_sayri_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByCorreoElectronico(String correoElectronico);
    Optional<User> findByNombreCompleto(String nombreCompleto);
}
