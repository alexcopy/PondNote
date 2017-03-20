package ru.m2mcom.pond.service.impl;

import ru.m2mcom.pond.service.WaterCounterService;
import ru.m2mcom.pond.domain.WaterCounter;
import ru.m2mcom.pond.repository.WaterCounterRepository;
import ru.m2mcom.pond.repository.search.WaterCounterSearchRepository;
import ru.m2mcom.pond.service.dto.WaterCounterDTO;
import ru.m2mcom.pond.service.mapper.WaterCounterMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing WaterCounter.
 */
@Service
@Transactional
public class WaterCounterServiceImpl implements WaterCounterService{

    private final Logger log = LoggerFactory.getLogger(WaterCounterServiceImpl.class);
    
    private final WaterCounterRepository waterCounterRepository;

    private final WaterCounterMapper waterCounterMapper;

    private final WaterCounterSearchRepository waterCounterSearchRepository;

    public WaterCounterServiceImpl(WaterCounterRepository waterCounterRepository, WaterCounterMapper waterCounterMapper, WaterCounterSearchRepository waterCounterSearchRepository) {
        this.waterCounterRepository = waterCounterRepository;
        this.waterCounterMapper = waterCounterMapper;
        this.waterCounterSearchRepository = waterCounterSearchRepository;
    }

    /**
     * Save a waterCounter.
     *
     * @param waterCounterDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public WaterCounterDTO save(WaterCounterDTO waterCounterDTO) {
        log.debug("Request to save WaterCounter : {}", waterCounterDTO);
        WaterCounter waterCounter = waterCounterMapper.waterCounterDTOToWaterCounter(waterCounterDTO);
        waterCounter = waterCounterRepository.save(waterCounter);
        WaterCounterDTO result = waterCounterMapper.waterCounterToWaterCounterDTO(waterCounter);
        waterCounterSearchRepository.save(waterCounter);
        return result;
    }

    /**
     *  Get all the waterCounters.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<WaterCounterDTO> findAll(Pageable pageable) {
        log.debug("Request to get all WaterCounters");
        Page<WaterCounter> result = waterCounterRepository.findAll(pageable);
        return result.map(waterCounter -> waterCounterMapper.waterCounterToWaterCounterDTO(waterCounter));
    }

    /**
     *  Get one waterCounter by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public WaterCounterDTO findOne(Long id) {
        log.debug("Request to get WaterCounter : {}", id);
        WaterCounter waterCounter = waterCounterRepository.findOne(id);
        WaterCounterDTO waterCounterDTO = waterCounterMapper.waterCounterToWaterCounterDTO(waterCounter);
        return waterCounterDTO;
    }

    /**
     *  Delete the  waterCounter by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete WaterCounter : {}", id);
        waterCounterRepository.delete(id);
        waterCounterSearchRepository.delete(id);
    }

    /**
     * Search for the waterCounter corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<WaterCounterDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of WaterCounters for query {}", query);
        Page<WaterCounter> result = waterCounterSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(waterCounter -> waterCounterMapper.waterCounterToWaterCounterDTO(waterCounter));
    }
}
