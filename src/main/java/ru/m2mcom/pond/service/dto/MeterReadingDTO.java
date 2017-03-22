package ru.m2mcom.pond.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the MeterReading entity.
 */
public class MeterReadingDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate readingDate;

    private String description;

    @NotNull
    private Double reading;

    @NotNull
    private Double tempVal;

    private Long tankId;

    private String tankTankName;

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
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public Double getReading() {
        return reading;
    }

    public void setReading(Double reading) {
        this.reading = reading;
    }
    public Double getTempVal() {
        return tempVal;
    }

    public void setTempVal(Double tempVal) {
        this.tempVal = tempVal;
    }

    public Long getTankId() {
        return tankId;
    }

    public void setTankId(Long tankId) {
        this.tankId = tankId;
    }

    public String getTankTankName() {
        return tankTankName;
    }

    public void setTankTankName(String tankTankName) {
        this.tankTankName = tankTankName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MeterReadingDTO meterReadingDTO = (MeterReadingDTO) o;

        if ( ! Objects.equals(id, meterReadingDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "MeterReadingDTO{" +
            "id=" + id +
            ", readingDate='" + readingDate + "'" +
            ", description='" + description + "'" +
            ", reading='" + reading + "'" +
            ", tempVal='" + tempVal + "'" +
            '}';
    }
}
