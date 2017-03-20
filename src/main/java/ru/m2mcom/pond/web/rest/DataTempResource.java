package ru.m2mcom.pond.web.rest;

import com.codahale.metrics.annotation.Timed;
import ru.m2mcom.pond.service.DataTempService;
import ru.m2mcom.pond.web.rest.util.HeaderUtil;
import ru.m2mcom.pond.web.rest.util.PaginationUtil;
import ru.m2mcom.pond.service.dto.DataTempDTO;
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
 * REST controller for managing DataTemp.
 */
@RestController
@RequestMapping("/api")
public class DataTempResource {

    private final Logger log = LoggerFactory.getLogger(DataTempResource.class);

    private static final String ENTITY_NAME = "dataTemp";
        
    private final DataTempService dataTempService;

    public DataTempResource(DataTempService dataTempService) {
        this.dataTempService = dataTempService;
    }

    /**
     * POST  /data-temps : Create a new dataTemp.
     *
     * @param dataTempDTO the dataTempDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataTempDTO, or with status 400 (Bad Request) if the dataTemp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data-temps")
    @Timed
    public ResponseEntity<DataTempDTO> createDataTemp(@Valid @RequestBody DataTempDTO dataTempDTO) throws URISyntaxException {
        log.debug("REST request to save DataTemp : {}", dataTempDTO);
        if (dataTempDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new dataTemp cannot already have an ID")).body(null);
        }
        DataTempDTO result = dataTempService.save(dataTempDTO);
        return ResponseEntity.created(new URI("/api/data-temps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data-temps : Updates an existing dataTemp.
     *
     * @param dataTempDTO the dataTempDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataTempDTO,
     * or with status 400 (Bad Request) if the dataTempDTO is not valid,
     * or with status 500 (Internal Server Error) if the dataTempDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data-temps")
    @Timed
    public ResponseEntity<DataTempDTO> updateDataTemp(@Valid @RequestBody DataTempDTO dataTempDTO) throws URISyntaxException {
        log.debug("REST request to update DataTemp : {}", dataTempDTO);
        if (dataTempDTO.getId() == null) {
            return createDataTemp(dataTempDTO);
        }
        DataTempDTO result = dataTempService.save(dataTempDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataTempDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data-temps : get all the dataTemps.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of dataTemps in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/data-temps")
    @Timed
    public ResponseEntity<List<DataTempDTO>> getAllDataTemps(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of DataTemps");
        Page<DataTempDTO> page = dataTempService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/data-temps");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /data-temps/:id : get the "id" dataTemp.
     *
     * @param id the id of the dataTempDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataTempDTO, or with status 404 (Not Found)
     */
    @GetMapping("/data-temps/{id}")
    @Timed
    public ResponseEntity<DataTempDTO> getDataTemp(@PathVariable Long id) {
        log.debug("REST request to get DataTemp : {}", id);
        DataTempDTO dataTempDTO = dataTempService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dataTempDTO));
    }

    /**
     * DELETE  /data-temps/:id : delete the "id" dataTemp.
     *
     * @param id the id of the dataTempDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data-temps/{id}")
    @Timed
    public ResponseEntity<Void> deleteDataTemp(@PathVariable Long id) {
        log.debug("REST request to delete DataTemp : {}", id);
        dataTempService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/data-temps?query=:query : search for the dataTemp corresponding
     * to the query.
     *
     * @param query the query of the dataTemp search 
     * @param pageable the pagination information
     * @return the result of the search
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/_search/data-temps")
    @Timed
    public ResponseEntity<List<DataTempDTO>> searchDataTemps(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of DataTemps for query {}", query);
        Page<DataTempDTO> page = dataTempService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/data-temps");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
