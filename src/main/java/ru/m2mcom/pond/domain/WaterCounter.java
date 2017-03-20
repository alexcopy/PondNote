package ru.m2mcom.pond.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import ru.m2mcom.pond.domain.enumeration.WaterCounterTypes;

/**
 * A WaterCounter.
 */
@Entity
@Table(name = "water_counter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "watercounter")
public class WaterCounter extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "counter_id")
    private WaterCounterTypes counterId;

    @NotNull
    @Column(name = "water_temp", nullable = false)
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

    public WaterCounter date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public WaterCounterTypes getCounterId() {
        return counterId;
    }

    public WaterCounter counterId(WaterCounterTypes counterId) {
        this.counterId = counterId;
        return this;
    }

    public void setCounterId(WaterCounterTypes counterId) {
        this.counterId = counterId;
    }

    public Double getWaterTemp() {
        return waterTemp;
    }

    public WaterCounter waterTemp(Double waterTemp) {
        this.waterTemp = waterTemp;
        return this;
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
        WaterCounter waterCounter = (WaterCounter) o;
        if (waterCounter.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, waterCounter.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "WaterCounter{" +
            "id=" + id +
            ", date='" + date + "'" +
            ", counterId='" + counterId + "'" +
            ", waterTemp='" + waterTemp + "'" +
            '}';
    }
}
