package ru.m2mcom.pond.service;

import ru.m2mcom.pond.service.dto.WaterCounterDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing WaterCounter.
 */
public interface WaterCounterService {

    /**
     * Save a waterCounter.
     *
     * @param waterCounterDTO the entity to save
     * @return the persisted entity
     */
    WaterCounterDTO save(WaterCounterDTO waterCounterDTO);

    /**
     *  Get all the waterCounters.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<WaterCounterDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" waterCounter.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    WaterCounterDTO findOne(Long id);

    /**
     *  Delete the "id" waterCounter.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the waterCounter corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<WaterCounterDTO> search(String query, Pageable pageable);
}
