package ru.m2mcom.pond.repository.search;

import ru.m2mcom.pond.domain.WaterCounter;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the WaterCounter entity.
 */
public interface WaterCounterSearchRepository extends ElasticsearchRepository<WaterCounter, Long> {
}
