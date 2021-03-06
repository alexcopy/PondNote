package ru.m2mcom.pond.service.mapper;

import ru.m2mcom.pond.domain.*;
import ru.m2mcom.pond.service.dto.FilterPumpCleaningDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity FilterPumpCleaning and its DTO FilterPumpCleaningDTO.
 */
@Mapper(componentModel = "spring", uses = {DeviceMapper.class, })
public interface FilterPumpCleaningMapper {

    @Mapping(source = "device.id", target = "deviceId")
    @Mapping(source = "device.deviceName", target = "deviceDeviceName")
    FilterPumpCleaningDTO filterPumpCleaningToFilterPumpCleaningDTO(FilterPumpCleaning filterPumpCleaning);

    List<FilterPumpCleaningDTO> filterPumpCleaningsToFilterPumpCleaningDTOs(List<FilterPumpCleaning> filterPumpCleanings);

    @Mapping(source = "deviceId", target = "device")
    FilterPumpCleaning filterPumpCleaningDTOToFilterPumpCleaning(FilterPumpCleaningDTO filterPumpCleaningDTO);

    List<FilterPumpCleaning> filterPumpCleaningDTOsToFilterPumpCleanings(List<FilterPumpCleaningDTO> filterPumpCleaningDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default FilterPumpCleaning filterPumpCleaningFromId(Long id) {
        if (id == null) {
            return null;
        }
        FilterPumpCleaning filterPumpCleaning = new FilterPumpCleaning();
        filterPumpCleaning.setId(id);
        return filterPumpCleaning;
    }
    

}
