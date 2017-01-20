package com.isdc.dao.impl;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.isdc.dao.PersonDao;
import com.isdc.model.Person;

@Repository
public class PersonDaoImpl implements PersonDao {

	@Autowired
	private SessionFactory session;

	@Override
	public void add(Person person) {
		session.getCurrentSession().save(person);
	}

	@Override
	public void edit(Person person) {
		session.getCurrentSession().update(person);
	}

	@Override
	public void delete(Long isin) {
		session.getCurrentSession().delete(getPerson(isin));
	}

	@Override
	public Person getPerson(Long isin) {
		return (Person) session.getCurrentSession().get(Person.class, isin);
	}

	@Override
	public List getAllPerson() {
		return session.getCurrentSession().createCriteria(Person.class).setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();
	}

}
