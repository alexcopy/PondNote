package ru.m2mcom.pond.service.mapper;

import ru.m2mcom.pond.domain.*;
import ru.m2mcom.pond.service.dto.DataTempDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity DataTemp and its DTO DataTempDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DataTempMapper {

    DataTempDTO dataTempToDataTempDTO(DataTemp dataTemp);

    List<DataTempDTO> dataTempsToDataTempDTOs(List<DataTemp> dataTemps);

    DataTemp dataTempDTOToDataTemp(DataTempDTO dataTempDTO);

    List<DataTemp> dataTempDTOsToDataTemps(List<DataTempDTO> dataTempDTOs);
}
