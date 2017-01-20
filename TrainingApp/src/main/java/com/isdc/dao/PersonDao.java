package com.isdc.dao;

import java.util.List;
import java.util.Set;

import com.isdc.model.Person;

public interface PersonDao {
	
	public void add(Person person);

	public void edit(Person person);

	public void delete(Long isin);
	
	public Person getPerson(Long isin);

	public List getAllPerson();

}
