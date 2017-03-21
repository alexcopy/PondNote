package ru.m2mcom.pond.service.mapper;

import ru.m2mcom.pond.domain.*;
import ru.m2mcom.pond.service.dto.MeterReadingDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity MeterReading and its DTO MeterReadingDTO.
 */
@Mapper(componentModel = "spring", uses = {DeviceMapper.class, })
public interface MeterReadingMapper {

    @Mapping(source = "device.id", target = "deviceId")
    @Mapping(source = "device.deviceName", target = "deviceDeviceName")
    MeterReadingDTO meterReadingToMeterReadingDTO(MeterReading meterReading);

    List<MeterReadingDTO> meterReadingsToMeterReadingDTOs(List<MeterReading> meterReadings);

    @Mapping(source = "deviceId", target = "device")
    MeterReading meterReadingDTOToMeterReading(MeterReadingDTO meterReadingDTO);

    List<MeterReading> meterReadingDTOsToMeterReadings(List<MeterReadingDTO> meterReadingDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default MeterReading meterReadingFromId(Long id) {
        if (id == null) {
            return null;
        }
        MeterReading meterReading = new MeterReading();
        meterReading.setId(id);
        return meterReading;
    }
    

}
