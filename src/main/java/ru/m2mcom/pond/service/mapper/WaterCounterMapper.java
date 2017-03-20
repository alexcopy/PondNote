package ru.m2mcom.pond.service.mapper;

import ru.m2mcom.pond.domain.*;
import ru.m2mcom.pond.service.dto.WaterCounterDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity WaterCounter and its DTO WaterCounterDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface WaterCounterMapper {

    WaterCounterDTO waterCounterToWaterCounterDTO(WaterCounter waterCounter);

    List<WaterCounterDTO> waterCountersToWaterCounterDTOs(List<WaterCounter> waterCounters);

    WaterCounter waterCounterDTOToWaterCounter(WaterCounterDTO waterCounterDTO);

    List<WaterCounter> waterCounterDTOsToWaterCounters(List<WaterCounterDTO> waterCounterDTOs);
}
