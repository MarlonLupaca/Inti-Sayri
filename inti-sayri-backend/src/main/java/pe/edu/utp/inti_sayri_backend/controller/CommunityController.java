package pe.edu.utp.inti_sayri_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.inti_sayri_backend.model.Community;
import pe.edu.utp.inti_sayri_backend.service.CommunityService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/communities")
@CrossOrigin("*")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @GetMapping
    public ResponseEntity<List<Community>> getAllCommunities() {
        List<Community> communities = communityService.getAllCommunities();
        return new ResponseEntity<>(communities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Community> getCommunityById(@PathVariable("id") Long id) {
        Optional<Community> community = communityService.getCommunityById(id);
        return community.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Community> createCommunity(@RequestBody Community community) {
        Community createdCommunity = communityService.createCommunity(community);
        return new ResponseEntity<>(createdCommunity, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Community> updateCommunity(@PathVariable("id") Long id, @RequestBody Community community) {
        Community updatedCommunity = communityService.updateCommunity(id, community);
        return updatedCommunity != null ? new ResponseEntity<>(updatedCommunity, HttpStatus.OK)
                                        : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunity(@PathVariable("id") Long id) {
        communityService.deleteCommunity(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @PostMapping("/by-user/{nombreCompleto}")
    public ResponseEntity<Community> createCommunityByNombreUser(@PathVariable("nombreCompleto") String nombreCompleto, @RequestBody Community community) {
        Community createdCommunity = communityService.createCommunityByNombreUsuario(nombreCompleto, community);
        return new ResponseEntity<>(createdCommunity, HttpStatus.CREATED);
    }
    
    @GetMapping("/title/{communityTitle}")
    public ResponseEntity<Community> getCommunityByTitle(@PathVariable("communityTitle") String communityTitle) {
        Optional<Community> community = communityService.getCommunityByTitle(communityTitle);
        return community.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/by-user/{nombreCompleto}")
    public List<Community> getCommunitiesByUser(@PathVariable("nombreCompleto") String nombreCompleto) {
        return communityService.getCommunitiesByUserNombreCompleto(nombreCompleto);
    }
    
    @GetMapping("/{communityTitle}/users")
    public List<String> getUserNamesByCommunityTitle(@PathVariable("communityTitle") String communityTitle) {
        return communityService.getUserNamesByCommunityTitle(communityTitle);
    }
    
    @GetMapping("/{nombreCompleto}/{communityTitle}/users")
    public List<String> getUserNamesByCommunityTitleAndNombreCompleto(@PathVariable("communityTitle") String communityTitle,
                                                                      @PathVariable("nombreCompleto") String nombreCompleto) {
        return communityService.getUserNamesByCommunityTitleAndNombreCompleto(communityTitle, nombreCompleto);
    }
}
