package ru.m2mcom.pond.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TempMeter entity.
 */
public class TempMeterDTO implements Serializable {

    private Long id;

    @NotNull
    private Double tempVal;

    @NotNull
    private Integer timestamp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
            ", tempVal='" + tempVal + "'" +
            ", timestamp='" + timestamp + "'" +
            '}';
    }
}
