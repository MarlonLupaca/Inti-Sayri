package pe.edu.utp.inti_sayri_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.utp.inti_sayri_backend.model.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    
}
