package ru.m2mcom.pond.repository;

import ru.m2mcom.pond.domain.OtherWorks;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the OtherWorks entity.
 */
@SuppressWarnings("unused")
public interface OtherWorksRepository extends JpaRepository<OtherWorks,Long> {

}
