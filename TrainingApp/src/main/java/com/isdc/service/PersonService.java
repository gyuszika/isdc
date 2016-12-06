package com.isdc.service;

import java.util.List;

import com.isdc.model.Person;

public interface PersonService {
	public void add(Person person);

	public void edit(Person person);

	public void delete(int pk);

	public Person getPerson(int pk);

	public List getAllPerson();
}
