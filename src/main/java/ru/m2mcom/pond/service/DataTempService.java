package ru.m2mcom.pond.service;

import ru.m2mcom.pond.service.dto.DataTempDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing DataTemp.
 */
public interface DataTempService {

    /**
     * Save a dataTemp.
     *
     * @param dataTempDTO the entity to save
     * @return the persisted entity
     */
    DataTempDTO save(DataTempDTO dataTempDTO);

    /**
     *  Get all the dataTemps.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<DataTempDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" dataTemp.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    DataTempDTO findOne(Long id);

    /**
     *  Delete the "id" dataTemp.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the dataTemp corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<DataTempDTO> search(String query, Pageable pageable);
}
