package ru.m2mcom.pond.repository;

import ru.m2mcom.pond.domain.DataTemp;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the DataTemp entity.
 */
@SuppressWarnings("unused")
public interface DataTempRepository extends JpaRepository<DataTemp,Long> {

}
