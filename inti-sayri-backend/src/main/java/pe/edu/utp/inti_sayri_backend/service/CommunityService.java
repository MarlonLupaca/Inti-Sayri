package pe.edu.utp.inti_sayri_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.inti_sayri_backend.model.Community;
import pe.edu.utp.inti_sayri_backend.repository.CommunityRepository;

import java.util.List;
import java.util.Optional;
import pe.edu.utp.inti_sayri_backend.model.User;
import pe.edu.utp.inti_sayri_backend.repository.UserRepository;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }

    public Optional<Community> getCommunityById(Long id) {
        return communityRepository.findById(id);
    }

    public Community createCommunity(Community community) {
        return communityRepository.save(community);
    }

    public Community updateCommunity(Long id, Community community) {
        if (communityRepository.existsById(id)) {
            community.setId(id);
            return communityRepository.save(community);
        }
        return null;
    }

    public void deleteCommunity(Long id) {
        communityRepository.deleteById(id);
    }
    
    public Community createCommunityByNombreUsuario(String nombreCompleto, Community community) {
        Optional<User> userOpt = userRepository.findByNombreCompleto(nombreCompleto);
        community.getUsers().add(userOpt.get());
        return communityRepository.save(community);
    }
    
     public Optional<Community> getCommunityByTitle(String title) {
        return communityRepository.findByTitle(title);
    }
     
     public List<Community> getCommunitiesByUserNombreCompleto(String nombreCompleto) {
        return communityRepository.findCommunitiesByUserNombreCompleto(nombreCompleto);
    }
    
    public List<String> getUserNamesByCommunityTitle(String communityTitle) {
        return communityRepository.findUserNamesByCommunityTitle(communityTitle);
    }
    
    public List<String> getUserNamesByCommunityTitleAndNombreCompleto(String communityTitle, String nombreComplto) {
        return communityRepository.findUserNamesByCommunityTitleAndUserNombreCompleto(communityTitle, nombreComplto);
    }
}
