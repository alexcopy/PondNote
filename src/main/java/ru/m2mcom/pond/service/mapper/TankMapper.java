package ru.m2mcom.pond.service.mapper;

import ru.m2mcom.pond.domain.*;
import ru.m2mcom.pond.service.dto.TankDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Tank and its DTO TankDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, })
public interface TankMapper {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "location.streetAddress", target = "locationStreetAddress")
    TankDTO tankToTankDTO(Tank tank);

    List<TankDTO> tanksToTankDTOs(List<Tank> tanks);

    @Mapping(source = "locationId", target = "location")
    Tank tankDTOToTank(TankDTO tankDTO);

    List<Tank> tankDTOsToTanks(List<TankDTO> tankDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Tank tankFromId(Long id) {
        if (id == null) {
            return null;
        }
        Tank tank = new Tank();
        tank.setId(id);
        return tank;
    }
    

}
