package ru.m2mcom.pond.service.impl;

import ru.m2mcom.pond.service.UnitIdService;
import ru.m2mcom.pond.domain.UnitId;
import ru.m2mcom.pond.repository.UnitIdRepository;
import ru.m2mcom.pond.repository.search.UnitIdSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing UnitId.
 */
@Service
@Transactional
public class UnitIdServiceImpl implements UnitIdService{

    private final Logger log = LoggerFactory.getLogger(UnitIdServiceImpl.class);
    
    private final UnitIdRepository unitIdRepository;

    private final UnitIdSearchRepository unitIdSearchRepository;

    public UnitIdServiceImpl(UnitIdRepository unitIdRepository, UnitIdSearchRepository unitIdSearchRepository) {
        this.unitIdRepository = unitIdRepository;
        this.unitIdSearchRepository = unitIdSearchRepository;
    }

    /**
     * Save a unitId.
     *
     * @param unitId the entity to save
     * @return the persisted entity
     */
    @Override
    public UnitId save(UnitId unitId) {
        log.debug("Request to save UnitId : {}", unitId);
        UnitId result = unitIdRepository.save(unitId);
        unitIdSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the unitIds.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UnitId> findAll() {
        log.debug("Request to get all UnitIds");
        List<UnitId> result = unitIdRepository.findAll();

        return result;
    }

    /**
     *  Get one unitId by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UnitId findOne(Long id) {
        log.debug("Request to get UnitId : {}", id);
        UnitId unitId = unitIdRepository.findOne(id);
        return unitId;
    }

    /**
     *  Delete the  unitId by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UnitId : {}", id);
        unitIdRepository.delete(id);
        unitIdSearchRepository.delete(id);
    }

    /**
     * Search for the unitId corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UnitId> search(String query) {
        log.debug("Request to search UnitIds for query {}", query);
        return StreamSupport
            .stream(unitIdSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
