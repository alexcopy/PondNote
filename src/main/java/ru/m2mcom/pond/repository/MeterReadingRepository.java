package ru.m2mcom.pond.repository;

import ru.m2mcom.pond.domain.MeterReading;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the MeterReading entity.
 */
@SuppressWarnings("unused")
public interface MeterReadingRepository extends JpaRepository<MeterReading,Long> {

}
