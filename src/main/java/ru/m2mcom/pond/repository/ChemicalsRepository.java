package ru.m2mcom.pond.repository;

import ru.m2mcom.pond.domain.Chemicals;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Chemicals entity.
 */
@SuppressWarnings("unused")
public interface ChemicalsRepository extends JpaRepository<Chemicals,Long> {

}
