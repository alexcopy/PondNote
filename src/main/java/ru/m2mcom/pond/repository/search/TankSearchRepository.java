package ru.m2mcom.pond.repository.search;

import ru.m2mcom.pond.domain.Tank;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Tank entity.
 */
public interface TankSearchRepository extends ElasticsearchRepository<Tank, Long> {
}
