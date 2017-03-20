package ru.m2mcom.pond.repository.search;

import ru.m2mcom.pond.domain.DataTemp;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DataTemp entity.
 */
public interface DataTempSearchRepository extends ElasticsearchRepository<DataTemp, Long> {
}
