package ru.m2mcom.pond.repository;

import ru.m2mcom.pond.domain.Tank;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Tank entity.
 */
@SuppressWarnings("unused")
public interface TankRepository extends JpaRepository<Tank,Long> {

    @Query("select tank from Tank tank where tank.user.login = ?#{principal.username}")
    List<Tank> findByUserIsCurrentUser();

}
