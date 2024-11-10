package pe.edu.utp.inti_sayri_backend.model.id;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class ContactoId implements Serializable {
    private Long usuario;
    private Long contacto;
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContactoId that = (ContactoId) o;
        return usuario.equals(that.usuario) && contacto.equals(that.contacto);
    }

    @Override
    public int hashCode() {
        return 31 * usuario.hashCode() + contacto.hashCode();
    }
}
