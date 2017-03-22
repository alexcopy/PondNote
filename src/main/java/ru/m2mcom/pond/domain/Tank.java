package ru.m2mcom.pond.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Tank.
 */
@Entity
@Table(name = "tank")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "tank")
public class Tank implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "tank_name", nullable = false)
    private String tankName;

    @NotNull
    @Column(name = "tank_type", nullable = false)
    private String tankType;

    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

    @NotNull
    @Column(name = "timestamp", nullable = false)
    private Integer timestamp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTankName() {
        return tankName;
    }

    public Tank tankName(String tankName) {
        this.tankName = tankName;
        return this;
    }

    public void setTankName(String tankName) {
        this.tankName = tankName;
    }

    public String getTankType() {
        return tankType;
    }

    public Tank tankType(String tankType) {
        this.tankType = tankType;
        return this;
    }

    public void setTankType(String tankType) {
        this.tankType = tankType;
    }

    public String getDescription() {
        return description;
    }

    public Tank description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public Tank location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getTimestamp() {
        return timestamp;
    }

    public Tank timestamp(Integer timestamp) {
        this.timestamp = timestamp;
        return this;
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
        Tank tank = (Tank) o;
        if (tank.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, tank.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Tank{" +
            "id=" + id +
            ", tankName='" + tankName + "'" +
            ", tankType='" + tankType + "'" +
            ", description='" + description + "'" +
            ", location='" + location + "'" +
            ", timestamp='" + timestamp + "'" +
            '}';
    }
}
