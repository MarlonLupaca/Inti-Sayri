package pe.edu.utp.inti_sayri_backend.model.id;

import java.io.Serializable;

public class FavoritoId implements Serializable {

    private Long user;
    private Long location;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FavoritoId that = (FavoritoId) o;
        return user.equals(that.user) && location.equals(that.location);
    }

    @Override
    public int hashCode() {
        return 31 * user.hashCode() + location.hashCode();
    }
}
