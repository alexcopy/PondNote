package ru.m2mcom.pond.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ChemicalAnalysis.
 */
@Entity
@Table(name = "chemical_analysis")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "chemicalanalysis")
public class ChemicalAnalysis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "no_2")
    private String no2;

    @Column(name = "no_3")
    private String no3;

    @Column(name = "nh_4")
    private String nh4;

    @Column(name = "ph")
    private String ph;

    @NotNull
    @Column(name = "temp_val", nullable = false)
    private Double tempVal;

    @Column(name = "timestamp")
    private Integer timestamp;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "chemical_analysis_tank",
               joinColumns = @JoinColumn(name="chemical_analyses_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tanks_id", referencedColumnName="id"))
    private Set<Tank> tanks = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public ChemicalAnalysis date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getNo2() {
        return no2;
    }

    public ChemicalAnalysis no2(String no2) {
        this.no2 = no2;
        return this;
    }

    public void setNo2(String no2) {
        this.no2 = no2;
    }

    public String getNo3() {
        return no3;
    }

    public ChemicalAnalysis no3(String no3) {
        this.no3 = no3;
        return this;
    }

    public void setNo3(String no3) {
        this.no3 = no3;
    }

    public String getNh4() {
        return nh4;
    }

    public ChemicalAnalysis nh4(String nh4) {
        this.nh4 = nh4;
        return this;
    }

    public void setNh4(String nh4) {
        this.nh4 = nh4;
    }

    public String getPh() {
        return ph;
    }

    public ChemicalAnalysis ph(String ph) {
        this.ph = ph;
        return this;
    }

    public void setPh(String ph) {
        this.ph = ph;
    }

    public Double getTempVal() {
        return tempVal;
    }

    public ChemicalAnalysis tempVal(Double tempVal) {
        this.tempVal = tempVal;
        return this;
    }

    public void setTempVal(Double tempVal) {
        this.tempVal = tempVal;
    }

    public Integer getTimestamp() {
        return timestamp;
    }

    public ChemicalAnalysis timestamp(Integer timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Integer timestamp) {
        this.timestamp = timestamp;
    }

    public Set<Tank> getTanks() {
        return tanks;
    }

    public ChemicalAnalysis tanks(Set<Tank> tanks) {
        this.tanks = tanks;
        return this;
    }

    public ChemicalAnalysis addTank(Tank tank) {
        this.tanks.add(tank);
        return this;
    }

    public ChemicalAnalysis removeTank(Tank tank) {
        this.tanks.remove(tank);
        return this;
    }

    public void setTanks(Set<Tank> tanks) {
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
        ChemicalAnalysis chemicalAnalysis = (ChemicalAnalysis) o;
        if (chemicalAnalysis.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, chemicalAnalysis.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ChemicalAnalysis{" +
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
