package ru.m2mcom.pond.repository.search;

import ru.m2mcom.pond.domain.OtherWorks;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OtherWorks entity.
 */
public interface OtherWorksSearchRepository extends ElasticsearchRepository<OtherWorks, Long> {
}
