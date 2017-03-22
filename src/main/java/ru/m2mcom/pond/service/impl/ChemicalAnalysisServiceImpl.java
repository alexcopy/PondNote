package ru.m2mcom.pond.service.impl;

import ru.m2mcom.pond.service.ChemicalAnalysisService;
import ru.m2mcom.pond.domain.ChemicalAnalysis;
import ru.m2mcom.pond.repository.ChemicalAnalysisRepository;
import ru.m2mcom.pond.repository.search.ChemicalAnalysisSearchRepository;
import ru.m2mcom.pond.service.dto.ChemicalAnalysisDTO;
import ru.m2mcom.pond.service.mapper.ChemicalAnalysisMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ChemicalAnalysis.
 */
@Service
@Transactional
public class ChemicalAnalysisServiceImpl implements ChemicalAnalysisService{

    private final Logger log = LoggerFactory.getLogger(ChemicalAnalysisServiceImpl.class);
    
    private final ChemicalAnalysisRepository chemicalAnalysisRepository;

    private final ChemicalAnalysisMapper chemicalAnalysisMapper;

    private final ChemicalAnalysisSearchRepository chemicalAnalysisSearchRepository;

    public ChemicalAnalysisServiceImpl(ChemicalAnalysisRepository chemicalAnalysisRepository, ChemicalAnalysisMapper chemicalAnalysisMapper, ChemicalAnalysisSearchRepository chemicalAnalysisSearchRepository) {
        this.chemicalAnalysisRepository = chemicalAnalysisRepository;
        this.chemicalAnalysisMapper = chemicalAnalysisMapper;
        this.chemicalAnalysisSearchRepository = chemicalAnalysisSearchRepository;
    }

    /**
     * Save a chemicalAnalysis.
     *
     * @param chemicalAnalysisDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ChemicalAnalysisDTO save(ChemicalAnalysisDTO chemicalAnalysisDTO) {
        log.debug("Request to save ChemicalAnalysis : {}", chemicalAnalysisDTO);
        ChemicalAnalysis chemicalAnalysis = chemicalAnalysisMapper.chemicalAnalysisDTOToChemicalAnalysis(chemicalAnalysisDTO);
        chemicalAnalysis = chemicalAnalysisRepository.save(chemicalAnalysis);
        ChemicalAnalysisDTO result = chemicalAnalysisMapper.chemicalAnalysisToChemicalAnalysisDTO(chemicalAnalysis);
        chemicalAnalysisSearchRepository.save(chemicalAnalysis);
        return result;
    }

    /**
     *  Get all the chemicalAnalyses.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ChemicalAnalysisDTO> findAll() {
        log.debug("Request to get all ChemicalAnalyses");
        List<ChemicalAnalysisDTO> result = chemicalAnalysisRepository.findAllWithEagerRelationships().stream()
            .map(chemicalAnalysisMapper::chemicalAnalysisToChemicalAnalysisDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one chemicalAnalysis by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ChemicalAnalysisDTO findOne(Long id) {
        log.debug("Request to get ChemicalAnalysis : {}", id);
        ChemicalAnalysis chemicalAnalysis = chemicalAnalysisRepository.findOneWithEagerRelationships(id);
        ChemicalAnalysisDTO chemicalAnalysisDTO = chemicalAnalysisMapper.chemicalAnalysisToChemicalAnalysisDTO(chemicalAnalysis);
        return chemicalAnalysisDTO;
    }

    /**
     *  Delete the  chemicalAnalysis by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ChemicalAnalysis : {}", id);
        chemicalAnalysisRepository.delete(id);
        chemicalAnalysisSearchRepository.delete(id);
    }

    /**
     * Search for the chemicalAnalysis corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ChemicalAnalysisDTO> search(String query) {
        log.debug("Request to search ChemicalAnalyses for query {}", query);
        return StreamSupport
            .stream(chemicalAnalysisSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(chemicalAnalysisMapper::chemicalAnalysisToChemicalAnalysisDTO)
            .collect(Collectors.toList());
    }
}
