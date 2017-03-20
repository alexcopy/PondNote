package ru.m2mcom.pond.web.rest;

import ru.m2mcom.pond.PondNotesApp;

import ru.m2mcom.pond.domain.WaterCounter;
import ru.m2mcom.pond.repository.WaterCounterRepository;
import ru.m2mcom.pond.service.WaterCounterService;
import ru.m2mcom.pond.repository.search.WaterCounterSearchRepository;
import ru.m2mcom.pond.service.dto.WaterCounterDTO;
import ru.m2mcom.pond.service.mapper.WaterCounterMapper;
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

import ru.m2mcom.pond.domain.enumeration.WaterCounterTypes;
/**
 * Test class for the WaterCounterResource REST controller.
 *
 * @see WaterCounterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PondNotesApp.class)
public class WaterCounterResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final WaterCounterTypes DEFAULT_COUNTER_ID = WaterCounterTypes.PondId;
    private static final WaterCounterTypes UPDATED_COUNTER_ID = WaterCounterTypes.PondId1;

    private static final Double DEFAULT_WATER_TEMP = 1D;
    private static final Double UPDATED_WATER_TEMP = 2D;

    @Autowired
    private WaterCounterRepository waterCounterRepository;

    @Autowired
    private WaterCounterMapper waterCounterMapper;

    @Autowired
    private WaterCounterService waterCounterService;

    @Autowired
    private WaterCounterSearchRepository waterCounterSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWaterCounterMockMvc;

    private WaterCounter waterCounter;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        WaterCounterResource waterCounterResource = new WaterCounterResource(waterCounterService);
        this.restWaterCounterMockMvc = MockMvcBuilders.standaloneSetup(waterCounterResource)
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
    public static WaterCounter createEntity(EntityManager em) {
        WaterCounter waterCounter = new WaterCounter()
            .date(DEFAULT_DATE)
            .counterId(DEFAULT_COUNTER_ID)
            .waterTemp(DEFAULT_WATER_TEMP);
        return waterCounter;
    }

    @Before
    public void initTest() {
        waterCounterSearchRepository.deleteAll();
        waterCounter = createEntity(em);
    }

    @Test
    @Transactional
    public void createWaterCounter() throws Exception {
        int databaseSizeBeforeCreate = waterCounterRepository.findAll().size();

        // Create the WaterCounter
        WaterCounterDTO waterCounterDTO = waterCounterMapper.waterCounterToWaterCounterDTO(waterCounter);
        restWaterCounterMockMvc.perform(post("/api/water-counters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waterCounterDTO)))
            .andExpect(status().isCreated());

        // Validate the WaterCounter in the database
        List<WaterCounter> waterCounterList = waterCounterRepository.findAll();
        assertThat(waterCounterList).hasSize(databaseSizeBeforeCreate + 1);
        WaterCounter testWaterCounter = waterCounterList.get(waterCounterList.size() - 1);
        assertThat(testWaterCounter.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testWaterCounter.getCounterId()).isEqualTo(DEFAULT_COUNTER_ID);
        assertThat(testWaterCounter.getWaterTemp()).isEqualTo(DEFAULT_WATER_TEMP);

        // Validate the WaterCounter in Elasticsearch
        WaterCounter waterCounterEs = waterCounterSearchRepository.findOne(testWaterCounter.getId());
        assertThat(waterCounterEs).isEqualToComparingFieldByField(testWaterCounter);
    }

    @Test
    @Transactional
    public void createWaterCounterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = waterCounterRepository.findAll().size();

        // Create the WaterCounter with an existing ID
        waterCounter.setId(1L);
        WaterCounterDTO waterCounterDTO = waterCounterMapper.waterCounterToWaterCounterDTO(waterCounter);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWaterCounterMockMvc.perform(post("/api/water-counters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waterCounterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<WaterCounter> waterCounterList = waterCounterRepository.findAll();
        assertThat(waterCounterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = waterCounterRepository.findAll().size();
        // set the field null
        waterCounter.setDate(null);

        // Create the WaterCounter, which fails.
        WaterCounterDTO waterCounterDTO = waterCounterMapper.waterCounterToWaterCounterDTO(waterCounter);

        restWaterCounterMockMvc.perform(post("/api/water-counters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waterCounterDTO)))
            .andExpect(status().isBadRequest());

        List<WaterCounter> waterCounterList = waterCounterRepository.findAll();
        assertThat(waterCounterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWaterTempIsRequired() throws Exception {
        int databaseSizeBeforeTest = waterCounterRepository.findAll().size();
        // set the field null
        waterCounter.setWaterTemp(null);

        // Create the WaterCounter, which fails.
        WaterCounterDTO waterCounterDTO = waterCounterMapper.waterCounterToWaterCounterDTO(waterCounter);

        restWaterCounterMockMvc.perform(post("/api/water-counters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waterCounterDTO)))
            .andExpect(status().isBadRequest());

        List<WaterCounter> waterCounterList = waterCounterRepository.findAll();
        assertThat(waterCounterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWaterCounters() throws Exception {
        // Initialize the database
        waterCounterRepository.saveAndFlush(waterCounter);

        // Get all the waterCounterList
        restWaterCounterMockMvc.perform(get("/api/water-counters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(waterCounter.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].counterId").value(hasItem(DEFAULT_COUNTER_ID.toString())))
            .andExpect(jsonPath("$.[*].waterTemp").value(hasItem(DEFAULT_WATER_TEMP.doubleValue())));
    }

    @Test
    @Transactional
    public void getWaterCounter() throws Exception {
        // Initialize the database
        waterCounterRepository.saveAndFlush(waterCounter);

        // Get the waterCounter
        restWaterCounterMockMvc.perform(get("/api/water-counters/{id}", waterCounter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(waterCounter.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.counterId").value(DEFAULT_COUNTER_ID.toString()))
            .andExpect(jsonPath("$.waterTemp").value(DEFAULT_WATER_TEMP.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingWaterCounter() throws Exception {
        // Get the waterCounter
        restWaterCounterMockMvc.perform(get("/api/water-counters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWaterCounter() throws Exception {
        // Initialize the database
        waterCounterRepository.saveAndFlush(waterCounter);
        waterCounterSearchRepository.save(waterCounter);
        int databaseSizeBeforeUpdate = waterCounterRepository.findAll().size();

        // Update the waterCounter
        WaterCounter updatedWaterCounter = waterCounterRepository.findOne(waterCounter.getId());
        updatedWaterCounter
            .date(UPDATED_DATE)
            .counterId(UPDATED_COUNTER_ID)
            .waterTemp(UPDATED_WATER_TEMP);
        WaterCounterDTO waterCounterDTO = waterCounterMapper.waterCounterToWaterCounterDTO(updatedWaterCounter);

        restWaterCounterMockMvc.perform(put("/api/water-counters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waterCounterDTO)))
            .andExpect(status().isOk());

        // Validate the WaterCounter in the database
        List<WaterCounter> waterCounterList = waterCounterRepository.findAll();
        assertThat(waterCounterList).hasSize(databaseSizeBeforeUpdate);
        WaterCounter testWaterCounter = waterCounterList.get(waterCounterList.size() - 1);
        assertThat(testWaterCounter.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testWaterCounter.getCounterId()).isEqualTo(UPDATED_COUNTER_ID);
        assertThat(testWaterCounter.getWaterTemp()).isEqualTo(UPDATED_WATER_TEMP);

        // Validate the WaterCounter in Elasticsearch
        WaterCounter waterCounterEs = waterCounterSearchRepository.findOne(testWaterCounter.getId());
        assertThat(waterCounterEs).isEqualToComparingFieldByField(testWaterCounter);
    }

    @Test
    @Transactional
    public void updateNonExistingWaterCounter() throws Exception {
        int databaseSizeBeforeUpdate = waterCounterRepository.findAll().size();

        // Create the WaterCounter
        WaterCounterDTO waterCounterDTO = waterCounterMapper.waterCounterToWaterCounterDTO(waterCounter);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWaterCounterMockMvc.perform(put("/api/water-counters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waterCounterDTO)))
            .andExpect(status().isCreated());

        // Validate the WaterCounter in the database
        List<WaterCounter> waterCounterList = waterCounterRepository.findAll();
        assertThat(waterCounterList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWaterCounter() throws Exception {
        // Initialize the database
        waterCounterRepository.saveAndFlush(waterCounter);
        waterCounterSearchRepository.save(waterCounter);
        int databaseSizeBeforeDelete = waterCounterRepository.findAll().size();

        // Get the waterCounter
        restWaterCounterMockMvc.perform(delete("/api/water-counters/{id}", waterCounter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean waterCounterExistsInEs = waterCounterSearchRepository.exists(waterCounter.getId());
        assertThat(waterCounterExistsInEs).isFalse();

        // Validate the database is empty
        List<WaterCounter> waterCounterList = waterCounterRepository.findAll();
        assertThat(waterCounterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchWaterCounter() throws Exception {
        // Initialize the database
        waterCounterRepository.saveAndFlush(waterCounter);
        waterCounterSearchRepository.save(waterCounter);

        // Search the waterCounter
        restWaterCounterMockMvc.perform(get("/api/_search/water-counters?query=id:" + waterCounter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(waterCounter.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].counterId").value(hasItem(DEFAULT_COUNTER_ID.toString())))
            .andExpect(jsonPath("$.[*].waterTemp").value(hasItem(DEFAULT_WATER_TEMP.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WaterCounter.class);
    }
}
