package ru.m2mcom.pond.service;

import ru.m2mcom.pond.service.dto.ChemicalsDTO;
import java.util.List;

/**
 * Service Interface for managing Chemicals.
 */
public interface ChemicalsService {

    /**
     * Save a chemicals.
     *
     * @param chemicalsDTO the entity to save
     * @return the persisted entity
     */
    ChemicalsDTO save(ChemicalsDTO chemicalsDTO);

    /**
     *  Get all the chemicals.
     *  
     *  @return the list of entities
     */
    List<ChemicalsDTO> findAll();

    /**
     *  Get the "id" chemicals.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ChemicalsDTO findOne(Long id);

    /**
     *  Delete the "id" chemicals.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the chemicals corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @return the list of entities
     */
    List<ChemicalsDTO> search(String query);
}
