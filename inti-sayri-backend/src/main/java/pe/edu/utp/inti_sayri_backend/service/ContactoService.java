package pe.edu.utp.inti_sayri_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.inti_sayri_backend.model.Contacto;
import pe.edu.utp.inti_sayri_backend.repository.ContactoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ContactoService {

    private final ContactoRepository contactoRepository;

    @Autowired
    public ContactoService(ContactoRepository contactoRepository) {
        this.contactoRepository = contactoRepository;
    }

    public Contacto crearContacto(Contacto contacto) {
        return contactoRepository.save(contacto);
    }
    
    public List<Contacto> obtenerTodosContactos() {
        return contactoRepository.findAll();
    }

    public Optional<Contacto> obtenerContactoPorId(Long id) {
        return contactoRepository.findById(id);
    }
    
    public List<Contacto> obtenerContactosPorUserId(Long userId) {
        return contactoRepository.findAllByUsuarioId(userId);
    }
    
    public void eliminarContacto(Long id) {
        contactoRepository.deleteById(id);
    }
    
    public void eliminarContactoBidireccional(Long userId, Long contactoId) {
        contactoRepository.deleteByUsuarioIdAndContactoIdOrContactoIdAndUsuarioId(userId, contactoId, contactoId, userId);
    }
}
