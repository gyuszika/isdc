package com.isdc.model;

import java.io.Serializable;

public class JsonObject implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int isin;
	private String name;
	private double performance_1yr;
	private double performance_2yr;
	private double performance_3yr;
	
	public int getIsin() {
		return isin;
	}
	public void setIsin(int i) {
		this.isin = i;
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
