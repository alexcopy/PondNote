package ru.m2mcom.pond.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the FilterPumpCleaning entity.
 */
public class FilterPumpCleaningDTO implements Serializable {

    private Long id;

    private LocalDate cleaningDate;

    private String description;

    private Double tempVal;

    private Integer timestamp;

    private Long deviceId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getCleaningDate() {
        return cleaningDate;
    }

    public void setCleaningDate(LocalDate cleaningDate) {
        this.cleaningDate = cleaningDate;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public Double getTempVal() {
        return tempVal;
    }

    public void setTempVal(Double tempVal) {
        this.tempVal = tempVal;
    }
    public Integer getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Integer timestamp) {
        this.timestamp = timestamp;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FilterPumpCleaningDTO filterPumpCleaningDTO = (FilterPumpCleaningDTO) o;

        if ( ! Objects.equals(id, filterPumpCleaningDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "FilterPumpCleaningDTO{" +
            "id=" + id +
            ", cleaningDate='" + cleaningDate + "'" +
            ", description='" + description + "'" +
            ", tempVal='" + tempVal + "'" +
            ", timestamp='" + timestamp + "'" +
            '}';
    }
}
