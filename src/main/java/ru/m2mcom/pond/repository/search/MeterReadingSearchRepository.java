package ru.m2mcom.pond.repository.search;

import ru.m2mcom.pond.domain.MeterReading;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MeterReading entity.
 */
public interface MeterReadingSearchRepository extends ElasticsearchRepository<MeterReading, Long> {
}
