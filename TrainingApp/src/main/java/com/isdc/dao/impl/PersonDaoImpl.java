package com.isdc.dao.impl;

import java.util.List;

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
	public void delete(int pk) {
		session.getCurrentSession().delete(getPerson(pk));
	}

	@Override
	public Person getPerson(int pk) {
		return (Person) session.getCurrentSession().get(Person.class, pk);
	}

	@Override
	public List getAllPerson() {
		return session.getCurrentSession().createCriteria(Person.class).list();
	}

}
