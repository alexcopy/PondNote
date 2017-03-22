package ru.m2mcom.pond.repository.search;

import ru.m2mcom.pond.domain.Chemicals;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Chemicals entity.
 */
public interface ChemicalsSearchRepository extends ElasticsearchRepository<Chemicals, Long> {
}
