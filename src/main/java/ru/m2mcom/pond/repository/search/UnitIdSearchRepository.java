package ru.m2mcom.pond.repository.search;

import ru.m2mcom.pond.domain.UnitId;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UnitId entity.
 */
public interface UnitIdSearchRepository extends ElasticsearchRepository<UnitId, Long> {
}
