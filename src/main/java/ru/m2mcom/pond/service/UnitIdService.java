package ru.m2mcom.pond.service;

import ru.m2mcom.pond.domain.UnitId;
import java.util.List;

/**
 * Service Interface for managing UnitId.
 */
public interface UnitIdService {

    /**
     * Save a unitId.
     *
     * @param unitId the entity to save
     * @return the persisted entity
     */
    UnitId save(UnitId unitId);

    /**
     *  Get all the unitIds.
     *  
     *  @return the list of entities
     */
    List<UnitId> findAll();

    /**
     *  Get the "id" unitId.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    UnitId findOne(Long id);

    /**
     *  Delete the "id" unitId.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the unitId corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @return the list of entities
     */
    List<UnitId> search(String query);
}
