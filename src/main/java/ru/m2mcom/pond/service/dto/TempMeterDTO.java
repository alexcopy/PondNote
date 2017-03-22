package ru.m2mcom.pond.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the TempMeter entity.
 */
public class TempMeterDTO implements Serializable {

    private Long id;

    private LocalDate readingDate;

    @NotNull
    private Double tempVal;

    @NotNull
    private Integer timestamp;

    private Set<TankDTO> tanks = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getReadingDate() {
        return readingDate;
    }

    public void setReadingDate(LocalDate readingDate) {
        this.readingDate = readingDate;
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

    public Set<TankDTO> getTanks() {
        return tanks;
    }

    public void setTanks(Set<TankDTO> tanks) {
        this.tanks = tanks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TempMeterDTO tempMeterDTO = (TempMeterDTO) o;

        if ( ! Objects.equals(id, tempMeterDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "TempMeterDTO{" +
            "id=" + id +
            ", readingDate='" + readingDate + "'" +
            ", tempVal='" + tempVal + "'" +
            ", timestamp='" + timestamp + "'" +
            '}';
    }
}
