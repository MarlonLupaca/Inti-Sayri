package pe.edu.utp.inti_sayri_backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.utp.inti_sayri_backend.model.Community;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    
    @Query("SELECT u.nombreCompleto FROM Community c JOIN c.users u WHERE c.title = :communityTitle")
    List<String> findUserNamesByCommunityTitle(@Param("communityTitle") String communityTitle);
    
    Optional<Community> findByTitle(String title);
    
    @Query("SELECT c FROM Community c JOIN c.users u WHERE u.nombreCompleto = :nombreCompleto")
    List<Community> findCommunitiesByUserNombreCompleto(@Param("nombreCompleto") String nombreCompleto);
    
    @Query("SELECT u.nombreCompleto FROM Community c JOIN c.users u WHERE c.title = :communityTitle AND u.nombreCompleto = :nombreCompleto")
    List<String> findUserNamesByCommunityTitleAndUserNombreCompleto(@Param("communityTitle") String communityTitle, @Param("nombreCompleto") String nombreCompleto);
}
