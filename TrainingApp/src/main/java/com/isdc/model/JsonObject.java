package com.isdc.model;

import java.io.Serializable;
import java.util.Set;

public class JsonObject implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long isin;
	private String personName;
	private Set<PersonPerformance> performance;
	
	public long getIsin() {
		return isin;
	}
	public void setIsin(long i) {
		this.isin = i;
	}
	
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
	public Set<PersonPerformance> getPerformance() {
		return performance;
	}
	public void setPerformance(Set<PersonPerformance> setPerformance) {
		this.performance=setPerformance;
	}


}
