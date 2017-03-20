package ru.m2mcom.pond.service.impl;

import ru.m2mcom.pond.service.DataTempService;
import ru.m2mcom.pond.domain.DataTemp;
import ru.m2mcom.pond.repository.DataTempRepository;
import ru.m2mcom.pond.repository.search.DataTempSearchRepository;
import ru.m2mcom.pond.service.dto.DataTempDTO;
import ru.m2mcom.pond.service.mapper.DataTempMapper;
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
 * Service Implementation for managing DataTemp.
 */
@Service
@Transactional
public class DataTempServiceImpl implements DataTempService{

    private final Logger log = LoggerFactory.getLogger(DataTempServiceImpl.class);
    
    private final DataTempRepository dataTempRepository;

    private final DataTempMapper dataTempMapper;

    private final DataTempSearchRepository dataTempSearchRepository;

    public DataTempServiceImpl(DataTempRepository dataTempRepository, DataTempMapper dataTempMapper, DataTempSearchRepository dataTempSearchRepository) {
        this.dataTempRepository = dataTempRepository;
        this.dataTempMapper = dataTempMapper;
        this.dataTempSearchRepository = dataTempSearchRepository;
    }

    /**
     * Save a dataTemp.
     *
     * @param dataTempDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DataTempDTO save(DataTempDTO dataTempDTO) {
        log.debug("Request to save DataTemp : {}", dataTempDTO);
        DataTemp dataTemp = dataTempMapper.dataTempDTOToDataTemp(dataTempDTO);
        dataTemp = dataTempRepository.save(dataTemp);
        DataTempDTO result = dataTempMapper.dataTempToDataTempDTO(dataTemp);
        dataTempSearchRepository.save(dataTemp);
        return result;
    }

    /**
     *  Get all the dataTemps.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DataTempDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DataTemps");
        Page<DataTemp> result = dataTempRepository.findAll(pageable);
        return result.map(dataTemp -> dataTempMapper.dataTempToDataTempDTO(dataTemp));
    }

    /**
     *  Get one dataTemp by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DataTempDTO findOne(Long id) {
        log.debug("Request to get DataTemp : {}", id);
        DataTemp dataTemp = dataTempRepository.findOne(id);
        DataTempDTO dataTempDTO = dataTempMapper.dataTempToDataTempDTO(dataTemp);
        return dataTempDTO;
    }

    /**
     *  Delete the  dataTemp by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DataTemp : {}", id);
        dataTempRepository.delete(id);
        dataTempSearchRepository.delete(id);
    }

    /**
     * Search for the dataTemp corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DataTempDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of DataTemps for query {}", query);
        Page<DataTemp> result = dataTempSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(dataTemp -> dataTempMapper.dataTempToDataTempDTO(dataTemp));
    }
}
