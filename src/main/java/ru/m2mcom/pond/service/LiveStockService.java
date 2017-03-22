package ru.m2mcom.pond.service;

import ru.m2mcom.pond.service.dto.LiveStockDTO;
import java.util.List;

/**
 * Service Interface for managing LiveStock.
 */
public interface LiveStockService {

    /**
     * Save a liveStock.
     *
     * @param liveStockDTO the entity to save
     * @return the persisted entity
     */
    LiveStockDTO save(LiveStockDTO liveStockDTO);

    /**
     *  Get all the liveStocks.
     *  
     *  @return the list of entities
     */
    List<LiveStockDTO> findAll();

    /**
     *  Get the "id" liveStock.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    LiveStockDTO findOne(Long id);

    /**
     *  Delete the "id" liveStock.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the liveStock corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @return the list of entities
     */
    List<LiveStockDTO> search(String query);
}
