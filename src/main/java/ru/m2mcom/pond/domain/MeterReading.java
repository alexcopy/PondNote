package ru.m2mcom.pond.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A MeterReading.
 */
@Entity
@Table(name = "meter_reading")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "meterreading")
public class MeterReading implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reading_date")
    private LocalDate readingDate;

    @Column(name = "description")
    private String description;

    @Column(name = "reading")
    private Double reading;

    @Column(name = "temp_val")
    private Double tempVal;

    @ManyToOne
    private Device device;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getReadingDate() {
        return readingDate;
    }

    public MeterReading readingDate(LocalDate readingDate) {
        this.readingDate = readingDate;
        return this;
    }

    public void setReadingDate(LocalDate readingDate) {
        this.readingDate = readingDate;
    }

    public String getDescription() {
        return description;
    }

    public MeterReading description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getReading() {
        return reading;
    }

    public MeterReading reading(Double reading) {
        this.reading = reading;
        return this;
    }

    public void setReading(Double reading) {
        this.reading = reading;
    }

    public Double getTempVal() {
        return tempVal;
    }

    public MeterReading tempVal(Double tempVal) {
        this.tempVal = tempVal;
        return this;
    }

    public void setTempVal(Double tempVal) {
        this.tempVal = tempVal;
    }

    public Device getDevice() {
        return device;
    }

    public MeterReading device(Device device) {
        this.device = device;
        return this;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MeterReading meterReading = (MeterReading) o;
        if (meterReading.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, meterReading.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "MeterReading{" +
            "id=" + id +
            ", readingDate='" + readingDate + "'" +
            ", description='" + description + "'" +
            ", reading='" + reading + "'" +
            ", tempVal='" + tempVal + "'" +
            '}';
    }
}
