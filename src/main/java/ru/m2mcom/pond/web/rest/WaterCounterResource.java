package ru.m2mcom.pond.web.rest;

import com.codahale.metrics.annotation.Timed;
import ru.m2mcom.pond.service.WaterCounterService;
import ru.m2mcom.pond.web.rest.util.HeaderUtil;
import ru.m2mcom.pond.web.rest.util.PaginationUtil;
import ru.m2mcom.pond.service.dto.WaterCounterDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing WaterCounter.
 */
@RestController
@RequestMapping("/api")
public class WaterCounterResource {

    private final Logger log = LoggerFactory.getLogger(WaterCounterResource.class);

    private static final String ENTITY_NAME = "waterCounter";
        
    private final WaterCounterService waterCounterService;

    public WaterCounterResource(WaterCounterService waterCounterService) {
        this.waterCounterService = waterCounterService;
    }

    /**
     * POST  /water-counters : Create a new waterCounter.
     *
     * @param waterCounterDTO the waterCounterDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new waterCounterDTO, or with status 400 (Bad Request) if the waterCounter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/water-counters")
    @Timed
    public ResponseEntity<WaterCounterDTO> createWaterCounter(@Valid @RequestBody WaterCounterDTO waterCounterDTO) throws URISyntaxException {
        log.debug("REST request to save WaterCounter : {}", waterCounterDTO);
        if (waterCounterDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new waterCounter cannot already have an ID")).body(null);
        }
        WaterCounterDTO result = waterCounterService.save(waterCounterDTO);
        return ResponseEntity.created(new URI("/api/water-counters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /water-counters : Updates an existing waterCounter.
     *
     * @param waterCounterDTO the waterCounterDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated waterCounterDTO,
     * or with status 400 (Bad Request) if the waterCounterDTO is not valid,
     * or with status 500 (Internal Server Error) if the waterCounterDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/water-counters")
    @Timed
    public ResponseEntity<WaterCounterDTO> updateWaterCounter(@Valid @RequestBody WaterCounterDTO waterCounterDTO) throws URISyntaxException {
        log.debug("REST request to update WaterCounter : {}", waterCounterDTO);
        if (waterCounterDTO.getId() == null) {
            return createWaterCounter(waterCounterDTO);
        }
        WaterCounterDTO result = waterCounterService.save(waterCounterDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, waterCounterDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /water-counters : get all the waterCounters.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of waterCounters in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/water-counters")
    @Timed
    public ResponseEntity<List<WaterCounterDTO>> getAllWaterCounters(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of WaterCounters");
        Page<WaterCounterDTO> page = waterCounterService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/water-counters");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /water-counters/:id : get the "id" waterCounter.
     *
     * @param id the id of the waterCounterDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the waterCounterDTO, or with status 404 (Not Found)
     */
    @GetMapping("/water-counters/{id}")
    @Timed
    public ResponseEntity<WaterCounterDTO> getWaterCounter(@PathVariable Long id) {
        log.debug("REST request to get WaterCounter : {}", id);
        WaterCounterDTO waterCounterDTO = waterCounterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(waterCounterDTO));
    }

    /**
     * DELETE  /water-counters/:id : delete the "id" waterCounter.
     *
     * @param id the id of the waterCounterDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/water-counters/{id}")
    @Timed
    public ResponseEntity<Void> deleteWaterCounter(@PathVariable Long id) {
        log.debug("REST request to delete WaterCounter : {}", id);
        waterCounterService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/water-counters?query=:query : search for the waterCounter corresponding
     * to the query.
     *
     * @param query the query of the waterCounter search 
     * @param pageable the pagination information
     * @return the result of the search
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/_search/water-counters")
    @Timed
    public ResponseEntity<List<WaterCounterDTO>> searchWaterCounters(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of WaterCounters for query {}", query);
        Page<WaterCounterDTO> page = waterCounterService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/water-counters");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
