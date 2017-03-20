package ru.m2mcom.pond.web.rest;

import com.codahale.metrics.annotation.Timed;
import ru.m2mcom.pond.domain.UnitId;
import ru.m2mcom.pond.service.UnitIdService;
import ru.m2mcom.pond.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing UnitId.
 */
@RestController
@RequestMapping("/api")
public class UnitIdResource {

    private final Logger log = LoggerFactory.getLogger(UnitIdResource.class);

    private static final String ENTITY_NAME = "unitId";
        
    private final UnitIdService unitIdService;

    public UnitIdResource(UnitIdService unitIdService) {
        this.unitIdService = unitIdService;
    }

    /**
     * POST  /unit-ids : Create a new unitId.
     *
     * @param unitId the unitId to create
     * @return the ResponseEntity with status 201 (Created) and with body the new unitId, or with status 400 (Bad Request) if the unitId has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/unit-ids")
    @Timed
    public ResponseEntity<UnitId> createUnitId(@Valid @RequestBody UnitId unitId) throws URISyntaxException {
        log.debug("REST request to save UnitId : {}", unitId);
        if (unitId.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new unitId cannot already have an ID")).body(null);
        }
        UnitId result = unitIdService.save(unitId);
        return ResponseEntity.created(new URI("/api/unit-ids/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /unit-ids : Updates an existing unitId.
     *
     * @param unitId the unitId to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated unitId,
     * or with status 400 (Bad Request) if the unitId is not valid,
     * or with status 500 (Internal Server Error) if the unitId couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/unit-ids")
    @Timed
    public ResponseEntity<UnitId> updateUnitId(@Valid @RequestBody UnitId unitId) throws URISyntaxException {
        log.debug("REST request to update UnitId : {}", unitId);
        if (unitId.getId() == null) {
            return createUnitId(unitId);
        }
        UnitId result = unitIdService.save(unitId);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, unitId.getId().toString()))
            .body(result);
    }

    /**
     * GET  /unit-ids : get all the unitIds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of unitIds in body
     */
    @GetMapping("/unit-ids")
    @Timed
    public List<UnitId> getAllUnitIds() {
        log.debug("REST request to get all UnitIds");
        return unitIdService.findAll();
    }

    /**
     * GET  /unit-ids/:id : get the "id" unitId.
     *
     * @param id the id of the unitId to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the unitId, or with status 404 (Not Found)
     */
    @GetMapping("/unit-ids/{id}")
    @Timed
    public ResponseEntity<UnitId> getUnitId(@PathVariable Long id) {
        log.debug("REST request to get UnitId : {}", id);
        UnitId unitId = unitIdService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(unitId));
    }

    /**
     * DELETE  /unit-ids/:id : delete the "id" unitId.
     *
     * @param id the id of the unitId to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/unit-ids/{id}")
    @Timed
    public ResponseEntity<Void> deleteUnitId(@PathVariable Long id) {
        log.debug("REST request to delete UnitId : {}", id);
        unitIdService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/unit-ids?query=:query : search for the unitId corresponding
     * to the query.
     *
     * @param query the query of the unitId search 
     * @return the result of the search
     */
    @GetMapping("/_search/unit-ids")
    @Timed
    public List<UnitId> searchUnitIds(@RequestParam String query) {
        log.debug("REST request to search UnitIds for query {}", query);
        return unitIdService.search(query);
    }


}
