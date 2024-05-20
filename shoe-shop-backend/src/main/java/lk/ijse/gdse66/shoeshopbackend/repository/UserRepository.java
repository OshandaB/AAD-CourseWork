package lk.ijse.gdse66.shoeshopbackend.repository;


import lk.ijse.gdse66.shoeshopbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByEmail (String email);
}
