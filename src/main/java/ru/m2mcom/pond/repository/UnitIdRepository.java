package ru.m2mcom.pond.repository;

import ru.m2mcom.pond.domain.UnitId;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UnitId entity.
 */
@SuppressWarnings("unused")
public interface UnitIdRepository extends JpaRepository<UnitId,Long> {

}
