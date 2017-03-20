package ru.m2mcom.pond.repository;

import ru.m2mcom.pond.domain.WaterCounter;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the WaterCounter entity.
 */
@SuppressWarnings("unused")
public interface WaterCounterRepository extends JpaRepository<WaterCounter,Long> {

}
