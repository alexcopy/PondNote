package ru.m2mcom.pond.web.rest;

import ru.m2mcom.pond.PondNotesApp;

import ru.m2mcom.pond.domain.UnitId;
import ru.m2mcom.pond.repository.UnitIdRepository;
import ru.m2mcom.pond.service.UnitIdService;
import ru.m2mcom.pond.repository.search.UnitIdSearchRepository;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UnitIdResource REST controller.
 *
 * @see UnitIdResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PondNotesApp.class)
public class UnitIdResourceIntTest {

    private static final String DEFAULT_UNIT_ID = "AAAAAAAAAA";
    private static final String UPDATED_UNIT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private UnitIdRepository unitIdRepository;

    @Autowired
    private UnitIdService unitIdService;

    @Autowired
    private UnitIdSearchRepository unitIdSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUnitIdMockMvc;

    private UnitId unitId;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UnitIdResource unitIdResource = new UnitIdResource(unitIdService);
        this.restUnitIdMockMvc = MockMvcBuilders.standaloneSetup(unitIdResource)
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
    public static UnitId createEntity(EntityManager em) {
        UnitId unitId = new UnitId()
            .unitId(DEFAULT_UNIT_ID)
            .description(DEFAULT_DESCRIPTION);
        return unitId;
    }

    @Before
    public void initTest() {
        unitIdSearchRepository.deleteAll();
        unitId = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnitId() throws Exception {
        int databaseSizeBeforeCreate = unitIdRepository.findAll().size();

        // Create the UnitId
        restUnitIdMockMvc.perform(post("/api/unit-ids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitId)))
            .andExpect(status().isCreated());

        // Validate the UnitId in the database
        List<UnitId> unitIdList = unitIdRepository.findAll();
        assertThat(unitIdList).hasSize(databaseSizeBeforeCreate + 1);
        UnitId testUnitId = unitIdList.get(unitIdList.size() - 1);
        assertThat(testUnitId.getUnitId()).isEqualTo(DEFAULT_UNIT_ID);
        assertThat(testUnitId.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the UnitId in Elasticsearch
        UnitId unitIdEs = unitIdSearchRepository.findOne(testUnitId.getId());
        assertThat(unitIdEs).isEqualToComparingFieldByField(testUnitId);
    }

    @Test
    @Transactional
    public void createUnitIdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unitIdRepository.findAll().size();

        // Create the UnitId with an existing ID
        unitId.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnitIdMockMvc.perform(post("/api/unit-ids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitId)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<UnitId> unitIdList = unitIdRepository.findAll();
        assertThat(unitIdList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUnitIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = unitIdRepository.findAll().size();
        // set the field null
        unitId.setUnitId(null);

        // Create the UnitId, which fails.

        restUnitIdMockMvc.perform(post("/api/unit-ids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitId)))
            .andExpect(status().isBadRequest());

        List<UnitId> unitIdList = unitIdRepository.findAll();
        assertThat(unitIdList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = unitIdRepository.findAll().size();
        // set the field null
        unitId.setDescription(null);

        // Create the UnitId, which fails.

        restUnitIdMockMvc.perform(post("/api/unit-ids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitId)))
            .andExpect(status().isBadRequest());

        List<UnitId> unitIdList = unitIdRepository.findAll();
        assertThat(unitIdList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUnitIds() throws Exception {
        // Initialize the database
        unitIdRepository.saveAndFlush(unitId);

        // Get all the unitIdList
        restUnitIdMockMvc.perform(get("/api/unit-ids?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unitId.getId().intValue())))
            .andExpect(jsonPath("$.[*].unitId").value(hasItem(DEFAULT_UNIT_ID.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getUnitId() throws Exception {
        // Initialize the database
        unitIdRepository.saveAndFlush(unitId);

        // Get the unitId
        restUnitIdMockMvc.perform(get("/api/unit-ids/{id}", unitId.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(unitId.getId().intValue()))
            .andExpect(jsonPath("$.unitId").value(DEFAULT_UNIT_ID.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUnitId() throws Exception {
        // Get the unitId
        restUnitIdMockMvc.perform(get("/api/unit-ids/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnitId() throws Exception {
        // Initialize the database
        unitIdService.save(unitId);

        int databaseSizeBeforeUpdate = unitIdRepository.findAll().size();

        // Update the unitId
        UnitId updatedUnitId = unitIdRepository.findOne(unitId.getId());
        updatedUnitId
            .unitId(UPDATED_UNIT_ID)
            .description(UPDATED_DESCRIPTION);

        restUnitIdMockMvc.perform(put("/api/unit-ids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnitId)))
            .andExpect(status().isOk());

        // Validate the UnitId in the database
        List<UnitId> unitIdList = unitIdRepository.findAll();
        assertThat(unitIdList).hasSize(databaseSizeBeforeUpdate);
        UnitId testUnitId = unitIdList.get(unitIdList.size() - 1);
        assertThat(testUnitId.getUnitId()).isEqualTo(UPDATED_UNIT_ID);
        assertThat(testUnitId.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the UnitId in Elasticsearch
        UnitId unitIdEs = unitIdSearchRepository.findOne(testUnitId.getId());
        assertThat(unitIdEs).isEqualToComparingFieldByField(testUnitId);
    }

    @Test
    @Transactional
    public void updateNonExistingUnitId() throws Exception {
        int databaseSizeBeforeUpdate = unitIdRepository.findAll().size();

        // Create the UnitId

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUnitIdMockMvc.perform(put("/api/unit-ids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitId)))
            .andExpect(status().isCreated());

        // Validate the UnitId in the database
        List<UnitId> unitIdList = unitIdRepository.findAll();
        assertThat(unitIdList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUnitId() throws Exception {
        // Initialize the database
        unitIdService.save(unitId);

        int databaseSizeBeforeDelete = unitIdRepository.findAll().size();

        // Get the unitId
        restUnitIdMockMvc.perform(delete("/api/unit-ids/{id}", unitId.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean unitIdExistsInEs = unitIdSearchRepository.exists(unitId.getId());
        assertThat(unitIdExistsInEs).isFalse();

        // Validate the database is empty
        List<UnitId> unitIdList = unitIdRepository.findAll();
        assertThat(unitIdList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchUnitId() throws Exception {
        // Initialize the database
        unitIdService.save(unitId);

        // Search the unitId
        restUnitIdMockMvc.perform(get("/api/_search/unit-ids?query=id:" + unitId.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unitId.getId().intValue())))
            .andExpect(jsonPath("$.[*].unitId").value(hasItem(DEFAULT_UNIT_ID.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnitId.class);
    }
}
