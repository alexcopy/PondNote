package ru.m2mcom.pond.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ChemicalAnalysis entity.
 */
public class ChemicalAnalysisDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate date;

    private String no2;

    private String no3;

    private String nh4;

    private String ph;

    @NotNull
    private Double tempVal;

    private Integer timestamp;

    private Set<TankDTO> tanks = new HashSet<>();

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
    public String getNo2() {
        return no2;
    }

    public void setNo2(String no2) {
        this.no2 = no2;
    }
    public String getNo3() {
        return no3;
    }

    public void setNo3(String no3) {
        this.no3 = no3;
    }
    public String getNh4() {
        return nh4;
    }

    public void setNh4(String nh4) {
        this.nh4 = nh4;
    }
    public String getPh() {
        return ph;
    }

    public void setPh(String ph) {
        this.ph = ph;
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

        ChemicalAnalysisDTO chemicalAnalysisDTO = (ChemicalAnalysisDTO) o;

        if ( ! Objects.equals(id, chemicalAnalysisDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ChemicalAnalysisDTO{" +
            "id=" + id +
            ", date='" + date + "'" +
            ", no2='" + no2 + "'" +
            ", no3='" + no3 + "'" +
            ", nh4='" + nh4 + "'" +
            ", ph='" + ph + "'" +
            ", tempVal='" + tempVal + "'" +
            ", timestamp='" + timestamp + "'" +
            '}';
    }
}
