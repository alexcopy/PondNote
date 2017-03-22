package ru.m2mcom.pond.web.rest;

import ru.m2mcom.pond.PondNotesApp;

import ru.m2mcom.pond.domain.TempMeter;
import ru.m2mcom.pond.repository.TempMeterRepository;
import ru.m2mcom.pond.service.TempMeterService;
import ru.m2mcom.pond.repository.search.TempMeterSearchRepository;
import ru.m2mcom.pond.service.dto.TempMeterDTO;
import ru.m2mcom.pond.service.mapper.TempMeterMapper;
import ru.m2mcom.pond.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TempMeterResource REST controller.
 *
 * @see TempMeterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PondNotesApp.class)
public class TempMeterResourceIntTest {

    private static final LocalDate DEFAULT_READING_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_READING_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_TEMP_VAL = 1D;
    private static final Double UPDATED_TEMP_VAL = 2D;

    private static final Integer DEFAULT_TIMESTAMP = 1;
    private static final Integer UPDATED_TIMESTAMP = 2;

    @Autowired
    private TempMeterRepository tempMeterRepository;

    @Autowired
    private TempMeterMapper tempMeterMapper;

    @Autowired
    private TempMeterService tempMeterService;

    @Autowired
    private TempMeterSearchRepository tempMeterSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTempMeterMockMvc;

    private TempMeter tempMeter;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TempMeterResource tempMeterResource = new TempMeterResource(tempMeterService);
        this.restTempMeterMockMvc = MockMvcBuilders.standaloneSetup(tempMeterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TempMeter createEntity(EntityManager em) {
        TempMeter tempMeter = new TempMeter()
            .readingDate(DEFAULT_READING_DATE)
            .tempVal(DEFAULT_TEMP_VAL)
            .timestamp(DEFAULT_TIMESTAMP);
        return tempMeter;
    }

    @Before
    public void initTest() {
        tempMeterSearchRepository.deleteAll();
        tempMeter = createEntity(em);
    }

    @Test
    @Transactional
    public void createTempMeter() throws Exception {
        int databaseSizeBeforeCreate = tempMeterRepository.findAll().size();

        // Create the TempMeter
        TempMeterDTO tempMeterDTO = tempMeterMapper.tempMeterToTempMeterDTO(tempMeter);
        restTempMeterMockMvc.perform(post("/api/temp-meters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tempMeterDTO)))
            .andExpect(status().isCreated());

        // Validate the TempMeter in the database
        List<TempMeter> tempMeterList = tempMeterRepository.findAll();
        assertThat(tempMeterList).hasSize(databaseSizeBeforeCreate + 1);
        TempMeter testTempMeter = tempMeterList.get(tempMeterList.size() - 1);
        assertThat(testTempMeter.getReadingDate()).isEqualTo(DEFAULT_READING_DATE);
        assertThat(testTempMeter.getTempVal()).isEqualTo(DEFAULT_TEMP_VAL);
        assertThat(testTempMeter.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);

        // Validate the TempMeter in Elasticsearch
        TempMeter tempMeterEs = tempMeterSearchRepository.findOne(testTempMeter.getId());
        assertThat(tempMeterEs).isEqualToComparingFieldByField(testTempMeter);
    }

    @Test
    @Transactional
    public void createTempMeterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tempMeterRepository.findAll().size();

        // Create the TempMeter with an existing ID
        tempMeter.setId(1L);
        TempMeterDTO tempMeterDTO = tempMeterMapper.tempMeterToTempMeterDTO(tempMeter);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTempMeterMockMvc.perform(post("/api/temp-meters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tempMeterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TempMeter> tempMeterList = tempMeterRepository.findAll();
        assertThat(tempMeterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTempValIsRequired() throws Exception {
        int databaseSizeBeforeTest = tempMeterRepository.findAll().size();
        // set the field null
        tempMeter.setTempVal(null);

        // Create the TempMeter, which fails.
        TempMeterDTO tempMeterDTO = tempMeterMapper.tempMeterToTempMeterDTO(tempMeter);

        restTempMeterMockMvc.perform(post("/api/temp-meters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tempMeterDTO)))
            .andExpect(status().isBadRequest());

        List<TempMeter> tempMeterList = tempMeterRepository.findAll();
        assertThat(tempMeterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = tempMeterRepository.findAll().size();
        // set the field null
        tempMeter.setTimestamp(null);

        // Create the TempMeter, which fails.
        TempMeterDTO tempMeterDTO = tempMeterMapper.tempMeterToTempMeterDTO(tempMeter);

        restTempMeterMockMvc.perform(post("/api/temp-meters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tempMeterDTO)))
            .andExpect(status().isBadRequest());

        List<TempMeter> tempMeterList = tempMeterRepository.findAll();
        assertThat(tempMeterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTempMeters() throws Exception {
        // Initialize the database
        tempMeterRepository.saveAndFlush(tempMeter);

        // Get all the tempMeterList
        restTempMeterMockMvc.perform(get("/api/temp-meters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tempMeter.getId().intValue())))
            .andExpect(jsonPath("$.[*].readingDate").value(hasItem(DEFAULT_READING_DATE.toString())))
            .andExpect(jsonPath("$.[*].tempVal").value(hasItem(DEFAULT_TEMP_VAL.doubleValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP)));
    }

    @Test
    @Transactional
    public void getTempMeter() throws Exception {
        // Initialize the database
        tempMeterRepository.saveAndFlush(tempMeter);

        // Get the tempMeter
        restTempMeterMockMvc.perform(get("/api/temp-meters/{id}", tempMeter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tempMeter.getId().intValue()))
            .andExpect(jsonPath("$.readingDate").value(DEFAULT_READING_DATE.toString()))
            .andExpect(jsonPath("$.tempVal").value(DEFAULT_TEMP_VAL.doubleValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP));
    }

    @Test
    @Transactional
    public void getNonExistingTempMeter() throws Exception {
        // Get the tempMeter
        restTempMeterMockMvc.perform(get("/api/temp-meters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTempMeter() throws Exception {
        // Initialize the database
        tempMeterRepository.saveAndFlush(tempMeter);
        tempMeterSearchRepository.save(tempMeter);
        int databaseSizeBeforeUpdate = tempMeterRepository.findAll().size();

        // Update the tempMeter
        TempMeter updatedTempMeter = tempMeterRepository.findOne(tempMeter.getId());
        updatedTempMeter
            .readingDate(UPDATED_READING_DATE)
            .tempVal(UPDATED_TEMP_VAL)
            .timestamp(UPDATED_TIMESTAMP);
        TempMeterDTO tempMeterDTO = tempMeterMapper.tempMeterToTempMeterDTO(updatedTempMeter);

        restTempMeterMockMvc.perform(put("/api/temp-meters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tempMeterDTO)))
            .andExpect(status().isOk());

        // Validate the TempMeter in the database
        List<TempMeter> tempMeterList = tempMeterRepository.findAll();
        assertThat(tempMeterList).hasSize(databaseSizeBeforeUpdate);
        TempMeter testTempMeter = tempMeterList.get(tempMeterList.size() - 1);
        assertThat(testTempMeter.getReadingDate()).isEqualTo(UPDATED_READING_DATE);
        assertThat(testTempMeter.getTempVal()).isEqualTo(UPDATED_TEMP_VAL);
        assertThat(testTempMeter.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);

        // Validate the TempMeter in Elasticsearch
        TempMeter tempMeterEs = tempMeterSearchRepository.findOne(testTempMeter.getId());
        assertThat(tempMeterEs).isEqualToComparingFieldByField(testTempMeter);
    }

    @Test
    @Transactional
    public void updateNonExistingTempMeter() throws Exception {
        int databaseSizeBeforeUpdate = tempMeterRepository.findAll().size();

        // Create the TempMeter
        TempMeterDTO tempMeterDTO = tempMeterMapper.tempMeterToTempMeterDTO(tempMeter);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTempMeterMockMvc.perform(put("/api/temp-meters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tempMeterDTO)))
            .andExpect(status().isCreated());

        // Validate the TempMeter in the database
        List<TempMeter> tempMeterList = tempMeterRepository.findAll();
        assertThat(tempMeterList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTempMeter() throws Exception {
        // Initialize the database
        tempMeterRepository.saveAndFlush(tempMeter);
        tempMeterSearchRepository.save(tempMeter);
        int databaseSizeBeforeDelete = tempMeterRepository.findAll().size();

        // Get the tempMeter
        restTempMeterMockMvc.perform(delete("/api/temp-meters/{id}", tempMeter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tempMeterExistsInEs = tempMeterSearchRepository.exists(tempMeter.getId());
        assertThat(tempMeterExistsInEs).isFalse();

        // Validate the database is empty
        List<TempMeter> tempMeterList = tempMeterRepository.findAll();
        assertThat(tempMeterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTempMeter() throws Exception {
        // Initialize the database
        tempMeterRepository.saveAndFlush(tempMeter);
        tempMeterSearchRepository.save(tempMeter);

        // Search the tempMeter
        restTempMeterMockMvc.perform(get("/api/_search/temp-meters?query=id:" + tempMeter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tempMeter.getId().intValue())))
            .andExpect(jsonPath("$.[*].readingDate").value(hasItem(DEFAULT_READING_DATE.toString())))
            .andExpect(jsonPath("$.[*].tempVal").value(hasItem(DEFAULT_TEMP_VAL.doubleValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TempMeter.class);
    }
}
