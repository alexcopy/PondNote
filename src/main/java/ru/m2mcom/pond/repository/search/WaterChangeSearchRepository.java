package ru.m2mcom.pond.repository.search;

import ru.m2mcom.pond.domain.WaterChange;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the WaterChange entity.
 */
public interface WaterChangeSearchRepository extends ElasticsearchRepository<WaterChange, Long> {
}
