package ru.m2mcom.pond.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A WaterChange.
 */
@Entity
@Table(name = "water_change")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "waterchange")
public class WaterChange implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "change_date", nullable = false)
    private ZonedDateTime changeDate;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "reading_before", nullable = false)
    private Double readingBefore;

    @NotNull
    @Column(name = "reading_after", nullable = false)
    private Double readingAfter;

    @NotNull
    @Column(name = "temp_val", nullable = false)
    private Double tempVal;

    @Column(name = "timestamp")
    private Integer timestamp;

    @ManyToOne
    private Tank tank;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getChangeDate() {
        return changeDate;
    }

    public WaterChange changeDate(ZonedDateTime changeDate) {
        this.changeDate = changeDate;
        return this;
    }

    public void setChangeDate(ZonedDateTime changeDate) {
        this.changeDate = changeDate;
    }

    public String getDescription() {
        return description;
    }

    public WaterChange description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getReadingBefore() {
        return readingBefore;
    }

    public WaterChange readingBefore(Double readingBefore) {
        this.readingBefore = readingBefore;
        return this;
    }

    public void setReadingBefore(Double readingBefore) {
        this.readingBefore = readingBefore;
    }

    public Double getReadingAfter() {
        return readingAfter;
    }

    public WaterChange readingAfter(Double readingAfter) {
        this.readingAfter = readingAfter;
        return this;
    }

    public void setReadingAfter(Double readingAfter) {
        this.readingAfter = readingAfter;
    }

    public Double getTempVal() {
        return tempVal;
    }

    public WaterChange tempVal(Double tempVal) {
        this.tempVal = tempVal;
        return this;
    }

    public void setTempVal(Double tempVal) {
        this.tempVal = tempVal;
    }

    public Integer getTimestamp() {
        return timestamp;
    }

    public WaterChange timestamp(Integer timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Integer timestamp) {
        this.timestamp = timestamp;
    }

    public Tank getTank() {
        return tank;
    }

    public WaterChange tank(Tank tank) {
        this.tank = tank;
        return this;
    }

    public void setTank(Tank tank) {
        this.tank = tank;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WaterChange waterChange = (WaterChange) o;
        if (waterChange.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, waterChange.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "WaterChange{" +
            "id=" + id +
            ", changeDate='" + changeDate + "'" +
            ", description='" + description + "'" +
            ", readingBefore='" + readingBefore + "'" +
            ", readingAfter='" + readingAfter + "'" +
            ", tempVal='" + tempVal + "'" +
            ", timestamp='" + timestamp + "'" +
            '}';
    }
}
