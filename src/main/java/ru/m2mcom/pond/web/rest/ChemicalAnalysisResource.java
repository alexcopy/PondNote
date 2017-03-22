package ru.m2mcom.pond.web.rest;

import com.codahale.metrics.annotation.Timed;
import ru.m2mcom.pond.service.ChemicalAnalysisService;
import ru.m2mcom.pond.web.rest.util.HeaderUtil;
import ru.m2mcom.pond.service.dto.ChemicalAnalysisDTO;
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
 * REST controller for managing ChemicalAnalysis.
 */
@RestController
@RequestMapping("/api")
public class ChemicalAnalysisResource {

    private final Logger log = LoggerFactory.getLogger(ChemicalAnalysisResource.class);

    private static final String ENTITY_NAME = "chemicalAnalysis";
        
    private final ChemicalAnalysisService chemicalAnalysisService;

    public ChemicalAnalysisResource(ChemicalAnalysisService chemicalAnalysisService) {
        this.chemicalAnalysisService = chemicalAnalysisService;
    }

    /**
     * POST  /chemical-analyses : Create a new chemicalAnalysis.
     *
     * @param chemicalAnalysisDTO the chemicalAnalysisDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chemicalAnalysisDTO, or with status 400 (Bad Request) if the chemicalAnalysis has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chemical-analyses")
    @Timed
    public ResponseEntity<ChemicalAnalysisDTO> createChemicalAnalysis(@Valid @RequestBody ChemicalAnalysisDTO chemicalAnalysisDTO) throws URISyntaxException {
        log.debug("REST request to save ChemicalAnalysis : {}", chemicalAnalysisDTO);
        if (chemicalAnalysisDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new chemicalAnalysis cannot already have an ID")).body(null);
        }
        ChemicalAnalysisDTO result = chemicalAnalysisService.save(chemicalAnalysisDTO);
        return ResponseEntity.created(new URI("/api/chemical-analyses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chemical-analyses : Updates an existing chemicalAnalysis.
     *
     * @param chemicalAnalysisDTO the chemicalAnalysisDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chemicalAnalysisDTO,
     * or with status 400 (Bad Request) if the chemicalAnalysisDTO is not valid,
     * or with status 500 (Internal Server Error) if the chemicalAnalysisDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chemical-analyses")
    @Timed
    public ResponseEntity<ChemicalAnalysisDTO> updateChemicalAnalysis(@Valid @RequestBody ChemicalAnalysisDTO chemicalAnalysisDTO) throws URISyntaxException {
        log.debug("REST request to update ChemicalAnalysis : {}", chemicalAnalysisDTO);
        if (chemicalAnalysisDTO.getId() == null) {
            return createChemicalAnalysis(chemicalAnalysisDTO);
        }
        ChemicalAnalysisDTO result = chemicalAnalysisService.save(chemicalAnalysisDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chemicalAnalysisDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chemical-analyses : get all the chemicalAnalyses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chemicalAnalyses in body
     */
    @GetMapping("/chemical-analyses")
    @Timed
    public List<ChemicalAnalysisDTO> getAllChemicalAnalyses() {
        log.debug("REST request to get all ChemicalAnalyses");
        return chemicalAnalysisService.findAll();
    }

    /**
     * GET  /chemical-analyses/:id : get the "id" chemicalAnalysis.
     *
     * @param id the id of the chemicalAnalysisDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chemicalAnalysisDTO, or with status 404 (Not Found)
     */
    @GetMapping("/chemical-analyses/{id}")
    @Timed
    public ResponseEntity<ChemicalAnalysisDTO> getChemicalAnalysis(@PathVariable Long id) {
        log.debug("REST request to get ChemicalAnalysis : {}", id);
        ChemicalAnalysisDTO chemicalAnalysisDTO = chemicalAnalysisService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chemicalAnalysisDTO));
    }

    /**
     * DELETE  /chemical-analyses/:id : delete the "id" chemicalAnalysis.
     *
     * @param id the id of the chemicalAnalysisDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chemical-analyses/{id}")
    @Timed
    public ResponseEntity<Void> deleteChemicalAnalysis(@PathVariable Long id) {
        log.debug("REST request to delete ChemicalAnalysis : {}", id);
        chemicalAnalysisService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/chemical-analyses?query=:query : search for the chemicalAnalysis corresponding
     * to the query.
     *
     * @param query the query of the chemicalAnalysis search 
     * @return the result of the search
     */
    @GetMapping("/_search/chemical-analyses")
    @Timed
    public List<ChemicalAnalysisDTO> searchChemicalAnalyses(@RequestParam String query) {
        log.debug("REST request to search ChemicalAnalyses for query {}", query);
        return chemicalAnalysisService.search(query);
    }


}
