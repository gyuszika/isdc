package com.isdc.dao;

import java.util.List;

import com.isdc.model.PersonPerformance;

public interface PersonPerformanceDao {

	public void add(PersonPerformance personPerf);

	public void edit(PersonPerformance personPerf);

	public void delete(Long isin);
	
	public PersonPerformance getPersonPerformance(Long isin);
	
	public List getAllPersonPerformance();
}
