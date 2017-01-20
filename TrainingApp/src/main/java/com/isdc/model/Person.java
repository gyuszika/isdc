package com.isdc.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 * Following class represents the Person model.
 * 
 * @author Robert.Szapora
 */
@Entity
@Table(name = "person")
public class Person {
	
	private Long isin;
	private String personName;
	private Set<PersonPerformance> personPerf = new HashSet<>();

	public Person() {
	}

	public Person(Long isin, String personName) {
		super();
		this.isin = isin;
		this.personName = personName;
	}

	public Person(Long isin, String personName, Set<PersonPerformance> personPerf) {
		this.isin = isin;
		this.personName = personName;
		this.personPerf = personPerf;
	}

	@Id
	@NotNull
	@Column(name = "isin", unique = true, nullable = false, length = 13)
	public Long getIsin() {
		return isin;
	}

	public void setIsin(Long isin) {
		this.isin = isin;
	}

	@NotNull
	@Column(name = "person_name")
	public String getPersonName() {
		return personName;
	}

	public void setPersonName(String personName) {
		this.personName = personName;
	}

	@JsonIgnore
	@OneToMany(mappedBy = "person", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@Fetch(FetchMode.JOIN)
	@BatchSize(size = 10)
	public Set<PersonPerformance> getPersonPerf() {
		return this.personPerf;
	}

	public void setPersonPerf(Set<PersonPerformance> personPerf) {
		this.personPerf = personPerf;
	}

	@Override
	public String toString() {
		return "Person [isin=" + isin + ", personName=" + personName + "]";
	}

}
