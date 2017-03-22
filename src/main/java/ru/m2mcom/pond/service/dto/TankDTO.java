package ru.m2mcom.pond.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Tank entity.
 */
public class TankDTO implements Serializable {

    private Long id;

    @NotNull
    private String tankName;

    @NotNull
    private String tankType;

    private String description;

    private String location;

    @NotNull
    private Integer timestamp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getTankName() {
        return tankName;
    }

    public void setTankName(String tankName) {
        this.tankName = tankName;
    }
    public String getTankType() {
        return tankType;
    }

    public void setTankType(String tankType) {
        this.tankType = tankType;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
    public Integer getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Integer timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TankDTO tankDTO = (TankDTO) o;

        if ( ! Objects.equals(id, tankDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "TankDTO{" +
            "id=" + id +
            ", tankName='" + tankName + "'" +
            ", tankType='" + tankType + "'" +
            ", description='" + description + "'" +
            ", location='" + location + "'" +
            ", timestamp='" + timestamp + "'" +
            '}';
    }
}
