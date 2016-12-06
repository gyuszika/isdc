package com.isdc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "funds")
public class Person {
	@Id
	@NotNull
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int pk;
	@Column
	private int isin;
	@Column
	private String name;
	@Column
	private double performance_1yr;
	@Column
	private double performance_2yr;
	@Column
	private double performance_3yr;

	public Person() {

	}

	public Person(int pk, int isin, String name, double performance_1yr, double performance_2yr,
			double performance_3yr) {
		super();
		this.pk = pk;
		this.isin = isin;
		this.name = name;
		this.performance_1yr = performance_1yr;
		this.performance_2yr = performance_2yr;
		this.performance_3yr = performance_3yr;
	}

	public int getPk() {
		return pk;
	}

	public void setPk(int pk) {
		this.pk = pk;
	}

	public int getIsin() {
		return isin;
	}

	public void setIsin(int isin) {
		this.isin = isin;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPerformance_1yr() {
		return performance_1yr;
	}

	public void setPerformance_1yr(double performance_1yr) {
		this.performance_1yr = performance_1yr;
	}

	public double getPerformance_2yr() {
		return performance_2yr;
	}

	public void setPerformance_2yr(double performance_2yr) {
		this.performance_2yr = performance_2yr;
	}

	public double getPerformance_3yr() {
		return performance_3yr;
	}

	public void setPerformance_3yr(double performance_3yr) {
		this.performance_3yr = performance_3yr;
	}

	

}
