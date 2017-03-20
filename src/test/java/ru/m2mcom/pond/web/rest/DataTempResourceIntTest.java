package ru.m2mcom.pond.web.rest;

import ru.m2mcom.pond.PondNotesApp;

import ru.m2mcom.pond.domain.DataTemp;
import ru.m2mcom.pond.repository.DataTempRepository;
import ru.m2mcom.pond.service.DataTempService;
import ru.m2mcom.pond.repository.search.DataTempSearchRepository;
import ru.m2mcom.pond.service.dto.DataTempDTO;
import ru.m2mcom.pond.service.mapper.DataTempMapper;
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
 * Test class for the DataTempResource REST controller.
 *
 * @see DataTempResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PondNotesApp.class)
public class DataTempResourceIntTest {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_TEMP = 1D;
    private static final Double UPDATED_TEMP = 2D;

    @Autowired
    private DataTempRepository dataTempRepository;

    @Autowired
    private DataTempMapper dataTempMapper;

    @Autowired
    private DataTempService dataTempService;

    @Autowired
    private DataTempSearchRepository dataTempSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataTempMockMvc;

    private DataTemp dataTemp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DataTempResource dataTempResource = new DataTempResource(dataTempService);
        this.restDataTempMockMvc = MockMvcBuilders.standaloneSetup(dataTempResource)
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
    public static DataTemp createEntity(EntityManager em) {
        DataTemp dataTemp = new DataTemp()
            .data(DEFAULT_DATA)
            .temp(DEFAULT_TEMP);
        return dataTemp;
    }

    @Before
    public void initTest() {
        dataTempSearchRepository.deleteAll();
        dataTemp = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataTemp() throws Exception {
        int databaseSizeBeforeCreate = dataTempRepository.findAll().size();

        // Create the DataTemp
        DataTempDTO dataTempDTO = dataTempMapper.dataTempToDataTempDTO(dataTemp);
        restDataTempMockMvc.perform(post("/api/data-temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataTempDTO)))
            .andExpect(status().isCreated());

        // Validate the DataTemp in the database
        List<DataTemp> dataTempList = dataTempRepository.findAll();
        assertThat(dataTempList).hasSize(databaseSizeBeforeCreate + 1);
        DataTemp testDataTemp = dataTempList.get(dataTempList.size() - 1);
        assertThat(testDataTemp.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testDataTemp.getTemp()).isEqualTo(DEFAULT_TEMP);

        // Validate the DataTemp in Elasticsearch
        DataTemp dataTempEs = dataTempSearchRepository.findOne(testDataTemp.getId());
        assertThat(dataTempEs).isEqualToComparingFieldByField(testDataTemp);
    }

    @Test
    @Transactional
    public void createDataTempWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataTempRepository.findAll().size();

        // Create the DataTemp with an existing ID
        dataTemp.setId(1L);
        DataTempDTO dataTempDTO = dataTempMapper.dataTempToDataTempDTO(dataTemp);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataTempMockMvc.perform(post("/api/data-temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataTempDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<DataTemp> dataTempList = dataTempRepository.findAll();
        assertThat(dataTempList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDataIsRequired() throws Exception {
        int databaseSizeBeforeTest = dataTempRepository.findAll().size();
        // set the field null
        dataTemp.setData(null);

        // Create the DataTemp, which fails.
        DataTempDTO dataTempDTO = dataTempMapper.dataTempToDataTempDTO(dataTemp);

        restDataTempMockMvc.perform(post("/api/data-temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataTempDTO)))
            .andExpect(status().isBadRequest());

        List<DataTemp> dataTempList = dataTempRepository.findAll();
        assertThat(dataTempList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTempIsRequired() throws Exception {
        int databaseSizeBeforeTest = dataTempRepository.findAll().size();
        // set the field null
        dataTemp.setTemp(null);

        // Create the DataTemp, which fails.
        DataTempDTO dataTempDTO = dataTempMapper.dataTempToDataTempDTO(dataTemp);

        restDataTempMockMvc.perform(post("/api/data-temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataTempDTO)))
            .andExpect(status().isBadRequest());

        List<DataTemp> dataTempList = dataTempRepository.findAll();
        assertThat(dataTempList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDataTemps() throws Exception {
        // Initialize the database
        dataTempRepository.saveAndFlush(dataTemp);

        // Get all the dataTempList
        restDataTempMockMvc.perform(get("/api/data-temps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataTemp.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].temp").value(hasItem(DEFAULT_TEMP.doubleValue())));
    }

    @Test
    @Transactional
    public void getDataTemp() throws Exception {
        // Initialize the database
        dataTempRepository.saveAndFlush(dataTemp);

        // Get the dataTemp
        restDataTempMockMvc.perform(get("/api/data-temps/{id}", dataTemp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataTemp.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.temp").value(DEFAULT_TEMP.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDataTemp() throws Exception {
        // Get the dataTemp
        restDataTempMockMvc.perform(get("/api/data-temps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataTemp() throws Exception {
        // Initialize the database
        dataTempRepository.saveAndFlush(dataTemp);
        dataTempSearchRepository.save(dataTemp);
        int databaseSizeBeforeUpdate = dataTempRepository.findAll().size();

        // Update the dataTemp
        DataTemp updatedDataTemp = dataTempRepository.findOne(dataTemp.getId());
        updatedDataTemp
            .data(UPDATED_DATA)
            .temp(UPDATED_TEMP);
        DataTempDTO dataTempDTO = dataTempMapper.dataTempToDataTempDTO(updatedDataTemp);

        restDataTempMockMvc.perform(put("/api/data-temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataTempDTO)))
            .andExpect(status().isOk());

        // Validate the DataTemp in the database
        List<DataTemp> dataTempList = dataTempRepository.findAll();
        assertThat(dataTempList).hasSize(databaseSizeBeforeUpdate);
        DataTemp testDataTemp = dataTempList.get(dataTempList.size() - 1);
        assertThat(testDataTemp.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testDataTemp.getTemp()).isEqualTo(UPDATED_TEMP);

        // Validate the DataTemp in Elasticsearch
        DataTemp dataTempEs = dataTempSearchRepository.findOne(testDataTemp.getId());
        assertThat(dataTempEs).isEqualToComparingFieldByField(testDataTemp);
    }

    @Test
    @Transactional
    public void updateNonExistingDataTemp() throws Exception {
        int databaseSizeBeforeUpdate = dataTempRepository.findAll().size();

        // Create the DataTemp
        DataTempDTO dataTempDTO = dataTempMapper.dataTempToDataTempDTO(dataTemp);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataTempMockMvc.perform(put("/api/data-temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataTempDTO)))
            .andExpect(status().isCreated());

        // Validate the DataTemp in the database
        List<DataTemp> dataTempList = dataTempRepository.findAll();
        assertThat(dataTempList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDataTemp() throws Exception {
        // Initialize the database
        dataTempRepository.saveAndFlush(dataTemp);
        dataTempSearchRepository.save(dataTemp);
        int databaseSizeBeforeDelete = dataTempRepository.findAll().size();

        // Get the dataTemp
        restDataTempMockMvc.perform(delete("/api/data-temps/{id}", dataTemp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean dataTempExistsInEs = dataTempSearchRepository.exists(dataTemp.getId());
        assertThat(dataTempExistsInEs).isFalse();

        // Validate the database is empty
        List<DataTemp> dataTempList = dataTempRepository.findAll();
        assertThat(dataTempList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchDataTemp() throws Exception {
        // Initialize the database
        dataTempRepository.saveAndFlush(dataTemp);
        dataTempSearchRepository.save(dataTemp);

        // Search the dataTemp
        restDataTempMockMvc.perform(get("/api/_search/data-temps?query=id:" + dataTemp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataTemp.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].temp").value(hasItem(DEFAULT_TEMP.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataTemp.class);
    }
}
