package ru.m2mcom.pond.web.rest;

import ru.m2mcom.pond.PondNotesApp;

import ru.m2mcom.pond.domain.Tank;
import ru.m2mcom.pond.repository.TankRepository;
import ru.m2mcom.pond.service.TankService;
import ru.m2mcom.pond.repository.search.TankSearchRepository;
import ru.m2mcom.pond.service.dto.TankDTO;
import ru.m2mcom.pond.service.mapper.TankMapper;
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

import ru.m2mcom.pond.domain.enumeration.TankType;
/**
 * Test class for the TankResource REST controller.
 *
 * @see TankResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PondNotesApp.class)
public class TankResourceIntTest {

    private static final String DEFAULT_TANK_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TANK_NAME = "BBBBBBBBBB";

    private static final TankType DEFAULT_TANK_TYPE = TankType.POND;
    private static final TankType UPDATED_TANK_TYPE = TankType.AQUARIUM;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_TIMESTAMP = 1;
    private static final Integer UPDATED_TIMESTAMP = 2;

    @Autowired
    private TankRepository tankRepository;

    @Autowired
    private TankMapper tankMapper;

    @Autowired
    private TankService tankService;

    @Autowired
    private TankSearchRepository tankSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTankMockMvc;

    private Tank tank;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TankResource tankResource = new TankResource(tankService);
        this.restTankMockMvc = MockMvcBuilders.standaloneSetup(tankResource)
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
    public static Tank createEntity(EntityManager em) {
        Tank tank = new Tank()
            .tankName(DEFAULT_TANK_NAME)
            .tankType(DEFAULT_TANK_TYPE)
            .description(DEFAULT_DESCRIPTION)
            .timestamp(DEFAULT_TIMESTAMP);
        return tank;
    }

    @Before
    public void initTest() {
        tankSearchRepository.deleteAll();
        tank = createEntity(em);
    }

    @Test
    @Transactional
    public void createTank() throws Exception {
        int databaseSizeBeforeCreate = tankRepository.findAll().size();

        // Create the Tank
        TankDTO tankDTO = tankMapper.tankToTankDTO(tank);
        restTankMockMvc.perform(post("/api/tanks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tankDTO)))
            .andExpect(status().isCreated());

        // Validate the Tank in the database
        List<Tank> tankList = tankRepository.findAll();
        assertThat(tankList).hasSize(databaseSizeBeforeCreate + 1);
        Tank testTank = tankList.get(tankList.size() - 1);
        assertThat(testTank.getTankName()).isEqualTo(DEFAULT_TANK_NAME);
        assertThat(testTank.getTankType()).isEqualTo(DEFAULT_TANK_TYPE);
        assertThat(testTank.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTank.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);

        // Validate the Tank in Elasticsearch
        Tank tankEs = tankSearchRepository.findOne(testTank.getId());
        assertThat(tankEs).isEqualToComparingFieldByField(testTank);
    }

    @Test
    @Transactional
    public void createTankWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tankRepository.findAll().size();

        // Create the Tank with an existing ID
        tank.setId(1L);
        TankDTO tankDTO = tankMapper.tankToTankDTO(tank);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTankMockMvc.perform(post("/api/tanks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tankDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Tank> tankList = tankRepository.findAll();
        assertThat(tankList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTankNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tankRepository.findAll().size();
        // set the field null
        tank.setTankName(null);

        // Create the Tank, which fails.
        TankDTO tankDTO = tankMapper.tankToTankDTO(tank);

        restTankMockMvc.perform(post("/api/tanks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tankDTO)))
            .andExpect(status().isBadRequest());

        List<Tank> tankList = tankRepository.findAll();
        assertThat(tankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTankTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tankRepository.findAll().size();
        // set the field null
        tank.setTankType(null);

        // Create the Tank, which fails.
        TankDTO tankDTO = tankMapper.tankToTankDTO(tank);

        restTankMockMvc.perform(post("/api/tanks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tankDTO)))
            .andExpect(status().isBadRequest());

        List<Tank> tankList = tankRepository.findAll();
        assertThat(tankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = tankRepository.findAll().size();
        // set the field null
        tank.setTimestamp(null);

        // Create the Tank, which fails.
        TankDTO tankDTO = tankMapper.tankToTankDTO(tank);

        restTankMockMvc.perform(post("/api/tanks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tankDTO)))
            .andExpect(status().isBadRequest());

        List<Tank> tankList = tankRepository.findAll();
        assertThat(tankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTanks() throws Exception {
        // Initialize the database
        tankRepository.saveAndFlush(tank);

        // Get all the tankList
        restTankMockMvc.perform(get("/api/tanks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tank.getId().intValue())))
            .andExpect(jsonPath("$.[*].tankName").value(hasItem(DEFAULT_TANK_NAME.toString())))
            .andExpect(jsonPath("$.[*].tankType").value(hasItem(DEFAULT_TANK_TYPE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP)));
    }

    @Test
    @Transactional
    public void getTank() throws Exception {
        // Initialize the database
        tankRepository.saveAndFlush(tank);

        // Get the tank
        restTankMockMvc.perform(get("/api/tanks/{id}", tank.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tank.getId().intValue()))
            .andExpect(jsonPath("$.tankName").value(DEFAULT_TANK_NAME.toString()))
            .andExpect(jsonPath("$.tankType").value(DEFAULT_TANK_TYPE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP));
    }

    @Test
    @Transactional
    public void getNonExistingTank() throws Exception {
        // Get the tank
        restTankMockMvc.perform(get("/api/tanks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTank() throws Exception {
        // Initialize the database
        tankRepository.saveAndFlush(tank);
        tankSearchRepository.save(tank);
        int databaseSizeBeforeUpdate = tankRepository.findAll().size();

        // Update the tank
        Tank updatedTank = tankRepository.findOne(tank.getId());
        updatedTank
            .tankName(UPDATED_TANK_NAME)
            .tankType(UPDATED_TANK_TYPE)
            .description(UPDATED_DESCRIPTION)
            .timestamp(UPDATED_TIMESTAMP);
        TankDTO tankDTO = tankMapper.tankToTankDTO(updatedTank);

        restTankMockMvc.perform(put("/api/tanks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tankDTO)))
            .andExpect(status().isOk());

        // Validate the Tank in the database
        List<Tank> tankList = tankRepository.findAll();
        assertThat(tankList).hasSize(databaseSizeBeforeUpdate);
        Tank testTank = tankList.get(tankList.size() - 1);
        assertThat(testTank.getTankName()).isEqualTo(UPDATED_TANK_NAME);
        assertThat(testTank.getTankType()).isEqualTo(UPDATED_TANK_TYPE);
        assertThat(testTank.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTank.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);

        // Validate the Tank in Elasticsearch
        Tank tankEs = tankSearchRepository.findOne(testTank.getId());
        assertThat(tankEs).isEqualToComparingFieldByField(testTank);
    }

    @Test
    @Transactional
    public void updateNonExistingTank() throws Exception {
        int databaseSizeBeforeUpdate = tankRepository.findAll().size();

        // Create the Tank
        TankDTO tankDTO = tankMapper.tankToTankDTO(tank);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTankMockMvc.perform(put("/api/tanks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tankDTO)))
            .andExpect(status().isCreated());

        // Validate the Tank in the database
        List<Tank> tankList = tankRepository.findAll();
        assertThat(tankList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTank() throws Exception {
        // Initialize the database
        tankRepository.saveAndFlush(tank);
        tankSearchRepository.save(tank);
        int databaseSizeBeforeDelete = tankRepository.findAll().size();

        // Get the tank
        restTankMockMvc.perform(delete("/api/tanks/{id}", tank.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tankExistsInEs = tankSearchRepository.exists(tank.getId());
        assertThat(tankExistsInEs).isFalse();

        // Validate the database is empty
        List<Tank> tankList = tankRepository.findAll();
        assertThat(tankList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTank() throws Exception {
        // Initialize the database
        tankRepository.saveAndFlush(tank);
        tankSearchRepository.save(tank);

        // Search the tank
        restTankMockMvc.perform(get("/api/_search/tanks?query=id:" + tank.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tank.getId().intValue())))
            .andExpect(jsonPath("$.[*].tankName").value(hasItem(DEFAULT_TANK_NAME.toString())))
            .andExpect(jsonPath("$.[*].tankType").value(hasItem(DEFAULT_TANK_TYPE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tank.class);
    }
}
