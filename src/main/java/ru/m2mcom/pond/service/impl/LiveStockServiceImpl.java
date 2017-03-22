package ru.m2mcom.pond.service.impl;

import ru.m2mcom.pond.service.LiveStockService;
import ru.m2mcom.pond.domain.LiveStock;
import ru.m2mcom.pond.repository.LiveStockRepository;
import ru.m2mcom.pond.repository.search.LiveStockSearchRepository;
import ru.m2mcom.pond.service.dto.LiveStockDTO;
import ru.m2mcom.pond.service.mapper.LiveStockMapper;
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
 * Service Implementation for managing LiveStock.
 */
@Service
@Transactional
public class LiveStockServiceImpl implements LiveStockService{

    private final Logger log = LoggerFactory.getLogger(LiveStockServiceImpl.class);
    
    private final LiveStockRepository liveStockRepository;

    private final LiveStockMapper liveStockMapper;

    private final LiveStockSearchRepository liveStockSearchRepository;

    public LiveStockServiceImpl(LiveStockRepository liveStockRepository, LiveStockMapper liveStockMapper, LiveStockSearchRepository liveStockSearchRepository) {
        this.liveStockRepository = liveStockRepository;
        this.liveStockMapper = liveStockMapper;
        this.liveStockSearchRepository = liveStockSearchRepository;
    }

    /**
     * Save a liveStock.
     *
     * @param liveStockDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LiveStockDTO save(LiveStockDTO liveStockDTO) {
        log.debug("Request to save LiveStock : {}", liveStockDTO);
        LiveStock liveStock = liveStockMapper.liveStockDTOToLiveStock(liveStockDTO);
        liveStock = liveStockRepository.save(liveStock);
        LiveStockDTO result = liveStockMapper.liveStockToLiveStockDTO(liveStock);
        liveStockSearchRepository.save(liveStock);
        return result;
    }

    /**
     *  Get all the liveStocks.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LiveStockDTO> findAll() {
        log.debug("Request to get all LiveStocks");
        List<LiveStockDTO> result = liveStockRepository.findAll().stream()
            .map(liveStockMapper::liveStockToLiveStockDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one liveStock by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public LiveStockDTO findOne(Long id) {
        log.debug("Request to get LiveStock : {}", id);
        LiveStock liveStock = liveStockRepository.findOne(id);
        LiveStockDTO liveStockDTO = liveStockMapper.liveStockToLiveStockDTO(liveStock);
        return liveStockDTO;
    }

    /**
     *  Delete the  liveStock by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LiveStock : {}", id);
        liveStockRepository.delete(id);
        liveStockSearchRepository.delete(id);
    }

    /**
     * Search for the liveStock corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LiveStockDTO> search(String query) {
        log.debug("Request to search LiveStocks for query {}", query);
        return StreamSupport
            .stream(liveStockSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(liveStockMapper::liveStockToLiveStockDTO)
            .collect(Collectors.toList());
    }
}
