package com.isdc.service;

import java.util.List;
import java.util.Set;

import com.isdc.model.Person;

public interface PersonService {
	public void add(Person person);

	public void edit(Person person);

	public void delete(Long isin);

	public Person getPerson(Long isin);

	public List getAllPerson();

}
