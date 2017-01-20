package com.isdc.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
/**
 * Following class represents the model for every introduced person's Yearly performances.Which are then introduced in a joined table
 *
 * @author Robert.Szapora
 */
@Entity
@Table(name = "performance")
public class PersonPerformance implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2325399075617414147L;
	
	private int performanceId;
	private Person person;
	private int performanceYear;
	private double performance;
	
	public PersonPerformance() {
		super();
	}

	public PersonPerformance(Person person, int performanceYear, double performance) {
		super();
		this.person = person;
		this.performanceYear = performanceYear;
		this.performance = performance;
	}

	@Id
	@GeneratedValue
	@Column(name = "perf_id", unique = true)
	public int getPerformanceId() {
		return this.performanceId;
	}

	public void setPerformanceId(int performanceId) {
		this.performanceId = performanceId;
	}

	@ManyToOne
	@JoinColumn(name = "isin", nullable = false)
	public Person getPerson() {
		return this.person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	@Column(name="perf_year")
	public int getPerformanceYear() {
		return performanceYear;
	}

	public void setPerformanceYear(int performanceYear) {
		this.performanceYear = performanceYear;
	}

	@Column(name="performance")
	public double getPerformance() {
		return performance;
	}

	public void setPerformance(double performance) {
		this.performance = performance;
	}
	
}
