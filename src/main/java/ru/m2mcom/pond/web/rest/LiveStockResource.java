package ru.m2mcom.pond.web.rest;

import com.codahale.metrics.annotation.Timed;
import ru.m2mcom.pond.service.LiveStockService;
import ru.m2mcom.pond.web.rest.util.HeaderUtil;
import ru.m2mcom.pond.service.dto.LiveStockDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing LiveStock.
 */
@RestController
@RequestMapping("/api")
public class LiveStockResource {

    private final Logger log = LoggerFactory.getLogger(LiveStockResource.class);

    private static final String ENTITY_NAME = "liveStock";
        
    private final LiveStockService liveStockService;

    public LiveStockResource(LiveStockService liveStockService) {
        this.liveStockService = liveStockService;
    }

    /**
     * POST  /live-stocks : Create a new liveStock.
     *
     * @param liveStockDTO the liveStockDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new liveStockDTO, or with status 400 (Bad Request) if the liveStock has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/live-stocks")
    @Timed
    public ResponseEntity<LiveStockDTO> createLiveStock(@Valid @RequestBody LiveStockDTO liveStockDTO) throws URISyntaxException {
        log.debug("REST request to save LiveStock : {}", liveStockDTO);
        if (liveStockDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new liveStock cannot already have an ID")).body(null);
        }
        LiveStockDTO result = liveStockService.save(liveStockDTO);
        return ResponseEntity.created(new URI("/api/live-stocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /live-stocks : Updates an existing liveStock.
     *
     * @param liveStockDTO the liveStockDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated liveStockDTO,
     * or with status 400 (Bad Request) if the liveStockDTO is not valid,
     * or with status 500 (Internal Server Error) if the liveStockDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/live-stocks")
    @Timed
    public ResponseEntity<LiveStockDTO> updateLiveStock(@Valid @RequestBody LiveStockDTO liveStockDTO) throws URISyntaxException {
        log.debug("REST request to update LiveStock : {}", liveStockDTO);
        if (liveStockDTO.getId() == null) {
            return createLiveStock(liveStockDTO);
        }
        LiveStockDTO result = liveStockService.save(liveStockDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, liveStockDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /live-stocks : get all the liveStocks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of liveStocks in body
     */
    @GetMapping("/live-stocks")
    @Timed
    public List<LiveStockDTO> getAllLiveStocks() {
        log.debug("REST request to get all LiveStocks");
        return liveStockService.findAll();
    }

    /**
     * GET  /live-stocks/:id : get the "id" liveStock.
     *
     * @param id the id of the liveStockDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the liveStockDTO, or with status 404 (Not Found)
     */
    @GetMapping("/live-stocks/{id}")
    @Timed
    public ResponseEntity<LiveStockDTO> getLiveStock(@PathVariable Long id) {
        log.debug("REST request to get LiveStock : {}", id);
        LiveStockDTO liveStockDTO = liveStockService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(liveStockDTO));
    }

    /**
     * DELETE  /live-stocks/:id : delete the "id" liveStock.
     *
     * @param id the id of the liveStockDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/live-stocks/{id}")
    @Timed
    public ResponseEntity<Void> deleteLiveStock(@PathVariable Long id) {
        log.debug("REST request to delete LiveStock : {}", id);
        liveStockService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/live-stocks?query=:query : search for the liveStock corresponding
     * to the query.
     *
     * @param query the query of the liveStock search 
     * @return the result of the search
     */
    @GetMapping("/_search/live-stocks")
    @Timed
    public List<LiveStockDTO> searchLiveStocks(@RequestParam String query) {
        log.debug("REST request to search LiveStocks for query {}", query);
        return liveStockService.search(query);
    }


}
