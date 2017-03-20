package ru.m2mcom.pond.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UnitId.
 */
@Entity
@Table(name = "unit_id")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "unitid")
public class UnitId extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "unit_id", nullable = false)
    private String unitId;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUnitId() {
        return unitId;
    }

    public UnitId unitId(String unitId) {
        this.unitId = unitId;
        return this;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public String getDescription() {
        return description;
    }

    public UnitId description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UnitId unitId = (UnitId) o;
        if (unitId.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, unitId.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "UnitId{" +
            "id=" + id +
            ", unitId='" + unitId + "'" +
            ", description='" + description + "'" +
            '}';
    }
}
