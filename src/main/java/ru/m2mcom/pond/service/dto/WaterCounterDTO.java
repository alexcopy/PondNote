package ru.m2mcom.pond.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import ru.m2mcom.pond.domain.enumeration.WaterCounterTypes;

/**
 * A DTO for the WaterCounter entity.
 */
public class WaterCounterDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate date;

    private WaterCounterTypes counterId;

    @NotNull
    private Double waterTemp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
    public WaterCounterTypes getCounterId() {
        return counterId;
    }

    public void setCounterId(WaterCounterTypes counterId) {
        this.counterId = counterId;
    }
    public Double getWaterTemp() {
        return waterTemp;
    }

    public void setWaterTemp(Double waterTemp) {
        this.waterTemp = waterTemp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        WaterCounterDTO waterCounterDTO = (WaterCounterDTO) o;

        if ( ! Objects.equals(id, waterCounterDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "WaterCounterDTO{" +
            "id=" + id +
            ", date='" + date + "'" +
            ", counterId='" + counterId + "'" +
            ", waterTemp='" + waterTemp + "'" +
            '}';
    }
}
