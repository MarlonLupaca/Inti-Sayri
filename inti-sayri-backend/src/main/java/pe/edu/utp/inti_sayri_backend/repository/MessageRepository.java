package pe.edu.utp.inti_sayri_backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.utp.inti_sayri_backend.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{
    List<Message> findByChatId(Long chatId);
}
