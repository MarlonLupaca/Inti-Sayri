package pe.edu.utp.inti_sayri_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.inti_sayri_backend.model.Alerta;
import pe.edu.utp.inti_sayri_backend.repository.AlertaRepository;

import java.util.List;
import java.util.Optional;
import pe.edu.utp.inti_sayri_backend.model.Community;
import pe.edu.utp.inti_sayri_backend.model.User;
import pe.edu.utp.inti_sayri_backend.repository.CommunityRepository;
import pe.edu.utp.inti_sayri_backend.repository.UserRepository;

@Service
public class AlertaService {

    @Autowired
    private AlertaRepository alertaRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CommunityRepository communityRepository;

    public List<Alerta> getAllAlertas() {
        return alertaRepository.findAll();
    }

    public Optional<Alerta> getAlertaById(Long id) {
        return alertaRepository.findById(id);
    }

    public Alerta createAlerta(Alerta alerta) {
        return alertaRepository.save(alerta);
    }

    public Alerta updateAlerta(Long id, Alerta alerta) {
        if (alertaRepository.existsById(id)) {
            alerta.setId(id);
            return alertaRepository.save(alerta);
        }
        return null;
    }

    public void deleteAlerta(Long id) {
        alertaRepository.deleteById(id);
    }
    
    public Alerta createAlerta(String nombreCompleto, String communityTitle, Alerta alerta) {
        
        Optional<User> userOpt = userRepository.findByNombreCompleto(nombreCompleto);
        if (!userOpt.isPresent()) {
            throw new RuntimeException("Usuario con nombre completo '" + nombreCompleto + "' no encontrado.");
        }

        Optional<Community> communityOpt = communityRepository.findByTitle(communityTitle);
        if (!communityOpt.isPresent()) {
            throw new RuntimeException("Comunidad con título '" + communityTitle + "' no encontrada.");
        }

        alerta.setCommunity(communityOpt.get());
        communityOpt.get().getAlertas().add(alerta);
        communityOpt.get().getUsers().add(userOpt.get());

        communityRepository.save(communityOpt.get());

        return alertaRepository.save(alerta);
    }
    
    public List<Alerta> getAlertasByCommunityTitleAndUserNombreCompleto(String title, String nombreCompleto) {
        return alertaRepository.findAlertasByCommunityTitleAndUserNombreCompleto(title, nombreCompleto);
    }
}
