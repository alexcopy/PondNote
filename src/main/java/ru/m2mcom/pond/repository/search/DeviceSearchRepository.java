package ru.m2mcom.pond.repository.search;

import ru.m2mcom.pond.domain.Device;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Device entity.
 */
public interface DeviceSearchRepository extends ElasticsearchRepository<Device, Long> {
}
