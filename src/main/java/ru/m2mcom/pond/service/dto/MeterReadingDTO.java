package ru.m2mcom.pond.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the MeterReading entity.
 */
public class MeterReadingDTO implements Serializable {

    private Long id;

    private LocalDate readingDate;

    private String description;

    private Double reading;

    private Double tempVal;

    private Long deviceId;

    private String deviceDeviceName;

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

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceDeviceName() {
        return deviceDeviceName;
    }

    public void setDeviceDeviceName(String deviceDeviceName) {
        this.deviceDeviceName = deviceDeviceName;
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
