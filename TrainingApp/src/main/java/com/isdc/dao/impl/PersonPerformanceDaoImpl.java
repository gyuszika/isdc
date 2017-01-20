package com.isdc.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.isdc.dao.PersonPerformanceDao;
import com.isdc.model.PersonPerformance;

@Repository
public class PersonPerformanceDaoImpl implements PersonPerformanceDao {
	
	@Autowired
	private SessionFactory session;

	@Override
	public void add(PersonPerformance personPerf) {
		session.getCurrentSession().save(personPerf);
		
	}

	@Override
	public void edit(PersonPerformance personPerf) {
		session.getCurrentSession().update(personPerf);
		
	}

	@Override
	public void delete(Long isin) {
		session.getCurrentSession().delete(getPersonPerformance(isin));
		
	}
	
	@Override
	public PersonPerformance getPersonPerformance(Long isin) {
		return (PersonPerformance) session.getCurrentSession().get(PersonPerformance.class, isin);
	}
	
	
	@Override
	public List getAllPersonPerformance() {
		return session.getCurrentSession().createCriteria(PersonPerformance.class).list();
	}

}
