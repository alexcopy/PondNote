package ru.m2mcom.pond.repository.search;

import ru.m2mcom.pond.domain.ChemicalAnalysis;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ChemicalAnalysis entity.
 */
public interface ChemicalAnalysisSearchRepository extends ElasticsearchRepository<ChemicalAnalysis, Long> {
}
