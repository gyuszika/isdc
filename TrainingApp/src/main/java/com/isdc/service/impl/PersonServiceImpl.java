package com.isdc.service.impl;

import java.text.DecimalFormat;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isdc.dao.PersonDao;
import com.isdc.dao.PersonPerformanceDao;
import com.isdc.model.Person;
import com.isdc.model.PersonPerformance;
import com.isdc.service.PersonService;

@Service
public class PersonServiceImpl implements PersonService {

	@Autowired
	private PersonDao personDao;
	
	@Autowired
	private PersonPerformanceDao personPerformanceDao;

	@Transactional
	public void add(Person person) {
		person.setIsin(person.getIsin());
		
		for (int i = 0; i < 17; i++) {
			PersonPerformance personPerf = new PersonPerformance();
			
			personPerf.setPerformanceYear(2000 + i);
			personPerf.setPerformance((int)((Math.random() * 9000) + 100) / 10.0);
			personPerf.setPerson(person);
			personPerformanceDao.add(personPerf);
			person.getPersonPerf().add(personPerf);
		}
		personDao.add(person);
	}

	@Transactional
	public void edit(Person person) {
		personDao.edit(person);
	}

	@Transactional
	public void delete(Long isin) {
		personDao.delete(isin);

	}

	@Transactional
	public Person getPerson(Long isin) {
		return personDao.getPerson(isin); 
	}

	@Override
	@Transactional
	public List getAllPerson() {
		return personDao.getAllPerson();
	}
	
	
}
