package ru.m2mcom.pond.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DataTemp.
 */
@Entity
@Table(name = "data_temp")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "datatemp")
public class DataTemp extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "data", nullable = false)
    private LocalDate data;

    @NotNull
    @Column(name = "temp", nullable = false)
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

    public DataTemp data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Double getTemp() {
        return temp;
    }

    public DataTemp temp(Double temp) {
        this.temp = temp;
        return this;
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
        DataTemp dataTemp = (DataTemp) o;
        if (dataTemp.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, dataTemp.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "DataTemp{" +
            "id=" + id +
            ", data='" + data + "'" +
            ", temp='" + temp + "'" +
            '}';
    }
}
