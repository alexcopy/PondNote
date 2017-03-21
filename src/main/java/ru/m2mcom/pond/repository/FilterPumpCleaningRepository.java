package ru.m2mcom.pond.repository;

import ru.m2mcom.pond.domain.FilterPumpCleaning;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the FilterPumpCleaning entity.
 */
@SuppressWarnings("unused")
public interface FilterPumpCleaningRepository extends JpaRepository<FilterPumpCleaning,Long> {

}
