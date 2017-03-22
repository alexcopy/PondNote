package ru.m2mcom.pond.service;

import ru.m2mcom.pond.service.dto.ChemicalAnalysisDTO;
import java.util.List;

/**
 * Service Interface for managing ChemicalAnalysis.
 */
public interface ChemicalAnalysisService {

    /**
     * Save a chemicalAnalysis.
     *
     * @param chemicalAnalysisDTO the entity to save
     * @return the persisted entity
     */
    ChemicalAnalysisDTO save(ChemicalAnalysisDTO chemicalAnalysisDTO);

    /**
     *  Get all the chemicalAnalyses.
     *  
     *  @return the list of entities
     */
    List<ChemicalAnalysisDTO> findAll();

    /**
     *  Get the "id" chemicalAnalysis.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ChemicalAnalysisDTO findOne(Long id);

    /**
     *  Delete the "id" chemicalAnalysis.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the chemicalAnalysis corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @return the list of entities
     */
    List<ChemicalAnalysisDTO> search(String query);
}
