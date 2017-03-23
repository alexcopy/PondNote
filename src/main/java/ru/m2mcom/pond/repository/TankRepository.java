package ru.m2mcom.pond.repository;

import ru.m2mcom.pond.domain.Tank;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Tank entity.
 */
@SuppressWarnings("unused")
public interface TankRepository extends JpaRepository<Tank,Long> {

}
