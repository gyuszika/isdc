package com.isdc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isdc.dao.PersonDao;
import com.isdc.model.Person;
import com.isdc.service.PersonService;

@Service
public class PersonServiceImpl implements PersonService {

	@Autowired
	private PersonDao personDao;

	@Transactional
	public void add(Person person) {
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
