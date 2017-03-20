package ru.m2mcom.pond.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the DataTemp entity.
 */
public class DataTempDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate data;

    @NotNull
    private Double temp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
    public Double getTemp() {
        return temp;
    }

    public void setTemp(Double temp) {
        this.temp = temp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DataTempDTO dataTempDTO = (DataTempDTO) o;

        if ( ! Objects.equals(id, dataTempDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "DataTempDTO{" +
            "id=" + id +
            ", data='" + data + "'" +
            ", temp='" + temp + "'" +
            '}';
    }
}
